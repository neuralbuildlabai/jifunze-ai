import { useState } from 'react'
import type { FlagshipCurriculumModule } from '../../../data/learning/flagshipCourseCurricula'
import { buildAssessmentItemsForModule } from '../../../lib/flagshipAssessmentCatalog'
import type { FlagshipAssessmentItem } from '../../../lib/flagshipAssessmentTypes'

function AssessmentItemBlock(props: {
  item: FlagshipAssessmentItem
  passed: boolean
  onPass: (id: string) => void
}) {
  const { item, passed, onPass } = props
  const [selected, setSelected] = useState<number | null>(null)
  const [attempted, setAttempted] = useState(false)

  if (item.kind === 'reflection_confirm') {
    return (
      <div className="rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)]/90 px-4 py-4">
        <p className="text-[13px] font-medium text-[color:var(--jf-text)]">{item.prompt}</p>
        <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{item.attestation}</p>
        <label className="mt-4 flex cursor-pointer items-start gap-3 text-[14px] text-[color:var(--jf-text)]">
          <input
            type="checkbox"
            checked={passed}
            disabled={passed}
            onChange={(e) => {
              if (e.target.checked) onPass(item.id)
            }}
            className="mt-1 rounded border-[color:var(--jf-border)]"
          />
          <span>I confirm this checkpoint.</span>
        </label>
      </div>
    )
  }

  const choices = item.choices
  const correct = item.correctIndex
  const wrong = attempted && selected !== null && selected !== correct
  const scenarioText = item.kind === 'scenario_judgment' ? item.scenario : undefined

  return (
    <div className="rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)]/90 px-4 py-4">
      {scenarioText ? <p className="text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{scenarioText}</p> : null}
      <p className={`text-[14px] font-medium text-[color:var(--jf-text)] ${scenarioText ? 'mt-3' : ''}`}>{item.prompt}</p>
      <div className="mt-4 space-y-2" role="radiogroup" aria-label={item.prompt}>
        {choices.map((c, i) => (
          <label
            key={c}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-[13px] leading-relaxed ${
              passed && i === correct
                ? 'border-emerald-800/40 bg-emerald-950/[0.15] text-emerald-100/90'
                : 'border-[color:var(--jf-border)] text-[color:var(--jf-muted)] hover:border-white/[0.12]'
            }`}
          >
            <input
              type="radio"
              name={item.id}
              className="mt-1"
              checked={selected === i}
              disabled={passed}
              onChange={() => setSelected(i)}
            />
            <span>{c}</span>
          </label>
        ))}
      </div>
      {wrong ? (
        <p className="mt-3 text-[13px] leading-relaxed text-amber-200/85">
          Not quite — {item.rationale ?? 'Choose the option that foregrounds evidence, clarity, and proportionate judgment.'}
        </p>
      ) : null}
      {passed ? (
        <p className="mt-3 text-[12px] text-emerald-200/75">Checkpoint recorded.</p>
      ) : (
        <button
          type="button"
          disabled={selected === null}
          onClick={() => {
            setAttempted(true)
            if (selected === correct) onPass(item.id)
          }}
          className="mt-4 inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-[color:var(--jf-surface)] px-5 text-[13px] font-semibold text-[color:var(--jf-text)] ring-1 ring-white/[0.08] transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Confirm checkpoint
        </button>
      )}
    </div>
  )
}

export function FlagshipSessionAssessment(props: {
  module: FlagshipCurriculumModule
  completedIds: Set<string>
  onToggleCheckpoint: (id: string, done: boolean) => void
}) {
  const { module, completedIds, onToggleCheckpoint } = props
  const items = buildAssessmentItemsForModule(module)

  return (
    <section
      className="mt-10 space-y-6"
      aria-labelledby="module-assessment-heading"
      data-testid="flagship-session-assessment-panel"
    >
      <div>
        <h2 id="module-assessment-heading" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">
          Module mastery checkpoints
        </h2>
        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
          Three checkpoints anchor this module: conceptual judgment, scenario decision-making, and a brief applied evidence confirmation. Together with completing
          sessions, they keep capstone prep aligned with real readiness—not navigation alone.
        </p>
      </div>
      {items.map((item) => (
        <AssessmentItemBlock
          key={item.id}
          item={item}
          passed={completedIds.has(item.id)}
          onPass={(id) => onToggleCheckpoint(id, true)}
        />
      ))}
    </section>
  )
}
