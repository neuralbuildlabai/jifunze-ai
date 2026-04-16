/**
 * Server-side social caption generation. Set secrets: OPENAI_API_KEY (optional),
 * OPENAI_MODEL (optional, default gpt-4o-mini). Without OPENAI_API_KEY, non-production may return a deterministic mock.
 * Set GENERATION_PRODUCTION=true (or NODE_ENV=production) so OpenAI failures return 503 { reason } instead of mock.
 *
 * Auth: `verify_jwt` is disabled in config.toml so the platform does not reject asymmetric JWTs early.
 * We validate `Authorization: Bearer <access_token>` with `@supabase/supabase-js` + `auth.getUser()`
 * inside this handler (see {@link verifyAuthorizedUser}).
 */
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

type GenerateContentRequestBody = {
  topic: string
  context?: string
  source?: 'manual_topic' | 'signal' | 'opportunity'
  external_signal_id?: string
  content_opportunity_id?: string
}

type SocialContent = { caption: string; hashtags: string }

/** How the caption was produced (non-secret; for client logging / support). */
type GenerationDeliverySource = 'backend_llm' | 'backend_mock'

/** Non-secret diagnosis when OpenAI path did not yield usable content (logs + dev only). */
type BackendMockReason =
  | 'missing_openai_key'
  | 'openai_http_error'
  | 'openai_empty_assistant_message'
  | 'openai_content_json_parse_failed'
  | 'openai_content_invalid_shape'
  | 'openai_content_unparsed_after_heuristics'

/** How we recovered JSON from the assistant string (non-secret). */
type ParsePath = 'direct' | 'strip_fence' | 'brace_extract' | 'fenced_block' | 'slice_object'

type GenerationResponseBody = SocialContent & { source: GenerationDeliverySource }

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  /** GET is used by browser health probes; POST is the generation call. */
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

/** Validates Bearer JWT via GoTrue; returns a Response to return early, or null to continue. */
async function verifyAuthorizedUser(req: Request): Promise<Response | null> {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.trim()) {
    console.info('[JifunzeAI generate-content]', { authVerified: false })
    return json({ error: 'Unauthorized' }, 401)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')?.trim()
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')?.trim()
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('[JifunzeAI generate-content] Missing SUPABASE_URL or SUPABASE_ANON_KEY')
    console.info('[JifunzeAI generate-content]', { authVerified: false })
    return json({ error: 'Server misconfiguration' }, 500)
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  })

  const { data, error } = await supabase.auth.getUser()
  const user = data?.user ?? null

  if (error || !user) {
    console.info('[JifunzeAI generate-content]', { authVerified: false })
    return json({ error: 'Unauthorized' }, 401)
  }

  console.info('[JifunzeAI generate-content]', { authVerified: true })
  return null
}

function parseBody(raw: unknown): GenerateContentRequestBody | null {
  if (raw === null || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (typeof o.topic !== 'string' || !o.topic.trim()) return null
  return {
    topic: o.topic.trim(),
    context: typeof o.context === 'string' ? o.context : undefined,
    source:
      o.source === 'manual_topic' || o.source === 'signal' || o.source === 'opportunity'
        ? o.source
        : undefined,
    external_signal_id:
      typeof o.external_signal_id === 'string' ? o.external_signal_id : undefined,
    content_opportunity_id:
      typeof o.content_opportunity_id === 'string' ? o.content_opportunity_id : undefined,
  }
}

function serverMock(body: GenerateContentRequestBody): SocialContent {
  const src = body.source ?? 'manual_topic'
  const angle =
    src === 'opportunity' ? 'timely, signal-informed' : src === 'signal' ? 'trend-aware' : 'on-brand'
  const hint = body.context
    ? ` Context: ${body.context.slice(0, 220)}${body.context.length > 220 ? '…' : ''}`
    : ''
  return {
    caption: `Draft (${angle}): lead with “${body.topic}”.${hint} (server mock — set OPENAI_API_KEY for LLM output.)`,
    hashtags:
      src === 'opportunity' ? '#timely #brandvoice #socialproof' : '#brand #growth #social #content',
  }
}

/** When true, OpenAI failures must not fall back to server mock (503 + { reason }). */
function isGenerationProductionMode(): boolean {
  const explicit = Deno.env.get('GENERATION_PRODUCTION')?.trim().toLowerCase()
  if (explicit === 'true' || explicit === '1') return true
  if (explicit === 'false' || explicit === '0') return false
  return Deno.env.get('NODE_ENV')?.trim() === 'production'
}

function generationHealth() {
  const hasOpenAiKey = Boolean(Deno.env.get('OPENAI_API_KEY')?.trim())
  return {
    ok: true,
    ready: hasOpenAiKey,
    provider: hasOpenAiKey ? 'openai' : 'mock',
  }
}

/** Strip ``` / ```json fences when the whole blob is a single fence block. */
function stripMarkdownCodeFence(text: string): string {
  let t = text.trim()
  if (!t.startsWith('```')) return t
  const firstNl = t.indexOf('\n')
  const lastFence = t.lastIndexOf('```')
  if (firstNl === -1 || lastFence <= firstNl) return t
  return t.slice(firstNl + 1, lastFence).trim()
}

function normalizeCaption(value: unknown): string | null {
  if (typeof value === 'string') {
    const t = value.trim()
    return t ? t : null
  }
  if (typeof value === 'number' && Number.isFinite(value)) return String(value).trim() || null
  return null
}

/** Case-insensitive lookup for known keys. */
function getRecordField(obj: Record<string, unknown>, key: string): unknown {
  const lower = key.toLowerCase()
  for (const [k, v] of Object.entries(obj)) {
    if (k.toLowerCase() === lower) return v
  }
  return undefined
}

/** caption | text | content */
function pickCaptionFromRecord(obj: Record<string, unknown>): string | null {
  for (const key of ['caption', 'text', 'content']) {
    const c = normalizeCaption(getRecordField(obj, key))
    if (c) return c
  }
  return null
}

/**
 * hashtags | tags | hashtag_list — string (comma/space), string[], or mixed.
 */
function normalizeHashtagsFlexible(value: unknown): string | null {
  if (value == null) return null
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
    if (t.includes(',')) {
      return t
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .join(' ')
    }
    return t.split(/\s+/).filter(Boolean).join(' ')
  }
  return null
}

