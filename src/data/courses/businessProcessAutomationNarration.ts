/**
 * Voiceover / narration manifest for Business Process Automation for Work.
 * Status stays `planned` until real MP3 files exist under public/course-assets/.../audio/.
 */

import { BUSINESS_PROCESS_AUTOMATION_SLUG } from './businessProcessAutomationConstants'
import type { CourseNarrationManifest, NarrationStatus, SlideNarration } from './courseNarrationTypes'
import { narrationAudioSrcWhenReady } from './narrationHelpers'
import { businessProcessAutomationSlideManifest } from './businessProcessAutomationSlides'

const ASSET_BASE = '/course-assets/business-process-automation-for-work'

/** Expected module filenames (see public/.../audio/README.md). */
export const BPA_EXPECTED_MODULE_AUDIO_FILENAMES = {
  'automation-foundations': 'module-1-automation-foundations.mp3',
  'understanding-current-workflow': 'module-2-current-workflow-analysis.mp3',
  'finding-automation-opportunities': 'module-3-automation-opportunity-scoring.mp3',
  'designing-future-workflow': 'module-4-future-workflow-design.mp3',
  'business-value-risk-implementation': 'module-5-business-value-risk-roadmap.mp3',
} as const

export const BPA_EXPECTED_FULL_COURSE_AUDIO = `${ASSET_BASE}/audio/full-course-voiceover.mp3` as const

function transcriptForSlide(slideNumber: number, title: string): string {
  const band =
    slideNumber <= 8
      ? 'In Module 1, we ground the language of automation before we touch tools.'
      : slideNumber <= 16
        ? 'In Module 2, we read BrightPath’s manual baseline the way an operations lead would.'
        : slideNumber <= 24
          ? 'In Module 3, we score where automation actually belongs in the sequence.'
          : slideNumber <= 31
            ? 'In Module 4, we translate analysis into a redesigned workflow.'
            : 'In Module 5, we quantify impact, manage risk, and land a credible roadmap.'

  return `${band} This slide is titled: ${title}. Read what is on screen, pause where you need to think, and connect each idea back to BrightPath—or to a workflow you already know.`
}

function keyTakeawayForSlide(title: string): string {
  return `Carry forward one idea from “${title}” into your notes before you move on.`
}

function buildSlideNarrations(): readonly SlideNarration[] {
  return businessProcessAutomationSlideManifest.slides.map((s) => {
    const t = transcriptForSlide(s.slideNumber, s.title)
    return {
      slideNumber: s.slideNumber,
      transcript: t,
      speakerNotes: t,
      keyTakeaway: keyTakeawayForSlide(s.title),
    }
  })
}

export const businessProcessAutomationNarrationManifest: CourseNarrationManifest = {
  courseSlug: BUSINESS_PROCESS_AUTOMATION_SLUG,
  status: 'planned',
  fullCourseAudioSrc: BPA_EXPECTED_FULL_COURSE_AUDIO,
  moduleAudio: {
    'automation-foundations': `${ASSET_BASE}/audio/${BPA_EXPECTED_MODULE_AUDIO_FILENAMES['automation-foundations']}`,
    'understanding-current-workflow': `${ASSET_BASE}/audio/${BPA_EXPECTED_MODULE_AUDIO_FILENAMES['understanding-current-workflow']}`,
    'finding-automation-opportunities': `${ASSET_BASE}/audio/${BPA_EXPECTED_MODULE_AUDIO_FILENAMES['finding-automation-opportunities']}`,
    'designing-future-workflow': `${ASSET_BASE}/audio/${BPA_EXPECTED_MODULE_AUDIO_FILENAMES['designing-future-workflow']}`,
    'business-value-risk-implementation': `${ASSET_BASE}/audio/${BPA_EXPECTED_MODULE_AUDIO_FILENAMES['business-value-risk-implementation']}`,
  },
  slideNarrations: buildSlideNarrations(),
  transcriptDownloadUrl: `${ASSET_BASE}/transcripts/`,
}

const narrationBySlide = new Map<number, SlideNarration>(
  businessProcessAutomationNarrationManifest.slideNarrations.map((n) => [n.slideNumber, n]),
)

export function getBpaSlideNarration(slideNumber: number): SlideNarration | undefined {
  return narrationBySlide.get(slideNumber)
}

export function getBpaTranscriptForSlide(slideNumber: number): string | undefined {
  return narrationBySlide.get(slideNumber)?.transcript
}

export function getBpaModuleNarrationAudioSrc(moduleSlug: string): string | undefined {
  return businessProcessAutomationNarrationManifest.moduleAudio?.[moduleSlug]
}

/** Only expose URLs to the player when narration is marked ready (avoids 404 / “fake” playable audio). */
export function getBpaAudioSrcWhenReady(status: NarrationStatus, url: string | undefined): string | undefined {
  return narrationAudioSrcWhenReady(status, url)
}

/** Map slide number → transcript for `JifunzeSlidePlayer.slideTranscripts`. */
export function getBpaFullSlideTranscriptsRecord(): Record<number, string> {
  return Object.fromEntries(
    businessProcessAutomationNarrationManifest.slideNarrations.map((n) => [n.slideNumber, n.transcript]),
  )
}

export function getBpaSlideTranscriptsForSlides(slides: readonly { slideNumber: number }[]): Record<number, string> {
  const out: Record<number, string> = {}
  for (const s of slides) {
    const line = getBpaTranscriptForSlide(s.slideNumber)
    if (line) out[s.slideNumber] = line
  }
  return out
}
