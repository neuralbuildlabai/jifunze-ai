import type { SupabaseClient } from '@supabase/supabase-js'

export type LearnerCapstoneSubmissionRow = {
  id: string
  learner_id: string
  learner_email: string | null
  course_slug: string
  course_title: string | null
  submission_type: string
  file_url: string | null
  file_name: string | null
  file_type: string | null
  file_size: number | null
  reflection: string | null
  declaration_confirmed: boolean
  consent_confirmed: boolean
  status: string
  score: number | null
  reviewer_notes: string | null
  reviewed_by: string | null
  reviewed_at: string | null
  certificate_eligible: boolean
  certificate_issued_at: string | null
  certificate_valid_until: string | null
  created_at: string
  updated_at: string
}

export async function fetchLatestCapstoneSubmissionForLearner(
  supabase: SupabaseClient,
  learnerId: string,
  courseSlug: string,
): Promise<LearnerCapstoneSubmissionRow | null> {
  const { data, error } = await supabase
    .from('learner_capstone_submissions')
    .select('*')
    .eq('learner_id', learnerId)
    .eq('course_slug', courseSlug)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  return data as LearnerCapstoneSubmissionRow | null
}

export type InsertCapstoneSubmissionInput = {
  learner_id: string
  learner_email: string | null
  course_slug: string
  course_title: string | null
  submission_type: string
  file_url: string | null
  file_name: string | null
  file_type: string | null
  file_size: number | null
  reflection: string | null
  declaration_confirmed: boolean
  consent_confirmed: boolean
}

export async function insertCapstoneSubmission(
  supabase: SupabaseClient,
  row: InsertCapstoneSubmissionInput,
): Promise<LearnerCapstoneSubmissionRow> {
  const { data, error } = await supabase.from('learner_capstone_submissions').insert(row).select('*').single()
  if (error) throw error
  return data as LearnerCapstoneSubmissionRow
}

export async function fetchAllCapstoneSubmissionsForAdmin(
  supabase: SupabaseClient,
): Promise<LearnerCapstoneSubmissionRow[]> {
  const { data, error } = await supabase
    .from('learner_capstone_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500)

  if (error) throw error
  return (data ?? []) as LearnerCapstoneSubmissionRow[]
}

export async function adminUpdateCapstoneSubmission(
  supabase: SupabaseClient,
  id: string,
  patch: Partial<Pick<LearnerCapstoneSubmissionRow, 'status' | 'score' | 'reviewer_notes' | 'reviewed_by' | 'reviewed_at'>>,
): Promise<void> {
  const body: Record<string, unknown> = { ...patch }
  if (patch.status && patch.status !== 'submitted' && patch.reviewed_at === undefined) {
    body.reviewed_at = new Date().toISOString()
  }
  const { error } = await supabase.from('learner_capstone_submissions').update(body).eq('id', id)
  if (error) throw error
}
