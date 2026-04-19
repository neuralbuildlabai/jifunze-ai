/**
 * In-browser training persistence for demo / no-Supabase E2E (sessionStorage-backed).
 */
import type { LearnerPlacementInput } from '../knowledge/placementTypes'
import type { TrainingKnowledgeSpec } from '../knowledge/types'
import { renderKnowledgeSpecToSeedModules } from '../knowledge/renderKnowledgeSpecToSeed'
import { buildPlanSeedBundleSync } from '../knowledge/pipeline'
import type { IntelligenceSnapshotPayloadV1 } from './learnerIntelligencePayload'
import type { SeedModule } from './seedStructure'
import type {
  LessonProgressRow,
  LessonProgressStatus,
  QuizAttemptRow,
  QuizAttemptStatus,
  TenantMemberRow,
  TrainingAssignmentRow,
  TrainingLessonRow,
  TrainingModuleRow,
  TrainingPlanRow,
  TrainingPlanLearnerPlacementRow,
  TrainingPlanStatus,
  TrainingPlanWithTree,
  TrainingQuizQuestionRow,
  TrainingQuizRow,
  TrainingQuizWithQuestions,
  TrainingLearnerIntelligenceSnapshotRow,
} from './trainingTypes'
import { deriveAssignmentProgress } from './trainingAssignmentStatus'

const STORAGE_KEY = 'jifunze.demo.training.v3'

/** Stable demo user id for a second workspace member (local session only). */
export const DEMO_TEAMMATE_USER_ID = 'a1000000-0000-4000-8000-000000000002'

type DemoState = {
  plans: TrainingPlanRow[]
  modules: TrainingModuleRow[]
  lessons: TrainingLessonRow[]
  quizzes: TrainingQuizRow[]
  questions: TrainingQuizQuestionRow[]
  progress: LessonProgressRow[]
  quizAttempts: QuizAttemptRow[]
  tenantMembers: TenantMemberRow[]
  assignments: TrainingAssignmentRow[]
  /** Key: `${workspaceId}::${planId}` → knowledge spec for intelligence + derivations. */
  knowledgeSpecByWorkspacePlan: Record<string, TrainingKnowledgeSpec>
  placements: TrainingPlanLearnerPlacementRow[]
  intelligenceSnapshots: TrainingLearnerIntelligenceSnapshotRow[]
}

function nowIso(): string {
  return new Date().toISOString()
}

function emptyState(): DemoState {
  return {
    plans: [],
    modules: [],
    lessons: [],
    quizzes: [],
    questions: [],
    progress: [],
    quizAttempts: [],
    tenantMembers: [],
    assignments: [],
    knowledgeSpecByWorkspacePlan: {},
    placements: [],
    intelligenceSnapshots: [],
  }
}

function loadState(): DemoState {
  if (typeof sessionStorage === 'undefined') {
    return emptyState()
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw) as DemoState
    if (!parsed || !Array.isArray(parsed.plans)) {
      return emptyState()
    }
    const p = parsed as Partial<DemoState>
    return {
      plans: parsed.plans,
      modules: Array.isArray(parsed.modules) ? parsed.modules : [],
      lessons: Array.isArray(parsed.lessons) ? parsed.lessons : [],
      quizzes: Array.isArray(parsed.quizzes) ? parsed.quizzes : [],
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      progress: Array.isArray(parsed.progress) ? parsed.progress : [],
      quizAttempts: Array.isArray(parsed.quizAttempts) ? parsed.quizAttempts : [],
      tenantMembers: Array.isArray(p.tenantMembers) ? p.tenantMembers : [],
      assignments: Array.isArray(p.assignments) ? p.assignments : [],
      knowledgeSpecByWorkspacePlan:
        p.knowledgeSpecByWorkspacePlan && typeof p.knowledgeSpecByWorkspacePlan === 'object'
          ? p.knowledgeSpecByWorkspacePlan
          : {},
      placements: Array.isArray(p.placements) ? p.placements : [],
      intelligenceSnapshots: Array.isArray(p.intelligenceSnapshots) ? p.intelligenceSnapshots : [],
    }
  } catch (e) {
    console.error('[JifunzeAI demo training] loadState failed', e)
    return emptyState()
  }
}

