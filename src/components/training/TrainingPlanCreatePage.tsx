import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { buildDiagnosticQuizSeed } from '../../knowledge/diagnosticQuiz'
import { validationTrainingError, type TrainingError } from '../../training/trainingErrors'
import { createTrainingPlanMvp } from '../../training/trainingHooks'
import { useTrainingWorkspace } from '../../training/useTrainingWorkspace'
import { TRUST_COPY } from '../../training/trustCopy'
import { TrainingInlineAlert } from './TrainingInlineAlert'

const SKILL_LEVELS = ['beginner', 'intermediate', 'advanced'] as const

type PlanType = 'free_starter' | 'guided_subscription'

const PACE_OPTIONS_FREE = [
  { id: 'light', label: 'Light · ~15–25 minutes most days' },
  { id: 'steady', label: 'Steady · ~30–45 minutes most days' },
  { id: 'focused', label: 'Focused blocks · a few longer sessions weekly' },
] as const

const PACE_OPTIONS_GUIDED = [
  { id: 'moderate', label: 'Moderate weekly rhythm' },
  { id: 'committed', label: 'Committed · regular deeper sessions' },
  { id: 'flex', label: 'Flexible · steady but forgiving pacing' },
] as const

export function TrainingPlanCreatePage() {
  const navigate = useNavigate()
  const { user, tenantId, supabase, workspaceShellReady } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)

  const [planType, setPlanType] = useState<PlanType>('free_starter')
  const [step, setStep] = useState(1)

  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('')
  const [objective, setObjective] = useState('')
  const [desiredOutcome, setDesiredOutcome] = useState('')
  const [skillLevel, setSkillLevel] = useState<string>('beginner')
  const [paceChoice, setPaceChoice] = useState<string>(PACE_OPTIONS_FREE[0].id)

  const [selfConfidence, setSelfConfidence] = useState(3)
  const [includeDiagnosticQuiz, setIncludeDiagnosticQuiz] = useState(false)
  const [quickCheck, setQuickCheck] = useState<(number | null)[]>([null, null, null])
  const [placementExpanded, setPlacementExpanded] = useState(false)

  const [busy, setBusy] = useState(false)
  const [localError, setLocalError] = useState<TrainingError | null>(null)

  const quickQuestions = useMemo(() => {
    const topicText = topic.trim() || title.trim() || 'your topic'
    const objectiveText = objective.trim() || 'your objective'
    return buildDiagnosticQuizSeed({ topic: topicText, objective: objectiveText }).questions.slice(0, 3)
  }, [topic, title, objective])

  const paceOptions = planType === 'free_starter' ? PACE_OPTIONS_FREE : PACE_OPTIONS_GUIDED

  const mergedObjective = useMemo(() => {
    const core = objective.trim()
    const out = desiredOutcome.trim()
    if (!out) return core || null
    if (!core) return `Desired outcome: ${out}`
    return `${core}\n\nDesired outcome: ${out}`
  }, [objective, desiredOutcome])

  const durationLabel =
    planType === 'free_starter'
      ? `Starter path · ${PACE_OPTIONS_FREE.find((p) => p.id === paceChoice)?.label ?? 'paced practice'}`
      : `Guided path · ${PACE_OPTIONS_GUIDED.find((p) => p.id === paceChoice)?.label ?? 'structured continuity'}`

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLocalError(null)
    if (!title.trim()) {
      setLocalError(validationTrainingError('Add a short title so you can recognize this plan.'))
      return
    }
    if (mode.kind === 'blocked') {
      setLocalError(validationTrainingError('Workspace is not ready yet. Try again after setup finishes.'))
      return
    }

    const placementEnabled =
      planType === 'guided_subscription' || (planType === 'free_starter' && placementExpanded)

    const allQuickAnswered = quickCheck.every((x) => x != null)

    setBusy(true)
    try {
      const { planId, error } = await createTrainingPlanMvp({
        mode,
        title: title.trim(),
        topic: topic.trim() || null,
        objective: mergedObjective,
        skillLevel: skillLevel.trim() || null,
        durationLabel,
        placement: {
          statedSkillLevel: skillLevel.trim() || null,
          selfConfidence1To5: selfConfidence,
          diagnosticOptionIndices: placementEnabled && allQuickAnswered ? (quickCheck as number[]) : null,
          includeDiagnosticQuiz: planType === 'guided_subscription' ? includeDiagnosticQuiz : false,
        },
      })
      if (error) {
        setLocalError(error)
        return
      }
      if (planId) {
        navigate(`/training/${planId}`, { replace: true })
      }
    } finally {
      setBusy(false)
    }
  }

  function nextStep() {
    setLocalError(null)
    if (step === 2 && !title.trim()) {
      setLocalError(validationTrainingError('Add a title before continuing.'))
      return
    }
    setStep((s) => Math.min(4, s + 1))
  }

  function prevStep() {
    setLocalError(null)
    setStep((s) => Math.max(1, s - 1))
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-10 px-4 py-10 text-zinc-100">
      <header className="jf-instruction-surface border border-black/10 bg-white/[0.94] p-6 text-zinc-900 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-700">Training</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
          Take the first step toward a smarter learning path
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700">{TRUST_COPY.trainingPlanGenerationIntro}</p>
      </header>

      {isSupabaseConfigured() && !workspaceShellReady ? (
        <p className="text-sm text-zinc-400">Loading workspace…</p>
      ) : null}

      {mode.kind === 'blocked' ? (
        <p className="rounded-lg border border-amber-500/25 bg-amber-950/30 px-3 py-2 text-sm text-amber-100">
          Workspace is not available yet. Finish workspace setup, then try again.
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-600">
        {[
          { id: 1, label: 'Plan type' },
          { id: 2, label: 'Your goals' },
          { id: 3, label: 'Placement help' },
          { id: 4, label: 'Build plan' },
        ].map((s) => (
          <span
            key={s.id}
            className={`rounded-full px-3 py-1 ${step === s.id ? 'bg-white/[0.06] text-white ring-1 ring-white/10' : 'text-zinc-600'}`}
          >
            Step {s.id}: {s.label}
          </span>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        {step === 1 ? (
          <section className="space-y-4 rounded-2xl border border-[var(--jf-border)] bg-[color:var(--jf-surface)] p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Choose your plan type</p>
              <p className="mt-2 text-sm text-zinc-400">
                Pick a lighter starter route or a fuller guided path. You can adjust details in the next steps.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setPlanType('free_starter')
                  setPaceChoice(PACE_OPTIONS_FREE[0].id)
                }}
                className={`rounded-xl border px-4 py-4 text-left transition ${
                  planType === 'free_starter'
                    ? 'border-[color:var(--jf-accent-training)] bg-[color:var(--jf-accent-training)]/10 ring-1 ring-[color:var(--jf-accent-training)]/25'
                    : 'border-[var(--jf-border)] bg-black/10 hover:border-white/15'
                }`}
              >
                <p className="text-sm font-semibold text-white">Free starter plan</p>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
                  Lean lessons, quick wins, and light structure—ideal for trying Jifunze without a heavy setup.
                </p>
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlanType('guided_subscription')
                  setPaceChoice(PACE_OPTIONS_GUIDED[0].id)
                }}
                className={`rounded-xl border px-4 py-4 text-left transition ${
                  planType === 'guided_subscription'
                    ? 'border-[color:var(--jf-accent-training)] bg-[color:var(--jf-accent-training)]/10 ring-1 ring-[color:var(--jf-accent-training)]/25'
                    : 'border-[var(--jf-border)] bg-black/10 hover:border-white/15'
                }`}
              >
                <p className="text-sm font-semibold text-white">Guided subscription plan</p>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
                  Richer sequencing, continuity, and optional diagnostics when you want deeper guidance.
                </p>
              </button>
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="space-y-5 rounded-2xl border border-[var(--jf-border)] bg-[color:var(--jf-surface)] p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Tell Jifunze what you want to learn</p>
              <p className="mt-2 text-sm text-zinc-400">
                Short answers are fine—this helps us propose a practical starting route.
              </p>
            </div>

            <label className="block space-y-1">
              <span className="text-xs text-zinc-500">Plan title *</span>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-[var(--jf-border)] bg-[color:var(--jf-bg-page)] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-[color:var(--jf-accent-training)]/45 focus:ring-2 focus:ring-[color:var(--jf-accent-training)]/15"
                placeholder="e.g., Confident prompts for weekly study posts"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-xs text-zinc-500">Topic focus</span>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-lg border border-[var(--jf-border)] bg-[color:var(--jf-bg-page)] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-[color:var(--jf-accent-training)]/45 focus:ring-2 focus:ring-[color:var(--jf-accent-training)]/15"
                placeholder="What subject or skill is this about?"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-xs text-zinc-500">Goal / objective</span>
              <textarea
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-[var(--jf-border)] bg-[color:var(--jf-bg-page)] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-[color:var(--jf-accent-training)]/45 focus:ring-2 focus:ring-[color:var(--jf-accent-training)]/15"
                placeholder="What should feel easier after this plan?"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-xs text-zinc-500">Desired outcome</span>
              <textarea
                value={desiredOutcome}
                onChange={(e) => setDesiredOutcome(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-[var(--jf-border)] bg-[color:var(--jf-bg-page)] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-[color:var(--jf-accent-training)]/45 focus:ring-2 focus:ring-[color:var(--jf-accent-training)]/15"
                placeholder="One sentence is enough—e.g., post twice weekly without second-guessing."
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-1">
                <span className="text-xs text-zinc-500">Current level</span>
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="w-full rounded-lg border border-[var(--jf-border)] bg-[color:var(--jf-bg-page)] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-[color:var(--jf-accent-training)]/45 focus:ring-2 focus:ring-[color:var(--jf-accent-training)]/15"
                >
                  {SKILL_LEVELS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block space-y-1">
                <span className="text-xs text-zinc-500">{planType === 'free_starter' ? 'Time available' : 'Preferred pace'}</span>
                <select
                  value={paceChoice}
                  onChange={(e) => setPaceChoice(e.target.value)}
                  className="w-full rounded-lg border border-[var(--jf-border)] bg-[color:var(--jf-bg-page)] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-[color:var(--jf-accent-training)]/45 focus:ring-2 focus:ring-[color:var(--jf-accent-training)]/15"
                >
                  {paceOptions.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {planType === 'guided_subscription' ? (
              <label className="flex items-start gap-3 rounded-xl border border-[var(--jf-border)] bg-black/10 p-4 text-sm text-zinc-200">
                <input
                  type="checkbox"
                  checked={includeDiagnosticQuiz}
                  onChange={(e) => setIncludeDiagnosticQuiz(e.target.checked)}
                  className="mt-1 rounded border-zinc-600"
                />
                <span>
                  <span className="font-semibold text-white">Include a short diagnostic quiz at plan start</span>
                  <span className="mt-1 block text-xs text-zinc-500">
                    Useful when you want Jifunze to compare confidence with quick retrieval checks.
                  </span>
                </span>
              </label>
            ) : null}
          </section>
        ) : null}

        {step === 3 ? (
          <section className="jf-instruction-surface space-y-5 bg-white/[0.94] p-6 text-zinc-900">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Optional starting-point help</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                Three quick signals help us recommend a sensible first module emphasis: your confidence slider, and (optionally) three lightweight
                checks. Skip anything you don’t want—this is not scored like an exam.
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-zinc-600">{TRUST_COPY.placementSignalsHeuristic}</p>
            </div>

            <label className="block space-y-2">
              <span className="text-xs text-zinc-500">Self-confidence with this topic (1–5)</span>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={selfConfidence}
                onChange={(e) => setSelfConfidence(Number(e.target.value))}
                className="w-full accent-[color:var(--jf-accent-training)]"
              />
              <p className="text-xs text-zinc-400">{selfConfidence} / 5</p>
            </label>

            {planType === 'free_starter' ? (
              <div className="rounded-xl border border-black/10 bg-white/70 p-4">
                <button
                  type="button"
                  onClick={() => setPlacementExpanded((v) => !v)}
                  className="flex w-full items-center justify-between text-left text-sm font-semibold text-zinc-900"
                >
                  Add a 3-question placement check (optional)
                  <span className="text-xs text-zinc-500">{placementExpanded ? 'Hide' : 'Show'}</span>
                </button>
                {!placementExpanded ? (
                  <p className="mt-2 text-[12px] text-zinc-600">
                    Skip this for a fastest start—come back anytime you want finer calibration.
                  </p>
                ) : null}
              </div>
            ) : null}

            {(planType === 'guided_subscription' || placementExpanded) ? (
              <div className="space-y-4 border-t border-black/10 pt-4">
                <p className="text-xs font-semibold text-zinc-700">Quick check — answer all three if you want this signal</p>
                <p className="text-[12px] text-zinc-600">Leave any unanswered to skip this signal entirely.</p>
                {quickQuestions.map((q, qi) => (
                  <fieldset key={q.sort_order} className="space-y-2 rounded-lg border border-black/10 bg-white/80 p-3">
                    <legend className="sr-only">Question {qi + 1}</legend>
                    <p className="text-sm text-zinc-900">{q.prompt}</p>
                    <div className="space-y-2">
                      {q.options_json.map((opt, oi) => (
                        <label key={oi} className="flex cursor-pointer items-start gap-2 text-xs text-zinc-700">
                          <input
                            type="radio"
                            name={`qc-${qi}`}
                            checked={quickCheck[qi] === oi}
                            onChange={() => {
                              setQuickCheck((prev) => {
                                const next = [...prev]
                                next[qi] = oi
                                return next
                              })
                            }}
                            className="mt-0.5"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {step === 4 ? (
          <section className="space-y-4 rounded-2xl border border-[var(--jf-border)] bg-[color:var(--jf-surface)] p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Build your plan</p>
              <p className="mt-2 text-sm text-zinc-400">Review the essentials below, then create your starting path.</p>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-[var(--jf-border)] pb-3">
                <dt className="text-zinc-500">Plan type</dt>
                <dd className="text-right text-white">
                  {planType === 'free_starter' ? 'Free starter plan' : 'Guided subscription plan'}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[var(--jf-border)] pb-3">
                <dt className="text-zinc-500">Title</dt>
                <dd className="max-w-[60%] text-right text-zinc-200">{title.trim() || '—'}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[var(--jf-border)] pb-3">
                <dt className="text-zinc-500">Topic</dt>
                <dd className="max-w-[60%] text-right text-zinc-200">{topic.trim() || '—'}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[var(--jf-border)] pb-3">
                <dt className="text-zinc-500">Level</dt>
                <dd className="text-right text-zinc-200">{skillLevel}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Pacing</dt>
                <dd className="max-w-[60%] text-right text-zinc-200">{durationLabel}</dd>
              </div>
            </dl>
            <p className="text-[12px] leading-relaxed text-zinc-600">{TRUST_COPY.trainingSurfaceHeuristic}</p>
          </section>
        ) : null}

        {localError ? (
          <TrainingInlineAlert error={localError} onRetry={() => setLocalError(null)} retryLabel="Dismiss" />
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="rounded-lg border border-[var(--jf-border)] bg-black/10 px-4 py-2 text-sm font-semibold text-zinc-200 hover:border-white/15"
              >
                Back
              </button>
            ) : null}
            {step < 4 ? (
              <button
                type="button"
                data-testid="training-wizard-continue"
                onClick={nextStep}
                className="rounded-lg bg-[var(--jf-brand)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--jf-brand-hover)]"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                data-testid="training-wizard-build"
                disabled={busy || mode.kind === 'blocked'}
                className="rounded-lg bg-[color:var(--jf-accent-training)] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy ? 'Creating…' : 'Build my plan'}
              </button>
            )}
          </div>
          <Link
            to="/training"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
