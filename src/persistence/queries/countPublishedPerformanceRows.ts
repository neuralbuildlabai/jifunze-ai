import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Single implementation for counting rows in `published_content_performance` for a tenant + brand.
 *
 * Uses GET + `count: 'exact'` with `limit(1)` (not `{ head: true }`, which issues HTTP HEAD).
 * Best-effort: returns **0** when PostgREST returns an error (RLS, network, etc.) — callers must not
 * treat 0 as “authoritatively empty” vs “unreadable” without other context.
 */
export async function countPublishedPerformanceRowsForBrand(
  client: SupabaseClient,
  tenantId: string,
  brandProfileId: string,
): Promise<number> {
  const { count, error } = await client
    .from('published_content_performance')
    .select('id', { count: 'exact' })
    .eq('tenant_id', tenantId)
    .eq('brand_profile_id', brandProfileId)
    .limit(1)
  if (error) return 0
  return count ?? 0
}
