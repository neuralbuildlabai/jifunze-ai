-- Harden tenant-scoped app tables for durable defaults and clearer semantics.
-- JSONB columns keep existing app shapes; Postgres enforces presence.
-- Idempotent: skips tables that do not exist yet; safe to re-run on remotes with partial schema.

-- Latest scored signals + ingestion batch metadata per brand (one row per tenant + brand).
do $$
begin
  if to_regclass('public.signal_cache') is null then
    raise notice 'persistence_hardening: public.signal_cache not found; skipping';
    return;
  end if;

  update public.signal_cache set batch = '{}'::jsonb where batch is null;
  update public.signal_cache set scored = '[]'::jsonb where scored is null;
  alter table public.signal_cache
    alter column batch set default '{}'::jsonb,
    alter column batch set not null,
    alter column scored set default '[]'::jsonb,
    alter column scored set not null;

  comment on table public.signal_cache is 'Tenant-scoped cache of last signal ingest batch and scored signals per brand.';
  comment on column public.signal_cache.batch is 'SignalIngestionBatch JSON (counts, ids, fetchedAt).';
  comment on column public.signal_cache.scored is 'ScoredSignal[] JSON for the brand.';
end $$;

-- Materialized opportunities list per brand (rebuilt on each pipeline run).
do $$
begin
  if to_regclass('public.opportunity_cache') is null then
    raise notice 'persistence_hardening: public.opportunity_cache not found; skipping';
    return;
  end if;

  update public.opportunity_cache set opportunities = '[]'::jsonb where opportunities is null;
  alter table public.opportunity_cache
    alter column opportunities set default '[]'::jsonb,
    alter column opportunities set not null;

  comment on table public.opportunity_cache is 'Tenant-scoped stored opportunities (StoredOpportunity[]) per brand.';
  comment on column public.opportunity_cache.opportunities is 'StoredOpportunity[] JSON.';
end $$;

do $$
begin
  if to_regclass('public.content_items') is not null then
    comment on table public.content_items is 'Tenant-scoped generated/stored content items (payload = StoredContentItem).';
  end if;
  if to_regclass('public.published_content_performance') is not null then
    comment on table public.published_content_performance is 'Tenant-scoped publish outcome rows (payload = PublishedContentPerformance).';
  end if;
  if to_regclass('public.learning_snapshots') is not null then
    comment on table public.learning_snapshots is 'Tenant-scoped latest learning bundle per brand (insights + recommendations + snapshot in payload).';
    comment on column public.learning_snapshots.payload is 'StoredLearningSnapshot JSON: snapshot, insights, recommendations, capturedAt.';
  end if;
end $$;
