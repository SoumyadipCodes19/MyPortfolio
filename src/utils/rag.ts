import { portfolioChunks, PortfolioChunk } from '../data/portfolioChunks';

// ─── TF-IDF Retrieval ────────────────────────────────────────────────────────

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 2); // ≥2 so 'ai','ml','js','py' are included
}

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'are', 'was', 'with', 'his', 'her', 'has', 'have',
  'that', 'this', 'from', 'you', 'can', 'its', 'our', 'your', 'not', 'but',
  'all', 'also', 'into', 'more', 'been', 'they', 'them', 'their', 'what',
  'how', 'did', 'does', 'where', 'who', 'which', 'will', 'would', 'could',
  'should', 'about', 'any', 'is', 'in', 'at', 'me', 'he', 'be', 'or', 'an',
  // 'soumyadip' appears in EVERY chunk → zero IDF, treat as stop word
  'soumyadip',
]);

function cleanTokens(tokens: string[]): string[] {
  return tokens.filter((t) => !STOP_WORDS.has(t));
}

function buildTF(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
  for (const [k, v] of tf) tf.set(k, v / tokens.length);
  return tf;
}

// Pre-compute document TF-IDF index once
interface IndexedChunk {
  chunk: PortfolioChunk;
  tf: Map<string, number>;
  tokens: string[];
}

const index: IndexedChunk[] = portfolioChunks.map((chunk) => {
  const tokens = cleanTokens(tokenize(chunk.title + ' ' + chunk.content));
  return { chunk, tf: buildTF(tokens), tokens };
});

// IDF across corpus
const idfMap = new Map<string, number>();
const N = index.length;

for (const { tokens } of index) {
  const seen = new Set(tokens);
  for (const t of seen) {
    idfMap.set(t, (idfMap.get(t) ?? 0) + 1);
  }
}

for (const [t, df] of idfMap) {
  idfMap.set(t, Math.log(N / df));
}

function tfIdfScore(queryTokens: string[], doc: IndexedChunk): number {
  let score = 0;
  for (const t of queryTokens) {
    const tf = doc.tf.get(t) ?? 0;
    const idf = idfMap.get(t) ?? 0;
    score += tf * idf;
  }
  return score;
}

export interface RetrievedChunk {
  chunk: PortfolioChunk;
  score: number;
}

// Keyword → category fallback map for zero-score queries
const KEYWORD_CATEGORY_MAP: Array<{ keywords: string[]; ids: string[] }> = [
  { keywords: ['ai', 'artificial', 'intelligence', 'ml', 'machine', 'learning', 'rag', 'llm', 'langchain', 'openai', 'tensorflow', 'model', 'neural', 'good'], ids: ['skills-ai-ml', 'bio', 'proj-returns-intelligence'] },
  { keywords: ['project', 'projects', 'built', 'build', 'work', 'app', 'application', 'create'], ids: ['proj-sql-builder', 'proj-deadzone', 'proj-returns-intelligence'] },
  { keywords: ['contact', 'reach', 'email', 'phone', 'linkedin', 'hire', 'connect'], ids: ['contact'] },
  { keywords: ['skill', 'skills', 'know', 'language', 'python', 'react', 'typescript', 'stack', 'tech'], ids: ['skills-languages', 'skills-frontend', 'skills-backend'] },
  { keywords: ['intern', 'experience', 'work', 'job', 'samsung', 'scientiflow', 'company'], ids: ['exp-samsung', 'exp-scientiflow'] },
  { keywords: ['education', 'degree', 'vit', 'university', 'college', 'cgpa', 'gpa', 'study'], ids: ['edu-vit'] },
];

function fallbackByKeyword(queryTokens: string[]): RetrievedChunk[] {
  for (const mapping of KEYWORD_CATEGORY_MAP) {
    if (mapping.keywords.some((kw) => queryTokens.includes(kw))) {
      return mapping.ids
        .map((id) => {
          const found = index.find((d) => d.chunk.id === id);
          return found ? { chunk: found.chunk, score: 0.5 } : null;
        })
        .filter(Boolean) as RetrievedChunk[];
    }
  }
  return [];
}

export function retrieveRelevantChunks(query: string, topK = 3): RetrievedChunk[] {
  const queryTokens = cleanTokens(tokenize(query));
  if (queryTokens.length === 0) return [];

  const scored = index.map((doc) => ({
    chunk: doc.chunk,
    score: tfIdfScore(queryTokens, doc),
  }));

  const results = scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  // If TF-IDF retrieval found nothing, fall back to keyword-category matching
  if (results.length === 0) {
    return fallbackByKeyword(queryTokens).slice(0, topK);
  }

  return results;
}

// ─── AI Generation via secure serverless proxy ───────────────────────────────
// The Gemini API key lives only on Vercel's servers — never in the browser bundle.
// All visitors (public) can use AI for free through /api/ask.

export interface RAGResponse {
  answer: string;
  sources: RetrievedChunk[];
  mode: 'gemini' | 'retrieval-only';
}

function buildFallbackAnswer(_query: string, retrieved: RetrievedChunk[]): string {
  if (retrieved.length === 0) {
    return "I don't have specific information about that. You can reach Soumyadip at soumyadip.ghosh2023@vitstudent.ac.in for more details.";
  }
  const primary = retrieved[0].chunk;
  const secondary = retrieved[1]?.chunk;

  let answer = primary.content.slice(0, 350);
  if (primary.content.length > 350) answer += '...';

  if (secondary && secondary.category !== primary.category) {
    const extra = secondary.content.slice(0, 120);
    answer += ` Also worth noting: ${extra}...`;
  }

  return answer;
}

const buildPrompt = (query: string, context: string) =>
  `You are an AI assistant embedded in Soumyadip Ghosh's developer portfolio.
Answer the visitor's question using ONLY the context provided below. Be concise (2-4 sentences max), friendly, and professional.
If the answer isn't in the context, say so honestly.

CONTEXT (retrieved from portfolio knowledge base):
${context}

VISITOR QUESTION: ${query}

ANSWER:`;

export async function askRAG(query: string): Promise<RAGResponse> {
  const retrieved = retrieveRelevantChunks(query, 3);
  const context = retrieved.map((r) => `[${r.chunk.title}]: ${r.chunk.content}`).join('\n\n');
  const prompt = buildPrompt(query, context);

  try {
    // Call our own serverless route — key never leaves the server
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (res.status === 429) {
      return {
        answer: "You've reached the request limit (15/hour). Please try again later!",
        sources: retrieved,
        mode: 'retrieval-only',
      };
    }

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json() as { answer?: string; error?: string };

    if (!data.answer) throw new Error('Empty response');

    return { answer: data.answer.trim(), sources: retrieved, mode: 'gemini' };
  } catch {
    // Graceful degradation — still useful via retrieval-only
    return {
      answer: buildFallbackAnswer(query, retrieved),
      sources: retrieved,
      mode: 'retrieval-only',
    };
  }
}
