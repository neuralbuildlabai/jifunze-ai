/**
 * Teaching substrate types: knowledge atoms, labs, and future signal ingest.
 * These structures intentionally mirror how lessons, revision, labs, and help should connect.
 */

export type TeachingLibraryId =
  | 'ai_foundations'
  | 'machine_learning'
  | 'chatbots'
  | 'networking'
  | 'cybersecurity'
  | 'cloud_devops'
  | 'monitoring'
  | 'content_publishing'
  /** Standalone Jifunze course products (future purchasable / bundleable) */
  | 'course_chatgpt_everyday'
  | 'course_prompt_engineering_models'
  | 'course_gemini_workspace'
  | 'course_claude_writing'
  | 'course_agentic_ai_real_work'

/** Optional anchors tying a concept atom to browsers’ category/module maps (navigation + retrieval). */
export type TeachingKbAnchors = {
  categoryId?: string
  moduleSlug?: string
  /** Lesson that best introduces the idea (often first in lessonSlugs). */
  primaryLessonSlug?: string
}

export type TeachingConcept = {
  id: string
  libraryId: TeachingLibraryId
  title: string
  /** Short definition learners can reuse in their own words */
  explanation: string
  keywords: string[]
  /** Canonical curriculum lesson slugs (cross-library allowed) */
  lessonSlugs: string[]
  misconceptions: string[]
  workedExample: string
  revisionAnchor: string
  commonQuestions: string[]
  relatedLabIds: string[]
  capabilityOutcomes: string[]
  relatedConceptIds: string[]
  /** Observable signals of solid grasp (behavioral checks). */
  goodUnderstandingMarkers?: string[]
  /** Typical weak-grasp signals (mis-reads, omissions). */
  weakUnderstandingMarkers?: string[]
  /** Curriculum navigation hints when sequence should not be inferred only from globals. */
  suggestedNextLessonSlugs?: string[]
  /** Stable placement for KB/chatbot grounding (maps to rendered library trees). */
  kbAnchors?: TeachingKbAnchors
  /** Short, claim-safe notes on tools/products learners may mention (non-authoritative). */
  productToolNotes?: string[]
  /**
   * Optional instructional layer tag for analytics, density reporting, and retrieval tuning.
   * Most legacy atoms omit this — newer layered expansions should set it when it adds clarity.
   */
  kbAtomRole?:
    | 'core_concept'
    | 'misconception'
    | 'worked_example'
    | 'comparison'
    | 'revision_checklist'
    | 'scenario_decision'
    | 'lab_support'
    | 'progression_next_step'
    | 'capstone_quality'
    | 'tool_context'
}

/** Guided = explicit walk-through; Practice = repetition with rubric; Test = tighter evaluation framing; Checkpoint = compact test-style gate */
export type TeachingLabKind = 'guided' | 'practice' | 'test' | 'checkpoint'

/** AI Foundations applied labs — maps to product surfaces under /learning/labs */
export type AiAppliedLabTrack =
  | 'prompt_rewrite'
  | 'task_to_prompt'
  | 'output_review'
  | 'approve_revise_reject'
  | 'workflow'
  | 'revision_sheet'
  | 'learning_revision'
  | 'content_creation'

/** Access surface for teaching labs (materials access varies; never implies mastery or qualification). */
export type TeachingLabAccess = 'public' | 'signed_in' | 'premium'

export type TeachingLabInputField = {
  id: string
  label: string
  /** Instructional cue for what belongs in this capture (not generic filler) */
  guidance?: string
  placeholder?: string
}

