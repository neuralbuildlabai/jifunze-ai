import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  AI_CURRICULUM_PROGRESS_STORAGE_KEY,
  isAiCurriculumLessonCompleted,
  loadAiCurriculumProgress,
  markAiCurriculumLessonViewed,
  toggleAiCurriculumLessonComplete,
  type AiCurriculumProgressState,
} from '../lib/aiCurriculumLocalProgress'

const PROGRESS_EVENT = 'jifunze-ai-curriculum-progress'

function subscribeProgress(onChange: () => void) {
  const handler = () => onChange()
  window.addEventListener(PROGRESS_EVENT, handler)
  const onStorage = (e: StorageEvent) => {
    if (e.key === AI_CURRICULUM_PROGRESS_STORAGE_KEY) onChange()
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

/**
 * Local device progress for AI library lessons (canonical slugs).
 */
export function useAiCurriculumLocalProgress() {
  const [state, setState] = useState<AiCurriculumProgressState>(() => loadAiCurriculumProgress())

  useEffect(() => {
    return subscribeProgress(() => setState(loadAiCurriculumProgress()))
  }, [])

  const markViewed = useCallback((slug: string) => {
    markAiCurriculumLessonViewed(slug)
    bumpProgressBus()
  }, [])

  const setCompleted = useCallback((slug: string, completed: boolean) => {
    toggleAiCurriculumLessonComplete(slug, completed)
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
    isLessonCompletedSync: isAiCurriculumLessonCompleted,
  }
}
