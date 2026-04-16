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
import type { PersistenceLayer } from './contracts'

const DOC_VERSION = 1 as const
const MAX_PERFORMANCE_ROWS = 520
const MAX_LAB_RUNS = 120
const MAX_CONTENT_ITEMS = 140

export type BrowserTenantDocV1 = {
  version: typeof DOC_VERSION
  performance: PublishedContentPerformance[]
  signalByBrand: Record<string, { batch?: SignalIngestionBatch; scored: ScoredSignal[] }>
  opportunitiesByBrand: Record<string, StoredOpportunity[]>
  contentItems: Record<string, StoredContentItem>
  socialByBrand: Record<string, SocialAccount[]>
  brands: BrandProfile[]
  learningSnapshots: Record<string, StoredLearningSnapshot>
  labRuns: StoredLearningLabRun[]
}

function storageKey(tenantId: string): string {
  return `jifunze.persistence.v1:${tenantId}`
}

function trimPerformance(rows: PublishedContentPerformance[]): PublishedContentPerformance[] {
  const byId = new Map<string, PublishedContentPerformance>()
  for (const r of rows) byId.set(r.id, r)
  const merged = [...byId.values()].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  )
  return merged.slice(0, MAX_PERFORMANCE_ROWS)
}

function trimContentItems(map: Record<string, StoredContentItem>): Record<string, StoredContentItem> {
  const entries = Object.values(map).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  if (entries.length <= MAX_CONTENT_ITEMS) return map
  const next: Record<string, StoredContentItem> = {}
  for (const it of entries.slice(0, MAX_CONTENT_ITEMS)) next[it.id] = it
  return next
}

function trimLabRuns(runs: StoredLearningLabRun[]): StoredLearningLabRun[] {
  if (runs.length <= MAX_LAB_RUNS) return runs
  return [...runs].sort((a, b) => Date.parse(b.ranAt) - Date.parse(a.ranAt)).slice(0, MAX_LAB_RUNS)
}

function normalizeDoc(raw: unknown, seedBrands: BrandProfile[]): BrowserTenantDocV1 {
  const d = raw as Partial<BrowserTenantDocV1> | null
  const base: BrowserTenantDocV1 = {
    version: DOC_VERSION,
    performance: Array.isArray(d?.performance) ? d!.performance! : [],
    signalByBrand: typeof d?.signalByBrand === 'object' && d?.signalByBrand ? { ...d.signalByBrand } : {},
    opportunitiesByBrand:
      typeof d?.opportunitiesByBrand === 'object' && d?.opportunitiesByBrand ? { ...d.opportunitiesByBrand } : {},
    contentItems: typeof d?.contentItems === 'object' && d?.contentItems ? { ...d.contentItems } : {},
    socialByBrand: typeof d?.socialByBrand === 'object' && d?.socialByBrand ? { ...d.socialByBrand } : {},
    brands: Array.isArray(d?.brands) && d!.brands!.length ? d!.brands!.map((b) => ({ ...b })) : [...seedBrands],
    learningSnapshots:
      typeof d?.learningSnapshots === 'object' && d?.learningSnapshots ? { ...d.learningSnapshots } : {},
    labRuns: Array.isArray(d?.labRuns) ? d!.labRuns! : [],
  }
  base.performance = trimPerformance(base.performance)
  base.contentItems = trimContentItems(base.contentItems)
  base.labRuns = trimLabRuns(base.labRuns)
  return base
}

function readDoc(tenantId: string, seedBrands: BrandProfile[]): BrowserTenantDocV1 {
  try {
    const raw = localStorage.getItem(storageKey(tenantId))
    if (!raw) return normalizeDoc(null, seedBrands)
    return normalizeDoc(JSON.parse(raw) as unknown, seedBrands)
  } catch {
    return normalizeDoc(null, seedBrands)
  }
}

