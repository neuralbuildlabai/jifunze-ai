/**
 * Workspace-facing catalog for the chatbot library family (starter links + depth framing).
 * Monetization language stays access/materials-focused—no mastery, certification, or outcome guarantees.
 */

import { CHATBOT_CURRICULUM_SPEC } from './chatbotLibrarySpec'
import {
  getFirstPublicChatbotLessonSlugInCategory,
  PUBLIC_CHATBOT_LIBRARY_BASE_PATH,
} from './chatbotEverydayCurriculum'

export const CHATBOT_STARTER_INDEX_SENTINEL = '__index__'

export type ChatbotStarterDeepLink = {
  label: string
  lessonSlug: string
}

export type SignedInChatbotCategory = {
  id: string
  title: string
  summary: string
  starterLinks: ChatbotStarterDeepLink[]
  deeperWithAccess: string[]
}

export type ChatbotPremiumTrack = {
  id: string
  title: string
  summary: string
  monetization: 'subscription' | 'bundle_or_subscription'
}

export const CHATBOT_FAMILY_STARTER_PUBLIC_PATH = PUBLIC_CHATBOT_LIBRARY_BASE_PATH

export const SIGNED_IN_CHATBOT_CATEGORIES: SignedInChatbotCategory[] = CHATBOT_CURRICULUM_SPEC.map((cat) => {
  const firstPublicSlug = getFirstPublicChatbotLessonSlugInCategory(cat.id)
  const starterLinks: ChatbotStarterDeepLink[] = [
    { label: 'Browse public chatbot library overview', lessonSlug: CHATBOT_STARTER_INDEX_SENTINEL },
    ...(firstPublicSlug
      ? [{ label: 'Open a free starter lesson in this category', lessonSlug: firstPublicSlug }]
      : []),
  ]
  return {
    id: cat.id,
    title: cat.title,
    summary: cat.summary,
    starterLinks,
    deeperWithAccess: [
      'Expanded readers, templates, and workspace practice where shipped—eligibility depends on plan limits',
      'Deeper build labs and evaluation packs may be bundle/subscription-gated—access to materials, not guaranteed deployment results',
    ],
  }
})

export const CHATBOT_PREMIUM_TRACKS: ChatbotPremiumTrack[] = [
  {
    id: 'chatbot-eval-lab',
    title: 'Chatbot evaluation lab',
    summary:
      'More transcripts, rubrics, and critique loops for real conversations—practice depth, not a professional certification.',
    monetization: 'subscription',
  },
  {
    id: 'workflow-bot-kits',
    title: 'Workflow bot kits',
    summary:
      'Hand-offs between prompts, tools, and owners for recurring chatbot tasks—still requires human accountability.',
    monetization: 'subscription',
  },
  {
    id: 'rag-bot-deep-dive',
    title: 'Retrieval-aware bot patterns',
    summary:
      'Knowledge grounding patterns with explicit failure budgets—availability depends on tools and plan limits.',
    monetization: 'bundle_or_subscription',
  },
  {
    id: 'community-support-bot-pack',
    title: 'Community & audience support packs',
    summary:
      'Templates for moderation-adjacent support flows—feature-gated; not a guarantee of engagement metrics.',
    monetization: 'bundle_or_subscription',
  },
]

export function chatbotStarterLessonHref(lessonSlug: string) {
  return `${PUBLIC_CHATBOT_LIBRARY_BASE_PATH}/${lessonSlug}`
}

export function resolveChatbotStarterLinkHref(lessonSlug: string) {
  if (lessonSlug === CHATBOT_STARTER_INDEX_SENTINEL) return PUBLIC_CHATBOT_LIBRARY_BASE_PATH
  return chatbotStarterLessonHref(lessonSlug)
}
