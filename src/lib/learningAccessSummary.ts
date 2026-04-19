import type { SupabaseClient } from '@supabase/supabase-js'

export type LearningAccessSummary = {
  effectiveTier: string | null
  subscription: Record<string, unknown> | null
  oneTimeModuleKeys: string[]
  allLibraryActive: boolean
  entitledModuleKeys: string[]
}

export async function fetchLearningAccessSummary(
  supabase: SupabaseClient,
  tenantId: string | null = null,
): Promise<{ summary: LearningAccessSummary | null; error: string | null }> {
  const { data, error } = await supabase.rpc('my_learning_access_summary', { p_tenant_id: tenantId })
  if (error) {
    return { summary: null, error: error.message }
  }
  if (!data || typeof data !== 'object') {
    return { summary: null, error: 'Unexpected access summary payload' }
  }
  const payload = data as Record<string, unknown>
  const summary: LearningAccessSummary = {
    effectiveTier: typeof payload.effectiveTier === 'string' ? payload.effectiveTier : null,
    subscription: payload.subscription && typeof payload.subscription === 'object' ? (payload.subscription as Record<string, unknown>) : null,
    oneTimeModuleKeys: Array.isArray(payload.oneTimeModuleKeys)
      ? (payload.oneTimeModuleKeys.filter((x) => typeof x === 'string') as string[])
      : [],
    allLibraryActive: payload.allLibraryActive === true,
    entitledModuleKeys: Array.isArray(payload.entitledModuleKeys)
      ? (payload.entitledModuleKeys.filter((x) => typeof x === 'string') as string[])
      : [],
  }
  return { summary, error: null }
}
