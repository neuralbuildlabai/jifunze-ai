import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { FlagshipCourseCurriculum } from '../data/learning/flagshipCourseCurricula'
import { flagshipStageLabel } from '../data/learning/flagshipCourseCurricula'
import { getSessionById, type FlagshipSession } from '../data/learning/flagshipCourseSessions'
import {
  defaultFlagshipProgress,
  FLAGSHIP_PROGRESS_EVENT,
  loadFlagshipCourseProgress,
  saveFlagshipCourseProgress,
} from '../lib/flagshipCourseLocalProgress'
import { mergeFlagshipProgressStates, flagshipProgressStatesEqual } from '../lib/flagshipCourseProgressMerge'
import { masteryEvidenceProgress } from '../lib/flagshipAssessmentCatalog'
import { flagshipReadinessCompact } from '../lib/flagshipReadinessSignals'
import { getFlagshipCourseDisplayProgressPercent } from '../lib/aiEssentialsProgressMilestones'
import {
  type AeCapstoneRubricId,
  type AeCapstoneRubricLevel,
  capstonePrepAccessible,
  completionSet,
  emptyStageSummary,
  findNextFlagshipResumeSession,
  forwardProgressionAllowsNewCompletion,
  type FlagshipCourseProgressState,
  isCapstonePrepComplete,
  isCapstoneUnlocked,
  isFlagshipCertificateReady,
  isSessionCompleted,
  masteryCheckpointCompletionSet,
  modulesCompletedCount,
  type FlagshipModuleQuizRecord,
  needsAttentionSessions,
  nextResumeLabel,
  reconcileFlagshipProgressState,
  reconcileSequentialChapterCompletions,
  stageProgressSummary,
} from '../lib/flagshipCourseProgressDerived'
import { modulesPendingMasteryCheckpoints } from '../lib/flagshipMasteryCheckpoint'
import {
  fetchFlagshipProgressRow,
  flagshipProgressRowToState,
  upsertFlagshipProgress,
} from '../services/learning/flagshipCourseProgressRemote'

export type FlagshipCourseSyncContext = {
  supabase: SupabaseClient
  userId: string
} | null

export type FlagshipCourseProgressApi = {
  state: FlagshipCourseProgressState
  completed: Set<string>
  progressPercent: number
  modulesCompleted: number
  modulesTotal: number
  stageSummary: ReturnType<typeof stageProgressSummary>
  currentStageLabel: string
  nextSession: FlagshipSession | undefined
  resumeLabel: string
  capstoneUnlocked: boolean
  /** True when path sessions are complete and every module’s checkpoint items are satisfied — capstone prep is meaningfully available. */
  capstonePrepAccessible: boolean
  capstonePrepComplete: boolean
  remainingBeforeCapstone: number
  needsAttention: FlagshipSession[]
  /** True after first remote merge attempt finishes (success or graceful failure). */
  syncHydrated: boolean
  masteryCheckpointsDone: number
  masteryCheckpointsTotal: number
  pendingMasteryModuleTitles: string[]
  /** Optional calm guidance line for course overview / workspace */
  learningGuidanceLine: string | null
  /** Compact readiness chip (checkpoint / review / capstone) */
  readinessCompactLabel: string | null
  readinessDetailHint: string | null
  markSessionComplete: (sessionId: string, done: boolean) => void
  touchActiveSession: (sessionId: string) => void
  toggleReviewFlag: (sessionId: string, on: boolean) => void
  toggleMasteryCheckpoint: (checkpointId: string, done: boolean) => void
  resetProgress: () => void
  updateModuleQuizRecord: (moduleId: string, partial: Partial<FlagshipModuleQuizRecord>) => void
  /** AI Essentials capstone rubric self-grade (local-first; not synced to Supabase row yet). */
  setAeCapstoneRubricCriterion: (criterionId: AeCapstoneRubricId, level: AeCapstoneRubricLevel | null) => void
  /** All modules + quizzes + mastery checkpoints + capstone prep — UI only until issuance exists. */
  certificateReady: boolean
}

const REMOTE_DEBOUNCE_MS = 700

