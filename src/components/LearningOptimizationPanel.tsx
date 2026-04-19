import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { SupabaseClient } from '@supabase/supabase-js'
import {
  getBrandLearningState,
  recordPublishedContentPerformance,
} from '../services/learning'
import { getPersistence } from '../persistence/registry'
import type { StoredLearningLabRun } from '../types/storedRecords'
import { analyzeTeachingPerformance, type TeachingPerformanceAnalysis } from '../services/teaching'
import type { PublishedContentPerformance, BrandLearningState } from '../types/performanceLearning'
import type { BrandProfile } from '../types/brand'
import { isWorkspaceTenantId } from '../persistence/tenantPersistenceMode'
import { useAuth } from '../auth/AuthContext'
import {
  logLearningUiErrorUnlessStaleSession,
  USER_MSG_SUPABASE_NOT_READY,
  userFacingLearningError,
} from '../lib/learningUiErrors'
import { jifunzeCriticalLog } from '../lib/jifunzeTelemetry'

type Props = {
  brand: BrandProfile
  tenantId: string
  supabase: SupabaseClient | null
  /** Increment to refetch learning after external simulation writes. */
  refreshSignal?: number
  /** `compact`: short snapshot + link to full insights page. `full`: complete readout (default). */
  variant?: 'full' | 'compact'
  /** Route for “full learning insights” (compact variant). */
  insightsHref?: string
}

const emptyTeaching: TeachingPerformanceAnalysis = {
  brandProfileId: '',
  sampleCount: 0,
  globalTeachingScore: null,
  byStyle: [],
  byLevel: [],
  byStyleSavesShare: [],
  simplifyComplex: false,
  deepenOk: false,
  breakdownSavesSharesStrong: false,
  jargonHeavyWeak: false,
  beginnerStepByStepStrong: false,
}

/**
 * Lightweight readout of performance memory + derived insights (tenant-scoped Supabase or in-memory).
 */
