import type { ContentPackage } from './contentPackage'
import type { ContentLifecycleStatus } from './contentLifecycle'
import type { ContentDomain } from './contentDomain'
import type { ContentFormat } from './contentFormat'
import type { ContentOpportunity } from './opportunity'
import type { PublishTimingBucket } from './performanceLearning'
import type { ExplanationStyle, TeachingLevel } from './teaching'
import type { TrendCategory } from './trendCategory'
import type {
  ContentPerformanceSnapshot,
  OptimizationInsight,
  StrategyAdjustmentRecommendation,
} from './performanceLearning'
import type { ExternalSignal } from './signal'
import type { BrandProfileId, IsoDateTime } from './persistence'

/**
 * One ingest + score pass for a brand (preview bundle row).
 *
 * **Supabase:** table `signal_ingestion_batches` with `brand_profile_id` (value = `brands.id`),
 * `fetched_at`, counts; child rows in `signals` reference `batch_id` and store normalized
 * `ExternalSignal` fields + scores.
 */
export type SignalIngestionBatch = {
  id: string
  brandProfileId: BrandProfileId
  fetchedAt: IsoDateTime
  rawCount: number
  guardedCount: number
  scoredCount: number
}

/**
 * Opportunity as persisted after autonomy + lifecycle assignment.
 *
 * **Supabase:** table `content_opportunities` — JSONB `payload` mirroring {@link ContentOpportunity}
 * or normalized columns for filter fields (`priority_score`, `lifecycle_status`, …).
 */
export type StoredOpportunity = ContentOpportunity & {
  brandProfileId: BrandProfileId
  computedAt: IsoDateTime
}

/**
 * Generated artifact (caption package, media brief, etc.).
 *
 * **Supabase:** table `content_items` or `content_packages` with FK `opportunity_id`,
 * `brand_profile_id` (value = `brands.id`), `mode`, lifecycle columns, JSONB `package` for full
 * {@link ContentPackage}.
 */
/** Denormalized learning axes captured at generation time for rapid offline learning. */
export type ContentLearningFingerprint = {
  domain: ContentDomain
  trendCategory: TrendCategory
  primaryPlatform?: string
  contentFormat: ContentFormat
  hookStyle?: string
  ctaStyle?: string
  teachingLevel?: TeachingLevel
  explanationStyle?: ExplanationStyle
  lifecyclePath: string
  publishTimingBucket: PublishTimingBucket
}

export type StoredContentItem = {
  id: string
  brandProfileId: BrandProfileId
  sourceOpportunityId: string
  mode: ContentPackage['mode']
  lifecycleStatus?: ContentLifecycleStatus
  createdAt: IsoDateTime
  package: ContentPackage
  /** Structured metadata for learning pipelines (optional for older rows). */
  learningFingerprint?: ContentLearningFingerprint
}

/**
 * Cached learning rollups (optional; can remain derived-only in early phases).
 *
 * **Supabase:** materialized view or `learning_snapshots` with `window_start/end`,
 * JSONB `insights` / `recommendations`, or separate `optimization_insights` table.
 */
export type StoredLearningSnapshot = {
  brandProfileId: BrandProfileId
  capturedAt: IsoDateTime
  snapshot: ContentPerformanceSnapshot
  insights: OptimizationInsight[]
  recommendations: StrategyAdjustmentRecommendation[]
}

/**
 * One learning-lab / trend-preview pipeline run (audit + replay).
 * Persisted with {@link PersistenceLayer.labHistory} (browser JSON for local dev, Supabase for UUID tenants).
 */
export type StoredLearningLabRun = {
  id: string
  brandProfileId: BrandProfileId
  ranAt: IsoDateTime
  signalBatchId: string
  rawCount: number
  guardedCount: number
  scoredCount: number
  opportunitiesCount: number
  simulationRowsWritten: number
  /** Publish outcome rows for the brand after this run completed (for quick UI). */
  performanceRowCount?: number
}

/**
 * Ranked signals for a brand after an ingest (for replay / audit).
 * Aligns with {@link ScoredSignal} in `services/relevance/types` (same shape).
 *
 * **Supabase:** join `signals` + scores, or store `scored_payload` JSONB per signal row.
 */
export type StoredScoredSignalRow = ExternalSignal & {
  relevance_score: number
  freshness_score: number
  brandProfileId: BrandProfileId
  batchId: string
  ingestedAt: IsoDateTime
}
