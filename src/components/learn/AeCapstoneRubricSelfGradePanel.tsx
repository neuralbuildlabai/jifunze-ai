import {
  AI_ESSENTIALS_CAPSTONE_RUBRIC_IDS,
  type AeCapstoneRubricId,
  type AeCapstoneRubricLevel,
  type AeCapstoneRubricSelfGrade,
} from '../../lib/flagshipCourseProgressDerived'

const RUBRIC_LABELS: Record<AeCapstoneRubricId, string> = {
  problemFraming: 'Problem framing',
  promptWorkflow: 'Prompt and workflow design',
  verificationReview: 'Verification and review',
  safetyPrivacy: 'Safety and privacy',
  reusability: 'Reusability',
  reflection: 'Reflection',
  presentation: 'Presentation quality',
}

const LEVELS: AeCapstoneRubricLevel[] = ['not_ready', 'developing', 'ready', 'strong']

function levelLabel(l: AeCapstoneRubricLevel): string {
  switch (l) {
    case 'not_ready':
      return 'Not ready'
    case 'developing':
      return 'Developing'
    case 'ready':
      return 'Ready'
    case 'strong':
      return 'Strong'
    default:
      return l
  }
}

export function AeCapstoneRubricSelfGradePanel(props: {
  grade: AeCapstoneRubricSelfGrade | undefined
  onChange: (id: AeCapstoneRubricId, level: AeCapstoneRubricLevel | null) => void
}) {
  const { grade, onChange } = props
  return (
    <section
      className="mt-10 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-5 py-6 shadow-[var(--jf-shadow-soft)] sm:px-7"
      aria-labelledby="ae-capstone-rubric-heading"
    >
      <h2 id="ae-capstone-rubric-heading" className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">
        Capstone rubric self-check
      </h2>
      <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
        For AI Essentials, set each row to <strong className="font-medium text-[color:var(--jf-text)]">Ready</strong> or{' '}
        <strong className="font-medium text-[color:var(--jf-text)]">Strong</strong> when your evidence matches the
        module manuscript. Course progress reaches 100% and certificate readiness requires all seven rows.
      </p>
      <div className="mt-6 space-y-5">
        {AI_ESSENTIALS_CAPSTONE_RUBRIC_IDS.map((id) => (
          <div key={id} className="border-b border-[color:var(--jf-border)] pb-5 last:border-0 last:pb-0">
            <p className="text-[14px] font-medium text-[color:var(--jf-text)]">{RUBRIC_LABELS[id]}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {LEVELS.map((lvl) => (
                <label
                  key={lvl}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[color:var(--jf-border)] px-3 py-1.5 text-[12px] text-[color:var(--jf-muted)] has-[:checked]:border-[color:var(--jf-text)]/40 has-[:checked]:bg-[color:var(--jf-bg-page)] has-[:checked]:text-[color:var(--jf-text)]"
                >
                  <input
                    type="radio"
                    name={`ae-rubric-${id}`}
                    checked={grade?.[id] === lvl}
                    onChange={() => onChange(id, lvl)}
                    className="h-3 w-3 shrink-0 border-[color:var(--jf-border)] accent-[color:var(--jf-text)]"
                  />
                  {levelLabel(lvl)}
                </label>
              ))}
              <button
                type="button"
                className="text-[12px] text-[color:var(--jf-subtle)] underline decoration-dotted underline-offset-2 hover:text-[color:var(--jf-muted)]"
                onClick={() => onChange(id, null)}
              >
                Clear
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
