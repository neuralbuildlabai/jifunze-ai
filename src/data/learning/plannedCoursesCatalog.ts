/**
 * Planned / coming-soon course metadata — no modules, no completion rules.
 * Merged with `FLAGSHIP_COURSES` for public display only via {@link mergePublicCourseSummaries}.
 */

import type { FlagshipSchoolId } from './flagshipCoursesCatalog'
import { FLAGSHIP_COURSES, type FlagshipCourse } from './flagshipCoursesCatalog'

export type CourseAvailabilityStatus = 'available' | 'planned' | 'coming_soon'

export type PlannedCourseSummary = {
  slug: string
  title: string
  schoolId: FlagshipSchoolId
  subtitle: string
  levelRange: string
  exampleOutputs: [string, string, string]
  intro: string
  promise: string
  pathwayRelevance: string
  kenyaRelevance: string
  availability: Extract<CourseAvailabilityStatus, 'planned' | 'coming_soon'>
}

export type PublicCourseCardSummary = {
  slug: string
  title: string
  schoolId: FlagshipSchoolId
  subtitle: string
  levelRange: string
  exampleOutputs: [string, string, string]
  intro: string
  promise: string
  pathwayRelevance: string
  kenyaRelevance: string
  availability: CourseAvailabilityStatus
}

