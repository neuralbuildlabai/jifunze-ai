import { Link } from 'react-router-dom'
import type { FlagshipCourseCurriculum, FlagshipCurriculumModule } from '../../../data/learning/flagshipCourseCurricula'
import {
  FLAGSHIP_SESSION_TYPE_LABEL,
  chapterOrdinalInModule,
  flagshipSessionEffortDisplay,
  type FlagshipSession,
} from '../../../data/learning/flagshipCourseSessions'
import { moduleQuizPassed, type FlagshipCourseProgressState } from '../../../lib/flagshipCourseProgressDerived'
import { flagshipSessionPlayerInstruction } from '../../../lib/flagshipSessionPlayerCopy'
import { sessionOpenForLearner } from '../../../learner/flagshipSessionPrereq'

type OpenOpts = {
  capstonePrepAccessible: boolean
  curriculum?: FlagshipCourseCurriculum
  progressState?: FlagshipCourseProgressState
}

export function FlagshipSessionPlayerHeader(props: {
  courseTitle: string
  moduleMeta: FlagshipCurriculumModule
  moduleOrdinal: number
  session: FlagshipSession
  sessionsInModule: FlagshipSession[]
  allSessions: FlagshipSession[]
  completed: Set<string>
  sessionDone: boolean
  /** Calmer header when a curated layout already carries session context */
  density?: 'default' | 'compact'
}) {
  const { courseTitle, moduleMeta, moduleOrdinal, session, sessionsInModule, allSessions, completed, sessionDone, density = 'default' } = props
  const chapterN = chapterOrdinalInModule(session, allSessions)
  const chaptersInModule = sessionsInModule.length
  const chaptersDone = sessionsInModule.filter((s) => completed.has(s.id)).length
  const badgeLabel =
    session.type === 'capstone_prep' ? 'Capstone' : FLAGSHIP_SESSION_TYPE_LABEL[session.type]

  if (density === 'compact') {
    return (
      <div className="mt-5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-3 sm:px-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-subtle)]">{courseTitle}</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p className="min-w-0 text-[12px] font-semibold leading-snug text-[color:var(--jf-text)]">
            Module {moduleOrdinal}: <span className="font-medium text-[color:var(--jf-muted)]">{moduleMeta.title}</span>
          </p>
          <span className="inline-flex shrink-0 rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-text)]">
            {badgeLabel}
          </span>
        </div>
        <p className="mt-1.5 text-[11px] text-[color:var(--jf-muted)]">
          Chapter {chapterN} of {chaptersInModule} · {flagshipSessionEffortDisplay(session)}
          <span className="text-[color:var(--jf-subtle)]">
            {' '}
            · {chaptersDone}/{chaptersInModule} done{sessionDone ? ' · this chapter complete' : ''}
          </span>
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-5 sm:px-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--jf-subtle)]">{courseTitle}</p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="text-[13px] font-semibold text-[color:var(--jf-text)]">
            Module {moduleOrdinal}: <span className="text-[color:var(--jf-muted)]">{moduleMeta.title}</span>
          </p>
          <p className="text-[12px] text-[color:var(--jf-muted)]">
            Chapter {chapterN} of {chaptersInModule} in this module · {flagshipSessionEffortDisplay(session)}
          </p>
          <p className="text-[11px] text-[color:var(--jf-subtle)]">
            Module progress: {chaptersDone}/{chaptersInModule} chapters completed
            {sessionDone ? ' · This chapter is marked complete' : ''}
          </p>
        </div>
        <span className="inline-flex w-fit shrink-0 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-text)]">
          {badgeLabel}
        </span>
      </div>
      <p className="mt-4 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{flagshipSessionPlayerInstruction(session.type)}</p>
    </div>
  )
}

function stepState(
  s: FlagshipSession,
  currentId: string,
  completed: Set<string>,
  openOpts: OpenOpts,
): 'current' | 'done' | 'open' | 'locked' {
  if (s.id === currentId) return 'current'
  if (completed.has(s.id)) return 'done'
  if (sessionOpenForLearner(completed, s, openOpts)) return 'open'
  return 'locked'
}

