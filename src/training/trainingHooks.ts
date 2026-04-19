import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import {
  demoCountIntelligenceSnapshotsForPlan,
  demoCreatePlan,
  demoGetPlanTree,
  demoListIntelligenceSnapshotsForUserOnPlan,
  demoListAllIntelligenceSnapshotsForPlan,
  demoListPlans,
  demoListProgressForPlan,
  demoListQuizAttemptsForPlan,
  demoUpsertProgress,
  demoUpsertQuizAttempt,
} from './demoTrainingStore'
import type { LearnerPlacementInput } from '../knowledge/placementTypes'
import { assertValidKnowledgeSpec } from '../knowledge/validateKnowledgeSpec'
import { buildHeuristicKnowledgeSpec } from '../knowledge/heuristicKnowledgeSpec'
import type { TrainingKnowledgeSpec } from '../knowledge/types'
import {
  sbCountLearnerIntelligenceSnapshotsForPlan,
  sbCreatePlanWithSeed,
  sbGetKnowledgeSpecRowForPlan,
  sbGetPlanTree,
  sbListDerivedContentAssetsForPlan,
  sbListLearnerIntelligenceSnapshotsForUserOnPlan,
  sbListWorkspaceIntelligenceSnapshotsForPlan,
  sbListPlans,
  sbListProgressForPlan,
  sbListQuizAttemptsForPlan,
  sbGetLearnerPlacementForUser,
  sbUpdatePlanStatus,
  sbUpsertLessonProgress,
  sbUpsertQuizAttempt,
  wrapUnexpected,
} from './supabaseTraining'
import type {
  DerivedContentAssetRow,
  LessonProgressRow,
  LessonProgressStatus,
  QuizAttemptRow,
  TrainingLearnerIntelligenceSnapshotRow,
  TrainingPlanLearnerPlacementRow,
  TrainingPlanRow,
  TrainingPlanWithTree,
} from './trainingTypes'
import { notConfiguredTrainingError, type TrainingError } from './trainingErrors'
import { syncAssignmentStatusForLearner } from './trainingAssignmentSync'
import { isPlanComplete } from './trainingProgress'
import { buildDashboardSummary, EMPTY_TRAINING_DASHBOARD_SUMMARY } from './trainingResume'
import { persistLearnerIntelligenceAfterQuizCheckpoint } from './learnerIntelligencePersistence'
import { useTrainingWorkspace, type TrainingWorkspaceMode } from './useTrainingWorkspace'

export type TrainingPlanDetailSnapshot = {
  tree: TrainingPlanWithTree | null
  progress: LessonProgressRow[]
  quizAttempts: QuizAttemptRow[]
}

export function useTrainingPlansList(): {
  plans: TrainingPlanRow[]
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [plans, setPlans] = useState<TrainingPlanRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (mode.kind === 'blocked') {
      setPlans([])
      setError(notConfiguredTrainingError())
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      if (mode.kind === 'demo') {
        setPlans(demoListPlans(mode.workspaceId, mode.userId))
      } else {
        const { data, error: e } = await sbListPlans(mode.supabase, mode.workspaceId)
        if (e) {
          setError(e)
          setPlans([])
        } else {
          setPlans(data)
        }
      }
    } catch (e) {
      console.error('[JifunzeAI training] useTrainingPlansList', e)
      setError(wrapUnexpected(e))
      setPlans([])
    } finally {
      setLoading(false)
    }
  }, [mode])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { plans, loading, error, refetch }
}

