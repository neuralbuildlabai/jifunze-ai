import type { SupabaseClient } from '@supabase/supabase-js'
import { getPersistence } from '../persistence/registry'
import type { BrandProfile } from '../types/brand'

/** API-provided accounts on the brand, else tenant-scoped persistence (defaults to demo fixtures in memory). */
export async function resolveSocialAccountsForBrand(
  brand: BrandProfile,
  tenantId: string,
  supabase?: SupabaseClient,
) {
  if (brand.social_accounts?.length) return brand.social_accounts
  return getPersistence(tenantId, supabase).socialAccounts.listForBrand(brand.id)
}