export function LearningOptimizationPanel({
  brand,
  tenantId,
  supabase,
  refreshSignal = 0,
  variant = 'full',
  insightsHref = '/insights',
}: Props) {
  const { user, session, signOutPending } = useAuth()
  const [refresh, setRefresh] = useState(0)
  const [state, setState] = useState<BrandLearningState | undefined>(undefined)
  const [teachingAnalysis, setTeachingAnalysis] = useState<TeachingPerformanceAnalysis>(emptyTeaching)
  const [labRuns, setLabRuns] = useState<StoredLearningLabRun[]>([])
  const [panelLoading, setPanelLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!user || signOutPending || !session?.user) {
        setState(undefined)
        setTeachingAnalysis(emptyTeaching)
        setLabRuns([])
        setLoadError(null)
        setPanelLoading(false)
        return
      }
      setPanelLoading(true)
      setLoadError(null)
      if (isWorkspaceTenantId(tenantId) && !supabase) {
        if (!cancelled) {
          setLoadError(USER_MSG_SUPABASE_NOT_READY)
          setPanelLoading(false)
        }
        return
      }
      try {
        const [s, t, runs] = await Promise.all([
          getBrandLearningState(brand.id, tenantId, supabase ?? undefined, {
            persistLearningSnapshot: false,
          }),
          analyzeTeachingPerformance(brand.id, tenantId, supabase ?? undefined),
          getPersistence(tenantId, supabase ?? undefined).labHistory.listRunsForBrand(brand.id, {
            limit: 12,
          }),
        ])
        if (cancelled || !user || signOutPending || !session?.user) {
          return
        }
        if (supabase) {
          const {
            data: { session: sNow },
          } = await supabase.auth.getSession()
          if (!sNow?.user) return
        }
        setState(s)
        setTeachingAnalysis(t)
        setLabRuns(runs)
        setActionError(null)
      } catch (e) {
        const stale = cancelled || signOutPending || !session?.user
        logLearningUiErrorUnlessStaleSession('LearningOptimizationPanel load', e, stale)
        if (!cancelled && user && session?.user && !signOutPending) {
          const err = e as { message?: string; code?: string; details?: string; hint?: string; status?: number }
          console.error('[LearningLab RLS]', {
            phase: 'load',
            userId: user?.id ?? null,
            userEmail: user?.email ?? null,
            tenantId,
            brandProfileId: brand.id,
            supabaseConfigured: Boolean(supabase),
            error: {
              message: err?.message ?? String(e),
              code: err?.code ?? null,
              details: err?.details ?? null,
              hint: err?.hint ?? null,
              status: err?.status ?? null,
            },
          })
          setState(undefined)
          setTeachingAnalysis(emptyTeaching)
          setLabRuns([])
          setLoadError(userFacingLearningError(e, 'Unexpected error while loading learning data.'))
        }
      } finally {
        if (!cancelled) setPanelLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [brand.id, tenantId, supabase, refresh, refreshSignal, session?.user, signOutPending, user])

  async function addDemoWin() {
    if (!user || signOutPending || !session?.user) return
    setActionError(null)
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
    try {
      if (supabase) {
        const {
          data: { session: sNow },
        } = await supabase.auth.getSession()
        if (!sNow?.user || signOutPending) return
      }
      await recordPublishedContentPerformance(row, tenantId, supabase ?? undefined)
      if (!user || signOutPending || !session?.user) return
      const rows = await getPersistence(tenantId, supabase ?? undefined).performance.listForBrand(brand.id)
      const found = rows.some((r) => r.id === row.id)
      if (!found) {
        jifunzeCriticalLog({
          action: 'learning_demo_win_persist',
          userId: user?.id ?? null,
          tenantId,
          brandProfileId: brand.id,
          status: 'error',
          error: { message: 'Readback did not return saved performance row.' },
        })
        setActionError('Could not verify the saved row. Check permissions and try again.')
        return
      }
      jifunzeCriticalLog({
        action: 'learning_demo_win_persist',
        userId: user?.id ?? null,
        tenantId,
        brandProfileId: brand.id,
        status: 'ok',
      })
      setRefresh((n) => n + 1)
    } catch (e) {
      logLearningUiErrorUnlessStaleSession(
        'LearningOptimizationPanel recordDemoWin',
        e,
        signOutPending || !session?.user,
      )
      if (signOutPending || !session?.user) return
      const err = e as { message?: string; code?: string; details?: string; hint?: string; status?: number }
      console.error('[LearningLab RLS]', {
        phase: 'record_demo_win',
        userId: user?.id ?? null,
        userEmail: user?.email ?? null,
        tenantId,
        brandProfileId: brand.id,
        error: {
          message: err?.message ?? String(e),
          code: err?.code ?? null,
          details: err?.details ?? null,
          hint: err?.hint ?? null,
          status: err?.status ?? null,
        },
      })
      setActionError(userFacingLearningError(e, 'Unexpected error while recording demo win.'))
    }
  }

  if (panelLoading) {
    return (
      <section className="rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 p-4">
        <p className="text-xs text-zinc-500">Loading learning snapshot…</p>
      </section>
    )
  }

  if (loadError || !state) {
    return (
      <section className="rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 p-4">
        <p className="text-xs text-rose-400" role="alert">
          {loadError ??
            'Learning state is missing. Refresh the page; if it persists, check the browser console ([Learning Lab / Trend]).'}
        </p>
      </section>
    )
  }

  const strong = state.insights.filter((i) => i.kind.startsWith('strong')).slice(0, 4)
  const weakWatch = state.insights.filter((i) => i.kind.startsWith('weak')).slice(0, 4)
  const recs = state.recommendations.slice(0, 5)

  if (variant === 'compact') {
    const strongTop = strong.slice(0, 3)
    const weakTop = weakWatch.slice(0, 2)
    const summaryLine =
      state.learnedSummaryLines[0] ??
      (state.snapshot.sampleCount > 0
        ? `Learning from ${state.snapshot.sampleCount} performance row(s).`
        : 'Performance memory is warming up—publish or record outcomes to build patterns.')

    return (
      <section className="rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 p-4 space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
              Learning snapshot
            </h2>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
              Strongest signals and watch-outs from your workspace memory—details on the insights
              page.
            </p>
          </div>
          <Link
            to={insightsHref}
            className="shrink-0 rounded-lg border border-violet-500/35 bg-violet-950/30 px-2.5 py-1.5 text-[11px] font-semibold text-violet-100/95 transition hover:border-violet-400/50 hover:bg-violet-950/45"
          >
            Full insights
          </Link>
        </div>

        <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 px-3 py-2 text-[11px] text-zinc-400">
          <span className="text-zinc-500">Memory · </span>
          {state.snapshot.sampleCount} rows
          {state.snapshot.weightedAvgEngagementRate != null
            ? ` · weighted avg ER ${(state.snapshot.weightedAvgEngagementRate * 100).toFixed(2)}%`
            : null}
        </div>

        <p className="text-[11px] leading-relaxed text-zinc-300/90">{summaryLine}</p>

        {strongTop.length > 0 ? (
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300/85">
              Strongest patterns
            </p>
            <ul className="space-y-2">
              {strongTop.map((ins) => (
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
        ) : (
          <p className="text-[11px] text-zinc-500">No strong patterns yet—add performance rows or run the lab.</p>
        )}

        {weakTop.length > 0 ? (
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-300/85">
              Watch-outs
            </p>
            <ul className="space-y-2">
              {weakTop.map((ins) => (
                <li
                  key={ins.id}
                  className="rounded-lg border border-amber-900/35 bg-amber-950/15 px-3 py-2 text-[11px] text-amber-100/90"
                >
                  <p className="font-medium text-amber-50/95">{ins.subject}</p>
                  <p className="mt-0.5 text-amber-200/75">
                    {ins.kind.replace(/_/g, ' ')}
                    {ins.value != null ? ` · ~${(ins.value * 100).toFixed(2)}% ER` : ''} · n=
                    {ins.sampleSize}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-[11px] text-zinc-500">No watch-out patterns flagged yet.</p>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Link
            to={insightsHref}
            className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-violet-500"
          >
            View full learning insights
          </Link>
          <span className="text-[10px] text-zinc-600">Teaching detail, recommendations, lab history</span>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Learning & optimization
        </h2>
        <button
          type="button"
          onClick={() => void addDemoWin()}
          className="rounded-lg border border-teal-600/40 bg-teal-950/40 px-2.5 py-1 text-[11px] font-medium text-teal-100/95 transition hover:border-teal-500/50"
        >
          Record demo win
        </button>
      </div>
      <p className="text-[11px] leading-relaxed text-zinc-500">
        Performance memory is scoped to this workspace (tenant). Use “Record demo win” to simulate a
        strong post and re-run analysis.
      </p>
      {actionError ? (
        <p className="text-xs text-rose-400" role="alert">
          {actionError}
        </p>
      ) : null}

      <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 px-3 py-2.5 space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Snapshot</p>
        <p className="text-xs text-zinc-300">
          {state.snapshot.sampleCount} rows · weighted avg ER{' '}
          {state.snapshot.weightedAvgEngagementRate != null
            ? `${(state.snapshot.weightedAvgEngagementRate * 100).toFixed(2)}%`
            : '—'}
        </p>
      </div>

      <div className="rounded-xl border border-violet-900/30 bg-violet-950/15 px-3 py-2.5 space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-300/90">
          Recent lab runs (durable)
        </p>
        {labRuns.length ? (
          <ul className="space-y-1 text-[11px] text-zinc-400">
            {labRuns.map((r) => (
              <li key={r.id} className="flex flex-col gap-0.5 border-b border-zinc-800/50 pb-1 last:border-0 last:pb-0">
                <span className="text-zinc-500">
                  {new Date(r.ranAt).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <span>
                  Signals {r.rawCount}→{r.guardedCount}→{r.scoredCount} · opportunities{' '}
                  {r.opportunitiesCount}
                  {r.simulationRowsWritten ? ` · sim rows +${r.simulationRowsWritten}` : ''}
                  {typeof r.performanceRowCount === 'number' ? ` · memory ${r.performanceRowCount} rows` : ''}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[11px] text-zinc-500">
            No runs logged yet. Refresh trend opportunities once; runs persist per workspace (browser
            storage locally, Postgres when Supabase + UUID tenant).
          </p>
        )}
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
          {teachingAnalysis.breakdownSavesSharesStrong ? (
            <p className="text-[11px] text-sky-200/85">
              Signal: structured breakdowns earn more saves/shares — favor What/Why/How pacing.
            </p>
          ) : null}
          {teachingAnalysis.jargonHeavyWeak ? (
            <p className="text-[11px] text-amber-200/90">
              Signal: dense analogy/comparison pacing is trailing — prefer plainer step-by-step
              explainers.
            </p>
          ) : null}
          {teachingAnalysis.beginnerStepByStepStrong ? (
            <p className="text-[11px] text-emerald-200/85">
              Signal: beginner posts with numbered steps outperform other structures.
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