function writeDoc(tenantId: string, doc: BrowserTenantDocV1): void {
  doc.performance = trimPerformance(doc.performance)
  doc.contentItems = trimContentItems(doc.contentItems)
  doc.labRuns = trimLabRuns(doc.labRuns)
  try {
    localStorage.setItem(storageKey(tenantId), JSON.stringify(doc))
  } catch {
    doc.performance = doc.performance.slice(0, Math.floor(MAX_PERFORMANCE_ROWS * 0.65))
    try {
      localStorage.setItem(storageKey(tenantId), JSON.stringify(doc))
    } catch {
      /* quota — best effort */
    }
  }
}

class TenantBrowserStore {
  readonly tenantId: string
  doc: BrowserTenantDocV1
  private saveTimer: ReturnType<typeof setTimeout> | undefined

  constructor(tenantId: string, seedBrands: BrandProfile[]) {
    this.tenantId = tenantId
    this.doc = readDoc(tenantId, seedBrands)
    if (typeof window !== 'undefined') {
      window.addEventListener('pagehide', this.flush)
    }
  }

  flush = (): void => {
    this.persistNow()
  }

  schedulePersist(): void {
    if (typeof window === 'undefined') return
    clearTimeout(this.saveTimer)
    this.saveTimer = setTimeout(() => this.persistNow(), 48)
  }

  persistNow(): void {
    clearTimeout(this.saveTimer)
    writeDoc(this.tenantId, this.doc)
  }
}

/**
 * Browser-durable {@link PersistenceLayer} (localStorage JSON) for non-UUID dev tenants.
 * Mirrors in-memory semantics while surviving reloads — performance rows, signal cache,
 * opportunities (including `learning_impact_comparison`), learning snapshots, and lab runs.
 */
