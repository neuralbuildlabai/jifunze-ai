import type { ExternalSignal } from '../../types/signal'
import { compositeRankScore } from '../relevance/compositeRank'
import type { ScoredSignal } from '../relevance/types'

function fingerprint(signal: Pick<ExternalSignal, 'title' | 'summary'>): string {
  const title = signal.title.trim().toLowerCase().replace(/\s+/g, ' ')
  const sum = signal.summary
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .slice(0, 140)
  return `${title}|${sum}`
}

/**
 * Collapses near-identical items (same normalized title + summary prefix), keeping the strongest rank.
 */
export function dedupeScoredSignals(signals: ScoredSignal[]): ScoredSignal[] {
  const best = new Map<string, ScoredSignal>()

  for (const s of signals) {
    const key = fingerprint(s)
    const prev = best.get(key)
    if (!prev || compositeRankScore(s) > compositeRankScore(prev)) {
      best.set(key, s)
    }
  }

  return Array.from(best.values())
}
