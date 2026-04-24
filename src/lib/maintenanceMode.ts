/**
 * Public maintenance / coming-soon mode (Vite build-time flag).
 * When enabled, anonymous visitors are steered away from marketing and course surfaces;
 * auth, legal, and (optionally) a secret bypass remain available.
 *
 * Why `VITE_*` alone can look "broken" on Vercel:
 * - Vite replaces `import.meta.env.VITE_*` at **build** time. Changing env in the dashboard does not
 *   change already-built static assets until a **new** production deploy runs `vite build`.
 * - The value must be exactly the string `true` (not `1`, not `True`).
 * - Confirm the variable is enabled for the **Production** environment and that branch deploys use it.
 */

const SESSION_BYPASS_KEY = 'jf_maintenance_preview_v1'
/** Query param name for optional internal preview bypass (must match `VITE_MAINTENANCE_BYPASS_TOKEN`). */
export const MAINTENANCE_BYPASS_QUERY = 'jf_maintenance_bypass'

/**
 * TODO: Restore env-controlled maintenance after rebuild by using VITE_MAINTENANCE_MODE only.
 * Set to `false` after the learning experience ships and you want toggling via hosting env only
 * (remember: still requires a fresh build for Vite to pick up changes).
 */
const FORCE_PUBLIC_MAINTENANCE_UI = true

/** Strict: only the string "true" enables maintenance via env (avoids accidental truthy env). */
function isMaintenanceEnvVarEnabled(): boolean {
  return import.meta.env.VITE_MAINTENANCE_MODE === 'true'
}

/** True when the public anonymous experience should use the maintenance shell (code force OR env). */
export function isMaintenanceModeEnabled(): boolean {
  return FORCE_PUBLIC_MAINTENANCE_UI || isMaintenanceEnvVarEnabled()
}

function normalizePathname(pathname: string): string {
  if (!pathname) return '/'
  const trimmed = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
  return trimmed || '/'
}

/**
 * Paths anonymous users may still open while maintenance mode is on
 * (auth recovery, legal, trust).
 */
export function isMaintenanceExemptAnonymousPath(pathname: string): boolean {
  const p = normalizePathname(pathname)
  if (
    p === '/auth/sign-in' ||
    p === '/auth/sign-up' ||
    p === '/forgot-password' ||
    p === '/reset-password' ||
    p === '/terms' ||
    p === '/privacy' ||
    p === '/disclaimer' ||
    p === '/refunds'
  ) {
    return true
  }
  return false
}

function configuredBypassToken(): string | undefined {
  const t = import.meta.env.VITE_MAINTENANCE_BYPASS_TOKEN?.trim()
  return t || undefined
}

/** True when this browser session was unlocked via a matching bypass query param (internal builds only). */
export function hasMaintenancePreviewBypass(): boolean {
  if (typeof sessionStorage === 'undefined') return false
  const token = configuredBypassToken()
  if (!token) return false
  return sessionStorage.getItem(SESSION_BYPASS_KEY) === token
}

/**
 * If the URL contains `?jf_maintenance_bypass=<token>` matching `VITE_MAINTENANCE_BYPASS_TOKEN`,
 * persist bypass for the tab session. Caller should strip the query from the URL after success.
 * No-op when bypass token is unset (production public builds).
 */
export function readMaintenanceBypassFromSearch(search: string): boolean {
  if (!isMaintenanceModeEnabled()) return false
  const token = configuredBypassToken()
  if (!token || typeof sessionStorage === 'undefined') return false
  const q = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  if (q.get(MAINTENANCE_BYPASS_QUERY) !== token) return false
  sessionStorage.setItem(SESSION_BYPASS_KEY, token)
  return true
}
