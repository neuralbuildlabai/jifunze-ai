import type { PublicStarterLessonSection } from '../publicStarterLibraries/aiFoundations'
import { LEGACY_AI_LESSON_SECTIONS_BY_LEGACY_SLUG } from '../publicStarterLibraries/aiFoundations'
import { CURRICULUM_ENRICHED_SECTIONS_BY_SLUG } from './curriculumEnrichedSections'
import { CURRICULUM_LESSON_LEGACY_READER_SLUG } from './curriculumLessonReaderMap'
import { skeletonSectionsForCurriculumLesson } from './aiLessonSkeletonSections'
import { composeInstructionalDepth } from './instructionalDeepComposer'
import { AI_FOUNDATIONS_FAMILY, getAiCurriculumLesson, getAiCurriculumPlacement } from './aiEverydayWorkCurriculum'
import { mergeLessonSectionsWithFlagshipCompletion } from './flagshipLessonPostSections'

export function resolveAiLessonReaderSections(slug: string | undefined): PublicStarterLessonSection[] | null {
  if (!slug) return null
  const lesson = getAiCurriculumLesson(slug)
  if (!lesson) return null

  const legacyKey = CURRICULUM_LESSON_LEGACY_READER_SLUG[slug]
  if (legacyKey) {
    const sections = LEGACY_AI_LESSON_SECTIONS_BY_LEGACY_SLUG[legacyKey]
    if (sections?.length) return mergeLessonSectionsWithFlagshipCompletion(slug, sections)
  }

  const enriched = CURRICULUM_ENRICHED_SECTIONS_BY_SLUG[slug]
  if (enriched?.length) return mergeLessonSectionsWithFlagshipCompletion(slug, enriched)

  const placement = getAiCurriculumPlacement(slug)
  if (placement) {
    return mergeLessonSectionsWithFlagshipCompletion(
      slug,
      composeInstructionalDepth({
        libraryTitle: AI_FOUNDATIONS_FAMILY.title,
        categoryTitle: placement.category.title,
        moduleTitle: placement.module.title,
        lessonTitle: placement.lesson.title,
        lessonSummary: placement.lesson.summary,
        outcomes: placement.lesson.outcomes,
        categoryId: placement.category.id,
        libraryFamily: 'ai_foundations',
      }),
    )
  }

  return mergeLessonSectionsWithFlagshipCompletion(slug, skeletonSectionsForCurriculumLesson(lesson))
}
