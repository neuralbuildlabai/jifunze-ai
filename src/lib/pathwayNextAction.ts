/**
 * Pure helpers for pathway CTAs, progress summaries, and next-step routing.
 * Progress input is explicit per-course state — callers load from localStorage / merge remote as needed.
 */

import type { EmployablePathway } from '../data/learning/employablePathwaysTypes'
import { FLAGSHIP_COURSES } from '../data/learning/flagshipCoursesCatalog'
import { getFlagshipCurriculum } from '../data/learning/flagshipCourseCurricula'
import { buildSessionsForCurriculum, type FlagshipSession } from '../data/learning/flagshipCourseSessions'
import { portfolioOutputsForPathway } from '../data/learning/portfolioOutputsCatalog'
import {
  completionSet,
  findNextFlagshipResumeSession,
  isFlagshipCertificateReady,
  masteryCheckpointCompletionSet,
  type FlagshipCourseProgressState,
} from './flagshipCourseProgressDerived'
import { getFlagshipCourseDisplayProgressPercent } from './aiEssentialsProgressMilestones'
import { defaultFlagshipProgress, loadFlagshipCourseProgress } from './flagshipCourseLocalProgress'
import { isFlagshipCoursePublished } from './pathwayProgressDerived'

export type PathwayAvailableCourse = {
  slug: string
  title: string
  /** Order within the pathway’s `includedCourseSlugs` (0-based). */
  orderInPathway: number
}

export type PathwayProgressSummary = {
  availableCourseCount: number
  startedCourseCount: number
  completedCourseCount: number
  plannedCourseCount: number
  /** Average session completion across included **available** courses only (0–100). */
  pathwaySessionProgressPercent: number
  portfolioOutputTotal: number
  portfolioRequiredCount: number
  portfolioOptionalCount: number
  /** Short learner-facing line for summary cards. */
  recommendedNextActionLabel: string
  /** True when every available course meets certificate-ready rules (local state only). */
  allAvailableCoursesCertificateReady: boolean
}

export type PathwayNextAction =
  | {
      kind: 'resume_session'
      href: string
      courseSlug: string
      sessionId: string
      buttonLabel: string
    }
  | {
      kind: 'start_first_session'
      href: string
      courseSlug: string
      sessionId: string
      buttonLabel: string
    }
  | {
      kind: 'course_detail_fallback'
      href: string
      courseSlug: string
      buttonLabel: string
    }
  | {
      kind: 'pathway_explore_more'
      href: string
      buttonLabel: string
    }
  | {
      kind: 'planned_only'
      message: string
      hrefExplore: string
      buttonLabel: string
    }

function courseState(progressBySlug: Record<string, FlagshipCourseProgressState> | undefined, slug: string): FlagshipCourseProgressState {
  const raw = progressBySlug?.[slug]
  return raw && raw.version === 1 ? raw : defaultFlagshipProgress()
}

/** Snapshot of local flagship progress for every published course in the pathway (for pure helpers / pickTopPathway). */
export function buildLocalProgressMapForPathway(pathway: EmployablePathway): Record<string, FlagshipCourseProgressState> {
  const m: Record<string, FlagshipCourseProgressState> = {}
  for (const slug of pathway.includedCourseSlugs) {
    if (isFlagshipCoursePublished(slug)) {
      m[slug] = loadFlagshipCourseProgress(slug)
    }
  }
  return m
}

/** Published flagship courses listed on the pathway, in pathway order. */
export function getPathwayAvailableCourses(pathway: EmployablePathway): PathwayAvailableCourse[] {
  const out: PathwayAvailableCourse[] = []
  pathway.includedCourseSlugs.forEach((slug, orderInPathway) => {
    if (!isFlagshipCoursePublished(slug)) return
    const meta = FLAGSHIP_COURSES.find((c) => c.slug === slug)
    out.push({ slug, title: meta?.title ?? slug, orderInPathway })
  })
  return out
}

function firstSessionHref(courseSlug: string): { href: string; sessionId: string } | null {
  const curriculum = getFlagshipCurriculum(courseSlug)
  if (!curriculum) return null
  const sessions = buildSessionsForCurriculum(curriculum)
  if (!sessions.length) return null
  const ordered = [...sessions].sort((a, b) => a.orderInCourse - b.orderInCourse)
  const first = ordered[0]
  return { href: `/learn/courses/${courseSlug}/session/${first.id}`, sessionId: first.id }
}

/** Aggregate progress for pathway cards and detail summaries. */
export function getPathwayProgressSummary(
  pathway: EmployablePathway,
  progressBySlug: Record<string, FlagshipCourseProgressState> | undefined,
): PathwayProgressSummary {
  const available = getPathwayAvailableCourses(pathway)
  const outputs = portfolioOutputsForPathway(pathway.slug)
  const required = outputs.filter((o) => o.requiredForCertificate)
  const optional = outputs.filter((o) => !o.requiredForCertificate)

  let sumFrac = 0
  let started = 0
  let completed = 0

  for (const { slug } of available) {
    const curriculum = getFlagshipCurriculum(slug)
    const sessions = curriculum ? buildSessionsForCurriculum(curriculum) : []
    const state = courseState(progressBySlug, slug)
    const done = completionSet(state)
    const frac = sessions.length ? getFlagshipCourseDisplayProgressPercent(slug, curriculum, sessions, state) / 100 : 0
    sumFrac += frac
    if (done.size > 0 || Boolean(state.startedAt)) started += 1
    if (curriculum && sessions.length) {
      const ck = masteryCheckpointCompletionSet(state)
      if (isFlagshipCertificateReady(curriculum, sessions, done, ck, state)) completed += 1
    }
  }

  const n = available.length
  const pathwaySessionProgressPercent = n ? Math.round((sumFrac / n) * 100) : 0
  const allCert = n > 0 && completed === n

  const next = getPathwayNextAction(pathway, progressBySlug)
  let recommendedNextActionLabel = 'Open the pathway overview'
  if (next.kind === 'resume_session') recommendedNextActionLabel = 'Continue where you left off in this pathway'
  else if (next.kind === 'start_first_session') recommendedNextActionLabel = 'Start with the first session in this pathway'
  else if (next.kind === 'course_detail_fallback') recommendedNextActionLabel = 'Open your next course from this pathway'
  else if (next.kind === 'pathway_explore_more') recommendedNextActionLabel = 'Explore more pathways'
  else if (next.kind === 'planned_only') recommendedNextActionLabel = 'This pathway is still being prepared'

  return {
    availableCourseCount: n,
    startedCourseCount: started,
    completedCourseCount: completed,
    plannedCourseCount: pathway.plannedCourseSlugs.length,
    pathwaySessionProgressPercent,
    portfolioOutputTotal: outputs.length,
    portfolioRequiredCount: required.length,
    portfolioOptionalCount: optional.length,
    recommendedNextActionLabel,
    allAvailableCoursesCertificateReady: allCert,
  }
}

