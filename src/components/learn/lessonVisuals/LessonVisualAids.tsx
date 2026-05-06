import type { LessonVisualAid } from '../../../data/learning/flagshipSessionContentTypes'

/** Warm instructional accents — align with JifunzeLearnVisuals gradients */
const strokeSoft = 'rgba(120,113,108,0.22)'
const accent = '#ea580c'

function ArrowConnector({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 12" fill="none" aria-hidden>
      <path d="M2 6h16m4-4-4 4 4 4" stroke={strokeSoft} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Prompt → model output → human review → accountable decision */
export function PromptReviewCycleMini({ caption }: { caption?: string }) {
  const steps = ['Prompt', 'Output', 'Review', 'Decide']
  return (
    <figure
      className="rounded-xl border border-[color:var(--jf-border)] bg-gradient-to-br from-orange-50/80 via-[color:var(--jf-surface)] to-stone-50/90 px-3 py-4 shadow-[var(--jf-shadow-soft)] sm:px-4"
      aria-label={caption ?? 'Workflow: prompt, then output, then human review, then decide'}
    >
      <p className="text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-subtle)]">
        Output isn&apos;t truth — verify before you trust
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
        {steps.map((label, i) => (
          <span key={label} className="flex items-center gap-1 sm:gap-2">
            {i > 0 ? <ArrowConnector className="hidden h-3 w-6 shrink-0 sm:inline-block" /> : null}
            <span className="inline-flex min-w-[5rem] justify-center rounded-lg border border-stone-200/80 bg-white/90 px-2 py-1.5 text-center text-[11px] font-medium text-[color:var(--jf-text)] shadow-sm sm:min-w-[4.25rem] sm:px-3">
              {label}
            </span>
          </span>
        ))}
      </div>
      {caption ? <p className="mt-2 text-center text-[11px] text-[color:var(--jf-muted)]">{caption}</p> : null}
    </figure>
  )
}

/** Plan → execute → verify → save */
export function PracticeSequenceFigure({ caption }: { caption?: string }) {
  const steps = ['Plan', 'Execute', 'Verify', 'Save']
  return (
    <figure
      className="rounded-xl border border-[color:var(--jf-border)] bg-white/95 px-3 py-4 shadow-[var(--jf-shadow-soft)] sm:px-4"
      aria-label={caption ?? 'Practice sequence: plan, execute, verify, save evidence'}
    >
      <figcaption className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-subtle)]">
        Practice sequence
      </figcaption>
      <ol className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-center sm:gap-3">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2 sm:max-w-[14rem]">
            {i > 0 ? (
              <span className="hidden shrink-0 text-[color:var(--jf-subtle)] sm:inline" aria-hidden>
                →
              </span>
            ) : null}
            <span className="flex min-h-[2.25rem] w-full items-center rounded-lg border border-orange-200/60 bg-orange-50/50 px-3 py-2 text-[12px] font-medium text-[color:var(--jf-text)]">
              <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold text-orange-700 shadow-sm">
                {i + 1}
              </span>
              {label}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  )
}

/** Scenario → model → human judgment → next action */
export function JudgmentFlowMini({ caption }: { caption?: string }) {
  const steps = ['Input', 'Model', 'Check', 'Decide']
  return (
    <figure
      className="rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)]/95 px-3 py-3 sm:px-4"
      aria-label={caption ?? 'Judgment flow from input through model output to human check and decision'}
    >
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[11px] font-medium text-[color:var(--jf-muted)]">
        {steps.map((t, i) => (
          <span key={t} className="flex items-center gap-2">
            {i > 0 ? <span className="text-[color:var(--jf-subtle)]" aria-hidden>
              →
            </span> : null}
            <span className="rounded-md border border-stone-200/90 bg-white px-2.5 py-1 text-[color:var(--jf-text)] shadow-sm">{t}</span>
          </span>
        ))}
      </div>
    </figure>
  )
}

