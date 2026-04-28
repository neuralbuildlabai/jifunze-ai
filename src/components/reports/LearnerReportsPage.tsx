import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import {
  FLAGSHIP_COURSES,
  FLAGSHIP_SCHOOLS,
  getFlagshipCourseBySlug,
} from '../../data/learning/flagshipCoursesCatalog'
import {
  canLearnerSelectPathwayAsPrimary,
  getPathwayBySlug,
} from '../../data/learning/employablePathwaysCatalog'
import { getFlagshipCurriculum } from '../../data/learning/flagshipCourseCurricula'
import { buildSessionsForCurriculum } from '../../data/learning/flagshipCourseSessions'
import {
  completionSet,
  courseProgressFraction,
  findNextFlagshipResumeSession,
  masteryCheckpointCompletionSet,
  modulesCompletedCount,
  moduleQuizPassed,
  type FlagshipCourseProgressState,
} from '../../lib/flagshipCourseProgressDerived'
import { getPathwayNextAction, getPathwayProgressSummary } from '../../lib/pathwayNextAction'
import { isFlagshipCoursePublished } from '../../lib/pathwayProgressDerived'
import { mergeLocalRemoteReconciledForSlug } from '../../lib/flagshipCourseProgressLocalRemoteMerge'
import { listLocalFlagshipCourseSlugs } from '../../lib/flagshipCourseLocalProgress'
import {
  fetchFlagshipProgressRowsForUser,
  flagshipProgressRowToState,
} from '../../services/learning/flagshipCourseProgressRemote'
import { useSelectedPathway } from '../../hooks/useSelectedPathway'
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

type SelectedPathwayReportHint = {
  slug: string
  title: string
  progressPct: number
  nextSummary: string
  nextHref: string | null
}

export function LearnerReportsPage() {
  const { user, supabase } = useAuth()
  const { selectedPathwaySlug } = useSelectedPathway()
  const [rows, setRows] = useState<CourseReportRow[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPathwayHint, setSelectedPathwayHint] = useState<SelectedPathwayReportHint | null>(null)

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

      /** Same “hydrated” rule as pathways: only merge server rows when signed in with Supabase. */
      const applyRemote = Boolean(user && supabase && isSupabaseConfigured())

      const out: CourseReportRow[] = []
      for (const slug of slugsToConsider) {
        const course = getFlagshipCourseBySlug(slug)
        const curriculum = getFlagshipCurriculum(slug)
        if (!course || !curriculum) continue

        const state = mergeLocalRemoteReconciledForSlug(slug, remoteBySlug.get(slug) ?? null, applyRemote)
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

      let pathwayHint: SelectedPathwayReportHint | null = null
      if (selectedPathwaySlug && user && supabase && isSupabaseConfigured()) {
        const pathway = getPathwayBySlug(selectedPathwaySlug)
        if (pathway && canLearnerSelectPathwayAsPrimary(pathway)) {
          const progressMap: Record<string, FlagshipCourseProgressState> = {}
          for (const slug of pathway.includedCourseSlugs) {
            if (!isFlagshipCoursePublished(slug)) continue
            progressMap[slug] = mergeLocalRemoteReconciledForSlug(slug, remoteBySlug.get(slug) ?? null, applyRemote)
          }
          const summary = getPathwayProgressSummary(pathway, progressMap)
          const na = getPathwayNextAction(pathway, progressMap)
          const nextHref =
            na.kind === 'planned_only' ? na.hrefExplore : 'href' in na && typeof na.href === 'string' ? na.href : null
          pathwayHint = {
            slug: pathway.slug,
            title: pathway.shortTitle,
            progressPct: summary.pathwaySessionProgressPercent,
            nextSummary: summary.recommendedNextActionLabel,
            nextHref,
          }
        }
      }

      setRows(out)
      setSelectedPathwayHint(pathwayHint)
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [user, supabase, slugsToConsider, selectedPathwaySlug])

  return (
    <WorkspaceRouteReady>
      <WorkspaceRouteShell
        title="Reports"
        subtitle="Flagship progress aligned with pathways: chapters, module quizzes, and resume—merged the same way as pathway views when you are signed in."
      >
        <WorkspaceNav className="mb-8 w-full justify-start" />

        {!loading && selectedPathwayHint ? (
          <div
            className="mb-6 rounded-xl border border-violet-500/20 bg-violet-950/15 px-4 py-3 text-[13px] text-zinc-300"
            data-testid="reports-selected-pathway-summary"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-300/90">Your pathway</p>
            <p className="mt-1 font-medium text-zinc-100">{selectedPathwayHint.title}</p>
            <p className="mt-1 text-[12px] text-zinc-400">
              Session progress (included courses):{' '}
              <span className="tabular-nums text-zinc-200">{selectedPathwayHint.progressPct}%</span>
              <span className="mx-1.5 text-zinc-600">·</span>
              Next: {selectedPathwayHint.nextSummary}
            </p>
            <Link className="mt-2 inline-block text-[12px] font-semibold text-violet-200 hover:underline" to={`/paths/${selectedPathwayHint.slug}`}>
              Open pathway overview →
            </Link>
            {selectedPathwayHint.nextHref ? (
              <Link className="ml-3 inline-block text-[12px] font-medium text-zinc-500 hover:text-zinc-300 hover:underline" to={selectedPathwayHint.nextHref}>
                Go to next step →
              </Link>
            ) : null}
          </div>
        ) : null}

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
          Percentages and resume links use the same local + account merge as employable pathways—use them to spot revision gaps, not as a job promise. Workspace
          training assignments from your admin appear under My Learning when your organization assigns plans.
        </p>
      </WorkspaceRouteShell>
    </WorkspaceRouteReady>
  )
}
