import { useEffect, useMemo, useState } from 'react'
import { demoBrands } from '../config/demoBrands'
import {
  getSignalProviderMode,
  isTrendOpportunitiesEnabled,
} from '../config/signalIngestionEnv'
import {
  adaptContentForSocialAccounts,
  generateContentPackage,
  generateSocialContent,
  resolveSocialAccountsForBrand,
} from '../services/contentGeneration'
import { LearningOptimizationPanel } from './LearningOptimizationPanel'
import { buildTrendPreviewForBrand } from '../services/trendPreview'
import { describeFunnelMapping } from '../services/conversion/funnelMap'
import type { ContentGenerationMode, ContentPackage } from '../types/contentPackage'
import type { AutonomyAction } from '../types/autonomy'
import type { ContentLifecycleStatus } from '../types/contentLifecycle'
import type { ContentOpportunity } from '../types/opportunity'
import type { PriorityLabel } from '../types/priorityLabel'
import type { SocialContent } from '../types/content'
import type { ScoredSignal } from '../services/relevance/types'

function lifecycleStatusChipClass(status: ContentLifecycleStatus): string {
  switch (status) {
    case 'published':
      return 'bg-emerald-600/20 text-emerald-100 border border-emerald-500/30'
    case 'scheduled':
      return 'bg-cyan-600/18 text-cyan-100 border border-cyan-500/28'
    case 'queued':
    case 'drafted':
      return 'bg-violet-600/20 text-violet-100 border border-violet-500/28'
    case 'shortlisted':
    case 'detected':
      return 'bg-sky-600/15 text-sky-100/90 border border-sky-500/25'
    case 'ignored':
    case 'rejected':
      return 'bg-zinc-800/80 text-zinc-500 border border-zinc-700/60'
    case 'escalated':
      return 'bg-rose-600/22 text-rose-100 border border-rose-500/32'
  }
}

function autonomyActionChipClass(action: AutonomyAction): string {
  switch (action) {
    case 'publish':
      return 'bg-emerald-600/25 text-emerald-100 border border-emerald-500/35'
    case 'queue':
      return 'bg-teal-600/20 text-teal-100 border border-teal-500/30'
    case 'draft':
      return 'bg-violet-600/25 text-violet-100 border border-violet-500/35'
    case 'watch':
      return 'bg-sky-600/15 text-sky-100/95 border border-sky-500/25'
    case 'ignore':
      return 'bg-zinc-800/80 text-zinc-500 border border-zinc-700/60'
    default:
      return 'bg-rose-600/25 text-rose-100 border border-rose-500/35'
  }
}

function riskChipClass(risk: ContentOpportunity['risk_level']): string {
  switch (risk) {
    case 'high':
      return 'text-rose-300/95'
    case 'medium':
      return 'text-amber-200/90'
    default:
      return 'text-emerald-200/85'
  }
}

function formatConversionIntent(intent: ContentOpportunity['conversion_intent']): string {
  return intent.replace(/_/g, ' ')
}

function formatTeachingStyle(style: ContentOpportunity['explanation_style']): string {
  return style.replace(/_/g, ' ')
}

function priorityLabelChipClass(label: PriorityLabel): string {
  switch (label) {
    case 'critical':
      return 'bg-rose-600/25 text-rose-100 border border-rose-500/30'
    case 'high':
      return 'bg-orange-500/20 text-orange-100 border border-orange-500/25'
    case 'medium':
      return 'bg-amber-500/15 text-amber-100 border border-amber-500/20'
    default:
      return 'bg-zinc-700/50 text-zinc-300 border border-zinc-600/50'
  }
}

const PACKAGE_MODE_OPTIONS: { value: ContentGenerationMode; label: string }[] = [
  { value: 'caption_only', label: 'Caption only' },
  { value: 'caption_visual_concept', label: 'Caption + visual concept' },
  { value: 'caption_media_brief', label: 'Caption + media brief' },
  { value: 'full_content_package', label: 'Full package' },
]

