import type { LearnerArtifactValidationStatus } from './learnerCourseArtifactTypes'

export type LocalLearnerArtifact = {
  response_text: string
  validation_status: LearnerArtifactValidationStatus
  validation_feedback: string | null
  validation_score: number | null
  accepted_as_module_evidence: boolean
  capstone_candidate: boolean
  attempt_count: number
  archived_after_module_completion: boolean
  final_evidence_text: string | null
  updated_at: string
}

function sessionKey(userId: string, courseSlug: string, sessionId: string): string {
  return `jf.flagshipArtifacts.v1:${userId}:${courseSlug}:${sessionId}`
}

export function loadLocalArtifactsForSession(
  userId: string,
  courseSlug: string,
  sessionId: string,
): Record<string, LocalLearnerArtifact> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(sessionKey(userId, courseSlug, sessionId))
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    return parsed as Record<string, LocalLearnerArtifact>
  } catch {
    return {}
  }
}

export function saveLocalArtifact(
  userId: string,
  courseSlug: string,
  sessionId: string,
  blockKey: string,
  next: LocalLearnerArtifact,
): void {
  if (typeof window === 'undefined') return
  const all = loadLocalArtifactsForSession(userId, courseSlug, sessionId)
  all[blockKey] = next
  window.localStorage.setItem(sessionKey(userId, courseSlug, sessionId), JSON.stringify(all))
}

export function archiveLocalDraftsForModule(
  userId: string,
  courseSlug: string,
  sessionId: string,
  blockKeysInModule: string[],
): void {
  if (typeof window === 'undefined') return
  const all = loadLocalArtifactsForSession(userId, courseSlug, sessionId)
  let changed = false
  for (const key of blockKeysInModule) {
    const row = all[key]
    if (!row) continue
    if (row.accepted_as_module_evidence) continue
    if (row.validation_status === 'accepted' || row.validation_status === 'strong_portfolio_evidence') continue
    all[key] = { ...row, archived_after_module_completion: true }
    changed = true
  }
  if (changed) {
    window.localStorage.setItem(sessionKey(userId, courseSlug, sessionId), JSON.stringify(all))
  }
}
