/**
 * Tunable freshness curve: newer signals score higher; tail decays toward {@link minScore}.
 * Adjust for your ingestion cadence without touching scoring logic.
 */
export const FRESHNESS_CONFIG = {
  /** Hours treated as “peak” freshness (score = 1). */
  peakHours: 6,
  /** End of first decay segment (linear slide toward scoreAt24). */
  tier24Hours: 24,
  /** End of second decay segment (linear toward scoreAt72). */
  tier72Hours: 72,
  /** Freshness score at tier24Hours boundary. */
  scoreAt24: 0.85,
  /** Freshness score at tier72Hours boundary. */
  scoreAt72: 0.65,
  /** Floor after long-tail exponential decay. */
  minScore: 0.12,
  /** Half-life (hours) for exponential decay after tier72Hours. */
  longTailHalfLifeHours: 48,
} as const
