import type { ExtendedPublicLibraryKey } from './extendedPublicLibraryConfigs'

/**
 * Soft, distinguished palettes for monetized standalone course surfaces.
 * Colors are restrained—used mainly for accents, strips, and cards—not full-page floods.
 */
export type StandaloneCoursePalette = {
  /** Tailwind classes for standalone course landing outer wrapper accents */
  shellAccent: string
  /** Discovery / product card container */
  discoveryCardClass: string
  /** Badge / eyebrow tint */
  badgeClass: string
}

export const STANDALONE_COURSE_PALETTES: Record<
  | 'course_prompt_engineering_models'
  | 'course_gemini_workspace'
  | 'course_claude_writing'
  | 'course_agentic_ai_real_work',
  StandaloneCoursePalette
> = {
  /** Prompt Engineering Across ChatGPT, Claude, and Gemini — deep indigo / slate */
  course_prompt_engineering_models: {
    shellAccent:
      'bg-[radial-gradient(ellipse_115%_55%_at_50%_-8%,rgba(99,102,241,0.11),transparent_52%),linear-gradient(180deg,_rgb(17,19,32)_0%,_rgb(14,16,26)_46%,_rgb(11,13,22)_100%)]',
    discoveryCardClass:
      'rounded-2xl border border-indigo-400/18 bg-gradient-to-br from-indigo-500/[0.09] via-[rgba(18,20,34,0.78)] to-[rgba(12,14,22,0.94)] shadow-[0_22px_70px_rgba(0,0,0,0.38)] ring-1 ring-indigo-300/10',
    badgeClass: 'border-indigo-400/22 bg-indigo-500/[0.11] text-indigo-50/95',
  },
  /** Gemini for Productivity and Google Workspace — cool teal / aqua */
  course_gemini_workspace: {
    shellAccent:
      'bg-[radial-gradient(ellipse_115%_55%_at_50%_-8%,rgba(45,212,191,0.09),transparent_52%),linear-gradient(180deg,_rgb(14,21,28)_0%,_rgb(12,17,22)_46%,_rgb(10,14,18)_100%)]',
    discoveryCardClass:
      'rounded-2xl border border-teal-400/18 bg-gradient-to-br from-teal-500/[0.08] via-[rgba(14,22,26,0.76)] to-[rgba(11,14,18,0.94)] shadow-[0_22px_70px_rgba(0,0,0,0.38)] ring-1 ring-teal-300/10',
    badgeClass: 'border-teal-400/22 bg-teal-500/[0.11] text-teal-50/95',
  },
  /** Claude for Writing, Research, and Deep Thinking — warm sand / plum */
  course_claude_writing: {
    shellAccent:
      'bg-[radial-gradient(ellipse_115%_55%_at_50%_-8%,rgba(216,180,254,0.07),transparent_52%),linear-gradient(180deg,_rgb(26,18,28)_0%,_rgb(18,14,22)_46%,_rgb(12,12,18)_100%)]',
    discoveryCardClass:
      'rounded-2xl border border-fuchsia-400/14 bg-gradient-to-br from-fuchsia-500/[0.06] via-[rgba(26,18,28,0.74)] to-[rgba(14,12,18,0.94)] shadow-[0_22px_70px_rgba(0,0,0,0.38)] ring-1 ring-fuchsia-300/10',
    badgeClass: 'border-fuchsia-400/18 bg-fuchsia-500/[0.09] text-fuchsia-50/95',
  },
  /** Agentic AI and AI Agents for Real Work — deep blue / steel */
  course_agentic_ai_real_work: {
    shellAccent:
      'bg-[radial-gradient(ellipse_115%_55%_at_50%_-8%,rgba(56,189,248,0.08),transparent_52%),linear-gradient(180deg,_rgb(14,18,30)_0%,_rgb(12,16,26)_46%,_rgb(10,13,20)_100%)]',
    discoveryCardClass:
      'rounded-2xl border border-sky-400/18 bg-gradient-to-br from-sky-500/[0.07] via-[rgba(14,18,30,0.76)] to-[rgba(11,13,20,0.94)] shadow-[0_22px_70px_rgba(0,0,0,0.38)] ring-1 ring-sky-300/10',
    badgeClass: 'border-sky-400/22 bg-sky-500/[0.11] text-sky-50/95',
  },
}

export function paletteForStandaloneCourse(key: ExtendedPublicLibraryKey): StandaloneCoursePalette | null {
  if (key in STANDALONE_COURSE_PALETTES) {
    return STANDALONE_COURSE_PALETTES[key as keyof typeof STANDALONE_COURSE_PALETTES]
  }
  return null
}