export function useTrainingPlanDetail(planId: string | undefined): {
  tree: TrainingPlanWithTree | null
  loading: boolean
  error: TrainingError | null
  progress: LessonProgressRow[]
  quizAttempts: QuizAttemptRow[]
  refetch: () => Promise<TrainingPlanDetailSnapshot | null>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [tree, setTree] = useState<TrainingPlanWithTree | null>(null)
  const [progress, setProgress] = useState<LessonProgressRow[]>([])
  const [quizAttempts, setQuizAttempts] = useState<QuizAttemptRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async (): Promise<TrainingPlanDetailSnapshot | null> => {
    if (!planId) {
      setTree(null)
      setProgress([])
      setQuizAttempts([])
      setLoading(false)
      setError(null)
      return null
    }
    if (mode.kind === 'blocked') {
      setTree(null)
      setProgress([])
      setQuizAttempts([])
      setError(notConfiguredTrainingError())
      setLoading(false)
      return null
    }
    setLoading(true)
    setError(null)
    try {
      if (mode.kind === 'demo') {
        const t = demoGetPlanTree(planId, mode.workspaceId, mode.userId)
        const prog = demoListProgressForPlan(mode.workspaceId, mode.userId, planId)
        const attempts = demoListQuizAttemptsForPlan(mode.workspaceId, mode.userId, planId)
        setTree(t)
        setProgress(prog)
        setQuizAttempts(attempts)
        return { tree: t, progress: prog, quizAttempts: attempts }
      }
      const { data, error: e } = await sbGetPlanTree(mode.supabase, mode.workspaceId, planId)
      if (e) {
        setError(e)
        setTree(null)
        setProgress([])
        setQuizAttempts([])
        return null
      }
      if (!data) {
        setTree(null)
        setProgress([])
        setQuizAttempts([])
        return { tree: null, progress: [], quizAttempts: [] }
      }
      setTree(data)
      const pr = await sbListProgressForPlan(mode.supabase, mode.workspaceId, mode.userId, planId)
      if (pr.error) {
        setError(pr.error)
        setProgress([])
        setQuizAttempts([])
        return null
      }
      const ar = await sbListQuizAttemptsForPlan(mode.supabase, mode.workspaceId, mode.userId, planId)
      if (ar.error) {
        setError(ar.error)
        setProgress(pr.data)
        setQuizAttempts([])
        return null
      }
      setProgress(pr.data)
      setQuizAttempts(ar.data)
      return { tree: data, progress: pr.data, quizAttempts: ar.data }
    } catch (e) {
      console.error('[JifunzeAI training] useTrainingPlanDetail', e)
      setError(wrapUnexpected(e))
      setTree(null)
      setProgress([])
      setQuizAttempts([])
      return null
    } finally {
      setLoading(false)
    }
  }, [mode, planId])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { tree, loading, error, progress, quizAttempts, refetch }
}

function heuristicSpecFromPlan(plan: TrainingPlanRow): TrainingKnowledgeSpec {
  return buildHeuristicKnowledgeSpec({
    planTitle: plan.title,
    topic: plan.topic,
    objective: plan.objective,
    skillLevel: plan.skill_level,
    durationLabel: plan.duration_label,
  })
}

/**
 * Knowledge graph for the plan: persisted row when present; otherwise heuristic from plan fields (legacy rows).
 */
export function useTrainingPlanKnowledgeSpec(
  planId: string | undefined,
  tree: TrainingPlanWithTree | null,
): {
  spec: TrainingKnowledgeSpec | null
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [spec, setSpec] = useState<TrainingKnowledgeSpec | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (!planId || !tree) {
      setSpec(null)
      setLoading(false)
      setError(null)
      return
    }
    if (mode.kind === 'blocked') {
      setSpec(null)
      setError(notConfiguredTrainingError())
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      if (mode.kind === 'demo') {
        setSpec(heuristicSpecFromPlan(tree.plan))
        return
      }
      const { data: row, error: e } = await sbGetKnowledgeSpecRowForPlan(mode.supabase, mode.workspaceId, planId)
      if (e) {
        setError(e)
        setSpec(null)
        return
      }
      if (row?.spec_json && typeof row.spec_json === 'object') {
        try {
          assertValidKnowledgeSpec(row.spec_json as TrainingKnowledgeSpec)
          setSpec(row.spec_json as TrainingKnowledgeSpec)
          return
        } catch (parseErr) {
          console.error('[JifunzeAI training] invalid stored knowledge spec', parseErr)
        }
      }
      setSpec(heuristicSpecFromPlan(tree.plan))
    } catch (err) {
      console.error('[JifunzeAI training] useTrainingPlanKnowledgeSpec', err)
      setError(wrapUnexpected(err))
      setSpec(null)
    } finally {
      setLoading(false)
    }
  }, [mode, planId, tree])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { spec, loading, error, refetch }
}

export function useDerivedContentAssetsForPlan(planId: string | undefined): {
  assets: DerivedContentAssetRow[]
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [assets, setAssets] = useState<DerivedContentAssetRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (!planId) {
      setAssets([])
      setLoading(false)
      setError(null)
      return
    }
    if (mode.kind === 'blocked') {
      setAssets([])
      setError(notConfiguredTrainingError())
      setLoading(false)
      return
    }
    if (mode.kind === 'demo') {
      setAssets([])
      setError(null)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const { data, error: e } = await sbListDerivedContentAssetsForPlan(mode.supabase, mode.workspaceId, planId)
      if (e) {
        setError(e)
        setAssets([])
        return
      }
      setAssets(data)
    } catch (err) {
      console.error('[JifunzeAI training] useDerivedContentAssetsForPlan', err)
      setError(wrapUnexpected(err))
      setAssets([])
    } finally {
      setLoading(false)
    }
  }, [mode, planId])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { assets, loading, error, refetch }
}

