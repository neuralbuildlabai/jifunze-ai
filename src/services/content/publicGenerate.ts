export type PublicPlatform = 'instagram' | 'x' | 'linkedin' | 'facebook'
export type PublicTone = 'professional' | 'friendly' | 'bold' | 'educational'

export type PublicGenerateRequest = {
  topic: string
  platform: PublicPlatform
  tone: PublicTone
}

export type PublicGenerateGrounding = 'grounded' | 'generic_fallback'

export type PublicGenerateResult = {
  caption: string
  hashtags: string
  source: string
  grounding: PublicGenerateGrounding
  signals_summary: string
  signal_items: string[]
  suggested_angle: string
}

export type PublicGenerateFailureCode =
  | 'limited'
  | 'invalid_response'
  | 'unavailable'
  | 'network'
  | 'misconfigured'

export type PublicGenerateFailureReason =
  | 'missing_openai_key'
  | 'missing_service_role_key'
  | 'openai_http_error'
  | 'openai_empty_response'
  | 'openai_parse_failed'
  | 'durable_limiter_rpc_failed'
  | 'unexpected_exception'
  | 'usage_limited'
  | null

export class PublicGenerateError extends Error {
  code: PublicGenerateFailureCode
  reason: PublicGenerateFailureReason
  status: number | null
  constructor(
    message: string,
    code: PublicGenerateFailureCode,
    options?: { reason?: PublicGenerateFailureReason; status?: number | null },
  ) {
    super(message)
    this.code = code
    this.reason = options?.reason ?? null
    this.status = options?.status ?? null
  }
}

const LOCAL_USAGE_KEY = 'jifunze_public_generate_usage_v1'
const HANDOFF_KEY = 'jifunze_public_generate_handoff_v1'
const DAILY_FREE_CAP = 1

type LocalUsage = {
  day: string
  count: number
  browserToken: string
}

export type PublicGenerateHandoff = {
  topic: string
  platform: PublicPlatform
  tone: PublicTone
  createdAt: string
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

function randomToken(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `tok-${Math.random().toString(36).slice(2, 12)}-${Date.now().toString(36)}`
}

function readUsage(): LocalUsage {
  if (typeof window === 'undefined') {
    return { day: todayKey(), count: 0, browserToken: randomToken() }
  }
  const day = todayKey()
  try {
    const raw = window.localStorage.getItem(LOCAL_USAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as Partial<LocalUsage>) : null
    const browserToken =
      typeof parsed?.browserToken === 'string' && parsed.browserToken.trim()
        ? parsed.browserToken.trim()
        : randomToken()
    const sameDay = parsed?.day === day
    const count = sameDay && typeof parsed?.count === 'number' ? Math.max(0, parsed.count) : 0
    const next: LocalUsage = { day, count, browserToken }
    window.localStorage.setItem(LOCAL_USAGE_KEY, JSON.stringify(next))
    return next
  } catch {
    return { day, count: 0, browserToken: randomToken() }
  }
}

function writeUsage(next: LocalUsage): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LOCAL_USAGE_KEY, JSON.stringify(next))
}

export function getPublicGenerateUsageStatus(): { remaining: number; browserToken: string } {
  const usage = readUsage()
  return { remaining: Math.max(0, DAILY_FREE_CAP - usage.count), browserToken: usage.browserToken }
}

export function markPublicGenerateUsedOnce(): void {
  const usage = readUsage()
  writeUsage({ ...usage, count: Math.min(DAILY_FREE_CAP, usage.count + 1) })
}

export function persistPublicGenerateHandoff(data: PublicGenerateHandoff): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(HANDOFF_KEY, JSON.stringify(data))
}

export function buildSignupHandoffQuery(data: PublicGenerateHandoff): string {
  const q = new URLSearchParams({
    auth: 'signup',
    from: 'generate',
    topic: data.topic,
    platform: data.platform,
    tone: data.tone,
  })
  return `/?${q.toString()}`
}

export function readPublicGenerateHandoff(): PublicGenerateHandoff | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(HANDOFF_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<PublicGenerateHandoff>
    if (
      typeof parsed?.topic !== 'string' ||
      typeof parsed?.platform !== 'string' ||
      typeof parsed?.tone !== 'string'
    ) {
      return null
    }
    return {
      topic: parsed.topic,
      platform: parsed.platform as PublicPlatform,
      tone: parsed.tone as PublicTone,
      createdAt: typeof parsed.createdAt === 'string' ? parsed.createdAt : new Date().toISOString(),
    }
  } catch {
    return null
  }
}

