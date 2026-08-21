import { Link } from 'react-router-dom'
import { useSocialOpsSnapshot } from '../social-ops/useSocialOpsSnapshot'
import { ADMIN_MODULE_GROUPS, ADMIN_STATUS_LABELS, type AdminModuleStatus } from './adminModules'

const STATUS_BADGE: Record<AdminModuleStatus, string> = {
  operational: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
  'read-only': 'border-sky-400/40 bg-sky-400/10 text-sky-300',
  partial: 'border-amber-400/40 bg-amber-400/10 text-amber-300',
  'awaiting-connection': 'border-violet-400/40 bg-violet-400/10 text-violet-300',
  planned: 'border-white/15 bg-white/[0.04] text-zinc-400',
}

/**
 * The /admin overview: workflow-ordered module map with honest statuses, plus a live snapshot
 * of the operational data that exists today (which is legitimately empty until connections are
 * made in the separately authorized activation phase).
 */
export function AdminOverviewPage() {
  const { snapshot, loading } = useSocialOpsSnapshot()

  const counters = snapshot
    ? [
        { label: 'Signals window', value: '—', note: 'see Signals' },
        { label: 'Content items', value: String(snapshot.content.length), note: 'ledger rows' },
        { label: 'Publications', value: String(snapshot.publications.length), note: 'recorded posts' },
        { label: 'Metric snapshots', value: String(snapshot.snapshots.length), note: 'last 90 days' },
        { label: 'Sync runs', value: String(snapshot.runs.length), note: 'recorded' },
        { label: 'Alerts', value: String(snapshot.alerts.length), note: 'open + resolved' },
      ]
    : []

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight text-white">Overview</h1>
      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-zinc-400">
        The console follows the operating loop: detect signals, select opportunities, research,
        create, review, publish, measure, learn. Each module is labeled with what its code can
        actually do today — publishing and external connections stay off until their supervised
        activation is authorized.
      </p>

      <section className="mt-6">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Operational data
        </h2>
        {loading ? (
          <p className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-6 text-[14px] text-zinc-400">
            Loading…
          </p>
        ) : !snapshot?.configured ? (
          <p className="mt-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-6 text-[14px] text-zinc-400">
            Supabase is not configured in this build — there is no operational data to read.
          </p>
        ) : (
          <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {counters.map((c) => (
              <div key={c.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <dt className="text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-500">{c.label}</dt>
                <dd className="mt-1 text-lg font-semibold text-white">{c.value}</dd>
                <dd className="text-[11px] text-zinc-600">{c.note}</dd>
              </div>
            ))}
          </dl>
        )}
        {snapshot?.configured &&
        snapshot.content.length === 0 &&
        snapshot.publications.length === 0 &&
        snapshot.snapshots.length === 0 ? (
          <p className="mt-2 text-[12px] leading-relaxed text-zinc-600">
            All zeros is the expected state before the social-ops migration is applied and
            connections are activated — nothing has ever published, so nothing is misreported.
          </p>
        ) : null}
      </section>

      {ADMIN_MODULE_GROUPS.map((group) => (
        <section key={group.title} className="mt-8">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">{group.title}</h2>
          <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {group.modules.map((m) => (
              <li key={m.path}>
                <Link
                  to={`/admin/${m.path}`}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-[#7C3AED]/50 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[15px] font-semibold text-white">{m.label}</span>
                    <span
                      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${STATUS_BADGE[m.status]}`}
                    >
                      {ADMIN_STATUS_LABELS[m.status]}
                    </span>
                  </span>
                  <span className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">{m.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
