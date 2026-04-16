import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { getSupabaseBrowserClient } from '../../lib/supabaseClient'

export type ContentGenerationRuntimeMode = 'backend' | 'preview'

export type ContentRuntimeDecision = 'backend_ready' | 'backend_unavailable' | 'fallback_mock'

export type RuntimeDecisionReason =
  | 'forced_mock_mode'
  | 'missing_endpoint'
  | 'health_not_ready'
  | 'backend_ready'
  | 'health_unreachable'
  | 'health_auth_failed'
  | 'no_session'

type RuntimeSnapshot = {
  mode: ContentGenerationRuntimeMode
  reason: RuntimeDecisionReason
  checkedAt: number | null
}

type HealthBody = {
  ok?: unknown
  ready?: unknown
}

/** Throttle optional GET diagnostics (does not affect routing). */
const HEALTH_DIAG_TTL_MS = 30_000

let healthDiagCheckedAt: number | null = null

/** Routing eligibility for remote generation — driven by config + session, not GET health. */
let routingCache: RuntimeSnapshot = {
  mode: 'preview',
  reason: 'missing_endpoint',
  checkedAt: null,
}

function configuredMode(): 'mock' | 'http' {
  const explicit = import.meta.env.VITE_CONTENT_MODE?.toLowerCase()?.trim()
  if (explicit === 'http' || explicit === 'mock') return explicit
  const url = import.meta.env.VITE_CONTENT_API_URL?.trim()
  if (url) return 'http'
  const legacy = import.meta.env.VITE_CONTENT_GENERATION_MODE?.toLowerCase()?.trim()
  return legacy === 'http' ? 'http' : 'mock'
}

/**
 * Edge function URL for diagnostics and (elsewhere) must match `supabase.functions.invoke('generate-content')`.
 * Prefer `VITE_CONTENT_API_URL` when set; otherwise derive from `VITE_SUPABASE_URL`.
 */
function endpointUrl(): string | null {
  const explicit = import.meta.env.VITE_CONTENT_API_URL?.trim()
  if (explicit) return explicit

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
  if (!supabaseUrl) return null
  return `${supabaseUrl.replace(/\/$/, '')}/functions/v1/generate-content`
}

function healthUrl(base: string): string {
  return base.includes('?') ? `${base}&health=1` : `${base}?health=1`
}

async function resolveSessionAccessToken(options?: { accessToken?: string }): Promise<string | undefined> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseBrowserClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const fromSession = session?.access_token?.trim()
    if (fromSession) return fromSession
  }
  return options?.accessToken?.trim()
}

/**
 * Updates {@link routingCache} from content mode, endpoint, Supabase config, and user JWT.
 * Does **not** call GET health — actual backend availability is determined by `functions.invoke`.
 */
export async function updateContentRoutingSnapshot(options?: {
  accessToken?: string
}): Promise<void> {
  const mode = configuredMode()
  if (mode === 'mock') {
    routingCache = { mode: 'preview', reason: 'forced_mock_mode', checkedAt: Date.now() }
    return
  }
  const url = endpointUrl()
  if (!url || !isSupabaseConfigured()) {
    routingCache = { mode: 'preview', reason: 'missing_endpoint', checkedAt: Date.now() }
    return
  }

  const token = await resolveSessionAccessToken(options)
  if (token) {
    routingCache = { mode: 'backend', reason: 'backend_ready', checkedAt: Date.now() }
    return
  }

  routingCache = { mode: 'preview', reason: 'no_session', checkedAt: Date.now() }
}

/**
 * Optional GET to `?health=1` for diagnostics only. Never changes {@link routingCache}.
 */
async function runOptionalHealthDiagnosticGet(options?: { accessToken?: string; force?: boolean }): Promise<void> {
  const mode = configuredMode()
  if (mode === 'mock') return

  const url = endpointUrl()
  if (!url) return

  const now = Date.now()
  if (!options?.force && healthDiagCheckedAt != null && now - healthDiagCheckedAt < HEALTH_DIAG_TTL_MS) {
    return
  }

  const accessToken = await resolveSessionAccessToken(options)
  console.info('[JifunzeAI content_runtime_auth]', { hasToken: Boolean(accessToken) })

  const headers: Record<string, string> = {}
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`

  try {
    const res = await fetch(healthUrl(url), { method: 'GET', headers })
    healthDiagCheckedAt = now

    const rawText = await res.text()
    let body: HealthBody = {}
    try {
      body = rawText.trim() ? (JSON.parse(rawText) as HealthBody) : {}
    } catch {
      console.info('[JifunzeAI content_runtime_health_diag]', {
        httpStatus: res.status,
        parseOk: false,
      })
      return
    }

    const llmReady = body.ready === true
    console.info('[JifunzeAI content_runtime_health_diag]', {
      httpStatus: res.status,
      ok: body.ok === true,
      llmReady,
    })
  } catch {
    console.info('[JifunzeAI content_runtime_health_diag]', { unreachable: true })
  }
}

export function getContentGenerationRuntimeSnapshot(): RuntimeSnapshot {
  const mode = configuredMode()
  if (mode === 'mock') {
    return { mode: 'preview', reason: 'forced_mock_mode', checkedAt: routingCache.checkedAt }
  }
  const url = endpointUrl()
  if (!url || !isSupabaseConfigured()) {
    return { mode: 'preview', reason: 'missing_endpoint', checkedAt: routingCache.checkedAt }
  }
  return routingCache
}

/**
 * Refreshes routing snapshot and runs an optional GET health call for console diagnostics only.
 */
export async function probeContentGenerationRuntime(options?: {
  accessToken?: string
  force?: boolean
}): Promise<RuntimeSnapshot> {
  await updateContentRoutingSnapshot(options)
  await runOptionalHealthDiagnosticGet(options)
  return getContentGenerationRuntimeSnapshot()
}

export function noteContentBackendFailure(): void {
  console.info('[JifunzeAI content_runtime]', { decision: 'invoke_failed' })
}
