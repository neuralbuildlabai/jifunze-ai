# Capability truth table — the 27 operating-loop stages

**Updated: 2026-08-21 (pivot branch).** Grounded in code, not in docs or test names. The admin
console (`src/components/admin-app/adminModules.ts`) renders these statuses and may never claim
more than this table proves. Scale: **Complete & tested** · **Built, unconnected** · **Partial**
· **Documented only** · **Missing**. Δ marks what the 2026-08-21 pivot branch changed.

| # | Stage | State | Evidence / limitation |
|---|---|---|---|
| 1 | Signal discovery | Partial | `ingest-signals` Edge Function (RSS/Atom/RDF, 7 feeds, ETag). No cron created; deploy separately authorized |
| 2 | Signal normalization | Partial | Canonical URL, HTML strip, timestamp sanity. No enrichment/pillar tagging at ingest |
| 3 | Dedup & clustering | Partial | URL-identity only (`canonical_url` UNIQUE); no semantic clustering |
| 4 | Signal scoring | Complete & tested | `orchestrator/score.ts` + veto list; gating scores not persisted; Δ pillars now advisory keywords in `src/social/pillars.ts` |
| 5 | Selection | Complete & tested (shallow) | `select.ts` bars + evergreen rotation + decision.json; no lifecycle (signals never marked consumed) |
| 6 | Research & claim verification | **Missing** | No research code exists; P0 for news-derived posts before activation |
| 7 | Source preservation | Missing (schema-only) | `content_sources` exists; nothing writes it; captions carry no attribution |
| 8 | Content brief generation | Complete & tested | `brief.ts` + offline fallback; `transform.ts` variants exist but are not called by the loop |
| 9 | Single-image generation | Missing | publish function has an IMAGE branch; no producer |
| 10 | Carousel generation | Missing | — |
| 11 | Infographic generation | Missing | — |
| 12 | Animated explainer | Missing | — |
| 13 | Faceless Reel generation | Complete & tested | `render/` 1080×1920, captions, brand mark, music. Music licence documentation still owed |
| 14 | Quality & safety gates | Partial → Δ improved | Script-quality gate; Δ `PROHIBITED_CLAIMS` linter now enforced on the publish path (fail closed). Still no toxicity/PII/copyright checks |
| 15 | Human review | **Δ gate enforced; UI missing** | `orchestrator/approvalGate.ts`: publish refuses without a recorded `approved` decision in `content_approvals`, fail-closed, no bypass. No review UI writes approvals yet — so nothing can publish, which is correct |
| 16 | Approval workflow | Δ as #15 | Schema + enforced gate exist; queue/revision UI missing |
| 17 | Instagram preview | Missing | Renders inspectable only as CI artifacts |
| 18 | Instagram scheduling | Missing | Loop is run-now-once-daily; `publishing_jobs` never written |
| 19 | Instagram publishing | Built, unconnected & gated off | `publish-instagram` complete (idempotent, token-redacting); `DRY_RUN` default true, `PUBLISH_SECRET`, `IG_PUBLISH_ENABLED` unset; Δ plus the human-approval gate |
| 20 | Metrics synchronization | Built, unconnected | `sync.ts` + workflow gated on unset `SOCIAL_SYNC_ENABLED`; starved until ledger writes exist |
| 21 | Performance insights | Missing | Dashboard math only (`socialOpsSummary.ts`, tested) |
| 22 | Feedback into scoring | Missing — **advisory by design** | Nothing reads metrics back into scoring; weight changes must stay reviewed, versioned code changes |
| 23 | Public social-account directory | Complete & tested | 8 verified accounts; anti-impersonation tests; Δ re-rendered on the new landing page |
| 24 | Public latest-post feed | Δ Partial → foundation built | Display-safe contract + honest loading/live/stale/empty/unavailable/not-configured states (`src/services/publicFeed/`); data arrives only after connection |
| 25 | Site-health monitoring | Partial | Connection/token health only |
| 26 | Incident & kill-switch controls | Partial | Switches real and layered, read-only by design; no incident log |
| 27 | Audit trail | Missing | decision.json per run is the only record; no audit table |

## Priorities before supervised activation (unchanged)

P0: research/verification stage (6), source preservation (7), review UI feeding the enforced
gate (15–16), safety checks beyond editorial (14), signal lifecycle (5).
