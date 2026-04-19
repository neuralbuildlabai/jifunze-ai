export type TrainingPlanStatus = 'draft' | 'active' | 'completed' | 'archived'

export type LessonProgressStatus = 'not_started' | 'in_progress' | 'completed'

export type QuizAttemptStatus = 'in_progress' | 'completed'

export type TrainingPlanRow = {
  id: string
  workspace_id: string
  created_by: string
  title: string
  topic: string | null
  objective: string | null
  skill_level: string | null
  duration_label: string | null
  /** Rich curriculum: expected learner outcomes (absent on legacy rows). */
  expected_outcomes?: string | null
  status: TrainingPlanStatus
  created_at: string
  updated_at: string
}

export type TrainingModuleRow = {
  id: string
  training_plan_id: string
  workspace_id: string
  title: string
  description: string | null
  module_goal?: string | null
  why_it_matters?: string | null
  sort_order: number
}

export type TrainingLessonRow = {
  id: string
  module_id: string
  training_plan_id: string
  workspace_id: string
  title: string
  content: string
  objectives: string | null
  takeaway: string | null
  lesson_summary?: string | null
  practical_example?: string | null
  action_exercise?: string | null
  reflection_prompt?: string | null
  mistakes_to_avoid?: string | null
  estimated_minutes?: number | null
  sort_order: number
  /** Structured practice loop (nullable for legacy seeded rows without JSON). */
  practice_bundle?: unknown | null
}

export type TrainingQuizRow = {
  id: string
  training_plan_id: string
  training_module_id: string | null
  workspace_id: string
  title: string
  description: string | null
  sort_order: number
  created_at: string
  /** Plan + module quizzes — extended kinds for recap / mixed review / exam-practice architecture. */
  quiz_kind?:
    | 'module_checkpoint'
    | 'diagnostic'
    | 'recap_checkpoint'
    | 'mixed_review'
    | 'exam_practice'
    | string
  /** Optional AssessmentBlueprintV1 JSON — rehearsal metadata (timing/sections/coverage hints). */
  assessment_blueprint_json?: unknown | null
}

export type TrainingQuizQuestionRow = {
  id: string
  quiz_id: string
  workspace_id: string
  prompt: string
  question_type: string
  options_json: unknown
  correct_answer: string
  sort_order: number
  explanation?: string | null
  difficulty?: string | null
  source_lesson_id?: string | null
}

export type QuizAttemptRow = {
  id: string
  quiz_id: string
  training_plan_id: string
  workspace_id: string
  user_id: string
  score: number
  total_questions: number
  status: QuizAttemptStatus
  answers_json: unknown
  completed_at: string | null
  created_at: string
  updated_at: string
}

export type LessonProgressRow = {
  id: string
  lesson_id: string
  training_plan_id: string
  workspace_id: string
  user_id: string
  status: LessonProgressStatus
  completed_at: string | null
  updated_at: string
  practice_state?: unknown | null
}

export type TrainingQuizWithQuestions = TrainingQuizRow & {
  questions: TrainingQuizQuestionRow[]
}

export type TrainingModuleWithContent = TrainingModuleRow & {
  lessons: TrainingLessonRow[]
  quiz: TrainingQuizWithQuestions | null
}

export type TrainingPlanWithTree = {
  plan: TrainingPlanRow
  /** Plan-level diagnostic (optional; not attached to a module). */
  diagnostic_quiz: TrainingQuizWithQuestions | null
  /**
   * Plan-level recap / mixed-topic / exam-practice quizzes (after modules), ordered by `sort_order`.
   * Empty when legacy plans pre-date supplemental seeds.
   */
  plan_supplemental_quizzes: TrainingQuizWithQuestions[]
  modules: TrainingModuleWithContent[]
}

/** Learner placement row (wizard or post-diagnostic). */
export type TrainingPlanLearnerPlacementRow = {
  id: string
  workspace_id: string
  training_plan_id: string
  user_id: string
  self_confidence_1_5: number | null
  diagnostic_score_percent: number | null
  recommended_level: string
  placement_source: 'wizard' | 'diagnostic' | string
  foundation_gap_concept_ids: unknown
  skipped_module_sort_orders: unknown
  placement_json: unknown | null
  created_at: string
  updated_at: string
}

export type TrainingDashboardSummary = {
  plan: TrainingPlanRow | null
  completedCount: number
  totalLessons: number
  completedQuizzes: number
  totalQuizzes: number
  modulesDone: number
  totalModules: number
  planDone: boolean
  nextLesson: TrainingLessonRow | null
  nextQuiz: TrainingQuizRow | null
  resumeHref: string | null
  resumeLabel: string | null
}

export type TenantWorkspaceRole = 'individual_user' | 'team_member' | 'team_admin'

export type TenantMemberRow = {
  tenant_id: string
  user_id: string
  role: TenantWorkspaceRole | string
}

export type TrainingAssignmentStatus = 'assigned' | 'in_progress' | 'completed' | 'overdue'

export type TrainingAssignmentRow = {
  id: string
  workspace_id: string
  training_plan_id: string
  assigned_to: string
  assigned_by: string
  due_date: string | null
  status: TrainingAssignmentStatus
  created_at: string
  updated_at: string
}

/** Admin table row with derived learner progress (computed client-side). */
export type TrainingAssignmentWithProgress = TrainingAssignmentRow & {
  planTitle: string | null
  /** 0–100 aggregate from lessons + checkpoints. */
  progressPercent: number
  /** Derived from lesson/quiz progress + due date (may differ from stored `status`). */
  effectiveStatus: TrainingAssignmentStatus
  planDone: boolean
  /** One-line weak-area heuristic for manager views (optional). */
  weakAreaSummary?: string | null
}

/** Row in `training_plan_knowledge_specs` — `spec_json` matches `TrainingKnowledgeSpec`. */
export type TrainingPlanKnowledgeSpecRow = {
  id: string
  training_plan_id: string
  workspace_id: string
  created_by: string
  spec_json: unknown
  created_at: string
  updated_at: string
}

export type DerivedContentAssetRow = {
  id: string
  workspace_id: string
  created_by: string
  source_training_plan_id: string
  source_module_id: string | null
  source_lesson_id: string | null
  asset_type: string
  audience_level: string | null
  content: string
  metadata_json: unknown | null
  created_at: string
  updated_at: string
}

/** Append-only checkpoint snapshot (`training_learner_intelligence_snapshots`). Payload is versioned JSON — no raw answers. */
export type TrainingLearnerIntelligenceSnapshotRow = {
  id: string
  workspace_id: string
  training_plan_id: string
  user_id: string
  trigger_kind: string
  source_quiz_id: string | null
  payload_json: unknown
  created_at: string
}
