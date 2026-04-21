-- Persist per-module quiz gate state (pass / lock / review ack) with flagship progress — not only in browser localStorage.

alter table public.flagship_course_progress
  add column if not exists module_quiz jsonb not null default '{}'::jsonb;

comment on column public.flagship_course_progress.module_quiz is
  'Per-module quiz records: passedAt, lockUntil, lastAttemptAt, reviewAcknowledgedAt — merged with client state on sync.';
