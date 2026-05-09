import {
  emptyPracticalMathProgress,
  type PracticalMathProgressState,
  type PracticalMathQuizScore,
} from '../data/courses/practicalMathematicsProgression'
import { PRACTICAL_MATH_INTERNAL_KEY } from '../data/courses/practicalMathematicsCourseConstants'

/** Legacy single-course storage (Practical Mathematics only). Migrated into v2 on first read/write. */
export const PRACTICAL_MATH_PROGRESS_STORAGE_KEY = 'jifunze.practical_math.progress.v1' as const

/** Multi-course standalone progress (versioned blob). */
export const STANDALONE_COURSES_PROGRESS_V2_KEY = 'jifunze.standalone_courses.progress.v2' as const

export const PRACTICAL_MATH_PROGRESS_EVENT = 'jifunze:standalone-course-progress' as const

export type PracticalMathProgressStoredV1 = {
  v: 1
  completedLessonKeys: string[]
  passedModuleQuizzes: Record<string, PracticalMathQuizScore>
  capstoneComplete?: boolean
}

type StandaloneCoursesProgressV2 = {
  v: 2
  courses: Record<string, PracticalMathProgressStoredV1>
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

function readLegacyV1PracticalMathOnly(): PracticalMathProgressState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(PRACTICAL_MATH_PROGRESS_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<PracticalMathProgressStoredV1>
    if (parsed?.v !== 1) return null
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
    return null
  }
}

function readV2Root(): StandaloneCoursesProgressV2 | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STANDALONE_COURSES_PROGRESS_V2_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<StandaloneCoursesProgressV2>
    if (parsed?.v !== 2 || !parsed.courses || typeof parsed.courses !== 'object') return null
    return { v: 2, courses: parsed.courses as Record<string, PracticalMathProgressStoredV1> }
  } catch {
    return null
  }
}

function writeV2Root(root: StandaloneCoursesProgressV2): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STANDALONE_COURSES_PROGRESS_V2_KEY, JSON.stringify(root))
  window.dispatchEvent(new CustomEvent(PRACTICAL_MATH_PROGRESS_EVENT))
}

/**
 * Read progress for one standalone course. Migrates legacy Practical Mathematics v1 blob into v2
 * the first time Practical Mathematics progress is requested.
 */
export function readStandaloneCourseProgressFromStorage(courseInternalKey: string): PracticalMathProgressState {
  if (typeof window === 'undefined') return emptyPracticalMathProgress()

  const v2 = readV2Root()
  const slice = v2?.courses[courseInternalKey]
  if (slice && slice.v === 1) {
    return storedToPracticalMathProgress(slice)
  }

  if (courseInternalKey === PRACTICAL_MATH_INTERNAL_KEY) {
    const legacy = readLegacyV1PracticalMathOnly()
    if (legacy) return legacy
  }

  return emptyPracticalMathProgress()
}

export function writeStandaloneCourseProgressToStorage(courseInternalKey: string, state: PracticalMathProgressState): void {
  if (typeof window === 'undefined') return

  let v2 = readV2Root() ?? { v: 2 as const, courses: {} }

  if (courseInternalKey === PRACTICAL_MATH_INTERNAL_KEY && !v2.courses[PRACTICAL_MATH_INTERNAL_KEY]) {
    const legacy = readLegacyV1PracticalMathOnly()
    if (legacy) {
      v2 = {
        ...v2,
        courses: {
          ...v2.courses,
          [PRACTICAL_MATH_INTERNAL_KEY]: practicalMathProgressToStored(legacy),
        },
      }
    }
  }

  v2 = {
    ...v2,
    courses: {
      ...v2.courses,
      [courseInternalKey]: practicalMathProgressToStored(state),
    },
  }

  writeV2Root(v2)
}

/** @deprecated Use readStandaloneCourseProgressFromStorage(PRACTICAL_MATH_INTERNAL_KEY) */
export function readPracticalMathProgressFromStorage(): PracticalMathProgressState {
  return readStandaloneCourseProgressFromStorage(PRACTICAL_MATH_INTERNAL_KEY)
}

/** @deprecated Use writeStandaloneCourseProgressToStorage(PRACTICAL_MATH_INTERNAL_KEY, state) */
export function writePracticalMathProgressToStorage(state: PracticalMathProgressState): void {
  writeStandaloneCourseProgressToStorage(PRACTICAL_MATH_INTERNAL_KEY, state)
}
