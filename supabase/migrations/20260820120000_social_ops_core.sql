-- ---------------------------------------------------------------------------
-- Social operations core: the canonical content ledger, the account/connection
-- registry, publication records, timestamped metric snapshots, sync bookkeeping,
-- the publishing job queue and the alert stream.
--
-- Design rules enforced here:
--   * NO PLAINTEXT TOKENS. `social_account_connections` stores expiry, status and a short
--     non-reversible fingerprint only. Token VALUES live in the server-side secret store
--     (Supabase secrets / GitHub Actions secrets) and never in Postgres.
--   * Idempotency. Every table that a scheduled job writes has a natural unique key so a
--     re-run overwrites instead of duplicating.
--   * Least privilege. Writes are service-role only. Admin operators get SELECT via
--     public.is_admin() (defined in 20260514120000_admin_platform_rbac.sql). The public
--     (anon) role can read ONLY approved + published content rows for the website.
--   * Error columns hold operator-safe summaries. Producers must strip secrets before write.
--
-- Isolation note: none of this touches the frozen learning platform
-- (learning-platform-frozen-2026-08-18). No table, policy or function defined below is
-- referenced by /learn, /admin, billing or training code.
--
-- Retention (documented, enforced by public.prune_social_ops below — call it from a
-- scheduled job only after review):
--   social_metric_snapshots  keep 400 days  (year-over-year comparison, then drop)
--   sync_runs                keep 90 days
--   publishing_attempts      keep 180 days
--   social_alerts            keep 180 days (resolved) / never (unresolved)
--   content_items            keep forever   (it is the ledger)
-- ---------------------------------------------------------------------------

-- --------------------------------------------------------------------------
-- Shared enums, expressed as CHECK constraints to match this repo's convention
-- --------------------------------------------------------------------------
-- platform: instagram | facebook | threads | tiktok | youtube | linkedin | x |
--           pinterest | telegram | whatsapp_channel

