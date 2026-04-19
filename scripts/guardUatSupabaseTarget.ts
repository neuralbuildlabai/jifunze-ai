/**
 * Prevents accidental live UAT / provisioning against the wrong Supabase project.
 *
 * Set `JIFUNZE_UAT_SUPABASE_PROJECT_REF` to the project ref from the Dashboard URL
 * (the subdomain before `.supabase.co`), and ensure `VITE_SUPABASE_URL` / `SUPABASE_URL`
 * points at the same project.
 *
 * Escape hatch (local Supabase, disposable sandboxes): `JIFUNZE_ALLOW_UAT_NONMATCH=1`
 */
import { URL } from 'node:url'

export function assertUatSupabaseTarget(label: string): void {
  if (process.env.JIFUNZE_ALLOW_UAT_NONMATCH === '1') {
    console.warn(`[uat-target] ${label}: JIFUNZE_ALLOW_UAT_NONMATCH=1 — skipping project ref check`)
    return
  }

  const urlStr =
    process.env.VITE_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim() ||
    ''
  const expected = process.env.JIFUNZE_UAT_SUPABASE_PROJECT_REF?.trim()

  if (!expected) {
    console.error(
      `[uat-target] ${label}: set JIFUNZE_UAT_SUPABASE_PROJECT_REF to your Supabase project ref (see .env.example),\n` +
        `  or set JIFUNZE_ALLOW_UAT_NONMATCH=1 only for intentional non-production targets.`,
    )
    process.exit(1)
  }

  if (!urlStr) {
    console.error(`[uat-target] ${label}: missing VITE_SUPABASE_URL / SUPABASE_URL`)
    process.exit(1)
  }

  let host = ''
  try {
    host = new URL(urlStr).hostname.toLowerCase()
  } catch {
    console.error(`[uat-target] ${label}: invalid Supabase URL`)
    process.exit(1)
  }

  if (host === 'localhost' || host.startsWith('127.') || host.endsWith('.local')) {
    console.warn(
      `[uat-target] ${label}: URL host "${host}" is non-hosted; if this is wrong, stop and fix .env.\n` +
        `  (Set JIFUNZE_ALLOW_UAT_NONMATCH=1 to silence when using local Supabase intentionally.)`,
    )
    return
  }

  const actual = host.split('.')[0] ?? ''
  if (actual !== expected) {
    console.error(
      `[uat-target] ${label}: Supabase URL project ref "${actual}" does not match JIFUNZE_UAT_SUPABASE_PROJECT_REF="${expected}".\n` +
        `  Fix .env / VITE_SUPABASE_URL or update the expected ref.`,
    )
    process.exit(1)
  }
}
