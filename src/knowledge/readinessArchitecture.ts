/**
 * Revision, reinforcement, and exam-readiness architecture (Part 14).
 * Optional on `TrainingKnowledgeSpec` — keeps certification/exam simulation extensible without requiring it today.
 */

export const READINESS_ARCHITECTURE_VERSION = 1 as const

/** How supplemental plan quizzes relate to completion order (stored in Knowledge spec; drives UX + progress policy). */
export type SupplementalQuizArchetype = 'recap_checkpoint' | 'mixed_review' | 'exam_practice'

export type RevisionSection = {
  id: string
  title: string
  /** Short Markdown-friendly body (deterministic seed text). */
  body: string
}

/** Spacing schedule for reinforcement readiness — days after a lesson/checkpoint completion. */
export type SpacedReinforcementSchedule = {
  /** e.g. [1, 3, 7, 21] */
  intervals_days: number[]
  /** Optional cap on how many pending reviews to surface in UI. */
  surface_limit: number
}

export type FastReviewModeSpec = {
  /** Query param `?fast=1` hint for compact lesson surfaces. */
  enabled: boolean
  /** Guidance copy for learners (not enforced server-side). */
  target_minutes: number
  /** What to prioritize in fast mode UIs. */
  focus: 'summary_takeaway_action' | 'checkpoint_only'
}

export type MixedReviewSpec = {
  enabled: boolean
  /** Minimum modules required before mixed set unlocks (architecture hook). */
  min_modules_before_unlock: number
  /** Target question count when synthesizing a mixed set from module checkpoints. */
  target_question_count: number
}

export type ExamPracticeArchitectureSpec = {
  /** Enables exam-style framing (timed UI / weighting can attach later without schema churn). */
  enabled: boolean
  /** Certification simulation remains optional — `import` reserves external item banks. */
  item_bank_mode: 'synthetic_from_spec' | 'import_ready'
  /** Soft timebox suggestion for future timed sessions. */
  suggested_timebox_minutes: number
  /** Future: combine weak-area signals into exam selection policy. */
  prefer_missed_concepts?: boolean
}

export type ReadinessArchitectureV1 = {
  version: typeof READINESS_ARCHITECTURE_VERSION
  /** Short bullets pulled into revision surfaces + derived assets (distinct from full `revision_summary`). */
  revision_excerpts: string[]
  /** Structured sections for rich revision layouts (optional). */
  revision_sections?: RevisionSection[]
  spaced_reinforcement: SpacedReinforcementSchedule
  fast_review: FastReviewModeSpec
  mixed_review: MixedReviewSpec
  exam_practice: ExamPracticeArchitectureSpec
  /** Ordered supplemental quiz archetypes this plan intends to expose at plan-level (after modules). */
  supplemental_quiz_blueprint: SupplementalQuizArchetype[]
  /** Confidence / readiness rubric labels for dashboards (deterministic thresholds live in TS). */
  readiness_band_labels: [string, string, string, string]
}

export function defaultReadinessArchitecture(input: {
  topic: string
  objective: string
}): ReadinessArchitectureV1 {
  const topic = input.topic.trim() || 'this topic'
  const objective = input.objective.trim() || 'your objective'
  return {
    version: READINESS_ARCHITECTURE_VERSION,
    revision_excerpts: [
      `Condense ${topic} into one observable weekly signal tied to: ${objective}.`,
      `Review two misconceptions you personally tend to slip into — rewrite each correction as a checklist item.`,
      `Schedule spaced retries: Day 1 micro-drill, Day 7 mixed recall, Day 21 applied scenario.`,
    ],
    revision_sections: [
      {
        id: 'capsule',
        title: 'Revision capsule',
        body: `Anchor ${topic} to stakeholder moments, constraints, and one measurable outcome.`,
      },
      {
        id: 'signals',
        title: 'Signals & measurement',
        body: `Define what would falsify success this week — what evidence would change your approach?`,
      },
      {
        id: 'exam_bridge',
        title: 'Exam-style rehearsal bridge',
        body: `Treat checkpoints as retrieval practice for this plan; escalate difficulty by hiding cues and narrowing time. Pair with official syllabi for external credentials—this is preparation support, not licensure content.`,
      },
    ],
    spaced_reinforcement: {
      intervals_days: [1, 3, 7, 21],
      surface_limit: 6,
    },
    fast_review: {
      enabled: true,
      target_minutes: 8,
      focus: 'summary_takeaway_action',
    },
    mixed_review: {
      enabled: true,
      min_modules_before_unlock: 2,
      target_question_count: 5,
    },
    exam_practice: {
      enabled: true,
      item_bank_mode: 'synthetic_from_spec',
      suggested_timebox_minutes: 30,
      prefer_missed_concepts: true,
    },
    supplemental_quiz_blueprint: ['recap_checkpoint', 'mixed_review', 'exam_practice'],
    readiness_band_labels: ['Building', 'On track', 'Exam-ready', 'Stretch'],
  }
}
