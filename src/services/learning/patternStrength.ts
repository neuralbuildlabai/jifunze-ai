import type { OptimizationLearningWeights } from '../../config/optimizationLearning'
import type { PatternStrength } from '../../types/performanceLearning'

/**
 * Early pattern tiers (mapped to {@link PatternStrength}):
 * - **weak** — directional hint, often n=1–2; still influences scores via `weakPatternWeightScale`.
 * - **emerging** — repeatable tilt with a couple of weighted rows.
 * - **confirmed** — stronger evidence (UI “strong” / high confidence); shown as `confirmed` in traces.
 *
 * Classifies how much evidence supports a historically **strong** axis (ER above baseline).
 * Returns null when the ratio is not meaningfully above baseline for the sample size.
 */
export function strengthForStrongSignal(
  sampleCount: number,
  ratio: number,
  cfg: OptimizationLearningWeights,
): PatternStrength | null {
  if (ratio < cfg.emergingStrongRatio) return null
  if (sampleCount >= cfg.minSamplesForPattern && ratio >= cfg.strongRatioThreshold) return 'confirmed'
  if (sampleCount >= cfg.minSamplesEmerging && ratio >= cfg.emergingStrongRatio) return 'emerging'
  if (sampleCount >= cfg.minSamplesDirectional && ratio >= cfg.directionalStrongRatio) return 'weak'
  return null
}

/**
 * Classifies how much evidence supports a historically **weak** axis (ER below baseline).
 */
export function strengthForWeakSignal(
  sampleCount: number,
  ratio: number,
  cfg: OptimizationLearningWeights,
): PatternStrength | null {
  if (ratio > cfg.emergingWeakRatio) return null
  if (sampleCount >= cfg.minSamplesForPattern && ratio <= cfg.weakRatioThreshold) return 'confirmed'
  if (sampleCount >= cfg.minSamplesEmerging && ratio <= cfg.emergingWeakRatio) return 'emerging'
  if (sampleCount >= cfg.minSamplesDirectional && ratio <= cfg.directionalWeakRatio) return 'weak'
  return null
}

export function insightConfidenceForStrength(strength: PatternStrength): 'low' | 'medium' | 'high' {
  if (strength === 'confirmed') return 'high'
  if (strength === 'emerging') return 'medium'
  return 'low'
}
