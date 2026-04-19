/**
 * Weak-area detection and remediation outputs (Part 13).
 * Ontology: docs/jifunze-ontology-and-contracts.md §2 · `contracts/weakAreaOntology.ts`
 * Signals are derived from quiz attempts, practice state, and placement — not ML.
 */

export type WeakSignalSource = 'quiz' | 'practice' | 'placement' | 'diagnostic'

export type WeakConceptSignal = {
  /** Stable key for aggregation (e.g. lesson uuid or concept id). */
  conceptKey: string
  /** Human-readable label (lesson title, concept label, or quiz topic). */
  label: string
  severity: 'high' | 'medium' | 'low'
  sources: WeakSignalSource[]
  /** Wrong checkpoint/diagnostic items tied to this signal (best-effort). */
  quizWrongCount: number
  lessonId?: string | null
  narrative: string
}

export type RepeatedErrorPattern = {
  patternKey: string
  description: string
  occurrences: number
  quizId?: string
  questionIds: string[]
}

export type LowConfidenceSignal = {
  kind: 'self_report' | 'diagnostic_score' | 'checkpoint_struggle'
  detail: string
}

export type LessonRevisitSuggestion = {
  lessonId: string
  lessonTitle: string
  moduleTitle: string
  reason: string
  priority: number
}

export type RemediationRecommendation = {
  title: string
  actions: string[]
  priority: number
}

/** Per-learner structured report used in UI and derived assets. */
export type WeakAreaReport = {
  generatedAtIso: string
  planId: string
  weakConcepts: WeakConceptSignal[]
  errorPatterns: RepeatedErrorPattern[]
  lowConfidence: LowConfidenceSignal[]
  revisitSuggestions: LessonRevisitSuggestion[]
  remediation: RemediationRecommendation[]
}

/** Aggregated across learners (same plan). */
export type TeamWeakAreaRollup = {
  planId: string
  learnerCount: number
  concepts: Array<{ conceptKey: string; label: string; learnerHits: number; quizWrongTotal: number }>
  topRevisitLessonIds: Array<{ lessonId: string; lessonTitle: string; hits: number }>
  summaryLine: string
}