function saveState(state: DemoState): void {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.error('[JifunzeAI demo training] saveState failed', e)
  }
}

function appendQuizzesForModules(input: {
  seeds: SeedModule[]
  moduleIds: string[]
  planId: string
  workspaceId: string
}): { quizzes: TrainingQuizRow[]; questions: TrainingQuizQuestionRow[] } {
  const quizzes: TrainingQuizRow[] = []
  const questions: TrainingQuizQuestionRow[] = []
  const t = nowIso()
  input.seeds.forEach((s, i) => {
    const mid = input.moduleIds[i]
    if (!mid) return
    const qid = crypto.randomUUID()
    quizzes.push({
      id: qid,
      training_plan_id: input.planId,
      training_module_id: mid,
      workspace_id: input.workspaceId,
      title: s.quiz.title,
      description: s.quiz.description,
      sort_order: s.quiz.sort_order,
      created_at: t,
      quiz_kind: 'module_checkpoint',
    })
    for (const q of s.quiz.questions) {
      questions.push({
        id: crypto.randomUUID(),
        quiz_id: qid,
        workspace_id: input.workspaceId,
        prompt: q.prompt,
        question_type: q.question_type,
        options_json: q.options_json,
        correct_answer: q.correct_answer,
        sort_order: q.sort_order,
        explanation: q.explanation ?? null,
        difficulty: q.difficulty ?? null,
        source_lesson_id: null,
      })
    }
  })
  return { quizzes, questions }
}

function appendPlanSupplementalQuizzesFromSeed(input: {
  seed: Record<string, unknown>
  planId: string
  workspaceId: string
}): { quizzes: TrainingQuizRow[]; questions: TrainingQuizQuestionRow[] } {
  const arr = input.seed.plan_supplemental_quizzes
  if (!Array.isArray(arr)) return { quizzes: [], questions: [] }
  const quizzes: TrainingQuizRow[] = []
  const questions: TrainingQuizQuestionRow[] = []
  const t = nowIso()
  for (const raw of arr) {
    const dq = raw as Record<string, unknown>
    const qid = crypto.randomUUID()
    const kindRaw = dq.quiz_kind != null ? String(dq.quiz_kind) : ''
    const kind =
      kindRaw === 'recap_checkpoint' || kindRaw === 'mixed_review' || kindRaw === 'exam_practice'
        ? kindRaw
        : 'mixed_review'
    const blueprintRaw = dq.assessment_blueprint_json
    const assessment_blueprint_json =
      blueprintRaw != null && typeof blueprintRaw === 'object'
        ? blueprintRaw
        : blueprintRaw != null && typeof blueprintRaw === 'string'
          ? (() => {
              try {
                return JSON.parse(blueprintRaw) as Record<string, unknown>
              } catch {
                return null
              }
            })()
          : null
    quizzes.push({
      id: qid,
      training_plan_id: input.planId,
      training_module_id: null,
      workspace_id: input.workspaceId,
      title: String(dq.title ?? 'Review'),
      description: dq.description != null ? String(dq.description) : null,
      sort_order: typeof dq.sort_order === 'number' ? dq.sort_order : 100,
      created_at: t,
      quiz_kind: kind,
      ...(assessment_blueprint_json ? { assessment_blueprint_json } : {}),
    })
    const qs = dq.questions
    if (Array.isArray(qs)) {
      for (const qraw of qs) {
        const ques = qraw as Record<string, unknown>
        questions.push({
          id: crypto.randomUUID(),
          quiz_id: qid,
          workspace_id: input.workspaceId,
          prompt: String(ques.prompt ?? ''),
          question_type: String(ques.question_type ?? 'mcq'),
          options_json: ques.options_json ?? [],
          correct_answer: String(ques.correct_answer ?? '0'),
          sort_order: typeof ques.sort_order === 'number' ? ques.sort_order : 0,
          explanation: ques.explanation != null ? String(ques.explanation) : null,
          difficulty: ques.difficulty != null ? String(ques.difficulty) : null,
          source_lesson_id: null,
        })
      }
    }
  }
  return { quizzes, questions }
}

