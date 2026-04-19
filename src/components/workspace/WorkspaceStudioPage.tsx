import { Link } from 'react-router-dom'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { describeFunnelMapping } from '../../services/conversion/funnelMap'
import { formatConversionIntent } from '../../lib/opportunityWorkspaceUi'
import { useWorkspaceGeneratorReady } from '../../workspace/WorkspaceGeneratorContext'
import type { ContentGenerationMode } from '../../types/contentPackage'
import { WorkspaceGenerationOutput } from '../WorkspaceGenerationOutput'
import { WorkspaceRouteReady, WorkspaceRouteShell } from './WorkspaceRouteReady'
import { PACKAGE_MODE_OPTIONS } from '../../workspace/useWorkspaceGeneratorModel'

function WorkspaceStudioPageInner() {
  const {
    trendUiEnabled,
    opportunities,
    selectedOpportunity,
    errorSurface,
    error,
    packageMode,
    setPackageMode,
    includeMultiPlatform,
    setIncludeMultiPlatform,
    handleGeneratePackage,
    canRunPackage,
    loading,
    generationKind,
    packageWaitHint,
    contentPackage,
    displaySocial,
    accountSurfaceVariants,
    socialAccounts,
    topic,
    setTopic,
    handleGenerateTopic,
    canSubmitTopic,
    topicWaitHint,
  } = useWorkspaceGeneratorReady()

  return (
    <WorkspaceRouteShell
      title="Studio"
      subtitle="Draft multi-part social packages from an idea you’re already working on—or from a plain-language topic."
    >
      <div className="space-y-8">
          <section
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-[13px] leading-relaxed text-zinc-300"
            data-testid="studio-how-it-works"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">How Studio works</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] text-zinc-300">
              <li>
                <span className="font-semibold text-zinc-100">Start from an Idea (recommended when available):</span> picks up structured context from{' '}
                <Link className="font-semibold text-zinc-100 underline-offset-2 hover:underline" to="/ideas">
                  Ideas
                </Link>{' '}
                so captions match your positioning—not a generic prompt.
              </li>
              <li>
                <span className="font-semibold text-zinc-100">Manual topic:</span> type a short topic line when you don’t have an Idea selected—Studio
                still drafts, but with less brand context.
              </li>
              <li>
                <span className="font-semibold text-zinc-100">Package depth:</span> controls how much structure you get (caption-only vs scripts/briefs vs a
                fuller package). More depth = more sections to edit.
              </li>
              <li>
                <span className="font-semibold text-zinc-100">Outputs:</span> appear directly below after you click generate—copy sections out as needed.
              </li>
            </ul>
          </section>
          {trendUiEnabled && opportunities.length > 0 && !selectedOpportunity ? (
            <p className="rounded-xl border border-amber-500/30 bg-amber-950/20 px-4 py-3 text-sm text-amber-100/90">
              Choose an idea on the{' '}
              <Link className="font-semibold text-amber-200 underline-offset-2 hover:underline" to="/ideas">
                Ideas
              </Link>{' '}
              page to unlock opportunity-based packages.
            </p>
          ) : null}

          {selectedOpportunity ? (
            <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/45 p-4 text-sm text-zinc-300">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">Working from</p>
                  <p className="mt-1 text-base font-semibold text-zinc-100">{selectedOpportunity.topic}</p>
                  <p className="mt-2 max-w-prose text-[13px] leading-relaxed text-zinc-400">
                    {selectedOpportunity.why_it_matters}
                  </p>
                </div>
                <Link
                  to="/ideas"
                  className="shrink-0 text-xs font-medium text-violet-300/90 hover:text-violet-200"
                >
                  Change idea
                </Link>
              </div>
            </div>
          ) : null}


      {errorSurface === 'studio' && error ? (
        <p className="text-sm text-rose-400" role="alert">
          {error}
        </p>
      ) : null}

      <label className="block space-y-1">
        <span className="text-xs text-zinc-500">Package depth (how much Studio generates)</span>
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
        {loading && generationKind === 'package' ? 'Working…' : 'Create post'}
      </button>
      {loading && generationKind === 'package' && packageWaitHint ? (
        <p className="text-center text-[11px] leading-relaxed text-zinc-500" aria-live="polite">
          {packageWaitHint}
        </p>
      ) : null}

      {trendUiEnabled &&
      opportunities.length > 0 &&
      contentPackage &&
      displaySocial ? (
        <div className="border-t border-zinc-800/70 pt-4">
          <WorkspaceGenerationOutput
            contentPackage={contentPackage}
            displaySocial={displaySocial}
          />
        </div>
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
    Manual topic (when no Idea is selected)
  </h2>
  <p className="text-[12px] leading-relaxed text-zinc-500">
    Use this when you want a fast draft from a phrase—Studio won’t invent brand facts; it turns your wording into structured post sections you can edit.
  </p>
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

  {errorSurface === 'manual' && error ? (
    <p className="text-sm text-rose-400" role="alert">
      {error}
    </p>
  ) : null}

  <button
    type="button"
    onClick={handleGenerateTopic}
    disabled={!canSubmitTopic}
    aria-busy={loading && generationKind === 'topic'}
    className="flex w-full items-center justify-center rounded-xl border border-zinc-600 bg-zinc-800/80 px-4 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
  >
    {loading && generationKind === 'topic' ? 'Generating…' : 'Generate from topic'}
  </button>
  {loading && generationKind === 'topic' && topicWaitHint ? (
    <p className="text-center text-[11px] leading-relaxed text-zinc-500" aria-live="polite">
      {topicWaitHint}
    </p>
  ) : null}
  {!loading && topic.trim().length > 0 ? (
    <p className="text-center text-[11px] text-zinc-600">
      Typical wait is 30–90s; progress updates appear below once you start.
    </p>
  ) : null}
</div>

{displaySocial &&
(!trendUiEnabled || opportunities.length === 0 || !contentPackage) ? (
  <WorkspaceGenerationOutput contentPackage={contentPackage} displaySocial={displaySocial} />
) : null}

          <TrustBoundaryStrip density="legalLink" variant="inline" compact dataTestId="studio-trust-boundary" />

        </div>
    </WorkspaceRouteShell>
  )
}

export function WorkspaceStudioPage() {
  return (
    <WorkspaceRouteReady>
      <WorkspaceStudioPageInner />
    </WorkspaceRouteReady>
  )
}
