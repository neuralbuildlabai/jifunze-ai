import type { CurriculumCategory } from '../learning/aiEverydayWorkCurriculum'
import { STANDALONE_COURSE_CURRICULA } from '../learning/standaloneCoursesCatalog'
import type { TeachingConcept } from './teachingTypes'
import type { TeachingLibraryId } from './teachingTypes'

function teachingLibraryForCategoryId(categoryId: string): TeachingLibraryId {
  if (categoryId.startsWith('lcew-')) return 'course_chatgpt_everyday'
  if (categoryId.startsWith('pem-')) return 'course_prompt_engineering_models'
  if (categoryId.startsWith('gpw-')) return 'course_gemini_workspace'
  if (categoryId.startsWith('clw-')) return 'course_claude_writing'
  if (categoryId.startsWith('aar-')) return 'course_agentic_ai_real_work'
  throw new Error(`Unhandled standalone teaching library mapping for category id: ${categoryId}`)
}

/**
 * Module-spine KB atoms for standalone courses—each atom indexes every lesson slug in that module for retrieval + validation.
 */
export const TEACHING_CONCEPTS_STANDALONE_COURSES: TeachingConcept[] = (() => {
  const out: TeachingConcept[] = []
  const seen = new Set<string>()
  const walk = (tree: CurriculumCategory[]) => {
    for (const cat of tree) {
      for (const mod of cat.modules) {
        if (seen.has(mod.slug)) continue
        seen.add(mod.slug)
        const slugs = mod.lessons.map((l) => l.slug)
        const libraryId = teachingLibraryForCategoryId(cat.id)
        out.push({
          id: `standalone-module-${mod.slug}`,
          libraryId,
          title: `${mod.title} — module spine`,
          explanation: `${mod.summary} These lessons are structured as practice-capable readers with checkpoints—not outcome guarantees.`,
          keywords: [
            'standalone course',
            'jifunze',
            ...mod.title
              .toLowerCase()
              .replace(/[^a-z0-9\s]/g, ' ')
              .split(/\s+/g)
              .filter((w) => w.length >= 4)
              .slice(0, 6),
          ],
          lessonSlugs: slugs,
          misconceptions: [
            '“Reading quickly equals mastery.”',
            '“Assistive drafting removes accountability.”',
            '“Vendor comparisons replace measurement in my workflow.”',
          ],
          workedExample:
            'Pick one lesson, complete the practice checkpoint in writing, then revise your answers after a deliberate review pass—compare what changed and why.',
          revisionAnchor:
            'Re-run the checkpoint prompts on a different real example from your week—did your constraints and verification steps improve?',
          commonQuestions: [
            `How do I know I understood ${mod.title}?`,
            'What evidence should I collect before trusting an exported artifact?',
          ],
          relatedLabIds: [],
          capabilityOutcomes: [
            `Explain ${mod.title.toLowerCase()} using a realistic workplace example`,
            'Identify one failure mode and the verification habit that prevents it',
          ],
          relatedConceptIds: [],
          kbAnchors: { categoryId: cat.id, moduleSlug: mod.slug, primaryLessonSlug: slugs[0] },
          kbAtomRole: 'core_concept',
          goodUnderstandingMarkers: [
            'You can restate the module idea without slogans',
            'Your examples include constraints, unknowns, and review gates',
          ],
          weakUnderstandingMarkers: [
            'You ship outputs because they sound polished',
            'You compare vendors ideologically instead of evaluating tasks with rubrics',
          ],
        })
      }
    }
  }
  for (const tree of STANDALONE_COURSE_CURRICULA) walk(tree)
  return out
})()
