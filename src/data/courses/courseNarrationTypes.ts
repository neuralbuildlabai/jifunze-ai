/** Reusable narration / voiceover model for narrated slide courses. */

export type NarrationStatus = 'ready' | 'planned' | 'missing'

export type CourseNarrationTrack = {
  id: string
  courseSlug: string
  title: string
  audioSrc?: string
  durationSeconds?: number
  transcript?: string
  /** Optional chapter markers for future sync (seconds from start). */
  slideTimings?: readonly { slideNumber: number; startSeconds: number }[]
}

export type SlideNarration = {
  slideNumber: number
  audioSrc?: string
  startTime?: number
  endTime?: number
  transcript: string
  speakerNotes?: string
  keyTakeaway?: string
}

export type CourseNarrationManifest = {
  courseSlug: string
  status: NarrationStatus
  /** Single file covering the full deck (optional). */
  fullCourseAudioSrc?: string
  /** Module-level tracks keyed by module slug (optional). */
  moduleAudio?: Readonly<Partial<Record<string, string>>>
  slideNarrations: readonly SlideNarration[]
  transcriptDownloadUrl?: string
}
