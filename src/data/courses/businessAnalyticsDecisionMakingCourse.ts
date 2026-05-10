/**
 * Business Analytics for Decision-Making — professional micro-course (standalone learner catalog).
 * Not a flagship course; does not count toward flagship course caps or flagship session maps.
 */

import {
  BUSINESS_ANALYTICS_DECISION_MAKING_INTERNAL_KEY,
  BUSINESS_ANALYTICS_DECISION_MAKING_SLUG,
} from './businessAnalyticsDecisionMakingIds.ts'
import { BUSINESS_ANALYTICS_MODULES } from './businessAnalyticsDecisionMakingModules'
import type { PracticalMathematicsCourse } from './practicalMathematicsCourseTypes'

export { BUSINESS_ANALYTICS_DECISION_MAKING_INTERNAL_KEY, BUSINESS_ANALYTICS_DECISION_MAKING_SLUG } from './businessAnalyticsDecisionMakingIds.ts'

export const businessAnalyticsDecisionMakingCourse: PracticalMathematicsCourse = {
  slug: BUSINESS_ANALYTICS_DECISION_MAKING_SLUG,
  internalKey: BUSINESS_ANALYTICS_DECISION_MAKING_INTERNAL_KEY,
  isolation: {
    type: 'standalone',
    doesNotAffect: ['flagship-catalog', 'flagship-session-maps'],
  },
  title: 'Business Analytics for Decision-Making: Turning Data Into Actionable Business Insight',
  accessLabel: 'Free',
  estimatedHours: 1,
  certificateIdPrefix: 'BA',
  level: 'Beginner to early-intermediate',
  school: 'Business, Analytics & Decision-Making',
  format: 'Self-paced slide training with speaker notes, case study, learner practice, and mini quiz',
  certificate: 'Certificate of Completion',
  prerequisites: ['Basic comfort reading charts and tables; no advanced statistics required'],
  productTier: 'professional_micro',
  capstoneModuleSlug: 'turning-analytics-into-action',
  capstoneAcknowledgement: {
    title: 'Portfolio acknowledgment: GlowCare Business Analytics Recommendation',
    intro:
      'Complete your written recommendation off-platform (document or memo). When your artifact reflects the Module 6 practice prompt, confirm below. This does not upload files—it records your honest self-check for certificate eligibility.',
    checkboxLabel:
      'I have completed the GlowCare Business Analytics Recommendation artifact and understand that management decisions still require appropriate verification and governance.',
  },
  downloadableResources: [
    {
      label: 'Download slide deck (PowerPoint)',
      href: '/course-assets/business-analytics-decision-making/deck/business_analytics_decision_making_serious_deck.pptx',
    },
    {
      label: 'Download companion notes (Markdown)',
      href: '/training/business-analytics-decision-making/business_analytics_decision_making_source.md',
    },
  ],
  description:
    'Business Analytics for Decision-Making is a practical professional course that teaches learners how to read business performance data, interpret dashboards, investigate performance changes, and turn analysis into clear business recommendations. Using a connected case study for GlowCare Beauty & Retail, learners explore revenue, cost, profit, margin, funnel performance, customer retention, complaints, stockouts, late deliveries, and decision options. The course is designed for professionals who want to move beyond basic charts and learn how data supports real business decisions.',

  targetAudience: [
    'Managers and supervisors who consume dashboards weekly',
    'Entrepreneurs and founders who need disciplined diagnosis without a full data team',
    'Junior analysts moving from reporting to interpretation',
    'Operations and finance/admin staff who translate metrics into next steps',
    'Students and non-technical professionals building employable analytics literacy',
  ],

  learningOutcomes: [
    'Explain how business analytics supports practical decision-making.',
    'Distinguish raw data, metrics, KPIs, insights, and recommendations.',
    'Read a business performance dataset without being overwhelmed.',
    'Interpret revenue, cost, profit, margin, conversion, retention, and customer metrics.',
    'Identify trends, outliers, warning signs, and performance drops.',
    'Compare performance across channels, products, services, and time periods.',
    'Read dashboard KPI cards without blindly trusting headline numbers.',
    'Diagnose a business problem using multiple metrics.',
    'Avoid common chart and data interpretation mistakes.',
    'Convert analysis into a clear business recommendation.',
  ],

  safetyDisclaimer:
    'Instructional materials only. The GlowCare scenario is a learning case—not confidential data about any real business. Do not upload sensitive employer or customer data into unsecured tools. Always follow your organization’s data governance, privacy, and financial sign-off rules before acting on recommendations.',

  completionRequirements: {
    progression: 'sequential',
    rule:
      'Study every lesson (mark as studied), complete module labs as framed, pass the Module 6 mini quiz at 75% or higher, keep your overall scored quiz average at 75% or higher across all scored quizzes, then confirm your portfolio artifact on the final module page to unlock the printable Certificate of Completion.',
    passThreshold:
      '75% or higher on the Module 6 quiz: ceil(0.75 × N) correct answers, where N is 12. Modules 1–5 have reflection labs without auto-graded quizzes. Your aggregate score across scored quiz attempts must remain at 75% or higher.',
    capstone:
      'Module 6: produce the GlowCare Business Analytics Recommendation (May performance drop), then confirm completion in the course UI. This is a learner self-check until an upload flow exists.',
  },

  assessmentApproach:
    'Twelve application-focused multiple-choice and scenario questions in Module 6 test interpretation, not memorization. Each item includes an explanation after submission. Earlier modules use structured reflection labs to build the case narrative before the quiz.',

  capstoneDescription:
    'The capstone-equivalent artifact is a short executive-style recommendation explaining May’s deterioration using multiple metric families, clearly separating facts, hypotheses, and unknowns, and proposing prioritized management actions with monitoring metrics.',

  microWorkshopDetail: {
    cardSubtitle:
      'Turn business data into clear decisions using dashboards, KPIs, trend analysis, variance analysis, and a realistic business case.',
    cardMeta: '61 min · Beginner–Intermediate · Professional micro-course',
    cardTags: ['Business analytics', 'KPIs', 'dashboards', 'decision-making'],
    whoThisIsFor: [
      'Leaders who need to interrogate dashboards without drowning in jargon',
      'Operators who connect fulfillment, inventory, and service metrics to financial outcomes',
      'Founders who want disciplined “what happened in May?” narratives before spending money on fixes',
    ],
    caseStudy: {
      headline: 'GlowCare Beauty & Retail',
      businessType: 'Beauty retail and services company',
      revenueStreams: [
        'Skincare products',
        'Hair products',
        'Nail services',
        'Facial services',
        'Delivery orders',
      ],
      salesChannels: ['Walk-in', 'Online store', 'Social media', 'Referrals'],
      centralProblem:
        'January–June growth masks a serious May deterioration: revenue dropped, costs rose, profit and margin weakened, complaints rose, repeat customer rate declined, stockouts and late deliveries increased, and complaint resolution time worsened.',
      diagnosisFraming:
        'This course treats May as a multi-signal diagnosis—not a chart-reading exercise. You will weigh evidence, avoid weak single-cause stories, and recommend actions using a decision matrix.',
    },
    analyticsMethods: [
      'Trend analysis',
      'Variance analysis',
      'KPI dashboard interpretation',
      'Profitability analysis',
      'Channel contribution analysis',
      'Product/service mix analysis',
      'Funnel analysis',
      'Customer retention analysis',
      'Operational root cause analysis',
      'Decision matrix scoring',
      'Executive recommendation writing',
    ],
    visualsInDeck: [
      'Revenue, cost, and profit line chart',
      'Revenue and gross margin combo chart',
      'Revenue by channel bar chart',
      'Product/service stacked bar chart',
      'Sales funnel chart',
      'KPI dashboard',
      'April-to-May heatmap',
      'Profit waterfall',
      'Complaints vs repeat customer relationship chart',
      'Operational issue trend chart',
      'Root cause diagram',
      'Decision matrix',
      'Executive recommendation slide',
    ],
    learnerPractice: {
      title: 'Analyze the May Performance Drop',
      artifactTitle: 'GlowCare Business Analytics Recommendation',
      prompt:
        'Review the May performance drop and write a short business recommendation explaining what happened, what likely contributed to the issue, what is not yet proven, and what action management should take next.',
      metricsChecklist: [
        'Revenue trend',
        'Cost trend',
        'Profit margin',
        'Complaints',
        'Repeat customer rate',
        'Stockouts',
        'Late deliveries',
        'Average order value (AOV)',
      ],
    },
    quizSummary:
      'Twelve application-focused questions in Module 6. Passing threshold: 75% (9+ correct of 12). Explanations appear after you submit.',
    suggestedNextCourses: [
      { title: 'Data and Decisions (flagship path)', href: '/learn/courses/data-and-decisions', subtitle: 'Deeper quantitative decision literacy across the flagship curriculum' },
      { title: 'Business Builder (flagship path)', href: '/learn/courses/business-builder', subtitle: 'Offer, demand, and operating model thinking' },
      { title: 'Money and Finance (flagship path)', href: '/learn/courses/money-and-finance', subtitle: 'Financial judgment alongside analytics narratives' },
    ],
  },

  moduleMap: BUSINESS_ANALYTICS_MODULES.map((m) => ({ number: m.moduleNumber, slug: m.slug, title: m.title })),
  modules: BUSINESS_ANALYTICS_MODULES,
}

