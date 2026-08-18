-- ---------------------------------------------------------------------------
-- Autonomous loop support: scored opportunities audit + public reels bucket.
-- ---------------------------------------------------------------------------

create table if not exists public.content_opportunities (
  signal_id        text not null,
  run_date         date not null,
  priority         double precision not null default 0,
  relevance        double precision not null default 0,
  freshness        double precision not null default 0,
  selection_reason text,
  title            text,
  url              text,
  created_at       timestamptz not null default now(),
  primary key (signal_id, run_date)
);
create index if not exists content_opportunities_rundate_idx
  on public.content_opportunities (run_date desc, priority desc);

alter table public.content_opportunities enable row level security;
-- service-role only (orchestrator writes); no policies.

-- Public storage bucket for rendered reels. Instagram must fetch video_url over
-- the public internet, so the bucket is public-read. Objects are ephemeral —
-- prune after publish (see below).
insert into storage.buckets (id, name, public)
values ('reels', 'reels', true)
on conflict (id) do nothing;

-- Optional retention: drop rendered files older than 7 days (they're only needed
-- long enough for Instagram to ingest them).
create or replace function public.prune_reels(retain_days integer default 7)
returns integer language plpgsql security definer set search_path = storage, public as $$
declare removed integer;
begin
  delete from storage.objects
   where bucket_id = 'reels' and created_at < now() - make_interval(days => retain_days);
  get diagnostics removed = row_count;
  return removed;
end; $$;
revoke all on function public.prune_reels(integer) from public, anon, authenticated;
