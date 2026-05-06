import { Link } from 'react-router-dom'
import type { FlagshipSession } from '../../../data/learning/flagshipCourseSessions'

export type FlagshipSessionCompletionKind = 'lesson' | 'practice' | 'other'

export function FlagshipSessionCompletionFooter(props: {
  sessionTitle: string
  objectives: readonly string[]
  /** Lesson vs practice copy and checklist framing */
  completionKind?: FlagshipSessionCompletionKind
  /** Practice footer: include mastery checkpoint line when the session shows checkpoints */
  hasMasteryCheckpoint?: boolean
  done: boolean
  canMarkThisChapterComplete: boolean
  onMarkComplete: () => void
  flagged: boolean
  onToggleFlag: (checked: boolean) => void
  slug: string
  prev?: FlagshipSession
  next?: FlagshipSession
  prevReachable: boolean
  nextReachable: boolean
  prevBlockedReason: string | null
  nextBlockedReason: string | null
  moduleAnchorId: string | null
  capstoneLinkOnly: boolean
}) {
  const {
    sessionTitle,
    objectives,
    completionKind = 'other',
    hasMasteryCheckpoint = false,
    done,
    canMarkThisChapterComplete,
    onMarkComplete,
    flagged,
    onToggleFlag,
    slug,
    prev,
    next,
    prevReachable,
    nextReachable,
    prevBlockedReason,
    nextBlockedReason,
    moduleAnchorId,
    capstoneLinkOnly,
  } = props

  const lessonLead =
    objectives.length > 0
      ? `You're ready to complete this lesson if you can do the following with ${sessionTitle}:`
      : `You're ready to complete this lesson if you can:`

  const practiceLead = `You're ready to complete this practice if you have:`

  const lessonChecklist =
    objectives.length > 0
      ? objectives.slice(0, 5)
      : [
          'Summarized the core idea in your own words',
          'Worked through the example and checks above',
          'Completed any written responses this chapter expects',
        ]

  const practiceChecklist = [
    'Completed each task response in the workspace above',
    'Saved a draft or run Save & Check on your answers',
    'Produced the named artifact or output this practice describes',
    ...(hasMasteryCheckpoint ? ['Confirmed any mastery checkpoints shown in the review section'] : []),
  ]

  const genericChecklist = [
    'You followed the core sections above in order',
    'You can restate the session goal in your own words',
    'Any required responses or checkpoints for this chapter are satisfied',
  ]

  const lead =
    completionKind === 'lesson'
      ? lessonLead
      : completionKind === 'practice'
        ? practiceLead
        : `You're ready to mark ${sessionTitle} complete if you can check most of the following:`

  const checklist =
    completionKind === 'lesson' ? lessonChecklist : completionKind === 'practice' ? practiceChecklist : genericChecklist

  const heading =
    completionKind === 'lesson'
      ? 'Complete this lesson'
      : completionKind === 'practice'
        ? 'Complete this practice'
        : 'Ready to complete this chapter?'

  return (
    <footer
      id="flagship-session-completion"
      className="scroll-mt-28 mt-12 border-t border-[color:var(--jf-border)] pt-10"
      data-testid="flagship-session-completion-footer"
    >
      <p className="text-[12px] font-medium text-[color:var(--jf-muted)]">Before you continue</p>
      <h2 className="mt-2 text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">{heading}</h2>
      <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{lead}</p>
      <ul className="mt-4 max-w-2xl space-y-2">
        {checklist.map((line) => (
          <li key={line} className="flex gap-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400/55" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {done ? (
          <p className="text-[13px] font-medium text-emerald-800/90" data-testid="flagship-session-complete-toggle">
            Chapter complete — progression is saved. Use &quot;Flag for later review&quot; if you want a reminder to revisit.
          </p>
        ) : (
          <button
            type="button"
            disabled={!canMarkThisChapterComplete}
            onClick={onMarkComplete}
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)] disabled:cursor-not-allowed disabled:opacity-40"
            data-testid="flagship-session-complete-toggle"
            title={
              !canMarkThisChapterComplete
                ? 'Complete earlier sessions in order, or pass the previous module quiz, before marking this chapter complete.'
                : undefined
            }
          >
            Mark chapter complete
          </button>
        )}
        <label className="inline-flex cursor-pointer items-center gap-2 text-[13px] text-[color:var(--jf-muted)]">
          <input
            type="checkbox"
            checked={flagged}
            onChange={(e) => onToggleFlag(e.target.checked)}
            className="rounded border-[color:var(--jf-border)]"
          />
          Flag for later review
        </label>
      </div>

      <nav
        className="mt-12 grid gap-8 border-t border-[color:var(--jf-border)] pt-10 sm:grid-cols-3 sm:gap-6"
        aria-label="Session navigation"
      >
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-subtle)]">Previous</p>
          {prev && prevReachable ? (
            <Link
              className="inline-flex text-[14px] font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline"
              to={`/learn/courses/${slug}/session/${prev.id}`}
            >
              ← {prev.title}
            </Link>
          ) : prev ? (
            <div className="space-y-1">
              <span className="block text-[13px] text-[color:var(--jf-subtle)]">Not available yet</span>
              {prevBlockedReason ? (
                <p className="text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">{prevBlockedReason}</p>
              ) : null}
            </div>
          ) : (
            <span className="text-[13px] text-[color:var(--jf-subtle)]">First in course order</span>
          )}
        </div>

        <div className="space-y-3 border-y border-[color:var(--jf-border)] py-6 sm:border-y-0 sm:py-0 sm:text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-subtle)] sm:sr-only">Course</p>
          <Link
            className="block text-[14px] font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline"
            to={`/learn/courses/${slug}`}
          >
            Back to course overview
          </Link>
          {moduleAnchorId && !capstoneLinkOnly ? (
            <Link
              className="block text-[13px] font-medium text-[color:var(--jf-muted)] underline-offset-2 hover:text-[color:var(--jf-text)] hover:underline"
              to={`/learn/courses/${slug}#flagship-module-${moduleAnchorId}`}
            >
              This module · quiz
            </Link>
          ) : capstoneLinkOnly ? (
            <Link
              className="block text-[13px] font-medium text-[color:var(--jf-muted)] underline-offset-2 hover:text-[color:var(--jf-text)] hover:underline"
              to={`/learn/courses/${slug}`}
            >
              Capstone on course overview
            </Link>
          ) : null}
        </div>

        <div className="space-y-2 sm:text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-subtle)]">Next</p>
          {next && nextReachable ? (
            <Link
              className="inline-flex text-[14px] font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline"
              to={`/learn/courses/${slug}/session/${next.id}`}
              data-testid="flagship-session-next"
            >
              {next.title} →
            </Link>
          ) : next ? (
            <p
              className="text-[13px] leading-relaxed text-[color:var(--jf-muted)] sm:ml-auto sm:max-w-sm sm:text-right"
              data-testid="flagship-session-next-locked"
            >
              {nextBlockedReason?.trim() ||
                'The next session stays locked until earlier chapters or quizzes in this course are satisfied.'}
            </p>
          ) : (
            <Link
              className="inline-flex text-[14px] font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline"
              to={`/learn/courses/${slug}`}
            >
              Course overview →
            </Link>
          )}
        </div>
      </nav>
    </footer>
  )
}