function appendDiagnosticQuizFromSeed(input: {
  seed: Record<string, unknown>
  planId: string
  workspaceId: string
}): { quizzes: TrainingQuizRow[]; questions: TrainingQuizQuestionRow[] } {
  const dq = input.seed.diagnostic_quiz as Record<string, unknown> | undefined
  if (!dq || typeof dq !== 'object') return { quizzes: [], questions: [] }
  const t = nowIso()
  const qid = crypto.randomUUID()
  const quizzes: TrainingQuizRow[] = [
    {
      id: qid,
      training_plan_id: input.planId,
      training_module_id: null,
      workspace_id: input.workspaceId,
      title: String(dq.title ?? 'Diagnostic'),
      description: dq.description != null ? String(dq.description) : null,
      sort_order: typeof dq.sort_order === 'number' ? dq.sort_order : -1,
      created_at: t,
      quiz_kind: 'diagnostic',
    },
  ]
  const questions: TrainingQuizQuestionRow[] = []
  const qs = dq.questions
  if (Array.isArray(qs)) {
    for (const raw of qs) {
      const ques = raw as Record<string, unknown>
      questions.push({
        id: crypto.randomUUID(),
        quiz_id: qid,
        workspace_id: input.workspaceId,
        prompt: String(ques.prompt ?? ''),
        question_type: String(ques.question_type ?? 'mcq'),
        options_json: ques.options_json ?? [],
        correct_answer: String(ques.correct_answer ?? '0'),
        sort_order: typeof ques.sort_order === 'number' ? ques.sort_order : 0,
        explanation: ques.explanation != null ? String(ques.explanation) : null,
        difficulty: ques.difficulty != null ? String(ques.difficulty) : null,
        source_lesson_id: null,
      })
    }
  }
  return { quizzes, questions }
}

function ensureTenantMembers(state: DemoState, workspaceId: string, userId: string): DemoState {
  const others = state.tenantMembers.filter((m) => m.tenant_id !== workspaceId)
  let wsMembers = state.tenantMembers.filter((m) => m.tenant_id === workspaceId)
  if (!wsMembers.some((m) => m.user_id === userId)) {
    wsMembers = [...wsMembers, { tenant_id: workspaceId, user_id: userId, role: 'individual_user' }]
  }
  if (!wsMembers.some((m) => m.user_id === DEMO_TEAMMATE_USER_ID)) {
    wsMembers = [...wsMembers, { tenant_id: workspaceId, user_id: DEMO_TEAMMATE_USER_ID, role: 'team_member' }]
  }
  return { ...state, tenantMembers: [...others, ...wsMembers] }
}

