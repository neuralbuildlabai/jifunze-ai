import type { SupabaseClient } from '@supabase/supabase-js'
import type { LearnerArtifactValidationStatus, LearnerCourseArtifactRow } from '../../lib/learnerCourseArtifactTypes'

function mapRow(raw: Record<string, unknown>): LearnerCourseArtifactRow {
  return {
    id: String(raw.id),
    user_id: String(raw.user_id),
    tenant_id: raw.tenant_id == null ? null : String(raw.tenant_id),
    course_slug: String(raw.course_slug),
    module_id: String(raw.module_id),
    session_id: String(raw.session_id),
    block_key: String(raw.block_key),
    block_label: raw.block_label == null ? null : String(raw.block_label),
    artifact_type: raw.artifact_type == null ? null : String(raw.artifact_type),
    response_text: typeof raw.response_text === 'string' ? raw.response_text : '',
    validation_status: (raw.validation_status as LearnerArtifactValidationStatus) ?? 'draft',
    validation_feedback: raw.validation_feedback == null ? null : String(raw.validation_feedback),
    validation_score: raw.validation_score == null ? null : Number(raw.validation_score),
    accepted_as_module_evidence: Boolean(raw.accepted_as_module_evidence),
    capstone_candidate: Boolean(raw.capstone_candidate),
    attempt_count: typeof raw.attempt_count === 'number' ? raw.attempt_count : Number(raw.attempt_count) || 0,
    archived_after_module_completion: Boolean(raw.archived_after_module_completion),
    final_evidence_text: raw.final_evidence_text == null ? null : String(raw.final_evidence_text),
    metadata: (raw.metadata && typeof raw.metadata === 'object' ? raw.metadata : {}) as Record<string, unknown>,
    created_at: String(raw.created_at),
    updated_at: String(raw.updated_at),
    reviewed_at: raw.reviewed_at == null ? null : String(raw.reviewed_at),
  }
}

export async function fetchLearnerArtifactsForSession(
  supabase: SupabaseClient,
  userId: string,
  courseSlug: string,
  sessionId: string,
): Promise<LearnerCourseArtifactRow[]> {
  const { data, error } = await supabase
    .from('learner_course_artifacts')
    .select('*')
    .eq('user_id', userId)
    .eq('course_slug', courseSlug)
    .eq('session_id', sessionId)
    .order('updated_at', { ascending: true })

  if (error) {
    console.error('[learner artifacts] fetch failed', error.message)
    return []
  }
  return (data ?? []).map((r) => mapRow(r as Record<string, unknown>))
}

export type UpsertLearnerArtifactInput = {
  user_id: string
  tenant_id?: string | null
  course_slug: string
  module_id: string
  session_id: string
  block_key: string
  block_label?: string | null
  artifact_type?: string | null
  response_text: string
  validation_status: LearnerArtifactValidationStatus
  validation_feedback?: string | null
  validation_score?: number | null
  accepted_as_module_evidence: boolean
  capstone_candidate: boolean
  attempt_count: number
  archived_after_module_completion: boolean
  final_evidence_text?: string | null
  reviewed_at?: string | null
}

export async function upsertLearnerCourseArtifact(
  supabase: SupabaseClient,
  input: UpsertLearnerArtifactInput,
): Promise<{ row: LearnerCourseArtifactRow | null; error: string | null }> {
  const payload = {
    user_id: input.user_id,
    tenant_id: input.tenant_id ?? null,
    course_slug: input.course_slug,
    module_id: input.module_id,
    session_id: input.session_id,
    block_key: input.block_key,
    block_label: input.block_label ?? null,
    artifact_type: input.artifact_type ?? null,
    response_text: input.response_text,
    validation_status: input.validation_status,
    validation_feedback: input.validation_feedback ?? null,
    validation_score: input.validation_score ?? null,
    accepted_as_module_evidence: input.accepted_as_module_evidence,
    capstone_candidate: input.capstone_candidate,
    attempt_count: input.attempt_count,
    archived_after_module_completion: input.archived_after_module_completion,
    final_evidence_text: input.final_evidence_text ?? null,
    reviewed_at: input.reviewed_at ?? null,
    metadata: {},
  }

  const { data, error } = await supabase
    .from('learner_course_artifacts')
    .upsert(payload, {
      onConflict: 'user_id,course_slug,module_id,session_id,block_key',
    })
    .select('*')
    .maybeSingle()

  if (error) {
    console.error('[learner artifacts] upsert failed', error.message)
    return { row: null, error: error.message }
  }
  if (!data) return { row: null, error: 'No row returned' }
  return { row: mapRow(data as Record<string, unknown>), error: null }
}

/** Marks non-final drafts as archived after the module is fully complete (sessions + quiz). */
export async function archiveNonAcceptedArtifactsForModule(
  supabase: SupabaseClient,
  userId: string,
  courseSlug: string,
  moduleId: string,
): Promise<void> {
  const { error } = await supabase
    .from('learner_course_artifacts')
    .update({ archived_after_module_completion: true, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('course_slug', courseSlug)
    .eq('module_id', moduleId)
    .eq('accepted_as_module_evidence', false)
    .in('validation_status', ['draft', 'needs_more_work', 'almost_ready'])

  if (error) {
    console.error('[learner artifacts] archive failed', error.message)
  }
}
