/**
 * Instagram publishing connector — the `publish` action of the autonomy pipeline.
 *
 * Posts a Reel (or image) to the Jifunze Instagram Business account via the
 * Instagram API (Instagram Login). Two-step flow per Meta's content-publishing
 * spec: create a media container, poll until it finishes processing, then
 * publish it.
 *
 * Base host: graph.instagram.com. Verified against Meta docs 2026-08-18.
 *
 * Invocation:
 *   POST /functions/v1/publish-instagram
 *   Header: x-publish-secret: <PUBLISH_SECRET>
 *   Body:   { "video_url": "https://...mp4", "caption": "...", "media_type": "REELS" }
 *        or { "image_url": "https://...jpg", "caption": "...", "media_type": "IMAGE" }
 *
 * `verify_jwt` is false (called by cron / the pipeline worker, no user JWT);
 * the shared secret is the gate.
 *
 * Secrets (set via `supabase secrets set`):
 *   IG_ACCESS_TOKEN     long-lived Instagram token (never logged)
 *   IG_USER_ID          17841433836747759
 *   PUBLISH_SECRET      shared secret gating this endpoint
 *
 * SAFETY: this function actually posts in public. It refuses to run unless
 * IG_PUBLISH_ENABLED === "true", so deploying it does not by itself make the
 * account start posting — a human flips that flag when ready. Every request is
 * also idempotency-checked by the caller-supplied `idempotency_key`.
 */
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

const GRAPH = 'https://graph.instagram.com/v21.0'
const STATUS_GRAPH = 'https://graph.instagram.com'
const MAX_POLL_ATTEMPTS = 30      // ~5 min at 10s spacing; reels can take a while to transcode
const POLL_INTERVAL_MS = 10_000
const REQUEST_TIMEOUT_MS = 30_000

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-publish-secret',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

/** Redact anything token-shaped so a token can never reach logs. */
function redact(s: string): string {
  return s.replace(/access_token=[^&\s"]+/gi, 'access_token=REDACTED')
          .replace(/IG[A-Za-z0-9._-]{20,}/g, 'REDACTED_TOKEN')
}

async function igFetch(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

type PublishBody = {
  video_url?: string
  image_url?: string
  caption?: string
  media_type?: 'REELS' | 'IMAGE'
  idempotency_key?: string
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  // --- gate --------------------------------------------------------------
  const publishSecret = Deno.env.get('PUBLISH_SECRET')
  if (!publishSecret) return json({ error: 'Server misconfigured: PUBLISH_SECRET unset' }, 500)
  if (req.headers.get('x-publish-secret') !== publishSecret) return json({ error: 'Unauthorized' }, 401)

  // --- kill switch: must be explicitly enabled to post in public ---------
  if (Deno.env.get('IG_PUBLISH_ENABLED') !== 'true') {
    return json({ ok: false, skipped: true, reason: 'IG_PUBLISH_ENABLED is not "true" — publishing is disabled' }, 200)
  }

  const token = Deno.env.get('IG_ACCESS_TOKEN')
  const igUserId = Deno.env.get('IG_USER_ID')
  if (!token || !igUserId) return json({ error: 'Server misconfigured: IG credentials unset' }, 500)

  let body: PublishBody
  try { body = await req.json() } catch { return json({ error: 'Invalid JSON body' }, 400) }

  const mediaType = body.media_type ?? (body.video_url ? 'REELS' : 'IMAGE')
  const caption = (body.caption ?? '').slice(0, 2200) // IG caption hard limit
  if (mediaType === 'REELS' && !body.video_url) return json({ error: 'video_url required for REELS' }, 400)
  if (mediaType === 'IMAGE' && !body.image_url) return json({ error: 'image_url required for IMAGE' }, 400)

  // --- idempotency: never double-post the same item ----------------------
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  const admin = supabaseUrl && serviceKey ? createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } }) : null
  const idemKey = body.idempotency_key?.trim()
  if (admin && idemKey) {
    const { data: existing } = await admin
      .from('instagram_publish_log')
      .select('ig_media_id, status')
      .eq('idempotency_key', idemKey)
      .maybeSingle()
    if (existing?.status === 'published') {
      return json({ ok: true, deduped: true, ig_media_id: existing.ig_media_id }, 200)
    }
  }

  try {
    // --- step 1: create container ---------------------------------------
    const createParams = new URLSearchParams({ caption, access_token: token })
    if (mediaType === 'REELS') { createParams.set('media_type', 'REELS'); createParams.set('video_url', body.video_url!) }
    else { createParams.set('image_url', body.image_url!) }

    const createRes = await igFetch(`${GRAPH}/${igUserId}/media`, { method: 'POST', body: createParams })
    const createData = await createRes.json()
    if (!createRes.ok || !createData.id) {
      console.error('[publish-instagram] create failed', redact(JSON.stringify(createData)))
      return json({ error: 'container_create_failed', detail: createData.error?.message ?? 'unknown' }, 502)
    }
    const containerId = createData.id as string

    // --- step 2: poll until FINISHED (reels transcode async) ------------
    let statusCode = 'IN_PROGRESS'
    for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
      await sleep(POLL_INTERVAL_MS)
      const statusRes = await igFetch(`${STATUS_GRAPH}/${containerId}?fields=status_code&access_token=${encodeURIComponent(token)}`)
      const statusData = await statusRes.json()
      statusCode = statusData.status_code ?? 'IN_PROGRESS'
      if (statusCode === 'FINISHED') break
      if (statusCode === 'ERROR' || statusCode === 'EXPIRED') {
        console.error('[publish-instagram] container bad status', statusCode)
        return json({ error: 'container_processing_failed', status_code: statusCode, container_id: containerId }, 502)
      }
    }
    if (statusCode !== 'FINISHED') {
      return json({ error: 'container_timeout', status_code: statusCode, container_id: containerId }, 504)
    }

    // --- step 3: publish -------------------------------------------------
    const publishParams = new URLSearchParams({ creation_id: containerId, access_token: token })
    const pubRes = await igFetch(`${GRAPH}/${igUserId}/media_publish`, { method: 'POST', body: publishParams })
    const pubData = await pubRes.json()
    if (!pubRes.ok || !pubData.id) {
      console.error('[publish-instagram] publish failed', redact(JSON.stringify(pubData)))
      return json({ error: 'publish_failed', detail: pubData.error?.message ?? 'unknown', container_id: containerId }, 502)
    }
    const mediaId = pubData.id as string

    if (admin && idemKey) {
      await admin.from('instagram_publish_log').upsert({
        idempotency_key: idemKey,
        ig_media_id: mediaId,
        container_id: containerId,
        media_type: mediaType,
        status: 'published',
        published_at: new Date().toISOString(),
      }, { onConflict: 'idempotency_key' })
    }

    console.info('[publish-instagram] published', { ig_media_id: mediaId, media_type: mediaType })
    return json({ ok: true, ig_media_id: mediaId, container_id: containerId }, 200)
  } catch (err) {
    const detail = err instanceof Error && err.name === 'AbortError' ? 'timeout' : 'exception'
    console.error('[publish-instagram]', detail)
    return json({ error: 'publish_exception', detail }, 500)
  }
})
