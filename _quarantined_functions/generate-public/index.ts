import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

type PublicPlatform = 'instagram' | 'x' | 'linkedin' | 'facebook'
type PublicTone = 'professional' | 'friendly' | 'bold' | 'educational'

type PublicGenerateRequest = {
  topic: string
  platform: PublicPlatform
  tone: PublicTone
}

type PublicGrounding = 'grounded' | 'generic_fallback'

type PublicGenerateResponse = {
  caption: string
  hashtags: string
  source: 'backend_llm'
  grounding: PublicGrounding
  signals_summary: string
  signal_items: string[]
  suggested_angle: string
}

type PublicFailureReason =
  | 'missing_openai_key'
  | 'missing_service_role_key'
  | 'durable_limiter_rpc_failed'
  | 'openai_http_error'
  | 'openai_empty_response'
  | 'openai_parse_failed'
  | 'unexpected_exception'

type ParsePath = 'direct' | 'strip_fence' | 'fenced_block' | 'slice_object'

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-jifunze-browser-token',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const TOPIC_MAX_LEN = 180
const TOPIC_MIN_LEN = 3
const DAILY_ANON_CAP = 1
const HASH_PREFIX = 'sha256:'
const ipDailyCounter = new Map<string, number>()
const browserDailyCounter = new Map<string, number>()

class PublicGenerateFailure extends Error {
  reason: PublicFailureReason
  status: number
  detail?: Record<string, unknown>

  constructor(
    message: string,
    reason: PublicFailureReason,
    status = 503,
    detail?: Record<string, unknown>,
  ) {
    super(message)
    this.reason = reason
    this.status = status
    this.detail = detail
  }
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function parseBody(raw: unknown): PublicGenerateRequest | null {
  if (raw === null || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const topic = typeof o.topic === 'string' ? o.topic.trim() : ''
  const platform = typeof o.platform === 'string' ? o.platform.trim().toLowerCase() : ''
  const tone = typeof o.tone === 'string' ? o.tone.trim().toLowerCase() : ''
  if (topic.length < TOPIC_MIN_LEN || topic.length > TOPIC_MAX_LEN) return null
  if (!['instagram', 'x', 'linkedin', 'facebook'].includes(platform)) return null
  if (!['professional', 'friendly', 'bold', 'educational'].includes(tone)) return null
  return { topic, platform: platform as PublicPlatform, tone: tone as PublicTone }
}

function getClientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0]?.trim() || 'unknown-ip'
  return req.headers.get('cf-connecting-ip') ?? req.headers.get('x-real-ip') ?? 'unknown-ip'
}

function dailyKey(subject: string): string {
  const day = new Date().toISOString().slice(0, 10)
  return `${day}:${subject}`
}

function checkAndBumpInMemoryDailyCap(req: Request): { ok: true } | { ok: false; error: string } {
  const ipKey = dailyKey(`ip:${getClientIp(req)}`)
  const browserToken = req.headers.get('x-jifunze-browser-token')?.trim()
  const browserKey = browserToken ? dailyKey(`browser:${browserToken}`) : null

  const ipCount = ipDailyCounter.get(ipKey) ?? 0
  const browserCount = browserKey ? browserDailyCounter.get(browserKey) ?? 0 : 0
  if (ipCount >= DAILY_ANON_CAP || browserCount >= DAILY_ANON_CAP) {
    return {
      ok: false,
      error: 'You’ve used today’s free preview. Sign in or create a free account to continue.',
    }
  }

  ipDailyCounter.set(ipKey, ipCount + 1)
  if (browserKey) browserDailyCounter.set(browserKey, browserCount + 1)
  return { ok: true }
}

async function sha256(value: string): Promise<string> {
  const enc = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', enc)
  const bytes = new Uint8Array(digest)
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return `${HASH_PREFIX}${hex}`
}

