/**
 * The content formats Jifunze works in, with HONEST availability flags.
 *
 * `status` may not overstate the repository: 'live' means you can consume it today (on this
 * site or a channel), 'toolkit' means the production pipeline can already make it but nothing
 * is publishing yet, 'planned' means it does not exist yet. The landing page renders these
 * labels verbatim — a format must never be presented as publishing when it is not.
 */

export type ContentFormatStatus = 'live' | 'toolkit' | 'planned'

export type ContentFormat = {
  id: string
  label: string
  blurb: string
  status: ContentFormatStatus
}

export const CONTENT_FORMATS: readonly ContentFormat[] = [
  {
    id: 'quick_reads',
    label: 'Quick reads',
    blurb: 'Short written lessons you can act on the same day — published on this site.',
    status: 'live',
  },
  {
    id: 'single_image',
    label: 'Single-image explainers',
    blurb: 'One idea, one image, clearly explained.',
    status: 'planned',
  },
  {
    id: 'carousels',
    label: 'Carousels',
    blurb: 'Step-by-step swipe-through lessons.',
    status: 'planned',
  },
  {
    id: 'infographics',
    label: 'Infographics',
    blurb: 'Dense, saveable reference visuals.',
    status: 'planned',
  },
  {
    id: 'animated_explainers',
    label: 'Animated explainers',
    blurb: 'Short motion pieces that walk through a concept.',
    status: 'planned',
  },
  {
    id: 'faceless_clips',
    label: 'Faceless clips',
    blurb: 'Vertical short-form clips — captioned, no presenter.',
    status: 'toolkit',
  },
  {
    id: 'faceless_videos',
    label: 'Faceless videos',
    blurb: 'Longer captioned videos built by our rendering pipeline.',
    status: 'toolkit',
  },
  {
    id: 'tutorials',
    label: 'Tutorials',
    blurb: 'Walkthroughs of a real task, end to end.',
    status: 'planned',
  },
  {
    id: 'resource_roundups',
    label: 'Resource roundups',
    blurb: 'Curated, verified lists of useful tools and opportunities.',
    status: 'planned',
  },
] as const

export const FORMAT_STATUS_LABELS: Record<ContentFormatStatus, string> = {
  live: 'On this site now',
  toolkit: 'In our production toolkit',
  planned: 'Planned',
}
