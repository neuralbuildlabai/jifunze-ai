import type { SupabaseClient } from '@supabase/supabase-js'
import type { ProfileDisplayRow } from './profileDisplayTypes'

export async function fetchProfileDisplayRow(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ row: ProfileDisplayRow | null; error: string | null }> {
  const { data, error } = await supabase
    .from('profiles')
    .select('first_name,last_name,display_name')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    return { row: null, error: error.message }
  }
  if (!data) return { row: null, error: null }
  return {
    row: {
      first_name: typeof data.first_name === 'string' ? data.first_name : null,
      last_name: typeof data.last_name === 'string' ? data.last_name : null,
      display_name: typeof data.display_name === 'string' ? data.display_name : null,
    },
    error: null,
  }
}
