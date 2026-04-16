/**
 * Rule-based learning weights (tune without code changes in future env/config).
 */
export type OptimizationLearningWeights = {
  /** Max additive bump applied to priority_score (0–1 scale). */
  priorityHistoryBoostMax: number
  /** Max subtractive penalty for weak formats / combos. */
  priorityWeakPenaltyMax: number
  /** Added to autonomy confidence when patterns are historically strong. */
  confidenceRelaxMax: number
  /** Subtracted from confidence when patterns are historically weak. */
  confidenceTightenMax: number
  /** Exponential recency half-life in days for weighted aggregates. */
  recencyHalfLifeDays: number
  /** Minimum weighted rows to treat a pattern as confirmed (highest certainty). */
  minSamplesForPattern: number
  /** Minimum rows for an emerging (directional) pattern. */
  minSamplesEmerging: number
  /** Minimum rows for a weak / early-directional hint (often n=1). */
  minSamplesDirectional: number
  /** Ratio below global weighted avg to flag a weak domain/trend/combo. */
  weakRatioThreshold: number
  /** Softer weak threshold for emerging-tier signals. */
  emergingWeakRatio: number
  /** Very low ratio required before a single-row weak hint fires. */
  directionalWeakRatio: number
  /** Ratio above global weighted avg to flag strength. */
  strongRatioThreshold: number
  /** Softer strong threshold for emerging-tier signals. */
  emergingStrongRatio: number
  /** High bar for a single-row “strong” directional hint (avoids noise). */
  directionalStrongRatio: number
  /** Scale applied to boosts/penalties when the underlying pattern is weak. */
  weakPatternWeightScale: number
  /** Scale for emerging patterns. */
  emergingPatternWeightScale: number
  /** Extra multiplier when a recommendation’s payload matches format + platform (rapid combo learning). */
  comboFormatPlatformBoost: number
  /** Extra multiplier when explanation style + platform match a boost. */
  comboTeachingPlatformBoost: number
  /** Small lift when a winning CTA-style rec matches the lead surface. */
  comboCtaPlatformBoost: number
  /** Scale for prefer_format / prefer_platform / prefer_teaching_style priority bumps (keeps positives below boost_domain_platform ceiling). */
  positiveSteeringBoostScale: number
  /** Skip positive teaching nudge when pattern evidence is only `weak` (reduces noise). */
  positiveTeachingMinStrength: 'weak' | 'emerging' | 'confirmed'
}

export const DEFAULT_OPTIMIZATION_LEARNING_WEIGHTS: OptimizationLearningWeights = {
  priorityHistoryBoostMax: 0.086,
  priorityWeakPenaltyMax: 0.086,
  confidenceRelaxMax: 0.046,
  confidenceTightenMax: 0.05,
  recencyHalfLifeDays: 10,
  /** Fewer rows needed before “confirmed” strength (maps UI “strong” evidence). */
  minSamplesForPattern: 3,
  minSamplesEmerging: 2,
  minSamplesDirectional: 1,
  weakRatioThreshold: 0.9,
  emergingWeakRatio: 0.95,
  directionalWeakRatio: 0.86,
  strongRatioThreshold: 1.1,
  emergingStrongRatio: 1.03,
  directionalStrongRatio: 1.07,
  weakPatternWeightScale: 0.62,
  emergingPatternWeightScale: 0.9,
  comboFormatPlatformBoost: 1.16,
  comboTeachingPlatformBoost: 1.2,
  comboCtaPlatformBoost: 1.1,
  positiveSteeringBoostScale: 0.78,
  positiveTeachingMinStrength: 'emerging',
}
