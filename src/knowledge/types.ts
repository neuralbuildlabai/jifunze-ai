/**
 * Shared knowledge model for training + derived content assets.
 * Versioned JSON — retrieval / LLM layers can attach `sources` later without breaking shape.
 */

import type { ReadinessArchitectureV1 } from './readinessArchitecture'

export const KNOWLEDGE_SPEC_VERSION = 1 as const

export type LearnerLevel = 'beginner' | 'intermediate' | 'advanced'

export type KnowledgeConcept = {
  id: string
  label: string
  /** Plain-language prerequisite concepts (ids) */
  depends_on: string[]
  /** For exam/cert prep callouts */
  exam_relevance?: string
}

export type KnowledgeMisconception = {
  id: string
  myth: string
  correction: string
  related_concept_ids: string[]
}

export type KnowledgeScenario = {
  id: string
  /** Workplace / study situation */
  context: string
  /** What “success” looks like */
  success_criteria: string
  related_concept_ids: string[]
}

export type LessonKnowledgeBlueprint = {
  sort_order: number
  title: string
  /** What this lesson must achieve cognitively */
  learning_intent: string
  concept_ids: string[]
  misconception_ids: string[]
  scenario_ids: string[]
  /** Depth / density multiplier for copy */
  cognitive_load: 'foundational' | 'integrative' | 'synthesis'
}

export type QuizKnowledgeBlueprint = {
  sort_order: number
  /** What competence signal this question probes */
  probes: string
  concept_ids: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  /** 4 options; index 0 = correct in rendered MCQ */
  options: [string, string, string, string]
  explanation: string
  source_lesson_index: number
}

export type ModuleKnowledgeBlueprint = {
  sort_order: number
  title: string
  description: string
  module_goal: string
  why_it_matters: string
  lessons: LessonKnowledgeBlueprint[]
  quiz: {
    title: string
    description: string
    questions: QuizKnowledgeBlueprint[]
  }
}

/**
 * Canonical subject graph + curriculum blueprint. All lesson/quiz text is **derived** from this
 * via {@link renderKnowledgeSpecToSeedModules} (not duplicated prompt chains).
 */
export type TrainingKnowledgeSpec = {
  version: typeof KNOWLEDGE_SPEC_VERSION
  domain: {
    topic: string
    objective: string
    learner_level: LearnerLevel
    duration_label: string | null
    plan_title: string
    /** Explicit prerequisites the learner should already have */
    prerequisites: string[]
  }
  concepts: KnowledgeConcept[]
  misconceptions: KnowledgeMisconception[]
  scenarios: KnowledgeScenario[]
  /** Plan-level revision capsule for UI + downstream assets */
  revision_summary: string
  modules: ModuleKnowledgeBlueprint[]
  /** Revision / spaced practice / exam-prep hooks (optional; additive). */
  readiness_architecture?: ReadinessArchitectureV1
  /** Optional: future RAG / citations */
  metadata_json?: Record<string, unknown>
}

export type DerivedContentAssetType =
  | 'study_notes'
  | 'revision_sheet'
  | 'trainer_guide'
  | 'handout'
  | 'slide_outline'
  | 'faq_sheet'
  | 'educational_brief'
  /** Team / facilitator reinforcement (Part 15) — deterministic derivations + optional insight appendix. */
  | 'refresher_handout'
  | 'manager_coaching_brief'
  | 'facilitator_discussion_guide'
  | 'team_recap_sheet'
