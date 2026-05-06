/**
 * @deprecated The original dark "Structured learning for practical AI fluency"
 * landing layout has been replaced by `PublicHomePage`, which composes the
 * shared marketplace sections from `learn/discoveryHubSections.tsx` so the
 * homepage `/` and `/learn` share one bright visual direction.
 *
 * This module is intentionally a no-op export so any stragglers that still
 * import it stay type-safe. Remove the file once all references are gone.
 */
export function LandingMarketingSections(): null {
  return null
}
