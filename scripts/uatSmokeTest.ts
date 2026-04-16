/**
 * INTERNAL UAT smoke: sign in → bootstrap workspace → create brand → write/read learning_snapshots.
 *
 * Usage (from repo root):
 *   SMOKE_EMAIL=... SMOKE_PASSWORD=... npx tsx scripts/uatSmokeTest.ts
 *
 * Requires `.env` or env with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or SUPABASE_URL / SUPABASE_ANON_KEY).
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

function loadDotEnv(): void {
  const p = resolve(process.cwd(), '.env')
  if (!existsSync(p)) return
  const raw = readFileSync(p, 'utf8')
  for (const line of raw.split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq <= 0) continue
    const k = t.slice(0, eq).trim()
    let v = t.slice(eq + 1).trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1)
    }
    if (!process.env[k]) process.env[k] = v
  }
}

function supabaseUrl(): string {
  return process.env.VITE_SUPABASE_URL?.trim() || process.env.SUPABASE_URL?.trim() || ''
}

function supabaseAnon(): string {
  return process.env.VITE_SUPABASE_ANON_KEY?.trim() || process.env.SUPABASE_ANON_KEY?.trim() || ''
}

function isoNow(): string {
  return new Date().toISOString()
}

async function main(): Promise<void> {
  loadDotEnv()

  const url = supabaseUrl()
  const anon = supabaseAnon()
  const email = process.env.SMOKE_EMAIL?.trim()
  const password = process.env.SMOKE_PASSWORD?.trim()

  if (!url || !anon) {
    console.error('[JifunzeAI] uatSmokeTest: missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY')
    process.exit(1)
  }
  if (!email || !password) {
    console.error('[JifunzeAI] uatSmokeTest: set SMOKE_EMAIL and SMOKE_PASSWORD')
    process.exit(1)
  }

  const supabase = createClient(url, anon)
  console.log('[JifunzeAI] uatSmokeTest: signIn')
  const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({ email, password })
  if (signInErr || !signInData.session) {
    console.error('[JifunzeAI] uatSmokeTest: signIn failed', signInErr ?? 'no session')
    process.exit(1)
  }
  const uid = signInData.user.id
  console.log('[JifunzeAI] uatSmokeTest: signed in', { userId: uid })

  // Must match `DEFAULT_WORKSPACE_NAME` in `src/auth/AuthContext.tsx` (non-null workspace_name).
  const DEFAULT_WORKSPACE_NAME = 'Jifunze AI Workspace'
  console.log('[JifunzeAI] uatSmokeTest: bootstrap_my_workspace', { workspace_name: DEFAULT_WORKSPACE_NAME })
  const { data: tid, error: bootErr } = await supabase.rpc('bootstrap_my_workspace', {
    workspace_name: DEFAULT_WORKSPACE_NAME,
  })
  if (bootErr) {
    console.error('[JifunzeAI] uatSmokeTest: bootstrap failed', bootErr)
    process.exit(1)
  }
  const tenantId = tid != null ? String(tid) : ''
  if (!tenantId) {
    console.error('[JifunzeAI] uatSmokeTest: bootstrap returned empty tenant')
    process.exit(1)
  }
  console.log('[JifunzeAI] uatSmokeTest: tenant', { tenantId })

  const brandId = crypto.randomUUID()
  const brandName = `UAT Smoke ${brandId.slice(0, 8)}`
  console.log('[JifunzeAI] uatSmokeTest: insert brand', { brandId })
  const { error: brandErr } = await supabase
    .from('brands')
    .insert({
      id: brandId,
      tenant_id: tenantId,
      name: brandName,
      created_by: uid,
    })
    .select('id')
    .maybeSingle()
  if (brandErr) {
    console.error('[JifunzeAI] uatSmokeTest: brand insert failed', brandErr)
    process.exit(1)
  }

  const capturedAt = isoNow()
  const payload = {
    brandProfileId: brandId,
    capturedAt,
    snapshot: {
      id: 'uat-smoke-snapshot',
      brandProfileId: brandId,
      capturedAt,
      sampleCount: 0,
      weightedAvgEngagementRate: null,
      totals: {
        impressions: null,
        reach: null,
        clicks: null,
        likes: null,
        comments: null,
        shares: null,
        saves: null,
      },
    },
    insights: [] as unknown[],
    recommendations: [] as unknown[],
  }

  console.log('[JifunzeAI] uatSmokeTest: upsert learning_snapshots')
  const { error: snapErr } = await supabase
    .from('learning_snapshots')
    .upsert(
      {
        tenant_id: tenantId,
        brand_profile_id: brandId,
        payload,
        captured_at: capturedAt,
      },
      { onConflict: 'tenant_id,brand_profile_id' },
    )
    .select('tenant_id,brand_profile_id')
    .maybeSingle()
  if (snapErr) {
    console.error('[JifunzeAI] uatSmokeTest: learning_snapshots upsert failed', snapErr)
    process.exit(1)
  }

  const { data: readRow, error: readErr } = await supabase
    .from('learning_snapshots')
    .select('payload')
    .eq('tenant_id', tenantId)
    .eq('brand_profile_id', brandId)
    .maybeSingle()
  if (readErr || !readRow?.payload) {
    console.error('[JifunzeAI] uatSmokeTest: readback failed', readErr ?? 'empty payload')
    process.exit(1)
  }

  console.log('[JifunzeAI] uatSmokeTest: OK — learning snapshot round-trip verified')

  const { data: health, error: healthErr } = await supabase.rpc('uat_db_health_check')
  if (healthErr) {
    console.warn('[JifunzeAI] uatSmokeTest: uat_db_health_check unavailable (apply migrations?)', healthErr.message)
  } else {
    console.log('[JifunzeAI] uatSmokeTest: uat_db_health_check', health)
  }

  await supabase.auth.signOut()
  console.log('[JifunzeAI] uatSmokeTest: done')
}

main().catch((e) => {
  console.error('[JifunzeAI] uatSmokeTest: fatal', e)
  process.exit(1)
})
