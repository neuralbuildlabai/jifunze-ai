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
import { getFlagshipCourseDisplayProgressPercent } from '../../lib/aiEssentialsProgressMilestones'
import {
  completionSet,
  findNextFlagshipResumeSession,
  masteryCheckpointCompletionSet,
  modulesCompletedCount,
  moduleQuizPassed,
  type FlagshipCourseProgressState,
} from '../../lib/flagshipCourseProgressDerived'
import { getPathwayNextAction, getPathwayProgressSummary } from '../../lib/pathwayNextAction'
import { isFlagshipCoursePublished } from '../../lib/pathwayProgressDerived'
import { mergeLocalRemoteReconciledForSlug } from '../../lib/flagshipCourseProgressLocalRemoteMerge'
import {
  fetchFlagshipProgressRowsForUser,
  flagshipProgressRowToState,
} from '../../services/learning/flagshipCourseProgressRemote'
import { useSelectedPathway } from '../../hooks/useSelectedPathway'
import { WorkspaceRouteReady } from '../workspace/WorkspaceRouteReady'
import { LearnerPageShell } from '../learner-shell/LearnerPageShell'
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

  const catalogAllowSlugs = useMemo(
    () => new Set(FLAGSHIP_COURSES.filter((c) => isFlagshipCoursePublished(c.slug)).map((c) => c.slug)),
    [],
  )

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

      const applyRemote = Boolean(user && supabase && isSupabaseConfigured())

      const out: CourseReportRow[] = []
      for (const slug of catalogAllowSlugs) {
        const course = getFlagshipCourseBySlug(slug)
        const curriculum = getFlagshipCurriculum(slug)
        if (!course || !curriculum) continue

        const state = mergeLocalRemoteReconciledForSlug(slug, remoteBySlug.get(slug) ?? null, applyRemote)
        const sessions = buildSessionsForCurriculum(curriculum)
        const completed = completionSet(state)
        const ck = masteryCheckpointCompletionSet(state)
        const displayPct = getFlagshipCourseDisplayProgressPercent(slug, curriculum, sessions, state)
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
          progressPct: displayPct,
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
          for (const s of pathway.includedCourseSlugs) {
            if (!isFlagshipCoursePublished(s)) continue
            if (!catalogAllowSlugs.has(s)) continue
            progressMap[s] = mergeLocalRemoteReconciledForSlug(s, remoteBySlug.get(s) ?? null, applyRemote)
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
  }, [user, supabase, catalogAllowSlugs, selectedPathwaySlug])

  return (
    <WorkspaceRouteReady>
      <LearnerPageShell
        title="Reports"
        purpose="Course progress, checkpoints, and your next session—aligned with how progress is saved on your account."
        wide
      >
        {!loading && selectedPathwayHint ? (
          <div
            className="rounded-xl border border-stone-200/90 bg-white px-4 py-4 text-[13px] text-stone-700 shadow-sm"
            data-testid="reports-selected-pathway-summary"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">Learning focus</p>
            <p className="mt-1 font-medium text-zinc-900">{selectedPathwayHint.title}</p>
            <p className="mt-1 text-[12px] text-stone-600">
              Included courses (session view): <span className="tabular-nums text-zinc-900">{selectedPathwayHint.progressPct}%</span>
              <span className="mx-1.5 text-stone-400">·</span>
              Next: {selectedPathwayHint.nextSummary}
            </p>
            <Link className="mt-2 inline-block text-[12px] font-semibold text-orange-700 hover:underline" to="/learn#available-now">
              Browse schools in catalog
            </Link>
            {selectedPathwayHint.nextHref ? (
              <Link className="ml-3 inline-block text-[12px] font-medium text-stone-500 hover:text-stone-800 hover:underline" to={selectedPathwayHint.nextHref}>
                Continue
              </Link>
            ) : null}
          </div>
        ) : null}

        {loading ? (
          <p className="text-sm text-stone-600">Loading your progress…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-stone-600">
            No courses in your catalog yet. Open the{' '}
            <Link className="font-medium text-orange-700 hover:underline" to={LEGAL_ROUTES.learn}>
              catalog
            </Link>
            .
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-stone-200/90 bg-white shadow-sm">
            <table className="min-w-[560px] w-full text-left text-[13px] text-stone-700">
              <thead>
                <tr className="border-b border-stone-200/90 text-[11px] uppercase tracking-wide text-stone-500">
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Sessions</th>
                  <th className="px-4 py-3 font-medium">Modules</th>
                  <th className="px-4 py-3 font-medium">Checkpoints</th>
                  <th className="px-4 py-3 font-medium">Next</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.slug} className="border-b border-stone-100 last:border-0">
                    <td className="px-4 py-3">
                      <Link className="font-medium text-zinc-900 hover:underline" to={`/learn/courses/${r.slug}`}>
                        {r.title}
                      </Link>
                      <p className="text-[11px] text-stone-500">{r.schoolLabel}</p>
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {r.sessionDone}/{r.sessionTotal} ({r.progressPct}%)
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {r.modulesDone}/{r.modulesTotal}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-stone-600">
                      {r.quizModulesTotal ? `${r.quizModulesPassed}/${r.quizModulesTotal} passed` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      {r.nextHref && r.nextLabel ? (
                        <Link className="font-medium text-orange-700 hover:underline" to={r.nextHref}>
                          {r.nextLabel}
                        </Link>
                      ) : r.progressPct >= 100 ? (
                        <span className="font-medium text-emerald-700">Complete</span>
                      ) : (
                        <span className="text-stone-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </LearnerPageShell>
    </WorkspaceRouteReady>
  )
}