async function checkAndBumpDurableDailyCap(
  req: Request,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')?.trim()
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?.trim()
  if (!supabaseUrl || !serviceRoleKey) {
    throw new PublicGenerateFailure(
      'Durable limiter is not configured.',
      'missing_service_role_key',
      503,
      { hasSupabaseUrl: Boolean(supabaseUrl), hasServiceRoleKey: Boolean(serviceRoleKey) },
    )
  }

  const ipHash = await sha256(getClientIp(req))
  const browserToken = req.headers.get('x-jifunze-browser-token')?.trim()
  const browserHash =
    browserToken && browserToken.length >= 8 && browserToken.length <= 128
      ? await sha256(browserToken)
      : null

  const supabase = createClient(supabaseUrl, serviceRoleKey)
  const { data, error } = await supabase.rpc('claim_public_generate_slot', {
    p_ip_hash: ipHash,
    p_browser_hash: browserHash,
    p_daily_cap: DAILY_ANON_CAP,
  })
  if (error) {
    throw new PublicGenerateFailure(
      'Durable limiter RPC failed.',
      'durable_limiter_rpc_failed',
      503,
      { rpcMessage: error.message, rpcCode: 'code' in error ? (error as { code?: string }).code ?? null : null },
    )
  }

  const row = Array.isArray(data) ? (data[0] as { allowed?: boolean; reason?: string } | undefined) : undefined
  if (!row?.allowed) {
    return {
      ok: false,
      error: 'You’ve used today’s free preview. Sign in or create a free account to continue.',
    }
  }
  return { ok: true }
}

function stripMarkdownCodeFence(text: string): string {
  const t = text.trim()
  if (!t.startsWith('```')) return t
  const firstNl = t.indexOf('\n')
  const lastFence = t.lastIndexOf('```')
  if (firstNl === -1 || lastFence <= firstNl) return t
  return t.slice(firstNl + 1, lastFence).trim()
}

function extractJsonCandidates(raw: string): Array<{ text: string; path: ParsePath }> {
  const trimmed = raw.trim()
  const out: Array<{ text: string; path: ParsePath }> = []
  const seen = new Set<string>()
  const add = (text: string, path: ParsePath) => {
    const t = text.trim()
    if (!t || seen.has(t)) return
    seen.add(t)
    out.push({ text: t, path })
  }

  add(trimmed, 'direct')
  const unfenced = stripMarkdownCodeFence(trimmed)
  if (unfenced !== trimmed) add(unfenced, 'strip_fence')

  const fenceRe = /```(?:json)?\s*([\s\S]*?)```/g
  let m: RegExpExecArray | null
  while ((m = fenceRe.exec(trimmed)) !== null) add(m[1]?.trim() ?? '', 'fenced_block')

  const firstBrace = trimmed.indexOf('{')
  const lastBrace = trimmed.lastIndexOf('}')
  if (firstBrace >= 0 && lastBrace > firstBrace) add(trimmed.slice(firstBrace, lastBrace + 1), 'slice_object')
  return out
}

function normalizeHashtags(value: unknown): string | null {
  if (Array.isArray(value)) {
    const parts = value
      .filter((x): x is string => typeof x === 'string')
      .map((x) => x.trim())
      .filter(Boolean)
    return parts.length ? parts.join(' ') : null
  }
  if (typeof value === 'string') {
    const t = value.trim()
    if (!t) return null
    if (t.includes(',')) return t.split(',').map((s) => s.trim()).filter(Boolean).join(' ')
    return t.split(/\s+/).filter(Boolean).join(' ')
  }
  return null
}

function detectTrendIntent(topic: string): boolean {
  const t = topic.toLowerCase()
  const cues = [
    /\btrending\b/,
    /\bthis week\b/,
    /\bright now\b/,
    /\btoday\b/,
    /\bhottest\b/,
    /\btop\s+\d+\b/,
    /\bcharts?\b/,
    /\bviral\b/,
    /\bnews today\b/,
    /\bai news\b/,
    /\bnow on\b/,
    /\bat the moment\b/,
    /\bthis month\b/,
  ]
  return cues.some((re) => re.test(t))
}