export function ContentGenerator() {
  const [brandId, setBrandId] = useState(demoBrands[0].id)
  const brand = useMemo(
    () => demoBrands.find((b) => b.id === brandId) ?? demoBrands[0],
    [brandId],
  )

  const socialAccounts = useMemo(() => resolveSocialAccountsForBrand(brand), [brand])

  const trendUiEnabled = useMemo(() => isTrendOpportunitiesEnabled(), [])
  const signalSourceLabel = useMemo(
    () => (getSignalProviderMode() === 'remote' ? 'Remote ingest' : 'Local mocks'),
    [],
  )

  const [topic, setTopic] = useState('')
  const [result, setResult] = useState<SocialContent | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [opportunities, setOpportunities] = useState<ContentOpportunity[]>([])
  const [scoredBySignalId, setScoredBySignalId] = useState<Record<string, ScoredSignal>>({})
  const [trendLoading, setTrendLoading] = useState(trendUiEnabled)
  const [trendError, setTrendError] = useState<string | null>(null)
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null)
  const [packageMode, setPackageMode] = useState<ContentGenerationMode>('full_content_package')
  const [includeMultiPlatform, setIncludeMultiPlatform] = useState(false)
  const [contentPackage, setContentPackage] = useState<ContentPackage | null>(null)

  const opportunitiesSorted = useMemo(
    () => [...opportunities].sort((a, b) => b.priority_score - a.priority_score),
    [opportunities],
  )

  const selectedOpportunity = useMemo(
    () => opportunitiesSorted.find((o) => o.id === selectedOpportunityId) ?? null,
    [opportunitiesSorted, selectedOpportunityId],
  )

  const accountSurfaceVariants = useMemo(() => {
    if (!selectedOpportunity) return []
    return adaptContentForSocialAccounts({
      brand,
      opportunity: selectedOpportunity,
      accounts: socialAccounts,
      creativeBrief: contentPackage?.creative_brief,
    })
  }, [brand, selectedOpportunity, socialAccounts, contentPackage?.creative_brief])

  useEffect(() => {
    setSelectedOpportunityId(null)
    setContentPackage(null)
  }, [brandId])

  useEffect(() => {
    if (!trendUiEnabled) {
      setOpportunities([])
      setScoredBySignalId({})
      setTrendLoading(false)
      setTrendError(null)
      return
    }

    let cancelled = false
    ;(async () => {
      setTrendLoading(true)
      setTrendError(null)
      try {
        const bundle = await buildTrendPreviewForBrand(brand)
        if (cancelled) return
        const scoreMap: Record<string, ScoredSignal> = {}
        for (const s of bundle.scored_signals) {
          scoreMap[s.id] = s
        }
        setOpportunities(bundle.opportunities)
        setScoredBySignalId(scoreMap)
      } catch {
        if (!cancelled) {
          setTrendError('Could not load trend preview. Try refreshing the page.')
        }
      } finally {
        if (!cancelled) setTrendLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [brand, trendUiEnabled])

  const canSubmitTopic = topic.trim().length > 0 && !loading
  const canRunPackage = Boolean(selectedOpportunity) && !loading

  const displaySocial = contentPackage?.social ?? result

  async function handleGenerateTopic() {
    setError(null)
    setContentPackage(null)
    setLoading(true)
    try {
      const data = await generateSocialContent(topic)
      setResult(data)
    } catch (e) {
      setResult(null)
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGeneratePackage() {
    if (!selectedOpportunity) {
      setError('Select a trend opportunity first.')
      return
    }
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const pkg = await generateContentPackage({
        opportunity: selectedOpportunity,
        brand,
        mode: packageMode,
        platformAdaptation: includeMultiPlatform ? 'multi' : 'off',
      })
      setContentPackage(pkg)
    } catch (e) {
      setContentPackage(null)
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl space-y-10">
      <header className="space-y-2 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300/90">
          Multi-domain · Creative engine
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          JifunzeAI
        </h1>
        <p className="text-sm text-zinc-400">
          Shared intelligence → per-platform adaptation (X, Instagram, Facebook, TikTok, LinkedIn) —
          lightweight previews, autonomy-first.
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-4 space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Active brand
        </h2>
        <label className="block space-y-1">
          <span className="text-xs text-zinc-500">Profile</span>
          <select
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500/50"
          >
            {demoBrands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <p className="text-xs leading-relaxed text-zinc-500">
          Primary domain:{' '}
          <span className="text-zinc-300">{brand.primaryDomain}</span>
          {brand.secondaryDomains?.length ? (
            <>
              {' '}
              · Also:{' '}
              <span className="text-zinc-300">{brand.secondaryDomains.join(', ')}</span>
            </>
          ) : null}
        </p>
        <LearningOptimizationPanel brand={brand} />

        <p className="text-[11px] leading-relaxed text-zinc-600">
          Connected surfaces (demo):{' '}
          {socialAccounts.length ? (
            <span className="text-zinc-400">
              {socialAccounts.map((a) => `${a.platform} @${a.handle}`).join(' · ')}
            </span>
          ) : (
            <span className="text-zinc-500">None — add social_accounts on the profile.</span>
          )}
        </p>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Trend opportunities
          </h2>
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

        {trendUiEnabled && !trendLoading && !trendError && opportunities.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No opportunities for this brand (forbidden categories or relevance). Try another
            profile.
          </p>
        ) : null}

        {trendUiEnabled && !trendLoading && !trendError && opportunities.length > 0 ? (
          <ul className="space-y-3">
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
                <li
                  key={opp.id}
                  className={`rounded-2xl border p-4 transition ${
                    selected
                      ? 'border-violet-500/50 bg-violet-950/20'
                      : 'border-zinc-800/80 bg-zinc-900/30'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedOpportunityId(opp.id)}
                    className="w-full text-left"
                  >
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
                      <span className="rounded border border-zinc-600/80 px-2 py-0.5 text-[10px] text-zinc-300">
                        Score {(opp.priority_score * 100).toFixed(0)}
                      </span>
                      <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-400">
                        {opp.suggested_content_format.replace(/_/g, ' ')}
                      </span>
                      {relevancePct !== null ? (
                        <span className="text-xs text-zinc-500">Rel ~{relevancePct}%</span>
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
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize tracking-wide ${lifecycleStatusChipClass(opp.lifecycle_status)}`}
                      >
                        {opp.lifecycle_status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-zinc-100">{opp.topic}</p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                      {opp.why_it_matters}
                    </p>
                    <dl className="mt-2 grid gap-1 text-[11px] text-zinc-500">
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
                          {opp.teaching_level} · {formatTeachingStyle(opp.explanation_style)}
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
                        <dd className="text-zinc-400">
                          {opp.lifecycle_status}{' '}
                          <span className="text-zinc-600">· {opp.lifecycle_driver}</span>
                        </dd>
                      </div>
                    </dl>
                    {opp.teaching_explainability.length ? (
                      <div className="mt-2 rounded-lg border border-indigo-900/30 bg-indigo-950/15 px-2 py-1.5 text-[10px] text-zinc-500">
                        <p className="font-medium text-indigo-200/90">Teaching trace</p>
                        <ul className="mt-1 list-inside list-disc space-y-0.5">
                          {opp.teaching_explainability.slice(0, 3).map((e, idx) => (
                            <li key={`${idx}-${e.what}`}>
                              <span className="text-zinc-300">{e.what}</span> — {e.why}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                      <span className="text-zinc-600">Autonomy:</span> {opp.autonomy_reason}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                      {opp.selection_reason}
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}
      </section>

      {trendUiEnabled && opportunities.length > 0 ? (
        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Creative studio
          </h2>
          {selectedOpportunity ? (
            <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/50 p-3 text-xs text-zinc-400 space-y-1">
              <p className="font-medium text-zinc-200">{selectedOpportunity.topic}</p>
              <p className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${priorityLabelChipClass(selectedOpportunity.priority_label)}`}
                >
                  {selectedOpportunity.priority_label}
                </span>
                <span>
                  {selectedOpportunity.content_domain} · score{' '}
                  {(selectedOpportunity.priority_score * 100).toFixed(0)}
                </span>
              </p>
              <p className="text-[11px] text-zinc-500">{selectedOpportunity.matched_domain}</p>
              <p className="text-[11px] text-zinc-500">
                Trend: {selectedOpportunity.trend_category.replace(/_/g, ' ')}
              </p>
              <p className="text-[11px] text-zinc-500">
                Conversion: {formatConversionIntent(selectedOpportunity.conversion_intent)}
              </p>
              <p className="text-[11px] text-zinc-400">CTA: {selectedOpportunity.suggested_cta}</p>
              <p className="text-[11px] text-zinc-500">
                Destination: {selectedOpportunity.target_destination}
              </p>
              <p className="text-[11px] text-zinc-500">
                Teaching: {selectedOpportunity.teaching_level} ·{' '}
                {formatTeachingStyle(selectedOpportunity.explanation_style)}
              </p>
              {selectedOpportunity.teaching_explainability.length ? (
                <ul className="list-inside list-disc text-[11px] text-zinc-500 space-y-0.5">
                  {selectedOpportunity.teaching_explainability.slice(0, 4).map((e, idx) => (
                    <li key={`teach-${idx}`}>
                      <span className="text-zinc-400">{e.what}</span> — {e.why}
                    </li>
                  ))}
                </ul>
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
              <p className="text-[11px] text-zinc-500">{selectedOpportunity.autonomy_reason}</p>
              <p className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize tracking-wide ${lifecycleStatusChipClass(selectedOpportunity.lifecycle_status)}`}
                >
                  {selectedOpportunity.lifecycle_status}
                </span>
                <span className="text-[11px] text-zinc-600">
                  {selectedOpportunity.lifecycle_driver} ·{' '}
                  {new Date(selectedOpportunity.lifecycle_updated_at).toLocaleString()}
                </span>
              </p>
              <p>Angle: {selectedOpportunity.suggested_angle}</p>
              <p>Format: {selectedOpportunity.suggested_content_format.replace(/_/g, ' ')}</p>
              <p className="text-[11px] text-zinc-500">{selectedOpportunity.selection_reason}</p>
            </div>
          ) : (
            <p className="text-xs text-zinc-500">Select an opportunity above.</p>
          )}
          <label className="block space-y-1">
            <span className="text-xs text-zinc-500">Package depth</span>
            <select
              value={packageMode}
              onChange={(e) => setPackageMode(e.target.value as ContentGenerationMode)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500/50"
            >
              {PACKAGE_MODE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-zinc-400">
            <input
              type="checkbox"
              checked={includeMultiPlatform}
              onChange={(e) => setIncludeMultiPlatform(e.target.checked)}
              className="rounded border-zinc-600 bg-zinc-950 text-violet-500 focus:ring-violet-500/40"
            />
            <span>Include multi-platform adaptation (X · Instagram · TikTok · Facebook)</span>
          </label>
          <button
            type="button"
            onClick={handleGeneratePackage}
            disabled={!canRunPackage}
            className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? 'Working…' : 'Generate from opportunity'}
          </button>
        </section>
      ) : null}

      {trendUiEnabled && selectedOpportunity ? (
        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-4 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Connected account previews
          </h2>
          <p className="text-[11px] text-zinc-500">
            Surfaces that match your connected handles — same intelligence, account-level cadence and
            blocks applied.
          </p>
          {accountSurfaceVariants.length === 0 ? (
            <p className="text-xs text-zinc-500">
              No eligible accounts (blocked trend, disconnected, or not in X/IG/TikTok/Facebook set).
            </p>
          ) : (
            <ul className="grid gap-3">
              {accountSurfaceVariants.map((v) => {
                const handle = socialAccounts.find((s) => s.id === v.social_account_id)?.handle
                return (
                  <li
                    key={v.social_account_id ?? v.platform}
                    className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-3 text-left text-xs text-zinc-400 space-y-1.5"
                  >
                    <p className="font-semibold capitalize text-zinc-200">
                      {v.platform}
                      {handle ? (
                        <span className="ml-1 font-normal text-zinc-500">@{handle}</span>
                      ) : null}
                    </p>
                    {v.hook ? (
                      <p className="text-[11px] font-medium text-zinc-200">{v.hook}</p>
                    ) : null}
                    <p className="leading-relaxed text-zinc-300">{v.caption}</p>
                    {v.hashtags ? (
                      <p className="font-mono text-[11px] text-violet-200/85">{v.hashtags}</p>
                    ) : null}
                    {v.cta ? <p className="text-[11px] text-zinc-500">CTA: {v.cta}</p> : null}
                    {v.conversion_intent ? (
                      <p className="text-[11px] text-zinc-500">
                        Intent: {formatConversionIntent(v.conversion_intent)}
                      </p>
                    ) : null}
                    {v.destination_reference ? (
                      <p className="text-[11px] text-zinc-500">Route: {v.destination_reference}</p>
                    ) : null}
                    {v.conversion_intent && v.cta && v.destination_reference ? (
                      <p className="text-[10px] leading-relaxed text-zinc-600">
                        {describeFunnelMapping({
                          platform: v.platform,
                          intent: v.conversion_intent,
                          cta: v.cta,
                          destinationReference: v.destination_reference,
                        })}
                      </p>
                    ) : null}
                    <p className="text-[11px] text-zinc-600">{v.mediaPlanSummary}</p>
                    <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                      Format: {v.recommendedFormat.replace(/_/g, ' ')}
                      {v.characterLimitStatus ? ` · ${v.characterLimitStatus.replace(/_/g, ' ')}` : ''}
                    </p>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      ) : null}

      <div className="space-y-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 shadow-xl shadow-black/20 backdrop-blur-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Manual topic
        </h2>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-zinc-300">Topic</span>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. spring product launch, weekly tips…"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none ring-violet-500/0 transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30"
          />
        </label>

        {error ? (
          <p className="text-sm text-rose-400" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          onClick={handleGenerateTopic}
          disabled={!canSubmitTopic}
          className="flex w-full items-center justify-center rounded-xl border border-zinc-600 bg-zinc-800/80 px-4 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? 'Generating…' : 'Generate from topic'}
        </button>
      </div>

      {displaySocial ? (
        <section
          className="space-y-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6"
          aria-live="polite"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Output
            {contentPackage ? (
              <span className="ml-2 font-normal normal-case text-zinc-600">
                ({contentPackage.mode.replace(/_/g, ' ')})
              </span>
            ) : null}
          </h2>
          {contentPackage?.lifecycle_status ? (
            <div className="rounded-lg border border-zinc-800/70 bg-zinc-950/35 px-3 py-2 text-[11px] text-zinc-400">
              <span
                className={`mr-2 inline-flex rounded-full px-2 py-0.5 font-semibold capitalize tracking-wide ${lifecycleStatusChipClass(contentPackage.lifecycle_status)}`}
              >
                {contentPackage.lifecycle_status}
              </span>
              {contentPackage.source_opportunity_id ? (
                <span className="text-zinc-500">Opp {contentPackage.source_opportunity_id} · </span>
              ) : null}
              <span className="text-zinc-500">
                Analytics: pending (impressions, clicks, engagement, conversion hint, publish-time
                performance)
                {contentPackage.conversion_funnel_feedback ? (
                  <>
                    {' '}
                    · Funnel feedback: pending (impressions, clicks, engagement, conversion hint)
                  </>
                ) : null}
              </span>
            </div>
          ) : null}
          {contentPackage?.teaching_explainability && contentPackage.teaching_explainability.length ? (
            <div className="rounded-lg border border-indigo-900/40 bg-indigo-950/20 px-3 py-2 text-[11px] text-indigo-100/90 space-y-1">
              <p className="font-semibold text-indigo-200/95">Teaching explainability</p>
              <ul className="list-inside list-disc space-y-0.5 text-zinc-400">
                {contentPackage.teaching_explainability.map((e, idx) => (
                  <li key={`pkg-teach-${idx}`}>
                    <span className="text-zinc-200">{e.what}</span> — {e.why}
                    {e.influencedBy ? (
                      <span className="text-zinc-600"> · {e.influencedBy}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {contentPackage?.platform_adaptation ? (
            <div className="space-y-3 border-t border-zinc-800/80 pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Adapted surfaces
              </h3>
              <p className="text-[11px] text-zinc-600">
                One opportunity → four distinct platform-native variants (same brand, different shape
                and constraints).
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {contentPackage.platform_adaptation.variants.map((v) => (
                  <div
                    key={v.platform}
                    className="rounded-xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/75 to-zinc-950 p-4 text-left shadow-inner shadow-black/20"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/95">
                      {v.platform}
                    </p>
                    {v.title ? (
                      <p className="mt-1 text-sm font-medium text-zinc-100">{v.title}</p>
                    ) : null}
                    {v.hook ? (
                      <p className="mt-1 text-xs font-medium text-zinc-300">{v.hook}</p>
                    ) : null}
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
                      {v.caption}
                    </p>
                    {v.hashtags ? (
                      <p className="mt-2 font-mono text-xs text-violet-200/90">{v.hashtags}</p>
                    ) : null}
                    {v.cta ? (
                      <p className="mt-2 text-xs text-zinc-400">
                        <span className="text-zinc-600">CTA:</span> {v.cta}
                      </p>
                    ) : null}
                    {v.conversion_intent ? (
                      <p className="mt-1 text-[11px] text-zinc-500">
                        <span className="text-zinc-600">Intent:</span>{' '}
                        {formatConversionIntent(v.conversion_intent)}
                      </p>
                    ) : null}
                    {v.destination_reference ? (
                      <p className="mt-1 text-[11px] text-zinc-500">
                        <span className="text-zinc-600">Route:</span> {v.destination_reference}
                      </p>
                    ) : null}
                    {v.conversion_intent && v.cta && v.destination_reference ? (
                      <p className="mt-2 text-[10px] leading-relaxed text-zinc-600">
                        {describeFunnelMapping({
                          platform: v.platform,
                          intent: v.conversion_intent,
                          cta: v.cta,
                          destinationReference: v.destination_reference,
                        })}
                      </p>
                    ) : null}
                    {v.thread_continuation_hint ? (
                      <p className="mt-1 text-[11px] text-sky-300/90">
                        <span className="text-zinc-600">Thread:</span> {v.thread_continuation_hint}
                      </p>
                    ) : null}
                    {v.visual_note ? (
                      <p className="mt-2 text-[11px] text-zinc-500">
                        <span className="text-zinc-600">Visual note:</span> {v.visual_note}
                      </p>
                    ) : null}
                    {v.video_concept ? (
                      <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                        <span className="text-zinc-600">Video concept:</span> {v.video_concept}
                      </p>
                    ) : null}
                    {v.on_screen_text_suggestion ? (
                      <p className="mt-1 font-medium text-[11px] text-amber-200/90">
                        On-screen: {v.on_screen_text_suggestion}
                      </p>
                    ) : null}
                    {v.community_cta ? (
                      <p className="mt-2 text-[11px] text-zinc-500">
                        <span className="text-zinc-600">Community:</span> {v.community_cta}
                      </p>
                    ) : null}
                    <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">{v.mediaPlanSummary}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-wide text-zinc-600">
                      {v.recommendedFormat.replace(/_/g, ' ')}
                      {v.characterLimitStatus
                        ? ` · ${v.characterLimitStatus.replace(/_/g, ' ')}`
                        : ''}
                    </p>
                    {v.publishingNotes ? (
                      <p className="mt-1 text-[10px] text-zinc-600">{v.publishingNotes}</p>
                    ) : null}
                    {v.quality_check && v.quality_check.adjustments_applied.length > 0 ? (
                      <p className="mt-2 text-[10px] text-zinc-600">
                        <span className="text-zinc-500">QA:</span>{' '}
                        {v.quality_check.adjustments_applied.join(' · ')}
                      </p>
                    ) : null}
                    <p className="mt-3 border-t border-zinc-800/60 pt-2 text-[10px] leading-relaxed text-zinc-600">
                      {v.adaptationRationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Caption
              </h3>
              <p className="text-sm leading-relaxed text-zinc-200">{displaySocial.caption}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Hashtags
              </h3>
              <p className="font-mono text-sm text-violet-200/95">{displaySocial.hashtags}</p>
            </div>
          </div>

          {contentPackage?.creative_brief ? (
            <div className="space-y-2 border-t border-zinc-800/80 pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Creative brief
              </h3>
              <dl className="grid gap-2 text-xs text-zinc-400">
                <div>
                  <dt className="text-zinc-600">Caption direction</dt>
                  <dd className="text-zinc-300">{contentPackage.creative_brief.caption_direction}</dd>
                </div>
                <div>
                  <dt className="text-zinc-600">Visual</dt>
                  <dd className="text-zinc-300">{contentPackage.creative_brief.visual_direction}</dd>
                </div>
                <div>
                  <dt className="text-zinc-600">Animation</dt>
                  <dd className="text-zinc-300">{contentPackage.creative_brief.animation_direction}</dd>
                </div>
                <div>
                  <dt className="text-zinc-600">Mood / style</dt>
                  <dd className="text-zinc-300">{contentPackage.creative_brief.mood_style_notes}</dd>
                </div>
                {contentPackage.creative_brief.teaching_rubric ? (
                  <div>
                    <dt className="text-zinc-600">Teaching rubric</dt>
                    <dd className="text-zinc-300 leading-relaxed">
                      {contentPackage.creative_brief.teaching_rubric}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-zinc-600">Aspect ratio</dt>
                  <dd className="text-zinc-300">
                    {contentPackage.creative_brief.recommended_aspect_ratio}
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-600">Platforms</dt>
                  <dd className="text-zinc-300">
                    {contentPackage.creative_brief.recommended_platform_usage}
                  </dd>
                </div>
              </dl>
            </div>
          ) : null}

          {contentPackage?.visual_concept_summary ? (
            <div className="space-y-1 border-t border-zinc-800/80 pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Visual concept
              </h3>
              <p className="text-xs leading-relaxed text-zinc-400">
                {contentPackage.visual_concept_summary}
              </p>
            </div>
          ) : null}

          {contentPackage?.media_plans && contentPackage.media_plans.length > 0 ? (
            <div className="space-y-3 border-t border-zinc-800/80 pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Media plans (surfaces)
              </h3>
              <p className="text-[11px] text-zinc-600">
                Provider-agnostic specs — plug in generators later without changing this layer.
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {contentPackage.media_plans.map((plan) => (
                  <li
                    key={plan.kind}
                    className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-3 text-[11px] text-zinc-400"
                  >
                    <p className="font-semibold text-zinc-200">
                      {plan.kind.replace(/_/g, ' ')} — {plan.title}
                    </p>
                    <p className="mt-1 line-clamp-2">{plan.visual_style}</p>
                    <p className="mt-1 line-clamp-3 text-zinc-500">{plan.scene_description}</p>
                    {plan.motion_direction ? (
                      <p className="mt-1 text-zinc-500">
                        <span className="text-zinc-600">Motion:</span> {plan.motion_direction}
                      </p>
                    ) : null}
                    <p className="mt-1 line-clamp-2">
                      <span className="text-zinc-600">On-screen:</span> {plan.on_screen_text_suggestions}
                    </p>
                    {plan.music_mood_suggestion ? (
                      <p className="mt-1 line-clamp-2">
                        <span className="text-zinc-600">Audio:</span> {plan.music_mood_suggestion}
                      </p>
                    ) : null}
                    <p className="mt-1 line-clamp-3 text-violet-200/80">{plan.asset_prompt}</p>
                    <p className="mt-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-wide text-zinc-600">
                      <span>Complexity: {plan.production_complexity}</span>
                      <span>·</span>
                      <span>{plan.realism_level}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {contentPackage?.media_prompts ? (
            <div className="space-y-2 border-t border-zinc-800/80 pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Media prompts (mock)
              </h3>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li>
                  <span className="text-zinc-600">Image:</span>{' '}
                  <span className="text-zinc-300">{contentPackage.media_prompts.image_prompt}</span>
                </li>
                <li>
                  <span className="text-zinc-600">Poster:</span>{' '}
                  <span className="text-zinc-300">{contentPackage.media_prompts.poster_prompt}</span>
                </li>
                <li>
                  <span className="text-zinc-600">Animation:</span>{' '}
                  <span className="text-zinc-300">
                    {contentPackage.media_prompts.animation_prompt}
                  </span>
                </li>
                <li>
                  <span className="text-zinc-600">Storyboard:</span>{' '}
                  <span className="text-zinc-300">
                    {contentPackage.media_prompts.storyboard_summary}
                  </span>
                </li>
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  )
}
