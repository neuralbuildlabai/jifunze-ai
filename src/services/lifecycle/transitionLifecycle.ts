import type { ContentLifecycleStatus } from '../../types/contentLifecycle'

/**
 * Events future workers (Edge cron, queue consumers) will emit after persistence exists.
 * Invalid combinations return the previous status unchanged.
 */
export type OpportunityLifecycleEvent =
  | 'content_package_created'
  | 'entered_publish_queue'
  | 'schedule_slot_assigned'
  | 'publish_confirmed'
  | 'human_rejected'
  | 'human_deescalated_to_shortlist'

export function transitionOpportunityLifecycle(
  status: ContentLifecycleStatus,
  event: OpportunityLifecycleEvent,
): ContentLifecycleStatus {
  switch (event) {
    case 'content_package_created':
      if (
        status === 'detected' ||
        status === 'shortlisted' ||
        status === 'queued' ||
        status === 'escalated' ||
        status === 'drafted'
      ) {
        return 'drafted'
      }
      return status
    case 'entered_publish_queue':
      if (status === 'drafted' || status === 'shortlisted') return 'queued'
      return status
    case 'schedule_slot_assigned':
      if (status === 'queued') return 'scheduled'
      return status
    case 'publish_confirmed':
      if (status === 'scheduled' || status === 'queued') return 'published'
      return status
    case 'human_rejected':
      if (
        status !== 'ignored' &&
        status !== 'published' &&
        status !== 'rejected'
      ) {
        return 'rejected'
      }
      return status
    case 'human_deescalated_to_shortlist':
      if (status === 'escalated') return 'shortlisted'
      return status
  }
}
