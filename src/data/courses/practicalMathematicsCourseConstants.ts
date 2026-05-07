/**
 * Stable constants for the Practical Mathematics course.
 * Imported by data file, progression module, capstone rubric, and verify scripts.
 *
 * Kept in a tiny dedicated file so consumers do not need to import the heavy
 * full course object just to reference its slug or internal key.
 */

export const PRACTICAL_MATH_SLUG = 'practical-mathematics-life-work-business' as const

export const PRACTICAL_MATH_INTERNAL_KEY = 'practical_math_life_work_business' as const

/** Module slugs in approved sequential order. */
export const PRACTICAL_MATH_MODULE_SLUGS = [
  'math-confidence-number-sense',
  'fractions-decimals-percentages-estimation',
  'ratios-proportions-unit-rates-comparisons',
  'measurement-units-conversions-precision',
  'personal-finance-math',
  'business-math-fundamentals',
  'spreadsheet-skills-business-work',
  'workplace-math-problem-solving',
  'data-interpretation-statistics',
  'time-management-scheduling-math',
  'project-planning-resource-allocation',
  'advanced-business-math',
  'real-estate-property-math',
  'healthcare-medical-math',
  'construction-trade-math',
  'final-integration-mastery',
] as const

export type PracticalMathModuleSlug = (typeof PRACTICAL_MATH_MODULE_SLUGS)[number]

/** Modules that must carry a learner-facing safety note. */
export const PRACTICAL_MATH_MODULES_REQUIRING_SAFETY_NOTE: readonly PracticalMathModuleSlug[] = [
  'personal-finance-math',
  'business-math-fundamentals',
  'advanced-business-math',
  'real-estate-property-math',
  'healthcare-medical-math',
  'construction-trade-math',
  'final-integration-mastery',
]
