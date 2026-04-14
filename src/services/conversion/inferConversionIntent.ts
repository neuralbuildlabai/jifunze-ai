import type { ConversionIntent } from '../../types/conversion'
import type { UrgencyLevel } from '../../types/opportunity'
import type { TrendCategory } from '../../types/trendCategory'

export type InferConversionIntentInput = {
  primary: ConversionIntent
  secondary?: ConversionIntent[]
  trend: TrendCategory
  urgency: UrgencyLevel
}

/**
 * Simple rules: brand primary goal is the anchor; trend shape nudges the funnel step.
 */
export function inferConversionIntent(input: InferConversionIntentInput): ConversionIntent {
  const { primary, secondary = [], trend, urgency } = input

  if (trend === 'product_launch') {
    if (secondary.includes('lead_generation')) return 'lead_generation'
    return 'sales'
  }

  if (trend === 'breaking_news' || trend === 'industry_update') {
    if (primary === 'lead_generation' || primary === 'sales') return primary
    return 'traffic'
  }

  if (trend === 'local_event') {
    if (primary === 'awareness') return 'lead_generation'
    if (primary === 'sales' || primary === 'lead_generation') return primary
    return 'lead_generation'
  }

  if (trend === 'viral_trend' || trend === 'viral_audio' || trend === 'meme') {
    if (primary === 'sales') return 'traffic'
    if (primary === 'awareness') return 'engagement'
  }

  if (
    (trend === 'educational_topic' || trend === 'cultural_moment') &&
    primary === 'sales' &&
    urgency !== 'high'
  ) {
    return 'engagement'
  }

  return primary
}
