import type { FlagshipCurriculumModule } from '../../../data/learning/flagshipCourseCurricula'
import { masteryAttestationCopy } from '../../../lib/flagshipMasteryCheckpoint'

/** Module-end mastery attestation — lightweight, premium, non-exam. */
export function FlagshipSessionPracticeMastery(props: {
  module: FlagshipCurriculumModule
  checkpointId: string
  acknowledged: boolean
  onToggle: (done: boolean) => void
}) {
  const { module, checkpointId, acknowledged, onToggle } = props

  return (
    <section
      className="mt-10 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)]/90 px-5 py-6 ring-1 ring-white/[0.03]"
      aria-labelledby="practice-mastery-heading"
      data-testid="flagship-session-mastery-checkpoint"
    >
      <p id="practice-mastery-heading" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">
        Module mastery checkpoint
      </p>
      <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{masteryAttestationCopy(module)}</p>
      <label className="mt-5 flex cursor-pointer items-start gap-3 text-[14px] text-[color:var(--jf-text)]">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => onToggle(e.target.checked)}
          className="mt-1 rounded border-[color:var(--jf-border)]"
          aria-describedby="practice-mastery-heading"
        />
        <span>I&apos;m ready to confirm this module checkpoint ({checkpointId}).</span>
      </label>
      <p className="mt-4 text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">
        Before you move on: this is a judgment checkpoint—not a quiz. Change your answer anytime as your understanding deepens.
      </p>
    </section>
  )
}