create table if not exists public.social_accounts (
  platform            text primary key
    check (platform in ('instagram','facebook','threads','tiktok','youtube',
                        'linkedin','x','pinterest','telegram','whatsapp_channel',
                        'bluesky')),
  display_name        text not null,
  handle              text not null,
  profile_url         text not null,
  -- Platform-assigned id where one is public (IG business id, Page id, channel id, org id).
  platform_account_id text,
  -- 'ready' | 'credentials_missing' | 'api_approval_required' | 'paid_access_required'
  -- | 'manual_only' | 'unsupported'. Mirrors src/social/platformMatrix.ts.
  readiness           text not null default 'credentials_missing',
  -- true when a human posts here by hand (WhatsApp Channel, X under the no-spend rule).
  manual_only         boolean not null default false,
  reads_account_metrics boolean not null default false,
  reads_post_metrics    boolean not null default false,
  can_publish           boolean not null default false,
  -- 0..1, computed by the dashboard from the audited profile fields.
  profile_completeness  numeric(3,2),
  enabled             boolean not null default false,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.social_accounts is
  'One row per official Jifunze.ai channel. GitHub is deliberately absent: it is not a social profile for this brand.';

-- --------------------------------------------------------------------------
-- Connection + token HEALTH. Never the token itself.
-- --------------------------------------------------------------------------
create table if not exists public.social_account_connections (
  platform                text primary key references public.social_accounts(platform) on delete cascade,
  connection_status       text not null default 'disconnected'
    check (connection_status in ('connected','disconnected','manual_only','approval_pending','error')),
  -- Names of the server-side env vars this connection needs. NAMES ONLY.
  required_env_vars       text[] not null default '{}',
  missing_env_vars        text[] not null default '{}',
  -- Token health. The VALUE never appears here.
  token_expires_at        timestamptz,
  token_fingerprint       text,   -- last 6 characters at most; never the token
  token_refreshed_at      timestamptz,
  scopes                  text[] not null default '{}',
  last_sync_attempt_at    timestamptz,
  last_successful_sync_at timestamptz,
  last_sync_status        text,
  last_sync_run_id        text,
  last_publish_attempt_at timestamptz,
  last_publish_success_at timestamptz,
  -- Operator-safe. Producers must run errors through safeErrorSummary() before writing.
  last_error_summary      text,
  required_action         text,
  updated_at              timestamptz not null default now()
);

comment on column public.social_account_connections.token_fingerprint is
  'At most the last 6 characters of a token, for "is this the same token?" checks. Never the token.';

-- --------------------------------------------------------------------------
-- The canonical content ledger
-- --------------------------------------------------------------------------
create table if not exists public.content_items (
  id                  text primary key,
  slug                text not null unique,
  title               text not null,
  summary             text not null,
  -- Accessible full text: the transcript for a video, the ordered steps for a guide.
  body                text[] not null default '{}',
  pillar              text not null
    check (pillar in ('practical_ai','career_growth','income_business','digital_tools','productivity','opportunities')),
  source_type         text not null default 'engine'
    check (source_type in ('evergreen','engine')),
  original_source_url text,
  brief_version       text,
  script_version      text,
  video_asset_ref     text,
  thumbnail_url       text,
  caption             text,
  hashtags            text[] not null default '{}',
  publication_status  text not null default 'draft'
    check (publication_status in ('draft','scheduled','published','retracted')),
  approval_status     text not null default 'pending'
    check (approval_status in ('pending','approved','rejected')),
  published_at        timestamptz,
  safety_status       text not null default 'ok'
    check (safety_status in ('ok','review','blocked')),
  correction_note     text,
  seo_title           text,
  seo_description     text,
  canonical_url       text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists content_items_public_idx
  on public.content_items (published_at desc)
  where approval_status = 'approved' and publication_status = 'published';
create index if not exists content_items_pillar_idx on public.content_items (pillar);

comment on table public.content_items is
  'Source of truth for every piece of Jifunze.ai content. Platform APIs enrich this; they never create it. Nothing here comes from scraping a platform.';

create table if not exists public.content_sources (
  id           bigserial primary key,
  content_id   text not null references public.content_items(id) on delete cascade,
  attribution  text not null,
  url          text not null,
  retrieved_at timestamptz,
  created_at   timestamptz not null default now(),
  unique (content_id, url)
);

-- --------------------------------------------------------------------------
-- Where each item was published, and how it is doing
-- --------------------------------------------------------------------------
create table if not exists public.content_publications (
  id                   bigserial primary key,
  content_id           text not null references public.content_items(id) on delete cascade,
  platform             text not null references public.social_accounts(platform),
  platform_post_id     text,
  platform_post_url    text,
  status               text not null default 'queued'
    check (status in ('queued','publishing','published','failed','skipped')),
  -- The duplicate guard: an item may appear at most once per platform.
  idempotency_key      text not null,
  published_at         timestamptz,
  last_metrics_sync_at timestamptz,
  error_summary        text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  unique (content_id, platform),
  unique (idempotency_key)
);

-- A platform post id, where one exists, must be unique per platform. Partial so many
-- rows may sit at NULL while queued.
create unique index if not exists content_publications_platform_post_unique
  on public.content_publications (platform, platform_post_id)
  where platform_post_id is not null;

create index if not exists content_publications_sync_idx
  on public.content_publications (platform, status, published_at desc);

-- --------------------------------------------------------------------------
-- Historical metric snapshots — append-only history, idempotent per window
-- --------------------------------------------------------------------------
create table if not exists public.social_metric_snapshots (
  id           bigserial primary key,
  platform     text not null references public.social_accounts(platform),
  subject_type text not null check (subject_type in ('account','post')),
  -- platform id for 'account'; the platform post id for 'post'.
  subject_id   text not null,
  -- Start of the two-hour window this snapshot belongs to. Makes a re-run idempotent.
  window_start timestamptz not null,
  captured_at  timestamptz not null default now(),
  followers    bigint,
  views        bigint,
  reach        bigint,
  impressions  bigint,
  engagement   bigint,
  likes        bigint,
  comments     bigint,
  shares       bigint,
  saves        bigint,
  sync_run_id  text,
  unique (platform, subject_type, subject_id, window_start)
);

create index if not exists social_metric_snapshots_recent_idx
  on public.social_metric_snapshots (platform, subject_type, window_start desc);

-- --------------------------------------------------------------------------
-- Sync bookkeeping
-- --------------------------------------------------------------------------
create table if not exists public.sync_runs (
  id                text primary key,      -- sync-<window_start ISO>
  dry_run           boolean not null default false,
  status            text not null default 'running'
    check (status in ('running','ok','failed')),
  started_at        timestamptz not null default now(),
  finished_at       timestamptz,
  platforms_ok      integer not null default 0,
  platforms_skipped integer not null default 0,
  platforms_failed  integer not null default 0
);

create index if not exists sync_runs_recent_idx on public.sync_runs (started_at desc);

-- --------------------------------------------------------------------------
-- Publishing queue + attempt audit
-- --------------------------------------------------------------------------
create table if not exists public.publishing_jobs (
  id              bigserial primary key,
  content_id      text not null references public.content_items(id) on delete cascade,
  platform        text not null references public.social_accounts(platform),
  status          text not null default 'pending'
    check (status in ('pending','running','succeeded','failed','cancelled','blocked')),
  scheduled_for   timestamptz,
  attempts        integer not null default 0,
  max_attempts    integer not null default 3,
  next_attempt_at timestamptz,
  -- Set when a safety gate refuses the job, e.g. the global kill switch or a missing approval.
  blocked_reason  text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (content_id, platform)
);

create index if not exists publishing_jobs_due_idx
  on public.publishing_jobs (status, next_attempt_at);

create table if not exists public.publishing_attempts (
  id              bigserial primary key,
  job_id          bigint not null references public.publishing_jobs(id) on delete cascade,
  attempt_number  integer not null,
  started_at      timestamptz not null default now(),
  finished_at     timestamptz,
  outcome         text check (outcome in ('published','pending','draft','failed','skipped')),
  platform_post_id text,
  -- Operator-safe summary only.
  error_summary   text,
  unique (job_id, attempt_number)
);

-- --------------------------------------------------------------------------
-- Alerts + approvals
-- --------------------------------------------------------------------------
create table if not exists public.social_alerts (
  id           bigserial primary key,
  platform     text references public.social_accounts(platform),
  severity     text not null default 'warning' check (severity in ('info','warning','error')),
  code         text not null,
  message      text not null,
  sync_run_id  text,
  resolved_at  timestamptz,
  created_at   timestamptz not null default now()
);

create index if not exists social_alerts_open_idx
  on public.social_alerts (created_at desc) where resolved_at is null;

create table if not exists public.content_approvals (
  id           bigserial primary key,
  content_id   text not null references public.content_items(id) on delete cascade,
  decision     text not null check (decision in ('approved','rejected','changes_requested')),
  -- auth.uid() of the approving operator. Null for automated quality-gate decisions.
  decided_by   uuid,
  decided_at   timestamptz not null default now(),
  note         text
);

create index if not exists content_approvals_content_idx
  on public.content_approvals (content_id, decided_at desc);

-- --------------------------------------------------------------------------
-- Row level security
--   * anon/authenticated: read approved + published content only.
--   * platform_admin / super_admin: read everything operational.
--   * writes: service role only (bypasses RLS). No write policy is granted to anyone.
-- --------------------------------------------------------------------------
alter table public.social_accounts             enable row level security;
alter table public.social_account_connections  enable row level security;
alter table public.content_items               enable row level security;
alter table public.content_sources             enable row level security;
alter table public.content_publications        enable row level security;
alter table public.social_metric_snapshots     enable row level security;
alter table public.sync_runs                   enable row level security;
alter table public.publishing_jobs             enable row level security;
alter table public.publishing_attempts         enable row level security;
alter table public.social_alerts               enable row level security;
alter table public.content_approvals           enable row level security;

-- Public website reads: approved + published only, and only the content tables.
drop policy if exists content_items_public_read on public.content_items;
create policy content_items_public_read on public.content_items
  for select to anon, authenticated
  using (approval_status = 'approved' and publication_status = 'published');

drop policy if exists content_sources_public_read on public.content_sources;
create policy content_sources_public_read on public.content_sources
  for select to anon, authenticated
  using (exists (
    select 1 from public.content_items ci
     where ci.id = content_sources.content_id
       and ci.approval_status = 'approved'
       and ci.publication_status = 'published'
  ));

drop policy if exists content_publications_public_read on public.content_publications;
create policy content_publications_public_read on public.content_publications
  for select to anon, authenticated
  using (
    status = 'published'
    and platform_post_url is not null
    and exists (
      select 1 from public.content_items ci
       where ci.id = content_publications.content_id
         and ci.approval_status = 'approved'
         and ci.publication_status = 'published'
    )
  );

-- Admin read policies for the operational tables.
drop policy if exists social_accounts_admin_read on public.social_accounts;
create policy social_accounts_admin_read on public.social_accounts
  for select to authenticated using (public.is_admin());

drop policy if exists social_account_connections_admin_read on public.social_account_connections;
create policy social_account_connections_admin_read on public.social_account_connections
  for select to authenticated using (public.is_admin());

drop policy if exists content_items_admin_read on public.content_items;
create policy content_items_admin_read on public.content_items
  for select to authenticated using (public.is_admin());

drop policy if exists content_publications_admin_read on public.content_publications;
create policy content_publications_admin_read on public.content_publications
  for select to authenticated using (public.is_admin());

drop policy if exists social_metric_snapshots_admin_read on public.social_metric_snapshots;
create policy social_metric_snapshots_admin_read on public.social_metric_snapshots
  for select to authenticated using (public.is_admin());

drop policy if exists sync_runs_admin_read on public.sync_runs;
create policy sync_runs_admin_read on public.sync_runs
  for select to authenticated using (public.is_admin());

drop policy if exists publishing_jobs_admin_read on public.publishing_jobs;
create policy publishing_jobs_admin_read on public.publishing_jobs
  for select to authenticated using (public.is_admin());

drop policy if exists publishing_attempts_admin_read on public.publishing_attempts;
create policy publishing_attempts_admin_read on public.publishing_attempts
  for select to authenticated using (public.is_admin());

drop policy if exists social_alerts_admin_read on public.social_alerts;
create policy social_alerts_admin_read on public.social_alerts
  for select to authenticated using (public.is_admin());

drop policy if exists content_approvals_admin_read on public.content_approvals;
create policy content_approvals_admin_read on public.content_approvals
  for select to authenticated using (public.is_admin());

-- --------------------------------------------------------------------------
-- Grants. SELECT only; every INSERT/UPDATE/DELETE goes through the service role.
-- --------------------------------------------------------------------------
grant select on public.content_items, public.content_sources, public.content_publications
  to anon, authenticated;
grant select on
  public.social_accounts,
  public.social_account_connections,
  public.social_metric_snapshots,
  public.sync_runs,
  public.publishing_jobs,
  public.publishing_attempts,
  public.social_alerts,
  public.content_approvals
  to authenticated;

-- --------------------------------------------------------------------------
-- Retention. Not scheduled by this migration — call it deliberately.
-- --------------------------------------------------------------------------
create or replace function public.prune_social_ops()
returns table (table_name text, rows_removed bigint)
language plpgsql
security definer
set search_path = public
as $$
declare n bigint;
begin
  delete from public.social_metric_snapshots where window_start < now() - interval '400 days';
  get diagnostics n = row_count; table_name := 'social_metric_snapshots'; rows_removed := n; return next;

  delete from public.sync_runs where started_at < now() - interval '90 days';
  get diagnostics n = row_count; table_name := 'sync_runs'; rows_removed := n; return next;

  delete from public.publishing_attempts where started_at < now() - interval '180 days';
  get diagnostics n = row_count; table_name := 'publishing_attempts'; rows_removed := n; return next;

  delete from public.social_alerts
   where resolved_at is not null and resolved_at < now() - interval '180 days';
  get diagnostics n = row_count; table_name := 'social_alerts'; rows_removed := n; return next;
end; $$;

revoke all on function public.prune_social_ops() from public, anon, authenticated;

comment on function public.prune_social_ops() is
  'Applies the documented retention windows. Service role only. Not scheduled by the migration.';

-- --------------------------------------------------------------------------
-- Seed the account registry from the audited public profiles (all public data).
-- --------------------------------------------------------------------------
insert into public.social_accounts
  (platform, display_name, handle, profile_url, platform_account_id, readiness, manual_only,
   reads_account_metrics, reads_post_metrics, can_publish, enabled, notes)
values
  ('instagram','Jifunze.AI','@jifunze.ai','https://www.instagram.com/jifunze.ai/','17841433836747759',
   'ready', false, true, true, true, true,
   'Publishing gated by IG_PUBLISH_ENABLED. Display name and bio link are mobile-app-only edits.'),
  ('facebook','Jifunze.AI','Jifunze.AI','https://www.facebook.com/profile.php?id=61593186673039','61593186673039',
   'credentials_missing', false, true, true, true, true,
   'Same Meta app as Instagram; no Page access token issued to the server yet.'),
  ('threads','Jifunze.AI','@jifunze.ai','https://www.threads.com/@jifunze.ai', null,
   'api_approval_required', false, true, true, true, true,
   'Needs its own Meta app with the Threads use case, plus app review.'),
  ('tiktok','Jifunze.AI','@jifunze_ai','https://www.tiktok.com/@jifunze_ai', null,
   'api_approval_required', false, true, true, true, false,
   'No developer app; no sign-in access from the operating machine. Unaudited clients post SELF_ONLY.'),
  ('youtube','Jifunze.AI','@jifunze-ai','https://www.youtube.com/@jifunze-ai','UCnvVNH52XiLQoNryE1p74Yg',
   'api_approval_required', false, true, true, true, true,
   'No Google Cloud project. Compliance audit needed for quota and public uploads.'),
  ('linkedin','Jifunze.AI','jifunze-ai','https://www.linkedin.com/company/jifunze-ai/','114444495',
   'api_approval_required', false, true, true, true, true,
   'Community Management API is a vetted product; no developer app verified against the Page.'),
  ('x','Jifunze.AI','@JifunzeAI','https://x.com/JifunzeAI', null,
   'paid_access_required', true, true, true, true, false,
   'Pay-per-post since 2026. Manual-only under the no-spend rule.'),
  ('pinterest','Jifunze.AI','@jifunzeai','https://www.pinterest.com/jifunzeai/', null,
   'api_approval_required', false, true, true, true, true,
   'No developer app. Trial access creates sandbox Pins only. Domain claim pending a deploy.'),
  ('telegram','Jifunze.AI','@jifunze_ai','https://t.me/jifunze_ai', null,
   'credentials_missing', false, true, false, true, false,
   'Channel and bot do not exist yet. Creating them needs owner approval.'),
  ('whatsapp_channel','Jifunze.AI','(channels have no handle)','', null,
   'manual_only', true, false, false, false, false,
   'No official Channel API exists. Manual distribution queue only.'),
  ('bluesky','Jifunze.AI','@jifunze.ai','https://bsky.app/profile/jifunze.ai',
   'did:plc:hez3uufhzodbtwzuvvreri5l',
   'credentials_missing', false, true, true, true, true,
   'Reads need no credential (public API is unauthenticated). Publishing needs only an app password, no developer app or review. Account created 21 Aug 2026; domain handle @jifunze.ai adopted 22 Aug 2026 (same DID).')
on conflict (platform) do update set
  display_name          = excluded.display_name,
  handle                = excluded.handle,
  profile_url           = excluded.profile_url,
  platform_account_id   = excluded.platform_account_id,
  readiness             = excluded.readiness,
  manual_only           = excluded.manual_only,
  reads_account_metrics = excluded.reads_account_metrics,
  reads_post_metrics    = excluded.reads_post_metrics,
  can_publish           = excluded.can_publish,
  notes                 = excluded.notes,
  updated_at            = now();

insert into public.social_account_connections (platform, connection_status, required_env_vars, missing_env_vars)
select platform,
       case when readiness = 'ready' then 'disconnected'
            when manual_only then 'manual_only'
            else 'approval_pending' end,
       '{}', '{}'
  from public.social_accounts
on conflict (platform) do nothing;
