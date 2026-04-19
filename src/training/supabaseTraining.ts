import type { SupabaseClient } from '@supabase/supabase-js'
import type { LearnerPlacementInput } from '../knowledge/placementTypes'
import { isDerivedContentAssetType } from '../knowledge/derivedContentAssetTypes'
import { buildPlanSeedBundleAsync } from '../knowledge/pipeline'
import type {
  DerivedContentAssetRow,
  LessonProgressRow,
  LessonProgressStatus,
  QuizAttemptRow,
  TrainingAssignmentRow,
  TrainingAssignmentStatus,
  TrainingLearnerIntelligenceSnapshotRow,
  TrainingModuleWithContent,
  TrainingPlanKnowledgeSpecRow,
  TrainingPlanLearnerPlacementRow,
  TrainingPlanRow,
  TrainingPlanStatus,
  TrainingPlanWithTree,
  TrainingQuizQuestionRow,
  TrainingQuizWithQuestions,
} from './trainingTypes'
import type { IntelligenceSnapshotPayloadV1 } from './learnerIntelligencePayload'
import { classifyPostgrestError, classifyUnknownError, validationTrainingError, type TrainingError } from './trainingErrors'

export async function sbListPlans(
  supabase: SupabaseClient,
  workspaceId: string,
): Promise<{ data: TrainingPlanRow[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('training_plans')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false })
  if (error) {
    console.error('[JifunzeAI training] list plans failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as TrainingPlanRow[], error: null }
}

export async function sbGetPlanTree(
  supabase: SupabaseClient,
  workspaceId: string,
  planId: string,
): Promise<{ data: TrainingPlanWithTree | null; error: TrainingError | null }> {
  const { data: planRow, error: pErr } = await supabase
    .from('training_plans')
    .select('*')
    .eq('id', planId)
    .eq('workspace_id', workspaceId)
    .maybeSingle()
  if (pErr) {
    console.error('[JifunzeAI training] load plan failed', pErr)
    return { data: null, error: classifyPostgrestError(pErr) }
  }
  if (!planRow) return { data: null, error: null }
  const plan = planRow as TrainingPlanRow

  const { data: modRows, error: mErr } = await supabase
    .from('training_modules')
    .select('*')
    .eq('training_plan_id', planId)
    .eq('workspace_id', workspaceId)
    .order('sort_order', { ascending: true })
  if (mErr) {
    console.error('[JifunzeAI training] load modules failed', mErr)
    return { data: null, error: classifyPostgrestError(mErr) }
  }

  const { data: lesRows, error: lErr } = await supabase
    .from('training_lessons')
    .select('*')
    .eq('training_plan_id', planId)
    .eq('workspace_id', workspaceId)
    .order('sort_order', { ascending: true })
  if (lErr) {
    console.error('[JifunzeAI training] load lessons failed', lErr)
    return { data: null, error: classifyPostgrestError(lErr) }
  }

  const { data: quizRows, error: qErr } = await supabase
    .from('training_quizzes')
    .select('*')
    .eq('training_plan_id', planId)
    .eq('workspace_id', workspaceId)
    .order('sort_order', { ascending: true })
  if (qErr) {
    console.error('[JifunzeAI training] load quizzes failed', qErr)
    return { data: null, error: classifyPostgrestError(qErr) }
  }

  const quizIds = (quizRows ?? []).map((q) => q.id as string)
  let qnRows: TrainingQuizQuestionRow[] = []
  if (quizIds.length > 0) {
    const { data: qn, error: qnErr } = await supabase
      .from('training_quiz_questions')
      .select('*')
      .eq('workspace_id', workspaceId)
      .in('quiz_id', quizIds)
      .order('sort_order', { ascending: true })
    if (qnErr) {
      console.error('[JifunzeAI training] load quiz questions failed', qnErr)
      return { data: null, error: classifyPostgrestError(qnErr) }
    }
    qnRows = (qn ?? []) as TrainingQuizQuestionRow[]
  }

  const questionsByQuiz = new Map<string, TrainingQuizQuestionRow[]>()
  for (const q of quizRows ?? []) {
    questionsByQuiz.set(q.id, [])
  }
  for (const qn of qnRows) {
    const arr = questionsByQuiz.get(qn.quiz_id)
    if (arr) arr.push(qn)
  }
  for (const arr of questionsByQuiz.values()) {
    arr.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  }

  let diagnosticQuiz: TrainingQuizWithQuestions | null = null
  const supplementalPlanQuizzes: TrainingQuizWithQuestions[] = []
  const quizByModuleId = new Map<string, TrainingQuizWithQuestions>()
  for (const q of quizRows ?? []) {
    const row = q as Record<string, unknown>
    const mid = row.training_module_id as string | null
    const kind = (row.quiz_kind as string | undefined) ?? 'module_checkpoint'
    const questions = questionsByQuiz.get(q.id) ?? []
    if (!mid && kind === 'diagnostic') {
      diagnosticQuiz = { ...(q as TrainingQuizWithQuestions), questions }
      continue
    }
    if (
      !mid &&
      (kind === 'recap_checkpoint' || kind === 'mixed_review' || kind === 'exam_practice')
    ) {
      supplementalPlanQuizzes.push({ ...(q as TrainingQuizWithQuestions), questions })
      continue
    }
    if (!mid) continue
    quizByModuleId.set(mid, { ...(q as TrainingQuizWithQuestions), questions })
  }
  supplementalPlanQuizzes.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

  const lessonsByModule = new Map<string, typeof lesRows>()
  for (const m of modRows ?? []) {
    lessonsByModule.set(m.id, [])
  }
  for (const l of lesRows ?? []) {
    const arr = lessonsByModule.get(l.module_id)
    if (arr) arr.push(l)
  }
  for (const arr of lessonsByModule.values()) {
    arr.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  }

  const modules: TrainingModuleWithContent[] = (modRows ?? []).map((m) => ({
    ...(m as TrainingModuleWithContent),
    lessons: lessonsByModule.get(m.id) ?? [],
    quiz: quizByModuleId.get(m.id) ?? null,
  }))

  return {
    data: { plan, diagnostic_quiz: diagnosticQuiz, plan_supplemental_quizzes: supplementalPlanQuizzes, modules },
    error: null,
  }
}

/**
 * One transactional RPC: plan + modules + lessons + module quizzes + questions.
 * Rolls back on any failure (Postgres transaction).
 */
export async function sbCreatePlanWithSeed(input: {
  supabase: SupabaseClient
  workspaceId: string
  userId: string
  title: string
  topic: string | null
  objective: string | null
  skillLevel: string | null
  durationLabel: string | null
  status: TrainingPlanStatus
  placement?: LearnerPlacementInput
}): Promise<{ data: TrainingPlanWithTree | null; error: TrainingError | null }> {
  const { supabase, workspaceId, userId } = input
  const bundle = await buildPlanSeedBundleAsync({
    title: input.title.trim(),
    topic: input.topic?.trim() ?? null,
    objective: input.objective?.trim() ?? null,
    skillLevel: input.skillLevel?.trim() ?? null,
    durationLabel: input.durationLabel?.trim() ?? null,
    status: input.status,
    placement: input.placement,
  })
  const p_seed = bundle.p_seed

  const { data: planId, error: rpcErr } = await supabase.rpc('create_training_plan_from_seed', {
    p_workspace_id: workspaceId,
    p_seed,
  })

  if (rpcErr) {
    console.error('[JifunzeAI training] create_training_plan_from_seed RPC failed', rpcErr)
    return { data: null, error: classifyPostgrestError(rpcErr) }
  }
  if (planId == null || String(planId).trim() === '') {
    console.error('[JifunzeAI training] create_training_plan_from_seed returned no row id')
    return { data: null, error: classifyUnknownError(new Error('Plan creation returned no id')) }
  }

  const pid = String(planId)
  const { error: specErr } = await supabase.from('training_plan_knowledge_specs').insert({
    training_plan_id: pid,
    workspace_id: workspaceId,
    created_by: userId,
    spec_json: bundle.knowledgeSpec as unknown as Record<string, unknown>,
  })
  if (specErr) {
    console.error('[JifunzeAI training] insert training_plan_knowledge_specs failed', specErr)
  }

  if (bundle.placementRecord) {
    const { error: plErr } = await supabase.from('training_plan_learner_placement').insert({
      workspace_id: workspaceId,
      training_plan_id: pid,
      user_id: userId,
      self_confidence_1_5: input.placement?.selfConfidence1To5 ?? null,
      diagnostic_score_percent: bundle.placementRecord.diagnosticScorePercent,
      recommended_level: bundle.placementRecord.recommendedLevel,
      placement_source: bundle.placementRecord.placementSource,
      foundation_gap_concept_ids: bundle.placementRecord.foundationGapConceptIds,
      skipped_module_sort_orders: bundle.placementRecord.skippedModuleSortOrders,
      placement_json: bundle.placementRecord.placementJson,
    })
    if (plErr) {
      console.error('[JifunzeAI training] insert training_plan_learner_placement failed', plErr)
    }
  }

  return sbGetPlanTree(supabase, workspaceId, pid)
}

export async function sbGetLearnerPlacementForUser(
  supabase: SupabaseClient,
  workspaceId: string,
  planId: string,
  userId: string,
): Promise<{ data: TrainingPlanLearnerPlacementRow | null; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('training_plan_learner_placement')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('training_plan_id', planId)
    .eq('user_id', userId)
    .maybeSingle()
  if (error) {
    console.error('[JifunzeAI training] load learner placement failed', error)
    return { data: null, error: classifyPostgrestError(error) }
  }
  return { data: (data ?? null) as TrainingPlanLearnerPlacementRow | null, error: null }
}

export async function sbListProgressForPlan(
  supabase: SupabaseClient,
  workspaceId: string,
  userId: string,
  planId: string,
): Promise<{ data: LessonProgressRow[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('user_id', userId)
    .eq('training_plan_id', planId)
  if (error) {
    console.error('[JifunzeAI training] list progress failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as LessonProgressRow[], error: null }
}

export async function sbListQuizAttemptsForPlan(
  supabase: SupabaseClient,
  workspaceId: string,
  userId: string,
  planId: string,
): Promise<{ data: QuizAttemptRow[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('user_id', userId)
    .eq('training_plan_id', planId)
  if (error) {
    console.error('[JifunzeAI training] list quiz attempts failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as QuizAttemptRow[], error: null }
}

/** All learners’ progress rows for a plan (facilitator / team insight). */
export async function sbListAllLessonProgressForPlan(
  supabase: SupabaseClient,
  workspaceId: string,
  planId: string,
): Promise<{ data: LessonProgressRow[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('training_plan_id', planId)
  if (error) {
    console.error('[JifunzeAI training] list all lesson progress failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as LessonProgressRow[], error: null }
}

/** All learners’ quiz attempts for a plan (facilitator / team insight). */
export async function sbListAllQuizAttemptsForPlan(
  supabase: SupabaseClient,
  workspaceId: string,
  planId: string,
): Promise<{ data: QuizAttemptRow[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('training_plan_id', planId)
  if (error) {
    console.error('[JifunzeAI training] list all quiz attempts failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as QuizAttemptRow[], error: null }
}

export async function sbUpsertLessonProgress(input: {
  supabase: SupabaseClient
  workspaceId: string
  userId: string
  planId: string
  lessonId: string
  status: LessonProgressStatus
  completedAt: string | null
  practiceState?: unknown | null
}): Promise<{ data: LessonProgressRow | null; error: TrainingError | null }> {
  const { supabase, workspaceId, userId, planId, lessonId } = input
  const row = {
    lesson_id: lessonId,
    training_plan_id: planId,
    workspace_id: workspaceId,
    user_id: userId,
    status: input.status,
    completed_at: input.completedAt,
    ...(input.practiceState !== undefined ? { practice_state: input.practiceState } : {}),
    updated_at: new Date().toISOString(),
  }
  const { data, error } = await supabase
    .from('lesson_progress')
    .upsert(row, { onConflict: 'workspace_id,lesson_id,user_id' })
    .select('*')
    .single()
  if (error) {
    console.error('[JifunzeAI training] upsert progress failed', error)
    return { data: null, error: classifyPostgrestError(error) }
  }
  return { data: data as LessonProgressRow, error: null }
}

export async function sbUpsertQuizAttempt(input: {
  supabase: SupabaseClient
  workspaceId: string
  userId: string
  planId: string
  quizId: string
  score: number
  totalQuestions: number
  status: 'in_progress' | 'completed'
  answersJson: unknown
  completedAt: string | null
}): Promise<{ data: QuizAttemptRow | null; error: TrainingError | null }> {
  const { supabase, workspaceId, userId, planId, quizId } = input
  const row = {
    quiz_id: quizId,
    training_plan_id: planId,
    workspace_id: workspaceId,
    user_id: userId,
    score: input.score,
    total_questions: input.totalQuestions,
    status: input.status,
    answers_json: input.answersJson,
    completed_at: input.completedAt,
    updated_at: new Date().toISOString(),
  }
  const { data, error } = await supabase
    .from('quiz_attempts')
    .upsert(row, { onConflict: 'workspace_id,quiz_id,user_id' })
    .select('*')
    .single()
  if (error) {
    console.error('[JifunzeAI training] upsert quiz attempt failed', error)
    return { data: null, error: classifyPostgrestError(error) }
  }
  return { data: data as QuizAttemptRow, error: null }
}

export async function sbUpdatePlanStatus(
  supabase: SupabaseClient,
  workspaceId: string,
  planId: string,
  status: TrainingPlanStatus,
): Promise<{ error: TrainingError | null }> {
  const { error } = await supabase
    .from('training_plans')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', planId)
    .eq('workspace_id', workspaceId)
  if (error) {
    console.error('[JifunzeAI training] update plan status failed', error)
    return { error: classifyPostgrestError(error) }
  }
  return { error: null }
}

export async function sbListTrainingAssignmentsForAssignee(
  supabase: SupabaseClient,
  workspaceId: string,
  userId: string,
): Promise<{ data: TrainingAssignmentRow[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('training_assignments')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('assigned_to', userId)
    .order('created_at', { ascending: false })
  if (error) {
    console.error('[JifunzeAI training] list assignments (assignee) failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as TrainingAssignmentRow[], error: null }
}

export async function sbListTrainingAssignmentsForWorkspace(
  supabase: SupabaseClient,
  workspaceId: string,
): Promise<{ data: TrainingAssignmentRow[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('training_assignments')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false })
  if (error) {
    console.error('[JifunzeAI training] list assignments (workspace) failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as TrainingAssignmentRow[], error: null }
}

export async function sbInsertTrainingAssignment(input: {
  supabase: SupabaseClient
  workspaceId: string
  planId: string
  assignedTo: string
  assignedBy: string
  dueDate: string | null
}): Promise<{ data: TrainingAssignmentRow | null; error: TrainingError | null }> {
  const { supabase, workspaceId, planId, assignedTo, assignedBy } = input
  const row = {
    workspace_id: workspaceId,
    training_plan_id: planId,
    assigned_to: assignedTo,
    assigned_by: assignedBy,
    due_date: input.dueDate,
    status: 'assigned' as TrainingAssignmentStatus,
    updated_at: new Date().toISOString(),
  }
  const { data, error } = await supabase.from('training_assignments').insert(row).select('*').single()
  if (error) {
    console.error('[JifunzeAI training] insert assignment failed', error)
    return { data: null, error: classifyPostgrestError(error) }
  }
  return { data: data as TrainingAssignmentRow, error: null }
}

export async function sbUpdateTrainingAssignmentStatus(input: {
  supabase: SupabaseClient
  workspaceId: string
  assignmentId: string
  status: TrainingAssignmentStatus
}): Promise<{ error: TrainingError | null }> {
  const { supabase, workspaceId, assignmentId, status } = input
  const { error } = await supabase
    .from('training_assignments')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', assignmentId)
    .eq('workspace_id', workspaceId)
  if (error) {
    console.error('[JifunzeAI training] update assignment status failed', error)
    return { error: classifyPostgrestError(error) }
  }
  return { error: null }
}

export async function sbListTenantMembersForWorkspace(
  supabase: SupabaseClient,
  workspaceId: string,
): Promise<{ data: { tenant_id: string; user_id: string; role: string }[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('tenant_members')
    .select('tenant_id, user_id, role')
    .eq('tenant_id', workspaceId)
    .order('role', { ascending: true })
  if (error) {
    console.error('[JifunzeAI training] list tenant members failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as { tenant_id: string; user_id: string; role: string }[], error: null }
}

export async function sbGetMyTenantRole(
  supabase: SupabaseClient,
  workspaceId: string,
  userId: string,
): Promise<{ data: string | null; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('tenant_members')
    .select('role')
    .eq('tenant_id', workspaceId)
    .eq('user_id', userId)
    .maybeSingle()
  if (error) {
    console.error('[JifunzeAI training] load tenant role failed', error)
    return { data: null, error: classifyPostgrestError(error) }
  }
  const row = data as { role?: string } | null
  return { data: row?.role ?? null, error: null }
}

export function wrapUnexpected(e: unknown): TrainingError {
  console.error('[JifunzeAI training] unexpected error', e)
  return classifyUnknownError(e)
}

export async function sbGetKnowledgeSpecRowForPlan(
  supabase: SupabaseClient,
  workspaceId: string,
  planId: string,
): Promise<{ data: TrainingPlanKnowledgeSpecRow | null; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('training_plan_knowledge_specs')
    .select('*')
    .eq('training_plan_id', planId)
    .eq('workspace_id', workspaceId)
    .maybeSingle()
  if (error) {
    console.error('[JifunzeAI training] load knowledge spec failed', error)
    return { data: null, error: classifyPostgrestError(error) }
  }
  return { data: (data ?? null) as TrainingPlanKnowledgeSpecRow | null, error: null }
}

export async function sbInsertDerivedContentAsset(input: {
  supabase: SupabaseClient
  workspaceId: string
  userId: string
  sourceTrainingPlanId: string
  sourceModuleId?: string | null
  sourceLessonId?: string | null
  assetType: string
  audienceLevel?: string | null
  content: string
  metadataJson?: Record<string, unknown> | null
}): Promise<{ data: DerivedContentAssetRow | null; error: TrainingError | null }> {
  if (!isDerivedContentAssetType(input.assetType)) {
    console.error('[JifunzeAI training] sbInsertDerivedContentAsset invalid asset_type', input.assetType)
    return {
      data: null,
      error: validationTrainingError(
        'This asset type is not supported in this app version. Refresh, update, or choose another type from the list.',
      ),
    }
  }
  const { supabase, workspaceId, userId } = input
  const { data, error } = await supabase
    .from('derived_content_assets')
    .insert({
      workspace_id: workspaceId,
      created_by: userId,
      source_training_plan_id: input.sourceTrainingPlanId,
      source_module_id: input.sourceModuleId ?? null,
      source_lesson_id: input.sourceLessonId ?? null,
      asset_type: input.assetType,
      audience_level: input.audienceLevel ?? null,
      content: input.content,
      metadata_json: input.metadataJson ?? null,
    })
    .select('*')
    .maybeSingle()
  if (error) {
    console.error('[JifunzeAI training] insert derived_content_assets failed', error)
    return { data: null, error: classifyPostgrestError(error) }
  }
  return { data: (data ?? null) as DerivedContentAssetRow | null, error: null }
}

export async function sbListDerivedContentAssetsForPlan(
  supabase: SupabaseClient,
  workspaceId: string,
  planId: string,
): Promise<{ data: DerivedContentAssetRow[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('derived_content_assets')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('source_training_plan_id', planId)
    .order('created_at', { ascending: false })
  if (error) {
    console.error('[JifunzeAI training] list derived_content_assets failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as DerivedContentAssetRow[], error: null }
}

export async function sbInsertLearnerIntelligenceSnapshot(input: {
  supabase: SupabaseClient
  workspaceId: string
  userId: string
  trainingPlanId: string
  quizId: string
  payload: IntelligenceSnapshotPayloadV1
}): Promise<{ data: TrainingLearnerIntelligenceSnapshotRow | null; error: TrainingError | null }> {
  const { supabase, workspaceId, userId, trainingPlanId, quizId, payload } = input
  const { data, error } = await supabase
    .from('training_learner_intelligence_snapshots')
    .insert({
      workspace_id: workspaceId,
      training_plan_id: trainingPlanId,
      user_id: userId,
      trigger_kind: 'checkpoint',
      source_quiz_id: quizId,
      payload_json: payload,
    })
    .select('*')
    .maybeSingle()
  if (error) {
    console.error('[JifunzeAI training] insert training_learner_intelligence_snapshots failed', error)
    return { data: null, error: classifyPostgrestError(error) }
  }
  return { data: (data ?? null) as TrainingLearnerIntelligenceSnapshotRow | null, error: null }
}

export async function sbListLearnerIntelligenceSnapshotsForUserOnPlan(
  supabase: SupabaseClient,
  workspaceId: string,
  userId: string,
  planId: string,
  limit = 12,
): Promise<{ data: TrainingLearnerIntelligenceSnapshotRow[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('training_learner_intelligence_snapshots')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('training_plan_id', planId)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) {
    console.error('[JifunzeAI training] list intelligence snapshots failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as TrainingLearnerIntelligenceSnapshotRow[], error: null }
}

/**
 * Rows visible for this plan under RLS: learner sees own snapshots; workspace training managers see cohort rows.
 */
export async function sbListWorkspaceIntelligenceSnapshotsForPlan(
  supabase: SupabaseClient,
  workspaceId: string,
  planId: string,
  limit = 300,
): Promise<{ data: TrainingLearnerIntelligenceSnapshotRow[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('training_learner_intelligence_snapshots')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('training_plan_id', planId)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) {
    console.error('[JifunzeAI training] list workspace intelligence snapshots failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as TrainingLearnerIntelligenceSnapshotRow[], error: null }
}

export async function sbCountLearnerIntelligenceSnapshotsForPlan(
  supabase: SupabaseClient,
  workspaceId: string,
  planId: string,
): Promise<{ count: number; error: TrainingError | null }> {
  const { error, count } = await supabase
    .from('training_learner_intelligence_snapshots')
    .select('*', { count: 'exact', head: true })
    .eq('workspace_id', workspaceId)
    .eq('training_plan_id', planId)
  if (error) {
    console.error('[JifunzeAI training] count intelligence snapshots failed', error)
    return { count: 0, error: classifyPostgrestError(error) }
  }
  return { count: count ?? 0, error: null }
}
