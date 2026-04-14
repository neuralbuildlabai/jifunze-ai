import type { PlatformPolicy } from '../types/platformPolicy'
import type { SocialPlatformId } from '../types/socialPlatform'

export const PLATFORM_POLICIES: Record<SocialPlatformId, PlatformPolicy> = {
  x: {
    platform: 'x',
    display_name: 'X',
    supported_content_formats: [
      'caption_only_post',
      'carousel_concept',
      'single_static_graphic',
      'short_form_video_concept',
    ],
    media_constraints: {
      max_caption_chars: 280,
      max_hashtag_suggestions: 6,
      recommended_aspect_ratios: ['16:9', '1:1'],
      max_video_seconds: 140,
    },
    caption_length_style_guidance:
      'Short hooks first; one idea per post; threads split complex beats across numbered replies.',
    posting_behavior_expectations:
      'High frequency acceptable; avoid duplicate text bursts; link cards reduce visible character budget.',
    auto_publish_limitations:
      'API tier limits and duplicate-detection required; sensitive topics should never auto-post without human.',
  },
  instagram: {
    platform: 'instagram',
    display_name: 'Instagram',
    supported_content_formats: [
      'caption_only_post',
      'carousel_concept',
      'single_static_graphic',
      'short_form_video_concept',
      'motion_poster',
    ],
    media_constraints: {
      max_caption_chars: 2200,
      max_hashtag_suggestions: 12,
      recommended_aspect_ratios: ['4:5', '9:16', '1:1'],
      max_video_seconds: 90,
    },
    caption_length_style_guidance:
      'Front-load value in first two lines; line breaks for skim; hashtags block optional at end.',
    posting_behavior_expectations:
      'Reels vs feed vs stories need distinct crops; shopping tags are connector-specific.',
    auto_publish_limitations:
      'Carousel order immutable after publish; branded content flags must be set via Meta APIs when required.',
  },
  facebook: {
    platform: 'facebook',
    display_name: 'Facebook',
    supported_content_formats: [
      'caption_only_post',
      'carousel_concept',
      'single_static_graphic',
      'short_form_video_concept',
      'motion_poster',
    ],
    media_constraints: {
      max_caption_chars: 63206,
      max_hashtag_suggestions: 8,
      recommended_aspect_ratios: ['1:1', '16:9', '4:5'],
      max_video_seconds: 240,
    },
    caption_length_style_guidance:
      'Community-forward tone; first-person or “we”; longer context OK; clear CTA.',
    posting_behavior_expectations:
      'Page vs group posting differs; scheduling respects audience active windows.',
    auto_publish_limitations:
      'Political/social issue ads and special categories need Meta compliance paths — block auto-publish.',
  },
  tiktok: {
    platform: 'tiktok',
    display_name: 'TikTok',
    supported_content_formats: [
      'short_form_video_concept',
      'caption_only_post',
      'motion_poster',
      'animation_concept',
    ],
    media_constraints: {
      max_caption_chars: 2200,
      max_hashtag_suggestions: 5,
      recommended_aspect_ratios: ['9:16'],
      max_video_seconds: 180,
    },
    caption_length_style_guidance:
      'Hook in first 1s on video + on-screen text; caption supports discovery keywords sparingly.',
    posting_behavior_expectations:
      'Sound and trend alignment are connector concerns; Duet/Stitch are separate intents.',
    auto_publish_limitations:
      'Commercial sounds and rights checks; auto-publish only when audio clearance is confirmed server-side.',
  },
  linkedin: {
    platform: 'linkedin',
    display_name: 'LinkedIn',
    supported_content_formats: [
      'caption_only_post',
      'carousel_concept',
      'single_static_graphic',
      'short_form_video_concept',
    ],
    media_constraints: {
      max_caption_chars: 3000,
      max_hashtag_suggestions: 5,
      recommended_aspect_ratios: ['1.91:1', '1:1', '9:16'],
      max_video_seconds: 600,
    },
    caption_length_style_guidance:
      'Professional narrative; whitespace; optional document/carousel for depth.',
    posting_behavior_expectations:
      'Company vs personal voice differs; comments engagement often scheduled separately.',
    auto_publish_limitations:
      'Restricted categories (jobs, regulated industries) should route to human review.',
  },
}

export function getPlatformPolicy(platform: SocialPlatformId): PlatformPolicy {
  return PLATFORM_POLICIES[platform]
}
