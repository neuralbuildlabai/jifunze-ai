/**
 * Capstone rubric scoped to the Practical Mathematics course only.
 *
 * Deliberately uses ids that DO NOT collide with any AI Essentials rubric (`AeCapstoneRubricId`)
 * so future persistence wiring can identify and store practical-math grades separately without
 * touching `aeCapstoneRubricPersistence` or `flagshipCourseProgressDerived`.
 */

import { PRACTICAL_MATH_INTERNAL_KEY } from './practicalMathematicsCourseConstants'

export type PracticalMathCapstoneRubricId =
  | 'pmProblemFraming'
  | 'pmCalculationAccuracy'
  | 'pmAssumptionsAndLimits'
  | 'pmIntegration'
  | 'pmProfessionalVerification'

export type PracticalMathCapstoneRubricLevel =
  | 'not_ready'
  | 'developing'
  | 'ready'
  | 'strong'

export type PracticalMathCapstoneRubricCriterion = {
  id: PracticalMathCapstoneRubricId
  label: string
  prompt: string
}

export const PRACTICAL_MATH_CAPSTONE_RUBRIC_CRITERIA: readonly PracticalMathCapstoneRubricCriterion[] =
  [
    {
      id: 'pmProblemFraming',
      label: 'Problem framing',
      prompt:
        'The capstone names a single, specific decision and the question it must answer; scope is honest about what is in and out.',
    },
    {
      id: 'pmCalculationAccuracy',
      label: 'Calculation accuracy',
      prompt:
        'Numbers, formulas, and units are correct and reproducible by a peer using the same inputs; intermediate steps are visible.',
    },
    {
      id: 'pmAssumptionsAndLimits',
      label: 'Assumptions and limits',
      prompt:
        'Assumptions are explicit; observed inputs are distinguished from estimates; the limits of the analysis are named.',
    },
    {
      id: 'pmIntegration',
      label: 'Cross-module integration',
      prompt:
        'The artifact integrates skills from at least four prior modules and shows how they fit together for one decision.',
    },
    {
      id: 'pmProfessionalVerification',
      label: 'Professional verification list',
      prompt:
        'The artifact names what should still be verified by a qualified professional (financial, tax, legal, medical, real-estate, mortgage, or trade) before any action.',
    },
  ] as const

export const PRACTICAL_MATH_CAPSTONE_RUBRIC_INTERNAL_KEY = PRACTICAL_MATH_INTERNAL_KEY

export type PracticalMathCapstoneRubricSelfGrade = Partial<
  Record<PracticalMathCapstoneRubricId, PracticalMathCapstoneRubricLevel>
>

const RUBRIC_LEVEL_ORDER: Record<PracticalMathCapstoneRubricLevel, number> = {
  not_ready: 0,
  developing: 1,
  ready: 2,
  strong: 3,
}

/** True when every criterion is self-scored Ready or Strong. */
export function practicalMathCapstoneAllCriteriaReadyPlus(
  grade: PracticalMathCapstoneRubricSelfGrade | undefined,
): boolean {
  if (!grade) return false
  return PRACTICAL_MATH_CAPSTONE_RUBRIC_CRITERIA.every((c) => {
    const v = grade[c.id]
    return v === 'ready' || v === 'strong'
  })
}

/** Highest-level merge across two snapshots; never downgrades. Pure helper for future persistence. */
export function mergePracticalMathCapstoneSelfGrade(
  a: PracticalMathCapstoneRubricSelfGrade | undefined,
  b: PracticalMathCapstoneRubricSelfGrade | undefined,
): PracticalMathCapstoneRubricSelfGrade | undefined {
  if (!a && !b) return undefined
  const out: PracticalMathCapstoneRubricSelfGrade = {}
  for (const c of PRACTICAL_MATH_CAPSTONE_RUBRIC_CRITERIA) {
    const va = a?.[c.id]
    const vb = b?.[c.id]
    if (va == null && vb == null) continue
    if (va != null && vb != null) {
      out[c.id] = RUBRIC_LEVEL_ORDER[va] >= RUBRIC_LEVEL_ORDER[vb] ? va : vb
    } else {
      out[c.id] = (va ?? vb)!
    }
  }
  return Object.keys(out).length ? out : undefined
}
