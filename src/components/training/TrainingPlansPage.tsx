import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { useTeamAssignmentsBoard } from '../../training/teamTrainingHooks'
import { useTrainingPlansList } from '../../training/trainingHooks'
import { TRUST_COPY } from '../../training/trustCopy'
import { TrainingInlineAlert } from './TrainingInlineAlert'

const card =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04] transition hover:border-violet-400/20'

export function TrainingPlansPage() {
  const { workspaceShellReady } = useAuth()
  const { plans, loading, error, refetch } = useTrainingPlansList()
  const { rows: myAssignments, loading: assignLoading, error: assignError } = useTeamAssignmentsBoard('self')

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-10 text-zinc-100">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Workspace training</p>
          <h1 className="mt-1 text-xl font-semibold text-white">Plans &amp; cohort assignments</h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            Base plans on existing catalog courses—assign paths to learners instead of inventing synthetic curricula when the catalog already covers the topic.
          </p>
          <p className="mt-3 max-w-xl text-[11px] leading-relaxed text-zinc-600">{TRUST_COPY.trainingSurfaceHeuristic}</p>
        </div>
        <Link
          to="/training/new"
          className="rounded-lg bg-violet-600/90 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-violet-950/25 transition hover:bg-violet-500"
        >
          New training plan
        </Link>
      </header>

      {isSupabaseConfigured() && !workspaceShellReady ? (
        <p className="text-sm text-zinc-400">Loading workspace…</p>
      ) : null}

      {error ? (
        <TrainingInlineAlert error={error} onRetry={() => void refetch()} />
      ) : null}

      <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Assigned to you</p>
            <p className="mt-1 text-sm text-zinc-400">
              Plans your workspace admin assigned. Progress stays on the same lessons and checkpoints.
            </p>
          </div>
          <Link to="/team/assignments" className="text-xs font-medium text-violet-300 hover:text-violet-200">
            View all
          </Link>
        </div>
        {assignError ? (
          <p className="mt-3 text-sm text-rose-300/90">{assignError.message}</p>
        ) : assignLoading ? (
          <p className="mt-3 text-sm text-zinc-400">Loading assignments…</p>
        ) : myAssignments.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">No active assignments for your account in this workspace.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {myAssignments.slice(0, 4).map((a) => (
              <li key={a.id}>
                <Link
                  to={`/training/${a.training_plan_id}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-2 text-sm text-zinc-100 transition hover:border-violet-400/25"
                >
                  <span>{a.planTitle ?? 'Training plan'}</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                    {a.effectiveStatus.replace(/_/g, ' ')} · {a.progressPercent}%
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {loading ? (
        <p className="text-sm text-zinc-400">Loading plans…</p>
      ) : !error && plans.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/[0.12] bg-zinc-950/40 px-6 py-12 text-center">
          <p className="text-sm font-medium text-zinc-200">No training plans yet</p>
          <p className="mt-2 text-sm text-zinc-500">
            Start with a short plan — Jifunze drafts modules and lessons from your topic (review and adapt to your
            context).
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/training/new"
              className="rounded-lg bg-violet-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
            >
              Create your first plan
            </Link>
          </div>
        </div>
      ) : (
        <ul className="space-y-3">
          {plans.map((p) => (
            <li key={p.id}>
              <Link to={`/training/${p.id}`} className={`block ${card}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{p.title}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {p.topic ? `${p.topic} · ` : null}
                      {p.skill_level ?? 'Level set on create'}
                      {p.duration_label ? ` · ${p.duration_label}` : null}
                    </p>
                  </div>
                  <span className="rounded-md border border-white/[0.08] bg-zinc-950/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400">
                    {p.status}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
