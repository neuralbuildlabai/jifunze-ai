import type { SupabaseClient } from '@supabase/supabase-js'
import { getPersistence } from '../../persistence/registry'
import type { BrandLearningState } from '../../types/performanceLearning'
import { analyzeBrandPerformance } from './analyzePerformance'
import { buildStrategyRecommendations } from './buildRecommendations'

function summaryLines(state: BrandLearningState): string[] {
  const lines: string[] = []
  const er = state.snapshot.weightedAvgEngagementRate
  if (state.snapshot.sampleCount === 0) {
    lines.push('No performance memory yet — publish outcomes will start training priorities.')
    return lines
  }
  lines.push(
    `Memory: ${state.snapshot.sampleCount} published rows · weighted avg engagement ${er != null ? `${(er * 100).toFixed(2)}%` : 'n/a'}.`,
  )
  lines.push(
    'Rapid learning: weak / emerging / strong pattern tiers update with small samples — combo axes (format+surface, CTA+surface, teaching+surface) are weighted heavily.',
  )
  const top = state.insights.filter((i) => i.kind.startsWith('strong')).slice(0, 3)
  for (const t of top) {
    const tier = t.patternStrength ? ` (${t.patternStrength})` : ''
    lines.push(
      `Strength signal${tier}: ${t.subject}${t.value != null ? ` (~${(t.value * 100).toFixed(2)}% ER)` : ''}.`,
    )
  }
  const early = state.insights
    .filter((i) => i.patternStrength === 'weak' || i.patternStrength === 'emerging')
    .slice(0, 2)
  for (const e of early) {
    lines.push(
      `Directional hint (${e.patternStrength ?? 'n/a'} evidence): ${e.subject}${e.learningDirection ? ` — ${e.learningDirection}` : ''}.`,
    )
  }
  const risk = state.insights.filter((i) => i.kind === 'weak_combo' || i.kind === 'weak_format').slice(0, 2)
  for (const r of risk) {
    lines.push(`Watch-out: ${r.subject}.`)
  }
  return lines.slice(0, 8)
}

export type GetBrandLearningStateOptions = {
  /**
   * When `false`, skip persisting to `learning_snapshots` (read-only / UI refresh).
   * Default `true` for backward compatibility with content/opportunity pipelines.
   */
  persistLearningSnapshot?: boolean
}

const LEARNING_STATE_CACHE_TTL_MS = 30_000

type CachedLearningState = {
  state: BrandLearningState
  timestamp: number
}

const learningStateCache = new Map<string, CachedLearningState>()
const learningStateInFlight = new Map<string, Promise<BrandLearningState>>()

function learningStateCacheKey(
  tenantId: string,
  brandProfileId: string,
  options?: GetBrandLearningStateOptions,
): string {
  const persistLearningSnapshot = options?.persistLearningSnapshot !== false
  return `${tenantId}:${brandProfileId}:${persistLearningSnapshot}`
}

/**
 * Full learning bundle for a tenant (recompute is cheap at MVP scale).
 */
export async function getBrandLearningState(
  brandProfileId: string,
  tenantId: string,
  supabase?: SupabaseClient,
  options?: GetBrandLearningStateOptions,
): Promise<BrandLearningState> {
  const key = learningStateCacheKey(tenantId, brandProfileId, options)
  const active = learningStateInFlight.get(key)
  if (active) return active

  const cached = learningStateCache.get(key)
  if (cached && Date.now() - cached.timestamp < LEARNING_STATE_CACHE_TTL_MS) {
    return cached.state
  }

  const promise = (async (): Promise<BrandLearningState> => {
    const { snapshot, insights } = await analyzeBrandPerformance(brandProfileId, tenantId, supabase)
    const recommendations = buildStrategyRecommendations(brandProfileId, insights)
    const learnedSummaryLines = summaryLines({
      brandProfileId,
      snapshot,
      insights,
      recommendations,
      learnedSummaryLines: [],
    })
    const state: BrandLearningState = {
      brandProfileId,
      snapshot,
      insights,
      recommendations,
      learnedSummaryLines,
    }

    let shouldPersist = options?.persistLearningSnapshot !== false
    if (shouldPersist && supabase) {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session?.user) {
        shouldPersist = false
      }
    }
    if (shouldPersist) {
      await getPersistence(tenantId, supabase).learningSnapshots.save({
        brandProfileId,
        capturedAt: new Date().toISOString(),
        snapshot,
        insights,
        recommendations,
      })
    }
    learningStateCache.set(key, { state, timestamp: Date.now() })
    return state
  })()

  learningStateInFlight.set(key, promise)
  try {
    return await promise
  } finally {
    learningStateInFlight.delete(key)
  }
}

/** Same lines as {@link buildLearningContextLines} without fetching — use when you already have state. */
export function buildLearningContextLinesFromState(s: BrandLearningState): string[] {
  return [
    'Performance learning (rule-based, MVP):',
    ...s.learnedSummaryLines,
    ...s.recommendations.slice(0, 3).map((r) => `Rec: ${r.title} — ${r.rationale}`),
  ]
}

export async function buildLearningContextLines(
  brandProfileId: string,
  tenantId: string,
  supabase?: SupabaseClient,
): Promise<string[]> {
  const s = await getBrandLearningState(brandProfileId, tenantId, supabase)
  return buildLearningContextLinesFromState(s)
}

export async function getLearningAdapterNotes(
  brandProfileId: string,
  tenantId: string,
  supabase?: SupabaseClient,
): Promise<string[]> {
  const state = await getBrandLearningState(brandProfileId, tenantId, supabase)
  return state.recommendations.slice(0, 3).map((r) => r.title)
}