function ensureSeedSample(state: DemoState, workspaceId: string, userId: string): DemoState {
  state = ensureTenantMembers(state, workspaceId, userId)
  if (state.plans.length > 0) {
    saveState(state)
    return state
  }
  const planId = crypto.randomUUID()
  const t = nowIso()
  const bundle = buildPlanSeedBundleSync({
    title: 'Demo: Quickstart practice plan',
    topic: 'Habit building',
    objective: 'Ship one small improvement three times this week.',
    skillLevel: 'beginner',
    durationLabel: 'Multi-module mini-course · self-paced',
    status: 'active',
  })
  const seedPayload = bundle.p_seed
  const plan: TrainingPlanRow = {
    id: planId,
    workspace_id: workspaceId,
    created_by: userId,
    title: 'Demo: Quickstart practice plan',
    topic: 'Habit building',
    objective: 'Ship one small improvement three times this week.',
    skill_level: 'beginner',
    duration_label: 'Multi-module mini-course · self-paced',
    expected_outcomes: typeof seedPayload.expected_outcomes === 'string' ? seedPayload.expected_outcomes : null,
    status: 'active',
    created_at: t,
    updated_at: t,
  }
  const seeds = renderKnowledgeSpecToSeedModules(bundle.knowledgeSpec)
  const modules: TrainingModuleRow[] = []
  const lessons: TrainingLessonRow[] = []
  const moduleIds: string[] = []
  for (const s of seeds) {
    const mid = crypto.randomUUID()
    moduleIds.push(mid)
    modules.push({
      id: mid,
      training_plan_id: planId,
      workspace_id: workspaceId,
      title: s.title,
      description: s.description,
      module_goal: s.module_goal,
      why_it_matters: s.why_it_matters,
      sort_order: s.sort_order,
    })
    for (const L of s.lessons) {
      lessons.push({
        id: crypto.randomUUID(),
        module_id: mid,
        training_plan_id: planId,
        workspace_id: workspaceId,
        title: L.title,
        content: L.content,
        objectives: L.objectives,
        takeaway: L.takeaway,
        lesson_summary: L.lesson_summary,
        practical_example: L.practical_example,
        action_exercise: L.action_exercise,
        reflection_prompt: L.reflection_prompt,
        mistakes_to_avoid: L.mistakes_to_avoid,
        estimated_minutes: L.estimated_minutes ?? null,
        sort_order: L.sort_order,
        practice_bundle: L.practice_bundle ?? null,
      })
    }
  }
  const { quizzes, questions } = appendQuizzesForModules({ seeds, moduleIds, planId, workspaceId })
  const diag = appendDiagnosticQuizFromSeed({ seed: seedPayload, planId, workspaceId })
  const sup = appendPlanSupplementalQuizzesFromSeed({ seed: seedPayload, planId, workspaceId })
  const wsPlanKey = `${workspaceId}::${planId}`
  const nextSpecs = { ...state.knowledgeSpecByWorkspacePlan, [wsPlanKey]: bundle.knowledgeSpec }
  let nextPlacements = state.placements
  if (bundle.placementRecord) {
    const prow: TrainingPlanLearnerPlacementRow = {
      id: crypto.randomUUID(),
      workspace_id: workspaceId,
      training_plan_id: planId,
      user_id: userId,
      self_confidence_1_5: null,
      diagnostic_score_percent: bundle.placementRecord.diagnosticScorePercent,
      recommended_level: bundle.placementRecord.recommendedLevel,
      placement_source: bundle.placementRecord.placementSource,
      foundation_gap_concept_ids: bundle.placementRecord.foundationGapConceptIds as unknown,
      skipped_module_sort_orders: bundle.placementRecord.skippedModuleSortOrders as unknown,
      placement_json: bundle.placementRecord.placementJson as unknown,
      created_at: t,
      updated_at: t,
    }
    nextPlacements = [
      ...state.placements.filter(
        (p) =>
          !(p.workspace_id === workspaceId && p.training_plan_id === planId && p.user_id === userId),
      ),
      prow,
    ]
  }
  const next: DemoState = {
    ...state,
    knowledgeSpecByWorkspacePlan: nextSpecs,
    placements: nextPlacements,
    plans: [plan],
    modules,
    lessons,
    quizzes: [...quizzes, ...diag.quizzes, ...sup.quizzes],
    questions: [...questions, ...diag.questions, ...sup.questions],
    progress: [],
    quizAttempts: [],
  }
  saveState(next)
  return next
}

export function demoListPlans(workspaceId: string, userId: string): TrainingPlanRow[] {
  const s = ensureSeedSample(loadState(), workspaceId, userId)
  return [...s.plans].filter((p) => p.workspace_id === workspaceId).sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
}

