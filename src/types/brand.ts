import type { ContentDomain } from './contentDomain'
import type { ContentFormat } from './contentFormat'
import type {
  AnimationPreference,
  CreativeRiskLevel,
  MediaStyleProfile,
  VisualRealismPreference,
} from './mediaEngine'
import type { BrandAutomationSettings } from './brandAutomation'
import type { SocialAccount } from './socialAccount'
import type { TrendCategory } from './trendCategory'
import type { BrandConversionProfile } from './brandConversion'

export type BrandVoice = 'professional' | 'playful' | 'bold' | 'warm' | string

/**
 * Brand context: primary Jifunze vertical plus optional adjacencies (five supported domains only).
 */
export type BrandProfile = {
  id: string
  name: string
  industry: string
  audience_summary: string
  voice: BrandVoice
  banned_topics: string[]
  competitor_keywords: string[]
  priority_topics: string[]
  /** Main vertical for ranking and voice defaults. */
  primaryDomain: ContentDomain
  /** Optional adjacencies (subset of the same five domains). */
  secondaryDomains?: ContentDomain[]
  /**
   * When true, signals outside primary/secondary lose less relevance (still ranked lower).
   * Default: tighter specialization.
   */
  allow_cross_domain_signals?: boolean
  allowed_trend_categories: TrendCategory[]
  forbidden_trend_categories: TrendCategory[]
  preferred_content_formats: ContentFormat[]
  media_style: MediaStyleProfile
  visual_realism_preference: VisualRealismPreference
  animation_preference: AnimationPreference
  creative_risk_level: CreativeRiskLevel
  /** Optional region or market focus for future geo rules. */
  geo_hint?: string
  /** Autonomous ops toggles (draft/queue/publish gates); omitted keys use config defaults. */
  automation?: Partial<BrandAutomationSettings>
  /**
   * Phrases that should trigger human review when present (regulatory, PR, recalls).
   * Distinct from banned_topics (banned vocabulary still forces safety escalation).
   */
  sensitive_review_keywords?: string[]
  /** Connected handles for multi-platform publishing; demo uses `resolveSocialAccountsForBrand` fallback. */
  social_accounts?: SocialAccount[]
  /** Funnel defaults: primary goal, optional secondaries, and outbound destinations for CTAs. */
  conversion?: BrandConversionProfile
}
