import type { BrandProfile } from '../types/brand'
import type { ContentDomain } from '../types/contentDomain'

/** Primary plus optional secondaries — use everywhere `content_domains` existed. */
export function getBrandDomains(brand: BrandProfile): ContentDomain[] {
  const s = brand.secondaryDomains ?? []
  return [brand.primaryDomain, ...s]
}
