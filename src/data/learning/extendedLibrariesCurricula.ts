import type { CurriculumCategory, CurriculumLesson } from './aiEverydayWorkCurriculum'
import {
  CLOUD_DEVOPS_PLATFORM_LIBRARY_SPEC,
  CONTENT_CREATION_PUBLISHING_LIBRARY_SPEC,
  CYBERSECURITY_DEFENSE_LIBRARY_SPEC,
  MONITORING_OBSERVABILITY_LIBRARY_SPEC,
  NETWORKING_INFRASTRUCTURE_LIBRARY_SPEC,
} from './extendedLibrariesSpecs'
import { compileExtendedLibrary } from './libraryCompiler'
import {
  GEMINI_WORKSPACE_PRODUCTIVITY_PUBLIC_BASE_PATH,
  LEARN_CHATGPT_EVERYDAY_PUBLIC_BASE_PATH,
  PROMPT_ENGINEERING_MODELS_PUBLIC_BASE_PATH,
  STANDALONE_CATEGORY_LIBRARY_TITLE,
  STANDALONE_COURSE_CURRICULA,
} from './standaloneCoursesCatalog'

export const NETWORKING_PUBLIC_BASE_PATH = '/library/networking-and-infrastructure'
export const CYBERSECURITY_PUBLIC_BASE_PATH = '/library/cybersecurity-defense'
export const CLOUD_DEVOPS_PUBLIC_BASE_PATH = '/library/cloud-devops-platform'
export const MONITORING_PUBLIC_BASE_PATH = '/library/monitoring-observability'
export const CONTENT_PUBLISHING_PUBLIC_BASE_PATH = '/library/content-creation'

export const NETWORKING_LIBRARY_CURRICULUM: CurriculumCategory[] = compileExtendedLibrary(NETWORKING_INFRASTRUCTURE_LIBRARY_SPEC)
export const CYBERSECURITY_LIBRARY_CURRICULUM: CurriculumCategory[] = compileExtendedLibrary(CYBERSECURITY_DEFENSE_LIBRARY_SPEC)
export const CLOUD_DEVOPS_LIBRARY_CURRICULUM: CurriculumCategory[] = compileExtendedLibrary(CLOUD_DEVOPS_PLATFORM_LIBRARY_SPEC)
export const MONITORING_LIBRARY_CURRICULUM: CurriculumCategory[] = compileExtendedLibrary(MONITORING_OBSERVABILITY_LIBRARY_SPEC)
export const CONTENT_PUBLISHING_LIBRARY_CURRICULUM: CurriculumCategory[] = compileExtendedLibrary(CONTENT_CREATION_PUBLISHING_LIBRARY_SPEC)

export const EXTENDED_CATEGORY_ID_TO_LIBRARY_TITLE: Record<string, string> = (() => {
  const map: Record<string, string> = {}
  const specs = [
    NETWORKING_INFRASTRUCTURE_LIBRARY_SPEC,
    CYBERSECURITY_DEFENSE_LIBRARY_SPEC,
    CLOUD_DEVOPS_PLATFORM_LIBRARY_SPEC,
    MONITORING_OBSERVABILITY_LIBRARY_SPEC,
    CONTENT_CREATION_PUBLISHING_LIBRARY_SPEC,
  ]
  for (const spec of specs) {
    for (const cat of spec.categories) {
      map[cat.id] = spec.libraryTitle
    }
  }
  Object.assign(map, STANDALONE_CATEGORY_LIBRARY_TITLE)
  return map
})()

const ALL_EXTENDED_CURRICULA: CurriculumCategory[][] = [
  NETWORKING_LIBRARY_CURRICULUM,
  CYBERSECURITY_LIBRARY_CURRICULUM,
  CLOUD_DEVOPS_LIBRARY_CURRICULUM,
  MONITORING_LIBRARY_CURRICULUM,
  CONTENT_PUBLISHING_LIBRARY_CURRICULUM,
  ...STANDALONE_COURSE_CURRICULA,
]

export function flattenExtendedLessons(): CurriculumLesson[] {
  const out: CurriculumLesson[] = []
  for (const tree of ALL_EXTENDED_CURRICULA) {
    for (const cat of tree) {
      for (const mod of cat.modules) {
        for (const lesson of mod.lessons) out.push(lesson)
      }
    }
  }
  return out.sort((a, b) => a.order - b.order)
}

