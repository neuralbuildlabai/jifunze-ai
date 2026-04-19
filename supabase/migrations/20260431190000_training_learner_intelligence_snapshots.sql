-- Append-only learner intelligence snapshots (weak/readiness summaries — no raw quiz answers).
-- Enables longitudinal weak-area + readiness continuity without recomputing full history each load.

create table if not exists public.training_learner_intelligence_snapshots (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  training_plan_id uuid not null references public.training_plans (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  trigger_kind text not null default 'checkpoint',
  source_quiz_id uuid references public.training_quizzes (id) on delete set null,
  payload_json jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists training_learner_intel_workspace_plan_user_created_idx
  on public.training_learner_intelligence_snapshots (workspace_id, training_plan_id, user_id, created_at desc);

create index if not exists training_learner_intel_plan_workspace_idx
  on public.training_learner_intelligence_snapshots (training_plan_id, workspace_id);

comment on table public.training_learner_intelligence_snapshots is
  'Compact weak-area + readiness signals after checkpoints. No raw answers — only derived labels/lines for continuity and facilitator aggregates.';

comment on column public.training_learner_intelligence_snapshots.trigger_kind is
  'checkpoint = after a quiz/diagnostic/supplemental attempt persisted. Future: lesson_milestone, etc.';

comment on column public.training_learner_intelligence_snapshots.payload_json is
  'Versioned JSON: see IntelligenceSnapshotPayloadV1 in learnerIntelligencePayload.ts (version 1).';

alter table public.training_learner_intelligence_snapshots enable row level security;

drop policy if exists training_learner_intel_insert_self on public.training_learner_intelligence_snapshots;
create policy training_learner_intel_insert_self on public.training_learner_intelligence_snapshots
  for insert with check (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  );

drop policy if exists training_learner_intel_select_self_or_manager on public.training_learner_intelligence_snapshots;
create policy training_learner_intel_select_self_or_manager on public.training_learner_intelligence_snapshots
  for select using (
    workspace_id in (select public.user_tenant_ids())
    and (
      user_id = auth.uid()
      or public.user_is_workspace_training_manager(workspace_id)
    )
  );

grant select, insert on public.training_learner_intelligence_snapshots to authenticated;
