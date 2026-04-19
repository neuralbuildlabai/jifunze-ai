import type { SupabaseClient } from '@supabase/supabase-js'
import type { AccessTier } from './appAccess'

const VALID = new Set<AccessTier>([
  'member',
  'pro',
  'workspace_admin',
  'platform_admin',
  'super_admin',
])

function parseTier(raw: unknown): AccessTier | null {
  if (typeof raw !== 'string') return null
  const t = raw.trim().toLowerCase()
  return VALID.has(t as AccessTier) ? (t as AccessTier) : null
}

/**
 * Server-side effective tier for the signed-in user. Pass the current workspace UUID when
 * `usesWorkspacePersistence` and `tenantId` is a Postgres workspace id.
 */
export async function fetchMyEffectiveAccessTier(
  supabase: SupabaseClient,
  tenantIdForRpc: string | null,
): Promise<{ tier: AccessTier | null; error: { message: string } | null }> {
  const args: { p_tenant_id: string | null } = { p_tenant_id: tenantIdForRpc }
  const { data, error } = await supabase.rpc('my_effective_access_tier', args)
  if (error) {
    return { tier: null, error: { message: error.message } }
  }
  const tier = parseTier(data)
  if (!tier) {
    return { tier: null, error: { message: 'Invalid access tier payload from RPC' } }
  }
  return { tier, error: null }
}
