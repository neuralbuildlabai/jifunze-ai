import type { PublicStarterLessonSection } from '../publicStarterLibraries/aiFoundations'
import { ENRICHED_ML_COMPLETENESS_SECTIONS_BY_SLUG } from './curriculumEnrichedSections/mlCompletenessBodies'
import { ENRICHED_ML_FLAGSHIP_SECTIONS_BY_SLUG } from './curriculumEnrichedSections/mlFlagshipBodies'
import { composeInstructionalDepth } from './instructionalDeepComposer'
import { ML_LIBRARY_FAMILY, getMlCurriculumLesson, getMlCurriculumPlacement } from './machineLearningCurriculum'
import { skeletonSectionsForMlLesson } from './mlLessonSkeletonSections'
import { mergeLessonSectionsWithFlagshipCompletion } from './flagshipLessonPostSections'

export function resolveMlLessonReaderSections(slug: string | undefined): PublicStarterLessonSection[] | null {
  if (!slug) return null
  const lesson = getMlCurriculumLesson(slug)
  if (!lesson) return null

  const enrichedFlagship = ENRICHED_ML_FLAGSHIP_SECTIONS_BY_SLUG[slug]
  const enrichedCompleteness = ENRICHED_ML_COMPLETENESS_SECTIONS_BY_SLUG[slug]
  const enriched = enrichedFlagship ?? enrichedCompleteness
  if (enriched?.length) return mergeLessonSectionsWithFlagshipCompletion(slug, enriched)

  const placement = getMlCurriculumPlacement(slug)
  if (placement) {
    return mergeLessonSectionsWithFlagshipCompletion(
      slug,
      composeInstructionalDepth({
        libraryTitle: ML_LIBRARY_FAMILY.title,
        categoryTitle: placement.category.title,
        moduleTitle: placement.module.title,
        lessonTitle: placement.lesson.title,
        lessonSummary: placement.lesson.summary,
        outcomes: placement.lesson.outcomes,
        categoryId: placement.category.id,
        libraryFamily: 'machine_learning',
      }),
    )
  }
  return mergeLessonSectionsWithFlagshipCompletion(slug, skeletonSectionsForMlLesson(lesson))
}
