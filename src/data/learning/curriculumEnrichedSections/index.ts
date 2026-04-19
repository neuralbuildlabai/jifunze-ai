import type { PublicStarterLessonSection } from '../../publicStarterLibraries/aiFoundations'
import { ENRICHED_AI_FOUNDATIONS_SECTIONS_BY_SLUG } from './aiFoundationsBodies'
import { ENRICHED_AI_PUBLIC_SPINE_SECTIONS_BY_SLUG } from './aiPublicSpineBodies'

/** Category-by-category enriched readers; merged into {@link resolveAiLessonReaderSections} after legacy bodies. */
export const CURRICULUM_ENRICHED_SECTIONS_BY_SLUG: Record<string, PublicStarterLessonSection[]> = {
  ...ENRICHED_AI_FOUNDATIONS_SECTIONS_BY_SLUG,
  ...ENRICHED_AI_PUBLIC_SPINE_SECTIONS_BY_SLUG,
}
