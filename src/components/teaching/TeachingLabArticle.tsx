import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useAppAccess } from '../../access/useAppAccess'
import type { TeachingLab } from '../../data/teaching/teachingTypes'
import { teachingLabRubricRows } from '../../data/teaching/teachingTypes'
import { clearTeachingLabDraft, readTeachingLabDrafts, writeTeachingLabDraft } from '../../lib/teachingLabDrafts'
import { canAccessTeachingLab, teachingLabAccessLabel } from '../../lib/teachingLabAccess'
import { lessonPublicHref } from '../../lib/learnerHelpEngine'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { recordTeachingSignal } from '../../data/teaching/teachingSignals'

function kindLabel(kind: TeachingLab['kind']): string {
  switch (kind) {
    case 'guided':
      return 'Guided lab'
    case 'practice':
      return 'Practice lab'
    case 'test':
      return 'Test lab'
    case 'checkpoint':
      return 'Checkpoint lab'
    default:
      return 'Lab'
  }
}

export function TeachingLabArticle({ lab }: { lab: TeachingLab }) {
  const { user } = useAuth()
  const { tier } = useAppAccess()
  const unlocked = canAccessTeachingLab(user, tier, lab)
  const rubricRows = teachingLabRubricRows(lab)
  const [drafts, setDrafts] = useState(() => readTeachingLabDrafts())
  const didLogStart = useRef(false)

  useEffect(() => {
    if (didLogStart.current) return
    didLogStart.current = true
    recordTeachingSignal({
      kind: 'lab_start',
      payload: {
        labId: lab.id,
        libraryId: lab.libraryId,
        labKind: lab.kind,
        labAccess: lab.labAccess,
      },
    })
  }, [lab.id, lab.kind, lab.labAccess, lab.libraryId])

  useEffect(() => {
    const onUpdate = () => setDrafts(readTeachingLabDrafts())
    window.addEventListener('jifunze-teaching-lab-drafts-updated', onUpdate)
    return () => window.removeEventListener('jifunze-teaching-lab-drafts-updated', onUpdate)
  }, [])

  const fieldValues = useMemo(() => drafts[lab.id] ?? {}, [drafts, lab.id])

  return (
    <article id={lab.id} className="scroll-mt-28 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.05] pb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {kindLabel(lab.kind)} · {lab.libraryId.replace(/_/g, ' ')}
            {lab.appliedTrack ? (
              <>
                {' '}
                · applied track: <span className="text-zinc-400">{lab.appliedTrack.replace(/_/g, ' ')}</span>
              </>
            ) : null}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">{lab.title}</h2>
          <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-zinc-400">{lab.summary}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full border border-white/[0.08] bg-black/30 px-3 py-1 text-[11px] font-semibold text-zinc-300">
            {lab.id}
          </span>
          <span className="rounded-full border border-emerald-400/15 bg-emerald-500/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-200/85">
            {teachingLabAccessLabel(lab)}
          </span>
        </div>
      </div>

      {lab.learningObjective ? (
        <section className="mt-6 rounded-2xl border border-white/[0.06] bg-black/20 p-4 sm:p-5">
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Learning objective</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">{lab.learningObjective}</p>
        </section>
      ) : null}

      <section className="mt-6 rounded-2xl border border-violet-400/14 bg-violet-500/[0.05] p-4 sm:p-5">
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-violet-200/80">Scenario / context</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-zinc-200/95">{lab.scenario}</p>
      </section>

      {lab.instructionalSamples?.length ? (
        <section className="mt-6">
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Instructional samples (sanitized fiction)</h3>
          <div className="mt-3 space-y-3">
            {lab.instructionalSamples.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/[0.06] bg-black/25 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">{s.label}</p>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-zinc-300">{s.body}</pre>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {lab.prerequisites.length ? (
        <section className="mt-6">
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Prerequisites</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-zinc-400">
            {lab.prerequisites.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Instructions</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-[13px] leading-relaxed text-zinc-300">
            {lab.instructions.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </section>
        <section>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Task framing</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">{lab.task}</p>
          <p className="mt-4 text-[12px] font-semibold text-emerald-200/90">Hint (use after an honest first pass)</p>
          <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">{lab.hint}</p>
          {lab.hintStrong ? (
            <>
              <p className="mt-4 text-[12px] font-semibold text-amber-200/85">Stronger hint (after a weak attempt—still not the answer)</p>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">{lab.hintStrong}</p>
            </>
          ) : null}
        </section>
      </div>

      <section className="mt-8 rounded-2xl border border-white/[0.07] bg-[rgba(18,16,26,0.55)] p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Structured learner capture</h3>
            <p className="mt-1 max-w-3xl text-[12px] leading-relaxed text-zinc-500">
              Each field has a job—this is not a single undifferentiated text box. Drafts save locally in your browser for continuation
              and revision loops.
            </p>
          </div>
          {unlocked ? (
            <button
              type="button"
              onClick={() => {
                clearTeachingLabDraft(lab.id)
                setDrafts(readTeachingLabDrafts())
              }}
              className="text-[11px] font-semibold text-zinc-500 underline-offset-2 transition hover:text-zinc-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
            >
              Clear saved draft
            </button>
          ) : null}
        </div>

        {!unlocked ? (
          <div className="mt-4 rounded-xl border border-amber-400/18 bg-amber-500/[0.06] p-4 sm:p-5">
            <p className="text-[13px] font-semibold text-amber-100/95">{teachingLabAccessLabel(lab)}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">
              You can read the full scenario, rubric, and anchored lessons here. Interactive capture for this lab requires the access layer below—
              materials expand with account and eligible plans; access is not a mastery or qualification outcome.
            </p>
            <p className="mt-3 text-[12px] font-semibold text-zinc-400">You will respond in these structured fields:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-zinc-400">
              {lab.learnerInputs.map((field) => (
                <li key={field.id}>
                  <span className="text-zinc-300">{field.label}</span>
                  {field.guidance ? <span className="text-zinc-600"> — {field.guidance}</span> : null}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3 text-[13px] font-semibold">
              {lab.labAccess === 'signed_in' ? (
                <Link
                  to="/?auth=signin#auth"
                  className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-violet-200/95 transition hover:border-violet-400/35 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
                >
                  Sign in for guided and practice lab access
                </Link>
              ) : null}
              {lab.labAccess === 'premium' ? (
                <>
                  <Link
                    to="/pricing"
                    className="rounded-lg bg-violet-500 px-4 py-2 text-white shadow-md shadow-violet-950/25 transition hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/60"
                  >
                    Unlock deeper AI labs
                  </Link>
                  <Link
                    to="/settings/subscription"
                    className="rounded-lg border border-white/[0.1] px-4 py-2 text-zinc-300 transition hover:border-violet-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
                  >
                    Continue with advanced workflow labs
                  </Link>
                </>
              ) : null}
              <Link
                to="/learning/labs"
                className="rounded-lg px-2 py-2 text-zinc-500 underline-offset-4 transition hover:text-zinc-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
              >
                Open full teaching labs (workspace)
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {lab.learnerInputs.map((field) => (
              <label key={field.id} className="block space-y-2">
                <span className="text-[13px] font-semibold text-zinc-200">{field.label}</span>
                {field.guidance ? <span className="block text-[12px] leading-relaxed text-zinc-500">{field.guidance}</span> : null}
                <textarea
                  value={fieldValues[field.id] ?? ''}
                  onChange={(e) => {
                    writeTeachingLabDraft(lab.id, field.id, e.target.value)
                    setDrafts(readTeachingLabDrafts())
                  }}
                  placeholder={field.placeholder}
                  rows={6}
                  className="w-full resize-y rounded-xl border border-white/[0.08] bg-black/30 px-3 py-2.5 text-[13px] leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:border-violet-400/35 focus:outline-none focus:ring-2 focus:ring-violet-400/25"
                />
              </label>
            ))}
          </div>
        )}
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">What good looks like</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-[13px] leading-relaxed text-zinc-300">
            {lab.whatGoodLooksLike.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Common mistakes / failure patterns</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-[13px] leading-relaxed text-zinc-300">
            {lab.commonMistakes.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Evaluation rubric</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-[13px] leading-relaxed text-zinc-300">
            {rubricRows.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">
            Rubrics are for self-evaluation and peer/coach review—materials access does not imply external certification.
          </p>
        </section>
      </div>

      <section className="mt-8 rounded-2xl border border-white/[0.06] bg-black/20 p-4 sm:p-5">
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Reflection (before next attempt)</h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-zinc-400">
          {lab.reflectionPrompts.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        {unlocked ? (
          <label className="mt-4 block space-y-2">
            <span className="text-[12px] font-semibold text-zinc-300">Reflection notes</span>
            <textarea
              value={fieldValues.reflection_notes ?? ''}
              onChange={(e) => {
                writeTeachingLabDraft(lab.id, 'reflection_notes', e.target.value)
                setDrafts(readTeachingLabDrafts())
              }}
              rows={5}
              placeholder="What would you change next time—specifically, not vaguely?"
              className="w-full resize-y rounded-xl border border-white/[0.08] bg-black/30 px-3 py-2.5 text-[13px] leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:border-violet-400/35 focus:outline-none focus:ring-2 focus:ring-violet-400/25"
            />
          </label>
        ) : (
          <p className="mt-4 text-[12px] leading-relaxed text-zinc-600">
            Reflection capture unlocks with the same access as structured learner fields above.
          </p>
        )}
      </section>

      <section className="mt-6">
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Remediation / retry guidance</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[13px] leading-relaxed text-zinc-400">
          {lab.remediation.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <div className="mt-6 rounded-xl border border-white/[0.06] bg-black/20 p-4">
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Anchored lessons</h3>
        <ul className="mt-2 space-y-2">
          {lab.lessonSlugs.map((slug) => {
            const href = lessonPublicHref(slug)
            if (!href) return null
            return (
              <li key={slug}>
                <Link
                  to={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] font-semibold text-violet-300/95 hover:text-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
                >
                  Open lesson reader → <span className="font-normal text-zinc-500">{slug}</span>
                </Link>
              </li>
            )
          })}
        </ul>
        <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">
          Access badges on each lesson still apply (public vs signed-in vs eligible plans).
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Continuation / next steps</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[13px] leading-relaxed text-zinc-400">
          {lab.nextSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      {unlocked ? (
        <div className="mt-8 rounded-xl border border-white/[0.06] bg-black/25 p-4">
          <p className="text-[12px] font-semibold text-zinc-300">Continuity signal (optional)</p>
          <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
            Log when you finish a deliberate attempt—helps your future revision loops and improves aggregate teaching analytics when you are
            signed in.
          </p>
          <button
            type="button"
            onClick={() =>
              recordTeachingSignal({
                kind: 'lab_complete',
                payload: { labId: lab.id, libraryId: lab.libraryId, labKind: lab.kind },
              })
            }
            className="mt-3 inline-flex items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-500/[0.08] px-4 py-2 text-[13px] font-semibold text-emerald-100/95 transition hover:border-emerald-400/45 hover:bg-emerald-500/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/55"
          >
            Log lab attempt complete
          </button>
        </div>
      ) : null}

      <p className="mt-6 text-[11px] leading-relaxed text-zinc-600">
        Labs are instructional practice—pair with your organization’s policies and any professional requirements that apply.{' '}
        <Link to={LEGAL_ROUTES.disclaimer} className="font-medium text-violet-300/85 underline-offset-2 hover:underline">
          Full disclaimer
        </Link>
      </p>
    </article>
  )
}
