import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { SupabaseClient } from '@supabase/supabase-js'
import { getFlagshipCourseBySlug } from '../data/learning/flagshipCoursesCatalog'
import { getFlagshipCurriculum } from '../data/learning/flagshipCourseCurricula'
import { buildSessionsForCurriculum } from '../data/learning/flagshipCourseSessions'
import { FLAGSHIP_PROGRESS_EVENT } from '../lib/flagshipCourseLocalProgress'
import { getFlagshipCourseDisplayProgressPercent } from '../lib/aiEssentialsProgressMilestones'
import {
  capstonePrepAccessible,
  completionSet,
  findNextFlagshipResumeSession,
  isCapstonePrepComplete,
  isCapstoneUnlocked,
  masteryCheckpointCompletionSet,
  needsAttentionSessions,
  nextResumeLabel,
} from '../lib/flagshipCourseProgressDerived'
import { masteryEvidenceProgress } from '../lib/flagshipAssessmentCatalog'
import { flagshipReadinessCompact } from '../lib/flagshipReadinessSignals'
import { modulesPendingMasteryCheckpoints } from '../lib/flagshipMasteryCheckpoint'
import {
  fetchFlagshipProgressRowsForUser,
  flagshipProgressRowToState,
  type FlagshipCourseProgressRow,
} from '../services/learning/flagshipCourseProgressRemote'

function rowHasLearningActivity(row: FlagshipCourseProgressRow): boolean {
  return (
    (row.completed_session_ids?.length ?? 0) > 0 ||
    Boolean(row.last_active_session_id) ||
    Boolean(row.started_at)
  )
}

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

export function SignedInContinueLearning(props: {
  supabase: SupabaseClient | null
  userId: string | undefined
}) {
  const { supabase, userId } = props
  const [items, setItems] = useState<SignedInContinueLearningItem[]>([])
  const [ready, setReady] = useState(false)

  const load = useCallback(async () => {
    if (!supabase || !userId) {
      setItems([])
      setReady(true)
      return
    }

    try {
      const rows = await fetchFlagshipProgressRowsForUser(supabase, userId, 28)
      const enriched: SignedInContinueLearningItem[] = []

      for (const row of rows) {
        if (!rowHasLearningActivity(row)) continue
        const slug = row.course_slug
        const course = getFlagshipCourseBySlug(slug)
        const curriculum = getFlagshipCurriculum(slug)
        if (!course || !curriculum) continue

        const sessions = buildSessionsForCurriculum(curriculum)
        const state = flagshipProgressRowToState(row)
        const completed = completionSet(state)
        const ck = masteryCheckpointCompletionSet(state)
        const pendingMastery = modulesPendingMasteryCheckpoints(curriculum, sessions, completed, ck)
        const needsAtt = needsAttentionSessions(sessions, completed)
        const capUnlocked = isCapstoneUnlocked(sessions, completed)
        const prepAccessible = capstonePrepAccessible(curriculum, sessions, completed, ck)
        const prepDone = isCapstonePrepComplete(sessions, completed)
        const mcProg = masteryEvidenceProgress(curriculum.modules, ck)
        const readiness = flagshipReadinessCompact({
          pendingMasteryModuleTitle: pendingMastery[0]?.title,
          needsAttentionCount: needsAtt.length,
          capstoneUnlocked: capUnlocked,
          capstonePrepAccessible: prepAccessible,
          capstonePrepComplete: prepDone,
          masteryDone: mcProg.done,
          masteryTotal: mcProg.total,
        })
        const next = findNextFlagshipResumeSession(curriculum, sessions, completed, ck, state)
        const pct = getFlagshipCourseDisplayProgressPercent(slug, curriculum, sessions, state)
        const resumeHref = next ? `/learn/courses/${slug}/session/${next.id}` : `/learn/courses/${slug}`
        const resumeCta = next ? 'Resume learning' : 'Explore course'
        const guidanceHint = readiness.detailHint ?? readiness.compactLabel ?? undefined
        enriched.push({
          slug,
          title: course.title,
          progressPercent: pct,
          nextLabel: nextResumeLabel(next),
          resumeHref,
          resumeCta,
          updatedAt: row.updated_at,
          guidanceHint,
        })
      }

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
    return () => window.removeEventListener(FLAGSHIP_PROGRESS_EVENT, handler)
  }, [load])

  if (!supabase || !userId || !ready || items.length === 0) {
    return null
  }

  return (
    <section
      className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.14)] ring-1 ring-white/[0.03] sm:p-6"
      aria-labelledby="signed-in-continue-learning-heading"
      data-testid="signed-in-continue-learning"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div>
          <h2 id="signed-in-continue-learning-heading" className="text-sm font-semibold text-white">
            Continue learning
          </h2>
          <p className="mt-1 max-w-xl text-[12px] leading-relaxed text-zinc-500/90">
            Pick up where you left off across your flagship courses.
          </p>
        </div>
        <Link
          to="/learn"
          className="shrink-0 text-[12px] font-medium text-violet-300/85 transition hover:text-violet-200"
        >
          Browse catalog →
        </Link>
      </div>

      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li
            key={item.slug}
            className="rounded-xl border border-white/[0.06] bg-zinc-950/30 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:gap-6"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-zinc-100">{item.title}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-zinc-500/95">
                Recommended next: <span className="text-zinc-300/95">{item.nextLabel}</span>
              </p>
              {item.guidanceHint ? (
                <p className="mt-2 text-[11px] leading-relaxed text-zinc-600/95">{item.guidanceHint}</p>
              ) : null}
              <div
                className="mt-3 h-1.5 max-w-xs overflow-hidden rounded-full bg-white/[0.06]"
                role="progressbar"
                aria-valuenow={item.progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.title} progress`}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500/90 to-violet-400/80 transition-[width] duration-300"
                  style={{ width: `${item.progressPercent}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] tabular-nums text-zinc-600/95">{item.progressPercent}% complete</p>
            </div>
            <div className="mt-4 shrink-0 sm:mt-0">
              <Link
                to={item.resumeHref}
                className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-violet-500/90 px-5 text-[13px] font-semibold text-white shadow-lg shadow-violet-950/20 transition hover:bg-violet-400/90"
                data-testid={`continue-resume-${item.slug}`}
              >
                {item.resumeCta}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
