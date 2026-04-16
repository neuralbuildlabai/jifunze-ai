import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { runDbHealthCheck, showDbHealthUi } from '../lib/dbHealthCheck'

/**
 * INTERNAL UAT / debug: surfaces `public.uat_db_health_check()` failures when diagnostics are enabled.
 * Env validation is shown in {@link SystemStatusBanner}.
 */
export function InternalUatDiagnostics() {
  const { supabase, user } = useAuth()
  const showPanel = showDbHealthUi() && Boolean(supabase && user)
  const [dbOk, setDbOk] = useState<boolean | null>(null)

  useEffect(() => {
    if (!showPanel || !supabase) return
    let cancelled = false
    void (async () => {
      const res = await runDbHealthCheck(supabase)
      if (cancelled) return
      setDbOk(res.ok)
    })()
    return () => {
      cancelled = true
    }
  }, [showPanel, supabase, user?.id])

  if (!showPanel) return null
  if (dbOk === null) return null
  if (dbOk !== false) return null

  return (
    <div
      className="border-b border-rose-900/50 bg-rose-950/40 px-4 py-2 text-center text-[11px] text-rose-100/95 sm:text-left"
      role="alert"
    >
      <p className="font-medium">Database health check failed</p>
      <p className="opacity-95">
        Catalog RPC `uat_db_health_check` reported a mismatch (tables, policies, or grants). See{' '}
        <span className="font-mono">[JifunzeAI]</span> console logs. Apply pending migrations before UAT.
      </p>
    </div>
  )
}
