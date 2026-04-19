import type { PublicStarterLessonSection } from '../publicStarterLibraries/aiFoundations'
import type { InstructionalPlacement } from './instructionalDeepComposer'
import { ENRICHED_CLOUD_FLAGSHIP_SECTIONS_BY_SLUG } from './curriculumEnrichedSections/cloudFlagshipBodies'
import { ENRICHED_CYBER_FLAGSHIP_SECTIONS_BY_SLUG } from './curriculumEnrichedSections/cyberFlagshipBodies'
import { composeInstructionalDepth } from './instructionalDeepComposer'
import { mergeLessonSectionsWithFlagshipCompletion } from './flagshipLessonPostSections'
import { EXTENDED_CATEGORY_ID_TO_LIBRARY_TITLE, getExtendedCatalogLesson, getExtendedCatalogPlacement } from './extendedLibrariesCurricula'
import { standaloneCourseLessonSections } from './standaloneCoursesLessonBodies'

const ENRICHED_EXTENDED_FLAGSHIP_SECTIONS_BY_SLUG: Record<string, PublicStarterLessonSection[]> = {
  ...ENRICHED_CYBER_FLAGSHIP_SECTIONS_BY_SLUG,
  ...ENRICHED_CLOUD_FLAGSHIP_SECTIONS_BY_SLUG,
}

function extendedFlagshipFamily(categoryId: string): InstructionalPlacement['libraryFamily'] | undefined {
  const id = categoryId.toLowerCase()
  if (
    id.startsWith('cybersecurity-foundations') ||
    id.startsWith('practical-security-habits') ||
    id.startsWith('defensive-thinking') ||
    id.startsWith('applied-modern-security') ||
    id.startsWith('practical-defense-continuation')
  ) {
    return 'cybersecurity'
  }
  if (
    id.startsWith('cloud-foundations') ||
    id.startsWith('devops-workflow-foundations') ||
    id.startsWith('platform-operations') ||
    id.startsWith('applied-platform-work') ||
    id.startsWith('platform-growth-path')
  ) {
    return 'cloud_devops'
  }
  return undefined
}

export function resolveExtendedLessonReaderSections(slug: string | undefined): PublicStarterLessonSection[] | null {
  if (!slug) return null
  const lesson = getExtendedCatalogLesson(slug)
  if (!lesson) return null
  const placement = getExtendedCatalogPlacement(slug)
  if (!placement) return null

  const standalone = standaloneCourseLessonSections(slug)
  if (standalone?.length) return mergeLessonSectionsWithFlagshipCompletion(slug, standalone)

  const enriched = ENRICHED_EXTENDED_FLAGSHIP_SECTIONS_BY_SLUG[slug]
  if (enriched?.length) return mergeLessonSectionsWithFlagshipCompletion(slug, enriched)

  const libraryTitle =
    EXTENDED_CATEGORY_ID_TO_LIBRARY_TITLE[placement.category.id] ?? 'Jifunze extended library'

  return mergeLessonSectionsWithFlagshipCompletion(
    slug,
    composeInstructionalDepth({
      libraryTitle,
      categoryTitle: placement.category.title,
      moduleTitle: placement.module.title,
      lessonTitle: lesson.title,
      lessonSummary: lesson.summary,
      outcomes: lesson.outcomes,
      categoryId: placement.category.id,
      libraryFamily: extendedFlagshipFamily(placement.category.id),
    }),
  )
}
