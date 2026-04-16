/**
 * Server-side social caption generation. Set secrets: OPENAI_API_KEY (optional),
 * OPENAI_MODEL (optional, default gpt-4o-mini). Without OPENAI_API_KEY, returns a deterministic mock.
 *
 * **UAT / security:** deploy with `verify_jwt = true` in `config.toml` (default for this repo).
 * If you ever set `verify_jwt = false` for local debugging, treat the deployment as insecure: restrict
 * network access, rotate keys, and never use that configuration for external UAT or production.
 * Supabase does not expose the effective `verify_jwt` flag to this runtime; operators must confirm
 * Dashboard / CLI settings match this policy.
 */
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

type GenerateContentRequestBody = {
  topic: string
  context?: string
  source?: 'manual_topic' | 'signal' | 'opportunity'
  external_signal_id?: string
  content_opportunity_id?: string
}

type SocialContent = { caption: string; hashtags: string }

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
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

function extractSocialFromOpenAiContent(content: string): SocialContent | null {
  const trimmed = content.trim()
  try {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>
    const caption = parsed.caption
    const hashtags = parsed.hashtags
    if (typeof caption !== 'string' || typeof hashtags !== 'string') return null
    const c = caption.trim()
    const h = hashtags.trim()
    if (!c || !h) return null
    return { caption: c, hashtags: h }
  } catch {
    return null
  }
}

async function generateWithOpenAi(body: GenerateContentRequestBody): Promise<SocialContent | null> {
  const apiKey = Deno.env.get('OPENAI_API_KEY')
  if (!apiKey) return null

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
            'You write short social posts. Reply with ONLY valid JSON: {"caption":"...","hashtags":"#a #b #c"}. Caption under 2200 chars. Hashtags space-separated, include #.',
        },
        { role: 'user', content: userBlock },
      ],
    }),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    console.error('OpenAI error', res.status, errText.slice(0, 500))
    return null
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const content = data.choices?.[0]?.message?.content
  if (!content) return null
  return extractSocialFromOpenAiContent(content)
}

Deno.serve(async (req) => {
  // If this function is accidentally deployed with verify_jwt=false, add a temporary secret
  // `EDGE_WARN_INSECURE_JWT=1` in the dashboard to log once per cold start during investigation.
  if (Deno.env.get('EDGE_WARN_INSECURE_JWT') === '1') {
    console.warn(
      '[JifunzeAI] generate-content: EDGE_WARN_INSECURE_JWT is set — confirm verify_jwt policy before UAT.',
    )
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
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

  const fromModel = await generateWithOpenAi(body)
  const out = fromModel ?? serverMock(body)
  return json(out)
})
