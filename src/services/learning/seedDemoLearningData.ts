import type { BrandProfile } from '../../types/brand'
import type { ContentDomain } from '../../types/contentDomain'
import type { ContentFormat } from '../../types/contentFormat'
import type { TrendCategory } from '../../types/trendCategory'
import type { PublishedContentPerformance } from '../../types/performanceLearning'
import type { ExplanationStyle, TeachingLevel } from '../../types/teaching'
import type { AdaptationPlatformId } from '../../types/adaptationPlatform'
import { recordPublishedContentPerformance } from './recordPerformance'
import { getPerformanceMemoryStore } from './performanceMemoryStore'

const TRENDS: TrendCategory[] = [
  'product_launch',
  'viral_trend',
  'educational_topic',
  'cultural_moment',
  'industry_update',
  'local_event',
]
const FORMATS: ContentFormat[] = [
  'carousel_concept',
  'short_form_video_concept',
  'caption_only_post',
  'motion_poster',
]
const PLATFORMS: AdaptationPlatformId[] = ['instagram', 'tiktok', 'x', 'facebook']
const HOOKS = ['timely', 'first_frame', 'pov', 'community', 'plain'] as const
const CTA_TYPES = ['intent:traffic', 'intent:engagement', 'dm', 'link_in_bio', 'intent:sales'] as const
const TEACH_LEVELS: TeachingLevel[] = ['beginner', 'intermediate', 'advanced']
const EXPLAIN_STYLES: ExplanationStyle[] = [
  'step_by_step',
  'quick_tip',
  'breakdown',
  'analogy',
  'comparison',
  'use_case',
]

function mix(i: number, brandId: string): number {
  let h = 0
  const s = `${brandId}:${i}`
  for (let k = 0; k < s.length; k++) h = (h * 31 + s.charCodeAt(k)) >>> 0
  return (h % 1000) / 1000
}

function effectiveEngagement(i: number, brandId: string, domain: ContentDomain): number {
  const m = mix(i, brandId)
  const primaryBoost = domain === 'beauty' || domain === 'music' ? 0.12 : 0.06
  return Math.min(0.14, 0.018 + m * 0.09 + primaryBoost * (i % 3 === 0 ? 1 : 0.35))
}

/**
 * Seeds deterministic demo rows once per brand so the learning UI is non-empty in preview.
 */
export function ensureBrandLearningDemoSeed(brand: BrandProfile): void {
  const store = getPerformanceMemoryStore()
  if (store.countForBrand(brand.id) >= 12) return

  const domains = [brand.primaryDomain, ...(brand.secondaryDomains ?? [])] as ContentDomain[]
  const now = Date.now()

  for (let i = 0; i < 22; i++) {
    const domain = domains[i % domains.length] ?? brand.primaryDomain
    const trend = TRENDS[i % TRENDS.length]
    const contentFormat = FORMATS[i % FORMATS.length]
    const platform = PLATFORMS[i % PLATFORMS.length]
    const publishedAt = new Date(now - (i + 1) * 36 * 3600 * 1000).toISOString()
    const er = effectiveEngagement(i, brand.id, domain)
    const impressions = 800 + (i % 7) * 420
    const engagementActions = Math.round(impressions * er)

    const teachingLevel = TEACH_LEVELS[i % TEACH_LEVELS.length]
    const explanationStyle = EXPLAIN_STYLES[i % EXPLAIN_STYLES.length]
    const watchTimeProxySeconds = 10 + Math.round(mix(i + 2, brand.id) * 55)
    const bookmarks = Math.round(engagementActions * 0.22)
    const completionSignal = Math.min(1, 0.12 + mix(i + 4, brand.id) * 0.55)
    const engagementDepthScore = Math.min(
      1,
      ((i % 5) + 3) * 0.07 + (domain === 'ai' ? 0.06 : 0),
    )

    const row: PublishedContentPerformance = {
      id: `seed-perf-${brand.id}-${i}`,
      contentItemId: `seed-content-${brand.id}-${i}`,
      brandProfileId: brand.id,
      platform,
      publishedAt,
      domain,
      trendCategory: trend,
      contentFormat,
      ctaType: CTA_TYPES[i % CTA_TYPES.length],
      hookStyle: HOOKS[i % HOOKS.length],
      impressions,
      reach: Math.round(impressions * 0.92),
      clicks: Math.round(impressions * (0.008 + mix(i + 3, brand.id) * 0.02)),
      likes: Math.round(engagementActions * 0.45),
      comments: Math.round(engagementActions * 0.12),
      shares: Math.round(engagementActions * 0.18),
      saves: Math.round(engagementActions * 0.25),
      engagementRate: er,
      conversionHint: Math.round(mix(i + 9, brand.id) * 40),
      teachingLevel,
      explanationStyle,
      watchTimeProxySeconds,
      bookmarks,
      completionSignal,
      engagementDepthScore,
      metadata: { source: 'demo_seed' },
    }
    recordPublishedContentPerformance(row)
  }
}
