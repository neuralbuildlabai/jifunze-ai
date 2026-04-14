/**
 * Shared pipeline stage for opportunities and generated post artifacts.
 * Forward flow: detected → … → published; exceptions: ignored, escalated, rejected.
 */
export type ContentLifecycleStatus =
  | 'detected'
  | 'ignored'
  | 'shortlisted'
  | 'drafted'
  | 'queued'
  | 'scheduled'
  | 'published'
  | 'escalated'
  | 'rejected'

/** Who last advanced {@link ContentLifecycleStatus} (audit / replay). */
export type LifecycleDriver = 'autonomy' | 'scheduler' | 'publisher' | 'human' | 'system'
