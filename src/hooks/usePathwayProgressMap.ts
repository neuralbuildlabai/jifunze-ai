import type { SupabaseClient } from '@supabase/supabase-js'
import { useEffect, useMemo, useReducer, useState } from 'react'
import type { EmployablePathway } from '../data/learning/employablePathwaysTypes'
import { FLAGSHIP_PROGRESS_EVENT } from '../lib/flagshipCourseLocalProgress'
import type { FlagshipCourseProgressState } from '../lib/flagshipCourseProgressDerived'
import { buildMergedPathwayProgressMap } from '../lib/pathwayMergedProgressMap'
import { isFlagshipCoursePublished } from '../lib/pathwayProgressDerived'
import {
  fetchFlagshipProgressRowsForSlugs,
  flagshipProgressRowToState,
} from '../services/learnerState/flagshipCourseProgressRemote'

export type PathwayProgressSyncContext = {
  supabase: SupabaseClient
  userId: string
} | null

function sortedPublishedSlugs(pathway: EmployablePathway | null): string[] {
  if (!pathway) return []
  return [...pathway.includedCourseSlugs.filter((s) => isFlagshipCoursePublished(s))].sort()
}

function uniqueSortedSlugsFromList(slugs: string[]): string[] {
  return [...new Set(slugs.filter(Boolean))].sort()
}

/**
 * Remote flagship rows for the given course slugs (one `.in` query). Skips fetch when sync is null.
 */
export function useRemoteFlagshipProgressBySlugs(
  courseSlugs: string[],
  sync: PathwayProgressSyncContext,
): { bySlug: Partial<Record<string, FlagshipCourseProgressState>>; hydrated: boolean } {
  const slugsKey = useMemo(() => uniqueSortedSlugsFromList(courseSlugs).join('\0'), [courseSlugs])
  const [bySlug, setBySlug] = useState<Partial<Record<string, FlagshipCourseProgressState>>>({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (!sync?.supabase || !sync.userId) {
      setBySlug({})
      setHydrated(true)
      return
    }

    const unique = slugsKey ? slugsKey.split('\0').filter(Boolean) : []
    if (!unique.length) {
      setBySlug({})
      setHydrated(true)
      return
    }

    let cancelled = false
    setHydrated(false)

    ;(async () => {
      try {
        const rows = await fetchFlagshipProgressRowsForSlugs(sync.supabase, sync.userId, unique)
        if (cancelled) return
        const next: Partial<Record<string, FlagshipCourseProgressState>> = {}
        for (const row of rows) {
          next[row.course_slug] = flagshipProgressRowToState(row)
        }
        setBySlug(next)
      } catch (e) {
        if (!cancelled) {
          if (import.meta.env.DEV) {
            console.warn('[pathway progress] remote fetch failed; using local only', e)
          }
          setBySlug({})
        }
      } finally {
        if (!cancelled) setHydrated(true)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [slugsKey, sync?.supabase, sync?.userId])

  return { bySlug, hydrated }
}

/**
 * Per-course flagship progress for a pathway: local until remote hydrates (signed-in),
 * then merge(remote, local) + reconcile (same pattern as useFlagshipCourseProgress).
 */
export function usePathwayProgressMap(
  pathway: EmployablePathway | null,
  sync: PathwayProgressSyncContext = null,
): {
  progressBySlug: Record<string, FlagshipCourseProgressState>
  /** False briefly while fetching account progress for signed-in users. */
  remoteHydrated: boolean
} {
  const [tick, refresh] = useReducer((n: number) => n + 1, 0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const on = () => refresh()
    window.addEventListener(FLAGSHIP_PROGRESS_EVENT, on as EventListener)
    return () => window.removeEventListener(FLAGSHIP_PROGRESS_EVENT, on as EventListener)
  }, [])

  const publishedSlugs = useMemo(() => sortedPublishedSlugs(pathway), [pathway])
  const { bySlug, hydrated } = useRemoteFlagshipProgressBySlugs(publishedSlugs, sync)

  const applyRemote = Boolean(sync) && hydrated
  const remoteHydrated = !sync || hydrated

  const progressBySlug = useMemo(() => {
    if (!pathway) return {}
    void tick
    return buildMergedPathwayProgressMap(pathway, bySlug, applyRemote)
  }, [pathway, bySlug, applyRemote, tick])

  return { progressBySlug, remoteHydrated }
}