export function demoGetPlanTree(planId: string, workspaceId: string, userId: string): TrainingPlanWithTree | null {
  const s = ensureSeedSample(loadState(), workspaceId, userId)
  const plan = s.plans.find((p) => p.id === planId && p.workspace_id === workspaceId)
  if (!plan) return null
  const mods = s.modules
    .filter((m) => m.training_plan_id === planId && m.workspace_id === workspaceId)
    .sort((a, b) => a.sort_order - b.sort_order)
  const lessonsByModule = new Map<string, TrainingLessonRow[]>()
  for (const m of mods) {
    lessonsByModule.set(m.id, [])
  }
  for (const l of s.lessons) {
    if (l.training_plan_id !== planId || l.workspace_id !== workspaceId) continue
    const arr = lessonsByModule.get(l.module_id)
    if (arr) arr.push(l)
  }
  for (const arr of lessonsByModule.values()) {
    arr.sort((a, b) => a.sort_order - b.sort_order)
  }

  const questionsByQuiz = new Map<string, TrainingQuizQuestionRow[]>()
  for (const q of s.quizzes) {
    if (q.training_plan_id !== planId || q.workspace_id !== workspaceId) continue
    questionsByQuiz.set(q.id, [])
  }
  for (const qn of s.questions) {
    if (qn.workspace_id !== workspaceId) continue
    const arr = questionsByQuiz.get(qn.quiz_id)
    if (arr) arr.push(qn)
  }
  for (const arr of questionsByQuiz.values()) {
    arr.sort((a, b) => a.sort_order - b.sort_order)
  }

  const quizByModule = new Map<string, TrainingQuizWithQuestions>()
  const supplementalPlanQuizzes: TrainingQuizWithQuestions[] = []
  let diagnosticQuiz: TrainingQuizWithQuestions | null = null
  for (const q of s.quizzes) {
    if (q.training_plan_id !== planId || q.workspace_id !== workspaceId) continue
    const mid = q.training_module_id
    const kind = q.quiz_kind ?? 'module_checkpoint'
    if (!mid && kind === 'diagnostic') {
      diagnosticQuiz = {
        ...q,
        questions: questionsByQuiz.get(q.id) ?? [],
      }
      continue
    }
    if (!mid && (kind === 'recap_checkpoint' || kind === 'mixed_review' || kind === 'exam_practice')) {
      supplementalPlanQuizzes.push({
        ...q,
        questions: questionsByQuiz.get(q.id) ?? [],
      })
      continue
    }
    if (!mid) continue
    quizByModule.set(mid, {
      ...q,
      questions: questionsByQuiz.get(q.id) ?? [],
    })
  }
  supplementalPlanQuizzes.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

  const modules = mods.map((m) => ({
    ...m,
    lessons: lessonsByModule.get(m.id) ?? [],
    quiz: quizByModule.get(m.id) ?? null,
  }))
  return { plan, diagnostic_quiz: diagnosticQuiz, plan_supplemental_quizzes: supplementalPlanQuizzes, modules }
}

