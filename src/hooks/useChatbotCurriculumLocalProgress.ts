import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  CHATBOT_CURRICULUM_PROGRESS_STORAGE_KEY,
  isChatbotCurriculumLessonCompleted,
  loadChatbotCurriculumProgress,
  markChatbotCurriculumLessonViewed,
  toggleChatbotCurriculumLessonComplete,
  type ChatbotCurriculumProgressState,
} from '../lib/chatbotCurriculumLocalProgress'

const PROGRESS_EVENT = 'jifunze-chatbot-curriculum-progress'

function subscribeProgress(onChange: () => void) {
  if (typeof window === 'undefined') return () => {}
  const handler = () => onChange()
  window.addEventListener(PROGRESS_EVENT, handler)
  const onStorage = (e: StorageEvent) => {
    if (e.key === CHATBOT_CURRICULUM_PROGRESS_STORAGE_KEY) onChange()
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

export function useChatbotCurriculumLocalProgress() {
  const [state, setState] = useState<ChatbotCurriculumProgressState>(() => loadChatbotCurriculumProgress())

  useEffect(() => {
    if (typeof window === 'undefined') return
    return subscribeProgress(() => setState(loadChatbotCurriculumProgress()))
  }, [])

  const markViewed = useCallback((slug: string) => {
    markChatbotCurriculumLessonViewed(slug)
    bumpProgressBus()
  }, [])

  const setCompleted = useCallback((slug: string, completed: boolean) => {
    toggleChatbotCurriculumLessonComplete(slug, completed)
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
    isLessonCompletedSync: isChatbotCurriculumLessonCompleted,
  }
}
