import type { SupabaseClient } from '@supabase/supabase-js'
import { findStandaloneCourseBySlug } from '../data/courses'
import { getStandaloneLessonPath, getStandaloneLessonSlug } from '../data/courses/standaloneCourseLearnPaths'
import { PRACTICAL_MATH_INTERNAL_KEY, PRACTICAL_MATH_SLUG } from '../data/courses/practicalMathematicsCourseConstants'
import type { PracticalMathematicsCourse } from '../data/courses/practicalMathematicsCourseTypes'
import {
  findNextPracticalMathModule,
  lessonKey,
  type PracticalMathProgressState,
} from '../data/courses/practicalMathematicsProgression'
import { FREE_STARTER_RISE_COURSES } from '../data/learning/freeStarterRiseCoursesCatalog'
import { FLAGSHIP_SCHOOLS, getFlagshipCourseBySlug } from '../data/learning/flagshipCoursesCatalog'
import { getFlagshipCurriculum } from '../data/learning/flagshipCourseCurricula'
import { buildSessionsForCurriculum } from '../data/learning/flagshipCourseSessions'
import {
  nextWellbeingDaySlug,
  WELLBEING_RESET_COURSE_SLUG,
  WELLBEING_RESET_DAY_SLUGS,
  wellbeingDayAnchor,
  wellbeingProgressPercent,
} from '../data/learning/wellbeingResetProgressPlan'
import { isFlagshipCoursePublished } from './pathwayProgressDerived'
import { getFlagshipCourseDisplayProgressPercent } from './aiEssentialsProgressMilestones'
import {
  capstonePrepAccessible,
  completionSet,
  findNextFlagshipResumeSession,
  masteryCheckpointCompletionSet,
  nextResumeLabel,
  type FlagshipCourseProgressState,
} from './flagshipCourseProgressDerived'
import { mergeLocalRemoteReconciledForSlug } from './flagshipCourseProgressLocalRemoteMerge'
import { readStandaloneCourseProgressFromStorage } from './practicalMathProgressStorage'
import { isRisePilotCourseLearnerComplete, markRisePilotCourseLearnerComplete } from './risePilotCourseProgress'
import {
  fetchFlagshipProgressRowsForUser,
  flagshipProgressRowToState,
  type FlagshipCourseProgressRow,
} from '../services/learning/flagshipCourseProgressRemote'
import {
  fetchLearnerSelfPacedRow,
  fetchLearnerSelfPacedRowsForUser,
  upsertLearnerSelfPacedProgress,
  type LearnerSelfPacedProgressRow,
  type LearnerSelfPacedStatus,
  type LearnerSelfPacedUpsertPatch,
} from '../services/learning/learnerSelfPacedProgressRemote'
import { sessionOpenForLearner } from '../learner/flagshipSessionPrereq'

export type LearnerUnifiedCourseKind = 'flagship' | 'self_paced' | 'standalone_local'

export type LearnerUnifiedActiveCourse = {
  kind: LearnerUnifiedCourseKind
  slug: string
  title: string
  category: string
  progressPercent: number
  lastOpenedAt: string | null
  lastActivityAt: string | null
  currentLabel: string | null
  nextLabel: string | null
  resumeHref: string
  resumeCta: string
  status: LearnerSelfPacedStatus | 'in_progress' | 'completed'
}

export type LearnerResumeTarget = {
  href: string
  cta: string
}

/** Fired after learner self-paced progress changes (e.g. wellbeing day complete). */
export const LEARNER_PROGRESS_HUB_EVENT = 'jifunze:learner-progress-hub' as const

export function emitLearnerProgressHubEvent(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(LEARNER_PROGRESS_HUB_EVENT))
}

function flagshipRowHasActivity(row: FlagshipCourseProgressRow): boolean {
  return (
    (row.completed_session_ids?.length ?? 0) > 0 ||
    Boolean(row.last_active_session_id) ||
    Boolean(row.started_at)
  )
}

