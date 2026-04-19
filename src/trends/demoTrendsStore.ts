/**
 * Demo trend insights (sessionStorage) when Supabase is not used.
 */
import { generateSummaryFromSignals } from './trendSummaryGenerator'
import type {
  RecommendationRow,
  RecommendationStatus,
  TrendSignalRow,
  TrendSummaryRow,
  TrendTopicRow,
  TrendTopicStatus,
} from './trendTypes'

const STORAGE_KEY = 'jifunze.demo.trends.v1'

type DemoTrendState = {
  topics: TrendTopicRow[]
  signals: TrendSignalRow[]
  summaries: TrendSummaryRow[]
  recommendations: RecommendationRow[]
}

function nowIso(): string {
  return new Date().toISOString()
}

function emptyState(): DemoTrendState {
  return { topics: [], signals: [], summaries: [], recommendations: [] }
}

function loadState(): DemoTrendState {
  if (typeof sessionStorage === 'undefined') return emptyState()
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw) as DemoTrendState
    if (!parsed || !Array.isArray(parsed.topics)) return emptyState()
    return {
      topics: parsed.topics,
      signals: Array.isArray(parsed.signals) ? parsed.signals : [],
      summaries: Array.isArray(parsed.summaries) ? parsed.summaries : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
    }
  } catch (e) {
    console.error('[JifunzeAI demo trends] loadState failed', e)
    return emptyState()
  }
}

function saveState(state: DemoTrendState): void {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.error('[JifunzeAI demo trends] saveState failed', e)
  }
}

export function demoListTrendTopics(workspaceId: string): TrendTopicRow[] {
  return loadState()
    .topics.filter((t) => t.workspace_id === workspaceId)
    .sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1))
}

export function demoInsertTrendTopic(input: {
  workspaceId: string
  userId: string
  name: string
  category: string | null
  sourceLabel: string | null
  status: TrendTopicStatus
}): TrendTopicRow {
  const state = loadState()
  const t = nowIso()
  const row: TrendTopicRow = {
    id: crypto.randomUUID(),
    workspace_id: input.workspaceId,
    created_by: input.userId,
    name: input.name.trim(),
    category: input.category?.trim() ?? null,
    source_label: input.sourceLabel?.trim() ?? null,
    status: input.status,
    created_at: t,
    updated_at: t,
  }
  saveState({ ...state, topics: [row, ...state.topics] })
  return row
}

export function demoInsertTrendSignal(input: {
  workspaceId: string
  topicId: string
  sourceName: string
  signalText: string
  capturedAt: string | null
  freshnessLabel: string | null
  metadataJson: unknown | null
}): TrendSignalRow {
  const state = loadState()
  const t = nowIso()
  const row: TrendSignalRow = {
    id: crypto.randomUUID(),
    workspace_id: input.workspaceId,
    trend_topic_id: input.topicId,
    source_name: input.sourceName.trim(),
    signal_text: input.signalText.trim(),
    captured_at: input.capturedAt ?? t,
    freshness_label: input.freshnessLabel?.trim() ?? null,
    metadata_json: input.metadataJson,
    created_at: t,
  }
  const topics = state.topics.map((x) =>
    x.id === input.topicId ? { ...x, updated_at: t } : x,
  )
  saveState({ ...state, signals: [row, ...state.signals], topics })
  return row
}

export function demoListTrendSignals(workspaceId: string, topicId: string): TrendSignalRow[] {
  return loadState()
    .signals.filter((s) => s.workspace_id === workspaceId && s.trend_topic_id === topicId)
    .sort((a, b) => (a.captured_at < b.captured_at ? 1 : -1))
}

export function demoListTrendSummaries(workspaceId: string, topicId: string): TrendSummaryRow[] {
  return loadState()
    .summaries.filter((s) => s.workspace_id === workspaceId && s.trend_topic_id === topicId)
    .sort((a, b) => (a.generated_at < b.generated_at ? 1 : -1))
}

export function demoInsertTrendSummary(input: {
  workspaceId: string
  topicId: string
  userId: string | null
  summaryText: string
  recurringThemesJson: unknown
  changesJson: unknown
  recommendedActionsJson: unknown
}): TrendSummaryRow {
  const state = loadState()
  const t = nowIso()
  const row: TrendSummaryRow = {
    id: crypto.randomUUID(),
    workspace_id: input.workspaceId,
    trend_topic_id: input.topicId,
    summary_text: input.summaryText,
    recurring_themes_json: input.recurringThemesJson,
    changes_json: input.changesJson,
    recommended_actions_json: input.recommendedActionsJson,
    generated_at: t,
    created_by: input.userId,
  }
  const topics = state.topics.map((x) =>
    x.id === input.topicId ? { ...x, updated_at: t } : x,
  )
  saveState({ ...state, summaries: [row, ...state.summaries], topics })
  return row
}

export function demoGenerateAndStoreSummary(input: {
  workspaceId: string
  topicId: string
  topicName: string
  userId: string | null
}): TrendSummaryRow {
  const signals = demoListTrendSignals(input.workspaceId, input.topicId)
  const payload = generateSummaryFromSignals({ topicName: input.topicName, signals })
  return demoInsertTrendSummary({
    workspaceId: input.workspaceId,
    topicId: input.topicId,
    userId: input.userId,
    summaryText: payload.summary_text,
    recurringThemesJson: payload.recurring_themes_json,
    changesJson: payload.changes_json,
    recommendedActionsJson: payload.recommended_actions_json,
  })
}

export function demoListRecommendations(workspaceId: string): RecommendationRow[] {
  return loadState()
    .recommendations.filter((r) => r.workspace_id === workspaceId)
    .sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1))
}

export function demoInsertRecommendation(input: {
  workspaceId: string
  trendTopicId: string | null
  relatedTrainingPlanId: string | null
  type: string
  title: string
  description: string
  status: RecommendationStatus
}): RecommendationRow {
  const state = loadState()
  const t = nowIso()
  const row: RecommendationRow = {
    id: crypto.randomUUID(),
    workspace_id: input.workspaceId,
    trend_topic_id: input.trendTopicId,
    related_training_plan_id: input.relatedTrainingPlanId,
    type: input.type,
    title: input.title.trim(),
    description: input.description.trim(),
    status: input.status,
    created_at: t,
    updated_at: t,
  }
  saveState({ ...state, recommendations: [row, ...state.recommendations] })
  return row
}

export function demoUpdateRecommendationStatus(
  workspaceId: string,
  recommendationId: string,
  status: RecommendationStatus,
): void {
  const state = loadState()
  const t = nowIso()
  const recommendations = state.recommendations.map((r) =>
    r.id === recommendationId && r.workspace_id === workspaceId ? { ...r, status, updated_at: t } : r,
  )
  saveState({ ...state, recommendations })
}

/** Seed sample signals for a topic so “Generate summary” is meaningful immediately. */
export function demoAddSampleSignals(workspaceId: string, topicId: string, topicName: string): void {
  const samples = [
    {
      source: 'Community feedback',
      text: `Creators mention “${topicName}” when explaining why they pause posting during busy weeks.`,
    },
    {
      source: 'Support notes',
      text: 'Requests for clearer “next step” prompts after completing a lesson.',
    },
    {
      source: 'Simulated signal',
      text: 'Short-form video trends favor concise hooks; learners ask for more practice examples.',
    },
  ]
  for (const s of samples) {
    demoInsertTrendSignal({
      workspaceId,
      topicId,
      sourceName: s.source,
      signalText: s.text,
      capturedAt: null,
      freshnessLabel: 'recent',
      metadataJson: { demo: true },
    })
  }
}
