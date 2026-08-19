/**
 * The hybrid decision: evergreen backbone by default, news only when it earns it.
 *
 * Pulled out of run.ts so the rule is testable without Supabase, OpenAI, ffmpeg
 * or a network. scripts/test-content-engine.ts drives this directly.
 */
import { scoreSignals, type ScoredOpportunity, type Signal } from './score.ts'
import { pickEvergreen, type EvergreenTopic } from './contentBank.ts'

/** careerScore a story must clear: two distinct career concepts, not one. */
export const NEWS_BAR = 0.66
/** Anything older than roughly two days is not "news" for a daily channel. */
export const FRESHNESS_BAR = 0.5

export type RejectedNews = {
  id: string
  title: string
  careerScore: number
  freshness: number
  reason: string
}

export type ContentDecision = {
  mode: 'news' | 'evergreen'
  reason: string
  /** Present when mode === 'news'. */
  opportunity?: ScoredOpportunity
  /** Present when mode === 'evergreen'. */
  topic?: EvergreenTopic
  /** Top news candidates that did not make it, and why. Always populated. */
  rejected: RejectedNews[]
  /** The full ranked list, for the audit table. */
  ranked: ScoredOpportunity[]
}

export type SelectInput = {
  signals: Signal[]
  runDate: string
  nowMs?: number
  /** Evergreen ids used recently; the rotation skips them. */
  recentTopicIds?: string[]
}

function why(o: ScoredOpportunity): string {
  if (o.offBrandReason) return o.offBrandReason
  if (o.careerScore < NEWS_BAR) {
    return o.careerFamilies.length
      ? `only one career angle (${o.careerFamilies.join(', ')}) — not enough for an actionable lesson`
      : 'no career or skills angle at all — generic AI commentary'
  }
  if (o.freshness < FRESHNESS_BAR) return 'stale — older than the daily news window'
  return 'not selected'
}

export function selectContent({ signals, runDate, nowMs, recentTopicIds = [] }: SelectInput): ContentDecision {
  const ranked = scoreSignals(signals ?? [], nowMs ?? Date.now())
  const winner = ranked.find((o) => o.careerScore >= NEWS_BAR && o.freshness >= FRESHNESS_BAR) ?? null

  const rejected = ranked
    .filter((o) => o !== winner)
    .slice(0, 5)
    .map((o) => ({ id: o.id, title: o.title, careerScore: o.careerScore, freshness: o.freshness, reason: why(o) }))

  if (winner) {
    return {
      mode: 'news',
      opportunity: winner,
      reason: `news cleared the career bar (${winner.careerScore.toFixed(2)} ≥ ${NEWS_BAR}) on ${winner.careerFamilies.join(' + ')}`,
      rejected,
      ranked,
    }
  }

  const topic = pickEvergreen(runDate, { exclude: recentTopicIds })
  return {
    mode: 'evergreen',
    topic,
    reason: ranked.length
      ? `no news cleared the career bar — evergreen backbone (${topic.pillar}/${topic.id})`
      : `no usable signals — evergreen backbone (${topic.pillar}/${topic.id})`,
    rejected,
    ranked,
  }
}