export function useLearnerPlacementForPlan(planId: string | undefined): {
  placement: TrainingPlanLearnerPlacementRow | null
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [placement, setPlacement] = useState<TrainingPlanLearnerPlacementRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (!planId || !user?.id) {
      setPlacement(null)
      setLoading(false)
      setError(null)
      return
    }
    if (mode.kind === 'blocked') {
      setPlacement(null)
      setError(notConfiguredTrainingError())
      setLoading(false)
      return
    }
    if (mode.kind === 'demo') {
      setPlacement(null)
      setError(null)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const { data, error: e } = await sbGetLearnerPlacementForUser(
        mode.supabase,
        mode.workspaceId,
        planId,
        user.id,
      )
      if (e) {
        setError(e)
        setPlacement(null)
        return
      }
      setPlacement(data)
    } catch (err) {
      console.error('[JifunzeAI training] useLearnerPlacementForPlan', err)
      setError(wrapUnexpected(err))
      setPlacement(null)
    } finally {
      setLoading(false)
    }
  }, [mode, planId, user?.id])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { placement, loading, error, refetch }
}

export function useLearnerIntelligenceOnPlan(planId: string | undefined): {
  snapshots: TrainingLearnerIntelligenceSnapshotRow[]
  /** Total snapshots visible for this plan (your rows as learner; all cohort rows when manager policy applies). */
  planSignalCount: number
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [snapshots, setSnapshots] = useState<TrainingLearnerIntelligenceSnapshotRow[]>([])
  const [planSignalCount, setPlanSignalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (!planId || !user?.id) {
      setSnapshots([])
      setPlanSignalCount(0)
      setLoading(false)
      setError(null)
      return
    }
    if (mode.kind === 'blocked') {
      setSnapshots([])
      setPlanSignalCount(0)
      setError(notConfiguredTrainingError())
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      if (mode.kind === 'demo') {
        setSnapshots(demoListIntelligenceSnapshotsForUserOnPlan(mode.workspaceId, mode.userId, planId))
        setPlanSignalCount(demoCountIntelligenceSnapshotsForPlan(mode.workspaceId, planId))
        setLoading(false)
        return
      }
      const [lr, lc] = await Promise.all([
        sbListLearnerIntelligenceSnapshotsForUserOnPlan(mode.supabase, mode.workspaceId, user.id, planId, 12),
        sbCountLearnerIntelligenceSnapshotsForPlan(mode.supabase, mode.workspaceId, planId),
      ])
      if (lr.error) {
        setError(lr.error)
        setSnapshots([])
        setPlanSignalCount(0)
        setLoading(false)
        return
      }
      if (lc.error) {
        setError(lc.error)
        setSnapshots([])
        setPlanSignalCount(0)
        setLoading(false)
        return
      }
      setSnapshots(lr.data)
      setPlanSignalCount(lc.count)
    } catch (e) {
      console.error('[JifunzeAI training] useLearnerIntelligenceOnPlan', e)
      setError(wrapUnexpected(e))
      setSnapshots([])
      setPlanSignalCount(0)
    } finally {
      setLoading(false)
    }
  }, [mode, planId, user?.id])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { snapshots, planSignalCount, loading, error, refetch }
}

/**
 * Snapshots for a plan as allowed by RLS (own rows for learners; cohort rows for workspace training managers).
 * Use for aggregate weak-label patterns only — never for per-learner drilldown without an explicit product decision.
 */
export function useWorkspaceIntelligenceSnapshotsForPlan(planId: string | undefined): {
  snapshots: TrainingLearnerIntelligenceSnapshotRow[]
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [snapshots, setSnapshots] = useState<TrainingLearnerIntelligenceSnapshotRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (!planId || !user?.id) {
      setSnapshots([])
      setLoading(false)
      setError(null)
      return
    }
    if (mode.kind === 'blocked') {
      setSnapshots([])
      setError(notConfiguredTrainingError())
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      if (mode.kind === 'demo') {
        setSnapshots(demoListAllIntelligenceSnapshotsForPlan(mode.workspaceId, planId))
        setLoading(false)
        return
      }
      const r = await sbListWorkspaceIntelligenceSnapshotsForPlan(mode.supabase, mode.workspaceId, planId)
      if (r.error) {
        setError(r.error)
        setSnapshots([])
        setLoading(false)
        return
      }
      setSnapshots(r.data)
    } catch (e) {
      console.error('[JifunzeAI training] useWorkspaceIntelligenceSnapshotsForPlan', e)
      setError(wrapUnexpected(e))
      setSnapshots([])
    } finally {
      setLoading(false)
    }
  }, [mode, planId, user?.id])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { snapshots, loading, error, refetch }
}

