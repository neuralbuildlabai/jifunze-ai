import type { ScoredSignal } from './types'

/** Same weighting as opportunity list ranking for dedupe + sort. */
export function compositeRankScore(s: {
  relevance_score?: number
  freshness_score?: number
}): number {
  return (s.relevance_score ?? 0) * 0.7 + (s.freshness_score ?? 0) * 0.3
}

export function compareSignalsByRank(a: ScoredSignal, b: ScoredSignal): number {
  return compositeRankScore(b) - compositeRankScore(a)
}
