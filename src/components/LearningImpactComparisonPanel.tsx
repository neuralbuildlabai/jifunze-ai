import type {
  LearningDecisionSnapshot,
  OpportunityLearningImpactComparison,
} from '../types/opportunityLearningImpact'
import type { LearningInfluenceTrace, PatternStrength } from '../types/performanceLearning'

function tierLabel(s?: PatternStrength): string {
  if (!s) return ''
  if (s === 'confirmed') return 'strong'
  return s
}

function formatAxisTitle(axis: keyof OpportunityLearningImpactComparison['traces_by_axis']): string {
  switch (axis) {
    case 'platform':
      return 'Platform order'
    case 'format':
      return 'Format'
    case 'cta':
      return 'CTA'
    case 'teaching':
      return 'Teaching style'
    case 'priority':
      return 'Priority'
    case 'confidence':
      return 'Confidence / autonomy'
    default:
      return axis
  }
}

function TraceList({ traces }: { traces: LearningInfluenceTrace[] }) {
  if (!traces.length) {
    return <p className="text-[10px] text-zinc-600">No trace rows for this axis.</p>
  }
  return (
    <ul className="mt-0.5 list-inside list-disc space-y-0.5 text-[10px] text-zinc-500">
      {traces.map((t, idx) => (
        <li key={`${t.pattern}-${idx}`}>
          <span className={t.direction === 'boost' ? 'text-emerald-200/90' : 'text-amber-200/90'}>
            {t.direction}
          </span>{' '}
          {t.pattern}
          {t.patternStrength ? (
            <span className="text-zinc-600"> ({tierLabel(t.patternStrength)} evidence)</span>
          ) : null}{' '}
          — {t.why}
        </li>
      ))}
    </ul>
  )
}

type Props = {
  impact: OpportunityLearningImpactComparison
  compact?: boolean
}

function snapshotRows(s: LearningDecisionSnapshot) {
  return [
    { k: 'Priority', v: `${(s.priority_score * 100).toFixed(1)} (${s.priority_label})` },
    { k: 'Format', v: s.suggested_content_format.replace(/_/g, ' ') },
    { k: 'Platforms', v: s.suggested_platforms.join(' → ') },
    { k: 'CTA emphasis', v: s.cta_emphasis },
    { k: 'Teaching', v: `${s.teaching_level} · ${s.explanation_style.replace(/_/g, ' ')}` },
    {
      k: 'Autonomy',
      v: `${s.autonomy_action.replace(/_/g, ' ')} · ${(s.confidence_score * 100).toFixed(0)}% conf · ${s.risk_level} risk`,
    },
  ]
}

export function LearningImpactComparisonPanel({ impact, compact }: Props) {
  const { baseline, learned, change_summaries, traces_by_axis } = impact
  const beforeRows = snapshotRows(baseline)
  const afterRows = snapshotRows(learned)
  const axes = Object.keys(traces_by_axis) as (keyof typeof traces_by_axis)[]

  const inner = (
    <>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">Before learning</p>
          <dl className="mt-1 space-y-1 text-[10px] text-zinc-400">
            {beforeRows.map((row) => (
              <div key={row.k} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="shrink-0 font-medium text-zinc-600">{row.k}</dt>
                <dd className="text-zinc-300">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-lg border border-violet-900/35 bg-violet-950/15 p-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-200/80">After learning</p>
          <dl className="mt-1 space-y-1 text-[10px] text-zinc-400">
            {afterRows.map((row) => (
              <div key={row.k} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="shrink-0 font-medium text-zinc-600">{row.k}</dt>
                <dd className="text-zinc-200">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="mt-2 rounded-lg border border-amber-900/25 bg-amber-950/10 px-2 py-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-200/85">
          What changed and why
        </p>
        <ul className="mt-1 list-inside list-disc space-y-0.5 text-[10px] text-zinc-400">
          {change_summaries.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
      <div className="mt-2 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-teal-200/80">
          Traces by decision (boost / penalty · evidence tier)
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {axes.map((axis) => (
            <div
              key={axis}
              className="rounded-md border border-teal-900/20 bg-teal-950/10 px-2 py-1.5 text-[10px]"
            >
              <p className="font-medium text-teal-100/90">{formatAxisTitle(axis)}</p>
              <TraceList traces={traces_by_axis[axis]} />
            </div>
          ))}
        </div>
      </div>
    </>
  )

  if (compact) {
    return (
      <details className="mt-2 rounded-lg border border-zinc-800/70 bg-zinc-950/30 text-left">
        <summary className="cursor-pointer select-none px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
          Learning impact on decisions
        </summary>
        <div className="border-t border-zinc-800/60 p-2">{inner}</div>
      </details>
    )
  }

  return <div className="space-y-2">{inner}</div>
}