async function fetchWikipediaTitles(query: string): Promise<string[]> {
  const q = query.trim().slice(0, 140)
  if (!q) return []
  const url = new URL('https://en.wikipedia.org/w/api.php')
  url.searchParams.set('action', 'opensearch')
  url.searchParams.set('search', q)
  url.searchParams.set('limit', '6')
  url.searchParams.set('namespace', '0')
  url.searchParams.set('format', 'json')

  try {
    const res = await fetch(url.toString(), {
      headers: {
        // Wikimedia asks for a descriptive UA for API consumers.
        'User-Agent': 'JifunzePublicCaptionPreview/1.0 (mailto:neuralbuildlab.ai@gmail.com)',
        Accept: 'application/json',
      },
    })
    if (!res.ok) return []
    const data = (await res.json()) as unknown
    if (!Array.isArray(data) || data.length < 2 || !Array.isArray(data[1])) return []
    const titles = (data[1] as unknown[])
      .filter((x): x is string => typeof x === 'string')
      .map((x) => x.trim())
      .filter(Boolean)
    return titles.slice(0, 5)
  } catch {
    return []
  }
}

function deriveHashtags(caption: string): string {
  const words = caption
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 4)
    .slice(0, 4)
  const uniq = [...new Set(words)]
  if (uniq.length === 0) return '#content #creator #social'
  return uniq.map((w) => `#${w}`).join(' ')
}

function parseAssistantToPublic(rawContent: string): Omit<PublicGenerateResponse, 'grounding' | 'signals_summary' | 'signal_items'> | null {
  for (const c of extractJsonCandidates(rawContent)) {
    let parsed: unknown
    try {
      parsed = JSON.parse(c.text)
    } catch {
      continue
    }
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) continue
    const obj = parsed as Record<string, unknown>
    const captionRaw = obj.caption ?? obj.text ?? obj.content
    const caption = typeof captionRaw === 'string' ? captionRaw.trim() : ''
    if (!caption) continue
    const tagsRaw = obj.hashtags ?? obj.tags ?? obj.hashtag_list
    const hashtags = normalizeHashtags(tagsRaw) ?? deriveHashtags(caption)
    if (!hashtags.trim()) continue
    const suggestedAngleRaw = obj.suggested_angle ?? obj.angle ?? obj.hook
    const suggested_angle =
      typeof suggestedAngleRaw === 'string' && suggestedAngleRaw.trim() ? suggestedAngleRaw.trim() : ''
    return { caption, hashtags: hashtags.trim(), source: 'backend_llm', suggested_angle }
  }
  return null
}

