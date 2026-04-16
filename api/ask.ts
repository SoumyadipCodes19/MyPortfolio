import type { VercelRequest, VercelResponse } from '@vercel/node';

// ─── Rate limiter ────────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 15;
const WINDOW_MS = 60 * 60 * 1000;

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

// Try these models in order until one succeeds
const MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
];

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

async function callGemini(apiKey: string, prompt: string): Promise<{ answer?: string; error?: string }> {
  let lastError = 'Unknown error';

  for (const model of MODELS) {
    try {
      const url = `${BASE_URL}/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 300 },
        }),
      });

      const raw = await res.text();

      if (!res.ok) {
        lastError = `[${model}] ${res.status}: ${raw.slice(0, 200)}`;
        console.error(`[ask] ${lastError}`);
        continue; // try next model
      }

      const data = JSON.parse(raw) as {
        candidates?: Array<{ content: { parts: Array<{ text: string }> } }>;
      };
      const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
      
      if (answer) {
        console.log(`[ask] Success with model: ${model}`);
        return { answer };
      } else {
        lastError = `[${model}] No answer in response body.`;
      }
    } catch (err: any) {
      lastError = `[${model}] Exception: ${err?.message || 'unknown'}`;
      console.error(`[ask] ${lastError}`);
    }
  }
  
  return { error: lastError };
}

// ─── Handler ─────────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip =
    (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0].trim() ??
    req.socket?.remoteAddress ??
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again in an hour.' });
  }

  const body = req.body as { prompt?: unknown } | undefined;
  const prompt = body?.prompt;

  if (!prompt || typeof prompt !== 'string' || prompt.length > 5000) {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[ask] GEMINI_API_KEY is not set in environment');
    return res.status(503).json({ error: 'AI service not configured.' });
  }

  console.log(`[ask] Prompt length: ${prompt.length} chars, IP: ${ip}`);

  const result = await callGemini(apiKey, prompt);

  if (result.error) {
    // Return the actual error message to the browser so we can see what's wrong!
    return res.status(502).json({ error: `AI service failed: ${result.error}` });
  }

  return res.status(200).json({ answer: result.answer });
}
