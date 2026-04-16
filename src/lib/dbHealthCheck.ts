import type { SupabaseClient } from '@supabase/supabase-js'
import { jifunzeCriticalLog } from './jifunzeTelemetry'

export type DbHealthPayload = {
  ok: boolean
  tables?: Record<string, boolean>
  policies?: unknown
  grants?: Record<string, { select: boolean; insert: boolean; update: boolean }>
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object'
}

/**
 * Calls `public.uat_db_health_check()` (migration 20260427100000). Requires authenticated session.
 * On RPC missing or failure, returns structured error — callers must surface it (no silent OK).
 */
export async function runDbHealthCheck(supabase: SupabaseClient): Promise<DbHealthPayload> {
  const { data, error } = await supabase.rpc('uat_db_health_check')
  if (error) {
    jifunzeCriticalLog({
      action: 'db_health_check',
      status: 'error',
      error: {
        message: error.message,
        code: (error as { code?: string }).code ?? null,
        details: (error as { details?: string }).details ?? null,
        hint: (error as { hint?: string }).hint ?? null,
      },
    })
    return { ok: false }
  }
  if (!isRecord(data)) {
    jifunzeCriticalLog({
      action: 'db_health_check',
      status: 'error',
      error: { message: 'Invalid RPC payload shape' },
    })
    return { ok: false }
  }
  const ok = data.ok === true
  const payload: DbHealthPayload = {
    ok,
    tables: isRecord(data.tables) ? (data.tables as Record<string, boolean>) : undefined,
    policies: data.policies,
    grants: isRecord(data.grants)
      ? (data.grants as Record<string, { select: boolean; insert: boolean; update: boolean }>)
      : undefined,
  }
  if (!ok) {
    jifunzeCriticalLog({
      action: 'db_health_check',
      status: 'error',
      error: { payload: data },
    })
  } else {
    jifunzeCriticalLog({
      action: 'db_health_check',
      status: 'ok',
    })
  }
  return payload
}

export function showDbHealthUi(): boolean {
  return import.meta.env.VITE_INTERNAL_UAT_DIAGNOSTICS === 'true' || import.meta.env.DEV === true
}
