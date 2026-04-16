import type { ContentLifecycleStatus } from '../../types/contentLifecycle'
import type { ContentOpportunity } from '../../types/opportunity'
import { transitionOpportunityLifecycle } from './transitionLifecycle'

/**
 * Package lifecycle mirrors autonomy intent while keeping publish mocked.
 * We materialize draft by default, then advance to queue/scheduled only for
 * opportunities already in those tracks.
 */
export function initialPackageLifecycleStatus(
  opportunity?: Pick<ContentOpportunity, 'lifecycle_status'>,
): ContentLifecycleStatus {
  const base = opportunity?.lifecycle_status
  if (!base) return 'drafted'
  if (base === 'ignored' || base === 'rejected' || base === 'escalated') return base
  if (base === 'published') return 'scheduled'

  let status: ContentLifecycleStatus = base
  status = transitionOpportunityLifecycle(status, 'content_package_created')

  if (base === 'queued') {
    status = transitionOpportunityLifecycle(status, 'entered_publish_queue')
  } else if (base === 'scheduled') {
    status = transitionOpportunityLifecycle(status, 'entered_publish_queue')
    status = transitionOpportunityLifecycle(status, 'schedule_slot_assigned')
  }
  return status
}
