-- Part 14: plan-level recap / mixed-review / exam-practice quizzes + broader quiz_kind vocabulary.

alter table public.training_quizzes
  drop constraint if exists training_quizzes_quiz_kind_check;

alter table public.training_quizzes
  add constraint training_quizzes_quiz_kind_check
  check (
    quiz_kind in (
      'module_checkpoint',
      'diagnostic',
      'recap_checkpoint',
      'mixed_review',
      'exam_practice'
    )
  );

comment on column public.training_quizzes.quiz_kind is
  'module_checkpoint = module quiz; diagnostic/recap_checkpoint/mixed_review/exam_practice may omit training_module_id (plan-level).';

-- ---------------------------------------------------------------------------
-- create_training_plan_from_seed: optional plan_supplemental_quizzes[]
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
  sup jsonb;
  v_module_id uuid;
  v_quiz_id uuid;
  v_lesson_id uuid;
  st text;
  lesson_ids uuid[] := '{}'::uuid[];
  v_src_idx int;
  v_quiz_kind text;
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

  if p_seed ? 'plan_supplemental_quizzes' and jsonb_typeof(p_seed->'plan_supplemental_quizzes') = 'array' then
    for sup in select * from jsonb_array_elements(coalesce(p_seed->'plan_supplemental_quizzes', '[]'::jsonb))
    loop
      quiz := sup;
      v_quiz_kind := trim(quiz->>'quiz_kind');
      if v_quiz_kind is null or v_quiz_kind = '' then
        continue;
      end if;
      insert into public.training_quizzes (
        training_plan_id, training_module_id, workspace_id, title, description, sort_order, quiz_kind
      )
      values (
        v_plan_id,
        null,
        p_workspace_id,
        trim(quiz->>'title'),
        nullif(trim(quiz->>'description'), ''),
        coalesce((quiz->>'sort_order')::int, 100),
        v_quiz_kind
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
        lesson_summary, practical_example, action_exercise, reflection_prompt, mistakes_to_avoid, estimated_minutes,
        practice_bundle
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
        end,
        case
          when les ? 'practice_bundle' and jsonb_typeof(les->'practice_bundle') = 'object'
          then les->'practice_bundle'
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
  'Creates training plan; supports diagnostic, plan_supplemental_quizzes (recap/mixed/exam), module checkpoints, practice_bundle.';
