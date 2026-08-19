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

const SYSTEM = `You are the scriptwriter for Jifunze, a faceless short-video brand that teaches PRACTICAL AI and career skills to job seekers and students in Kenya and other emerging markets.

Non-negotiable rules:
- Teach ONE specific, actionable thing the viewer can DO today. Never summarise news; never be vague.
- Hook (<=7 words) must create a knowledge gap or name a painful mistake. No "New in AI", no headlines, no emojis.
- Each on-screen segment is 3-6 words, one idea, imperative where possible. 4-5 segments.
- Assume the viewer has applied to many jobs and heard nothing. Speak to that.
- Caption <=180 chars, one line, ends exactly with: Free Kazi Kit — link in bio
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
    const data = await res.json()
    const p = JSON.parse(data.choices?.[0]?.message?.content ?? '{}')
    if (!p.hook || !Array.isArray(p.segments) || !p.caption) return null
    return { hook: String(p.hook).slice(0, 60), segments: p.segments.map(String).slice(0, 5), caption: String(p.caption).slice(0, 180) }
  } catch { return null }
}

/** Evergreen template fallback ($0) — still teaches, still on-brand. */
function evergreenTemplate(t: EvergreenTopic): { hook: string; segments: string[]; caption: string } {
  const first = t.seed.split(/[.:]/)[0].trim()
  return {
    hook: 'Most people get this wrong',
    segments: ['Here is the fix', first.split(' ').slice(0, 5).join(' '), 'Do it today', 'It takes minutes', 'Link in bio'],
    caption: `${first}. Free Kazi Kit — link in bio`,
  }
}

export async function buildEvergreenBrief(t: EvergreenTopic): Promise<ProductionBrief> {
  const key = process.env.OPENAI_API_KEY
  const core = (key && (await llm(SYSTEM, evergreenPrompt(t), key))) || evergreenTemplate(t)
  return { id: `evg-${t.id}`, ...core, topic_tags: t.tags, duration_sec: 18, mode: 'evergreen' }
}

export async function buildNewsBrief(op: ScoredOpportunity): Promise<ProductionBrief> {
  const key = process.env.OPENAI_API_KEY
  const core = (key && (await llm(SYSTEM, newsPrompt(op), key))) || {
    hook: 'This changes your job hunt',
    segments: ['Something shifted this week', 'Here is what to do', op.title.split(' ').slice(0, 5).join(' '), 'Act on it now', 'Link in bio'],
    caption: `${op.title.slice(0, 140)} — here's your move. Free Kazi Kit — link in bio`,
  }
  return { id: op.id, ...core, topic_tags: op.topic_tags.length ? op.topic_tags : ['ai'], duration_sec: 18, source_url: op.url, mode: 'news' }
}
