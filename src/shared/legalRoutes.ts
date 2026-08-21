/**
 * Stable routes for legal / trust pages plus the administrator entry point, and the
 * operational support inbox. Extracted from the removed training tree (trap #1,
 * docs/freeze/WIP_RECONCILIATION.md). This module must stay dependency-free.
 */
export const LEGAL_ROUTES = {
  terms: '/terms',
  privacy: '/privacy',
  contact: '/contact',
  aiDisclosure: '/ai-disclosure',
  adminLogin: '/admin/login',
} as const

/** Operational support inbox (shown on legal surfaces; not legal advice). */
export const SUPPORT_CONTACT_EMAIL = 'neuralbuildlab.ai@gmail.com'
