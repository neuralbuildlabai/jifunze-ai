import type { ConversionIntent } from './conversion'

/** Where CTAs should route humans (all optional until configured). */
export type BrandConversionDestinations = {
  website_url?: string
  whatsapp_number?: string
  instagram_handle?: string
  booking_link?: string
  product_link?: string
}

/** Conversion + destination config for a tenant. */
export type BrandConversionProfile = {
  primary_conversion_goal: ConversionIntent
  secondary_conversion_goals?: ConversionIntent[]
  destinations: BrandConversionDestinations
}
