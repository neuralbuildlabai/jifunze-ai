/**
 * End-to-end proof that authenticated learners can INSERT + SELECT `teaching_learning_events`
 * using the same anon-key + session path as the browser client (RLS policies apply).
 *
 * Loads `.env` then `.env.smoke.local` (see `uatProvisionSmokeUser.ts`).
 * Requires: VITE_SUPABASE_URL (or SUPABASE_URL) + VITE_SUPABASE_ANON_KEY + SMOKE_EMAIL + SMOKE_PASSWORD.
 *
 * Usage: npx tsx scripts/prove-teaching-learning-events-e2e.ts
 */
import { createClient } from '@supabase/supabase-js'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function loadDotEnv(): void {
  for (const rel of ['.env', '.env.smoke.local']) {
    const p = resolve(process.cwd(), rel)
    if (!existsSync(p)) continue
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
}

function supabaseUrl(): string {
  return process.env.VITE_SUPABASE_URL?.trim() || process.env.SUPABASE_URL?.trim() || ''
}

function supabaseAnon(): string {
  return process.env.VITE_SUPABASE_ANON_KEY?.trim() || process.env.SUPABASE_ANON_KEY?.trim() || ''
}

async function main(): Promise<void> {
  loadDotEnv()
  const url = supabaseUrl()
  const anon = supabaseAnon()
  const email = process.env.SMOKE_EMAIL?.trim() || ''
  const password = process.env.SMOKE_PASSWORD?.trim() || ''

  if (!url || !anon) {
    console.error('[prove-teaching-events] BLOCKING — missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY')
    process.exit(2)
  }
  if (!email || !password) {
    console.error('[prove-teaching-events] BLOCKING — missing SMOKE_EMAIL / SMOKE_PASSWORD (run npm run uat:provision or set env)')
    process.exit(3)
  }

  const supabase = createClient(url, anon)
  const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({ email, password })
  if (authErr || !authData.user?.id) {
    console.error('[prove-teaching-events] BLOCKING — sign-in failed:', authErr?.message ?? 'no user')
    process.exit(4)
  }

  const userId = authData.user.id
  const clientSignalId = `e2e-proof-${Date.now()}-${Math.random().toString(16).slice(2)}`
  const createdAtClient = new Date().toISOString()
  const payload = {
    route: '/learning/workspace',
    proof: true,
    client_signal_id: clientSignalId,
    created_at_client: createdAtClient,
  }

  const { error: insertErr } = await supabase.from('teaching_learning_events').insert({
    user_id: userId,
    kind: 'signed_in_workspace_entry',
    payload,
    client_signal_id: clientSignalId,
  })
  if (insertErr) {
    console.error('[prove-teaching-events] BLOCKING — insert denied/failed:', insertErr.message)
    process.exit(5)
  }

  const { data: rows, error: selErr } = await supabase
    .from('teaching_learning_events')
    .select('kind,payload,client_signal_id')
    .eq('client_signal_id', clientSignalId)
    .limit(1)

  if (selErr) {
    console.error('[prove-teaching-events] BLOCKING — select failed:', selErr.message)
    process.exit(6)
  }
  const row = rows?.[0]
  if (!row || row.kind !== 'signed_in_workspace_entry') {
    console.error('[prove-teaching-events] BLOCKING — row not found after insert (RLS/read path)')
    process.exit(7)
  }

  const secondSignal = `${clientSignalId}-checkpoint`
  const { error: cpErr } = await supabase.from('teaching_learning_events').insert({
    user_id: userId,
    kind: 'checkpoint_attempt',
    payload: {
      checkpointId: 'e2e-proof-checkpoint',
      client_signal_id: secondSignal,
      created_at_client: new Date().toISOString(),
    },
    client_signal_id: secondSignal,
  })
  if (cpErr) {
    console.error('[prove-teaching-events] BLOCKING — checkpoint_attempt insert failed:', cpErr.message)
    process.exit(8)
  }

  const { data: cpRows, error: cpSelErr } = await supabase
    .from('teaching_learning_events')
    .select('kind')
    .eq('client_signal_id', secondSignal)
    .limit(1)
  if (cpSelErr || !cpRows?.[0] || cpRows[0].kind !== 'checkpoint_attempt') {
    console.error('[prove-teaching-events] BLOCKING — checkpoint_attempt verification failed')
    process.exit(9)
  }

  console.log('[prove-teaching-events] OK — verified signed_in_workspace_entry + checkpoint_attempt persistence for authenticated user session')
  console.log(`[prove-teaching-events] user_id=${userId} · client_signal_id=${clientSignalId}`)
}

main().catch((e) => {
  console.error('[prove-teaching-events] unexpected:', e)
  process.exit(99)
})
