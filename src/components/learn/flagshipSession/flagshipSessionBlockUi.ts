import type { FlagshipSessionBlockType } from '../../../data/learning/flagshipSessionContentTypes'

/** Subtle accent for block rail — calm, not playground-bright */
export function flagshipBlockAccentClass(type: FlagshipSessionBlockType): string {
  switch (type) {
    case 'intro':
      return 'border-l-violet-500/55'
    case 'concept_explanation':
      return 'border-l-sky-500/45'
    case 'key_points':
      return 'border-l-amber-500/45'
    case 'worked_example':
      return 'border-l-emerald-500/45'
    case 'practice_task':
      return 'border-l-orange-400/45'
    case 'reflection_prompt':
      return 'border-l-fuchsia-500/40'
    case 'output_prompt':
      return 'border-l-teal-500/45'
    case 'recap':
      return 'border-l-zinc-400/50'
    case 'takeaway':
      return 'border-l-lime-400/35'
    case 'next_step':
      return 'border-l-violet-400/45'
    default:
      return 'border-l-zinc-500/40'
  }
}

/** Background + border tone — warm light surfaces inside `.jf-learn-warm` */
export function flagshipBlockCardClass(type: FlagshipSessionBlockType): string {
  switch (type) {
    case 'worked_example':
      return 'bg-emerald-50/90 border-[color:var(--jf-border)]'
    case 'practice_task':
    case 'output_prompt':
      return 'bg-orange-50/70 border-[color:var(--jf-border)]'
    case 'reflection_prompt':
      return 'bg-fuchsia-50/75 border-[color:var(--jf-border)]'
    case 'recap':
      return 'bg-sky-50/80 border-[color:var(--jf-border)]'
    case 'intro':
      return 'bg-violet-50/75 border-[color:var(--jf-border)]'
    case 'takeaway':
    case 'next_step':
      return 'bg-stone-50/90 border-[color:var(--jf-border)]'
    default:
      return 'bg-[color:var(--jf-surface)] border-[color:var(--jf-border)] shadow-[var(--jf-shadow-soft)]'
  }
}

export function flagshipBlockEyebrowLabel(type: FlagshipSessionBlockType): string {
  switch (type) {
    case 'intro':
      return 'Overview'
    case 'concept_explanation':
      return 'Explain'
    case 'key_points':
      return 'Essentials'
    case 'worked_example':
      return 'Example'
    case 'practice_task':
      return 'Practice'
    case 'reflection_prompt':
      return 'Reflect'
    case 'output_prompt':
      return 'Output'
    case 'recap':
      return 'Recap'
    case 'takeaway':
      return 'Takeaway'
    case 'next_step':
      return 'Next'
    default:
      return 'Lesson'
  }
}
