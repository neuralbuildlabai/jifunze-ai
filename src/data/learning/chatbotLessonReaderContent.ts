import type { PublicStarterLessonSection } from '../publicStarterLibraries/aiFoundations'
import { ENRICHED_CHATBOT_DESIGN_CONVERSATIONS_BY_SLUG } from './curriculumEnrichedSections/chatbotDesignConversationsBodies'
import { ENRICHED_CHATBOT_FLAGSHIP_SECTIONS_BY_SLUG } from './curriculumEnrichedSections/chatbotFlagshipBodies'
import { composeInstructionalDepth } from './instructionalDeepComposer'
import { mergeLessonSectionsWithFlagshipCompletion } from './flagshipLessonPostSections'
import {
  CHATBOT_LIBRARY_FAMILY,
  getChatbotCurriculumLesson,
  getChatbotCurriculumPlacement,
} from './chatbotEverydayCurriculum'
import { skeletonSectionsForChatbotLesson } from './chatbotLessonSkeletonSections'

export function resolveChatbotLessonReaderSections(slug: string | undefined): PublicStarterLessonSection[] | null {
  if (!slug) return null
  const lesson = getChatbotCurriculumLesson(slug)
  if (!lesson) return null

  const enriched =
    ENRICHED_CHATBOT_FLAGSHIP_SECTIONS_BY_SLUG[slug] ?? ENRICHED_CHATBOT_DESIGN_CONVERSATIONS_BY_SLUG[slug]
  if (enriched?.length) return mergeLessonSectionsWithFlagshipCompletion(slug, enriched)

  const placement = getChatbotCurriculumPlacement(slug)
  if (placement) {
    return mergeLessonSectionsWithFlagshipCompletion(
      slug,
      composeInstructionalDepth({
        libraryTitle: CHATBOT_LIBRARY_FAMILY.title,
        categoryTitle: placement.category.title,
        moduleTitle: placement.module.title,
        lessonTitle: placement.lesson.title,
        lessonSummary: placement.lesson.summary,
        outcomes: placement.lesson.outcomes,
        categoryId: placement.category.id,
        libraryFamily: 'chatbots',
      }),
    )
  }
  return mergeLessonSectionsWithFlagshipCompletion(slug, skeletonSectionsForChatbotLesson(lesson))
}
