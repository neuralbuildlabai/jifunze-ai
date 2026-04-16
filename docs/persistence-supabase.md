# Persistence layer (Supabase-ready)

JifunzeAI ships with an **in-memory persistence registry** (`src/persistence/registry.ts`) so the app works in the browser without a database. Domain code depends on **repository interfaces** (`src/persistence/contracts.ts`), not on `Map` or demo fixtures.

## Replacing the default layer

```ts
import { setPersistence } from './persistence'
// import { createSupabasePersistenceLayer } from './persistence/supabase' // future

// setPersistence(createSupabasePersistenceLayer(supabaseClient))
```

Implementations should satisfy `PersistenceLayer`: performance rows, signals, opportunities, content items, social accounts, **brands** (mapped to `BrandProfile` in app code), and optional learning snapshots.

## Suggested Supabase mapping

| Repository / data | Suggested tables / notes |
| --- | --- |
| `PerformanceMemoryRepository` | `published_content_performance` — flat metrics + JSONB `metadata`; RLS by tenant; `brand_profile_id` column stores **`brands.id`**. |
| `SignalRepository` | `signal_ingestion_batches` (counts, `fetched_at`) + `signals` (normalized URL, text, domain, trend, scores) with FK `batch_id`; `brand_profile_id` stores **`brands.id`**. |
| `OpportunityRepository` | `content_opportunities` — FK `signal_id`, autonomy + lifecycle columns; optional JSONB `payload` mirroring `ContentOpportunity`. |
| `ContentItemRepository` | `content_items` or `content_packages` — FK `opportunity_id`, `mode`, lifecycle, JSONB `package` for full `ContentPackage`. |
| `SocialAccountRepository` | `social_accounts` — platform, handle, status; secrets in Vault / Edge only. |
| `BrandProfileRepository` | `brands` — `id`, `tenant_id`, `name`, `created_at`; mapped to `BrandProfile` in app code; RLS by tenant. |
| `LearningSnapshotRepository` | Optional `learning_snapshots` (insights + recommendations JSONB) **or** derive in SQL/Edge from performance rows only. |

## Session vs production

- **Today:** `createInMemoryPersistenceLayer()` seeds brands from `demoBrands` and mirrors ingest/opportunity/package writes in-session.
- **Next:** Edge Functions for ingest + workers for scoring; Postgres for durable rows; Realtime for UI if needed.
