/**
 * Public maintenance / coming-soon mode (Vite build-time flag).
 * When enabled, anonymous visitors are steered away from marketing and course surfaces;
 * auth, legal, and (optionally) a secret bypass remain available.
 *
 * Rules:
 * - **Local dev** (`import.meta.env.DEV`): maintenance is **off** by default so `localhost` shows the full
 *   public app. Set `VITE_MAINTENANCE_MODE=true` to test the maintenance shell locally.
 * - **Production build** (`import.meta.env.PROD`): maintenance is **on** by default so production stays gated.
 *   Set `VITE_MAINTENANCE_MODE=false` at build time when you intentionally ship a public-open bundle.
 * - Only the strings `true` / `false` are honored (avoids accidental `"1"` truthiness).
 *
 * Why `VITE_*` on Vercel:
 * - Vite replaces `import.meta.env.VITE_*` at **build** time. Changing env in the dashboard does not
 *   change already-built static assets until a **new** deploy runs `vite build`.
 */

const SESSION_BYPASS_KEY = 'jf_maintenance_preview_v1'
/** Query param name for optional internal preview bypass (must match `VITE_MAINTENANCE_BYPASS_TOKEN`). */
export const MAINTENANCE_BYPASS_QUERY = 'jf_maintenance_bypass'

/** True when running the Vite dev server (`npm run dev`). */
export function isLocalDev(): boolean {
  return import.meta.env.DEV
}

type MaintenanceEnv = 'on' | 'off' | 'unset'

function maintenanceEnv(): MaintenanceEnv {
  const v = import.meta.env.VITE_MAINTENANCE_MODE
  if (v === 'true') return 'on'
  if (v === 'false') return 'off'
  return 'unset'
}

/**
 * Anonymous public maintenance shell should be shown (before bypass / auth exemptions).
 * - Dev + unset → false (full local app).
 * - Dev + `true` → true (opt-in local test).
 * - Prod + unset → true (production stays gated by default).
 * - Prod + `false` → false (explicit public-open build).
 */
export function isMaintenanceModeEnabled(): boolean {
  const e = maintenanceEnv()
  if (e === 'on') return true
  if (e === 'off') return false
  if (import.meta.env.DEV) return false
  return true
}

/** Alias for readability at call sites. */
export const shouldShowMaintenance = isMaintenanceModeEnabled

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
