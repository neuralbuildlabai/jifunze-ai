import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import {
  demoAddSampleSignals,
  demoGenerateAndStoreSummary,
  demoInsertRecommendation,
  demoInsertTrendSignal,
  demoInsertTrendTopic,
  demoListRecommendations,
  demoListTrendSignals,
  demoListTrendSummaries,
  demoListTrendTopics,
  demoUpdateRecommendationStatus,
} from './demoTrendsStore'
import {
  sbInsertRecommendation,
  sbInsertTrendSignal,
  sbInsertTrendSummary,
  sbInsertTrendTopic,
  sbListRecommendations,
  sbListTrendSignals,
  sbListTrendSummaries,
  sbListTrendTopics,
  sbUpdateRecommendationStatus,
  wrapTrendUnexpected,
} from './supabaseTrends'
import { generateSummaryFromSignals } from './trendSummaryGenerator'
import type { RecommendationRow, TrendSignalRow, TrendSummaryRow, TrendTopicRow } from './trendTypes'
import { notConfiguredTrainingError, type TrainingError } from '../training/trainingErrors'
import { useTrainingWorkspace, type TrainingWorkspaceMode } from '../training/useTrainingWorkspace'

export function useTrendTopicsList(): {
  topics: TrendTopicRow[]
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [topics, setTopics] = useState<TrendTopicRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (mode.kind === 'blocked') {
      setTopics([])
      setError(notConfiguredTrainingError())
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      if (mode.kind === 'demo') {
        setTopics(demoListTrendTopics(mode.workspaceId))
      } else {
        const r = await sbListTrendTopics(mode.supabase, mode.workspaceId)
        if (r.error) {
          setError(r.error)
          setTopics([])
        } else {
          setTopics(r.data)
        }
      }
    } catch (e) {
      console.error('[JifunzeAI trends] useTrendTopicsList', e)
      setError(wrapTrendUnexpected(e))
      setTopics([])
    } finally {
      setLoading(false)
    }
  }, [mode])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { topics, loading, error, refetch }
}

export function useTrendSignals(topicId: string | undefined): {
  signals: TrendSignalRow[]
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [signals, setSignals] = useState<TrendSignalRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (!topicId) {
      setSignals([])
      setLoading(false)
      setError(null)
      return
    }
    if (mode.kind === 'blocked') {
      setSignals([])
      setError(notConfiguredTrainingError())
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      if (mode.kind === 'demo') {
        setSignals(demoListTrendSignals(mode.workspaceId, topicId))
      } else {
        const r = await sbListTrendSignals(mode.supabase, mode.workspaceId, topicId)
        if (r.error) {
          setError(r.error)
          setSignals([])
        } else {
          setSignals(r.data)
        }
      }
    } catch (e) {
      console.error('[JifunzeAI trends] useTrendSignals', e)
      setError(wrapTrendUnexpected(e))
      setSignals([])
    } finally {
      setLoading(false)
    }
  }, [mode, topicId])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { signals, loading, error, refetch }
}

export function useTrendSummaries(topicId: string | undefined): {
  summaries: TrendSummaryRow[]
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [summaries, setSummaries] = useState<TrendSummaryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (!topicId) {
      setSummaries([])
      setLoading(false)
      setError(null)
      return
    }
    if (mode.kind === 'blocked') {
      setSummaries([])
      setError(notConfiguredTrainingError())
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      if (mode.kind === 'demo') {
        setSummaries(demoListTrendSummaries(mode.workspaceId, topicId))
      } else {
        const r = await sbListTrendSummaries(mode.supabase, mode.workspaceId, topicId)
        if (r.error) {
          setError(r.error)
          setSummaries([])
        } else {
          setSummaries(r.data)
        }
      }
    } catch (e) {
      console.error('[JifunzeAI trends] useTrendSummaries', e)
      setError(wrapTrendUnexpected(e))
      setSummaries([])
    } finally {
      setLoading(false)
    }
  }, [mode, topicId])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { summaries, loading, error, refetch }
}

