import { LearningImpactComparisonPanel } from './LearningImpactComparisonPanel'
import { LifecycleSimulationBadge } from './LifecycleSimulationBadge'
import {
  autonomyActionChipClass,
  formatConversionIntent,
  formatLearningAffects,
  formatSuggestedPlatforms,
  formatTeachingStyle,
  learningBandChipClass,
  lifecycleStatusChipClass,
  priorityLabelChipClass,
  riskChipClass,
} from '../lib/opportunityWorkspaceUi'
import type { ContentOpportunity } from '../types/opportunity'
import type { ScoredSignal } from '../services/relevance/types'

type Props = {
  opp: ContentOpportunity
  scored: ScoredSignal | undefined
  relevancePct: number | null
  kwPreview: string
  selected: boolean
  onUseIdea: () => void
}

export function WorkspaceOpportunityCard({
  opp,
  scored,
  relevancePct,
  kwPreview,
  selected,
  onUseIdea,
}: Props) {
  return (
    <li
      className={`rounded-2xl border p-4 transition ${
        selected ? 'border-violet-500/50 bg-violet-950/20' : 'border-zinc-800/80 bg-zinc-900/30'
      }`}
    >
      <div className="flex flex-col gap-3">
        <div className="min-w-0">
          {opp.requires_human_review ? (
            <p className="mb-2">
              <span className="inline-block rounded border border-amber-500/40 bg-amber-950/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-100/95">
                Review suggested
              </span>
            </p>
          ) : null}
          <h3 className="text-base font-semibold leading-snug text-zinc-100">{opp.topic}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{opp.why_it_matters}</p>
        </div>

        <dl className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600">Best format</dt>
            <dd className="mt-0.5 text-[13px] capitalize text-zinc-200">
              {opp.suggested_content_format.replace(/_/g, ' ')}
            </dd>
          </div>
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600">Teaching level</dt>
            <dd className="mt-0.5 text-[13px] capitalize text-zinc-200">{opp.teaching_level}</dd>
          </div>
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600">Platforms</dt>
            <dd className="mt-0.5 text-[13px] text-zinc-200">
              {formatSuggestedPlatforms(opp.suggested_platforms)}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-stretch gap-2">
          <button
            type="button"
            onClick={onUseIdea}
            className="rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-zinc-950 shadow-sm transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500/45"
          >
            Use this idea
          </button>
          <details className="group min-w-[10rem] flex-1 sm:max-w-xs [&_summary::-webkit-details-marker]:hidden">
            <summary className="cursor-pointer list-none rounded-xl border border-zinc-600/80 bg-zinc-950/50 px-4 py-2.5 text-center text-xs font-semibold text-zinc-200 marker:content-none hover:border-zinc-500 hover:bg-zinc-900/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500/45">
              View details
            </summary>
            <div className="mt-3 space-y-3 rounded-xl border border-zinc-800/70 bg-zinc-950/45 p-3 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${priorityLabelChipClass(opp.priority_label)}`}
                >
                  {opp.priority_label}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${
                    opp.urgency === 'high'
                      ? 'bg-rose-500/15 text-rose-200'
                      : opp.urgency === 'medium'
                        ? 'bg-amber-500/15 text-amber-100'
                        : 'bg-zinc-700/60 text-zinc-300'
                  }`}
                >
                  {opp.urgency}
                </span>
                <span className="rounded bg-violet-950/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-violet-200/90">
                  {opp.content_domain}
                </span>
                <span className="rounded bg-sky-950/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sky-200/90">
                  {opp.trend_category.replace(/_/g, ' ')}
                </span>
                <span className="rounded border border-teal-600/35 bg-teal-950/30 px-2 py-0.5 text-[10px] font-medium capitalize tracking-wide text-teal-100/95">
                  {formatConversionIntent(opp.conversion_intent)}
                </span>
                <span className="rounded border border-sky-700/40 bg-sky-950/35 px-2 py-0.5 text-[10px] font-medium capitalize tracking-wide text-sky-100/90">
                  Teach {opp.teaching_level}
                </span>
                <span className="rounded border border-indigo-700/35 bg-indigo-950/30 px-2 py-0.5 text-[10px] font-medium capitalize tracking-wide text-indigo-100/90">
                  {formatTeachingStyle(opp.explanation_style)}
                </span>
                <span className="rounded border border-indigo-800/40 bg-indigo-950/25 px-2 py-0.5 text-[10px] font-medium capitalize tracking-wide text-indigo-200/85">
                  {opp.clarity_preference.replace(/_/g, ' ')}
                </span>
                <span className="rounded border border-indigo-800/40 bg-indigo-950/25 px-2 py-0.5 text-[10px] font-medium capitalize tracking-wide text-indigo-200/85">
                  {opp.educational_framing.replace(/_/g, ' ')}
                </span>
                <span className="rounded border border-zinc-600/80 px-2 py-0.5 text-[10px] text-zinc-300">
                  Score {(opp.priority_score * 100).toFixed(0)}
                </span>
                <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-400">
                  {opp.suggested_content_format.replace(/_/g, ' ')}
                </span>
                {relevancePct !== null ? (
                  <span className="text-xs text-zinc-500">Rel ~{relevancePct}%</span>
                ) : null}
                {scored?.source_label ? (
                  <span className="text-[10px] text-zinc-500" title={scored.url}>
                    {scored.source_label}
                  </span>
                ) : null}
                {typeof scored?.signal_strength === 'number' ? (
                  <span className="text-[10px] tabular-nums text-teal-200/80">
                    Strength {(scored.signal_strength * 100).toFixed(0)}
                  </span>
                ) : null}
                {scored?.published_at ? (
                  <span className="text-[10px] text-zinc-500">
                    {new Date(scored.published_at).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                ) : null}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${autonomyActionChipClass(opp.autonomy_action)}`}
                >
                  {opp.autonomy_action.replace(/_/g, ' ')}
                </span>
                <span className={`text-[10px] font-medium tabular-nums ${riskChipClass(opp.risk_level)}`}>
                  Conf {(opp.confidence_score * 100).toFixed(0)}% · {opp.risk_level} risk
                </span>
                {opp.requires_human_review ? (
                  <span className="rounded border border-amber-500/40 bg-amber-950/30 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-100/95">
                    Review
                  </span>
                ) : (
                  <span className="rounded border border-zinc-600/50 bg-zinc-950/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
                    Auto path
                  </span>
                )}
                <span className="inline-flex flex-wrap items-center gap-1">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize tracking-wide ${lifecycleStatusChipClass(opp.lifecycle_status)}`}
                  >
                    {opp.lifecycle_status}
                  </span>
                  <LifecycleSimulationBadge label="Demo" />
                </span>
              </div>

              <div className="space-y-2 rounded-xl border border-teal-900/25 bg-teal-950/10 px-2.5 py-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-teal-200/80">
                    Learning
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${learningBandChipClass(opp.learning_confidence_band)}`}
                  >
                    Memory {opp.learning_confidence_band}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    Adapts from published outcomes — see what moved below.
                  </span>
                </div>
                {opp.learning_adaptation_labels.length ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {opp.learning_adaptation_labels.map((lbl, i) => (
                      <li
                        key={`lbl-${opp.id}-${i}`}
                        className="rounded-full border border-violet-500/25 bg-violet-950/30 px-2 py-0.5 text-[10px] leading-snug text-violet-100/95"
                      >
                        {lbl}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[10px] text-zinc-500">
                    No adaptation labels yet — add performance rows or keep publishing to strengthen memory.
                  </p>
                )}
                <p className="text-[10px] text-zinc-500">
                  <span className="font-medium text-zinc-400">Adjusted</span>: {formatLearningAffects(opp.learning_affects)}
                </p>
                {opp.learning_performance_hints.length ? (
                  <p className="text-[10px] text-zinc-500">
                    Past performance:{' '}
                    <span className="font-medium text-zinc-400">
                      {opp.learning_performance_hints.length} hint
                      {opp.learning_performance_hints.length === 1 ? '' : 's'}
                    </span>{' '}
                    — see “Why this was recommended” below.
                  </p>
                ) : null}
              </div>

              <dl className="grid gap-1 text-[11px] text-zinc-500">
                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <dt className="shrink-0 font-medium text-zinc-600">Domain</dt>
                  <dd className="text-zinc-400">{opp.matched_domain}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <dt className="shrink-0 font-medium text-zinc-600">Trend</dt>
                  <dd className="text-zinc-400">{opp.trend_category.replace(/_/g, ' ')}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <dt className="shrink-0 font-medium text-zinc-600">Conversion</dt>
                  <dd className="text-zinc-400">{formatConversionIntent(opp.conversion_intent)}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <dt className="shrink-0 font-medium text-zinc-600">CTA</dt>
                  <dd className="text-zinc-300">{opp.suggested_cta}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <dt className="shrink-0 font-medium text-zinc-600">Destination</dt>
                  <dd className="text-zinc-400">{opp.target_destination}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <dt className="shrink-0 font-medium text-zinc-600">Teaching</dt>
                  <dd className="text-zinc-300">
                    {opp.teaching_level} · {formatTeachingStyle(opp.explanation_style)} · clarity{' '}
                    {opp.clarity_preference.replace(/_/g, ' ')} · {opp.educational_framing.replace(/_/g, ' ')}
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <dt className="shrink-0 font-medium text-zinc-600">Keywords</dt>
                  <dd className="text-zinc-400">{kwPreview}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <dt className="shrink-0 font-medium text-zinc-600">Freshness</dt>
                  <dd className="text-zinc-400">{opp.freshness_summary}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <dt className="shrink-0 font-medium text-zinc-600">Lifecycle</dt>
                  <dd className="flex flex-wrap items-center gap-1.5 text-zinc-400">
                    {opp.lifecycle_status} <span className="text-zinc-600">· {opp.lifecycle_driver}</span>
                    <LifecycleSimulationBadge label="Demo" />
                  </dd>
                </div>
              </dl>

              <div className="space-y-2">
                {opp.learning_performance_hints.length ? (
                  <details className="group rounded-lg border border-zinc-800/70 bg-zinc-950/35 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="cursor-pointer list-none px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400 marker:content-none hover:text-zinc-300">
                      Why this was recommended ({opp.learning_performance_hints.length})
                    </summary>
                    <ul className="mt-1 list-inside list-disc space-y-0.5 border-t border-zinc-800/50 px-2.5 pb-2 pt-1.5 text-[10px] text-zinc-500">
                      {opp.learning_performance_hints.map((h, i) => (
                        <li key={`hint-${opp.id}-${i}`}>{h}</li>
                      ))}
                    </ul>
                  </details>
                ) : null}
                {opp.learning_impact_comparison ? (
                  <LearningImpactComparisonPanel impact={opp.learning_impact_comparison} compact />
                ) : null}
                {opp.teaching_explainability.length ? (
                  <details className="group rounded-lg border border-indigo-900/35 bg-indigo-950/15 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="cursor-pointer list-none px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-200/90 marker:content-none hover:text-indigo-100">
                      Recommendation details ({opp.teaching_explainability.length})
                    </summary>
                    <ul className="mt-1 list-inside list-disc space-y-0.5 border-t border-indigo-900/25 px-2.5 pb-2 pt-1.5 text-[10px] text-zinc-500">
                      {opp.teaching_explainability.map((e, idx) => (
                        <li key={`${idx}-${e.what}`}>
                          <span className="text-zinc-300">{e.what}</span> — {e.why}
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
                {opp.learning_influence_trace.length ? (
                  <details className="group rounded-lg border border-teal-900/35 bg-teal-950/15 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="cursor-pointer list-none px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-teal-200/90 marker:content-none hover:text-teal-100">
                      What influenced this ({opp.learning_influence_trace.length})
                    </summary>
                    <ul className="mt-1 list-inside list-disc space-y-0.5 border-t border-teal-900/25 px-2.5 pb-2 pt-1.5 text-[10px] text-zinc-500">
                      {opp.learning_influence_trace.map((t, idx) => (
                        <li key={`learn-${idx}`}>
                          <span
                            className={
                              t.direction === 'boost' ? 'text-emerald-200/90' : 'text-amber-200/90'
                            }
                          >
                            {t.direction}
                          </span>{' '}
                          {t.pattern}
                          {t.patternStrength ? (
                            <span className="text-zinc-600"> ({t.patternStrength} evidence)</span>
                          ) : null}{' '}
                          — {t.why}
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
                {opp.autonomy_reason || opp.selection_reason ? (
                  <details className="group rounded-lg border border-zinc-800/70 bg-zinc-950/30 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="cursor-pointer list-none px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400 marker:content-none hover:text-zinc-300">
                      Why Jifunze chose this
                    </summary>
                    <div className="space-y-1.5 border-t border-zinc-800/50 px-2.5 pb-2 pt-1.5 text-[11px] leading-relaxed text-zinc-500">
                      {opp.autonomy_reason ? (
                        <p>
                          <span className="text-zinc-600">Autonomy:</span> {opp.autonomy_reason}
                        </p>
                      ) : null}
                      {opp.selection_reason ? <p>{opp.selection_reason}</p> : null}
                    </div>
                  </details>
                ) : null}
              </div>
            </div>
          </details>
        </div>
      </div>
    </li>
  )
}
