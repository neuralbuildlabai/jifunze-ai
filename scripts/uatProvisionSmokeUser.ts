/**
 * Ensure credentials for live UAT / `uat:smoke`:
 * 1) signIn if user exists
 * 2) else `auth.admin.createUser` when `SUPABASE_SERVICE_ROLE_KEY` is set (confirmed email)
 * 3) else anon `signUp` (requires project settings that return a session or disable confirmations)
 *
 * Writes `.env.smoke.local` (gitignored) with SMOKE_EMAIL / SMOKE_PASSWORD for Playwright live UAT.
 *
 * Usage:
 *   npx tsx scripts/uatProvisionSmokeUser.ts
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { assertUatSupabaseTarget } from './guardUatSupabaseTarget.ts'

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

function strongPassword(): string {
  const base = process.env.SMOKE_PASSWORD?.trim()
  if (base && base.length >= 8) return base
  return `JifUat-${Date.now()}-x9!Aa`
}

function writeSmokeFile(email: string, password: string): void {
  const esc = (s: string) => (s.includes('\n') || s.includes('"') ? `"${s.replace(/"/g, '\\"')}"` : s)
  writeFileSync(
    resolve(process.cwd(), '.env.smoke.local'),
    `SMOKE_EMAIL=${esc(email)}\nSMOKE_PASSWORD=${esc(password)}\n`,
    { mode: 0o600 },
  )
  console.log('[uatProvisionSmokeUser] wrote .env.smoke.local')
}

async function main(): Promise<void> {
  loadDotEnv()
  assertUatSupabaseTarget('uatProvisionSmokeUser')
  const url = supabaseUrl()
  const anon = supabaseAnon()
  if (!url || !anon) {
    console.error('[uatProvisionSmokeUser] missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY')
    process.exit(1)
  }

  let email = process.env.SMOKE_EMAIL?.trim() || ''
  if (!email) {
    email = `jifunze.uat.provision.${Date.now()}@mailinator.com`
    process.env.SMOKE_EMAIL = email
  }
  const password = strongPassword()
  process.env.SMOKE_PASSWORD = password

  const supabase = createClient(url, anon)
  console.log('[uatProvisionSmokeUser] attempting signIn', { email: email.replace(/(^.).*(@.*$)/, '$1***$2') })

  async function finalizeSession(): Promise<void> {
    await supabase.auth.signOut()
    writeSmokeFile(email, password)
  }

  const signIn = await supabase.auth.signInWithPassword({ email, password })
  if (!signIn.error && signIn.data.session) {
    console.log('[uatProvisionSmokeUser] signIn OK (user exists)')
    await finalizeSession()
    return
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (serviceKey) {
    console.log('[uatProvisionSmokeUser] attempting auth.admin.createUser (service role present)')
    const admin = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
    const { error: adminErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })
    if (adminErr && !/already|registered|exists/i.test(adminErr.message)) {
      console.error('[uatProvisionSmokeUser] admin createUser failed', adminErr.message)
      process.exit(1)
    }
    const afterAdmin = await supabase.auth.signInWithPassword({ email, password })
    if (!afterAdmin.error && afterAdmin.data.session) {
      console.log('[uatProvisionSmokeUser] OK after admin provisioning')
      await finalizeSession()
      return
    }
    console.error('[uatProvisionSmokeUser] signIn after admin failed', afterAdmin.error?.message)
    process.exit(1)
  }

  console.log('[uatProvisionSmokeUser] signIn failed; attempting anon signUp', signIn.error?.message)
  const signUp = await supabase.auth.signUp({ email, password })
  if (signUp.error) {
    console.error('[uatProvisionSmokeUser] signUp failed', signUp.error.message)
    process.exit(1)
  }
  if (!signUp.data.session) {
    console.error(
      '[uatProvisionSmokeUser] signUp returned no session. Options: set SUPABASE_SERVICE_ROLE_KEY for admin provisioning, disable email confirmations for this domain, or confirm the inbox manually.',
    )
    process.exit(1)
  }
  console.log('[uatProvisionSmokeUser] signUp OK; session established')
  await finalizeSession()
}

main().catch((e) => {
  console.error('[uatProvisionSmokeUser] fatal', e)
  process.exit(1)
})