export function demoCreatePlan(input: {
  workspaceId: string
  userId: string
  title: string
  topic: string | null
  objective: string | null
  skillLevel: string | null
  durationLabel: string | null
  status: TrainingPlanStatus
  placement?: LearnerPlacementInput
}): TrainingPlanWithTree {
  let state = loadState()
  state = ensureSeedSample(state, input.workspaceId, input.userId)
  const t = nowIso()
  const planId = crypto.randomUUID()
  const bundle = buildPlanSeedBundleSync({
    title: input.title.trim(),
    topic: input.topic,
    objective: input.objective,
    skillLevel: input.skillLevel,
    durationLabel: input.durationLabel,
    status: input.status,
    placement: input.placement,
  })
  const seedPayload = bundle.p_seed
  const skillFromSeed =
    typeof seedPayload.skill_level === 'string' && seedPayload.skill_level.trim()
      ? seedPayload.skill_level.trim()
      : input.skillLevel?.trim() ?? null
  const plan: TrainingPlanRow = {
    id: planId,
    workspace_id: input.workspaceId,
    created_by: input.userId,
    title: input.title.trim(),
    topic: input.topic?.trim() ?? null,
    objective: input.objective?.trim() ?? null,
    skill_level: skillFromSeed,
    duration_label: input.durationLabel?.trim() ?? null,
    expected_outcomes: typeof seedPayload.expected_outcomes === 'string' ? seedPayload.expected_outcomes : null,
    status: input.status,
    created_at: t,
    updated_at: t,
  }
  const seeds = renderKnowledgeSpecToSeedModules(bundle.knowledgeSpec)
  const modules: TrainingModuleRow[] = []
  const lessons: TrainingLessonRow[] = []
  const moduleIds: string[] = []
  for (const s of seeds) {
    const mid = crypto.randomUUID()
    moduleIds.push(mid)
    modules.push({
      id: mid,
      training_plan_id: planId,
      workspace_id: input.workspaceId,
      title: s.title,
      description: s.description,
      module_goal: s.module_goal,
      why_it_matters: s.why_it_matters,
      sort_order: s.sort_order,
    })
    for (const L of s.lessons) {
      lessons.push({
        id: crypto.randomUUID(),
        module_id: mid,
        training_plan_id: planId,
        workspace_id: input.workspaceId,
        title: L.title,
        content: L.content,
        objectives: L.objectives,
        takeaway: L.takeaway,
        lesson_summary: L.lesson_summary,
        practical_example: L.practical_example,
        action_exercise: L.action_exercise,
        reflection_prompt: L.reflection_prompt,
        mistakes_to_avoid: L.mistakes_to_avoid,
        estimated_minutes: L.estimated_minutes ?? null,
        sort_order: L.sort_order,
        practice_bundle: L.practice_bundle ?? null,
      })
    }
  }
  const { quizzes, questions } = appendQuizzesForModules({
    seeds,
    moduleIds,
    planId,
    workspaceId: input.workspaceId,
  })
  const diag = appendDiagnosticQuizFromSeed({
    seed: seedPayload,
    planId,
    workspaceId: input.workspaceId,
  })
  const sup = appendPlanSupplementalQuizzesFromSeed({
    seed: seedPayload,
    planId,
    workspaceId: input.workspaceId,
  })
  const wsPlanKey = `${input.workspaceId}::${planId}`
  const nextSpecs = { ...state.knowledgeSpecByWorkspacePlan, [wsPlanKey]: bundle.knowledgeSpec }
  let nextPlacements = state.placements
  if (bundle.placementRecord) {
    const prow: TrainingPlanLearnerPlacementRow = {
      id: crypto.randomUUID(),
      workspace_id: input.workspaceId,
      training_plan_id: planId,
      user_id: input.userId,
      self_confidence_1_5: input.placement?.selfConfidence1To5 ?? null,
      diagnostic_score_percent: bundle.placementRecord.diagnosticScorePercent,
      recommended_level: bundle.placementRecord.recommendedLevel,
      placement_source: bundle.placementRecord.placementSource,
      foundation_gap_concept_ids: bundle.placementRecord.foundationGapConceptIds as unknown,
      skipped_module_sort_orders: bundle.placementRecord.skippedModuleSortOrders as unknown,
      placement_json: bundle.placementRecord.placementJson as unknown,
      created_at: t,
      updated_at: t,
    }
    nextPlacements = [
      ...state.placements.filter(
        (p) =>
          !(
            p.workspace_id === input.workspaceId &&
            p.training_plan_id === planId &&
            p.user_id === input.userId
          ),
      ),
      prow,
    ]
  }
  state = {
    ...state,
    knowledgeSpecByWorkspacePlan: nextSpecs,
    placements: nextPlacements,
    plans: [plan, ...state.plans],
    modules: [...state.modules, ...modules],
    lessons: [...state.lessons, ...lessons],
    quizzes: [...state.quizzes, ...quizzes, ...diag.quizzes, ...sup.quizzes],
    questions: [...state.questions, ...questions, ...diag.questions, ...sup.questions],
  }
  saveState(state)
  return demoGetPlanTree(planId, input.workspaceId, input.userId)!
}

export function demoUpsertProgress(input: {
  workspaceId: string
  userId: string
  planId: string
  lessonId: string
  status: LessonProgressStatus
  completedAt: string | null
  practiceState?: unknown | null
}): LessonProgressRow {
  const state = loadState()
  const t = nowIso()
  const idx = state.progress.findIndex(
    (p) =>
      p.workspace_id === input.workspaceId &&
      p.user_id === input.userId &&
      p.lesson_id === input.lessonId,
  )
  const prev = idx >= 0 ? state.progress[idx] : null
  const row: LessonProgressRow = {
    id: idx >= 0 ? state.progress[idx]!.id : crypto.randomUUID(),
    lesson_id: input.lessonId,
    training_plan_id: input.planId,
    workspace_id: input.workspaceId,
    user_id: input.userId,
    status: input.status,
    completed_at: input.completedAt,
    updated_at: t,
    practice_state:
      input.practiceState !== undefined ? input.practiceState : prev?.practice_state ?? null,
  }
  const progress =
    idx >= 0
      ? state.progress.map((p, i) => (i === idx ? row : p))
      : [...state.progress, row]
  const next = { ...state, progress }
  saveState(next)
  demoSyncAssignmentStatus(input.workspaceId, input.userId, input.planId)
  return row
}

