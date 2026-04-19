import { createContext } from 'react'
import type { AccessTier } from './appAccess'

export type AccessTierContextValue = {
  tier: AccessTier
  /** True until the first successful RPC (or resolved fallback) after sign-in + workspace ready. */
  tierLoading: boolean
  refreshAccessTier: () => Promise<void>
}

export const AccessTierContext = createContext<AccessTierContextValue | null>(null)
