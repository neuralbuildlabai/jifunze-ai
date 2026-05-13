import type { ReactNode } from 'react'

type Props = {
  title: string
  playerSrc: string
  heading: string
  description?: ReactNode
  /** Shown as a quiet text link — not a second primary CTA. */
  newWindowHref: string
  newWindowLabel?: string
  newWindowTestId?: string
  testId?: string
}

/**
 * Warm-shell wrapper for embedded interactive courses — no vendor branding in chrome.
 */
export function CourseInteractiveEmbed(props: Props) {
  const {
    title,
    playerSrc,
    heading,
    description,
    newWindowHref,
    newWindowLabel = 'Open in new window',
    newWindowTestId,
    testId = 'course-interactive-embed',
  } = props

  return (
    <section
      id="course-player"
      className="scroll-mt-24 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 shadow-[var(--jf-shadow-soft)] sm:p-6"
      data-testid={testId}
      aria-labelledby="course-interactive-embed-heading"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 id="course-interactive-embed-heading" className="text-base font-semibold tracking-tight text-[color:var(--jf-text)]">
            {heading}
          </h2>
          {description ? <div className="mt-1.5 text-sm leading-relaxed text-[color:var(--jf-muted)]">{description}</div> : null}
        </div>
        <a
          href={newWindowHref}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[12px] font-medium text-[color:var(--jf-muted)] underline decoration-stone-300/80 underline-offset-4 transition hover:text-[color:var(--jf-text)]"
          data-testid={newWindowTestId}
        >
          {newWindowLabel}
        </a>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-stone-200/90 bg-stone-50/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-black/[0.03]">
        <iframe
          title={title}
          src={playerSrc}
          className="block aspect-[16/10] min-h-[min(70vh,560px)] w-full md:min-h-[620px]"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="fullscreen"
        />
      </div>
    </section>
  )
}