function selfPacedRowHasActivity(row: LearnerSelfPacedProgressRow): boolean {
  if (row.status === 'completed' || row.status === 'certified' || row.status === 'certificate_eligible') return true
  if (row.status === 'in_progress' || row.status === 'enrolled') return true
  if ((row.progress_percentage ?? 0) > 0) return true
  if (row.started_at || row.last_opened_at || row.last_activity_at) return true
  if ((row.completed_days?.length ?? 0) > 0) return true
  if ((row.completed_modules?.length ?? 0) > 0) return true
  if ((row.completed_sessions?.length ?? 0) > 0) return true
  return false
}

export function catalogSlugForInteractiveProgressKey(internalKey: string): string | undefined {
  return FREE_STARTER_RISE_COURSES.find((c) => c.progressInternalKey === internalKey)?.slug
}

export async function migrateLocalInteractiveStartersToSupabase(
  supabase: SupabaseClient,
  userId: string,
): Promise<void> {
  const now = new Date().toISOString()
  for (const c of FREE_STARTER_RISE_COURSES) {
    const local = readStandaloneCourseProgressFromStorage(c.progressInternalKey)
    const sessionStarted = local.completedLessonKeys.has(c.progressSessionStartedMarker)
    const done = isRisePilotCourseLearnerComplete(c.progressInternalKey)
    if (!sessionStarted && !done) continue

    const existing = await fetchLearnerSelfPacedRow(supabase, userId, c.slug)
    const completedDays =
      c.slug === WELLBEING_RESET_COURSE_SLUG && done ? [...WELLBEING_RESET_DAY_SLUGS] : (existing?.completed_days ?? [])

    const pct =
      c.slug === WELLBEING_RESET_COURSE_SLUG
        ? wellbeingProgressPercent(completedDays)
        : done
          ? 100
          : Math.max(existing?.progress_percentage ?? 0, sessionStarted ? 5 : 0)

    const status: LearnerSelfPacedStatus = done || pct >= 100 ? 'completed' : 'in_progress'

    await upsertLearnerSelfPacedProgress(supabase, userId, c.slug, {
      started_at: existing?.started_at ?? now,
      last_opened_at: existing?.last_opened_at ?? now,
      last_activity_at: existing?.last_activity_at ?? now,
      status,
      progress_percentage: Math.min(100, pct),
      completed_days: c.slug === WELLBEING_RESET_COURSE_SLUG ? completedDays : existing?.completed_days ?? [],
      current_day_slug:
        c.slug === WELLBEING_RESET_COURSE_SLUG
          ? existing?.current_day_slug ?? null
          : existing?.current_day_slug ?? (sessionStarted && !done ? 'flow-1' : null),
      certificate_eligible: done ? true : existing?.certificate_eligible ?? false,
      completed_at: done ? existing?.completed_at ?? now : existing?.completed_at ?? null,
    })
  }
}

export async function saveLearnerCourseActivity(
  supabase: SupabaseClient,
  userId: string,
  courseSlug: string,
  activity: {
    moduleSlug?: string | null
    sessionSlug?: string | null
    daySlug?: string | null
    markOpened?: boolean
  },
): Promise<void> {
  const now = new Date().toISOString()
  const existing = await fetchLearnerSelfPacedRow(supabase, userId, courseSlug)
  const patch: LearnerSelfPacedUpsertPatch = {
    last_activity_at: now,
    started_at: existing?.started_at ?? now,
    status: 'in_progress',
  }
  if (activity.markOpened !== false) {
    patch.last_opened_at = now
  }
  if (activity.moduleSlug !== undefined) patch.current_module_slug = activity.moduleSlug
  if (activity.sessionSlug !== undefined) patch.current_session_slug = activity.sessionSlug
  if (activity.daySlug !== undefined) patch.current_day_slug = activity.daySlug

  await upsertLearnerSelfPacedProgress(supabase, userId, courseSlug, patch)
  emitLearnerProgressHubEvent()
}

