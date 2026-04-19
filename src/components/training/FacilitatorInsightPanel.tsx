import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import type { TeamFacilitatorInsight } from '../../training/facilitatorInsight'
import { TRUST_COPY } from '../../training/trustCopy'
import { memberLabel } from '../../training/teamTrainingHooks'

export function FacilitatorInsightPanel(props: {
  insight: TeamFacilitatorInsight | null
  loading: boolean
  error: string | null
  onRetry: () => void
  /** Total persisted checkpoint intelligence rows visible for this plan (cohort; no raw answers). */
  checkpointSignalCount?: number | null
  /** Aggregate weak-label patterns from repeated snapshot summaries (no per-learner detail). */
  cohortRepeatedWeakHints?: string[]
}) {
  const { user } = useAuth()
  const { insight, loading, error, onRetry, checkpointSignalCount, cohortRepeatedWeakHints } = props

  return (
    <section className="rounded-xl border border-violet-500/20 bg-violet-950/15 p-4 ring-1 ring-violet-500/10">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-violet-300/90">Team & facilitator insight</p>
      <p className="mt-2 text-xs text-zinc-500">
        Cohort view: progress, shared weak areas, common mistake signals, follow-ups, and suggested derived assets for
        reinforcement.
      </p>
      <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">
        Privacy stance: facilitator insight stays aggregate or role-safe — no raw answers, distractors, or item text from
        learners’ attempts. Use labels for coaching cadence, not performance adjudication by themselves.{' '}
        {TRUST_COPY.weakAreasHeuristic}
      </p>
      <p className="mt-2 text-[11px] leading-relaxed text-zinc-600" data-testid="facilitator-coaching-boundary">
        {TRUST_COPY.facilitatorCoachingNotAdjudication}
      </p>
      {checkpointSignalCount != null && checkpointSignalCount > 0 ? (
        <p className="mt-2 text-[11px] text-zinc-500">
          Persistent checkpoint signals saved for this plan (aggregated weak/readiness memory):{' '}
          <span className="font-medium text-zinc-300">{checkpointSignalCount}</span> snapshots across learners you can
          coach — still no raw answers exposed.
        </p>
      ) : null}

      {cohortRepeatedWeakHints && cohortRepeatedWeakHints.length > 0 ? (
        <div className="mt-3 rounded-lg border border-violet-500/15 bg-zinc-950/35 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-300/90">
            Repeated cohort weak signals
          </p>
          <p className="mt-1 text-[11px] text-zinc-500">
            Labels that appeared across multiple learners’ checkpoint summaries — use for retros and targeted drills.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
            {cohortRepeatedWeakHints.slice(0, 6).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {error ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-rose-200" role="alert">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => onRetry()}
            className="text-xs font-medium text-violet-300 hover:text-violet-200"
          >
            Retry
          </button>
        </div>
      ) : null}

      {loading ? <p className="mt-3 text-sm text-zinc-400">Loading team insight…</p> : null}

      {!loading && !error && !insight ? <p className="mt-3 text-sm text-zinc-500">No insight to show yet.</p> : null}

      {insight ? (
        <div className="mt-4 space-y-4 text-sm">
          <p className="text-zinc-200">{insight.summaryLine}</p>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Cohort progress</p>
            <ul className="mt-2 space-y-1 text-xs text-zinc-400">
              {insight.progress_summary.per_learner_completion_percent.map((r) => (
                <li key={r.userId} className="flex justify-between gap-3">
                  <span className="text-zinc-300">{memberLabel(r.userId, user?.id ?? '')}</span>
                  <span>{r.percent}%</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] text-zinc-500">
              Average ~{insight.progress_summary.avg_completion_percent}% · spread{' '}
              {insight.progress_summary.spread_completion_percent}%
            </p>
          </div>

          {insight.weak_area_rollup?.concepts.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Shared weak areas</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
                {insight.weak_area_rollup.concepts.slice(0, 6).map((c) => (
                  <li key={c.conceptKey}>
                    <span className="font-medium text-zinc-100">{c.label}</span>
                    <span className="text-zinc-600"> · </span>
                    <span className="text-zinc-500">{c.learnerHits} learners · miss weight {c.quizWrongTotal}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {insight.common_mistakes.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Common mistake signals</p>
              <ul className="mt-2 space-y-2 text-xs text-zinc-300">
                {insight.common_mistakes.slice(0, 6).map((m, i) => (
                  <li key={i} className="rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2">
                    <span className="text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                      {m.affected_learners} learners · {m.occurrences} weighted hits
                    </span>
                    <p className="mt-1 text-zinc-200">{m.pattern_line}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {insight.recommended_follow_up.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                Recommended follow-up
              </p>
              <ul className="mt-2 space-y-2 text-xs text-zinc-300">
                {insight.recommended_follow_up.map((f, i) => (
                  <li key={i}>
                    {f.href ? (
                      <Link to={f.href} className="font-medium text-violet-300 hover:text-violet-200">
                        {f.title}
                      </Link>
                    ) : (
                      <span className="font-medium text-zinc-100">{f.title}</span>
                    )}
                    <p className="text-zinc-500">{f.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {insight.recommended_derived_assets.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                Suggested reinforcement assets
              </p>
              <ul className="mt-2 space-y-2 text-xs">
                {insight.recommended_derived_assets.map((a) => (
                  <li key={a.asset_type} className="rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2">
                    <span className="font-mono text-[11px] text-emerald-300/90">{a.asset_type}</span>
                    <p className="mt-1 text-zinc-400">{a.rationale}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[11px] text-zinc-600">
                Generate these from “Content from this plan” — pick the matching asset type and enable “Include facilitator
                cohort insight”.
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
