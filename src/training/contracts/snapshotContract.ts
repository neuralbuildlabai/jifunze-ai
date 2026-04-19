/**
 * Canonical learner intelligence snapshot semantics.
 * Doc: docs/jifunze-ontology-and-contracts.md §4
 *
 * Breaking changes require dual-read parsers and a coordinated migration.
 */
export const INTELLIGENCE_SNAPSHOT_PAYLOAD_VERSION = 1 as const

export type IntelligenceSnapshotPayloadVersion = typeof INTELLIGENCE_SNAPSHOT_PAYLOAD_VERSION

/** Persisted triggers allowed today */
export const SNAPSHOT_TRIGGER_KINDS = ['checkpoint'] as const

export type SnapshotTriggerKind = (typeof SNAPSHOT_TRIGGER_KINDS)[number]

/**
 * Concepts that must never appear in payloads (documentation / review checklist).
 * Runtime validation may be layered later.
 */
export const SNAPSHOT_STORAGE_FORBIDDEN = [
  'Raw free-text learner answers',
  'Full item-by-item answer transcripts',
  'Secrets, tokens, or cross-workspace identifiers',
  'Personally identifying details beyond what auth already knows',
] as const
