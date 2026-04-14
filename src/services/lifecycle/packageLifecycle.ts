import type { ContentLifecycleStatus } from '../../types/contentLifecycle'

/** A newly generated package is always a materialized draft until scheduling/publish jobs run. */
export function initialPackageLifecycleStatus(): ContentLifecycleStatus {
  return 'drafted'
}
