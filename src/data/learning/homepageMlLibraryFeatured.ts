import type { CurriculumModule } from './aiEverydayWorkCurriculum'
import { ML_LIBRARY_CURRICULUM } from './machineLearningCurriculum'

/** Homepage curated modules — first public module plus a signed-in teaser module for credibility. */
export function getHomepageFeaturedMlLibraryModules(): CurriculumModule[] {
  const picks = [ML_LIBRARY_CURRICULUM[0]?.modules[0], ML_LIBRARY_CURRICULUM[1]?.modules[0]].filter(Boolean) as CurriculumModule[]
  return picks
}

export function firstMlLessonHrefForModuleOverview(params: {
  module: CurriculumModule
  publicBasePath: string
}): string | null {
  const firstPublic = params.module.lessons.find((l) => l.access === 'public')
  const first = firstPublic ?? params.module.lessons[0]
  if (!first) return null
  return `${params.publicBasePath}/${first.slug}`
}
