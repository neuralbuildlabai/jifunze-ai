-- Checkpoint quizzes, questions, attempts + transactional plan creation from JSON seed.

-- ---------------------------------------------------------------------------
-- training_quizzes
-- ---------------------------------------------------------------------------
create table if not exists public.training_quizzes (
  id uuid primary key default gen_random_uuid(),
  training_plan_id uuid not null references public.training_plans (id) on delete cascade,
  training_module_id uuid references public.training_modules (id) on delete cascade,
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  title text not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists training_quizzes_plan_idx on public.training_quizzes (training_plan_id);
create index if not exists training_quizzes_module_idx on public.training_quizzes (training_module_id);
create index if not exists training_quizzes_workspace_idx on public.training_quizzes (workspace_id);

-- ---------------------------------------------------------------------------
-- training_quiz_questions
-- ---------------------------------------------------------------------------
create table if not exists public.training_quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.training_quizzes (id) on delete cascade,
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  prompt text not null,
  question_type text not null default 'mcq',
  options_json jsonb not null default '[]'::jsonb,
  correct_answer text not null,
  sort_order int not null default 0,
  constraint training_quiz_questions_type_check
    check (question_type in ('mcq'))
);

create index if not exists training_quiz_questions_quiz_idx on public.training_quiz_questions (quiz_id);
create index if not exists training_quiz_questions_workspace_idx on public.training_quiz_questions (workspace_id);

-- ---------------------------------------------------------------------------
-- quiz_attempts
-- ---------------------------------------------------------------------------
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.training_quizzes (id) on delete cascade,
  training_plan_id uuid not null references public.training_plans (id) on delete cascade,
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  score int not null default 0,
  total_questions int not null default 0,
  status text not null default 'in_progress',
  answers_json jsonb,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint quiz_attempts_status_check
    check (status in ('in_progress', 'completed')),
  constraint quiz_attempts_unique_per_user unique (workspace_id, quiz_id, user_id)
);

create index if not exists quiz_attempts_user_workspace_idx on public.quiz_attempts (user_id, workspace_id);
create index if not exists quiz_attempts_plan_idx on public.quiz_attempts (training_plan_id);

drop trigger if exists quiz_attempts_touch_updated_at on public.quiz_attempts;
create trigger quiz_attempts_touch_updated_at
  before update on public.quiz_attempts
  for each row execute function public.training_touch_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.training_quizzes enable row level security;
alter table public.training_quiz_questions enable row level security;
alter table public.quiz_attempts enable row level security;

drop policy if exists training_quizzes_tenant_all on public.training_quizzes;
create policy training_quizzes_tenant_all on public.training_quizzes
  for all using (workspace_id in (select public.user_tenant_ids()))
  with check (workspace_id in (select public.user_tenant_ids()));

drop policy if exists training_quiz_questions_tenant_all on public.training_quiz_questions;
create policy training_quiz_questions_tenant_all on public.training_quiz_questions
  for all using (workspace_id in (select public.user_tenant_ids()))
  with check (workspace_id in (select public.user_tenant_ids()));

drop policy if exists quiz_attempts_select_own on public.quiz_attempts;
drop policy if exists quiz_attempts_insert_own on public.quiz_attempts;
drop policy if exists quiz_attempts_update_own on public.quiz_attempts;
drop policy if exists quiz_attempts_delete_own on public.quiz_attempts;

create policy quiz_attempts_select_own on public.quiz_attempts
  for select using (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  );

create policy quiz_attempts_insert_own on public.quiz_attempts
  for insert with check (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  );

create policy quiz_attempts_update_own on public.quiz_attempts
  for update using (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  )
  with check (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  );

create policy quiz_attempts_delete_own on public.quiz_attempts
  for delete using (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  );

grant select, insert, update, delete on table public.training_quizzes to authenticated;
grant select, insert, update, delete on table public.training_quiz_questions to authenticated;
grant select, insert, update, delete on table public.quiz_attempts to authenticated;

