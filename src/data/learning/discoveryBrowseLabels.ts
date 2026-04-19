import type { LearningDiscoveryCategorySlug } from './learningDiscoveryCatalog'
import type { DiscoveryBadgeToken } from './standaloneCourseDiscoveryMeta'

/** Editorial browse badges for category cards — credible labels only (no fake ratings). */
export const CATEGORY_BROWSE_BADGES: Record<LearningDiscoveryCategorySlug, DiscoveryBadgeToken[]> = {
  chatgpt: ['featured', 'popular', 'beginner_friendly'],
  prompting: ['recommended', 'practical_path'],
  gemini: ['popular', 'practical_path'],
  claude: ['new', 'editors_pick', 'deeper_track'],
  'agentic-ai': ['new', 'recommended', 'premium_materials'],
  'ai-and-ml': ['featured', 'recommended'],
  cybersecurity: ['featured', 'practical_path'],
  'cloud-devops': ['recommended', 'practical_path'],
}
