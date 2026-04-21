/**
 * Pure helpers for flagship session progress — UI and unlock logic stay testable without storage.
 */

import type { FlagshipCourseCurriculum, FlagshipDepthStage } from '../data/learning/flagshipCourseCurricula'
import { moduleAssessmentComplete, normalizeLegacyMasteryIds } from './flagshipAssessmentCatalog'
import {
  FLAGSHIP_CAPSTONE_MODULE_ID,
  capstonePrepSession,
  nonCapstoneSessionIds,
  type FlagshipSession,
  type FlagshipSessionType,
} from '../data/learning/flagshipCourseSessions'

/** Per-module quiz gate (must pass to unlock later modules). */
export type FlagshipModuleQuizRecord = {
  /** ISO timestamp when learner met the correct-answer threshold */
  passedAt?: string
  /** Cooldown after a failed attempt — ISO time when retake is allowed */
  lockUntil?: string
  lastAttemptAt?: string
  /** Confirms post-failure module review before another attempt (paired with cooldown). */
  reviewAcknowledgedAt?: string
}

export type FlagshipCourseProgressState = {
  version: 1
  completedSessionIds: string[]
  flaggedForReviewSessionIds: string[]
  /**
   * Mastery checkpoint item ids (`${moduleId}::a0`, `::a1`) or legacy `${moduleId}-mastery`
   * (normalized on read via {@link masteryCheckpointCompletionSet}).
   */
  completedMasteryCheckpointIds?: string[]
  /** Module id → quiz completion / lock state (local-first; server row may omit). */
  moduleQuiz?: Record<string, FlagshipModuleQuizRecord>
  lastActiveSessionId?: string
  lastActiveAt?: string
  startedAt?: string
}

export function completionSet(state: FlagshipCourseProgressState): Set<string> {
  return new Set(state.completedSessionIds)
}

export function masteryCheckpointCompletionSet(state: FlagshipCourseProgressState): Set<string> {
  return normalizeLegacyMasteryIds(state.completedMasteryCheckpointIds ?? [])
}

/** Non-capstone sessions complete and every module has both checkpoint items satisfied. */
export function capstonePrepAccessible(
  curriculum: FlagshipCourseCurriculum,
  sessions: FlagshipSession[],
  completed: Set<string>,
  checkpointDone: Set<string>,
): boolean {
  if (!isCapstoneUnlocked(sessions, completed)) return false
  return curriculum.modules.every((m) => moduleAssessmentComplete(m.id, checkpointDone))
}

/**
 * Next session to resume, respecting checkpoint gating before capstone prep.
 * If a module’s sessions are complete but checkpoints are not, returns that module’s practice session.
 */
export function findNextFlagshipResumeSession(
  curriculum: FlagshipCourseCurriculum,
  sessions: FlagshipSession[],
  completed: Set<string>,
  checkpointDone: Set<string>,
  progressState?: FlagshipCourseProgressState,
): FlagshipSession | undefined {
  for (const m of curriculum.modules) {
    const stats = moduleSessionStats(m.id, sessions, completed)
    if (!stats.complete) continue
    if (!moduleAssessmentComplete(m.id, checkpointDone)) {
      const practice = sessions
        .filter((s) => s.moduleId === m.id && s.type === 'practice')
        .sort((a, b) => a.orderInModule - b.orderInModule)[0]
      if (practice) return practice
    }
  }

  const prepOk = capstonePrepAccessible(curriculum, sessions, completed, checkpointDone)
  const ordered = [...sessions].sort((a, b) => a.orderInCourse - b.orderInCourse)
  for (const s of ordered) {
    if (completed.has(s.id)) continue
    if (s.type === 'capstone_prep' && !prepOk) continue
    if (!sessionPrerequisitesMet(completed, s)) continue
    if (s.moduleId === FLAGSHIP_CAPSTONE_MODULE_ID && !prepOk) continue
    if (!priorModulesQuizSatisfied(curriculum, s.moduleId, progressState)) continue
    return s
  }
  return undefined
}

export function isSessionCompleted(state: FlagshipCourseProgressState, sessionId: string): boolean {
  return completionSet(state).has(sessionId)
}

export function courseProgressFraction(sessions: FlagshipSession[], completed: Set<string>): number {
  if (sessions.length === 0) return 0
  let done = 0
  for (const s of sessions) {
    if (completed.has(s.id)) done += 1
  }
  return done / sessions.length
}

