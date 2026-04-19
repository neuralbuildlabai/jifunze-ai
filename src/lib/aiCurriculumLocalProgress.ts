/**
 * Device-local progress for the AI curriculum (keyed by canonical lesson slugs).
 * Not a server authorization boundary—optional UX for continuity across sessions.
 */

export const AI_CURRICULUM_PROGRESS_STORAGE_KEY = 'jifunze.aiLibrary.curriculumProgress.v1'

const STORAGE_KEY = AI_CURRICULUM_PROGRESS_STORAGE_KEY

export type AiCurriculumProgressState = {
  /** ISO timestamps for last visit */
  viewedAt: Record<string, string>
  /** Slugs explicitly marked complete by the learner */
  completed: string[]
}

function safeParse(raw: string | null): AiCurriculumProgressState | null {
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as Partial<AiCurriculumProgressState>
    if (!data || typeof data !== 'object') return null
    const viewedAt =
      data.viewedAt && typeof data.viewedAt === 'object' ? (data.viewedAt as Record<string, string>) : {}
    const completed = Array.isArray(data.completed) ? data.completed.filter((s) => typeof s === 'string') : []
    return { viewedAt, completed }
  } catch {
    return null
  }
}

export function loadAiCurriculumProgress(): AiCurriculumProgressState {
  if (typeof window === 'undefined') return { viewedAt: {}, completed: [] }
  const parsed = safeParse(window.localStorage.getItem(STORAGE_KEY))
  return parsed ?? { viewedAt: {}, completed: [] }
}

export function saveAiCurriculumProgress(next: AiCurriculumProgressState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore quota / private mode
  }
}

export function markAiCurriculumLessonViewed(slug: string) {
  const cur = loadAiCurriculumProgress()
  const viewedAt = { ...cur.viewedAt, [slug]: new Date().toISOString() }
  saveAiCurriculumProgress({ ...cur, viewedAt })
}

export function toggleAiCurriculumLessonComplete(slug: string, completed: boolean) {
  const cur = loadAiCurriculumProgress()
  const set = new Set(cur.completed)
  if (completed) set.add(slug)
  else set.delete(slug)
  saveAiCurriculumProgress({ ...cur, completed: [...set] })
}

export function isAiCurriculumLessonCompleted(slug: string): boolean {
  return loadAiCurriculumProgress().completed.includes(slug)
}
