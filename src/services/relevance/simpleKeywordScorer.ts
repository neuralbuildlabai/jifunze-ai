import { getBrandDomains } from '../../config/brandDomains'
import { getTrendCategoryBehavior } from '../../config/trendCategoryBehavior'
import { classifySignal } from '../domains/classifySignal'
import { classifyTrendCategory } from '../trends/classifyTrendCategory'
import { computeFreshnessScore } from './freshness'
import type { BrandRelevanceInput, ScoredSignal } from './types'

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9+#]+/g)
    .filter(Boolean)
}

function scoreOverlap(haystack: string, needles: string[]): number {
  if (needles.length === 0) return 0
  const tokens = new Set(tokenize(haystack))
  let hits = 0
  for (const n of needles) {
    const parts = tokenize(n)
    if (parts.length === 0) continue
    if (parts.some((p) => tokens.has(p) || haystack.toLowerCase().includes(n.toLowerCase()))) {
      hits += 1
    }
  }
  return hits / needles.length
}

function geoFitBoost(brand: BrandRelevanceInput['brand'], haystack: string): number {
  if (!brand.geo_hint) return 0
  const parts = brand.geo_hint
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter((w) => w.length > 3)
  const h = haystack.toLowerCase()
  for (const p of parts) {
    if (h.includes(p)) return 0.03
  }
  return 0
}

export function scoreSignalForBrand(input: BrandRelevanceInput): ScoredSignal {
  const { signal, brand } = input
  const haystack = `${signal.title} ${signal.summary} ${signal.topic_tags.join(' ')}`

  const trendCat = signal.classified_trend_category ?? classifyTrendCategory(signal)
  const trendBehavior = getTrendCategoryBehavior(trendCat)

  const priority = scoreOverlap(haystack, brand.priority_topics) * 0.55
  const industry = scoreOverlap(haystack, [brand.industry]) * 0.2
  const audience = scoreOverlap(haystack, [brand.audience_summary]) * 0.1

  const bannedPenalty = scoreOverlap(haystack, brand.banned_topics) * 0.45
  const competitorPenalty = scoreOverlap(haystack, brand.competitor_keywords) * 0.15

  const trendBonus = brand.allowed_trend_categories.includes(trendCat) ? 0.08 : 0
  const trendPenalty = brand.forbidden_trend_categories.includes(trendCat) ? 0.35 : 0

  let categoryBoost = trendBehavior.relevanceBoost

  if (trendCat === 'viral_audio') {
    const brandDomains = getBrandDomains(brand)
    const boostDomains = getTrendCategoryBehavior('viral_audio').viralAudioBoostDomains
    if (brandDomains.some((d) => boostDomains.includes(d))) {
      categoryBoost += 0.06
    }
  }

  if (trendCat === 'meme') {
    const brandOkForMeme =
      brand.creative_risk_level === 'bold' ||
      brand.voice === 'playful' ||
      brand.primaryDomain === 'entertainment'
    if (!brandOkForMeme) {
      categoryBoost -= 0.12
    }
  }

  const signalDomain = signal.classified_domain ?? classifySignal(signal)
  const brandDomains = getBrandDomains(brand)
  const inBrandDomains = brandDomains.includes(signalDomain)
  const primaryBoost = signalDomain === brand.primaryDomain ? 0.14 : 0
  const secondaryBoost =
    signalDomain !== brand.primaryDomain && (brand.secondaryDomains?.includes(signalDomain) ?? false)
      ? 0.08
      : 0
  const cross = brand.allow_cross_domain_signals === true
  const domainPenalty = !inBrandDomains ? (cross ? 0.06 : 0.22) : 0

  const geoBoost = geoFitBoost(brand, haystack)

  const relevance_score = Math.min(
    1,
    Math.max(
      0,
      priority +
        industry +
        audience +
        trendBonus +
        primaryBoost +
        secondaryBoost +
        categoryBoost +
        geoBoost -
        bannedPenalty -
        competitorPenalty -
        trendPenalty -
        domainPenalty,
    ),
  )

  const freshness_score = computeFreshnessScore(signal)

  return {
    ...signal,
    classified_domain: signalDomain,
    classified_trend_category: trendCat,
    relevance_score,
    freshness_score,
  }
}
