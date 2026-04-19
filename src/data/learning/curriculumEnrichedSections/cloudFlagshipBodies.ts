/**
 * Full-curriculum hand-authored reader depth: Cloud, DevOps, and Platform Operations (20 lessons).
 */
import type { PublicStarterLessonSection } from '../../publicStarterLibraries/aiFoundations'

export const ENRICHED_CLOUD_FLAGSHIP_SECTIONS_BY_SLUG: Record<string, PublicStarterLessonSection[]> = {
  'cloud-foundations-iaas-paas-and-saas': [
    {
      heading: 'Service models change what you control—and what you must still verify',
      paragraphs: [
        'IaaS exposes more infrastructure knobs (networks, VMs); PaaS trades flexibility for operational simplicity; SaaS pushes most operations to vendors but concentrates identity and integrations as your frontier.',
        '“Moving to SaaS” does not remove responsibilities: data classification, access governance, backups/exports, vendor risk, and exit plans still belong to you.',
      ],
    },
    {
      heading: 'Worked comparison',
      paragraphs: [
        'Same feature—email: SaaS means less patching pain but more OAuth/session risk and admin-role concentration. Name what your team still owns in configuration and monitoring.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Cloud is automatically scalable.” Scaling breaks on data bottlenecks, synchronous chains, and cost cliffs—design still matters.',
        '“We chose PaaS so security is solved.” Misconfiguration and overly broad credentials remain your problem.',
      ],
    },
    {
      heading: 'Decision drill',
      paragraphs: [
        'Pick one workload: justify IaaS vs PaaS vs SaaS using control needs, compliance, team skills, and operational budget.',
      ],
    },
  ],
  'cloud-foundations-compute-storage-and-networking-basics': [
    {
      heading: 'Primitives are interfaces to failure modes',
      paragraphs: [
        'Compute runs code; storage persists state; networking connects dependencies. Outages often cross boundaries: an app error is sometimes storage latency; “network issues” are sometimes DNS or auth.',
        'Learn the minimum diagrams for your services: users → edge → app → data → dependencies.',
      ],
    },
    {
      heading: 'Worked mental model',
      paragraphs: [
        'For a web API: identify region, VPC/VNet concepts at a high level, database location, and caching layers—where would you look first for elevated latency?',
      ],
    },
    {
      heading: 'Thin thinking',
      paragraphs: [
        'Treating storage as infinite and free—lifecycle rules matter for cost and compliance.',
      ],
    },
    {
      heading: 'Checkpoint',
      paragraphs: [
        'List three questions you would ask an infrastructure owner before blaming “the network.”',
      ],
    },
  ],
  'cloud-foundations-shared-responsibility': [
    {
      heading: 'Shared responsibility is a contract, not a slogan',
      paragraphs: [
        'Providers secure the cloud; customers secure what they put *in* it—configuration, identities, data policies, code vulnerabilities, and third-party integrations.',
        'Your org must know the split for each service class you use—otherwise gaps hide in “someone else’s job.”',
      ],
    },
    {
      heading: 'Worked table sketch',
      paragraphs: [
        'For object storage: provider secures durability of service; you secure bucket policies, encryption choices, logging, and access keys—misconfiguration breaches still happen constantly.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“We have a SOC 2 vendor so we are compliant.” Vendor attestations help; your usage must still match policy.',
      ],
    },
    {
      heading: 'Assessment',
      paragraphs: [
        'Identify one responsibility you assumed was “cloud provider” but is actually yours—what control proves it?',
      ],
    },
  ],
  'cloud-foundations-cloud-thinking-for-modern-work': [
    {
      heading: 'Cloud thinking is systems thinking + cost + safety',
      paragraphs: [
        'Treat environments as cattle: reproducible builds, immutable artifacts where possible, infrastructure as code habits—even if your org is not fully there yet.',
        'Understand blast radius: one broad IAM role can take down multiple services—narrow scopes and break-glass patterns matter.',
      ],
    },
    {
      heading: 'Worked habit',
      paragraphs: [
        'Before “quick fixes” in prod: document hypothesis, rollback plan, and who is on call—speed without safety creates incidents that last longer than the original problem.',
      ],
    },
    {
      heading: 'Anti-pattern',
      paragraphs: [
        'Snowflake servers that only one hero understands—document or replace.',
      ],
    },
    {
      heading: 'Reflection',
      paragraphs: [
        'What is one manual step your team repeats weekly that could become code or a checklist without adding bureaucracy?',
      ],
    },
  ],
  'devops-workflow-foundations-ci-cd-and-delivery-thinking': [
    {
      heading: 'CI/CD is risk management dressed as automation',
      paragraphs: [
        'Continuous integration integrates changes early with tests; continuous delivery/deployment releases safely with gates. The goal is smaller, reversible changes—not “deploy every minute” vanity.',
        'Quality signals must match risk: linting ≠ security guarantees; integration tests ≠ production realism unless environments represent reality.',
      ],
    },
    {
      heading: 'Worked pipeline questions',
      paragraphs: [
        'Ask: what proves this artifact is the one running? Build IDs, signed artifacts, immutable tags—avoid “latest” ambiguity.',
      ],
    },
    {
      heading: 'Missteps',
      paragraphs: [
        'Skipping rollback drills until you need them—practice restores define real readiness.',
      ],
    },
    {
      heading: 'Scenario',
      paragraphs: [
        'A pipeline passes but prod breaks—list four reasons unrelated to “tests passed.”',
      ],
    },
  ],
  'devops-workflow-foundations-environments-and-release-flow': [
    {
      heading: 'Environments reduce surprise only when parity is honest',
      paragraphs: [
        'Staging should resemble prod enough to catch integration failures—not identical, but credible for schemas, configs, identity, and traffic patterns.',
        'Promotion flow should prevent “hotfixes” that bypass gates—exceptions need explicit governance.',
      ],
    },
    {
      heading: 'Worked mapping',
      paragraphs: [
        'Define what “done” means for a release: feature flags, migrations, observability dashboards, communication, and rollback ownership.',
      ],
    },
    {
      heading: 'Thin patterns',
      paragraphs: [
        'Copying prod data to dev without scrubbing—privacy incident waiting to happen.',
      ],
    },
    {
      heading: 'Assessment',
      paragraphs: [
        'Draft a release checklist your team could actually follow in under 15 minutes.',
      ],
    },
  ],
  'devops-workflow-foundations-automation-and-configuration-basics': [
    {
      heading: 'Automation without visibility becomes mystery infrastructure',
      paragraphs: [
        'Prefer declarative configuration and stored definitions so changes are reviewable. Secrets belong in vaults—not repos.',
        'Automate repetitive toil; keep humans for judgment calls and incident leadership.',
      ],
    },
    {
      heading: 'Worked guardrail',
      paragraphs: [
        'Pull requests for infra changes with peer review—even small teams benefit from “two eyes” on destructive operations.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“We automated deploys so we do not need ops.” Automation shifts failure modes faster—monitoring and ownership become more important.',
      ],
    },
    {
      heading: 'Practice',
      paragraphs: [
        'Identify one manual config drift you tolerate—what incident would force you to fix it?',
      ],
    },
  ],
  'devops-workflow-foundations-why-devops-is-more-than-tools': [
    {
      heading: 'Culture and feedback loops beat toolchain religion',
      paragraphs: [
        'DevOps integrates dev and ops incentives: shared ownership, blameless postmortems, measurable reliability targets, and fast feedback from production to developers.',
        'Buying Jenkins/GitHub Actions/etc. without collaboration patterns yields fancy scripts around the same bottlenecks.',
      ],
    },
    {
      heading: 'Worked signal',
      paragraphs: [
        'Measure lead time, deployment frequency, change failure rate, MTTR—pick one and improve honestly rather than gaming metrics.',
      ],
    },
    {
      heading: 'Anti-pattern',
      paragraphs: [
        'Throwing tools at cultural mistrust—teams need shared definitions of “done” and “safe.”',
      ],
    },
    {
      heading: 'Reflection',
      paragraphs: [
        'Where does your org hide ops pain—tickets, heroics, or silence until outages?',
      ],
    },
  ],
  'platform-operations-containers-and-modern-deployment': [
    {
      heading: 'Containers package dependencies—not security miracles',
      paragraphs: [
        'Images must be scanned, minimally layered, sourced reliably, and updated. Orchestrators add networking and scheduling complexity—observe them.',
        'Understand limits/requests and failure modes: CPU throttling looks like app bugs.',
      ],
    },
    {
      heading: 'Worked checklist',
      paragraphs: [
        'Pin base images, rebuild on upstream patches, avoid root users where policy allows, and verify readiness/liveness probes reflect real dependencies.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Kubernetes means auto-healing forever.” Cascading failures and misconfigured probes still take systems down.',
      ],
    },
    {
      heading: 'Assessment',
      paragraphs: [
        'Describe how you would trace a failing pod to a misconfiguration vs application bug—what logs/events first?',
      ],
    },
  ],
  'platform-operations-reliability-and-scaling': [
    {
      heading: 'Reliability targets force honest architecture',
      paragraphs: [
        'Define SLOs users care about (latency, availability) and error budgets—then prioritize engineering accordingly.',
        'Scaling solves throughput until you hit data correctness, contention, or human coordination limits.',
      ],
    },
    {
      heading: 'Worked tradeoff',
      paragraphs: [
        'Strong consistency vs availability during partitions—know what your product truly needs vs what engineers prefer culturally.',
      ],
    },
    {
      heading: 'Thin narratives',
      paragraphs: [
        '“We added replicas” without fixing hotspots—scaling amplifies inefficiency.',
      ],
    },
    {
      heading: 'Scenario',
      paragraphs: [
        'Traffic doubles tomorrow—what breaks first in your architecture and what instrument would prove it?',
      ],
    },
  ],
  'platform-operations-release-safety': [
    {
      heading: 'Safe releases narrow blast radius',
      paragraphs: [
        'Patterns: blue/green, canaries, feature flags, gradual rollouts, database migration discipline (expand/contract). Pair releases with observability dashboards tied to business metrics—not only CPU.',
        'Rollback must be practiced; “forward-only hotfix” is sometimes correct but not automatic.',
      ],
    },
    {
      heading: 'Worked plan',
      paragraphs: [
        'Define rollback triggers before deploy: error rate thresholds, latency budgets, saturation signals.',
      ],
    },
    {
      heading: 'Missteps',
      paragraphs: [
        'Friday afternoon deploys without owners—classic organizational failure mode.',
      ],
    },
    {
      heading: 'Judgment task',
      paragraphs: [
        'Approve/revise/reject: “Always roll forward.” When is rollback ethically and operationally mandatory?',
      ],
    },
  ],
  'platform-operations-operational-visibility-basics': [
    {
      heading: 'Visibility answers questions—dashboards alone do not',
      paragraphs: [
        'Instrument golden signals where applicable: latency, traffic, errors, saturation. Correlate logs/traces/metrics around change events and deploy markers.',
        'Alerts should be actionable with owners—otherwise they are ambient anxiety.',
      ],
    },
    {
      heading: 'Worked incident habit',
      paragraphs: [
        'During incidents: freeze risky changes, capture timelines, preserve logs, communicate expected impact—measure progress by customer-visible recovery.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“More dashboards improves observability.” Without SLOs and workflows, more charts increase noise.',
      ],
    },
    {
      heading: 'Checkpoint',
      paragraphs: [
        'Pick one service: what are three signals that prove health vs three that indicate impending failure?',
      ],
    },
  ],
  'applied-platform-work-managing-services-in-real-environments': [
    {
      heading: 'Production is a socio-technical system',
      paragraphs: [
        'Operate with runbooks, ownership boundaries, escalation paths, and realistic maintenance windows. Configuration drift happens—detect it.',
        'Treat vendor outages as part of your dependency graph—monitor status pages honestly.',
      ],
    },
    {
      heading: 'Worked coordination pattern',
      paragraphs: [
        'Change advisory for risky windows: who approves, who communicates, what rollback looks like—small teams can keep this lightweight but explicit.',
      ],
    },
    {
      heading: 'Thin excuses',
      paragraphs: [
        '“We’ll fix hygiene after launch.” Debt compounds into incidents and turnover.',
      ],
    },
    {
      heading: 'Assessment',
      paragraphs: [
        'Write a one-page ownership map for three critical services—name primary/secondary on-call equivalents even if informal.',
      ],
    },
  ],
  'applied-platform-work-debugging-build-and-deploy-failures': [
    {
      heading: 'Treat failures as constraint puzzles',
      paragraphs: [
        'Collect artifact identifiers, environment names, git SHAs, dependency versions, and logs around the failing step. Random reruns waste time.',
        'Separate auth failures (permissions/tokens) from logic failures from infra quota failures—they look similar in summaries.',
      ],
    },
    {
      heading: 'Worked triage ladder',
      paragraphs: [
        'Reproduce locally or in CI with smallest input; bisect changes; verify secrets and configuration diff across environments.',
      ],
    },
    {
      heading: 'Anti-pattern',
      paragraphs: [
        'Restarting pipelines until green without understanding flake sources—flakes become outages later.',
      ],
    },
    {
      heading: 'Scenario',
      paragraphs: [
        'Your deploy fails only in prod—list five plausible divergence points (data, IAM, quotas, feature flags, network policies).',
      ],
    },
  ],
  'applied-platform-work-team-collaboration-in-platform-work': [
    {
      heading: 'Platform work is communication under uncertainty',
      paragraphs: [
        'Good collaboration uses shared language for severity, customer impact, active incidents, and decision rights. Written summaries beat verbal drift.',
        'Psychological safety speeds mitigation—blame slows fixes and hides facts.',
      ],
    },
    {
      heading: 'Worked communication template',
      paragraphs: [
        'Status update: impact · customer cohort · mitigations · unknowns · ETA policy (“we do not estimate until…”).',
      ],
    },
    {
      heading: 'Failure modes',
      paragraphs: [
        'Silent heroics and unclear handoffs—especially across time zones.',
      ],
    },
    {
      heading: 'Practice',
      paragraphs: [
        'Draft ground rules for your team’s incident channel: what belongs there vs tickets vs calls.',
      ],
    },
  ],
  'applied-platform-work-practical-platform-habits-that-reduce-risk': [
    {
      heading: 'Habits beat one-off audits',
      paragraphs: [
        'Examples: least privilege IAM, documented break-glass, regular restore tests, dependency updates with owners, and stopping “temporary” firewall rules.',
        'Small frequent improvements beat annual big-bang migrations.',
      ],
    },
    {
      heading: 'Worked habit stack',
      paragraphs: [
        'Weekly: review failed deploy causes; monthly: access review snapshot; quarterly: DR exercise slice.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Automation equals reliability.” Automated wrong actions fail faster—guardrails matter.',
      ],
    },
    {
      heading: 'Commitment prompt',
      paragraphs: [
        'Pick one habit you will enforce for 30 days—what measurable signal proves it stuck?',
      ],
    },
  ],
  'platform-growth-path-from-cloud-beginner-to-practical-operator': [
    {
      heading: 'Growth is evidenced competence, not badge accumulation',
      paragraphs: [
        'Beginners learn primitives and safety; practitioners ship reversible changes with observability; operators automate toil and coach others.',
        'Choose projects that force reading real failures—staged tutorials alone create false confidence.',
      ],
    },
    {
      heading: 'Worked roadmap',
      paragraphs: [
        'Quarter 1: runbooks + diagrams; Quarter 2: automate one painful deploy step; Quarter 3: lead an incident retrospective with improvements.',
      ],
    },
    {
      heading: 'Thin goals',
      paragraphs: [
        '“Learn Kubernetes” without workloads—abstract knowledge evaporates.',
      ],
    },
    {
      heading: 'Checkpoint',
      paragraphs: [
        'Define one observable skill you will demonstrate next month (e.g., restore DB from backup in staging).',
      ],
    },
  ],
  'platform-growth-path-platform-thinking-across-products': [
    {
      heading: 'Platform thinking connects services, teams, and lifecycle',
      paragraphs: [
        'Think dependency graphs and contracts: versioning, deprecation, compatibility, error budgets shared across teams.',
        'Reduce bespoke snowflakes—prefer shared patterns with documented exceptions.',
      ],
    },
    {
      heading: 'Worked integration review',
      paragraphs: [
        'Pick two interacting services: identify synchronous chains that amplify outages—where could async/buffering reduce coupling?',
      ],
    },
    {
      heading: 'Missteps',
      paragraphs: [
        'Optimizing locally per team while global incidents cascade—needs alignment on priorities.',
      ],
    },
    {
      heading: 'Assessment',
      paragraphs: [
        'Write a “contract card” between two teams: SLIs, ownership, escalation, and change windows.',
      ],
    },
  ],
  'platform-growth-path-connecting-cloud-devops-and-reliability': [
    {
      heading: 'Delivery speed without reliability becomes churn',
      paragraphs: [
        'DevOps accelerates flow; reliability engineering ensures changes do not erase customer trust. Pair velocity metrics with stability metrics intentionally.',
        'Incident learnings should feed backlog priority—not only new features.',
      ],
    },
    {
      heading: 'Worked synthesis',
      paragraphs: [
        'Choose one recurring incident theme and convert it into a prevented class of failures via design or automation—measure recurrence.',
      ],
    },
    {
      heading: 'Thin narratives',
      paragraphs: [
        '“Move fast and break things” without defined blast radius—unacceptable for regulated or payment surfaces.',
      ],
    },
    {
      heading: 'Reflection',
      paragraphs: [
        'Where does your organization reward shipping over maintaining—and what metric would rebalance incentives safely?',
      ],
    },
  ],
  'platform-growth-path-next-steps-into-deeper-platform-learning': [
    {
      heading: 'Deep learning stays grounded in constraints',
      paragraphs: [
        'Choose paths aligned to reality: networking depth if you operate edges; datastores if you own persistence; security if you touch IAM and compliance.',
        'Community practice (well-scoped labs, open-source contributions, reading postmortems) builds judgment faster than passive video consumption.',
      ],
    },
    {
      heading: '90-day deepening plan',
      paragraphs: [
        'Month 1: master observability for one service; Month 2: automate one risky manual path; Month 3: teach another teammate your runbook.',
      ],
    },
    {
      heading: 'Avoid vanity breadth',
      paragraphs: [
        'Covering every cloud certification keyword without operational scars produces brittle confidence.',
      ],
    },
    {
      heading: 'Next step commitment',
      paragraphs: [
        'Write the next concrete artifact you will produce (diagram, runbook, Terraform module, monitoring bundle)—completion defines progress.',
      ],
    },
  ],
}
