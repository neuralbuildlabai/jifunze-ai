-- ---------------------------------------------------------------------------
-- Instagram publishing support tables.
--   instagram_publish_log  : idempotency + audit of every publish attempt.
--   instagram_token_state  : token expiry tracking (NEVER stores the token).
-- Both are service-role only (written by Edge Functions). RLS on, no policies.
-- ---------------------------------------------------------------------------

create table if not exists public.instagram_publish_log (
  idempotency_key text primary key,
  ig_media_id     text,
  container_id    text,
  media_type      text,
  status          text not null default 'pending',
  error_detail    text,
  created_at      timestamptz not null default now(),
  published_at    timestamptz
);

create index if not exists instagram_publish_log_published_idx
  on public.instagram_publish_log (published_at desc);

create table if not exists public.instagram_token_state (
  id           text primary key,          -- 'jifunze'
  expires_at   timestamptz,
  fingerprint  text,                       -- last 6 chars only; never the token
  refreshed_at timestamptz,
  updated_at   timestamptz not null default now()
);

alter table public.instagram_publish_log enable row level security;
alter table public.instagram_token_state enable row level security;
-- No policies: writes are service-role only (bypasses RLS). Nothing client-side
-- may read or write publishing state.
