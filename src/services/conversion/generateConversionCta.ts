import type { AdaptationPlatformId } from '../../types/adaptationPlatform'
import type { ContentDomain } from '../../types/contentDomain'
import type { ConversionIntent } from '../../types/conversion'
import type { CtaLearningEmphasis } from '../../types/performanceLearning'
import type { TrendCategory } from '../../types/trendCategory'

export type GenerateConversionCtaInput = {
  domain: ContentDomain
  trend: TrendCategory
  intent: ConversionIntent
  /** When set, copy leans toward native surface verbs (follow, DM, link in bio). */
  platform?: AdaptationPlatformId
  brandName?: string
  /** Performance-memory hint (rule-based learning layer). */
  learningEmphasis?: CtaLearningEmphasis
}

function trendSpice(trend: TrendCategory): string | null {
  if (trend === 'product_launch') return ' Limited window — move while stock lasts.'
  if (trend === 'breaking_news') return ' We’ll keep updating as facts firm up.'
  if (trend === 'local_event') return ' Lock your spot before doors.'
  return null
}

function platformFirstLine(
  domain: ContentDomain,
  intent: ConversionIntent,
  platform: AdaptationPlatformId | undefined,
): string | undefined {
  if (!platform) return undefined
  if (platform === 'tiktok' && intent === 'awareness') {
    return 'Follow for more — we post the breakdowns you actually save.'
  }
  if (platform === 'tiktok' && intent === 'engagement') {
    return 'Stitch or duet this if you’d run it differently — we’ll feature the best takes.'
  }
  if (platform === 'instagram' && intent === 'lead_generation') {
    return domain === 'beauty'
      ? 'DM us “glow” and we’ll walk you through the routine.'
      : 'DM us to get started — we reply same day.'
  }
  if (platform === 'x' && intent === 'traffic') {
    return 'Full write-up + links are in our bio / pinned thread.'
  }
  if (platform === 'facebook' && intent === 'engagement') {
    return 'Tag someone who needs to see this in their feed this week.'
  }
  return undefined
}

function domainIntentLine(domain: ContentDomain, intent: ConversionIntent): string {
  /* eslint-disable no-fallthrough -- each `case` owns a nested `switch` that returns on every path */
  switch (domain) {
    case 'beauty':
      switch (intent) {
        case 'awareness':
          return 'Follow for honest texture checks and shade notes — no gatekeeping.'
        case 'engagement':
          return 'Save this for your next routine refresh and tell us what you’d swap.'
        case 'traffic':
          return 'Tap through — we linked the exact routine breakdown on site.'
        case 'lead_generation':
          return 'Book your appointment now — spots fill fast on launch weeks.'
        case 'sales':
          return 'Shop the drop before your shade sells through — link in bio.'
      }
    case 'ai':
      switch (intent) {
        case 'awareness':
          return 'Follow for more AI tips — we ship short experiments, not hype threads.'
        case 'engagement':
          return 'Reply with your stack — we’ll riff on the best build in the next post.'
        case 'traffic':
          return 'Try this tool today — we dropped the link where builders actually click.'
        case 'lead_generation':
          return 'Ping us for a walkthrough — we’ll route you to the right workflow.'
        case 'sales':
          return 'Start free, upgrade when you ship — pricing is in the bio link.'
      }
    case 'lifestyle':
      switch (intent) {
        case 'awareness':
          return 'Follow along for small upgrades that compound — one habit at a time.'
        case 'engagement':
          return 'Save this for later and share with a friend who’s planning the same reset.'
        case 'traffic':
          return 'Read the full checklist on site — caption is the teaser only.'
        case 'lead_generation':
          return 'Tell us what you’re optimizing — we’ll send the starter template.'
        case 'sales':
          return 'Grab the bundle while this batch is live — link in bio.'
      }
    case 'entertainment':
      switch (intent) {
        case 'awareness':
          return 'Follow for the behind-the-scenes beats you miss on the main feed.'
        case 'engagement':
          return 'Drop your hot take — best comment gets featured in stories.'
        case 'traffic':
          return 'Full recap + clips live on site — don’t sleep on the bonus cut.'
        case 'lead_generation':
          return 'DM for collabs and press — we read every serious note.'
        case 'sales':
          return 'Tickets and merch move fast — tap in before the resale crowd does.'
      }
    case 'music':
      switch (intent) {
        case 'awareness':
          return 'Follow for lineups, limited drops, and same-night energy.'
        case 'engagement':
          return 'Share this with your crew — tag the friend who owes you a night out.'
        case 'traffic':
          return 'Hit the link for set times, door policy, and last tickets.'
        case 'lead_generation':
          return 'RSVP in DMs for guest list holds — we confirm in writing.'
        case 'sales':
          return 'Secure your ticket or table now — capacity is real, not marketing.'
      }
  }
  /* eslint-enable no-fallthrough */
}

/**
 * Deterministic CTA line from domain, trend shape, funnel intent, and optional platform.
 */
function learningOverride(
  input: GenerateConversionCtaInput,
  spice: string | null,
): string | null {
  const { learningEmphasis, platform, brandName, domain } = input
  if (!learningEmphasis || learningEmphasis === 'none') return null
  const named = brandName ? `${brandName}: ` : ''
  const tail = spice ? ` ${spice}` : ''

  if (learningEmphasis === 'dm' && (platform === 'instagram' || platform === 'tiktok')) {
    const line =
      domain === 'beauty'
        ? `${named}DM us “glow” — we’ll match you to the right treatment window.`
        : `${named}DM us today — we route serious questions same day.`
    return `${line}${tail}`.trim()
  }
  if (learningEmphasis === 'link_in_bio') {
    return `${named}Tap link in bio — that’s where the proof, prices, and booking live.${tail}`.trim()
  }
  if (learningEmphasis === 'save_share') {
    return `${named}Save this for later and share with whoever needs the same fix.${tail}`.trim()
  }
  if (learningEmphasis === 'follow') {
    return `${named}Follow for the next beat — we ship the follow-ups you actually asked for.${tail}`.trim()
  }
  return null
}

export function generateConversionCta(input: GenerateConversionCtaInput): string {
  const { domain, trend, intent, platform, brandName } = input
  const named = brandName ? `${brandName}: ` : ''

  const spice = trendSpice(trend)
  const learned = learningOverride(input, spice)
  if (learned) return learned

  const platformLine = platformFirstLine(domain, intent, platform)
  const base = domainIntentLine(domain, intent)

  let out = (platformLine ?? `${named}${base}`).trim()
  if (spice) out = `${out} ${spice}`.trim()
  return out
}
