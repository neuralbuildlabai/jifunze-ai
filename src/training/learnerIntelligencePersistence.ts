/**
 * Persist compact learner intelligence after meaningful checkpoints (live + demo).
 */
import type { TrainingKnowledgeSpec } from '../knowledge/types'
import type { TrainingWorkspaceMode } from './useTrainingWorkspace'
import {
  demoAppendIntelligenceSnapshot,
  demoGetKnowledgeSpecForPlan,
  demoGetLearnerPlacement,
  demoGetPlanTree,
  demoListProgressForPlan,
  demoListQuizAttemptsForPlan,
} from './demoTrainingStore'
import { buildIntelligenceSnapshotPayloadV1 } from './learnerIntelligencePayload'
import {
  sbGetKnowledgeSpecRowForPlan,
  sbGetLearnerPlacementForUser,
  sbGetPlanTree,
  sbInsertLearnerIntelligenceSnapshot,
  sbListQuizAttemptsForPlan,
  sbListProgressForPlan,
} from './supabaseTraining'
import type { TrainingPlanKnowledgeSpecRow } from './trainingTypes'

function parseKnowledgeSpec(row: TrainingPlanKnowledgeSpecRow | null): TrainingKnowledgeSpec | null {
  if (!row?.spec_json || typeof row.spec_json !== 'object') return null
  return row.spec_json as TrainingKnowledgeSpec
}

export async function persistLearnerIntelligenceAfterQuizCheckpoint(input: {
  mode: TrainingWorkspaceMode
  planId: string
  quizId: string
  quizScore: number
  quizTotal: number
}): Promise<void> {
  const { mode, planId, quizId, quizScore, quizTotal } = input
  if (mode.kind === 'blocked') return

  try {
    if (mode.kind === 'demo') {
      const tree = demoGetPlanTree(planId, mode.workspaceId, mode.userId)
      if (!tree) return
      const progress = demoListProgressForPlan(mode.workspaceId, mode.userId, planId)
      const quizAttempts = demoListQuizAttemptsForPlan(mode.workspaceId, mode.userId, planId)
      const placement = demoGetLearnerPlacement(mode.workspaceId, mode.userId, planId)
      const knowledgeSpec = demoGetKnowledgeSpecForPlan(planId, mode.workspaceId)
      const payload = buildIntelligenceSnapshotPayloadV1({
        tree,
        progress,
        quizAttempts,
        placement,
        knowledgeSpec,
        quizId,
        quizScore,
        quizTotal,
      })
      demoAppendIntelligenceSnapshot({
        workspaceId: mode.workspaceId,
        trainingPlanId: planId,
        userId: mode.userId,
        quizId,
        payload,
      })
      return
    }

    const tr = await sbGetPlanTree(mode.supabase, mode.workspaceId, planId)
    if (tr.error || !tr.data) return
    const pr = await sbListProgressForPlan(mode.supabase, mode.workspaceId, mode.userId, planId)
    if (pr.error) return
    const ar = await sbListQuizAttemptsForPlan(mode.supabase, mode.workspaceId, mode.userId, planId)
    if (ar.error) return
    const pl = await sbGetLearnerPlacementForUser(mode.supabase, mode.workspaceId, mode.userId, planId)
    if (pl.error) return
    const ks = await sbGetKnowledgeSpecRowForPlan(mode.supabase, mode.workspaceId, planId)
    if (ks.error) return

    const payload = buildIntelligenceSnapshotPayloadV1({
      tree: tr.data,
      progress: pr.data,
      quizAttempts: ar.data,
      placement: pl.data,
      knowledgeSpec: parseKnowledgeSpec(ks.data),
      quizId,
      quizScore,
      quizTotal,
    })

    const ins = await sbInsertLearnerIntelligenceSnapshot({
      supabase: mode.supabase,
      workspaceId: mode.workspaceId,
      userId: mode.userId,
      trainingPlanId: planId,
      quizId,
      payload,
    })
    if (ins.error) {
      console.error('[JifunzeAI training] persistLearnerIntelligenceAfterQuizCheckpoint insert failed', ins.error)
    }
  } catch (e) {
    console.error('[JifunzeAI training] persistLearnerIntelligenceAfterQuizCheckpoint', e)
  }
}
