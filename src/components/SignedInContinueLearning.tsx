import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { SupabaseClient } from '@supabase/supabase-js'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { FLAGSHIP_PROGRESS_EVENT } from '../lib/flagshipCourseLocalProgress'
import {
  LEARNER_PROGRESS_HUB_EVENT,
  loadLearnerUnifiedActiveCourses,
  type LearnerUnifiedActiveCourse,
} from '../lib/learnerProgressHub'

export type SignedInContinueLearningItem = {
  slug: string
  title: string
  progressPercent: number
  nextLabel: string
  resumeHref: string
  resumeCta: string
  updatedAt: string
  guidanceHint?: string
}

function mapUnifiedToItem(c: LearnerUnifiedActiveCourse): SignedInContinueLearningItem {
  return {
    slug: c.slug,
    title: c.title,
    progressPercent: c.progressPercent,
    nextLabel: c.nextLabel ?? 'Continue',
    resumeHref: c.resumeHref,
    resumeCta: c.resumeCta,
    updatedAt: c.lastActivityAt ?? c.lastOpenedAt ?? new Date(0).toISOString(),
  }
}

export function SignedInContinueLearning(props: {
  supabase: SupabaseClient | null
  userId: string | undefined
  /** `warm` matches `/learn` and the signed-in learner shell; default preserves legacy dark workspace. */
  surface?: 'dark' | 'warm'
}) {
  const { supabase, userId, surface = 'dark' } = props
  const [items, setItems] = useState<SignedInContinueLearningItem[]>([])
  const [ready, setReady] = useState(false)

  const load = useCallback(async () => {
    if (!supabase || !userId || !isSupabaseConfigured()) {
      setItems([])
      setReady(true)
      return
    }

    try {
      const unified = await loadLearnerUnifiedActiveCourses(supabase, userId)
      const enriched = unified.slice(0, 8).map(mapUnifiedToItem)
      enriched.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
      setItems(enriched.slice(0, 5))
    } catch {
      setItems([])
    } finally {
      setReady(true)
    }
  }, [supabase, userId])

  useEffect(() => {
    setReady(false)
    void load()
  }, [load])

  useEffect(() => {
    const handler = () => {
      void load()
    }
    if (typeof window === 'undefined') return
    window.addEventListener(FLAGSHIP_PROGRESS_EVENT, handler)
    window.addEventListener(LEARNER_PROGRESS_HUB_EVENT, handler as EventListener)
    return () => {
      window.removeEventListener(FLAGSHIP_PROGRESS_EVENT, handler)
      window.removeEventListener(LEARNER_PROGRESS_HUB_EVENT, handler as EventListener)
    }
  }, [load])

  if (!supabase || !userId || !ready || items.length === 0) {
    return null
  }

  const warm = surface === 'warm'
  const shellClass = warm
    ? 'mt-8 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_14px_40px_-18px_rgba(120,53,15,0.14)] sm:p-6'
    : 'mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.14)] ring-1 ring-white/[0.03] sm:p-6'
  const headingClass = warm ? 'text-sm font-semibold text-zinc-900' : 'text-sm font-semibold text-white'
  const subClass = warm ? 'mt-1 max-w-xl text-[12px] leading-relaxed text-stone-600' : 'mt-1 max-w-xl text-[12px] leading-relaxed text-zinc-500/90'
  const catalogLinkClass = warm
    ? 'shrink-0 text-[12px] font-medium text-orange-700 transition hover:text-orange-800'
    : 'shrink-0 text-[12px] font-medium text-violet-300/85 transition hover:text-violet-200'
  const rowClass = warm
    ? 'rounded-xl border border-stone-200/80 bg-[#fffdfb] px-4 py-4 sm:flex sm:items-center sm:justify-between sm:gap-6'
    : 'rounded-xl border border-white/[0.06] bg-zinc-950/30 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:gap-6'
  const titleClass = warm ? 'truncate text-[14px] font-semibold text-zinc-900' : 'truncate text-[14px] font-semibold text-zinc-100'
  const nextMuted = warm ? 'text-stone-600' : 'text-zinc-500/95'
  const nextEm = warm ? 'text-stone-800' : 'text-zinc-300/95'
  const trackBg = warm ? 'mt-3 h-1.5 max-w-xs overflow-hidden rounded-full bg-stone-200/80' : 'mt-3 h-1.5 max-w-xs overflow-hidden rounded-full bg-white/[0.06]'
  const fillClass = warm
    ? 'h-full rounded-full bg-gradient-to-r from-orange-500 to-rose-500 transition-[width] duration-300'
    : 'h-full rounded-full bg-gradient-to-r from-violet-500/90 to-violet-400/80 transition-[width] duration-300'
  const pctClass = warm ? 'mt-1.5 text-[11px] tabular-nums text-stone-500' : 'mt-1.5 text-[11px] tabular-nums text-zinc-600/95'
  const resumeBtn = warm
    ? 'inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-rose-600 px-5 text-[13px] font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105'
    : 'inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-violet-500/90 px-5 text-[13px] font-semibold text-white shadow-lg shadow-violet-950/20 transition hover:bg-violet-400/90'

  return (
    <section
      className={shellClass}
      aria-labelledby="signed-in-continue-learning-heading"
      data-testid="signed-in-continue-learning"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div>
          <h2 id="signed-in-continue-learning-heading" className={headingClass}>
            Continue learning
          </h2>
          <p className={subClass}>Pick up where you left off across the courses you have started.</p>
        </div>
        <Link to="/learn" className={catalogLinkClass}>
          Browse catalog →
        </Link>
      </div>

      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item.slug} className={rowClass}>
            <div className="min-w-0 flex-1">
              <p className={titleClass}>{item.title}</p>
              <p className={`mt-1 text-[12px] leading-relaxed ${nextMuted}`}>
                Next step: <span className={nextEm}>{item.nextLabel}</span>
              </p>
              <div className={trackBg} role="progressbar" aria-valuenow={item.progressPercent} aria-valuemin={0} aria-valuemax={100} aria-label={`${item.title} progress`}>
                <div className={fillClass} style={{ width: `${item.progressPercent}%` }} />
              </div>
              <p className={pctClass}>{item.progressPercent}% complete</p>
            </div>
            <div className="mt-4 shrink-0 sm:mt-0">
              <Link to={item.resumeHref} className={resumeBtn} data-testid={`continue-resume-${item.slug}`}>
                {item.resumeCta}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
