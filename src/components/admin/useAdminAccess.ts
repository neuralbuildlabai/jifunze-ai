import { useMemo } from 'react'
import { useAppAccess } from '../../access/useAppAccess'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { isAdminTier, isPlatformAdmin, isSuperAdmin } from '../../lib/admin/adminAccess'

/**
 * Dedicated admin RBAC hook. Server-side source of truth remains `public.my_effective_access_tier`
 * and RPC guards; this mirrors tier for UI routing only.
 */
export function useAdminAccess() {
  const { tier, tierLoading, email, refreshAccessTier } = useAppAccess()

  /**
   * Playwright-only: `VITE_PLAYWRIGHT_BUILD` is set only in the access-forced production bundle
   * (`npm run test:e2e:access-forced`). It must never be set on real production deploys, so this
   * cannot accidentally grant /admin without Supabase + real admin tier.
   */
  const playwrightAdminShellBypass =
    import.meta.env.VITE_PLAYWRIGHT_BUILD === 'true' && !isSupabaseConfigured()

  const canAccessAdmin = useMemo(
    () => playwrightAdminShellBypass || isAdminTier(tier),
    [playwrightAdminShellBypass, tier],
  )

  return {
    tier,
    tierLoading,
    email,
    refreshAccessTier,
    canAccessAdmin,
    isSuperAdmin: isSuperAdmin(tier),
    isPlatformAdmin: isPlatformAdmin(tier),
    isAdmin: isAdminTier(tier),
    playwrightAdminShellBypass,
  }
}
