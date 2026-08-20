import { useCallback, useEffect, useState } from 'react'
import { loadSocialOpsSnapshot, type SocialOpsSnapshot } from '../../services/socialOps/socialOpsData'

export type SocialOpsState = {
  snapshot: SocialOpsSnapshot | null
  loading: boolean
  error: string | null
  reload: () => void
}

/**
 * Loads the social-ops snapshot once per `nonce`.
 *
 * `loading` starts true and is only ever set from an async callback or from the `reload` event
 * handler, never synchronously inside the effect body — that would cascade renders.
 */
export function useSocialOpsSnapshot(): SocialOpsState {
  const [snapshot, setSnapshot] = useState<SocialOpsSnapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [nonce, setNonce] = useState(0)

  const reload = useCallback(() => {
    setLoading(true)
    setError(null)
    setNonce((n) => n + 1)
  }, [])

  useEffect(() => {
    let cancelled = false
    loadSocialOpsSnapshot()
      .then((result) => {
        if (!cancelled) setSnapshot(result)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load social operations data.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [nonce])

  return { snapshot, loading, error, reload }
}
