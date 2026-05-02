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

/** Background + border tone — restrained hierarchy on dark surfaces */
export function flagshipBlockCardClass(type: FlagshipSessionBlockType): string {
  switch (type) {
    case 'worked_example':
      return 'bg-emerald-950/[0.06] border-white/[0.07]'
    case 'practice_task':
    case 'output_prompt':
      return 'bg-amber-950/[0.05] border-white/[0.08]'
    case 'reflection_prompt':
      return 'bg-fuchsia-950/[0.05] border-white/[0.07]'
    case 'recap':
      return 'bg-sky-950/[0.06] border-white/[0.07]'
    case 'intro':
      return 'bg-violet-950/[0.08] border-white/[0.08]'
    case 'takeaway':
    case 'next_step':
      return 'bg-black/[0.2] border-white/[0.05]'
    default:
      return 'bg-[color:var(--jf-surface)]/35 border-white/[0.06]'
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
