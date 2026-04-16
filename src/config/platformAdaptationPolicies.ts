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
    preferredToneTendencies: ['concise', 'teaching-forward', 'plain-spoken', 'timely'],
    typicalContentFormats: ['caption_only_post', 'short_form_video_concept', 'carousel_concept'],
    captionStyleGuidance:
      'One sharp insight or numbered mini-thread; define terms once; avoid lifestyle filler and hashtag stuffing in-body.',
    hookStyleGuidance:
      'Open with the lesson (“what changed / what to try”) or a contrarian clarification; use replies for optional depth.',
    hashtagBehavior: 'Sparse — 0–3 highly relevant tags or none; discovery via text first.',
    ctaBehavior: 'Short imperative (“try this prompt”, “save the thread”); link or “more in thread” when needed.',
    roughMaxCaptionChars: 270,
    maxHashtags: 4,
    mediaExpectations:
      'Diagram, UI crop, or one-slide explainer still; 16:9 or 1:1; alt text required for accessibility on publish.',
  },
  instagram: {
    id: 'instagram',
    displayName: 'Instagram',
    preferredToneTendencies: ['visual-first', 'educational', 'clear', 'polished'],
    typicalContentFormats: [
      'short_form_video_concept',
      'carousel_concept',
      'single_static_graphic',
      'caption_only_post',
    ],
    captionStyleGuidance:
      'Educational hook in line one; carousel-first when teaching — each slide one idea; caption expands with steps or caveats.',
    hookStyleGuidance:
      'Promise the skill (“by slide 4 you can…”) or the comparison outcome; avoid vague lifestyle openers.',
    hashtagBehavior: 'Optional cluster at end (discovery) — keep on-brand; avoid banned adjacency.',
    ctaBehavior: 'Save carousel / share with a learner / comment with your stack — match feed vs Reels intent.',
    roughMaxCaptionChars: 1800,
    maxHashtags: 12,
    mediaExpectations:
      '4:5 carousels with legible type; 9:16 Reels for short demos; cover frame states the lesson title.',
  },
  tiktok: {
    id: 'tiktok',
    displayName: 'TikTok',
    preferredToneTendencies: ['demo-first', 'hook-driven', 'plain-spoken', 'trend-aware'],
    typicalContentFormats: ['short_form_video_concept', 'motion_poster', 'animation_concept'],
    captionStyleGuidance:
      'Caption names the tool + outcome; on-screen text carries the steps — keep it a micro-lesson, not a vlog.',
    hookStyleGuidance:
      'Open on the problem or UI; within 2s show the payoff (before/after, speed run, or “here is the setting”).',
    hashtagBehavior: 'Few high-signal tags + one trend tag only when the demo truly fits the sound.',
    ctaBehavior: 'Watch-through for the payoff; comment “template” / stitch with your variant — native to TikTok.',
    roughMaxCaptionChars: 280,
    maxHashtags: 5,
    mediaExpectations:
      'Vertical 9:16 screen-led demos; punch-in on controls; captions burned in for clarity.',
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
