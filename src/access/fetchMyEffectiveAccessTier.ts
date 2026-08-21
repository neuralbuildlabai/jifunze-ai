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
 * Server-side effective tier for the signed-in user.
 *
 * Post-Wave-1 (2026-05-18): tenant_id parameter removed; the RPC now resolves the learner's
 * tier from `auth.uid()` only. Wave 6 (team learning) will reintroduce an organization-scoped
 * tier resolution as a separate function.
 */
export async function fetchMyEffectiveAccessTier(
  supabase: SupabaseClient,
): Promise<{ tier: AccessTier | null; error: { message: string } | null }> {
  const { data, error } = await supabase.rpc('my_effective_access_tier')
  if (error) {
    return { tier: null, error: { message: error.message } }
  }
  const tier = parseTier(data)
  if (!tier) {
    return { tier: null, error: { message: 'Invalid access tier payload from RPC' } }
  }
  return { tier, error: null }
}
