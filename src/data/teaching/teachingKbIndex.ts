/**
 * Derived indexes over the teaching KB: lesson↔concept, lab↔concept, and human placement strings.
 * Keeps navigation and learner-help retrieval aligned with real curriculum trees (no parallel catalog).
 */

import { getAiCurriculumPlacement, AI_FOUNDATIONS_FAMILY } from '../learning/aiEverydayWorkCurriculum'
import { getMlCurriculumPlacement, ML_LIBRARY_FAMILY } from '../learning/machineLearningCurriculum'
import { getChatbotCurriculumPlacement, CHATBOT_LIBRARY_FAMILY } from '../learning/chatbotEverydayCurriculum'
import {
  EXTENDED_CATEGORY_ID_TO_LIBRARY_TITLE,
  getExtendedCatalogPlacement,
} from '../learning/extendedLibrariesCurricula'
import { TEACHING_CONCEPTS } from './teachingKnowledgeBase'
import type { TeachingConcept } from './teachingTypes'
import { teachingLabById } from './teachingLabsCatalog'

export function conceptsForLessonSlug(slug: string): TeachingConcept[] {
  return TEACHING_CONCEPTS.filter((c) => c.lessonSlugs.includes(slug))
}

export function conceptsLinkedToLab(labId: string): TeachingConcept[] {
  const lab = teachingLabById(labId)
  const map = new Map<string, TeachingConcept>()
  for (const c of TEACHING_CONCEPTS) {
    if (c.relatedLabIds.includes(labId)) map.set(c.id, c)
  }
  if (lab?.conceptIds?.length) {
    for (const id of lab.conceptIds) {
      const c = TEACHING_CONCEPTS.find((x) => x.id === id)
      if (c) map.set(c.id, c)
    }
  }
  return [...map.values()]
}

/** One-line curriculum placement for grounded help and UI chrome. */
export function kbPlacementSentenceForLessonSlug(slug: string): string | null {
  const ai = getAiCurriculumPlacement(slug)
  if (ai) return `${AI_FOUNDATIONS_FAMILY.title} · ${ai.category.title} · ${ai.module.title}`

  const ml = getMlCurriculumPlacement(slug)
  if (ml) return `${ML_LIBRARY_FAMILY.title} · ${ml.category.title} · ${ml.module.title}`

  const cb = getChatbotCurriculumPlacement(slug)
  if (cb) return `${CHATBOT_LIBRARY_FAMILY.title} · ${cb.category.title} · ${cb.module.title}`

  const ext = getExtendedCatalogPlacement(slug)
  if (ext) {
    const libTitle = EXTENDED_CATEGORY_ID_TO_LIBRARY_TITLE[ext.category.id] ?? 'Extended catalog'
    return `${libTitle} · ${ext.category.title} · ${ext.module.title}`
  }

  return null
}