export function useFlagshipCourseProgress(
  courseSlug: string,
  curriculum: FlagshipCourseCurriculum | undefined,
  sessions: FlagshipSession[],
  sync: FlagshipCourseSyncContext = null,
): FlagshipCourseProgressApi {
  const [state, setState] = useState<FlagshipCourseProgressState>(() =>
    typeof window === 'undefined' ? defaultFlagshipProgress() : loadFlagshipCourseProgress(courseSlug),
  )
  const [syncHydrated, setSyncHydrated] = useState(() => !sync)

  const remoteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const syncRef = useRef(sync)
  syncRef.current = sync

  const flushRemoteUpsert = useCallback(
    async (next: FlagshipCourseProgressState) => {
      const ctx = syncRef.current
      if (!ctx) return
      try {
        await upsertFlagshipProgress(ctx.supabase, ctx.userId, courseSlug, next)
      } catch {
        /* logged in upsert */
      }
    },
    [courseSlug],
  )

  const scheduleRemoteUpsert = useCallback(
    (next: FlagshipCourseProgressState) => {
      const ctx = syncRef.current
      if (!ctx) return
      if (remoteTimerRef.current) clearTimeout(remoteTimerRef.current)
      remoteTimerRef.current = setTimeout(() => {
        remoteTimerRef.current = null
        void flushRemoteUpsert(next)
      }, REMOTE_DEBOUNCE_MS)
    },
    [flushRemoteUpsert],
  )

  useEffect(() => {
    return () => {
      if (remoteTimerRef.current) clearTimeout(remoteTimerRef.current)
    }
  }, [])

  useEffect(() => {
    setState(loadFlagshipCourseProgress(courseSlug))
  }, [courseSlug])

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ courseSlug?: string }>
      if (ce.detail?.courseSlug === courseSlug) {
        setState(loadFlagshipCourseProgress(courseSlug))
      }
    }
    if (typeof window === 'undefined') return
    window.addEventListener(FLAGSHIP_PROGRESS_EVENT, handler)
    return () => window.removeEventListener(FLAGSHIP_PROGRESS_EVENT, handler)
  }, [courseSlug])

  /** Hydrate from Supabase once per slug + user; merge with local conservatively. */
  useEffect(() => {
    if (!sync?.supabase || !sync?.userId || !courseSlug) {
      setSyncHydrated(true)
      return
    }

    setSyncHydrated(false)
    let cancelled = false
    ;(async () => {
      try {
        const remoteRow = await fetchFlagshipProgressRow(sync.supabase, sync.userId, courseSlug)
        if (cancelled) return
        const local = loadFlagshipCourseProgress(courseSlug)
        const remoteState = remoteRow ? flagshipProgressRowToState(remoteRow) : null
        const mergedRaw = mergeFlagshipProgressStates(local, remoteState)
        const merged = curriculum
          ? reconcileFlagshipProgressState(mergedRaw, curriculum, sessions)
          : mergedRaw

        if (!flagshipProgressStatesEqual(merged, local)) {
          saveFlagshipCourseProgress(courseSlug, merged)
          setState(merged)
        }

        const remoteBaseline = remoteState ?? defaultFlagshipProgress()
        if (!flagshipProgressStatesEqual(merged, remoteBaseline)) {
          await upsertFlagshipProgress(sync.supabase, sync.userId, courseSlug, merged)
        }
      } catch {
        /* fall back to local-only; errors already logged in fetch */
      } finally {
        if (!cancelled) setSyncHydrated(true)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [courseSlug, curriculum, sessions, sync?.supabase, sync?.userId])

  /** Strip invalid chapter completions (e.g. after local edits or imports) whenever curriculum is available. */
  useEffect(() => {
    if (!curriculum || sessions.length === 0) return
    const cur = loadFlagshipCourseProgress(courseSlug)
    const fixed = reconcileFlagshipProgressState(cur, curriculum, sessions)
    if (!flagshipProgressStatesEqual(fixed, cur)) {
      saveFlagshipCourseProgress(courseSlug, fixed)
      setState(fixed)
    }
  }, [courseSlug, curriculum, sessions])

  const persist = useCallback(
    (next: FlagshipCourseProgressState, pushRemote: boolean) => {
      saveFlagshipCourseProgress(courseSlug, next)
      setState(next)
      if (pushRemote && syncRef.current) {
        scheduleRemoteUpsert(next)
      }
    },
    [courseSlug, scheduleRemoteUpsert],
  )

  const completed = useMemo(() => completionSet(state), [state])

  const markSessionComplete = useCallback(
    (sessionId: string, done: boolean) => {
      const cur = loadFlagshipCourseProgress(courseSlug)
      const sess = getSessionById(sessions, sessionId)
      if (!sess || !curriculum) {
        const set = new Set(cur.completedSessionIds)
        if (done) set.add(sessionId)
        else set.delete(sessionId)
        persist(
          {
            ...cur,
            completedSessionIds: [...set],
            startedAt: cur.startedAt ?? new Date().toISOString(),
          },
          true,
        )
        return
      }

      const completedBefore = completionSet(cur)
      const ck = masteryCheckpointCompletionSet(cur)

      if (done) {
        const prepOkForGate = capstonePrepAccessible(curriculum, sessions, completedBefore, ck)
        if (
          !forwardProgressionAllowsNewCompletion(
            completedBefore,
            sess,
            curriculum,
            cur,
            prepOkForGate,
          )
        ) {
          return
        }
      }

      const set = new Set(cur.completedSessionIds)
      if (done) set.add(sessionId)
      else set.delete(sessionId)

      const prepOk = capstonePrepAccessible(curriculum, sessions, set, ck)
      const reconciled = reconcileSequentialChapterCompletions(
        [...set],
        sessions,
        curriculum,
        cur,
        prepOk,
      )

      persist(
        {
          ...cur,
          completedSessionIds: reconciled,
          startedAt: cur.startedAt ?? new Date().toISOString(),
        },
        true,
      )
    },
    [courseSlug, curriculum, sessions, persist],
  )

  const touchActiveSession = useCallback(
    (sessionId: string) => {
      const cur = loadFlagshipCourseProgress(courseSlug)
      persist(
        {
          ...cur,
          lastActiveSessionId: sessionId,
          lastActiveAt: new Date().toISOString(),
          startedAt: cur.startedAt ?? new Date().toISOString(),
        },
        true,
      )
    },
    [courseSlug, persist],
  )

  const toggleReviewFlag = useCallback(
    (sessionId: string, on: boolean) => {
      const cur = loadFlagshipCourseProgress(courseSlug)
      const set = new Set(cur.flaggedForReviewSessionIds)
      if (on) set.add(sessionId)
      else set.delete(sessionId)
      persist(
        {
          ...cur,
          flaggedForReviewSessionIds: [...set],
        },
        true,
      )
    },
    [courseSlug, persist],
  )

  const resetProgress = useCallback(() => {
    persist(defaultFlagshipProgress(), true)
  }, [persist])

  const updateModuleQuizRecord = useCallback(
    (moduleId: string, partial: Partial<FlagshipModuleQuizRecord>) => {
      const cur = loadFlagshipCourseProgress(courseSlug)
      const prev = cur.moduleQuiz?.[moduleId] ?? {}
      const nextRec: FlagshipModuleQuizRecord = { ...prev, ...partial }
      const nextQuiz = { ...(cur.moduleQuiz ?? {}), [moduleId]: nextRec }
      persist({ ...cur, moduleQuiz: nextQuiz }, true)
    },
    [courseSlug, persist],
  )

  const setAeCapstoneRubricCriterion = useCallback(
    (criterionId: AeCapstoneRubricId, level: AeCapstoneRubricLevel | null) => {
      if (courseSlug !== 'ai-essentials') return
      const cur = loadFlagshipCourseProgress(courseSlug)
      const prev = { ...(cur.aeCapstoneRubricSelfGrade ?? {}) }
      if (level == null) delete prev[criterionId]
      else prev[criterionId] = level
      const aeCapstoneRubricSelfGrade = Object.keys(prev).length ? prev : undefined
      persist({ ...cur, aeCapstoneRubricSelfGrade }, true)
    },
    [courseSlug, persist],
  )

  const toggleMasteryCheckpoint = useCallback(
    (checkpointId: string, done: boolean) => {
      const cur = loadFlagshipCourseProgress(courseSlug)
      const set = new Set(cur.completedMasteryCheckpointIds ?? [])
      if (done) set.add(checkpointId)
      else set.delete(checkpointId)
      persist(
        {
          ...cur,
          completedMasteryCheckpointIds: [...set],
        },
        true,
      )
    },
    [courseSlug, persist],
  )

  const api = useMemo((): FlagshipCourseProgressApi => {
    if (!curriculum || sessions.length === 0) {
      return {
        state,
        completed,
        progressPercent: 0,
        modulesCompleted: 0,
        modulesTotal: 0,
        stageSummary: emptyStageSummary(),
        currentStageLabel: '—',
        nextSession: undefined,
        resumeLabel: 'Start learning',
        capstoneUnlocked: false,
        capstonePrepAccessible: false,
        capstonePrepComplete: false,
        remainingBeforeCapstone: 0,
        needsAttention: [],
        syncHydrated,
        masteryCheckpointsDone: 0,
        masteryCheckpointsTotal: 0,
        pendingMasteryModuleTitles: [],
        learningGuidanceLine: null,
        readinessCompactLabel: null,
        readinessDetailHint: null,
        markSessionComplete,
        touchActiveSession,
        toggleReviewFlag,
        toggleMasteryCheckpoint,
        resetProgress,
        updateModuleQuizRecord,
        setAeCapstoneRubricCriterion: () => {},
        certificateReady: false,
      }
    }

    const ckDone = masteryCheckpointCompletionSet(state)
    const mcProg = masteryEvidenceProgress(curriculum.modules, ckDone)
    const pendingMastery = modulesPendingMasteryCheckpoints(curriculum, sessions, completed, ckDone)
    const capUnlocked = isCapstoneUnlocked(sessions, completed)
    const prepAccessible = capstonePrepAccessible(curriculum, sessions, completed, ckDone)
    const prepDone = isCapstonePrepComplete(sessions, completed)

    let learningGuidanceLine: string | null = null
    if (pendingMastery.length > 0) {
      learningGuidanceLine = `Next: finish the two checkpoints on the practice session for “${pendingMastery[0].title}”.`
    } else if (needsAttentionSessions(sessions, completed).length > 0) {
      learningGuidanceLine = 'Optional: revisit an open recap or review session from an earlier module.'
    } else if (capUnlocked && !prepAccessible) {
      learningGuidanceLine = 'Sessions are done—finish the remaining practice checkpoints so capstone prep can open.'
    } else if (prepAccessible && !prepDone) {
      learningGuidanceLine = 'Capstone prep is open—align deliverables to the brief, then mark prep complete when ready.'
    }

    const needsAtt = needsAttentionSessions(sessions, completed)
    const readiness = flagshipReadinessCompact({
      pendingMasteryModuleTitle: pendingMastery[0]?.title,
      needsAttentionCount: needsAtt.length,
      capstoneUnlocked: capUnlocked,
      capstonePrepAccessible: prepAccessible,
      capstonePrepComplete: prepDone,
      masteryDone: mcProg.done,
      masteryTotal: mcProg.total,
    })

    const displayPct = getFlagshipCourseDisplayProgressPercent(courseSlug, curriculum, sessions, state)
    const modCount = modulesCompletedCount(curriculum, sessions, completed, state)
    const next = findNextFlagshipResumeSession(curriculum, sessions, completed, ckDone, state)
    const stageSummary = stageProgressSummary(curriculum, sessions, completed, state)
    const nextModule = next ? curriculum.modules.find((m) => m.id === next.moduleId) : undefined
    const currentStageLabel = nextModule ? flagshipStageLabel(nextModule.stage) : 'Mastery complete'
    const nonCap = sessions.filter((s) => s.type !== 'capstone_prep')
    const remainingBeforeCapstone = nonCap.filter((s) => !completed.has(s.id)).length
    const certificateReady = isFlagshipCertificateReady(curriculum, sessions, completed, ckDone, state)

    return {
      state,
      completed,
      progressPercent: displayPct,
      modulesCompleted: modCount.completed,
      modulesTotal: modCount.total,
      stageSummary,
      currentStageLabel,
      nextSession: next,
      resumeLabel: nextResumeLabel(next),
      capstoneUnlocked: capUnlocked,
      capstonePrepAccessible: prepAccessible,
      capstonePrepComplete: prepDone,
      remainingBeforeCapstone,
      needsAttention: needsAtt,
      syncHydrated,
      masteryCheckpointsDone: mcProg.done,
      masteryCheckpointsTotal: mcProg.total,
      pendingMasteryModuleTitles: pendingMastery.map((m) => m.title).slice(0, 4),
      learningGuidanceLine,
      readinessCompactLabel: readiness.compactLabel,
      readinessDetailHint: readiness.detailHint,
      markSessionComplete,
      touchActiveSession,
      toggleReviewFlag,
      toggleMasteryCheckpoint,
      resetProgress,
      updateModuleQuizRecord,
      setAeCapstoneRubricCriterion,
      certificateReady,
    }
  }, [
    courseSlug,
    curriculum,
    sessions,
    completed,
    state,
    syncHydrated,
    markSessionComplete,
    touchActiveSession,
    toggleReviewFlag,
    toggleMasteryCheckpoint,
    resetProgress,
    updateModuleQuizRecord,
    setAeCapstoneRubricCriterion,
  ])

  return api
}

export function sessionCompletionFromState(state: FlagshipCourseProgressState, sessionId: string): boolean {
  return isSessionCompleted(state, sessionId)
}
