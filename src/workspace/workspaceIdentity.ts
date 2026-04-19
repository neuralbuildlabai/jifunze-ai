import type { SupabaseClient } from '@supabase/supabase-js'

export const SUGGESTED_WORKSPACE_NAMES = [
  'My Content Studio',
  'My Teaching Workspace',
  'My Brand Lab',
] as const

/** Stable pick for bootstrap RPC so retries do not thrash names. */
export function pickDefaultWorkspaceName(seed: string): string {
  const pool = [...SUGGESTED_WORKSPACE_NAMES, 'Jifunze AI Workspace']
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return pool[h % pool.length]!
}

export type WorkspaceIdentityRow = {
  id: string
  name: string
  last_active_at: string | null
  archived_at: string | null
}

export async function fetchWorkspaceIdentity(
  supabase: SupabaseClient,
  tenantId: string,
): Promise<WorkspaceIdentityRow | null> {
  const { data, error } = await supabase
    .from('tenants')
    .select('id,name,last_active_at,archived_at')
    .eq('id', tenantId)
    .maybeSingle()

  if (error || !data) return null
  const r = data as Record<string, unknown>
  const id = typeof r.id === 'string' ? r.id : ''
  const name = typeof r.name === 'string' ? r.name : 'Workspace'
  const last_active_at = typeof r.last_active_at === 'string' ? r.last_active_at : null
  const archived_at = typeof r.archived_at === 'string' ? r.archived_at : null
  if (!id) return null
  return { id, name, last_active_at, archived_at }
}

export async function fetchProfilePlanTier(
  supabase: SupabaseClient,
  userId: string,
): Promise<'free' | 'subscriber'> {
  const { data, error } = await supabase
    .from('profiles')
    .select('plan_tier')
    .eq('id', userId)
    .maybeSingle()

  if (error || !data) return 'free'
  const t = (data as { plan_tier?: unknown }).plan_tier
  return t === 'subscriber' ? 'subscriber' : 'free'
}

export async function updateWorkspaceName(
  supabase: SupabaseClient,
  tenantId: string,
  name: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const trimmed = name.trim().slice(0, 80)
  if (trimmed.length < 2) {
    return { ok: false, message: 'Use at least 2 characters.' }
  }
  const { error } = await supabase.from('tenants').update({ name: trimmed }).eq('id', tenantId)
  if (error) {
    return { ok: false, message: error.message }
  }
  return { ok: true }
}

export async function touchWorkspaceActivity(supabase: SupabaseClient): Promise<boolean> {
  const { error } = await supabase.rpc('touch_my_workspace_activity')
  return error == null
}

export function daysBetween(iso: string | null): number | null {
  if (!iso) return null
  const t = new Date(iso).getTime()
  if (Number.isNaN(t)) return null
  return Math.floor((Date.now() - t) / 86400000)
}
