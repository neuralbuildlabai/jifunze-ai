import { Link } from 'react-router-dom'
import { useAppAccess } from '../../access/useAppAccess'
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
} from '../../lib/opportunityWorkspaceUi'
import { useWorkspaceGeneratorReady } from '../../workspace/WorkspaceGeneratorContext'
import { truncatePlain } from '../../workspace/useWorkspaceGeneratorModel'
import { LearningImpactComparisonPanel } from '../LearningImpactComparisonPanel'
import { LifecycleSimulationBadge } from '../LifecycleSimulationBadge'
import { WorkspaceOpportunityCard } from '../WorkspaceOpportunityCard'
import { WorkspaceRouteReady, WorkspaceRouteShell } from './WorkspaceRouteReady'

function WorkspaceIdeasPageInner({ showProLabNav }: { showProLabNav: boolean }) {
  const {
    trendUiEnabled,
    signalSourceLabel,
    simulationMode,
    trendLoading,
    trendError,
    stageCounts,
    opportunities,
    opportunitiesSorted,
    opportunitiesFiltered,
    scoredBySignalId,
    selectedOpportunityId,
    setSelectedOpportunityId,
    ideaFilterQuery,
    setIdeaFilterQuery,
    selectedOpportunity,
  } = useWorkspaceGeneratorReady()

  return (
    <WorkspaceRouteShell
        title="Ideas"
        subtitle="Discovery only — choose a recommendation, then head to Studio to generate captions, packages, and platform variants."
      >

        <section className="space-y-3" aria-labelledby="workspace-ideas-heading">
  <div className="flex flex-wrap items-end justify-between gap-3">
    <div>
      <h2
        id="workspace-ideas-heading"
        className="text-sm font-semibold uppercase tracking-wide text-zinc-500"
      >
        Ideas to use now
      </h2>
      <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-zinc-600">
        Browse ranked recommendations — pick one, then continue in Studio to generate. Technical
        scoring and learning metadata stay tucked under View details.
      </p>
    </div>
    {trendUiEnabled ? (
      <span className="text-xs text-zinc-500">{signalSourceLabel} · preview</span>
    ) : null}
  </div>

  {!trendUiEnabled ? (
    <p className="text-sm text-zinc-500">
      Trend opportunities are disabled (`VITE_ENABLE_TREND_OPPORTUNITIES=false`). Manual
      topic generation still runs.
    </p>
  ) : null}

  {trendUiEnabled && trendLoading ? (
    <p className="text-sm text-zinc-500">Loading signals…</p>
  ) : null}
  {trendUiEnabled && trendError ? (
    <p className="text-sm text-rose-400" role="alert">
      {trendError}
    </p>
  ) : null}
  {trendUiEnabled && !trendLoading && !trendError && stageCounts ? (
    <details className="group rounded-lg border border-zinc-800/60 bg-zinc-950/30 text-[11px] text-zinc-600 [&_summary::-webkit-details-marker]:hidden">
      <summary className="cursor-pointer list-none px-3 py-2 font-medium text-zinc-500 marker:content-none hover:text-zinc-400">
        How these ideas were built (pipeline)
      </summary>
      <div className="space-y-1 border-t border-zinc-800/60 px-3 pb-2.5 pt-2">
        <p>
          Flow: signals {stageCounts.raw} → guarded {stageCounts.guarded} → scored{' '}
          {stageCounts.scored} → opportunities {stageCounts.opportunities}
        </p>
        <p className="text-zinc-500">
          {simulationMode ? (
            <>
              Simulated publish outcomes this refresh:{' '}
              <span className="font-medium text-zinc-400">{stageCounts.simulationRowsWritten}</span>{' '}
              (written into performance memory, then opportunities were rebuilt so learning can move
              format, tone hints, CTA, and platform order in the same load).
            </>
          ) : (
            <>
              Simulation mode is <span className="font-medium text-zinc-400">OFF</span> — this
              refresh did not write synthetic performance rows. Turn it on in the Learning lab to
              exercise the full loop, or use <span className="font-medium text-zinc-400">Run iteration</span>{' '}
              there with the toggle ON.
            </>
          )}
        </p>
      </div>
    </details>
  ) : null}
  {trendUiEnabled && !trendLoading && !trendError && opportunities.length > 0 ? (
    <section
      className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-4"
    >
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Discovery
        </h2>
        <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-zinc-600">
          Search, compare, and preview. When you are ready, open Studio to generate your post.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-xs text-zinc-500">Search ideas</span>
          <input
            value={ideaFilterQuery}
            onChange={(e) => setIdeaFilterQuery(e.target.value)}
            placeholder="Filter by title or summary…"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-violet-500/50"
          />
        </label>
        <label className="block space-y-1.5 sm:col-span-1">
          <span className="text-xs text-zinc-500">Selected idea</span>
          <select
            value={selectedOpportunityId ?? ''}
            onChange={(e) => setSelectedOpportunityId(e.target.value || null)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500/50"
          >
            {opportunitiesFiltered.map((opp, i) => (
              <option key={opp.id} value={opp.id}>
                {i + 1}. {truncatePlain(opp.topic, 78)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {opportunitiesFiltered.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No ideas match that filter — clear search or pick from Browse all recommendations.
        </p>
      ) : null}

      <details className="rounded-lg border border-zinc-800/60 bg-zinc-950/30 [&_summary::-webkit-details-marker]:hidden">
        <summary className="cursor-pointer list-none px-3 py-2 text-[12px] font-semibold text-zinc-400 marker:content-none hover:text-zinc-300">
          Browse all recommendations ({opportunitiesSorted.length})
        </summary>
        <div className="max-h-[min(28rem,55vh)] space-y-3 overflow-y-auto border-t border-zinc-800/60 px-2 pb-3 pt-3">
          {opportunitiesSorted.map((opp) => {
            const scored = scoredBySignalId[opp.signal_id]
            const relevancePct = scored?.relevance_score
              ? Math.round(scored.relevance_score * 100)
              : null
            const selected = selectedOpportunityId === opp.id
            const kwPreview =
              opp.matched_keywords.length > 0
                ? opp.matched_keywords.slice(0, 4).join(', ')
                : '—'
            return (
              <WorkspaceOpportunityCard
                key={opp.id}
                opp={opp}
                scored={scored}
                relevancePct={relevancePct}
                kwPreview={kwPreview}
                selected={selected}
                onUseIdea={() => setSelectedOpportunityId(opp.id)}
              />
            )
          })}
        </div>
      </details>
    {selectedOpportunity ? (
      <>
      <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/50 p-3 text-xs text-zinc-400 space-y-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600">
            Selected idea
          </p>
          <p className="mt-1 text-sm font-semibold text-zinc-100">{selectedOpportunity.topic}</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {selectedOpportunity.why_it_matters}
          </p>
        </div>
        <dl className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600">
              Best format
            </dt>
            <dd className="mt-0.5 text-[13px] capitalize text-zinc-200">
              {selectedOpportunity.suggested_content_format.replace(/_/g, ' ')}
            </dd>
          </div>
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600">
              Teaching level
            </dt>
            <dd className="mt-0.5 text-[13px] capitalize text-zinc-200">
              {selectedOpportunity.teaching_level}
            </dd>
          </div>
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600">
              Platforms
            </dt>
            <dd className="mt-0.5 text-[13px] text-zinc-200">
              {formatSuggestedPlatforms(selectedOpportunity.suggested_platforms)}
            </dd>
          </div>
        </dl>

        {selectedOpportunity.learning_performance_hints[0] ? (
          <p className="text-[11px] leading-relaxed text-zinc-500">
            <span className="font-medium text-zinc-400">Why this showed up:</span>{' '}
            {truncatePlain(selectedOpportunity.learning_performance_hints[0]!, 180)}
          </p>
        ) : selectedOpportunity.selection_reason ? (
          <p className="text-[11px] leading-relaxed text-zinc-500">
            <span className="font-medium text-zinc-400">Why this showed up:</span>{' '}
            {truncatePlain(selectedOpportunity.selection_reason, 180)}
          </p>
        ) : null}

        <details className="rounded-lg border border-zinc-800/70 bg-zinc-950/35 [&_summary::-webkit-details-marker]:hidden">
          <summary className="cursor-pointer list-none px-2.5 py-2 text-[11px] font-semibold text-zinc-300 marker:content-none hover:text-zinc-200">
            Full technical details
          </summary>
          <div className="space-y-3 border-t border-zinc-800/60 px-2.5 pb-2.5 pt-3">
            <p className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${priorityLabelChipClass(selectedOpportunity.priority_label)}`}
              >
                {selectedOpportunity.priority_label}
              </span>
              <span className="text-[11px] text-zinc-500">
                {selectedOpportunity.content_domain} · score{' '}
                {(selectedOpportunity.priority_score * 100).toFixed(0)}
              </span>
            </p>
            <p className="text-[11px] text-zinc-500">{selectedOpportunity.matched_domain}</p>
            <p className="text-[11px] text-zinc-500">
              Trend: {selectedOpportunity.trend_category.replace(/_/g, ' ')}
            </p>
            <div className="space-y-2 rounded-lg border border-teal-900/25 bg-teal-950/10 px-2 py-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-teal-200/80">
                  Learning
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${learningBandChipClass(selectedOpportunity.learning_confidence_band)}`}
                >
                  Memory {selectedOpportunity.learning_confidence_band}
                </span>
              </div>
              {selectedOpportunity.learning_adaptation_labels.length ? (
                <ul className="flex flex-wrap gap-1">
                  {selectedOpportunity.learning_adaptation_labels.map((lbl, i) => (
                    <li
                      key={`sel-lbl-${i}`}
                      className="rounded-full border border-violet-500/25 bg-violet-950/30 px-2 py-0.5 text-[10px] text-violet-100/95"
                    >
                      {lbl}
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="text-[10px] text-zinc-500">
                Adjusted: {formatLearningAffects(selectedOpportunity.learning_affects)}
              </p>
              {selectedOpportunity.learning_performance_hints.length ? (
                <p className="text-[10px] text-zinc-500">
                  Past performance:{' '}
                  <span className="font-medium text-zinc-400">
                    {selectedOpportunity.learning_performance_hints.length} hint
                    {selectedOpportunity.learning_performance_hints.length === 1 ? '' : 's'}
                  </span>{' '}
                  — see “Why this was recommended”.
                </p>
              ) : null}
            </div>
            <p className="text-[11px] text-zinc-500">
              Conversion: {formatConversionIntent(selectedOpportunity.conversion_intent)}
            </p>
            <p className="text-[11px] text-zinc-400">CTA: {selectedOpportunity.suggested_cta}</p>
            <p className="text-[11px] text-zinc-500">
              Destination: {selectedOpportunity.target_destination}
            </p>
            <p className="text-[11px] text-zinc-500">
              Teaching: {selectedOpportunity.teaching_level} ·{' '}
              {formatTeachingStyle(selectedOpportunity.explanation_style)} · clarity{' '}
              {selectedOpportunity.clarity_preference.replace(/_/g, ' ')} ·{' '}
              {selectedOpportunity.educational_framing.replace(/_/g, ' ')}
            </p>
            {selectedOpportunity.learning_performance_hints.length ? (
              <details className="rounded-lg border border-zinc-800/70 bg-zinc-950/35 [&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer list-none px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400 marker:content-none hover:text-zinc-300">
                  Why this was recommended ({selectedOpportunity.learning_performance_hints.length})
                </summary>
                <ul className="list-inside list-disc border-t border-zinc-800/50 px-2 pb-2 pt-1.5 text-[10px] text-zinc-500 space-y-0.5">
                  {selectedOpportunity.learning_performance_hints.map((h, i) => (
                    <li key={`sel-hint-${i}`}>{h}</li>
                  ))}
                </ul>
              </details>
            ) : null}
            {selectedOpportunity.learning_impact_comparison ? (
              <LearningImpactComparisonPanel
                impact={selectedOpportunity.learning_impact_comparison}
                compact
              />
            ) : null}
            {selectedOpportunity.teaching_explainability.length ? (
              <details className="rounded-lg border border-indigo-900/35 bg-indigo-950/15 [&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer list-none px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-200/90 marker:content-none hover:text-indigo-100">
                  Recommendation details ({selectedOpportunity.teaching_explainability.length})
                </summary>
                <ul className="list-inside list-disc border-t border-indigo-900/25 px-2 pb-2 pt-1.5 text-[11px] text-zinc-500 space-y-0.5">
                  {selectedOpportunity.teaching_explainability.map((e, idx) => (
                    <li key={`teach-${idx}`}>
                      <span className="text-zinc-400">{e.what}</span> — {e.why}
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
            {selectedOpportunity.learning_influence_trace.length ? (
              <details className="rounded-lg border border-teal-900/35 bg-teal-950/15 [&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer list-none px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-teal-200/90 marker:content-none hover:text-teal-100">
                  What influenced this ({selectedOpportunity.learning_influence_trace.length})
                </summary>
                <ul className="list-inside list-disc border-t border-teal-900/25 px-2 pb-2 pt-1.5 text-[11px] text-teal-200/85 space-y-0.5">
                  {selectedOpportunity.learning_influence_trace.map((t, idx) => (
                    <li key={`sel-learn-${idx}`}>
                      {t.direction}: {t.pattern}
                      {t.patternStrength ? (
                        <span className="text-zinc-500"> ({t.patternStrength})</span>
                      ) : null}{' '}
                      — {t.why}
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
            <p className="text-[11px] text-zinc-500">
              Keywords:{' '}
              {selectedOpportunity.matched_keywords.length
                ? selectedOpportunity.matched_keywords.join(', ')
                : '—'}
            </p>
            <p className="text-[11px] text-zinc-500">{selectedOpportunity.freshness_summary}</p>
            <p className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${autonomyActionChipClass(selectedOpportunity.autonomy_action)}`}
              >
                {selectedOpportunity.autonomy_action.replace(/_/g, ' ')}
              </span>
              <span className={`text-[11px] font-medium tabular-nums ${riskChipClass(selectedOpportunity.risk_level)}`}>
                {(selectedOpportunity.confidence_score * 100).toFixed(0)}% confidence ·{' '}
                {selectedOpportunity.risk_level} risk
              </span>
              <span className="text-[11px] text-zinc-500">
                {selectedOpportunity.requires_human_review ? 'Human review required' : 'Autonomous path'}
              </span>
            </p>
            <p className="flex flex-wrap items-center gap-2">
              <span className="inline-flex flex-wrap items-center gap-1">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize tracking-wide ${lifecycleStatusChipClass(selectedOpportunity.lifecycle_status)}`}
                >
                  {selectedOpportunity.lifecycle_status}
                </span>
                <LifecycleSimulationBadge label="Demo" />
              </span>
              <span className="text-[11px] text-zinc-600">
                {selectedOpportunity.lifecycle_driver} ·{' '}
                {new Date(selectedOpportunity.lifecycle_updated_at).toLocaleString()}
              </span>
            </p>
            <details className="rounded-lg border border-zinc-800/70 bg-zinc-950/35 [&_summary::-webkit-details-marker]:hidden">
              <summary className="cursor-pointer list-none px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400 marker:content-none hover:text-zinc-300">
                Angle &amp; format
              </summary>
              <div className="space-y-1 border-t border-zinc-800/50 px-2 pb-2 pt-1.5 text-[11px] text-zinc-400">
                <p>Angle: {selectedOpportunity.suggested_angle}</p>
                <p>Format: {selectedOpportunity.suggested_content_format.replace(/_/g, ' ')}</p>
              </div>
            </details>
            {selectedOpportunity.autonomy_reason || selectedOpportunity.selection_reason ? (
              <details className="rounded-lg border border-zinc-800/70 bg-zinc-950/30 [&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer list-none px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400 marker:content-none hover:text-zinc-300">
                  Why Jifunze chose this
                </summary>
                <div className="space-y-1.5 border-t border-zinc-800/50 px-2 pb-2 pt-1.5 text-[11px] leading-relaxed text-zinc-500">
                  {selectedOpportunity.autonomy_reason ? (
                    <p>
                      <span className="text-zinc-600">Autonomy:</span> {selectedOpportunity.autonomy_reason}
                    </p>
                  ) : null}
                  {selectedOpportunity.selection_reason ? <p>{selectedOpportunity.selection_reason}</p> : null}
                </div>
              </details>
            ) : null}
          </div>
        </details>
      </div>
        
            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                to="/studio"
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 sm:flex-none"
              >
                Open Studio to create
              </Link>
              {showProLabNav ? (
                <Link
                  to="/lab"
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-900 sm:flex-none"
                >
                  Learning lab
                </Link>
              ) : null}
            </div>
            </>
          ) : (
            <p className="text-xs text-zinc-500">
              Select an idea from the dropdown, or open Browse all recommendations above.
            </p>
          )}

        </section>
      ) : null}
      </section>


    </WorkspaceRouteShell>
  )
}

export function WorkspaceIdeasPage() {
  const { showProLabNav } = useAppAccess()
  return (
    <WorkspaceRouteReady>
      <WorkspaceIdeasPageInner showProLabNav={showProLabNav} />
    </WorkspaceRouteReady>
  )
}
