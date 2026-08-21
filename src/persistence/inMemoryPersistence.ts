import { getDemoSocialAccountsForBrand } from '../config/demoSocialAccounts'
import type { BrandProfile } from '../types/brand'
import type { ContentOpportunity } from '../types/opportunity'
import type { PublishedContentPerformance } from '../types/performanceLearning'
import type { ListParams, BrandProfileId } from '../types/persistence'
import type {
  SignalIngestionBatch,
  StoredContentItem,
  StoredOpportunity,
} from '../types/storedRecords'
import type { SocialAccount } from '../types/socialAccount'
import type { ScoredSignal } from '../services/relevance/types'
import type {
  BrandProfileRepository,
  ContentItemRepository,
  OpportunityRepository,
  PerformanceMemoryRepository,
  SignalRepository,
  SocialAccountRepository,
} from './contracts'

/** In-memory tenant slice — isolated per `tenantId` via {@link getPersistence}. */

export class InMemoryPerformanceMemoryRepository implements PerformanceMemoryRepository {
  private byId = new Map<string, PublishedContentPerformance>()

  async put(record: PublishedContentPerformance): Promise<void> {
    this.byId.set(record.id, { ...record })
  }

  async listForBrand(brandProfileId: string): Promise<PublishedContentPerformance[]> {
    return [...this.byId.values()].filter((r) => r.brandProfileId === brandProfileId)
  }

  async countForBrand(brandProfileId: string): Promise<number> {
    return (await this.listForBrand(brandProfileId)).length
  }
}

export class InMemorySignalRepository implements SignalRepository {
  private latestBatchByBrand = new Map<string, SignalIngestionBatch>()
  private scoredByBrand = new Map<string, ScoredSignal[]>()

  async replaceScoredForBrand(input: {
    brandProfileId: BrandProfileId
    batch: SignalIngestionBatch
    scored: ScoredSignal[]
  }): Promise<void> {
    this.latestBatchByBrand.set(input.brandProfileId, { ...input.batch })
    this.scoredByBrand.set(input.brandProfileId, input.scored.map((s) => ({ ...s })))
  }

  async listScoredForBrand(brandProfileId: BrandProfileId): Promise<ScoredSignal[]> {
    return this.scoredByBrand.get(brandProfileId) ?? []
  }

  async latestBatch(brandProfileId: BrandProfileId): Promise<SignalIngestionBatch | undefined> {
    return this.latestBatchByBrand.get(brandProfileId)
  }
}

export class InMemoryOpportunityRepository implements OpportunityRepository {
  private byBrand = new Map<string, StoredOpportunity[]>()

  async replaceForBrand(brandProfileId: BrandProfileId, opportunities: ContentOpportunity[]): Promise<void> {
    const computedAt = new Date().toISOString()
    const stored: StoredOpportunity[] = opportunities.map((o) => ({
      ...o,
      brandProfileId,
      computedAt,
    }))
    this.byBrand.set(brandProfileId, stored)
  }

  async listForBrand(brandProfileId: BrandProfileId, params?: ListParams): Promise<StoredOpportunity[]> {
    const list = this.byBrand.get(brandProfileId) ?? []
    const limit = params?.limit
    return limit != null ? list.slice(0, limit) : list
  }
}

export class InMemoryContentItemRepository implements ContentItemRepository {
  private byId = new Map<string, StoredContentItem>()

  async put(item: StoredContentItem): Promise<void> {
    this.byId.set(item.id, {
      ...item,
      package: { ...item.package },
    })
  }

  async get(id: string): Promise<StoredContentItem | undefined> {
    const row = this.byId.get(id)
    return row ? { ...row, package: { ...row.package } } : undefined
  }

  async listForBrand(brandProfileId: BrandProfileId, params?: ListParams): Promise<StoredContentItem[]> {
    const list = [...this.byId.values()]
      .filter((i) => i.brandProfileId === brandProfileId)
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    const limit = params?.limit
    return limit != null ? list.slice(0, limit) : list
  }
}

export class InMemorySocialAccountRepository implements SocialAccountRepository {
  private overrides = new Map<string, SocialAccount[]>()

  async listForBrand(brandProfileId: BrandProfileId): Promise<SocialAccount[]> {
    return this.overrides.get(brandProfileId) ?? getDemoSocialAccountsForBrand(brandProfileId)
  }

  async upsertMany(accounts: SocialAccount[]): Promise<void> {
    const grouped = new Map<string, SocialAccount[]>()
    for (const a of accounts) {
      const cur = grouped.get(a.brand_profile_id) ?? []
      cur.push({ ...a })
      grouped.set(a.brand_profile_id, cur)
    }
    for (const [brandId, list] of grouped) {
      this.overrides.set(brandId, list)
    }
  }
}

export class InMemoryBrandProfileRepository implements BrandProfileRepository {
  private byId = new Map<string, BrandProfile>()

  constructor(seed: BrandProfile[]) {
    for (const b of seed) {
      this.byId.set(b.id, { ...b })
    }
  }

  async list(): Promise<BrandProfile[]> {
    return [...this.byId.values()]
  }

  async get(id: BrandProfileId): Promise<BrandProfile | undefined> {
    const b = this.byId.get(id)
    return b ? { ...b } : undefined
  }

  async upsert(brand: BrandProfile): Promise<void> {
    this.byId.set(brand.id, { ...brand })
  }
}

export function createInMemoryPersistenceLayer(seedBrands: BrandProfile[] = []) {
  return {
    performance: new InMemoryPerformanceMemoryRepository(),
    signals: new InMemorySignalRepository(),
    opportunities: new InMemoryOpportunityRepository(),
    contentItems: new InMemoryContentItemRepository(),
    socialAccounts: new InMemorySocialAccountRepository(),
    brands: new InMemoryBrandProfileRepository(seedBrands),
  }
}
