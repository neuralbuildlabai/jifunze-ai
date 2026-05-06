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
      className={`rounded-2xl border px-4 py-4 shadow-[var(--jf-shadow-soft)] transition hover:border-stone-300/70 ${
        variant === 'your_pathway' || emphasize
          ? 'border-orange-300/70 bg-orange-50/95 ring-2 ring-orange-200/50'
          : 'border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] ring-1 ring-stone-900/[0.04]'
      }`}
    >
      {variant === 'your_pathway' ? (
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-orange-900/80">Your selected pathway</p>
      ) : null}
      <Link to={`/paths/${pathway.slug}`} className="text-[13px] font-medium text-[color:var(--jf-text)] hover:text-[color:var(--jf-brand)]">
        {pathway.shortTitle}
      </Link>
      <p className="mt-2 text-[11px] leading-snug text-[color:var(--jf-muted)] sm:text-xs">
        About {summary.pathwaySessionProgressPercent}% through · {summary.completedCourseCount}/{summary.availableCourseCount || 0} courses
      </p>
      <p className="mt-1 text-[11px] text-[color:var(--jf-muted)]">
        <span className="text-[color:var(--jf-subtle)]">Next: </span>
        {summary.recommendedNextActionLabel}
      </p>
      <div className="mt-2 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
        <Link to={ctaHref} className="inline-block text-[11px] font-semibold text-[color:var(--jf-brand)] hover:text-[color:var(--jf-brand-hover)]">
          {primaryCtaLabel} →
        </Link>
        {variant === 'your_pathway' ? (
          <Link
            to={LEGAL_ROUTES.paths}
            className="text-[11px] font-medium text-[color:var(--jf-muted)] underline-offset-2 hover:text-[color:var(--jf-text)] hover:underline"
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
    <section className="jf-learn-warm mt-8 rounded-2xl border border-[color:var(--jf-border)] bg-[var(--jf-bg-page)] p-5 shadow-[var(--jf-shadow-soft)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">Employable pathways</p>
          <h2 className="mt-1 text-sm font-semibold text-[color:var(--jf-text)]">Your pathway</h2>
          <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-[color:var(--jf-muted)]">
            Signed-in progress syncs with your account when available—not a transcript or job guarantee.
          </p>
          {pathwaySync && !hydrated ? (
            <p className="mt-2 text-[10px] text-[color:var(--jf-subtle)]">Loading account progress…</p>
          ) : null}
        </div>
        <Link
          to={LEGAL_ROUTES.paths}
          className="rounded-full border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-3 py-1.5 text-[11px] font-semibold text-[color:var(--jf-text)] shadow-sm transition hover:bg-stone-50"
        >
          Browse pathways
        </Link>
      </div>
      {selectedOk && selected ? (
        <p className="mt-3 text-[11px] text-[color:var(--jf-muted)]">
          <span className="font-semibold text-[color:var(--jf-brand)]">Selected: </span>
          {selected.shortTitle}. Continue below or change pathway anytime.
        </p>
      ) : top ? (
        <p className="mt-3 text-[11px] text-[color:var(--jf-muted)]">
          <span className="font-semibold text-[color:var(--jf-text)]">Suggested: </span>
          {top.pathway.shortTitle} — strong fit for where you’re learning now.
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
