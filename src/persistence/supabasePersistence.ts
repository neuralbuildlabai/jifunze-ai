import type { SupabaseClient } from '@supabase/supabase-js'
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
import { mapDbBrandRowToProfile, type BrandsTableRow } from '../services/brands/mapDbBrandToProfile'
import type {
  BrandProfileRepository,
  ContentItemRepository,
  LearningLabHistoryRepository,
  LearningSnapshotRepository,
  OpportunityRepository,
  PerformanceMemoryRepository,
  PersistenceLayer,
  SignalRepository,
  SocialAccountRepository,
} from './contracts'
import { safeSupabaseWrite } from '../lib/safeSupabaseWrite'
import { countPublishedPerformanceRowsForBrand } from './queries/countPublishedPerformanceRows'
import { isWorkspaceTenantId } from './tenantPersistenceMode'

type Json = Record<string, unknown> | unknown[] | string | number | boolean | null

function asJson(value: unknown): Json {
  return value as Json
}

/**
 * Supabase-backed persistence. All rows carry `tenant_id`; RLS must match authenticated user membership.
 */
export function createSupabasePersistenceLayer(
  client: SupabaseClient,
  tenantId: string,
): PersistenceLayer {
  if (!isWorkspaceTenantId(tenantId)) {
    throw new Error(
      `createSupabasePersistenceLayer: tenantId must be a workspace UUID (got "${tenantId}"). Use the demo persistence path for non-UUID tenants.`,
    )
  }
  return {
    performance: new SbPerformance(client, tenantId),
    signals: new SbSignals(client, tenantId),
    opportunities: new SbOpportunities(client, tenantId),
    contentItems: new SbContentItems(client, tenantId),
    socialAccounts: new SbSocialAccounts(client, tenantId),
    brands: new SbBrands(client, tenantId),
    learningSnapshots: new SbLearningSnapshots(client, tenantId),
    labHistory: new SbLearningLabHistory(client, tenantId),
  }
}

class SbPerformance implements PerformanceMemoryRepository {
  private readonly client: SupabaseClient
  private readonly tenantId: string

  constructor(client: SupabaseClient, tenantId: string) {
    this.client = client
    this.tenantId = tenantId
  }

  async put(record: PublishedContentPerformance): Promise<void> {
    await safeSupabaseWrite(this.client, async () => {
      const { error } = await this.client
        .from('published_content_performance')
        .upsert(
          {
            id: record.id,
            tenant_id: this.tenantId,
            brand_profile_id: record.brandProfileId,
            payload: asJson(record),
          },
          { onConflict: 'id' },
        )
        .select('id')
        .maybeSingle()
      if (error) throw error
    })
  }

  async listForBrand(brandProfileId: string): Promise<PublishedContentPerformance[]> {
    const { data, error } = await this.client
      .from('published_content_performance')
      .select('payload')
      .eq('tenant_id', this.tenantId)
      .eq('brand_profile_id', brandProfileId)
    if (error) throw error
    return (data ?? [])
      .map((row) => row.payload as PublishedContentPerformance)
      .filter(Boolean)
  }

  async countForBrand(brandProfileId: string): Promise<number> {
    return countPublishedPerformanceRowsForBrand(this.client, this.tenantId, brandProfileId)
  }
}

class SbSignals implements SignalRepository {
  private readonly client: SupabaseClient
  private readonly tenantId: string

  constructor(client: SupabaseClient, tenantId: string) {
    this.client = client
    this.tenantId = tenantId
  }

  async replaceScoredForBrand(input: {
    brandProfileId: BrandProfileId
    batch: SignalIngestionBatch
    scored: ScoredSignal[]
  }): Promise<void> {
    const { error } = await this.client
      .from('signal_cache')
      .upsert(
        {
          tenant_id: this.tenantId,
          brand_profile_id: input.brandProfileId,
          batch: asJson(input.batch),
          scored: asJson(input.scored),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'tenant_id,brand_profile_id' },
      )
      .select('tenant_id,brand_profile_id')
      .maybeSingle()
    if (error) throw error
  }

  async listScoredForBrand(brandProfileId: BrandProfileId): Promise<ScoredSignal[]> {
    const { data, error } = await this.client
      .from('signal_cache')
      .select('scored')
      .eq('tenant_id', this.tenantId)
      .eq('brand_profile_id', brandProfileId)
      .maybeSingle()
    if (error) throw error
    const raw = data?.scored
    if (!raw || !Array.isArray(raw)) return []
    return raw as ScoredSignal[]
  }

