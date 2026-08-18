/**
 * Brief generator: turn the top-ranked opportunity into a ProductionBrief the
 * render pipeline can consume (hook + on-screen segments + IG caption + tags).
 *
 * Uses OpenAI when OPENAI_API_KEY is set — this is the ONE component that bills,
 * and it's pennies per call. Without a key it falls back to a deterministic
 * template so the loop still runs end-to-end at $0 (useful for rehearsal/CI).
 */
import type { ScoredOpportunity } from './score.ts'

export type ProductionBrief = {
  id: string
  hook: string
  segments: string[]
  caption: string
  topic_tags: string[]
  duration_sec: number
  source_url: string
}

const SYSTEM = `You write scripts for Jifunze, a faceless short-video brand teaching practical AI and career skills to job seekers and students in Kenya and other emerging markets. Voice: direct, plain, no hype, no emojis in on-screen text. Turn a news signal into a 15-20s vertical video script. Return STRICT JSON only.`

function userPrompt(op: ScoredOpportunity): string {
  return `Signal:
Title: ${op.title}
Summary: ${op.summary}
Source: ${op.source_label ?? op.source}

Produce JSON with:
- "hook": one punchy opening line (<=8 words), no emoji
- "segments": array of 3-5 on-screen text beats, each 3-6 words, that teach ONE useful takeaway a job seeker can act on
- "caption": the Instagram caption (<=200 chars, 1 line), ending with "Free Kazi Kit — link in bio"
Return only the JSON object.`
}

/** Deterministic $0 fallback — no API call. Keeps the loop alive without a key. */
function templateBrief(op: ScoredOpportunity): Omit<ProductionBrief, 'id' | 'topic_tags' | 'duration_sec' | 'source_url'> {
  const topic = op.topic_tags[0] ?? 'AI'
  return {
    hook: `New in ${topic}: what it means for you`,
    segments: ['Something changed this week', op.title.split(' ').slice(0, 5).join(' '), 'Here is how to use it', 'Start today', 'Link in bio'],
    caption: `${op.title.slice(0, 150)} — here's how to use it. Free Kazi Kit — link in bio`,
  }
}

async function llmBrief(op: ScoredOpportunity, key: string): Promise<Omit<ProductionBrief, 'id' | 'topic_tags' | 'duration_sec' | 'source_url'> | null> {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
        messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: userPrompt(op) }],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    const parsed = JSON.parse(data.choices?.[0]?.message?.content ?? '{}')
    if (!parsed.hook || !Array.isArray(parsed.segments) || !parsed.caption) return null
    return { hook: String(parsed.hook), segments: parsed.segments.map(String).slice(0, 5), caption: String(parsed.caption).slice(0, 200) }
  } catch {
    return null
  }
}

export async function buildBrief(op: ScoredOpportunity): Promise<ProductionBrief> {
  const key = process.env.OPENAI_API_KEY
  const core = (key && (await llmBrief(op, key))) || templateBrief(op)
  return {
    id: op.id,
    hook: core.hook,
    segments: core.segments,
    caption: core.caption,
    topic_tags: op.topic_tags.length ? op.topic_tags : ['ai'],
    duration_sec: 18,
    source_url: op.url,
  }
}
