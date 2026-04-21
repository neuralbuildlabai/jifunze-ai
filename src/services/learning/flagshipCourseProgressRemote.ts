/**
 * Supabase persistence for flagship course progress (authenticated learners).
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import type { FlagshipCourseProgressState, FlagshipModuleQuizRecord } from '../../lib/flagshipCourseProgressDerived'

function parseModuleQuizColumn(raw: unknown): FlagshipCourseProgressState['moduleQuiz'] {
  if (raw == null || typeof raw !== 'object' || Array.isArray(raw)) return undefined
  const o = raw as Record<string, unknown>
  const out: Record<string, FlagshipModuleQuizRecord> = {}
  for (const [mid, v] of Object.entries(o)) {
    if (!v || typeof v !== 'object' || Array.isArray(v)) continue
    const r = v as Record<string, unknown>
    const rec: FlagshipModuleQuizRecord = {}
    if (typeof r.passedAt === 'string') rec.passedAt = r.passedAt
    if (typeof r.lockUntil === 'string') rec.lockUntil = r.lockUntil
    if (typeof r.lastAttemptAt === 'string') rec.lastAttemptAt = r.lastAttemptAt
    if (typeof r.reviewAcknowledgedAt === 'string') rec.reviewAcknowledgedAt = r.reviewAcknowledgedAt
    if (Object.keys(rec).length) out[mid] = rec
  }
  return Object.keys(out).length ? out : undefined
}

export type FlagshipCourseProgressRow = {
  id: string
  user_id: string
  course_slug: string
  completed_session_ids: string[]
  flagged_for_review_session_ids: string[]
  completed_mastery_checkpoint_ids?: string[]
  /** Serialized {@link FlagshipCourseProgressState.moduleQuiz} */
  module_quiz?: Record<string, unknown> | null
  last_active_session_id: string | null
  last_active_at: string | null
  started_at: string | null
  updated_at: string
}

export function flagshipProgressRowToState(row: FlagshipCourseProgressRow): FlagshipCourseProgressState {
  const mastery = row.completed_mastery_checkpoint_ids ?? []
  const moduleQuiz = parseModuleQuizColumn(row.module_quiz)
  return {
    version: 1,
    completedSessionIds: [...(row.completed_session_ids ?? [])],
    flaggedForReviewSessionIds: [...(row.flagged_for_review_session_ids ?? [])],
    ...(mastery.length ? { completedMasteryCheckpointIds: [...mastery] } : {}),
    ...(moduleQuiz ? { moduleQuiz } : {}),
    lastActiveSessionId: row.last_active_session_id ?? undefined,
    lastActiveAt: row.last_active_at ?? undefined,
    startedAt: row.started_at ?? undefined,
  }
}

export function flagshipProgressStateToUpsertPayload(
  userId: string,
  courseSlug: string,
  state: FlagshipCourseProgressState,
): Omit<FlagshipCourseProgressRow, 'id' | 'updated_at'> {
  return {
    user_id: userId,
    course_slug: courseSlug,
    completed_session_ids: state.completedSessionIds,
    flagged_for_review_session_ids: state.flaggedForReviewSessionIds,
    completed_mastery_checkpoint_ids: state.completedMasteryCheckpointIds ?? [],
    module_quiz: state.moduleQuiz ?? {},
    last_active_session_id: state.lastActiveSessionId ?? null,
    last_active_at: state.lastActiveAt ?? null,
    started_at: state.startedAt ?? null,
  }
}

export async function fetchFlagshipProgressRow(
  supabase: SupabaseClient,
  userId: string,
  courseSlug: string,
): Promise<FlagshipCourseProgressRow | null> {
  const { data, error } = await supabase
    .from('flagship_course_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('course_slug', courseSlug)
    .maybeSingle()

  if (error) {
    console.error('[flagship sync] fetch failed', courseSlug, error.message)
    throw error
  }
  return data as FlagshipCourseProgressRow | null
}

export async function upsertFlagshipProgress(
  supabase: SupabaseClient,
  userId: string,
  courseSlug: string,
  state: FlagshipCourseProgressState,
): Promise<void> {
  const payload = flagshipProgressStateToUpsertPayload(userId, courseSlug, state)
  const { error } = await supabase.from('flagship_course_progress').upsert(payload, {
    onConflict: 'user_id,course_slug',
  })
  if (error) {
    console.error('[flagship sync] upsert failed', courseSlug, error.message)
    throw error
  }
}

/** Recent rows for workspace “continue learning” — caller filters to curricula with sessions. */
export async function fetchFlagshipProgressRowsForUser(
  supabase: SupabaseClient,
  userId: string,
  limit = 12,
): Promise<FlagshipCourseProgressRow[]> {
  const { data, error } = await supabase
    .from('flagship_course_progress')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[flagship sync] list failed', error.message)
    throw error
  }
  return (data ?? []) as FlagshipCourseProgressRow[]
}