export async function markLearnerDayComplete(
  supabase: SupabaseClient,
  userId: string,
  courseSlug: string,
  daySlug: string,
): Promise<void> {
  if (courseSlug !== WELLBEING_RESET_COURSE_SLUG) return
  if (!WELLBEING_RESET_DAY_SLUGS.includes(daySlug as (typeof WELLBEING_RESET_DAY_SLUGS)[number])) return

  const now = new Date().toISOString()
  const existing = await fetchLearnerSelfPacedRow(supabase, userId, courseSlug)
  const days = new Set(existing?.completed_days ?? [])
  days.add(daySlug)
  const list = WELLBEING_RESET_DAY_SLUGS.filter((d) => days.has(d))
  const pct = wellbeingProgressPercent(list)
  const complete = pct >= 100

  await upsertLearnerSelfPacedProgress(supabase, userId, courseSlug, {
    started_at: existing?.started_at ?? now,
    last_activity_at: now,
    last_completed_day_slug: daySlug,
    completed_days: list,
    progress_percentage: pct,
    current_day_slug: nextWellbeingDaySlug(list) ?? daySlug,
    status: complete ? 'completed' : 'in_progress',
    completed_at: complete ? existing?.completed_at ?? now : null,
    certificate_eligible: complete ? true : existing?.certificate_eligible ?? false,
  })
  emitLearnerProgressHubEvent()
}

export async function markFreeStarterCourseComplete(
  supabase: SupabaseClient | null,
  userId: string | undefined,
  courseSlug: string,
): Promise<void> {
  const starter = FREE_STARTER_RISE_COURSES.find((c) => c.slug === courseSlug)
  if (!starter || courseSlug === WELLBEING_RESET_COURSE_SLUG) return

  markRisePilotCourseLearnerComplete(starter.progressInternalKey)

  if (!supabase || !userId) {
    emitLearnerProgressHubEvent()
    return
  }

  const now = new Date().toISOString()
  const existing = await fetchLearnerSelfPacedRow(supabase, userId, courseSlug)
  await upsertLearnerSelfPacedProgress(supabase, userId, courseSlug, {
    started_at: existing?.started_at ?? now,
    last_opened_at: existing?.last_opened_at ?? now,
    last_activity_at: now,
    status: 'completed',
    progress_percentage: 100,
    completed_at: existing?.completed_at ?? now,
    certificate_eligible: existing?.certificate_eligible ?? false,
  })
  emitLearnerProgressHubEvent()
}

export function practicalMathResumePath(course: PracticalMathematicsCourse, progress: PracticalMathProgressState): string {
  const slug = PRACTICAL_MATH_SLUG
  const nextMod = findNextPracticalMathModule(course, progress)
  if (!nextMod) {
    return `/learn/${slug}`
  }
  const incomplete = nextMod.lessons.find(
    (l) => !progress.completedLessonKeys.has(lessonKey(nextMod, l.lessonNumber)),
  )
  const target = incomplete ?? nextMod.lessons[0]
  if (!target) {
    return `/learn/${slug}/modules/${nextMod.slug}`
  }
  return getStandaloneLessonPath(slug, nextMod.slug, getStandaloneLessonSlug(target))
}

