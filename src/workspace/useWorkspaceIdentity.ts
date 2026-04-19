import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { isWorkspaceTenantId } from '../persistence/tenantPersistenceMode'
import {
  daysBetween,
  fetchProfilePlanTier,
  fetchWorkspaceIdentity,
  touchWorkspaceActivity,
  updateWorkspaceName,
  type WorkspaceIdentityRow,
} from './workspaceIdentity'

export type WorkspaceIdentityState = {
  loading: boolean
  error: string | null
  row: WorkspaceIdentityRow | null
  planTier: 'free' | 'subscriber'
  daysSinceActivity: number | null
  retentionHint: string | null
  refresh: () => Promise<void>
  rename: (name: string) => Promise<{ ok: true } | { ok: false; message: string }>
}

export function useWorkspaceIdentity(): WorkspaceIdentityState {
  const { supabase, user, tenantId, workspaceShellReady } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [row, setRow] = useState<WorkspaceIdentityRow | null>(null)
  const [planTier, setPlanTier] = useState<'free' | 'subscriber'>('free')
  const [idleHintInput, setIdleHintInput] = useState<{
    tier: 'free' | 'subscriber'
    idleBeforeTouch: number | null
  } | null>(null)

  const canLoad = Boolean(supabase && user && workspaceShellReady && isWorkspaceTenantId(tenantId))

  const loadMeta = useCallback(async () => {
    if (!supabase || !user || !isWorkspaceTenantId(tenantId)) {
      setRow(null)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const tier = await fetchProfilePlanTier(supabase, user.id)
      setPlanTier(tier)
      const before = await fetchWorkspaceIdentity(supabase, tenantId)
      const idleBeforeTouch = daysBetween(before?.last_active_at ?? null)
      await touchWorkspaceActivity(supabase)
      const after = await fetchWorkspaceIdentity(supabase, tenantId)
      setRow(after)
      setIdleHintInput({ tier, idleBeforeTouch })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load workspace.')
      setRow(null)
      setIdleHintInput(null)
    } finally {
      setLoading(false)
    }
  }, [supabase, tenantId, user])

  useEffect(() => {
    if (!canLoad) {
      setLoading(false)
      setRow(null)
      setError(null)
      setIdleHintInput(null)
      return
    }
    if (!supabase) {
      setLoading(false)
      return
    }
    void loadMeta()
  }, [canLoad, supabase, loadMeta])

  const daysSinceActivity = useMemo(
    () => idleHintInput?.idleBeforeTouch ?? null,
    [idleHintInput?.idleBeforeTouch],
  )

  const retentionHint = useMemo(() => {
    const tier = idleHintInput?.tier ?? planTier
    const idle = idleHintInput?.idleBeforeTouch
    if (tier === 'subscriber') return null
    if (idle == null) return null
    if (idle > 7) {
      return `You have been away for ${idle} days. Your workspace is still here — sign in regularly to keep your free space active.`
    }
    if (idle >= 5) {
      return 'Tip: free workspaces stay active when you visit at least every 7 days.'
    }
    return null
  }, [idleHintInput, planTier])

  const refresh = useCallback(async () => {
    await loadMeta()
  }, [loadMeta])

  const rename = useCallback(
    async (name: string) => {
      if (!supabase || !isWorkspaceTenantId(tenantId)) {
        return { ok: false as const, message: 'Workspace not ready.' }
      }
      const out = await updateWorkspaceName(supabase, tenantId, name)
      if (out.ok) await loadMeta()
      return out
    },
    [loadMeta, supabase, tenantId],
  )

  return {
    loading,
    error,
    row,
    planTier,
    daysSinceActivity,
    retentionHint,
    refresh,
    rename,
  }
}
