import { PUBLIC_PLATFORM_OPTIONS, PUBLIC_TONE_OPTIONS } from '../constants/publicGenerateUi'
import type { PublicPlatform, PublicTone } from '../services/content/publicGenerate'

const PLATFORM_OUTPUT_RULES: Record<PublicPlatform, string> = {
  x: `Output shape (X): The caption must be SHORT and scannable—aim under 260 characters for the main post. Use 1–4 short lines with line breaks; avoid long paragraphs or essay-style blocks. One clear idea per post.`,
  instagram: `Output shape (Instagram): Write a caption-style block—strong first line (hook), then short paragraphs with line breaks. Readable while scrolling; avoid a single dense block.`,
  linkedin: `Output shape (LinkedIn): Write 2–4 short paragraphs. First line should work as a standalone hook in the feed. Professional and skimmable.`,
  facebook: `Output shape (Facebook): Friendly, conversational paragraphs with line breaks. Easy to read on mobile.`,
}

/**
 * Rich context for manual quick-create generation so the model matches platform expectations.
 */
export function buildQuickCreateGenerationContext(platform: PublicPlatform, tone: PublicTone): string {
  const platformLabel = PUBLIC_PLATFORM_OPTIONS.find((o) => o.id === platform)?.label ?? platform
  const toneLabel = PUBLIC_TONE_OPTIONS.find((o) => o.id === tone)?.label ?? tone
  return [
    `Platform: ${platformLabel}`,
    `Tone: ${toneLabel}`,
    PLATFORM_OUTPUT_RULES[platform],
    'Separate hashtags from the caption. Hashtags should be on their own line or clearly grouped at the end.',
  ].join('\n')
}

export type RefineKind = 'shorter' | 'clearer' | 'professional' | 'thread'

export function buildRefinementContext(
  platform: PublicPlatform,
  tone: PublicTone,
  kind: RefineKind,
  draft: { caption: string; hashtags: string },
): string {
  const base = buildQuickCreateGenerationContext(platform, tone)
  let instruction = ''
  switch (kind) {
    case 'shorter':
      instruction =
        'Refinement: Rewrite the caption to be noticeably shorter while keeping the same core message. Tighten hashtags if needed.'
      break
    case 'clearer':
      instruction =
        'Refinement: Rewrite for clarity and plain language. Shorter sentences. Same overall message.'
      break
    case 'professional':
      instruction =
        'Refinement: Rewrite in a more polished, professional tone suitable for this platform.'
      break
    case 'thread':
      instruction =
        'Refinement: Rewrite as a short thread for X. Use 2–4 numbered parts separated by blank lines. Each part under 280 characters. Prefix each part with "1/", "2/", etc. on its own line.'
      break
  }
  return [
    base,
    instruction,
    'Previous draft to improve:',
    '---',
    draft.caption.trim(),
    '',
    draft.hashtags.trim(),
    '---',
  ].join('\n')
}

/** Subtle UI label for the result card. */
export function platformResultFitCue(platform: PublicPlatform): string {
  switch (platform) {
    case 'x':
      return 'Ready for X · short-form'
    case 'instagram':
      return 'Instagram-style caption'
    case 'linkedin':
      return 'LinkedIn-style post'
    case 'facebook':
      return 'Facebook-style post'
    default:
      return 'Tuned for your platform'
  }
}
