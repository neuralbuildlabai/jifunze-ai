import type { AutonomyAction } from '../../types/autonomy'
import type { ContentLifecycleStatus } from '../../types/contentLifecycle'

/**
 * Initial lifecycle after ingestion + autonomy (same tick today; async Edge may rest at `detected` first).
 *
 * - `publish` autonomy → `queued` (publish-ready work queue; scheduler → `scheduled` → connector → `published`).
 * - `draft` autonomy → `drafted` (assigned to draft track; body may arrive in a follow-up job).
 * - `watch` → `shortlisted` (radar / light-touch).
 */
export function opportunityLifecycleFromAutonomy(
  action: AutonomyAction,
): ContentLifecycleStatus {
  switch (action) {
    case 'ignore':
      return 'ignored'
    case 'watch':
      return 'shortlisted'
    case 'draft':
      return 'drafted'
    case 'queue':
      return 'queued'
    case 'publish':
      return 'queued'
    case 'escalate_for_review':
      return 'escalated'
  }
}
