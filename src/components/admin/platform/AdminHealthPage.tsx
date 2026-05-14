import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext'
import { isSupabaseConfigured } from '../../../config/supabaseEnv'
import { buildAdminCourseInventoryRows } from '../../../lib/admin/adminCourseInventory'
import { buildCourseDeliveryReconciliationChecks } from '../../../lib/admin/adminCourseRouteHealth'
import {
  parseCertificateHealthStatsRpc,
  parseProgressIntegrityRpc,
  parseSchemaHealthRpc,
  parseStorageHealthRpc,
  sanitizeAdminHealthSummaryForClipboard,
  sortHealthChecksBySeverity,
} from '../../../lib/admin/adminDiagnosticsHealth'
import type { AdminHealthCheck, AdminHealthStatus } from '../../../lib/admin/adminEnv'
import {
  getAdminEnvironmentHealth,
  getAuthHealthSummary,
  getDatabaseHealthSummary,
  getIntegrationHealthSummary,
  getLargestTablesOrEmpty,
  getSecurityHealthSummary,
  getStorageHealthSummary,
  getSystemWarnings,
} from '../../../lib/admin/adminHealthChecks'
import { snapshotToHealthChecks, type OperationsHealthSnapshot } from '../../../lib/admin/healthSnapshotMapper'
import {
  rpcAdminAppendAudit,
  rpcAdminCertificateHealthStats,
  rpcAdminOperationsHealthSnapshot,
  rpcAdminProgressIntegrityHealth,
  rpcAdminRoleHealth,
  rpcAdminSchemaHealth,
  rpcAdminStorageHealthSummary,
} from '../../../services/admin/adminRpc'
import { useAdminAccess } from '../useAdminAccess'

const tabs = [
  'overview',
  'database',
  'auth',
  'storage',
  'courses',
  'progress',
  'certificates',
  'integrations',
  'security',
  'audit',
] as const

type Tab = (typeof tabs)[number]

function badge(status: AdminHealthStatus): string {
  switch (status) {
    case 'healthy':
      return 'bg-emerald-100 text-emerald-900'
    case 'warning':
      return 'bg-amber-100 text-amber-900'
    case 'critical':
      return 'bg-rose-100 text-rose-900'
    case 'info':
      return 'bg-slate-100 text-slate-800'
    default:
      return 'bg-zinc-100 text-zinc-800'
  }
}