/**
 * Next CTA destination for a learner with the given per-course progress map.
 * Falls back to course detail when resume session cannot be derived.
 */
export function getPathwayNextAction(
  pathway: EmployablePathway,
  progressBySlug: Record<string, FlagshipCourseProgressState> | undefined,
): PathwayNextAction {
  const available = getPathwayAvailableCourses(pathway)
  if (!available.length) {
    return {
      kind: 'planned_only',
      message:
        'This pathway is being prepared: there are no published flagship courses linked yet. Explore other pathways or the course catalog for available learning.',
      hrefExplore: '/paths',
      buttonLabel: 'Explore available pathways',
    }
  }

  let firstIncompleteSlug: string | null = null
  let resume: { slug: string; session: FlagshipSession } | null = null

  for (const { slug } of available) {
    const curriculum = getFlagshipCurriculum(slug)
    if (!curriculum) continue
    const sessions = buildSessionsForCurriculum(curriculum)
    if (!sessions.length) continue
    const state = courseState(progressBySlug, slug)
    const completed = completionSet(state)
    const ck = masteryCheckpointCompletionSet(state)
    const next = findNextFlagshipResumeSession(curriculum, sessions, completed, ck, state)
    if (next) {
      firstIncompleteSlug = slug
      resume = { slug, session: next }
      break
    }
    const cert = isFlagshipCertificateReady(curriculum, sessions, completed, ck, state)
    if (!cert) firstIncompleteSlug = firstIncompleteSlug ?? slug
  }

  if (resume) {
    return {
      kind: 'resume_session',
      href: `/learn/courses/${resume.slug}/session/${resume.session.id}`,
      courseSlug: resume.slug,
      sessionId: resume.session.id,
      buttonLabel: 'Continue pathway',
    }
  }

  const allCert = available.every(({ slug }) => {
    const curriculum = getFlagshipCurriculum(slug)
    if (!curriculum) return false
    const sessions = buildSessionsForCurriculum(curriculum)
    const state = courseState(progressBySlug, slug)
    const completed = completionSet(state)
    const ck = masteryCheckpointCompletionSet(state)
    return isFlagshipCertificateReady(curriculum, sessions, completed, ck, state)
  })

  if (allCert && available.length) {
    return {
      kind: 'pathway_explore_more',
      href: '/paths',
      buttonLabel: 'Explore more pathways',
    }
  }

  const first = available[0]
  const startedAny = available.some(({ slug }) => {
    const st = courseState(progressBySlug, slug)
    return completionSet(st).size > 0 || Boolean(st.startedAt)
  })

  if (!startedAny) {
    const start = firstSessionHref(first.slug)
    if (start) {
      return {
        kind: 'start_first_session',
        href: start.href,
        courseSlug: first.slug,
        sessionId: start.sessionId,
        buttonLabel: 'Start pathway',
      }
    }
    return {
      kind: 'course_detail_fallback',
      href: `/learn/courses/${first.slug}`,
      courseSlug: first.slug,
      buttonLabel: 'Start pathway',
    }
  }

  const fallbackSlug = firstIncompleteSlug ?? first.slug
  return {
    kind: 'course_detail_fallback',
    href: `/learn/courses/${fallbackSlug}`,
    courseSlug: fallbackSlug,
    buttonLabel: 'Continue pathway',
  }
}

export type ScoredPathway = {
  pathway: EmployablePathway
  score: number
  summary: PathwayProgressSummary
}

/** Rank pathways for “top pick” panels: prefer started + higher session %. */
export function scorePathwaysForLearner(
  pathways: EmployablePathway[],
  getProgressMap: (pathway: EmployablePathway) => Record<string, FlagshipCourseProgressState>,
): ScoredPathway[] {
  return pathways.map((pathway) => {
    const map = getProgressMap(pathway)
    const summary = getPathwayProgressSummary(pathway, map)
    const score = summary.startedCourseCount * 1000 + summary.pathwaySessionProgressPercent
    return { pathway, score, summary }
  })
}

/** Highest-ranked pathway for dashboard/home highlights. */
export function pickTopPathway(
  pathways: EmployablePathway[],
  getProgressMap: (pathway: EmployablePathway) => Record<string, FlagshipCourseProgressState>,
): ScoredPathway | null {
  const scored = scorePathwaysForLearner(pathways, getProgressMap)
  if (!scored.length) return null
  scored.sort((a, b) => b.score - a.score)
  return scored[0] ?? null
}
