/**
 * Approved brand constants — the single source of truth for the public site, the social
 * directory and the admin console.
 *
 * Authority: `docs/AMENDMENT_003_2026-08-21_INSTAGRAM_FIRST.md` §3–5 (which supersedes
 * Amendment 001 §5) and `OPERATIONS.md`. Nothing here may be edited without amending those
 * documents.
 */

/** Visual wordmark (logo lettering only). */
export const BRAND_WORDMARK = 'Jifunze'

/** Public display name used on social profiles. */
export const BRAND_DISPLAY_NAME = 'Jifunze.AI'

/** Website styling of the name. */
export const BRAND_SITE_NAME = 'Jifunze.ai'

/**
 * Official tagline. Final. Singular "idea", sentence case, full stop retained.
 * Do not replace it and do not change "idea" to "ideas".
 */
export const BRAND_TAGLINE = 'Your idea never sleeps.'

export const BRAND_COLORS = {
  /** Primary violet. */
  violet: '#7C3AED',
  /** Near-black. */
  nearBlack: '#0B0B12',
  white: '#FFFFFF',
} as const

export const BRAND_TYPEFACE = 'Plus Jakarta Sans'

export const CANONICAL_ORIGIN = 'https://www.jifunze.ai'

/** Public contact address published on the social profiles. */
export const PUBLIC_CONTACT_EMAIL = 'hello@jifunze.ai'

/** Core short description — the shortest honest statement of what this is. */
export const CORE_SHORT_DESCRIPTION =
  'Jifunze turns emerging developments in AI, work and digital opportunity into useful social learning content.'

/** Standard description — profile "about" length. */
export const STANDARD_DESCRIPTION =
  'Jifunze turns emerging developments in AI, work and digital opportunity into practical social learning content for ambitious African and diaspora professionals. Explore practical AI, career growth, income and business skills, digital tools, productivity, and useful opportunities.'

/** Extended description — long-form "about" sections. */
export const EXTENDED_DESCRIPTION =
  'Jifunze is a social learning media brand. We watch what is changing in AI, work and digital opportunity, research and verify what matters, and turn it into practical content you can read, watch and apply — for ambitious African and diaspora professionals who want to use AI and digital tools to improve their work, career and income. Your idea never sleeps.'

/** Public positioning line. */
export const PUBLIC_POSITIONING =
  'Jifunze turns emerging ideas and practical knowledge about AI, careers, income and digital skills into social content you can read, watch and apply.'

/** Who the work is for. Mirrors `TARGET_AUDIENCE` in `orchestrator/contentBank.ts`. */
export const TARGET_AUDIENCE =
  'Ambitious African and diaspora professionals who want to use AI and digital tools to improve their work, career and income'

/**
 * Phrases that describe a product Jifunze.ai does not offer, or an outcome it cannot promise.
 * `containsProhibitedClaim()` is used by tests and by the copy linter so none of these can
 * reappear in shipped public copy.
 */
export const PROHIBITED_CLAIMS: readonly string[] = [
  'create smarter social content in seconds',
  'try our content generator',
  'ai social-content generator',
  'ai social content generator',
  'social-media publishing platform',
  'social media publishing platform',
  'generate content for brands and creators',
  'academic-grade courses',
  'accredited training',
  'guaranteed jobs',
  'guaranteed income',
  'link in bio',
  '/generate',
  'create smarter, grow faster',
  'become an instructor',
  'enroll now',
] as const

/** Returns every prohibited claim found in `text` (case-insensitive). */
export function findProhibitedClaims(text: string): string[] {
  const haystack = text.toLowerCase()
  return PROHIBITED_CLAIMS.filter((claim) => haystack.includes(claim))
}

export function containsProhibitedClaim(text: string): boolean {
  return findProhibitedClaims(text).length > 0
}
