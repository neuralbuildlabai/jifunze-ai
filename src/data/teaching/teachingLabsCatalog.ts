import type { TeachingLab } from './teachingTypes'
import { AI_CURRICULUM_LABS } from './aiLabsCurriculum'
import { NON_AI_TEACHING_LABS } from './nonAiTeachingLabs'

/**
 * Curriculum-grounded labs: AI Part X matrix + cross-library practice labs.
 * Guided / practice / test shapes include explicit scenarios, rubrics, structured capture, and remediation.
 */

export const TEACHING_LABS: TeachingLab[] = [...AI_CURRICULUM_LABS, ...NON_AI_TEACHING_LABS]

export function teachingLabById(id: string) {
  return TEACHING_LABS.find((l) => l.id === id)
}

/** Labs that explicitly anchor to a curriculum lesson slug (even if KB atoms omit a link). */
export function teachingLabsAnchoredToLessonSlug(slug: string): TeachingLab[] {
  return TEACHING_LABS.filter((l) => l.lessonSlugs.includes(slug))
}
