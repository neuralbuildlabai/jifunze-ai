/**
 * Read-only adapter that maps the standalone Practical Mathematics course onto the existing
 * flagship `FlagshipCourseCurriculum` shape so any flagship-shaped consumer (UI, pathway pre-views,
 * progress widgets) can read this course without bespoke handling.
 *
 * IMPORTANT:
 * - This adapter is one-way and never mutates `FLAGSHIP_CURRICULA_BASE`, `FLAGSHIP_COURSES`,
 *   `FLAGSHIP_SCHOOLS`, or any flagship registry.
 * - Module ids are namespaced (`pm-mNN`) so they cannot collide with `ae-mNN` or other flagship ids.
 * - The adapter intentionally maps every module to `stage: 'foundations'` because the flagship
 *   stage taxonomy is opinionated for AI flagship pacing and does not represent how learners
 *   should encounter Practical Mathematics. Consumers that care can ignore the stage for this
 *   course and rely on `practicalMathematicsCourse.modules` directly.
 */

import type {
  FlagshipCourseCurriculum,
  FlagshipCurriculumModule,
} from '../learning/flagshipCurriculumTypes'
import { practicalMathematicsCourse } from './practicalMathematicsCourse'

export const PRACTICAL_MATH_MODULE_ID_PREFIX = 'pm-m' as const

export function practicalMathFlagshipModuleId(moduleNumber: number): string {
  const padded = String(moduleNumber).padStart(2, '0')
  return `${PRACTICAL_MATH_MODULE_ID_PREFIX}${padded}`
}

function asFlagshipModule(
  m: (typeof practicalMathematicsCourse.modules)[number],
): FlagshipCurriculumModule {
  return {
    id: practicalMathFlagshipModuleId(m.moduleNumber),
    order: m.moduleNumber,
    title: m.title,
    stage: 'foundations',
    summary: m.overview,
    learningGoals: m.learningObjectives.slice(0, 6),
    practiceActivities: m.practiceLab.scenarios.map((s) => s.prompt).slice(0, 4),
    revisionCheckpoint: false,
    recap: m.moduleNumber === 16,
    expectedOutputs: m.completionChecklist.slice(0, 3),
  }
}

export const practicalMathFlagshipCurriculum: FlagshipCourseCurriculum = {
  slug: practicalMathematicsCourse.slug,
  estimatedDurationLabel: `Roughly ${practicalMathematicsCourse.estimatedHours} hours of focused study and practice (${practicalMathematicsCourse.modules.length} modules + capstone); many learners spread this across 6–10 weeks.`,
  depthLabel:
    'Practical Mathematics for Life, Work, and Business: a sixteen-module career-focused numeracy course covering everyday numbers, fractions and percentages, ratios, measurement, personal finance, business math, spreadsheets, workplace problem-solving, data interpretation, scheduling and project planning, advanced business math, and applied real-estate, healthcare-cost, and trade math — closing with an integration capstone.',
  capstone: {
    title: 'Practical Mathematics Capstone — End-to-End Numeracy Decision',
    description: practicalMathematicsCourse.capstoneDescription,
    deliverables: [
      'A 1–2 page reviewable capstone artifact',
      'Question, inputs, calculations, assumptions, findings',
      'Recommendation with caveats and a professional-verification list',
    ],
  },
  modules: practicalMathematicsCourse.modules.map(asFlagshipModule),
  reinforcementSignals: [
    'Sixteen modules in sequential order with module quizzes that must be passed before progression.',
    'Every quiz item ships with an explanation tied back to the source lesson.',
    'Module-level safety notes flag finance, real-estate, healthcare, trade, and capstone content for professional verification.',
    'Capstone is a small reviewable artifact — not a credential or a substitute for licensed advice.',
  ],
}
