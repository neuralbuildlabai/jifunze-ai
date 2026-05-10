/**
 * Slide manifest for Business Analytics Decision-Making.
 * `assetStatus` is `planned` until PNG exports exist under public/course-assets/.../slides/.
 */

import { BUSINESS_ANALYTICS_DECISION_MAKING_SLUG } from './businessAnalyticsDecisionMakingIds.ts'

export const BUSINESS_ANALYTICS_MODULE_SLUGS = [
  'business-analytics-foundations',
  'understanding-business-performance-data',
  'trend-and-variance-analysis',
  'channel-product-customer-analysis',
  'diagnosing-the-business-problem',
  'turning-analytics-into-action',
] as const

export type BaModuleSlug = (typeof BUSINESS_ANALYTICS_MODULE_SLUGS)[number]

export type SlideAssetStatus = 'ready' | 'planned'

export type BusinessAnalyticsSlideEntry = {
  id: string
  slideNumber: number
  title: string
  imageSrc: string
  altText: string
  moduleId: BaModuleSlug
  lessonId?: string
  keyTakeaway?: string
}

export type BusinessAnalyticsSlideManifest = {
  courseSlug: typeof BUSINESS_ANALYTICS_DECISION_MAKING_SLUG
  assetStatus: SlideAssetStatus
  deckTitle: string
  deckDownloadUrl: string
  totalSlides: number
  moduleSlideRanges: Record<BaModuleSlug, { start: number; end: number }>
  slides: readonly BusinessAnalyticsSlideEntry[]
}

const DECK_FILE = 'business_analytics_decision_making_serious_deck.pptx'
const ASSET_BASE = `/course-assets/business-analytics-decision-making`

export const BUSINESS_ANALYTICS_DECK_DOWNLOAD_URL = `${ASSET_BASE}/deck/${DECK_FILE}` as const

/** Placeholder ranges from module overviews (deck slide mapping); no PNGs wired until export. */
const PLANNED_MODULE_RANGES: Record<BaModuleSlug, { start: number; end: number }> = {
  'business-analytics-foundations': { start: 1, end: 7 },
  'understanding-business-performance-data': { start: 8, end: 12 },
  'trend-and-variance-analysis': { start: 13, end: 19 },
  'channel-product-customer-analysis': { start: 20, end: 27 },
  'diagnosing-the-business-problem': { start: 28, end: 33 },
  'turning-analytics-into-action': { start: 34, end: 40 },
}

export const businessAnalyticsDecisionMakingSlideManifest: BusinessAnalyticsSlideManifest = {
  courseSlug: BUSINESS_ANALYTICS_DECISION_MAKING_SLUG,
  assetStatus: 'planned',
  deckTitle: 'Business Analytics for Decision-Making — slide deck',
  deckDownloadUrl: BUSINESS_ANALYTICS_DECK_DOWNLOAD_URL,
  totalSlides: 40,
  moduleSlideRanges: PLANNED_MODULE_RANGES,
  slides: [],
}

export function getBaSlidesForModule(moduleSlug: string): readonly BusinessAnalyticsSlideEntry[] {
  if (businessAnalyticsDecisionMakingSlideManifest.assetStatus !== 'ready') return []
  const range = businessAnalyticsDecisionMakingSlideManifest.moduleSlideRanges[moduleSlug as BaModuleSlug]
  if (!range) return []
  return businessAnalyticsDecisionMakingSlideManifest.slides.filter(
    (s) => s.slideNumber >= range.start && s.slideNumber <= range.end,
  )
}

export function getBaSlidesForLesson(moduleSlug: string, _lessonNumber: string): readonly BusinessAnalyticsSlideEntry[] {
  void _lessonNumber
  // When `assetStatus` is `ready`, add per-lesson slide maps like BPA; until then this returns [].
  return getBaSlidesForModule(moduleSlug)
}
