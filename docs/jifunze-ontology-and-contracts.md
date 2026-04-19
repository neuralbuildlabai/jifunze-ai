# Jifunze ontology and system contracts

This document locks **canonical meanings** for readiness, weak areas, remediation, revision, assessment modes, learner intelligence snapshots, and derived content lineage. Implementation types live under `src/training/contracts/` and related modules.

**Related code**

- `src/training/contracts/` — enums, maps, lineage types
- `src/training/readinessIndicators.ts` — current **coverage-oriented** composite snapshot (see readiness mapping below)
- `src/training/learnerIntelligencePayload.ts` — snapshot payload shape + builders
- `src/training/intelligenceContinuity.ts` — **trajectory** readiness from snapshots
- `src/knowledge/derivedContentLineage.ts` — persisted lineage metadata shape

---

## 1. Readiness ontology

### 1.1 Dimensions (canonical)

| Dimension | Meaning | Primary signals | Must NOT use alone for |
|-----------|---------|-----------------|------------------------|
| **Coverage readiness** | Progress through required curriculum objects (lessons + gated quizzes) and breadth of touched concepts | Lesson/quiz completion counts, module completion, diagnostic coverage hints | Certification guarantee; “job readiness” legal claim |
| **Transfer readiness** | Ability to retrieve/apply outside strict lesson order (mixed-topic performance vs in-order comfort) | Mixed-review availability + mixed-review attempts (when present), cross-module miss patterns | Substitute for stakes rehearsal |
| **Stakes readiness** | Performance under exam-like framing (timing, blueprint-style bundles, pressure tolerance) — **preparation**, not credential | Exam-practice / mock modes, timed attempts (when enabled), debrief summaries | Issuing or implying official certification |
| **Trajectory readiness** | Change over time vs earlier checkpoints on the same plan | Versioned learner intelligence snapshots, longitudinal continuity | Precise psychometric “true score” |

### 1.2 Overall summary (product contract)

