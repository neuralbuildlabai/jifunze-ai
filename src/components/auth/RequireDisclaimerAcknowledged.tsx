import { Outlet } from 'react-router-dom'
/**
 * Wraps the **signed-in workspace** route tree. Public marketing pages are outside this gate so
 * the disclaimer is not repeated on every guest view—acknowledgment is requested when users enter
 * the product surface (see disclaimer modal on first visit).
 */
import { useDisclaimerAcknowledgment } from '../../auth/useDisclaimerAcknowledgment'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { DisclaimerAcknowledgmentModal } from './DisclaimerAcknowledgmentModal'

/**
 * After verified email + Supabase session: require disclaimer acknowledgment before workspace/app routes.
 * Demo / no Supabase: passes through (same pattern as {@link RequireEmailVerified}).
 */
export function RequireDisclaimerAcknowledged() {
  const { user, loading } = useAuth()
  const { mustAcknowledge, acknowledge } = useDisclaimerAcknowledgment()

  if (!isSupabaseConfigured()) {
    return <Outlet />
  }

  if (loading && !user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
        <p className="text-sm text-zinc-400">Loading session…</p>
      </div>
    )
  }

  if (!user) {
    return <Outlet />
  }

  if (mustAcknowledge) {
    return <DisclaimerAcknowledgmentModal onAcknowledge={acknowledge} />
  }

  return <Outlet />
}