export function moduleQuizPassed(moduleId: string, state: FlagshipCourseProgressState): boolean {
  const rec = state.moduleQuiz?.[moduleId]
  return Boolean(rec?.passedAt)
}

/** Prior modules in curriculum order must have passed their module quizzes before forward sessions unlock. */
export function priorModulesQuizSatisfied(
  curriculum: FlagshipCourseCurriculum | undefined,
  sessionModuleId: string,
  progress: FlagshipCourseProgressState | undefined,
): boolean {
  if (!curriculum || !progress) return true
  const order = curriculum.modules.map((m) => m.id)
  const idx = order.indexOf(sessionModuleId)
  if (idx <= 0) return true
  for (let i = 0; i < idx; i++) {
    const mid = order[i]
    if (!mid || !moduleQuizPassed(mid, progress)) return false
  }
  return true
}

function sessionPrerequisitesMet(completedSessionIds: Set<string>, session: FlagshipSession): boolean {
  const reqs = session.prerequisites
  if (!reqs?.length) return true
  return reqs.every((id) => completedSessionIds.has(id))
}

export function modulesCompletedCount(
  curriculum: FlagshipCourseCurriculum,
  sessions: FlagshipSession[],
  completed: Set<string>,
  state?: FlagshipCourseProgressState,
): { completed: number; total: number } {
  const total = curriculum.modules.length
  let completedModules = 0
  for (const m of curriculum.modules) {
    const modSessions = sessions.filter((s) => s.moduleId === m.id)
    if (modSessions.length === 0) continue
    const allSessionsDone = modSessions.every((s) => completed.has(s.id))
    const quizOk = state ? moduleQuizPassed(m.id, state) : true
    if (allSessionsDone && quizOk) completedModules += 1
  }
  return { completed: completedModules, total }
}

export function moduleSessionStats(
  moduleId: string,
  sessions: FlagshipSession[],
  completed: Set<string>,
): { done: number; total: number; complete: boolean } {
  const modSessions = sessions.filter((s) => s.moduleId === moduleId)
  const total = modSessions.length
  const done = modSessions.filter((s) => completed.has(s.id)).length
  return { done, total, complete: total > 0 && done === total }
}

/** All sessions in the module marked complete (quiz not required). */
export function moduleSessionsAllDone(
  moduleId: string,
  sessions: FlagshipSession[],
  completed: Set<string>,
): boolean {
  return moduleSessionStats(moduleId, sessions, completed).complete
}

/** Sessions done and module quiz passed (when state provided). */
export function moduleFullyComplete(
  moduleId: string,
  sessions: FlagshipSession[],
  completed: Set<string>,
  state: FlagshipCourseProgressState,
): boolean {
  if (!moduleSessionsAllDone(moduleId, sessions, completed)) return false
  return moduleQuizPassed(moduleId, state)
}

export function stageProgressSummary(
  curriculum: FlagshipCourseCurriculum,
  sessions: FlagshipSession[],
  completed: Set<string>,
  progressState?: FlagshipCourseProgressState,
): Record<
  FlagshipDepthStage,
  { modulesDone: number; modulesTotal: number; sessionsDone: number; sessionsTotal: number }
> {
  const stages: FlagshipDepthStage[] = ['foundations', 'applied_practice', 'professional_execution', 'mastery_outputs']
  const result = {} as Record<
    FlagshipDepthStage,
    { modulesDone: number; modulesTotal: number; sessionsDone: number; sessionsTotal: number }
  >
  for (const st of stages) {
    const mods = curriculum.modules.filter((m) => m.stage === st)
    let modulesDone = 0
    let sessionsDone = 0
    let sessionsTotal = 0
    for (const m of mods) {
      const ms = sessions.filter((s) => s.moduleId === m.id)
      sessionsTotal += ms.length
      sessionsDone += ms.filter((s) => completed.has(s.id)).length
      const sessionsAllMarked = ms.length > 0 && ms.every((s) => completed.has(s.id))
      const quizOk = progressState ? moduleQuizPassed(m.id, progressState) : true
      if (sessionsAllMarked && quizOk) modulesDone += 1
    }
    result[st] = {
      modulesDone,
      modulesTotal: mods.length,
      sessionsDone,
      sessionsTotal,
    }
  }
  return result
}

export function isCapstoneUnlocked(sessions: FlagshipSession[], completed: Set<string>): boolean {
  const ids = nonCapstoneSessionIds(sessions)
  if (ids.length === 0) return false
  for (const id of ids) {
    if (!completed.has(id)) return false
  }
  return true
}