export function useRecommendationsList(): {
  recommendations: RecommendationRow[]
  loading: boolean
  error: TrainingError | null
  refetch: () => Promise<void>
} {
  const { user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const [recommendations, setRecommendations] = useState<RecommendationRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<TrainingError | null>(null)

  const refetch = useCallback(async () => {
    if (mode.kind === 'blocked') {
      setRecommendations([])
      setError(notConfiguredTrainingError())
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      if (mode.kind === 'demo') {
        setRecommendations(demoListRecommendations(mode.workspaceId))
      } else {
        const r = await sbListRecommendations(mode.supabase, mode.workspaceId)
        if (r.error) {
          setError(r.error)
          setRecommendations([])
        } else {
          setRecommendations(r.data)
        }
      }
    } catch (e) {
      console.error('[JifunzeAI trends] useRecommendationsList', e)
      setError(wrapTrendUnexpected(e))
      setRecommendations([])
    } finally {
      setLoading(false)
    }
  }, [mode])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { recommendations, loading, error, refetch }
}

export async function createTrendTopicMvp(input: {
  mode: TrainingWorkspaceMode
  name: string
  category: string | null
  sourceLabel: string | null
}): Promise<{ error: TrainingError | null }> {
  if (input.mode.kind === 'blocked') return { error: notConfiguredTrainingError() }
  try {
    if (input.mode.kind === 'demo') {
      demoInsertTrendTopic({
        workspaceId: input.mode.workspaceId,
        userId: input.mode.userId,
        name: input.name,
        category: input.category,
        sourceLabel: input.sourceLabel,
        status: 'active',
      })
      return { error: null }
    }
    const { error } = await sbInsertTrendTopic({
      supabase: input.mode.supabase,
      workspaceId: input.mode.workspaceId,
      userId: input.mode.userId,
      name: input.name,
      category: input.category,
      sourceLabel: input.sourceLabel,
      status: 'active',
    })
    return { error }
  } catch (e) {
    console.error('[JifunzeAI trends] createTrendTopicMvp', e)
    return { error: wrapTrendUnexpected(e) }
  }
}

export async function addTrendSignalMvp(input: {
  mode: TrainingWorkspaceMode
  topicId: string
  sourceName: string
  signalText: string
}): Promise<{ error: TrainingError | null }> {
  if (input.mode.kind === 'blocked') return { error: notConfiguredTrainingError() }
  try {
    if (input.mode.kind === 'demo') {
      demoInsertTrendSignal({
        workspaceId: input.mode.workspaceId,
        topicId: input.topicId,
        sourceName: input.sourceName,
        signalText: input.signalText,
        capturedAt: null,
        freshnessLabel: null,
        metadataJson: null,
      })
      return { error: null }
    }
    const { error } = await sbInsertTrendSignal({
      supabase: input.mode.supabase,
      workspaceId: input.mode.workspaceId,
      topicId: input.topicId,
      sourceName: input.sourceName,
      signalText: input.signalText,
      capturedAt: null,
      freshnessLabel: null,
      metadataJson: null,
    })
    return { error }
  } catch (e) {
    console.error('[JifunzeAI trends] addTrendSignalMvp', e)
    return { error: wrapTrendUnexpected(e) }
  }
}

export async function generateTrendSummaryMvp(input: {
  mode: TrainingWorkspaceMode
  topicId: string
  topicName: string
}): Promise<{ error: TrainingError | null }> {
  if (input.mode.kind === 'blocked') return { error: notConfiguredTrainingError() }
  try {
    if (input.mode.kind === 'demo') {
      demoGenerateAndStoreSummary({
        workspaceId: input.mode.workspaceId,
        topicId: input.topicId,
        topicName: input.topicName,
        userId: input.mode.userId,
      })
      return { error: null }
    }
    if (input.mode.kind !== 'live') {
      return { error: notConfiguredTrainingError() }
    }
    const sig = await sbListTrendSignals(input.mode.supabase, input.mode.workspaceId, input.topicId)
    if (sig.error) return { error: sig.error }
    const signals = sig.data
    const payload = generateSummaryFromSignals({
      topicName: input.topicName,
      signals,
    })
    const ins = await sbInsertTrendSummary({
      supabase: input.mode.supabase,
      workspaceId: input.mode.workspaceId,
      topicId: input.topicId,
      userId: input.mode.userId,
      summaryText: payload.summary_text,
      recurringThemesJson: payload.recurring_themes_json,
      changesJson: payload.changes_json,
      recommendedActionsJson: payload.recommended_actions_json,
    })
    return { error: ins.error }
  } catch (e) {
    console.error('[JifunzeAI trends] generateTrendSummaryMvp', e)
    return { error: wrapTrendUnexpected(e) }
  }
}

export async function addRecommendationMvp(input: {
  mode: TrainingWorkspaceMode
  trendTopicId: string | null
  relatedTrainingPlanId: string | null
  type: string
  title: string
  description: string
}): Promise<{ error: TrainingError | null }> {
  if (input.mode.kind === 'blocked') return { error: notConfiguredTrainingError() }
  try {
    if (input.mode.kind === 'demo') {
      demoInsertRecommendation({
        workspaceId: input.mode.workspaceId,
        trendTopicId: input.trendTopicId,
        relatedTrainingPlanId: input.relatedTrainingPlanId,
        type: input.type,
        title: input.title,
        description: input.description,
        status: 'new',
      })
      return { error: null }
    }
    const { error } = await sbInsertRecommendation({
      supabase: input.mode.supabase,
      workspaceId: input.mode.workspaceId,
      trendTopicId: input.trendTopicId,
      relatedTrainingPlanId: input.relatedTrainingPlanId,
      type: input.type,
      title: input.title,
      description: input.description,
      status: 'new',
    })
    return { error }
  } catch (e) {
    console.error('[JifunzeAI trends] addRecommendationMvp', e)
    return { error: wrapTrendUnexpected(e) }
  }
}

export async function setRecommendationStatusMvp(input: {
  mode: TrainingWorkspaceMode
  recommendationId: string
  status: import('./trendTypes').RecommendationStatus
}): Promise<{ error: TrainingError | null }> {
  if (input.mode.kind === 'blocked') return { error: notConfiguredTrainingError() }
  try {
    if (input.mode.kind === 'demo') {
      demoUpdateRecommendationStatus(input.mode.workspaceId, input.recommendationId, input.status)
      return { error: null }
    }
    return sbUpdateRecommendationStatus({
      supabase: input.mode.supabase,
      workspaceId: input.mode.workspaceId,
      recommendationId: input.recommendationId,
      status: input.status,
    })
  } catch (e) {
    console.error('[JifunzeAI trends] setRecommendationStatusMvp', e)
    return { error: wrapTrendUnexpected(e) }
  }
}

export async function seedSampleSignalsMvp(input: {
  mode: TrainingWorkspaceMode
  topicId: string
  topicName: string
}): Promise<{ error: TrainingError | null }> {
  if (input.mode.kind === 'blocked') return { error: notConfiguredTrainingError() }
  try {
    if (input.mode.kind === 'demo') {
      demoAddSampleSignals(input.mode.workspaceId, input.topicId, input.topicName)
      return { error: null }
    }
    const samples = [
      { source: 'Community feedback', text: `Observed interest in “${input.topicName}” in creator check-ins.` },
      { source: 'Workshop notes', text: 'Learners want one concrete exercise per lesson.' },
      { source: 'Simulated ingest', text: 'Platform trend: shorter hooks, clearer CTA examples.' },
    ]
    for (const s of samples) {
      const r = await sbInsertTrendSignal({
        supabase: input.mode.supabase,
        workspaceId: input.mode.workspaceId,
        topicId: input.topicId,
        sourceName: s.source,
        signalText: s.text,
        capturedAt: null,
        freshnessLabel: 'recent',
        metadataJson: { simulated: true },
      })
      if (r.error) return { error: r.error }
    }
    return { error: null }
  } catch (e) {
    console.error('[JifunzeAI trends] seedSampleSignalsMvp', e)
    return { error: wrapTrendUnexpected(e) }
  }
}
