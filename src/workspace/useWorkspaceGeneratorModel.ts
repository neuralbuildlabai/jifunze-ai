import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { isWorkspaceTenantId } from '../persistence/tenantPersistenceMode'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { getSimulationMode } from '../config/simulationMode'
import {
  getSignalProviderMode,
  isTrendOpportunitiesEnabled,
} from '../config/signalIngestionEnv'
import {
  adaptContentForSocialAccounts,
  generateContentPackage,
  generateSocialContent,
  resolveSocialAccountsForBrand,
} from '../services/contentGeneration'
import {
  logLearningUiErrorUnlessStaleSession,
  USER_MSG_SUPABASE_NOT_READY,
  userFacingLearningError,
} from '../lib/learningUiErrors'
import { jifunzeCriticalLog } from '../lib/jifunzeTelemetry'
import { buildTrendPreviewForBrand } from '../services/trendPreview'
import { loadCachedTrendStateFromPersistence } from '../services/trendPreviewRestore'
import { readPublicGenerateHandoff } from '../services/content/publicGenerate'
import type { TrendPreviewBundle } from '../services/trendPreview'
import type { ContentGenerationMode, ContentPackage } from '../types/contentPackage'
import type { ContentOpportunity } from '../types/opportunity'
import type { SocialContent } from '../types/content'
import type { ScoredSignal } from '../services/relevance/types'
import type { PlatformPostVariant } from '../types/platformAdaptation'
import type { SocialAccount } from '../types/socialAccount'

export function truncatePlain(s: string, max: number): string {
  const t = s.trim()
  if (t.length <= max) return t
  return `${t.slice(0, Math.max(0, max - 1))}…`
}

export const PACKAGE_MODE_OPTIONS: { value: ContentGenerationMode; label: string }[] = [
  { value: 'caption_only', label: 'Caption only' },
  { value: 'caption_visual_concept', label: 'Caption + visual concept' },
  { value: 'caption_media_brief', label: 'Caption + media brief' },
  { value: 'full_content_package', label: 'Full package' },
]

export type WorkspaceViewState =
  | { kind: 'recovery'; authError: string | null }
  | { kind: 'loading' }
  | { kind: 'sign_in' }
  | { kind: 'empty_brands' }
  | { kind: 'no_brand' }
  | { kind: 'ready' }

