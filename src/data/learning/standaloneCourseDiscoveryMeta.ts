import type { ExtendedPublicLibraryKey } from './extendedPublicLibraryConfigs'

/** Credible editorial / product badges only — never “high rated” without real reviews. */
export type DiscoveryBadgeToken =
  | 'standalone_course'
  | 'included_in_subscription'
  | 'featured'
  | 'editors_pick'
  | 'popular'
  | 'recommended'
  | 'new'
  | 'beginner_friendly'
  | 'practical_path'
  | 'deeper_track'
  | 'premium_materials'

export type CoursePitch = 'beginner' | 'practical' | 'deeper'

export type StandaloneCourseDiscoveryMeta = {
  libraryKey: ExtendedPublicLibraryKey
  pitch: CoursePitch
  /** Short audience line for cards */
  audience: string
  /** Product badges for browse surfaces */
  badges: DiscoveryBadgeToken[]
}

export const STANDALONE_COURSE_DISCOVERY_META: Record<
  | 'course_prompt_engineering_models'
  | 'course_gemini_workspace'
  | 'course_claude_writing'
  | 'course_agentic_ai_real_work',
  StandaloneCourseDiscoveryMeta
> = {
  course_prompt_engineering_models: {
    libraryKey: 'course_prompt_engineering_models',
    pitch: 'practical',
    audience: 'Builders who want repeatable prompts across ChatGPT, Claude, and Gemini.',
    badges: ['standalone_course', 'included_in_subscription', 'featured', 'recommended', 'practical_path'],
  },
  course_gemini_workspace: {
    libraryKey: 'course_gemini_workspace',
    pitch: 'practical',
    audience: 'People collaborating in Google Workspace who want disciplined drafting habits.',
    badges: ['standalone_course', 'included_in_subscription', 'popular', 'practical_path'],
  },
  course_claude_writing: {
    libraryKey: 'course_claude_writing',
    pitch: 'deeper',
    audience: 'Writers and researchers who want synthesis discipline and collaboration-ready drafts.',
    badges: ['standalone_course', 'included_in_subscription', 'new', 'editors_pick', 'deeper_track'],
  },
  course_agentic_ai_real_work: {
    libraryKey: 'course_agentic_ai_real_work',
    pitch: 'deeper',
    audience: 'Operators and practitioners evaluating agent loops, tools, and rollout realism.',
    badges: ['standalone_course', 'included_in_subscription', 'new', 'recommended', 'premium_materials'],
  },
}

export const DISCOVERY_EDITORS_PICKS: ExtendedPublicLibraryKey[] = ['course_prompt_engineering_models', 'course_claude_writing']

export const DISCOVERY_TRENDING_EDITORIAL: ExtendedPublicLibraryKey[] = [
  'course_gemini_workspace',
  'course_agentic_ai_real_work',
]

export const DISCOVERY_BEGINNER_FRIENDLY: ExtendedPublicLibraryKey[] = ['course_gemini_workspace']

export const DISCOVERY_PRACTICAL_DEEPER: ExtendedPublicLibraryKey[] = [
  'course_prompt_engineering_models',
  'course_claude_writing',
  'course_agentic_ai_real_work',
]

export function badgeLabel(token: DiscoveryBadgeToken): string {
  switch (token) {
    case 'standalone_course':
      return 'Standalone course'
    case 'included_in_subscription':
      return 'Included in subscription'
    case 'featured':
      return 'Featured'
    case 'editors_pick':
      return "Editor's pick"
    case 'popular':
      return 'Popular'
    case 'recommended':
      return 'Recommended'
    case 'new':
      return 'New'
    case 'beginner_friendly':
      return 'Beginner-friendly'
    case 'practical_path':
      return 'Practical path'
    case 'deeper_track':
      return 'Deeper track'
    case 'premium_materials':
      return 'Premium materials'
  }
}

export function pitchLabel(pitch: CoursePitch): string {
  switch (pitch) {
    case 'beginner':
      return 'Beginner-friendly entry'
    case 'practical':
      return 'Practical workflow focus'
    case 'deeper':
      return 'Deeper / advanced lane'
  }
}
