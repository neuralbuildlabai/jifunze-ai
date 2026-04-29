-- AI Essentials: persist Module 16 capstone rubric self-grade for cross-device progress and certificate readiness.

alter table public.flagship_course_progress
  add column if not exists ae_capstone_rubric_self_grade jsonb;

alter table public.flagship_course_progress
  drop constraint if exists flagship_course_progress_ae_capstone_rubric_self_grade_object_check;

alter table public.flagship_course_progress
  add constraint flagship_course_progress_ae_capstone_rubric_self_grade_object_check
  check (
    ae_capstone_rubric_self_grade is null
    or jsonb_typeof(ae_capstone_rubric_self_grade) = 'object'
  );

comment on column public.flagship_course_progress.ae_capstone_rubric_self_grade is
  'AI Essentials only: JSON object with optional ratings map and updatedAt (ISO), or legacy flat criterion keys.';
