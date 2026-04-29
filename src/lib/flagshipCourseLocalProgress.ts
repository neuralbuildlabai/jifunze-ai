/**
 * Device-local progress for flagship course sessions (not a server authorization boundary).
 * Structured for future sync to authenticated persistence without changing session ids.
 */

import { parseAeCapstoneRubricSelfGradeJson } from './aeCapstoneRubricPersistence'
import {
  AI_ESSENTIALS_CAPSTONE_RUBRIC_IDS,
  type AeCapstoneRubricSelfGrade,
  type AeCapstoneRubricLevel,
  type FlagshipCourseProgressState,
} from './flagshipCourseProgressDerived'

export const FLAGSHIP_COURSE_PROGRESS_PREFIX = 'jifunze.flagshipCourseProgress.v1:'

export function flagshipCourseProgressStorageKey(courseSlug: string): string {
  return `${FLAGSHIP_COURSE_PROGRESS_PREFIX}${courseSlug}`
}

export const FLAGSHIP_PROGRESS_EVENT = 'jifunze-flagship-course-progress'

function safeParse(raw: string | null): FlagshipCourseProgressState | null {
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as Partial<FlagshipCourseProgressState>
    if (!data || typeof data !== 'object') return null
    if (data.version !== 1) return null
    const completedSessionIds = Array.isArray(data.completedSessionIds)
      ? data.completedSessionIds.filter((s): s is string => typeof s === 'string')
      : []
    const flaggedForReviewSessionIds = Array.isArray(data.flaggedForReviewSessionIds)
      ? data.flaggedForReviewSessionIds.filter((s): s is string => typeof s === 'string')
      : []
    const completedMasteryCheckpointIds = Array.isArray(data.completedMasteryCheckpointIds)
      ? data.completedMasteryCheckpointIds.filter((s): s is string => typeof s === 'string')
      : undefined
    let moduleQuiz: FlagshipCourseProgressState['moduleQuiz']
    if (data.moduleQuiz && typeof data.moduleQuiz === 'object' && !Array.isArray(data.moduleQuiz)) {
      const o: NonNullable<FlagshipCourseProgressState['moduleQuiz']> = {}
      for (const [k, v] of Object.entries(data.moduleQuiz)) {
        if (!v || typeof v !== 'object') continue
        const r = v as Record<string, unknown>
        o[k] = {
          passedAt: typeof r.passedAt === 'string' ? r.passedAt : undefined,
          lockUntil: typeof r.lockUntil === 'string' ? r.lockUntil : undefined,
          lastAttemptAt: typeof r.lastAttemptAt === 'string' ? r.lastAttemptAt : undefined,
        }
      }
      moduleQuiz = Object.keys(o).length ? o : undefined
    }
    let aeCapstoneRubricSelfGrade: AeCapstoneRubricSelfGrade | undefined
    let aeCapstoneRubricSelfGradeUpdatedAt: string | undefined
    if (
      data.aeCapstoneRubricSelfGrade &&
      typeof data.aeCapstoneRubricSelfGrade === 'object' &&
      !Array.isArray(data.aeCapstoneRubricSelfGrade)
    ) {
      const parsed = parseAeCapstoneRubricSelfGradeJson(data.aeCapstoneRubricSelfGrade)
      if (parsed.grades) {
        aeCapstoneRubricSelfGrade = parsed.grades
        aeCapstoneRubricSelfGradeUpdatedAt = parsed.updatedAt
      } else {
        const raw = data.aeCapstoneRubricSelfGrade as Record<string, unknown>
        const o: AeCapstoneRubricSelfGrade = {}
        for (const id of AI_ESSENTIALS_CAPSTONE_RUBRIC_IDS) {
          const v = raw[id]
          if (v === 'not_ready' || v === 'developing' || v === 'ready' || v === 'strong') o[id] = v as AeCapstoneRubricLevel
        }
        aeCapstoneRubricSelfGrade = Object.keys(o).length ? o : undefined
      }
    }
    if (typeof data.aeCapstoneRubricSelfGradeUpdatedAt === 'string') {
      aeCapstoneRubricSelfGradeUpdatedAt = data.aeCapstoneRubricSelfGradeUpdatedAt
    }
    return {
      version: 1,
      completedSessionIds,
      flaggedForReviewSessionIds,
      ...(completedMasteryCheckpointIds?.length ? { completedMasteryCheckpointIds } : {}),
      ...(moduleQuiz ? { moduleQuiz } : {}),
      ...(aeCapstoneRubricSelfGrade ? { aeCapstoneRubricSelfGrade } : {}),
      ...(aeCapstoneRubricSelfGradeUpdatedAt ? { aeCapstoneRubricSelfGradeUpdatedAt } : {}),
      lastActiveSessionId: typeof data.lastActiveSessionId === 'string' ? data.lastActiveSessionId : undefined,
      lastActiveAt: typeof data.lastActiveAt === 'string' ? data.lastActiveAt : undefined,
      startedAt: typeof data.startedAt === 'string' ? data.startedAt : undefined,
    }
  } catch {
    return null
  }
}

export function loadFlagshipCourseProgress(courseSlug: string): FlagshipCourseProgressState {
  if (typeof window === 'undefined') {
    return defaultFlagshipProgress()
  }
  const parsed = safeParse(window.localStorage.getItem(flagshipCourseProgressStorageKey(courseSlug)))
  return parsed ?? defaultFlagshipProgress()
}

export function defaultFlagshipProgress(): FlagshipCourseProgressState {
  return {
    version: 1,
    completedSessionIds: [],
    flaggedForReviewSessionIds: [],
  }
}

/** All course slugs that have a stored progress object in this browser. */
export function listLocalFlagshipCourseSlugs(): string[] {
  if (typeof window === 'undefined') return []
  const out: string[] = []
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i)
    if (!k || !k.startsWith(FLAGSHIP_COURSE_PROGRESS_PREFIX)) continue
    out.push(k.slice(FLAGSHIP_COURSE_PROGRESS_PREFIX.length))
  }
  return out
}

export function saveFlagshipCourseProgress(courseSlug: string, next: FlagshipCourseProgressState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(flagshipCourseProgressStorageKey(courseSlug), JSON.stringify(next))
    window.dispatchEvent(new CustomEvent(FLAGSHIP_PROGRESS_EVENT, { detail: { courseSlug } }))
  } catch {
    // quota / private mode
  }
}

export function notifyFlagshipProgressListeners(courseSlug: string) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(FLAGSHIP_PROGRESS_EVENT, { detail: { courseSlug } }))
}