export function ProcessStepsFigure(props: {
  title?: string
  steps: readonly string[]
  orientation?: 'horizontal' | 'vertical'
}) {
  const { title, steps, orientation = 'horizontal' } = props
  const isVertical = orientation === 'vertical'

  return (
    <figure className="rounded-xl border border-[color:var(--jf-border)] bg-white/95 px-4 py-4 shadow-sm" aria-label={title}>
      {title ? <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-subtle)]">{title}</p> : null}
      {isVertical ? (
        <ol className={`mt-3 space-y-2 ${title ? '' : 'mt-0'}`}>
          {steps.map((s, i) => (
            <li key={s} className="flex gap-3 text-[13px] leading-snug text-[color:var(--jf-muted)]">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-[11px] font-bold text-stone-700"
                aria-hidden
              >
                {i + 1}
              </span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      ) : (
        <div className={`flex flex-wrap items-stretch justify-start gap-2 ${title ? 'mt-3' : ''}`}>
          {steps.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              {i > 0 ? <ArrowConnector className="hidden h-3 w-5 shrink-0 md:inline-block" /> : null}
              <span className="inline-flex max-w-[11rem] flex-col rounded-lg border border-stone-200/80 bg-stone-50/60 px-2.5 py-2 text-[12px] leading-snug text-[color:var(--jf-text)]">
                <span className="text-[10px] font-semibold text-[color:var(--jf-subtle)]">Step {i + 1}</span>
                <span className="mt-0.5 text-[color:var(--jf-muted)]">{s}</span>
              </span>
            </span>
          ))}
        </div>
      )}
    </figure>
  )
}

type CalloutVariant = Extract<LessonVisualAid, { kind: 'callout' }>['variant']

const CALLOUT_STYLES: Record<CalloutVariant, { ring: string; icon: string; label: string }> = {
  insight: {
    ring: 'border-violet-200/80 bg-violet-50/70',
    icon: 'text-violet-700',
    label: 'Key insight',
  },
  caution: {
    ring: 'border-amber-200/90 bg-amber-50/80',
    icon: 'text-amber-800',
    label: 'Caution',
  },
  privacy: {
    ring: 'border-slate-300/80 bg-slate-50/90',
    icon: 'text-slate-700',
    label: 'Privacy',
  },
  verify: {
    ring: 'border-emerald-200/80 bg-emerald-50/75',
    icon: 'text-emerald-800',
    label: 'Verify',
  },
  practice_tip: {
    ring: 'border-orange-200/80 bg-orange-50/60',
    icon: 'text-orange-800',
    label: 'Practice tip',
  },
}

