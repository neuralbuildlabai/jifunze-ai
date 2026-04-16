import type { AdaptationPlatformId } from './adaptationPlatform'
import type { ContentDomain } from './contentDomain'
import type { ContentFormat } from './contentFormat'
import type { ExplanationStyle, TeachingLevel } from './teaching'
import type { TrendCategory } from './trendCategory'

/** Surfaces we track; matches adaptation IDs plus room for LinkedIn / future. */
export type PerformancePlatformId = AdaptationPlatformId | 'linkedin' | string

/** How much evidence backs a rule-based pattern (used for explainability + weighting). */
export type PatternStrength = 'weak' | 'emerging' | 'confirmed'

/** Coarse UTC bucket for publish-time learning. */
export type PublishTimingBucket = 'morning' | 'afternoon' | 'evening' | 'night'

/**
 * One published (or “shipped”) content row with outcomes — Supabase-ready flat shape.
 * `metadata` carries vendor ids, campaign ids, A/B keys, etc.
 */
export type PublishedContentPerformance = {
  id: string
  contentItemId: string
  brandProfileId: string
  platform: PerformancePlatformId
  publishedAt: string
  domain: ContentDomain
  trendCategory: TrendCategory
  contentFormat: ContentFormat
  /** e.g. `intent:lead_generation`, `dm`, `link_in_bio` */
  ctaType: string
  /** Short classifier: `timely`, `first_frame`, `pov`, `community`, `plain` */
  hookStyle: string
  /** Optional: normalized CTA style cluster (`dm`, `link_in_bio`, …) for combo learning. */
  ctaStyle?: string
  /** Optional: human-readable lifecycle path for this artifact (e.g. drafted→queued→published). */
  lifecyclePathSummary?: string
  /** Optional: when the post was scheduled to go live (ISO); helps separate timing from creation. */
  scheduledPublishAt?: string | null
  /** Derived from {@link publishedAt} UTC hour for rapid time-of-day learning. */
  publishTimingBucket?: PublishTimingBucket
  impressions: number | null
  reach: number | null
  clicks: number | null
  likes: number | null
  comments: number | null
  shares: number | null
  saves: number | null
  /** 0–1 when known; else derivable from counts / impressions */
  engagementRate: number | null
  conversionHint: number | null
  /** Teaching layer (optional until publishers tag content). */
  teachingLevel?: TeachingLevel
  explanationStyle?: ExplanationStyle
  /** Seconds — proxy until real player analytics exist. */
  watchTimeProxySeconds?: number | null
  /** Distinct from saves when platforms split them; often mirrors saves in MVP. */
  bookmarks?: number | null
  /** 0–1 inferred completion / “read through” (future: true completion). */
  completionSignal?: number | null
  /** 0–1 depth from comments / thread behavior proxies. */
  engagementDepthScore?: number | null
  metadata?: Record<string, unknown>
}

/**
 * Roll-up snapshot for a window (dashboards, future cron jobs).
 */
export type ContentPerformanceSnapshot = {
  id: string
  brandProfileId: string
  capturedAt: string
  windowStart?: string
  windowEnd?: string
  sampleCount: number
  weightedAvgEngagementRate: number | null
  totals: {
    impressions: number | null
    reach: number | null
    clicks: number | null
    likes: number | null
    comments: number | null
    shares: number | null
    saves: number | null
  }
  /** Optional keyed rollups for charts */
  rollupHints?: Record<string, unknown>
}

export type OptimizationInsightKind =
  | 'strong_domain'
  | 'weak_domain'
  | 'strong_domain_platform'
  | 'weak_domain_platform'
  | 'strong_trend'
  | 'weak_trend'
  | 'strong_trend_platform'
  | 'weak_trend_platform'
  | 'strong_cta'
  | 'weak_cta'
  | 'strong_cta_platform'
  | 'weak_cta_platform'
  | 'strong_format'
  | 'weak_format'
  | 'strong_format_platform'
  | 'weak_format_platform'
  | 'strong_teaching_style_platform'
  | 'weak_teaching_style_platform'
  | 'strong_teaching_level_domain'
  | 'weak_teaching_level_domain'
  | 'strong_posting_hour'
  | 'weak_posting_hour'
  | 'weak_combo'

export type OptimizationInsightConfidence = 'low' | 'medium' | 'high'

export type StrategyAdjustmentKind =
  | 'boost_domain_platform'
  | 'penalize_format'
  /** Actively bias toward a format that is outperforming (not only deprioritize weak). */
  | 'prefer_format'
  /** Actively bias toward a surface that is outperforming (ordering + priority). */
  | 'prefer_platform'
  | 'prefer_cta_style'
  /** Actively bias explanation style toward a winning teaching+platform pattern. */
  | 'prefer_teaching_style'
  | 'prefer_posting_window'
  | 'penalize_weak_combo'
  | 'tighten_autonomy'
  | 'relax_autonomy'

export type StrategyAdjustmentPayload = {
  domain?: ContentDomain
  platform?: PerformancePlatformId
  trendCategory?: TrendCategory
  contentFormat?: ContentFormat
  explanationStyle?: ExplanationStyle
  teachingLevel?: TeachingLevel
  /** e.g. `dm`, `link_in_bio`, `save_share` */
  ctaStyle?: string
  /** 0–23 local / UTC note in rationale */
  postingHour?: number
}

export type LearningInfluenceDirection = 'boost' | 'penalty'

/** Explainability record: one rule that affected a decision. */
export type LearningInfluenceTrace = {
  pattern: string
  direction: LearningInfluenceDirection
  delta: number
  why: string
  /** Evidence tier for the underlying performance pattern, when known. */
  patternStrength?: PatternStrength
}

export type OptimizationInsight = {
  id: string
  brandProfileId: string
  kind: OptimizationInsightKind
  /** Human label, e.g. "beauty on Instagram" */
  subject: string
  metric: string
  value: number | null
  sampleSize: number
  confidence: OptimizationInsightConfidence
  evidence?: string[]
  /** Machine routing for recommendations (avoid parsing `subject`). */
  tags?: StrategyAdjustmentPayload
  createdAt: string
  /** Evidence tier for this pattern (early learning vs proven). */
  patternStrength?: PatternStrength
  /** Stable axis key, e.g. `beauty::instagram` or `step_by_step::instagram`. */
  patternKey?: string
  /** Whether this row is historically helpful or harmful for ranking heuristics. */
  learningDirection?: LearningInfluenceDirection
  /** Rough effect size in engagement-rate space (for UI / traces). */
  estimatedDelta?: number
}

export type StrategyAdjustmentRecommendation = {
  id: string
  brandProfileId: string
  kind: StrategyAdjustmentKind
  title: string
  rationale: string
  /** 0–1 how hard to apply this rule in heuristics */
  weight: number
  payload?: StrategyAdjustmentPayload
  createdAt: string
  /** Propagated from {@link OptimizationInsight.patternStrength} for explainability. */
  sourcePatternStrength?: PatternStrength
}

/** Hint passed into CTA copy when `prefer_cta_style` recommendations fire. */
export type CtaLearningEmphasis = 'none' | 'dm' | 'link_in_bio' | 'save_share' | 'follow'

export type BrandLearningState = {
  brandProfileId: string
  snapshot: ContentPerformanceSnapshot
  insights: OptimizationInsight[]
  recommendations: StrategyAdjustmentRecommendation[]
  /** Short bullets for UI / LLM context */
  learnedSummaryLines: string[]
}
