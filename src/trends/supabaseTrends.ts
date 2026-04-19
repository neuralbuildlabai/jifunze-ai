import type { SupabaseClient } from '@supabase/supabase-js'
import { classifyPostgrestError, classifyUnknownError, type TrainingError } from '../training/trainingErrors'
import type {
  RecommendationRow,
  RecommendationStatus,
  TrendSignalRow,
  TrendSummaryRow,
  TrendTopicRow,
  TrendTopicStatus,
} from './trendTypes'

export function wrapTrendUnexpected(e: unknown): TrainingError {
  console.error('[JifunzeAI trends] unexpected error', e)
  return classifyUnknownError(e)
}

export async function sbListTrendTopics(
  supabase: SupabaseClient,
  workspaceId: string,
): Promise<{ data: TrendTopicRow[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('trend_topics')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('updated_at', { ascending: false })
  if (error) {
    console.error('[JifunzeAI trends] list topics failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as TrendTopicRow[], error: null }
}

export async function sbInsertTrendTopic(input: {
  supabase: SupabaseClient
  workspaceId: string
  userId: string
  name: string
  category: string | null
  sourceLabel: string | null
  status: TrendTopicStatus
}): Promise<{ data: TrendTopicRow | null; error: TrainingError | null }> {
  const row = {
    workspace_id: input.workspaceId,
    created_by: input.userId,
    name: input.name.trim(),
    category: input.category?.trim() ?? null,
    source_label: input.sourceLabel?.trim() ?? null,
    status: input.status,
    updated_at: new Date().toISOString(),
  }
  const { data, error } = await input.supabase.from('trend_topics').insert(row).select('*').single()
  if (error) {
    console.error('[JifunzeAI trends] insert topic failed', error)
    return { data: null, error: classifyPostgrestError(error) }
  }
  return { data: data as TrendTopicRow, error: null }
}

export async function sbUpdateTrendTopic(input: {
  supabase: SupabaseClient
  workspaceId: string
  topicId: string
  patch: Partial<{ name: string; category: string | null; source_label: string | null; status: TrendTopicStatus }>
}): Promise<{ error: TrainingError | null }> {
  const { error } = await input.supabase
    .from('trend_topics')
    .update({ ...input.patch, updated_at: new Date().toISOString() })
    .eq('id', input.topicId)
    .eq('workspace_id', input.workspaceId)
  if (error) {
    console.error('[JifunzeAI trends] update topic failed', error)
    return { error: classifyPostgrestError(error) }
  }
  return { error: null }
}

export async function sbListTrendSignals(
  supabase: SupabaseClient,
  workspaceId: string,
  topicId: string,
): Promise<{ data: TrendSignalRow[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('trend_signals')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('trend_topic_id', topicId)
    .order('captured_at', { ascending: false })
  if (error) {
    console.error('[JifunzeAI trends] list signals failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as TrendSignalRow[], error: null }
}

export async function sbInsertTrendSignal(input: {
  supabase: SupabaseClient
  workspaceId: string
  topicId: string
  sourceName: string
  signalText: string
  capturedAt: string | null
  freshnessLabel: string | null
  metadataJson: unknown | null
}): Promise<{ data: TrendSignalRow | null; error: TrainingError | null }> {
  const row = {
    workspace_id: input.workspaceId,
    trend_topic_id: input.topicId,
    source_name: input.sourceName.trim(),
    signal_text: input.signalText.trim(),
    captured_at: input.capturedAt ?? new Date().toISOString(),
    freshness_label: input.freshnessLabel?.trim() ?? null,
    metadata_json: input.metadataJson,
  }
  const { data, error } = await input.supabase.from('trend_signals').insert(row).select('*').single()
  if (error) {
    console.error('[JifunzeAI trends] insert signal failed', error)
    return { data: null, error: classifyPostgrestError(error) }
  }
  return { data: data as TrendSignalRow, error: null }
}

export async function sbListTrendSummaries(
  supabase: SupabaseClient,
  workspaceId: string,
  topicId: string,
): Promise<{ data: TrendSummaryRow[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('trend_summaries')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('trend_topic_id', topicId)
    .order('generated_at', { ascending: false })
  if (error) {
    console.error('[JifunzeAI trends] list summaries failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as TrendSummaryRow[], error: null }
}

export async function sbInsertTrendSummary(input: {
  supabase: SupabaseClient
  workspaceId: string
  topicId: string
  userId: string | null
  summaryText: string
  recurringThemesJson: unknown
  changesJson: unknown
  recommendedActionsJson: unknown
}): Promise<{ data: TrendSummaryRow | null; error: TrainingError | null }> {
  const row = {
    workspace_id: input.workspaceId,
    trend_topic_id: input.topicId,
    summary_text: input.summaryText,
    recurring_themes_json: input.recurringThemesJson,
    changes_json: input.changesJson,
    recommended_actions_json: input.recommendedActionsJson,
    generated_at: new Date().toISOString(),
    created_by: input.userId,
  }
  const { data, error } = await input.supabase.from('trend_summaries').insert(row).select('*').single()
  if (error) {
    console.error('[JifunzeAI trends] insert summary failed', error)
    return { data: null, error: classifyPostgrestError(error) }
  }
  return { data: data as TrendSummaryRow, error: null }
}

export async function sbListRecommendations(
  supabase: SupabaseClient,
  workspaceId: string,
): Promise<{ data: RecommendationRow[]; error: TrainingError | null }> {
  const { data, error } = await supabase
    .from('recommendations')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('updated_at', { ascending: false })
  if (error) {
    console.error('[JifunzeAI trends] list recommendations failed', error)
    return { data: [], error: classifyPostgrestError(error) }
  }
  return { data: (data ?? []) as RecommendationRow[], error: null }
}

export async function sbInsertRecommendation(input: {
  supabase: SupabaseClient
  workspaceId: string
  trendTopicId: string | null
  relatedTrainingPlanId: string | null
  type: string
  title: string
  description: string
  status: RecommendationStatus
}): Promise<{ data: RecommendationRow | null; error: TrainingError | null }> {
  const row = {
    workspace_id: input.workspaceId,
    trend_topic_id: input.trendTopicId,
    related_training_plan_id: input.relatedTrainingPlanId,
    type: input.type,
    title: input.title.trim(),
    description: input.description.trim(),
    status: input.status,
    updated_at: new Date().toISOString(),
  }
  const { data, error } = await input.supabase.from('recommendations').insert(row).select('*').single()
  if (error) {
    console.error('[JifunzeAI trends] insert recommendation failed', error)
    return { data: null, error: classifyPostgrestError(error) }
  }
  return { data: data as RecommendationRow, error: null }
}

export async function sbUpdateRecommendationStatus(input: {
  supabase: SupabaseClient
  workspaceId: string
  recommendationId: string
  status: RecommendationStatus
}): Promise<{ error: TrainingError | null }> {
  const { error } = await input.supabase
    .from('recommendations')
    .update({ status: input.status, updated_at: new Date().toISOString() })
    .eq('id', input.recommendationId)
    .eq('workspace_id', input.workspaceId)
  if (error) {
    console.error('[JifunzeAI trends] update recommendation failed', error)
    return { error: classifyPostgrestError(error) }
  }
  return { error: null }
}
