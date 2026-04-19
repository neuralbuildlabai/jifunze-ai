export type TrendTopicStatus = 'active' | 'inactive'

export type TrendTopicRow = {
  id: string
  workspace_id: string
  created_by: string
  name: string
  category: string | null
  source_label: string | null
  status: TrendTopicStatus
  created_at: string
  updated_at: string
}

export type TrendSignalRow = {
  id: string
  workspace_id: string
  trend_topic_id: string
  source_name: string
  signal_text: string
  captured_at: string
  freshness_label: string | null
  metadata_json: unknown | null
  created_at: string
}

export type TrendSummaryRow = {
  id: string
  workspace_id: string
  trend_topic_id: string
  summary_text: string
  recurring_themes_json: unknown | null
  changes_json: unknown | null
  recommended_actions_json: unknown | null
  generated_at: string
  created_by: string | null
}

export type RecommendationStatus = 'new' | 'reviewed' | 'applied' | 'dismissed'

export type RecommendationRow = {
  id: string
  workspace_id: string
  trend_topic_id: string | null
  related_training_plan_id: string | null
  type: string
  title: string
  description: string
  status: RecommendationStatus
  created_at: string
  updated_at: string
}

export type RecommendationType =
  | 'training_plan'
  | 'content'
  | 'topic_alignment'
  | 'process'
  | string
