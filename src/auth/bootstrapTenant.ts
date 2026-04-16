import type { SupabaseClient } from '@supabase/supabase-js'
import { demoBrands } from '../config/demoBrands'
import type { BrandProfile } from '../types/brand'
import { mapDbBrandRowToProfile, type BrandsTableRow } from '../services/brands/mapDbBrandToProfile'

/**
 * Loads brands for a **real** Supabase workspace (`tenant_id` UUID). RLS restricts rows to
 * members of that tenant.
 *
 * Reads **`public.brands`** (`id`, `tenant_id`, `name`, `created_at`) and maps rows to
 * {@link BrandProfile} using the first demo template for defaults.
 *
 * When the workspace has no `brands` rows yet, tries to insert **one** starter row cloned from
 * the demo template name. If that insert fails (RLS, schema, etc.), returns `[]` so the UI can
 * show an empty state instead of hanging on a thrown error.
 */
export async function loadBrandsForTenant(
  supabase: SupabaseClient,
  tenantId: string,
): Promise<BrandProfile[]> {
  const { data, error } = await supabase
    .from('brands')
    .select('id, tenant_id, name, created_at')
    .eq('tenant_id', tenantId)
  if (error) {
    console.error('[JifunzeAI workspace] brands select error:', error)
    throw error
  }
  if (data && data.length > 0) {
    return (data as BrandsTableRow[]).map((r) => mapDbBrandRowToProfile(r))
  }
  return seedDefaultBrand(supabase, tenantId)
}

async function seedDefaultBrand(
  supabase: SupabaseClient,
  tenantId: string,
): Promise<BrandProfile[]> {
  const template = demoBrands[0]
  if (!template) return []
  const id = crypto.randomUUID()
  const name = template.name
  const { error } = await supabase
    .from('brands')
    .insert({
      id,
      tenant_id: tenantId,
      name,
    })
    .select('id')
    .maybeSingle()
  if (error) {
    console.error('[JifunzeAI workspace] seed default brand insert failed (empty brands UI):', error)
    return []
  }
  return [mapDbBrandRowToProfile({ id, tenant_id: tenantId, name })]
}