- **Overall readiness** is a **labeled interpretation** combining dimensions, never a single opaque score.
- Current UI uses:
  - **Composite band** (`computeReadinessSnapshot`) → primarily **coverage** blended with quiz completion and placement confidence; unlock flags anticipate **transfer**/**stakes** pathways.
  - **Trajectory** appears when **≥ 1** snapshot exists for continuity (`intelligenceContinuity`).
- **Safe claims**: “supports preparation”, “readiness indicators”, “suggested next practice”, “trend vs earlier checkpoints”.
- **Unsafe claims**: “you will pass”, “certified”, “exam guaranteed”, implying legal/licensed endorsement.

### 1.3 Work-use vs exam-prep

- **Work-use**: narrative fluency, scenarios, stakeholder explanation — emphasize **coverage + transfer** when stable.
- **Exam-prep**: stakes rehearsal and mixed retrieval — emphasize **stakes + trajectory**, never substitute for official materials.

### 1.4 Audience

| Dimension | Learner-facing | Facilitator-facing | Internal |
|-----------|----------------|--------------------|----------|
| Coverage | Yes (progress/bands) | Aggregate completion | Telemetry |
| Transfer | Yes (mixed review guidance) | Aggregate weak-label patterns | Blueprint tuning |
| Stakes | Yes (exam-practice framing) | Cohort aggregates only | Mode config |
| Trajectory | Yes (longitudinal lines) | Cohort trend summaries | QA |

---

## 2. Weak-area and remediation ontology

| Term | Meaning | Sources | Confidence | Persistence |
|------|---------|---------|------------|-------------|
| **Weak concept** | Concept/construct with elevated miss weight vs peers on **current** evidence | Quiz misses, diagnostic, placement gaps | Heuristic | Derived report + optional snapshot excerpt |
| **Repeated weakness** | Same concept label/key appears across **multiple** checkpoint summaries | Snapshot history aggregation | Stronger than single checkpoint | Derived from snapshots; not raw answers |
| **Misconception indicator** | Pattern suggesting known myth/confusion (often tied to misconception objects) | Wrong options correlated with misconception tags | Moderate | Derived |
| **Revisit target** | Specific lesson/module worth rework **before** next checkpoint | Weak-area report revisit suggestions | Moderate | Derived; titles may appear in snapshots |
| **Remediation recommendation** | Structured **do-this-next** block (actions) | Weak areas + pedagogy templates | Moderate | Derived; titles mirrored in snapshots |
| **Revision target** | Concept/lesson prioritized for **retrieval practice** (may overlap weak concept) | Weak signals + spaced/mixed policy | Moderate | Derived |

**Distinctions**

- **Current weak area** → present-tense report (`WeakAreaReport`).
- **Repeated weak area** → longitudinal aggregation (`intelligenceContinuity`).
- **Remediation candidate** → actionable block (`RemediationRecommendation`).
- **Revision candidate** → retrieval scheduling / mixed-review emphasis target.

**Wording**

- Learner: “signals”, “practice targets”, “revisit”, not “failure” or surveillance language.
- Facilitator: aggregate counts, label frequency — **no per-item answer text** by default.

---

## 3. Assessment mode contracts

Canonical modes are defined in TypeScript (`AssessmentMode`, `quizKindToAssessmentMode`). DB `training_quizzes.quiz_kind` values map into these modes.

| Mode | Purpose | Question style | Scoring | Explanations | Persists | Readiness dimensions touched |
|------|---------|----------------|---------|--------------|----------|------------------------------|
| **diagnostic** | Place learner; estimate gaps | Broad sampling | Pass/fail optional; informational emphasis | Required per item | Attempt + placement | Coverage (baseline),Trajectory (initial point) |
| **module_checkpoint** | Gate module objectives | Module-scoped; tagged concepts | Clear pass threshold | Required | Attempt + snapshot on policy | Coverage,Trajectory |
| **revision** | Verify remediation **when dedicated quiz exists** | Narrow constructs | Strict pass acceptable | Required | Attempt | Coverage,Trajectory |
| **recap_checkpoint** | Consolidate before harder review | Short consolidation | Pass threshold | Required | Attempt | Coverage |
| **mixed_review** | Transfer / out-of-order retrieval | Cross-module sampling | Pass threshold | Required | Attempt | Transfer (+Trajectory when repeated) |
| **mock_exam** | Stakes rehearsal (`exam_practice` kind) | Blueprint-oriented bundles | Exam-like scoring report | Required + debrief framing | Attempt | Stakes (+Trajectory) |

**Unlock / influence**

- Mixed review typically unlocks after **N** modules (readiness architecture).
- Exam practice unlock depends on readiness architecture flags.
- Snapshots append on **checkpoint policy** (currently after successful checkpoint-related submission path).

---

## 4. Learner intelligence snapshot contract

- **Purpose**: durable, **privacy-safe** checkpoint memory for longitudinal continuity (weak labels, revisit titles, readiness band snapshot, unlock flags).
- **When written**: After qualifying quiz checkpoint events (implementation: `persistLearnerIntelligenceAfterQuizCheckpoint` path); trigger_kind **`checkpoint`**.
- **Versioning**: `payload.version` integer; **only version `1`** is recognized by parsers today. Migrating requires dual-read then bump constant in code.
- **Forbidden**: raw learner free-text answers, full item trace payloads, cross-workspace identifiers.
- **Relation to attempts**: Snapshot references `source_quiz_id` + compact aggregates; attempts remain authoritative detail rows.
- **Contradictions**: Older snapshots are **historical truth at write time**; UI derives **trajectory** by comparing ordered payloads, not overwriting past meaning.

Required fields for v1 are listed on `IntelligenceSnapshotPayloadV1` in `learnerIntelligencePayload.ts`.

---

## 5. Derived content lineage contract

See `src/knowledge/derivedContentLineage.ts` for `DerivedContentLineageV1` metadata fields.

**Principles**

- Deterministic derivation from **`TrainingKnowledgeSpec`** is always allowed.
- **Learner-private** history (weak areas, prior checkpoint memory markdown) may appear only in **learner-owned** assets and exports.
- **Cohort aggregates** only in facilitator/manager asset types and manager lanes.
- **Publishable** content must not embed another learner’s data; requires explicit revision/publish workflow in future phases.

---

## 6. Gap notes (alignment pass)

- `computeReadinessSnapshot().band` is a **coverage-weighted composite**, not isolated “transfer” or “stakes”.
- Trajectory is implemented in **`intelligenceContinuity`**, not inside `computeReadinessSnapshot`.
- Dedicated **revision quiz kind** may be absent; revision path can be heuristic until a DB kind lands.
- Derived asset `metadata_json` lineage is **gradually** adopting `DerivedContentLineageV1`; older rows remain valid.

---

## 7. Change control

Any change to payload version, assessment mode enum, or lineage schema requires:

1. Update this document
2. Update `src/training/contracts/` types
3. Migration or dual-read plan for persisted JSON
4. UI copy review for trust boundaries

---

## 8. Code inventory (implementation anchors)

| Artifact | Location |
|----------|----------|
| Readiness dimensions + safe copy guardrails | `src/training/contracts/readinessDimensions.ts` |
| Assessment modes + `quiz_kind` mapping + readiness impact | `src/training/contracts/assessmentModes.ts` |
| Snapshot version + forbidden-store checklist | `src/training/contracts/snapshotContract.ts` |
| Weak-area vocabulary anchor | `src/training/contracts/weakAreaOntology.ts` |
| Barrel exports | `src/training/contracts/index.ts` |
| Persisted lineage metadata (`metadata_json`) | `src/knowledge/derivedContentLineage.ts` |
| Snapshot payload v1 (runtime) | `src/training/learnerIntelligencePayload.ts` |
| Centralized learner-facing trust copy (UI guardrails) | `src/training/trustCopy.ts` |
| Concept coverage summary (graph vs weak signals) | `src/training/conceptCoverageHints.ts` |
| Ops triage reference | `docs/TRAINING_OPS_TRIAGE.md` |

---

## 9. Follow-ups (post-lock)

- Wire `quizKindToAssessmentMode()` into quiz completion / persistence paths for analytics (non-breaking).
- Introduce dedicated DB `quiz_kind` for **revision** mode when product adds it; until then revision remains heuristic + recap/mixed pathways.
- Optionally backfill older `derived_content_assets.metadata_json` rows with `ontology` + `source_training_plan_id` when rows are rewritten.
