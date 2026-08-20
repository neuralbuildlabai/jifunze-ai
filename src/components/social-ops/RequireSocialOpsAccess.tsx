import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useAppAccess } from '../../access/useAppAccess'
import { isAdminTier } from '../../lib/admin/adminAccess'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { LEGAL_ROUTES } from '../../training/trustCopy'

/**
 * Authorization boundary for `/admin/social-ops`.
 *
 * ISOLATION: this is deliberately NOT `RequireAdminAccess` and the routes it guards are NOT
 * mounted inside `AdminShell`. `/admin`, `/learn`, billing and training are frozen at
 * `learning-platform-frozen-2026-08-18`; social-ops shares only the read-only tier helpers
 * (`useAppAccess`, `isAdminTier`) and changes nothing in the frozen tree. Removing the social-ops
 * routes from `App.tsx` restores the frozen behaviour exactly.
 *
 * There is no Playwright bypass here. The frozen admin shell has one for its no-Supabase bundle;
 * social-ops does not, because a bypass on an operations console is a bigger risk than a gap in
 * end-to-end coverage.
 *
 * This is UI routing only. The real boundary is server-side: RLS gates every social-ops table on
 * `public.is_admin()`, and the `social-ops-admin` Edge Function re-checks the caller's tier before
 * doing anything.
 */
export function RequireSocialOpsAccess({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const { tier, tierLoading } = useAppAccess()
  const location = useLocation()

  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#0B0B12] px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-lg font-semibold text-white">Social ops is unavailable</h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            This build has no Supabase configuration, so there is no way to check who you are or to
            read operational data. The console stays closed rather than showing a placeholder.
          </p>
        </div>
      </div>
    )
  }

  if (loading || tierLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#0B0B12] px-6">
        <p className="text-sm text-zinc-400">Checking access…</p>
      </div>
    )
  }

  if (!user) {
    const returnUrl = encodeURIComponent(`${location.pathname}${location.search}`)
    return <Navigate to={`${LEGAL_ROUTES.authSignIn}?returnUrl=${returnUrl}`} replace />
  }

  if (!isAdminTier(tier)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
