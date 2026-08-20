/**
 * Public maintenance / coming-soon mode (Vite build-time flag).
 *
 * PRESENTATION ONLY. This module decides whether anonymous visitors see the public maintenance
 * shell instead of marketing and course surfaces. It is **not** an authorization boundary and it
 * must never be used as one:
 * - Protected routes are gated by `RequireEmailVerified` / `RequireDisclaimerAcknowledged` /
 *   `RequireAdminAccess` / `RequireSocialOpsAccess`, and ultimately by Supabase RLS on the server.
 * - Nothing in this file grants access to data. Turning maintenance off only changes which shell
 *   an anonymous visitor renders.
 *
 * SECURITY NOTE (2026-08-20): a `VITE_MAINTENANCE_BYPASS_TOKEN` query-param bypass used to live
 * here. Vite inlines `VITE_*` values into the browser bundle at build time, so that token was
 * publicly readable by anyone who downloaded the JS. It has been removed entirely — see
 * `docs/social/SECURITY_AND_CHANGE_PROVENANCE_REVIEW_2026-08-20.md`. Do not reintroduce a
 * client-side bypass secret. If an internal preview of a gated build is ever needed, sign in:
 * authenticated users already bypass the maintenance shell, and their tier is checked server-side.
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
 * Anonymous public maintenance shell should be shown (before auth exemptions).
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
