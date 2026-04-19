-- Run in Supabase SQL Editor (or psql) against the SAME project as VITE_SUPABASE_URL.
-- Expect all rows to show 'ok'.

select 'training_plans' as name, case when to_regclass('public.training_plans') is not null then 'ok' else 'missing' end as status
union all
select 'training_modules', case when to_regclass('public.training_modules') is not null then 'ok' else 'missing' end
union all
select 'training_lessons', case when to_regclass('public.training_lessons') is not null then 'ok' else 'missing' end
union all
select 'lesson_progress', case when to_regclass('public.lesson_progress') is not null then 'ok' else 'missing' end
union all
select 'training_quizzes', case when to_regclass('public.training_quizzes') is not null then 'ok' else 'missing' end
union all
select 'training_quiz_questions', case when to_regclass('public.training_quiz_questions') is not null then 'ok' else 'missing' end
union all
select 'quiz_attempts', case when to_regclass('public.quiz_attempts') is not null then 'ok' else 'missing' end
union all
select 'training_assignments', case when to_regclass('public.training_assignments') is not null then 'ok' else 'missing' end
union all
select 'training_learner_intelligence_snapshots', case when to_regclass('public.training_learner_intelligence_snapshots') is not null then 'ok' else 'missing' end;

select case
  when exists (
    select 1
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'create_training_plan_from_seed'
  )
  then 'create_training_plan_from_seed: ok'
  else 'create_training_plan_from_seed: missing'
end as rpc_status;

select 'derived_content_assets' as name, case when to_regclass('public.derived_content_assets') is not null then 'ok' else 'missing' end as status
union all
select 'training_plan_knowledge_specs', case when to_regclass('public.training_plan_knowledge_specs') is not null then 'ok' else 'missing' end;

select conname as derived_assets_check_name,
  case when pg_get_constraintdef(c.oid) like '%team_recap_sheet%' then 'derived_content_assets check includes team_recap_sheet (aligned with latest app)'
  else 'derived_content_assets check may be outdated — compare src/knowledge/derivedContentAssetTypes.ts'
  end as derived_assets_alignment_hint
from pg_constraint c
join pg_class t on t.oid = c.conrelid
where t.relname = 'derived_content_assets' and c.contype = 'c' and c.conname = 'derived_content_assets_type_check';