export async function getLearnerResumeTarget(
  supabase: SupabaseClient | null,
  userId: string | undefined,
  courseSlug: string,
): Promise<LearnerResumeTarget> {
  const catalogEntry = findStandaloneCourseBySlug(courseSlug)
  const practical = catalogEntry?.source as PracticalMathematicsCourse | undefined

  if (practical && courseSlug === PRACTICAL_MATH_SLUG) {
    const local = readStandaloneCourseProgressFromStorage(PRACTICAL_MATH_INTERNAL_KEY)
    const href = practicalMathResumePath(practical, local)
    const done = !findNextPracticalMathModule(practical, local)
    return {
      href,
      cta: done ? 'Review course' : local.completedLessonKeys.size > 0 ? 'Resume course' : 'Start course',
    }
  }

  const freeStarter = FREE_STARTER_RISE_COURSES.find((c) => c.slug === courseSlug)
  if (freeStarter) {
    const local = readStandaloneCourseProgressFromStorage(freeStarter.progressInternalKey)
    const localDone = isRisePilotCourseLearnerComplete(freeStarter.progressInternalKey)
    const localStarted = local.completedLessonKeys.has(freeStarter.progressSessionStartedMarker)

    let row: LearnerSelfPacedProgressRow | null = null
    if (supabase && userId) {
      row = await fetchLearnerSelfPacedRow(supabase, userId, courseSlug)
    }

    const completedDays = row?.completed_days ?? []
    const pct = courseSlug === WELLBEING_RESET_COURSE_SLUG ? wellbeingProgressPercent(completedDays) : row?.progress_percentage ?? (localDone ? 100 : localStarted ? 5 : 0)

    const complete = localDone || pct >= 100 || row?.status === 'completed'
    if (courseSlug === WELLBEING_RESET_COURSE_SLUG) {
      const nextDay = nextWellbeingDaySlug(completedDays)
      const anchor =
        complete || !nextDay
          ? '#course-player'
          : `${wellbeingDayAnchor(nextDay)}`
      const href = `${freeStarter.publicRoute}${anchor}`
      return {
        href,
        cta: complete ? 'Review course' : localStarted || (row && selfPacedRowHasActivity(row)) ? 'Resume course' : 'Start course',
      }
    }

    const nSteps = freeStarter.lessonsIncluded.length
    let anchor = '#course-player'
    if (!complete) {
      const cur = row?.current_day_slug
      if (cur && /^flow-\d+$/.test(cur)) {
        const num = Number.parseInt(cur.replace(/^flow-/, ''), 10)
        if (Number.isFinite(num) && num >= 1 && num <= nSteps) {
          anchor = `#${cur}`
        }
      }
    }
    const href = `${freeStarter.publicRoute}${anchor}`
    const started = localStarted || Boolean(row && selfPacedRowHasActivity(row))
    return {
      href,
      cta: complete ? 'Review course' : started ? 'Resume course' : 'Start course',
    }
  }

  const flagshipCourse = getFlagshipCourseBySlug(courseSlug)
  const curriculum = getFlagshipCurriculum(courseSlug)
  if (flagshipCourse && curriculum && isFlagshipCoursePublished(courseSlug)) {
    const applyRemote = Boolean(supabase && userId)
    let remote: FlagshipCourseProgressState | null = null
    if (supabase && userId) {
      const rows = await fetchFlagshipProgressRowsForUser(supabase, userId, 48)
      const hit = rows.find((r) => r.course_slug === courseSlug)
      remote = hit ? flagshipProgressRowToState(hit) : null
    }
    const state = mergeLocalRemoteReconciledForSlug(courseSlug, remote, applyRemote)
    const sessions = buildSessionsForCurriculum(curriculum)
    const completed = completionSet(state)
    const ck = masteryCheckpointCompletionSet(state)
    const next = findNextFlagshipResumeSession(curriculum, sessions, completed, ck, state)
    const pct = getFlagshipCourseDisplayProgressPercent(courseSlug, curriculum, sessions, state)
    if (next) {
      return { href: `/learn/courses/${courseSlug}/session/${next.id}`, cta: pct > 0 ? 'Resume course' : 'Start course' }
    }
    const prepOk = capstonePrepAccessible(curriculum, sessions, completed, ck)
    const openOpts = {
      capstonePrepAccessible: prepOk,
      curriculum,
      progressState: state,
    }
    const lastId = state.lastActiveSessionId
    if (lastId) {
      const lastSess = sessions.find((s) => s.id === lastId)
      if (lastSess && sessionOpenForLearner(completed, lastSess, openOpts)) {
        const lastComplete = completed.has(lastSess.id)
        return {
          href: `/learn/courses/${courseSlug}/session/${lastSess.id}`,
          cta:
            pct >= 100 || lastComplete ? 'Review course' : pct > 0 || completed.size > 0 ? 'Resume course' : 'Start course',
        }
      }
    }
    const ordered = [...sessions].sort((a, b) => a.orderInCourse - b.orderInCourse)
    const hasActivity = completed.size > 0 || Boolean(state.startedAt) || Boolean(state.lastActiveAt) || pct > 0
    if (hasActivity) {
      for (const s of ordered) {
        if (completed.has(s.id)) continue
        if (sessionOpenForLearner(completed, s, openOpts)) {
          return {
            href: `/learn/courses/${courseSlug}/session/${s.id}`,
            cta: pct > 0 ? 'Resume course' : 'Start course',
          }
        }
      }
    }
    return {
      href: `/learn/courses/${courseSlug}`,
      cta: pct >= 100 ? 'Review course' : completed.size > 0 ? 'Resume course' : 'Start course',
    }
  }

  return { href: '/learn', cta: 'Browse catalog' }
}