export function FlagshipSessionModuleStepper(props: {
  slug: string
  sessionsInModule: FlagshipSession[]
  currentSessionId: string
  completed: Set<string>
  openOpts: OpenOpts
  progressState: FlagshipCourseProgressState | undefined
  moduleId: string
  /** Capstone prep has no module-scoped checkpoint quiz tile. */
  showModuleQuizStep?: boolean
}) {
  const { slug, sessionsInModule, currentSessionId, completed, openOpts, progressState, moduleId, showModuleQuizStep = true } =
    props
  const allSessionsDone = sessionsInModule.length > 0 && sessionsInModule.every((s) => completed.has(s.id))
  const quizDone = progressState ? moduleQuizPassed(moduleId, progressState) : false

  return (
    <div className="mt-8" aria-label="Sessions in this module">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-subtle)]">This module</p>
      <div className="mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {sessionsInModule.map((s) => {
          const st = stepState(s, currentSessionId, completed, openOpts)
          const label = FLAGSHIP_SESSION_TYPE_LABEL[s.type]
          const inner = (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-subtle)]">{label}</p>
              <p className="mt-1 line-clamp-2 text-[12px] font-medium leading-snug text-[color:var(--jf-text)]">{s.title}</p>
              <p className="mt-1 text-[10px] text-[color:var(--jf-subtle)]">
                {st === 'current' ? 'Current' : st === 'done' ? 'Done' : st === 'open' ? 'Open' : 'Locked'}
              </p>
            </>
          )
          const cardClass =
            st === 'current'
              ? 'border-violet-400/35 bg-violet-950/20'
              : st === 'done'
                ? 'border-emerald-900/25 bg-emerald-950/10'
                : st === 'open'
                  ? 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14]'
                  : 'border-white/[0.05] bg-black/[0.12] opacity-60'

          if (st === 'locked') {
            return (
              <div
                key={s.id}
                className={`w-[min(100%,11rem)] shrink-0 snap-start rounded-lg border px-3 py-2.5 sm:w-auto sm:min-w-[9.5rem] ${cardClass}`}
              >
                {inner}
              </div>
            )
          }
          return (
            <Link
              key={s.id}
              to={`/learn/courses/${slug}/session/${s.id}`}
              className={`w-[min(100%,11rem)] shrink-0 snap-start rounded-lg border px-3 py-2.5 transition sm:w-auto sm:min-w-[9.5rem] ${cardClass}`}
            >
              {inner}
            </Link>
          )
        })}
        {showModuleQuizStep ? (
          <div
            className={`w-[min(100%,11rem)] shrink-0 snap-start rounded-lg border px-3 py-2.5 sm:w-auto sm:min-w-[9.5rem] ${
              allSessionsDone
                ? quizDone
                  ? 'border-emerald-900/25 bg-emerald-950/10'
                  : 'border-amber-800/25 bg-amber-950/15'
                : 'border-white/[0.05] bg-black/[0.12] opacity-60'
            }`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-subtle)]">Quiz</p>
            <p className="mt-1 text-[12px] font-medium text-[color:var(--jf-text)]">Module checkpoint</p>
            <p className="mt-1 text-[10px] text-[color:var(--jf-subtle)]">
              {!allSessionsDone ? 'After all chapters' : quizDone ? 'Passed' : 'Open on course page'}
            </p>
            {allSessionsDone ? (
              <Link
                to={`/learn/courses/${slug}#flagship-module-${moduleId}`}
                className="mt-2 inline-block text-[11px] font-semibold text-violet-200/90 underline-offset-2 hover:underline"
              >
                Go to quiz
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function FlagshipSessionRevisionLessonLinks(props: {
  slug: string
  lesson?: FlagshipSession
  practice?: FlagshipSession
  lessonOpen: boolean
  practiceOpen: boolean
}) {
  const { slug, lesson, practice, lessonOpen, practiceOpen } = props
  if (!lesson && !practice) return null
  return (
    <div className="mt-8 rounded-xl border border-sky-900/20 bg-sky-950/[0.08] px-4 py-4 sm:px-5">
      <p className="text-[12px] font-semibold text-sky-100/95">Need the teaching material?</p>
      <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
        Review the lesson and practice first, then come back to this revision checkpoint.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {lesson ? (
          lessonOpen ? (
            <Link
              to={`/learn/courses/${slug}/session/${lesson.id}`}
              className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] font-semibold text-[color:var(--jf-text)] hover:bg-white/[0.07]"
            >
              Open lesson
            </Link>
          ) : (
            <span className="inline-flex min-h-[2.5rem] items-center text-[12px] text-[color:var(--jf-subtle)]">Lesson (locked)</span>
          )
        ) : null}
        {practice ? (
          practiceOpen ? (
            <Link
              to={`/learn/courses/${slug}/session/${practice.id}`}
              className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] font-semibold text-[color:var(--jf-text)] hover:bg-white/[0.07]"
            >
              Open practice
            </Link>
          ) : (
            <span className="inline-flex min-h-[2.5rem] items-center text-[12px] text-[color:var(--jf-subtle)]">Practice (locked)</span>
          )
        ) : null}
      </div>
    </div>
  )
}

export function FlagshipSessionPracticeLessonReminder(props: {
  slug: string
  lesson?: FlagshipSession
  lessonOpen: boolean
}) {
  const { slug, lesson, lessonOpen } = props
  if (!lesson) return null
  return (
    <div className="mt-8 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-4 sm:px-5">
      <p className="text-[12px] font-semibold text-[color:var(--jf-text)]">Quick reminder</p>
      <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
        Reopen the lesson if you want the full explanation and examples before you submit this practice.
      </p>
      {lessonOpen ? (
        <Link
          to={`/learn/courses/${slug}/session/${lesson.id}`}
          className="mt-3 inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-white/[0.12] px-4 text-[13px] font-semibold text-[color:var(--jf-text)] hover:bg-white/[0.05]"
        >
          Open lesson
        </Link>
      ) : (
        <p className="mt-3 text-[12px] text-[color:var(--jf-subtle)]">Lesson is still locked by course order.</p>
      )}
    </div>
  )
}
