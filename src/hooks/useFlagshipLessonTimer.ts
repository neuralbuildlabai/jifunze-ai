import { useCallback, useEffect, useRef, useState } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { FlagshipSession } from '../data/learning/flagshipCourseSessions'
import { fetchLearnerLessonTime, upsertLearnerLessonTimeProgress } from '../services/learnerState/learnerLessonTimeRemote'

const INACTIVITY_MS = 60_000
const SYNC_MS = 5000

export function minimumActiveSecondsForSession(session: FlagshipSession): number {
  if (session.type === 'capstone_prep') return 180
  if (session.type === 'practice') return 120
  if (session.type === 'lesson') {
    if (session.durationMinutes >= 34) return 180
    if (session.durationMinutes >= 30) return 120
    return 60
  }
  return 60
}

type Opts = {
  enabled: boolean
  courseSlug: string
  session: FlagshipSession
  userId: string | undefined
  supabase: SupabaseClient | null | undefined
}

/**
 * Active seconds accrue only while the tab is visible and the learner was recently active
 * (pointer, key, or scroll within {@link INACTIVITY_MS}).
 */
export function useFlagshipLessonTimer(opts: Opts): { activeSeconds: number; timerSatisfied: boolean; minimumSeconds: number } {
  const { enabled, courseSlug, session, userId, supabase } = opts
  const minimumSeconds = minimumActiveSecondsForSession(session)
  const [activeSeconds, setActiveSeconds] = useState(0)
  const lastActivityAt = useRef(0)

  const bumpActivity = useCallback(() => {
    lastActivityAt.current = typeof performance !== 'undefined' ? performance.now() : 0
  }, [])

  useEffect(() => {
    if (!enabled || !userId) return
    let cancelled = false
    void (async () => {
      if (!supabase) return
      try {
        const row = await fetchLearnerLessonTime(supabase, userId, courseSlug, session.id)
        if (cancelled || !row) return
        setActiveSeconds(row.active_seconds)
      } catch {
        /* ignore */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [enabled, userId, supabase, courseSlug, session.id])

  useEffect(() => {
    if (!enabled || !userId) return
    lastActivityAt.current = typeof performance !== 'undefined' ? performance.now() : 0

    const onAct = () => bumpActivity()
    window.addEventListener('keydown', onAct)
    window.addEventListener('pointerdown', onAct)
    window.addEventListener('scroll', onAct, { passive: true })

    const tick = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      const now = typeof performance !== 'undefined' ? performance.now() : 0
      if (now - lastActivityAt.current > INACTIVITY_MS) return
      setActiveSeconds((s) => s + 1)
    }, 1000)

    const onVis = () => {
      if (document.visibilityState === 'visible') bumpActivity()
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      window.clearInterval(tick)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('keydown', onAct)
      window.removeEventListener('pointerdown', onAct)
      window.removeEventListener('scroll', onAct)
    }
  }, [enabled, userId, bumpActivity])

  useEffect(() => {
    if (!enabled || !userId || !supabase) return
    const id = window.setInterval(() => {
      void upsertLearnerLessonTimeProgress({
        supabase,
        learnerId: userId,
        courseSlug,
        moduleId: session.moduleId,
        lessonId: session.id,
        activeSeconds,
        minimumRequiredSeconds: minimumSeconds,
      }).catch(() => {})
    }, SYNC_MS)
    return () => window.clearInterval(id)
  }, [enabled, userId, supabase, courseSlug, session.moduleId, session.id, activeSeconds, minimumSeconds])

  const timerSatisfied = activeSeconds >= minimumSeconds
  return { activeSeconds, timerSatisfied, minimumSeconds }
}
