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
    name: 'AI / Tech',
    description:
      'Artificial intelligence for builders and curious newcomers: news and launches, plus AI education, beginner-friendly explainers, tutorials, how-tos, tool breakdowns, practical use cases, and automation workflows — not only hype cycles.',
    contentTypes: [
      'news',
      'product_launch',
      'tutorial',
      'how_to',
      'beginner_guide',
      'tool_breakdown',
      'workflow',
      'comparison',
    ],
    tone: ['clear', 'simplified', 'educational', 'practical', 'forward-looking'],
    exampleTopics: [
      'How to use ChatGPT for business',
      'Best AI tools this week',
      'AI automation for beginners',
      'Step-by-step AI workflow',
      'What this new AI release means',
    ],
    platforms: ['linkedin', 'x', 'youtube', 'threads'],
    monetizationStyle: 'Free insight → trial / demo / newsletter depth',
    guidanceNotes: [
      'Prioritize clarity over hype.',
      'Simplify complex concepts before adding depth.',
      'Include actionable steps where possible.',
      'When it fits the angle, add a short “how to start” or “how to use” section.',
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
