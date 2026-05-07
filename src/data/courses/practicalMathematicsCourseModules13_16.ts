/**
 * Practical Mathematics — Modules 13–16 (real estate, healthcare, trades, capstone).
 * Internal split for readability; combined in `practicalMathematicsCourse.ts`.
 */

import type { StandaloneCourseModule } from './practicalMathematicsCourseTypes'

export const PRACTICAL_MATH_MODULES_13_16: StandaloneCourseModule[] = [
  // ============================================================
  // MODULE 13 — Real Estate and Property Math
  // ============================================================
  {
    moduleNumber: 13,
    slug: 'real-estate-property-math',
    title: 'Real Estate and Property Math',
    durationMinutes: 165,
    level: 'Intermediate',
    prerequisites: ['advanced-business-math'],
    safetyNote:
      'Real estate calculations in this module are educational examples only. They do not constitute financial, legal, mortgage, tax, insurance, valuation, or licensed real-estate advice. Mortgage terms, property tax rates, insurance products, transfer taxes, capital-gains rules, landlord-tenant law, and rent-control rules vary widely by country, state, county, and year. Validate any property purchase, sale, financing, valuation, or rental decision with licensed real-estate, mortgage, legal, and tax professionals using current local data.',
    overview:
      'For buyers, renters considering buying, small landlords, and anyone who has to read a real-estate transaction. Compute mortgage payments and total interest, full PITI cost of homeownership, affordability using the 28/36 rule, rental cash flow with realistic reserves, cap rate and ROI, equity and LTV ratios, and read closing costs.',
    whyThisMatters: [
      'Most homebuyer disappointment comes from confusing mortgage payment with PITI.',
      'Affordability rules of thumb keep buyers from overcommitting in a hot market.',
      'Rental cash-flow analysis with realistic reserves is the difference between profitable rentals and cash-trap rentals.',
      'Cap rate normalises rental investments across price ranges and markets.',
      'LTV, equity, and closing costs are the basic literacy of any property transaction.',
    ],
    learningObjectives: [
      'Calculate monthly mortgage payments and total interest',
      'Compare 15-year vs 30-year mortgages',
      'Compute full PITI plus HOA cost of homeownership',
      'Apply the 28/36 affordability rule',
      'Compute rental cash flow including reserves',
      'Compute cap rate, cash-on-cash return, and basic property ROI',
      'Read LTV, equity, and closing-cost lines',
    ],
    lessons: [
      {
        lessonNumber: '13.1',
        title: 'Mortgages and Total Cost of Borrowing',
        estimatedMinutes: 35,
        learnerGoal: 'Compute monthly mortgage payments, compare term lengths, understand PMI.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Mortgage anatomy',
            title: 'Principal, rate, term, payment',
            content: 'Long amortising loan secured by property.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: '$280k at 6.5% / 30 yr',
            content: 'Payment ≈ $1,769.88. Total ≈ $637,157. Interest ≈ $357,157.',
          },
          {
            type: 'worked_example',
            eyebrow: '15 vs 30 years',
            title: 'Same loan, very different total cost',
            content:
              '$250k at 6%. 30-yr: $1,498.88/mo, total $539,595, interest $289,595. 15-yr: $2,109.64/mo, total $379,735, interest $129,735.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'PMI',
            title: 'Private mortgage insurance below 20% down',
            content: '$270k loan × 0.5% / 12 ≈ $112.50/mo. Removable at 80% LTV.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Read a mortgage quote',
            content:
              "$300k at 7%/30 yr → $1,995.91/mo. Total interest ≈ $418,528.",
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Mortgage traps',
            content: 'Choosing 30-year because monthly looks lower without checking total interest.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Buying, refinancing, comparison shopping',
            content: 'A 1-pp lower rate saves tens of thousands.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Compare two real mortgage quotes',
            content: 'Use a calculator for 15 vs 30 at current rates.',
            answerKey:
              'Lesson anchors: $280k @ 6.5%/30 → ≈$1,769.88/mo, total interest ≈$357k vs principal $280k. $250k @ 6%: 30-yr ≈$1,498.88/mo ($289.6k interest); 15-yr ≈$2,109.64/mo ($129.7k interest) — shorter term saves ≈$160k interest for ≈$611/mo higher payment.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 13.1 summary',
            title: 'Term and rate, then total cost',
            content: 'Term and rate determine total cost more than monthly payment alone.',
          },
        ],
      },
      {
        lessonNumber: '13.2',
        title: 'Total Cost of Homeownership and Affordability',
        estimatedMinutes: 30,
        learnerGoal: 'Compute full PITI + HOA, apply 28/36, reason about realistic budgets.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'PITI plus HOA',
            title: 'The number to budget against',
            content: 'P + I + tax + insurance + HOA + maintenance reserve (~1%/yr).',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: '$400k home, 20% down, 6.5% / 30 yr',
            content:
              'Loan $320k; P&I ≈ $2,022.50. Tax 1.2% = $400/mo; insurance $150; HOA $250. PITI+HOA ≈ $2,822.50/mo. + maintenance ≈ $333/mo → $3,156/mo.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Affordability rules',
            title: '28% / 36% guidance',
            content: 'Housing ≤ 28% gross monthly. Total debt ≤ 36% gross.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: '$100k income → affordable home',
            content:
              'Gross $8,333/mo. 28% = $2,333. With $500 other debt, 36% rule allows $2,500. Lower wins. Less tax+insurance ≈ $500 → $1,833 P&I → loan ≈ $290k → home ~$362,500.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Compute your own ceiling',
            content: 'Apply 28/36 to your gross.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Affordability traps',
            content: 'Forgetting maintenance reserve.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Pre-approval vs reality',
            content: 'Pre-approval is a ceiling; budget is a floor.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build your real housing budget',
            content: 'Compute PITI+HOA+maintenance for a target home.',
            answerKey:
              'Lesson $400k / 20% down / 6.5%/30: P&I ≈$2,022.50 + tax $400 + ins $150 + HOA $250 + maint ~$333 → ≈$3,156/mo. 28% of $8,333 gross = $2,333 ceiling — compare your PITI+reserve to that line.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 13.2 summary',
            title: 'Five lines, one budget',
            content: 'Buy under the line; protect cash flow.',
          },
        ],
      },
      {
        lessonNumber: '13.3',
        title: 'Rental Property Cash Flow, Cap Rate, and ROI',
        estimatedMinutes: 35,
        learnerGoal: 'Analyse a rental using cash flow, cap rate, and cash-on-cash.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Real cash flow',
            title: 'Income minus all reserves',
            content:
              'Cash flow = rent − (mortgage + tax + insurance + HOA + management + maintenance + vacancy).',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: '$250k rental, 25% down',
            content:
              'Loan $187,500 at 7%/30 yr → P&I ≈ $1,247. Tax $250, ins $125, HOA $100, mgmt 10% $220, maint 5% $110, vac 5% $110. Total $2,162. Rent $2,200 → cash flow $38/mo. CoC = $456 / $62,500 ≈ 0.73%.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Cap rate',
            title: 'NOI ÷ purchase price',
            content: '$30k rent − $12k expenses = $18k NOI ÷ $300k = 6%.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'ROI lenses',
            title: 'Cash-on-cash, total return, IRR',
            content: 'Cash-on-cash = annual cash flow ÷ cash invested.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Pressure-test the rent',
            content: 'Vacancy 5% → 10% drops cash flow ~$110.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Rental analysis traps',
            content: 'Skipping reserves.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'First rental, refinance, sale',
            content: 'First-time landlords need this to avoid loss-making investments.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build one rental analysis',
            content: 'Real or realistic rental: cash flow with reserves, cap rate, CoC. Stress-test.',
            answerKey:
              'Lesson deal: rent $2,200; cash out P&I $1,247 + tax $250 + ins $125 + HOA $100 + mgmt $220 + maint $110 + vac $110 = $2,162; cash flow $38/mo; CoC ≈0.73% on $62,500 down. Vacancy 10% cuts rent $220 → cash flow negative — stress test shows reserve assumptions dominate.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 13.3 summary',
            title: 'Honest reserves; honest yields',
            content: 'If numbers only work without reserves, they do not actually work.',
          },
        ],
      },
      {
        lessonNumber: '13.4',
        title: 'Equity, LTV, Closing Costs, and Valuation Basics',
        estimatedMinutes: 30,
        learnerGoal: 'Compute equity and LTV, read closing-cost lines, estimate value with comparables.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Equity and LTV',
            title: 'Two views of the same number',
            content: '$400k home with $280k loan → equity $120k, LTV 70%.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Closing costs',
            title: 'Roughly 2–6% of loan',
            content: 'Lender fees, title, appraisal, transfer tax, escrow, prepaid items.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Comparative market analysis (CMA)',
            content:
              '2,000 sq ft subject. Comps avg $172/sq ft. Estimate $344,000. Adjust +$10k kitchen, −$8k roof, +$5k corner → $351,000.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Other valuation approaches',
            title: 'Income capitalisation and cost approach',
            content: 'NOI ÷ cap rate. Replacement cost − depreciation + land.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Compute LTV',
            content: 'Home $450k, loan $260k. Equity $190k; LTV ≈ 57.8%.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Valuation traps',
            content: 'Using stale comparables.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Buying, refinancing, equity loans',
            content: 'Refinancing largely an LTV calculation.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build one CMA',
            content: 'Pick a listing and three comps; compute average $/sq ft; apply.',
            answerKey:
              'Lesson CMA: 2,000 sq ft subject; comps avg $172/ft → $344k base; +$10k kitchen −$8k roof +$5k lot → ≈$351k. LTV check: loan ÷ appraised; equity = value − loan (e.g. $450k home, $260k loan → $190k equity, LTV ≈57.8%).',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 13.4 summary',
            title: 'Equity, LTV, comparables',
            content: 'Three small calculations behind most property conversations.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 13 Practice Lab — Buy or Rent the Numbers',
      durationMinutes: 35,
      learnerGoal: 'Run a homeowner and a rental analysis on realistic numbers.',
      scenarios: [
        {
          id: 'm13-lab-1',
          prompt:
            '$400k purchase, 20% down, 6.5%/30 yr; tax 1.2%; insurance $1,800/yr; HOA $250/mo; maintenance 1%.',
          answerKey: 'P&I $2,022.50; tax $400; ins $150; HOA $250; maintenance $333. Total ≈ $3,156/mo.',
        },
        {
          id: 'm13-lab-2',
          prompt:
            'Affordability: $100k gross, $500/mo other debt. Max housing under 28/36. Home price at 6.5%/30 yr (tax+ins ~$500).',
          answerKey: '$2,333 → $1,833 P&I → loan ~$290k → home ~$362,500.',
        },
        {
          id: 'm13-lab-3',
          prompt:
            '$250k rental, 25% down, 7%/30 yr; rent $2,200; tax $250, ins $125, HOA $100; mgmt 10%; maint 5%; vac 5%.',
          answerKey:
            'P&I $1,247; reserves $440; total $2,162. Cash flow $38/mo; CoC 0.73%.',
        },
        {
          id: 'm13-lab-4',
          prompt:
            'Cap rate: $300k purchase, $30k rent, $12k expenses.',
          answerKey: 'NOI $18k; cap 6%.',
        },
        {
          id: 'm13-lab-5',
          prompt: 'LTV: $450k home, $260k loan. Equity, LTV, PMI?',
          answerKey: 'Equity $190k; LTV 57.8%; PMI not required.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm13-q1',
        question: '$280k mortgage at 6.5%/30 yr ($1,769.88). Approximate total interest?',
        type: 'calculation',
        correctAnswer: '≈$357,157',
        explanation: '$1,769.88 × 360 − $280k.',
        relatedLesson: '13.1',
        difficulty: 'medium',
      },
      {
        id: 'm13-q2',
        question:
          '$250k at 6%. 30-yr $1,498.88/mo; 15-yr $2,109.64/mo. Which saves most, by how much?',
        type: 'scenario',
        options: ['30-yr ≈$160k', '15-yr ≈$160k', 'Both same', '15-yr ≈$40k'],
        correctAnswer: '15-yr ≈$160k',
        explanation: '30-yr total $539,595; 15-yr $379,735.',
        relatedLesson: '13.1',
        difficulty: 'medium',
      },
      {
        id: 'm13-q3',
        question:
          'PITI+HOA: $320k loan at 6.5%/30 yr ($2,022.50); 1.2% tax on $400k; ins $1,800/yr; HOA $250.',
        type: 'calculation',
        correctAnswer: '≈$2,822.50/month',
        explanation: '$2,022.50 + $400 + $150 + $250.',
        relatedLesson: '13.2',
        difficulty: 'medium',
      },
      {
        id: 'm13-q4',
        question: '28% rule on $100k gross annual.',
        type: 'calculation',
        correctAnswer: '≈$2,333/month',
        explanation: '$100k/12 × 0.28.',
        relatedLesson: '13.2',
        difficulty: 'easy',
      },
      {
        id: 'm13-q5',
        question:
          '$250k rental, $187,500 at 7%/30 yr ($1,247 P&I); $2,200 rent; tax $250, ins $125, HOA $100, mgmt 10%, maint 5%, vac 5%. Cash flow?',
        type: 'calculation',
        correctAnswer: '$38/month',
        explanation: 'Total $2,162; rent $2,200; cash flow $38.',
        relatedLesson: '13.3',
        difficulty: 'hard',
      },
      {
        id: 'm13-q6',
        question: '$300k property, $30k rent, $12k expenses. Cap?',
        type: 'calculation',
        correctAnswer: '6%',
        explanation: 'NOI $18k / $300k.',
        relatedLesson: '13.3',
        difficulty: 'medium',
      },
      {
        id: 'm13-q7',
        question: '$62,500 down, $456 annual cash flow. CoC?',
        type: 'calculation',
        correctAnswer: '≈0.73%',
        explanation: '$456 / $62,500.',
        relatedLesson: '13.3',
        difficulty: 'medium',
      },
      {
        id: 'm13-q8',
        question: '$450k home, $260k loan. Equity and LTV?',
        type: 'calculation',
        correctAnswer: 'Equity $190k; LTV ≈ 57.8%',
        explanation: 'Equity = value − loan; LTV = loan / value.',
        relatedLesson: '13.4',
        difficulty: 'easy',
      },
      {
        id: 'm13-q9',
        question: 'PMI on $270k loan at 0.5% annually. Monthly?',
        type: 'scenario',
        options: [
          '≈$112.50/mo; removed 80% LTV',
          '≈$1,350/mo; 50% LTV',
          '≈$112.50/yr; 100% LTV',
          'PMI not standard',
        ],
        correctAnswer: '≈$112.50/mo; removed 80% LTV',
        explanation: '$270k × 0.5% / 12.',
        relatedLesson: '13.1',
        difficulty: 'medium',
      },
      {
        id: 'm13-q10',
        question: 'CMA: 2,000 sq ft × $172 + adjustments +$10k − $8k + $5k.',
        type: 'calculation',
        correctAnswer: '≈$351,000',
        explanation: '$344k + $10k − $8k + $5k.',
        relatedLesson: '13.4',
        difficulty: 'hard',
      },
    ],
    moduleSummary:
      'You can compute monthly mortgage payments and total interest, model PITI + HOA + maintenance, apply 28/36, build rental cash flow with reserves, compute cap rate and CoC, and read LTV, equity, and CMA estimates.',
    completionChecklist: [
      'I can compute monthly mortgage payment and total interest for two terms.',
      'I can compute full PITI + HOA + maintenance reserve.',
      'I can apply 28/36 affordability rules.',
      'I can compute rental cash flow with reserves and cap rate.',
      'I can compute equity and LTV.',
    ],
  },

  // ============================================================
  // MODULE 14 — Healthcare and Medical Math
  // ============================================================
  {
    moduleNumber: 14,
    slug: 'healthcare-medical-math',
    title: 'Healthcare and Medical Math',
    durationMinutes: 150,
    level: 'Intermediate',
    prerequisites: ['real-estate-property-math'],
    safetyNote:
      'Healthcare calculations can affect patient safety. This module is for educational numeracy practice only. Clinical calculations must be verified by licensed professionals using approved workplace protocols. Do not use this course to make clinical decisions, administer medication, override prescriptions, or replace medical training.',
    overview:
      'Numeracy practice for medication math, BMI and basic health metrics, insurance plans, itemised bills, and HSA basics. The goal is a clearer-thinking patient and a better-informed client to clinicians — not a substitute for clinical training, prescribers, or licensed advisors.',
    whyThisMatters: [
      'Most adults are confused by their own insurance plan; a small amount of math removes most of the fog.',
      'Medication math at a numeracy level helps caregivers and patients double-check labels.',
      'BMI is easy to compute and easy to misinterpret without context.',
      'Itemised bills frequently contain errors; the patient is the last reviewer.',
      'HSA/FSA decisions are tax decisions disguised as benefits forms.',
    ],
    learningObjectives: [
      'Apply unit conversions and dose-by-weight arithmetic at a numeracy level (with safety caveats)',
      'Compute BMI in metric and imperial and interpret with full context',
      'Read deductible, copay, coinsurance, and OOP max',
      'Compute total annual cost across premium and out-of-pocket lines',
      'Compute IV drip rates as a numeracy exercise (with strong safety caveats)',
      'Reason about HSA tax savings at a learner level',
      'Verify itemised medical bills',
    ],
    lessons: [
      {
        lessonNumber: '14.1',
        title: 'Medication and Dose Math (Numeracy Only)',
        estimatedMinutes: 30,
        learnerGoal:
          'Practise dose-by-weight and unit-conversion arithmetic with strong safety boundaries.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Safety first',
            title: 'Numeracy practice — not clinical decision-making',
            content:
              'Real medication decisions are made by licensed professionals using approved references. Use this lesson to verify a label or double-check a caregiver note — never to set a dose.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Dose by weight',
            content:
              '70 kg × 5 mg/kg = 350 mg. 250 mg per 5 mL → 350 × (5/250) = 7 mL.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Unit conversion',
            content:
              '0.5 g = 500 mg. 250 mg capsules → 500/250 = 2 capsules.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'What protects patients',
            title: 'Two-person check, references, label-read-back',
            content:
              'Workflow protections live outside arithmetic.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Numeracy verification',
            content:
              '8 mg/kg × 25 kg = 200 mg. (Numeracy answer only.)',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Numeracy traps',
            content: 'Confusing mg with mcg (1,000× off).',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Caregiving, double-checking labels',
            content: 'Caregiver picking up a child medication can verify dose printed on label.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three numeracy reps',
            content:
              '(1) 60 kg × 4 mg/kg. (2) 0.25 g into 100-mg tablets. (3) 125 mg/5 mL → 200 mg.',
            answerKey: '240 mg; 2.5 tablets (clinically unusual; verify); 8 mL.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 14.1 summary',
            title: 'Math is the floor; safety is the structure',
            content: 'Get arithmetic right; respect the workflow.',
          },
        ],
      },
      {
        lessonNumber: '14.2',
        title: 'BMI, Heart Rate, and Health Metrics',
        estimatedMinutes: 25,
        learnerGoal: 'Compute BMI in two systems, target heart rate, and use health metrics with context.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'BMI',
            title: 'Two formulas',
            content:
              'Metric: kg ÷ m². Imperial: (lb ÷ in²) × 703. <18.5 underweight; 18.5–24.9 normal; 25–29.9 over; ≥30 obese. Population-level screening, not a diagnosis.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'BMI both ways',
            content:
              'Metric 75/1.75² ≈ 24.5. Imperial (180/4900)×703 ≈ 25.8.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Heart rate zones',
            title: 'Maximum and target',
            content: 'Max ≈ 220 − age. Moderate 50–70%; vigorous 70–85%.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Compute your BMI and zone',
            content: 'In your preferred system.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Metric traps',
            content: 'Treating BMI as a diagnosis.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Wellness checks, fitness apps',
            content: 'Useful starting points for conversation with a clinician.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three reps',
            content:
              '(1) BMI 80 kg / 1.80 m. (2) BMI 200 lb / 72 in. (3) Moderate zone for 35-yr-old.',
            answerKey: '≈24.7; ≈27.1; max ≈185, moderate ≈92–129.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 14.2 summary',
            title: 'Numbers with context',
            content: 'Pair formulas with clinical context.',
          },
        ],
      },
      {
        lessonNumber: '14.3',
        title: 'Health Insurance Math',
        estimatedMinutes: 35,
        learnerGoal: 'Compute total annual healthcare cost across premium, deductible, copay, coinsurance, OOP max.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Five lines of an insurance plan',
            title: 'Premium, deductible, copay, coinsurance, OOP max',
            content:
              'OOP max caps annual spend; insurer pays 100% after.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'A surgery year',
            content:
              'Premium $400/mo, ded $2k, coins 20%, OOP $6k. $30 copay + $25k surgery + $500 follow-ups. Premiums $4,800. OOP $6,000. Total $10,800.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Plan-shopping math',
            title: 'Compare two plans by total annual cost',
            content: 'Healthy years favour high-deductible; high-use favour low-deductible.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'HSA/FSA basics',
            title: 'Tax-advantaged medical savings',
            content: '$3,850 HSA at 22% saves $847 in taxes.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Compute one year',
            content:
              '$300/mo, $1,500 ded, 30% coins, $5,000 OOP max, $8,000 bills. ≈$7,050 patient.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Insurance traps',
            content: 'Picking by premium alone.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Open enrolment and care decisions',
            content: 'Plug expected events into each plan.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Compare two plans',
            content: 'At low/medium/high usage. Which wins at each level?',
            answerKey:
              'Lesson surgery year: premiums $4,800 + OOP capped $6,000 → $10,800 total. Low-use year might be premiums + one or two copays only (<ded). High-use year hits OOP max early — compare which plan reaches max faster and whether HSA tax savings ($3,850×22%≈$847) changes the ranking.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 14.3 summary',
            title: 'Five lines, one annual number',
            content: 'Verify with your insurer before signing.',
          },
        ],
      },
      {
        lessonNumber: '14.4',
        title: 'Bills, IV Math (Numeracy), and Healthcare Planning',
        estimatedMinutes: 30,
        learnerGoal:
          'Verify itemised bills, practise IV drip-rate arithmetic with safety caveats, reason about healthcare planning.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Read the itemised bill',
            title: 'Charges, adjustments, deductible, coinsurance',
            content: 'Patient is often the final reviewer.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'An ER bill',
            content:
              '$3,000 charges, 40% adjustment → $1,800. $500 ded. Coins 20% × $1,300 = $260. Patient $760.',
          },
          {
            type: 'worked_example',
            eyebrow: 'IV drip-rate (numeracy)',
            title: 'Convert order to drops/min',
            content:
              '1,000 mL / 8 h = 125 mL/h. × 15 drops/mL ÷ 60 = 31.25 → 31 drops/min. Numeracy only.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Generic vs brand savings',
            title: 'Quick math on prescriptions',
            content: '$40 vs $25/mo brand vs generic = $180/yr savings.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Verify a bill',
            content:
              '$3,000 charges, 40% adjustment, $500 ded, 20% coins → $760.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Bill and IV traps',
            content: 'Paying sticker not adjusted. Treating IV math as licensure.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Hospital bills, refills, family budgets',
            content: 'Verifying a hospital bill saves money.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Verify one real bill',
            content: 'Verify charges → adjusted → ded → coins → patient.',
            answerKey:
              'Lesson ER path: $3,000 × (1−0.40) = $1,800 adjusted. After $500 ded → $1,300 subject to 20% coins → $260. Patient pays $500 + $260 = $760 (plus any copays listed separately).',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 14.4 summary',
            title: 'Patients verify; clinicians administer',
            content: 'Verify math; clinicians administer.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 14 Practice Lab — Plan, Bill, and Budget',
      durationMinutes: 35,
      learnerGoal: 'Apply BMI, insurance, and bill-verification math.',
      scenarios: [
        {
          id: 'm14-lab-1',
          prompt: 'BMI for 1.78 m / 82 kg and 71 in / 195 lb.',
          answerKey: 'Metric ≈25.9; imperial ≈27.1.',
        },
        {
          id: 'm14-lab-2',
          prompt:
            '$350/mo premium, $1,500 ded, 25% coins, $5,500 OOP. $50 copay + $12,000 procedure + $300 follow-ups.',
          answerKey: 'Premium $4,200 + OOP ~$4,175 + small follow-ups ≈ $8,500–$8,800.',
        },
        {
          id: 'm14-lab-3',
          prompt:
            'Bill: $4,000 charges, 35% adjustment, $700 deductible, 20% coins.',
          answerKey:
            'Adjusted $2,600. After ded $1,900 × 20% = $380. Patient $1,080.',
        },
        {
          id: 'm14-lab-4',
          prompt: 'IV: 750 mL over 6 h; 20 drops/mL.',
          answerKey: '125 mL/h × 20 / 60 ≈ 41.67 → 42 drops/min (numeracy only).',
        },
        {
          id: 'm14-lab-5',
          prompt: '$40 vs $20/mo brand vs generic. Annual savings + questions to ask?',
          answerKey:
            '$240/yr. Ask: therapeutic equivalence; formulation; coverage.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm14-q1',
        question: '60 kg × 4 mg/kg total dose (numeracy)?',
        type: 'calculation',
        correctAnswer: '240 mg',
        explanation: '60 × 4.',
        relatedLesson: '14.1',
        difficulty: 'easy',
      },
      {
        id: 'm14-q2',
        question: '0.5 g to mg.',
        type: 'calculation',
        correctAnswer: '500 mg',
        explanation: '× 1,000.',
        relatedLesson: '14.1',
        difficulty: 'easy',
      },
      {
        id: 'm14-q3',
        question: 'BMI 75 kg / 1.75 m. Value and category?',
        type: 'calculation',
        correctAnswer: '≈24.5 (normal)',
        explanation: '75 / 3.0625.',
        relatedLesson: '14.2',
        difficulty: 'easy',
      },
      {
        id: 'm14-q4',
        question: 'Max HR for 40-yr-old; moderate zone?',
        type: 'calculation',
        correctAnswer: 'Max ≈180; moderate 90–126',
        explanation: '220 − 40; 50–70%.',
        relatedLesson: '14.2',
        difficulty: 'medium',
      },
      {
        id: 'm14-q5',
        question:
          '$400/mo, $2k ded, 20% coins, $6k OOP max. $30 copay + $25k surgery + $500 follow-ups. Annual?',
        type: 'scenario',
        options: ['≈$10,800', '≈$6,000', '≈$4,800', '≈$25,000'],
        correctAnswer: '≈$10,800',
        explanation: 'Premiums $4,800 + OOP $6,000.',
        relatedLesson: '14.3',
        difficulty: 'hard',
      },
      {
        id: 'm14-q6',
        question: 'HSA $3,850 at 22% saves?',
        type: 'calculation',
        correctAnswer: '≈$847',
        explanation: '$3,850 × 0.22.',
        relatedLesson: '14.3',
        difficulty: 'medium',
      },
      {
        id: 'm14-q7',
        question:
          'ER bill: $3,000 charges, 40% adjustment, $500 ded, 20% coins.',
        type: 'calculation',
        correctAnswer: '≈$760',
        explanation: 'Adjusted $1,800; ded $500; coins $260.',
        relatedLesson: '14.4',
        difficulty: 'hard',
      },
      {
        id: 'm14-q8',
        question: 'IV: 1,000 mL / 8 h; 15 drops/mL.',
        type: 'calculation',
        correctAnswer: '≈31 drops/min',
        explanation: '125 × 15 / 60 = 31.25 (numeracy).',
        relatedLesson: '14.4',
        difficulty: 'medium',
      },
      {
        id: 'm14-q9',
        question: 'Brand $40/mo vs generic $25/mo. Annual savings?',
        type: 'calculation',
        correctAnswer: '$180/year',
        explanation: '($40 − $25) × 12.',
        relatedLesson: '14.4',
        difficulty: 'easy',
      },
      {
        id: 'm14-q10',
        question: "Module's rule about clinical use?",
        type: 'scenario',
        options: [
          'Use to set medication doses at home.',
          'Use to override prescriptions.',
          'Numeracy practice only; clinical decisions belong to licensed professionals.',
          'Use to skip professional verification.',
        ],
        correctAnswer:
          'Numeracy practice only; clinical decisions belong to licensed professionals.',
        explanation: 'Module is for clearer thinking, not clinical authority.',
        relatedLesson: '14.1',
        difficulty: 'medium',
      },
    ],
    moduleSummary:
      'You can do dose-by-weight and unit conversion at a numeracy level, compute BMI and target HR, model insurance, verify bills, run IV arithmetic, and reason about HSA tax savings.',
    completionChecklist: [
      'I treat clinical doses, IV rates, and prescription decisions as licensed-professional work.',
      'I can compute BMI in both systems with context.',
      'I can compute total annual healthcare cost across all five plan lines.',
      'I can verify the math on an itemised bill.',
      'I can sanity-check generic vs brand savings.',
    ],
  },

  // ============================================================
  // MODULE 15 — Construction and Trade Math
  // ============================================================
  {
    moduleNumber: 15,
    slug: 'construction-trade-math',
    title: 'Construction and Trade Math',
    durationMinutes: 165,
    level: 'Intermediate',
    prerequisites: ['healthcare-medical-math'],
    safetyNote:
      'Construction, structural, electrical, plumbing, HVAC, and code-related calculations must be verified by licensed professionals and local building codes. This module is educational only and does not qualify learners to perform regulated trade work.',
    overview:
      'Math to read trade work, estimate materials and labour, work with blueprints at scale, and reason about angles, slopes, and basic geometry.',
    whyThisMatters: [
      'Most material over- and under-orders come from a single area or volume miscalculation.',
      'Board feet, paint coverage, and concrete volume each have a small formula.',
      'Roof pitch, stair rise/run, and Pythagorean diagonals show up in every renovation.',
      'Blueprint scale errors lead to expensive cuts and reorders.',
      'Electrical, pipe, and HVAC calculations require licensed sign-off.',
    ],
    learningObjectives: [
      'Convert trade measurements (feet/inches, decimal feet, metric)',
      'Compute board feet, area, perimeter, and volume',
      'Estimate paint coverage, flooring, and concrete with waste',
      'Compute roof pitch, stair rise/run, and diagonals',
      'Read and convert blueprint scales',
      'Estimate small project labour and produce a learner-level quote',
    ],
    lessons: [
      {
        lessonNumber: '15.1',
        title: 'Trade Measurements and Conversions',
        estimatedMinutes: 25,
        learnerGoal: 'Convert and add trade measurements; compute board feet.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Two formats',
            title: 'Feet-and-inches vs decimal feet',
            content: '7 ÷ 12 ≈ 0.583. 0.5 × 12 = 6 in.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Adding cut lengths',
            content:
              '8 ft 3 in + 6 ft 9 in + 10 ft 5 in = 25 ft 5 in (305 in).',
          },
          {
            type: 'worked_example',
            eyebrow: 'Board feet',
            title: 'Lumber pricing unit',
            content: 'bf = (T × W × L_ft) ÷ 12. 2×10×12 = 20 bf at $4.50/bf = $90.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'One conversion',
            content: '14 ft 9 in = 14.75 ft.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Trade-conversion traps',
            content: 'Forgetting 0.5 ft = 6 in, not 5.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Estimating, framing, finishing',
            content: 'Every quote starts with measurements.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three conversion reps',
            content:
              '(1) 9 ft 6 in → decimal. (2) 5 ft 8 in + 3 ft 7 in + 11 ft 4 in. (3) 2×6×10 board feet.',
            answerKey: '9.5 ft; 20 ft 7 in; 10 bf.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 15.1 summary',
            title: 'Two formats, one habit',
            content: 'Pick a format; convert at boundaries; compute board feet.',
          },
        ],
      },
      {
        lessonNumber: '15.2',
        title: 'Area, Volume, and Materials Estimation',
        estimatedMinutes: 35,
        learnerGoal: 'Estimate flooring, paint, concrete with waste allowances.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Area for surfaces',
            title: 'Floors, walls, ceilings',
            content: 'Wall area = perimeter × height − doors/windows. Add 10% waste.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Flooring with waste',
            content:
              '15 × 20 = 300; +10% = 330 sq ft. L-shape: 12×15 + 8×10 = 260; +10% = 286.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Paint with two coats',
            content:
              '12×14×8 room; perimeter 52; wall 416 − 51 (windows + door) = 365 sq ft. 350/gal → 1.04/coat → 2.08 → buy 3 gallons.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Concrete volume',
            content:
              '20×15×0.333 = 100 cu ft = 3.7 cu yd; +10% allowance ≈ 4.1 cu yd.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Estimate one material',
            content: '16×18 = 288; +12% = 322.56 → order ~325 sq ft.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Estimation traps',
            content: 'Forgetting waste; forgetting to subtract doors/windows.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'DIY and trade quotes',
            content: 'Conservative rounding is professional.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three estimates',
            content:
              '(1) Flooring 20×24 +10%. (2) Paint 14×16×9, door 21, two windows 15 each, two coats. (3) Concrete 30×20×4 in.',
            answerKey:
              '480×1.10=528; wall 540−51=489 → 1.4/coat → 2.8 → 3 gal; 200 cu ft = 7.4 cu yd → ~8.2 with 10%.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 15.2 summary',
            title: 'Area, volume, and the waste allowance',
            content: 'Compute, subtract openings, add waste, round up.',
          },
        ],
      },
      {
        lessonNumber: '15.3',
        title: 'Pitch, Stairs, and Geometry',
        estimatedMinutes: 30,
        learnerGoal: 'Compute roof pitch, lay out stairs, and use Pythagoras.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Roof pitch',
            title: 'Rise over run',
            content: '6:12 = 0.5 slope; arctan(0.5) ≈ 26.57°.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Stair layout',
            content:
              '108 in rise / 7 in target = 15.43 → 16 risers; actual 6.75. Treads 15. Run 150 in = 12.5 ft. Verify against code.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Pythagoras for braces',
            content: '8² + 6² = 100; diag = 10 ft.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Stair check',
            content: '96/7 = 13.7 → 14 risers; 6.86 in actual.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Geometry traps',
            content: 'Confusing pitch with angle. Risers count one more than treads.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Roofing, decks, framing',
            content: 'Squaring foundations uses 3-4-5.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three reps',
            content:
              '(1) 8:12 pitch + angle. (2) 120 in rise, 7.5 in target. (3) Diag of 12×9.',
            answerKey: '0.667; ≈33.69°; 16 risers @ 7.5; 15 ft.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 15.3 summary',
            title: 'Three small geometries',
            content: 'Verify against local code before building.',
          },
        ],
      },
      {
        lessonNumber: '15.4',
        title: 'Blueprint Scale, Trade Calculations, and Quoting',
        estimatedMinutes: 35,
        learnerGoal:
          'Convert blueprint scale, read trade-specific calculations at learner level, produce a small quote.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Blueprint scale',
            title: 'Scale lets a 30-ft wall fit on a sheet',
            content: '1/4" = 1\' or 1/8" = 1\' common. Always verify the title block.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Read a wall length and a room area',
            content:
              '1/4" scale: 3.5 in → 14 ft. 2.5 × 3 in → 10 × 12 ft → 120 sq ft.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Trade-specific calculations',
            title: 'Read, do not sign off',
            content:
              'Electrical: amps × volts. 20 A × 120 V = 2,400 W max; continuous 80% = 1,920 W. Plumbing/HVAC: licensed work.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Small project quote',
            content:
              'Bathroom tile 170 sq ft × 1.10 = 187 sq ft × $5.50 = $1,029. Ancillary $200. Labour 16 × $50 = $800. Overhead 15% labour = $120. Subtotal $2,149. Contingency 10% = $215. Total ≈ $2,364 → $2,400.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Read one blueprint dimension',
            content: '1/8" scale, 4 in → 32 ft.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Trade and quoting traps',
            content: 'Wrong scale. Treating learner-level math as design authority.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'DIY budgets, renovation quotes, small jobs',
            content: 'Small contractors quote dozens of small jobs by template.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build one quote',
            content: 'Pick small job; estimate materials with waste, labour, overhead, contingency.',
            answerKey:
              'Lesson bathroom tile quote: materials 187 ft² × $5.50 = $1,029 + ancillary $200 + labour 16×$50 = $800 + OH 15%×labour $120 = $2,149; +10% contingency $215 → ≈$2,364 (round $2,400 bid).',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 15.4 summary',
            title: 'Read at scale, quote with discipline',
            content: 'Defer regulated work to licensed professionals.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 15 Practice Lab — A Complete Small Project',
      durationMinutes: 35,
      learnerGoal: 'Estimate, lay out, and quote a complete small project end-to-end.',
      scenarios: [
        {
          id: 'm15-lab-1',
          prompt: 'Total cut length: 8 ft 3 in + 6 ft 9 in + 10 ft 5 in. State both formats.',
          answerKey: '25 ft 5 in = 25.42 ft.',
        },
        {
          id: 'm15-lab-2',
          prompt: 'Flooring 15 × 20 ft, 10% waste.',
          answerKey: '330 sq ft.',
        },
        {
          id: 'm15-lab-3',
          prompt:
            'Paint 12×14×8 ft; two windows 15 sq ft, one door 21 sq ft; 350 sq ft/gal; two coats.',
          answerKey: 'Wall 416 − 51 = 365. 1.04/coat → 2.08 → 3 gallons.',
        },
        {
          id: 'm15-lab-4',
          prompt: 'Concrete 20×15×4 in slab; cubic yards; +10% allowance.',
          answerKey: '100 cu ft = 3.7 cu yd; +10% ≈ 4.1.',
        },
        {
          id: 'm15-lab-5',
          prompt:
            'Stair 108 in: target 7 in riser, 10 in tread.',
          answerKey: '16 risers @ 6.75; 15 treads @ 10; total run 150 in = 12.5 ft.',
        },
        {
          id: 'm15-lab-6',
          prompt:
            'Tile job: 170 sq ft, 10% waste, $5.50/sq ft, $200 ancillary, 16 h × $50, 15% overhead, 10% contingency.',
          answerKey: 'Tile $1,029 + ancillary $200 + labour $800 + overhead $120 = $2,149. Contingency $215. ≈ $2,400.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm15-q1',
        question: '12 ft 7 in to decimal feet.',
        type: 'calculation',
        correctAnswer: '≈12.583 ft',
        explanation: '7/12 ≈ 0.583.',
        relatedLesson: '15.1',
        difficulty: 'easy',
      },
      {
        id: 'm15-q2',
        question: 'Board feet of 2×10×12.',
        type: 'calculation',
        correctAnswer: '20 bf',
        explanation: '(2×10×12) / 12.',
        relatedLesson: '15.1',
        difficulty: 'medium',
      },
      {
        id: 'm15-q3',
        question: 'Flooring 15×20 with 10% waste.',
        type: 'calculation',
        correctAnswer: '330 sq ft',
        explanation: '300 × 1.10.',
        relatedLesson: '15.2',
        difficulty: 'easy',
      },
      {
        id: 'm15-q4',
        question: 'Concrete 20×15×4 in slab in cu yd.',
        type: 'calculation',
        correctAnswer: '≈3.7 cu yd',
        explanation: '100 / 27.',
        relatedLesson: '15.2',
        difficulty: 'medium',
      },
      {
        id: 'm15-q5',
        question: 'Roof rises 6 in over 12 in run. Pitch and angle?',
        type: 'calculation',
        correctAnswer: '6:12; ≈26.57°',
        explanation: 'arctan(0.5).',
        relatedLesson: '15.3',
        difficulty: 'medium',
      },
      {
        id: 'm15-q6',
        question: 'Stair 108 in, target 7 in. Risers and actual height?',
        type: 'calculation',
        correctAnswer: '16 risers; 6.75 in',
        explanation: '108/7 = 15.43 → 16; 108/16 = 6.75.',
        relatedLesson: '15.3',
        difficulty: 'hard',
      },
      {
        id: 'm15-q7',
        question: 'Diagonal of 6×8.',
        type: 'calculation',
        correctAnswer: '10 ft',
        explanation: '√100.',
        relatedLesson: '15.3',
        difficulty: 'easy',
      },
      {
        id: 'm15-q8',
        question: '1/4" scale, 3.5" wall. Real length?',
        type: 'calculation',
        correctAnswer: '14 ft',
        explanation: '3.5 / 0.25.',
        relatedLesson: '15.4',
        difficulty: 'medium',
      },
      {
        id: 'm15-q9',
        question: '20 A × 120 V max wattage; 80% continuous?',
        type: 'scenario',
        options: [
          '2,400 W max; 1,920 W continuous',
          '2,400 W max; 2,400 W continuous',
          '1,920 W max; 1,920 W continuous',
          'Cannot determine',
        ],
        correctAnswer: '2,400 W max; 1,920 W continuous',
        explanation: '20×120; ×0.8.',
        relatedLesson: '15.4',
        difficulty: 'hard',
      },
      {
        id: 'm15-q10',
        question:
          'Tile quote: 170 sq ft × 1.10 × $5.50 + $200 + 16×$50 + 15% × labour + 10% × subtotal.',
        type: 'calculation',
        correctAnswer: '≈$2,400',
        explanation: '$1,029 + $200 + $800 + $120 + $215 ≈ $2,364.',
        relatedLesson: '15.4',
        difficulty: 'hard',
      },
    ],
    moduleSummary:
      'You can convert and add trade measurements, compute board feet, estimate area/volume with waste, lay out roofs and stairs at numeracy level, read blueprint scale, and produce a small-project quote.',
    completionChecklist: [
      'I can convert and add feet-and-inches and decimal feet.',
      'I can compute board feet for lumber.',
      'I can estimate flooring, paint, concrete with waste.',
      'I can compute roof pitch, stair rise/run, and Pythagoras.',
      'I can read blueprint scale.',
      'I can produce a small-project quote with materials, labour, overhead, contingency.',
      'I treat regulated trade calculations as licensed work.',
    ],
  },

  // ============================================================
  // MODULE 16 — Final Integration and Mastery (Capstone)
  // ============================================================
  {
    moduleNumber: 16,
    slug: 'final-integration-mastery',
    title: 'Final Integration and Mastery',
    durationMinutes: 210,
    level: 'Intermediate',
    prerequisites: ['construction-trade-math'],
    safetyNote:
      'This capstone integrates skills from all 15 prior modules. Apply them carefully: identify your assumptions, label uncertainty, and name what must be verified by a qualified professional before acting. The capstone artifact you produce here is a learner exercise — not a binding business plan, financial projection, valuation, clinical decision, real-estate transaction, or trade quote. Before acting on any number you generate in the capstone, validate with the appropriate licensed advisor (financial, tax, legal, medical, real-estate, mortgage, or trade) using current local data and rules.',
    overview:
      'Integrate skills across the course on one substantial scenario. Produce a short reviewable artifact: question, numbers, calculations, assumptions, limits, and what you would still verify with a qualified professional.',
    whyThisMatters: [
      'Real decisions almost always combine four or five of the modules.',
      'The capstone proves to yourself that the skills are not silos.',
      'Naming your assumptions and limits is what separates a learner artifact from overconfident advice.',
      'A reviewable artifact is the same shape as professional deliverables.',
      'The 90-day plan keeps the skills warm after the course ends.',
    ],
    learningObjectives: [
      'Apply a 6-step problem-solving framework to a multi-step real-world scenario',
      'Integrate skills from at least four prior modules into a single artifact',
      'State assumptions, label uncertainty, and name what requires professional verification',
      'Produce a written recommendation grounded in computed numbers',
      'Self-assess progress against the course learning outcomes',
      'Build a 90-day continued-practice plan',
    ],
    lessons: [
      {
        lessonNumber: '16.1',
        title: 'Integrated Problem-Solving Framework',
        estimatedMinutes: 30,
        learnerGoal: 'Apply a 6-step process integrating skills.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'The 6 steps',
            title: 'Understand → identify → plan → execute → verify → communicate',
            content:
              '1) Understand. 2) Identify modules. 3) Plan. 4) Execute. 5) Verify. 6) Communicate (Q/F/R/C).',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'A small expansion decision',
            content:
              'Coffee shop: $250k revenue, 15% margin. $75k expansion → +40% revenue, +$50k costs. Payback 1.5 yr; 5-yr NPV ≈ $114.5k. Recommend expand; note revenue assumption.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Run framework on your own decision',
            content: 'Walk through 6 steps in 5 minutes for a real decision.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Framework traps',
            content: 'Skipping understanding and solving the wrong problem.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Memos, board papers, contractor quotes',
            content: 'Every professional document worth reading.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Frame a decision',
            content: 'Pick a decision; write each step in one sentence.',
            answerKey:
              'Lesson expansion pattern: (1) Understand café capacity constraint. (2) Modules: revenue/cost (6), cash timing (11–12), risk (9). (3) Plan scenarios A/B. (4) Execute NPV sketch. (5) Verify against break-even cups/day. (6) Communicate Q/F/R/C in four sentences.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 16.1 summary',
            title: 'A repeatable method',
            content: 'Six steps; three sentences per step.',
          },
        ],
      },
      {
        lessonNumber: '16.2',
        title: 'Integrated Scenario A — Small Business',
        estimatedMinutes: 40,
        learnerGoal: 'Walk a small-business scenario through the framework.',
        blocks: [
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Launching a new product line',
            content:
              'Dev $150k; equipment $200k (5 yr SL); WC $50k. Variable $50/u; fixed $220k/yr. Demand 15,000/yr; price $89.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Build break-even',
            title: 'Module 6',
            content:
              'Contribution $39. Break-even ≈ 5,641 units / $502k. At 15k units: profit $365k. MoS 62%.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Cash flow and NPV',
            title: 'Modules 11 and 12',
            content:
              'Y0 −$400k. Y1–5 $405k (op profit + dep). Y5 +$70k recovery. NPV at 12% ≈ +$1.1M.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Sensitivity',
            title: 'Lower demand',
            content: '12,000 units → cash flow $288k/yr; NPV smaller but still positive.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Weakest assumption?',
            content: 'Demand at 15,000.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Integrated-scenario traps',
            content: 'Treating optimistic demand as expected.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Capital approvals',
            content: 'Founders making first product investments use it.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Run a sensitivity',
            content: 'Recompute NPV at 10,000 units; state if decision holds.',
            answerKey:
              'At 15k units lesson shows strong positive NPV. At 10k units revenue falls to $890k (10k×$89); variable $500k; contribution $390k; fixed $220k → operating cash still positive but materially lower — recompute full 5-yr NPV in a sheet; if NPV still >0 at your hurdle rate, decision can hold; if near zero, reject or defer until demand evidence improves.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 16.2 summary',
            title: 'Five modules in one decision',
            content: 'Revenue, cost, break-even, cash flow, NPV, sensitivity.',
          },
        ],
      },
      {
        lessonNumber: '16.3',
        title: 'Integrated Scenario B — Personal Finance and Property',
        estimatedMinutes: 35,
        learnerGoal: 'Walk personal finance integration: budget, debt, mortgage, rent vs buy.',
        blocks: [
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: "A 30-year-old's plan",
            content:
              '$4,000/mo net. Rent $1,400. Card $5,000 at 18%. Considering $300k home.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Budget and debt',
            title: 'Modules 5 and 7',
            content:
              'Card payoff at $400/mo: ~16 mo, ~$675 interest.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Home purchase',
            title: 'Module 13',
            content:
              '$300k, 20% down, 6.5%/30 yr → P&I $1,517 + tax $300 + ins $125 + (HOA 0–200) → PITI $1,942–$2,142. 28% on $4,000 net ≈ $1,400. Not yet supported.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'The honest call',
            title: 'Recommend with evidence',
            content:
              'Prioritise card payoff and emergency fund. Continue renting 18–24 months. Verify rate and tax.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Walk your own version',
            content: 'Apply the flow to your numbers.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Personal-integration traps',
            content: 'Buying too much house relative to net.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Year-end planning',
            content: 'Annual review combines budget, debt, savings, property goals.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build your own integration',
            content: 'State recommendation with caveats.',
            answerKey:
              'Lesson honest call: pay card $5k @18% aggressively ($400/mo clears ≈16 mo, ~$675 interest) before maxing housing; PITI on $300k with 20% down ≈$1,942–$2,142 vs 28% of $4k net ($1,120) — wait until debt cleared and emergency fund built; cite rate/tax verification with a lender and tax pro.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 16.3 summary',
            title: 'Personal decisions combine',
            content: 'Budget + debt + housing is one decision.',
          },
        ],
      },
      {
        lessonNumber: '16.4',
        title: 'Capstone Project Brief',
        estimatedMinutes: 60,
        learnerGoal:
          'Choose one capstone and produce a reviewable artifact integrating at least four modules.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Choose your capstone',
            title: 'Six menu options',
            content:
              '1) Household budget. 2) Small-business pricing. 3) Project timeline + resources. 4) Property analysis. 5) Healthcare cost comparison. 6) Trade quote.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Mini household budget (numbers only)',
            content:
              'Given: net $4,000/mo; rent $1,400; utilities $220; groceries $600; transport $280; debt payment $350.\n\nFormula: discretionary = net − fixed sum.\n\nSubstitute: fixed = 1,400 + 220 + 600 + 280 + 350 = 2,850.\n\nCalculate: 4,000 − 2,850 = 1,150.\n\nAnswer: $1,150/mo discretionary before savings goals.\n\nReasonableness: fixed is a bit under 3/4 of net — plausible; if discretionary were negative, the budget would be infeasible.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'What the artifact contains',
            title: 'Six deliverable parts',
            content:
              'Question. Inputs. Calculations. Assumptions. Findings. Recommendation with caveats and professional-verification list. 1–2 pages.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Self-assessment rubric',
            title: 'Five quality questions',
            content:
              "(1) ≥4 modules? (2) Assumptions named? (3) Verified vs inferred? (4) Professional verification list? (5) Could a colleague act on this?",
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Walk one capstone in 30 minutes',
            content:
              'Question 1 min; inputs 5; calculations 15; assumptions 3; recommendation+caveats 5; share for sanity-check 1.',
            answerKey:
              'Example time split for a 30-minute pass: Q 2m; inputs 6m; calcs 14m; assumptions 3m; recommendation 4m; buffer 1m. Adjust to your topic — keep calculations on paper or in a spreadsheet so you can audit steps.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Five-question rubric',
            content: 'Most learners produce a much stronger second pass.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Capstone traps',
            content: 'Topic too big. Skipping assumption-naming.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Real next-step decisions',
            content: 'Deciding which job offer; planning a renovation; opening a side business.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Produce your capstone artifact',
            content:
              'Write the artifact (1–2 pages). Save it. Reread after one week and update.',
            outputExpectation:
              'A 1–2 page reviewable artifact with question, inputs, calculations, assumptions, findings, recommendation, and professional-verification list.',
            answerKey:
              'Artifact must name ≥4 modules (e.g. 5 budget, 6 margin, 9 chart read, 11 cash flow), list assumptions (rates, demand), and end with “verify with: tax advisor / lender / licensed trade / clinician” as appropriate. Numeric thread should match your stated assumptions.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 16.4 summary',
            title: 'Real, small, reviewable',
            content: 'Pick one. Limit to two pages. Name assumptions. Recommend an action.',
          },
        ],
      },
      {
        lessonNumber: '16.5',
        title: 'Continued Learning and 90-Day Plan',
        estimatedMinutes: 25,
        learnerGoal: 'Build a personal continued-learning plan.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'What atrophies first',
            title: "Skills you don't reuse fade",
            content: 'Weekly 30 minutes on a real problem beats annual binge.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Weekly minutes add up',
            content:
              'Given: 30 minutes per week for 12 weeks.\n\nFormula: total hours H = (minutes × weeks) ÷ 60.\n\nSubstitute: (30 × 12) ÷ 60.\n\nCalculate: 360 ÷ 60 = 6.\n\nAnswer: 6 hours of deliberate practice in a quarter.\n\nReasonableness: 0.5 h × 12 = 6 h — matches.',
          },
          {
            type: 'concept_explanation',
            eyebrow: '90-day plan template',
            title: 'Three months of small commitments',
            content:
              'Month 1: Modules 1–4 + personal artifact. Month 2: Modules 5–8 + workplace review. Month 3: Modules 9–12 + data-driven recommendation.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Public next steps',
            title: 'What gets you better next',
            content:
              'Finance: deeper accounting/tax. Business: pricing, marketing, ops. Trades/property: licensed coursework. Health/care: appropriate clinical/admin training.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Pick three modules',
            content: 'Which three to revisit most? Why?',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Career conversations',
            content: 'Capstone artifact + 90-day plan changes appraisals and interviews.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Write your 90-day plan',
            content:
              'Three modules; weekly 30-min practice each; monthly artifact review; calendar reminders.',
            answerKey:
              'Sample: Modules 5 (budget), 6 (unit economics), 9 (data checks). Calendar: Tue 07:00–07:30 pricing review; Thu personal cash flow; last Friday monthly one-page artifact. 12 weeks × 1.5 h = 18 h logged practice (matches lesson 16.5 hours math).',
          },
          {
            type: 'reflection_or_application',
            eyebrow: 'Reflection',
            title: 'What changed?',
            content:
              "In one paragraph: which habits are different now? Which decisions will you make differently? Save alongside your capstone.",
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 16.5 summary',
            title: 'Small commitments, real maintenance',
            content: 'Capstone + 90-day plan = useful daily habit.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 16 Practice Lab — Capstone Production',
      durationMinutes: 60,
      learnerGoal: 'Produce the final capstone artifact.',
      scenarios: [
        {
          id: 'm16-lab-1',
          prompt: 'Choose one capstone topic. Write a one-sentence question.',
          answerKey:
            "Sample: 'Should I expand my catering side-business by adding two corporate clients this quarter?'",
        },
        {
          id: 'm16-lab-2',
          prompt: 'List inputs (numbers + sources). Note observed vs estimated.',
          answerKey:
            'Sample: revenue $X (observed), cost $Y/event (observed), capacity Z (estimated).',
        },
        {
          id: 'm16-lab-3',
          prompt: 'Run calculations using ≥4 modules. Show steps.',
          answerKey:
            'Modules 6 (revenue/cost), 9 (interpretation), 11 (cash flow), 12 (NPV).',
        },
        {
          id: 'm16-lab-4',
          prompt:
            '4-sentence recommendation (Q/F/R/C) + professional verification list.',
          answerKey:
            "Q: which clients? F: net contribution per client and capacity bottleneck. R: accept one this quarter. C: tax, contract, labour-law verification before signing.",
        },
        {
          id: 'm16-lab-5',
          prompt:
            '90-day plan with three modules and weekly 30-min practice each.',
          answerKey:
            'Sample: Modules 5, 6, 9. Weekly budgeting / pricing / data review. Monthly capstone review.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm16-q1',
        question: 'Most under-invested step?',
        type: 'multiple_choice',
        options: [
          'Step 4 — execute.',
          'Steps 1 and 2 — understand and identify.',
          'Step 6 — communicate.',
          'Step 5 — verify.',
        ],
        correctAnswer: 'Steps 1 and 2 — understand and identify.',
        explanation: 'Most decision errors come from solving the wrong problem.',
        relatedLesson: '16.1',
        difficulty: 'medium',
      },
      {
        id: 'm16-q2',
        question: '$75k cost / $50k cash flow. Payback?',
        type: 'calculation',
        correctAnswer: '1.5 years',
        explanation: '$75k / $50k.',
        relatedLesson: '16.2',
        difficulty: 'easy',
      },
      {
        id: 'm16-q3',
        question:
          '$89 price, $50 var, $220k fixed. Break-even units?',
        type: 'calculation',
        correctAnswer: '≈5,641 units',
        explanation: '$220k / $39.',
        relatedLesson: '16.2',
        difficulty: 'medium',
      },
      {
        id: 'm16-q4',
        question: 'Capstone min modules?',
        type: 'multiple_choice',
        options: ['1', '2', '4', 'All 15'],
        correctAnswer: '4',
        explanation: 'Genuine integration without unwieldy.',
        relatedLesson: '16.4',
        difficulty: 'easy',
      },
      {
        id: 'm16-q5',
        question: '$4,000 net; needs $2,300. Needs as percentage?',
        type: 'calculation',
        correctAnswer: '57.5%',
        explanation: '$2,300 / $4,000.',
        relatedLesson: '16.3',
        difficulty: 'medium',
      },
      {
        id: 'm16-q6',
        question: 'Why "professional verification list"?',
        type: 'scenario',
        options: [
          'Make it longer.',
          'Distinguish learner exercise from binding advice.',
          'Modules are inaccurate.',
          'Marketing label.',
        ],
        correctAnswer:
          'Distinguish learner exercise from binding advice.',
        explanation: 'Naming what needs sign-off prevents overreach.',
        relatedLesson: '16.4',
        difficulty: 'medium',
      },
      {
        id: 'm16-q7',
        question: '$240k mortgage at 6.5%/30 yr monthly?',
        type: 'calculation',
        correctAnswer: '≈$1,517',
        explanation: 'PMT calculation.',
        relatedLesson: '16.3',
        difficulty: 'hard',
      },
      {
        id: 'm16-q8',
        question:
          '5-yr NPV +$1.1M at 12%. At 20% NPV would be:',
        type: 'scenario',
        options: ['Higher', 'Lower', 'Exactly same', 'Cannot tell'],
        correctAnswer: 'Lower',
        explanation: 'Higher discount rate reduces PV.',
        relatedLesson: '16.2',
        difficulty: 'hard',
      },
      {
        id: 'm16-q9',
        question: '90-day plan benefits most from:',
        type: 'multiple_choice',
        options: [
          'One large monthly study session.',
          'Daily 5-minute reviews.',
          'Weekly 30-minute focused on relevant modules.',
          'Reading materials again.',
        ],
        correctAnswer:
          'Weekly 30-minute focused on relevant modules.',
        explanation: 'Small recurring practice on relevant modules.',
        relatedLesson: '16.5',
        difficulty: 'easy',
      },
      {
        id: 'm16-q10',
        question: "Capstone's purpose?",
        type: 'scenario',
        options: [
          'Decorative final document.',
          'Small reviewable artifact integrating ≥4 modules with assumptions, recommendation, verification list.',
          'Replace future professional advice.',
          'Impress employer with longest analysis.',
        ],
        correctAnswer:
          'Small reviewable artifact integrating ≥4 modules with assumptions, recommendation, verification list.',
        explanation: 'Small, honest, integrative.',
        relatedLesson: '16.4',
        difficulty: 'medium',
      },
      {
        id: 'm16-q11',
        question: 'Best modules for buy-vs-rent capstone?',
        type: 'multiple_choice',
        options: ['1, 2, 3, 4', '5, 7, 11, 13', '14, 15, 16', '16 only'],
        correctAnswer: '5, 7, 11, 13',
        explanation: 'Personal finance, spreadsheets, project planning, real estate.',
        relatedLesson: '16.4',
        difficulty: 'medium',
      },
      {
        id: 'm16-q12',
        question:
          'Most honest claim after capstone + 90-day plan?',
        type: 'scenario',
        options: [
          'Licensed financial advisor now.',
          'No longer need professional advice.',
          'Practical numeracy + reviewable artifact + habit; know what still needs verification.',
          'Mastered every domain.',
        ],
        correctAnswer:
          'Practical numeracy + reviewable artifact + habit; know what still needs verification.',
        explanation: 'Calibrated, honest, the bar this course set.',
        relatedLesson: '16.5',
        difficulty: 'easy',
      },
    ],
    moduleSummary:
      'Capstone integrates skills, names assumptions, labels limits, and commits to keeping skills warm. The capstone is not a credential; it is evidence you can use practical mathematics confidently.',
    completionChecklist: [
      'I produced a 1–2 page capstone integrating ≥4 modules.',
      'I named assumptions and labelled observed vs estimated.',
      'I produced a four-sentence recommendation (Q/F/R/C).',
      'I listed what would still require professional verification.',
      'I built a 90-day continued-learning plan.',
      'I wrote a one-paragraph reflection on changed habits.',
    ],
  },
]
