import type { SupabaseClient } from '@supabase/supabase-js'

export type LearnerLessonTimeRow = {
  id: string
  learner_id: string
  course_slug: string
  module_id: string | null
  lesson_id: string
  started_at: string | null
  last_active_at: string | null
  active_seconds: number
  minimum_required_seconds: number
  timer_satisfied: boolean
  completed: boolean
  created_at: string
  updated_at: string
}

export async function fetchLearnerLessonTime(
  supabase: SupabaseClient,
  learnerId: string,
  courseSlug: string,
  lessonId: string,
): Promise<LearnerLessonTimeRow | null> {
  const { data, error } = await supabase
    .from('learner_lesson_time')
    .select('*')
    .eq('learner_id', learnerId)
    .eq('course_slug', courseSlug)
    .eq('lesson_id', lessonId)
    .maybeSingle()

  if (error) throw error
  return data as LearnerLessonTimeRow | null
}

export async function upsertLearnerLessonTimeProgress(args: {
  supabase: SupabaseClient
  learnerId: string
  courseSlug: string
  moduleId: string | null
  lessonId: string
  activeSeconds: number
  minimumRequiredSeconds: number
}): Promise<void> {
  const { supabase, learnerId, courseSlug, moduleId, lessonId, activeSeconds, minimumRequiredSeconds } = args
  const timerSatisfied = activeSeconds >= minimumRequiredSeconds
  const { error } = await supabase.from('learner_lesson_time').upsert(
    {
      learner_id: learnerId,
      course_slug: courseSlug,
      module_id: moduleId,
      lesson_id: lessonId,
      started_at: new Date().toISOString(),
      last_active_at: new Date().toISOString(),
      active_seconds: activeSeconds,
      minimum_required_seconds: minimumRequiredSeconds,
      timer_satisfied: timerSatisfied,
    },
    { onConflict: 'learner_id,course_slug,lesson_id' },
  )
  if (error) throw error
}
