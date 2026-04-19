/**
 * Client-side scaffolding for curriculum evolution signals.
 * Intended use: ingest into analytics/ops later—today we persist via `recordTeachingSignal`.
 * Signals inform examples, tooling mentions, rising topics, and rewrite priorities—not “prompt tweaks” alone.
 */

import { recordTeachingSignal } from '../teaching/teachingSignals'

export type CurriculumSurfaceKind = 'lesson_view' | 'catalog_view'

export function recordLibraryLessonSurface(input: {
  libraryKey: string
  lessonSlug: string
  lessonAccess: string
  surface?: CurriculumSurfaceKind
}): void {
  recordTeachingSignal({
    kind: 'library_lesson_view',
    payload: {
      libraryKey: input.libraryKey,
      lessonSlug: input.lessonSlug,
      lessonAccess: input.lessonAccess,
      surface: input.surface ?? 'lesson_view',
      source: 'public_library_reader',
      schemaVersion: 1,
    },
  })
}
