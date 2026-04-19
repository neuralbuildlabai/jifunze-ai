import type { LearnerLevel } from './types'

/** Wizard / pre-create inputs used before the knowledge spec is built. */
export type LearnerPlacementInput = {
  /** Learner-stated expectation (may differ from computed placement). */
  statedSkillLevel: string | null
  /** 1–5, optional. */
  selfConfidence1To5: number | null
  /**
   * Selected option index per diagnostic question (correct answer is always index 0).
   * Length typically 5; partial arrays score only answered items.
   */
  diagnosticOptionIndices: number[] | null
  /** When true, attach a plan-level diagnostic quiz (at plan start). */
  includeDiagnosticQuiz: boolean
}

export type ComputedPlacement = {
  recommendedLevel: LearnerLevel
  /** 0–100 when diagnostic answered; null if skipped. */
  diagnosticScorePercent: number | null
  foundationGapConceptIds: string[]
  /** Full module sort_order values removed from the blueprint (e.g. [0]). */
  skippedModuleSortOrders: number[]
  rationale: string
}

export type KnowledgePlacementMetadata = ComputedPlacement & {
  stated_skill_level: string | null
  self_confidence_1_5: number | null
  include_diagnostic_quiz: boolean
}

