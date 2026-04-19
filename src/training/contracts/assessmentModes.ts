import type { ReadinessDimension } from './readinessDimensions'

/**
 * Canonical assessment modes — map from `training_quizzes.quiz_kind` + product semantics.
 * Doc: docs/jifunze-ontology-and-contracts.md §3
 */
export const ASSESSMENT_MODES = [
  'diagnostic',
  'module_checkpoint',
  /** Dedicated remediation verification quiz — may not exist for all plans yet */
  'revision',
  'recap_checkpoint',
  'mixed_review',
  /** Stakes rehearsal — stored as `exam_practice` quiz_kind today */
  'mock_exam',
] as const

export type AssessmentMode = (typeof ASSESSMENT_MODES)[number]

/**
 * Map DB `quiz_kind` strings to canonical {@link AssessmentMode}.
 * Unknown / legacy kinds default to `module_checkpoint` (module-scoped gate).
 */
export function quizKindToAssessmentMode(quizKind: string | null | undefined): AssessmentMode {
  switch (quizKind) {
    case 'diagnostic':
      return 'diagnostic'
    case 'mixed_review':
      return 'mixed_review'
    case 'exam_practice':
      return 'mock_exam'
    case 'recap_checkpoint':
      return 'recap_checkpoint'
    case 'revision':
    case 'revision_drill':
      return 'revision'
    case 'module_checkpoint':
      return 'module_checkpoint'
    default:
      return 'module_checkpoint'
  }
}

/** Readiness dimensions primarily updated by each mode (not exclusive) */
export const ASSESSMENT_MODE_READINESS_IMPACT: Record<AssessmentMode, readonly ReadinessDimension[]> = {
  diagnostic: ['coverage', 'trajectory'],
  module_checkpoint: ['coverage', 'trajectory'],
  revision: ['coverage', 'trajectory'],
  recap_checkpoint: ['coverage'],
  mixed_review: ['transfer', 'trajectory'],
  mock_exam: ['stakes', 'trajectory'],
}