const PLANNED: PlannedCourseSummary[] = [
  {
    slug: 'digital-work-readiness',
    title: 'Digital Work Readiness',
    schoolId: 'ai_digital',
    subtitle: 'Devices, accounts, and professional norms for first online roles — curriculum TBD.',
    levelRange: 'Beginner',
    exampleOutputs: ['Device hygiene checklist', 'Weekly routine map', 'Redacted comms sample'],
    intro: 'Placeholder catalog entry — structured lessons will arrive in a later release.',
    promise: 'Prepares you for structured digital work habits before role-specific depth.',
    pathwayRelevance: 'Anchors the Digital Work Starter pathway when published.',
    kenyaRelevance: 'Will reference realistic connectivity, cost, and scam-awareness contexts for Kenya-based learners.',
    availability: 'planned',
  },
  {
    slug: 'excel-google-sheets-business-reporting',
    title: 'Excel & Google Sheets for Business Reporting',
    schoolId: 'business_growth',
    subtitle: 'Spreadsheet reporting patterns for operations — curriculum TBD.',
    levelRange: 'Beginner to intermediate',
    exampleOutputs: ['KPI table template', 'Variance explanation paragraph', 'Chart hygiene notes'],
    intro: 'Placeholder catalog entry.',
    promise: 'Supports roles that translate numbers into decisions.',
    pathwayRelevance: 'Feeds the Data and Business Reporting pathway.',
    kenyaRelevance: 'Will align with common SME reporting realities in Kenya.',
    availability: 'planned',
  },
  {
    slug: 'data-analytics-excel-sql-dashboards',
    title: 'Data Analytics: Excel to SQL Dashboards',
    schoolId: 'business_growth',
    subtitle: 'From spreadsheet logic toward light SQL thinking — curriculum TBD.',
    levelRange: 'Intermediate',
    exampleOutputs: ['SQL sketch for one question', 'Dashboard wireframe', 'Data quality caveat list'],
    intro: 'Placeholder catalog entry.',
    promise: 'Helps build analyst-style proof without claiming full data science.',
    pathwayRelevance: 'Extends the Data and Business Reporting pathway.',
    kenyaRelevance: 'Will emphasize practical, low-cost tooling paths relevant to local orgs.',
    availability: 'planned',
  },
  {
    slug: 'software-development-foundations',
    title: 'Software Development Foundations',
    schoolId: 'ai_digital',
    subtitle: 'Starter track toward engineering habits — curriculum TBD.',
    levelRange: 'Beginner',
    exampleOutputs: ['README for a tiny repo', 'Bug reproduction note', 'Test case list'],
    intro: 'Placeholder catalog entry.',
    promise: 'Prepares you for deeper builder courses with honest scope.',
    pathwayRelevance: 'Junior Tech Builder pathway.',
    kenyaRelevance: 'Will include remote-first collaboration norms common in outsourcing lanes.',
    availability: 'coming_soon',
  },
  {
    slug: 'no-code-low-code-app-building',
    title: 'No-Code / Low-Code App Building',
    schoolId: 'ai_digital',
    subtitle: 'Ship small internal tools responsibly — curriculum TBD.',
    levelRange: 'Beginner to intermediate',
    exampleOutputs: ['App spec one-pager', 'User flow sketch', 'Rollback plan'],
    intro: 'Placeholder catalog entry.',
    promise: 'Prepares you to specify small tools before build—curriculum to follow.',
    pathwayRelevance: 'Junior Tech Builder pathway.',
    kenyaRelevance: 'Will note mobile-first users and cost-sensitive tool choices.',
    availability: 'planned',
  },
  {
    slug: 'cloud-hosting-devops-foundations',
    title: 'Cloud Hosting & DevOps Foundations',
    schoolId: 'ai_digital',
    subtitle: 'Deploy and observe small services safely — curriculum TBD.',
    levelRange: 'Intermediate',
    exampleOutputs: ['Architecture diagram', 'Runbook fragment', 'Incident checklist'],
    intro: 'Placeholder catalog entry.',
    promise: 'Supports safer small deployments when lessons ship—no ops certification implied.',
    pathwayRelevance: 'Junior Tech Builder pathway.',
    kenyaRelevance: 'Will stay vendor-neutral with practical latency and cost notes.',
    availability: 'coming_soon',
  },
  {
    slug: 'cybersecurity-work-small-business',
    title: 'Cybersecurity for Small Business Work',
    schoolId: 'ai_digital',
    subtitle: 'Practical risk reduction without fear-mongering — curriculum TBD.',
    levelRange: 'Beginner to intermediate',
    exampleOutputs: ['Asset list', 'Access review table', 'Vendor risk note'],
    intro: 'Placeholder catalog entry.',
    promise: 'Practical risk reduction vocabulary—curriculum TBD.',
    pathwayRelevance: 'Junior Tech Builder pathway.',
    kenyaRelevance: 'Will align with common SME attack patterns and mobile money hygiene.',
    availability: 'planned',
  },
  {
    slug: 'ai-office-productivity',
    title: 'AI Office Productivity',
    schoolId: 'ai_digital',
    subtitle: 'Responsible AI in everyday office tools — curriculum TBD.',
    levelRange: 'Beginner',
    exampleOutputs: ['Prompt pack for meetings', 'Red-team checklist', 'Handoff template'],
    intro: 'Placeholder catalog entry.',
    promise: 'Prepares you for responsible AI in everyday tools when content ships.',
    pathwayRelevance: 'AI Productivity Professional pathway.',
    kenyaRelevance: 'Will respect employer policy and data residency conversations.',
    availability: 'planned',
  },
  {
    slug: 'ai-entrepreneurs-small-businesses',
    title: 'AI for Entrepreneurs & Small Businesses',
    schoolId: 'business_growth',
    subtitle: 'Ethical automation for lean teams — curriculum TBD.',
    levelRange: 'Intermediate',
    exampleOutputs: ['Automation map', 'Human-gates diagram', 'Customer comms policy snippet'],
    intro: 'Placeholder catalog entry.',
    promise: 'Ethical automation framing for lean teams—lessons TBD.',
    pathwayRelevance: 'Small Business and Entrepreneurship pathway.',
    kenyaRelevance: 'Will pair global tools with local customer trust norms.',
    availability: 'planned',
  },
  {
    slug: 'digital-marketing-social-media-management',
    title: 'Digital Marketing & Social Media Management',
    schoolId: 'business_growth',
    subtitle: 'Channel execution with integrity — curriculum TBD.',
    levelRange: 'Beginner to intermediate',
    exampleOutputs: ['Content matrix', 'Community guidelines draft', 'Weekly metrics snapshot'],
    intro: 'Placeholder catalog entry.',
    promise: 'Channel execution with integrity when curriculum is ready.',
    pathwayRelevance: 'Digital Marketing and Creator Business pathway.',
    kenyaRelevance: 'Will emphasize mobile-first audiences and honest growth claims.',
    availability: 'planned',
  },
  {
    slug: 'freelancing-remote-work-online-income',
    title: 'Freelancing & Remote Work Online Income',
    schoolId: 'career_intellect',
    subtitle: 'Scope, pricing language, and delivery proof — curriculum TBD.',
    levelRange: 'Beginner',
    exampleOutputs: ['Service menu', 'Contract snippet explainer', 'Portfolio README'],
    intro: 'Placeholder catalog entry.',
    promise: 'Supports realistic freelance scoping language—no income guarantee.',
    pathwayRelevance: 'Remote Work and Freelancing pathway.',
    kenyaRelevance: 'Will stay realistic about global competition and local payment rails.',
    availability: 'planned',
  },
  {
    slug: 'customer-service-virtual-assistant-skills',
    title: 'Customer Service & Virtual Assistant Skills',
    schoolId: 'career_intellect',
    subtitle: 'Professional tone under load — curriculum TBD.',
    levelRange: 'Beginner',
    exampleOutputs: ['Macro response set', 'Escalation tree', 'Quality rubric'],
    intro: 'Placeholder catalog entry.',
    promise: 'Prepares you for professional service tone under load—curriculum TBD.',
    pathwayRelevance: 'Digital Work Starter pathway.',
    kenyaRelevance: 'Will include respectful service norms for regional and global clients.',
    availability: 'planned',
  },
  {
    slug: 'sales-negotiation-client-management',
    title: 'Sales, Negotiation & Client Management',
    schoolId: 'business_growth',
    subtitle: 'Ethical persuasion and expectation setting — curriculum TBD.',
    levelRange: 'Intermediate',
    exampleOutputs: ['Discovery question bank', 'Negotiation recap', 'Scope change template'],
    intro: 'Placeholder catalog entry.',
    promise: 'Ethical client conversations and expectation setting—content TBD.',
    pathwayRelevance: 'Remote Work and Freelancing pathway.',
    kenyaRelevance: 'Will avoid manipulative tactics; focuses on clarity and trust.',
    availability: 'planned',
  },
  {
    slug: 'monitoring-evaluation-impact-reporting',
    title: 'Monitoring, Evaluation & Impact Reporting',
    schoolId: 'leadership_learning',
    subtitle: 'Indicator thinking for programs — curriculum TBD.',
    levelRange: 'Intermediate',
    exampleOutputs: ['Theory of change lite', 'Indicator table', 'Survey bias note'],
    intro: 'Placeholder catalog entry.',
    promise: 'Indicator literacy for programs—does not replace evaluation professionals.',
    pathwayRelevance: 'Leadership, Training, and Facilitation pathway.',
    kenyaRelevance: 'Will resonate with NGO and social-sector learners in East Africa.',
    availability: 'planned',
  },
  {
    slug: 'kenya-financial-literacy-tax-business-compliance',
    title: 'Kenya Financial Literacy, Tax & Business Compliance (Intro)',
    schoolId: 'business_growth',
    subtitle: 'Orientation only — not tax or legal advice; curriculum TBD.',
    levelRange: 'Beginner',
    exampleOutputs: ['Question list for an advisor', 'Record-keeping habit map', 'Compliance calendar draft'],
    intro: 'Placeholder catalog entry. Always pair real decisions with qualified professionals.',
    promise: 'Helps you ask better questions and organize records—not replace KRA/accountant guidance.',
    pathwayRelevance: 'Small Business and Entrepreneurship pathway.',
    kenyaRelevance: 'Designed for Kenya-based learners; respectful of regulatory complexity.',
    availability: 'coming_soon',
  },
]

