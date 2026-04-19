-- Plan-level diagnostic quizzes (quiz_kind) + per-learner placement rows.

-- ---------------------------------------------------------------------------
-- training_quizzes.quiz_kind: distinguish module checkpoints vs plan diagnostic
-- ---------------------------------------------------------------------------
alter table public.training_quizzes
  add column if not exists quiz_kind text not null default 'module_checkpoint';

alter table public.training_quizzes
  drop constraint if exists training_quizzes_quiz_kind_check;

alter table public.training_quizzes
  add constraint training_quizzes_quiz_kind_check
  check (quiz_kind in ('module_checkpoint', 'diagnostic'));

comment on column public.training_quizzes.quiz_kind is
  'module_checkpoint = end-of-module quiz; diagnostic = optional pre-path assessment (training_module_id may be null).';

update public.training_quizzes
  set quiz_kind = 'module_checkpoint'
  where quiz_kind is null;

-- ---------------------------------------------------------------------------
-- training_plan_learner_placement: wizard or diagnostic-derived placement per learner
-- ---------------------------------------------------------------------------
create table if not exists public.training_plan_learner_placement (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  training_plan_id uuid not null references public.training_plans (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  self_confidence_1_5 int,
  diagnostic_score_percent numeric,
  recommended_level text not null,
  placement_source text not null,
  foundation_gap_concept_ids jsonb not null default '[]'::jsonb,
  skipped_module_sort_orders jsonb not null default '[]'::jsonb,
  placement_json jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint training_plan_learner_placement_source_check
    check (placement_source in ('wizard', 'diagnostic')),
  constraint training_plan_learner_placement_unique unique (workspace_id, training_plan_id, user_id)
);

create index if not exists training_plan_learner_placement_plan_idx
  on public.training_plan_learner_placement (training_plan_id);

create index if not exists training_plan_learner_placement_user_idx
  on public.training_plan_learner_placement (user_id);

drop trigger if exists training_plan_learner_placement_touch_updated_at on public.training_plan_learner_placement;
create trigger training_plan_learner_placement_touch_updated_at
  before update on public.training_plan_learner_placement
  for each row execute function public.training_touch_updated_at();

-- ---------------------------------------------------------------------------
-- create_training_plan_from_seed: optional top-level diagnostic_quiz
-- ---------------------------------------------------------------------------
create or replace function public.create_training_plan_from_seed(p_workspace_id uuid, p_seed jsonb)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  v_plan_id uuid;
  mod jsonb;
  les jsonb;
  quiz jsonb;
  ques jsonb;
  v_module_id uuid;
  v_quiz_id uuid;
  v_lesson_id uuid;
  st text;
  lesson_ids uuid[] := '{}'::uuid[];
  v_src_idx int;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if not exists (
    select 1 from public.tenant_members tm
    where tm.tenant_id = p_workspace_id and tm.user_id = uid
  ) then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  st := trim(p_seed->>'status');
  if st is null or st = '' then
    st := 'draft';
  end if;

  insert into public.training_plans (
    workspace_id, created_by, title, topic, objective, skill_level, duration_label, status, expected_outcomes
  )
  values (
    p_workspace_id,
    uid,
    trim(p_seed->>'title'),
    nullif(trim(p_seed->>'topic'), ''),
    nullif(trim(p_seed->>'objective'), ''),
    nullif(trim(p_seed->>'skill_level'), ''),
    nullif(trim(p_seed->>'duration_label'), ''),
    st,
    nullif(trim(p_seed->>'expected_outcomes'), '')
  )
  returning id into v_plan_id;

  -- Optional plan-level diagnostic (no module; sort_order typically -1)
  if p_seed ? 'diagnostic_quiz' and jsonb_typeof(p_seed->'diagnostic_quiz') = 'object' then
    quiz := p_seed->'diagnostic_quiz';
    insert into public.training_quizzes (
      training_plan_id, training_module_id, workspace_id, title, description, sort_order, quiz_kind
    )
    values (
      v_plan_id,
      null,
      p_workspace_id,
      trim(quiz->>'title'),
      nullif(trim(quiz->>'description'), ''),
      coalesce((quiz->>'sort_order')::int, -1),
      'diagnostic'
    )
    returning id into v_quiz_id;

    for ques in select * from jsonb_array_elements(coalesce(quiz->'questions', '[]'::jsonb))
    loop
      insert into public.training_quiz_questions (
        quiz_id, workspace_id, prompt, question_type, options_json, correct_answer, sort_order,
        explanation, difficulty, source_lesson_id
      )
      values (
        v_quiz_id,
        p_workspace_id,
        trim(ques->>'prompt'),
        coalesce(nullif(trim(ques->>'question_type'), ''), 'mcq'),
        coalesce(ques->'options_json', '[]'::jsonb),
        trim(ques->>'correct_answer'),
        coalesce((ques->>'sort_order')::int, 0),
        nullif(trim(ques->>'explanation'), ''),
        nullif(trim(ques->>'difficulty'), ''),
        null
      );
    end loop;
  end if;

  for mod in select * from jsonb_array_elements(coalesce(p_seed->'modules', '[]'::jsonb))
  loop
    insert into public.training_modules (
      training_plan_id, workspace_id, title, description, sort_order, module_goal, why_it_matters
    )
    values (
      v_plan_id,
      p_workspace_id,
      trim(mod->>'title'),
      nullif(trim(mod->>'description'), ''),
      coalesce((mod->>'sort_order')::int, 0),
      nullif(trim(mod->>'module_goal'), ''),
      nullif(trim(mod->>'why_it_matters'), '')
    )
    returning id into v_module_id;

    lesson_ids := '{}'::uuid[];

    for les in select * from jsonb_array_elements(coalesce(mod->'lessons', '[]'::jsonb))
    loop
      insert into public.training_lessons (
        module_id, training_plan_id, workspace_id, title, content, objectives, takeaway, sort_order,
        lesson_summary, practical_example, action_exercise, reflection_prompt, mistakes_to_avoid, estimated_minutes
      )
      values (
        v_module_id,
        v_plan_id,
        p_workspace_id,
        trim(les->>'title'),
        coalesce(les->>'content', ''),
        nullif(trim(les->>'objectives'), ''),
        nullif(trim(les->>'takeaway'), ''),
        coalesce((les->>'sort_order')::int, 0),
        nullif(trim(les->>'lesson_summary'), ''),
        nullif(trim(les->>'practical_example'), ''),
        nullif(trim(les->>'action_exercise'), ''),
        nullif(trim(les->>'reflection_prompt'), ''),
        nullif(trim(les->>'mistakes_to_avoid'), ''),
        case
          when les ? 'estimated_minutes' and (les->>'estimated_minutes') is not null
            and trim(les->>'estimated_minutes') <> ''
          then (les->>'estimated_minutes')::int
          else null
        end
      )
      returning id into v_lesson_id;

      lesson_ids := array_append(lesson_ids, v_lesson_id);
    end loop;

    quiz := mod->'quiz';
    if quiz is not null and jsonb_typeof(quiz) = 'object' then
      insert into public.training_quizzes (
        training_plan_id, training_module_id, workspace_id, title, description, sort_order, quiz_kind
      )
      values (
        v_plan_id,
        v_module_id,
        p_workspace_id,
        trim(quiz->>'title'),
        nullif(trim(quiz->>'description'), ''),
        coalesce((quiz->>'sort_order')::int, 0),
        'module_checkpoint'
      )
      returning id into v_quiz_id;

      for ques in select * from jsonb_array_elements(coalesce(quiz->'questions', '[]'::jsonb))
      loop
        v_src_idx := null;
        if ques ? 'source_lesson_index' and (ques->>'source_lesson_index') is not null
          and trim(ques->>'source_lesson_index') <> ''
        then
          v_src_idx := (ques->>'source_lesson_index')::int;
        end if;

        insert into public.training_quiz_questions (
          quiz_id, workspace_id, prompt, question_type, options_json, correct_answer, sort_order,
          explanation, difficulty, source_lesson_id
        )
        values (
          v_quiz_id,
          p_workspace_id,
          trim(ques->>'prompt'),
          coalesce(nullif(trim(ques->>'question_type'), ''), 'mcq'),
          coalesce(ques->'options_json', '[]'::jsonb),
          trim(ques->>'correct_answer'),
          coalesce((ques->>'sort_order')::int, 0),
          nullif(trim(ques->>'explanation'), ''),
          nullif(trim(ques->>'difficulty'), ''),
          case
            when v_src_idx is not null
              and v_src_idx >= 0
              and v_src_idx < coalesce(array_length(lesson_ids, 1), 0)
            then lesson_ids[v_src_idx + 1]
            else null
          end
        );
      end loop;
    end if;
  end loop;

  return v_plan_id;
end;
$$;

comment on function public.create_training_plan_from_seed(uuid, jsonb) is
  'Creates training plan with optional diagnostic_quiz (plan-level) and module checkpoints.';

-- ---------------------------------------------------------------------------
-- RLS: training_plan_learner_placement
-- ---------------------------------------------------------------------------
alter table public.training_plan_learner_placement enable row level security;

drop policy if exists training_plan_learner_placement_select on public.training_plan_learner_placement;
drop policy if exists training_plan_learner_placement_insert on public.training_plan_learner_placement;
drop policy if exists training_plan_learner_placement_update on public.training_plan_learner_placement;
drop policy if exists training_plan_learner_placement_delete on public.training_plan_learner_placement;

create policy training_plan_learner_placement_select on public.training_plan_learner_placement
  for select using (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  );

create policy training_plan_learner_placement_insert on public.training_plan_learner_placement
  for insert with check (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  );

create policy training_plan_learner_placement_update on public.training_plan_learner_placement
  for update using (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  )
  with check (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  );

create policy training_plan_learner_placement_delete on public.training_plan_learner_placement
  for delete using (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  );

grant select, insert, update, delete on public.training_plan_learner_placement to authenticated;

comment on table public.training_plan_learner_placement is
  'Per-learner placement (wizard or diagnostic): recommended level, gaps, optional module skips.';
