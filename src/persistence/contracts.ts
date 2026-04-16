import type { BrandProfile } from '../types/brand'
import type { ContentOpportunity } from '../types/opportunity'
import type { PublishedContentPerformance } from '../types/performanceLearning'
import type { ListParams, BrandProfileId } from '../types/persistence'
import type {
  SignalIngestionBatch,
  StoredContentItem,
  StoredLearningLabRun,
  StoredLearningSnapshot,
  StoredOpportunity,
} from '../types/storedRecords'
import type { SocialAccount } from '../types/socialAccount'
import type { ScoredSignal } from '../services/relevance/types'

/**
 * All repositories are **async** so Supabase can be swapped in without a second abstraction.
 * Callers pass `tenantId` into `getPersistence(tenantId, supabase?)`. With Supabase env + a UUID
 * workspace id, data is durable in Postgres (RLS + tenant membership). Non-UUID tenants use the
 * demo persistence stack (see `registry.ts` / `tenantPersistenceMode.ts`).
 */
export type PerformanceMemoryRepository = {
  put(record: PublishedContentPerformance): Promise<void>
  listForBrand(brandProfileId: BrandProfileId): Promise<PublishedContentPerformance[]>
  /** Row count for telemetry / gating. Supabase path is best-effort **0** on query failure. */
  countForBrand(brandProfileId: BrandProfileId): Promise<number>
}

export type SignalRepository = {
  replaceScoredForBrand(input: {
    brandProfileId: BrandProfileId
    batch: SignalIngestionBatch
    scored: ScoredSignal[]
  }): Promise<void>
  listScoredForBrand(brandProfileId: BrandProfileId): Promise<ScoredSignal[]>
  latestBatch(brandProfileId: BrandProfileId): Promise<SignalIngestionBatch | undefined>
}

export type OpportunityRepository = {
  replaceForBrand(brandProfileId: BrandProfileId, opportunities: ContentOpportunity[]): Promise<void>
  listForBrand(brandProfileId: BrandProfileId, params?: ListParams): Promise<StoredOpportunity[]>
}

export type ContentItemRepository = {
  put(item: StoredContentItem): Promise<void>
  get(id: string): Promise<StoredContentItem | undefined>
  listForBrand(brandProfileId: BrandProfileId, params?: ListParams): Promise<StoredContentItem[]>
}

export type SocialAccountRepository = {
  listForBrand(brandProfileId: BrandProfileId): Promise<SocialAccount[]>
  upsertMany(accounts: SocialAccount[]): Promise<void>
}

export type BrandProfileRepository = {
  list(): Promise<BrandProfile[]>
  get(id: BrandProfileId): Promise<BrandProfile | undefined>
  upsert(brand: BrandProfile): Promise<void>
}

export type LearningSnapshotRepository = {
  save(snapshot: StoredLearningSnapshot): Promise<void>
  getLatest(brandProfileId: BrandProfileId): Promise<StoredLearningSnapshot | undefined>
}

/** Append-only recent lab / trend runs per brand (durable learning history UX). */
export type LearningLabHistoryRepository = {
  appendRun(run: StoredLearningLabRun): Promise<void>
  listRunsForBrand(brandProfileId: BrandProfileId, params?: ListParams): Promise<StoredLearningLabRun[]>
}

export type PersistenceLayer = {
  performance: PerformanceMemoryRepository
  signals: SignalRepository
  opportunities: OpportunityRepository
  contentItems: ContentItemRepository
  socialAccounts: SocialAccountRepository
  brands: BrandProfileRepository
  learningSnapshots: LearningSnapshotRepository
  labHistory: LearningLabHistoryRepository
}
