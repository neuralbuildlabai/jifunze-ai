import { Link } from 'react-router-dom'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { useAuth } from '../../auth/AuthContext'
import { useTrainingDashboardSummary } from '../../training/trainingHooks'
import { TRUST_COPY } from '../../training/trustCopy'
import { TrainingInlineAlert } from './TrainingInlineAlert'

const cardClass =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.2)] ring-1 ring-white/[0.04]'

export function DashboardTrainingWidget() {
  const { workspaceShellReady } = useAuth()
  const { summary, loading, error, refetch } = useTrainingDashboardSummary()

  if (isSupabaseConfigured() && !workspaceShellReady) {
    return (
      <section className={cardClass}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Training</h2>
        <p className="mt-2 text-sm text-zinc-400">Loading workspace…</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className={cardClass}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Training</h2>
        <div className="mt-3">
          <TrainingInlineAlert error={error} onRetry={() => void refetch()} />
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className={cardClass}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Training</h2>
        <p className="mt-2 text-sm text-zinc-400">Loading training progress…</p>
      </section>
    )
  }

  if (!summary.plan) {
    return (
      <section className={cardClass}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Training</h2>
        <p className="mt-2 text-sm text-zinc-400">No training plans yet.</p>
        <Link
          to="/training/new"
          className="mt-3 inline-flex rounded-lg bg-violet-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500"
        >
          Create training plan
        </Link>
      </section>
    )
  }

  const denom = summary.totalLessons + summary.totalQuizzes
  const num = summary.completedCount + summary.completedQuizzes
  const pct = denom > 0 ? Math.round((num / denom) * 100) : 0

  return (
    <section className={cardClass}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Training</h2>
          <p className="mt-2 text-sm font-medium text-zinc-100">{summary.plan.title}</p>
          <p className="mt-1 text-xs text-zinc-500">
            {summary.modulesDone} / {summary.totalModules} modules · {summary.completedCount} /{' '}
            {summary.totalLessons} lessons · {summary.completedQuizzes} / {summary.totalQuizzes}{' '}
            checkpoints
            {summary.planDone ? (
              <span className="text-emerald-300/90"> · Plan complete</span>
            ) : (
              <span> · {pct}% overall</span>
            )}
          </p>
        </div>
        <Link
          to={`/training/${summary.plan.id}`}
          className="text-xs font-medium text-violet-300 hover:text-violet-200"
        >
          Open plan
        </Link>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-violet-500/90 transition-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {summary.resumeHref ? (
          <Link
            to={summary.resumeHref}
            className="inline-flex rounded-lg bg-violet-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500"
          >
            {summary.resumeLabel ?? 'Continue'}
          </Link>
        ) : (
          <span className="text-xs text-emerald-300/90">
            {summary.planDone ? 'Plan complete.' : 'Nothing to resume yet.'}
          </span>
        )}
        <Link
          to="/training"
          className="inline-flex rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800"
        >
          My training plans
        </Link>
      </div>
      <p className="mt-3 text-[10px] leading-relaxed text-zinc-600">{TRUST_COPY.readinessCompositeShort}</p>
    </section>
  )
}
