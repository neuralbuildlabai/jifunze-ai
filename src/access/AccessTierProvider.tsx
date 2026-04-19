import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { isWorkspaceTenantId } from '../persistence/tenantPersistenceMode'
import type { AccessTier } from './appAccess'
import { resolveAccessTier } from './appAccess'
import type { AccessTierContextValue } from './accessTierContext'
import { AccessTierContext } from './accessTierContext'
import { fetchMyEffectiveAccessTier } from './fetchMyEffectiveAccessTier'

function envEmailFallbackEnabled(): boolean {
  if (import.meta.env.VITE_ACCESS_TIER_EMAIL_FALLBACK === 'true') return true
  if (import.meta.env.VITE_ACCESS_TIER_EMAIL_FALLBACK === 'false') return false
  return import.meta.env.DEV === true
}

export function AccessTierProvider({ children }: { children: ReactNode }) {
  const {
    user,
    supabase,
    tenantId,
    workspaceShellReady,
    usesWorkspacePersistence,
    emailVerified,
  } = useAuth()
  const email = user?.email ?? null

  const [tier, setTier] = useState<AccessTier>('member')
  const [tierLoading, setTierLoading] = useState(false)
  const requestId = useRef(0)

  const rpcTenantId = useMemo(() => {
    if (usesWorkspacePersistence && isWorkspaceTenantId(tenantId)) return tenantId
    return null
  }, [tenantId, usesWorkspacePersistence])

  const applyFallbackTier = useCallback(() => {
    if (!envEmailFallbackEnabled()) {
      setTier('member')
      return
    }
    setTier(resolveAccessTier(email))
  }, [email])

  const refreshAccessTier = useCallback(async () => {
    const rid = ++requestId.current
    if (!user || !supabase || !isSupabaseConfigured()) {
      applyFallbackTier()
      setTierLoading(false)
      return
    }
    if (!emailVerified) {
      applyFallbackTier()
      setTierLoading(false)
      return
    }
    if (!workspaceShellReady) {
      setTierLoading(true)
      return
    }

    setTierLoading(true)
    const { tier: next, error } = await fetchMyEffectiveAccessTier(supabase, rpcTenantId)
    if (rid !== requestId.current) return

    if (error || !next) {
      applyFallbackTier()
    } else {
      setTier(next)
    }
    setTierLoading(false)
  }, [user, supabase, emailVerified, workspaceShellReady, rpcTenantId, applyFallbackTier])

  useEffect(() => {
    startTransition(() => {
      void refreshAccessTier()
    })
  }, [refreshAccessTier])

  const value = useMemo<AccessTierContextValue>(
    () => ({ tier, tierLoading, refreshAccessTier }),
    [tier, tierLoading, refreshAccessTier],
  )

  return <AccessTierContext.Provider value={value}>{children}</AccessTierContext.Provider>
}
