import type { CurriculumModule } from './aiEverydayWorkCurriculum'
import { AI_EVERYDAY_WORK_CURRICULUM } from './aiEverydayWorkCurriculum'

/** Homepage shows a curated subset of modules while anchoring copy to the real skeleton. */
export function getHomepageFeaturedAiLibraryModules(): CurriculumModule[] {
  const cats = AI_EVERYDAY_WORK_CURRICULUM
  const picks = [
    cats[0]?.modules[0], // AI Foundations · Understanding AI clearly
    cats[1]?.modules[0], // Practical Prompting · Prompting basics
    cats[2]?.modules[0], // Review + validate · Why validation matters
    cats[4]?.modules[0], // Learning & revision · Learning with AI
  ].filter(Boolean) as CurriculumModule[]
  return picks
}

export function firstLessonHrefForModuleOverview(params: {
  module: CurriculumModule
  publicBasePath: string
}): string | null {
  const firstPublic = params.module.lessons.find((l) => l.access === 'public')
  const first = firstPublic ?? params.module.lessons[0]
  if (!first) return null
  return `${params.publicBasePath}/${first.slug}`
}