export async function loadLearnerUnifiedActiveCourses(
  supabase: SupabaseClient | null,
  userId: string | undefined,
): Promise<LearnerUnifiedActiveCourse[]> {
  if (!userId || !supabase) return []

  await migrateLocalInteractiveStartersToSupabase(supabase, userId)

  const [flagshipRows, selfRows] = await Promise.all([
    fetchFlagshipProgressRowsForUser(supabase, userId, 48),
    fetchLearnerSelfPacedRowsForUser(supabase, userId, 48),
  ])

  const applyRemote = true
  const out: LearnerUnifiedActiveCourse[] = []

  for (const row of flagshipRows) {
    if (!flagshipRowHasActivity(row)) continue
    const slug = row.course_slug
    if (!isFlagshipCoursePublished(slug)) continue
    const course = getFlagshipCourseBySlug(slug)
    const curriculum = getFlagshipCurriculum(slug)
    if (!course || !curriculum) continue
    const state = mergeLocalRemoteReconciledForSlug(slug, flagshipProgressRowToState(row), applyRemote)
    const sessions = buildSessionsForCurriculum(curriculum)
    const completed = completionSet(state)
    const ck = masteryCheckpointCompletionSet(state)
    const next = findNextFlagshipResumeSession(curriculum, sessions, completed, ck, state)
    const pct = getFlagshipCourseDisplayProgressPercent(slug, curriculum, sessions, state)
    const resume = await getLearnerResumeTarget(supabase, userId, slug)
    const current = row.last_active_session_id
      ? sessions.find((s) => s.id === row.last_active_session_id)?.title ?? null
      : null

    out.push({
      kind: 'flagship',
      slug,
      title: course.title,
      category: FLAGSHIP_SCHOOLS[course.schoolId]?.shortLabel ?? FLAGSHIP_SCHOOLS[course.schoolId]?.label ?? 'Course',
      progressPercent: pct,
      lastOpenedAt: row.started_at ?? row.last_active_at ?? row.updated_at,
      lastActivityAt: row.last_active_at ?? row.updated_at,
      currentLabel: current,
      nextLabel: nextResumeLabel(next),
      resumeHref: resume.href,
      resumeCta: resume.cta,
      status: pct >= 100 ? 'completed' : 'in_progress',
    })
  }

  for (const row of selfRows) {
    if (!selfPacedRowHasActivity(row)) continue
    const starter = FREE_STARTER_RISE_COURSES.find((c) => c.slug === row.course_slug)
    if (starter) {
      const resume = await getLearnerResumeTarget(supabase, userId, starter.slug)
      const next =
        starter.slug === WELLBEING_RESET_COURSE_SLUG
          ? nextWellbeingDaySlug(row.completed_days ?? [])
          : nextFlowSlugForStarter(row.current_day_slug, starter.slug)
      const nextLabel = next ? formatDayLabel(next) : row.status === 'completed' ? 'Completed' : 'Continue'
      out.push({
        kind: 'self_paced',
        slug: starter.slug,
        title: starter.title,
        category: starter.category,
        progressPercent: row.progress_percentage,
        lastOpenedAt: row.last_opened_at ?? row.started_at,
        lastActivityAt: row.last_activity_at ?? row.updated_at,
        currentLabel: row.current_day_slug ? formatDayLabel(row.current_day_slug) : null,
        nextLabel,
        resumeHref: resume.href,
        resumeCta: resume.cta,
        status: row.status,
      })
      continue
    }

    if (row.course_slug === PRACTICAL_MATH_SLUG) {
      const entry = findStandaloneCourseBySlug(PRACTICAL_MATH_SLUG)
      const course = entry?.source as PracticalMathematicsCourse | undefined
      if (!course) continue
      const local = readStandaloneCourseProgressFromStorage(PRACTICAL_MATH_INTERNAL_KEY)
      const resume = await getLearnerResumeTarget(supabase, userId, PRACTICAL_MATH_SLUG)
      const nextMod = findNextPracticalMathModule(course, local)
      out.push({
        kind: 'self_paced',
        slug: PRACTICAL_MATH_SLUG,
        title: course.title,
        category: 'Mathematics',
        progressPercent: row.progress_percentage,
        lastOpenedAt: row.last_opened_at,
        lastActivityAt: row.last_activity_at ?? row.updated_at,
        currentLabel: nextMod?.title ?? null,
        nextLabel: nextMod ? `Next: ${nextMod.title}` : 'Course complete',
        resumeHref: resume.href,
        resumeCta: resume.cta,
        status: row.status,
      })
    }
  }

  const pmEntry = findStandaloneCourseBySlug(PRACTICAL_MATH_SLUG)
  const pmCourse = pmEntry?.source as PracticalMathematicsCourse | undefined
  if (pmCourse) {
    const local = readStandaloneCourseProgressFromStorage(PRACTICAL_MATH_INTERNAL_KEY)
    const hasLocal = local.completedLessonKeys.size > 0 || local.passedModuleQuizzes.size > 0 || local.capstoneComplete
    const already = out.some((o) => o.slug === PRACTICAL_MATH_SLUG)
    if (hasLocal && !already) {
      const resume = await getLearnerResumeTarget(supabase, userId, PRACTICAL_MATH_SLUG)
      const nextMod = findNextPracticalMathModule(pmCourse, local)
      const approxPct = Math.min(
        99,
        Math.round((local.completedLessonKeys.size / Math.max(1, pmCourse.modules.reduce((n, m) => n + m.lessons.length, 0))) * 100),
      )
      out.push({
        kind: 'standalone_local',
        slug: PRACTICAL_MATH_SLUG,
        title: pmCourse.title,
        category: 'Mathematics',
        progressPercent: local.capstoneComplete ? 100 : approxPct,
        lastOpenedAt: null,
        lastActivityAt: null,
        currentLabel: nextMod?.title ?? null,
        nextLabel: nextMod ? `Next: ${nextMod.title}` : 'Course complete',
        resumeHref: resume.href,
        resumeCta: resume.cta,
        status: local.capstoneComplete ? 'completed' : 'in_progress',
      })
    }
  }

  out.sort((a, b) => {
    const ta = Date.parse(a.lastActivityAt ?? a.lastOpenedAt ?? '') || 0
    const tb = Date.parse(b.lastActivityAt ?? b.lastOpenedAt ?? '') || 0
    return tb - ta
  })

  return out
}