export function useTrainingDashboardSummary(): {
  summary: ReturnType<typeof buildDashboardSummary>
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [summary, setSummary] = useState<ReturnType<typeof buildDashboardSummary>>(
    EMPTY_TRAINING_DASHBOARD_SUMMARY,
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (mode.kind === 'blocked') {
      setSummary(EMPTY_TRAINING_DASHBOARD_SUMMARY)
      setError(notConfiguredTrainingError())
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      let plans: TrainingPlanRow[] = []
      if (mode.kind === 'demo') {
        plans = demoListPlans(mode.workspaceId, mode.userId)
      } else {
        const r = await sbListPlans(mode.supabase, mode.workspaceId)
        if (r.error) {
          setError(r.error)
          setLoading(false)
          return
        }
        plans = r.data
      }
      const primary = plans.find((p) => p.status === 'active') ?? plans[0] ?? null
      if (!primary) {
        setSummary(EMPTY_TRAINING_DASHBOARD_SUMMARY)
        setLoading(false)
        return
      }
      let tree: TrainingPlanWithTree | null = null
      let prog: LessonProgressRow[] = []
      let attempts: QuizAttemptRow[] = []
      if (mode.kind === 'demo') {
        tree = demoGetPlanTree(primary.id, mode.workspaceId, mode.userId)
        prog = demoListProgressForPlan(mode.workspaceId, mode.userId, primary.id)
        attempts = demoListQuizAttemptsForPlan(mode.workspaceId, mode.userId, primary.id)
      } else {
        const tr = await sbGetPlanTree(mode.supabase, mode.workspaceId, primary.id)
        if (tr.error) {
          setError(tr.error)
          setLoading(false)
          return
        }
        tree = tr.data
        const pr = await sbListProgressForPlan(
          mode.supabase,
          mode.workspaceId,
          mode.userId,
          primary.id,
        )
        if (pr.error) {
          setError(pr.error)
          setLoading(false)
          return
        }
        prog = pr.data
        const ar = await sbListQuizAttemptsForPlan(
          mode.supabase,
          mode.workspaceId,
          mode.userId,
          primary.id,
        )
        if (ar.error) {
          setError(ar.error)
          setLoading(false)
          return
        }
        attempts = ar.data
      }
      setSummary(
        buildDashboardSummary({
          plans,
          tree,
          progress: prog,
          attempts,
        }),
      )
    } catch (e) {
      console.error('[JifunzeAI training] useTrainingDashboardSummary', e)
      setError(wrapUnexpected(e))
    } finally {
      setLoading(false)
    }
  }, [mode])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { summary, loading, error, refetch }
}

export async function createTrainingPlanMvp(input: {
  mode: TrainingWorkspaceMode
  title: string
  topic: string | null
  objective: string | null
  skillLevel: string | null
  durationLabel: string | null
  placement?: LearnerPlacementInput
}): Promise<{ planId: string | null; error: TrainingError | null }> {
  const { mode } = input
  if (mode.kind === 'blocked') {
    return { planId: null, error: notConfiguredTrainingError() }
  }
  try {
    if (mode.kind === 'demo') {
      const tree = demoCreatePlan({
        workspaceId: mode.workspaceId,
        userId: mode.userId,
        title: input.title,
        topic: input.topic,
        objective: input.objective,
        skillLevel: input.skillLevel,
        durationLabel: input.durationLabel,
        status: 'active',
        placement: input.placement,
      })
      return { planId: tree.plan.id, error: null }
    }
    const { data, error } = await sbCreatePlanWithSeed({
      supabase: mode.supabase,
      workspaceId: mode.workspaceId,
      userId: mode.userId,
      title: input.title,
      topic: input.topic,
      objective: input.objective,
      skillLevel: input.skillLevel,
      durationLabel: input.durationLabel,
      status: 'active',
      placement: input.placement,
    })
    if (error) return { planId: null, error }
    return { planId: data?.plan.id ?? null, error: null }
  } catch (e) {
    console.error('[JifunzeAI training] createTrainingPlanMvp', e)
    return { planId: null, error: wrapUnexpected(e) }
  }
}