function publicFunctionUrl(): string {
  const base = import.meta.env.VITE_SUPABASE_URL?.trim()
  if (!base) {
    throw new PublicGenerateError(
      'Public generation is not configured yet. Please try again later.',
      'misconfigured',
    )
  }
  return `${base.replace(/\/$/, '')}/functions/v1/generate-public`
}

function mapPublicFailureMessage(
  reason: PublicGenerateFailureReason,
  fallback: string,
): { message: string; code: PublicGenerateFailureCode } {
  if (reason === 'missing_openai_key' || reason === 'missing_service_role_key') {
    return {
      message: 'Public generation is not configured yet. Please try again later.',
      code: 'misconfigured',
    }
  }
  if (reason === 'openai_http_error' || reason === 'openai_empty_response') {
    return {
      message: 'Generation service is busy. Please try again shortly.',
      code: 'unavailable',
    }
  }
  if (reason === 'openai_parse_failed') {
    return {
      message: 'We couldn’t format that result. Please try a different topic.',
      code: 'invalid_response',
    }
  }
  return {
    message: fallback || 'Public generation is unavailable right now. Please try again shortly.',
    code: 'unavailable',
  }
}

export async function requestPublicGeneration(input: PublicGenerateRequest): Promise<PublicGenerateResult> {
  const status = getPublicGenerateUsageStatus()
  if (status.remaining <= 0) {
    throw new PublicGenerateError(
      'You’ve used today’s free preview. Sign in or create a free account to continue.',
      'limited',
    )
  }

  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (anonKey) headers.apikey = anonKey
  headers['x-jifunze-browser-token'] = status.browserToken

  let res: Response
  try {
    res = await fetch(publicFunctionUrl(), {
      method: 'POST',
      headers,
      body: JSON.stringify(input),
    })
  } catch {
    throw new PublicGenerateError(
      'Network issue while contacting the generation service. Please try again.',
      'network',
    )
  }

  const payload = (await res.json().catch(() => null)) as Record<string, unknown> | null

  if (!res.ok) {
    const reason =
      typeof payload?.reason === 'string' ? (payload.reason as PublicGenerateFailureReason) : null
    const msg =
      typeof payload?.error === 'string'
        ? payload.error
        : 'Public generation is unavailable right now. Please try again shortly.'
    if (res.status === 429) {
      markPublicGenerateUsedOnce()
      throw new PublicGenerateError(
        'You’ve used today’s free preview. Sign in or create a free account to continue.',
        'limited',
        { reason: reason ?? 'usage_limited', status: 429 },
      )
    }
    const mapped = mapPublicFailureMessage(reason, msg)
    throw new PublicGenerateError(mapped.message, mapped.code, { reason, status: res.status })
  }

  const caption = typeof payload?.caption === 'string' ? payload.caption.trim() : ''
  const hashtags = typeof payload?.hashtags === 'string' ? payload.hashtags.trim() : ''
  const source = typeof payload?.source === 'string' ? payload.source : 'backend_llm'
  const groundingRaw = payload?.grounding
  const grounding: PublicGenerateGrounding =
    groundingRaw === 'grounded' || groundingRaw === 'generic_fallback' ? groundingRaw : 'generic_fallback'
  const signals_summary =
    typeof payload?.signals_summary === 'string' && payload.signals_summary.trim()
      ? payload.signals_summary.trim()
      : grounding === 'grounded'
        ? 'Public reference topics were available; the draft reflects that context. Verify facts before you post.'
        : 'Few strong public reference lines were available—this is a general draft. Check tone and accuracy yourself.'
  const suggested_angle =
    typeof payload?.suggested_angle === 'string' && payload.suggested_angle.trim()
      ? payload.suggested_angle.trim()
      : ''
  const signal_items = Array.isArray(payload?.signal_items)
    ? (payload?.signal_items as unknown[])
        .filter((x): x is string => typeof x === 'string')
        .map((x) => x.trim())
        .filter(Boolean)
    : []
  if (!caption || !hashtags) {
    throw new PublicGenerateError(
      'Generation returned an invalid response. Please try again.',
      'invalid_response',
    )
  }

  markPublicGenerateUsedOnce()
  return { caption, hashtags, source, grounding, signals_summary, signal_items, suggested_angle }
}