function CalloutIcon({ variant }: { variant: CalloutVariant }) {
  const common = 'h-4 w-4 shrink-0'
  switch (variant) {
    case 'insight':
      return (
        <svg className={`${common} ${CALLOUT_STYLES.insight.icon}`} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    case 'caution':
      return (
        <svg className={`${common} ${CALLOUT_STYLES.caution.icon}`} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 7v7m0 3h.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M10.3 3.9 3.7 15.3a2 2 0 0 0 1.7 3h13.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
        </svg>
      )
    case 'privacy':
      return (
        <svg className={`${common} ${CALLOUT_STYLES.privacy.icon}`} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="6" y="11" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    case 'verify':
      return (
        <svg className={`${common} ${CALLOUT_STYLES.verify.icon}`} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M8 12.5 11 16 17 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      )
    case 'practice_tip':
    default:
      return (
        <svg className={`${common} ${CALLOUT_STYLES.practice_tip.icon}`} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 5v8m0 4h.01" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" stroke={accent} strokeOpacity={0.35} strokeWidth="1.25" />
        </svg>
      )
  }
}

export function CalloutFigure(props: { variant: CalloutVariant; title: string; body: string }) {
  const { variant, title, body } = props
  const st = CALLOUT_STYLES[variant]
  return (
    <aside className={`rounded-xl border px-4 py-3.5 ${st.ring}`} role="note" aria-label={`${st.label}: ${title}`}>
      <div className="flex gap-3">
        <CalloutIcon variant={variant} />
        <div className="min-w-0 space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[color:var(--jf-subtle)]">{st.label}</p>
          <p className="text-[14px] font-semibold text-[color:var(--jf-text)]">{title}</p>
          <p className="text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{body}</p>
        </div>
      </div>
    </aside>
  )
}

export function ComparisonFigure(props: {
  weakLabel?: string
  strongLabel?: string
  weak: string
  strong: string
  caption?: string
}) {
  const { weakLabel = 'Weaker', strongLabel = 'Stronger', weak, strong, caption } = props
  return (
    <figure className="grid gap-3 sm:grid-cols-2" aria-label={caption ?? 'Side by side comparison'}>
      <figcaption className="sr-only">Comparison of weaker versus stronger approach</figcaption>
      <div className="rounded-xl border border-stone-200/90 bg-stone-50/80 px-3 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-600">{weakLabel}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{weak}</p>
      </div>
      <div className="rounded-xl border border-orange-200/70 bg-orange-50/50 px-3 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-orange-900/80">{strongLabel}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{strong}</p>
      </div>
      {caption ? <p className="sm:col-span-2 text-center text-[11px] text-[color:var(--jf-subtle)]">{caption}</p> : null}
    </figure>
  )
}

export function ArtifactExpectationsCard(props: {
  /** When true, omit the built‑in title (use when a section heading already labels the card). */
  embedded?: boolean
  title?: string
  summary?: string
  bullets?: readonly string[]
}) {
  const { embedded = false, title = 'What you will produce', summary, bullets } = props
  return (
    <div className="rounded-xl border border-[color:var(--jf-border)] bg-white px-4 py-4 shadow-[var(--jf-shadow-soft)]">
      <div className="flex gap-3">
        <svg className="mt-0.5 h-8 w-8 shrink-0 text-orange-600/85" viewBox="0 0 32 32" fill="none" aria-hidden>
          <rect x="6" y="5" width="20" height="22" rx="2.5" stroke="currentColor" strokeOpacity={0.35} strokeWidth="1.25" />
          <path d="M10 11h12M10 16h8M10 21h10" stroke="currentColor" strokeOpacity={0.45} strokeWidth="1.25" strokeLinecap="round" />
        </svg>
        <div className="min-w-0 space-y-2">
          {embedded ? null : <p className="text-[13px] font-semibold text-[color:var(--jf-text)]">{title}</p>}
          {summary ? <p className="text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{summary}</p> : null}
          {bullets && bullets.length > 0 ? (
            <ul className="space-y-1.5">
              {bullets.map((b) => (
                <li key={b} className="flex gap-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-400/80" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export function VerificationChecklistFigure(props: { title?: string; items: readonly string[] }) {
  const { title, items } = props
  return (
    <figure className="rounded-xl border border-emerald-200/70 bg-emerald-50/40 px-4 py-3.5" aria-label={title ?? 'Verification checklist'}>
      {title ? <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-900/75">{title}</p> : null}
      <ul className={`space-y-2 ${title ? 'mt-2' : ''}`}>
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700/85" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M8 12.5 11 16 17 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeOpacity={0.25} strokeWidth="1.25" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </figure>
  )
}

export function LessonVisualAidRenderer({ aid }: { aid: LessonVisualAid }) {
  switch (aid.kind) {
    case 'prompt_review_cycle':
      return <PromptReviewCycleMini caption={aid.caption} />
    case 'practice_sequence':
      return <PracticeSequenceFigure caption={aid.caption} />
    case 'judgment_flow':
      return <JudgmentFlowMini caption={aid.caption} />
    case 'process_steps':
      return <ProcessStepsFigure title={aid.title} steps={aid.steps} orientation={aid.orientation} />
    case 'comparison':
      return (
        <ComparisonFigure
          weakLabel={aid.weakLabel}
          strongLabel={aid.strongLabel}
          weak={aid.weak}
          strong={aid.strong}
          caption={aid.caption}
        />
      )
    case 'callout':
      return <CalloutFigure variant={aid.variant} title={aid.title} body={aid.body} />
    case 'artifact_expectations':
      return <ArtifactExpectationsCard title={aid.title} summary={aid.summary} bullets={aid.bullets} />
    case 'verification_checklist':
      return <VerificationChecklistFigure title={aid.title} items={aid.items} />
  }
}
