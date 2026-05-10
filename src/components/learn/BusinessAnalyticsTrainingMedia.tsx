import { useMemo } from 'react'
import { businessAnalyticsDecisionMakingNarrationManifest, getBaAudioSrcWhenReady, getBaModuleNarrationAudioSrc } from '../../data/courses/businessAnalyticsDecisionMakingNarration'
import type { BusinessAnalyticsSlideEntry } from '../../data/courses/businessAnalyticsDecisionMakingSlides'
import { businessAnalyticsDecisionMakingSlideManifest } from '../../data/courses/businessAnalyticsDecisionMakingSlides'
import { JifunzeSlidePlayer } from './JifunzeSlidePlayer'

function plannedDeckCopy(scope: 'course' | 'module'): string {
  if (scope === 'course') {
    return 'In-browser slide playback is planned: PNG exports are not published to this site yet. You can still train from the downloadable PowerPoint and companion notes. When images are exported to public/course-assets/business-analytics-decision-making/slides/, the player will activate automatically.'
  }
  return 'This module’s slide images are not in the public player yet. Use the deck download and your lesson checkpoints until PNG export is complete.'
}

function PlannedMediaPanel({
  scope,
  testId,
}: {
  scope: 'course' | 'module'
  testId: string
}) {
  const m = businessAnalyticsDecisionMakingSlideManifest
  return (
    <section
      className="rounded-2xl border border-stone-200/90 bg-stone-50/50 p-5 shadow-sm sm:p-7"
      data-testid={testId}
      aria-label="Training media"
    >
      <h2 className="text-lg font-semibold tracking-tight text-stone-900">Slide playback</h2>
      <p className="mt-2 text-[14px] leading-relaxed text-stone-600">{plannedDeckCopy(scope)}</p>
      <div className="mt-5">
        <a
          href={m.deckDownloadUrl}
          download
          className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-orange-900 shadow-sm transition hover:bg-orange-50/80"
        >
          Download slide deck (PowerPoint)
        </a>
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-stone-500">
        Voiceover is planned. When module MP3 files are added under <span className="font-mono text-[11px]">public/course-assets/business-analytics-decision-making/audio/</span> and narration is marked ready, audio controls will appear here.
      </p>
    </section>
  )
}

/** Full-course player when slide assets are `ready`; otherwise a calm planned panel. */
export function BusinessAnalyticsCourseTrainingBlock() {
  const m = businessAnalyticsDecisionMakingSlideManifest
  const narration = businessAnalyticsDecisionMakingNarrationManifest

  if (m.assetStatus === 'ready' && m.slides.length > 0) {
    return (
      <section data-testid="standalone-ba-slide-player-overview" className="scroll-mt-8 space-y-3" id="ba-course-player">
        <JifunzeSlidePlayer
          title="Play full course slides"
          subtitle="Use the deck as the main training path. Open a module for labs, lesson checkpoints, and the Module 6 quiz."
          slides={m.slides}
          slideCounterTotal={m.totalSlides}
          deckDownloadUrl={m.deckDownloadUrl}
          showDownload
          showThumbnails={false}
          narrationStatus={narration.status}
          showTranscript={false}
        />
      </section>
    )
  }

  return <PlannedMediaPanel scope="course" testId="standalone-ba-slide-planned-overview" />
}

export function BusinessAnalyticsModuleTrainingBlock({
  moduleSlug,
  slides,
}: {
  moduleSlug: string
  slides: readonly BusinessAnalyticsSlideEntry[]
}) {
  const m = businessAnalyticsDecisionMakingSlideManifest
  const narration = businessAnalyticsDecisionMakingNarrationManifest
  const moduleAudioSrc = useMemo(
    () => getBaAudioSrcWhenReady(narration.status, getBaModuleNarrationAudioSrc(moduleSlug)),
    [moduleSlug, narration.status],
  )

  if (m.assetStatus === 'ready' && slides.length > 0) {
    return (
      <section data-testid={`standalone-ba-slide-player-module-${moduleSlug}`}>
        <JifunzeSlidePlayer
          title="Narrated module slides"
          subtitle="Work through this chapter in order. Open lessons for short checkpoints and to mark progress."
          slides={slides}
          slideCounterTotal={m.totalSlides}
          deckDownloadUrl={m.deckDownloadUrl}
          showDownload
          audioSrc={moduleAudioSrc}
          narrationStatus={narration.status}
          showTranscript={false}
        />
      </section>
    )
  }

  return <PlannedMediaPanel scope="module" testId={`standalone-ba-slide-planned-module-${moduleSlug}`} />
}
