import type { TeachingSignal } from '../../data/teaching/teachingTypes'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { getSupabaseBrowserClient } from '../../lib/supabaseClient'
import { safeSupabaseWrite } from '../../lib/safeSupabaseWrite'

/**
 * Best-effort mirror of {@link TeachingSignal} to Supabase for signed-in learners.
 * Skips silently when offline, logged out, misconfigured, or when RLS denies insert.
 */
export async function persistTeachingLearningEvent(signal: TeachingSignal): Promise<boolean> {
  if (!isSupabaseConfigured()) return false
  if (typeof window === 'undefined') return false

  let supabase: ReturnType<typeof getSupabaseBrowserClient>
  try {
    supabase = getSupabaseBrowserClient()
  } catch {
    return false
  }

  const payload = {
    ...signal.payload,
    client_signal_id: signal.id,
    created_at_client: signal.createdAtIso,
  }

  const result = await safeSupabaseWrite(supabase, async () => {
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser()
    if (userErr || !user?.id) return false

    const { error } = await supabase.from('teaching_learning_events').insert({
      user_id: user.id,
      kind: signal.kind,
      payload,
      client_signal_id: signal.id,
    })
    if (error) throw error
    return true
  })

  return Boolean(result)
}
