/**
 * Device-local progress for the chatbot curriculum (canonical lesson slugs).
 */

export const CHATBOT_CURRICULUM_PROGRESS_STORAGE_KEY = 'jifunze.chatbotLibrary.curriculumProgress.v1'

const STORAGE_KEY = CHATBOT_CURRICULUM_PROGRESS_STORAGE_KEY

export type ChatbotCurriculumProgressState = {
  viewedAt: Record<string, string>
  completed: string[]
}

function safeParse(raw: string | null): ChatbotCurriculumProgressState | null {
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as Partial<ChatbotCurriculumProgressState>
    if (!data || typeof data !== 'object') return null
    const viewedAt =
      data.viewedAt && typeof data.viewedAt === 'object' ? (data.viewedAt as Record<string, string>) : {}
    const completed = Array.isArray(data.completed) ? data.completed.filter((s) => typeof s === 'string') : []
    return { viewedAt, completed }
  } catch {
    return null
  }
}

export function loadChatbotCurriculumProgress(): ChatbotCurriculumProgressState {
  if (typeof window === 'undefined') return { viewedAt: {}, completed: [] }
  const parsed = safeParse(window.localStorage.getItem(STORAGE_KEY))
  return parsed ?? { viewedAt: {}, completed: [] }
}

export function saveChatbotCurriculumProgress(next: ChatbotCurriculumProgressState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore
  }
}

export function markChatbotCurriculumLessonViewed(slug: string) {
  const cur = loadChatbotCurriculumProgress()
  const viewedAt = { ...cur.viewedAt, [slug]: new Date().toISOString() }
  saveChatbotCurriculumProgress({ ...cur, viewedAt })
}

export function toggleChatbotCurriculumLessonComplete(slug: string, completed: boolean) {
  const cur = loadChatbotCurriculumProgress()
  const set = new Set(cur.completed)
  if (completed) set.add(slug)
  else set.delete(slug)
  saveChatbotCurriculumProgress({ ...cur, completed: [...set] })
}

export function isChatbotCurriculumLessonCompleted(slug: string): boolean {
  return loadChatbotCurriculumProgress().completed.includes(slug)
}
