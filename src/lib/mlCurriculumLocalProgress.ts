/**
 * Device-local progress for the Machine Learning curriculum (canonical lesson slugs).
 */

export const ML_CURRICULUM_PROGRESS_STORAGE_KEY = 'jifunze.mlLibrary.curriculumProgress.v1'

const STORAGE_KEY = ML_CURRICULUM_PROGRESS_STORAGE_KEY

export type MlCurriculumProgressState = {
  viewedAt: Record<string, string>
  completed: string[]
}

function safeParse(raw: string | null): MlCurriculumProgressState | null {
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as Partial<MlCurriculumProgressState>
    if (!data || typeof data !== 'object') return null
    const viewedAt =
      data.viewedAt && typeof data.viewedAt === 'object' ? (data.viewedAt as Record<string, string>) : {}
    const completed = Array.isArray(data.completed) ? data.completed.filter((s) => typeof s === 'string') : []
    return { viewedAt, completed }
  } catch {
    return null
  }
}

export function loadMlCurriculumProgress(): MlCurriculumProgressState {
  if (typeof window === 'undefined') return { viewedAt: {}, completed: [] }
  const parsed = safeParse(window.localStorage.getItem(STORAGE_KEY))
  return parsed ?? { viewedAt: {}, completed: [] }
}

export function saveMlCurriculumProgress(next: MlCurriculumProgressState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore
  }
}

export function markMlCurriculumLessonViewed(slug: string) {
  const cur = loadMlCurriculumProgress()
  const viewedAt = { ...cur.viewedAt, [slug]: new Date().toISOString() }
  saveMlCurriculumProgress({ ...cur, viewedAt })
}

export function toggleMlCurriculumLessonComplete(slug: string, completed: boolean) {
  const cur = loadMlCurriculumProgress()
  const set = new Set(cur.completed)
  if (completed) set.add(slug)
  else set.delete(slug)
  saveMlCurriculumProgress({ ...cur, completed: [...set] })
}

export function isMlCurriculumLessonCompleted(slug: string): boolean {
  return loadMlCurriculumProgress().completed.includes(slug)
}
