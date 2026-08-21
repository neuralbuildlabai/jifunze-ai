/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useAuth } from '../auth/AuthContext'
import { fetchLearningAccessSummary, type LearningAccessSummary } from '../lib/learningAccessSummary'

export type LearningAccessContextValue = {
  summary: LearningAccessSummary | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

const LearningAccessContext = createContext<LearningAccessContextValue | null>(null)

export function LearningAccessProvider({ children }: { children: ReactNode }) {
  const { supabase, user } = useAuth()
  const [summary, setSummary] = useState<LearningAccessSummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!supabase || !user) {
      setSummary(null)
      setError(null)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    const { summary: next, error: err } = await fetchLearningAccessSummary(supabase)
    setSummary(next)
    setError(err)
    setLoading(false)
  }, [supabase, user])

  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      if (!supabase || !user) {
        setSummary(null)
        setError(null)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      const { summary: next, error: err } = await fetchLearningAccessSummary(supabase)

      if (cancelled) return

      setSummary(next)
      setError(err)
      setLoading(false)
    }

    void bootstrap()

    return () => {
      cancelled = true
    }
  }, [supabase, user])

  const value = useMemo<LearningAccessContextValue>(
    () => ({
      summary,
      loading,
      error,
      refresh,
    }),
    [summary, loading, error, refresh],
  )

  return <LearningAccessContext.Provider value={value}>{children}</LearningAccessContext.Provider>
}

export function useLearningAccess(): LearningAccessContextValue {
  const ctx = useContext(LearningAccessContext)
  if (!ctx) {
    throw new Error('useLearningAccess must be used within LearningAccessProvider')
  }
  return ctx
}
