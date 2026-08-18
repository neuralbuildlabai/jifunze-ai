-- ---------------------------------------------------------------------------
-- Real signal ingestion (replaces mock providers)
--
-- Two global tables. Signals are shared raw material — relevance scoring is
-- what makes them tenant-specific, so we do not duplicate rows per tenant.
--
-- Writes are service-role only (the ingest-signals Edge Function). Any
-- authenticated user may read.
-- ---------------------------------------------------------------------------

-- Feed configuration + conditional-request state ----------------------------
create table if not exists public.signal_sources (
  id                    text primary key,
  kind                  text not null check (kind in ('news','rss','trends','web_monitoring')),
  label                 text not null,
  feed_url              text not null,
  topic_tags            text[] not null default '{}',
  enabled               boolean not null default true,
  -- conditional request caching (RFC 7232) so we re-fetch politely
  etag                  text,
  last_modified         text,
  last_fetched_at       timestamptz,
  last_success_at       timestamptz,
  last_status           text,
  consecutive_failures  integer not null default 0,
  created_at            timestamptz not null default now()
);

comment on table public.signal_sources is
  'Feed registry for ingest-signals. consecutive_failures >= 5 auto-disables a source.';

-- Normalized external signals ----------------------------------------------
create table if not exists public.ingested_signals (
  id             uuid primary key default gen_random_uuid(),
  provider_id    text not null references public.signal_sources (id) on delete cascade,
  kind           text not null,
  source_label   text,
  title          text not null,
  summary        text not null default '',
  url            text not null,
  -- utm/fragment-stripped, lowercased host: the dedupe key
  canonical_url  text not null,
  published_at   timestamptz not null,
  topic_tags     text[] not null default '{}',
  raw            jsonb,
  fetched_at     timestamptz not null default now(),
  constraint ingested_signals_canonical_url_key unique (canonical_url)
);

create index if not exists ingested_signals_published_idx
  on public.ingested_signals (published_at desc);
create index if not exists ingested_signals_provider_idx
  on public.ingested_signals (provider_id);
create index if not exists ingested_signals_fetched_idx
  on public.ingested_signals (fetched_at desc);

-- RLS ----------------------------------------------------------------------
alter table public.signal_sources     enable row level security;
alter table public.ingested_signals   enable row level security;

drop policy if exists signal_sources_select_authenticated on public.signal_sources;
create policy signal_sources_select_authenticated on public.signal_sources
  for select to authenticated using (true);

drop policy if exists ingested_signals_select_authenticated on public.ingested_signals;
create policy ingested_signals_select_authenticated on public.ingested_signals
  for select to authenticated using (true);

-- No insert/update/delete policies: writes are service-role only, which
-- bypasses RLS. This is deliberate — nothing client-side may write signals.

-- Retention ----------------------------------------------------------------
create or replace function public.prune_ingested_signals(retain_days integer default 30)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  removed integer;
begin
  delete from public.ingested_signals
   where published_at < now() - make_interval(days => retain_days);
  get diagnostics removed = row_count;
  return removed;
end;
$$;

revoke all on function public.prune_ingested_signals(integer) from public, anon, authenticated;

-- Seed: feeds verified reachable 2026-08-18 --------------------------------
insert into public.signal_sources (id, kind, label, feed_url, topic_tags) values
  ('rss_techcabal',      'rss',  'TechCabal',            'https://techcabal.com/feed/',                                  '{africa,startups,tech}'),
  ('rss_techpoint',      'rss',  'Techpoint Africa',     'https://techpoint.africa/feed/',                               '{africa,startups,tech}'),
  ('rss_capitalfm_biz',  'news', 'Capital FM Business',  'https://capitalfm.africa/business/feed/',                      '{kenya,business}'),
  ('rss_techcrunch_ai',  'news', 'TechCrunch AI',        'https://techcrunch.com/category/artificial-intelligence/feed/','{ai,tech}'),
  ('rss_openai_news',    'rss',  'OpenAI News',          'https://openai.com/news/rss.xml',                              '{ai,tools}'),
  ('rss_huggingface',    'rss',  'Hugging Face Blog',    'https://huggingface.co/blog/feed.xml',                         '{ai,open_source,tools}'),
  ('rss_hackernews',     'trends','Hacker News Front Page','https://news.ycombinator.com/rss',                           '{tech,trends}')
on conflict (id) do nothing;
