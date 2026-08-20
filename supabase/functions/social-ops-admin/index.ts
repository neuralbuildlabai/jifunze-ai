/**
 * social-ops-admin — the only server-side entry point the /admin/social-ops console may call.
 *
 * Why it exists: the browser must never hold a platform credential, and a browser button must
 * never be able to read or mutate a production secret. Everything privileged happens here, behind
 * three checks in this order:
 *
 *   1. A valid Supabase session (Authorization: Bearer <access_token>).
 *   2. `public.is_admin()` evaluated SERVER-SIDE for that user — the browser's idea of its own
 *      tier is never trusted.
 *   3. A rate limit, so a held-down refresh button cannot hammer a platform API.
 *
 * What it will NOT do, by design:
 *   - return any secret value, or any prefix of one
 *   - change IG_PUBLISH_ENABLED, or any other kill switch (those are deliberate CLI actions)
 *   - publish anything
 *
 * Responses never echo a token, and every error is reduced to a short safe summary.
 */
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

type Action = 'refresh_metrics' | 'publish_state'

type Body = { action?: Action }

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

/** Minimum seconds between manual refreshes, across all operators. */
const REFRESH_COOLDOWN_SECONDS = 300

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'content-type': 'application/json' },
  })

/** Reduce anything thrown into a message safe to return and to log. */
function safeSummary(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err)
  return raw
    .replace(/(access_token|client_secret|refresh_token|api[_-]?key|bearer)\s*[=:]\s*\S+/gi, '$1=[redacted]')
    .replace(/\b[A-Za-z0-9_-]{40,}\b/g, '[redacted]')
    .slice(0, 300)
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })
  if (req.method !== 'POST') return json({ ok: false, message: 'POST only' }, 405)

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return json({ ok: false, message: 'Server is not configured.' }, 500)
  }

  // --- 1. authenticate -----------------------------------------------------
  const authHeader = req.headers.get('Authorization') ?? ''
  const token = authHeader.replace(/^Bearer\s+/i, '').trim()
  if (!token) return json({ ok: false, message: 'Not signed in.' }, 401)

  const asCaller = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false },
  })

  const { data: userData, error: userError } = await asCaller.auth.getUser()
  if (userError || !userData?.user) {
    return json({ ok: false, message: 'Not signed in.' }, 401)
  }

  // --- 2. authorize, server-side -------------------------------------------
  const { data: isAdmin, error: adminError } = await asCaller.rpc('is_admin')
  if (adminError) {
    console.error(JSON.stringify({ event: 'social_ops_admin.authz_error', detail: safeSummary(adminError) }))
    return json({ ok: false, message: 'Could not verify authorization.' }, 500)
  }
  if (isAdmin !== true) {
    console.warn(JSON.stringify({ event: 'social_ops_admin.forbidden', user: userData.user.id }))
    return json({ ok: false, message: 'Not authorized.' }, 403)
  }

  let body: Body = {}
  try {
    body = (await req.json()) as Body
  } catch {
    return json({ ok: false, message: 'Body must be JSON.' }, 400)
  }
  const action: Action = body.action ?? 'publish_state'

  const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })

  // --- publish_state: booleans only, never a secret value ------------------
  if (action === 'publish_state') {
    return json({
      ok: true,
      // Presence and truthiness only. No value, no prefix, no length.
      igPublishEnabled: Deno.env.get('IG_PUBLISH_ENABLED') === 'true',
      igCredentialsPresent: Boolean(Deno.env.get('IG_ACCESS_TOKEN') && Deno.env.get('IG_USER_ID')),
      publishSecretPresent: Boolean(Deno.env.get('PUBLISH_SECRET')),
      message: 'Kill-switch state read. This endpoint cannot change it.',
    })
  }

  // --- refresh_metrics -----------------------------------------------------
  if (action !== 'refresh_metrics') return json({ ok: false, message: 'Unknown action.' }, 400)

  // --- 3. rate limit -------------------------------------------------------
  const cutoff = new Date(Date.now() - REFRESH_COOLDOWN_SECONDS * 1000).toISOString()
  const { data: recent, error: recentError } = await admin
    .from('sync_runs')
    .select('id, started_at')
    .gte('started_at', cutoff)
    .like('id', 'manual-%')
    .limit(1)
  if (recentError) {
    return json({ ok: false, message: safeSummary(recentError) }, 500)
  }
  if (recent && recent.length) {
    return json(
      {
        ok: false,
        message: `A manual refresh ran less than ${REFRESH_COOLDOWN_SECONDS / 60} minutes ago.`,
        retryAfterSeconds: REFRESH_COOLDOWN_SECONDS,
      },
      429,
    )
  }

  const runId = `manual-${new Date().toISOString()}`
  const startedAt = new Date().toISOString()
  await admin.from('sync_runs').insert({ id: runId, dry_run: false, status: 'running', started_at: startedAt })

  const refreshed: string[] = []
  const skipped: Array<{ platform: string; reason: string }> = []

  // Instagram is the only platform whose credentials live in this project's secret store.
  const igToken = Deno.env.get('IG_ACCESS_TOKEN')
  const igUserId = Deno.env.get('IG_USER_ID')

  if (igToken && igUserId) {
    try {
      const res = await fetch(
        `https://graph.facebook.com/v21.0/${igUserId}?fields=followers_count&access_token=${encodeURIComponent(igToken)}`,
      )
      const payload = (await res.json()) as { followers_count?: number; error?: { message?: string } }
      if (!res.ok) throw new Error(payload.error?.message ?? `HTTP ${res.status}`)

      const now = new Date()
      const windowStart = new Date(now)
      windowStart.setUTCMinutes(0, 0, 0)
      windowStart.setUTCHours(Math.floor(windowStart.getUTCHours() / 2) * 2)

      await admin.from('social_metric_snapshots').upsert(
        {
          platform: 'instagram',
          subject_type: 'account',
          subject_id: 'instagram',
          window_start: windowStart.toISOString(),
          captured_at: now.toISOString(),
          followers: typeof payload.followers_count === 'number' ? payload.followers_count : null,
          sync_run_id: runId,
        },
        { onConflict: 'platform,subject_type,subject_id,window_start' },
      )
      await admin.from('social_account_connections').upsert(
        {
          platform: 'instagram',
          last_sync_attempt_at: now.toISOString(),
          last_successful_sync_at: now.toISOString(),
          last_sync_status: 'ok',
          last_error_summary: null,
          last_sync_run_id: runId,
        },
        { onConflict: 'platform' },
      )
      refreshed.push('instagram')
    } catch (err) {
      const detail = safeSummary(err)
      console.error(JSON.stringify({ event: 'social_ops_admin.refresh_error', platform: 'instagram', detail }))
      await admin.from('social_account_connections').upsert(
        {
          platform: 'instagram',
          last_sync_attempt_at: new Date().toISOString(),
          last_sync_status: 'failed',
          last_error_summary: detail,
          last_sync_run_id: runId,
        },
        { onConflict: 'platform' },
      )
      skipped.push({ platform: 'instagram', reason: detail })
    }
  } else {
    skipped.push({ platform: 'instagram', reason: 'No server-side Instagram credentials.' })
  }

  // Everything else needs credentials this project does not hold yet; the scheduled job that runs
  // with the full environment is the place those get refreshed.
  for (const platform of ['facebook', 'threads', 'tiktok', 'youtube', 'linkedin', 'x', 'pinterest', 'telegram']) {
    skipped.push({ platform, reason: 'No server-side credential in this environment.' })
  }

  await admin
    .from('sync_runs')
    .update({
      finished_at: new Date().toISOString(),
      status: refreshed.length ? 'ok' : 'failed',
      platforms_ok: refreshed.length,
      platforms_skipped: skipped.length,
      platforms_failed: 0,
    })
    .eq('id', runId)

  console.log(
    JSON.stringify({ event: 'social_ops_admin.refresh_done', runId, refreshed: refreshed.length, skipped: skipped.length }),
  )

  return json({
    ok: refreshed.length > 0,
    runId,
    refreshed,
    skipped,
    message: refreshed.length
      ? `Refreshed ${refreshed.join(', ')}.`
      : 'Nothing could be refreshed from this environment — no platform credentials are present.',
  })
})