export function useWorkspaceGeneratorModel() {
  const location = useLocation()
  const loadWorkspaceTrendData = ['/ideas', '/studio', '/lab'].includes(location.pathname)

  const {
    user,
    brands,
    tenantId,
    supabase,
    loading: authLoading,
    error: authError,
    workspaceTenantResolved,
    workspaceShellReady,
    session,
    signOut,
    signOutPending,
    retryWorkspaceBootstrap,
  } = useAuth()

  const [brandId, setBrandId] = useState('')
  useEffect(() => {
    if (brands.length === 0) return
    setBrandId((prev) => {
      if (prev && brands.some((b) => b.id === prev)) return prev
      return brands[0]!.id
    })
  }, [brands])

  const brand = useMemo(
    () => brands.find((b) => b.id === brandId) ?? brands[0] ?? null,
    [brands, brandId],
  )

  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([])
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!user || !brand) {
        setSocialAccounts([])
        return
      }
      const acc = await resolveSocialAccountsForBrand(brand, tenantId, supabase ?? undefined)
      if (!cancelled && user) setSocialAccounts(acc)
    })()
    return () => {
      cancelled = true
    }
  }, [brand, tenantId, supabase, user])

  const trendUiEnabled = useMemo(() => isTrendOpportunitiesEnabled(), [])
  const signalSourceLabel = useMemo(
    () => (getSignalProviderMode() === 'remote' ? 'Remote ingest' : 'Local mocks'),
    [],
  )

  const [simulationMode, setSimulationMode] = useState(() => getSimulationMode())
  const [learningRefreshSignal, setLearningRefreshSignal] = useState(0)

  const [topic, setTopic] = useState('')
  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get('topic')?.trim() ?? ''
    if (fromQuery) {
      setTopic(fromQuery.slice(0, 180))
      return
    }
    const handoff = readPublicGenerateHandoff()
    if (handoff?.topic) {
      setTopic(handoff.topic.slice(0, 180))
    }
  }, [])

  const [result, setResult] = useState<SocialContent | null>(null)
  const [loading, setLoading] = useState(false)
  /** Distinguishes manual topic vs package generation for labels and wait hints. */
  const [generationKind, setGenerationKind] = useState<'idle' | 'topic' | 'package'>('idle')
  const [error, setError] = useState<string | null>(null)

  const [opportunities, setOpportunities] = useState<ContentOpportunity[]>([])
  const [stageCounts, setStageCounts] = useState<{
    raw: number
    guarded: number
    scored: number
    opportunities: number
    simulationRowsWritten: number
  } | null>(null)
  const [scoredBySignalId, setScoredBySignalId] = useState<Record<string, ScoredSignal>>({})
  const [trendLoading, setTrendLoading] = useState(trendUiEnabled)
  const [trendError, setTrendError] = useState<string | null>(null)
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null)
  const [ideaFilterQuery, setIdeaFilterQuery] = useState('')
  const [packageMode, setPackageMode] = useState<ContentGenerationMode>('full_content_package')
  const [includeMultiPlatform, setIncludeMultiPlatform] = useState(false)
  const [contentPackage, setContentPackage] = useState<ContentPackage | null>(null)
  const [errorSurface, setErrorSurface] = useState<'studio' | 'manual' | null>(null)

  const applyTrendBundle = useCallback((bundle: TrendPreviewBundle) => {
    const scoreMap: Record<string, ScoredSignal> = {}
    for (const s of bundle.scored_signals) {
      scoreMap[s.id] = s
    }
    setStageCounts({
      raw: bundle.raw_signals.length,
      guarded: bundle.guarded_signals.length,
      scored: bundle.scored_signals.length,
      opportunities: bundle.opportunities.length,
      simulationRowsWritten: bundle.simulation_rows_written,
    })
    setOpportunities(bundle.opportunities)
    setScoredBySignalId(scoreMap)
    setTrendError(null)
    setSelectedOpportunityId((prev) => {
      if (prev && bundle.opportunities.some((o) => o.id === prev)) return prev
      return bundle.opportunities[0]?.id ?? null
    })
  }, [])

  const opportunitiesSorted = useMemo(
    () => [...opportunities].sort((a, b) => b.priority_score - a.priority_score),
    [opportunities],
  )

  const opportunitiesFiltered = useMemo(() => {
    const q = ideaFilterQuery.trim().toLowerCase()
    if (!q) return opportunitiesSorted
    return opportunitiesSorted.filter((o) => {
      const blob = `${o.topic} ${o.why_it_matters}`.toLowerCase()
      return blob.includes(q)
    })
  }, [ideaFilterQuery, opportunitiesSorted])

  useEffect(() => {
    if (!trendUiEnabled || opportunitiesSorted.length === 0) return
    setSelectedOpportunityId((prev) => {
      if (prev && opportunitiesSorted.some((o) => o.id === prev)) return prev
      return opportunitiesSorted[0]!.id
    })
  }, [trendUiEnabled, opportunitiesSorted])

  useEffect(() => {
    if (!selectedOpportunityId || opportunitiesFiltered.length === 0) return
    if (opportunitiesFiltered.some((o) => o.id === selectedOpportunityId)) return
    setSelectedOpportunityId(opportunitiesFiltered[0]!.id)
  }, [opportunitiesFiltered, selectedOpportunityId])

  const latestScoredSignals = useMemo(() => Object.values(scoredBySignalId), [scoredBySignalId])

  const selectedOpportunity = useMemo(
    () => opportunitiesSorted.find((o) => o.id === selectedOpportunityId) ?? null,
    [opportunitiesSorted, selectedOpportunityId],
  )

  const [accountSurfaceVariants, setAccountSurfaceVariants] = useState<PlatformPostVariant[]>([])
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!user || signOutPending || !session?.user || !selectedOpportunity || !brand) {
        setAccountSurfaceVariants([])
        return
      }
      try {
        const vars = await adaptContentForSocialAccounts({
          brand,
          opportunity: selectedOpportunity,
          accounts: socialAccounts,
          creativeBrief: contentPackage?.creative_brief,
          tenantId,
          supabase: supabase ?? undefined,
        })
        if (cancelled || signOutPending || !session?.user) return
        setAccountSurfaceVariants(vars)
      } catch (e) {
        logLearningUiErrorUnlessStaleSession(
          'Workspace generator adaptContentForSocialAccounts',
          e,
          signOutPending || !session?.user,
        )
        if (!cancelled && user && session?.user && !signOutPending) setAccountSurfaceVariants([])
      }
    })()
    return () => {
      cancelled = true
    }
  }, [
    brand,
    contentPackage?.creative_brief,
    selectedOpportunity,
    session?.user,
    signOutPending,
    socialAccounts,
    supabase,
    tenantId,
    user,
  ])

  useEffect(() => {
    setSelectedOpportunityId(null)
    setContentPackage(null)
  }, [brandId])

  useEffect(() => {
    if (!loadWorkspaceTrendData) {
      setTrendLoading(false)
      return
    }
    if (!trendUiEnabled) {
      setOpportunities([])
      setStageCounts(null)
      setScoredBySignalId({})
      setTrendLoading(false)
      setTrendError(null)
      return
    }
    if (!brand) {
      setOpportunities([])
      setStageCounts(null)
      setScoredBySignalId({})
      setTrendLoading(false)
      setTrendError(null)
      return
    }

    if (!user || signOutPending || !session?.user) {
      setOpportunities([])
      setStageCounts(null)
      setScoredBySignalId({})
      setTrendLoading(false)
      setTrendError(null)
      return
    }

    if (isWorkspaceTenantId(tenantId) && !supabase) {
      setTrendError(USER_MSG_SUPABASE_NOT_READY)
      setTrendLoading(false)
      return
    }

    let cancelled = false
    ;(async () => {
      setTrendLoading(true)
      setTrendError(null)
      try {
        const cached = await loadCachedTrendStateFromPersistence(brand, tenantId, supabase ?? undefined)
        if (cancelled || signOutPending) return
        if (supabase) {
          const {
            data: { session: sNow },
          } = await supabase.auth.getSession()
          if (!sNow?.user) return
        }
        if (!cancelled && cached) {
          const warmMap: Record<string, ScoredSignal> = {}
          for (const s of cached.scored_signals) {
            warmMap[s.id] = s
          }
          setStageCounts({
            raw: cached.rawCount,
            guarded: cached.guardedCount,
            scored: cached.scored_signals.length,
            opportunities: cached.opportunities.length,
            simulationRowsWritten: cached.lastSimulationRowsWritten,
          })
          setOpportunities(cached.opportunities)
          setScoredBySignalId(warmMap)
        }
      } catch (e) {
        logLearningUiErrorUnlessStaleSession(
          'Workspace generator trend warm cache',
          e,
          signOutPending || !session?.user,
        )
      }
      try {
        const bundle = await buildTrendPreviewForBrand(brand, {
          tenantId,
          supabase: supabase ?? undefined,
          enableSyntheticPerformance: simulationMode,
        })
        if (cancelled || signOutPending) return
        if (supabase) {
          const {
            data: { session: sNow },
          } = await supabase.auth.getSession()
          if (!sNow?.user) return
        }
        if (bundle.trend_ingestion_error) {
          jifunzeCriticalLog({
            action: 'trend_ingestion',
            userId: user?.id ?? null,
            tenantId,
            brandProfileId: brand.id,
            status: 'error',
            error: bundle.trend_ingestion_error,
          })
          setTrendError(
            `Trend ingestion unavailable. ${bundle.trend_ingestion_error.reason}`,
          )
          setOpportunities([])
          setStageCounts(null)
          setScoredBySignalId({})
          setSelectedOpportunityId(null)
          return
        }
        setTrendError(null)
        const scoreMap: Record<string, ScoredSignal> = {}
        for (const s of bundle.scored_signals) {
          scoreMap[s.id] = s
        }
        setStageCounts({
          raw: bundle.raw_signals.length,
          guarded: bundle.guarded_signals.length,
          scored: bundle.scored_signals.length,
          opportunities: bundle.opportunities.length,
          simulationRowsWritten: bundle.simulation_rows_written,
        })
        setOpportunities(bundle.opportunities)
        setScoredBySignalId(scoreMap)
        jifunzeCriticalLog({
          action: 'trend_preview_loaded',
          userId: user?.id ?? null,
          tenantId,
          brandProfileId: brand.id,
          status: 'ok',
          opportunities: bundle.opportunities.length,
          simulationRowsWritten: bundle.simulation_rows_written,
        })
      } catch (e) {
        if (!cancelled) {
          logLearningUiErrorUnlessStaleSession(
            'Workspace generator trend preview',
            e,
            signOutPending || !session?.user,
          )
          if (!signOutPending && session?.user) {
            setTrendError(userFacingLearningError(e, 'Unexpected error while loading trend preview.'))
            setStageCounts(null)
          }
        }
      } finally {
        if (!cancelled) setTrendLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [
    brand,
    trendUiEnabled,
    tenantId,
    supabase,
    simulationMode,
    session?.user,
    signOutPending,
    user,
    loadWorkspaceTrendData,
  ])

  const [topicWaitHint, setTopicWaitHint] = useState<string | null>(null)
  const [packageWaitHint, setPackageWaitHint] = useState<string | null>(null)

  useEffect(() => {
    if (!loading || generationKind !== 'topic') {
      setTopicWaitHint(null)
      return
    }
    setTopicWaitHint('Sending your topic to the generation service…')
    const t1 = window.setTimeout(() => {
      setTopicWaitHint('Still working—remote models often need 30–90 seconds when busy.')
    }, 4000)
    const t2 = window.setTimeout(() => {
      setTopicWaitHint('Hang tight—this can take over a minute if the service is cold or overloaded.')
    }, 18000)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [loading, generationKind])

  useEffect(() => {
    if (!loading || generationKind !== 'package') {
      setPackageWaitHint(null)
      return
    }
    setPackageWaitHint('Building your package…')
    const t1 = window.setTimeout(() => {
      setPackageWaitHint('Still working—full packages run several model steps.')
    }, 6000)
    return () => {
      window.clearTimeout(t1)
    }
  }, [loading, generationKind])

  const canSubmitTopic = topic.trim().length > 0 && !loading
  const canRunPackage = Boolean(selectedOpportunity) && !loading

  const displaySocial = contentPackage?.social ?? result

  const scrollToWorkspaceOutput = useCallback(() => {
    requestAnimationFrame(() => {
      document.getElementById('workspace-output')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }, [])

  async function handleGenerateTopic() {
    setError(null)
    setErrorSurface(null)
    setContentPackage(null)
    setGenerationKind('topic')
    setLoading(true)
    try {
      const data = await generateSocialContent(topic, { supabase: supabase ?? undefined })
      setResult(data)
      scrollToWorkspaceOutput()
      jifunzeCriticalLog({
        action: 'content_generate_topic',
        userId: user?.id ?? null,
        tenantId,
        brandProfileId: brand?.id ?? null,
        status: 'ok',
      })
    } catch (e) {
      jifunzeCriticalLog({
        action: 'content_generate_topic',
        userId: user?.id ?? null,
        tenantId,
        brandProfileId: brand?.id ?? null,
        status: 'error',
        error: e,
      })
      setResult(null)
      setError(e instanceof Error ? e.message : 'Something went wrong.')
      setErrorSurface('manual')
    } finally {
      setLoading(false)
      setGenerationKind('idle')
    }
  }

  async function handleGeneratePackage() {
    if (!selectedOpportunity) {
      setError('Select a trend opportunity first.')
      setErrorSurface('studio')
      return
    }
    setError(null)
    setErrorSurface(null)
    setResult(null)
    setGenerationKind('package')
    setLoading(true)
    try {
      const pkg = await generateContentPackage({
        opportunity: selectedOpportunity,
        brand,
        mode: packageMode,
        platformAdaptation: includeMultiPlatform ? 'multi' : 'off',
        tenantId,
        supabase: supabase ?? undefined,
      })
      setContentPackage(pkg)
      scrollToWorkspaceOutput()
      jifunzeCriticalLog({
        action: 'content_generate_package',
        userId: user?.id ?? null,
        tenantId,
        brandProfileId: brand.id,
        status: 'ok',
        detail: { mode: packageMode },
      })
    } catch (e) {
      jifunzeCriticalLog({
        action: 'content_generate_package',
        userId: user?.id ?? null,
        tenantId,
        brandProfileId: brand.id,
        status: 'error',
        error: e,
      })
      setContentPackage(null)
      setError(e instanceof Error ? e.message : 'Something went wrong.')
      setErrorSurface('studio')
    } finally {
      setLoading(false)
      setGenerationKind('idle')
    }
  }

  const workspaceBootstrapNeedsRecovery =
    isSupabaseConfigured() &&
    Boolean(user) &&
    !workspaceTenantResolved &&
    authError != null


  const viewState: WorkspaceViewState = useMemo(() => {
    if (workspaceBootstrapNeedsRecovery) return { kind: 'recovery', authError }
    if (isSupabaseConfigured() && authLoading && !workspaceShellReady) return { kind: 'loading' }
    if (isSupabaseConfigured() && !user) return { kind: 'sign_in' }
    if (isSupabaseConfigured() && user && brands.length === 0) return { kind: 'empty_brands' }
    if (!brand) return { kind: 'no_brand' }
    return { kind: 'ready' }
  }, [
    workspaceBootstrapNeedsRecovery,
    authError,
    authLoading,
    workspaceShellReady,
    user,
    brands.length,
    brand,
  ])

  return {
    viewState,
    loadWorkspaceTrendData,
    user,
    brands,
    tenantId,
    supabase,
    authLoading,
    authError,
    workspaceTenantResolved,
    workspaceShellReady,
    session,
    signOut,
    signOutPending,
    retryWorkspaceBootstrap,
    brandId,
    setBrandId,
    brand,
    socialAccounts,
    trendUiEnabled,
    signalSourceLabel,
    simulationMode,
    setSimulationMode,
    learningRefreshSignal,
    setLearningRefreshSignal,
    topic,
    setTopic,
    result,
    setResult,
    loading,
    generationKind,
    error,
    errorSurface,
    opportunities,
    setOpportunities,
    stageCounts,
    scoredBySignalId,
    trendLoading,
    trendError,
    selectedOpportunityId,
    setSelectedOpportunityId,
    ideaFilterQuery,
    setIdeaFilterQuery,
    opportunitiesSorted,
    opportunitiesFiltered,
    selectedOpportunity,
    packageMode,
    setPackageMode,
    includeMultiPlatform,
    setIncludeMultiPlatform,
    contentPackage,
    setContentPackage,
    accountSurfaceVariants,
    latestScoredSignals,
    displaySocial,
    canSubmitTopic,
    canRunPackage,
    topicWaitHint,
    packageWaitHint,
    handleGenerateTopic,
    handleGeneratePackage,
    applyTrendBundle,
    scrollToWorkspaceOutput,
    truncatePlain,
    PACKAGE_MODE_OPTIONS,
    workspaceBootstrapNeedsRecovery,
    isSupabaseConfigured: isSupabaseConfigured(),
  }
}
