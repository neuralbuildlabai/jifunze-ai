import type { AutonomyAction } from '../types/autonomy'
import type { ContentLifecycleStatus } from '../types/contentLifecycle'
import type { ContentOpportunity } from '../types/opportunity'
import type { PriorityLabel } from '../types/priorityLabel'

export function lifecycleStatusChipClass(status: ContentLifecycleStatus): string {
  switch (status) {
    case 'published':
      return 'bg-emerald-600/20 text-emerald-100 border border-emerald-500/30'
    case 'scheduled':
      return 'bg-cyan-600/18 text-cyan-100 border border-cyan-500/28'
    case 'queued':
    case 'drafted':
      return 'bg-violet-600/20 text-violet-100 border border-violet-500/28'
    case 'shortlisted':
    case 'detected':
      return 'bg-sky-600/15 text-sky-100/90 border border-sky-500/25'
    case 'ignored':
    case 'rejected':
      return 'bg-zinc-800/80 text-zinc-500 border border-zinc-700/60'
    case 'escalated':
      return 'bg-rose-600/22 text-rose-100 border border-rose-500/32'
  }
}

export function autonomyActionChipClass(action: AutonomyAction): string {
  switch (action) {
    case 'publish':
      return 'bg-emerald-600/25 text-emerald-100 border border-emerald-500/35'
    case 'queue':
      return 'bg-teal-600/20 text-teal-100 border border-teal-500/30'
    case 'draft':
      return 'bg-violet-600/25 text-violet-100 border border-violet-500/35'
    case 'watch':
      return 'bg-sky-600/15 text-sky-100/95 border border-sky-500/25'
    case 'ignore':
      return 'bg-zinc-800/80 text-zinc-500 border border-zinc-700/60'
    default:
      return 'bg-rose-600/25 text-rose-100 border border-rose-500/35'
  }
}

export function riskChipClass(risk: ContentOpportunity['risk_level']): string {
  switch (risk) {
    case 'high':
      return 'text-rose-300/95'
    case 'medium':
      return 'text-amber-200/90'
    default:
      return 'text-emerald-200/85'
  }
}

export function formatConversionIntent(intent: ContentOpportunity['conversion_intent']): string {
  return intent.replace(/_/g, ' ')
}

export function formatTeachingStyle(style: ContentOpportunity['explanation_style']): string {
  return style.replace(/_/g, ' ')
}

export function learningBandChipClass(band: ContentOpportunity['learning_confidence_band']): string {
  switch (band) {
    case 'strong':
      return 'bg-emerald-600/20 text-emerald-100 border border-emerald-500/35'
    case 'emerging':
      return 'bg-amber-500/15 text-amber-100 border border-amber-500/25'
    default:
      return 'bg-zinc-700/50 text-zinc-400 border border-zinc-600/50'
  }
}

export function formatLearningAffects(a: ContentOpportunity['learning_affects']): string {
  const bits: string[] = []
  if (a.format) bits.push('format')
  if (a.cta) bits.push('CTA')
  if (a.teaching) bits.push('teaching style')
  if (a.platform) bits.push('platform order')
  if (a.priority) bits.push('priority / confidence')
  return bits.length ? bits.join(' · ') : 'baseline (editorial defaults only)'
}

export const CREATIVE_STUDIO_SECTION_ID = 'creative-studio-from-idea'

export function formatSuggestedPlatforms(platforms: string[]): string {
  if (!platforms.length) return '—'
  const cleaned = platforms.map((p) => p.trim()).filter(Boolean)
  if (!cleaned.length) return '—'
  return cleaned.slice(0, 3).join(' · ')
}

export function scrollToCreativeStudioSection(): void {
  requestAnimationFrame(() => {
    document.getElementById(CREATIVE_STUDIO_SECTION_ID)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  })
}

export function priorityLabelChipClass(label: PriorityLabel): string {
  switch (label) {
    case 'critical':
      return 'bg-rose-600/25 text-rose-100 border border-rose-500/30'
    case 'high':
      return 'bg-orange-500/20 text-orange-100 border border-orange-500/25'
    case 'medium':
      return 'bg-amber-500/15 text-amber-100 border border-amber-500/20'
    default:
      return 'bg-zinc-700/50 text-zinc-300 border border-zinc-600/50'
  }
}