  async latestBatch(brandProfileId: BrandProfileId): Promise<SignalIngestionBatch | undefined> {
    const { data, error } = await this.client
      .from('signal_cache')
      .select('batch')
      .eq('tenant_id', this.tenantId)
      .eq('brand_profile_id', brandProfileId)
      .maybeSingle()
    if (error) throw error
    return data?.batch as SignalIngestionBatch | undefined
  }
}

class SbOpportunities implements OpportunityRepository {
  private readonly client: SupabaseClient
  private readonly tenantId: string

  constructor(client: SupabaseClient, tenantId: string) {
    this.client = client
    this.tenantId = tenantId
  }

  async replaceForBrand(brandProfileId: BrandProfileId, opportunities: ContentOpportunity[]): Promise<void> {
    const computedAt = new Date().toISOString()
    const stored: StoredOpportunity[] = opportunities.map((o) => ({
      ...o,
      brandProfileId,
      computedAt,
    }))
    const { error } = await this.client
      .from('opportunity_cache')
      .upsert(
        {
          tenant_id: this.tenantId,
          brand_profile_id: brandProfileId,
          opportunities: asJson(stored),
          updated_at: computedAt,
        },
        { onConflict: 'tenant_id,brand_profile_id' },
      )
      .select('tenant_id,brand_profile_id')
      .maybeSingle()
    if (error) throw error
  }

  async listForBrand(brandProfileId: BrandProfileId, params?: ListParams): Promise<StoredOpportunity[]> {
    const { data, error } = await this.client
      .from('opportunity_cache')
      .select('opportunities')
      .eq('tenant_id', this.tenantId)
      .eq('brand_profile_id', brandProfileId)
      .maybeSingle()
    if (error) throw error
    const raw = data?.opportunities
    if (!raw || !Array.isArray(raw)) return []
    const list = raw as StoredOpportunity[]
    const limit = params?.limit
    return limit != null ? list.slice(0, limit) : list
  }
}

class SbContentItems implements ContentItemRepository {
  private readonly client: SupabaseClient
  private readonly tenantId: string

  constructor(client: SupabaseClient, tenantId: string) {
    this.client = client
    this.tenantId = tenantId
  }

  async put(item: StoredContentItem): Promise<void> {
    const { error } = await this.client
      .from('content_items')
      .upsert(
        {
          id: item.id,
          tenant_id: this.tenantId,
          brand_profile_id: item.brandProfileId,
          payload: asJson(item),
          created_at: item.createdAt,
        },
        { onConflict: 'id' },
      )
      .select('id')
      .maybeSingle()
    if (error) throw error
  }

  async get(id: string): Promise<StoredContentItem | undefined> {
    const { data, error } = await this.client
      .from('content_items')
      .select('payload')
      .eq('tenant_id', this.tenantId)
      .eq('id', id)
      .maybeSingle()
    if (error) throw error
    return data?.payload as StoredContentItem | undefined
  }

  async listForBrand(brandProfileId: BrandProfileId, params?: ListParams): Promise<StoredContentItem[]> {
    const { data, error } = await this.client
      .from('content_items')
      .select('payload')
      .eq('tenant_id', this.tenantId)
      .eq('brand_profile_id', brandProfileId)
      .order('created_at', { ascending: false })
    if (error) throw error
    const list = (data ?? []).map((r) => r.payload as StoredContentItem)
    const limit = params?.limit
    return limit != null ? list.slice(0, limit) : list
  }
}

class SbSocialAccounts implements SocialAccountRepository {
  private readonly client: SupabaseClient
  private readonly tenantId: string

  constructor(client: SupabaseClient, tenantId: string) {
    this.client = client
    this.tenantId = tenantId
  }

  async listForBrand(brandProfileId: BrandProfileId): Promise<SocialAccount[]> {
    const { data, error } = await this.client
      .from('social_accounts')
      .select('accounts')
      .eq('tenant_id', this.tenantId)
      .eq('brand_profile_id', brandProfileId)
      .maybeSingle()
    if (error) throw error
    const raw = data?.accounts
    if (!raw || !Array.isArray(raw)) return []
    return raw as SocialAccount[]
  }

  async upsertMany(accounts: SocialAccount[]): Promise<void> {
    const grouped = new Map<string, SocialAccount[]>()
    for (const a of accounts) {
      const cur = grouped.get(a.brand_profile_id) ?? []
      cur.push(a)
      grouped.set(a.brand_profile_id, cur)
    }
    for (const [brandId, list] of grouped) {
      const { error } = await this.client
        .from('social_accounts')
        .upsert(
          {
            tenant_id: this.tenantId,
            brand_profile_id: brandId,
            accounts: asJson(list),
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'tenant_id,brand_profile_id' },
        )
        .select('tenant_id,brand_profile_id')
        .maybeSingle()
      if (error) throw error
    }
  }
}

