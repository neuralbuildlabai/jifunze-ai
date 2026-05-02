import { useEffect, useMemo, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import {
  canLearnerSelectPathwayAsPrimary,
  featuredEmployablePathways,
} from '../data/learning/employablePathwaysCatalog'
import type { EmployablePathway } from '../data/learning/employablePathwaysTypes'
import { partitionPortfolioOutputsForPathway } from '../data/learning/portfolioOutputsCatalog'
import { useRemoteFlagshipProgressBySlugs, type PathwayProgressSyncContext } from '../hooks/usePathwayProgressMap'
import { useSelectedPathway } from '../hooks/useSelectedPathway'
import { FLAGSHIP_PROGRESS_EVENT } from '../lib/flagshipCourseLocalProgress'
import { buildMergedPathwayProgressMap } from '../lib/pathwayMergedProgressMap'
import { getPathwayNextAction, getPathwayProgressSummary, pickTopPathway } from '../lib/pathwayNextAction'
import { isFlagshipCoursePublished } from '../lib/pathwayProgressDerived'
import { LEGAL_ROUTES } from '../training/trustCopy'

const surface =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.2)] ring-1 ring-white/[0.04]'
const eyebrow = 'text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500'
const btnPrimary =
  'inline-flex min-h-[2.5rem] items-center justify-center rounded-lg bg-violet-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500'
const btnGhost =
  'inline-flex min-h-[2.5rem] items-center justify-center rounded-lg border border-white/[0.1] px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-white/[0.04]'

function certTeaser(pathway: EmployablePathway): string {
  const t = pathway.certificateReadinessCriteria
  if (t.length <= 200) return t
  return `${t.slice(0, 197)}…`
}

/**
 * Learning-first dashboard: continue learning, pathway, progress, portfolio—no catalog grid dump.
 */
