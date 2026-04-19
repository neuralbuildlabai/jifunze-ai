import type { CurriculumCategory, CurriculumLesson, CurriculumLessonAccess } from './aiEverydayWorkCurriculum'

export type StandaloneCourseLessonSpec = {
  title: string
  summary: string
  outcomes: string[]
}

export type StandaloneCourseModuleSpec = {
  id: string
  title: string
  summary: string
  lessons: StandaloneCourseLessonSpec[]
}

export type StandaloneCourseCompileSpec = {
  libraryTitle: string
  modules: StandaloneCourseModuleSpec[]
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

function accessForModuleIndex(idx: number): CurriculumLessonAccess {
  // Preview depth without giving away the entire course for free:
  // first two modules public, middle two signed-in, final two premium-depth.
  if (idx <= 1) return 'public'
  if (idx <= 3) return 'signed_in'
  return 'premium'
}

export function compileStandaloneCourse(spec: StandaloneCourseCompileSpec): CurriculumCategory[] {
  let orderCounter = 1
  return spec.modules.map((mod, modIdx) => ({
    id: mod.id,
    order: modIdx + 1,
    title: mod.title,
    summary: mod.summary,
    modules: [
      {
        slug: slugify(`${mod.id}-${mod.title}`),
        order: 1,
        title: mod.title,
        summary: mod.summary,
        lessons: mod.lessons.map((lesson) => {
          const slug = slugify(`${mod.id}-${lesson.title}`)
          const access = accessForModuleIndex(modIdx)
          const lessonRow: CurriculumLesson = {
            slug,
            order: orderCounter++,
            shortTitle: lessonShortTitle(lesson.title),
            title: lesson.title,
            summary: lesson.summary,
            outcomes: lesson.outcomes,
            access,
          }
          return lessonRow
        }),
      },
    ],
  }))
}
