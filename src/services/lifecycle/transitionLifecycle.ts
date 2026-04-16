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

const TRANSITION_RULES: Record<
  OpportunityLifecycleEvent,
  { from: ContentLifecycleStatus[]; to: ContentLifecycleStatus }
> = {
  content_package_created: {
    from: ['detected', 'shortlisted', 'queued', 'escalated', 'drafted'],
    to: 'drafted',
  },
  entered_publish_queue: {
    from: ['drafted', 'shortlisted'],
    to: 'queued',
  },
  schedule_slot_assigned: {
    from: ['queued'],
    to: 'scheduled',
  },
  publish_confirmed: {
    from: ['scheduled', 'queued'],
    to: 'published',
  },
  human_rejected: {
    from: ['detected', 'shortlisted', 'drafted', 'queued', 'scheduled', 'escalated'],
    to: 'rejected',
  },
  human_deescalated_to_shortlist: {
    from: ['escalated'],
    to: 'shortlisted',
  },
}

export function canTransitionOpportunityLifecycle(
  status: ContentLifecycleStatus,
  event: OpportunityLifecycleEvent,
): boolean {
  return TRANSITION_RULES[event].from.includes(status)
}

export function transitionOpportunityLifecycle(
  status: ContentLifecycleStatus,
  event: OpportunityLifecycleEvent,
): ContentLifecycleStatus {
  return canTransitionOpportunityLifecycle(status, event)
    ? TRANSITION_RULES[event].to
    : status
}
