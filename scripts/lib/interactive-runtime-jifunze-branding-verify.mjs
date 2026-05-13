/**
 * Shared checks for Jifunze-first post-export patches on interactive runtime-data.json.
 * Smart Workflows adds course-specific forbidden phrases in its own verifier.
 */
/** Substring checks on decoded JSON text (learner-facing label values, not JSON keys). */
export const JIFUNZE_BRANDING_FORBIDDEN = [
  'Articulate - open',
  'By using this service, you agree to the Articulate',
  'SCORM 1.2',
  /** Rise player a11y label for block type; value "Storyline" reads as external product name. */
  'a11yBlockStoryline":"Storyline',
]

export const JIFUNZE_BRANDING_REQUIRED = [
  '"a11yAiTutorArticulateLogo":"Jifunze.ai - open in new tab"',
  '"aiTutorTermsPrefix":"By using this service, you agree to the Jifunze.ai"',
  '"targetName":"Jifunze.ai workshop"',
  '"a11yBlockStoryline":"Lesson content"',
]

/**
 * @param {string} raw decoded runtime JSON text
 */
export function assertJifunzeRuntimeBranding(raw) {
  JSON.parse(raw)
  for (const phrase of JIFUNZE_BRANDING_FORBIDDEN) {
    if (raw.includes(phrase)) {
      throw new Error(`runtime-data still contains forbidden phrase: ${phrase}`)
    }
  }
  for (const phrase of JIFUNZE_BRANDING_REQUIRED) {
    if (!raw.includes(phrase)) {
      throw new Error(`runtime-data missing expected patched string: ${phrase}`)
    }
  }
}
