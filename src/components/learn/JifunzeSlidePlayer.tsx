import { useCallback, useEffect, useMemo, useState } from 'react'

export type NarrationStatus = 'ready' | 'planned' | 'missing'

export type JifunzeSlidePlayerSlide = {
  id: string
  slideNumber: number
  title: string
  imageSrc: string
  altText: string
  lessonId?: string
  keyTakeaway?: string
}

export type JifunzeSlidePlayerProps = {
  title: string
  subtitle?: string
  slides: readonly JifunzeSlidePlayerSlide[]
  initialSlideIndex?: number
  /** When showing a subset, pass full-deck count so the counter reads e.g. “Slide 10 of 40.” */
  slideCounterTotal?: number
  deckDownloadUrl?: string
  showDownload?: boolean
  showThumbnails?: boolean
  showSpeakerNotes?: boolean
  emptyStateMessage?: string
  /** Optional narration / voiceover track (single file for module or full course). */
  audioSrc?: string
  narrationStatus?: NarrationStatus
  /** Transcript text keyed by slide number (current slide shows in transcript panel). */
  slideTranscripts?: Readonly<Partial<Record<number, string>>>
  showTranscript?: boolean
}

const MISSING_SLIDE_MESSAGE =
  'Slide image pending. Export slide images to public/course-assets/[course-slug]/slides/ to enable playback.'

