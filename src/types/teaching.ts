/** Audience sophistication target for explanations. */
export type TeachingLevel = 'beginner' | 'intermediate' | 'advanced'

/** How the piece structures explanation (orthogonal to format). */
export type ExplanationStyle =
  | 'step_by_step'
  | 'quick_tip'
  | 'breakdown'
  | 'analogy'
  | 'comparison'
  | 'use_case'

/** Audit trail when teaching heuristics change the plan. */
export type TeachingExplainabilityEntry = {
  what: string
  why: string
  /** e.g. `style:step_by_step`, `level:beginner`, `ai_domain_policy` */
  influencedBy?: string
}
