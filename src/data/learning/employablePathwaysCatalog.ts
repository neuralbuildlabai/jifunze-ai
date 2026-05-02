/**
 * Employability pathways — structural metadata for routes and future curriculum mapping.
 * Does not imply every linked course is finished; see per-course availability in the catalog merge.
 */

import type { EmployablePathway } from './employablePathwaysTypes'

export type { EmployablePathway, EmployablePathwayStatus } from './employablePathwaysTypes'

export const EMPLOYABLE_PATHWAYS: EmployablePathway[] = [
  {
    slug: 'digital-work-starter',
    title: 'Digital Work Starter Pathway',
    shortTitle: 'Digital work starter',
    description:
      'Build baseline digital habits, safe online practice, and communication clarity that prepares you for remote-friendly roles and further technical tracks.',
    targetLearner: 'New or returning learners entering online work, study, or hybrid roles.',
    levelRange: 'Beginner',
    estimatedDuration: '8–14 weeks at a steady part-time pace (depends on course depth and your schedule).',
    schoolId: 'ai_digital',
    learnerGoals: ['First remote role', 'Digital confidence', 'Communication basics'],
    includedCourseSlugs: ['digital-safety', 'career-launch', 'clear-communication'],
    plannedCourseSlugs: ['digital-work-readiness', 'customer-service-virtual-assistant-skills'],
    skillsGained: [
      'Safe accounts, passwords, and phishing awareness',
      'Clear written updates and async handoffs',
      'CV / profile positioning without over-claiming',
    ],
    possibleRoles: [
      'Junior virtual assistant (task-based)',
      'Customer support trainee',
      'Campus or community digital literacy peer helper',
    ],
    portfolioOutputs: [
      'Short “safe digital habits” checklist you could share with family or a team',
      'Two polished written samples (email + status update)',
      'One-page career positioning summary (evidence-based, no inflated titles)',
    ],
    finalProjectCapstone:
      'Capstone-shaped bundle: a one-week “digital work readiness” plan you wrote for yourself (tools, boundaries, verification habits) plus the two writing samples above—reviewer-ready, not employer-guaranteed.',
    certificateReadinessCriteria:
      'When flagship courses in this pathway are completed on Jifunze (including their quizzes and checkpoints where applicable), you meet the in-product readiness bar for those courses. Jifunze does not issue PDF certificates from the app today—treat this as evidence you can attach to applications or mentorship conversations.',
    kenyaRelevance:
      'Supports M-Pesa-era scam awareness, realistic remote job expectations for Kenya-based and diaspora hybrid teams, and clear English communication for regional and global clients.',
    globalRelevance:
      'Foundational habits transfer to any market where async communication and digital hygiene matter.',
    recommendedNextPathwaySlug: 'remote-work-freelancing',
    status: 'active',
    featured: true,
  },
  {
    slug: 'remote-work-freelancing',
    title: 'Remote Work and Freelancing Pathway',
    shortTitle: 'Remote & freelance',
    description:
      'Combine execution discipline, client-ready communication, and delivery habits that help you build proof for freelance or distributed team work.',
    targetLearner: 'Learners exploring freelancing, contract work, or remote-first employment.',
    levelRange: 'Beginner to intermediate',
    estimatedDuration: '10–18 weeks part-time.',
    schoolId: 'career_intellect',
    learnerGoals: ['Freelance income', 'Remote collaboration', 'Client trust'],
    includedCourseSlugs: ['career-launch', 'clear-communication', 'project-execution'],
    plannedCourseSlugs: ['freelancing-remote-work-online-income', 'sales-negotiation-client-management'],
    skillsGained: [
      'Scope notes and change-control language',
      'Milestone-based delivery thinking',
      'Professional tone under ambiguity',
    ],
    possibleRoles: [
      'Freelance coordinator or project assistant',
      'Remote operations support',
      'Independent consultant (junior scope)',
    ],
    portfolioOutputs: [
      'Sample scope + timeline for a small client-style project',
      '“Lessons learned” one-pager from a simulated engagement',
      'Portfolio README explaining what you will/will not claim as experience',
    ],
    finalProjectCapstone:
      'A bounded client-style delivery pack (scope, timeline, risk list, comms log template) suitable for mentor review—helps build proof without promising job placement.',
    certificateReadinessCriteria:
      'Complete included flagship courses and their in-course evidence tasks where required. Readiness is course-scoped; external platforms may have separate credential rules.',
    kenyaRelevance:
      'Frames realistic pricing, time zones (EAT vs US/EU), and professional boundaries common in Kenya ↔ global freelance markets.',
    globalRelevance:
      'Remote collaboration patterns apply across regions when paired with your local compliance and tax context.',
    recommendedNextPathwaySlug: 'ai-productivity-professional',
    status: 'active',
    featured: true,
  },
  {
    slug: 'ai-productivity-professional',
    title: 'AI Productivity Professional Pathway',
    shortTitle: 'AI productivity',
    description:
      'Move from ad-hoc prompting to repeatable, verifiable AI habits in real workflows—without outsourcing judgment.',
    targetLearner: 'Knowledge workers upgrading day-to-day productivity with responsible AI use.',
    levelRange: 'Beginner to intermediate',
    estimatedDuration: '10–16 weeks part-time.',
    schoolId: 'ai_digital',
    learnerGoals: ['Workflow speed', 'Verification habits', 'Responsible use'],
    includedCourseSlugs: ['ai-essentials', 'smart-workflows-with-ai'],
    plannedCourseSlugs: ['ai-office-productivity'],
    skillsGained: [
      'Prompt specs with evaluation criteria',
      'Lightweight review loops for AI-assisted drafts',
      'Failure-mode awareness for common tools',
    ],
    possibleRoles: [
      'Operations analyst with AI-assisted reporting',
      'Program coordinator with AI drafting support',
      'Team “AI workflow steward” (informal lead)',
    ],
    portfolioOutputs: [
      'Before/after prompt pack for one recurring task',
      'Verification checklist tailored to your role',
      'Short reflection on human accountability boundaries',
    ],
    finalProjectCapstone:
      'A portfolio-ready “AI operating approach” memo: tools, data tiers, refusal map, and two workflow diagrams—suitable for manager conversation, not a vendor certification.',
    certificateReadinessCriteria:
      'Satisfies flagship completion + quiz/checkpoint rules for included courses. No standalone PDF credential from Jifunze today.',
    kenyaRelevance:
      'Useful for Nairobi/remote hybrid teams balancing global clients with local connectivity and cost realities.',
    globalRelevance:
      'Workflow and verification habits transfer globally; always pair with your employer policies.',
    recommendedNextPathwaySlug: 'data-business-reporting',
    status: 'active',
    featured: true,
  },
  {
    slug: 'data-business-reporting',
    title: 'Data and Business Reporting Pathway',
    shortTitle: 'Data & reporting',
    description:
      'Strengthen numeracy for decisions, financial literacy framing, and reporting narratives that support roles such as analyst support and operations reporting.',
    targetLearner: 'Learners who support decisions with data, spreadsheets, and clear explanations.',
    levelRange: 'Beginner to intermediate',
    estimatedDuration: '12–20 weeks part-time.',
    schoolId: 'business_growth',
    learnerGoals: ['Spreadsheets', 'Metrics', 'Finance basics'],
    includedCourseSlugs: ['data-and-decisions', 'money-and-finance'],
    plannedCourseSlugs: ['excel-google-sheets-business-reporting', 'data-analytics-excel-sql-dashboards'],
    skillsGained: [
      'Stakeholder-safe metric definitions',
      'Basic scenario thinking for costs and trade-offs',
      'Clear chart-to-narrative translation',
    ],
    possibleRoles: [
      'Reporting analyst (junior)',
      'Operations coordinator with metrics duties',
      'Program MEL support trainee',
    ],
    portfolioOutputs: [
      'One-page decision memo with explicit assumptions',
      'Simple dashboard storyboard (metrics + caveats)',
      'Glossary of metrics your team actually uses',
    ],
    finalProjectCapstone:
      'A capstone-style “insight brief” with data limitations stated plainly—reviewer-ready, not a substitute for regulated financial advice.',
    certificateReadinessCriteria:
      'Complete included flagship courses per Jifunze rules. External certifications (e.g. spreadsheets, SQL) remain separate if you pursue them.',
    kenyaRelevance:
      'Supports SME and NGO contexts where Excel-first reporting and cash-flow clarity are daily realities.',
    globalRelevance:
      'Reporting discipline transfers; always align numbers with local accounting and regulatory guidance.',
    recommendedNextPathwaySlug: 'small-business-entrepreneurship',
    status: 'active',
    featured: true,
  },
  {
    slug: 'small-business-entrepreneurship',
    title: 'Small Business and Entrepreneurship Pathway',
    shortTitle: 'Small business',
    description:
      'Connect product sense, growth, and finance basics to help you prepare for founder-operator or early-employee responsibilities—without promising funding or revenue.',
    targetLearner: 'Aspiring founders, side-project builders, and early startup generalists.',
    levelRange: 'Intermediate',
    estimatedDuration: '14–24 weeks part-time.',
    schoolId: 'business_growth',
    learnerGoals: ['Offer clarity', 'Go-to-market thinking', 'Unit economics'],
    includedCourseSlugs: ['business-builder', 'marketing-and-growth', 'money-and-finance', 'product-thinking'],
    plannedCourseSlugs: ['kenya-financial-literacy-tax-business-compliance', 'ai-entrepreneurs-small-businesses'],
    skillsGained: [
      'Offer and ICP clarity (evidence-based)',
      'Lightweight channel experiments',
      'Cash-flow language without over-precision',
    ],
    possibleRoles: [
      'Founder’s associate (very junior)',
      'Growth intern / marketing assistant',
      'Small business operations trainee',
    ],
    portfolioOutputs: [
      'One-page offer hypothesis with falsifiers',
      '90-day experiment backlog (ethical, measurable)',
      'Simple P&L narrative for a fictional or anonymized case',
    ],
    finalProjectCapstone:
      'A “business case lite” pack: problem, proposed offer, risks, and ethical data use—suitable for mentor review, not investor claims.',
    certificateReadinessCriteria:
      'Complete included courses where published; readiness is per-course. Tax and compliance topics require professional advisors in real life.',
    kenyaRelevance:
      'Kenya-specific compliance course (planned) will anchor local tax and business hygiene; keep claims practical and advisor-aware.',
    globalRelevance:
      'Entrepreneurship patterns are global; localize regulation, payments, and culture.',
    recommendedNextPathwaySlug: 'digital-marketing-creator',
    status: 'active',
    featured: true,
  },
  {
    slug: 'digital-marketing-creator',
    title: 'Digital Marketing and Creator Business Pathway',
    shortTitle: 'Marketing & creator',
    description:
      'Blend growth thinking with communication craft so you can build audience-aware content and ethical promotion habits.',
    targetLearner: 'Creators, community managers, and junior marketers building proof.',
    levelRange: 'Beginner to intermediate',
    estimatedDuration: '10–18 weeks part-time.',
    schoolId: 'business_growth',
    learnerGoals: ['Content systems', 'Growth experiments', 'Trust'],
    includedCourseSlugs: ['marketing-and-growth', 'clear-communication'],
    plannedCourseSlugs: ['digital-marketing-social-media-management'],
    skillsGained: [
      'Channel-fit reasoning',
      'Ethical claims and disclosure habits',
      'Editing loops for audience clarity',
    ],
    possibleRoles: [
      'Junior content strategist',
      'Social media assistant',
      'Community moderator with growth awareness',
    ],
    portfolioOutputs: [
      'Two-week content calendar with measurement plan',
      'A/B narrative variants for one campaign idea',
      'Short ethics addendum for sponsored-style posts',
    ],
    finalProjectCapstone:
      'A “creator brief” you could hand to a collaborator: audience, voice, boundaries, and review steps—portfolio-shaped, not vanity metrics.',
    certificateReadinessCriteria:
      'Complete included flagship courses per Jifunze completion rules. No job placement guarantee.',
    kenyaRelevance:
      'Respects mobile-first audiences and local creator economics; avoids overpromising brand deals.',
    globalRelevance:
      'Marketing craft transfers; adapt tone and compliance to each platform and region.',
    recommendedNextPathwaySlug: 'junior-tech-builder',
    status: 'active',
    featured: true,
  },
  {
    slug: 'junior-tech-builder',
    title: 'Junior Tech Builder Pathway',
    shortTitle: 'Junior tech builder',
    description:
      'Start from web and software foundations and digital safety, then prepare for deeper builder tracks as those courses ship.',
    targetLearner: 'Learners exploring software, automation, or technical operations careers.',
    levelRange: 'Beginner',
    estimatedDuration: '16–30 weeks including planned builder courses when available.',
    schoolId: 'ai_digital',
    learnerGoals: ['Foundations', 'Safe building', 'Ops awareness'],
    includedCourseSlugs: ['web-and-software-foundations', 'digital-safety'],
    plannedCourseSlugs: [
      'software-development-foundations',
      'no-code-low-code-app-building',
      'cloud-hosting-devops-foundations',
      'cybersecurity-work-small-business',
    ],
    skillsGained: [
      'Architecture vocabulary at a junior level',
      'Safe handling of credentials and environments',
      'Structured debugging mindset (starter)',
    ],
    possibleRoles: [
      'Junior QA or test support (trainee)',
      'Technical support trainee',
      'No-code automation builder (junior scope)',
    ],
    portfolioOutputs: [
      'Annotated architecture sketch for a small app',
      'Incident-style writeup with redacted details',
      'Personal “safe defaults” checklist for dev tools',
    ],
    finalProjectCapstone:
      'When planned builder courses exist, a small shipped artifact repository will be defined here—in the meantime, capstone-shaped evidence comes from included flagship outputs only.',
    certificateReadinessCriteria:
      'Readiness for included published courses only; planned courses have no completion rules until published.',
    kenyaRelevance:
      'Prepares for regional remote tech support and global outsourcing lanes with realistic scope boundaries.',
    globalRelevance:
      'Technical foundations are global; pair with official docs for vendors you use.',
    recommendedNextPathwaySlug: 'leadership-training-facilitation',
    status: 'coming_soon',
    featured: false,
  },
  {
    slug: 'leadership-training-facilitation',
    title: 'Leadership, Training, and Facilitation Pathway',
    shortTitle: 'Leadership & facilitation',
    description:
      'Combine leadership judgment with facilitation craft for people who support teams, workshops, or learning programs.',
    targetLearner: 'Team leads, trainers, HR/learning partners, and community facilitators.',
    levelRange: 'Intermediate',
    estimatedDuration: '12–22 weeks part-time.',
    schoolId: 'leadership_learning',
    learnerGoals: ['Team learning', 'Facilitation', 'Critical dialogue'],
    includedCourseSlugs: ['leadership-and-teams', 'teaching-and-facilitation', 'clear-communication', 'research-and-critical-thinking'],
    plannedCourseSlugs: ['monitoring-evaluation-impact-reporting'],
    skillsGained: [
      'Session design with clear outcomes',
      'Difficult conversation scaffolding',
      'Evidence-aware facilitation',
    ],
    possibleRoles: [
      'Workshop assistant facilitator',
      'L&D coordinator',
      'Team lead preparing for people-manager paths',
    ],
    portfolioOutputs: [
      'Session plan with timings and materials list',
      'Facilitator reflection note (what you’d change next time)',
      'Short MEL-style indicator table (starter level)',
    ],
    finalProjectCapstone:
      'A facilitator-ready “run of show” plus participant take-home—reviewer-oriented, not HR-certified.',
    certificateReadinessCriteria:
      'Complete included flagship courses per Jifunze rules. External HR credentials remain separate.',
    kenyaRelevance:
      'Useful for NGO workshops, faith-community learning, and distributed African teams with high-context communication norms.',
    globalRelevance:
      'Facilitation structure is universal; adapt examples to local culture and labor law.',
    recommendedNextPathwaySlug: null,
    status: 'active',
    featured: true,
  },
]

export function getPathwayBySlug(slug: string | undefined): EmployablePathway | undefined {
  if (!slug) return undefined
  return EMPLOYABLE_PATHWAYS.find((p) => p.slug === slug)
}

/** Primary pathway selection is limited to active pathways (not planned-only metadata or coming-soon shells). */
export function canLearnerSelectPathwayAsPrimary(pathway: EmployablePathway | undefined): boolean {
  return Boolean(pathway && pathway.status === 'active')
}

export function featuredEmployablePathways(): EmployablePathway[] {
  return EMPLOYABLE_PATHWAYS.filter((p) => p.featured && p.status === 'active')
}

export function employablePathwaysByStatus(status: EmployablePathway['status']): EmployablePathway[] {
  return EMPLOYABLE_PATHWAYS.filter((p) => p.status === status)
}
