/**
 * Brief generator — hybrid. Produces a ProductionBrief from EITHER:
 *   - an evergreen how-to topic (the daily backbone, brand-right), or
 *   - a news signal that cleared the career-skill bar (skill-pivot angle).
 *
 * Strong, specific prompts force the model to TEACH one actionable thing with a
 * scroll-stopping hook — not summarise. OpenAI when OPENAI_API_KEY is set (the
 * only paid component, pennies/run); deterministic template fallback otherwise.
 */
import type { ScoredOpportunity } from './score.ts'
import type { EvergreenTopic } from './contentBank.ts'

export type ProductionBrief = {
  id: string
  hook: string
  segments: string[]
  caption: string
  topic_tags: string[]
  duration_sec: number
  source_url?: string
  mode: 'evergreen' | 'news'
}

const SYSTEM = `You are the scriptwriter for Jifunze, a faceless short-video brand that turns developments in AI, work and digital opportunity into practical lessons for ambitious African and diaspora professionals who want to improve their work, career and income.

Non-negotiable rules:
- Teach ONE specific, actionable thing the viewer can DO today. Never summarise news; never be vague.
- Hook (<=8 words, <=60 chars) must create a knowledge gap or name a painful mistake. No "New in AI", no headlines, no emojis.
- 4-5 on-screen segments. Each is 3-8 words, one idea, and at least one must start with a verb the viewer can act on (paste, ask, cut, send, check, write...).
- Assume the viewer has applied to many jobs and heard nothing. Speak to that.
- Tone: practical, warm, clear, adult. Never hype.
- BANNED, will be rejected: "in today's fast-paced world", "AI is changing everything", "let's dive in", "this is important for everyone", "game changer", "revolutionize", "unlock the power", "stay tuned".
- Caption <=180 chars, one line. Do NOT add any call to action, link, or 'link in bio' phrase:
  the channel CTA is disabled until the Free Kazi Kit landing page is live.
Return STRICT JSON: {"hook": "...", "segments": ["...","..."], "caption": "..."}`

function evergreenPrompt(t: EvergreenTopic): string {
  return `Make a script that teaches this specific lesson:\n"${t.seed}"\nReturn only the JSON.`
}

function newsPrompt(op: ScoredOpportunity): string {
  return `A relevant news item:\nTitle: ${op.title}\nSummary: ${op.summary}\n\nDo NOT summarise it. Instead teach the ONE concrete action a job seeker should take BECAUSE of this news (a skill to learn, a tool to try on their CV/applications, an opportunity to grab). The takeaway must be usable today. Return only the JSON.`
}

async function llm(system: string, user: string, key: string): Promise<{ hook: string; segments: string[]; caption: string } | null> {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
        messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
        temperature: 0.8,
        response_format: { type: 'json_object' },
      }),
    })
    if (!res.ok) return null
    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> }
    const p = JSON.parse(data.choices?.[0]?.message?.content ?? '{}')
    if (!p.hook || !Array.isArray(p.segments) || !p.caption) return null
    return { hook: String(p.hook).slice(0, 60), segments: p.segments.map(String).slice(0, 5), caption: String(p.caption).slice(0, 180) }
  } catch { return null }
}

/**
 * $0 evergreen fallback. Not a degraded stub: every topic in the bank ships a
 * hand-written script that passes scriptQuality.ts on its own, so a run with no
 * OPENAI_API_KEY is still publishable rather than filler.
 */
function evergreenTemplate(t: EvergreenTopic): { hook: string; segments: string[]; caption: string } {
  return { hook: t.script.hook, segments: [...t.script.segments], caption: t.script.caption }
}

/**
 * $0 news fallback. Deliberately conservative: it does not try to invent the
 * lesson (that is what the LLM is for), it pivots to the one action that is
 * always correct after a hiring-side change — re-check and re-send.
 */
const DANGLING = new Set(['to', 'the', 'a', 'an', 'of', 'for', 'and', 'in', 'on', 'with', 'is', 'are', 'at', 'by', 'from', 'as', 'its', 'that'])

function newsTemplate(op: ScoredOpportunity): { hook: string; segments: string[]; caption: string } {
  const gistWords = op.title.replace(/[^\w\s-]/g, '').split(/\s+/).filter(Boolean).slice(0, 6)
  while (gistWords.length > 2 && DANGLING.has(gistWords[gistWords.length - 1].toLowerCase())) gistWords.pop()
  const gist = gistWords.join(' ')
  return {
    hook: 'Hiring just changed. Your move.',
    segments: [
      gist,
      'Check your CV against it',
      'Update one line today',
      'Then send the application again',
    ],
    caption: `${op.title.slice(0, 110)} — check your CV against it today.`,
  }
}

export async function buildEvergreenBrief(t: EvergreenTopic): Promise<ProductionBrief> {
  const key = process.env.OPENAI_API_KEY
  const core = (key && (await llm(SYSTEM, evergreenPrompt(t), key))) || evergreenTemplate(t)
  return { id: `evg-${t.id}`, ...core, topic_tags: t.tags, duration_sec: 18, mode: 'evergreen' }
}

export async function buildNewsBrief(op: ScoredOpportunity): Promise<ProductionBrief> {
  const key = process.env.OPENAI_API_KEY
  const core = (key && (await llm(SYSTEM, newsPrompt(op), key))) || newsTemplate(op)
  return { id: op.id, ...core, topic_tags: op.topic_tags.length ? op.topic_tags : ['ai'], duration_sec: 18, source_url: op.url, mode: 'news' }
}
