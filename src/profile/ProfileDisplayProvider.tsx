import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { fetchProfileDisplayRow } from './fetchProfileDisplayRow'
import type { ProfileDisplayRow } from './profileDisplayTypes'
import { ProfileDisplayContext, type ProfileDisplayContextValue } from './profileDisplayContext'

export function ProfileDisplayProvider({ children }: { children: ReactNode }) {
  const { user, supabase } = useAuth()
  const [profileRow, setProfileRow] = useState<ProfileDisplayRow | null>(null)
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)

  const refreshProfileDisplay = useCallback(async () => {
    if (!user?.id || !supabase || !isSupabaseConfigured()) {
      setProfileRow(null)
      setProfileError(null)
      setProfileLoading(false)
      return
    }
    setProfileLoading(true)
    setProfileError(null)
    const { row, error } = await fetchProfileDisplayRow(supabase, user.id)
    setProfileRow(row)
    setProfileError(error)
    setProfileLoading(false)
  }, [user, supabase])

  useEffect(() => {
    startTransition(() => {
      void refreshProfileDisplay()
    })
  }, [refreshProfileDisplay])

  const value = useMemo<ProfileDisplayContextValue>(
    () => ({ profileRow, profileLoading, profileError, refreshProfileDisplay }),
    [profileRow, profileLoading, profileError, refreshProfileDisplay],
  )

  return <ProfileDisplayContext.Provider value={value}>{children}</ProfileDisplayContext.Provider>
}
