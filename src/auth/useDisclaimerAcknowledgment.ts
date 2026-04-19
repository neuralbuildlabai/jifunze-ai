import { useCallback, useMemo, useState } from 'react'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import {
  isDisclaimerAcknowledgmentCurrent,
  writeDisclaimerAcknowledgment,
} from '../training/disclaimerAcknowledgment'
import { useAuth } from './AuthContext'

/**
 * One-time (per browser + user + {@link DISCLAIMER_ACK_VERSION}) acknowledgment before full app use.
 */
export function useDisclaimerAcknowledgment(): {
  mustAcknowledge: boolean
  acknowledge: () => void
} {
  const { user } = useAuth()
  const uid = user?.id
  const [tick, setTick] = useState(0)

  const mustAcknowledge = useMemo(() => {
    void tick
    if (!isSupabaseConfigured() || !uid) return false
    return !isDisclaimerAcknowledgmentCurrent(uid)
  }, [tick, uid])

  const acknowledge = useCallback(() => {
    if (!uid) return
    writeDisclaimerAcknowledgment(uid)
    setTick((n) => n + 1)
  }, [uid])

  return { mustAcknowledge, acknowledge }
}
