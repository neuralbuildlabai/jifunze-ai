import { useCallback, useEffect, useMemo, useState } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useAuth } from '../auth/AuthContext'
import type { TrainingKnowledgeSpec } from '../knowledge/types'
import {
  demoCreateAssignment,
  demoDisplayMemberLabel,
  demoGetPlanTree,
  demoListAssignmentsForAssignee,
  demoListAssignmentsForWorkspace,
  demoListPlans,
  demoListProgressForPlan,
  demoListQuizAttemptsForPlan,
  demoListTenantMembers,
} from './demoTrainingStore'
import {
  sbGetMyTenantRole,
  sbGetPlanTree,
  sbInsertTrainingAssignment,
  sbListAllLessonProgressForPlan,
  sbListAllQuizAttemptsForPlan,
  sbListPlans,
  sbListTenantMembersForWorkspace,
  sbListTrainingAssignmentsForAssignee,
  sbListTrainingAssignmentsForWorkspace,
  wrapUnexpected,
} from './supabaseTraining'
import { deriveAssignmentProgress } from './trainingAssignmentStatus'
import { buildTeamFacilitatorInsight, type TeamFacilitatorInsight } from './facilitatorInsight'
import { buildLearnerWeakAreaReport, formatWeakAreaSummaryLine } from './weakAreaAnalysis'
import type {
  LessonProgressRow,
  QuizAttemptRow,
  TrainingAssignmentRow,
  TrainingAssignmentWithProgress,
  TrainingPlanRow,
  TrainingPlanWithTree,
  TenantMemberRow,
} from './trainingTypes'
import {
  notConfiguredTrainingError,
  validationTrainingError,
  type TrainingError,
} from './trainingErrors'
import { useTrainingWorkspace, type TrainingWorkspaceMode } from './useTrainingWorkspace'
import { isWorkspaceTrainingManagerRole } from './workspaceTrainingAccess'

export function useWorkspaceTrainingRole(): {
  role: string | null
  isManager: boolean
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (mode.kind === 'blocked') {
      setRole(null)
      setError(null)
      setLoading(false)
      return
    }
    if (mode.kind === 'demo') {
      setRole('individual_user')
      setError(null)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const r = await sbGetMyTenantRole(mode.supabase, mode.workspaceId, mode.userId)
      if (r.error) {
        setError(r.error)
        setRole(null)
      } else {
        setRole(r.data)
      }
    } catch (e) {
      console.error('[JifunzeAI team training] useWorkspaceTrainingRole', e)
      setError(wrapUnexpected(e))
      setRole(null)
    } finally {
      setLoading(false)
    }
  }, [mode])

  useEffect(() => {
    void refetch()
  }, [refetch])

  const isManager = useMemo(() => isWorkspaceTrainingManagerRole(role), [role])

  return { role, isManager, loading, error, refetch }
}

export function useTenantMembersList(): {
  members: TenantMemberRow[]
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [members, setMembers] = useState<TenantMemberRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (mode.kind === 'blocked') {
      setMembers([])
      setError(null)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      if (mode.kind === 'demo') {
        setMembers(demoListTenantMembers(mode.workspaceId, mode.userId))
      } else {
        const r = await sbListTenantMembersForWorkspace(mode.supabase, mode.workspaceId)
        if (r.error) {
          setError(r.error)
          setMembers([])
        } else {
          setMembers(r.data as TenantMemberRow[])
        }
      }
    } catch (e) {
      console.error('[JifunzeAI team training] useTenantMembersList', e)
      setError(wrapUnexpected(e))
      setMembers([])
    } finally {
      setLoading(false)
    }
  }, [mode])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { members, loading, error, refetch }
}