function flowStepCountForStarterSlug(slug: string): number {
  const c = FREE_STARTER_RISE_COURSES.find((x) => x.slug === slug)
  return c?.lessonsIncluded.length ?? 0
}

/** Next flow segment after the learner's saved position (non-wellbeing free starters only). */
function nextFlowSlugForStarter(current: string | null | undefined, courseSlug: string): string | null {
  const nSteps = flowStepCountForStarterSlug(courseSlug)
  if (nSteps <= 0) return null
  if (!current || !/^flow-(\d+)$/.test(current)) return null
  const n = Number.parseInt(current.replace(/^flow-/, ''), 10)
  if (!Number.isFinite(n) || n < 1) return null
  if (n >= nSteps) return null
  return `flow-${n + 1}`
}

function formatDayLabel(slug: string): string {
  if (slug === 'day-reflection') return 'Reflection'
  const m = /^day-(\d+)$/.exec(slug)
  if (m) return `Day ${m[1]}`
  const f = /^flow-(\d+)$/.exec(slug)
  if (f) return `Section ${f[1]}`
  return slug
}

export async function getLearnerEnrollments(
  supabase: SupabaseClient | null,
  userId: string | undefined,
): Promise<LearnerUnifiedActiveCourse[]> {
  return loadLearnerUnifiedActiveCourses(supabase, userId)
}

