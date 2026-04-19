import type { CurriculumCategory } from './aiEverydayWorkCurriculum'
import { flattenLessonsForCurriculum } from './extendedLibrariesCurricula'

export type StandaloneCourseScanStats = {
  moduleCount: number
  lessonCount: number
  publicPreviewLessonCount: number
}

export function getStandaloneCourseScanStats(curriculum: CurriculumCategory[]): StandaloneCourseScanStats {
  const lessons = flattenLessonsForCurriculum(curriculum)
  const moduleCount = curriculum.reduce((n, cat) => n + cat.modules.length, 0)
  return {
    moduleCount,
    lessonCount: lessons.length,
    publicPreviewLessonCount: lessons.filter((l) => l.access === 'public').length,
  }
}

export function firstPublicLessonHrefs(publicBasePath: string, curriculum: CurriculumCategory[], limit = 2): string[] {
  const lessons = flattenLessonsForCurriculum(curriculum)
    .filter((l) => l.access === 'public')
    .sort((a, b) => a.order - b.order)
    .slice(0, limit)
  return lessons.map((l) => `${publicBasePath}/${l.slug}`)
}

export type PublicLessonPreviewLink = { href: string; title: string }

export function firstPublicLessonPreviewLinks(
  publicBasePath: string,
  curriculum: CurriculumCategory[],
  limit = 2,
): PublicLessonPreviewLink[] {
  const lessons = flattenLessonsForCurriculum(curriculum)
    .filter((l) => l.access === 'public')
    .sort((a, b) => a.order - b.order)
    .slice(0, limit)
  return lessons.map((l) => ({ href: `${publicBasePath}/${l.slug}`, title: l.shortTitle }))
}
