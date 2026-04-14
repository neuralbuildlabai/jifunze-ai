import { FRESHNESS_CONFIG } from '../../config/freshnessConfig'
import type { ExternalSignal } from '../../types/signal'

export function hoursSincePublished(iso: string): number {
  const t = Date.parse(iso)
  if (Number.isNaN(t)) return 999
  return (Date.now() - t) / (1000 * 60 * 60)
}

/**
 * 0–1 freshness from {@link FRESHNESS_CONFIG} (piecewise linear + exponential tail).
 */
export function computeFreshnessScore(signal: Pick<ExternalSignal, 'published_at'>): number {
  const h = hoursSincePublished(signal.published_at)
  const c = FRESHNESS_CONFIG

  if (h <= c.peakHours) return 1

  if (h <= c.tier24Hours) {
    const span = c.tier24Hours - c.peakHours
    const t = span > 0 ? (h - c.peakHours) / span : 1
    return 1 + (c.scoreAt24 - 1) * t
  }

  if (h <= c.tier72Hours) {
    const span = c.tier72Hours - c.tier24Hours
    const t = span > 0 ? (h - c.tier24Hours) / span : 1
    return c.scoreAt24 + (c.scoreAt72 - c.scoreAt24) * t
  }

  const tail = h - c.tier72Hours
  const decay = Math.exp(-tail / c.longTailHalfLifeHours)
  return Math.max(c.minScore, c.scoreAt72 * decay)
}

/** One-line copy for reviewers (ties to numeric freshness score). */
export function describeFreshnessSummary(
  publishedAt: string,
  freshnessScore: number,
): string {
  const h = hoursSincePublished(publishedAt)
  const pct = (freshnessScore * 100).toFixed(0)

  if (h < 1 / 60) return `Just in — peak freshness (${pct}).`
  if (h < 1) return `~${Math.round(h * 60)}m old — peak freshness (${pct}).`
  if (h < FRESHNESS_CONFIG.peakHours) return `~${Math.round(h)}h old — peak window (${pct}).`
  if (h < FRESHNESS_CONFIG.tier24Hours) return `~${Math.round(h)}h old — very fresh (${pct}).`
  if (h < FRESHNESS_CONFIG.tier72Hours) return `~${Math.round(h)}h old — moderate decay (${pct}).`
  if (h < 168) return `~${Math.round(h / 24)}d old — tail decay (${pct}).`
  return `Older item — low freshness floor (${pct}); evergreen angle recommended.`
}
