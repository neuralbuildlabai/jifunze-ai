-- Knowledge specs (JSON graph + blueprints) and derived content assets, workspace-scoped.
-- Non-destructive; existing training rows unchanged.

-- ---------------------------------------------------------------------------
-- training_plan_knowledge_specs: one row per plan (optional; legacy plans have none)
-- ---------------------------------------------------------------------------
create table if not exists public.training_plan_knowledge_specs (
  id uuid primary key default gen_random_uuid(),
  training_plan_id uuid not null references public.training_plans (id) on delete cascade,
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  created_by uuid not null references auth.users (id) on delete restrict,
  spec_json jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint training_plan_knowledge_specs_plan_unique unique (training_plan_id)
);

create index if not exists training_plan_knowledge_specs_workspace_idx
  on public.training_plan_knowledge_specs (workspace_id);

comment on table public.training_plan_knowledge_specs is
  'Structured TrainingKnowledgeSpec JSON for the plan; drives lessons/quizzes and derived assets.';

-- ---------------------------------------------------------------------------
-- derived_content_assets: study notes, trainer guides, etc. from plan/module/lesson
-- ---------------------------------------------------------------------------
create table if not exists public.derived_content_assets (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  created_by uuid not null references auth.users (id) on delete restrict,
  source_training_plan_id uuid not null references public.training_plans (id) on delete cascade,
  source_module_id uuid references public.training_modules (id) on delete set null,
  source_lesson_id uuid references public.training_lessons (id) on delete set null,
  asset_type text not null,
  audience_level text,
  content text not null default '',
  metadata_json jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint derived_content_assets_type_check check (
    asset_type in (
      'study_notes',
      'revision_sheet',
      'trainer_guide',
      'handout',
      'slide_outline',
      'faq_sheet',
      'educational_brief'
    )
  )
);

create index if not exists derived_content_assets_workspace_idx
  on public.derived_content_assets (workspace_id);
create index if not exists derived_content_assets_plan_idx
  on public.derived_content_assets (source_training_plan_id);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------
drop trigger if exists training_plan_knowledge_specs_touch_updated_at on public.training_plan_knowledge_specs;
create trigger training_plan_knowledge_specs_touch_updated_at
  before update on public.training_plan_knowledge_specs
  for each row execute function public.training_touch_updated_at();

drop trigger if exists derived_content_assets_touch_updated_at on public.derived_content_assets;
create trigger derived_content_assets_touch_updated_at
  before update on public.derived_content_assets
  for each row execute function public.training_touch_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.training_plan_knowledge_specs enable row level security;
alter table public.derived_content_assets enable row level security;

drop policy if exists training_plan_knowledge_specs_tenant_select on public.training_plan_knowledge_specs;
drop policy if exists training_plan_knowledge_specs_tenant_insert on public.training_plan_knowledge_specs;
drop policy if exists training_plan_knowledge_specs_tenant_update on public.training_plan_knowledge_specs;
drop policy if exists training_plan_knowledge_specs_tenant_delete on public.training_plan_knowledge_specs;

create policy training_plan_knowledge_specs_tenant_select on public.training_plan_knowledge_specs
  for select using (workspace_id in (select public.user_tenant_ids()));

create policy training_plan_knowledge_specs_tenant_insert on public.training_plan_knowledge_specs
  for insert with check (
    workspace_id in (select public.user_tenant_ids())
    and created_by = auth.uid()
  );

create policy training_plan_knowledge_specs_tenant_update on public.training_plan_knowledge_specs
  for update using (workspace_id in (select public.user_tenant_ids()))
  with check (workspace_id in (select public.user_tenant_ids()));

create policy training_plan_knowledge_specs_tenant_delete on public.training_plan_knowledge_specs
  for delete using (workspace_id in (select public.user_tenant_ids()));

drop policy if exists derived_content_assets_tenant_select on public.derived_content_assets;
drop policy if exists derived_content_assets_tenant_insert on public.derived_content_assets;
drop policy if exists derived_content_assets_tenant_update on public.derived_content_assets;
drop policy if exists derived_content_assets_tenant_delete on public.derived_content_assets;

create policy derived_content_assets_tenant_select on public.derived_content_assets
  for select using (workspace_id in (select public.user_tenant_ids()));

create policy derived_content_assets_tenant_insert on public.derived_content_assets
  for insert with check (
    workspace_id in (select public.user_tenant_ids())
    and created_by = auth.uid()
  );

create policy derived_content_assets_tenant_update on public.derived_content_assets
  for update using (workspace_id in (select public.user_tenant_ids()))
  with check (workspace_id in (select public.user_tenant_ids()));

create policy derived_content_assets_tenant_delete on public.derived_content_assets
  for delete using (workspace_id in (select public.user_tenant_ids()));

-- Grants (authenticated + service role patterns match other training tables)
grant select, insert, update, delete on public.training_plan_knowledge_specs to authenticated;
grant select, insert, update, delete on public.derived_content_assets to authenticated;
