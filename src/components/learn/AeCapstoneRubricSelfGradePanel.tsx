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

const RUBRIC_DESCRIPTIONS: Record<AeCapstoneRubricId, string> = {
  problemFraming:
    'A bounded, real task with a named reader, success signal, and explicit scope. A reviewer should not have to guess what you were trying to do.',
  promptWorkflow:
    'Prompts are visible and versioned; the workflow shows triggers, owners, human gates, and prompt attachment points—not just happy-path steps.',
  verificationReview:
    'Load-bearing claims trace to passages or are downgraded to "uncited—needs source." Conflicts stay visible. Verification depth matches reversibility and blast radius.',
  safetyPrivacy:
    'Inputs are classified before paste; redaction or abstraction is applied where Tier 3 content would otherwise leak; never-enter classes are honoured; pause-or-escalate triggers are named.',
  reusability:
    'The pack and playbook would survive the third Tuesday: version notes, refusal boundaries, ownership, and a fresh-scenario test log are present.',
  reflection:
    'A one-page reflection separates what worked, what failed, and what you would refuse to claim—plus the weakest section labeled honestly with a dated next step.',
  presentation:
    'Filenames, disclosure, and bundle navigation match the manuscript. A reviewer can open the bundle cold and find what they need without you narrating.',
}

const LEVEL_GUIDANCE: Record<AeCapstoneRubricLevel, string> = {
  not_ready: 'Evidence is missing or only described in intent, not produced.',
  developing: 'Some evidence exists but a reviewer would still ask for the receipts.',
  ready: 'Evidence is produced and a peer could verify it without you explaining.',
  strong: 'Evidence is produced, verified, and reusable—including by someone else next month.',
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
        Score yourself honestly against the seven criteria. <strong className="font-medium text-[color:var(--jf-text)]">Ready</strong> means a peer
        could verify the evidence in your bundle without you narrating it; <strong className="font-medium text-[color:var(--jf-text)]">Strong</strong>
        adds reusability—someone else could run it next month. This self-check is a learning-readiness signal inside Jifunze; it is not an external
        credential, accreditation, or guarantee. Course progress reaches 100% when every row is Ready or Strong.
      </p>
      <dl className="mt-3 grid gap-1 text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">
        {LEVELS.map((lvl) => (
          <div key={lvl} className="flex flex-wrap gap-x-2">
            <dt className="font-medium text-[color:var(--jf-muted)]">{levelLabel(lvl)}:</dt>
            <dd>{LEVEL_GUIDANCE[lvl]}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 space-y-5">
        {AI_ESSENTIALS_CAPSTONE_RUBRIC_IDS.map((id) => (
          <div key={id} className="border-b border-[color:var(--jf-border)] pb-5 last:border-0 last:pb-0">
            <p className="text-[14px] font-medium text-[color:var(--jf-text)]">{RUBRIC_LABELS[id]}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">{RUBRIC_DESCRIPTIONS[id]}</p>
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
