import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { canLearnerSelectPathwayAsPrimary, getPathwayBySlug } from '../data/learning/employablePathwaysCatalog'
import type { EmployablePathway } from '../data/learning/employablePathwaysTypes'
import {
  deleteLearnerPathwayPreference,
  fetchLearnerPathwayPreference,
  upsertLearnerPathwayPreference,
} from '../services/learning/learnerPathwayPreferenceRemote'

const LOCAL_MIRROR_KEY = 'jf_primary_pathway_slug_mirror_v1'

function readLocalMirror(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(LOCAL_MIRROR_KEY)?.trim()
    return v || null
  } catch {
    return null
  }
}

function writeLocalMirror(slug: string | null) {
  if (typeof window === 'undefined') return
  try {
    if (slug) window.localStorage.setItem(LOCAL_MIRROR_KEY, slug)
    else window.localStorage.removeItem(LOCAL_MIRROR_KEY)
  } catch {
    /* ignore */
  }
}

function isValidSelectableSlug(slug: string | null | undefined): slug is string {
  if (!slug) return false
  return canLearnerSelectPathwayAsPrimary(getPathwayBySlug(slug))
}

/**
 * Signed-in primary pathway preference (Supabase). Optional local mirror when the network request
 * fails so the UI can still hint; anonymous users always get null selection (no server writes).
 */
export function useSelectedPathway() {
  const { user, supabase } = useAuth()
  const [serverSlug, setServerSlug] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const configured = Boolean(user && supabase && isSupabaseConfigured())

  useEffect(() => {
    if (!configured || !user || !supabase) {
      setServerSlug(null)
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const row = await fetchLearnerPathwayPreference(supabase, user.id)
        if (cancelled) return
        let slug = row?.pathway_slug?.trim() || null
        if (slug && !isValidSelectableSlug(slug)) {
          try {
            await deleteLearnerPathwayPreference(supabase, user.id)
          } catch {
            /* ignore cleanup failure */
          }
          slug = null
          writeLocalMirror(null)
        } else if (slug) {
          writeLocalMirror(slug)
        } else {
          writeLocalMirror(null)
        }
        setServerSlug(slug)
      } catch {
        if (cancelled) return
        const mirror = readLocalMirror()
        setServerSlug(isValidSelectableSlug(mirror) ? mirror : null)
        setError('Could not load pathway preference. Using offline hint if available.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [configured, user, supabase])

  const selectedPathwaySlug = useMemo(() => {
    if (!configured) return null
    return serverSlug
  }, [configured, serverSlug])

  const selectedPathway: EmployablePathway | null = useMemo(() => {
    const p = getPathwayBySlug(selectedPathwaySlug ?? undefined)
    return p && canLearnerSelectPathwayAsPrimary(p) ? p : null
  }, [selectedPathwaySlug])

  const setPrimaryPathway = useCallback(
    async (pathwaySlug: string) => {
      setError(null)
      const pathway = getPathwayBySlug(pathwaySlug)
      if (!canLearnerSelectPathwayAsPrimary(pathway)) {
        setError('Only active pathways can be your primary pathway.')
        return
      }
      if (!user || !supabase || !configured) {
        setError('Sign in to save your pathway choice.')
        return
      }
      const previous = serverSlug
      setServerSlug(pathwaySlug)
      setSaving(true)
      try {
        await upsertLearnerPathwayPreference(supabase, user.id, pathwaySlug)
        writeLocalMirror(pathwaySlug)
      } catch (e) {
        setServerSlug(previous)
        setError(e instanceof Error ? e.message : 'Could not save pathway preference.')
        throw e
      } finally {
        setSaving(false)
      }
    },
    [configured, serverSlug, supabase, user],
  )

  const clearPrimaryPathway = useCallback(async () => {
    setError(null)
    if (!user || !supabase || !configured) {
      writeLocalMirror(null)
      setServerSlug(null)
      return
    }
    const previous = serverSlug
    setServerSlug(null)
    setSaving(true)
    try {
      await deleteLearnerPathwayPreference(supabase, user.id)
      writeLocalMirror(null)
    } catch (e) {
      setServerSlug(previous)
      setError(e instanceof Error ? e.message : 'Could not clear pathway preference.')
      throw e
    } finally {
      setSaving(false)
    }
  }, [configured, serverSlug, supabase, user])

  return {
    selectedPathwaySlug,
    selectedPathway,
    loading,
    saving,
    error,
    setPrimaryPathway,
    clearPrimaryPathway,
    /** True when signed in with Supabase env — preference can be stored server-side. */
    persistenceEnabled: configured,
  }
}
