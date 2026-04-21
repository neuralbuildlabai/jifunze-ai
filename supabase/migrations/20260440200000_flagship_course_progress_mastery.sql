-- Module mastery attestations (lightweight checkpoints) synced with local cache.

alter table public.flagship_course_progress
  add column if not exists completed_mastery_checkpoint_ids text[] not null default '{}';

comment on column public.flagship_course_progress.completed_mastery_checkpoint_ids is 'Ids like moduleId-mastery — unioned with local storage on merge.';
