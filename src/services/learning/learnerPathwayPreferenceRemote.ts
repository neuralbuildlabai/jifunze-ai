/**
 * Supabase persistence for the learner's primary employable pathway preference.
 */

import type { SupabaseClient } from '@supabase/supabase-js'

export type LearnerPathwayPreferenceRow = {
  id: string
  user_id: string
  pathway_slug: string
  created_at: string
  updated_at: string
}

export async function fetchLearnerPathwayPreference(
  supabase: SupabaseClient,
  userId: string,
): Promise<LearnerPathwayPreferenceRow | null> {
  const { data, error } = await supabase
    .from('learner_pathway_preferences')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) {
    console.error('[pathway preference] fetch failed', error.message)
    throw error
  }
  return data as LearnerPathwayPreferenceRow | null
}

export async function upsertLearnerPathwayPreference(
  supabase: SupabaseClient,
  userId: string,
  pathwaySlug: string,
): Promise<void> {
  const { error } = await supabase.from('learner_pathway_preferences').upsert(
    { user_id: userId, pathway_slug: pathwaySlug },
    { onConflict: 'user_id' },
  )
  if (error) {
    console.error('[pathway preference] upsert failed', error.message)
    throw error
  }
}

export async function deleteLearnerPathwayPreference(supabase: SupabaseClient, userId: string): Promise<void> {
  const { error } = await supabase.from('learner_pathway_preferences').delete().eq('user_id', userId)
  if (error) {
    console.error('[pathway preference] delete failed', error.message)
    throw error
  }
}
