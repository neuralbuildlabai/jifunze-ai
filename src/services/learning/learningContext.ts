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
  const top = state.insights.filter((i) => i.kind.startsWith('strong')).slice(0, 3)
  for (const t of top) {
    lines.push(`Strength signal: ${t.subject}${t.value != null ? ` (~${(t.value * 100).toFixed(2)}% ER)` : ''}.`)
  }
  const risk = state.insights.filter((i) => i.kind === 'weak_combo' || i.kind === 'weak_format').slice(0, 2)
  for (const r of risk) {
    lines.push(`Watch-out: ${r.subject}.`)
  }
  return lines.slice(0, 6)
}

/**
 * Full learning bundle for a tenant (recompute is cheap at MVP scale).
 */
export function getBrandLearningState(brandProfileId: string): BrandLearningState {
  const { snapshot, insights } = analyzeBrandPerformance(brandProfileId)
  const recommendations = buildStrategyRecommendations(brandProfileId, insights)
  const learnedSummaryLines = summaryLines({
    brandProfileId,
    snapshot,
    insights,
    recommendations,
    learnedSummaryLines: [],
  })
  return {
    brandProfileId,
    snapshot,
    insights,
    recommendations,
    learnedSummaryLines,
  }
}

export function buildLearningContextLines(brandProfileId: string): string[] {
  const s = getBrandLearningState(brandProfileId)
  return [
    'Performance learning (rule-based, MVP):',
    ...s.learnedSummaryLines,
    ...s.recommendations.slice(0, 3).map((r) => `Rec: ${r.title} — ${r.rationale}`),
  ]
}

export function getLearningAdapterNotes(brandProfileId: string): string[] {
  const state = getBrandLearningState(brandProfileId)
  return state.recommendations.slice(0, 3).map((r) => r.title)
}
