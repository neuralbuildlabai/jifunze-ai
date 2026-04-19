import type { PublicPlatform, PublicTone } from '../services/content/publicGenerate'

export const PUBLIC_PLATFORM_OPTIONS: Array<{ id: PublicPlatform; label: string }> = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'x', label: 'X' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'facebook', label: 'Facebook' },
]

export const PUBLIC_TONE_OPTIONS: Array<{ id: PublicTone; label: string }> = [
  { id: 'professional', label: 'Professional' },
  { id: 'friendly', label: 'Friendly' },
  { id: 'bold', label: 'Bold' },
  { id: 'educational', label: 'Educational' },
]

/** Short, realistic starters for the public generator (home + /generate). */
export const PUBLIC_SAMPLE_TOPICS: readonly string[] = [
  'Revising smarter with spaced practice',
  'Launching a calm product update this quarter',
  'Announcing a team policy change clearly',
  'Hosting a small community workshop',
]
