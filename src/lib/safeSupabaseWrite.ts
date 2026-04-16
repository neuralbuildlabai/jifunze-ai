import type { SupabaseClient } from '@supabase/supabase-js'

type MutableRefLike<T> = { current: T }

let sessionCommitNonceRef: MutableRefLike<number> | null = null
let bootstrapEpochRef: MutableRefLike<number> | null = null

/**
 * Wires auth invalidation refs from AuthProvider so safeSupabaseWrite can skip work
 * after sign-out or superseded bootstrap without noisy errors.
 */
export function registerAuthWriteGuards(refs: {
  sessionCommitNonceRef: MutableRefLike<number>
  bootstrapEpochRef: MutableRefLike<number>
}): void {
  sessionCommitNonceRef = refs.sessionCommitNonceRef
  bootstrapEpochRef = refs.bootstrapEpochRef
}

/** Test isolation only. */
export function resetAuthWriteGuardsForTests(): void {
  sessionCommitNonceRef = null
  bootstrapEpochRef = null
}

/**
 * Runs a Supabase write only when:
 * - a valid session exists
 * - auth guards have not changed (no logout / no superseded bootstrap)
 *
 * Returns `undefined` when skipped — no throw, no console noise.
 */
export async function safeSupabaseWrite<T>(
  supabase: SupabaseClient,
  fn: () => Promise<T>,
): Promise<T | undefined> {
  const nonce0 = sessionCommitNonceRef?.current
  const epoch0 = bootstrapEpochRef?.current

  // Initial session check
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return undefined
  if (sessionCommitNonceRef && nonce0 !== sessionCommitNonceRef.current) return undefined
  if (bootstrapEpochRef && epoch0 !== bootstrapEpochRef.current) return undefined

  // Final just-in-time check before executing write (closes race condition)
  const {
    data: { session: sessionNow },
  } = await supabase.auth.getSession()

  if (!sessionNow) return undefined
  if (sessionCommitNonceRef && nonce0 !== sessionCommitNonceRef.current) return undefined
  if (bootstrapEpochRef && epoch0 !== bootstrapEpochRef.current) return undefined

  return fn()
}
