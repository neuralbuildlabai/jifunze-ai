import { useCallback, useEffect, useMemo, useState } from 'react'
import type { StandaloneCourseModule } from '../data/courses/practicalMathematicsCourseTypes'
import {
  emptyPracticalMathProgress,
  lessonKey,
  type PracticalMathProgressState,
  type PracticalMathQuizScore,
} from '../data/courses/practicalMathematicsProgression'
import {
  PRACTICAL_MATH_PROGRESS_EVENT,
  readPracticalMathProgressFromStorage,
  writePracticalMathProgressToStorage,
} from '../lib/practicalMathProgressStorage'

function cloneProgress(s: PracticalMathProgressState): PracticalMathProgressState {
  return {
    completedLessonKeys: new Set(s.completedLessonKeys),
    passedModuleQuizzes: new Map(s.passedModuleQuizzes),
    capstoneComplete: s.capstoneComplete,
  }
}

export function usePracticalMathProgress() {
  const [progress, setProgress] = useState<PracticalMathProgressState>(() => readPracticalMathProgressFromStorage())

  useEffect(() => {
    const sync = () => setProgress(readPracticalMathProgressFromStorage())
    window.addEventListener(PRACTICAL_MATH_PROGRESS_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(PRACTICAL_MATH_PROGRESS_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const markLessonComplete = useCallback((module: StandaloneCourseModule, lessonNumber: string) => {
    setProgress((prev) => {
      const next = cloneProgress(prev)
      next.completedLessonKeys.add(lessonKey(module, lessonNumber))
      writePracticalMathProgressToStorage(next)
      return next
    })
  }, [])

  const setModuleQuizScore = useCallback((moduleSlug: string, score: PracticalMathQuizScore) => {
    setProgress((prev) => {
      const next = cloneProgress(prev)
      next.passedModuleQuizzes.set(moduleSlug, score)
      writePracticalMathProgressToStorage(next)
      return next
    })
  }, [])

  const markCapstoneComplete = useCallback(() => {
    setProgress((prev) => {
      const next = cloneProgress(prev)
      next.capstoneComplete = true
      writePracticalMathProgressToStorage(next)
      return next
    })
  }, [])

  const clearCapstoneComplete = useCallback(() => {
    setProgress((prev) => {
      const next = cloneProgress(prev)
      next.capstoneComplete = false
      writePracticalMathProgressToStorage(next)
      return next
    })
  }, [])

  const resetProgress = useCallback(() => {
    const next = emptyPracticalMathProgress()
    writePracticalMathProgressToStorage(next)
    setProgress(next)
  }, [])

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
