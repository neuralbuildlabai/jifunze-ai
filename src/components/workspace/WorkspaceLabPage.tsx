import { Link } from 'react-router-dom'
import { LearningOptimizationPanel } from '../LearningOptimizationPanel'
import { SimulationModePanel } from '../SimulationModePanel'
import { useWorkspaceGeneratorReady } from '../../workspace/WorkspaceGeneratorContext'
import { WorkspaceRouteReady, WorkspaceRouteShell } from './WorkspaceRouteReady'

function WorkspaceLabPageInner() {
  const {
    brand,
    tenantId,
    supabase,
    learningRefreshSignal,
    setLearningRefreshSignal,
    trendUiEnabled,
    simulationMode,
    setSimulationMode,
    applyTrendBundle,
    setOpportunities,
    setSelectedOpportunityId,
    latestScoredSignals,
    opportunities,
  } = useWorkspaceGeneratorReady()

  return (
    <WorkspaceRouteShell
        title="Learning lab"
        subtitle="Simulation, iteration, and signal ingest. This is advanced — default creation lives on Create and Studio."
      >
        <p className="text-[12px] leading-relaxed text-zinc-500">
          Full performance readouts and patterns live on{' '}
          <Link to="/insights" className="text-violet-300/90 hover:text-violet-200">
            Insights
          </Link>
          .
        </p>

        <LearningOptimizationPanel
          brand={brand}
          tenantId={tenantId}
          supabase={supabase}
          refreshSignal={learningRefreshSignal}
          variant="compact"
        />

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-4 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Simulation &amp; iteration
          </h2>
          <p className="text-[11px] leading-relaxed text-zinc-500">
            Tune synthetic performance, apply bundles, and rebuild opportunities without leaving the lab.
          </p>
          <SimulationModePanel
            brand={brand}
            tenantId={tenantId}
            supabase={supabase}
            trendUiEnabled={trendUiEnabled}
            simulationMode={simulationMode}
            onSimulationModeChange={setSimulationMode}
            onApplyBundle={applyTrendBundle}
            onApplyOpportunities={(opps) => {
              setOpportunities(opps)
              setSelectedOpportunityId((prev) => {
                if (prev && opps.some((o) => o.id === prev)) return prev
                return opps[0]?.id ?? null
              })
            }}
            onLearningTick={() => setLearningRefreshSignal((n) => n + 1)}
            latestScoredSignals={latestScoredSignals}
            latestOpportunities={opportunities}
          />
        </section>
    </WorkspaceRouteShell>
  )
}

export function WorkspaceLabPage() {
  return (
    <WorkspaceRouteReady>
      <WorkspaceLabPageInner />
    </WorkspaceRouteReady>
  )
}
