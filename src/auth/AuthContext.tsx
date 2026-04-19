import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import { demoBrands } from '../config/demoBrands'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { getSupabaseBrowserClient } from '../lib/supabaseClient'
import {
  clearAllPersistenceAfterSignOut,
  clearSupabasePersistenceCache,
  LOCAL_DEV_TENANT_ID,
} from '../persistence/registry'
import { isDemoPersistenceTenantId, isWorkspaceTenantId } from '../persistence/tenantPersistenceMode'
import type { BrandProfile } from '../types/brand'
import { authFailureMessage } from './authErrorMessage'
import { loadBrandsForTenant } from './bootstrapTenant'
import { registerAuthWriteGuards, safeSupabaseWrite } from '../lib/safeSupabaseWrite'
import { jifunzeCriticalLog } from '../lib/jifunzeTelemetry'
import { pickDefaultWorkspaceName } from '../workspace/workspaceIdentity'

export type AuthContextValue = {
  supabase: SupabaseClient | null
  user: User | null
  /** True when `user.email_confirmed_at` is set (required for workspace bootstrap and protected app areas). */
  emailVerified: boolean
  session: Session | null
  tenantId: string
  /** True when signed in with Supabase and `tenantId` is a workspace UUID — Postgres persistence only. */
  usesWorkspacePersistence: boolean
  /**
   * True when **not** using Postgres workspace persistence: Supabase env missing, or signed in
   * without a workspace UUID tenant (local/demo persistence layer).
   */
  usesDemoPersistence: boolean
  brands: BrandProfile[]
  loading: boolean
  /** Last auth or workspace error (Supabase `AuthError.message` when available). */
  error: string | null
  /** Non-error notice, e.g. after sign-up when email confirmation is required. */
  authInfo: string | null
  /**
   * True after `profiles.default_tenant_id` validated as a workspace UUID and applied to
   * `tenantId` (before or after brands load).
   */
  workspaceTenantResolved: boolean
  /**
   * True after workspace bootstrap has completed successfully at least once for the current
   * signed-in session. Used to avoid full-screen blocking loaders on background bootstraps/refreshes.
   */
  workspaceShellReady: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  /** True while a `signOut()` call is in progress (disable duplicate sign-out triggers). */
  signOutPending: boolean
  /** Reloads profile + brands for the signed-in user; returns brand count when workspace bootstrap finished, else `undefined`. */
  refreshBrands: () => Promise<number | undefined>
  /**
   * Reloads `public.brands` for the current `tenantId` only (no workspace RPC). Use after local
   * inserts when `refreshBrands()` may return `undefined` while coalescing with an in-flight bootstrap.
   */
  reloadBrandsOnly: () => Promise<number | undefined>
  /**
   * Re-runs workspace bootstrap after a failure/timeout. Bypasses automatic auth-listener suppression.
   */
  retryWorkspaceBootstrap: () => Promise<number | undefined>
  /** Clears `error` and `authInfo` (e.g. when switching sign-in / sign-up in the form). */
  clearAuthMessages: () => void
  /** Resend signup confirmation email (requires `user.email`). */
  resendConfirmationEmail: () => Promise<void>
  /** Request password reset email (`redirectTo` points at `/reset-password`). */
  requestPasswordReset: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

/** Lane B (`manual_retry`): `bootstrap_my_workspace` repair only — short wall-clock cap. */
const WORKSPACE_REPAIR_TIMEOUT_MS = 20_000

/**
 * Always pass a non-null `workspace_name` so PostgREST targets `bootstrap_my_workspace(text)` predictably.
 * New workspaces get a friendly default label (stable per user id for repair retries).
 */
function bootstrapMyWorkspaceRpcArgs(uid: string) {
  return { workspace_name: pickDefaultWorkspaceName(uid) }
}

async function loadTenantIdsFromMembershipTable(
  supabase: SupabaseClient,
  uid: string,
): Promise<string[]> {
  const { tenantIds } = await loadTenantMembersWithMeta(supabase, uid)
  return tenantIds
}

/** Same as `loadTenantIdsFromMembershipTable` but preserves query errors for restore-path classification. */
async function loadTenantMembersWithMeta(
  supabase: SupabaseClient,
  uid: string,
): Promise<{ tenantIds: string[]; error: { message: string; code?: string } | null }> {
  const { tenantIds, error } = await queryTenantMembersRaw(supabase, uid)
  if (error) {
    console.error('[JifunzeAI workspace]', {
      tenant_members_requery_error: {
        userId: uid,
        message: error.message,
        code: error.code ?? null,
      },
    })
  } else {
    console.log('[JifunzeAI workspace]', {
      tenant_members_requery: { userId: uid, count: tenantIds.length, tenantIds },
    })
  }
  return { tenantIds, error }
}

/** Raw `tenant_members` read with `{ count: 'exact' }` for isolation (RLS vs truly empty). */
async function queryTenantMembersRaw(
  supabase: SupabaseClient,
  uid: string,
): Promise<{
  tenantIds: string[]
  error: { message: string; code?: string; details?: string; hint?: string } | null
  raw: {
    data: unknown
    count: number | null
    postgrestError: Record<string, unknown> | null
    dataRowLength: number
  }
}> {
  const { data: memberRows, error: memberErr, count } = await supabase
    .from('tenant_members')
    .select('tenant_id', { count: 'exact' })
    .eq('user_id', uid)

  const postgrestError = serializePostgrestError(memberErr)
  const dataRowLength = Array.isArray(memberRows) ? memberRows.length : 0
  if (memberErr) {
    return {
      tenantIds: [],
      error: memberErr,
      raw: { data: memberRows, count: count ?? null, postgrestError, dataRowLength },
    }
  }
  const out = new Set<string>()
  for (const row of memberRows ?? []) {
    const rec = row as { tenant_id?: unknown }
    const tid = normalizeUuidLike(rec.tenant_id)
    if (tid) out.add(tid)
  }
  const tenantIds = [...out]
  return {
    tenantIds,
    error: null,
    raw: { data: memberRows, count: count ?? null, postgrestError, dataRowLength },
  }
}

function serializePostgrestError(err: unknown): Record<string, unknown> | null {
  if (err == null) return null
  if (typeof err !== 'object') return { value: String(err) }
  const e = err as Record<string, unknown>
  return {
    message: e.message,
    name: e.name,
    code: e.code,
    details: e.details,
    hint: e.hint,
  }
}

/**
 * Hard isolation logs for reload restore debugging. Filter DevTools by `[JifunzeAI session_restore_isolation]`.
 */
function sessionRestoreIsolationLog(payload: Record<string, unknown>) {
  console.log('[JifunzeAI session_restore_isolation]', { ts: Date.now(), ...payload })
}

type SessionRestoreDecision =
  | 'profile_missing'
  | 'membership_missing'
  | 'not_ready'
  | 'read_error'
  | 'lightweight_restore'
  | 'escalate_rpc'

function logSessionRestoreDecision(
  decision: SessionRestoreDecision,
  detail: Record<string, unknown> = {},
) {
  sessionRestoreIsolationLog({ session_restore_decision: decision, ...detail })
}

function classifyProfileMaybeSingle(data: unknown, err: unknown): {
  label: string
  likelyRlsOrInvisible: boolean
} {
  if (err != null && typeof err === 'object') {
    const code = String((err as { code?: unknown }).code ?? '')
    if (code === 'PGRST116') {
      return { label: 'zero_rows_maybeSingle', likelyRlsOrInvisible: true }
    }
    if (code === '42501') {
      return { label: 'permission_denied', likelyRlsOrInvisible: true }
    }
    return { label: 'postgrest_error', likelyRlsOrInvisible: false }
  }
  if (data == null) {
    return { label: 'null_data_no_error', likelyRlsOrInvisible: true }
  }
  return { label: 'row_present', likelyRlsOrInvisible: false }
}

function classifyMembershipRows(
  dataLen: number,
  exactCount: number | null,
  err: unknown,
): { label: string; likelyRlsOrEmpty: boolean } {
  if (err != null) {
    return { label: 'postgrest_error', likelyRlsOrEmpty: false }
  }
  if (dataLen === 0 && (exactCount === 0 || exactCount === null)) {
    return { label: 'empty_no_error', likelyRlsOrEmpty: true }
  }
  if (dataLen === 0 && typeof exactCount === 'number' && exactCount > 0) {
    return { label: 'count_mismatch_data_hidden', likelyRlsOrEmpty: true }
  }
  return { label: 'rows_present', likelyRlsOrEmpty: false }
}

async function captureAuthContextForIsolation(
  supabase: SupabaseClient,
  expectedUid: string,
  label: string,
): Promise<Record<string, unknown>> {
  const { data: sessionData, error: sessionErr } = await supabase.auth.getSession()
  const s = sessionData.session
  const token = s?.access_token
  const ctx = {
    label,
    expectedUid,
    sessionUserId: s?.user?.id ?? null,
    userIdMatchesExpected: s?.user?.id === expectedUid,
    hasAccessToken: Boolean(token),
    accessTokenLength: token?.length ?? 0,
    accessTokenPrefix8: token ? String(token).slice(0, 8) : null,
    expiresAt: s?.expires_at ?? null,
    expiresInSec: s?.expires_in ?? null,
    getSessionError: sessionErr?.message ?? null,
  }
  sessionRestoreIsolationLog({ kind: 'auth_context', ...ctx })
  return ctx
}

async function readProfileForIsolation(
  supabase: SupabaseClient,
  uid: string,
  pass: number,
): Promise<{
  data: { default_tenant_id?: unknown } | null
  error: { message?: string; code?: string; details?: string; hint?: string } | null
}> {
  const { data, error } = await supabase
    .from('profiles')
    .select('default_tenant_id')
    .eq('id', uid)
    .maybeSingle()

  const cls = classifyProfileMaybeSingle(data, error)
  sessionRestoreIsolationLog({
    kind: 'profiles_query_result',
    pass,
    query: { table: 'profiles', select: 'default_tenant_id', filter: { id: uid } },
    postgrest: {
      status: error == null ? 'ok' : 'error',
      row: data ?? null,
      row_present: data != null,
      error: serializePostgrestError(error),
    },
    classification: cls.label,
    likely_rls_or_invisible: cls.likelyRlsOrInvisible,
    note:
      'PGRST116 = 0 rows for maybeSingle. null data + null error can mean 0 visible rows (RLS) depending on client.',
  })
  return { data, error: error ?? null }
}

type TenantMembersRawSnapshot = {
  data: unknown
  count: number | null
  postgrestError: Record<string, unknown> | null
  dataRowLength: number
}

async function readTenantMembersForIsolation(
  supabase: SupabaseClient,
  uid: string,
  pass: number,
): Promise<{
  tenantIds: string[]
  error: { message: string; code?: string } | null
  raw: TenantMembersRawSnapshot
}> {
  const { tenantIds, error, raw } = await queryTenantMembersRaw(supabase, uid)
  const cls = classifyMembershipRows(raw.dataRowLength, raw.count, error)
  sessionRestoreIsolationLog({
    kind: 'tenant_members_query_result',
    pass,
    query: { table: 'tenant_members', select: 'tenant_id', count: 'exact', filter: { user_id: uid } },
    postgrest: {
      status: error == null ? 'ok' : 'error',
      dataRowLength: raw.dataRowLength,
      exactCount: raw.count,
      error: serializePostgrestError(error),
      rawRowsPreview: raw.data,
    },
    normalizedTenantIdCount: tenantIds.length,
    normalizedTenantIds: tenantIds,
    classification: cls.label,
    likely_rls_or_empty: cls.likelyRlsOrEmpty,
  })
  return { tenantIds, error, raw }
}

type AuthTelemetryKey =
  | 'signIn_started'
  | 'signIn_completed'
  | 'signOut_started'
  /** Canonical terminal sign-out log (single per successful invocation chain). */
  | 'sign_out_result'
  | 'bootstrap_started'
  | 'bootstrap_completed'

function authLog(key: AuthTelemetryKey, detail?: Record<string, unknown>) {
  console.log('[JifunzeAI Auth]', detail != null ? { [key]: detail } : { [key]: true })
}

/** One-line checkpoints for manual browser verification (filter DevTools by `[JifunzeAI verify]`). */
function verifyLog(checkpoint: string, detail?: Record<string, unknown>) {
  console.log('[JifunzeAI verify]', detail != null ? { checkpoint, ...detail } : { checkpoint })
}

/** Temporary workspace bootstrap diagnostics (filter DevTools by `[JifunzeAI workspace_bootstrap_diag]`). */
function workspaceBootstrapDiag(detail: Record<string, unknown>) {
  console.log('[JifunzeAI workspace_bootstrap_diag]', { ts: Date.now(), ...detail })
}

function perfNow(): number {
  return typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? performance.now()
    : Date.now()
}

function extractDefaultTenantIdString(profileRow: { default_tenant_id?: unknown } | null): string {
  if (!profileRow) return ''
  const raw = profileRow.default_tenant_id
  if (typeof raw === 'string') return raw.trim()
  if (raw == null) return ''
  return String(raw).trim()
}

/**
 * `bootstrap_my_workspace` and `user_tenant_ids` use `auth.uid()`; PostgREST reads need the JWT on
 * the client. On reload, the first bootstrap tick can run before `getSession()` has a token, so
 * `profiles` / `tenant_members` look empty and we wrongly escalate to the heavy RPC.
 */
const AUTH_JWT_READY_MAX_MS = 5000

async function waitUntilAuthJwtReadyForUid(
  supabase: SupabaseClient,
  expectedUid: string,
  diag: Record<string, unknown>,
): Promise<void> {
  const t0 = perfNow()
  const deadline = t0 + AUTH_JWT_READY_MAX_MS
  let attempt = 0
  while (perfNow() < deadline) {
    attempt += 1
    const { data: sessData } = await supabase.auth.getSession()
    const s = sessData.session
    if (s?.access_token && s.user?.id === expectedUid) {
      const { data: userData, error: guErr } = await supabase.auth.getUser()
      if (!guErr && userData.user?.id === expectedUid) {
        diag.session_jwt_ready = true
        diag.session_jwt_ready_attempts = attempt
        diag.session_jwt_ready_wait_ms = Math.round(perfNow() - t0)
        return
      }
    }
    await new Promise<void>((r) => {
      setTimeout(r, Math.min(40 + attempt * 15, 180))
    })
  }
  diag.session_jwt_ready = false
  diag.session_jwt_ready_attempts = attempt
  diag.session_jwt_ready_wait_ms = Math.round(perfNow() - t0)
}

/** Bounded wait for PostgREST to attach JWT so RLS sees rows (reload race). Not the same as getSession() alone. */
const POSTGREST_READINESS_MAX_ATTEMPTS = 40
const POSTGREST_READINESS_GAP_MS = 100

type PostgrestReadinessResult = {
  profileProbeOk: boolean
  tenantProbeSawRows: boolean
  attemptsUsed: number
}

async function waitForAuthenticatedPostgrestReadiness(
  supabase: SupabaseClient,
  uid: string,
  pass: number,
  diag: Record<string, unknown>,
): Promise<PostgrestReadinessResult> {
  let profileProbeOk = false
  let tenantProbeSawRows = false

  for (let attempt = 1; attempt <= POSTGREST_READINESS_MAX_ATTEMPTS; attempt++) {
    await supabase.auth.getSession()
    if (attempt === 1 || attempt % 10 === 0) {
      await supabase.auth.refreshSession()
    }
    await waitUntilAuthJwtReadyForUid(supabase, uid, diag)
    diag.session_restore_auth_ready = diag.session_jwt_ready === true

    const { data: sessWrap } = await supabase.auth.getSession()
    const tokenOk =
      Boolean(sessWrap.session?.access_token) && sessWrap.session?.user?.id === uid

    const pr = await supabase.from('profiles').select('id').eq('id', uid).maybeSingle()
    sessionRestoreIsolationLog({
      kind: 'authenticated_postgrest_probe_profiles',
      pass,
      attempt,
      tokenOk,
      postgrest: {
        data: pr.data,
        error: serializePostgrestError(pr.error),
        status: pr.error == null ? 'ok' : 'error',
      },
    })

    const prCode =
      pr.error != null && typeof pr.error === 'object'
        ? String((pr.error as { code?: unknown }).code ?? '')
        : ''
    if (pr.error != null && prCode !== '' && prCode !== 'PGRST116') {
      diag.postgrest_readiness_profile_probe_terminal_error = serializePostgrestError(pr.error)
      diag.postgrest_readiness_exhausted = true
      break
    }
    if (pr.data != null) {
      profileProbeOk = true
    }

    const tr = await supabase
      .from('tenant_members')
      .select('tenant_id', { count: 'exact' })
      .eq('user_id', uid)
      .limit(5)
    const rowLen = Array.isArray(tr.data) ? tr.data.length : 0
    const cnt = tr.count
    sessionRestoreIsolationLog({
      kind: 'authenticated_postgrest_probe_tenant_members',
      pass,
      attempt,
      postgrest: {
        data: tr.data,
        error: serializePostgrestError(tr.error),
        status: tr.error == null ? 'ok' : 'error',
        dataRowLength: rowLen,
        exactCount: cnt ?? null,
      },
    })
    if (tr.error != null) {
      diag.postgrest_readiness_tenant_probe_terminal_error = serializePostgrestError(tr.error)
      diag.postgrest_readiness_exhausted = true
      break
    }
    tenantProbeSawRows = rowLen > 0 || (typeof cnt === 'number' && cnt > 0)

    if (profileProbeOk) {
      sessionRestoreIsolationLog({
        kind: 'postgrest_readiness_satisfied',
        pass,
        attempt,
        profileProbeOk,
        tenantProbeSawRows,
      })
      verifyLog('session_restore_auth_ready', {
        pass,
        attempt,
        ok: true,
        postgrestProbeOk: true,
        waitMs: diag.session_jwt_ready_wait_ms,
        jwtAttempts: diag.session_jwt_ready_attempts,
      })
      diag.postgrest_profile_probe_succeeded = true
      diag.postgrest_tenant_probe_saw_rows = tenantProbeSawRows
      diag.postgrest_readiness_attempts = attempt
      diag.postgrest_readiness_exhausted = false
      return { profileProbeOk, tenantProbeSawRows, attemptsUsed: attempt }
    }

    await new Promise<void>((r) => {
      setTimeout(r, POSTGREST_READINESS_GAP_MS)
    })
  }

  sessionRestoreIsolationLog({
    kind: 'postgrest_readiness_exhausted',
    pass,
    profileProbeOk,
    tenantProbeSawRows,
    maxAttempts: POSTGREST_READINESS_MAX_ATTEMPTS,
  })
  diag.postgrest_profile_probe_succeeded = profileProbeOk
  diag.postgrest_tenant_probe_saw_rows = tenantProbeSawRows
  diag.postgrest_readiness_attempts = POSTGREST_READINESS_MAX_ATTEMPTS
  diag.postgrest_readiness_exhausted = true
  return {
    profileProbeOk,
    tenantProbeSawRows,
    attemptsUsed: POSTGREST_READINESS_MAX_ATTEMPTS,
  }
}

function normalizeUuidLike(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const t = value.trim()
  return isWorkspaceTenantId(t) ? t : null
}

function extractTenantIdsFromRpcPayload(payload: unknown): string[] {
  if (!Array.isArray(payload)) return []
  const out = new Set<string>()
  for (const row of payload) {
    const rec = row as Record<string, unknown>
    const candidate =
      normalizeUuidLike(rec.user_tenant_ids) ??
      normalizeUuidLike(rec.tenant_id) ??
      normalizeUuidLike(rec.id)
    if (candidate) out.add(candidate)
  }
  return [...out]
}

async function sessionRestoreUserTenantIdsRpcIsolation(
  supabase: SupabaseClient,
  uid: string,
  pass: number,
): Promise<{ tenantIds: string[]; error: { message: string; code?: string } | null }> {
  sessionRestoreIsolationLog({ kind: 'user_tenant_ids_rpc_attempt', pass, uid })
  const { data, error } = await supabase.rpc('user_tenant_ids')
  const tenantIds = extractTenantIdsFromRpcPayload(data)
  sessionRestoreIsolationLog({
    kind: 'user_tenant_ids_rpc_result',
    pass,
    uid,
    postgrest: {
      status: error == null ? 'ok' : 'error',
      error: serializePostgrestError(error),
      rawData: data,
      rawDataJsonType: data === null ? 'null' : Array.isArray(data) ? 'array' : typeof data,
    },
    extractedTenantIds: tenantIds,
  })
  return { tenantIds, error: error ?? null }
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => {
      reject(new Error(`${label} timed out after ${ms}ms`))
    }, ms)
    promise.finally(() => clearTimeout(t)).then(resolve, reject)
  })
}

