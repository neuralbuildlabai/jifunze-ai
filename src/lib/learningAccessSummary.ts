import type { SupabaseClient } from '@supabase/supabase-js'

export type LearningAccessSummary = {
  effectiveTier: string | null
  subscription: Record<string, unknown> | null
  oneTimeModuleKeys: string[]
  allLibraryActive: boolean
  entitledModuleKeys: string[]
  /**
   * When true, the client could not load Stripe-backed entitlements from `my_learning_access_summary`
   * (RPC error, probe/auth mismatch, or bad payload). Treat as “no paid modules confirmed”; public and
   * tier-based fallbacks still apply — see {@link evaluateLessonReadAccess}.
   */
  entitlementsDegraded?: boolean
}

/** Safe default when `my_learning_access_summary` is unavailable (no paid entitlements assumed). */
export function createDegradedLearningAccessSummary(): LearningAccessSummary {
  return {
    effectiveTier: 'member',
    subscription: null,
    oneTimeModuleKeys: [],
    allLibraryActive: false,
    entitledModuleKeys: [],
    entitlementsDegraded: true,
  }
}

function summarizeRpcFailure(err: { message?: string; code?: string; details?: string; hint?: string } | null): Record<string, unknown> {
  if (!err || typeof err !== 'object') return {}
  return {
    code: typeof err.code === 'string' ? err.code : null,
    // Keep logs short; full messages can contain internal Postgres/RLS hints.
    message: typeof err.message === 'string' ? err.message.slice(0, 200) : null,
    hint: typeof err.hint === 'string' ? err.hint.slice(0, 120) : null,
  }
}

export async function fetchLearningAccessSummary(
  supabase: SupabaseClient,
  tenantId: string | null = null,
): Promise<{ summary: LearningAccessSummary; error: string | null }> {
  try {
    const { data, error } = await supabase.rpc('my_learning_access_summary', { p_tenant_id: tenantId })
    if (error) {
      console.warn(
        '[JifunzeAI] my_learning_access_summary failed; using degraded entitlements (free catalog unaffected). If you see pass_pre_postgres_probe, check Supabase auth/RPC context for this function.',
        summarizeRpcFailure(error),
      )
      return { summary: createDegradedLearningAccessSummary(), error: null }
    }
    if (!data || typeof data !== 'object') {
      console.warn('[JifunzeAI] my_learning_access_summary returned unexpected payload; using degraded entitlements.')
      return { summary: createDegradedLearningAccessSummary(), error: null }
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
      entitlementsDegraded: false,
    }
    return { summary, error: null }
  } catch (e) {
    console.warn('[JifunzeAI] my_learning_access_summary threw; using degraded entitlements.', {
      name: e instanceof Error ? e.name : typeof e,
    })
    return { summary: createDegradedLearningAccessSummary(), error: null }
  }
}
