import type { NarrationStatus } from './courseNarrationTypes'

/** Only pass URLs into `<audio>` when narration is marked ready so learners are not sent to missing files. */
export function narrationAudioSrcWhenReady(status: NarrationStatus, url: string | undefined): string | undefined {
  if (status !== 'ready' || !url?.trim()) return undefined
  return url
}
