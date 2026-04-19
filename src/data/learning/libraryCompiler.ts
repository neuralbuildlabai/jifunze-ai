import type { AccessTier } from '../../access/appAccess'
import { isAtLeastTier } from '../../access/appAccess'
import type { CurriculumCategory, CurriculumLesson, CurriculumLessonAccess } from './aiEverydayWorkCurriculum'

export type ExtendedSpecCategory = {
  id: string
  title: string
  summary: string
  /** Lessons listed directly under the category (we compile a single module carrying these lessons). */
  lessons: string[]
}

export type ExtendedSpecLibrary = {
  libraryTitle: string
  categories: ExtendedSpecCategory[]
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[“”]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function lessonShortTitle(title: string) {
  const cut = title.split(',')[0]?.trim() ?? title
  return cut.length > 42 ? `${cut.slice(0, 39)}…` : cut
}

function lessonSummary(libraryTitle: string, categoryTitle: string, lessonTitle: string) {
  return `Instructional depth on “${lessonTitle}” within ${categoryTitle}—situated in ${libraryTitle}.`
}

function lessonOutcomes(categoryTitle: string, lessonTitle: string): string[] {
  return [
    `Explain “${lessonTitle}” with a concrete example from ${categoryTitle.toLowerCase()}—without relying on slogans.`,
    `Identify one common mistake practitioners make here and what review step prevents it.`,
    `State a practical next action you can take this week (observe, prototype, document, or verify)—without claiming external certification.`,
  ]
}

function moduleSummary(categoryTitle: string) {
  return `Structured module for ${categoryTitle}: concept teaching, application, misconceptions, revision, checkpoints, and lab-readiness framing.`
}

export function defaultExtendedAccess(catIdx: number): CurriculumLessonAccess {
  // Category 1 (index 0): full public starter layer for serious browsing
  if (catIdx === 0) return 'public'
  // Middle categories: signed-in fuller library
  if (catIdx === 1 || catIdx === 2) return 'signed_in'
  // Deepest categories: premium depth (eligible plans / bundles—materials access, not outcomes)
  return 'premium'
}

export function compileExtendedLibrary(spec: ExtendedSpecLibrary): CurriculumCategory[] {
  let orderCounter = 1
  return spec.categories.map((cat, catIdx) => ({
    id: cat.id,
    order: catIdx + 1,
    title: cat.title,
    summary: cat.summary,
    modules: [
      {
        slug: slugify(`${cat.id}-${cat.title}`),
        order: 1,
        title: cat.title,
        summary: moduleSummary(cat.title),
        lessons: cat.lessons.map((lessonTitle) => {
          const slug = slugify(`${cat.id}-${lessonTitle}`)
          const access = defaultExtendedAccess(catIdx)
          const lesson: CurriculumLesson = {
            slug,
            order: orderCounter++,
            shortTitle: lessonShortTitle(lessonTitle),
            title: lessonTitle,
            summary: lessonSummary(spec.libraryTitle, cat.title, lessonTitle),
            outcomes: lessonOutcomes(cat.title, lessonTitle),
            access,
          }
          return lesson
        }),
      },
    ],
  }))
}

export function canAccessPremiumCatalogLessonTier(tier: AccessTier): boolean {
  return isAtLeastTier(tier, 'pro')
}
