import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { EmailVerificationGate } from './EmailVerificationGate'

/**
 * Layout route for production Supabase sessions:
 * - Demo / no Supabase env: allow guest routes (local demo persistence + E2E).
 * - Supabase on: require a session, confirmed email, then child routes.
 */
export function RequireEmailVerified() {
  const { user, emailVerified, loading } = useAuth()
  const location = useLocation()

  if (!isSupabaseConfigured()) {
    return <Outlet />
  }

  if (!user && loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
        <p className="text-sm text-zinc-400">Loading session…</p>
      </div>
    )
  }

  if (!user) {
    const returnUrl = encodeURIComponent(`${location.pathname}${location.search}`)
    return <Navigate to={`${LEGAL_ROUTES.authSignIn}?returnUrl=${returnUrl}`} replace />
  }

  if (!emailVerified) {
    return <EmailVerificationGate />
  }

  return <Outlet />
}
