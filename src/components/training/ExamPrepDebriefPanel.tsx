import { Link } from 'react-router-dom'
import type { ExamPrepDebrief } from '../../training/examPrepDebrief'

export function ExamPrepDebriefPanel(props: { debrief: ExamPrepDebrief; planId: string }) {
  const { debrief, planId } = props
  return (
    <div className="space-y-4 rounded-xl border border-amber-500/25 bg-amber-950/15 p-4 ring-1 ring-amber-500/10">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-300/90">{debrief.modeLabel}</p>
        <p className="mt-2 text-lg font-semibold text-white">{debrief.scoreLine}</p>
        <p className="mt-1 text-xs text-zinc-400">{debrief.percentLine}</p>
        {debrief.timingLine ? <p className="mt-2 text-xs text-zinc-500">{debrief.timingLine}</p> : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Strongest segment</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-emerald-200/90">
            {debrief.strongest.length ? debrief.strongest.map((s, i) => <li key={i}>{s}</li>) : <li>—</li>}
          </ul>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Weakest segment</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-rose-200/90">
            {debrief.weakest.length ? debrief.weakest.map((s, i) => <li key={i}>{s}</li>) : <li>—</li>}
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Section snapshot</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
          {debrief.sectionHighlights.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Coverage note</p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-400">{debrief.coverageNote}</p>
      </div>

      <div className="rounded-lg border border-violet-500/15 bg-violet-950/15 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-300/90">Revision priorities</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
          {debrief.revisionPriorities.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-sky-500/15 bg-sky-950/15 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-300/90">Next step</p>
        <p className="mt-2 text-xs text-zinc-300">{debrief.nextAction}</p>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Readiness (exam-prep sense)</p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-400">{debrief.readinessNote}</p>
      </div>

      <p className="text-[11px] leading-relaxed text-zinc-500">{debrief.trustFooter}</p>

      <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-3">
        <Link
          to={`/training/${planId}?assetType=revision_sheet&examFocus=1&examPrepLearner=1`}
          className="rounded-lg border border-violet-500/35 bg-violet-950/30 px-3 py-2 text-xs font-semibold text-violet-100 hover:bg-violet-950/45"
        >
          Open revision sheet on plan
        </Link>
        <Link to={`/training/${planId}`} className="rounded-lg border border-zinc-600 bg-zinc-900/80 px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-900">
          Back to plan
        </Link>
      </div>
    </div>
  )
}