export function JifunzeSlidePlayer({
  title,
  subtitle,
  slides,
  initialSlideIndex = 0,
  slideCounterTotal,
  deckDownloadUrl,
  showDownload = true,
  showThumbnails = false,
  showSpeakerNotes = false,
  emptyStateMessage,
  audioSrc,
  narrationStatus = 'missing',
  slideTranscripts,
  showTranscript = false,
}: JifunzeSlidePlayerProps) {
  const safeInitial = Math.max(0, Math.min(initialSlideIndex, Math.max(0, slides.length - 1)))
  const [index, setIndex] = useState(safeInitial)
  const [brokenSrc, setBrokenSrc] = useState<Record<string, true>>({})

  useEffect(() => {
    setIndex(Math.max(0, Math.min(initialSlideIndex, Math.max(0, slides.length - 1))))
  }, [initialSlideIndex, slides])

  const totalForLabel = slideCounterTotal ?? Math.max(1, slides.length)
  const current = slides[index]
  const progressPct = slides.length > 0 ? ((index + 1) / slides.length) * 100 : 0

  const currentTranscript = useMemo(() => {
    if (!current || !slideTranscripts) return undefined
    return slideTranscripts[current.slideNumber]
  }, [current, slideTranscripts])

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1))
  }, [])

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(slides.length - 1, i + 1))
  }, [slides.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  const deckFileName = useMemo(() => {
    if (!deckDownloadUrl) return ''
    try {
      const u = deckDownloadUrl.startsWith('http') ? deckDownloadUrl : `https://example.com${deckDownloadUrl}`
      const path = new URL(u).pathname
      const seg = path.split('/').filter(Boolean)
      return seg[seg.length - 1] ?? 'deck.pptx'
    } catch {
      const parts = deckDownloadUrl.split('/')
      return parts[parts.length - 1] ?? 'deck.pptx'
    }
  }, [deckDownloadUrl])

  if (slides.length === 0) {
    return (
      <section
        className="rounded-2xl border border-dashed border-stone-300 bg-stone-50/80 p-8 text-center"
        aria-label={title}
      >
        <h2 className="text-lg font-semibold text-stone-800">{title}</h2>
        <p className="mt-3 text-[14px] text-stone-600">{emptyStateMessage ?? 'No slides in this view yet.'}</p>
      </section>
    )
  }

  const showMissing = current && brokenSrc[current.imageSrc]
  const takeaway = showSpeakerNotes && current?.keyTakeaway
  const showPlannedBadge = !audioSrc && narrationStatus === 'planned'
  const showAudio = Boolean(audioSrc)

  return (
    <section className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm sm:p-7" aria-label={title}>
      <div className="flex flex-col gap-2 border-b border-stone-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">{title}</h2>
          {subtitle ? <p className="mt-1 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{subtitle}</p> : null}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {showAudio ? (
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-900">Narrated lesson</span>
          ) : null}
          {showPlannedBadge ? (
            <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-medium text-stone-600">Voiceover coming soon</span>
          ) : null}
        </div>
      </div>

      {showAudio ? (
        <div className="mt-4">
          <audio className="h-9 w-full max-w-xl" controls src={audioSrc} preload="metadata">
            <track kind="captions" />
          </audio>
          <p className="mt-1 text-[11px] text-stone-500">Audio plays alongside the slides. Advance slides manually to match your pace.</p>
        </div>
      ) : null}

      <div className="mt-5">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-950/5">
          {showMissing ? (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 bg-stone-100 px-6 text-center sm:min-h-[280px]">
              <p className="text-[15px] font-semibold text-stone-800">Slide image pending.</p>
              <p className="max-w-md text-[13px] leading-relaxed text-stone-600">{MISSING_SLIDE_MESSAGE}</p>
            </div>
          ) : (
            <img
              key={current!.id}
              src={current!.imageSrc}
              alt={current!.altText}
              className="h-full w-full object-contain"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              onError={() =>
                setBrokenSrc((prev) => ({
                  ...prev,
                  [current!.imageSrc]: true,
                }))
              }
            />
          )}
        </div>
        <p className="mt-3 text-[13px] font-medium text-stone-800">{current?.title}</p>
      </div>

      {takeaway ? (
        <aside className="mt-4 rounded-lg border border-orange-100 bg-orange-50/60 px-4 py-3 text-[13px] leading-relaxed text-stone-800">
          <span className="font-semibold text-orange-900">Key takeaway: </span>
          {takeaway}
        </aside>
      ) : null}

      {showTranscript && currentTranscript?.trim() ? (
        <details className="mt-4 rounded-lg border border-stone-200/90 bg-stone-50/60 px-4 py-2">
          <summary className="cursor-pointer text-[13px] font-semibold text-stone-800">Read transcript</summary>
          <p className="mt-2 text-[13px] leading-relaxed text-stone-700">{currentTranscript}</p>
        </details>
      ) : null}

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex min-h-[2.5rem] min-w-[7rem] items-center justify-center rounded-full border border-stone-300 bg-white px-4 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={goPrev}
            disabled={index <= 0}
            aria-label="Previous slide"
          >
            Previous
          </button>
          <button
            type="button"
            className="inline-flex min-h-[2.5rem] min-w-[7rem] items-center justify-center rounded-full bg-gradient-to-r from-orange-600 to-amber-600 px-4 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={goNext}
            disabled={index >= slides.length - 1}
            aria-label="Next slide"
          >
            Next
          </button>
        </div>
        <p className="text-[14px] font-medium tabular-nums text-stone-700" data-testid="jifunze-slide-counter">
          Slide {current?.slideNumber ?? index + 1} of {totalForLabel}.
        </p>
      </div>

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200" role="progressbar" aria-valuemin={1} aria-valuemax={slides.length} aria-valuenow={index + 1} aria-label="Slide progress">
          <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-[width] duration-300 ease-out" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {showDownload && deckDownloadUrl ? (
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={deckDownloadUrl}
            download={deckFileName || undefined}
            className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-orange-800 shadow-sm transition hover:bg-orange-50/80"
          >
            Download full deck
          </a>
        </div>
      ) : null}

      {showThumbnails ? (
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Slide thumbnails">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${i === index ? 'border-orange-500 ring-2 ring-orange-200' : 'border-stone-200 opacity-80 hover:opacity-100'}`}
              onClick={() => setIndex(i)}
            >
              {brokenSrc[s.imageSrc] ? (
                <span className="flex h-full w-full items-center justify-center bg-stone-200 text-[9px] text-stone-600">Pending</span>
              ) : (
                <img src={s.imageSrc} alt="" className="h-full w-full object-cover" loading="lazy" />
              )}
            </button>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export { MISSING_SLIDE_MESSAGE }