export type TeachingLab = {
  id: string
  libraryId: TeachingLibraryId
  kind: TeachingLabKind
  labAccess: TeachingLabAccess
  title: string
  summary: string
  /** What the learner should be able to do after succeeding—especially for guided labs */
  learningObjective?: string
  /** Primary lesson anchors */
  lessonSlugs: string[]
  conceptIds: string[]
  prerequisites: string[]
  /** Scenario/context learners enter before tactics */
  scenario: string
  /** Optional fixed instructional samples (sanitized fiction) embedded for review/output labs */
  instructionalSamples?: { label: string; body: string }[]
  instructions: string[]
  /** Integrated task framing—still mirrored by structured learner inputs */
  task: string
  /** Structured learner capture areas (mandatory—prevents “one empty box”) */
  learnerInputs: TeachingLabInputField[]
  whatGoodLooksLike: string[]
  commonMistakes: string[]
  /** Evaluation criteria / rubric rows */
  reviewCriteria: string[]
  /** Explicit rubric mirror for grading UI—defaults to reviewCriteria when omitted at render time */
  rubric?: string[]
  reflectionPrompts: string[]
  /** What to do after a weak attempt—distinct from generic next steps */
  remediation: string[]
  nextSteps: string[]
  hint: string
  /**
   * Second-stage hint—meant after a weak attempt or when the gentle hint wasn’t enough.
   * Should point at process (what to change, what to compare), not the “right answer.”
   */
  hintStrong?: string
  /** Present on AI Foundations labs that map to applied-learning tracks */
  appliedTrack?: AiAppliedLabTrack
}

export function teachingLabRubricRows(lab: TeachingLab): string[] {
  return lab.rubric && lab.rubric.length > 0 ? lab.rubric : lab.reviewCriteria
}

export type TeachingSignalKind =
  | 'help_query'
  | 'lab_hint_request'
  | 'concept_view'
  | 'lesson_navigation_help'
  /** Lightweight curriculum telemetry for future freshness / prioritization—not prompt tuning only. */
  | 'library_lesson_view'
  /** Library index / category browse (starter or extended catalog surfaces). */
  | 'library_catalog_view'
  /** Learner marked a lesson complete (local UX; mirrored server-side when signed in). */
  | 'lesson_complete'
  /** Repeat visit to a lesson already in local progress (continuity). */
  | 'lesson_revisit'
  /** Training checkpoint or compact gate attempt (workspace / plans when present). */
  | 'checkpoint_attempt'
  /** Teaching lab opened / started (scroll target or first engaged attempt). */
  | 'lab_start'
  /** Learner recorded a lab attempt as complete (self-reported continuity). */
  | 'lab_complete'
  /** Derived or explicit weak-area signal for remediation prioritization. */
  | 'weak_area_signal'
  /** Revision sheet / remediation loop engaged. */
  | 'revision_revisit'
  /** Continuation from browse toward signup (funnel signal, claim-safe). */
  | 'browse_to_signup_signal'
  /** Eligible-plan / premium depth interest (e.g. pricing navigation from gated lesson). */
  | 'premium_interest_signal'
  /** Signed-in learner entered the primary workspace home surface (continuity / funnel analytics). */
  | 'signed_in_workspace_entry'
  /** Help matched a concept but confidence was low—useful for KB gap analysis. */
  | 'help_low_confidence_match'
  /** Concept-first help answer was shown (materials access ≠ outcomes). */
  | 'help_concept_answer'
  /** Flagship module quiz attempt submitted (integrity / analytics). */
  | 'quiz_module_submit'
  /** Heuristic: unusually fast quiz completion vs question count. */
  | 'quiz_suspicious_timing'
  /** Learner confirmed post-failure module review before retry (paired with cooldown). */
  | 'quiz_review_acknowledged'
  /** Cooldown applied after a failed module quiz attempt. */
  | 'quiz_lock_applied'
  /** Elevated copy/context-menu activity during a quiz attempt (deterrence telemetry). */
  | 'quiz_integrity_ui_activity'

export type TeachingSignal = {
  id: string
  createdAtIso: string
  kind: TeachingSignalKind
  /** Small JSON-serializable payload for future analytics pipelines */
  payload: Record<string, string | number | boolean | null>
}
