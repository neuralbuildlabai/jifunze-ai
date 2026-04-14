import type { BrandProfile } from '../types/brand'
import type { BrandConversionProfile } from '../types/brandConversion'

const DEFAULT_CONVERSION: BrandConversionProfile = {
  primary_conversion_goal: 'engagement',
  destinations: {},
}

/** Merges optional `brand.conversion` with sane defaults for funnel services. */
export function mergeBrandConversionProfile(brand: BrandProfile): BrandConversionProfile {
  const c = brand.conversion
  if (!c) return { ...DEFAULT_CONVERSION }
  return {
    ...DEFAULT_CONVERSION,
    ...c,
    destinations: {
      ...DEFAULT_CONVERSION.destinations,
      ...c.destinations,
    },
  }
}
