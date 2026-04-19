import type { SupabaseClient } from '@supabase/supabase-js'
import {
  sbGetPlanTree,
  sbListProgressForPlan,
  sbListQuizAttemptsForPlan,
  sbUpdateTrainingAssignmentStatus,
  wrapUnexpected,
} from './supabaseTraining'
import { deriveAssignmentProgress } from './trainingAssignmentStatus'
import type { TrainingError } from './trainingErrors'

/**
 * Best-effort: updates `training_assignments.status` for the current learner + plan when progress changes.
 * Skips silently when no assignment row exists (not an error).
 */
export async function syncAssignmentStatusForLearner(input: {
  supabase: SupabaseClient
  workspaceId: string
  planId: string
  userId: string
}): Promise<{ error: TrainingError | null }> {
  const { supabase, workspaceId, planId, userId } = input
  try {
    const { data: rows, error: aErr } = await supabase
      .from('training_assignments')
      .select('id, due_date, status')
      .eq('workspace_id', workspaceId)
      .eq('training_plan_id', planId)
      .eq('assigned_to', userId)
      .maybeSingle()
    if (aErr) {
      console.error('[JifunzeAI training] sync assignment lookup failed', aErr)
      return { error: null }
    }
    if (!rows) return { error: null }

    const tr = await sbGetPlanTree(supabase, workspaceId, planId)
    if (tr.error || !tr.data) return { error: null }
    const pr = await sbListProgressForPlan(supabase, workspaceId, userId, planId)
    if (pr.error) return { error: null }
    const ar = await sbListQuizAttemptsForPlan(supabase, workspaceId, userId, planId)
    if (ar.error) return { error: null }

    const { effectiveStatus } = deriveAssignmentProgress({
      tree: tr.data,
      progress: pr.data,
      attempts: ar.data,
      assignedUserId: userId,
      dueDateIso: (rows as { due_date?: string | null }).due_date ?? null,
    })
    return sbUpdateTrainingAssignmentStatus({
      supabase,
      workspaceId,
      assignmentId: (rows as { id: string }).id,
      status: effectiveStatus,
    })
  } catch (e) {
    console.error('[JifunzeAI training] syncAssignmentStatusForLearner', e)
    return { error: wrapUnexpected(e) }
  }
}
