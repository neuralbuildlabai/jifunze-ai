import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import {
  MAINTENANCE_BYPASS_QUERY,
  hasMaintenancePreviewBypass,
  isMaintenanceExemptAnonymousPath,
  isMaintenanceModeEnabled,
  readMaintenanceBypassFromSearch,
} from '../../lib/maintenanceMode'
import { PublicMaintenancePage } from './PublicMaintenancePage'

function AuthResolvingPlaceholder() {
  return (
    <div className="jf-public-surface flex min-h-screen w-full items-center justify-center bg-[var(--jf-bg-page)] text-[color:var(--jf-muted)]">
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-9 w-9 rounded-full border-2 border-white/[0.08] border-t-[color:var(--jf-brand)] animate-spin"
          aria-hidden
        />
        <p className="text-[13px] font-medium tracking-tight">Loading…</p>
      </div>
    </div>
  )
}

/**
 * When maintenance mode is enabled (env and/or `FORCE_PUBLIC_MAINTENANCE_UI` in
 * `src/lib/maintenanceMode.ts`), anonymous users on non-exempt paths see the public
 * maintenance page; signed-in users and optional preview bypass keep normal routing.
 */
export function MaintenancePublicGate() {
  const { user, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isMaintenanceModeEnabled()) return
    if (!location.search) return
    const applied = readMaintenanceBypassFromSearch(location.search)
    if (!applied) return
    const nextParams = new URLSearchParams(location.search)
    nextParams.delete(MAINTENANCE_BYPASS_QUERY)
    const qs = nextParams.toString()
    navigate(`${location.pathname}${qs ? `?${qs}` : ''}`, { replace: true })
  }, [location.pathname, location.search, navigate])

  if (!isMaintenanceModeEnabled()) {
    return <Outlet />
  }

  const bypass = hasMaintenancePreviewBypass()
  const exempt = isMaintenanceExemptAnonymousPath(location.pathname)

  if (user || exempt || bypass) {
    return <Outlet />
  }

  if (loading) {
    return <AuthResolvingPlaceholder />
  }

  return <PublicMaintenancePage />
}
