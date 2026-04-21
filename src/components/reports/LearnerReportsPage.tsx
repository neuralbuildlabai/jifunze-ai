import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import {
  FLAGSHIP_COURSES,
  FLAGSHIP_SCHOOLS,
  getFlagshipCourseBySlug,
} from '../../data/learning/flagshipCoursesCatalog'
import { getFlagshipCurriculum } from '../../data/learning/flagshipCourseCurricula'
import { buildSessionsForCurriculum } from '../../data/learning/flagshipCourseSessions'
import {
  completionSet,
  courseProgressFraction,
  findNextFlagshipResumeSession,
  masteryCheckpointCompletionSet,
  modulesCompletedCount,
  moduleQuizPassed,
  reconcileFlagshipProgressState,
  type FlagshipCourseProgressState,
} from '../../lib/flagshipCourseProgressDerived'
import { mergeFlagshipProgressStates } from '../../lib/flagshipCourseProgressMerge'
import { listLocalFlagshipCourseSlugs, loadFlagshipCourseProgress } from '../../lib/flagshipCourseLocalProgress'
import {
  fetchFlagshipProgressRowsForUser,
  flagshipProgressRowToState,
} from '../../services/learning/flagshipCourseProgressRemote'
import { WorkspaceNav } from '../workspace/WorkspaceNav'
import { WorkspaceRouteReady, WorkspaceRouteShell } from '../workspace/WorkspaceRouteReady'
import { LEGAL_ROUTES } from '../../training/trustCopy'

type CourseReportRow = {
  slug: string
  title: string
  schoolLabel: string
  sessionDone: number
  sessionTotal: number
  progressPct: number
  modulesDone: number
  modulesTotal: number
  quizModulesPassed: number
  quizModulesTotal: number
  nextLabel: string | null
  nextHref: string | null
}

function mergeProgressForSlug(
  slug: string,
  remoteState: FlagshipCourseProgressState | null,
): FlagshipCourseProgressState {
  const local = loadFlagshipCourseProgress(slug)
  const mergedRaw = mergeFlagshipProgressStates(local, remoteState)
  const curriculum = getFlagshipCurriculum(slug)
  const sessions = curriculum ? buildSessionsForCurriculum(curriculum) : []
  if (!curriculum || sessions.length === 0) return mergedRaw
  return reconcileFlagshipProgressState(mergedRaw, curriculum, sessions)
}

export function LearnerReportsPage() {
  const { user, supabase } = useAuth()
  const [rows, setRows] = useState<CourseReportRow[]>([])
  const [loading, setLoading] = useState(true)

  const slugsToConsider = useMemo(() => {
    const fromCatalog = new Set(FLAGSHIP_COURSES.map((c) => c.slug))
    const local = listLocalFlagshipCourseSlugs()
    const merged = new Set<string>([...fromCatalog])
    for (const s of local) merged.add(s)
    return [...merged]
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      const remoteBySlug = new Map<string, FlagshipCourseProgressState>()
      try {
        if (user && supabase && isSupabaseConfigured()) {
          const list = await fetchFlagshipProgressRowsForUser(supabase, user.id, 48)
          for (const row of list) {
            remoteBySlug.set(row.course_slug, flagshipProgressRowToState(row))
          }
        }
      } catch {
        /* sync optional */
      }
      if (cancelled) return

      const out: CourseReportRow[] = []
      for (const slug of slugsToConsider) {
        const course = getFlagshipCourseBySlug(slug)
        const curriculum = getFlagshipCurriculum(slug)
        if (!course || !curriculum) continue

        const state = mergeProgressForSlug(slug, remoteBySlug.get(slug) ?? null)
        const sessions = buildSessionsForCurriculum(curriculum)
        const completed = completionSet(state)
        const ck = masteryCheckpointCompletionSet(state)
        const frac = courseProgressFraction(sessions, completed)
        const mod = modulesCompletedCount(curriculum, sessions, completed, state)
        const next = findNextFlagshipResumeSession(curriculum, sessions, completed, ck, state)

        const school = FLAGSHIP_SCHOOLS[course.schoolId]

        let quizModulesPassed = 0
        const quizModulesTotal = curriculum.modules.length
        for (const m of curriculum.modules) {
          if (moduleQuizPassed(m.id, state)) quizModulesPassed += 1
        }

        out.push({
          slug,
          title: course.title,
          schoolLabel: school?.shortLabel ?? school?.label ?? 'Course',
          sessionDone: completed.size,
          sessionTotal: sessions.length,
          progressPct: Math.round(frac * 100),
          modulesDone: mod.completed,
          modulesTotal: mod.total,
          quizModulesPassed,
          quizModulesTotal,
          nextLabel: next?.title ?? null,
          nextHref: next ? `/learn/courses/${slug}/session/${next.id}` : null,
        })
      }

      out.sort((a, b) => {
        const ap = a.progressPct > 0 || a.sessionDone > 0 ? 0 : 1
        const bp = b.progressPct > 0 || b.sessionDone > 0 ? 0 : 1
        if (ap !== bp) return ap - bp
        return a.title.localeCompare(b.title)
      })

      setRows(out)
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [user, supabase, slugsToConsider])

  return (
    <WorkspaceRouteReady>
      <WorkspaceRouteShell
        title="Reports"
        subtitle="Your flagship progress: chapters completed, module quizzes, and where to resume."
      >
        <WorkspaceNav className="mb-8 w-full justify-start" />

        {loading ? (
          <p className="text-sm text-zinc-400">Loading your progress…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-zinc-400">
            No catalog courses loaded. Open{' '}
            <Link className="text-violet-300 hover:underline" to={LEGAL_ROUTES.learn}>
              Discover
            </Link>{' '}
            to start a path.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-zinc-800/80 bg-zinc-950/35">
            <table className="min-w-[640px] w-full text-left text-[13px] text-zinc-300">
              <thead>
                <tr className="border-b border-zinc-800/90 text-[11px] uppercase tracking-wide text-zinc-500">
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">School</th>
                  <th className="px-4 py-3 font-medium">Chapters / sessions</th>
                  <th className="px-4 py-3 font-medium">Modules done</th>
                  <th className="px-4 py-3 font-medium">Module quizzes</th>
                  <th className="px-4 py-3 font-medium">Next</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.slug} className="border-b border-zinc-800/60 last:border-0">
                    <td className="px-4 py-3">
                      <Link className="font-medium text-zinc-100 hover:underline" to={`/learn/courses/${r.slug}`}>
                        {r.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-zinc-400">{r.schoolLabel}</td>
                    <td className="px-4 py-3 tabular-nums">
                      {r.sessionDone}/{r.sessionTotal} ({r.progressPct}%)
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {r.modulesDone}/{r.modulesTotal}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-zinc-400">
                      {r.quizModulesTotal ? `${r.quizModulesPassed}/${r.quizModulesTotal} passed` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      {r.nextHref && r.nextLabel ? (
                        <Link className="text-violet-300 hover:underline" to={r.nextHref}>
                          {r.nextLabel}
                        </Link>
                      ) : r.progressPct >= 100 ? (
                        <span className="text-emerald-400/90">Path complete</span>
                      ) : (
                        <span className="text-zinc-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-8 text-[11px] leading-relaxed text-zinc-600">
          Workspace training assignments from your admin appear under My Learning when your organization assigns plans.
        </p>
      </WorkspaceRouteShell>
    </WorkspaceRouteReady>
  )
}
