-- Exam-prep seriousness: optional assessment blueprint metadata per quiz (additive, backward compatible).

alter table public.training_quizzes
  add column if not exists assessment_blueprint_json jsonb;

comment on column public.training_quizzes.assessment_blueprint_json is
  'Optional AssessmentBlueprintV1 JSON: sections, timing hints, coverage domains — rehearsal metadata; not an external exam-body blueprint.';
