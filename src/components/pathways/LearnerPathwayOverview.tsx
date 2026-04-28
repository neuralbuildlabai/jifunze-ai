import { useEffect, useMemo, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import {
  canLearnerSelectPathwayAsPrimary,
  featuredEmployablePathways,
  getPathwayBySlug,
} from '../../data/learning/employablePathwaysCatalog'
import type { EmployablePathway } from '../../data/learning/employablePathwaysTypes'
import { useRemoteFlagshipProgressBySlugs, type PathwayProgressSyncContext } from '../../hooks/usePathwayProgressMap'
import { FLAGSHIP_PROGRESS_EVENT } from '../../lib/flagshipCourseLocalProgress'
import type { FlagshipCourseProgressState } from '../../lib/flagshipCourseProgressDerived'
import { buildMergedPathwayProgressMap } from '../../lib/pathwayMergedProgressMap'
import {
  getPathwayNextAction,
  getPathwayProgressSummary,
  pickTopPathway,
} from '../../lib/pathwayNextAction'
import { isFlagshipCoursePublished } from '../../lib/pathwayProgressDerived'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { useSelectedPathway } from '../../hooks/useSelectedPathway'

function PathwayHomeCard({
  pathway,
  progressBySlug,
  emphasize,
  variant = 'default',
}: {
  pathway: EmployablePathway
  progressBySlug: Record<string, FlagshipCourseProgressState>
  emphasize?: boolean
  variant?: 'default' | 'your_pathway'
}) {
  const summary = getPathwayProgressSummary(pathway, progressBySlug)
  const action = getPathwayNextAction(pathway, progressBySlug)
  const ctaHref = action.kind === 'planned_only' ? action.hrefExplore : action.href
  const primaryCtaLabel =
    variant === 'your_pathway'
      ? action.kind === 'start_first_session'
        ? 'Start your pathway'
        : action.kind === 'resume_session' || action.kind === 'course_detail_fallback'
          ? 'Continue your pathway'
          : action.buttonLabel
      : action.buttonLabel

  return (
    <li
      className={`rounded-xl border px-3 py-3 ${
        variant === 'your_pathway' || emphasize
          ? 'border-violet-500/30 bg-violet-950/20'
          : 'border-white/[0.06] bg-zinc-950/25'
      }`}
    >
      {variant === 'your_pathway' ? (
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-300/90">Your selected pathway</p>
      ) : null}
      <Link to={`/paths/${pathway.slug}`} className="text-[13px] font-medium text-zinc-100 hover:text-violet-200">
        {pathway.shortTitle}
      </Link>
      <p className="mt-2 text-[11px] leading-snug text-zinc-500 sm:text-xs">
        ~{summary.pathwaySessionProgressPercent}% sessions · {summary.completedCourseCount}/{summary.availableCourseCount || 0} cert-ready
      </p>
      <p className="mt-1 text-[11px] text-zinc-500">
        <span className="text-zinc-400">Next: </span>
        {summary.recommendedNextActionLabel}
      </p>
      <div className="mt-2 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
        <Link to={ctaHref} className="inline-block text-[11px] font-semibold text-violet-200 hover:text-violet-100">
          {primaryCtaLabel} →
        </Link>
        {variant === 'your_pathway' ? (
          <Link
            to={LEGAL_ROUTES.paths}
            className="text-[11px] font-medium text-zinc-500 underline-offset-2 hover:text-zinc-300 hover:underline"
          >
            Change pathway
          </Link>
        ) : null}
      </div>
    </li>
  )
}

/** Signed-in home strip — merges local flagship progress with account when Supabase is configured. */
export function LearnerPathwayOverview() {
  const { user, supabase } = useAuth()
  const { selectedPathwaySlug } = useSelectedPathway()
  const basePicks = featuredEmployablePathways().slice(0, 3)
  const selected = selectedPathwaySlug ? getPathwayBySlug(selectedPathwaySlug) : null
  const selectedOk = Boolean(selected && canLearnerSelectPathwayAsPrimary(selected))
  const picks = useMemo(() => {
    if (!selectedOk || !selected) return basePicks
    const rest = basePicks.filter((p) => p.slug !== selected.slug)
    return [selected, ...rest].slice(0, 3)
  }, [basePicks, selected, selectedOk])

  const pathwaySync: PathwayProgressSyncContext = useMemo(() => {
    if (!user || !supabase || !isSupabaseConfigured()) return null
    return { supabase, userId: user.id }
  }, [user, supabase])

  const unionSlugs = useMemo(() => {
    const s = new Set<string>()
    for (const p of picks) {
      for (const slug of p.includedCourseSlugs) {
        if (isFlagshipCoursePublished(slug)) s.add(slug)
      }
    }
    return [...s]
  }, [picks])

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
    return pickTopPathway(picks, (p) => buildMergedPathwayProgressMap(p, bySlug, applyRemote))
  }, [picks, bySlug, applyRemote, tick])

  const cardMaps = useMemo(() => {
    void tick
    return picks.map((p) => ({
      pathway: p,
      progressBySlug: buildMergedPathwayProgressMap(p, bySlug, applyRemote),
    }))
  }, [picks, bySlug, applyRemote, tick])

  return (
    <section className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Employable pathways</p>
          <h2 className="mt-1 text-sm font-semibold text-white">Build proof along a pathway</h2>
          <p className="mt-2 max-w-2xl text-[12px] leading-relaxed text-zinc-500">
            Pathways prepare you for roles and portfolios by sequencing flagship courses. When you are signed in, we merge account progress with this device for
            certificate readiness context—not a transcript or job guarantee.
          </p>
          {pathwaySync && !hydrated ? (
            <p className="mt-2 text-[10px] text-zinc-500">Loading account progress…</p>
          ) : null}
        </div>
        <Link
          to={LEGAL_ROUTES.paths}
          className="rounded-full border border-white/[0.1] px-3 py-1.5 text-[11px] font-semibold text-zinc-200 hover:bg-white/[0.05]"
        >
          Browse pathways
        </Link>
      </div>
      {selectedOk && selected ? (
        <p className="mt-3 text-[11px] text-zinc-400">
          <span className="font-semibold text-violet-200">Your selected pathway: </span>
          {selected.shortTitle}. Use Continue your pathway for the next session, or change your primary pathway from the hub.
        </p>
      ) : top ? (
        <p className="mt-3 text-[11px] text-zinc-400">
          <span className="font-semibold text-zinc-200">Recommended: </span>
          {top.pathway.shortTitle} — continue where you have the most momentum, or open details to see portfolio-ready outputs.
        </p>
      ) : null}
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {cardMaps.map(({ pathway, progressBySlug }) => {
          const isYour = selectedOk && selected?.slug === pathway.slug
          return (
            <PathwayHomeCard
              key={pathway.slug}
              pathway={pathway}
              progressBySlug={progressBySlug}
              emphasize={!selectedOk && top?.pathway.slug === pathway.slug}
              variant={isYour ? 'your_pathway' : 'default'}
            />
          )
        })}
      </ul>
    </section>
  )
}
