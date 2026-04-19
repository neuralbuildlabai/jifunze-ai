import type { CurriculumModule } from './aiEverydayWorkCurriculum'
import { CHATBOT_LIBRARY_CURRICULUM } from './chatbotEverydayCurriculum'

/** Homepage curated modules from the chatbot skeleton (Category 1 · both modules). */
export function getHomepageFeaturedChatbotLibraryModules(): CurriculumModule[] {
  const cat = CHATBOT_LIBRARY_CURRICULUM[0]
  if (!cat) return []
  const picks = [cat.modules[0], cat.modules[1]].filter(Boolean) as CurriculumModule[]
  return picks
}

export function firstChatbotLessonHrefForModuleOverview(params: {
  module: CurriculumModule
  publicBasePath: string
}): string | null {
  const firstPublic = params.module.lessons.find((l) => l.access === 'public')
  const first = firstPublic ?? params.module.lessons[0]
  if (!first) return null
  return `${params.publicBasePath}/${first.slug}`
}