export async function setLessonProgressMvp(input: {
  mode: TrainingWorkspaceMode
  planId: string
  lessonId: string
  status: LessonProgressStatus
  completedAt: string | null
  practiceState?: unknown | null
}): Promise<{ error: TrainingError | null }> {
  const { mode, planId, lessonId } = input
  if (mode.kind === 'blocked') {
    return { error: notConfiguredTrainingError() }
  }
  try {
    if (mode.kind === 'demo') {
      demoUpsertProgress({
        workspaceId: mode.workspaceId,
        userId: mode.userId,
        planId,
        lessonId,
        status: input.status,
        completedAt: input.completedAt,
        practiceState: input.practiceState,
      })
      return { error: null }
    }
    const { error } = await sbUpsertLessonProgress({
      supabase: mode.supabase,
      workspaceId: mode.workspaceId,
      userId: mode.userId,
      planId,
      lessonId,
      status: input.status,
      completedAt: input.completedAt,
      practiceState: input.practiceState,
    })
    if (error) return { error }
    const sync = await syncAssignmentStatusForLearner({
      supabase: mode.supabase,
      workspaceId: mode.workspaceId,
      planId,
      userId: mode.userId,
    })
    if (sync.error) {
      console.error('[JifunzeAI training] assignment sync after lesson progress failed', sync.error)
    }
    return { error: null }
  } catch (e) {
    console.error('[JifunzeAI training] setLessonProgressMvp', e)
    return { error: wrapUnexpected(e) }
  }
}

/**
 * Persists a checkpoint attempt. Score is number of correct answers (MVP: pass = all correct).
 * Live path may set plan status to `completed` when the full tree is done.
 */
export async function submitQuizCheckpointMvp(input: {
  mode: TrainingWorkspaceMode
  planId: string
  quizId: string
  totalQuestions: number
  score: number
  answersJson: unknown
}): Promise<{ error: TrainingError | null }> {
  const { mode, planId, quizId } = input
  if (mode.kind === 'blocked') {
    return { error: notConfiguredTrainingError() }
  }
  const total = input.totalQuestions
  const passed = total > 0 && input.score >= total
  const completedAt = passed ? new Date().toISOString() : null
  try {
    if (mode.kind === 'demo') {
      demoUpsertQuizAttempt({
        workspaceId: mode.workspaceId,
        userId: mode.userId,
        planId,
        quizId,
        score: input.score,
        totalQuestions: total,
        status: 'completed',
        answersJson: input.answersJson,
        completedAt,
      })
      await persistLearnerIntelligenceAfterQuizCheckpoint({
        mode,
        planId,
        quizId,
        quizScore: input.score,
        quizTotal: total,
      })
      return { error: null }
    }
    const { error } = await sbUpsertQuizAttempt({
      supabase: mode.supabase,
      workspaceId: mode.workspaceId,
      userId: mode.userId,
      planId,
      quizId,
      score: input.score,
      totalQuestions: total,
      status: 'completed',
      answersJson: input.answersJson,
      completedAt,
    })
    if (error) return { error }
    await persistLearnerIntelligenceAfterQuizCheckpoint({
      mode,
      planId,
      quizId,
      quizScore: input.score,
      quizTotal: total,
    })
    const sync = await syncAssignmentStatusForLearner({
      supabase: mode.supabase,
      workspaceId: mode.workspaceId,
      planId,
      userId: mode.userId,
    })
    if (sync.error) {
      console.error('[JifunzeAI training] assignment sync after quiz attempt failed', sync.error)
    }
    const tr = await sbGetPlanTree(mode.supabase, mode.workspaceId, planId)
    if (tr.error || !tr.data) return { error: null }
    const pr = await sbListProgressForPlan(mode.supabase, mode.workspaceId, mode.userId, planId)
    if (pr.error) return { error: null }
    const ar = await sbListQuizAttemptsForPlan(mode.supabase, mode.workspaceId, mode.userId, planId)
    if (ar.error) return { error: null }
    if (isPlanComplete(tr.data, pr.data, ar.data)) {
      const u = await sbUpdatePlanStatus(mode.supabase, mode.workspaceId, planId, 'completed')
      return { error: u.error }
    }
    return { error: null }
  } catch (e) {
    console.error('[JifunzeAI training] submitQuizCheckpointMvp', e)
    return { error: wrapUnexpected(e) }
  }
}
