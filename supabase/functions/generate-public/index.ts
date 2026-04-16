import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

type PublicPlatform = 'instagram' | 'x' | 'linkedin' | 'facebook'
type PublicTone = 'professional' | 'friendly' | 'bold' | 'educational'

type PublicGenerateRequest = {
  topic: string
  platform: PublicPlatform
  tone: PublicTone
}

type PublicGenerateResponse = {
  caption: string
  hashtags: string
  source: 'backend_llm'
}

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
      error: 'Free daily limit reached. Create a free account to save and automate with Jifunze.',
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
    throw new Error('missing_supabase_service_role')
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
    throw error
  }

  const row = Array.isArray(data) ? (data[0] as { allowed?: boolean; reason?: string } | undefined) : undefined
  if (!row?.allowed) {
    return {
      ok: false,
      error: 'Free daily limit reached. Create a free account to save and automate with Jifunze.',
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

function parseAssistantToPublic(rawContent: string): PublicGenerateResponse | null {
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
    return { caption, hashtags: hashtags.trim(), source: 'backend_llm' }
  }
  return null
}

async function generatePublicContent(input: PublicGenerateRequest): Promise<PublicGenerateResponse> {
  const apiKey = Deno.env.get('OPENAI_API_KEY')?.trim()
  if (!apiKey) {
    throw new Error('Public generation is temporarily unavailable. Please create a free account to continue.')
  }
  const model = Deno.env.get('OPENAI_MODEL')?.trim() || 'gpt-4o-mini'

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      max_tokens: 220,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'Write one high-quality social caption. Return ONLY JSON: {"caption":"...","hashtags":"#a #b #c"}. Keep caption concise and practical. Match requested platform and tone.',
        },
        {
          role: 'user',
          content: `Topic: ${input.topic}\nPlatform: ${input.platform}\nTone: ${input.tone}`,
        },
      ],
    }),
  })

  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    console.error('[JifunzeAI generate-public] OpenAI error', res.status, msg.slice(0, 400))
    throw new Error('Generation service is busy. Please try again shortly or create a free account.')
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const raw = data.choices?.[0]?.message?.content?.trim()
  if (!raw) throw new Error('Generation service returned an empty response.')

  const parsed = parseAssistantToPublic(raw)
  if (!parsed) {
    console.error('[JifunzeAI generate-public] parse_failed', { rawAssistant: raw.slice(0, 1200) })
    throw new Error('Could not parse generation output. Please try again.')
  }
  return parsed
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
    const message =
      e instanceof Error && e.message
        ? e.message
        : 'Public generation is unavailable right now. Please try again shortly.'
    return json({ error: message, reason: 'public_generation_failed', signup_required: true }, 503)
  }
})