export async function getLearnerActiveCourses(
  supabase: SupabaseClient | null,
  userId: string | undefined,
): Promise<LearnerUnifiedActiveCourse[]> {
  return loadLearnerUnifiedActiveCourses(supabase, userId)
}

export async function getLearnerProgressSummary(
  supabase: SupabaseClient | null,
  userId: string | undefined,
): Promise<{ activeCount: number; avgProgress: number; completedCount: number }> {
  const courses = await loadLearnerUnifiedActiveCourses(supabase, userId)
  const completed = courses.filter((c) => c.progressPercent >= 100 || c.status === 'completed').length
  const active = courses.length
  const avg = active ? Math.round(courses.reduce((s, c) => s + c.progressPercent, 0) / active) : 0
  return { activeCount: active, avgProgress: avg, completedCount: completed }
}

export async function getLearnerCompletedCourses(
  supabase: SupabaseClient | null,
  userId: string | undefined,
): Promise<LearnerUnifiedActiveCourse[]> {
  const all = await loadLearnerUnifiedActiveCourses(supabase, userId)
  return all.filter((c) => c.progressPercent >= 100 || c.status === 'completed' || c.status === 'certified')
}

export async function getLearnerCertificates(): Promise<{ title: string; href: string }[]> {
  return []
}

export async function getLearnerLastActivity(
  supabase: SupabaseClient | null,
  userId: string | undefined,
): Promise<string | null> {
  const courses = await loadLearnerUnifiedActiveCourses(supabase, userId)
  const ts = courses.map((c) => Date.parse(c.lastActivityAt ?? c.lastOpenedAt ?? '') || 0)
  const max = Math.max(0, ...ts)
  return max > 0 ? new Date(max).toISOString() : null
}

export async function getMostRecentCourseActivity(
  supabase: SupabaseClient | null,
  userId: string | undefined,
): Promise<LearnerUnifiedActiveCourse | null> {
  const courses = await loadLearnerUnifiedActiveCourses(supabase, userId)
  return courses[0] ?? null
}

export async function getNextIncompleteModule(
  supabase: SupabaseClient | null,
  userId: string | undefined,
  courseSlug: string,
): Promise<string | null> {
  const t = await getLearnerResumeTarget(supabase, userId, courseSlug)
  return t.href
}

export async function markLearnerModuleComplete(
  supabase: SupabaseClient,
  userId: string,
  courseSlug: string,
  moduleSlug: string,
): Promise<void> {
  const now = new Date().toISOString()
  const existing = await fetchLearnerSelfPacedRow(supabase, userId, courseSlug)
  const set = new Set(existing?.completed_modules ?? [])
  set.add(moduleSlug)
  await upsertLearnerSelfPacedProgress(supabase, userId, courseSlug, {
    started_at: existing?.started_at ?? now,
    last_activity_at: now,
    last_completed_module_slug: moduleSlug,
    completed_modules: [...set],
    status: 'in_progress',
  })
  emitLearnerProgressHubEvent()
}

export async function markLearnerSessionComplete(
  supabase: SupabaseClient,
  userId: string,
  courseSlug: string,
  sessionSlug: string,
): Promise<void> {
  const now = new Date().toISOString()
  const existing = await fetchLearnerSelfPacedRow(supabase, userId, courseSlug)
  const set = new Set(existing?.completed_sessions ?? [])
  set.add(sessionSlug)
  await upsertLearnerSelfPacedProgress(supabase, userId, courseSlug, {
    started_at: existing?.started_at ?? now,
    last_activity_at: now,
    last_completed_session_slug: sessionSlug,
    completed_sessions: [...set],
    status: 'in_progress',
  })
  emitLearnerProgressHubEvent()
}
