/**
 * Placeholder funnel metrics (no live analytics wiring yet).
 */
export type ConversionFunnelFeedback = {
  impressions: number | null
  clicks: number | null
  engagement: number | null
  conversion_hint: number | null
}

export const EMPTY_CONVERSION_FUNNEL_FEEDBACK: ConversionFunnelFeedback = {
  impressions: null,
  clicks: null,
  engagement: null,
  conversion_hint: null,
}
