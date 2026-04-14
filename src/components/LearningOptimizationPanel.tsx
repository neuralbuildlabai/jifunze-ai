import { useMemo, useState } from 'react'
import {
  getBrandLearningState,
  recordPublishedContentPerformance,
} from '../services/learning'
import { analyzeTeachingPerformance } from '../services/teaching'
import type { PublishedContentPerformance } from '../types/performanceLearning'
import type { BrandProfile } from '../types/brand'

type Props = {
  brand: BrandProfile
}

/**
 * Lightweight readout of performance memory + derived insights (MVP, in-browser store).
 */
export function LearningOptimizationPanel({ brand }: Props) {
  const [refresh, setRefresh] = useState(0)

  const state = useMemo(() => {
    void refresh
    return getBrandLearningState(brand.id)
  }, [brand.id, refresh])

  const teachingAnalysis = useMemo(() => {
    void refresh
    return analyzeTeachingPerformance(brand.id)
  }, [brand.id, refresh])

  const strong = state.insights.filter((i) => i.kind.startsWith('strong')).slice(0, 4)
  const recs = state.recommendations.slice(0, 5)

  function addDemoWin() {
    const row: PublishedContentPerformance = {
      id: `manual-win-${brand.id}-${Date.now()}`,
      contentItemId: `manual-${Date.now()}`,
      brandProfileId: brand.id,
      platform: 'instagram',
      publishedAt: new Date().toISOString(),
      domain: brand.primaryDomain,
      trendCategory: 'product_launch',
      contentFormat: 'carousel_concept',
      ctaType: 'dm',
      hookStyle: 'first_frame',
      impressions: 5200,
      reach: 4800,
      clicks: 210,
      likes: 820,
      comments: 96,
      shares: 140,
      saves: 260,
      engagementRate: 0.11,
      conversionHint: 18,
      teachingLevel: 'beginner',
      explanationStyle: 'step_by_step',
      watchTimeProxySeconds: 48,
      bookmarks: 240,
      completionSignal: 0.42,
      engagementDepthScore: 0.38,
      metadata: { source: 'ui_demo_win' },
    }
    recordPublishedContentPerformance(row)
    setRefresh((n) => n + 1)
  }

  return (
    <section className="rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Learning & optimization
        </h2>
        <button
          type="button"
          onClick={addDemoWin}
          className="rounded-lg border border-teal-600/40 bg-teal-950/40 px-2.5 py-1 text-[11px] font-medium text-teal-100/95 transition hover:border-teal-500/50"
        >
          Record demo win
        </button>
      </div>
      <p className="text-[11px] leading-relaxed text-zinc-500">
        In-memory performance store (Supabase-ready shape). Seeded per brand for preview; use
        “Record demo win” to simulate a strong post and re-run analysis.
      </p>

      <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 px-3 py-2.5 space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Snapshot</p>
        <p className="text-xs text-zinc-300">
          {state.snapshot.sampleCount} rows · weighted avg ER{' '}
          {state.snapshot.weightedAvgEngagementRate != null
            ? `${(state.snapshot.weightedAvgEngagementRate * 100).toFixed(2)}%`
            : '—'}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          What Jifunze has learned
        </p>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-zinc-400">
          {state.learnedSummaryLines.map((line, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal-500/80" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      {teachingAnalysis.sampleCount > 0 ? (
        <div className="rounded-xl border border-sky-900/35 bg-sky-950/15 px-3 py-2.5 space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-400/95">
            Teaching effectiveness (memory)
          </p>
          <p className="text-[11px] text-sky-100/85">
            Tagged posts: {teachingAnalysis.sampleCount} · composite baseline{' '}
            {teachingAnalysis.globalTeachingScore != null
              ? teachingAnalysis.globalTeachingScore.toFixed(3)
              : '—'}
          </p>
          {teachingAnalysis.byStyle[0] ? (
            <p className="text-[11px] text-zinc-400">
              Strongest style:{' '}
              <span className="text-zinc-200">
                {teachingAnalysis.byStyle[0].style.replace(/_/g, ' ')} (
                {teachingAnalysis.byStyle[0].count} posts)
              </span>
            </p>
          ) : null}
          {teachingAnalysis.simplifyComplex ? (
            <p className="text-[11px] text-amber-200/90">
              Signal: simplify complex pacing — beginner + step-by-step is outperforming deep
              breakdowns.
            </p>
          ) : null}
        </div>
      ) : null}

      {strong.length > 0 ? (
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Top-performing patterns
          </p>
          <ul className="space-y-2">
            {strong.map((ins) => (
              <li
                key={ins.id}
                className="rounded-lg border border-emerald-900/40 bg-emerald-950/15 px-3 py-2 text-[11px] text-emerald-100/90"
              >
                <p className="font-medium text-emerald-50/95">{ins.subject}</p>
                <p className="mt-0.5 text-emerald-200/70">
                  {ins.kind.replace(/_/g, ' ')}
                  {ins.value != null ? ` · ~${(ins.value * 100).toFixed(2)}% ER` : ''} · n=
                  {ins.sampleSize}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {recs.length > 0 ? (
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Recommendations
          </p>
          <ul className="space-y-2">
            {recs.map((r) => (
              <li
                key={r.id}
                className="rounded-lg border border-violet-900/35 bg-violet-950/20 px-3 py-2 text-[11px] text-violet-100/90"
              >
                <p className="font-medium text-violet-50/95">{r.title}</p>
                <p className="mt-0.5 text-zinc-400">{r.rationale}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
