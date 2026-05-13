import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { useAdminAccess } from './useAdminAccess'

/**
 * Guards /admin/* — platform_admin + super_admin only.
 * Without Supabase (local demo), admin is blocked unless the Playwright-tagged no-Supabase bundle is active.
 */
export function RequireAdminAccess({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const { canAccessAdmin, tierLoading, playwrightAdminShellBypass } = useAdminAccess()
  const location = useLocation()

  if (!isSupabaseConfigured() && !playwrightAdminShellBypass) {
    return <Navigate to="/dashboard" replace />
  }

  if (!playwrightAdminShellBypass && (loading || tierLoading)) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 px-4 py-16 text-zinc-700">
        <p className="text-sm text-zinc-500">Checking admin access…</p>
      </div>
    )
  }

  if (playwrightAdminShellBypass) {
    return <>{children}</>
  }

  if (!user) {
    const returnUrl = encodeURIComponent(`${location.pathname}${location.search}`)
    return <Navigate to={`${LEGAL_ROUTES.authSignIn}?returnUrl=${returnUrl}`} replace />
  }

  if (!canAccessAdmin) {
    return <Navigate to="/my-learning" replace />
  }

  return <>{children}</>
}
