import type { ContentDomain } from '../types/contentDomain'

export type ZuriDomainDefinition = {
  id: ContentDomain
  name: string
  description: string
  contentTypes: string[]
  tone: string[]
  exampleTopics: string[]
  platforms: string[]
  /** How this vertical typically monetizes or frames CTAs (guidance only). */
  monetizationStyle?: string
  /** Editorial defaults for generators and adaptation (optional per domain). */
  guidanceNotes?: string[]
}

export const DOMAIN_DEFINITIONS: Record<ContentDomain, ZuriDomainDefinition> = {
  ai: {
    id: 'ai',
    name: 'AI / Tech (educators)',
    description:
      'Purpose-built for AI creators and educators: teaching tools, explaining concepts, comparisons, and practical workflows for audiences learning to build or adopt AI — tutorials and breakdowns first, not generic lifestyle content.',
    contentTypes: [
      'tutorial',
      'how_to',
      'beginner_guide',
      'tool_breakdown',
      'comparison',
      'use_case_demo',
      'workflow',
      'product_launch',
      'news',
    ],
    tone: ['clear', 'simplified', 'educational', 'practical', 'forward-looking'],
    exampleTopics: [
      'Screen-recorded tool walkthrough',
      'Beginner breakdown of a new model',
      'Two-tool comparison with a rubric',
      'Real workflow: from prompt to output',
      'Quick tip: safer prompting habits',
    ],
    platforms: ['tiktok', 'instagram', 'x', 'youtube', 'linkedin', 'threads'],
    monetizationStyle: 'Free lesson → course, newsletter, or community depth',
    guidanceNotes: [
      'Teach first: steps, labels, and “why this matters” before hype.',
      'Favor demos, carousels with numbered frames, or tight insight threads.',
      'Avoid vague lifestyle hooks unless they clarify the AI lesson.',
      'When comparing tools, state trade-offs (cost, latency, safety) plainly.',
    ],
  },
  beauty: {
    id: 'beauty',
    name: 'Beauty & Wellness',
    description: 'Skincare, cosmetics, routines, clinical claims boundaries, and self-care culture.',
    contentTypes: ['tutorial', 'product breakdown', 'routine', 'before/after', 'ingredient spotlight'],
    tone: ['trustworthy', 'educational', 'aspirational', 'warm'],
    exampleTopics: ['texture shots', 'SPF education', 'inclusive shade ranges', 'derm-adjacent facts'],
    platforms: ['instagram', 'tiktok', 'youtube shorts'],
    monetizationStyle: 'Authority + UGC → shop link / drop / waitlist',
  },
  lifestyle: {
    id: 'lifestyle',
    name: 'Lifestyle',
    description: 'Daily life, habits, home, travel-lite, productivity, and relatable modern living.',
    contentTypes: ['listicle', 'day-in-the-life', 'tips', 'haul / favorites', 'micro-story'],
    tone: ['relatable', 'practical', 'optimistic', 'human'],
    exampleTopics: ['morning routines', 'budget upgrades', 'sustainable swaps', 'small wins'],
    platforms: ['instagram', 'tiktok', 'pinterest', 'threads'],
    monetizationStyle: 'Relatability → affiliate / collab / community',
  },
  entertainment: {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Shows, creators, fandoms, drops, and reactive cultural moments.',
    contentTypes: ['reactive take', 'meme-adjacent riff', 'recap', 'hot take', 'watch-along'],
    tone: ['reactive', 'engaging', 'conversational', 'playful'],
    exampleTopics: ['season finales', 'casting news', 'fandom drama', 'awards moments'],
    platforms: ['tiktok', 'instagram', 'x', 'youtube'],
    monetizationStyle: 'Attention spike → tickets / merch / streams',
  },
  music: {
    id: 'music',
    name: 'Music / Viral Culture',
    description: 'Releases, sound trends, challenges, live moments, and velocity-first culture.',
    contentTypes: ['trend challenge', 'snippet / teaser', 'behind-the-scenes', 'playlist story', 'drop countdown'],
    tone: ['fast', 'trend-driven', 'high-energy', 'authentic'],
    exampleTopics: ['sound trends', 'festival lineups', 'remix culture', 'viral hooks'],
    platforms: ['tiktok', 'instagram', 'youtube shorts'],
    monetizationStyle: 'Viral loop → tickets / presave / creator collabs',
  },
}

export function getDomainDefinition(id: ContentDomain): ZuriDomainDefinition {
  return DOMAIN_DEFINITIONS[id]
}