class SbBrands implements BrandProfileRepository {
  private readonly client: SupabaseClient
  private readonly tenantId: string

  constructor(client: SupabaseClient, tenantId: string) {
    this.client = client
    this.tenantId = tenantId
  }

  async list(): Promise<BrandProfile[]> {
    const { data, error } = await this.client
      .from('brands')
      .select('id, tenant_id, name, created_at')
      .eq('tenant_id', this.tenantId)
    if (error) throw error
    return (data ?? []).map((r) => mapDbBrandRowToProfile(r as BrandsTableRow))
  }

  async get(id: BrandProfileId): Promise<BrandProfile | undefined> {
    const { data, error } = await this.client
      .from('brands')
      .select('id, tenant_id, name, created_at')
      .eq('tenant_id', this.tenantId)
      .eq('id', id)
      .maybeSingle()
    if (error) throw error
    if (!data?.name) return undefined
    return mapDbBrandRowToProfile(data as BrandsTableRow)
  }

  async upsert(brand: BrandProfile): Promise<void> {
    if (!isWorkspaceTenantId(brand.id)) {
      throw new Error(
        `SbBrands.upsert: brand id must be a UUID for public.brands (got "${brand.id}"). Demo slug ids cannot be written to the workspace table.`,
      )
    }
    const { error } = await this.client
      .from('brands')
      .upsert(
        {
          id: brand.id,
          tenant_id: this.tenantId,
          name: brand.name,
        },
        { onConflict: 'id' },
      )
      .select('id')
      .maybeSingle()
    if (error) throw error
  }
}

class SbLearningSnapshots implements LearningSnapshotRepository {
  private readonly client: SupabaseClient
  private readonly tenantId: string

  constructor(client: SupabaseClient, tenantId: string) {
    this.client = client
    this.tenantId = tenantId
  }

  /**
   * PostgREST: `POST /learning_snapshots` with merge (upsert). Chaining `.select()` forces the
   * same request to pass **SELECT** RLS on the written row (catches missing SELECT / upsert edge cases).
   */
  async save(snapshot: StoredLearningSnapshot): Promise<void> {
    const { error } = await this.client
      .from('learning_snapshots')
      .upsert(
        {
          tenant_id: this.tenantId,
          brand_profile_id: snapshot.brandProfileId,
          payload: asJson(snapshot),
          captured_at: snapshot.capturedAt,
        },
        { onConflict: 'tenant_id,brand_profile_id' },
      )
      .select('tenant_id,brand_profile_id')
      .maybeSingle()
    if (error) throw error
  }

  async getLatest(brandProfileId: BrandProfileId): Promise<StoredLearningSnapshot | undefined> {
    const { data, error } = await this.client
      .from('learning_snapshots')
      .select('payload')
      .eq('tenant_id', this.tenantId)
      .eq('brand_profile_id', brandProfileId)
      .maybeSingle()
    if (error) throw error
    return data?.payload as StoredLearningSnapshot | undefined
  }
}

class SbLearningLabHistory implements LearningLabHistoryRepository {
  private readonly client: SupabaseClient
  private readonly tenantId: string

  constructor(client: SupabaseClient, tenantId: string) {
    this.client = client
    this.tenantId = tenantId
  }

  async appendRun(run: StoredLearningLabRun): Promise<void> {
    const { error } = await this.client
      .from('learning_lab_runs')
      .insert({
        id: run.id,
        tenant_id: this.tenantId,
        brand_profile_id: run.brandProfileId,
        payload: asJson(run),
        ran_at: run.ranAt,
      })
      .select('id')
      .maybeSingle()
    if (error) throw error
  }

  async listRunsForBrand(
    brandProfileId: BrandProfileId,
    params?: ListParams,
  ): Promise<StoredLearningLabRun[]> {
    const limit = params?.limit ?? 32
    const { data, error } = await this.client
      .from('learning_lab_runs')
      .select('payload')
      .eq('tenant_id', this.tenantId)
      .eq('brand_profile_id', brandProfileId)
      .order('ran_at', { ascending: false })
      .limit(limit)
    if (error) throw error
    return (data ?? []).map((r) => r.payload as StoredLearningLabRun).filter(Boolean)
  }
}
