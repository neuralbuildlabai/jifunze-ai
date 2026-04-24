/** DB + UI validation states for flagship learner artifacts (see migration constraint). */
export type LearnerArtifactValidationStatus =
  | 'draft'
  | 'needs_more_work'
  | 'almost_ready'
  | 'accepted'
  | 'strong_portfolio_evidence'

export type LearnerCourseArtifactRow = {
  id: string
  user_id: string
  tenant_id: string | null
  course_slug: string
  module_id: string
  session_id: string
  block_key: string
  block_label: string | null
  artifact_type: string | null
  response_text: string
  validation_status: LearnerArtifactValidationStatus
  validation_feedback: string | null
  validation_score: number | null
  accepted_as_module_evidence: boolean
  capstone_candidate: boolean
  attempt_count: number
  archived_after_module_completion: boolean
  final_evidence_text: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
  reviewed_at: string | null
}
