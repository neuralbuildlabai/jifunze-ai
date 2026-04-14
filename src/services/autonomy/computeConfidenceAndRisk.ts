import type { TrendCategory } from '../../types/trendCategory'
import type { BrandSafetyFlags, RiskLevel } from '../../types/autonomy'
import type { ContentDomain } from '../../types/contentDomain'
import { getBrandDomains } from '../../config/brandDomains'
import type { BrandProfile } from '../../types/brand'
import type { AutonomyPolicy } from '../../types/autonomy'

export type DomainMatchRole = 'primary' | 'secondary' | 'cross'

export function domainMatchRole(brand: BrandProfile, content_domain: ContentDomain): DomainMatchRole {
  if (content_domain === brand.primaryDomain) return 'primary'
  const doms = getBrandDomains(brand)
  if (doms.includes(content_domain)) return 'secondary'
  return 'cross'
}

export function computeConfidenceAndRisk(input: {
  brand: BrandProfile
  relevance: number
  freshness: number
  sourceQuality: number
  domainRole: DomainMatchRole
  trend_category: TrendCategory
  ambiguousContent: boolean
  safety: BrandSafetyFlags
  policy: AutonomyPolicy
}): { confidence_score: number; risk_level: RiskLevel } {
  const {
    brand,
    relevance,
    freshness,
    sourceQuality,
    domainRole,
    trend_category,
    ambiguousContent,
    safety,
  } = input

  let c =
    0.3 +
    relevance * 0.26 +
    freshness * 0.17 +
    sourceQuality * 0.13 +
    (domainRole === 'primary' ? 0.12 : domainRole === 'secondary' ? 0.06 : -0.04)

  if (ambiguousContent) c -= 0.09
  if (freshness < 0.32) c -= 0.07
  if (safety.competitor_mention) c -= 0.05
  if (safety.sensitive_topic_match) c -= 0.11
  if (safety.banned_topic_match) c -= 0.38

  c = Math.min(1, Math.max(0, c))

  let risk: RiskLevel = 'low'
  if (safety.banned_topic_match) risk = 'high'
  else if (safety.sensitive_topic_match) risk = 'medium'
  else if (safety.competitor_mention) risk = 'medium'
  else if (domainRole === 'cross' && !brand.allow_cross_domain_signals) risk = 'medium'
  else if (trend_category === 'breaking_news') risk = 'medium'
  else if (trend_category === 'meme' && brand.creative_risk_level !== 'bold') risk = 'medium'
  else if (freshness < input.policy.thresholds.staleFreshnessForPublish && trend_category === 'viral_trend')
    risk = 'medium'

  if (safety.competitor_mention && safety.sensitive_topic_match) risk = 'high'
  if (domainRole === 'cross' && relevance < 0.35) risk = 'high'

  return { confidence_score: c, risk_level: risk }
}
