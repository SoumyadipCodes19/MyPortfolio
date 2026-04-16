import type { VercelRequest, VercelResponse } from '@vercel/node';

// ─── Simple in-memory rate limiter ──────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 15;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (record.count >= RATE_LIMIT) return true;
  record.count += 1;
  return false;
}

// ─── Handler ─────────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limiting
  const ip =
    (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0].trim() ??
    req.socket?.remoteAddress ??
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again in an hour.' });
  }

  // Validate body — Vercel auto-parses JSON body
  const body = req.body as { prompt?: unknown } | undefined;
  const prompt = body?.prompt;

  if (!prompt || typeof prompt !== 'string' || prompt.length > 4000) {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  // API key — set in Vercel Dashboard → Environment Variables as GEMINI_API_KEY
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[ask] GEMINI_API_KEY is not set');
    return res.status(503).json({ error: 'AI service not configured.' });
  }

  // Call Gemini 1.5 Flash
  const GEMINI_URL =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const geminiRes = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 300 },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('[ask] Gemini error:', geminiRes.status, errText);
      return res.status(502).json({ error: 'AI service error.' });
    }

    const data = await geminiRes.json() as {
      candidates?: Array<{ content: { parts: Array<{ text: string }> } }>;
    };

    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
    if (!answer) return res.status(502).json({ error: 'Empty response from AI.' });

    return res.status(200).json({ answer });
  } catch (err) {
    console.error('[ask] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
