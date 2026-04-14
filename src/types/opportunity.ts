import type { AutonomyAction, RiskLevel } from './autonomy'
import type { ContentLifecycleStatus, LifecycleDriver } from './contentLifecycle'
import type { ContentDomain } from './contentDomain'
import type { ContentFormat } from './contentFormat'
import type { PriorityLabel } from './priorityLabel'
import type { TrendCategory } from './trendCategory'
import type { ConversionIntent } from './conversion'
import type { ExplanationStyle, TeachingExplainabilityEntry, TeachingLevel } from './teaching'

export type UrgencyLevel = 'low' | 'medium' | 'high'

/**
 * Human-reviewable unit: trend → angle → format → media direction → drafts (no auto-post).
 */
export type ContentOpportunity = {
  id: string
  signal_id: string
  topic: string
  why_it_matters: string
  suggested_angle: string
  urgency: UrgencyLevel
  suggested_platforms: string[]
  /** Funnel stage this opportunity is steered toward (rule-inferred from brand + trend). */
  conversion_intent: ConversionIntent
  suggested_cta: string
  /** Human-readable where the CTA should land (DM, site, booking, etc.). */
  target_destination: string
  /** Teaching / comprehension target for this opportunity. */
  teaching_level: TeachingLevel
  /** Preferred explanation structure (adapted from performance when data exists). */
  explanation_style: ExplanationStyle
  /** Human-readable log when teaching heuristics adjust level or style. */
  teaching_explainability: TeachingExplainabilityEntry[]
  suggested_content_format: ContentFormat
  suggested_media_direction: string
  source_links: string[]
  /** Rule-based trend / signal shape (see {@link classifyTrendCategory}). */
  trend_category: TrendCategory
  /** Jifunze five-domain classification for this opportunity (from signal). */
  content_domain: ContentDomain
  /** 0–1 composite for ranking in UI (not the same as raw relevance_score on the signal). */
  priority_score: number
  /** Discrete band from {@link priority_score} for chips and filtering. */
  priority_label: PriorityLabel
  /** How this item maps to the brand’s domain profile (primary / secondary / cross). */
  matched_domain: string
  /** Brand vocabulary that actually hit the signal text (transparency). */
  matched_keywords: string[]
  /** One-line freshness narrative (aligned with configured decay curve). */
  freshness_summary: string
  /** Plain-language rationale for humans reviewing the queue. */
  selection_reason: string
  /** Autonomous ops decision for this opportunity. */
  autonomy_action: AutonomyAction
  /** Why {@link autonomy_action} was chosen (rule-based; future: model + audit). */
  autonomy_reason: string
  /** Whether a human must act before downstream execution (exceptions only when automation on). */
  requires_human_review: boolean
  risk_level: RiskLevel
  /** 0–1 rule-based confidence for autonomy gating. */
  confidence_score: number
  /** Pipeline stage (driven by autonomy first; workers advance via `transitionOpportunityLifecycle`). */
  lifecycle_status: ContentLifecycleStatus
  /** ISO 8601 when {@link lifecycle_status} last changed. */
  lifecycle_updated_at: string
  /** What advanced lifecycle (audit trail for future persistence). */
  lifecycle_driver: LifecycleDriver
}
