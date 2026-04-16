import type { AutonomyAction, RiskLevel } from './autonomy'
import type { ContentFormat } from './contentFormat'
import type { CtaLearningEmphasis, LearningInfluenceTrace } from './performanceLearning'
import type { PriorityLabel } from './priorityLabel'
import type { ExplanationStyle, TeachingLevel } from './teaching'

/**
 * Decision snapshot for “before strategy-learning” vs “after” comparison.
 * Baseline excludes strategy recommendations (empty rec list) and teaching nudges from those recs;
 * both sides still use the same {@link resolveTeachingProfile} memory aggregates.
 */
export type LearningDecisionSnapshot = {
  priority_score: number
  priority_label: PriorityLabel
  suggested_content_format: ContentFormat
  suggested_platforms: string[]
  cta_emphasis: CtaLearningEmphasis
  suggested_cta: string
  explanation_style: ExplanationStyle
  teaching_level: TeachingLevel
  autonomy_action: AutonomyAction
  confidence_score: number
  risk_level: RiskLevel
}

export type OpportunityLearningImpactComparison = {
  baseline: LearningDecisionSnapshot
  learned: LearningDecisionSnapshot
  change_summaries: string[]
  traces_by_axis: {
    platform: LearningInfluenceTrace[]
    format: LearningInfluenceTrace[]
    cta: LearningInfluenceTrace[]
    teaching: LearningInfluenceTrace[]
    priority: LearningInfluenceTrace[]
    confidence: LearningInfluenceTrace[]
  }
}