function CheckList(props: { title: string; items: AdminHealthCheck[] }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">{props.title}</h2>
      <ul className="mt-3 space-y-3">
        {props.items.map((it, idx) => (
          <li key={`${it.label}-${idx}`} className="rounded-lg border border-zinc-100 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${badge(it.status)}`}>{it.status}</span>
              <span className="text-sm font-medium text-zinc-900">{it.label}</span>
            </div>
            <p className="mt-1 text-sm text-zinc-600">{it.description}</p>
            {it.evidence ? <p className="mt-1 text-xs text-zinc-500">Evidence: {it.evidence}</p> : null}
            {it.remediation ? <p className="mt-1 text-xs font-medium text-zinc-800">Recommended action: {it.remediation}</p> : null}
            {it.lastCheckedAt ? (
              <p className="mt-1 text-[11px] text-zinc-400">Last checked {new Date(it.lastCheckedAt).toLocaleString()}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

function HealthIssueBoard(props: { checks: AdminHealthCheck[] }) {
  const sorted = React.useMemo(() => sortHealthChecksBySeverity(props.checks), [props.checks])
  const groups: AdminHealthStatus[] = ['critical', 'warning', 'unknown', 'info', 'healthy']
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm" data-testid="admin-health-grouped-board">
      <h2 className="text-sm font-semibold text-zinc-900">Prioritized findings</h2>
      <p className="mt-1 text-xs text-zinc-500">Critical and warning items appear first. Values are sanitized — no secrets or tokens.</p>
      <div className="mt-4 space-y-6">
        {groups.map((g) => {
          const items = sorted.filter((c) => c.status === g)
          if (items.length === 0) return null
          return (
            <div key={g} data-testid={`admin-health-group-${g}`}>
              <h3 className={`text-xs font-bold uppercase tracking-wide ${g === 'critical' ? 'text-rose-700' : g === 'warning' ? 'text-amber-800' : 'text-zinc-600'}`}>
                {g} ({items.length})
              </h3>
              <ul className="mt-2 space-y-2">
                {items.map((it, idx) => (
                  <li key={`${g}-${it.label}-${idx}`} className={`rounded-lg border p-3 ${g === 'critical' ? 'border-rose-200 bg-rose-50/60' : 'border-zinc-100 bg-zinc-50/50'}`}>
                    <p className="text-sm font-medium text-zinc-900">{it.label}</p>
                    <p className="mt-1 text-sm text-zinc-700">{it.description}</p>
                    {it.remediation ? <p className="mt-2 text-xs font-medium text-zinc-900">Recommended: {it.remediation}</p> : null}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function AdminHealthPage() {
  const { supabase } = useAuth()
  const { isSuperAdmin, isAdmin } = useAdminAccess()
  const [tab, setTab] = React.useState<Tab>('overview')
  const [overview, setOverview] = React.useState<Awaited<ReturnType<typeof getAdminEnvironmentHealth>> | null>(null)
  const [dbChecks, setDbChecks] = React.useState<AdminHealthCheck[]>([])
  const [storageChecks, setStorageChecks] = React.useState<AdminHealthCheck[]>([])
  const [largest, setLargest] = React.useState<{ table: string; total_bytes: number; total_pretty: string }[]>([])
  const [warnings, setWarnings] = React.useState<{ severity: AdminHealthStatus; message: string }[]>([])
  const [audit, setAudit] = React.useState<Record<string, unknown>[]>([])
  const [opsSnap, setOpsSnap] = React.useState<OperationsHealthSnapshot | null>(null)
  const [opsSnapErr, setOpsSnapErr] = React.useState<string | null>(null)
  const [roleHealth, setRoleHealth] = React.useState<Record<string, unknown> | null>(null)
  const [auditHint, setAuditHint] = React.useState<string | null>(null)
  const [copyHint, setCopyHint] = React.useState<string | null>(null)
  const [diagStorage, setDiagStorage] = React.useState<AdminHealthCheck[]>([])
  const [diagSchema, setDiagSchema] = React.useState<AdminHealthCheck[]>([])
  const [diagProgress, setDiagProgress] = React.useState<AdminHealthCheck[]>([])
  const [diagCert, setDiagCert] = React.useState<AdminHealthCheck[]>([])

  const inventorySlugs = React.useMemo(() => new Set(buildAdminCourseInventoryRows().map((r) => r.slug)), [])

  const courseDeliveryChecks = React.useMemo(() => buildCourseDeliveryReconciliationChecks(), [])

  const courseChecks: AdminHealthCheck[] = React.useMemo(() => {
    const rows = buildAdminCourseInventoryRows()
    const hidden = rows.filter((r) => r.kind === 'flagship' && !r.onPublicLearnerCatalog).length
    return [
      ...courseDeliveryChecks,
      {
        status: 'info',
        label: 'Catalog breadth',
        description: `${rows.length} operational course rows across flagship, free starters, and standalone entries.`,
        lastCheckedAt: new Date().toISOString(),
      },
      {
        status: hidden > 0 ? 'info' : 'healthy',
        label: 'Flagship public gating',
        description: `${hidden} flagship slug(s) are intentionally withheld from the public /learn allowlist while remaining routable for deep links.`,
        lastCheckedAt: new Date().toISOString(),
      },
    ]
  }, [courseDeliveryChecks])

  React.useEffect(() => {
    let on = true
    void (async () => {
      const [o, d, w, lg, st] = await Promise.all([
        getAdminEnvironmentHealth(supabase),
        getDatabaseHealthSummary(supabase),
        getSystemWarnings(supabase),
        getLargestTablesOrEmpty(supabase),
        getStorageHealthSummary(supabase),
      ])
      if (!on) return
      setOverview(o)
      setDbChecks(d.checks)
      setWarnings(w)
      setLargest(lg)
      setStorageChecks(st)
      if (supabase) {
        const { data } = await supabase.from('admin_audit_log').select('*').order('created_at', { ascending: false }).limit(40)
        if (on) setAudit((data as Record<string, unknown>[]) ?? [])
      }
      if (supabase && isSupabaseConfigured()) {
        const [snap, sto, sch, pro, cer] = await Promise.all([
          rpcAdminOperationsHealthSnapshot(supabase),
          rpcAdminStorageHealthSummary(supabase),
          rpcAdminSchemaHealth(supabase),
          rpcAdminProgressIntegrityHealth(supabase),
          rpcAdminCertificateHealthStats(supabase),
        ])
        if (!on) return
        setOpsSnapErr(snap.error)
        setOpsSnap((snap.data as OperationsHealthSnapshot | null) ?? null)
        if (isSuperAdmin) {
          const rh = await rpcAdminRoleHealth(supabase)
          if (on) setRoleHealth(rh.error ? null : rh.data)
        } else if (on) setRoleHealth(null)

        const tsSto = sto.data && typeof sto.data === 'object' ? String((sto.data as Record<string, unknown>).checked_at ?? '') : undefined
        if (sto.error) {
          setDiagStorage(await getStorageHealthSummary(supabase))
        } else {
          setDiagStorage(parseStorageHealthRpc(sto.data as Record<string, unknown> | null, tsSto))
        }
        if (sch.error) {
          setDiagSchema([
            {
              status: 'critical',
              label: 'Schema RPC error',
              description: sch.error,
              remediation: 'Apply migration `20260516120000_admin_diagnostics_health_rpcs.sql`.',
              lastCheckedAt: new Date().toISOString(),
            },
          ])
        } else {
          setDiagSchema(parseSchemaHealthRpc(sch.data as Record<string, unknown> | null))
        }
        if (pro.error) {
          setDiagProgress([
            {
              status: 'critical',
              label: 'Progress integrity RPC error',
              description: pro.error,
              remediation: 'Apply diagnostics migration.',
              lastCheckedAt: new Date().toISOString(),
            },
          ])
        } else {
          setDiagProgress(parseProgressIntegrityRpc(pro.data as Record<string, unknown> | null, inventorySlugs))
        }
        if (cer.error) {
          setDiagCert([
            {
              status: 'critical',
              label: 'Certificate stats RPC error',
              description: cer.error,
              remediation: 'Apply diagnostics migration.',
              lastCheckedAt: new Date().toISOString(),
            },
          ])
        } else {
          setDiagCert(parseCertificateHealthStatsRpc(cer.data as Record<string, unknown> | null))
        }
      } else if (on) {
        setOpsSnap(null)
        setOpsSnapErr(null)
        setRoleHealth(null)
        setDiagStorage([])
        setDiagSchema([])
        setDiagProgress([])
        setDiagCert([])
      }
    })()
    return () => {
      on = false
    }
  }, [supabase, isSuperAdmin, inventorySlugs])

  const overviewMerged = React.useMemo(() => {
    const snapChecks = snapshotToHealthChecks(opsSnap)
    return [...(overview?.sections ?? []), ...snapChecks]
  }, [overview, opsSnap])

  const roleHealthChecks: AdminHealthCheck[] = React.useMemo(() => {
    if (!roleHealth) return []
    const raw = roleHealth.warnings
    if (!Array.isArray(raw)) return []
    return raw.map((w, i) => {
      const o = w as Record<string, unknown>
      const sev: AdminHealthStatus = o.severity === 'critical' ? 'critical' : 'warning'
      return {
        status: sev,
        label: `Canonical · ${String(o.code ?? i)}`,
        description: String(o.message ?? ''),
        remediation: 'Fix in Supabase (profiles / canonical auth emails) — never grant admin from the client alone.',
        lastCheckedAt: String(roleHealth.checked_at ?? new Date().toISOString()),
      }
    })
  }, [roleHealth])

  const progressChecks = React.useMemo(
    () => [...diagProgress, ...dbChecks.filter((c) => c.label.toLowerCase().includes('progress') || c.label.includes('learner_self'))],
    [dbChecks, diagProgress],
  )

  const authTabItems = React.useMemo(
    () => [...getAuthHealthSummary(), ...roleHealthChecks],
    [roleHealthChecks],
  )

  const storageTabItems = React.useMemo(() => {
    if (diagStorage.length) return diagStorage
    return storageChecks
  }, [diagStorage, storageChecks])

  const certificateTabItems = React.useMemo(() => {
    if (!isSupabaseConfigured()) {
      return [
        {
          status: 'unknown' as const,
          label: 'Certificates',
          description: 'Supabase is not configured — certificate RPCs cannot run in this bundle.',
          lastCheckedAt: new Date().toISOString(),
        },
      ]
    }
    return diagCert
  }, [diagCert])

  const boardChecks = React.useMemo(() => {
    const extra: AdminHealthCheck[] = []
    if (opsSnapErr) {
      extra.push({
        status: 'warning',
        label: 'Operations snapshot',
        description: opsSnapErr,
        remediation: 'Apply `20260515120000_admin_health_and_system_accounts.sql` on Supabase.',
        lastCheckedAt: new Date().toISOString(),
      })
    }
    return sortHealthChecksBySeverity([
      ...extra,
      ...snapshotToHealthChecks(opsSnap),
      ...diagStorage,
      ...diagSchema,
      ...diagProgress,
      ...diagCert,
      ...courseDeliveryChecks,
      ...roleHealthChecks,
      ...getIntegrationHealthSummary(),
      ...getSecurityHealthSummary(),
    ])
  }, [opsSnapErr, opsSnap, diagStorage, diagSchema, diagProgress, diagCert, courseDeliveryChecks, roleHealthChecks])

  const lastCheckedLabel = React.useMemo(() => {
    const raw = opsSnap?.checked_at
    if (raw) return new Date(String(raw)).toLocaleString()
    return new Date().toLocaleString()
  }, [opsSnap])

  return (
    <div className="space-y-6" data-testid="admin-health-page">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Environment health</h1>
          <p className="mt-1 max-w-2xl text-sm text-zinc-600">
            Operations console — summaries only; no secrets, tokens, or raw connection strings.
          </p>
          <p className="mt-2 text-xs text-zinc-500" data-testid="admin-health-last-checked">
            Last assembled view: {lastCheckedLabel}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm"
            data-testid="admin-health-copy-summary"
            onClick={() => {
              void navigator.clipboard.writeText(sanitizeAdminHealthSummaryForClipboard(boardChecks)).then(
                () => setCopyHint('Summary copied (sanitized).'),
                () => setCopyHint('Clipboard unavailable in this browser.'),
              )
            }}
          >
            Copy health summary
          </button>
          {isAdmin && supabase && isSupabaseConfigured() ? (
            <button
              type="button"
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm"
              onClick={() => {
                void (async () => {
                  if (!supabase) return
                  const res = await rpcAdminAppendAudit(supabase, {
                    action: 'health_manual_review',
                    entityType: 'operations_health',
                    summary: 'Recorded manual health center review from UI.',
                  })
                  setAuditHint(res.error ?? 'Logged to admin_audit_log.')
                })()
              }}
            >
              Record health review
            </button>
          ) : null}
          <Link to="/admin/dashboard" className="text-sm font-medium text-zinc-900 underline-offset-2 hover:underline">
            ← Dashboard
          </Link>
        </div>
      </div>
      {copyHint ? <p className="text-xs text-zinc-600">{copyHint}</p> : null}
      {auditHint ? <p className="text-xs text-zinc-600">{auditHint}</p> : null}

      <HealthIssueBoard checks={boardChecks} />

      <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
              tab === t ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' ? (
        <div className="space-y-4" data-testid="admin-health-overview-snapshot">
          <CheckList title="Live overview" items={overviewMerged} />
          {opsSnapErr ? (
            <p
              className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950"
              data-testid="admin-health-ops-snapshot-unavailable"
            >
              Operations snapshot unavailable: {opsSnapErr}. Apply migrations including `20260515120000_admin_health_and_system_accounts.sql`
              and `20260516120000_admin_diagnostics_health_rpcs.sql` if missing.
            </p>
          ) : null}
          <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-zinc-900">Warnings</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {warnings.length === 0 ? (
                <li className="text-zinc-500">No active warnings.</li>
              ) : (
                warnings.map((w) => (
                  <li key={w.message} className={`rounded-lg px-3 py-2 ${badge(w.severity)}`}>
                    {w.message}
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      ) : null}

      {tab === 'database' ? (
        <div className="space-y-4">
          <CheckList title="Database" items={dbChecks} />
          <CheckList title="Schema & RPC presence" items={diagSchema} />
          <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-zinc-900">Largest public tables</h2>
            <ul className="mt-3 space-y-1 text-sm text-zinc-600">
              {largest.length === 0 ? (
                <li>Unavailable from this session.</li>
              ) : (
                largest.map((t) => (
                  <li key={t.table}>
                    <span className="font-mono text-xs">{t.table}</span> · {t.total_pretty}
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      ) : null}

      {tab === 'auth' ? <CheckList title="Authentication" items={authTabItems} /> : null}
      {tab === 'storage' ? <CheckList title="Storage" items={storageTabItems} /> : null}
      {tab === 'courses' ? <CheckList title="Course delivery" items={courseChecks} /> : null}
      {tab === 'progress' ? <CheckList title="Progress tracking" items={progressChecks} /> : null}
      {tab === 'certificates' ? <CheckList title="Certificates" items={certificateTabItems} /> : null}
      {tab === 'integrations' ? <CheckList title="Integrations" items={getIntegrationHealthSummary()} /> : null}
      {tab === 'security' ? <CheckList title="Security" items={getSecurityHealthSummary()} /> : null}
      {tab === 'audit' ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-zinc-900">Recent audit events</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            {audit.length === 0 ? (
              <li>No audit rows yet.</li>
            ) : (
              audit.map((r) => (
                <li key={String(r.id)} className="border-b border-zinc-50 pb-2">
                  <span className="font-medium text-zinc-900">{String(r.action)}</span> · {String(r.summary ?? '')}
                  <span className="block text-xs text-zinc-400">
                    {r.created_at ? new Date(String(r.created_at)).toLocaleString() : ''}
                  </span>
                </li>
              ))
            )}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
