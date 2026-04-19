import { Link } from 'react-router-dom'
import { buildHeuristicRemediationSequenceLines } from '../../training/remediationActionLoop'
import type { WeakAreaReport } from '../../training/remediationTypes'
import { TRUST_COPY } from '../../training/trustCopy'

export function WeakAreasPanel(props: { report: WeakAreaReport; planId: string }) {
  const { report, planId } = props
  const loopSteps = buildHeuristicRemediationSequenceLines(report)
  const hasSignals =
    report.weakConcepts.length > 0 ||
    report.errorPatterns.length > 0 ||
    report.lowConfidence.length > 0 ||
    report.revisitSuggestions.length > 0

  return (
    <section data-testid="weak-areas-panel" className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-4 ring-1 ring-amber-500/10">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-400/90">Weak areas & remediation</p>
      <p className="mt-2 text-xs text-zinc-500">
        Heuristic signals from checkpoints, practice retries, and placement — used for targeted revisits and revision
        assets.
      </p>
      <p className="mt-2 text-[11px] text-zinc-600">{TRUST_COPY.weakAreasHeuristic}</p>

      {hasSignals && loopSteps.length ? (
        <div className="mt-3 rounded-lg border border-amber-500/20 bg-zinc-950/35 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-300/90">
            Try this sequence (heuristic — not mastery-guaranteed)
          </p>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-xs text-zinc-200">
            {loopSteps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      ) : null}

      {!hasSignals ? (
        <p className="mt-3 text-sm text-zinc-400">
          No struggle signals yet. Complete checkpoints and practice loops to populate this panel.
        </p>
      ) : (
        <div className="mt-4 space-y-4 text-sm">
          {report.lowConfidence.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Calibration</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
                {report.lowConfidence.map((l, i) => (
                  <li key={i}>{l.detail}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {report.weakConcepts.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Weak concepts</p>
              <ul className="mt-2 space-y-2 text-xs text-zinc-300">
                {report.weakConcepts.slice(0, 8).map((c) => (
                  <li key={c.conceptKey} className="rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2">
                    <span className="font-medium text-zinc-100">{c.label}</span>
                    <span className="text-zinc-600"> · </span>
                    <span className="text-amber-200/85">{c.severity}</span>
                    <span className="text-zinc-600"> · </span>
                    <span className="text-zinc-500">{c.sources.join(', ')}</span>
                    <p className="mt-1 text-zinc-400">{c.narrative}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {report.errorPatterns.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Repeated patterns</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
                {report.errorPatterns.slice(0, 6).map((p) => (
                  <li key={p.patternKey}>{p.description}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {report.revisitSuggestions.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Revisit first</p>
              <ul className="mt-2 space-y-2">
                {report.revisitSuggestions.slice(0, 6).map((s) => (
                  <li key={s.lessonId}>
                    <Link
                      to={`/training/${planId}/lessons/${s.lessonId}`}
                      className="text-sm font-medium text-violet-300 hover:text-violet-200"
                    >
                      {s.lessonTitle}
                    </Link>
                    <p className="text-[11px] text-zinc-500">
                      {s.moduleTitle} — {s.reason}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {report.remediation.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Recommendations</p>
              <ul className="mt-2 space-y-3 text-xs text-zinc-300">
                {report.remediation.map((m) => (
                  <li key={m.title}>
                    <p className="font-medium text-zinc-200">{m.title}</p>
                    <ul className="mt-1 list-disc space-y-1 pl-5">
                      {m.actions.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
      <p className="mt-4 text-[11px] leading-relaxed text-zinc-500">
        Need a tighter revision artifact?{' '}
        <Link className="font-medium text-violet-300 hover:text-violet-200" to={`/training/${planId}#plan-derived-content`}>
          Generate content from this plan’s knowledge graph
        </Link>{' '}
        — weak-area targeting pulls from the same signals shown here (heuristic; not appraisal by itself).
      </p>
    </section>
  )
}
