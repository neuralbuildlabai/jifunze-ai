import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ML_CURRICULUM_PROGRESS_STORAGE_KEY,
  isMlCurriculumLessonCompleted,
  loadMlCurriculumProgress,
  markMlCurriculumLessonViewed,
  toggleMlCurriculumLessonComplete,
  type MlCurriculumProgressState,
} from '../lib/mlCurriculumLocalProgress'

const PROGRESS_EVENT = 'jifunze-ml-curriculum-progress'

function subscribeProgress(onChange: () => void) {
  if (typeof window === 'undefined') return () => {}
  const handler = () => onChange()
  window.addEventListener(PROGRESS_EVENT, handler)
  const onStorage = (e: StorageEvent) => {
    if (e.key === ML_CURRICULUM_PROGRESS_STORAGE_KEY) onChange()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(PROGRESS_EVENT, handler)
    window.removeEventListener('storage', onStorage)
  }
}

function bumpProgressBus() {
  window.dispatchEvent(new Event(PROGRESS_EVENT))
}

export function useMlCurriculumLocalProgress() {
  const [state, setState] = useState<MlCurriculumProgressState>(() => loadMlCurriculumProgress())

  useEffect(() => {
    if (typeof window === 'undefined') return
    return subscribeProgress(() => setState(loadMlCurriculumProgress()))
  }, [])

  const markViewed = useCallback((slug: string) => {
    markMlCurriculumLessonViewed(slug)
    bumpProgressBus()
  }, [])

  const setCompleted = useCallback((slug: string, completed: boolean) => {
    toggleMlCurriculumLessonComplete(slug, completed)
    bumpProgressBus()
  }, [])

  const completedSet = useMemo(() => new Set(state.completed), [state.completed])

  const isCompleted = useCallback((slug: string) => completedSet.has(slug), [completedSet])

  return {
    viewedAt: state.viewedAt,
    completed: state.completed,
    completedSet,
    isCompleted,
    markViewed,
    setCompleted,
    isLessonCompletedSync: isMlCurriculumLessonCompleted,
  }
}
