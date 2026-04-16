/**
 * Cross-cutting persistence contracts for Supabase (or any backing store).
 * IDs mirror domain models (`BrandProfile.id`, `ContentOpportunity.id`, etc.).
 */

/** Brand row key — maps to `public.brands.id` (satellite tables often use column `brand_profile_id`). */
export type BrandProfileId = string

/** ISO 8601 timestamps for `created_at` / `updated_at` columns. */
export type IsoDateTime = string

/** Optional list window for repository reads (cursor TBD when needed). */
export type ListParams = {
  limit?: number
}
