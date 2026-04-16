/**
 * Classify errors from Learning Lab / trend preview persistence so UI copy stays consistent.
 */

/** Use for early guards (null client) so copy matches {@link userFacingLearningError} classification. */
export const USER_MSG_SUPABASE_NOT_READY =
  'Supabase is not ready for this workspace. Configure the project keys, sign in, and wait for the session to finish loading.'

function asRecord(e: unknown): Record<string, unknown> | null {
  if (e != null && typeof e === 'object') return e as Record<string, unknown>
  return null
}

function rawMessage(e: unknown): string {
  if (typeof AggregateError !== 'undefined' && e instanceof AggregateError && Array.isArray(e.errors)) {
    const parts = e.errors.map((x) => (x instanceof Error ? x.message : String(x))).filter(Boolean)
    if (parts.length) return parts.join('; ')
  }
  if (e instanceof Error) return e.message
  const o = asRecord(e)
  if (o && typeof o.message === 'string') return o.message
  if (typeof e === 'string') return e
  try {
    return JSON.stringify(e)
  } catch (inner) {
    console.error('[Learning Lab / Trend] rawMessage JSON.stringify', inner)
    return ''
  }
}

function httpStatus(e: unknown): number | undefined {
  const o = asRecord(e)
  if (!o) return undefined
  if (typeof o.status === 'number') return o.status
  if (typeof o.statusCode === 'number') return o.statusCode
  const cause = o.cause
  if (cause != null && typeof cause === 'object') {
    const c = cause as Record<string, unknown>
    if (typeof c.status === 'number') return c.status
    if (typeof c.statusCode === 'number') return c.statusCode
  }
  return undefined
}

function isSupabaseNotReadyError(e: unknown): boolean {
  const msg = rawMessage(e)
  return (
    /getPersistence:\s*workspace tenant UUID requires Supabase/i.test(msg) ||
    /Workspace UUID requires Supabase/i.test(msg) ||
    /Configure VITE_SUPABASE_URL/i.test(msg) ||
    /Demo\/browser persistence cannot be used for workspace IDs/i.test(msg) ||
    /Supabase is not ready/i.test(msg)
  )
}

function isNetworkError(e: unknown): boolean {
  const msg = rawMessage(e)
  if (e instanceof TypeError && /fetch|load failed|network/i.test(msg)) return true
  if (
    /failed to fetch|networkerror|load failed|ecconnrefused|econnreset|etimedout|socket hang up|aborted|timed out|offline/i.test(
      msg,
    )
  )
    return true
  return false
}

/** RLS, grants, JWT/session problems surfaced as 401/403 or Postgres/PostgREST messages. */
function isPermissionOrAccessError(e: unknown): boolean {
  const status = httpStatus(e)
  if (status === 401 || status === 403) return true
  const msg = rawMessage(e)
  if (
    /\b401\b|\b403\b|forbidden|permission denied|row level security|\bRLS\b|violates row-level security|new row violates/i.test(
      msg,
    )
  )
    return true
  if (/JWT expired|invalid JWT|jwt|not authenticated|unauthorized/i.test(msg)) return true
  const o = asRecord(e)
  const code = o && typeof o.code === 'string' ? o.code : ''
  if (code === '42501' || code === 'PGRST301' || code === 'PGRST302') return true
  return false
}

function isNoTenantMembershipError(e: unknown): boolean {
  const msg = rawMessage(e)
  return /no tenant membership found|tenant mismatch|default workspace is not in your allowed tenant memberships/i.test(
    msg,
  )
}

function isLearningSnapshotsRlsError(e: unknown): boolean {
  const msg = rawMessage(e)
  return /learning_snapshots/i.test(msg) && /row-level security|new row violates|permission denied|403|42501/i.test(msg)
}

function clipDetail(s: string, maxLen: number): string {
  const t = s.trim().replace(/\s+/g, ' ')
  if (!t) return ''
  return t.length > maxLen ? `${t.slice(0, maxLen - 1)}…` : t
}

/** Appends a short server message when it adds signal and is not redundant with `summary`. */
function withOptionalDetail(summary: string, error: unknown, maxLen = 220): string {
  const d = clipDetail(rawMessage(error), maxLen)
  if (!d) return summary
  const sum = summary.toLowerCase()
  const det = d.toLowerCase()
  if (sum.includes(det.slice(0, Math.min(48, det.length)))) return summary
  if (det.includes(sum.slice(0, 48))) return summary
  return `${summary} (${d})`
}

/**
 * Logs the raw error for debugging, then returns a short user-facing string.
 */
export function logLearningUiError(scope: string, error: unknown): void {
  console.error(`[Learning Lab / Trend] ${scope}`, error)
}

/** 401/403/RLS/JWT-style errors common during logout or session revocation races. */
export function isLikelyStaleAuthNoise(error: unknown): boolean {
  return isPermissionOrAccessError(error) || isLearningSnapshotsRlsError(error)
}

/**
 * Suppresses console noise when a fetch was already obsolete (e.g. post sign-out) but the error is
 * only an auth/RLS symptom, not an actionable app failure.
 */
export function logLearningUiErrorUnlessStaleSession(
  scope: string,
  error: unknown,
  staleSessionHint: boolean,
): void {
  if (staleSessionHint && isLikelyStaleAuthNoise(error)) return
  logLearningUiError(scope, error)
}

const MSG_NETWORK =
  'Network issue: check your connection and try again. If the problem continues, confirm you are online and that the API is reachable.'

const MSG_PERMISSION =
  'Permission issue: access was denied (session or database policy). Sign in again or confirm you belong to this workspace; admins may need to adjust RLS or grants.'
const MSG_NO_TENANT_MEMBERSHIP =
  'No workspace membership found for this account. Sign out and sign back in once; if this persists, ask an admin to repair tenant membership.'
const MSG_TENANT_MISMATCH =
  'Workspace tenant mismatch: your selected/default workspace is not in your allowed memberships. Switch workspace or ask an admin to repair your profile default tenant.'
const MSG_LEARNING_SNAPSHOTS_RLS =
  'Learning snapshot write was denied by workspace security policy. This usually means your account is missing membership for the active tenant.'

/**
 * Maps thrown values to stable copy: Supabase bootstrap, permission/network buckets, or original message.
 * For classified buckets, appends a clipped raw message when it is safe and not redundant.
 */
export function userFacingLearningError(error: unknown, fallback: string): string {
  const raw = rawMessage(error)
  if (isNoTenantMembershipError(error)) {
    return withOptionalDetail(MSG_NO_TENANT_MEMBERSHIP, error)
  }
  if (/tenant mismatch/i.test(raw)) {
    return withOptionalDetail(MSG_TENANT_MISMATCH, error)
  }
  if (isLearningSnapshotsRlsError(error)) {
    return withOptionalDetail(MSG_LEARNING_SNAPSHOTS_RLS, error)
  }
  if (isSupabaseNotReadyError(error)) {
    return withOptionalDetail(USER_MSG_SUPABASE_NOT_READY, error)
  }
  if (isNetworkError(error)) {
    return withOptionalDetail(MSG_NETWORK, error)
  }
  if (isPermissionOrAccessError(error)) {
    return withOptionalDetail(MSG_PERMISSION, error)
  }
  const msg = raw.trim()
  if (msg) return msg
  return fallback
}
