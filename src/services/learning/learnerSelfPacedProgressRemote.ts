/**
 * Supabase persistence for self-paced / interactive starter progress
 * (`public.learner_self_paced_progress`).
 */

import type { SupabaseClient } from '@supabase/supabase-js'

export type LearnerSelfPacedStatus =
  | 'not_started'
  | 'enrolled'
  | 'in_progress'
  | 'completed'
  | 'certificate_eligible'
  | 'certified'

export type LearnerSelfPacedProgressRow = {
  id: string
  user_id: string
  course_slug: string
  current_module_slug: string | null
  current_session_slug: string | null
  current_day_slug: string | null
  last_opened_at: string | null
  last_activity_at: string | null
  last_completed_module_slug: string | null
  last_completed_session_slug: string | null
  last_completed_day_slug: string | null
  completed_modules: string[]
  completed_sessions: string[]
  completed_days: string[]
  progress_percentage: number
  status: LearnerSelfPacedStatus
  certificate_eligible: boolean
  completed_at: string | null
  started_at: string | null
  updated_at: string
}

const TABLE = 'learner_self_paced_progress' as const

export async function fetchLearnerSelfPacedRowsForUser(
  supabase: SupabaseClient,
  userId: string,
  limit = 48,
): Promise<LearnerSelfPacedProgressRow[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(limit)

  if (error || !data) return []
  return data as LearnerSelfPacedProgressRow[]
}

export async function fetchLearnerSelfPacedRow(
  supabase: SupabaseClient,
  userId: string,
  courseSlug: string,
): Promise<LearnerSelfPacedProgressRow | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('user_id', userId)
    .eq('course_slug', courseSlug)
    .maybeSingle()

  if (error || !data) return null
  return data as LearnerSelfPacedProgressRow
}

export type LearnerSelfPacedUpsertPatch = Partial<
  Pick<
    LearnerSelfPacedProgressRow,
    | 'current_module_slug'
    | 'current_session_slug'
    | 'current_day_slug'
    | 'last_opened_at'
    | 'last_activity_at'
    | 'last_completed_module_slug'
    | 'last_completed_session_slug'
    | 'last_completed_day_slug'
    | 'completed_modules'
    | 'completed_sessions'
    | 'completed_days'
    | 'progress_percentage'
    | 'status'
    | 'certificate_eligible'
    | 'completed_at'
    | 'started_at'
  >
>

export async function upsertLearnerSelfPacedProgress(
  supabase: SupabaseClient,
  userId: string,
  courseSlug: string,
  patch: LearnerSelfPacedUpsertPatch,
): Promise<void> {
  const now = new Date().toISOString()
  const base = {
    user_id: userId,
    course_slug: courseSlug,
    updated_at: now,
    ...patch,
  }
  const { error } = await supabase.from(TABLE).upsert(base, { onConflict: 'user_id,course_slug' })
  if (error) {
    console.error('[learner_self_paced_progress]', error.message)
  }
}
