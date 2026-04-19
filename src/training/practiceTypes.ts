/**
 * Structured practice loop: teach → example → practice → feedback → retry → reinforce.
 * Serialized on `training_lessons.practice_bundle` and learner state on `lesson_progress.practice_state`.
 */

export const PRACTICE_BUNDLE_VERSION = 1 as const

export type PracticeMode = 'guided' | 'independent'

export type PracticeTier = 1 | 2 | 3

export type LessonPracticeExercise = {
  id: string
  mode: PracticeMode
  tier: PracticeTier
  title: string
  /** Ties practice to lesson / module outcomes (plain text tags). */
  outcome_refs: string[]
  prompt: string
  success_criteria: string[]
  /** Shown in guided mode, or after "Reveal cues" in independent tiers. */
  guided_hints?: string[]
  /** Lowercase fragments; deterministic feedback checks a minimum match count. */
  rubric_keywords: string[]
  min_chars: number
  /** Expected structure for self-check vs model answer. */
  worked_solution: string
  /** When learner fails this tier, surface this before retry / next tier. */
  escalation_note?: string
}

export type LessonPracticeBundle = {
  version: typeof PRACTICE_BUNDLE_VERSION
  /** Learner-visible module + lesson outcome labels this practice reinforces. */
  ties_to_outcomes: string[]
  exercises: LessonPracticeExercise[]
}

/** Persisted JSON on lesson_progress.practice_state (client-owned shape). */
export type LessonPracticeState = {
  current_tier: PracticeTier
  attempt_count: number
  last_submission_at?: string
  /** Last free-text submission for resume */
  last_submission?: string
  last_feedback_lines?: string[]
  passed?: boolean
  revealed_solution?: boolean
}
