import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { answerLearnerHelpQuestion } from '../../lib/learnerHelpEngine'
import { useLearnerCommerceOptional } from '../../learner/LearnerCommerceContext'
import { LEGAL_ROUTES } from '../../shared/legalRoutes'

export type LearnerHelpAssistantProps = {
  /** When set, answers prefer curriculum placement for this lesson slug. */
  currentLessonSlug?: string
  labId?: string
  className?: string
}

/**
 * Curriculum-grounded help — opens from a button (not inline on lesson pages).
 */
export function LearnerHelpAssistant({ currentLessonSlug, labId, className }: LearnerHelpAssistantProps) {
  const location = useLocation()
  const commerce = useLearnerCommerceOptional()
  const flagshipCtx = useMemo(() => {
    const m = /\/learn\/courses\/([^/]+)\/session\/([^/]+)/.exec(location.pathname)
    return m ? { currentCourseSlug: m[1], currentSessionId: m[2] } : {}
  }, [location.pathname])

  const flagshipCourseAccess = useMemo(() => {
    const slug = flagshipCtx.currentCourseSlug
    if (!slug) return undefined
    if (!commerce?.purchaseGateEnabled) return 'open' as const
    return commerce.hasCourseAccess(slug) ? ('open' as const) : ('locked' as const)
  }, [commerce, flagshipCtx.currentCourseSlug])

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeAnswer, setActiveAnswer] = useState(() =>
    answerLearnerHelpQuestion({
      query: '',
      currentLessonSlug,
      labId,
      ...flagshipCtx,
      flagshipCourseAccess,
    }),
  )

  function submit() {
    setActiveAnswer(
      answerLearnerHelpQuestion({ query, currentLessonSlug, labId, ...flagshipCtx, flagshipCourseAccess }),
    )
  }

  const panel = (
    <div
      className={
        'pointer-events-auto w-[min(100vw-2.5rem,26rem)] rounded-2xl border border-white/[0.08] bg-[rgba(16,14,22,0.92)] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.45)] ring-1 ring-violet-400/15 backdrop-blur-md'
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Learner help</p>
          <p className="mt-1 text-sm font-semibold text-white">Ask about this course</p>
          <p className="mt-1 text-[11px] leading-snug text-zinc-500">
            Answers come from Jifunze curriculum and lesson links—not generic web guesses. Paid areas still follow your plan.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg px-2 py-1 text-[11px] font-medium text-zinc-500 transition hover:bg-white/[0.05] hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
        >
          Close
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <label className="text-[11px] font-medium text-zinc-500" htmlFor="learner-help-input">
          Your question
        </label>
        <textarea
          id="learner-help-input"
          value={query}
          onChange={(e) => {
            const v = e.target.value
            setQuery(v)
            if (!v.trim()) {
              setActiveAnswer(
                answerLearnerHelpQuestion({
                  query: '',
                  currentLessonSlug,
                  labId,
                  ...flagshipCtx,
                  flagshipCourseAccess,
                }),
              )
            }
          }}
          rows={3}
          className="w-full resize-none rounded-xl border border-white/[0.08] bg-black/25 px-3 py-2 text-[13px] leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:border-violet-400/35 focus:outline-none focus:ring-2 focus:ring-violet-400/25"
          placeholder="e.g. Where is this concept explained? What should I review next?"
        />
        <button
          type="button"
          onClick={submit}
          className="inline-flex w-full items-center justify-center rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/60"
        >
          Ask
        </button>
      </div>

      <div className="mt-4 border-t border-white/[0.06] pt-4">
        <p className="text-[14px] font-semibold text-white" data-testid="learner-help-answer-title">
          {activeAnswer.title}
        </p>
        <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-zinc-300">
          {activeAnswer.body.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="mt-3 space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Where to read more</p>
          <ul className="space-y-1">
            {activeAnswer.citations.map((c) => (
              <li key={`${c.href}-${c.label}`}>
                <Link
                  to={c.href}
                  className="text-[12px] font-semibold text-violet-300/95 underline-offset-4 hover:text-violet-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 text-[10px] leading-relaxed text-zinc-600">
          Guidance only — see{' '}
          <Link to={LEGAL_ROUTES.disclaimer} className="font-medium text-violet-300/85 underline-offset-2 hover:underline">
            disclaimer
          </Link>
          .
        </p>
      </div>
    </div>
  )

  return (
    <div className={`pointer-events-none fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 ${className ?? ''}`}>
      {open ? panel : null}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/90 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(109,40,217,0.35)] ring-1 ring-white/10 transition hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/60"
      >
        Learner help
      </button>
    </div>
  )
}