export function getExtendedCatalogLesson(slug: string | undefined): CurriculumLesson | null {
  if (!slug) return null
  for (const tree of ALL_EXTENDED_CURRICULA) {
    for (const cat of tree) {
      for (const mod of cat.modules) {
        const hit = mod.lessons.find((l) => l.slug === slug)
        if (hit) return hit
      }
    }
  }
  return null
}

export function getExtendedCatalogPlacement(slug: string): {
  category: CurriculumCategory
  module: import('./aiEverydayWorkCurriculum').CurriculumModule
  lesson: CurriculumLesson
} | null {
  for (const tree of ALL_EXTENDED_CURRICULA) {
    for (const cat of tree) {
      for (const mod of cat.modules) {
        const lesson = mod.lessons.find((l) => l.slug === slug)
        if (lesson) return { category: cat, module: mod, lesson }
      }
    }
  }
  return null
}

export function getAdjacentExtendedLessons(slug: string): {
  prev: CurriculumLesson | null
  next: CurriculumLesson | null
} {
  const flat = flattenExtendedLessons()
  const idx = flat.findIndex((l) => l.slug === slug)
  if (idx < 0) return { prev: null, next: null }
  return {
    prev: idx > 0 ? flat[idx - 1]! : null,
    next: idx < flat.length - 1 ? flat[idx + 1]! : null,
  }
}

export function flattenLessonsForCurriculum(curriculum: CurriculumCategory[]): CurriculumLesson[] {
  const out: CurriculumLesson[] = []
  for (const cat of curriculum) {
    for (const mod of cat.modules) {
      for (const lesson of mod.lessons) out.push(lesson)
    }
  }
  return out.sort((a, b) => a.order - b.order)
}

export function getAdjacentLessonsWithinCurriculum(slug: string, curriculum: CurriculumCategory[]): {
  prev: CurriculumLesson | null
  next: CurriculumLesson | null
} {
  const flat = flattenLessonsForCurriculum(curriculum)
  const idx = flat.findIndex((l) => l.slug === slug)
  if (idx < 0) return { prev: null, next: null }
  return {
    prev: idx > 0 ? flat[idx - 1]! : null,
    next: idx < flat.length - 1 ? flat[idx + 1]! : null,
  }
}

export function extendedCatalogStats() {
  const lessons = flattenExtendedLessons()
  return {
    libraries: ALL_EXTENDED_CURRICULA.length,
    lessons: lessons.length,
    publicLessons: lessons.filter((l) => l.access === 'public').length,
    signedInLessons: lessons.filter((l) => l.access === 'signed_in').length,
    premiumLessons: lessons.filter((l) => l.access === 'premium').length,
  }
}

export function extendedLessonPublicHref(slug: string): string | null {
  const placement = getExtendedCatalogPlacement(slug)
  if (!placement) return null
  const id = placement.category.id
  if (id.startsWith('lcew-')) return `${LEARN_CHATGPT_EVERYDAY_PUBLIC_BASE_PATH}/${slug}`
  if (id.startsWith('pem-')) return `${PROMPT_ENGINEERING_MODELS_PUBLIC_BASE_PATH}/${slug}`
  if (id.startsWith('gpw-')) return `${GEMINI_WORKSPACE_PRODUCTIVITY_PUBLIC_BASE_PATH}/${slug}`
  const networkingIds = new Set(NETWORKING_LIBRARY_CURRICULUM.map((c) => c.id))
  const cyberIds = new Set(CYBERSECURITY_LIBRARY_CURRICULUM.map((c) => c.id))
  const cloudIds = new Set(CLOUD_DEVOPS_LIBRARY_CURRICULUM.map((c) => c.id))
  const monitoringIds = new Set(MONITORING_LIBRARY_CURRICULUM.map((c) => c.id))
  const contentIds = new Set(CONTENT_PUBLISHING_LIBRARY_CURRICULUM.map((c) => c.id))

  if (networkingIds.has(id)) return `${NETWORKING_PUBLIC_BASE_PATH}/${slug}`
  if (cyberIds.has(id)) return `${CYBERSECURITY_PUBLIC_BASE_PATH}/${slug}`
  if (cloudIds.has(id)) return `${CLOUD_DEVOPS_PUBLIC_BASE_PATH}/${slug}`
  if (monitoringIds.has(id)) return `${MONITORING_PUBLIC_BASE_PATH}/${slug}`
  if (contentIds.has(id)) return `${CONTENT_PUBLISHING_PUBLIC_BASE_PATH}/${slug}`
  return null
}
