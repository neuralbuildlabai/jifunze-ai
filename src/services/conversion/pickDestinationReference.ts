import type { BrandProfile } from '../../types/brand'
import type { BrandConversionProfile } from '../../types/brandConversion'
import type { ConversionIntent } from '../../types/conversion'
import type { AdaptationPlatformId } from '../../types/adaptationPlatform'
import { firstAdaptationPlatformFromSuggestions } from './mapSuggestedPlatform'

function stripAt(h?: string): string | undefined {
  if (!h) return undefined
  return h.replace(/^@+/, '').trim() || undefined
}

/**
 * Platform-native routing hint (not a live deep link resolver).
 */
export function pickDestinationReference(
  brand: BrandProfile,
  conv: BrandConversionProfile,
  platform: AdaptationPlatformId,
  intent: ConversionIntent,
): string {
  const d = conv.destinations
  const ig = stripAt(d.instagram_handle)
  const wa = d.whatsapp_number?.trim()

  if (platform === 'tiktok') {
    if (intent === 'awareness' || intent === 'engagement') {
      return ig
        ? `TikTok → follow + cross-link Instagram @${ig}`
        : 'TikTok profile · follow for the next beat'
    }
    if (intent === 'traffic' || intent === 'sales') {
      return d.product_link
        ? `Link in bio · ${d.product_link}`
        : d.website_url
          ? `Link in bio · ${d.website_url}`
          : 'Link in bio (add website_url or product_link on brand)'
    }
    if (intent === 'lead_generation') {
      return wa
        ? `WhatsApp from bio · ${wa}`
        : ig
          ? `DM on Instagram @${ig}`
          : 'DM / comment “info” (configure whatsapp_number or instagram_handle)'
    }
  }

  if (platform === 'instagram') {
    if (intent === 'lead_generation' || intent === 'sales') {
      if (d.booking_link) return `Booking / appointments · ${d.booking_link}`
      if (wa) return `WhatsApp · ${wa}`
      if (d.product_link) return `Shop link · ${d.product_link}`
      return ig ? `DM · @${ig}` : 'DM · Instagram inbox'
    }
    if (intent === 'traffic') {
      return d.website_url ? `Link in bio · ${d.website_url}` : 'Link in bio'
    }
    return ig ? `Profile · @${ig}` : `Profile · ${brand.name}`
  }

  if (platform === 'x') {
    if (intent === 'traffic' || intent === 'sales') {
      return d.website_url ? `Pinned / profile URL · ${d.website_url}` : 'Profile link'
    }
    if (intent === 'lead_generation') {
      return wa ? `DM or WhatsApp · ${wa}` : ig ? `DM on IG @${ig}` : 'Replies / DM'
    }
    return d.website_url ? `Follow + site · ${d.website_url}` : 'Profile follow'
  }

  // facebook
  if (intent === 'lead_generation' || intent === 'sales') {
    if (d.booking_link) return `Events / booking · ${d.booking_link}`
    if (wa) return `Messenger / WhatsApp · ${wa}`
    return d.website_url ? `First-comment link · ${d.website_url}` : 'Page CTA button'
  }
  if (intent === 'traffic') {
    return d.website_url ? `Learn more link · ${d.website_url}` : 'Page link'
  }
  return d.website_url ? `${brand.name} site · ${d.website_url}` : 'Page / group'
}

export function summarizeOpportunityDestination(
  brand: BrandProfile,
  conv: BrandConversionProfile,
  intent: ConversionIntent,
  suggestedPlatforms: string[],
  fallbackPlatform: AdaptationPlatformId,
): string {
  const platform = firstAdaptationPlatformFromSuggestions(suggestedPlatforms) ?? fallbackPlatform
  return pickDestinationReference(brand, conv, platform, intent)
}