export function emptyStageSummary(): ReturnType<typeof stageProgressSummary> {
  const z = { modulesDone: 0, modulesTotal: 0, sessionsDone: 0, sessionsTotal: 0 }
  return {
    foundations: { ...z },
    applied_practice: { ...z },
    professional_execution: { ...z },
    mastery_outputs: { ...z },
  }
}

export function isCapstonePrepComplete(sessions: FlagshipSession[], completed: Set<string>): boolean {
  const prep = capstonePrepSession(sessions)
  if (!prep) return false
  return completed.has(prep.id)
}

const REVIEW_TYPES: FlagshipSessionType[] = ['practice', 'revision', 'recap']

/** Sessions worth surfacing when conceptually “done enough” to revisit — practice/revision/recap left open */
export function needsAttentionSessions(sessions: FlagshipSession[], completed: Set<string>): FlagshipSession[] {
  const byModule = new Map<string, FlagshipSession[]>()
  for (const s of sessions) {
    if (s.type === 'capstone_prep') continue
    const list = byModule.get(s.moduleId) ?? []
    list.push(s)
    byModule.set(s.moduleId, list)
  }

  const out: FlagshipSession[] = []
  for (const [, list] of byModule) {
    const sorted = list.sort((a, b) => a.orderInModule - b.orderInModule)
    for (const s of sorted) {
      if (completed.has(s.id)) continue
      if (!REVIEW_TYPES.includes(s.type)) continue
      const priorIncomplete = sorted.some((x) => x.orderInModule < s.orderInModule && !completed.has(x.id))
      if (priorIncomplete) continue
      const lesson = sorted.find((x) => x.type === 'lesson')
      if (lesson && completed.has(lesson.id)) {
        out.push(s)
      }
    }
  }
  return out
}

export function nextResumeLabel(next: FlagshipSession | undefined): string {
  if (!next) return 'Course complete'
  if (next.type === 'capstone_prep') return 'Resume capstone prep'
  return 'Resume learning'
}

/**
 * Forward-only completion gate (no “already marked” shortcut): used when adding a chapter completion
 * so learners cannot skip ahead via tampered storage without satisfying prerequisites + module quiz order.
 */
export function forwardProgressionAllowsNewCompletion(
  completed: Set<string>,
  session: FlagshipSession,
  curriculum: FlagshipCourseCurriculum | undefined,
  progressState: FlagshipCourseProgressState | undefined,
  capstonePrepAccessible: boolean,
): boolean {
  if (!sessionPrerequisitesMet(completed, session)) return false
  if (session.moduleId === FLAGSHIP_CAPSTONE_MODULE_ID && !capstonePrepAccessible) return false
  if (!priorModulesQuizSatisfied(curriculum, session.moduleId, progressState)) return false
  return true
}

/** Keep only completions that are reachable in strict course order (chapters unlock sequentially). */
export function reconcileSequentialChapterCompletions(
  completedSessionIds: string[],
  sessions: FlagshipSession[],
  curriculum: FlagshipCourseCurriculum | undefined,
  progressState: FlagshipCourseProgressState | undefined,
  capstonePrepAccessible: boolean,
): string[] {
  const ordered = [...sessions].sort((a, b) => a.orderInCourse - b.orderInCourse)
  const next = new Set<string>()
  for (const s of ordered) {
    if (!completedSessionIds.includes(s.id)) continue
    if (forwardProgressionAllowsNewCompletion(next, s, curriculum, progressState, capstonePrepAccessible)) {
      next.add(s.id)
    }
  }
  return [...next]
}

export function reconcileFlagshipProgressState(
  state: FlagshipCourseProgressState,
  curriculum: FlagshipCourseCurriculum | undefined,
  sessions: FlagshipSession[],
): FlagshipCourseProgressState {
  if (!curriculum || sessions.length === 0) return state
  const completed = completionSet(state)
  const ck = masteryCheckpointCompletionSet(state)
  const prepOk = capstonePrepAccessible(curriculum, sessions, completed, ck)
  const fixed = reconcileSequentialChapterCompletions(
    state.completedSessionIds,
    sessions,
    curriculum,
    state,
    prepOk,
  )
  const prev = new Set(state.completedSessionIds)
  const next = new Set(fixed)
  if (prev.size === next.size && [...prev].every((id) => next.has(id))) return state
  return { ...state, completedSessionIds: fixed }
}
