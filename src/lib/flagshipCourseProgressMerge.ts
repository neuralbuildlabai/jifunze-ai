/**
 * Conservative merge of local + remote flagship progress — union completions, newest activity wins.
 */

import type { FlagshipModuleQuizRecord, FlagshipCourseProgressState } from './flagshipCourseProgressDerived'

function parseIso(iso?: string): number {
  return iso ? Date.parse(iso) : 0
}

function mergeModuleQuiz(
  local: FlagshipCourseProgressState['moduleQuiz'],
  remote: FlagshipCourseProgressState['moduleQuiz'],
): FlagshipCourseProgressState['moduleQuiz'] {
  const keys = new Set([...Object.keys(local ?? {}), ...Object.keys(remote ?? {})])
  if (keys.size === 0) return undefined
  const out: Record<string, FlagshipModuleQuizRecord> = {}
  for (const id of keys) {
    const a = local?.[id]
    const b = remote?.[id]
    if (!a && !b) continue
    const passedAt = parseIso(a?.passedAt) >= parseIso(b?.passedAt) ? a?.passedAt : b?.passedAt
    const lockUntil = parseIso(a?.lockUntil) >= parseIso(b?.lockUntil) ? a?.lockUntil : b?.lockUntil
    const lastAttemptAt =
      parseIso(a?.lastAttemptAt) >= parseIso(b?.lastAttemptAt) ? a?.lastAttemptAt : b?.lastAttemptAt
    const reviewAcknowledgedAt =
      parseIso(a?.reviewAcknowledgedAt) >= parseIso(b?.reviewAcknowledgedAt)
        ? a?.reviewAcknowledgedAt
        : b?.reviewAcknowledgedAt
    out[id] = { passedAt, lockUntil, lastAttemptAt, reviewAcknowledgedAt }
  }
  return Object.keys(out).length ? out : undefined
}

export function mergeFlagshipProgressStates(
  local: FlagshipCourseProgressState,
  remote: FlagshipCourseProgressState | null,
): FlagshipCourseProgressState {
  if (!remote) return local

  const completed = new Set([...local.completedSessionIds, ...remote.completedSessionIds])
  const flagged = new Set([...local.flaggedForReviewSessionIds, ...remote.flaggedForReviewSessionIds])
  const mastery = new Set([
    ...(local.completedMasteryCheckpointIds ?? []),
    ...(remote.completedMasteryCheckpointIds ?? []),
  ])

  const moduleQuiz = mergeModuleQuiz(local.moduleQuiz, remote.moduleQuiz)

  const localT = parseIso(local.lastActiveAt)
  const remoteT = parseIso(remote.lastActiveAt)

  let lastActiveSessionId = local.lastActiveSessionId
  let lastActiveAt = local.lastActiveAt
  if (remoteT > localT) {
    lastActiveSessionId = remote.lastActiveSessionId ?? lastActiveSessionId
    lastActiveAt = remote.lastActiveAt
  } else if (!local.lastActiveAt && remote.lastActiveAt) {
    lastActiveSessionId = remote.lastActiveSessionId
    lastActiveAt = remote.lastActiveAt
  }

  let startedAt = local.startedAt ?? remote.startedAt
  if (local.startedAt && remote.startedAt) {
    startedAt = parseIso(local.startedAt) <= parseIso(remote.startedAt) ? local.startedAt : remote.startedAt
  }

  return {
    version: 1,
    completedSessionIds: [...completed],
    flaggedForReviewSessionIds: [...flagged],
    completedMasteryCheckpointIds: [...mastery],
    ...(moduleQuiz ? { moduleQuiz } : {}),
    lastActiveSessionId,
    lastActiveAt,
    startedAt,
  }
}

function moduleQuizEqual(
  a: FlagshipCourseProgressState['moduleQuiz'],
  b: FlagshipCourseProgressState['moduleQuiz'],
): boolean {
  const ka = Object.keys(a ?? {}).sort().join('|')
  const kb = Object.keys(b ?? {}).sort().join('|')
  if (ka !== kb) return false
  for (const id of Object.keys(a ?? {})) {
    const x = a?.[id]
    const y = b?.[id]
    if (
      x?.passedAt !== y?.passedAt ||
      x?.lockUntil !== y?.lockUntil ||
      x?.lastAttemptAt !== y?.lastAttemptAt ||
      x?.reviewAcknowledgedAt !== y?.reviewAcknowledgedAt
    )
      return false
  }
  return true
}

export function flagshipProgressStatesEqual(a: FlagshipCourseProgressState, b: FlagshipCourseProgressState): boolean {
  const sort = (xs: string[]) => [...xs].sort()
  const ma = sort(a.completedMasteryCheckpointIds ?? []).join('\0')
  const mb = sort(b.completedMasteryCheckpointIds ?? []).join('\0')
  return (
    sort(a.completedSessionIds).join('\0') === sort(b.completedSessionIds).join('\0') &&
    sort(a.flaggedForReviewSessionIds).join('\0') === sort(b.flaggedForReviewSessionIds).join('\0') &&
    ma === mb &&
    moduleQuizEqual(a.moduleQuiz, b.moduleQuiz) &&
    a.lastActiveSessionId === b.lastActiveSessionId &&
    a.lastActiveAt === b.lastActiveAt &&
    a.startedAt === b.startedAt
  )
}
