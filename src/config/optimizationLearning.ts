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
  /** Minimum weighted samples before declaring a pattern. */
  minSamplesForPattern: number
  /** Ratio below global weighted avg to flag a weak domain/trend/combo. */
  weakRatioThreshold: number
  /** Ratio above global weighted avg to flag strength. */
  strongRatioThreshold: number
}

export const DEFAULT_OPTIMIZATION_LEARNING_WEIGHTS: OptimizationLearningWeights = {
  priorityHistoryBoostMax: 0.055,
  priorityWeakPenaltyMax: 0.07,
  confidenceRelaxMax: 0.034,
  confidenceTightenMax: 0.048,
  recencyHalfLifeDays: 14,
  minSamplesForPattern: 4,
  weakRatioThreshold: 0.88,
  strongRatioThreshold: 1.12,
}
