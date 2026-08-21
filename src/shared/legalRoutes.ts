/**
 * Stable routes for legal / trust pages, plus the operational support inbox.
 *
 * Extracted from `src/training/trustCopy.ts` so that removing the frozen training tree cannot
 * break the kept public site, auth surfaces or the social-ops console. This module must stay
 * dependency-free.
 *
 * NOTE (pivot, 2026-08-21): entries for retired surfaces (`disclaimer`, `support`, `refunds`,
 * `pricing`, `paths`, `learn`, `workspaceSubscription`, `authSignUp`) exist only while the
 * corresponding routes are being retired; they are removed together with their last consumer.
 */
export const LEGAL_ROUTES = {
  disclaimer: '/disclaimer',
  terms: '/terms',
  privacy: '/privacy',
  support: '/support',
  contact: '/contact',
  refunds: '/refunds',
  pricing: '/pricing',
  paths: '/paths',
  learn: '/learn',
  workspaceSubscription: '/settings/subscription',
  authSignIn: '/auth/sign-in',
  authSignUp: '/auth/sign-up',
} as const

/** Operational support inbox (shown on legal surfaces; not legal advice). */
export const SUPPORT_CONTACT_EMAIL = 'neuralbuildlab.ai@gmail.com'
