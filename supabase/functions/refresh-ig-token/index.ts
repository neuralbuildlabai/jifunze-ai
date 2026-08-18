/**
 * Instagram long-lived token refresh.
 *
 * Instagram-Login long-lived tokens last ~60 days and can be refreshed any time
 * after they are 24h old, extending another ~60 days. Run this on a cron
 * (e.g. weekly) so the token never lapses and the publisher never silently dies.
 *
 * Because Edge Function secrets cannot be rewritten from inside a function, this
 * does NOT overwrite IG_ACCESS_TOKEN itself. It fetches a fresh token, records
 * its expiry in `instagram_token_state`, and — crucially — returns whether a
 * human/rotation step is needed. Two modes:
 *
 *   - report mode (default): fetch a refreshed token, store only its expiry +
 *     a redacted fingerprint in Postgres, and alert when expiry is near. The
 *     actual new token value is returned ONCE in the response for the operator
 *     to place into secrets. It is never logged.
 *
 * Invocation:
 *   POST /functions/v1/refresh-ig-token   Header: x-publish-secret: <PUBLISH_SECRET>
 *
 * Set `verify_jwt=false`; the shared secret gates it.
 */
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

const REFRESH_URL = 'https://graph.instagram.com/refresh_access_token'

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-publish-secret',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const json = (d: unknown, s = 200) =>
  new Response(JSON.stringify(d), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

/** Last 6 chars only — enough to confirm a rotation happened, reveals nothing usable. */
const fingerprint = (t: string) => `...${t.slice(-6)}`

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const publishSecret = Deno.env.get('PUBLISH_SECRET')
  if (!publishSecret) return json({ error: 'Server misconfigured' }, 500)
  if (req.headers.get('x-publish-secret') !== publishSecret) return json({ error: 'Unauthorized' }, 401)

  const token = Deno.env.get('IG_ACCESS_TOKEN')
  if (!token) return json({ error: 'IG_ACCESS_TOKEN unset' }, 500)

  try {
    const url = `${REFRESH_URL}?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`
    const res = await fetch(url)
    const data = await res.json()
    if (!res.ok || !data.access_token) {
      console.error('[refresh-ig-token] refresh failed', data.error?.message ?? 'unknown')
      return json({ error: 'refresh_failed', detail: data.error?.message ?? 'unknown' }, 502)
    }

    const newToken = data.access_token as string
    const expiresInSec = Number(data.expires_in ?? 0)
    const expiresAt = new Date(Date.now() + expiresInSec * 1000).toISOString()

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (supabaseUrl && serviceKey) {
      const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })
      await admin.from('instagram_token_state').upsert({
        id: 'jifunze',
        expires_at: expiresAt,
        fingerprint: fingerprint(newToken),
        refreshed_at: new Date().toISOString(),
      }, { onConflict: 'id' })
    }

    const rotated = fingerprint(newToken) !== fingerprint(token)
    console.info('[refresh-ig-token] ok', { expires_at: expiresAt, rotated })

    // Return the new token value ONCE so the operator can update the secret.
    // Not logged anywhere. If the fingerprint is unchanged, no action needed.
    return json({
      ok: true,
      expires_at: expiresAt,
      rotated,
      action_required: rotated,
      new_token: rotated ? newToken : undefined,
      note: rotated
        ? 'Update the IG_ACCESS_TOKEN secret with new_token, then redeploy publish-instagram.'
        : 'Token still current; nothing to do.',
    })
  } catch {
    return json({ error: 'refresh_exception' }, 500)
  }
})
