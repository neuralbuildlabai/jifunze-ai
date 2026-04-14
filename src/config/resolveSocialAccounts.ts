import type { BrandProfile } from '../types/brand'
import { getDemoSocialAccountsForBrand } from './demoSocialAccounts'

/** API-provided accounts on the brand, else demo fixtures keyed by `brand.id`. */
export function resolveSocialAccountsForBrand(brand: BrandProfile) {
  return brand.social_accounts ?? getDemoSocialAccountsForBrand(brand.id)
}
