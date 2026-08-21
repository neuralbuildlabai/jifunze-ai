import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import {
  isMaintenanceExemptAnonymousPath,
  isMaintenanceModeEnabled,
} from '../../lib/maintenanceMode'
import { PublicMaintenancePage } from './PublicMaintenancePage'

function AuthResolvingPlaceholder() {
  return (
    <div className="jf-media flex min-h-screen w-full items-center justify-center bg-[#0B0B12] text-zinc-400">
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-9 w-9 rounded-full border-2 border-orange-200/70 border-t-orange-500 animate-spin"
          aria-hidden
        />
        <p className="text-[13px] font-medium tracking-tight">Loading…</p>
      </div>
    </div>
  )
}

/**
 * PRESENTATION GATE ONLY.
 *
 * When maintenance mode is enabled (`src/lib/maintenanceMode.ts`), anonymous users on non-exempt
 * paths see the public maintenance page. Signed-in users keep normal routing — and every protected
 * route below still enforces its own authorization (`RequireEmailVerified`,
 * `RequireDisclaimerAcknowledged`, `RequireAdminAccess`, `RequireSocialOpsAccess`) plus Supabase RLS
 * on the server. Rendering `<Outlet />` here grants no data access by itself.
 *
 * There is deliberately NO client-side bypass token. A `VITE_*` value is compiled into the public
 * browser bundle, so it can never be a secret. Removed 2026-08-20 — do not reintroduce.
 */
export function MaintenancePublicGate() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (!isMaintenanceModeEnabled()) {
    return <Outlet />
  }

  const exempt = isMaintenanceExemptAnonymousPath(location.pathname)

  if (user || exempt) {
    return <Outlet />
  }

  if (loading) {
    return <AuthResolvingPlaceholder />
  }

  return <PublicMaintenancePage />
}