/** hashtags | tags | hashtag_list */
function pickHashtagsFromRecord(obj: Record<string, unknown>): string | null {
  for (const key of ['hashtags', 'tags', 'hashtag_list']) {
    const h = normalizeHashtagsFlexible(getRecordField(obj, key))
    if (h) return h
  }
  return null
}

/** Derive a short hashtag line from caption when the model omits tags (still backend_llm). */
function deriveHashtagsFromCaption(caption: string): string {
  const words = caption
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[^a-z0-9\s#]/g, ' ')
    .split(/\s+/)
    .map((w) => w.replace(/^#+/, ''))
    .filter((w) => w.length >= 3 && w.length <= 28)
    .slice(0, 5)
  const uniq = [...new Set(words)]
  if (uniq.length === 0) return '#social #content #education'
  return uniq.map((w) => `#${w}`).join(' ')
}

function socialFromParsedObject(parsed: Record<string, unknown>): SocialContent | null {
  const caption = pickCaptionFromRecord(parsed)
  if (!caption) return null
  let hashtags = pickHashtagsFromRecord(parsed)
  if (!hashtags?.trim()) hashtags = deriveHashtagsFromCaption(caption)
  const h = hashtags.trim()
  if (!h) return null
  return { caption: caption.trim(), hashtags: h }
}

/**
 * Build ordered JSON string candidates: full string, fences, then first `{`…last `}` slice
 * (last resort; prefer fenced JSON).
 */
function extractJsonCandidates(raw: string): Array<{ text: string; path: ParsePath }> {
  const trimmed = raw.trim()
  const out: Array<{ text: string; path: ParsePath }> = []
  const seen = new Set<string>()
  function add(text: string, path: ParsePath) {
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
  while ((m = fenceRe.exec(trimmed)) !== null) {
    add(m[1].trim(), 'fenced_block')
  }

  const firstBrace = trimmed.indexOf('{')
  const lastBrace = trimmed.lastIndexOf('}')
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    add(trimmed.slice(firstBrace, lastBrace + 1), 'slice_object')
  }

  return out
}

function parseAssistantToSocial(
  rawContent: string,
):
  | { ok: true; social: SocialContent; parsePath: ParsePath }
  | { ok: false; failureReason: BackendMockReason } {
  const trimmed = rawContent.trim()
  if (!trimmed) {
    return { ok: false, failureReason: 'openai_content_invalid_shape' }
  }

  const candidates = extractJsonCandidates(trimmed)
  let lastFailure: BackendMockReason = 'openai_content_json_parse_failed'

  for (const { text, path } of candidates) {
    let parsed: unknown
    try {
      parsed = JSON.parse(text)
    } catch {
      lastFailure = 'openai_content_json_parse_failed'
      continue
    }
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      lastFailure = 'openai_content_invalid_shape'
      continue
    }
    const social = socialFromParsedObject(parsed as Record<string, unknown>)
    if (social) {
      return { ok: true, social, parsePath: path }
    }
    lastFailure = 'openai_content_invalid_shape'
  }

  return { ok: false, failureReason: lastFailure }
}

async function generateWithOpenAi(body: GenerateContentRequestBody): Promise<{
  content: SocialContent | null
  mockReason: BackendMockReason | null
  /** Present when mockReason === 'openai_http_error' (non-secret status code). */
  openaiHttpStatus?: number
  /** Character length of assistant message when parse fails (non-secret). */
  assistantLength?: number
  /** How JSON was recovered when parsing succeeded without using raw string alone. */
  parseRecovery?: ParsePath
}> {
  const apiKey = Deno.env.get('OPENAI_API_KEY')?.trim()
  if (!apiKey) return { content: null, mockReason: 'missing_openai_key' }

  const model = Deno.env.get('OPENAI_MODEL')?.trim() || 'gpt-4o-mini'
  const userBlock = [
    `Topic: ${body.topic}`,
    body.context ? `Context:\n${body.context}` : '',
    body.source ? `Source: ${body.source}` : '',
  ]
    .filter(Boolean)
    .join('\n\n')

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You write short social posts. Reply with ONLY one JSON object. Keys: caption (or text or content) and hashtags (or tags or hashtag_list). Hashtags may be a string, comma-separated, space-separated, or an array of strings. Use # in tags. Caption under 2200 chars. Example: {"caption":"...","hashtags":"#a #b #c"}.',
        },
        { role: 'user', content: userBlock },
      ],
    }),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    console.error('OpenAI error', res.status, errText.slice(0, 500))
    return {
      content: null,
      mockReason: 'openai_http_error',
      openaiHttpStatus: res.status,
    }
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const rawContent = data.choices?.[0]?.message?.content
  if (!rawContent?.trim()) {
    return { content: null, mockReason: 'openai_empty_assistant_message' }
  }

  const parsed = parseAssistantToSocial(rawContent)
  if (!parsed.ok) {
    const maxRawLog = 8000
    const truncated =
      rawContent.length > maxRawLog ? `${rawContent.slice(0, maxRawLog)}…[truncated]` : rawContent
    console.error('[JifunzeAI generate-content]', {
      openai_parse_failed: true,
      failureReason: parsed.failureReason,
      rawAssistantLength: rawContent.length,
      rawAssistant: truncated,
    })
    return {
      content: null,
      mockReason: parsed.failureReason,
      assistantLength: rawContent.length,
    }
  }

  const { social, parsePath } = parsed
  return {
    content: social,
    mockReason: null,
    parseRecovery: parsePath !== 'direct' ? parsePath : undefined,
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const authResponse = await verifyAuthorizedUser(req)
  if (authResponse) return authResponse

  if (req.method === 'GET') {
    /** Always 200 so clients can tell “function reachable” vs LLM readiness (`ready`). */
    return json(generationHealth(), 200)
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  let parsedBody: unknown
  try {
    parsedBody = await req.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const body = parseBody(parsedBody)
  if (!body) {
    return json({ error: 'Missing or invalid topic' }, 400)
  }

  try {
    const openAi = await generateWithOpenAi(body)
    const fromModel = openAi.content
    const failReason = openAi.mockReason ?? 'unknown'

    if (!fromModel) {
      const logLine: Record<string, unknown> = {
        source: isGenerationProductionMode() ? 'openai_failed' : 'backend_mock',
        reason: failReason,
      }
      if (openAi.openaiHttpStatus != null) logLine.httpStatus = openAi.openaiHttpStatus
      if (openAi.assistantLength != null) logLine.assistantLength = openAi.assistantLength
      console.info('[JifunzeAI generate-content]', logLine)

      if (isGenerationProductionMode()) {
        return json({ reason: failReason }, 503)
      }
    } else {
      console.info('[JifunzeAI generate-content]', { source: 'backend_llm', reason: 'openai_ok' })
    }
    if (fromModel && openAi.parseRecovery) {
      console.info('[JifunzeAI generate-content]', { openai_parse_recovery: openAi.parseRecovery })
    }

    const social = fromModel ?? serverMock(body)
    const deliverySource: GenerationDeliverySource = fromModel ? 'backend_llm' : 'backend_mock'
    const responseBody: GenerationResponseBody = {
      caption: social.caption,
      hashtags: social.hashtags,
      source: deliverySource,
    }
    return json(responseBody)
  } catch {
    return json({ error: 'Generation service unavailable. Try again shortly.' }, 503)
  }
})
