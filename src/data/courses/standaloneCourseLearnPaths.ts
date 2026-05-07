/**
 * URL helpers and lookups for standalone course learn surfaces.
 * Isolated from flagship routing.
 */

import type { PracticalMathematicsCourse, StandaloneCourseLesson, StandaloneCourseModule } from './practicalMathematicsCourseTypes'
import { findStandaloneModule, type StandaloneCatalogEntry } from './standaloneCoursesCatalog'

/** Deterministic URL segment: lesson number + slugified title (unique within a module). */
export function slugifyForUrlSegment(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
}

export function getStandaloneLessonSlug(lesson: StandaloneCourseLesson): string {
  const num = lesson.lessonNumber.replace(/\./g, '-')
  const titlePart = slugifyForUrlSegment(lesson.title)
  return titlePart ? `${num}-${titlePart}` : num
}

export function getStandaloneCoursePath(courseSlug: string): string {
  return `/learn/${courseSlug}`
}

export function getStandaloneModulePath(courseSlug: string, moduleSlug: string): string {
  return `/learn/${courseSlug}/modules/${moduleSlug}`
}

export function getStandaloneLessonPath(courseSlug: string, moduleSlug: string, lessonSlug: string): string {
  return `/learn/${courseSlug}/modules/${moduleSlug}/lessons/${lessonSlug}`
}

export function getStandaloneCertificatePath(courseSlug: string): string {
  return `/learn/${courseSlug}/certificate`
}

export function getStandaloneFirstLessonPath(courseSlug: string, course: PracticalMathematicsCourse): string | null {
  const m0 = course.modules[0]
  const l0 = m0?.lessons[0]
  if (!m0 || !l0) return null
  return getStandaloneLessonPath(courseSlug, m0.slug, getStandaloneLessonSlug(l0))
}

export function findStandaloneLesson(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string,
): { entry: StandaloneCatalogEntry; module: StandaloneCourseModule; lesson: StandaloneCourseLesson; lessonIndex: number } | undefined {
  const mod = findStandaloneModule(courseSlug, moduleSlug)
  if (!mod) return undefined
  const idx = mod.module.lessons.findIndex((l) => getStandaloneLessonSlug(l) === lessonSlug)
  if (idx < 0) return undefined
  return { entry: mod.entry, module: mod.module, lesson: mod.module.lessons[idx]!, lessonIndex: idx }
}

export type StandaloneLessonNavTargets = {
  coursePath: string
  modulePath: string
  prevLessonPath: string | null
  nextLessonPath: string | null
}

/**
 * Previous/next stay within the same module (spec). From the first lesson, Previous goes to the module page.
 * From the last lesson, Next goes to the module page (practice lab + quiz live there).
 */
export function getStandaloneLessonNavTargets(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string,
): StandaloneLessonNavTargets | null {
  const hit = findStandaloneLesson(courseSlug, moduleSlug, lessonSlug)
  if (!hit) return null
  const { module, lessonIndex } = hit
  const modulePath = getStandaloneModulePath(courseSlug, module.slug)
  const coursePath = getStandaloneCoursePath(courseSlug)

  const prevLessonPath =
    lessonIndex > 0
      ? getStandaloneLessonPath(courseSlug, module.slug, getStandaloneLessonSlug(module.lessons[lessonIndex - 1]!))
      : null

  const nextLessonPath =
    lessonIndex < module.lessons.length - 1
      ? getStandaloneLessonPath(courseSlug, module.slug, getStandaloneLessonSlug(module.lessons[lessonIndex + 1]!))
      : null

  return { coursePath, modulePath, prevLessonPath, nextLessonPath }
}