export function createBrowserBackedPersistenceLayer(
  tenantId: string,
  seedBrands: BrandProfile[],
): PersistenceLayer {
  const store = new TenantBrowserStore(tenantId, seedBrands)

  return {
    performance: {
      async put(record: PublishedContentPerformance): Promise<void> {
        const rest = store.doc.performance.filter((r) => r.id !== record.id)
        rest.push({ ...record })
        store.doc.performance = trimPerformance(rest)
        store.schedulePersist()
      },
      async listForBrand(brandProfileId: string): Promise<PublishedContentPerformance[]> {
        return store.doc.performance.filter((r) => r.brandProfileId === brandProfileId).map((r) => ({ ...r }))
      },
      async countForBrand(brandProfileId: string): Promise<number> {
        return store.doc.performance.filter((r) => r.brandProfileId === brandProfileId).length
      },
    },
    signals: {
      async replaceScoredForBrand(input: {
        brandProfileId: BrandProfileId
        batch: SignalIngestionBatch
        scored: ScoredSignal[]
      }): Promise<void> {
        store.doc.signalByBrand[input.brandProfileId] = {
          batch: { ...input.batch },
          scored: input.scored.map((s) => ({ ...s })),
        }
        store.schedulePersist()
      },
      async listScoredForBrand(brandProfileId: BrandProfileId): Promise<ScoredSignal[]> {
        return store.doc.signalByBrand[brandProfileId]?.scored?.map((s) => ({ ...s })) ?? []
      },
      async latestBatch(brandProfileId: BrandProfileId): Promise<SignalIngestionBatch | undefined> {
        const b = store.doc.signalByBrand[brandProfileId]?.batch
        return b ? { ...b } : undefined
      },
    },
    opportunities: {
      async replaceForBrand(brandProfileId: BrandProfileId, opportunities: ContentOpportunity[]): Promise<void> {
        const computedAt = new Date().toISOString()
        const stored: StoredOpportunity[] = opportunities.map((o) => ({
          ...o,
          brandProfileId,
          computedAt,
        }))
        store.doc.opportunitiesByBrand[brandProfileId] = stored
        store.schedulePersist()
      },
      async listForBrand(brandProfileId: BrandProfileId, params?: ListParams): Promise<StoredOpportunity[]> {
        const list = store.doc.opportunitiesByBrand[brandProfileId] ?? []
        const limit = params?.limit
        return limit != null ? list.slice(0, limit).map((o) => ({ ...o })) : list.map((o) => ({ ...o }))
      },
    },
    contentItems: {
      async put(item: StoredContentItem): Promise<void> {
        store.doc.contentItems[item.id] = {
          ...item,
          package: { ...item.package },
        }
        store.doc.contentItems = trimContentItems(store.doc.contentItems)
        store.schedulePersist()
      },
      async get(id: string): Promise<StoredContentItem | undefined> {
        const row = store.doc.contentItems[id]
        return row ? { ...row, package: { ...row.package } } : undefined
      },
      async listForBrand(brandProfileId: BrandProfileId, params?: ListParams): Promise<StoredContentItem[]> {
        const list = Object.values(store.doc.contentItems)
          .filter((i) => i.brandProfileId === brandProfileId)
          .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        const limit = params?.limit
        return limit != null ? list.slice(0, limit).map((i) => ({ ...i })) : list.map((i) => ({ ...i }))
      },
    },
    socialAccounts: {
      async listForBrand(brandProfileId: BrandProfileId): Promise<SocialAccount[]> {
        return store.doc.socialByBrand[brandProfileId]?.map((a) => ({ ...a })) ?? []
      },
      async upsertMany(accounts: SocialAccount[]): Promise<void> {
        const grouped = new Map<string, SocialAccount[]>()
        for (const a of accounts) {
          const cur = grouped.get(a.brand_profile_id) ?? []
          cur.push({ ...a })
          grouped.set(a.brand_profile_id, cur)
        }
        for (const [brandId, list] of grouped) {
          store.doc.socialByBrand[brandId] = list
        }
        store.schedulePersist()
      },
    },
    brands: {
      async list(): Promise<BrandProfile[]> {
        return store.doc.brands.map((b) => ({ ...b }))
      },
      async get(id: BrandProfileId): Promise<BrandProfile | undefined> {
        const b = store.doc.brands.find((x) => x.id === id)
        return b ? { ...b } : undefined
      },
      async upsert(brand: BrandProfile): Promise<void> {
        const idx = store.doc.brands.findIndex((b) => b.id === brand.id)
        if (idx >= 0) store.doc.brands[idx] = { ...brand }
        else store.doc.brands.push({ ...brand })
        store.schedulePersist()
      },
    },
    learningSnapshots: {
      async save(snapshot: StoredLearningSnapshot): Promise<void> {
        store.doc.learningSnapshots[snapshot.brandProfileId] = {
          ...snapshot,
          insights: snapshot.insights.map((i) => ({ ...i })),
          recommendations: snapshot.recommendations.map((r) => ({ ...r })),
        }
        store.schedulePersist()
      },
      async getLatest(brandProfileId: BrandProfileId): Promise<StoredLearningSnapshot | undefined> {
        const s = store.doc.learningSnapshots[brandProfileId]
        if (!s) return undefined
        return {
          ...s,
          insights: s.insights.map((i) => ({ ...i })),
          recommendations: s.recommendations.map((r) => ({ ...r })),
        }
      },
    },
    labHistory: {
      async appendRun(run: StoredLearningLabRun): Promise<void> {
        store.doc.labRuns.push({ ...run })
        store.doc.labRuns = trimLabRuns(store.doc.labRuns)
        store.schedulePersist()
      },
      async listRunsForBrand(
        brandProfileId: BrandProfileId,
        params?: ListParams,
      ): Promise<StoredLearningLabRun[]> {
        const filtered = store.doc.labRuns
          .filter((r) => r.brandProfileId === brandProfileId)
          .sort((a, b) => Date.parse(b.ranAt) - Date.parse(a.ranAt))
        const limit = params?.limit ?? 32
        return filtered.slice(0, limit).map((r) => ({ ...r }))
      },
    },
  }
}

export function clearBrowserPersistenceForTenant(tenantId: string): void {
  try {
    localStorage.removeItem(storageKey(tenantId))
  } catch {
    /* ignore */
  }
}

export function clearAllBrowserPersistenceKeys(): void {
  try {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k?.startsWith('jifunze.persistence.v1:')) keys.push(k)
    }
    for (const k of keys) localStorage.removeItem(k)
  } catch {
    /* ignore */
  }
}
