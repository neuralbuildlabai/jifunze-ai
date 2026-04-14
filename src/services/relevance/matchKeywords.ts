import type { BrandProfile } from '../../types/brand'

/**
 * Surfaces which brand vocabulary actually hit the signal (transparency for reviewers).
 */
export function extractMatchedKeywords(brand: BrandProfile, haystack: string): string[] {
  const h = haystack.toLowerCase()
  const found: string[] = []

  for (const p of brand.priority_topics) {
    const pl = p.toLowerCase()
    if (pl.length > 2 && h.includes(pl)) found.push(p)
  }

  const ind = brand.industry.toLowerCase()
  if (ind.length > 3 && h.includes(ind)) found.push(brand.industry)

  const audienceTokens = brand.audience_summary
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter((w) => w.length > 4)

  for (const w of audienceTokens.slice(0, 8)) {
    if (h.includes(w)) found.push(w)
  }

  return [...new Set(found)].slice(0, 10)
}
