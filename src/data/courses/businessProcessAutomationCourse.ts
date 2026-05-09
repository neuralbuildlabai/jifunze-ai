/**
 * Business Process Automation for Work — professional micro-course (standalone learner catalog).
 * Not a flagship course; does not count toward flagship course caps or flagship session maps.
 */

import {
  BUSINESS_PROCESS_AUTOMATION_INTERNAL_KEY,
  BUSINESS_PROCESS_AUTOMATION_SLUG,
} from './businessProcessAutomationConstants'
import { BUSINESS_PROCESS_AUTOMATION_MODULES } from './businessProcessAutomationModules'
import type { PracticalMathematicsCourse } from './practicalMathematicsCourseTypes'

export const businessProcessAutomationCourse: PracticalMathematicsCourse = {
  slug: BUSINESS_PROCESS_AUTOMATION_SLUG,
  internalKey: BUSINESS_PROCESS_AUTOMATION_INTERNAL_KEY,
  isolation: {
    type: 'standalone',
    doesNotAffect: ['flagship-catalog', 'flagship-session-maps'],
  },
  title: 'Business Process Automation for Work: Streamlining Tasks, Reducing Waste, and Improving Productivity',
  accessLabel: 'Free',
  estimatedHours: 1,
  certificateIdPrefix: 'BPA',
  level: 'Beginner to early-intermediate',
  school: 'Business, Operations & Workplace Skills',
  format: 'Self-paced structured course with case study, dataset, learner practice, and application quiz',
  certificate: 'Certificate of Completion',
  prerequisites: ['No technical background required; basic comfort reading tables and following step-by-step instructions'],
  productTier: 'professional_micro',
  capstoneModuleSlug: 'business-value-risk-implementation',
  capstoneAcknowledgement: {
    title: 'Portfolio acknowledgment: Redesign a Manual Workflow for Automation',
    intro:
      'Complete the learner practice exercise in Module 5 off-platform (document, notes, or whiteboard). When your answers reflect genuine engagement with the BrightPath dataset and analysis questions, confirm below. This does not upload files — it records your honest self-check for certificate eligibility.',
    checkboxLabel:
      'I have completed the "Redesign a Manual Workflow for Automation" practice exercise, including all eight analysis questions, and understand that real automation recommendations require organizational context, change management, and governance review before implementation.',
  },
  downloadableResources: [
    {
      label: 'Download slide deck (PowerPoint)',
      href: '/training/business-process-automation-for-work/Business_Process_Automation_for_Work_Jifunze.pptx',
    },
  ],
  description:
    'Business Process Automation for Work is a practical professional course that teaches learners how to analyze a manual workflow, measure where time and errors are accumulating, score automation candidates on a structured framework, design a before-to-after workflow redesign, calculate time and cost impact honestly, identify implementation risks, and produce a practical 30-day automation recommendation. Using the BrightPath Training Center connected case study — a small training provider with 75.3 monthly staff hours consumed by manual tasks — learners work through a real workflow analysis, apply an automation suitability scoring framework, and produce a first-phase recommendation they can adapt to their own organization.',

  targetAudience: [
    'Managers and supervisors who want to reduce manual workload on their teams',
    'Founders and small business owners building more scalable operations',
    'Operations and project coordinators responsible for repeatable workflows',
    'HR and admin staff looking to reduce time spent on routine task execution',
    'Finance and admin staff who handle repetitive confirmation and tracking steps',
    'School administrators, clinic administrators, and training center coordinators',
    'Anyone who wants to make a structured automation recommendation to leadership',
  ],

  learningOutcomes: [
    'Distinguish business process automation from digitization and AI-assisted tools.',
    'Apply a five-step automation thinking cycle to evaluate a candidate workflow.',
    'Read a manual workload data table and calculate monthly staff hours per task.',
    'Identify bottlenecks using both hours consumed and error/delay rate as evidence.',
    'Score automation candidates on a five-dimension suitability framework.',
    'Explain why sequencing automation based on data dependencies produces better outcomes than sequencing on hours saved alone.',
    'Design a trigger-action-exception structure for a first-phase automation workflow.',
    'Calculate projected time savings and explain the recovered-capacity vs cash-saved distinction accurately.',
    'Apply a risk and control checklist to a planned automation rollout.',
    'Produce a written first-phase automation recommendation with a 30-day implementation roadmap.',
  ],

  safetyDisclaimer:
    'Instructional materials only. BrightPath Training Center is a teaching case — not confidential data about any real organization. Do not upload real employer or learner data into unsecured tools. Always follow your organization\'s data governance, privacy, financial sign-off, and change management rules before acting on any automation recommendation.',

  completionRequirements: {
    progression: 'sequential',
    rule:
      'Complete every lesson in Modules 1–4 (mark as studied), complete all module practice labs, pass the Module 5 application quiz at 75% or higher, then confirm your learner practice artifact on the Module 5 page to unlock the Certificate of Completion.',
    passThreshold:
      '75% or higher on the Module 5 quiz: 9 or more correct answers out of 12. Modules 1–4 have structured practice labs without auto-graded quizzes. Your aggregate score across all scored quiz attempts must remain at 75% or higher.',
    capstone:
      'Module 5: complete the "Redesign a Manual Workflow for Automation" eight-question practice exercise using the BrightPath dataset, then confirm completion in the course UI. This is a learner self-check until an upload flow exists.',
  },

  assessmentApproach:
    'Twelve application-focused scenario questions in Module 5 test the ability to apply course concepts — not recall definitions. Each question includes an explanation after submission. Modules 1–4 use structured practice labs to build the case analysis progressively before the quiz.',

  capstoneDescription:
    'The capstone-equivalent practice is a complete written automation analysis using the BrightPath dataset: identify the highest-workload and highest-error tasks, score automation candidates, name the data quality prerequisites, design the first-phase plan, and state a two-sentence recommendation. The artifact should be specific enough that a manager could use it as the basis for an automation proposal meeting.',

  microWorkshopDetail: {
    cardSubtitle:
      'Analyze a manual workflow, score automation opportunities, calculate time and cost impact, manage implementation risk, and recommend a practical 30-day automation plan.',
    cardMeta: '45–60 min · Beginner–Intermediate · Professional micro-course · Certificate',
    cardTags: ['Business process automation', 'workflow analysis', 'operations', 'productivity'],
    whoThisIsFor: [
      'Managers who need to build the business case for automating a manual team workflow',
      'Founders and operations staff who want a structured framework rather than a tool recommendation list',
      'Admin and coordination staff who can identify the problem but need to frame it convincingly for decision-makers',
    ],
    caseStudy: {
      headline: 'BrightPath Training Center',
      businessType: 'Small professional training and certification provider',
      revenueStreams: [
        'Short professional courses',
        'Certification programs',
        'Workshop-based training',
      ],
      salesChannels: ['WhatsApp enquiries', 'Walk-in', 'Referrals', 'Social media'],
      centralProblem:
        'BrightPath\'s three admin staff spend 75.3 hours per month on manual enquiry response, registration, payment confirmation, class reminders, attendance tracking, certificate preparation, and feedback collection. Error and delay rates range from 7% to 20% across tasks. As learner volume grows, the workflow cannot scale without automation.',
      diagnosisFraming:
        'This course treats BrightPath as a structured analysis — not a tool recommendation exercise. You will measure the baseline, score candidates on suitability, design the after workflow, calculate impact honestly, identify risks, and produce a sequenced implementation plan.',
    },
    analyticsMethods: [
      'Manual workload calculation (volume × minutes ÷ 60)',
      'Error and delay rate analysis',
      'Bottleneck identification',
      'Automation suitability scoring (5-dimension framework)',
      'Impact vs effort matrix analysis',
      'Trigger-action-exception workflow design',
      'Time savings projection',
      'Recovered capacity vs cash savings distinction',
      'Risk and control checklist',
      'Change management planning',
      '30-60-90 day implementation roadmap',
      'Executive recommendation writing',
    ],
    visualsInDeck: [
      'Before workflow map (BrightPath manual process)',
      'Workload data table (8 tasks, hours, error rates)',
      'Manual workload bar chart by task',
      'Error and delay rate heatmap',
      'Bottleneck identification diagram',
      'Human vs automation decision framework',
      'Automation suitability scoring table',
      'Impact vs effort matrix (8 BrightPath candidates)',
      'After workflow map (redesigned process)',
      'Projected time savings chart (before vs after)',
      'Labor value recovery calculation',
      'Risk and control checklist',
      '30-60-90 day roadmap',
      'Executive recommendation summary',
      'Learner practice redesign prompt',
    ],
    learnerPractice: {
      title: 'Redesign a Manual Workflow for Automation',
      artifactTitle: 'BrightPath Automation Recommendation',
      prompt:
        'Using the BrightPath dataset, answer all eight analysis questions: identify the highest-workload and highest-error tasks, choose the best first-phase candidate and explain why, name the task affecting learner experience most when it fails, identify what must stay partly human-led, specify the data quality prerequisites, draft the first 30-day plan, and state your final first-phase recommendation in two sentences.',
      metricsChecklist: [
        'Monthly workload hours per task',
        'Error and delay rates',
        'Volume per task',
        'Automation reduction percentage',
        'Hours saved per task',
        'Total hours recovered',
        'Labor value at $18/hour',
        'First-phase dependency logic',
      ],
    },
    quizSummary:
      'Twelve application-focused scenario questions in Module 5. Passing threshold: 75% (9 or more correct of 12). Each question includes an explanation after submission.',
    suggestedNextCourses: [
      {
        title: 'Business Analytics for Decision-Making',
        href: '/learn/courses/business-analytics-decision-making',
        subtitle: 'Apply data analysis to business performance diagnosis and decision-making',
      },
      {
        title: 'Business Builder (flagship path)',
        href: '/learn/courses/business-builder',
        subtitle: 'Operating model, scaling decisions, and building systems that work without you',
      },
      {
        title: 'Money and Finance (flagship path)',
        href: '/learn/courses/money-and-finance',
        subtitle: 'Financial judgment for managers making cost, investment, and ROI decisions',
      },
    ],
  },

  moduleMap: BUSINESS_PROCESS_AUTOMATION_MODULES.map((m) => ({
    number: m.moduleNumber,
    slug: m.slug,
    title: m.title,
  })),
  modules: BUSINESS_PROCESS_AUTOMATION_MODULES,
}

export { BUSINESS_PROCESS_AUTOMATION_SLUG, BUSINESS_PROCESS_AUTOMATION_INTERNAL_KEY } from './businessProcessAutomationConstants'
