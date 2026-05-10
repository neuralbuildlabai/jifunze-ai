/**
 * Voiceover manifest for Business Analytics Decision-Making.
 * Status stays `planned` until real MP3 files exist under public/course-assets/.../audio/.
 */

import { BUSINESS_ANALYTICS_DECISION_MAKING_SLUG } from './businessAnalyticsDecisionMakingIds.ts'
import type { CourseNarrationManifest, NarrationStatus } from './courseNarrationTypes'
import { narrationAudioSrcWhenReady } from './narrationHelpers'

const ASSET_BASE = '/course-assets/business-analytics-decision-making'

export const BA_EXPECTED_MODULE_AUDIO_FILENAMES = {
  'business-analytics-foundations': 'module-1-business-analytics-foundations.mp3',
  'understanding-business-performance-data': 'module-2-understanding-business-performance-data.mp3',
  'trend-and-variance-analysis': 'module-3-trend-and-variance-analysis.mp3',
  'channel-product-customer-analysis': 'module-4-channel-product-customer-analysis.mp3',
  'diagnosing-the-business-problem': 'module-5-diagnosing-the-business-problem.mp3',
  'turning-analytics-into-action': 'module-6-turning-analytics-into-action.mp3',
} as const

export const businessAnalyticsDecisionMakingNarrationManifest: CourseNarrationManifest = {
  courseSlug: BUSINESS_ANALYTICS_DECISION_MAKING_SLUG,
  status: 'planned',
  moduleAudio: {
    'business-analytics-foundations': `${ASSET_BASE}/audio/${BA_EXPECTED_MODULE_AUDIO_FILENAMES['business-analytics-foundations']}`,
    'understanding-business-performance-data': `${ASSET_BASE}/audio/${BA_EXPECTED_MODULE_AUDIO_FILENAMES['understanding-business-performance-data']}`,
    'trend-and-variance-analysis': `${ASSET_BASE}/audio/${BA_EXPECTED_MODULE_AUDIO_FILENAMES['trend-and-variance-analysis']}`,
    'channel-product-customer-analysis': `${ASSET_BASE}/audio/${BA_EXPECTED_MODULE_AUDIO_FILENAMES['channel-product-customer-analysis']}`,
    'diagnosing-the-business-problem': `${ASSET_BASE}/audio/${BA_EXPECTED_MODULE_AUDIO_FILENAMES['diagnosing-the-business-problem']}`,
    'turning-analytics-into-action': `${ASSET_BASE}/audio/${BA_EXPECTED_MODULE_AUDIO_FILENAMES['turning-analytics-into-action']}`,
  },
  slideNarrations: [],
  transcriptDownloadUrl: `${ASSET_BASE}/transcripts/`,
}

export function getBaModuleNarrationAudioSrc(moduleSlug: string): string | undefined {
  return businessAnalyticsDecisionMakingNarrationManifest.moduleAudio?.[moduleSlug]
}

export function getBaAudioSrcWhenReady(status: NarrationStatus, url: string | undefined): string | undefined {
  return narrationAudioSrcWhenReady(status, url)
}
