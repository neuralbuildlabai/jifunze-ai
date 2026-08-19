import type { User } from '@supabase/supabase-js'
import type { BrandProfile, WorkspaceEngagementFocus } from '../types/brand'

export type WorkspacePersona = WorkspaceEngagementFocus

/**
 * Infers engagement focus from brand name, industry, audience, topics, and primary domain.
 * Uses {@link BrandProfile.workspace_engagement_focus} when set.
 */
export function inferWorkspacePersona(brand: BrandProfile): WorkspacePersona {
  if (brand.workspace_engagement_focus) return brand.workspace_engagement_focus

  const topics = (brand.priority_topics ?? []).join(' ')
  const blob = `${brand.name} ${brand.industry} ${brand.audience_summary ?? ''} ${topics}`.toLowerCase()

  let brandScore = 0
  let educatorScore = 0
  let creatorScore = 0

  if (
    /\b(brand|marketing|agency|campaign|e-?commerce|ecommerce|saas|startup|advertis|advertisement|promo|promotion|lead gen|sales funnel|conversion|retail|boutique|storefront|product launch|go-to-market|gtm)\b/.test(
      blob,
    )
  ) {
    brandScore += 4
  }
  if (
    /\b(educat|teach|tutor|tutorial|course|lesson|student|classroom|explainer|literacy|workshop|curriculum|beginner|walkthrough|how-to|school|professor|instructor|pedagogy)\b/.test(
      blob,
    )
  ) {
    educatorScore += 4
  }
  if (
    /\b(creator|influencer|audience|follower|viral|hook|hooks|tiktok|reels|youtuber|youtubers|niche|behind the scenes|content creator|threads?|engagement)\b/.test(
      blob,
    )
  ) {
    creatorScore += 4
  }

  switch (brand.primaryDomain) {
    case 'ai':
      educatorScore += 2
      break
    case 'beauty':
      brandScore += 1
      creatorScore += 1
      break
    case 'lifestyle':
    case 'entertainment':
    case 'music':
      creatorScore += 2
      break
    default:
      break
  }

  const goal = brand.conversion?.primary_conversion_goal
  if (goal === 'lead_generation' || goal === 'sales') {
    brandScore += 1
  }

  const max = Math.max(brandScore, educatorScore, creatorScore)
  if (max >= 4) {
    if (brandScore === max && brandScore >= educatorScore && brandScore >= creatorScore) return 'brand'
    if (educatorScore === max) return 'educator'
    if (creatorScore === max) return 'creator'
    return 'brand'
  }

  if (brand.primaryDomain === 'ai') return 'educator'
  if (brand.primaryDomain === 'beauty' || brand.primaryDomain === 'lifestyle') return 'creator'

  return 'explorer'
}

export function workspaceFocusLine(persona: WorkspacePersona): string {
  switch (persona) {
    case 'educator':
      return 'Explainers · tutorials · beginner-friendly learning content'
    case 'brand':
      return 'Trust-building posts · campaigns · audience and conversion angles'
    case 'creator':
      return 'Hooks · engagement · post ideas · save/share-worthy content'
    case 'explorer':
    default:
      return 'Ideas across topics — start broad, then narrow in'
  }
}

export function personaHintSentence(persona: WorkspacePersona): string {
  switch (persona) {
    case 'educator':
      return 'Many teams use this workspace for clear explainers, tutorials, and learning content—always verify facts and tone before publishing.'
    case 'brand':
      return 'Lean into trust, product stories, and campaign angles that match how you want your brand to show up—review outputs for accuracy and compliance.'
    case 'creator':
      return 'Use this for hooks, audience engagement, and post ideas that fit your niche and platforms—treat drafts as assistive, not publication-final.'
    case 'explorer':
    default:
      return 'Explore different angles here — pick a prompt below when you want a quick starting point.'
  }
}

/**
 * First name from profile metadata only — never derived from email local parts (avoids “Neuralbuildlab.ai” greetings).
 */
export function getUserFirstName(user: User): string | null {
  const m = user.user_metadata as Record<string, unknown> | undefined
  const full = typeof m?.full_name === 'string' ? m.full_name.trim() : ''
  const name = typeof m?.name === 'string' ? m.name.trim() : ''
  const raw = full || name
  if (raw) {
    const first = raw.split(/\s+/)[0]
    if (
      first &&
      first.length <= 40 &&
      !/[.@]/.test(first) &&
      /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'-]*$/.test(first)
    ) {
      return first
    }
  }
  return null
}

/** Returning = came back after prior activity gap, or account is not brand-new today. */
export function isReturningWorkspaceVisit(user: User, daysSinceActivity: number | null): boolean {
  const createdMs = new Date(user.created_at).getTime()
  if (Number.isNaN(createdMs)) return false
  const accountAgeDays = Math.floor((Date.now() - createdMs) / 86400000)
  if (daysSinceActivity != null && daysSinceActivity >= 1) return true
  if (accountAgeDays >= 1) return true
  return false
}

export type SignedInWelcomeCopy = {
  eyebrow: string
  title: string
  lede: string
  continuity: string
  focusLabel: string
}

function welcomeFocusLead(persona: WorkspacePersona): string {
  switch (persona) {
    case 'educator':
      return 'Learning-first angle'
    case 'brand':
      return 'Brand & marketing angle'
    case 'creator':
      return 'Creator & growth angle'
    case 'explorer':
    default:
      return 'Flexible starting point'
  }
}

export function buildSignedInWelcomeCopy(input: {
  brand: BrandProfile
  workspaceName: string
  persona: WorkspacePersona
  isReturning: boolean
}): SignedInWelcomeCopy {
  const { brand, workspaceName, persona, isReturning } = input
  const focus = workspaceFocusLine(persona)
  const hint = personaHintSentence(persona)
  const lead = welcomeFocusLead(persona)

  const ws = workspaceName.trim() || 'your workspace'
  const profile = brand.name.trim() || 'your content profile'

  if (isReturning) {
    return {
      eyebrow: 'Your workspace',
      title: 'Welcome back',
      lede: `You’re in ${ws}. Your content profile is ${profile}. ${hint}`,
      continuity: `${lead}: ${focus}. When you’re ready, add a topic below — or try one of the ideas we picked for you.`,
      focusLabel: focus,
    }
  }

  return {
    eyebrow: 'Start here',
    title: 'Welcome to Jifunze',
    lede: `You’re in ${ws}. Your content profile is ${profile}. ${hint}`,
    continuity: `${lead}: ${focus}. Start with a topic below whenever you’re ready.`,
    focusLabel: focus,
  }
}