async function enrichAssignmentsLive(input: {
  supabase: SupabaseClient
  workspaceId: string
  assignments: TrainingAssignmentRow[]
  plans: TrainingPlanRow[]
}): Promise<TrainingAssignmentWithProgress[]> {
  const { supabase, workspaceId, assignments, plans } = input
  if (assignments.length === 0) return []
  const titleByPlan = new Map(plans.map((p) => [p.id, p.title]))
  const planIds = [...new Set(assignments.map((a) => a.training_plan_id))]
  const trees = new Map<string, TrainingPlanWithTree>()
  for (const pid of planIds) {
    const tr = await sbGetPlanTree(supabase, workspaceId, pid)
    if (!tr.error && tr.data) trees.set(pid, tr.data)
  }
  const { data: progAll, error: pErr } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('workspace_id', workspaceId)
    .in('training_plan_id', planIds)
  if (pErr) {
    console.error('[JifunzeAI team training] bulk lesson_progress load failed', pErr)
  }
  const { data: attAll, error: aErr } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('workspace_id', workspaceId)
    .in('training_plan_id', planIds)
  if (aErr) {
    console.error('[JifunzeAI team training] bulk quiz_attempts load failed', aErr)
  }
  const progRows = progAll ?? []
  const attRows = attAll ?? []
  return assignments.map((a) => {
    const tree = trees.get(a.training_plan_id)
    if (!tree) {
      return {
        ...a,
        planTitle: titleByPlan.get(a.training_plan_id) ?? null,
        progressPercent: 0,
        effectiveStatus: a.status,
        planDone: false,
      }
    }
    const prog = progRows.filter((p) => p.training_plan_id === a.training_plan_id && p.user_id === a.assigned_to)
    const att = attRows.filter((x) => x.training_plan_id === a.training_plan_id && x.user_id === a.assigned_to)
    const { progressPercent, effectiveStatus, planDone } = deriveAssignmentProgress({
      tree,
      progress: prog,
      attempts: att,
      assignedUserId: a.assigned_to,
      dueDateIso: a.due_date,
    })
    let weakAreaSummary: string | null = null
    try {
      const wr = buildLearnerWeakAreaReport({
        tree,
        progress: prog as LessonProgressRow[],
        quizAttempts: att as QuizAttemptRow[],
        placement: null,
        knowledgeSpec: null,
      })
      weakAreaSummary = formatWeakAreaSummaryLine(wr)
    } catch (e) {
      console.error('[JifunzeAI team training] weakAreaSummary failed', e)
    }
    return {
      ...a,
      planTitle: titleByPlan.get(a.training_plan_id) ?? null,
      progressPercent,
      effectiveStatus,
      planDone,
      weakAreaSummary,
    }
  })
}

function enrichAssignmentsDemo(input: {
  workspaceId: string
  assignments: TrainingAssignmentRow[]
  plans: TrainingPlanRow[]
}): TrainingAssignmentWithProgress[] {
  const { workspaceId, assignments, plans } = input
  const titleByPlan = new Map(plans.map((p) => [p.id, p.title]))
  return assignments.map((a) => {
    const tree = demoGetPlanTree(a.training_plan_id, workspaceId, a.assigned_to)
    if (!tree) {
      return {
        ...a,
        planTitle: titleByPlan.get(a.training_plan_id) ?? null,
        progressPercent: 0,
        effectiveStatus: a.status,
        planDone: false,
      }
    }
    const prog = demoListProgressForPlan(workspaceId, a.assigned_to, a.training_plan_id)
    const att = demoListQuizAttemptsForPlan(workspaceId, a.assigned_to, a.training_plan_id)
    const { progressPercent, effectiveStatus, planDone } = deriveAssignmentProgress({
      tree,
      progress: prog,
      attempts: att,
      assignedUserId: a.assigned_to,
      dueDateIso: a.due_date,
    })
    let weakAreaSummary: string | null = null
    try {
      const wr = buildLearnerWeakAreaReport({
        tree,
        progress: prog,
        quizAttempts: att,
        placement: null,
        knowledgeSpec: null,
      })
      weakAreaSummary = formatWeakAreaSummaryLine(wr)
    } catch (e) {
      console.error('[JifunzeAI team training] weakAreaSummary failed (demo)', e)
    }
    return {
      ...a,
      planTitle: titleByPlan.get(a.training_plan_id) ?? null,
      progressPercent,
      effectiveStatus,
      planDone,
      weakAreaSummary,
    }
  })
}

export function useTeamAssignmentsBoard(scope: 'workspace' | 'self'): {
  rows: TrainingAssignmentWithProgress[]
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [rows, setRows] = useState<TrainingAssignmentWithProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (mode.kind === 'blocked') {
      setRows([])
      setError(null)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      let assignments: TrainingAssignmentRow[] = []
      let plans: TrainingPlanRow[] = []
      if (mode.kind === 'demo') {
        plans = demoListPlans(mode.workspaceId, mode.userId)
        assignments =
          scope === 'workspace'
            ? demoListAssignmentsForWorkspace(mode.workspaceId, mode.userId)
            : demoListAssignmentsForAssignee(mode.workspaceId, mode.userId, mode.userId)
        setRows(
          enrichAssignmentsDemo({
            workspaceId: mode.workspaceId,
            assignments,
            plans,
          }),
        )
      } else {
        const pr = await sbListPlans(mode.supabase, mode.workspaceId)
        if (pr.error) {
          setError(pr.error)
          setRows([])
          setLoading(false)
          return
        }
        plans = pr.data
        const ar =
          scope === 'workspace'
            ? await sbListTrainingAssignmentsForWorkspace(mode.supabase, mode.workspaceId)
            : await sbListTrainingAssignmentsForAssignee(mode.supabase, mode.workspaceId, mode.userId)
        if (ar.error) {
          setError(ar.error)
          setRows([])
          setLoading(false)
          return
        }
        assignments = ar.data
        const enriched = await enrichAssignmentsLive({
          supabase: mode.supabase,
          workspaceId: mode.workspaceId,
          assignments,
          plans,
        })
        setRows(enriched)
      }
    } catch (e) {
      console.error('[JifunzeAI team training] useTeamAssignmentsBoard', e)
      setError(wrapUnexpected(e))
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [mode, scope])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { rows, loading, error, refetch }
}

