import type { AdaptationPlatformId } from '../../types/adaptationPlatform'
import type { ConversionIntent } from '../../types/conversion'

const OUTCOME_BY_INTENT: Record<ConversionIntent, string> = {
  awareness: 'Audience growth (reach + follows)',
  engagement: 'Community depth (saves, shares, replies)',
  traffic: 'Qualified visits (site / landing)',
  lead_generation: 'Leads (DMs, forms, bookings)',
  sales: 'Revenue actions (purchase, ticket, upgrade)',
}

export function expectedOutcomeForIntent(intent: ConversionIntent): string {
  return OUTCOME_BY_INTENT[intent]
}

/**
 * One-line funnel trace for humans reviewing the queue.
 */
export function describeFunnelMapping(input: {
  platform: AdaptationPlatformId
  intent: ConversionIntent
  cta: string
  destinationReference: string
}): string {
  const outcome = expectedOutcomeForIntent(input.intent)
  return `Content (${input.platform}) → CTA: "${input.cta}" → Destination: ${input.destinationReference} → Expected: ${outcome}`
}
