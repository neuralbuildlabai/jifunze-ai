import * as React from 'react'
import { useAuth } from '../../../auth/AuthContext'
import { isSupabaseConfigured } from '../../../config/supabaseEnv'
import {
  getFullCourseCatalogItems,
  getMicrolearningCatalogItems,
} from '../../../data/learning/availablePublicLearnCatalog'
import {
  adminFlagshipHiddenFromPublicCatalogCount,
  adminFlagshipPublishedCount,
  buildAdminCourseInventoryRows,
} from '../../../lib/admin/adminCourseInventory'
import {
  rpcAdminAtRiskCounts,
  rpcAdminPlatformMetrics,
  type AdminAtRiskCounts,
  type AdminPlatformMetrics,
} from '../../../services/admin/adminRpc'
import { AdminHealthSummaryCard } from './AdminHealthSummaryCard'

function StatCard(props: { title: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{props.title}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">{props.value}</p>
      {props.hint ? <p className="mt-1 text-xs text-zinc-500">{props.hint}</p> : null}
    </div>
  )
}

export function AdminDashboardPage() {
  const { supabase } = useAuth()
  const [metrics, setMetrics] = React.useState<AdminPlatformMetrics | null>(null)
  const [atRisk, setAtRisk] = React.useState<AdminAtRiskCounts | null>(null)
  const [err, setErr] = React.useState<string | null>(null)
  const [recent, setRecent] = React.useState<
    { user_id: string; course_slug: string; updated_at: string | null; status: string | null }[]
  >([])

  React.useEffect(() => {
    let on = true
    void (async () => {
      if (!isSupabaseConfigured() || !supabase) {
        setErr(null)
        setMetrics(null)
        return
      }
      const [m, r, a] = await Promise.all([
        rpcAdminPlatformMetrics(supabase),
        supabase
          .from('learner_self_paced_progress')
          .select('user_id, course_slug, updated_at, status')
          .order('updated_at', { ascending: false })
          .limit(12),
        rpcAdminAtRiskCounts(supabase),
      ])
      if (!on) return
      if (m.error) setErr(m.error)
      else setErr(null)
      setMetrics(m.data)
      setAtRisk(a.data)
      if (!r.error && r.data) setRecent(r.data as typeof recent)
    })()
    return () => {
      on = false
    }
  }, [supabase])

  const catalogRows = React.useMemo(() => buildAdminCourseInventoryRows(), [])
  const publicCatalogCount =
    getMicrolearningCatalogItems().length + getFullCourseCatalogItems().length

  return (
    <div className="space-y-8" data-testid="admin-dashboard-home">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Dashboard</h1>
        <p className="mt-1 max-w-2xl text-sm text-zinc-600">
          Platform-wide metrics from Supabase RPCs. Values stay empty in local demo mode without a database.
        </p>
      </div>

      <AdminHealthSummaryCard />

      {err ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          {err}. Apply migrations (including `20260514120000_admin_platform_rbac.sql`) if this is unexpected.
        </div>
      ) : null}

      <section>
        <h2 className="mb-3 text-sm font-semibold text-zinc-900">Learners & signups</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total learners (auth users)" value={metrics?.users_total ?? '—'} />
          <StatCard title="New signups (7d)" value={metrics?.signups_last_7d ?? '—'} />
          <StatCard title="Active learners (7d)" value={metrics?.active_learners_last_7d_distinct ?? '—'} />
          <StatCard
            title="At-risk: stalled 7d+"
            value={atRisk?.stalled_in_progress_7d ?? '—'}
            hint="In progress with no activity for 7+ days (self-paced table)."
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-zinc-900">Courses & catalog</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Flagship slugs (catalog)" value={adminFlagshipPublishedCount()} />
          <StatCard
            title="Flagship hidden from public /learn"
            value={adminFlagshipHiddenFromPublicCatalogCount()}
            hint="Intentional allowlist; admins still see full flagship inventory."
          />
          <StatCard title="Public /learn catalog entries" value={publicCatalogCount} />
          <StatCard title="Total inventory rows" value={catalogRows.length} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-zinc-900">Progress & completions</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Self-paced progress rows" value={metrics?.learner_self_paced_progress_rows ?? '—'} />
          <StatCard title="Flagship progress rows" value={metrics?.flagship_course_progress_rows ?? '—'} />
          <StatCard title="Self-paced completed rows" value={metrics?.self_paced_completed_rows ?? '—'} />
          <StatCard title="Flagship rows with completions" value={metrics?.flagship_rows_with_session_completions ?? '—'} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-zinc-900">Operations</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Active assignments" value={metrics?.assignments_active ?? '—'} />
          <StatCard title="Certificates issued (DB)" value={metrics?.certificates_issued_rows ?? '—'} />
          <StatCard title="Support: new tickets" value={metrics?.support_submissions_new ?? '—'} />
          <StatCard
            title="At-risk: low progress 14d+"
            value={atRisk?.under_twenty_pct_after_14d ?? '—'}
            hint="Under 20% progress after 14+ days in self-paced table."
          />
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Recent self-paced writes</h2>
        <p className="mt-1 text-xs text-zinc-500">User identifiers are operational references only.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs uppercase tracking-wide text-zinc-500">
                <th className="py-2 pr-4 font-medium">User</th>
                <th className="py-2 pr-4 font-medium">Course</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-sm text-zinc-500">
                    No rows yet or metrics unavailable in this environment.
                  </td>
                </tr>
              ) : (
                recent.map((row) => (
                  <tr key={`${row.user_id}-${row.course_slug}-${row.updated_at}`} className="border-b border-zinc-50">
                    <td className="py-2 pr-4 font-mono text-xs text-zinc-700">{row.user_id.slice(0, 8)}…</td>
                    <td className="py-2 pr-4 text-zinc-800">{row.course_slug}</td>
                    <td className="py-2 pr-4 text-zinc-600">{row.status}</td>
                    <td className="py-2 text-zinc-500">{row.updated_at ? new Date(row.updated_at).toLocaleString() : '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
