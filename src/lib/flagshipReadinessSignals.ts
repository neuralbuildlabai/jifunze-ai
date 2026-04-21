/**
 * Calm, audit-friendly readiness labels — derived from progress + checkpoints (no punitive tone).
 */

export type FlagshipReadinessCompact = {
  /** Short chip for path summary (≤6 words ideal) */
  compactLabel: string | null
  /** Optional secondary line for course overview */
  detailHint: string | null
}

export function flagshipReadinessCompact(args: {
  pendingMasteryModuleTitle: string | undefined
  needsAttentionCount: number
  capstoneUnlocked: boolean
  capstonePrepAccessible: boolean
  capstonePrepComplete: boolean
  masteryDone: number
  masteryTotal: number
}): FlagshipReadinessCompact {
  const {
    pendingMasteryModuleTitle,
    needsAttentionCount,
    capstoneUnlocked,
    capstonePrepAccessible,
    capstonePrepComplete,
    masteryDone,
    masteryTotal,
  } = args

  if (pendingMasteryModuleTitle) {
    return {
      compactLabel: 'Checkpoint pending',
      detailHint: `Strengthen evidence in “${pendingMasteryModuleTitle}” before treating mastery as complete.`,
    }
  }

  if (needsAttentionCount > 0) {
    return {
      compactLabel: 'Review before continuing',
      detailHint: 'Recap or revision sessions still open from earlier modules.',
    }
  }

  if (capstoneUnlocked && !capstonePrepAccessible) {
    return {
      compactLabel: 'Not ready yet',
      detailHint: 'Finish checkpoint evidence across modules so prep reflects readiness—not navigation alone.',
    }
  }

  if (capstonePrepAccessible && !capstonePrepComplete) {
    return {
      compactLabel: 'Nearly ready for capstone',
      detailHint: 'Complete preparation when deliverables meet the brief and your evidence bar.',
    }
  }

  if (capstonePrepComplete && masteryTotal > 0 && masteryDone < masteryTotal) {
    return {
      compactLabel: 'Evidence incomplete',
      detailHint: 'Some mastery checkpoints remain—optionally tighten before calling the course done.',
    }
  }

  if (masteryTotal > 0 && masteryDone === masteryTotal && capstonePrepComplete) {
    return {
      compactLabel: 'Ready to move on',
      detailHint: null,
    }
  }

  return { compactLabel: null, detailHint: null }
}
