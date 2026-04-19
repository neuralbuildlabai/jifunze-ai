import { startTransition, useCallback, useEffect, useMemo, useState } from 'react'
import type { LessonPracticeBundle, LessonPracticeExercise, LessonPracticeState } from '../../training/practiceTypes'
import { mergeLessonPracticePersisted } from '../../training/lessonPracticeBundleUtils'
import { evaluatePracticeSubmission } from '../../training/practiceEvaluate'
import { TRUST_COPY } from '../../training/trustCopy'

export function LessonPracticeLoop(props: {
  bundle: LessonPracticeBundle
  persistedState: unknown | null | undefined
  busy: boolean
  onPersistState: (next: LessonPracticeState) => Promise<void>
}) {
  const [state, setState] = useState<LessonPracticeState>(() => mergeLessonPracticePersisted(props.persistedState))
  const [draft, setDraft] = useState('')
  const [feedback, setFeedback] = useState<string[] | null>(null)
  const [localBusy, setLocalBusy] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    startTransition(() => {
      setState(mergeLessonPracticePersisted(props.persistedState))
    })
  }, [props.persistedState])

  const exercise = useMemo((): LessonPracticeExercise | null => {
    const t = state.current_tier
    return props.bundle.exercises.find((e) => e.tier === t) ?? null
  }, [props.bundle.exercises, state.current_tier])

  const persist = useCallback(
    async (next: LessonPracticeState) => {
      setState(next)
      await props.onPersistState(next)
    },
    [props],
  )

  const onSubmit = useCallback(async () => {
    if (!exercise || props.busy) return
    setLocalBusy(true)
    const evald = evaluatePracticeSubmission(draft, exercise)
    setFeedback(evald.feedback_lines)
    const nextAttempt = state.attempt_count + 1
    const base: LessonPracticeState = {
      ...state,
      attempt_count: nextAttempt,
      last_submission: draft,
      last_submission_at: new Date().toISOString(),
      last_feedback_lines: evald.feedback_lines,
    }
    if (evald.passed) {
      const maxTier = Math.max(...props.bundle.exercises.map((e) => e.tier))
      if (exercise.tier >= maxTier) {
        await persist({ ...base, passed: true, current_tier: exercise.tier })
      } else {
        const nextTier = (exercise.tier + 1) as LessonPracticeState['current_tier']
        await persist({
          ...base,
          current_tier: nextTier,
          passed: false,
          revealed_solution: false,
        })
        setDraft('')
        setFeedback(null)
        setShowHints(false)
      }
    } else {
      await persist({ ...base, passed: false })
    }
    setLocalBusy(false)
  }, [draft, exercise, persist, props.bundle.exercises, props.busy, state])

  if (!exercise) {
    return (
      <p className="text-sm text-rose-300/90">Practice configuration is incomplete for this lesson.</p>
    )
  }

  const guided = exercise.mode === 'guided'
  const hintsVisible = guided || showHints

  return (
    <section className="space-y-4 rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-4 ring-1 ring-emerald-500/10">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-400/90">
          Practice · feedback · retry
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white">{exercise.title}</h2>
        <p className="mt-2 text-xs text-zinc-400">
          Tier {exercise.tier} · {exercise.mode === 'guided' ? 'Guided (cues visible)' : 'Independent (you produce first)'}
        </p>
      </div>

      {props.bundle.ties_to_outcomes?.length ? (
        <div className="rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-2 text-xs text-zinc-400">
          <span className="font-medium text-zinc-300">Tied to outcomes: </span>
          {props.bundle.ties_to_outcomes.slice(0, 5).join(' · ')}
        </div>
      ) : null}

      <div className="rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2 text-sm text-zinc-200">
        <p className="whitespace-pre-wrap">{exercise.prompt}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-zinc-400">
          {exercise.success_criteria.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {!guided ? (
        <button
          type="button"
          onClick={() => setShowHints((v) => !v)}
          className="text-xs font-medium text-emerald-300/90 underline-offset-2 hover:underline"
        >
          {hintsVisible ? 'Hide cues' : 'Reveal cues (optional)'}
        </button>
      ) : null}

      {hintsVisible && exercise.guided_hints?.length ? (
        <div className="rounded-lg border border-emerald-500/15 bg-emerald-950/25 px-3 py-2 text-xs text-emerald-100/90">
          <p className="font-semibold text-emerald-200/95">Cues</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {exercise.guided_hints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <label className="block space-y-2">
        <span className="text-xs text-zinc-500">Your response</span>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={10}
          disabled={state.passed === true || props.busy || localBusy}
          className="w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-emerald-500/40 disabled:opacity-60"
          placeholder="Write your artifact here. Be specific enough that someone else could execute it."
        />
      </label>

      {feedback ? (
        <div className="rounded-lg border border-white/[0.06] bg-zinc-950/45 px-3 py-2 text-sm text-zinc-200">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Feedback</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
            {feedback.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          {exercise.escalation_note ? (
            <p className="mt-3 text-xs text-amber-200/85">
              <span className="font-medium text-amber-100">Retry cue: </span>
              {exercise.escalation_note}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={state.passed === true || props.busy || localBusy || !draft.trim()}
          onClick={() => void onSubmit()}
          className="rounded-lg bg-emerald-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {localBusy ? 'Checking…' : state.passed ? 'Practice complete' : 'Submit for feedback'}
        </button>
        <button
          type="button"
          disabled={props.busy || localBusy || state.passed === true}
          onClick={() => setShowSolution((v) => !v)}
          className="rounded-lg border border-zinc-600 bg-zinc-900/80 px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-900"
        >
          {showSolution ? 'Hide model answer' : 'Show model answer'}
        </button>
        <span className="text-[11px] text-zinc-500">
          Attempts this lesson: {state.attempt_count}
        </span>
      </div>

      {showSolution ? (
        <div className="rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-2 text-xs leading-relaxed text-zinc-300">
          <p className="font-semibold text-zinc-200">Model answer</p>
          <p className="mt-2 whitespace-pre-wrap">{exercise.worked_solution}</p>
        </div>
      ) : null}

      {state.passed ? (
        <p className="text-sm text-emerald-300/90">
          Practice loop satisfied for this lesson — you can mark the lesson complete when ready.
        </p>
      ) : (
        <div className="space-y-2 text-[11px] text-zinc-500">
          <p>{TRUST_COPY.practiceRigorExpectation}</p>
          <p>
            Pass each tier (guided → independent → reinforce). Feedback is heuristic (length + outcome keywords), not an
            LLM.
          </p>
        </div>
      )}
    </section>
  )
}
