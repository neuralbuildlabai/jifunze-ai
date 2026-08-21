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
} from '../../services/learnerState/flagshipCourseProgressRemote'
import { useSelectedPathway } from '../../hooks/useSelectedPathway'
import { LearnerRouteReady } from '../learner-shell/LearnerRouteReady'
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

      const filtered = out.filter(
        (r) =>
          r.progressPct > 0 || r.sessionDone > 0 || r.modulesDone > 0 || r.quizModulesPassed > 0,
      )

      setRows(filtered)
      setSelectedPathwayHint(pathwayHint)
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [user, supabase, catalogAllowSlugs, selectedPathwaySlug])

  return (
    <LearnerRouteReady>
      <div data-testid="learner-reports-page">
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
          <p className="text-sm text-stone-600" data-testid="reports-empty-state">
            No flagship course progress yet. When you open a course from the catalog, it will appear here with sessions, modules, and
            checkpoints.
            <Link className="ml-1 font-medium text-orange-700 hover:underline" to={LEGAL_ROUTES.learn}>
              Browse catalog
            </Link>
            .
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2" data-testid="reports-course-cards">
            {rows.map((r) => (
              <article
                key={r.slug}
                className="rounded-xl border border-stone-200/90 bg-white p-4 text-[13px] text-stone-700 shadow-sm sm:p-5"
              >
                <Link className="font-medium text-zinc-900 hover:underline" to={`/learn/courses/${r.slug}`}>
                  {r.title}
                </Link>
                <p className="text-[11px] text-stone-500">{r.schoolLabel}</p>
                <dl className="mt-3 space-y-1.5 text-[12px]">
                  <div className="flex justify-between gap-3">
                    <dt className="text-stone-500">Sessions</dt>
                    <dd className="tabular-nums text-zinc-900">
                      {r.sessionDone}/{r.sessionTotal} ({r.progressPct}%)
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-stone-500">Modules</dt>
                    <dd className="tabular-nums text-zinc-900">
                      {r.modulesDone}/{r.modulesTotal}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-stone-500">Checkpoints</dt>
                    <dd className="tabular-nums text-stone-700">
                      {r.quizModulesTotal ? `${r.quizModulesPassed}/${r.quizModulesTotal} passed` : '—'}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-stone-500">Next step</dt>
                    <dd className="text-right">
                      {r.nextHref && r.nextLabel ? (
                        <Link className="font-medium text-orange-700 hover:underline" to={r.nextHref}>
                          {r.nextLabel}
                        </Link>
                      ) : r.progressPct >= 100 ? (
                        <span className="font-medium text-emerald-700">Complete</span>
                      ) : (
                        <span className="text-stone-500">—</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        )}
        </LearnerPageShell>
      </div>
    </LearnerRouteReady>
  )
}
