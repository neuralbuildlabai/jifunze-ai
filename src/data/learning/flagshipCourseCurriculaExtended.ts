/**
 * Deep curriculum blueprints for flagship courses 7–15 (beyond the original six in flagshipCourseCurricula.ts).
 * Authoring standard matches existing flagships: serious modules, staged depth, practical outputs.
 */

import type { FlagshipCourseCurriculum } from './flagshipCurriculumTypes'

export const FLAGSHIP_CURRICULA_EXTENDED: Record<string, FlagshipCourseCurriculum> = {
  'data-and-decisions': {
    slug: 'data-and-decisions',
    estimatedDurationLabel: 'Roughly 48–70 hours of study and practice',
    depthLabel:
      'Decision literacy with intellectual honesty: KPI trees you can defend, dashboards you read skeptically, reporting cadence that turns signals into decisions—BI judgment, not chart consumption.',
    reinforcementSignals: [
      'KPI design: definitions, hierarchies (north-star → drivers → diagnostics), leading vs. lagging, gaming risks named up front',
      'Dashboard critique: filters, cohorts, date ranges, and “what decision is this view for?” before conclusions',
      'Reporting cadence: audience-specific views (exec vs. operator) tied to intervention triggers',
      'Decision logs that separate measurements, interpretations, and bets—with metric snapshots reproducible later',
      'Scenario-based reads of performance summaries: tradeoffs explicit before resource moves',
      'Capstone brief ties KPI choices, visualization, and monitoring plan to one recurring decision',
    ],
    capstone: {
      title: 'Reviewable decision brief for a live recurring choice',
      description:
        'Choose one decision you genuinely face on a cadence (operations, revenue, hiring, learning, pricing—your context). Deliver a reviewer-readable BI-grade pack: crisp decision question; KPI hierarchy with definitions and gaming safeguards; dashboard/visual choices justified (filters, cohorts); evidence table for contested claims; scenario-based read of recent performance; tradeoff table; monitoring & reporting plan with cadence by audience and escalation rules; explicit assumptions + falsifiers; “what I still do not know.”',
      deliverables: [
        'Executive decision brief with falsifiable headline claim',
        'Evidence table mapping claims → sources → strength → gaps',
        'KPI / metric hierarchy sheet: primary, driver, diagnostic metrics; definitions; known gaming modes; thresholds',
        'Visualization & dashboard appendix: charts or views chosen, filters/cohorts documented, misleading alternatives rejected',
        'Monitoring & reporting plan: primary + guardrail signals, review cadence by audience, escalation when signals breach',
      ],
    },
    modules: [
      {
        id: 'dd-m01',
        order: 1,
        title: 'Data types, measurement, and honest skepticism',
        stage: 'foundations',
        summary:
          'Separate measurements from interpretations before BI tools seduce you—know what was counted, excluded, or renamed, and flag vanity metrics that reward activity over outcomes.',
        learningGoals: [
          'Classify descriptive vs. inferential claims in everyday metrics and KPI exports.',
          'Spot misleading axes, truncated scales, cherry-picked windows, and vanity dashboard tiles.',
          'Ask “what is missing from this dataset?” and “who would game this metric?” before acting.',
        ],
        practiceActivities: [
          'Annotate three real charts or KPI tiles: measured quantity, exclusions, wrong decision each could trigger.',
          'Rewrite one squishy KPI into an operational definition a teammate could audit.',
          'List three common vanity metrics in your domain and the healthier substitute signal for each.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Metric autopsy + vanity-metric substitution sheet'],
      },
      {
        id: 'dd-m02',
        order: 2,
        title: 'KPI selection, metric hierarchies, and performance questions',
        stage: 'foundations',
        summary:
          'Start from the performance question and decision, not the dashboard—derive a KPI tree (primary → drivers → diagnostics) where every node has a definition, owner, and falsifier.',
        learningGoals: [
          'Draft operational definitions so two teams cannot talk past each other using the same acronym.',
          'Separate leading indicators you influence from lagging outcomes; place each in the hierarchy.',
          'Name how a “good” KPI could be gamed and pair it with a guardrail metric or process check.',
        ],
        practiceActivities: [
          'For one strategic goal, sketch a three-level KPI tree with definitions + data source class (raw, modeled, survey).',
          'Pick one recurring decision; list three candidate metrics with gaming risks + mitigations.',
          'Peer critique a dashboard screenshot: name the implicit performance question and what is still ambiguous.',
        ],
        expectedOutputs: ['KPI tree + metric definitions sheet'],
      },
      {
        id: 'dd-m03',
        order: 3,
        title: 'Dashboards, visualization as argument—and misread risks',
        stage: 'foundations',
        summary:
          'Match visuals and dashboard panels to decisions: filters, cohorts, and time windows are part of the argument. Show variance and uncertainty ethically—executive packs and self-serve BI both fail when definitions drift.',
        learningGoals: [
          'Read a multi-metric dashboard and state the decision it supports (and decisions it cannot support).',
          'Select chart types aligned to analytical questions; know when tables beat charts.',
          'Communicate variance, sample size, and confidence plainly; pair each tile with caveats stakeholders can hear.',
        ],
        practiceActivities: [
          'Critique a real or sample business dashboard: list filters applied, cohort definition, and three ways a busy reader could misinterpret it.',
          'Redesign one misleading executive chart; document three intentional design choices + one guardrail annotation.',
          'Write a five-line caption for a KPI tile stating numerator, denominator, exclusions, and what would change your mind.',
        ],
        recap: true,
        expectedOutputs: ['Dashboard critique worksheet + honest viz + caption'],
      },
      {
        id: 'dd-m04',
        order: 4,
        title: 'Baselines, comparisons, and segments',
        stage: 'applied_practice',
        summary:
          'Compare fairly—seasonality, cohort discipline, ethics of segmentation when people are involved.',
        learningGoals: [
          'Define baselines that match the decision horizon.',
          'Segment only when sample size and ethics allow.',
          'Flag Simpson-style and mix-effect traps before recommending cuts.',
        ],
        practiceActivities: [
          'Segment drill with ethical guardrails written first.',
          'Write comparison rules for a KPI you actually track.',
        ],
        expectedOutputs: ['Comparison protocol note'],
      },
      {
        id: 'dd-m05',
        order: 5,
        title: 'Correlation, causation, and intervention humility',
        stage: 'applied_practice',
        summary:
          'Know when association lets you experiment—and when it only lets you stay curious.',
        learningGoals: [
          'Separate correlation from plausible causal pathways.',
          'Design affordable tests before funding big interventions.',
          'Keep an explicit unknowns log alongside conclusions.',
        ],
        practiceActivities: [
          'Counterfactual sketch for one policy or product change.',
          'Pre-mortem: three ways the headline conclusion could be wrong.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Causal humility memo'],
      },
      {
        id: 'dd-m06',
        order: 6,
        title: 'Trends, noise, and regime changes',
        stage: 'applied_practice',
        summary:
          'Detect drift vs. noise in KPI strips and rollups; decide when to escalate vs. wait—without narrative overfitting or panic on every dip.',
        learningGoals: [
          'Apply smoothing without hiding spikes that matter for the next resource decision.',
          'Set escalation thresholds tied to operational levers, not emotion.',
          'Hold off story-time until signals clear pre-defined “worth a meeting” rules.',
        ],
        practiceActivities: [
          'Annotate a volatile KPI series (or screenshot) with if/then rules: noise vs. investigate vs. escalate.',
          'Draft “when to revisit” clause for a metric you own and link it to a reporting touchpoint.',
          'Scenario drill: given a monthly performance summary with two contradictory KPIs, write the question you need answered before reallocating.',
        ],
        expectedOutputs: ['Trend response playbook + threshold rules'],
      },
      {
        id: 'dd-m07',
        order: 7,
        title: 'Reporting cadence, dashboards-in-context, and decision logs',
        stage: 'professional_execution',
        summary:
          'Design reporting rhythms (daily/weekly/monthly) so dashboards feed decisions—same KPI set can mislead different audiences without narrative discipline. Capture decisions so future-you can replay rationale, alternatives, and metric snapshots.',
        learningGoals: [
          'Tailor KPI views and commentary depth to executive vs. operator audiences without hiding material caveats.',
          'Log decision, alternatives, rejected paths, and rationale alongside the KPI window and definitions used.',
          'Link to reproducible metric snapshots (filters, cohorts, export date) without leaking sensitive raw rows.',
          'Schedule revisits when assumptions or definitions—not just numbers—shift.',
        ],
        practiceActivities: [
          'Draft a one-page reporting cadence: what is reviewed when, by whom, and what triggers an ad-hoc drill-in.',
          'Take one dashboard KPI; write the two-sentence exec summary vs. five-bullet operator appendix for the same week.',
          'Backfill one messy past decision with a decision log entry that names the metric snapshot you should have preserved.',
        ],
        expectedOutputs: ['Reporting cadence brief + dashboard-to-decision log template'],
      },
      {
        id: 'dd-m08',
        order: 8,
        title: 'Stakeholder narratives: from KPI pack to decision-ready story',
        stage: 'professional_execution',
        summary:
          'Turn dashboard exports and KPI commentary into narratives executives can act on—executive clarity, explicit risks, recommended next decision, no hidden footnotes.',
        learningGoals: [
          'Chain KPI movement → plausible drivers → proposed intervention → needed follow-up read.',
          'Write exec summaries that answer “so what?” “now what?” and “what would change my mind?”',
          'Balance optimism with named downside scenarios tied to metric definitions.',
        ],
        practiceActivities: [
          'Given a short performance summary (real or drafted), produce a one-page narrative: headline, KPI moves, interpretation limits, recommended decision.',
          'Peer omission hunt: hunt for cherry-picked windows, silent cohort changes, and metric-definition drift.',
        ],
        expectedOutputs: ['Stakeholder KPI narrative one-pager'],
      },
      {
        id: 'dd-m09',
        order: 9,
        title: 'Thin data, priors, and escalation',
        stage: 'mastery_outputs',
        summary:
          'Operate with transparent priors when dashboards go flat or contradictory—buy-information thresholds, deeper slices vs. false precision, early escalation when stakes outrun proof.',
        learningGoals: [
          'State priors and how new evidence (including fresh KPI cuts) should update them.',
          'Define when to drill deeper in BI vs. decide under uncertainty vs. stop the metric theater.',
          'Escalate early when harm potential exceeds evidence quality—even when charts look fine.',
        ],
        practiceActivities: [
          'Complete thin-data worksheet for a live ambiguous call tied to a KPI you own.',
          'Draft escalation memo with options + unknowns + the smallest extra dataset that would reduce variance.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Thin-data decision packet'],
      },
      {
        id: 'dd-m10',
        order: 10,
        title: 'Reusable frameworks for recurring decisions',
        stage: 'mastery_outputs',
        summary:
          'Codify recurring contexts into living playbooks—triggers, KPI set, reporting review ritual, owners, kill criteria—not dashboard wallpaper that nobody opens.',
        learningGoals: [
          'Extract patterns without overfitting past luck; tie each playbook step to observable KPI movement.',
          'Version frameworks when markets, tooling, or metric definitions shift.',
          'Teach others to run the monthly/quarterly BI review without you.',
        ],
        practiceActivities: [
          'Package framework v1 with triggers, inputs, KPI sheet references, outputs, kill criteria.',
          'Dry-run with skeptical colleague: they role-play exec reading only your one-page KPI summary—log gaps.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Decision framework draft + KPI review checklist'],
      },
    ],
  },

  'web-and-software-foundations': {
    slug: 'web-and-software-foundations',
    estimatedDurationLabel: 'Roughly 42–62 hours of study and practice',
    depthLabel:
      'Systems literacy for non-engineers who must lead: explain flows, read contracts (APIs), spot risk, and brief technical partners without posture.',
    reinforcementSignals: [
      'End-to-end request narratives you can whiteboard soberly',
      'API and schema reading with acceptance checks, not buzzwords',
      'Security and reliability footguns surfaced as review questions',
      'Vendor and lock-in risks written in language leadership understands',
      'Capstone brief a builder could execute from without mind-reading',
    ],
    capstone: {
      title: 'Collaboration brief: product surface → systems map → risks',
      description:
        'Pick one real surface you depend on (internal tool, vendor app, customer flow). Produce a stakeholder-grade brief: user journey → client/server split → auth/data paths → integration points, with explicit assumptions, test/monitoring ideas, security questions, and vendor/exit notes. The goal is less “I read a blog about APIs” and more “here is what we must verify before we bet.”',
      deliverables: [
        'End-to-end flow narrative (actors, requests, persistence, failure points)',
        'Architecture sketch + integration assumptions + acceptance checks',
        'API consumption outline (scopes, versioning risks, pagination/auth caveats)',
        'Risk register: reliability, security, vendor lock-in—ranked by blast radius',
      ],
    },
    modules: [
      {
        id: 'wf-m01',
        order: 1,
        title: 'How the web moves: requests, responses, browsers',
        stage: 'foundations',
        summary:
          'Trace a user action to bytes in flight—DNS, TLS, HTTP—so debugging and vendor conversations start from shared reality.',
        learningGoals: [
          'Explain DNS, TLS, and HTTP at a level sufficient for tradeoff discussions.',
          'Differentiate clients, servers, CDNs, and where latency hides.',
          'Name user-visible failure modes (TLS errors, stale assets, blocked requests).',
        ],
        practiceActivities: [
          'Trace one login or checkout flow with browser devtools; annotate each hop.',
          'Record a two-minute ELI12 voice memo for a non-technical stakeholder.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Request trace notes'],
      },
      {
        id: 'wf-m02',
        order: 2,
        title: 'Apps, hosting, environments, and releases',
        stage: 'foundations',
        summary:
          'See where code runs across environments—why deploys, rollbacks, and config drift matter for reliability.',
        learningGoals: [
          'Map dev / stage / prod and what “promotion” means for risk.',
          'Explain containers vs. VMs metaphorically without pretending expertise.',
          'Ask vendors/builders questions that expose rollback and observability.',
        ],
        practiceActivities: [
          'Interview a builder (or research a stack you use); draw deploy path end-to-end.',
          'Write ten vendor questions spanning uptime, backups, egress, access logs.',
        ],
        expectedOutputs: ['Deploy path sketch'],
      },
      {
        id: 'wf-m03',
        order: 3,
        title: 'Data shapes on the wire: JSON, schemas, validation',
        stage: 'foundations',
        summary:
          'Treat payloads as contracts—schemas prevent silent breakage when teams iterate quickly.',
        learningGoals: [
          'Read JSON documents and spot risky null/missing ambiguity.',
          'Understand schema evolution: breaking vs. compatible changes.',
          'Draft acceptance checks QA could run against an API field.',
        ],
        practiceActivities: [
          'Compare two documented API versions; list behavioral risks per change.',
          'Draft validation rules for three critical fields in a payload you rely on.',
        ],
        recap: true,
        expectedOutputs: ['Schema risk memo'],
      },
      {
        id: 'wf-m04',
        order: 4,
        title: 'REST-ish APIs: resources, auth, scopes',
        stage: 'applied_practice',
        summary:
          'Consume APIs with least privilege—tokens, scopes, rotation, and logging that does not leak secrets.',
        learningGoals: [
          'Sketch OAuth-style flows at a whiteboard level.',
          'Explain why scopes matter for blast radius.',
          'Design logging/monitoring hooks without capturing credentials.',
        ],
        practiceActivities: [
          'Walk an OpenAPI summary; note auth, scopes, pagination, rate limits.',
          'Write a leaked-token tabletop: detection, rotation, customer impact.',
        ],
        expectedOutputs: ['API consumption checklist'],
      },
      {
        id: 'wf-m05',
        order: 5,
        title: 'Databases and consistency intuition',
        stage: 'applied_practice',
        summary:
          'Respect data stores as constraints—migrations as contracts, duplication vs. normalization as conscious tradeoffs.',
        learningGoals: [
          'Contrast OLTP vs. analytic query patterns in plain language.',
          'Understand migrations as shared contracts across services.',
          'Ask schema questions that prevent silent data corruption.',
        ],
        practiceActivities: [
          'Before/after: write five questions you would ask before approving a schema change.',
          'Sketch entity-relationship diagram for an app you use daily.',
        ],
        expectedOutputs: ['Schema question list'],
      },
      {
        id: 'wf-m06',
        order: 6,
        title: 'Performance, caching, and perceived speed',
        stage: 'applied_practice',
        summary:
          'Separate perceived slowness from root causes—measure before optimizing; watch caching hazards.',
        learningGoals: [
          'Hypothesize compute vs. IO bottlenecks with falsifiable signals.',
          'List caching failure modes (stale data, thundering herd).',
          'Define user-visible success metrics for a slow experience.',
        ],
        practiceActivities: [
          'Pick a slow screen you use; hypothesize bottleneck + measurement to validate.',
          'Draft a one-page experiment plan before proposing fixes.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Performance hypothesis note'],
      },
      {
        id: 'wf-m07',
        order: 7,
        title: 'Security literacy for collaborators',
        stage: 'professional_execution',
        summary:
          'Ask engineering-grade security questions without pretending to be a pentester—prioritize blast radius.',
        learningGoals: [
          'Prioritize vulnerabilities by exploitability × impact.',
          'Recognize common classes (XSS, injection, auth misconfig) well enough to escalate.',
          'Push for secure defaults in specs you influence.',
        ],
        practiceActivities: [
          'Red-team a feature spec: blind spots + questions for engineering.',
          'Draft a non-technical risk summary leadership can act on.',
        ],
        expectedOutputs: ['Collaborator security review'],
      },
      {
        id: 'wf-m08',
        order: 8,
        title: 'Reliability: outages, retries, idempotency',
        stage: 'professional_execution',
        summary:
          'Discuss retries, double-submit, and customer comms credibly—enough to partner in incidents.',
        learningGoals: [
          'Explain why retries need idempotency for payments and writes.',
          'Use starter SLO language (availability/latency) appropriately.',
          'Draft customer comms that admit uncertainty without chaos.',
        ],
        practiceActivities: [
          'Write incident customer email for a fictional outage with known unknowns.',
          'Walk a retry/idempotency scenario and list what breaks without safeguards.',
        ],
        expectedOutputs: ['Reliability question list for vendors'],
      },
      {
        id: 'wf-m09',
        order: 9,
        title: 'Vendor evaluation without buzzword bingo',
        stage: 'mastery_outputs',
        summary:
          'Evaluate vendors with exit criteria, data portability, and proof milestones—not slide aesthetics.',
        learningGoals: [
          'Extract contractual and operational risks from vendor decks.',
          'Define proof milestones before expanding spend.',
          'Name lock-in scenarios honestly.',
        ],
        practiceActivities: [
          'Score two real or hypothetical vendors on a rubric you design.',
          'Write kill criteria that would stop the deal.',
        ],
        expectedOutputs: ['Vendor scorecard + kill criteria'],
      },
      {
        id: 'wf-m10',
        order: 10,
        title: 'Capstone rehearsal: diagram, narrative, review',
        stage: 'mastery_outputs',
        summary:
          'Merge narrative, diagrams, risks, and vendor notes into a collaboration brief engineers could schedule work from.',
        learningGoals: [
          'Align diagram and prose so both tell one story.',
          'Invite critique on ambiguity + risk.',
          'Iterate once with tracked changes.',
        ],
        practiceActivities: [
          'Dry-run walkthrough with a skeptical peer; log confusion points.',
          'Revise diagram until flows are obvious without verbal narration.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Collaboration brief v1'],
      },
    ],
  },

  'digital-safety': {
    slug: 'digital-safety',
    estimatedDurationLabel: 'Roughly 38–55 hours of study and practice',
    depthLabel:
      'Operational security judgment for small teams: proportionate controls, habits people keep, calm incident mechanics—no fear UX, no checklist theater.',
    reinforcementSignals: [
      'Drills that surface judgment—slow verification beats heroic clicks',
      'Identity, recovery, and MFA framed as reliability—not moralizing',
      'Access hygiene tied to roles and departures people actually perform',
      'Vendor questions that fit startups, NGOs, schools—not enterprise cosplay',
      'Capstone pack sized for adoption: short, revisable, humane',
    ],
    capstone: {
      title: 'Digital safety improvement plan (team-adoptable)',
      description:
        'Ship a calm, proportionate bundle for a defined context (household, classroom, studio, small org): assets/adversaries framed without hype, MFA + backup posture with recovery drills, least-privilege access principles, SaaS/vendor review lite, onboarding/offboarding security moments, and incident triage scripts that reduce panic. Written so a non-specialist manager could adopt it.',
      deliverables: [
        'Threat framing one-pager with prioritized risks and explicit non-goals',
        'Hygiene checklist + onboarding/offboarding addendum tied to roles',
        'Vendor/access review worksheet with kill criteria',
        'Incident triage script + internal comms templates + escalation ladder',
      ],
    },
    modules: [
      {
        id: 'ds-m01',
        order: 1,
        title: 'Assets, adversaries, and proportionate defense',
        stage: 'foundations',
        summary:
          'Prioritize defenses by harm—inventory what matters, who realistically threatens it, and what “good enough” costs.',
        learningGoals: [
          'Inventory digital assets tied to livelihood, legal duty, or reputation.',
          'Name plausible adversaries (crime, insiders, negligence) without movie plots.',
          'Reject checkbox theater—tie controls to assets and appetite for loss.',
        ],
        practiceActivities: [
          'Build asset/risk matrix with impact × likelihood verbal scores.',
          'Rewrite one alarmist security tip into proportional controls + explicit non-goals.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Threat framing draft'],
      },
      {
        id: 'ds-m02',
        order: 2,
        title: 'Identity starts with MFA and recovery',
        stage: 'foundations',
        summary:
          'Credential hygiene your future self keeps—MFA choices, backup codes, recovery flows that survive stress.',
        learningGoals: [
          'Choose MFA factors appropriate to stakes and usability.',
          'Protect recovery pathways from social engineering.',
          'Recognize credential stuffing and reuse patterns.',
        ],
        practiceActivities: [
          'Audit MFA on five critical accounts; document gaps + fix dates.',
          'Draft recovery snippet for household or tiny team handbook.',
        ],
        expectedOutputs: ['MFA + recovery audit'],
      },
      {
        id: 'ds-m03',
        order: 3,
        title: 'Phishing judgment and verification habits',
        stage: 'foundations',
        summary:
          'Slow down without freezing—patterns over panic, shame-free reporting, escalation paths.',
        learningGoals: [
          'Identify high-signal phishing cues beyond obvious typos.',
          'Use out-of-band verification for money and access requests.',
          'Report incidents through proper channels quickly.',
        ],
        practiceActivities: [
          'Annotate three sanitized phishing samples: cues, intent, safe response.',
          'Write verification script for finance/wire requests your org could follow.',
        ],
        recap: true,
        expectedOutputs: ['Verification playbook snippet'],
      },
      {
        id: 'ds-m04',
        order: 4,
        title: 'Password managers, secrets, and sharing boundaries',
        stage: 'applied_practice',
        summary:
          'Operationalize secrets for humans—managers, rotation discipline, safe collaboration without screenshot culture.',
        learningGoals: [
          'Separate secrets from configuration values in discussion.',
          'Reduce shoulder-surfing and clipboard leaks.',
          'Rotate credentials when people or tools change.',
        ],
        practiceActivities: [
          'Secrets audit: where keys/passwords live vs. where they should.',
          'Draft safe-sharing playbook for contractors + partners.',
        ],
        expectedOutputs: ['Secrets hygiene memo'],
      },
      {
        id: 'ds-m05',
        order: 5,
        title: 'Devices, updates, and backups that survive reality',
        stage: 'applied_practice',
        summary:
          'Treat availability as security—patch discipline, backups you restore-test, travel hygiene.',
        learningGoals: [
          'Prioritize patches by exposed surface and exploit likelihood.',
          'Design backup strategy with restore drill, not purchase regret.',
          'Apply realistic travel/device habits for your risk profile.',
        ],
        practiceActivities: [
          'Outline restore drill for primary devices + cloud data.',
          'Draft lightweight update policy individuals can keep.',
        ],
        expectedOutputs: ['Backup sanity checklist'],
      },
      {
        id: 'ds-m06',
        order: 6,
        title: 'Data handling: classification and least privilege',
        stage: 'applied_practice',
        summary:
          'Stop accidental oversharing—simple tiers, link audits, culture of least privilege in SaaS sprawl.',
        learningGoals: [
          'Define 2–3 classification tiers your team will actually use.',
          'Audit sharing links and group memberships quarterly mindset.',
          'Embed least privilege socially—not only technically.',
        ],
        practiceActivities: [
          'Complete access review worksheet with owners per asset.',
          'Draft third-party sharing rules for contractors and vendors.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Classification + sharing rules'],
      },
      {
        id: 'ds-m07',
        order: 7,
        title: 'Vendor and SaaS governance without bureaucracy',
        stage: 'professional_execution',
        summary:
          'Third-party risk sized for startups/schools—SOC questions that matter, data residency, sunset unused tools.',
        learningGoals: [
          'Interpret SOC/ISO summaries at “ask smarter questions” depth.',
          'Define data residency and subprocessors questions before signing.',
          'Write kill criteria for vendors that drift on security promises.',
        ],
        practiceActivities: [
          'Vendor questionnaire lite tailored to your org size.',
          'Sunset plan for zombie SaaS seats + orphaned data.',
        ],
        expectedOutputs: ['Vendor governance sheet'],
      },
      {
        id: 'ds-m08',
        order: 8,
        title: 'Incidents: triage, containment, communication',
        stage: 'professional_execution',
        summary:
          'Calm mechanics—triage scripts, preserve evidence, communicate without leaking investigations.',
        learningGoals: [
          'Follow triage checklist under time pressure.',
          'Stakeholder updates that protect facts and morale.',
          'Preserve logs/evidence responsibly for later review.',
        ],
        practiceActivities: [
          'Draft incident comms templates for leak vs. ransomware vs. credential loss.',
          'Tabletop scenario with timeline + owners.',
        ],
        expectedOutputs: ['Incident triage one-pager'],
      },
      {
        id: 'ds-m09',
        order: 9,
        title: 'Team rituals: onboarding, offboarding, audits',
        stage: 'mastery_outputs',
        summary:
          'Bake hygiene into rituals—joiners get least privilege, leavers lose access predictably, audits stay lightweight.',
        learningGoals: [
          'Design onboarding moments that teach security without lecture.',
          'Produce offboarding checklist HR can run without chasing engineers.',
          'Quarterly access review cadence that teams tolerate.',
        ],
        practiceActivities: [
          'Rewrite onboarding checklist with owners + timelines.',
          'Simulate offboarding for a persona; note gaps.',
        ],
        expectedOutputs: ['On/offboarding security addendum'],
      },
      {
        id: 'ds-m10',
        order: 10,
        title: 'Safety pack assembly and reinforcement cadence',
        stage: 'mastery_outputs',
        summary:
          'Integrate framing, hygiene, vendor, incident artifacts into an adoptable pack with revisit rhythm.',
        learningGoals: [
          'Merge modules without duplication or jargon walls.',
          'Define quarterly revisit triggers tied to risk changes.',
          'Measure adoption honestly (completion + friction notes).',
        ],
        practiceActivities: [
          'Facilitate 20-minute review with teammates; capture objections.',
          'Iterate pack based on feedback + cut fluff ruthlessly.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Safety pack v1'],
      },
    ],
  },
}
