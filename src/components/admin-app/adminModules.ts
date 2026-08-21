/**
 * The admin console's information architecture, with HONEST per-module status labels.
 *
 * Statuses mirror the capability truth table (docs/social/CAPABILITY_TRUTH_TABLE.md, from the
 * 2026-08 audits + docs/IMPLEMENTATION_PLAN_2026-08-21.md §6). A module may not claim more than
 * the code beneath it proves:
 *   - operational          — working now against real repository code (may still show empty data
 *                            until Supabase/social connections are made)
 *   - read-only            — real data surface, no mutations
 *   - partial              — some of the stage exists; the label says what is missing
 *   - awaiting-connection  — code exists but is deliberately unconnected/gated off
 *   - planned              — no backend exists; the page only describes the intended stage
 */

export type AdminModuleStatus =
  | 'operational'
  | 'read-only'
  | 'partial'
  | 'awaiting-connection'
  | 'planned'

export type AdminModule = {
  /** Route under /admin (empty string = the overview itself). */
  path: string
  label: string
  status: AdminModuleStatus
  /** One-line honest summary of what exists today. */
  summary: string
  /** What exists in the repository right now (evidence, shown on the module page). */
  exists: readonly string[]
  /** What is missing before the stage is operational (shown on the module page). */
  missing: readonly string[]
  /** An existing operational page that covers part of this module, if any. */
  liveHref?: string
  liveLabel?: string
}