type BootstrapFinishedStatus =
  | 'success'
  | 'timeout'
  | 'error'
  | 'stale_ignored'
  | 'suppressed'
  | 'cancelled'

function logBootstrapFinished(payload: {
  status: BootstrapFinishedStatus
  source?: string
  epoch?: number
  brandCount?: number | null
  detail?: Record<string, unknown>
}) {
  console.log('[JifunzeAI]', { bootstrap_finished: payload })
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => (isSupabaseConfigured() ? getSupabaseBrowserClient() : null), [])
  /** Bumped on sign-out so in-flight `bootstrapWorkspaceForUser` runs cannot re-apply tenant/brands after logout. */
  const sessionCommitNonceRef = useRef(0)
  /** Coalesces overlapping bootstrap calls (e.g. listener + refreshBrands) into one in-flight run. */
  const bootstrapInflightRef = useRef<Promise<number | undefined> | null>(null)
  /** Suppresses back-to-back listener bootstraps for the same uid (e.g. INITIAL_SESSION then SIGNED_IN). */
  const lastListenerBootstrapRef = useRef<{ uid: string; at: number } | null>(null)
  /**
   * Superseded bootstrap runs (timeout, sign-out, or newer run) must not mutate React state.
   * Incremented when starting a new `runWorkspaceBootstrap`, on timeout, and on sign-out.
   */
  const bootstrapEpochRef = useRef(0)
  /** After a **repair** timeout (Lane B), block automatic auth-listener bootstraps until this time (epoch ms). */
  const suppressAutoBootstrapUntilRef = useRef(0)
  /**
   * Lane A (`session_restore`): monotonic id for the latest restore run. Increment when starting a new
   * session restore or manual repair; sign-out bumps it so only the newest run may mutate UI state.
   */
  const workspaceRestoreGenerationRef = useRef(0)
  /**
   * Once true, `runWorkspaceBootstrap` must not flip global `loading` on — duplicate auth events
   * and `refreshBrands` would otherwise re-trigger the full-screen "Loading workspace…" gate.
   */
  const workspaceShellReadyRef = useRef(false)
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [tenantId, setTenantId] = useState<string>(LOCAL_DEV_TENANT_ID)
  const [brands, setBrands] = useState<BrandProfile[]>(() =>
    isSupabaseConfigured() ? [] : demoBrands,
  )
  const [loading, setLoading] = useState(Boolean(supabase))
  const [error, setError] = useState<string | null>(null)
  const [authInfo, setAuthInfo] = useState<string | null>(null)
  const [workspaceTenantResolved, setWorkspaceTenantResolved] = useState(false)
  const [workspaceShellReady, setWorkspaceShellReady] = useState(false)
  const [signOutPending, setSignOutPending] = useState(false)
  /** Dedupes concurrent `signOut()`; all callers await the same in-flight promise. */
  const signOutInFlightRef = useRef<Promise<void> | null>(null)
  const signOutOpSeqRef = useRef(0)

  useEffect(() => {
    registerAuthWriteGuards({ sessionCommitNonceRef, bootstrapEpochRef })
  }, [])

  const resolveAllowedTenantIds = useCallback(
    async (uid: string): Promise<string[]> => {
      if (!supabase) return []
      const { data: rpcRows, error: rpcErr } = await supabase.rpc('user_tenant_ids')
      if (rpcErr) {
        console.error('[JifunzeAI workspace]', {
          allowed_tenants_rpc_error: {
            userId: uid,
            message: rpcErr.message,
            code: (rpcErr as { code?: string }).code ?? null,
            details: (rpcErr as { details?: string }).details ?? null,
            hint: (rpcErr as { hint?: string }).hint ?? null,
          },
        })
      }
      const rpcTenantIds = extractTenantIdsFromRpcPayload(rpcRows)
      if (rpcTenantIds.length) {
        console.log('[JifunzeAI workspace]', {
          allowed_tenants_rpc: { userId: uid, tenantIds: rpcTenantIds },
        })
        return rpcTenantIds
      }

      // Fallback when PostgREST cannot coerce SETOF uuid result shape consistently.
      const { data: memberRows, error: memberErr } = await supabase
        .from('tenant_members')
        .select('tenant_id')
        .eq('user_id', uid)
      if (memberErr) {
        console.error('[JifunzeAI workspace]', {
          allowed_tenants_membership_error: {
            userId: uid,
            message: memberErr.message,
            code: (memberErr as { code?: string }).code ?? null,
            details: (memberErr as { details?: string }).details ?? null,
            hint: (memberErr as { hint?: string }).hint ?? null,
          },
        })
        return []
      }
      const out = new Set<string>()
      for (const row of memberRows ?? []) {
        const rec = row as { tenant_id?: unknown }
        const tid = normalizeUuidLike(rec.tenant_id)
        if (tid) out.add(tid)
      }
      const tenantIds = [...out]
      console.log('[JifunzeAI workspace]', {
        allowed_tenants_membership: { userId: uid, tenantIds },
      })
      return tenantIds
    },
    [supabase],
  )

  const bootstrapWorkspaceForUser = useCallback(
    async (
      uid: string,
      epoch: number,
      source: string,
      /** Lane A: must match `workspaceRestoreGenerationRef` or this run must not mutate UI. */
      restoreGen?: number,
    ): Promise<number | undefined> => {
      if (!supabase) {
        setWorkspaceTenantResolved(false)
        setTenantId(LOCAL_DEV_TENANT_ID)
        if (!isDemoPersistenceTenantId(LOCAL_DEV_TENANT_ID)) {
          throw new Error('LOCAL_DEV_TENANT_ID must be a demo (non-workspace) id.')
        }
        setBrands(demoBrands)
        return undefined
      }

      const nonceAtStart = sessionCommitNonceRef.current
      const stale = () => sessionCommitNonceRef.current !== nonceAtStart
      const workAborted = () =>
        stale() ||
        epoch !== bootstrapEpochRef.current ||
        (source === 'session_restore' &&
          restoreGen !== undefined &&
          restoreGen !== workspaceRestoreGenerationRef.current)

      if (workAborted()) return undefined

      const { data: gateUserData, error: gateUserErr } = await supabase.auth.getUser()
      if (gateUserErr) {
        console.error('[JifunzeAI Auth] bootstrapWorkspaceForUser getUser', gateUserErr)
        if (!workAborted()) {
          setLoading(false)
          setWorkspaceTenantResolved(false)
          setError(authFailureMessage(gateUserErr))
        }
        return undefined
      }
      const authUser = gateUserData.user
      if (!authUser || authUser.id !== uid) {
        console.error('[JifunzeAI Auth] bootstrapWorkspaceForUser session uid mismatch', {
          expected: uid,
          got: authUser?.id ?? null,
        })
        if (!workAborted()) {
          setLoading(false)
        }
        return undefined
      }
      if (!authUser.email_confirmed_at) {
        if (!workAborted()) {
          setWorkspaceTenantResolved(false)
          workspaceShellReadyRef.current = false
          setWorkspaceShellReady(false)
          setTenantId(LOCAL_DEV_TENANT_ID)
          setBrands([])
          setAuthInfo(
            'Confirm your email to access your workspace. After you confirm, refresh this page or sign in again.',
          )
          setLoading(false)
        }
        return undefined
      }

      try {
        const bootstrapT0 = perfNow()
        const diag: Record<string, unknown> = {
          bootstrap_source: source,
          uid,
          profile_found: false,
          member_ids_count: 0,
          candidate_allowed_count: null as number | null,
          escalating_to_bootstrap_rpc: false,
          restore_branch_selected: null as string | null,
          restore_branch_skipped_reason:
            source === 'session_restore' ? 'pending' : 'not_session_restore_source',
          duplicate_bootstrap_suppressed: false,
          bootstrap_rpc_started: false,
          bootstrap_rpc_finished: false,
          bootstrap_rpc_duration_ms: null as number | null,
          resolve_allowed_duration_ms: null as number | null,
          brands_load_duration_ms: null as number | null,
          total_bootstrap_duration_ms: null as number | null,
          session_restore_last_profile_error: null as string | null,
          session_restore_last_membership_error: null as string | null,
          escalating_to_bootstrap_rpc_confirmed_missing_only: false,
          session_restore_decision: null as SessionRestoreDecision | null,
          session_restore_data_sources: [] as string[],
          postgrest_profile_probe_succeeded: false,
          postgrest_tenant_probe_saw_rows: false,
          postgrest_readiness_attempts: null as number | null,
          postgrest_readiness_exhausted: false,
        }
        try {
        /**
         * Lane A (`session_restore`): PostgREST readiness + profile/membership reads — never calls
         * `bootstrap_my_workspace` here (Lane B / `manual_retry` only).
         */
        let profile: { default_tenant_id?: unknown } | null = null
        let effectiveAllowedTenantIds: string[] = []
        let usedLightweightRestore = false

        /**
         * Listener-driven restore uses `source === 'session_restore'` (INITIAL_SESSION / SIGNED_IN are
         * coalesced in `onAuthStateChange` before invoking Lane A).
         */
        if (source === 'session_restore') {
          /**
           * Isolation-first restore: log full PostgREST payloads + auth context before any decision.
           * `escalate_rpc` means “needs Lane B repair” — never invoke RPC from this lane.
           */
          sessionRestoreIsolationLog({ kind: 'session_restore_begin', uid })
          const dataSources = diag.session_restore_data_sources as string[]
          const markSource = (s: string) => {
            if (!dataSources.includes(s)) dataSources.push(s)
          }

          let pLight: { default_tenant_id?: unknown } | null = null
          let pLightErr: { message?: string; code?: string } | null | undefined
          let memberIdsFirst: string[] = []
          let lastMembershipErr: { message: string; code?: string } | null = null
          let candidateAllowed: string[] = []
          let restoreStrategy:
            | 'membership_table_first'
            | 'user_tenant_ids_fallback'
            | 'profile_default_tenant_only'
            | null = null

          let readErrorStop = false
          let retryPass2 = false

          const runRestorePass = async (pass: number): Promise<void> => {
            sessionRestoreIsolationLog({ kind: 'session_restore_pass_begin', pass, uid })
            await captureAuthContextForIsolation(supabase, uid, `pass${pass}_pre_postgrest_probe`)
            const readiness = await waitForAuthenticatedPostgrestReadiness(supabase, uid, pass, diag)
            await captureAuthContextForIsolation(supabase, uid, `pass${pass}_post_postgrest_probe`)
            sessionRestoreIsolationLog({
              kind: 'postgrest_readiness_summary',
              pass,
              profileProbeOk: readiness.profileProbeOk,
              tenantProbeSawRows: readiness.tenantProbeSawRows,
              attemptsUsed: readiness.attemptsUsed,
            })

            if (!readiness.profileProbeOk) {
              retryPass2 = pass === 1
              diag.session_restore_decision = 'not_ready'
              logSessionRestoreDecision('not_ready', {
                reason: 'postgrest_profile_probe_not_visible_yet',
                pass,
                attemptsUsed: readiness.attemptsUsed,
                tenantProbeSawRows: readiness.tenantProbeSawRows,
              })
              return
            }

            const { data: userProbe } = await supabase.auth.getUser()
            diag.session_probe_has_user = Boolean(userProbe?.user?.id)

            verifyLog('profile_read_attempt', { pass, uid })
            const pRead = await readProfileForIsolation(supabase, uid, pass)
            markSource('profiles_table')
            pLight = pRead.data
            pLightErr = pRead.error

            verifyLog('membership_read_attempt', { pass, uid })
            const mRead = await readTenantMembersForIsolation(supabase, uid, pass)
            markSource('tenant_members_table')
            memberIdsFirst = mRead.tenantIds
            lastMembershipErr = mRead.error

            diag.profile_read_attempt = pass
            diag.membership_read_attempt = pass
            diag.member_ids_count = memberIdsFirst.length
            diag.profile_found = Boolean(!pLightErr && pLight != null)

            if (pRead.error != null || mRead.error != null) {
              readErrorStop = true
              diag.session_restore_decision = 'read_error'
              logSessionRestoreDecision('read_error', {
                pass,
                profileErr: serializePostgrestError(pRead.error),
                membershipErr: serializePostgrestError(mRead.error),
              })
              return
            }

            candidateAllowed = memberIdsFirst
            restoreStrategy = memberIdsFirst.length > 0 ? 'membership_table_first' : null

            if (candidateAllowed.length === 0) {
              const resolveStart = perfNow()
              const rpcPack = await sessionRestoreUserTenantIdsRpcIsolation(supabase, uid, pass)
              markSource('user_tenant_ids_rpc')
              candidateAllowed = rpcPack.tenantIds
              diag.resolve_allowed_duration_ms = Math.round(perfNow() - resolveStart)
              if (candidateAllowed.length > 0) {
                restoreStrategy = 'user_tenant_ids_fallback'
              }
              if (rpcPack.error != null) {
                readErrorStop = true
                diag.session_restore_decision = 'read_error'
                logSessionRestoreDecision('read_error', {
                  pass,
                  step: 'user_tenant_ids_rpc',
                  rpcErr: serializePostgrestError(rpcPack.error),
                })
                return
              }
            } else {
              diag.resolve_allowed_duration_ms = 0
            }

            if (candidateAllowed.length === 0 && !pLightErr && pLight != null) {
              const dt = extractDefaultTenantIdString(pLight)
              if (isWorkspaceTenantId(dt)) {
                candidateAllowed = [dt]
                restoreStrategy = 'profile_default_tenant_only'
              }
            }

            diag.restore_strategy_used = restoreStrategy
            diag.candidate_allowed_count = candidateAllowed.length

            verifyLog('bootstrap_restore_branch', {
              uid,
              pass,
              profileOk: Boolean(!pLightErr && pLight != null),
              memberCount: memberIdsFirst.length,
              candidateCount: candidateAllowed.length,
              restoreStrategy,
            })

            if (candidateAllowed.length > 0) {
              if (!pLightErr && pLight != null) {
                profile = pLight
                effectiveAllowedTenantIds = candidateAllowed
                usedLightweightRestore = true
                diag.restore_branch_selected = 'lightweight_profile_and_allowed_tenants'
                diag.restore_branch_skipped_reason = null
                diag.session_restore_decision = 'lightweight_restore'
                logSessionRestoreDecision('lightweight_restore', { pass, via: restoreStrategy ?? 'unknown' })
                console.log('[JifunzeAI workspace]', {
                  workspace_reload_light_restore: {
                    userId: uid,
                    tenantIds: candidateAllowed,
                    via: restoreStrategy ?? 'unknown',
                  },
                })
                return
              }
              const sortedCand = [...candidateAllowed].sort((a, b) => a.localeCompare(b))
              const first = sortedCand[0]
              if (isWorkspaceTenantId(first)) {
                profile = { default_tenant_id: first }
                effectiveAllowedTenantIds = candidateAllowed
                usedLightweightRestore = true
                diag.restore_branch_selected = 'lightweight_synthetic_default_from_allowed_tenants'
                diag.restore_branch_skipped_reason = null
                diag.session_restore_decision = 'lightweight_restore'
                logSessionRestoreDecision('lightweight_restore', { pass, via: 'synthetic_default' })
                verifyLog('bootstrap_restore_synthetic_profile', { uid, defaultFrom: first })
                return
              }
              diag.restore_branch_skipped_reason = 'session_restore_candidates_not_workspace_uuid'
            } else {
              diag.restore_branch_skipped_reason = 'no_candidates_after_membership_resolve_and_profile_default'
            }

            const authReady = diag.session_restore_auth_ready === true
            const authoritativeEmpty =
              authReady &&
              userProbe?.user?.id === uid &&
              pLight == null &&
              pLightErr == null &&
              memberIdsFirst.length === 0 &&
              candidateAllowed.length === 0

            if (authoritativeEmpty) {
              if (diag.postgrest_profile_probe_succeeded === true) {
                readErrorStop = true
                diag.session_restore_decision = 'read_error'
                logSessionRestoreDecision('read_error', {
                  pass,
                  reason: 'authoritative_empty_after_profile_probe_succeeded',
                })
                return
              }
              if (pass === 1) {
                retryPass2 = true
                diag.session_restore_decision = 'not_ready'
                logSessionRestoreDecision('not_ready', {
                  pass: 1,
                  reason: 'authoritative_empty_without_probe_success',
                })
                return
              }
            }

            if (!authoritativeEmpty && pass === 1) {
              retryPass2 = false
            }
          }

          await runRestorePass(1)
          if (workAborted()) return undefined

          if (!usedLightweightRestore && !readErrorStop && retryPass2) {
            sessionRestoreIsolationLog({
              kind: 'lightweight_restore_retry_due_to_not_ready',
              pass: 2,
              uid,
              delayMs: 400,
            })
            await new Promise<void>((r) => {
              setTimeout(r, 400)
            })
            if (workAborted()) return undefined
            await runRestorePass(2)
          }
          if (workAborted()) return undefined

          if (!usedLightweightRestore && !readErrorStop) {
            const authOk = diag.session_restore_auth_ready === true
            const probeNeverSawProfile =
              diag.postgrest_profile_probe_succeeded !== true && diag.postgrest_readiness_exhausted === true
            if (!authOk) {
              diag.session_restore_decision = 'not_ready'
              logSessionRestoreDecision('not_ready', { reason: 'auth_not_ready_after_passes' })
              diag.escalating_to_bootstrap_rpc_confirmed_missing_only = false
            } else if (authOk && probeNeverSawProfile) {
              diag.profile_readiness = 'profile_missing_confirmed'
              diag.membership_readiness = 'membership_missing_confirmed'
              diag.session_restore_decision = 'escalate_rpc'
              diag.escalating_to_bootstrap_rpc_confirmed_missing_only = true
              logSessionRestoreDecision('escalate_rpc', {
                reason: 'postgrest_probe_exhausted_no_profile_row_first_time_bootstrap',
                note: 'JWT ok but profiles probe never returned a row — likely new user / no profile row',
              })
            } else {
              diag.session_restore_decision = 'not_ready'
              logSessionRestoreDecision('not_ready', {
                reason: 'unresolved_after_passes',
                pLightNull: pLight == null,
                memberIdsFirstLength: memberIdsFirst.length,
                candidateAllowedLength: candidateAllowed.length,
                postgrest_profile_probe_succeeded: diag.postgrest_profile_probe_succeeded,
                postgrest_readiness_exhausted: diag.postgrest_readiness_exhausted,
              })
              diag.escalating_to_bootstrap_rpc_confirmed_missing_only = false
            }
          } else if (readErrorStop) {
            diag.escalating_to_bootstrap_rpc_confirmed_missing_only = false
          }

          diag.session_restore_last_profile_error =
            pLightErr != null && typeof pLightErr === 'object' && 'message' in pLightErr
              ? String((pLightErr as { message?: string }).message ?? '')
              : null
          diag.session_restore_last_membership_error =
            lastMembershipErr != null
              ? String((lastMembershipErr as { message: string }).message ?? '')
              : null
        }

        if (!usedLightweightRestore && source === 'refreshBrands') {
          const { data: pRef, error: pRefErr } = await supabase
            .from('profiles')
            .select('default_tenant_id')
            .eq('id', uid)
            .maybeSingle()
          if (workAborted()) return undefined
          if (!pRefErr && pRef) {
            profile = pRef
            effectiveAllowedTenantIds = await resolveAllowedTenantIds(uid)
          }
        }

        const tenantKnownFromRefresh =
          source === 'refreshBrands' && profile != null && effectiveAllowedTenantIds.length > 0

        if (!usedLightweightRestore && !tenantKnownFromRefresh) {
          if (source === 'session_restore') {
            if (diag.session_restore_auth_ready !== true) {
              verifyLog('session_restore_skip_heavy_rpc_auth_not_ready', { uid })
              diag.escalating_to_bootstrap_rpc = false
              if (!workAborted()) {
                setWorkspaceTenantResolved(false)
                setError(
                  'Session is still restoring. Please wait a moment and use “Retry workspace setup”, or reload the page.',
                )
                setBrands([])
                setTenantId(LOCAL_DEV_TENANT_ID)
                setLoading(false)
              }
              return undefined
            }
            const profileReadErr = diag.session_restore_last_profile_error
            const membershipReadErr = diag.session_restore_last_membership_error
            if (profileReadErr || membershipReadErr) {
              verifyLog('session_restore_skip_heavy_rpc_due_to_read_errors', {
                uid,
                profileErr: profileReadErr,
                membershipErr: membershipReadErr,
              })
              diag.escalating_to_bootstrap_rpc = false
              if (!workAborted()) {
                setWorkspaceTenantResolved(false)
                setError(
                  `Could not read workspace data yet (${profileReadErr ?? membershipReadErr ?? 'unknown error'}). Please retry.`,
                )
                setBrands([])
                setTenantId(LOCAL_DEV_TENANT_ID)
                setLoading(false)
              }
              return undefined
            }
            if (diag.session_restore_decision !== 'escalate_rpc') {
              verifyLog('session_restore_skip_heavy_rpc_not_escalate_decision', {
                uid,
                session_restore_decision: diag.session_restore_decision,
                profile_readiness: diag.profile_readiness,
                membership_readiness: diag.membership_readiness,
              })
              diag.escalating_to_bootstrap_rpc = false
              if (!workAborted()) {
                setWorkspaceTenantResolved(false)
                setError(
                  'Workspace data is still loading. Please tap “Retry workspace setup” or reload in a few seconds.',
                )
                setBrands([])
                setTenantId(LOCAL_DEV_TENANT_ID)
                setLoading(false)
              }
              return undefined
            }
            sessionRestoreIsolationLog({
              kind: 'session_restore_needs_lane_b_repair',
              uid,
              session_restore_decision: diag.session_restore_decision,
              data_sources_used: diag.session_restore_data_sources,
            })
            logSessionRestoreDecision('escalate_rpc', { lane_b_only_manual_retry: true })
            diag.escalating_to_bootstrap_rpc = false
            if (!workAborted()) {
              setWorkspaceTenantResolved(false)
              setError(
                'No workspace yet for this account. Tap “Retry workspace setup” once to create it (server setup).',
              )
              setBrands([])
              setTenantId(LOCAL_DEV_TENANT_ID)
              setLoading(false)
            }
            return undefined
          }
          if (source === 'refreshBrands') {
            if (!workAborted()) {
              setWorkspaceTenantResolved(false)
              setError('Could not refresh workspace data — try “Retry workspace setup”.')
              setBrands([])
              setTenantId(LOCAL_DEV_TENANT_ID)
              setLoading(false)
            }
            return undefined
          }
          if (!workAborted()) {
            setWorkspaceTenantResolved(false)
            setError('Workspace unavailable — use “Retry workspace setup”.')
            setBrands([])
            setTenantId(LOCAL_DEV_TENANT_ID)
            setLoading(false)
          }
          return undefined
        }

        if (profile == null) {
          if (workAborted()) return undefined
          setWorkspaceTenantResolved(false)
          setError(
            'No profile found for this account after workspace setup. Try signing out and signing in again, or contact support.',
          )
          setBrands([])
          setTenantId(LOCAL_DEV_TENANT_ID)
          setLoading(false)
          return undefined
        }

        const rawTenant = profile.default_tenant_id
        const profileTenantId =
          typeof rawTenant === 'string'
            ? rawTenant.trim()
            : rawTenant == null
              ? ''
              : String(rawTenant).trim()

        if (workAborted()) return undefined

        if (!effectiveAllowedTenantIds.length) {
          if (source === 'session_restore') {
            verifyLog('session_restore_recover_allowed_before_bootstrap_rpc', { uid })
            const m3 = await loadTenantIdsFromMembershipTable(supabase, uid)
            diag.session_restore_recover_membership_requery_count = m3.length
            if (m3.length > 0) {
              effectiveAllowedTenantIds = m3
              diag.session_restore_recovered_allowed = 'membership_requery'
            } else {
              const pd = extractDefaultTenantIdString(profile)
              if (isWorkspaceTenantId(pd)) {
                effectiveAllowedTenantIds = [pd]
                diag.session_restore_recovered_allowed = 'profile_default_only'
              }
            }
          }

          if (!effectiveAllowedTenantIds.length) {
            console.log('[JifunzeAI workspace]', {
              workspace_allowed_tenants_reresolve_no_rpc: { userId: uid, source },
            })
            effectiveAllowedTenantIds = await resolveAllowedTenantIds(uid)
            if (workAborted()) return undefined
            if (!effectiveAllowedTenantIds.length) {
              effectiveAllowedTenantIds = await loadTenantIdsFromMembershipTable(supabase, uid)
            }
            if (workAborted()) return undefined
          }
        }

        if (!effectiveAllowedTenantIds.length) {
          setWorkspaceTenantResolved(false)
          setBrands([])
          setTenantId(LOCAL_DEV_TENANT_ID)
          setError('Workspace creation failed — please retry')
          setLoading(false)
          return undefined
        }

        // Stable ordering so `allowedTenantIds[0]` is deterministic for multi-tenant users (UUID lexical sort).
        const sortedAllowed = [...effectiveAllowedTenantIds].sort((a, b) => a.localeCompare(b))
        const resolvedTenant = sortedAllowed[0]
        if (!resolvedTenant) {
          setWorkspaceTenantResolved(false)
          setBrands([])
          setTenantId(LOCAL_DEV_TENANT_ID)
          setError('Workspace creation failed — please retry')
          setLoading(false)
          return undefined
        }

        const validProfileTenant = isWorkspaceTenantId(profileTenantId) ? profileTenantId : null
        if (!validProfileTenant || validProfileTenant !== resolvedTenant) {
          const patchOutcome = await safeSupabaseWrite(supabase, async () => {
            const { error } = await supabase
              .from('profiles')
              .update({ default_tenant_id: resolvedTenant })
              .eq('id', uid)
            return { error }
          })
          const patchProfileErr = patchOutcome?.error
          if (patchProfileErr) {
            console.error('[JifunzeAI workspace]', {
              profile_default_tenant_repair_failed: {
                userId: uid,
                profileTenantId,
                pickedTenantId: resolvedTenant,
                message: patchProfileErr.message,
                code: (patchProfileErr as { code?: string }).code ?? null,
                details: (patchProfileErr as { details?: string }).details ?? null,
                hint: (patchProfileErr as { hint?: string }).hint ?? null,
              },
            })
          } else if (patchOutcome) {
            console.log('[JifunzeAI workspace]', {
              profile_default_tenant_repaired: {
                userId: uid,
                from: profileTenantId || null,
                to: resolvedTenant,
              },
            })
          }
        }

        if (workAborted()) return undefined
        setTenantId(resolvedTenant)
        setWorkspaceTenantResolved(true)
        console.log('[JifunzeAI workspace]', {
          bootstrap_tenant_id_set: {
            userId: uid,
            tenantId: resolvedTenant,
            allowedTenantIds: sortedAllowed,
            source: 'allowed_tenant_ids_first',
          },
        })

        if (
          source === 'session_restore' &&
          diag.session_restore_decision === 'lightweight_restore'
        ) {
          if (workAborted()) return undefined
          verifyLog('workspace_bootstrap_session_restore_lightweight_shell_ready_defer_brands', {
            uid,
            tenantId: resolvedTenant,
          })
          diag.bootstrap_outcome = 'success'
          diag.brands_deferred = true
          void supabase.auth.getUser().then(({ data: authUserData }) => {
            if (sessionCommitNonceRef.current !== nonceAtStart) return
            if (
              restoreGen !== undefined &&
              restoreGen !== workspaceRestoreGenerationRef.current
            ) {
              return
            }
            jifunzeCriticalLog({
              action: 'workspace_bootstrap_resolved',
              userId: uid,
              tenantId: resolvedTenant,
              status: 'ok',
              allowedTenantIds: sortedAllowed,
              userEmail: authUserData.user?.email ?? null,
              deferred: true,
            })
          })
          void loadBrandsForTenant(supabase, resolvedTenant)
            .then((list) => {
              if (sessionCommitNonceRef.current !== nonceAtStart) return
              if (epoch !== bootstrapEpochRef.current) return
              if (
                restoreGen !== undefined &&
                restoreGen !== workspaceRestoreGenerationRef.current
              ) {
                return
              }
              setBrands(list)
              setError(null)
              verifyLog('workspace_bootstrap_deferred_brands_loaded', {
                tenantId: resolvedTenant,
                count: list.length,
              })
              console.log('[JifunzeAI workspace]', {
                bootstrap_brands_loaded: { count: list.length, failed: false, deferred: true },
              })
            })
            .catch((brandErr) => {
              if (sessionCommitNonceRef.current !== nonceAtStart) return
              if (
                restoreGen !== undefined &&
                restoreGen !== workspaceRestoreGenerationRef.current
              ) {
                return
              }
              console.error('[JifunzeAI Auth] deferred brands load failed', brandErr)
              setError(
                `Could not load brands for this workspace: ${authFailureMessage(brandErr)}. You can retry after fixing RLS or network issues.`,
              )
            })
          if (!workAborted()) {
            setLoading(false)
          }
          return 0
        }

        const { data: authUserData } = await supabase.auth.getUser()
        if (workAborted()) return undefined
        jifunzeCriticalLog({
          action: 'workspace_bootstrap_resolved',
          userId: uid,
          tenantId: resolvedTenant,
          status: 'ok',
          allowedTenantIds: sortedAllowed,
          userEmail: authUserData.user?.email ?? null,
        })

        let list: BrandProfile[] = []
        let brandQueryFailed = false
        const brandsT0 = perfNow()
        try {
          list = await loadBrandsForTenant(supabase, resolvedTenant)
          diag.brands_load_duration_ms = Math.round(perfNow() - brandsT0)
        } catch (brandErr) {
          diag.brands_load_duration_ms = Math.round(perfNow() - brandsT0)
          brandQueryFailed = true
          console.error('[JifunzeAI Auth] brands load failed', brandErr)
          if (!workAborted()) {
            setError(
              `Could not load brands for this workspace: ${authFailureMessage(brandErr)}. You can retry after fixing RLS or network issues.`,
            )
          }
          list = []
        }

        if (workAborted()) return undefined
        console.log('[JifunzeAI workspace]', {
          bootstrap_brands_loaded: { count: list.length, failed: brandQueryFailed },
        })
        setBrands(list)
        if (!brandQueryFailed) {
          setError(null)
        }
        setLoading(false)
        diag.bootstrap_outcome = 'success'
        return list.length
        } finally {
          diag.total_bootstrap_duration_ms = Math.round(perfNow() - bootstrapT0)
          workspaceBootstrapDiag(diag)
        }
      } catch (bootstrapErr) {
        if (workAborted()) return undefined
        console.error('[JifunzeAI Auth] bootstrapWorkspaceForUser failed', bootstrapErr)
        setLoading(false)
        throw bootstrapErr
      }
    },
    [resolveAllowedTenantIds, supabase],
  )

  /** Lane B only: `bootstrap_my_workspace` (invoked from `manual_retry` after `withTimeout`). */
  const repairBootstrapMyWorkspace = useCallback(
    async (uid: string): Promise<void> => {
      if (!supabase) throw new Error('Supabase client missing')
      const rpcArgs = bootstrapMyWorkspaceRpcArgs(uid)
      console.log('[JifunzeAI workspace]', {
        bootstrap_rpc_lane_b_repair: { workspace_name: rpcArgs.workspace_name, userId: uid },
      })
      const ran = await safeSupabaseWrite(supabase, async () => {
        const { data: rpcData, error: rpcErr } = await supabase.rpc('bootstrap_my_workspace', rpcArgs)
        if (rpcErr) throw rpcErr
        if (rpcData == null || String(rpcData).trim() === '') {
          throw new Error('Workspace bootstrap returned no tenant')
        }
      })
      if (ran === undefined) {
        throw new Error('Workspace repair skipped (session ended).')
      }
    },
    [supabase],
  )

  const runWorkspaceBootstrap = useCallback(
    async (
      uid: string,
      source: string,
      options?: { force?: boolean },
    ): Promise<number | undefined> => {
      if (signOutInFlightRef.current) {
        workspaceBootstrapDiag({
          duplicate_bootstrap_suppressed: true,
          reason: 'sign_out_in_flight',
          bootstrap_source: source,
          uid,
        })
        logBootstrapFinished({
          status: 'cancelled',
          source,
          detail: { reason: 'sign_out_in_flight' },
        })
        return undefined
      }
      const autoSessionSource =
        source === 'session_restore' || source === 'INITIAL_SESSION' || source === 'SIGNED_IN'
      if (!options?.force && autoSessionSource && workspaceShellReadyRef.current) {
        workspaceBootstrapDiag({
          duplicate_bootstrap_suppressed: true,
          reason: 'workspace_shell_already_ready',
          bootstrap_source: source,
          uid,
        })
        logBootstrapFinished({
          status: 'suppressed',
          source,
          detail: { reason: 'workspace_shell_already_ready' },
        })
        return undefined
      }
      if (
        !options?.force &&
        autoSessionSource &&
        Date.now() < suppressAutoBootstrapUntilRef.current
      ) {
        workspaceBootstrapDiag({
          duplicate_bootstrap_suppressed: true,
          reason: 'suppress_after_repair_timeout',
          bootstrap_source: source,
          uid,
          suppressUntil: suppressAutoBootstrapUntilRef.current,
        })
        logBootstrapFinished({
          status: 'suppressed',
          source,
          detail: { suppressUntil: suppressAutoBootstrapUntilRef.current },
        })
        return undefined
      }

      const inflight = bootstrapInflightRef.current
      if (inflight) {
        return await inflight
      }

      const myEpoch = ++bootstrapEpochRef.current

      const task = async (): Promise<number | undefined> => {
        const nonceAtStart = sessionCommitNonceRef.current
        const staleNonce = () => sessionCommitNonceRef.current !== nonceAtStart

        authLog('bootstrap_started', { source, uid, epoch: myEpoch })
        const blockWorkspaceShell = !workspaceShellReadyRef.current
        if (blockWorkspaceShell) {
          setLoading(true)
        }
        let finishedStatus: BootstrapFinishedStatus = 'error'
        let terminalBrandCount: number | undefined
        let laneBRestoreGen: number | undefined
        try {
          let n: number | undefined

          if (source === 'manual_retry') {
            laneBRestoreGen = ++workspaceRestoreGenerationRef.current
            await withTimeout(
              repairBootstrapMyWorkspace(uid),
              WORKSPACE_REPAIR_TIMEOUT_MS,
              'Workspace repair',
            )
            if (staleNonce()) {
              finishedStatus = 'cancelled'
              return undefined
            }
            if (laneBRestoreGen !== workspaceRestoreGenerationRef.current) {
              finishedStatus = 'cancelled'
              return undefined
            }
            n = await bootstrapWorkspaceForUser(uid, myEpoch, 'session_restore', laneBRestoreGen)
          } else if (source === 'session_restore' || source === 'INITIAL_SESSION' || source === 'SIGNED_IN') {
            const restoreGen = ++workspaceRestoreGenerationRef.current
            n = await bootstrapWorkspaceForUser(uid, myEpoch, 'session_restore', restoreGen)
          } else {
            n = await bootstrapWorkspaceForUser(uid, myEpoch, source)
          }

          terminalBrandCount = n
          if (staleNonce()) {
            finishedStatus = 'cancelled'
          } else if (myEpoch !== bootstrapEpochRef.current) {
            finishedStatus = 'stale_ignored'
          } else if (n !== undefined) {
            finishedStatus = 'success'
            workspaceShellReadyRef.current = true
            setWorkspaceShellReady(true)
            authLog('bootstrap_completed', { source, outcome: 'success', brandCount: n, epoch: myEpoch })
            if (
              source !== 'refreshBrands' &&
              source !== 'manual_retry' &&
              n !== undefined
            ) {
              lastListenerBootstrapRef.current = { uid, at: Date.now() }
            }
          } else {
            finishedStatus = 'error'
            authLog('bootstrap_completed', { source, outcome: 'error', brandCount: n, epoch: myEpoch })
          }
          return n
        } catch (e) {
          if (staleNonce()) {
            finishedStatus = 'cancelled'
            return undefined
          }
          const msg = e instanceof Error ? e.message : String(e)
          const isTimeout = /timed out/i.test(msg)
          if (isTimeout && source === 'manual_retry') {
            bootstrapEpochRef.current += 1
            suppressAutoBootstrapUntilRef.current = Date.now() + 12_000
            const staleRepair =
              laneBRestoreGen !== undefined && laneBRestoreGen !== workspaceRestoreGenerationRef.current
            if (!staleNonce() && !staleRepair && !workspaceShellReadyRef.current) {
              setError(
                `${msg} Repair took too long. Try again or sign out and sign back in.`,
              )
              setWorkspaceTenantResolved(false)
              setTenantId(LOCAL_DEV_TENANT_ID)
              setBrands([])
            } else {
              verifyLog('workspace_repair_timeout_ignored_newer_run_or_shell_ready', {
                source,
                uid,
                epoch: myEpoch,
                staleRepair,
                shellReady: workspaceShellReadyRef.current,
              })
            }
            finishedStatus = 'timeout'
          } else if (isTimeout) {
            verifyLog('unexpected_bootstrap_timeout_non_manual', { source, uid })
            finishedStatus = 'timeout'
          } else if (!staleNonce()) {
            setError(authFailureMessage(e))
            finishedStatus = 'error'
          } else {
            finishedStatus = 'cancelled'
          }
          const quietBackgroundTimeout = isTimeout && workspaceShellReadyRef.current
          if (finishedStatus !== 'cancelled' && !quietBackgroundTimeout) {
            console.error('[JifunzeAI Auth] workspace bootstrap error', e)
          }
          return undefined
        } finally {
          bootstrapInflightRef.current = null
          setLoading(false)
          verifyLog('bootstrap_task_finished', {
            source,
            outcome: finishedStatus,
            brandCount: terminalBrandCount ?? null,
            epoch: myEpoch,
          })
          logBootstrapFinished({
            status: finishedStatus,
            source,
            epoch: myEpoch,
            brandCount: terminalBrandCount ?? null,
          })
        }
      }

      const p = task()
      bootstrapInflightRef.current = p
      return p
    },
    [bootstrapWorkspaceForUser, repairBootstrapMyWorkspace],
  )

  const refreshBrands = useCallback(async (): Promise<number | undefined> => {
    if (!supabase || !user) {
      if (!supabase) setBrands(demoBrands)
      return undefined
    }
    try {
      return await runWorkspaceBootstrap(user.id, 'refreshBrands', { force: true })
    } catch (e) {
      setError(authFailureMessage(e))
      return undefined
    }
  }, [supabase, user, runWorkspaceBootstrap])

  const retryWorkspaceBootstrap = useCallback(async (): Promise<number | undefined> => {
    if (!supabase || !user) return undefined
    setError(null)
    suppressAutoBootstrapUntilRef.current = 0
    return runWorkspaceBootstrap(user.id, 'manual_retry', { force: true })
  }, [supabase, user, runWorkspaceBootstrap])

  const reloadBrandsOnly = useCallback(async (): Promise<number | undefined> => {
    if (!supabase || !user) return undefined
    if (!isWorkspaceTenantId(tenantId)) return undefined
    const nonceAtStart = sessionCommitNonceRef.current
    try {
      const list = await loadBrandsForTenant(supabase, tenantId)
      if (sessionCommitNonceRef.current !== nonceAtStart) return undefined
      setBrands(list)
      verifyLog('reload_brands_only_ok', { tenantId, count: list.length })
      return list.length
    } catch (e) {
      if (sessionCommitNonceRef.current === nonceAtStart) {
        setError(authFailureMessage(e))
      }
      return undefined
    }
  }, [supabase, user, tenantId])

  useEffect(() => {
    if (!supabase) {
      setWorkspaceTenantResolved(false)
      workspaceShellReadyRef.current = false
      setWorkspaceShellReady(false)
      setTenantId(LOCAL_DEV_TENANT_ID)
      setBrands(demoBrands)
      setSession(null)
      setUser(null)
      setLoading(false)
      return
    }

    let sessionRestoreCoalesceTimer: ReturnType<typeof setTimeout> | null = null

    const { data: sub } = supabase.auth.onAuthStateChange(async (event, sess) => {
      if (event === 'SIGNED_OUT') {
        sessionCommitNonceRef.current += 1
        workspaceRestoreGenerationRef.current += 1
        bootstrapInflightRef.current = null
        lastListenerBootstrapRef.current = null
        clearAllPersistenceAfterSignOut()
        setError(null)
        setAuthInfo(null)
        setSession(null)
        setUser(null)
        setWorkspaceTenantResolved(false)
        workspaceShellReadyRef.current = false
        setWorkspaceShellReady(false)
        setBrands([])
        setTenantId(LOCAL_DEV_TENANT_ID)
        setLoading(false)
        return
      }

      const u = sess?.user ?? null
      if (!u) {
        clearSupabasePersistenceCache()
        setSession(sess ?? null)
        setUser(null)
        setWorkspaceTenantResolved(false)
        workspaceShellReadyRef.current = false
        setWorkspaceShellReady(false)
        setBrands([])
        setTenantId(LOCAL_DEV_TENANT_ID)
        setLoading(false)
        return
      }

      setSession(sess)
      setUser(u)
      console.log('[JifunzeAI Auth]', {
        session_user: {
          event,
          id: u.id,
          email: u.email ?? null,
          hasAccessToken: Boolean(sess?.access_token),
          emailConfirmed: Boolean(u.email_confirmed_at),
        },
      })

      const runCoalescedSessionRestore = async () => {
        if (bootstrapInflightRef.current) {
          verifyLog('session_restore_bootstrap_await_inflight', {
            event,
            uid: u.id,
          })
          workspaceBootstrapDiag({
            duplicate_bootstrap_suppressed: true,
            reason: 'await_inflight_bootstrap',
            bootstrap_source: 'session_restore',
            listener_event: event,
            uid: u.id,
          })
          try {
            await bootstrapInflightRef.current
          } catch (e) {
            console.error('[JifunzeAI Auth] await inflight bootstrap', e)
          }
          return
        }

        const now = Date.now()
        const lastLb = lastListenerBootstrapRef.current
        if (lastLb && lastLb.uid === u.id && now - lastLb.at < 3000) {
          verifyLog('session_restore_bootstrap_skipped_recent_success', {
            event,
            uid: u.id,
            gapMs: now - lastLb.at,
          })
          workspaceBootstrapDiag({
            duplicate_bootstrap_suppressed: true,
            reason: 'recent_bootstrap_success',
            bootstrap_source: 'session_restore',
            listener_event: event,
            uid: u.id,
          })
          return
        }

        try {
          await runWorkspaceBootstrap(u.id, 'session_restore')
        } catch (e) {
          console.error('[JifunzeAI Auth] runWorkspaceBootstrap from listener', e)
        }
      }

      const scheduleCoalescedSessionRestore = () => {
        if (sessionRestoreCoalesceTimer) {
          clearTimeout(sessionRestoreCoalesceTimer)
        }
        sessionRestoreCoalesceTimer = setTimeout(() => {
          sessionRestoreCoalesceTimer = null
          void runCoalescedSessionRestore()
        }, 50)
      }

      if (event === 'TOKEN_REFRESHED') {
        return
      }

      if (event === 'USER_UPDATED') {
        if (u.email_confirmed_at) {
          scheduleCoalescedSessionRestore()
        }
        return
      }

      if (event !== 'SIGNED_IN' && event !== 'INITIAL_SESSION') {
        return
      }

      if (!u.email_confirmed_at) {
        setLoading(false)
        setWorkspaceTenantResolved(false)
        workspaceShellReadyRef.current = false
        setWorkspaceShellReady(false)
        setBrands([])
        setTenantId(LOCAL_DEV_TENANT_ID)
        setAuthInfo(
          'Confirm your email to access your workspace. After you confirm, refresh this page or sign in again.',
        )
        return
      }

      scheduleCoalescedSessionRestore()
    })

    void supabase.auth.getSession().catch((err) => {
      console.error('[JifunzeAI Auth] getSession failed', err)
    })

    return () => {
      if (sessionRestoreCoalesceTimer) {
        clearTimeout(sessionRestoreCoalesceTimer)
        sessionRestoreCoalesceTimer = null
      }
      sub.subscription.unsubscribe()
    }
  }, [supabase, runWorkspaceBootstrap])

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!supabase) {
        const msg = 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
        setError(msg)
        throw new Error(msg)
      }
      setError(null)
      setAuthInfo(null)
      authLog('signIn_started')
      setLoading(true)
      const { error: e } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (e) {
        setLoading(false)
        setError(authFailureMessage(e))
        throw e
      }
      authLog('signIn_completed')
      /* Session + workspace bootstrap: `onAuthStateChange` (SIGNED_IN) is the source of truth. */
    },
    [supabase],
  )

  const signUp = useCallback(
    async (email: string, password: string) => {
      if (!supabase) {
        const msg = 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
        setError(msg)
        throw new Error(msg)
      }
      setError(null)
      setAuthInfo(null)
      authLog('signIn_started', { via: 'signUp' })
      setLoading(true)
      const { data, error: e } = await supabase.auth.signUp({
        email,
        password,
      })
      if (e) {
        setLoading(false)
        setError(authFailureMessage(e))
        throw e
      }
      authLog('signIn_completed', { via: 'signUp', hasSession: Boolean(data.session) })
      if (!data.session) {
        setLoading(false)
        setAuthInfo(
          'Account created. If your project requires email confirmation, check your inbox before signing in.',
        )
      }
    },
    [supabase],
  )

  const clearAuthMessages = useCallback(() => {
    setError(null)
    setAuthInfo(null)
  }, [])

  const resendConfirmationEmail = useCallback(async () => {
    if (!supabase) {
      const msg = 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
      setError(msg)
      throw new Error(msg)
    }
    const email = user?.email?.trim()
    if (!email) {
      const msg = 'No email on file to resend confirmation.'
      setError(msg)
      throw new Error(msg)
    }
    const { error: e } = await supabase.auth.resend({ type: 'signup', email })
    if (e) {
      setError(authFailureMessage(e))
      throw e
    }
    setAuthInfo('Confirmation email sent. Check your inbox and spam folder.')
  }, [supabase, user])

  const requestPasswordReset = useCallback(
    async (email: string) => {
      if (!supabase) {
        const msg = 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
        setError(msg)
        throw new Error(msg)
      }
      const redirectTo = `${window.location.origin}/reset-password`
      const { error: e } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo })
      if (e) {
        setError(authFailureMessage(e))
        throw e
      }
      setAuthInfo('If an account exists for that email, you will receive a password reset link.')
    },
    [supabase],
  )

  const signOut = useCallback(async () => {
    if (!supabase) return
    const existing = signOutInFlightRef.current
    if (existing) return existing

    const run = (async (): Promise<void> => {
      const opId = ++signOutOpSeqRef.current
      setSignOutPending(true)
      authLog('signOut_started', { opId })
      sessionCommitNonceRef.current += 1
      workspaceRestoreGenerationRef.current += 1
      bootstrapEpochRef.current += 1
      suppressAutoBootstrapUntilRef.current = 0
      workspaceShellReadyRef.current = false
      setWorkspaceShellReady(false)
      bootstrapInflightRef.current = null
      lastListenerBootstrapRef.current = null
      clearAuthMessages()
      let terminal: Record<string, unknown> = { opId, status: 'ok' as const }
      try {
        const { error } = await supabase.auth.signOut()
        if (error) {
          terminal = { opId, status: 'error', supabaseError: error.message }
        }
      } catch (e) {
        terminal = { opId, status: 'error', threw: authFailureMessage(e) }
      } finally {
        setSession(null)
        setUser(null)
        clearAllPersistenceAfterSignOut()
        setWorkspaceTenantResolved(false)
        setTenantId(LOCAL_DEV_TENANT_ID)
        setBrands([])
        setLoading(false)
        authLog('sign_out_result', terminal)
        setSignOutPending(false)
      }
    })()

    signOutInFlightRef.current = run
    try {
      await run
    } finally {
      signOutInFlightRef.current = null
    }
  }, [supabase, clearAuthMessages])

  const usesWorkspacePersistence = Boolean(
    supabase && user && session && isWorkspaceTenantId(tenantId),
  )
  const usesDemoPersistence = !usesWorkspacePersistence

  const value: AuthContextValue = {
    supabase,
    user,
    emailVerified: Boolean(user?.email_confirmed_at),
    session,
    tenantId,
    usesWorkspacePersistence,
    usesDemoPersistence,
    brands,
    loading,
    error,
    authInfo,
    workspaceTenantResolved,
    workspaceShellReady,
    signIn,
    signUp,
    signOut,
    signOutPending,
    refreshBrands,
    reloadBrandsOnly,
    retryWorkspaceBootstrap,
    clearAuthMessages,
    resendConfirmationEmail,
    requestPasswordReset,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/** Auth consumer hook (exported alongside {@link AuthProvider} for ergonomics). */
// eslint-disable-next-line react-refresh/only-export-components -- hook is intentionally co-located with provider
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
