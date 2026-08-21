import { useEffect, useMemo, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import {
  canLearnerSelectPathwayAsPrimary,
  featuredEmployablePathways,
  getPathwayBySlug,
} from '../data/learning/employablePathwaysCatalog'
import type { EmployablePathway } from '../data/learning/employablePathwaysTypes'
import { FLAGSHIP_PROGRESS_EVENT } from '../lib/flagshipCourseLocalProgress'
import {
  buildMergedPathwayProgressMap,
} from '../lib/pathwayMergedProgressMap'
import {
  getPathwayNextAction,
  getPathwayProgressSummary,
  pickTopPathway,
} from '../lib/pathwayNextAction'
import { isFlagshipCoursePublished } from '../lib/pathwayProgressDerived'
import { LEGAL_ROUTES } from '../shared/legalRoutes'
import type { FlagshipCourseProgressState } from '../lib/flagshipCourseProgressDerived'
import { useRemoteFlagshipProgressBySlugs, type PathwayProgressSyncContext } from '../hooks/usePathwayProgressMap'
import { useSelectedPathway } from '../hooks/useSelectedPathway'

function PathwayCard({
  pathway,
  progressBySlug,
  variant = 'default',
}: {
  pathway: EmployablePathway
  progressBySlug: Record<string, FlagshipCourseProgressState>
  variant?: 'default' | 'your_pathway'
}) {
  const summary = getPathwayProgressSummary(pathway, progressBySlug)
  const action = getPathwayNextAction(pathway, progressBySlug)

  const ctaHref = action.kind === 'planned_only' ? action.hrefExplore : action.href
  const ctaLabel = action.buttonLabel

  return (
    <li
      className={`rounded-lg border px-3 py-3 ${
        variant === 'your_pathway' ? 'border-violet-500/35 bg-violet-950/25' : 'border-white/[0.06] bg-zinc-950/30'
      }`}
    >
      {variant === 'your_pathway' ? (
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-300/90">Your pathway</p>
      ) : null}
      <Link to={`/paths/${pathway.slug}`} className="text-sm font-medium text-zinc-100 hover:text-violet-200">
        {pathway.shortTitle}
      </Link>
      <p className="mt-2 text-[11px] leading-snug text-zinc-500 sm:text-xs">
        ~{summary.pathwaySessionProgressPercent}% sessions · {summary.startedCourseCount}/{summary.availableCourseCount || '—'} started · {summary.completedCourseCount}{' '}
        cert-ready
      </p>
      <p className="mt-1 text-[11px] text-zinc-500">
        <span className="text-zinc-400">Next: </span>
        {summary.recommendedNextActionLabel}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <Link
          to={ctaHref}
          className="inline-flex rounded-md border border-violet-500/30 bg-violet-600/20 px-2.5 py-1 text-[11px] font-semibold text-violet-100 hover:bg-violet-600/30"
        >
          {ctaLabel}
        </Link>
        <Link to={`/paths/${pathway.slug}`} className="text-[11px] font-medium text-zinc-400 hover:text-zinc-200">
          Details
        </Link>
      </div>
      <p className="mt-2 text-[10px] text-zinc-600">Progress merges this device with your account when signed in.</p>
    </li>
  )
}

/**
 * Read-only pathway progress: local + Supabase flagship_course_progress when available.
 * `browse` layout: featured grid only (no “your pathway” reordering) for embedding under pathway-first hub.
 */
export function DashboardPathwaysPanel({ layoutMode = 'default' }: { layoutMode?: 'default' | 'browse' }) {
  const browseMode = layoutMode === 'browse'
  const { user, supabase } = useAuth()
  const { selectedPathwaySlug } = useSelectedPathway()
  const baseFeatured = featuredEmployablePathways().slice(0, 4)
  const selected = browseMode ? null : selectedPathwaySlug ? getPathwayBySlug(selectedPathwaySlug) : null
  const selectedOk = !browseMode && Boolean(selected && canLearnerSelectPathwayAsPrimary(selected))
  const featured = useMemo(() => {
    if (browseMode) return baseFeatured
    if (!selectedOk || !selected) return baseFeatured
    const rest = baseFeatured.filter((p) => p.slug !== selected.slug)
    return [selected, ...rest].slice(0, 4)
  }, [baseFeatured, browseMode, selected, selectedOk])

  const pathwaySync: PathwayProgressSyncContext = useMemo(() => {
    if (!user || !supabase || !isSupabaseConfigured()) return null
    return { supabase, userId: user.id }
  }, [user, supabase])

  const unionSlugs = useMemo(() => {
    const s = new Set<string>()
    for (const p of featured) {
      for (const slug of p.includedCourseSlugs) {
        if (isFlagshipCoursePublished(slug)) s.add(slug)
      }
    }
    return [...s]
  }, [featured])

  const { bySlug, hydrated } = useRemoteFlagshipProgressBySlugs(unionSlugs, pathwaySync)
  const applyRemote = Boolean(pathwaySync) && hydrated

  const [tick, refresh] = useReducer((n: number) => n + 1, 0)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const on = () => refresh()
    window.addEventListener(FLAGSHIP_PROGRESS_EVENT, on as EventListener)
    return () => window.removeEventListener(FLAGSHIP_PROGRESS_EVENT, on as EventListener)
  }, [])

  const top = useMemo(() => {
    void tick
    return pickTopPathway(featured, (p) => buildMergedPathwayProgressMap(p, bySlug, applyRemote))
  }, [featured, bySlug, applyRemote, tick])

  const cardMaps = useMemo(() => {
    void tick
    return featured.map((p) => ({
      pathway: p,
      progressBySlug: buildMergedPathwayProgressMap(p, bySlug, applyRemote),
    }))
  }, [featured, bySlug, applyRemote, tick])

  return (
    <section
      className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04] sm:col-span-2"
      data-testid="dashboard-pathways-panel"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
            {browseMode ? 'Explore pathways' : 'Employable pathways'}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            {browseMode
              ? 'Compare featured tracks and open details when you want deeper context on practical skills and portfolio-ready proof.'
              : 'Pathways sequence flagship courses and portfolio-ready outputs to support certificate readiness—without claiming job placement.'}
          </p>
          {pathwaySync && !hydrated ? (
            <p className="mt-2 text-[10px] text-zinc-500">Loading account progress…</p>
          ) : null}
          {!browseMode && selectedOk && selected ? (
            <p className="mt-2 text-[11px] text-zinc-500">
              <span className="font-semibold text-violet-200">Your pathway: </span>
              {selected.shortTitle} — open details to continue or change your primary pathway from the pathways hub.
            </p>
          ) : !browseMode && top ? (
            <p className="mt-2 text-[11px] text-zinc-500">
              <span className="font-semibold text-zinc-300">Top match: </span>
              {top.pathway.shortTitle} (~{top.summary.pathwaySessionProgressPercent}% across included courses)
            </p>
          ) : null}
        </div>
        <Link
          to={LEGAL_ROUTES.paths}
          className="shrink-0 rounded-lg border border-white/[0.08] px-3 py-1.5 text-[11px] font-semibold text-zinc-200 hover:border-violet-400/25 hover:bg-white/[0.04]"
        >
          All pathways
        </Link>
      </div>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {cardMaps.map(({ pathway, progressBySlug }) => (
          <PathwayCard
            key={pathway.slug}
            pathway={pathway}
            progressBySlug={progressBySlug}
            variant={!browseMode && selectedOk && selected?.slug === pathway.slug ? 'your_pathway' : 'default'}
          />
        ))}
      </ul>
    </section>
  )
}
