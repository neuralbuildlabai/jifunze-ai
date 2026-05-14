import { createContext } from 'react'
import type { ProfileDisplayRow } from './profileDisplayTypes'

export type ProfileDisplayContextValue = {
  profileRow: ProfileDisplayRow | null
  profileLoading: boolean
  profileError: string | null
  refreshProfileDisplay: () => Promise<void>
}

export const ProfileDisplayContext = createContext<ProfileDisplayContextValue | null>(null)
