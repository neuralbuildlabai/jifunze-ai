import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext'
import { isSupabaseConfigured } from '../../../config/supabaseEnv'
import type { AdminHealthStatus } from '../../../lib/admin/adminEnv'
import {
  getCertificateHealthSummary,
  getIntegrationHealthSummary,
  getStorageHealthSummary,
  worstHealth,
} from '../../../lib/admin/adminHealthChecks'
import { mapSnapshotToStripItems, type OperationsHealthSnapshot } from '../../../lib/admin/healthSnapshotMapper'
import { rpcAdminOperationsHealthSnapshot } from '../../../services/admin/adminRpc'

function badge(status: AdminHealthStatus): string {
  switch (status) {
    case 'healthy':
      return 'border-emerald-200 bg-emerald-50 text-emerald-900'
    case 'warning':
      return 'border-amber-200 bg-amber-50 text-amber-900'
    case 'critical':
      return 'border-rose-200 bg-rose-50 text-rose-900'
    case 'info':
      return 'border-slate-200 bg-slate-50 text-slate-800'
    default:
      return 'border-zinc-200 bg-zinc-50 text-zinc-700'
  }
}

function labelFor(status: AdminHealthStatus): string {
  switch (status) {
    case 'healthy':
      return 'Healthy'
    case 'warning':
      return 'Warning'
    case 'critical':
      return 'Critical'
    case 'info':
      return 'Info'
    default:
      return 'Unknown'
  }
}

function rollupStatus(statuses: AdminHealthStatus[]): AdminHealthStatus {
  return statuses.reduce((a, b) => worstHealth(a, b), 'healthy' as AdminHealthStatus)
}

export function AdminHealthSummaryCard() {
  const { supabase } = useAuth()
  const [items, setItems] = React.useState<{ key: string; title: string; status: AdminHealthStatus; detail: string }[]>(
    [],
  )

  React.useEffect(() => {
    let on = true
    void (async () => {
      const cert = getCertificateHealthSummary()
      const integ = getIntegrationHealthSummary()
      const certStatus = rollupStatus(cert.map((c) => c.status))
      const integStatus = rollupStatus(integ.map((c) => c.status))

      if (!isSupabaseConfigured() || !supabase) {
        const storage = await getStorageHealthSummary(null)
        const storageStatus = rollupStatus(storage.map((s) => s.status))
        const strip = mapSnapshotToStripItems(null, {
          storageStatus,
          storageDetail: storage[0]?.description ?? 'Unavailable without Supabase.',
          certStatus,
          certDetail: cert[0]?.description ?? '',
          integrationStatus: integStatus,
          integrationDetail: integ.map((x) => `${x.label}: ${x.description}`).join(' · '),
        })
        if (on) setItems(strip)
        return
      }

      const [snapRes, storage] = await Promise.all([
        rpcAdminOperationsHealthSnapshot(supabase),
        getStorageHealthSummary(supabase),
      ])
      const snap = (snapRes.data as OperationsHealthSnapshot | null) ?? null
      const storageStatus = rollupStatus(storage.map((s) => s.status))
      const strip = mapSnapshotToStripItems(snap, {
        storageStatus,
        storageDetail: storage[0]?.description ?? 'Storage summary unavailable.',
        certStatus,
        certDetail: cert[0]?.description ?? '',
        integrationStatus: integStatus,
        integrationDetail: integ.map((x) => `${x.label}: ${x.description}`).join(' · '),
      })
      if (on) setItems(strip)
    })()
    return () => {
      on = false
    }
  }, [supabase])

  const worstStrip = rollupStatus(items.map((i) => i.status))

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm" data-testid="admin-dashboard-health-strip">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">Environment health</h2>
          <p className="text-xs text-zinc-500">
            Compact operations view · worst strip status:{' '}
            <span className={`font-semibold ${worstStrip === 'critical' ? 'text-rose-700' : worstStrip === 'warning' ? 'text-amber-700' : 'text-zinc-700'}`}>
              {labelFor(worstStrip)}
            </span>
          </p>
        </div>
        <Link
          to="/admin/health"
          className="text-sm font-medium text-zinc-900 underline-offset-2 hover:underline"
          data-testid="admin-health-summary-link"
        >
          Open health center
        </Link>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((it) => (
          <Link
            key={it.key}
            to="/admin/health"
            data-testid={`admin-health-strip-${it.key}`}
            className={`inline-flex min-h-[4.5rem] flex-col rounded-xl border px-3 py-2 text-left transition hover:opacity-95 ${badge(it.status)}`}
          >
            <span className="text-[11px] font-medium uppercase tracking-wide opacity-80">{it.title}</span>
            <span className="text-sm font-semibold">{labelFor(it.status)}</span>
            <span className="mt-1 line-clamp-3 text-[11px] leading-snug opacity-90">{it.detail}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
