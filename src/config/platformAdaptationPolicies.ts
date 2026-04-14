import type { AdaptationPlatformId } from '../types/adaptationPlatform'
import type { ContentFormat } from '../types/contentFormat'

/**
 * Central adaptation rules: tone, hooks, hashtags, CTAs, lengths, media — per surface.
 * Publishing connectors stay separate; this drives copy + structure only.
 */
export type PlatformAdaptationPolicy = {
  id: AdaptationPlatformId
  displayName: string
  preferredToneTendencies: string[]
  typicalContentFormats: ContentFormat[]
  captionStyleGuidance: string
  hookStyleGuidance: string
  hashtagBehavior: string
  ctaBehavior: string
  roughMaxCaptionChars: number
  maxHashtags: number
  mediaExpectations: string
}

export const PLATFORM_ADAPTATION_POLICIES: Record<AdaptationPlatformId, PlatformAdaptationPolicy> = {
  x: {
    id: 'x',
    displayName: 'X',
    preferredToneTendencies: ['concise', 'timely', 'reactive', 'plain-spoken'],
    typicalContentFormats: ['caption_only_post', 'short_form_video_concept', 'carousel_concept'],
    captionStyleGuidance:
      'Tight sentences; minimal setup; one sharp POV; avoid marketing fluff and hashtag stuffing in-body.',
    hookStyleGuidance:
      'Lead with the news or tension in the first line; optional thread split for depth.',
    hashtagBehavior: 'Sparse — 0–3 highly relevant tags or none; discovery via text first.',
    ctaBehavior: 'Short imperative or question; link or “more in thread” when needed.',
    roughMaxCaptionChars: 270,
    maxHashtags: 4,
    mediaExpectations:
      'Single strong still or short clip; 16:9 or 1:1; alt text required for accessibility on publish.',
  },
  instagram: {
    id: 'instagram',
    displayName: 'Instagram',
    preferredToneTendencies: ['polished', 'visual-first', 'expressive', 'aspirational'],
    typicalContentFormats: [
      'short_form_video_concept',
      'carousel_concept',
      'single_static_graphic',
      'caption_only_post',
    ],
    captionStyleGuidance:
      'First two lines carry the hook; breathing room with line breaks; save depth for carousel frames.',
    hookStyleGuidance:
      'Visual-first promise (“what you’ll see / learn”) then caption supports the frame.',
    hashtagBehavior: 'Optional cluster at end (discovery) — keep on-brand; avoid banned adjacency.',
    ctaBehavior: 'Save / share / comment / link in bio — match feed vs Reels intent.',
    roughMaxCaptionChars: 1800,
    maxHashtags: 12,
    mediaExpectations:
      '4:5 feed hero, 9:16 Reels; cover frame matters; motion subtle unless trend calls for energy.',
  },
  tiktok: {
    id: 'tiktok',
    displayName: 'TikTok',
    preferredToneTendencies: ['hook-driven', 'trend-aware', 'fast-energy', 'playful'],
    typicalContentFormats: ['short_form_video_concept', 'motion_poster', 'animation_concept'],
    captionStyleGuidance:
      'Very short on-screen story; caption is discovery + tone — not a blog.',
    hookStyleGuidance:
      '0–1s pattern interrupt; say what the viewer gets before they scroll; trend-native language.',
    hashtagBehavior: 'Few high-signal tags + one trend tag when authentic to the brand.',
    ctaBehavior: 'Watch-through / stitch / duet / comment challenge — keep native to TikTok.',
    roughMaxCaptionChars: 280,
    maxHashtags: 5,
    mediaExpectations:
      'Vertical 9:16; motion and text-on-screen are primary; audio choice is a publish-time connector concern.',
  },
  facebook: {
    id: 'facebook',
    displayName: 'Facebook',
    preferredToneTendencies: ['explanatory', 'community-oriented', 'warm', 'trust-building'],
    typicalContentFormats: [
      'caption_only_post',
      'carousel_concept',
      'short_form_video_concept',
      'motion_poster',
    ],
    captionStyleGuidance:
      'More context than X; “we” community voice; short paragraphs; clear takeaway mid-post.',
    hookStyleGuidance:
      'Relatable setup or question; then context, proof, and invitation to discuss.',
    hashtagBehavior: 'Light — a handful for topic clustering; readability beats volume.',
    ctaBehavior: 'Explicit, friendly CTA: learn more, RSVP, share with someone who…',
    roughMaxCaptionChars: 2200,
    maxHashtags: 8,
    mediaExpectations:
      '1:1 or 4:5 for feed; longer video acceptable; album/carousel for step-by-step stories.',
  },
}

export function getPlatformAdaptationPolicy(platform: AdaptationPlatformId): PlatformAdaptationPolicy {
  return PLATFORM_ADAPTATION_POLICIES[platform]
}
