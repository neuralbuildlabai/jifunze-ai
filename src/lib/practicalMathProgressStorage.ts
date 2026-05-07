import {
  emptyPracticalMathProgress,
  type PracticalMathProgressState,
  type PracticalMathQuizScore,
} from '../data/courses/practicalMathematicsProgression'

export const PRACTICAL_MATH_PROGRESS_STORAGE_KEY = 'jifunze.practical_math.progress.v1' as const

export const PRACTICAL_MATH_PROGRESS_EVENT = 'jifunze:practical-math-progress' as const

export type PracticalMathProgressStoredV1 = {
  v: 1
  completedLessonKeys: string[]
  passedModuleQuizzes: Record<string, PracticalMathQuizScore>
  capstoneComplete?: boolean
}

export function practicalMathProgressToStored(state: PracticalMathProgressState): PracticalMathProgressStoredV1 {
  return {
    v: 1,
    completedLessonKeys: [...state.completedLessonKeys],
    passedModuleQuizzes: Object.fromEntries(state.passedModuleQuizzes),
    capstoneComplete: state.capstoneComplete,
  }
}

export function storedToPracticalMathProgress(data: PracticalMathProgressStoredV1): PracticalMathProgressState {
  const passed = new Map<string, PracticalMathQuizScore>()
  for (const [k, v] of Object.entries(data.passedModuleQuizzes ?? {})) {
    if (v && typeof v.correct === 'number' && typeof v.total === 'number') passed.set(k, v)
  }
  return {
    completedLessonKeys: new Set(data.completedLessonKeys ?? []),
    passedModuleQuizzes: passed,
    capstoneComplete: data.capstoneComplete === true,
  }
}

export function readPracticalMathProgressFromStorage(): PracticalMathProgressState {
  if (typeof window === 'undefined') return emptyPracticalMathProgress()
  try {
    const raw = window.localStorage.getItem(PRACTICAL_MATH_PROGRESS_STORAGE_KEY)
    if (!raw) return emptyPracticalMathProgress()
    const parsed = JSON.parse(raw) as Partial<PracticalMathProgressStoredV1>
    if (parsed?.v !== 1) return emptyPracticalMathProgress()
    return storedToPracticalMathProgress({
      v: 1,
      completedLessonKeys: Array.isArray(parsed.completedLessonKeys) ? parsed.completedLessonKeys : [],
      passedModuleQuizzes:
        parsed.passedModuleQuizzes && typeof parsed.passedModuleQuizzes === 'object'
          ? (parsed.passedModuleQuizzes as Record<string, PracticalMathQuizScore>)
          : {},
      capstoneComplete: parsed.capstoneComplete === true,
    })
  } catch {
    return emptyPracticalMathProgress()
  }
}

export function writePracticalMathProgressToStorage(state: PracticalMathProgressState): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(
    PRACTICAL_MATH_PROGRESS_STORAGE_KEY,
    JSON.stringify(practicalMathProgressToStored(state)),
  )
  window.dispatchEvent(new CustomEvent(PRACTICAL_MATH_PROGRESS_EVENT))
}
