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

/**
 * How plainly to define terms and avoid insider shorthand.
 * Driven by level + performance (e.g. simplify when dense copy underperforms).
 */
export type ClarityPreference = 'plain' | 'balanced' | 'concise_technical'

/**
 * High-level pedagogical frame for hooks and section order.
 */
export type EducationalFraming =
  | 'how_it_works'
  | 'why_it_matters'
  | 'decision_guide'
  | 'news_with_context'

/** Audit trail when teaching heuristics change the plan. */
export type TeachingExplainabilityEntry = {
  what: string
  why: string
  /** e.g. `style:step_by_step`, `level:beginner`, `ai_domain_policy` */
  influencedBy?: string
}
