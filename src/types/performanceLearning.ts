import type { AdaptationPlatformId } from './adaptationPlatform'
import type { ContentDomain } from './contentDomain'
import type { ContentFormat } from './contentFormat'
import type { ExplanationStyle, TeachingLevel } from './teaching'
import type { TrendCategory } from './trendCategory'

/** Surfaces we track; matches adaptation IDs plus room for LinkedIn / future. */
export type PerformancePlatformId = AdaptationPlatformId | 'linkedin' | string

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
  | 'strong_trend'
  | 'weak_trend'
  | 'strong_cta'
  | 'weak_cta'
  | 'strong_format'
  | 'weak_format'
  | 'strong_posting_hour'
  | 'weak_posting_hour'
  | 'weak_combo'

export type OptimizationInsightConfidence = 'low' | 'medium' | 'high'

export type StrategyAdjustmentKind =
  | 'boost_domain_platform'
  | 'penalize_format'
  | 'prefer_cta_style'
  | 'prefer_posting_window'
  | 'penalize_weak_combo'
  | 'tighten_autonomy'
  | 'relax_autonomy'

export type StrategyAdjustmentPayload = {
  domain?: ContentDomain
  platform?: PerformancePlatformId
  trendCategory?: TrendCategory
  contentFormat?: ContentFormat
  /** e.g. `dm`, `link_in_bio`, `save_share` */
  ctaStyle?: string
  /** 0–23 local / UTC note in rationale */
  postingHour?: number
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
