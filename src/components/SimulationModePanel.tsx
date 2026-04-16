import { useCallback, useEffect, useState } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useAuth } from '../auth/AuthContext'
import { setSimulationMode } from '../config/simulationMode'
import {
  logLearningUiErrorUnlessStaleSession,
  USER_MSG_SUPABASE_NOT_READY,
  userFacingLearningError,
} from '../lib/learningUiErrors'
import { jifunzeCriticalLog } from '../lib/jifunzeTelemetry'
import { isWorkspaceTenantId } from '../persistence/tenantPersistenceMode'
import { getBrandLearningState } from '../services/learning'
import { getPerformanceMemoryStore } from '../services/learning/performanceMemoryStore'
import { simulatePerformanceOnly } from '../services/simulation/simulatePerformanceOnly'
import { buildTrendPreviewForBrand } from '../services/trendPreview'
import type { TrendPreviewBundle } from '../services/trendPreview'
import type { BrandProfile } from '../types/brand'
import type { ContentOpportunity } from '../types/opportunity'
import type {
  BrandLearningState,
  OptimizationInsight,
  PublishedContentPerformance,
} from '../types/performanceLearning'
import type { ScoredSignal } from '../services/relevance/types'

type IterationLogEntry = {
  id: string
  at: string
  kind: 'full_iteration' | 'performance_only'
  signals: number
  opportunities: number
  simulationRowsWritten: number
  batchId?: string
}

type Props = {
  brand: BrandProfile | null
  tenantId: string
  supabase: SupabaseClient | null
  trendUiEnabled: boolean
  simulationMode: boolean
  onSimulationModeChange: (on: boolean) => void
  /** Apply a full ingest bundle (signals + opportunities) to the parent queue. */
  onApplyBundle: (bundle: TrendPreviewBundle) => void
  /** Replace opportunities after a performance-only pass (scored map unchanged). */
  onApplyOpportunities: (opportunities: ContentOpportunity[]) => void
  /** Bumps LearningOptimizationPanel refresh. */
  onLearningTick: () => void
  latestScoredSignals: ScoredSignal[]
  latestOpportunities: ContentOpportunity[]
}

function insightConfidenceLabel(i: OptimizationInsight): string {
  const ps = i.patternStrength ? ` · pattern ${i.patternStrength}` : ''
  return `${i.confidence} confidence${ps}`
}

function partitionInsights(insights: OptimizationInsight[]) {
  const winners = insights.filter((i) => i.kind.startsWith('strong'))
  const losers = insights.filter((i) => i.kind.startsWith('weak'))
  const other = insights.filter((i) => !i.kind.startsWith('strong') && !i.kind.startsWith('weak'))
  return { winners, losers, other }
}

