/**
 * Startup validation for INTERNAL UAT: required Vite env keys and consistency checks.
 * Does not log secret values.
 */

import { isSupabaseConfigured } from '../config/supabaseEnv'

export type EnvCheckResult = {
  ok: boolean
  missing: string[]
  warnings: string[]
  /** Non-sensitive hints for operators (e.g. mode requires URL). */
  hints: string[]
}

const REQUIRED_KEYS = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_CONTENT_MODE',
  'VITE_SIGNAL_MODE',
] as const

/**
 * SECURITY: read every key **statically**. Indexing `import.meta.env` with a dynamic key
 * (`import.meta.env[key]`) defeats Vite's per-key `define` replacement and makes Vite emit the
 * **entire** env record — every `VITE_*` value — as a literal object into the public browser
 * bundle. That is how `VITE_MAINTENANCE_BYPASS_TOKEN` ended up readable in `dist/` (see
 * `docs/social/SECURITY_AND_CHANGE_PROVENANCE_REVIEW_2026-08-20.md`). Only add keys here that are
 * safe to publish. Do not reintroduce dynamic indexing.
 */
const PUBLIC_ENV: Record<string, string | undefined> = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  VITE_CONTENT_MODE: import.meta.env.VITE_CONTENT_MODE,
  VITE_SIGNAL_MODE: import.meta.env.VITE_SIGNAL_MODE,
  VITE_SIGNAL_INGESTION_URL: import.meta.env.VITE_SIGNAL_INGESTION_URL,
}

function raw(key: string): string | undefined {
  const v = PUBLIC_ENV[key]
  if (typeof v !== 'string') return undefined
  const t = v.trim()
  return t || undefined
}

function isValidContentMode(m: string): boolean {
  return m === 'mock' || m === 'http'
}

function isValidSignalMode(m: string): boolean {
  return m === 'mock' || m === 'remote'
}

export function validateStartupEnv(): EnvCheckResult {
  const missing: string[] = []
  const warnings: string[] = []
  const hints: string[] = []

  const supabaseUrl = raw('VITE_SUPABASE_URL')
  const supabaseAnon = raw('VITE_SUPABASE_ANON_KEY')
  const supabasePartial = Boolean(supabaseUrl || supabaseAnon) && !(supabaseUrl && supabaseAnon)

  // Local demo / no-backend: when Supabase is completely unset, skip strict mode so the in-memory path works.
  if (!supabaseUrl && !supabaseAnon) {
    return { ok: true, missing: [], warnings: [], hints: [] }
  }

  for (const k of REQUIRED_KEYS) {
    if (!raw(k)) missing.push(k)
  }

  const contentMode = raw('VITE_CONTENT_MODE')?.toLowerCase()
  const signalMode = raw('VITE_SIGNAL_MODE')?.toLowerCase()

  if (contentMode && !isValidContentMode(contentMode)) {
    warnings.push(`VITE_CONTENT_MODE must be "mock" or "http" (got "${contentMode}").`)
  }
  if (signalMode && !isValidSignalMode(signalMode)) {
    warnings.push(`VITE_SIGNAL_MODE must be "mock" or "remote" (got "${signalMode}").`)
  }

  if (contentMode === 'http' && !isSupabaseConfigured()) {
    warnings.push(
      'VITE_CONTENT_MODE is "http" but Supabase is not fully configured for Edge Function calls.',
    )
    hints.push(
      'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for the linked Jifunze.ai project.',
    )
  }
  if (signalMode === 'remote' && !raw('VITE_SIGNAL_INGESTION_URL')) {
    warnings.push('VITE_SIGNAL_MODE is "remote" but VITE_SIGNAL_INGESTION_URL is missing.')
    hints.push('Set VITE_SIGNAL_INGESTION_URL to your signal aggregate endpoint.')
  }

  if (supabasePartial) {
    warnings.push(
      'Supabase is partially configured: set both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or clear both for local demo).',
    )
  }

  const ok =
    !supabasePartial &&
    missing.length === 0 &&
    warnings.length === 0 &&
    contentMode != null &&
    signalMode != null &&
    isValidContentMode(contentMode) &&
    isValidSignalMode(signalMode)

  return { ok, missing, warnings, hints }
}

export function logEnvValidationFailure(result: EnvCheckResult): void {
  console.error('[JifunzeAI]', {
    action: 'env_validation',
    status: 'error',
    missing: result.missing,
    warnings: result.warnings,
    hints: result.hints,
  })
}