const plannedBySlug = new Map(PLANNED.map((c) => [c.slug, c]))

export function getPlannedCourseBySlug(slug: string): PlannedCourseSummary | undefined {
  return plannedBySlug.get(slug)
}

function flagshipToPublicSummary(course: FlagshipCourse): PublicCourseCardSummary {
  return {
    slug: course.slug,
    title: course.title,
    schoolId: course.schoolId,
    subtitle: course.subtitle,
    levelRange: course.levelRange,
    exampleOutputs: course.exampleOutputs,
    intro: course.intro,
    promise: course.promise,
    pathwayRelevance: 'See employable pathways that reference this slug.',
    kenyaRelevance: 'Global flagship track; pair with local workplace and compliance context.',
    availability: 'available',
  }
}

/**
 * Merge published flagship courses with planned metadata for pathway pages and discovery helpers.
 * Does not mutate `FLAGSHIP_COURSES`.
 */
export function mergePublicCourseSummaries(): PublicCourseCardSummary[] {
  const available = FLAGSHIP_COURSES.map(flagshipToPublicSummary)
  const planned = PLANNED.map((p) => ({
    slug: p.slug,
    title: p.title,
    schoolId: p.schoolId,
    subtitle: p.subtitle,
    levelRange: p.levelRange,
    exampleOutputs: p.exampleOutputs,
    intro: p.intro,
    promise: p.promise,
    pathwayRelevance: p.pathwayRelevance,
    kenyaRelevance: p.kenyaRelevance,
    availability: p.availability,
  }))
  return [...available, ...planned]
}

export function resolveCourseSummaryForSlug(slug: string): PublicCourseCardSummary | undefined {
  const flagship = FLAGSHIP_COURSES.find((c) => c.slug === slug)
  if (flagship) return flagshipToPublicSummary(flagship)
  const planned = plannedBySlug.get(slug)
  if (!planned) return undefined
  return {
    slug: planned.slug,
    title: planned.title,
    schoolId: planned.schoolId,
    subtitle: planned.subtitle,
    levelRange: planned.levelRange,
    exampleOutputs: planned.exampleOutputs,
    intro: planned.intro,
    promise: planned.promise,
    pathwayRelevance: planned.pathwayRelevance,
    kenyaRelevance: planned.kenyaRelevance,
    availability: planned.availability,
  }
}
