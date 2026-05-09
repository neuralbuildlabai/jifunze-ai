import { useCallback, useEffect, useMemo, useState } from 'react'
import type { StandaloneCourseModule } from '../data/courses/practicalMathematicsCourseTypes'
import {
  emptyPracticalMathProgress,
  lessonKey,
  type PracticalMathProgressState,
  type PracticalMathQuizScore,
} from '../data/courses/practicalMathematicsProgression'
import { PRACTICAL_MATH_INTERNAL_KEY } from '../data/courses/practicalMathematicsCourseConstants'
import {
  PRACTICAL_MATH_PROGRESS_EVENT,
  readStandaloneCourseProgressFromStorage,
  writeStandaloneCourseProgressToStorage,
} from '../lib/practicalMathProgressStorage'

function cloneProgress(s: PracticalMathProgressState): PracticalMathProgressState {
  return {
    completedLessonKeys: new Set(s.completedLessonKeys),
    passedModuleQuizzes: new Map(s.passedModuleQuizzes),
    capstoneComplete: s.capstoneComplete,
  }
}

/**
 * Local progression for one standalone course (keyed by `courseInternalKey` in storage v2).
 */
export function useStandaloneCourseProgress(courseInternalKey: string) {
  const [progress, setProgress] = useState<PracticalMathProgressState>(() =>
    readStandaloneCourseProgressFromStorage(courseInternalKey),
  )

  useEffect(() => {
    setProgress(readStandaloneCourseProgressFromStorage(courseInternalKey))
  }, [courseInternalKey])

  useEffect(() => {
    const sync = () => setProgress(readStandaloneCourseProgressFromStorage(courseInternalKey))
    window.addEventListener(PRACTICAL_MATH_PROGRESS_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(PRACTICAL_MATH_PROGRESS_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [courseInternalKey])

  const markLessonComplete = useCallback(
    (module: StandaloneCourseModule, lessonNumber: string) => {
      setProgress((prev) => {
        const next = cloneProgress(prev)
        next.completedLessonKeys.add(lessonKey(module, lessonNumber))
        writeStandaloneCourseProgressToStorage(courseInternalKey, next)
        return next
      })
    },
    [courseInternalKey],
  )

  const setModuleQuizScore = useCallback(
    (moduleSlug: string, score: PracticalMathQuizScore) => {
      setProgress((prev) => {
        const next = cloneProgress(prev)
        next.passedModuleQuizzes.set(moduleSlug, score)
        writeStandaloneCourseProgressToStorage(courseInternalKey, next)
        return next
      })
    },
    [courseInternalKey],
  )

  const markCapstoneComplete = useCallback(() => {
    setProgress((prev) => {
      const next = cloneProgress(prev)
      next.capstoneComplete = true
      writeStandaloneCourseProgressToStorage(courseInternalKey, next)
      return next
    })
  }, [courseInternalKey])

  const clearCapstoneComplete = useCallback(() => {
    setProgress((prev) => {
      const next = cloneProgress(prev)
      next.capstoneComplete = false
      writeStandaloneCourseProgressToStorage(courseInternalKey, next)
      return next
    })
  }, [courseInternalKey])

  const resetProgress = useCallback(() => {
    const next = emptyPracticalMathProgress()
    writeStandaloneCourseProgressToStorage(courseInternalKey, next)
    setProgress(next)
  }, [courseInternalKey])

  return useMemo(
    () => ({
      progress,
      markLessonComplete,
      setModuleQuizScore,
      markCapstoneComplete,
      clearCapstoneComplete,
      resetProgress,
    }),
    [clearCapstoneComplete, markCapstoneComplete, markLessonComplete, progress, resetProgress, setModuleQuizScore],
  )
}

/** Practical Mathematics — thin wrapper for legacy call sites. */
export function usePracticalMathProgress() {
  return useStandaloneCourseProgress(PRACTICAL_MATH_INTERNAL_KEY)
}
