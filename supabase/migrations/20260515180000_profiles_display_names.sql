-- Learner-facing display names stored on profiles (synced from account settings).
-- Auth user_metadata remains the primary write path from the app; profiles columns
-- power admin RPC display_name coalescing and future server-side reporting.

alter table public.profiles
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists display_name text;

comment on column public.profiles.first_name is 'Given name — optional; synced from learner account settings.';
comment on column public.profiles.last_name is 'Family name — optional; synced from learner account settings.';
comment on column public.profiles.display_name is 'Optional display override — synced from learner account settings.';
