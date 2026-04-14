import type { ContentDomain } from '../types/contentDomain'
import type { ContentFormat } from '../types/contentFormat'
import type { TrendCategory } from '../types/trendCategory'

/**
 * Central knobs for how each trend type affects scoring, urgency feel, and format bias.
 * Tune here instead of scattering magic numbers across services.
 */
export type TrendCategoryBehavior = {
  /** Added to the relevance sum before clamp (roughly −0.08 … +0.12). */
  relevanceBoost: number
  /** Multiplies the internal 0–1 “urgency driver” derived from relevance+freshness. */
  urgencyMultiplier: number
  /** When true, memes get an extra relevance penalty unless the brand skews playful/bold. */
  memeNeedsBrandFit: boolean
  /** Domains where viral_audio signals get an extra relevance lift. */
  viralAudioBoostDomains: ContentDomain[]
  /** Short copy hint merged into opportunity angles. */
  angleHint: string
  /** Suggested formats when brand prefs allow (first match wins in opportunity builder). */
  preferredFormats: ContentFormat[]
}

export const TREND_CATEGORY_BEHAVIOR: Record<TrendCategory, TrendCategoryBehavior> = {
  breaking_news: {
    relevanceBoost: 0.08,
    urgencyMultiplier: 1.15,
    memeNeedsBrandFit: false,
    viralAudioBoostDomains: [],
    angleHint: 'Lead with what changed and why it matters now; cite source humility.',
    preferredFormats: ['carousel_concept', 'short_form_video_concept', 'caption_only_post'],
  },
  product_launch: {
    relevanceBoost: 0.06,
    urgencyMultiplier: 1.1,
    memeNeedsBrandFit: false,
    viralAudioBoostDomains: [],
    angleHint: 'Highlight the drop, proof, and CTA; keep claims verifiable.',
    preferredFormats: ['short_form_video_concept', 'carousel_concept', 'near_realistic_promo_visual'],
  },
  viral_trend: {
    relevanceBoost: 0.05,
    urgencyMultiplier: 1.18,
    memeNeedsBrandFit: false,
    viralAudioBoostDomains: ['music', 'entertainment', 'lifestyle'],
    angleHint: 'Ride the moment fast; pattern-interrupt in line one.',
    preferredFormats: ['short_form_video_concept', 'motion_poster', 'carousel_concept'],
  },
  meme: {
    relevanceBoost: -0.02,
    urgencyMultiplier: 0.95,
    memeNeedsBrandFit: true,
    viralAudioBoostDomains: [],
    angleHint: 'Only if it fits brand humor; prefer soft riff over edgy pile-on.',
    preferredFormats: ['short_form_video_concept', 'single_static_graphic', 'caption_only_post'],
  },
  viral_audio: {
    relevanceBoost: 0.04,
    urgencyMultiplier: 1.2,
    memeNeedsBrandFit: false,
    viralAudioBoostDomains: ['music', 'entertainment', 'lifestyle'],
    angleHint: 'Sound-first hook; show how the brand legitimately uses the trend.',
    preferredFormats: ['short_form_video_concept', 'motion_poster', 'animation_concept'],
  },
  celebrity_event: {
    relevanceBoost: 0.03,
    urgencyMultiplier: 1.12,
    memeNeedsBrandFit: false,
    viralAudioBoostDomains: ['entertainment'],
    angleHint: 'Reactive but respectful; tie to brand POV, not gossip for gossip’s sake.',
    preferredFormats: ['short_form_video_concept', 'carousel_concept', 'caption_only_post'],
  },
  cultural_moment: {
    relevanceBoost: 0.03,
    urgencyMultiplier: 1.0,
    memeNeedsBrandFit: false,
    viralAudioBoostDomains: ['lifestyle', 'beauty', 'entertainment'],
    angleHint: 'Context + empathy; why this moment aligns with your audience values.',
    preferredFormats: ['carousel_concept', 'single_static_graphic', 'caption_only_post'],
  },
  local_event: {
    relevanceBoost: 0.04,
    urgencyMultiplier: 1.08,
    memeNeedsBrandFit: false,
    viralAudioBoostDomains: ['lifestyle', 'music', 'entertainment'],
    angleHint: 'Geo-specific CTA; scarcity and logistics clarity.',
    preferredFormats: ['motion_poster', 'short_form_video_concept', 'carousel_concept'],
  },
  educational_topic: {
    relevanceBoost: 0.05,
    urgencyMultiplier: 0.92,
    memeNeedsBrandFit: false,
    viralAudioBoostDomains: ['ai'],
    angleHint: 'Teach-first structure; save the CTA for after the insight.',
    preferredFormats: ['carousel_concept', 'caption_only_post', 'short_form_video_concept'],
  },
  industry_update: {
    relevanceBoost: 0.06,
    urgencyMultiplier: 1.0,
    memeNeedsBrandFit: false,
    viralAudioBoostDomains: ['ai'],
    angleHint: 'Analytical headline; implications for the reader’s work or wallet.',
    preferredFormats: ['carousel_concept', 'caption_only_post', 'motion_poster'],
  },
}

export function getTrendCategoryBehavior(category: TrendCategory): TrendCategoryBehavior {
  return TREND_CATEGORY_BEHAVIOR[category]
}