export const ADMIN_MODULE_GROUPS: readonly { title: string; modules: readonly AdminModule[] }[] = [
  {
    title: 'Operate',
    modules: [
      {
        path: 'signals',
        label: 'Signals',
        status: 'read-only',
        summary: 'Read-only inbox over ingested signals.',
        exists: [
          'ingest-signals Edge Function (RSS/Atom/RDF, 7 seeded feeds, ETag-aware) — deploy separately authorized',
          'ingested_signals + signal_sources tables with dedupe on canonical URL',
        ],
        missing: [
          'Signal lifecycle (consumed / rejected states) — signals are never marked used',
          'Semantic clustering (URL-identity dedupe only)',
          'Hourly cron (documented SQL, not yet created)',
        ],
      },
      {
        path: 'selection',
        label: 'Selection',
        status: 'partial',
        summary: 'Scoring + selection run in CI; decisions are recorded as run artifacts, not yet browsable here.',
        exists: [
          'orchestrator/score.ts — relevance/career/freshness scoring + 7-category veto (tested)',
          'orchestrator/select.ts — news bar 0.66 + freshness bar, evergreen rotation, decision.json audit trail',
          'content_opportunities audit rows written per run',
        ],
        missing: [
          'Selection log UI over content_opportunities',
          'Full score breakdown persistence (careerScore and families are not persisted)',
          'Queue/backlog — the loop selects one item per day',
        ],
      },
      {
        path: 'research',
        label: 'Research',
        status: 'planned',
        summary: 'No research or claim-verification stage exists anywhere in the repository yet.',
        exists: ['content_sources table + ContentItem.sources schema (nothing writes them)'],
        missing: [
          'Claim extraction and corroboration against traceable sources',
          'Article-body retrieval (the pipeline sees only signal title + summary)',
          'A research-passed gate before news-derived briefs may proceed',
        ],
      },
      {
        path: 'content',
        label: 'Content',
        status: 'partial',
        summary: 'Brief generation is complete and tested; the ledger exists but the loop does not write it yet.',
        exists: [
          'orchestrator/brief.ts — hook/segments/caption with deterministic offline fallback (tested)',
          'orchestrator/social/transform.ts — per-platform variants incl. hashtags + alt text (not yet called by the loop)',
          'content_items ledger schema (in the not-yet-applied social-ops migration)',
        ],
        missing: ['Ledger writes from the loop', 'Hashtags/CTA/alt-text wired into the brief', 'Image/carousel/infographic formats'],
        liveHref: '/admin/social-ops/pipeline',
        liveLabel: 'Pipeline view (social-ops)',
      },
      {
        path: 'preview',
        label: 'Preview',
        status: 'planned',
        summary: 'No content preview UI exists; renders can only be inspected as CI artifacts.',
        exists: ['Rendered videos + poster frames land in loop-artifacts/ as downloadable CI artifacts'],
        missing: ['In-console Instagram-style preview of pending items'],
      },
      {
        path: 'review',
        label: 'Review',
        status: 'awaiting-connection',
        summary: 'The approval schema and the code-level publish gate exist; the review UI does not.',
        exists: [
          'content_approvals table + approval_status + RLS (in the unapplied social-ops migration)',
          'Publish path refuses items without a recorded approval (orchestrator/approvalGate.ts, default closed, tested)',
        ],
        missing: ['A review queue UI that writes content_approvals', 'Revision workflow'],
      },
      {
        path: 'calendar',
        label: 'Calendar',
        status: 'planned',
        summary: 'No scheduling exists — the loop is run-now-once-daily; publishing_jobs is never written.',
        exists: ['publishing_jobs schema (unapplied migration)'],
        missing: ['Scheduling queue, calendar UI, per-slot approvals'],
      },
    ],
  },
  {
    title: 'Produce',
    modules: [
      {
        path: 'media',
        label: 'Media',
        status: 'partial',
        summary: 'Faceless Reel rendering is complete and tested; image/carousel/infographic formats do not exist.',
        exists: [
          'render/ — 1080×1920 H.264, ASS captions, brand mark, end card, music bed (tested, offline dry-run)',
          'Visual providers: designed (default), stock (Pexels), fallback, ai-stub',
        ],
        missing: ['Single-image generation', 'Carousel generation', 'Infographic + animated-explainer formats'],
      },
      {
        path: 'video',
        label: 'Video',
        status: 'operational',
        summary: 'Video pipeline dry-run works offline today (npm run video:dry-run).',
        exists: ['renderBrief + grabFrame with deterministic offline path', 'CI runs the dry-run on every PR'],
        missing: ['Voiceover (deliberately out of scope for faceless clips)', 'Music licence documentation (OPERATIONS next-step)'],
      },
      {
        path: 'publishing',
        label: 'Publishing',
        status: 'awaiting-connection',
        summary: 'Instagram publishing is built end-to-end and deliberately OFF (DRY_RUN default, IG_PUBLISH_ENABLED unset).',
        exists: [
          'publish-instagram Edge Function — container→poll→publish, REELS+IMAGE, idempotency log, token redaction',
          'refresh-ig-token function; adapter registry with Instagram marked ready',
          'Kill switches: DRY_RUN, PUBLISH_SECRET, IG_PUBLISH_ENABLED (all closed)',
        ],
        missing: [
          'Supervised activation (separately authorized): credentials, function deploy, manual pilot posts',
          'Human-review UI feeding the approval gate',
        ],
        liveHref: '/admin/social-ops/safety',
        liveLabel: 'Kill-switch status (social-ops)',
      },
    ],
  },
  {
    title: 'Understand',
    modules: [
      {
        path: 'social-feed',
        label: 'Social feed',
        status: 'awaiting-connection',
        summary: 'The public latest-post feed reads the cached publications table, which nothing fills until sync is connected.',
        exists: ['Public feed data contract + honest empty/stale states on the landing page', 'content_publications schema'],
        missing: ['Metrics sync enabled (SOCIAL_SYNC_ENABLED unset)', 'Ledger writes so sync has publications to enrich'],
      },
      {
        path: 'analytics',
        label: 'Analytics',
        status: 'read-only',
        summary: 'Dashboard derivations are real and tested, but their source tables are empty until sync is connected.',
        exists: ['socialOpsSummary.ts — growth, engagement rate, top posts, pillar aggregation (tested math)'],
        missing: ['Data: social_metric_snapshots fills only after PR-6-style connection'],
        liveHref: '/admin/social-ops',
        liveLabel: 'Social-ops overview',
      },
      {
        path: 'insights',
        label: 'Insights',
        status: 'planned',
        summary: 'No insight or learning model exists; nothing reads metrics back into selection.',
        exists: ['Metric snapshots schema + lineage that a future model can consume'],
        missing: [
          'Insight generation over snapshots',
          'ADVISORY ONLY by design: metrics must never modify scoring weights without a reviewed, versioned change',
        ],
      },
    ],
  },
  {
    title: 'Platform',
    modules: [
      {
        path: 'accounts',
        label: 'Accounts',
        status: 'operational',
        summary: 'Verified account directory + connection/token health (names only, never token values).',
        exists: ['8 verified official accounts', 'Connection health panel'],
        missing: ['OAuth connections themselves (separately authorized)'],
        liveHref: '/admin/social-ops/accounts',
        liveLabel: 'Open Accounts',
      },
      {
        path: 'automation',
        label: 'Automation',
        status: 'awaiting-connection',
        summary: 'The autonomous loop + metrics sync workflows exist and are gated off by default.',
        exists: [
          '.github/workflows/autonomous-loop.yml (DRY_RUN default true)',
          '.github/workflows/social-metrics-sync.yml (gate job on unset SOCIAL_SYNC_ENABLED)',
        ],
        missing: ['Supervised activation; nothing schedules automatically today'],
      },
      {
        path: 'jobs',
        label: 'Jobs',
        status: 'read-only',
        summary: 'Sync runs are recorded and visible; there is no general job queue.',
        exists: ['sync_runs table + last-runs table on the social-ops overview'],
        missing: ['A general job/queue system (publishing_jobs is never written)'],
        liveHref: '/admin/social-ops',
        liveLabel: 'Recent runs (social-ops overview)',
      },
      {
        path: 'health',
        label: 'Health',
        status: 'partial',
        summary: 'Connection/token health exists; no public-site uptime, queue-depth or renderer health view.',
        exists: ['Accounts page connection health', 'social-ops-admin health data (env-var presence by name only)'],
        missing: ['Site uptime checks', 'Queue depth', 'Renderer health'],
        liveHref: '/admin/social-ops/accounts',
        liveLabel: 'Connection health',
      },
      {
        path: 'incidents',
        label: 'Incidents',
        status: 'partial',
        summary: 'Kill switches are real and documented read-only; there is no incident log.',
        exists: ['Layered switches (DRY_RUN, SOCIAL_SYNC_ENABLED, IG_PUBLISH_ENABLED, PUBLISH_SECRET)', 'Runbook: docs/social/INCIDENT_AND_KILL_SWITCH.md'],
        missing: ['Incident record table', 'In-console switch flipping (deliberately requires GitHub/Supabase access)'],
        liveHref: '/admin/social-ops/safety',
        liveLabel: 'Safety page',
      },
    ],
  },
  {
    title: 'Configure',
    modules: [
      {
        path: 'brand',
        label: 'Brand',
        status: 'read-only',
        summary: 'The approved brand system is code + repository assets; there is no brand editor.',
        exists: ['src/social/brand.ts constants', 'brand/ asset kit (logos, favicons, fonts, social profiles)'],
        missing: ['Any in-console editing (deliberate: brand changes go through review)'],
      },
      {
        path: 'editorial',
        label: 'Editorial',
        status: 'read-only',
        summary: 'The six editorial pillars have one authoritative definition consumed by site, engine and tests.',
        exists: ['src/social/pillars.ts — single source with legacy mapping', 'Parity test against the social-ops SQL constraint'],
        missing: ['In-console pillar editing (deliberate: pillar changes go through review)'],
      },
      {
        path: 'users',
        label: 'Users',
        status: 'partial',
        summary: 'Administrator access is invite-only via Supabase + tier RPC; there is no user-management UI.',
        exists: ['profiles/RBAC schema, my_effective_access_tier RPC, is_admin() RLS'],
        missing: ['Invite/manage UI (admins are provisioned directly in Supabase)'],
      },
      {
        path: 'audit',
        label: 'Audit',
        status: 'planned',
        summary: 'No audit table exists; per-run decision.json CI artifacts are the only decision records.',
        exists: ['decision.json written by every loop run (CI artifact)'],
        missing: ['Append-only audit table for admin actions and loop decisions'],
      },
      {
        path: 'settings',
        label: 'Settings',
        status: 'planned',
        summary: 'All configuration is in the repository and in GitHub/Supabase settings; no settings UI exists.',
        exists: ['Documented environment variables (docs/social/ENVIRONMENT_VARIABLES.md)'],
        missing: ['Any in-console settings surface'],
      },
    ],
  },
] as const

export const ADMIN_MODULES: readonly AdminModule[] = ADMIN_MODULE_GROUPS.flatMap((g) => [...g.modules])

export function adminModuleByPath(path: string | undefined): AdminModule | undefined {
  if (!path) return undefined
  return ADMIN_MODULES.find((m) => m.path === path)
}

export const ADMIN_STATUS_LABELS: Record<AdminModuleStatus, string> = {
  operational: 'Operational',
  'read-only': 'Read-only',
  partial: 'Partial',
  'awaiting-connection': 'Awaiting connection',
  planned: 'Planned',
}
