import type { AccessTier } from '../access/appAccess'
import { isAtLeastTier } from '../access/appAccess'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import type { LearningAccessSummary } from '../lib/learningAccessSummary'
import type { LearningModuleKey } from '../subscription/pricingSkuRegistry'
import type { ExtendedPublicLibraryKey } from '../data/learning/extendedPublicLibraryConfigs'

export type LessonReadDecision =
  | { kind: 'allow' }
  | { kind: 'loading' }
  | { kind: 'deny'; reason: 'anon' | 'signed_in_required' | 'premium' }

export function extendedLibraryModuleKey(key: ExtendedPublicLibraryKey): LearningModuleKey | null {
  if (key === 'cybersecurity') return 'cybersecurity'
  if (key === 'cloud_devops') return 'cloud_devops'
  return null
}

export function extendedPremiumRequiresAllLibrary(key: ExtendedPublicLibraryKey): boolean {
  return extendedLibraryModuleKey(key) == null
}

function premiumEntitled(summary: LearningAccessSummary | null, moduleKey: LearningModuleKey | null, extendedKey?: ExtendedPublicLibraryKey | null): boolean {
  if (!summary) return false
  if (summary.allLibraryActive) return true
  const entitled = summary.entitledModuleKeys
  if (moduleKey && entitled.includes(moduleKey)) return true
  if (extendedKey) {
    const mapped = extendedLibraryModuleKey(extendedKey)
    if (mapped && entitled.includes(mapped)) return true
    if (!mapped && summary.allLibraryActive) return true
  }
  return false
}

/**
 * Flagship / extended lesson access decisions. Server-side authorization must still be enforced for any API-backed assets.
 *
 * - `premium` lessons use Stripe-backed `my_learning_access_summary` when Supabase is configured and the RPC succeeds.
 * - When verification is unavailable, the legacy Pro+ tier heuristic applies (development / degraded environments).
 */
export function evaluateLessonReadAccess(args: {
  lessonAccess: 'public' | 'signed_in' | 'premium'
  userPresent: boolean
  tier: AccessTier
  moduleKey: LearningModuleKey | null
  extendedLibraryKey?: ExtendedPublicLibraryKey | null
  summary: LearningAccessSummary | null
  summaryLoading: boolean
  summaryError: string | null
}): LessonReadDecision {
  const { lessonAccess, userPresent, tier, moduleKey, extendedLibraryKey, summary, summaryLoading, summaryError } = args

  if (lessonAccess === 'public') return { kind: 'allow' }
  if (lessonAccess === 'signed_in') {
    return userPresent ? { kind: 'allow' } : { kind: 'deny', reason: 'signed_in_required' }
  }

  if (!userPresent) return { kind: 'deny', reason: 'anon' }

  const billingCapable = isSupabaseConfigured()
  if (billingCapable && summaryLoading) {
    return { kind: 'loading' }
  }

  const strictReady = billingCapable && !summaryLoading && !summaryError

  // Degraded summaries intentionally skip strict Stripe-backed denial so tier / public fallbacks still work.
  if (strictReady && summary && !summary.entitlementsDegraded) {
    return premiumEntitled(summary, moduleKey, extendedLibraryKey) ? { kind: 'allow' } : { kind: 'deny', reason: 'premium' }
  }

  // Degraded / local dev / RPC missing: fall back to historic Pro+ gating (not a billing guarantee).
  return isAtLeastTier(tier, 'pro') ? { kind: 'allow' } : { kind: 'deny', reason: 'premium' }
}