export function SimulationModePanel({
  brand,
  tenantId,
  supabase,
  trendUiEnabled,
  simulationMode,
  onSimulationModeChange,
  onApplyBundle,
  onApplyOpportunities,
  onLearningTick,
  latestScoredSignals,
  latestOpportunities,
}: Props) {
  const { user, session, signOutPending } = useAuth()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [learning, setLearning] = useState<BrandLearningState | null>(null)
  const [lastBatchRows, setLastBatchRows] = useState<PublishedContentPerformance[]>([])
  const [lastBundleSummary, setLastBundleSummary] = useState<TrendPreviewBundle | null>(null)
  const [log, setLog] = useState<IterationLogEntry[]>([])

  const refreshLearning = useCallback(async () => {
    if (signOutPending || !user || !session?.user) {
      setLearning(null)
      setError(null)
      return
    }
    if (!brand) {
      setLearning(null)
      setError(null)
      return
    }
    if (isWorkspaceTenantId(tenantId) && !supabase) {
      setLearning(null)
      setError(USER_MSG_SUPABASE_NOT_READY)
      return
    }
    try {
      const s = await getBrandLearningState(brand.id, tenantId, supabase ?? undefined, {
        persistLearningSnapshot: false,
      })
      if (signOutPending || !session?.user) return
      if (supabase) {
        const {
          data: { session: sNow },
        } = await supabase.auth.getSession()
        if (!sNow?.user) return
      }
      setLearning(s)
      setError(null)
    } catch (e) {
      logLearningUiErrorUnlessStaleSession(
        'SimulationModePanel refreshLearning',
        e,
        signOutPending || !session?.user,
      )
      setLearning(null)
      if (!signOutPending && session?.user) {
        setError(userFacingLearningError(e, 'Unexpected error while refreshing learning state.'))
      }
    }
  }, [brand, session?.user, signOutPending, tenantId, supabase, user])

  useEffect(() => {
    void refreshLearning()
  }, [brand?.id, refreshLearning])

  async function loadRowsForBatch(batchId: string) {
    if (!brand || signOutPending || !user || !session?.user) return
    if (isWorkspaceTenantId(tenantId) && !supabase) {
      setLastBatchRows([])
      return
    }
    try {
      const rows = await getPerformanceMemoryStore(tenantId, supabase ?? undefined).listForBrand(brand.id)
      if (signOutPending || !session?.user) return
      if (supabase) {
        const {
          data: { session: sNow },
        } = await supabase.auth.getSession()
        if (!sNow?.user) return
      }
      const hit = rows.filter(
        (r) => (r.metadata as { simulation_batch_id?: string } | undefined)?.simulation_batch_id === batchId,
      )
      setLastBatchRows(hit)
    } catch (e) {
      logLearningUiErrorUnlessStaleSession(
        'SimulationModePanel loadRowsForBatch',
        e,
        signOutPending || !session?.user,
      )
      setLastBatchRows([])
      if (!signOutPending && session?.user) {
        setError(userFacingLearningError(e, 'Unexpected error while loading rows for this batch.'))
      }
    }
  }

  async function handleRunIteration() {
    if (!brand || !trendUiEnabled) return
    if (signOutPending || !user || !session?.user) return
    if (isWorkspaceTenantId(tenantId) && !supabase) {
      setError(USER_MSG_SUPABASE_NOT_READY)
      return
    }
    setBusy(true)
    setError(null)
    try {
      const bundle = await buildTrendPreviewForBrand(brand, {
        tenantId,
        supabase: supabase ?? undefined,
        enableSyntheticPerformance: simulationMode,
      })
      if (signOutPending || !session?.user) return
      if (supabase) {
        const {
          data: { session: sNow },
        } = await supabase.auth.getSession()
        if (!sNow?.user) return
      }
      if (bundle.trend_ingestion_error) {
        jifunzeCriticalLog({
          action: 'simulation_run_iteration',
          userId: user?.id ?? null,
          tenantId,
          brandProfileId: brand.id,
          status: 'error',
          error: bundle.trend_ingestion_error,
        })
        setError(`Trend ingestion unavailable. ${bundle.trend_ingestion_error.reason}`)
        setLastBundleSummary(null)
        return
      }
      jifunzeCriticalLog({
        action: 'simulation_run_iteration',
        userId: user?.id ?? null,
        tenantId,
        brandProfileId: brand.id,
        status: 'ok',
        detail: {
          batchId: bundle.simulation_batch_id,
          opportunities: bundle.opportunities.length,
          scored: bundle.scored_signals.length,
        },
      })
      onApplyBundle(bundle)
      setLastBundleSummary(bundle)
      if (bundle.simulation_rows_written > 0) {
        await loadRowsForBatch(bundle.simulation_batch_id)
      } else {
        setLastBatchRows([])
      }
      await refreshLearning()
      onLearningTick()
      const entry: IterationLogEntry = {
        id: `iter-${Date.now()}`,
        at: new Date().toISOString(),
        kind: 'full_iteration',
        signals: bundle.scored_signals.length,
        opportunities: bundle.opportunities.length,
        simulationRowsWritten: bundle.simulation_rows_written,
        batchId: bundle.simulation_batch_id,
      }
      setLog((prev) => [entry, ...prev].slice(0, 8))
    } catch (e) {
      logLearningUiErrorUnlessStaleSession(
        'SimulationModePanel runIteration',
        e,
        signOutPending || !session?.user,
      )
      if (!signOutPending && session?.user) {
        setError(userFacingLearningError(e, 'Unexpected error: iteration failed.'))
      }
    } finally {
      setBusy(false)
    }
  }

  async function handleSimulatePerformance() {
    if (!brand || !simulationMode) return
    if (latestScoredSignals.length === 0 || latestOpportunities.length === 0) {
      setError('Load trend opportunities first, then run this action.')
      return
    }
    if (signOutPending || !user || !session?.user) return
    if (isWorkspaceTenantId(tenantId) && !supabase) {
      setError(USER_MSG_SUPABASE_NOT_READY)
      return
    }
    setBusy(true)
    setError(null)
    try {
      const { rowsWritten, opportunities, batchId } = await simulatePerformanceOnly({
        brand,
        scored: latestScoredSignals,
        opportunities: latestOpportunities,
        tenantId,
        supabase: supabase ?? undefined,
      })
      if (signOutPending || !session?.user) return
      if (supabase) {
        const {
          data: { session: sNow },
        } = await supabase.auth.getSession()
        if (!sNow?.user) return
      }
      onApplyOpportunities(opportunities)
      if (rowsWritten > 0) await loadRowsForBatch(batchId)
      else setLastBatchRows([])
      await refreshLearning()
      onLearningTick()
      const entry: IterationLogEntry = {
        id: `perf-${Date.now()}`,
        at: new Date().toISOString(),
        kind: 'performance_only',
        signals: latestScoredSignals.length,
        opportunities: opportunities.length,
        simulationRowsWritten: rowsWritten,
        batchId,
      }
      setLog((prev) => [entry, ...prev].slice(0, 8))
    } catch (e) {
      logLearningUiErrorUnlessStaleSession(
        'SimulationModePanel simulatePerformance',
        e,
        signOutPending || !session?.user,
      )
      if (!signOutPending && session?.user) {
        setError(userFacingLearningError(e, 'Unexpected error: performance simulation failed.'))
      }
    } finally {
      setBusy(false)
    }
  }

  const { winners, losers } = learning ? partitionInsights(learning.insights) : { winners: [], losers: [] }

  return (
    <section className="rounded-2xl border border-amber-900/35 bg-gradient-to-b from-amber-950/20 to-zinc-950/80 p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-200/90">
          Learning lab
        </h2>
        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
          <span id="sim-mode-label" className="select-none">
            Simulation mode
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={simulationMode}
            aria-labelledby="sim-mode-label"
            onClick={() => {
              const next = !simulationMode
              setSimulationMode(next)
              onSimulationModeChange(next)
            }}
            className={`relative h-7 w-12 shrink-0 rounded-full border transition ${
              simulationMode
                ? 'border-amber-500/50 bg-amber-600/35'
                : 'border-zinc-600/80 bg-zinc-800/80'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 block h-5 w-5 rounded-full bg-zinc-100 shadow transition ${
                simulationMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="font-medium text-zinc-200">{simulationMode ? 'ON' : 'OFF'}</span>
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-zinc-500">
        When ON, trend iterations can write <span className="text-zinc-400">synthetic publish rows</span> and
        rebuild the queue so ranking, format, CTA, and platform hints move like a live stack — no external
        integrations required. When OFF, iterations still fetch mock/remote signals but do{' '}
        <span className="text-zinc-400">not</span> mutate performance memory.
      </p>

      {!trendUiEnabled ? (
        <p className="text-xs text-zinc-500">
          Trend opportunities are disabled in this build — enable `VITE_ENABLE_TREND_OPPORTUNITIES` to use the
          lab controls.
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!brand || !trendUiEnabled || busy}
          onClick={() => void handleRunIteration()}
          className="rounded-lg border border-amber-600/45 bg-amber-950/40 px-3 py-1.5 text-[11px] font-medium text-amber-100/95 transition hover:border-amber-500/55 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? 'Working…' : 'Run iteration'}
        </button>
        <button
          type="button"
          disabled={!brand || !trendUiEnabled || !simulationMode || busy || latestOpportunities.length === 0}
          onClick={() => void handleSimulatePerformance()}
          className="rounded-lg border border-zinc-600/70 bg-zinc-900/50 px-3 py-1.5 text-[11px] font-medium text-zinc-200 transition hover:border-zinc-500/60 disabled:cursor-not-allowed disabled:opacity-40"
          title={
            !simulationMode
              ? 'Turn Simulation mode ON to write synthetic outcomes.'
              : 'Adds another synthetic performance batch using the current scored signals.'
          }
        >
          Simulate performance
        </button>
      </div>

      {error ? (
        <p className="text-xs text-rose-400" role="alert">
          {error}
        </p>
      ) : null}

      {lastBundleSummary && trendUiEnabled ? (
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 px-3 py-2.5 space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Last full iteration</p>
          <ul className="text-[11px] text-zinc-400 space-y-0.5">
            <li>
              Signals (scored): <span className="text-zinc-200">{lastBundleSummary.scored_signals.length}</span>
            </li>
            <li>
              Opportunities: <span className="text-zinc-200">{lastBundleSummary.opportunities.length}</span>
            </li>
            <li>
              Synthetic rows written:{' '}
              <span className="text-zinc-200">{lastBundleSummary.simulation_rows_written}</span>
            </li>
          </ul>
          {lastBundleSummary.opportunities.slice(0, 3).map((o) => (
            <p key={o.id} className="text-[11px] text-zinc-300 truncate" title={o.topic}>
              · {o.topic}
            </p>
          ))}
        </div>
      ) : null}

      {lastBatchRows.length > 0 ? (
        <div className="rounded-xl border border-teal-900/35 bg-teal-950/15 px-3 py-2.5 space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-400/90">
            Synthetic performance (latest batch)
          </p>
          <ul className="max-h-40 space-y-1.5 overflow-y-auto text-[11px]">
            {lastBatchRows.map((r) => {
              const meta = r.metadata as {
                simulation_outcome?: string
                engagement_score?: number
                reach_estimate?: number
              }
              return (
                <li
                  key={r.id}
                  className="rounded-lg border border-teal-900/30 bg-zinc-950/40 px-2 py-1.5 text-teal-100/90"
                >
                  <span className="font-medium text-zinc-200">{String(r.platform)}</span>
                  {' · '}
                  <span className="text-zinc-400">{r.contentFormat.replace(/_/g, ' ')}</span>
                  {' · '}
                  <span className="text-zinc-500">{meta.simulation_outcome ?? '—'}</span>
                  {meta.engagement_score != null ? (
                    <span className="text-zinc-500"> · ER score {meta.engagement_score}</span>
                  ) : null}
                  {meta.reach_estimate != null ? (
                    <span className="text-zinc-500"> · reach ~{meta.reach_estimate}</span>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      {learning ? (
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-900/35 bg-emerald-950/10 px-3 py-2.5 space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400/90">
              Winning patterns
            </p>
            {winners.length ? (
              <ul className="space-y-1.5 text-[11px] text-emerald-100/90">
                {winners.slice(0, 6).map((i) => (
                  <li key={i.id}>
                    <span className="font-medium text-emerald-50/95">{i.subject}</span>
                    <span className="text-emerald-200/70"> · {insightConfidenceLabel(i)}</span>
                    {i.value != null ? (
                      <span className="text-emerald-200/60"> · ~{(i.value * 100).toFixed(2)}% ER</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[11px] text-zinc-500">No strong signals yet — run more iterations.</p>
            )}
          </div>
          <div className="rounded-xl border border-rose-900/35 bg-rose-950/10 px-3 py-2.5 space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-300/90">
              Losing / watch patterns
            </p>
            {losers.length ? (
              <ul className="space-y-1.5 text-[11px] text-rose-100/90">
                {losers.slice(0, 6).map((i) => (
                  <li key={i.id}>
                    <span className="font-medium text-rose-50/95">{i.subject}</span>
                    <span className="text-rose-200/70"> · {insightConfidenceLabel(i)}</span>
                    {i.value != null ? (
                      <span className="text-rose-200/60"> · ~{(i.value * 100).toFixed(2)}% ER</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[11px] text-zinc-500">No weak signals flagged — memory is thin or balanced.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-[11px] text-zinc-500">Learning state loads after a successful iteration.</p>
      )}

      {log.length > 0 ? (
        <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/30 px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Recent runs</p>
          <ul className="mt-1.5 space-y-1 text-[10px] text-zinc-500">
            {log.map((e) => (
              <li key={e.id}>
                <span className="text-zinc-400">{new Date(e.at).toLocaleTimeString()}</span>
                {' · '}
                {e.kind === 'full_iteration' ? 'Full iteration' : 'Performance only'}
                {' · '}
                {e.opportunities} opps · {e.simulationRowsWritten} sim rows
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
