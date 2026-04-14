/**
 * Action JifunzeAI takes for a signal/opportunity in the autonomous ops layer.
 * Default path is forward motion; {@link escalate_for_review} is the exception.
 */
export type AutonomyAction =
  | 'ignore'
  | 'watch'
  | 'draft'
  | 'queue'
  | 'publish'
  | 'escalate_for_review'

export type RiskLevel = 'low' | 'medium' | 'high'

/**
 * Tunable thresholds used with brand {@link BrandAutomationSettings}.
 * Keeps rule evaluation readable and server-parity friendly.
 */
export type AutonomyPolicy = {
  thresholds: {
    /** Below this priority and confidence → {@link AutonomyAction.ignore}. */
    autonomousIgnoreMaxPriority: number
    autonomousIgnoreMaxConfidence: number
    /** Freshness below this caps auto-publish. */
    staleFreshnessForPublish: number
    /** Title/summary this short counts as ambiguous for confidence. */
    minTitleCharsForConfidence: number
    minSummaryCharsForConfidence: number
  }
}

export const DEFAULT_AUTONOMY_POLICY: AutonomyPolicy = {
  thresholds: {
    autonomousIgnoreMaxPriority: 0.28,
    autonomousIgnoreMaxConfidence: 0.44,
    staleFreshnessForPublish: 0.38,
    minTitleCharsForConfidence: 10,
    minSummaryCharsForConfidence: 28,
  },
}

export type BrandSafetyFlags = {
  banned_topic_match: boolean
  competitor_mention: boolean
  sensitive_topic_match: boolean
}

export type AutonomyDecision = {
  autonomy_action: AutonomyAction
  autonomy_reason: string
  requires_human_review: boolean
  risk_level: RiskLevel
  confidence_score: number
}
