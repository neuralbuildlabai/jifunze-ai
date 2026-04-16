import { demoBrands } from '../../config/demoBrands'
import type { BrandProfile } from '../../types/brand'

/** Row shape for `public.brands` (minimal columns). `id` is a UUID string when backed by Postgres `uuid`. */
export type BrandsTableRow = {
  id: string
  tenant_id: string
  name: string
  created_at?: string | null
}

/**
 * Builds a full {@link BrandProfile} for the UI from a `brands` table row by layering the display
 * name over the first demo template (defaults for voice, domains, etc.).
 */
export function mapDbBrandRowToProfile(row: BrandsTableRow): BrandProfile {
  const base = demoBrands[0]
  if (!base) {
    throw new Error('demoBrands template missing: cannot map brands row to BrandProfile.')
  }
  return {
    ...base,
    id: row.id,
    name: row.name,
    tenant_id: row.tenant_id,
  }
}
