import { Link } from 'react-router-dom'
import type { CompletionIntelligence } from '../../training/completionIntelligence'
import { TRUST_COPY } from '../../training/trustCopy'

export function CompletionIntelligencePanel(props: { intel: CompletionIntelligence }) {
  const { intel } = props

  return (
    <section className="rounded-xl border border-emerald-500/25 bg-emerald-950/15 p-4 ring-1 ring-emerald-500/10">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300/90">Plan complete · your path forward</p>
      <p className="mt-2 text-[11px] text-zinc-500">
        Heuristic snapshot from checkpoints, practice, placement, and the knowledge graph — not a formal certificate.
      </p>

        <div className="mt-4 space-y-4 text-sm">
        <div className="rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Completion summary</p>
          <p className="mt-2 whitespace-pre-wrap text-zinc-200">{intel.completionSummary}</p>
        </div>

        {intel.longitudinalReadinessComparison ? (
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/10 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-300/90">
              Readiness trend across checkpoints
            </p>
            <p className="mt-2 text-xs text-zinc-300">{intel.longitudinalReadinessComparison}</p>
            <p className="mt-2 text-[11px] text-zinc-500">{TRUST_COPY.readinessTrajectoryVsBand}</p>
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-white/[0.06] bg-zinc-950/30 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Strengths demonstrated</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-xs text-zinc-300">
              {intel.strengthsDemonstrated.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-amber-500/15 bg-amber-950/10 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200/90">Weak areas remaining</p>
            {intel.persistentWeakSpotlight?.length ? (
              <div className="mt-2 rounded-md border border-amber-500/10 bg-zinc-950/40 px-2 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-200/80">
                  Repeated across checkpoints
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] text-amber-100/95">
                  {intel.persistentWeakSpotlight.map((s, i) => (
                    <li key={`pw-${i}`}>{s}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-xs text-zinc-300">
              {intel.weakAreasRemaining.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Recommended revision path</p>
          <ul className="mt-2 space-y-2 text-xs">
            {intel.recommendedRevisionPath.map((step, i) => (
              <li
                key={i}
                className="rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2 text-zinc-300"
              >
                <p className="font-medium text-zinc-100">{step.title}</p>
                <p className="mt-1 text-zinc-500">{step.detail}</p>
                {step.href ? (
                  <Link to={step.href} className="mt-2 inline-block text-[11px] font-medium text-violet-300 hover:text-violet-200">
                    Open →
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
          <Link
            to={`/training/${intel.planId}#plan-derived-content`}
            className="mt-3 inline-flex rounded-lg border border-violet-500/35 bg-violet-950/25 px-3 py-1.5 text-[11px] font-semibold text-violet-100 hover:bg-violet-950/40"
          >
            Generate learner-support revision content from this plan →
          </Link>
          <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">{TRUST_COPY.readinessTrajectoryVsBand}</p>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-zinc-950/30 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Recommended next course / level</p>
          <p className="mt-2 font-medium text-zinc-100">{intel.recommendedNextCourse.headline}</p>
          <p className="mt-1 text-xs text-zinc-400">{intel.recommendedNextCourse.detail}</p>
          <Link to="/training" className="mt-3 inline-block text-xs font-medium text-violet-300 hover:text-violet-200">
            Browse training plans
          </Link>
        </div>

        <div className="rounded-lg border border-sky-500/20 bg-sky-950/15 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-400/90">Readiness signals</p>
          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <span className="text-base font-semibold text-white">{intel.readiness.bandLabel}</span>
            <span className="text-[11px] text-zinc-500">Band {intel.readiness.band + 1}/4</span>
          </div>
          <p className="mt-2 text-xs text-zinc-400">{intel.readiness.readinessConfidenceLine}</p>
          <p className="mt-3 text-xs text-zinc-300">
            <span className="font-medium text-emerald-200/90">Work-relevant practice · </span>
            {intel.readiness.workUseLine.replace(
              /^(?:Work use:|Practice signal \(heuristic\):)\s*/i,
              '',
            )}
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">{TRUST_COPY.workUseHeuristicFraming}</p>
          <p className="mt-2 text-xs text-zinc-300">
            <span className="font-medium text-sky-200/90">Exam-style prep · </span>
            {intel.readiness.examPreparationLine.replace(
              /^(?:Exam preparation:|Exam-style preparation support:)\s*/i,
              '',
            )}
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">{TRUST_COPY.examPrepPracticeShort}</p>
        </div>
      </div>
    </section>
  )
}