export function demoListProgressForPlan(
  workspaceId: string,
  userId: string,
  planId: string,
): LessonProgressRow[] {
  const state = loadState()
  return state.progress.filter(
    (p) => p.workspace_id === workspaceId && p.user_id === userId && p.training_plan_id === planId,
  )
}

export function demoListQuizAttemptsForPlan(
  workspaceId: string,
  userId: string,
  planId: string,
): QuizAttemptRow[] {
  const state = loadState()
  return state.quizAttempts.filter(
    (a) => a.workspace_id === workspaceId && a.user_id === userId && a.training_plan_id === planId,
  )
}

/** All workspace progress rows for a plan (facilitator aggregation). */
export function demoListAllProgressForPlan(workspaceId: string, planId: string): LessonProgressRow[] {
  const state = loadState()
  return state.progress.filter((p) => p.workspace_id === workspaceId && p.training_plan_id === planId)
}

/** All workspace quiz attempts for a plan (facilitator aggregation). */
export function demoListAllQuizAttemptsForPlan(workspaceId: string, planId: string): QuizAttemptRow[] {
  const state = loadState()
  return state.quizAttempts.filter((a) => a.workspace_id === workspaceId && a.training_plan_id === planId)
}

export function demoUpsertQuizAttempt(input: {
  workspaceId: string
  userId: string
  planId: string
  quizId: string
  score: number
  totalQuestions: number
  status: QuizAttemptStatus
  answersJson: unknown
  completedAt: string | null
}): QuizAttemptRow {
  const state = loadState()
  const t = nowIso()
  const idx = state.quizAttempts.findIndex(
    (a) =>
      a.workspace_id === input.workspaceId &&
      a.user_id === input.userId &&
      a.quiz_id === input.quizId,
  )
  const row: QuizAttemptRow = {
    id: idx >= 0 ? state.quizAttempts[idx]!.id : crypto.randomUUID(),
    quiz_id: input.quizId,
    training_plan_id: input.planId,
    workspace_id: input.workspaceId,
    user_id: input.userId,
    score: input.score,
    total_questions: input.totalQuestions,
    status: input.status,
    answers_json: input.answersJson,
    completed_at: input.completedAt,
    created_at: idx >= 0 ? state.quizAttempts[idx]!.created_at : t,
    updated_at: t,
  }
  const quizAttempts =
    idx >= 0
      ? state.quizAttempts.map((a, i) => (i === idx ? row : a))
      : [...state.quizAttempts, row]
  const next = { ...state, quizAttempts }
  saveState(next)
  demoSyncAssignmentStatus(input.workspaceId, input.userId, input.planId)
  return row
}

export function demoListTenantMembers(workspaceId: string, userId: string): TenantMemberRow[] {
  const s = ensureTenantMembers(loadState(), workspaceId, userId)
  saveState(s)
  return s.tenantMembers.filter((m) => m.tenant_id === workspaceId)
}

export function demoListAssignmentsForWorkspace(workspaceId: string, userId: string): TrainingAssignmentRow[] {
  const s = ensureSeedSample(loadState(), workspaceId, userId)
  return s.assignments.filter((a) => a.workspace_id === workspaceId)
}

export function demoListAssignmentsForAssignee(
  workspaceId: string,
  userId: string,
  assigneeId: string,
): TrainingAssignmentRow[] {
  const s = ensureSeedSample(loadState(), workspaceId, userId)
  return s.assignments.filter((a) => a.workspace_id === workspaceId && a.assigned_to === assigneeId)
}

export function demoCreateAssignment(input: {
  workspaceId: string
  actorUserId: string
  planId: string
  assignedTo: string
  dueDate: string | null
}): { data: TrainingAssignmentRow | null; error: string | null } {
  let state = ensureTenantMembers(loadState(), input.workspaceId, input.actorUserId)
  const dup = state.assignments.some(
    (a) =>
      a.workspace_id === input.workspaceId &&
      a.training_plan_id === input.planId &&
      a.assigned_to === input.assignedTo,
  )
  if (dup) {
    return { data: null, error: 'An assignment for this member and plan already exists.' }
  }
  const t = nowIso()
  const row: TrainingAssignmentRow = {
    id: crypto.randomUUID(),
    workspace_id: input.workspaceId,
    training_plan_id: input.planId,
    assigned_to: input.assignedTo,
    assigned_by: input.actorUserId,
    due_date: input.dueDate,
    status: 'assigned',
    created_at: t,
    updated_at: t,
  }
  state = { ...state, assignments: [...state.assignments, row] }
  saveState(state)
  demoSyncAssignmentStatus(input.workspaceId, input.assignedTo, input.planId)
  return { data: row, error: null }
}