export function DashboardLearnerHub() {
  const { user, supabase } = useAuth()
  const { selectedPathway, loading: prefLoading } = useSelectedPathway()

  const pathwaysForRanking = useMemo(() => featuredEmployablePathways(), [])

  const pathwaySync: PathwayProgressSyncContext = useMemo(() => {
    if (!user || !supabase || !isSupabaseConfigured()) return null
    return { supabase, userId: user.id }
  }, [user, supabase])

  const unionSlugs = useMemo(() => {
    const s = new Set<string>()
    for (const p of pathwaysForRanking) {
      for (const slug of p.includedCourseSlugs) {
        if (isFlagshipCoursePublished(slug)) s.add(slug)
      }
    }
    if (selectedPathway) {
      for (const slug of selectedPathway.includedCourseSlugs) {
        if (isFlagshipCoursePublished(slug)) s.add(slug)
      }
    }
    return [...s]
  }, [pathwaysForRanking, selectedPathway])

  const { bySlug, hydrated } = useRemoteFlagshipProgressBySlugs(unionSlugs, pathwaySync)
  const applyRemote = Boolean(pathwaySync) && hydrated

  const [tick, refresh] = useReducer((n: number) => n + 1, 0)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const on = () => refresh()
    window.addEventListener(FLAGSHIP_PROGRESS_EVENT, on as EventListener)
    return () => window.removeEventListener(FLAGSHIP_PROGRESS_EVENT, on as EventListener)
  }, [])

  const getMap = useMemo(
    () => (pathway: EmployablePathway) => buildMergedPathwayProgressMap(pathway, bySlug, applyRemote),
    [bySlug, applyRemote],
  )

  const topPick = useMemo(() => {
    void tick
    return pickTopPathway(pathwaysForRanking, getMap)
  }, [pathwaysForRanking, getMap, tick])

  const primaryPathway: EmployablePathway | null = useMemo(() => {
    if (selectedPathway && canLearnerSelectPathwayAsPrimary(selectedPathway)) return selectedPathway
    if (topPick?.pathway) return topPick.pathway
    return pathwaysForRanking[0] ?? null
  }, [selectedPathway, topPick, pathwaysForRanking])

  const primaryMap = useMemo(() => {
    void tick
    return primaryPathway ? getMap(primaryPathway) : {}
  }, [primaryPathway, getMap, tick])

  const summary = primaryPathway ? getPathwayProgressSummary(primaryPathway, primaryMap) : null
  const nextAction = primaryPathway ? getPathwayNextAction(primaryPathway, primaryMap) : null

  const hasMomentum = Boolean(summary && (summary.pathwaySessionProgressPercent > 0 || summary.startedCourseCount > 0))

  const portfolioPartition = primaryPathway ? partitionPortfolioOutputsForPathway(primaryPathway.slug) : null
  const requiredCount = portfolioPartition?.required.length ?? 0
  const exampleOutputs = useMemo(() => {
    if (!portfolioPartition) return []
    const merged = [...portfolioPartition.required, ...portfolioPartition.optional]
    return merged.slice(0, 4).map((o) => o.title)
  }, [portfolioPartition])

  return (
    <div className="space-y-6">
      <section className={surface} data-testid="dashboard-continue-learning">
        <p className={eyebrow}>Continue learning</p>
        {!primaryPathway ? (
          <p className="mt-2 text-sm text-zinc-500">Pick a pathway first—then your next session will appear here.</p>
        ) : nextAction?.kind === 'planned_only' ? (
          <p className="mt-2 text-sm text-zinc-400">
            This pathway is still being prepared for flagship sessions.{' '}
            <Link className="font-medium text-violet-300 hover:underline" to={nextAction.hrefExplore}>
              Explore available pathways
            </Link>
          </p>
        ) : nextAction ? (
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-400">
              <span className="font-medium text-zinc-200">{primaryPathway.shortTitle}</span>
              <span className="mx-1.5 text-zinc-600">·</span>
              {nextAction.buttonLabel}
            </p>
            <Link className={`${btnPrimary} shrink-0`} to={nextAction.href} data-testid="dashboard-continue-primary">
              Continue
            </Link>
          </div>
        ) : null}
      </section>

      <section className={surface} data-testid="dashboard-your-pathway">
        <p className={eyebrow}>My pathway</p>
        {prefLoading && pathwaySync ? (
          <p className="mt-2 text-sm text-zinc-500">Loading your pathway preference…</p>
        ) : null}
        {selectedPathway && canLearnerSelectPathwayAsPrimary(selectedPathway) ? (
          <>
            <h2 className="mt-2 text-lg font-semibold text-white">{selectedPathway.title}</h2>
            {summary ? (
              <p className="mt-2 text-sm text-zinc-400">
                Session progress across included courses:{' '}
                <span className="font-semibold tabular-nums text-zinc-200">{summary.pathwaySessionProgressPercent}%</span>
                <span className="mx-1.5 text-zinc-600">·</span>
                Next: {summary.recommendedNextActionLabel}
              </p>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link className={btnGhost} to={LEGAL_ROUTES.paths}>
                Change pathway
              </Link>
              <Link className={btnPrimary} to={`/paths/${selectedPathway.slug}`} data-testid="dashboard-your-pathway-view">
                View pathway
              </Link>
            </div>
          </>
        ) : topPick?.pathway ? (
          <>
            <h2 className="mt-2 text-lg font-semibold text-white">Recommended for you</h2>
            <p className="mt-2 text-sm text-zinc-400">
              <span className="font-medium text-zinc-200">{topPick.pathway.shortTitle}</span>
              {' — '}
              Choose an employable pathway to personalize your dashboard, or open this track to preview practical skills and portfolio-ready outputs.
            </p>
            {summary ? (
              <p className="mt-2 text-[13px] text-zinc-500">
                Suggested momentum: ~{summary.pathwaySessionProgressPercent}% sessions across included courses when you start.
              </p>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link className={btnPrimary} to={LEGAL_ROUTES.paths} data-testid="dashboard-choose-pathway">
                Choose a pathway
              </Link>
            </div>
          </>
        ) : (
          <p className="mt-2 text-sm text-zinc-400">
            Choose an employable pathway to personalize your dashboard. Pathways help you build practical skills and portfolio-ready proof to prepare for real work
            opportunities—without implying job placement.
          </p>
        )}
      </section>

      <section className={surface} data-testid="dashboard-my-progress">
        <p className={eyebrow}>My progress</p>
        {!primaryPathway || !summary ? (
          <p className="mt-2 text-sm text-zinc-500">Start your first pathway session to begin tracking progress.</p>
        ) : (
          <>
            <p className="mt-2 text-sm text-zinc-400">
              <span className="font-medium text-zinc-200">{primaryPathway.shortTitle}</span>: ~{summary.pathwaySessionProgressPercent}% sessions ·{' '}
              {summary.startedCourseCount}/{summary.availableCourseCount || '—'} courses started · {summary.completedCourseCount} certificate-ready (in-app rules)
            </p>
            {hasMomentum ? (
              <p className="mt-2 text-[12px] text-zinc-500">
                Review per-course chapters and quizzes in Reports to spot revision gaps—useful proof prep, not a transcript.
              </p>
            ) : (
              <p className="mt-2 text-[12px] text-zinc-500">Start your first pathway session to begin tracking progress.</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link className={btnPrimary} to="/reports">
                Open reports
              </Link>
            </div>
          </>
        )}
      </section>

      <section className={surface} data-testid="dashboard-build-proof">
        <p className={eyebrow}>Portfolio outputs</p>
        {!primaryPathway ? (
          <p className="mt-2 text-sm text-zinc-500">Select a pathway to see portfolio-ready output examples.</p>
        ) : (
          <>
            <p className="mt-2 text-sm text-zinc-400">
              Use these outputs as your checklist—guidance in the product; formal upload review is not wired here yet.
            </p>
            <p className="mt-3 text-[13px] text-zinc-300">
              Required outputs flagged for certificate framing:{' '}
              <span className="font-semibold tabular-nums text-white">{requiredCount}</span>
            </p>
            {exampleOutputs.length ? (
              <ul className="mt-2 list-inside list-disc text-[13px] text-zinc-500">
                {exampleOutputs.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : null}
            <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">{certTeaser(primaryPathway)}</p>
            <Link className={`${btnPrimary} mt-4 inline-flex`} to={`/paths/${primaryPathway.slug}#pathway-portfolio-guidance`}>
              View portfolio outputs
            </Link>
          </>
        )}
      </section>

    </div>
  )
}