/** Manager/facilitator cohort insight for a single plan (assignees + aggregate weak areas). */
export function useFacilitatorTeamInsight(
  planId: string | undefined,
  tree: TrainingPlanWithTree | null,
  knowledgeSpec: TrainingKnowledgeSpec | null | undefined,
): {
  insight: TeamFacilitatorInsight | null
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [insight, setInsight] = useState<TeamFacilitatorInsight | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (!planId || !tree) {
      setInsight(null)
      setLoading(false)
      setError(null)
      return
    }
    if (mode.kind === 'blocked') {
      setInsight(null)
      setError(notConfiguredTrainingError())
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      if (mode.kind === 'demo') {
        const assign = demoListAssignmentsForWorkspace(mode.workspaceId, mode.userId).filter(
          (a) => a.training_plan_id === planId,
        )
        const learners =
          assign.length > 0
            ? assign.map((a) => ({
                userId: a.assigned_to,
                progress: demoListProgressForPlan(mode.workspaceId, a.assigned_to, planId),
                attempts: demoListQuizAttemptsForPlan(mode.workspaceId, a.assigned_to, planId),
              }))
            : [
                {
                  userId: mode.userId,
                  progress: demoListProgressForPlan(mode.workspaceId, mode.userId, planId),
                  attempts: demoListQuizAttemptsForPlan(mode.workspaceId, mode.userId, planId),
                },
              ]
        setInsight(buildTeamFacilitatorInsight({ tree, learners, knowledgeSpec: knowledgeSpec ?? null }))
        setLoading(false)
        return
      }

      const ar = await sbListTrainingAssignmentsForWorkspace(mode.supabase, mode.workspaceId)
      if (ar.error) {
        setError(ar.error)
        setInsight(null)
        setLoading(false)
        return
      }
      const assign = ar.data.filter((a) => a.training_plan_id === planId)
      const pg = await sbListAllLessonProgressForPlan(mode.supabase, mode.workspaceId, planId)
      const qa = await sbListAllQuizAttemptsForPlan(mode.supabase, mode.workspaceId, planId)
      if (pg.error || qa.error) {
        setError(pg.error ?? qa.error!)
        setInsight(null)
        setLoading(false)
        return
      }

      const userIds =
        assign.length > 0 ? [...new Set(assign.map((a) => a.assigned_to))] : user?.id ? [user.id] : []

      if (!userIds.length) {
        setInsight(null)
        setLoading(false)
        return
      }

      const learners = userIds.map((uid) => ({
        userId: uid,
        progress: pg.data.filter((p) => p.user_id === uid),
        attempts: qa.data.filter((a) => a.user_id === uid),
      }))
      setInsight(buildTeamFacilitatorInsight({ tree, learners, knowledgeSpec: knowledgeSpec ?? null }))
    } catch (e) {
      console.error('[JifunzeAI team training] useFacilitatorTeamInsight', e)
      setError(wrapUnexpected(e))
      setInsight(null)
    } finally {
      setLoading(false)
    }
  }, [planId, tree, knowledgeSpec, mode, user?.id])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { insight, loading, error, refetch }
}

export function memberLabel(userId: string, selfId: string): string {
  return demoDisplayMemberLabel(userId, selfId)
}

export async function createTrainingAssignmentMvp(input: {
  mode: TrainingWorkspaceMode
  planId: string
  assignedTo: string
  dueDate: string | null
}): Promise<{ error: TrainingError | null }> {
  const { mode, planId, assignedTo, dueDate } = input
  if (mode.kind === 'blocked') {
    return { error: notConfiguredTrainingError() }
  }
  if (assignedTo.trim() === '') {
    return { error: validationTrainingError('Choose a team member to assign.') }
  }
  try {
    if (mode.kind === 'demo') {
      const r = demoCreateAssignment({
        workspaceId: mode.workspaceId,
        actorUserId: mode.userId,
        planId,
        assignedTo,
        dueDate,
      })
      if (r.error) return { error: validationTrainingError(r.error) }
      return { error: null }
    }
    const { error } = await sbInsertTrainingAssignment({
      supabase: mode.supabase,
      workspaceId: mode.workspaceId,
      planId,
      assignedTo,
      assignedBy: mode.userId,
      dueDate,
    })
    return { error }
  } catch (e) {
    console.error('[JifunzeAI team training] createTrainingAssignmentMvp', e)
    return { error: wrapUnexpected(e) }
  }
}