async function generatePublicContent(input: PublicGenerateRequest): Promise<PublicGenerateResponse> {
  const apiKey = Deno.env.get('OPENAI_API_KEY')?.trim()
  if (!apiKey) {
    throw new PublicGenerateFailure(
      'Public generation is temporarily unavailable. Please sign in or try again later.',
      'missing_openai_key',
      503,
    )
  }
  const model = Deno.env.get('OPENAI_MODEL')?.trim() || 'gpt-4o-mini'

  const trendIntent = detectTrendIntent(input.topic)
  const wikiTitles = trendIntent ? [] : await fetchWikipediaTitles(input.topic)

  const referenceBlock =
    wikiTitles.length > 0
      ? `Reference topics (Wikipedia public search — contextual only; not live trends):\n- ${wikiTitles.join('\n- ')}`
      : 'No Wikipedia reference titles were confidently matched for this wording.'

  const trendRules = trendIntent
    ? [
        'This prompt looks like it requests live rankings, charts, breaking news, or “what is trending”.',
        'Do NOT invent songs, artists, statistics, rankings, viral moments, or dated claims.',
        'Write a cautious caption that asks a question, invites discussion, or frames the post as opinion/reflection—not reporting current charts.',
      ].join('\n')
    : [
        'If reference topics help, weave them naturally; if they feel unrelated, ignore them.',
        'Do not invent precise statistics or imply verified breaking news.',
      ].join('\n')

  const temperature = trendIntent ? 0.35 : 0.55

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      temperature,
      max_tokens: 320,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: [
            'You write social captions for Jifunze’s public preview.',
            'Return ONLY JSON with keys: caption (string), hashtags (string or array), suggested_angle (one concise sentence describing the angle).',
            'Keep the caption practical for the requested platform + tone.',
            trendIntent
              ? 'When live trend verification is unavailable, label outputs as reflective prompts—not factual reporting.'
              : 'Prefer grounded wording when reference topics are relevant.',
          ].join(' '),
        },
        {
          role: 'user',
          content: [
            `Topic: ${input.topic}`,
            `Platform: ${input.platform}`,
            `Tone: ${input.tone}`,
            '',
            referenceBlock,
            '',
            trendRules,
          ].join('\n'),
        },
      ],
    }),
  })

  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    console.error('[JifunzeAI generate-public] OpenAI error', res.status, msg.slice(0, 400))
    throw new PublicGenerateFailure(
      'Generation service is busy. Please try again shortly.',
      'openai_http_error',
      503,
      { openaiStatus: res.status },
    )
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const raw = data.choices?.[0]?.message?.content?.trim()
  if (!raw) {
    throw new PublicGenerateFailure(
      'Generation service returned an empty response.',
      'openai_empty_response',
      503,
    )
  }

  const parsed = parseAssistantToPublic(raw)
  if (!parsed) {
    console.error('[JifunzeAI generate-public] parse_failed', { rawAssistant: raw.slice(0, 1200) })
    throw new PublicGenerateFailure(
      'Could not parse generation output. Please try again.',
      'openai_parse_failed',
      503,
    )
  }

  const grounding: PublicGrounding = trendIntent || wikiTitles.length === 0 ? 'generic_fallback' : 'grounded'

  const signals_summary = trendIntent
    ? "We couldn’t verify live trend signals from public feeds in this preview. The caption is a labeled practice draft—double-check anything time-sensitive before posting."
    : wikiTitles.length > 0
      ? `Signals found (Wikipedia open search — reference topics, not live trends): ${wikiTitles.slice(0, 4).join(' · ')}`
      : "We couldn’t match enough reference topics from Wikipedia for this wording, so this is a generic draft anchored to your idea."

  const suggested_angle =
    parsed.suggested_angle.trim().length > 0
      ? parsed.suggested_angle.trim()
      : trendIntent
        ? 'Invite conversation without claiming verified rankings or breaking updates.'
        : wikiTitles.length > 0
          ? `Lean on the clearest shared reference: ${wikiTitles[0]}.`
          : 'Lead with your takeaway, then invite responses.'

  return {
    caption: parsed.caption,
    hashtags: parsed.hashtags,
    source: parsed.source,
    grounding,
    signals_summary,
    signal_items: wikiTitles,
    suggested_angle,
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  let quota: { ok: true } | { ok: false; error: string }
  try {
    quota = await checkAndBumpDurableDailyCap(req)
  } catch (e) {
    console.error('[JifunzeAI generate-public] durable_limiter_failed', {
      error: e instanceof Error ? e.message : String(e),
      reason: e instanceof PublicGenerateFailure ? e.reason : 'unknown',
      detail: e instanceof PublicGenerateFailure ? e.detail ?? null : null,
    })
    quota = checkAndBumpInMemoryDailyCap(req)
  }

  if (!quota.ok) {
    return json({ error: quota.error, reason: 'daily_limit_reached', signup_required: true }, 429)
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400)
  }

  const body = parseBody(payload)
  if (!body) {
    return json(
      {
        error:
          'Invalid input. Topic must be 3-180 chars. Platform: instagram|x|linkedin|facebook. Tone: professional|friendly|bold|educational.',
      },
      400,
    )
  }

  try {
    const out = await generatePublicContent(body)
    return json(out, 200)
  } catch (e) {
    const failure =
      e instanceof PublicGenerateFailure
        ? e
        : new PublicGenerateFailure(
            'Public generation is unavailable right now. Please try again shortly.',
            'unexpected_exception',
            503,
          )
    console.error('[JifunzeAI generate-public] request_failed', {
      reason: failure.reason,
      message: failure.message,
      detail: failure.detail ?? null,
    })
    const userMessage =
      failure.reason === 'missing_openai_key' || failure.reason === 'missing_service_role_key'
        ? 'Public generation is not configured yet. Please try again later.'
        : failure.message
    return json(
      {
        error: userMessage,
        reason: failure.reason,
        signup_required: true,
      },
      failure.status,
    )
  }
})
