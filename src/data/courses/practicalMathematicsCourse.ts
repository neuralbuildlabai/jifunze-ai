/**
 * Practical Mathematics for Life, Work, and Business — standalone Jifunze course.
 *
 * This course is independent of the existing flagship catalog. It does not share progression keys,
 * curriculum types, or capstone rubric ids with `ai-essentials`, `smart-workflows-with-ai`, or any
 * other flagship course.
 *
 * Source-of-truth export: `practicalMathematicsCourse`. Consumers that need to render in the existing
 * flagship discovery UI should use the catalog adapter (`standaloneCoursesCatalog.ts`) which maps
 * this course onto a learner-catalog row without mutating flagship fixtures.
 */

import {
  PRACTICAL_MATH_INTERNAL_KEY,
  PRACTICAL_MATH_MODULE_SLUGS,
  PRACTICAL_MATH_SLUG,
} from './practicalMathematicsCourseConstants'
import { PRACTICAL_MATH_MODULES_01_04 } from './practicalMathematicsCourseModules01_04'
import { PRACTICAL_MATH_MODULES_05_08 } from './practicalMathematicsCourseModules05_08'
import { PRACTICAL_MATH_MODULES_09_12 } from './practicalMathematicsCourseModules09_12'
import { PRACTICAL_MATH_MODULES_13_16 } from './practicalMathematicsCourseModules13_16'
import type {
  PracticalMathematicsCourse,
  StandaloneCourseModule,
} from './practicalMathematicsCourseTypes'

const MODULES: StandaloneCourseModule[] = [
  ...PRACTICAL_MATH_MODULES_01_04,
  ...PRACTICAL_MATH_MODULES_05_08,
  ...PRACTICAL_MATH_MODULES_09_12,
  ...PRACTICAL_MATH_MODULES_13_16,
]

export const practicalMathematicsCourse: PracticalMathematicsCourse = {
  slug: PRACTICAL_MATH_SLUG,
  internalKey: PRACTICAL_MATH_INTERNAL_KEY,
  isolation: {
    type: 'standalone',
    doesNotAffect: ['ai-essentials', 'smart-workflows-with-ai'],
  },
  title: 'Practical Mathematics for Life, Work, and Business',
  accessLabel: 'Free',
  estimatedHours: 50,
  level: 'Foundational to Intermediate',
  school: 'Career & Practical Skills',
  format: 'Self-paced structured course',
  certificate: 'Certificate of Completion',
  prerequisites: ['Basic arithmetic: addition, subtraction, multiplication, division'],

  description:
    'Practical Mathematics for Life, Work, and Business is a career-focused numeracy course for adults who need to use math confidently in real situations — not abstract puzzles. Across 16 structured modules you build number sense, fractions and percentages, ratios and proportions, measurement and unit conversions, personal finance, business math, spreadsheet skills, workplace problem-solving, data interpretation, scheduling and project planning, advanced business math, and applied numeracy for real estate, healthcare costs, and construction trades. The course closes with an integration capstone that asks you to combine these skills on real decisions: a household budget, a small-business pricing plan, a project timeline, or a property or job-cost analysis. The tone is adult, warm, and confidence-building — designed for learners who may have struggled with school math and want a clean restart aimed at life, work, and business.',

  targetAudience: [
    'Adults rebuilding confidence with numbers after time away from formal study',
    'Job seekers preparing for roles that require everyday numeracy',
    'Entrepreneurs and small-business owners pricing, budgeting, and forecasting',
    'Freelancers and consultants setting rates, tracking invoices, and managing cash',
    'Working professionals who need stronger spreadsheet, data, and workplace math skills',
    'Project coordinators planning timelines, resources, and budgets',
    'Tradespeople and field workers doing measurement, estimation, and quoting',
    'Learners in Kenya, the US, and globally who need adaptable, real-world math',
  ],

  learningOutcomes: [
    'Perform everyday and workplace calculations with accuracy and confidence',
    'Convert fluently between fractions, decimals, and percentages and apply them to discounts, markups, and rates',
    'Use ratios, proportions, and unit rates to compare options and scale quantities',
    'Apply measurement, units, and conversions across metric, US customary, and mixed contexts',
    'Build a personal budget, evaluate borrowing, and reason about taxes and savings as a learner — not in place of professional advice',
    'Apply core business math: cost, price, margin, markup, breakeven, and basic forecasting',
    'Use spreadsheets for calculations, formulas, lookups, and clear reporting',
    'Diagnose and solve workplace numeric problems using a structured method',
    'Read, interpret, and critique charts, tables, averages, and basic statistics',
    'Plan time, schedules, projects, and resources using realistic estimates and buffers',
    'Reason about advanced business math, property math, healthcare cost math, and trade math at a learner level — and recognise when to escalate to a licensed professional',
    'Combine the above skills in a small capstone that mirrors a real life, work, or business decision',
  ],

  safetyDisclaimer:
    'This course is for educational purposes only. It does not replace professional financial, legal, medical, tax, construction, engineering, real estate, or investment advice. Examples may use US dollars, Kenyan shillings, or neutral currency labels; tax rules, interest rates, insurance rules, building codes, healthcare protocols, and labour rules vary by country and change over time. Verify important decisions with qualified professionals and follow local regulations, workplace policies, and safety standards before acting on any calculation in this course.',

  completionRequirements: {
    progression: 'sequential',
    rule:
      'Study every lesson (mark as studied), pass each module quiz at 75% or higher, keep your overall quiz average at 75% or higher, complete the Module 16 capstone artifact, then mark the capstone complete in the app to unlock the printable Certificate of Completion.',
    passThreshold:
      '75% or higher on each module quiz: ceil(0.75 × N) correct answers, where N is the quiz length. Weighted overall score across all module quizzes must be 75% or higher. There is no 70% bar and no separate “6 of 8” shortcut for this course.',
    capstone:
      'Module 16: produce your integration artifact (question, numbers, calculations, assumptions, limits, professional verification list), then confirm completion in the course UI. This is a learner self-check until an upload flow exists.',
  },

  assessmentApproach:
    'Each module has 8–12 quiz questions mixing multiple choice, short answer, calculation, and applied scenario items. Most quizzes include at least two medium/hard items that require interpretation or multi-step reasoning. Every question has a written explanation linked back to the lesson where the skill was taught.',

  capstoneDescription:
    'The Module 16 capstone asks you to choose one real or realistic decision (a household budget, small-business pricing plan, project timeline with resources, property or rental analysis, healthcare cost comparison, or trade quote) and produce a short, reviewable artifact: the question, the numbers, the calculations, the assumptions, the limits of your analysis, and what you would still verify with a qualified professional before acting.',

  moduleMap: PRACTICAL_MATH_MODULE_SLUGS.map((slug, index) => {
    const m = MODULES.find((mm) => mm.slug === slug)
    if (!m) throw new Error(`practicalMathematicsCourse: missing module for slug ${slug}`)
    return { number: index + 1, slug: m.slug, title: m.title }
  }),

  modules: MODULES,
}

export {
  PRACTICAL_MATH_SLUG,
  PRACTICAL_MATH_INTERNAL_KEY,
  PRACTICAL_MATH_MODULE_SLUGS,
} from './practicalMathematicsCourseConstants'