comment on table public.training_quizzes is 'Checkpoint quizzes (e.g. end of module).';
comment on table public.training_quiz_questions is 'MCQ questions; options_json is a JSON array of option strings; correct_answer is 0-based index as text.';
comment on table public.quiz_attempts is 'Per-user quiz attempts; one row per (workspace, quiz, user) updated on submit.';

-- ---------------------------------------------------------------------------
-- Transactional plan + modules + lessons + quizzes + questions
-- p_seed jsonb shape (from app):
-- {
--   "title","topic","objective","skill_level","duration_label","status",
--   "modules": [
--     {
--       "title","description","sort_order",
--       "lessons":[{"title","content","objectives","takeaway","sort_order"}],
--       "quiz": {
--         "title","description","sort_order",
--         "questions":[{"prompt","question_type","options_json":[...],"correct_answer":"0","sort_order"}]
--       }
--     }
--   ]
-- }
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
  st text;
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
    workspace_id, created_by, title, topic, objective, skill_level, duration_label, status
  )
  values (
    p_workspace_id,
    uid,
    trim(p_seed->>'title'),
    nullif(trim(p_seed->>'topic'), ''),
    nullif(trim(p_seed->>'objective'), ''),
    nullif(trim(p_seed->>'skill_level'), ''),
    nullif(trim(p_seed->>'duration_label'), ''),
    st
  )
  returning id into v_plan_id;

  for mod in select * from jsonb_array_elements(coalesce(p_seed->'modules', '[]'::jsonb))
  loop
    insert into public.training_modules (
      training_plan_id, workspace_id, title, description, sort_order
    )
    values (
      v_plan_id,
      p_workspace_id,
      trim(mod->>'title'),
      nullif(trim(mod->>'description'), ''),
      coalesce((mod->>'sort_order')::int, 0)
    )
    returning id into v_module_id;

    for les in select * from jsonb_array_elements(coalesce(mod->'lessons', '[]'::jsonb))
    loop
      insert into public.training_lessons (
        module_id, training_plan_id, workspace_id, title, content, objectives, takeaway, sort_order
      )
      values (
        v_module_id,
        v_plan_id,
        p_workspace_id,
        trim(les->>'title'),
        coalesce(les->>'content', ''),
        nullif(trim(les->>'objectives'), ''),
        nullif(trim(les->>'takeaway'), ''),
        coalesce((les->>'sort_order')::int, 0)
      );
    end loop;

    quiz := mod->'quiz';
    if quiz is not null and jsonb_typeof(quiz) = 'object' then
      insert into public.training_quizzes (
        training_plan_id, training_module_id, workspace_id, title, description, sort_order
      )
      values (
        v_plan_id,
        v_module_id,
        p_workspace_id,
        trim(quiz->>'title'),
        nullif(trim(quiz->>'description'), ''),
        coalesce((quiz->>'sort_order')::int, 0)
      )
      returning id into v_quiz_id;

      for ques in select * from jsonb_array_elements(coalesce(quiz->'questions', '[]'::jsonb))
      loop
        insert into public.training_quiz_questions (
          quiz_id, workspace_id, prompt, question_type, options_json, correct_answer, sort_order
        )
        values (
          v_quiz_id,
          p_workspace_id,
          trim(ques->>'prompt'),
          coalesce(nullif(trim(ques->>'question_type'), ''), 'mcq'),
          coalesce(ques->'options_json', '[]'::jsonb),
          trim(ques->>'correct_answer'),
          coalesce((ques->>'sort_order')::int, 0)
        );
      end loop;
    end if;
  end loop;

  return v_plan_id;
end;
$$;

comment on function public.create_training_plan_from_seed(uuid, jsonb) is
  'Atomically creates training plan, modules, lessons, module quizzes, and MCQ questions in one transaction.';

grant execute on function public.create_training_plan_from_seed(uuid, jsonb) to authenticated;
