import { useState } from 'react'
import { Link } from 'react-router-dom'
import { answerLearnerHelpQuestion } from '../../lib/learnerHelpEngine'
import { LEGAL_ROUTES } from '../../training/trustCopy'

export type LearnerHelpAssistantProps = {
  /** Floating workspace chip (default) vs inline lesson/lab panel */
  variant?: 'floating' | 'embedded'
  /** When set, answers include placement + related KB concepts for this lesson slug. */
  currentLessonSlug?: string
  /** When set, lab hints prefer this id without requiring the learner to paste it. */
  labId?: string
  className?: string
}

/**
 * Curriculum-grounded help: local retrieval over Jifunze KB atoms + lessons + labs (no generic web guessing).
 */
export function LearnerHelpAssistant({
  variant = 'floating',
  currentLessonSlug,
  labId,
  className,
}: LearnerHelpAssistantProps) {
  const embedded = variant === 'embedded'
  const [open, setOpen] = useState(embedded)
  const [query, setQuery] = useState('')
  const [activeAnswer, setActiveAnswer] = useState(() =>
    answerLearnerHelpQuestion({ query: '', currentLessonSlug, labId }),
  )

  function submit() {
    setActiveAnswer(answerLearnerHelpQuestion({ query, currentLessonSlug, labId }))
  }

  const panel = (
    <div
      className={
        embedded
          ? 'rounded-2xl border border-white/[0.08] bg-[rgba(16,14,22,0.92)] p-4 shadow-[0_18px_70px_rgba(0,0,0,0.35)] ring-1 ring-violet-400/12 backdrop-blur-md sm:p-5'
          : 'pointer-events-auto w-[min(100vw-2.5rem,26rem)] rounded-2xl border border-white/[0.08] bg-[rgba(16,14,22,0.92)] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.45)] ring-1 ring-violet-400/15 backdrop-blur-md'
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Learner help</p>
          <p className="mt-1 text-sm font-semibold text-white">Grounded in Jifunze curriculum + KB</p>
          <p className="mt-1 text-[11px] leading-snug text-zinc-500">
            Answers pull from indexed teaching concepts, lesson links, and lab metadata. When overlap is weak, it says so—rather than inventing
            curriculum facts. Materials access is not an outcome guarantee.
          </p>
          {currentLessonSlug ? (
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300/80">
              Context: lesson slug {currentLessonSlug}
            </p>
          ) : null}
          {labId ? (
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300/80">Context: lab {labId}</p>
          ) : null}
        </div>
        {!embedded ? (
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg px-2 py-1 text-[11px] font-medium text-zinc-500 transition hover:bg-white/[0.05] hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            Close
          </button>
        ) : null}
      </div>

      <div className="mt-4 space-y-2">
        <label className="text-[11px] font-medium text-zinc-500" htmlFor={embedded ? 'learner-help-input-embedded' : 'learner-help-input'}>
          Your question
        </label>
        <textarea
          id={embedded ? 'learner-help-input-embedded' : 'learner-help-input'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-xl border border-white/[0.08] bg-black/25 px-3 py-2 text-[13px] leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:border-violet-400/35 focus:outline-none focus:ring-2 focus:ring-violet-400/25"
          placeholder="e.g. Explain precision vs recall — gentle hint for this lab — what should I review next?"
        />
        <button
          type="button"
          onClick={submit}
          className="inline-flex w-full items-center justify-center rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/60"
        >
          Ask (grounded)
        </button>
      </div>

      <div className="mt-4 border-t border-white/[0.06] pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Answer</p>
          <span className="rounded-full border border-white/[0.08] bg-black/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
            confidence: {activeAnswer.confidence}
          </span>
        </div>
        <p className="mt-2 text-[14px] font-semibold text-white" data-testid="learner-help-answer-title">
          {activeAnswer.title}
        </p>
        <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-zinc-300">
          {activeAnswer.body.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="mt-3 space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Citations</p>
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
          Assistive guidance only—see{' '}
          <Link to={LEGAL_ROUTES.disclaimer} className="font-medium text-violet-300/85 underline-offset-2 hover:underline">
            disclaimer
          </Link>
          .
        </p>
      </div>
    </div>
  )

  if (embedded) {
    return <div className={className}>{panel}</div>
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
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
