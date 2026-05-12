import type { TeachingLibraryId } from '../teaching/teachingTypes'
import type { LibraryCurriculumQuality } from './curriculumQualityTypes'

const SHARED_SCENARIO_BRIDGES = [
  'Standalone course readers embed practice checkpoints + misconception framing',
  'Workspace maps mirror public browse routes for continuity',
]

function stages(lib: TeachingLibraryId, base: Omit<LibraryCurriculumQuality, 'libraryId'>): LibraryCurriculumQuality {
  return { libraryId: lib, ...base }
}

/** Compact depth maps for standalone course products — assistive scaffolding only (no mastery guarantees). */
export const STANDALONE_COURSE_QUALITY_LAYERS: Pick<
  Record<TeachingLibraryId, LibraryCurriculumQuality>,
  'course_prompt_engineering_models' | 'course_gemini_workspace' | 'course_claude_writing' | 'course_agentic_ai_real_work'
> = {
  course_prompt_engineering_models: stages('course_prompt_engineering_models', {
    headline: 'Prompt Engineering Across ChatGPT, Claude, and Gemini — specs, debugging, and workflow discipline',
    targetCapability:
      ' write contracts (not vibes), compare behaviors responsibly, debug prompts systematically, and chain workflows with checkpoints.',
    freeToPaidSkillShape: {
      publicStarter:
        'Public preview modules teach prompt atoms, structured inputs, and evaluation framing—rubrics before brand debates.',
      signedInContinuity:
        'Signed-in modules deepen context design, rubrics, debugging loops, and routing heuristics—still assistive instruction.',
      deeperMaterials:
        'Premium-depth modules emphasize workflow prompting, governance-minded iteration, and comparative evaluation habits—more scenarios, not certification.',
    },
    competencyStages: [
      {
        id: 'entry',
        label: 'Prompt specs',
        summary: 'Intent, constraints, outputs, exclusions—explicit.',
        prerequisites: [],
        youShouldNowBeAbleTo: ['Draft a prompt contract for a recurring deliverable'],
        goodUnderstandingLooksLike: ['Outputs stabilize across retries'],
        commonFailureModes: ['Blaming model before fixing constraints'],
      },
      {
        id: 'intermediate',
        label: 'Debugging + versioning',
        summary: 'Reduce variables; keep golden tests; retire bad prompts.',
        prerequisites: ['entry'],
        youShouldNowBeAbleTo: ['Isolate failure modes into spec vs evidence issues'],
        goodUnderstandingLooksLike: ['You keep a changelog for prompt edits'],
        commonFailureModes: ['Kitchen-sink prompts'],
      },
      {
        id: 'capstone',
        label: 'Workflow prompt library starter',
        summary: 'Multi-step prompts with checkpoints and escalation paths.',
        prerequisites: ['intermediate'],
        youShouldNowBeAbleTo: ['Design guardrails that survive real handoffs'],
        goodUnderstandingLooksLike: ['Humans remain accountable at explicit gates'],
        commonFailureModes: ['Automation theater'],
      },
    ],
    scenarioAssessment: {
      summary:
        'Contrastive evaluations, routing tables, rewrite drills, regression prompts, migration checklists—measurement-first comparisons.',
      formats: ['Side-by-side critique', 'Golden prompt tests', 'Publish gate rubrics'],
      anchors: ['Model comparison framing', 'Workflow prompting', 'Governance realities'],
      bridges: [...SHARED_SCENARIO_BRIDGES, 'Learner help tied to lesson slugs'],
    },
    capstone: {
      title: 'Mini Prompt Library + Evaluation Harness Sketch',
      description:
        'A small library of versioned prompts with rubrics, golden tasks, and explicit retirement criteria—built for teams, not vibes.',
      portfolioArtifacts: ['3 versioned prompts', 'Rubric sheet', 'Golden tasks'],
      accessShaping:
        'Preview establishes discipline; deeper modules expand complexity—pricing/packaging can map without promising benchmark dominance.',
    },
    humanSkillsThreads: ['Systems thinking', 'Debugging discipline', 'Honest comparisons'],
    ethicsDataLiteracyThreads: ['Privacy in cross-tool workflows', 'Avoiding authoritative hallucinations'],
    freshness: {
      risingTopics: ['Evaluation tooling', 'Enterprise routing', 'Structured outputs'],
      toolAndPlatformClusters: ['Major chat assistants', 'IDE/agent workflows'],
      updatePrinciples:
        'Update comparative examples cautiously—anchor learners to measurement and policy, not brand loyalty.',
    },
  }),

  course_gemini_workspace: stages('course_gemini_workspace', {
    headline: 'Gemini for Productivity and Google Workspace — drafting discipline inside real collaboration constraints',
    targetCapability:
      ' draft with explicit review gates, summarize threads responsibly, structure spreadsheet thinking, and align with organizational controls.',
    freeToPaidSkillShape: {
      publicStarter:
        'Public preview modules teach Gemini basics, review discipline, and Workspace-realistic caution—assistive framing only.',
      signedInContinuity:
        'Signed-in modules deepen Docs/Gmail/Sheets/meeting artifact patterns with verification habits.',
      deeperMaterials:
        'Premium-depth modules emphasize sensitive workflows, audit mindset, and sustainable productivity habits—expanded scenarios, not guarantees.',
    },
    competencyStages: [
      {
        id: 'entry',
        label: 'Draft vs decision',
        summary: 'Separate generation from authorization; treat AI text as provisional.',
        prerequisites: [],
        youShouldNowBeAbleTo: ['Apply a publish gate before external sends'],
        goodUnderstandingLooksLike: ['You verify numbers, owners, obligations'],
        commonFailureModes: ['Pretty formatting masking errors'],
      },
      {
        id: 'intermediate',
        label: 'Thread + table discipline',
        summary: 'Summaries label inference; sheets get sanity checks.',
        prerequisites: ['entry'],
        youShouldNowBeAbleTo: ['Write “confirmed vs inferred” summaries', 'Run basic sanity checks'],
        goodUnderstandingLooksLike: ['You resist invented action items'],
        commonFailureModes: ['Spreadsheet credulity'],
      },
      {
        id: 'capstone',
        label: 'Responsible Workspace workflow packet',
        summary: 'A lightweight template set: email, memo, notes, follow-up—each with verification + sensitivity notes.',
        prerequisites: ['intermediate'],
        youShouldNowBeAbleTo: ['Produce shareable artifacts with explicit unknowns'],
        goodUnderstandingLooksLike: ['Sensitivity classes are respected'],
        commonFailureModes: ['Leaking confidential context into examples'],
      },
    ],
    scenarioAssessment: {
      summary: 'Draft review scenarios, summary integrity drills, spreadsheet sanity checks, follow-up clarity tests—risk-tiered.',
      formats: ['Rewrite for honesty', 'Thread summary with evidence labeling', 'Checklist gates'],
      anchors: ['Docs collaboration', 'Gmail discipline', 'Sheets operational thinking'],
      bridges: [...SHARED_SCENARIO_BRIDGES, 'Learner help tied to lesson slugs'],
    },
    capstone: {
      title: 'Workspace Communication Pack + Review Gates',
      description:
        'A compact set of templates and review gates for Docs/Gmail/Sheets/meeting artifacts with explicit uncertainty labels.',
      portfolioArtifacts: ['Template trio', 'Review gate', 'Sensitivity notes'],
      accessShaping:
        'Future purchase/bundles can map cleanly—still instructional access, not professional certification or guaranteed productivity.',
    },
    humanSkillsThreads: ['Collaboration clarity', 'Operational skepticism', 'Meeting follow-through'],
    ethicsDataLiteracyThreads: ['Data sensitivity in Workspace', 'Anti-inference habits in summaries'],
    freshness: {
      risingTopics: ['Workspace admin policies', 'Cross-app assistance patterns', 'Audit expectations'],
      toolAndPlatformClusters: ['Google Workspace', 'Browser assistance surfaces'],
      updatePrinciples:
        'Update product naming/examples as UIs evolve; keep policy alignment and verification habits constant.',
    },
  }),

  course_claude_writing: stages('course_claude_writing', {
    headline:
      'Claude for Writing, Research, and Deep Thinking — drafting discipline, synthesis caution, and collaboration-ready artifacts',
    targetCapability:
      ' draft with explicit review gates, separate synthesis from verification, run critique loops responsibly, and collaborate without losing accountability.',
    freeToPaidSkillShape: {
      publicStarter:
        'Public preview modules establish Claude-oriented mental models plus early writing/research habits with full structured readers.',
      signedInContinuity:
        'Signed-in modules deepen revision systems, stakeholder communication, and research-note discipline—assistive instruction only.',
      deeperMaterials:
        'Premium-depth modules emphasize sensitive workflows and sustained practice patterns—expanded scenarios, not guarantees.',
    },
    competencyStages: [
      {
        id: 'entry',
        label: 'Draft vs verify',
        summary: 'Treat drafting assistance as provisional until reviewed—especially facts and obligations.',
        prerequisites: [],
        youShouldNowBeAbleTo: ['Label claims vs assumptions in a draft', 'Pick verification depth by stakes'],
        goodUnderstandingLooksLike: ['You pause before exporting'],
        commonFailureModes: ['Polish masking uncertainty'],
      },
      {
        id: 'intermediate',
        label: 'Research synthesis hygiene',
        summary: 'Organize questions and notes without pretending citations exist.',
        prerequisites: ['entry'],
        youShouldNowBeAbleTo: ['Design note formats that preserve provenance intent'],
        goodUnderstandingLooksLike: ['You separate internal notes from external claims'],
        commonFailureModes: ['Summaries that sound sourced'],
      },
      {
        id: 'capstone',
        label: 'Collaboration packet',
        summary: 'Produce handoff-ready artifacts with owners, unknowns, and review gates.',
        prerequisites: ['intermediate'],
        youShouldNowBeAbleTo: ['Ship peer-reviewable packets with explicit risk classes'],
        goodUnderstandingLooksLike: ['Ownership and escalation paths are explicit'],
        commonFailureModes: ['Beautiful docs with unclear authority'],
      },
    ],
    scenarioAssessment: {
      summary:
        'Revision drills, stakeholder updates, synthesis-with-citations discipline (intent), review comments, escalation templates—risk-tiered.',
      formats: ['Rewrite for honesty', 'Research note template', 'Review checklist', 'Handoff packet'],
      anchors: ['Writing workflows', 'Research discipline', 'Collaboration'],
      bridges: [...SHARED_SCENARIO_BRIDGES, 'Learner help tied to lesson slugs'],
    },
    capstone: {
      title: 'Writing + Research Review Protocol (starter)',
      description:
        'A practical packet: outline contract, revision passes, synthesis notes with unknowns, and a collaboration handoff template.',
      portfolioArtifacts: ['Outline contract', 'Three-pass revision log', 'Handoff template'],
      accessShaping:
        'Future purchase/subscription mapping stays packaging—still instructional access, not certification.',
    },
    humanSkillsThreads: ['Editorial discipline', 'Honest synthesis', 'Async collaboration'],
    ethicsDataLiteracyThreads: ['Privacy in drafts', 'Attribution realism', 'Sensitive-content boundaries'],
    freshness: {
      risingTopics: ['Long-context UX patterns', 'Enterprise controls', 'Citation workflows by environment'],
      toolAndPlatformClusters: ['Claude-class assistants', 'Docs workflows'],
      updatePrinciples:
        'Refresh UI examples cautiously—keep verification loops and provenance habits stable.',
    },
  }),

  course_agentic_ai_real_work: stages('course_agentic_ai_real_work', {
    headline: 'Agentic AI and AI Agents for Real Work — supervised loops, tooling sobriety, and operational governance',
    targetCapability:
      ' design agent workflows with explicit permissions, checkpoints, observability, and rollback—without outsourcing accountability.',
    freeToPaidSkillShape: {
      publicStarter:
        'Public preview modules teach agent loops, tool risk, and evaluation framing—measurement before hype.',
      signedInContinuity:
        'Signed-in modules deepen workflow design, failure modes, and pilot discipline—still instructional materials.',
      deeperMaterials:
        'Premium-depth modules emphasize governance artifacts and incident readiness—expanded scenarios, not autonomy promises.',
    },
    competencyStages: [
      {
        id: 'entry',
        label: 'Loops + permissions',
        summary: 'Map plan/act/observe/revise with blast radius in mind.',
        prerequisites: [],
        youShouldNowBeAbleTo: ['Sketch a loop with explicit human gates'],
        goodUnderstandingLooksLike: ['Tool permissions are explicit'],
        commonFailureModes: ['Assuming autonomy'],
      },
      {
        id: 'intermediate',
        label: 'Observability + failure modes',
        summary: 'Detect drift, misuse, and silent corruption early.',
        prerequisites: ['entry'],
        youShouldNowBeAbleTo: ['Define logging fields and halt rules'],
        goodUnderstandingLooksLike: ['Incidents become actionable timelines'],
        commonFailureModes: ['Retries without idempotency thinking'],
      },
      {
        id: 'capstone',
        label: 'Pilot + governance starter',
        summary: 'Roll out narrowly with measurable criteria and proportional oversight.',
        prerequisites: ['intermediate'],
        youShouldNowBeAbleTo: ['Produce an ownership matrix and pilot stop rules'],
        goodUnderstandingLooksLike: ['Stakeholders see limits and controls clearly'],
        commonFailureModes: ['Production-by-stealth pilots'],
      },
    ],
    scenarioAssessment: {
      summary:
        'Tool-call review drills, workflow state diagrams, incident responses, vendor question lists—operations-grounded.',
      formats: ['Risk tier table', 'Trace review', 'Rollback plan', 'Pilot charter'],
      anchors: ['Tooling reality', 'Workflow design', 'Governance'],
      bridges: [...SHARED_SCENARIO_BRIDGES, 'Learner help tied to lesson slugs'],
    },
    capstone: {
      title: 'Agent Workflow Pilot Charter + Halt Rules',
      description:
        'A compact rollout artifact: scope, metrics, approvals, monitoring signals, rollback, and explicit limitations.',
      portfolioArtifacts: ['Pilot charter', 'Halt rules', 'Ownership matrix'],
      accessShaping:
        'Pricing/packaging may map later—still instructional access, not guaranteed ROI or safe-by-default claims.',
    },
    humanSkillsThreads: ['Operational judgment', 'Systems thinking', 'Honest transparency'],
    ethicsDataLiteracyThreads: ['Data minimization in loops', 'Injection awareness', 'Accountability clarity'],
    freshness: {
      risingTopics: ['Enterprise agent platforms', 'Audit expectations', 'Evaluation harnesses'],
      toolAndPlatformClusters: ['Browser automation', 'API toolchains', 'IDE agents'],
      updatePrinciples:
        'Update vendor examples cautiously—anchor learners to controls, logs, and verification—not brand hype.',
    },
  }),
}