export function demoSyncAssignmentStatus(workspaceId: string, assignedTo: string, planId: string): void {
  const state = loadState()
  const idx = state.assignments.findIndex(
    (a) => a.workspace_id === workspaceId && a.training_plan_id === planId && a.assigned_to === assignedTo,
  )
  if (idx < 0) return
  const tree = demoGetPlanTree(planId, workspaceId, assignedTo)
  if (!tree) return
  const prog = demoListProgressForPlan(workspaceId, assignedTo, planId)
  const att = demoListQuizAttemptsForPlan(workspaceId, assignedTo, planId)
  const { effectiveStatus } = deriveAssignmentProgress({
    tree,
    progress: prog,
    attempts: att,
    assignedUserId: assignedTo,
    dueDateIso: state.assignments[idx]!.due_date,
  })
  const row = { ...state.assignments[idx]!, status: effectiveStatus, updated_at: nowIso() }
  const assignments = state.assignments.map((a, i) => (i === idx ? row : a))
  saveState({ ...state, assignments })
}

function workspacePlanCacheKey(workspaceId: string, planId: string): string {
  return `${workspaceId}::${planId}`
}

export function demoGetKnowledgeSpecForPlan(planId: string, workspaceId: string): TrainingKnowledgeSpec | null {
  const state = loadState()
  return state.knowledgeSpecByWorkspacePlan[workspacePlanCacheKey(workspaceId, planId)] ?? null
}

export function demoGetLearnerPlacement(
  workspaceId: string,
  userId: string,
  planId: string,
): TrainingPlanLearnerPlacementRow | null {
  const state = loadState()
  return (
    state.placements.find(
      (p) => p.workspace_id === workspaceId && p.user_id === userId && p.training_plan_id === planId,
    ) ?? null
  )
}

export function demoAppendIntelligenceSnapshot(input: {
  workspaceId: string
  trainingPlanId: string
  userId: string
  quizId: string
  payload: IntelligenceSnapshotPayloadV1
}): void {
  const state = loadState()
  const row: TrainingLearnerIntelligenceSnapshotRow = {
    id: crypto.randomUUID(),
    workspace_id: input.workspaceId,
    training_plan_id: input.trainingPlanId,
    user_id: input.userId,
    trigger_kind: 'checkpoint',
    source_quiz_id: input.quizId,
    payload_json: input.payload,
    created_at: nowIso(),
  }
  saveState({ ...state, intelligenceSnapshots: [...state.intelligenceSnapshots, row] })
}

export function demoListIntelligenceSnapshotsForUserOnPlan(
  workspaceId: string,
  userId: string,
  planId: string,
): TrainingLearnerIntelligenceSnapshotRow[] {
  const state = loadState()
  return state.intelligenceSnapshots
    .filter((s) => s.workspace_id === workspaceId && s.user_id === userId && s.training_plan_id === planId)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
}

export function demoCountIntelligenceSnapshotsForPlan(workspaceId: string, planId: string): number {
  const state = loadState()
  return state.intelligenceSnapshots.filter((s) => s.workspace_id === workspaceId && s.training_plan_id === planId).length
}

/** All snapshots on a plan for this workspace (demo analogue of cohort-visible rows under live RLS). */
export function demoListAllIntelligenceSnapshotsForPlan(
  workspaceId: string,
  planId: string,
): TrainingLearnerIntelligenceSnapshotRow[] {
  const state = loadState()
  return state.intelligenceSnapshots
    .filter((s) => s.workspace_id === workspaceId && s.training_plan_id === planId)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
}

export function demoDisplayMemberLabel(userId: string, selfId: string): string {
  if (userId === selfId) return 'You'
  if (userId === DEMO_TEAMMATE_USER_ID) return 'Demo teammate'
  return `Member ${userId.slice(0, 8)}…`
}
