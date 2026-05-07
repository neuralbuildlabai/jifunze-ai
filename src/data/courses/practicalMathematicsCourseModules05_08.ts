/**
 * Practical Mathematics — Modules 5–8 (personal finance to workplace).
 * Internal split for readability; combined in `practicalMathematicsCourse.ts`.
 */

import type { StandaloneCourseModule } from './practicalMathematicsCourseTypes'

export const PRACTICAL_MATH_MODULES_05_08: StandaloneCourseModule[] = [
  // ============================================================
  // MODULE 5 — Personal Finance Math
  // ============================================================
  {
    moduleNumber: 5,
    slug: 'personal-finance-math',
    title: 'Personal Finance Math',
    durationMinutes: 210,
    level: 'Foundational to Intermediate',
    prerequisites: [
      'math-confidence-number-sense',
      'fractions-decimals-percentages-estimation',
      'ratios-proportions-unit-rates-comparisons',
      'measurement-units-conversions-precision',
    ],
    safetyNote:
      'This module is for educational numeracy practice only. The calculations and examples here do not constitute financial, tax, legal, investment, debt, or insurance advice. Tax brackets, interest rates, retirement contribution limits, healthcare costs, and lender rules vary by country, region, and year. Verify any decision that affects your money with a qualified financial advisor, accountant, tax professional, or licensed lender, and use the live numbers from your own institutions before acting.',
    overview:
      'Personal finance math is where everyday decisions stop being guesses. You read your paycheck honestly, build a budget that survives real life, compare banking and credit products, calculate the true cost of borrowing, decide between renting and buying or leasing and purchasing, and reason about taxes at a learner level.',
    whyThisMatters: [
      "A budget that matches your real income beats any spreadsheet that doesn't.",
      'Minimum credit card payments hide ten- to thirty-year payoff timelines.',
      'Loan term length is one of the biggest drivers of total cost.',
      'Total cost of ownership exposes the difference between sticker price and real cost.',
      'Tax brackets are progressive, not flat.',
    ],
    learningObjectives: [
      'Convert gross to net income and produce a realistic monthly budget',
      'Compare checking and savings products by fees, minimums, and APY',
      'Calculate credit card interest, minimum-payment payoff, and effect of fixed higher payments',
      'Compute monthly loan payments, total interest, and cost difference between term lengths',
      'Compare rent vs buy and lease vs purchase using monthly and total-cost-of-ownership lenses',
      'Read tax brackets correctly and tell marginal rate apart from effective rate',
      'Build a simple emergency fund target and a payoff plan for one debt',
    ],
    lessons: [
      {
        lessonNumber: '5.1',
        title: 'Income and Budgeting',
        estimatedMinutes: 35,
        learnerGoal: 'Convert gross to net and build a realistic monthly budget.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Gross vs net',
            title: 'What you earn vs what you can actually spend',
            content:
              'Gross is total earnings before deductions. Net is what lands in your account after taxes, social security or NSSF, healthcare or NHIF, retirement contributions. Almost all budgeting mistakes start with planning against gross.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'From a $5,000 monthly gross to take-home pay',
            content:
              'Gross $5,000. Federal $750. State $250. SS 6.2% $310. Medicare $72.50. Health $200. Retirement 5% $250. Total deductions $1,832.50. Net = $3,167.50.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'The 50/30/20 framework',
            title: 'Needs, wants, savings',
            content:
              '50% needs (housing, food, utilities, transport). 30% wants. 20% savings/debt. Adjust to your situation.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'A budget on $3,500/month net',
            content:
              'Needs $1,750; wants $1,050; savings/debt $700. Sample: rent $1,000, utilities $150, groceries $400, transport $200; dining $300, entertainment $200, shopping $300, subs $100, misc $150; emergency $350, retirement $200, debt $150.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Emergency fund',
            title: 'Three to six months of essentials',
            content:
              'If essentials are $3,200/month, target $9,600–$19,200. At $400/month savings rate, 2 to 4 years to fully build.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Find your real net',
            content: 'Pull your last payslip. Identify gross, total deductions, and net.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Budget traps',
            content:
              'Budgeting against gross. Forgetting irregular costs. Treating subscriptions as one-time charges.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Job offers, rent decisions, side hustles',
            content: 'A $60k gross becomes $3,500/month net after typical deductions.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build your real budget',
            content:
              "Using your actual last-month statements, classify every transaction and total each category.",
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 5.1 summary',
            title: 'Net first, then a real budget',
            content: 'Find your net. Use 50/30/20 as guidance. Build the emergency fund.',
          },
        ],
      },
      {
        lessonNumber: '5.2',
        title: 'Banking, Savings, and Account Comparison',
        estimatedMinutes: 30,
        learnerGoal: 'Compare checking and savings products by fees, minimums, and APY.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Account types',
            title: 'Checking, savings, money market, term deposits',
            content:
              'Checking for daily transactions; savings for emergency fund; money market for higher liquid funds; CDs for known future expenses.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Comparing two checking accounts',
            content:
              'A: $12/mo + $3/ATM (5 ATM/mo) = $27/mo. B: $0/mo + $2/ATM (4 free) = $2/mo. B saves ~$300/year.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'APY and compounding',
            title: 'Why APY beats nominal rate',
            content: 'APY is actual annual return after compounding. 2% APY on $10k earns ≈$201.84/yr.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Read the APY',
            content: 'Find your savings APY. Compute interest on $5,000 over a year.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Banking traps',
            content: 'Not knowing your monthly fee or how to waive it. Treating all savings accounts as equivalent.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Choosing where to keep your emergency fund',
            content: 'Emergency fund must be liquid, not locked, and earning competitive APY.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Compare two real accounts',
            content: 'Build a one-page comparison: monthly fee, minimum, ATM fees, overdraft, APY.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 5.2 summary',
            title: 'Pick the right account for the job',
            content: 'Compare APY and fees side by side, not just one or the other.',
          },
        ],
      },
      {
        lessonNumber: '5.3',
        title: 'Credit Cards and Debt Math',
        estimatedMinutes: 40,
        learnerGoal:
          'Calculate credit card interest, see the minimum-payment trap, and choose a payoff strategy.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'How credit cards charge',
            title: 'APR, daily rate, and the grace period',
            content:
              'APR is annual rate. Daily rate is APR ÷ 365. Pay full statement during grace period (21–25 days) to avoid interest on purchases.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Monthly interest on a $2,000 balance at 18% APR',
            content: 'Daily rate ≈ 0.0493%; monthly ≈ $2,000 × 0.000493 × 30 = $29.58.',
          },
          {
            type: 'worked_example',
            eyebrow: 'The minimum-payment trap',
            title: '$5,000 at 18% APR with 2% minimum',
            content:
              'Month 1 interest $75; minimum $100; principal paid only $25. At minimum, payoff 30+ years and $10,000+ interest. At $200/month, 32 months and $1,276. At $500/month, 11 months and $449.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Credit utilisation',
            title: 'Total balance ÷ total credit limit',
            content:
              'Below 30% healthy; above 70% risky. Two cards: $1,000/$5,000 + $500/$3,000 → $1,500/$8,000 = 18.75%.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Project your minimum-payment timeline',
            content:
              'For your card balance, compute one month interest and how much principal disappears in a year of minimum payments.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Credit card traps',
            content: "Treating minimum as 'enough.' Triggering penalty APR. Cash advances. Store cards at 25%+.",
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Avalanche vs snowball',
            content:
              'Avalanche: highest-APR first. Snowball: smallest balance first. Both beat minimum payments.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'One debt, one plan',
            content:
              'Pick one debt. Compute minimum payment, one month interest, and timelines at minimum + extra.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 5.3 summary',
            title: 'The size of the payment is the lever',
            content: 'Pick a method, write down a target date, and verify monthly the balance is moving.',
          },
        ],
      },
      {
        lessonNumber: '5.4',
        title: 'Loans, Financing, and Major Purchases',
        estimatedMinutes: 40,
        learnerGoal:
          'Calculate monthly loan payments and total interest, compare loan terms, and use TCO for major purchases.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Loan anatomy',
            title: 'Principal, rate, term, payment',
            content:
              'For amortising loans, early payments are mostly interest. Total cost = monthly payment × number of payments.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: '$20,000 auto loan at 6% over 5 years',
            content:
              'Monthly r = 0.5%; n = 60. Monthly payment ≈ $386.66. Total ≈ $23,200. Interest ≈ $3,200. 3-year version: $608.44/mo, total $21,904, interest $1,904.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Down payment effect',
            title: 'Smaller principal, smaller interest',
            content:
              '$25k car at 6% / 5 yr: zero down → loan $25k → $483/mo, interest ≈$4k. 20% down ($5k) → loan $20k → $386/mo, interest ≈$3.2k.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Total cost of ownership',
            title: 'Sticker price is just the start',
            content:
              'Real cost of a car over 5 years includes price, financing interest, insurance, fuel, maintenance, registration, depreciation. ~$30k car can cost ~$39k net of resale.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Rent vs buy snapshot',
            title: '$1,500 rent vs a $300,000 home with 20% down',
            content:
              'Rent: $1,525/mo. Buy: $1,146 + $300 + $100 + $250 = $1,796/mo. Buying costs about $271/mo more in this snapshot.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Project a real loan',
            content: 'Use any online loan calculator to find monthly payment for two terms.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Loan traps',
            content:
              "Choosing the longer term because the monthly payment looks 'affordable' without checking total interest.",
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Vehicle and home decisions',
            content: 'A 7-year auto loan can put you underwater for years.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Two-loan compare',
            content: 'Compare two terms: principal, monthly payment, total interest.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 5.4 summary',
            title: 'Term and rate, then total cost',
            content: 'Pick the term first, then the rate. Always check TCO before signing.',
          },
        ],
      },
      {
        lessonNumber: '5.5',
        title: 'Taxes, Deductions, and Take-Home Pay',
        estimatedMinutes: 30,
        learnerGoal: 'Read progressive tax brackets correctly and distinguish marginal from effective rate.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Progressive tax brackets',
            title: 'Only income within each bracket is taxed at that rate',
            content:
              'Headline rate is your marginal rate. Effective rate (total tax ÷ total income) is almost always lower.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: '$60,000 in a sample US bracket structure',
            content:
              'Illustrative single-filer: 10% to $11k; 12% to $44.7k; 22% to $95.4k. $11k×10% + $33.7k×12% + $15.3k×22% ≈ $8,508. Effective ≈14.2%.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Payroll deductions',
            title: 'More than just income tax',
            content:
              'US: Social Security 6.2% (to wage cap), Medicare 1.45%. Kenya: PAYE, NSSF, NHIF/SHIF, possibly housing levy.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Self-employment',
            title: 'Both halves of payroll tax',
            content:
              'US self-employed owe ≈15.3% on net SE income, half deductible.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Marginal vs effective on your last return',
            content: 'Identify your marginal rate and your effective rate.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Tax traps',
            content:
              "Believing 'a raise will push me into a higher bracket and cost me money.' Forgetting SE tax.",
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Offers, raises, and side hustles',
            content: 'A $5k raise on $60k adds 22% × $5k = $1,100 in marginal tax.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Compute your effective rate',
            content: 'Total tax ÷ gross income.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 5.5 summary',
            title: 'Marginal informs decisions; effective informs expectations',
            content: 'Use marginal for offers; effective for budgeting expectations.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 5 Practice Lab — A Real Personal Finance Picture',
      durationMinutes: 45,
      learnerGoal: 'Apply income, budget, debt, loan, and tax math to a realistic scenario.',
      scenarios: [
        {
          id: 'm05-lab-1',
          prompt: 'Build a 50/30/20 budget for someone with a $4,200 monthly net.',
          answerKey:
            'Targets: needs $2,100; wants $1,260; savings/debt $840.',
        },
        {
          id: 'm05-lab-2',
          prompt:
            '$5,000 credit card balance at 18% APR. Compare payoff timelines: minimum vs $300 vs $500/mo.',
          answerKey: 'Min: 30+ years, $10k+. $300: ~20 mo, ~$830. $500: ~11 mo, ~$449.',
        },
        {
          id: 'm05-lab-3',
          prompt: 'Compare a $20,000 auto loan at 6% over 3 vs 5 years.',
          answerKey:
            '3-year: ~$608/mo, total ~$21,904, interest ~$1,904. 5-year: ~$387/mo, total ~$23,200, interest ~$3,200.',
        },
        {
          id: 'm05-lab-4',
          prompt:
            'US sample brackets (10% to $11k; 12% to $44.7k; 22% to $95.4k). Tax on $60,000 and effective rate.',
          answerKey: '$8,508; ≈14.2% effective; 22% marginal.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm05-q1',
        question:
          'Gross monthly $5,000 with $1,832.50 deductions. Monthly net?',
        type: 'calculation',
        correctAnswer: '$3,167.50',
        explanation: '$5,000 − $1,832.50.',
        relatedLesson: '5.1',
        difficulty: 'easy',
      },
      {
        id: 'm05-q2',
        question: 'Using 50/30/20 on a net of $3,500, what is savings/debt?',
        type: 'calculation',
        correctAnswer: '$700',
        explanation: '20% × $3,500.',
        relatedLesson: '5.1',
        difficulty: 'easy',
      },
      {
        id: 'm05-q3',
        question:
          '18% APR, $2,000 balance, 30-day month. Approximate one-month interest?',
        type: 'calculation',
        correctAnswer: '≈$29.58',
        explanation: '0.0493% × 30 × $2,000.',
        relatedLesson: '5.3',
        difficulty: 'medium',
      },
      {
        id: 'm05-q4',
        question:
          '$5,000 at 18% APR with 2% minimum. Principal paid in month 1?',
        type: 'scenario',
        options: ['$25', '$75', '$100', '$200'],
        correctAnswer: '$25',
        explanation: 'Interest $75; min $100; principal $25.',
        relatedLesson: '5.3',
        difficulty: 'medium',
      },
      {
        id: 'm05-q5',
        question:
          '$20,000 auto loan at 6% / 5 yr ($386.66/mo). Approximate total interest?',
        type: 'calculation',
        correctAnswer: '≈$3,200',
        explanation: '$386.66 × 60 ≈ $23,200; minus $20,000.',
        relatedLesson: '5.4',
        difficulty: 'medium',
      },
      {
        id: 'm05-q6',
        question:
          'Sample brackets (10/12/22 as in lesson). Federal tax on $60,000?',
        type: 'calculation',
        correctAnswer: '≈$8,508',
        explanation: '$1,100 + $4,047 + $3,361.',
        relatedLesson: '5.5',
        difficulty: 'hard',
      },
      {
        id: 'm05-q7',
        question: '$8,508 tax on $60,000. Effective rate?',
        type: 'calculation',
        correctAnswer: '≈14.2%',
        explanation: '$8,508 ÷ $60,000.',
        relatedLesson: '5.5',
        difficulty: 'medium',
      },
      {
        id: 'm05-q8',
        question:
          'A $12 + $3/ATM (5 ATM/mo) vs B $0 + $2/ATM with 4 free. Cheaper?',
        type: 'scenario',
        options: ['A by ~$5/mo', 'B by ~$25/mo', 'About the same', 'A by ~$25/mo'],
        correctAnswer: 'B by ~$25/mo',
        explanation: 'A $27, B $2.',
        relatedLesson: '5.2',
        difficulty: 'medium',
      },
      {
        id: 'm05-q9',
        question: 'Two cards: $1,000/$5,000 + $500/$3,000. Utilisation?',
        type: 'calculation',
        correctAnswer: '≈18.75%',
        explanation: '$1,500 ÷ $8,000.',
        relatedLesson: '5.3',
        difficulty: 'easy',
      },
      {
        id: 'm05-q10',
        question:
          'Rent $1,500 + $25 vs buy with $1,146 + $300 + $100 + $250. Difference?',
        type: 'scenario',
        options: [
          'Buying ~$271 more/mo',
          'Renting ~$271 more/mo',
          'About the same',
          'Cannot tell without down payment',
        ],
        correctAnswer: 'Buying ~$271 more/mo',
        explanation: 'Rent $1,525 vs buy $1,796.',
        relatedLesson: '5.4',
        difficulty: 'hard',
      },
    ],
    moduleSummary:
      'You can find your real net income, build a budget, choose accounts, compute credit card interest, run loan numbers, weigh rent vs buy, and read tax brackets correctly.',
    completionChecklist: [
      'I know my real take-home pay and have one month classified into needs/wants/savings.',
      'I have an emergency fund target and a savings rate that gets there.',
      'I can estimate one month interest on any credit card balance.',
      'I have a payoff plan for at least one debt.',
      'I can compute monthly payment and total interest for two candidate loan terms.',
      'I distinguish marginal rate from effective rate.',
      'I have flagged at least one decision to run past a qualified professional.',
    ],
  },

  // ============================================================
  // MODULE 6 — Business Math Fundamentals
  // ============================================================
  {
    moduleNumber: 6,
    slug: 'business-math-fundamentals',
    title: 'Business Math Fundamentals',
    durationMinutes: 180,
    level: 'Intermediate',
    prerequisites: ['personal-finance-math'],
    safetyNote:
      'These business calculations are educational examples only. They do not replace advice from qualified accountants, tax professionals, lawyers, or business advisors. Tax rules, regulatory requirements, accounting standards, and pricing law differ by country and industry. Validate financial decisions with the right professional before acting on them.',
    overview:
      'Business math is the language of operating decisions. You compute revenue, separate fixed from variable costs, find gross and net profit, learn the critical difference between markup and margin, set prices using cost-plus and value-based methods, calculate break-even, and reason about ROI and payback period.',
    whyThisMatters: [
      'Without break-even, you cannot say whether a price actually pays for itself.',
      'Markup and margin are routinely confused — and a 50% markup is a 33% margin, not the same number.',
      'Fixed and variable cost separation is what makes scenario analysis possible.',
      'ROI and payback period turn "this looks like a good idea" into a number you can defend.',
      "A freelancer who hasn't built their hourly rate from cost upward is gambling.",
    ],
    learningObjectives: [
      'Calculate total revenue, average sale value, and revenue per customer or employee',
      'Separate fixed costs from variable costs and compute total cost at different volumes',
      'Compute gross profit, net profit, and contribution margin',
      'Distinguish markup from margin and convert between them',
      'Set prices using cost-plus and competitive logic',
      'Calculate break-even in units and dollars and use margin of safety',
      'Compute ROI and payback period for a project or campaign',
      'Build a freelance hourly rate from desired income and billable-hour reality',
    ],
    lessons: [
      {
        lessonNumber: '6.1',
        title: 'Revenue and Sales Calculations',
        estimatedMinutes: 30,
        learnerGoal:
          'Compute total revenue, average sale, customer lifetime value, and growth rates.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Revenue basics',
            title: 'Price × quantity, then sum',
            content: 'Revenue = price × quantity. Average sale = revenue ÷ transactions.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Coffee shop revenue and CLV',
            content:
              '200 cups/day × $4.50 × 30 days ≈ $27,000/month. CLV: average × per year × years.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Growth math',
            title: 'YoY and CAGR',
            content:
              'YoY: ((current − previous) ÷ previous) × 100. CAGR: ((end ÷ start)^(1/years)) − 1.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Compute one CLV',
            content:
              'Pick one product. Estimate average purchase, frequency, lifespan. Compute CLV.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Revenue traps',
            content: 'Mistaking revenue for profit. Reporting CAGR over a short period.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Forecasts, decks, board reports',
            content: 'Investor decks use YoY and CAGR.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three revenue calculations',
            content: '(1) 200/day × $4.50 × 30. (2) $500k → $600k YoY. (3) $500k → $750k over 3 years CAGR.',
            answerKey: '$27,000; 20%; ≈14.5%.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 6.1 summary',
            title: 'Revenue is the headline; CLV explains it',
            content: 'Pair revenue with margin or CLV before drawing conclusions.',
          },
        ],
      },
      {
        lessonNumber: '6.2',
        title: 'Cost Analysis and Economies of Scale',
        estimatedMinutes: 35,
        learnerGoal: 'Separate fixed from variable costs and compute total cost at different volumes.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Two cost types',
            title: 'Fixed vs variable',
            content:
              'Fixed: rent, salaries, insurance, software. Variable: raw materials, hourly labour, shipping, packaging, commissions.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Total cost and unit cost at three volumes',
            content:
              'Fixed $10k; variable $15/unit. 100 → $11.5k, $115/unit. 500 → $17.5k, $35. 1,000 → $25k, $25.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Limits of scale',
            title: 'Linear scaling has a ceiling',
            content: 'Beyond a point you need a second machine, second shift, or more space.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Sketch a fixed/variable split',
            content: 'List a business top six monthly costs and label each.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Cost traps',
            content: 'Treating salaries as variable when they are paid regardless of output.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Pricing, hiring, and growth decisions',
            content: 'Discount-order decisions need variable cost.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three cost calculations',
            content:
              'Fixed $12k, variable $20/unit. (1) Total cost at 200, 600, 1,200. (2) Unit cost. (3) Volume where unit cost first <$35.',
            answerKey:
              '(1) $16k, $24k, $36k. (2) $80, $40, $30. (3) ~800 units.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 6.2 summary',
            title: 'Costs separated, decisions easier',
            content: 'Master the split and the rest is mechanical.',
          },
        ],
      },
      {
        lessonNumber: '6.3',
        title: 'Profit, Markup, and Margin',
        estimatedMinutes: 40,
        learnerGoal:
          'Compute gross profit, net profit, contribution margin, and distinguish markup from margin.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Three profit measures',
            title: 'Gross, net, contribution',
            content:
              'Gross = revenue − COGS. Net = gross − operating expenses. Contribution = revenue − variable costs.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: '$100k revenue, $40k COGS, $35k operating expense',
            content:
              'Gross $60k (60% margin). Net $25k (25% margin). Contribution per $100 unit with $40 variable cost = $60.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'The most important business-math distinction',
            title: 'Markup vs margin',
            content:
              'Markup is profit ÷ cost. Margin is profit ÷ price. $60 cost sold at $90 = $30 profit. Markup 50%, margin 33.3%.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Conversion formulas',
            title: 'Markup ↔ margin',
            content:
              'Margin = markup ÷ (1 + markup). Markup = margin ÷ (1 − margin). 50% markup → 33.3% margin. 33.3% margin → 50% markup.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Discount impact',
            title: 'How a discount eats margin faster than revenue',
            content:
              '$100 price, $60 cost, $40 profit (40% margin). 20% discount → $80 price, $20 profit, 25% margin. Profit halved.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'One conversion',
            content:
              '60% markup → margin? 25% margin → markup? Confirm: 37.5%; 33.3%.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Profit traps',
            content: 'Reporting markup but calling it margin.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Pricing, retail, and freelance',
            content: "A retailer's 'keystone' (double cost) is 100% markup → 50% margin.",
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three profit problems',
            content:
              '(1) Revenue $200k, COGS $80k, opex $90k — gross/net. (2) Cost $40 → $60 — markup/margin. (3) $50 sold, $30 cost, 20% discount.',
            answerKey:
              '(1) Gross $120k 60%; net $30k 15%. (2) Markup 50%, margin 33.3%. (3) New $40, profit $10, margin 25%.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 6.3 summary',
            title: 'Profit by three names; markup is not margin',
            content: 'A discount cuts profit faster than it cuts price.',
          },
        ],
      },
      {
        lessonNumber: '6.4',
        title: 'Pricing and Break-Even',
        estimatedMinutes: 40,
        learnerGoal:
          'Set prices using cost-plus and value logic, and calculate break-even in units and dollars.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Pricing approaches',
            title: 'Cost-plus, value-based, competitive',
            content:
              'Cost-plus: cost + markup. Value-based: what the buyer will pay. Competitive: market norms.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Cost-plus on a $60 item',
            content:
              '50% markup: $90. 50% margin: $60 ÷ 0.5 = $120.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Break-even',
            title: 'Where revenue equals total cost',
            content:
              'Break-even units = fixed costs ÷ contribution margin per unit. Break-even revenue = fixed costs ÷ contribution margin ratio.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Coffee shop break-even',
            content:
              'Fixed $11,800; price $4.50; variable $1.50; contribution $3. Break-even ≈ 3,933 cups/month ≈ 131/day.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Margin of safety',
            title: 'How far above break-even',
            content: '700 vs 500 = 200 = 28.6%.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Compute one break-even',
            content: 'List fixed costs, price, variable cost. Compute break-even units and revenue.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Pricing/break-even traps',
            content: 'Confusing markup and margin in pricing.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Cafes, makers, services',
            content:
              'A café asks "how many cups a day?" A maker asks "how many widgets a month?"',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Two pricing/break-even reps',
            content:
              '(1) Soap costs $3.50; want 60% margin — price? (2) Fixed $8k, price $25, variable $10 — break-even units, revenue?',
            answerKey:
              '(1) $3.50 ÷ 0.40 = $8.75. (2) Contribution $15; break-even 534 units; revenue $13,350.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 6.4 summary',
            title: 'Price for the floor, the ceiling, and break-even',
            content: 'Cost-plus protects you; value pricing captures willingness; break-even tests the model.',
          },
        ],
      },
      {
        lessonNumber: '6.5',
        title: 'ROI, Payback, and Freelance Rate Setting',
        estimatedMinutes: 35,
        learnerGoal: 'Compute ROI and payback for projects, and build a freelance hourly rate.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'ROI and payback',
            title: 'Two simple investment questions',
            content:
              'ROI = (gain − cost) ÷ cost × 100. Payback = investment ÷ annual cash flow.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'A marketing campaign',
            content:
              'Campaign $10k. Revenue $50k, COGS $20k. Net $30k. ROI 200%. CAC $100/customer.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Equipment with a payback period',
            content: '$50k cost, $15k/yr savings → payback ≈ 3.3 years. 5-year ROI = +50%.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Freelance hourly rate',
            title: 'Working backward from desired income',
            content: 'Cover business expenses, taxes, insurance, retirement, and the hours you do not bill.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Setting a defensible hourly rate',
            content:
              'Take-home $75k + tax $22.5k + insurance $6k + retirement $7.5k + expenses $15k = $126k. Billable 1,504 hr → ≈$83.78 → round $85.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Build your own rate',
            content: 'Sketch take-home, taxes, expenses; estimate billable hours; compute rate.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'ROI and rate traps',
            content: 'ROI ignoring time. Freelance rate forgetting SE tax.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Campaigns, equipment, contracts',
            content: 'Marketing teams use ROI and CAC to decide channel spend.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three reps',
            content:
              '(1) $5k campaign returns $20k net. (2) $80k equipment saves $20k/yr. (3) Take-home $50k + $20k taxes/expenses, 1,500 billable hours.',
            answerKey: '(1) 300%. (2) 4 years. (3) ≈$46.67 → round $50/hr.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 6.5 summary',
            title: 'Decisions that defend themselves',
            content:
              'ROI and payback tell whether spend earns its keep. A defensible freelance rate is built from cost upward.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 6 Practice Lab — Coffee Shop Health Check',
      durationMinutes: 40,
      learnerGoal: 'Run a complete revenue/cost/profit/break-even/ROI analysis.',
      scenarios: [
        {
          id: 'm06-lab-1',
          prompt:
            '4,000 cups × $4.50 + 1,000 food × $6.00; variable $1.50/cup + $2.50/food. Compute revenue and gross margin.',
          answerKey: 'Revenue $24,000; variable $8,500; gross $15,500; margin 64.6%.',
        },
        {
          id: 'm06-lab-2',
          prompt: 'With fixed $11,800, compute net profit and net margin.',
          answerKey: 'Net $3,700; margin 15.4%.',
        },
        {
          id: 'm06-lab-3',
          prompt: 'Average price $4.80; average variable $1.70. Break-even items?',
          answerKey: 'Contribution $3.10; break-even 3,806/mo ≈ 127/day.',
        },
        {
          id: 'm06-lab-4',
          prompt: 'Convert 50% markup on $60 to margin; then apply 20% discount and recompute margin.',
          answerKey:
            '50% markup → price $90 → margin 33.3%. After 20% discount → $72 → profit $12 → margin 16.7%.',
        },
        {
          id: 'm06-lab-5',
          prompt: 'Build a freelance hourly rate: $60k take-home + $25k taxes/expenses; 1,500 billable.',
          answerKey: '$85k ÷ 1,500 ≈ $56.67 → round $60.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm06-q1',
        question: '200 cups/day × $4.50 × 30 days. Monthly revenue?',
        type: 'calculation',
        correctAnswer: '$27,000',
        explanation: '200 × $4.50 × 30.',
        relatedLesson: '6.1',
        difficulty: 'easy',
      },
      {
        id: 'm06-q2',
        question: 'Revenue $500k → $600k YoY. Growth?',
        type: 'calculation',
        correctAnswer: '20%',
        explanation: '($600 − $500)/$500 = 20%.',
        relatedLesson: '6.1',
        difficulty: 'easy',
      },
      {
        id: 'm06-q3',
        question: 'Fixed $10k, variable $15/unit, 500 units. Total and unit cost?',
        type: 'calculation',
        correctAnswer: 'Total $17,500; unit $35',
        explanation: '$10k + 500 × $15 = $17,500; ÷ 500 = $35.',
        relatedLesson: '6.2',
        difficulty: 'medium',
      },
      {
        id: 'm06-q4',
        question: 'Cost $60, sold $90. Markup?',
        type: 'calculation',
        correctAnswer: '50%',
        explanation: '$30 / $60 = 50%.',
        relatedLesson: '6.3',
        difficulty: 'easy',
      },
      {
        id: 'm06-q5',
        question: 'Cost $60, sold $90. Margin?',
        type: 'calculation',
        correctAnswer: '33.3%',
        explanation: '$30 / $90.',
        relatedLesson: '6.3',
        difficulty: 'medium',
      },
      {
        id: 'm06-q6',
        question: 'Convert 50% markup to margin.',
        type: 'multiple_choice',
        options: ['33.3%', '50%', '66.7%', '100%'],
        correctAnswer: '33.3%',
        explanation: '0.5 / 1.5.',
        relatedLesson: '6.3',
        difficulty: 'medium',
      },
      {
        id: 'm06-q7',
        question:
          'Fixed $10k, price $50, variable $30. Break-even units?',
        type: 'calculation',
        correctAnswer: '500 units',
        explanation: 'Contribution $20; $10k / $20.',
        relatedLesson: '6.4',
        difficulty: 'medium',
      },
      {
        id: 'm06-q8',
        question:
          '$100 product (cost $60) discounted 20%. New margin?',
        type: 'scenario',
        options: ['40%', '33%', '25%', '20%'],
        correctAnswer: '25%',
        explanation: '$80 price, $20 profit, 25% margin.',
        relatedLesson: '6.3',
        difficulty: 'hard',
      },
      {
        id: 'm06-q9',
        question:
          '$10k campaign generates $30k net gain. ROI?',
        type: 'calculation',
        correctAnswer: '200%',
        explanation: '($30k − $10k) / $10k.',
        relatedLesson: '6.5',
        difficulty: 'medium',
      },
      {
        id: 'm06-q10',
        question:
          '$80k equipment saves $20k/year. Payback?',
        type: 'calculation',
        correctAnswer: '4 years',
        explanation: '$80k / $20k.',
        relatedLesson: '6.5',
        difficulty: 'easy',
      },
      {
        id: 'm06-q11',
        question:
          'Freelance: $60k take-home, $25k taxes/expenses, 1,500 billable. Floor rate?',
        type: 'calculation',
        correctAnswer: '≈$56.67/hour (recommend $60)',
        explanation: '$85k ÷ 1,500.',
        relatedLesson: '6.5',
        difficulty: 'hard',
      },
    ],
    moduleSummary:
      'You can compute revenue, separate costs, find profit by three lenses, distinguish markup from margin, set prices, calculate break-even, and reason about ROI and payback.',
    completionChecklist: [
      'I can separate fixed from variable costs.',
      'I can compute gross, net, and contribution margin.',
      'I can convert markup to margin and back.',
      'I can compute break-even units and revenue.',
      'I can compute ROI and payback.',
      'I can build a freelance hourly rate from desired take-home.',
    ],
  },

  // ============================================================
  // MODULE 7 — Spreadsheet Skills for Business and Work
  // ============================================================
  {
    moduleNumber: 7,
    slug: 'spreadsheet-skills-business-work',
    title: 'Spreadsheet Skills for Business and Work',
    durationMinutes: 210,
    level: 'Intermediate',
    prerequisites: ['business-math-fundamentals'],
    overview:
      'Spreadsheets are the everyday math tool of work. You become fluent in cell references (relative, absolute, mixed), the essential functions adults actually use, build a working budget and a simple income statement, sort and filter data, summarise with pivot tables, and choose the right chart for the job.',
    whyThisMatters: [
      "Spreadsheet skills appear in almost every job description that isn't physical labour.",
      'A spreadsheet built with absolute references and clear formulas is auditable.',
      'Pivot tables and charts turn raw rows into decisions in minutes.',
      'PMT, IF, and VLOOKUP are the small set of functions most everyday models need.',
      'Most adult spreadsheet errors are formula errors caught by a 30-second sanity check.',
    ],
    learningObjectives: [
      'Use relative, absolute, and mixed cell references correctly',
      'Apply essential functions: SUM, AVERAGE, COUNT family, IF, VLOOKUP/XLOOKUP',
      'Use date and text functions for cleanups and reports',
      'Build a personal budget and a simple income statement',
      'Compute loan payments using PMT',
      'Sort, filter, and summarise data with pivot tables',
      'Choose the right chart type for the message',
      'Diagnose and fix common spreadsheet errors (#DIV/0!, #N/A, #VALUE!, #REF!)',
    ],
    lessons: [
      {
        lessonNumber: '7.1',
        title: 'Spreadsheet Basics, Formatting, and Cell References',
        estimatedMinutes: 35,
        learnerGoal:
          'Set up clean spreadsheets and use relative, absolute, and mixed references.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Anatomy',
            title: 'Workbook, sheet, row, column, cell',
            content: 'Always start a sheet with one row of clear column headers.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Data types and formatting',
            title: 'Numbers, currency, percentages, dates',
            content: 'Numbers live in cells; formatting changes how they look without changing the value.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'The most important spreadsheet concept',
            title: 'Relative, absolute, and mixed references',
            content:
              'Relative (A1) shifts when copied. Absolute ($A$1) does not move. Mixed ($A1 or A$1) locks one of row or column.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Tax rate in one cell, used throughout',
            content:
              "B1 = 0.08. C2 = A2 * $B$1. Copy down: each cell multiplies its A-column value by the same B1 rate.",
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Predict the formula',
            content: 'C2 = $A2 * B$1. Copied to D5? Confirm: $A5 * B$1.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Reference traps',
            content: 'Hard-coding numbers inside formulas instead of pointing to a labelled cell.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Budgets, invoices, trackers',
            content: 'A monthly budget with an exchange-rate cell at the top lets you re-quote by editing one number.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build a unit-conversion mini-sheet',
            content:
              "B1 = 2.54. Column A: five inch values. Column B: =A2 * $B$1 → cm. Change B1 — every conversion updates.",
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 7.1 summary',
            title: 'References are the engine',
            content: 'Use $ signs to lock what should not move.',
          },
        ],
      },
      {
        lessonNumber: '7.2',
        title: 'Essential Formulas and Functions',
        estimatedMinutes: 40,
        learnerGoal: 'Use the small set of functions adult spreadsheets rely on.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Arithmetic and order',
            title: 'Basics that quietly run everything',
            content:
              'Operators + − * / and ^. Use parentheses for clarity. =10+5*2 = 20; =(10+5)*2 = 30.',
          },
          {
            type: 'worked_example',
            eyebrow: 'The starter set',
            title: 'SUM, AVERAGE, COUNT, MIN, MAX',
            content:
              '=SUM(B2:B12), =AVERAGE, =COUNT (numbers only), =COUNTA, =COUNTBLANK, =COUNTIF(B2:B12,">15"), =MIN, =MAX.',
          },
          {
            type: 'worked_example',
            eyebrow: 'IF for branching logic',
            title: 'If true, do this; otherwise that',
            content:
              '=IF(A1>=70, "Pass", "Fail"). Nested IF for grades. For more than 3 levels prefer IFS or a lookup table.',
          },
          {
            type: 'worked_example',
            eyebrow: 'VLOOKUP / XLOOKUP',
            title: 'Find a value in a table',
            content:
              '=VLOOKUP("Gadget", A2:B4, 2, FALSE). =XLOOKUP("Gadget", A2:A4, B2:B4) is cleaner.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Date and text functions',
            title: 'Cleanups and reports',
            content:
              'Dates: =TODAY(), =NOW(), end-start = days. Text: =LEFT, =RIGHT, =LEN, =UPPER, =LOWER, &-concatenate.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Pick the right function',
            content:
              '(a) total expenses; (b) flag scores below 50; (c) find unit price by name. Confirm: SUM; IF; VLOOKUP.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Function traps',
            content: 'VLOOKUP without FALSE/0 risks approximate match. Nesting 3+ IFs.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Reports, dashboards, payroll',
            content: 'A monthly report uses SUM and AVERAGE for totals.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build a five-row gradebook',
            content:
              'Names, scores, total, average, pass/fail (IF), letter grade.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 7.2 summary',
            title: 'Small set, large mileage',
            content: 'SUM, AVERAGE, COUNT family, IF, lookup function cover most adult work.',
          },
        ],
      },
      {
        lessonNumber: '7.3',
        title: 'Financial Spreadsheet Models',
        estimatedMinutes: 40,
        learnerGoal: 'Build a budget, simple income statement, and PMT loan payment.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Budget pattern',
            title: 'Income block, expense block, total, savings rate',
            content:
              'Build the formulas, then enter the numbers — that order prevents typing values over a working formula.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Simple income statement',
            content:
              'Revenue $50k, COGS $20k, gross $30k (60%). OpEx total $18k. Net $12k (24% margin).',
          },
          {
            type: 'worked_example',
            eyebrow: 'PMT for loan payments',
            title: 'Monthly auto-loan payment',
            content:
              '=PMT(rate, periods, present_value). $25k / 6% / 5yr → =PMT(6%/12, 60, -25000) ≈ $483.32.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'A 3-month cash-flow projection',
            content:
              'Beginning cash, cash-in (sum), cash-out (sum), net, ending. February beginning = January ending.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Sanity-check a budget',
            content:
              '$4,500 income, $2,650 expenses. Net? Savings rate? Confirm: $1,850; ≈41.1%.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Financial model traps',
            content: 'Hard-coded totals. Mixing currencies in one column.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Personal budgets, P&L, loan shopping',
            content: 'Loan shopping with PMT lets you compare lender quotes in seconds.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build your real budget tracker',
            content: 'Income/expense/net/savings-rate with real numbers, formats, and absolute reference for any rate.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 7.3 summary',
            title: 'Three working models',
            content: 'Build them once cleanly; reuse them forever.',
          },
        ],
      },
      {
        lessonNumber: '7.4',
        title: 'Data Analysis: Sort, Filter, Pivot, Conditional Formatting',
        estimatedMinutes: 40,
        learnerGoal: 'Sort, filter, build pivots, and use conditional formatting.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Sort and filter',
            title: 'Cleaner data without writing formulas',
            content:
              'Sort orders rows. Filter hides rows that do not match a criterion. Both are reversible.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Pivot tables',
            title: 'Summarise rows into a small grid',
            content:
              'Take a long table; produce a small summary by rows, columns, and aggregated values.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Region × product pivot',
            content:
              'Source rows of date/region/product/sales → pivot rows = product, columns = region, values = sum of sales.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Conditional formatting',
            title: 'Make what matters jump off the page',
            content:
              'Highlight top performers, flag overdue invoices, colour-band a heat map. Use sparingly.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Pick the tool',
            content:
              '(a) Top 10 customers; (b) Compare regions month-over-month; (c) Show overdue invoices. Confirm: sort+filter; pivot; filter+conditional formatting.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Analysis traps',
            content: 'Filtering and forgetting to clear it.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Sales reviews, ops reviews, finance reviews',
            content: 'A monthly sales review is usually one pivot and one chart.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build one pivot',
            content: 'Take any list of transactions. Build a pivot with one row category and one column.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 7.4 summary',
            title: 'From rows to readable',
            content: 'Sort and filter to scan; pivot to summarise; conditional formatting to highlight.',
          },
        ],
      },
      {
        lessonNumber: '7.5',
        title: 'Charts, Best Practices, and Error Handling',
        estimatedMinutes: 35,
        learnerGoal:
          'Choose the right chart, follow professional spreadsheet hygiene, and handle error codes.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Choose the chart',
            title: 'Comparison, trend, composition, relationship',
            content:
              'Bar/column for compare; line for trend over time; pie for composition; scatter for relationships.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Two charts, same data, different stories',
            content:
              'Six months of revenue 100k → 125k. Line chart shows trend. Column chart emphasises totals.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Spreadsheet hygiene',
            title: 'What separates a good workbook from a fragile one',
            content:
              'Label every input. Separate raw data, calculations, and outputs. Avoid merged cells in data ranges.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Error codes',
            title: "Read the error, don't fight it",
            content:
              "#DIV/0! division by zero. #N/A no match. #VALUE! wrong type. #REF! deleted reference. Wrap with =IFERROR(...) once you understand it.",
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Diagnose the error',
            content: '#N/A from a trailing space. Fix: =TRIM() or XLOOKUP.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Hygiene traps',
            content: '3D effects. Pies with more than five slices. Inconsistent colour schemes.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Reports, dashboards, executive summaries',
            content: 'One strong chart with one short paragraph beats a deck with twelve.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Make one report-ready chart',
            content: 'Build one chart with title, axis labels, legend, currency formatting.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 7.5 summary',
            title: 'Chart by message, hygiene by habit',
            content: 'Pick a chart by the message; treat error codes as clues.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 7 Practice Lab — Build a Working Tracker',
      durationMinutes: 45,
      learnerGoal:
        'Build a one-page personal tracker integrating references, functions, financial math, and one chart.',
      scenarios: [
        {
          id: 'm07-lab-1',
          prompt:
            'Build personal monthly tracker: income (3 lines + total), expenses (8 + total), net, savings rate as percentage, and a tax-rate cell at the top.',
          answerKey:
            'Use SUM totals, =Net/TotalIncome formatted as percentage, $B$1 for tax cell.',
        },
        {
          id: 'm07-lab-2',
          prompt:
            'Add a five-row product table (name, cost, price). Use formulas to compute markup and margin; use VLOOKUP/XLOOKUP for one product.',
          answerKey:
            'Markup = (price-cost)/cost; margin = (price-cost)/price.',
        },
        {
          id: 'm07-lab-3',
          prompt:
            'Add a small loan calculator: principal, APR, term, monthly via PMT.',
          answerKey:
            '=PMT(B_apr/12, B_term*12, -B_principal). $20,000/6%/5 → ≈$386.66.',
        },
        {
          id: 'm07-lab-4',
          prompt:
            'Build one chart from any block. Use chart type appropriate to message and add a meaningful title.',
          answerKey: 'Pie or column for breakdown; line for amortisation balance.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm07-q1',
        question: '=A2 * $B$1 copied from C2 to C5 becomes?',
        type: 'scenario',
        options: [
          'A5 * B4 — both shift.',
          'A5 * $B$1 — only A2 shifts.',
          '=A2 * $B$1 in every cell.',
          '#REF! — $B$1 is locked.',
        ],
        correctAnswer: 'A5 * $B$1 — only A2 shifts.',
        explanation: '$B$1 locks both row and column.',
        relatedLesson: '7.1',
        difficulty: 'medium',
      },
      {
        id: 'm07-q2',
        question: 'Best to total a column of expenses?',
        type: 'multiple_choice',
        options: ['=COUNT(B2:B12)', '=AVERAGE(B2:B12)', '=SUM(B2:B12)', '=MAX(B2:B12)'],
        correctAnswer: '=SUM(B2:B12)',
        explanation: 'SUM totals values.',
        relatedLesson: '7.2',
        difficulty: 'easy',
      },
      {
        id: 'm07-q3',
        question: "A1 score: 'Pass' if ≥70, else 'Fail'. Formula?",
        type: 'calculation',
        correctAnswer: '=IF(A1>=70, "Pass", "Fail")',
        explanation: 'Standard IF.',
        relatedLesson: '7.2',
        difficulty: 'easy',
      },
      {
        id: 'm07-q4',
        question: 'Find price by name from a table. Function?',
        type: 'multiple_choice',
        options: ['SUMIF', 'AVERAGE', 'VLOOKUP or XLOOKUP', 'COUNTIF'],
        correctAnswer: 'VLOOKUP or XLOOKUP',
        explanation: 'Lookups retrieve a value associated with a key.',
        relatedLesson: '7.2',
        difficulty: 'medium',
      },
      {
        id: 'm07-q5',
        question:
          'Monthly payment for $25,000 / 6% APR / 5 yr using PMT-style logic.',
        type: 'calculation',
        correctAnswer: '≈$483.32',
        explanation: '=PMT(6%/12, 60, -25000).',
        relatedLesson: '7.3',
        difficulty: 'medium',
      },
      {
        id: 'm07-q6',
        question: 'Pivot orders by product and region. Fields?',
        type: 'scenario',
        options: [
          'Product rows; region columns; sum sales values.',
          'Product values; region rows; sales filter.',
          'Sales rows; product columns; region values.',
          'Filter only.',
        ],
        correctAnswer: 'Product rows; region columns; sum sales values.',
        explanation: 'Categories on rows/columns; numeric measure aggregates as values.',
        relatedLesson: '7.4',
        difficulty: 'medium',
      },
      {
        id: 'm07-q7',
        question: 'Best chart for revenue trend over 12 months?',
        type: 'multiple_choice',
        options: ['Pie', 'Line', 'Stacked bar', 'Scatter'],
        correctAnswer: 'Line',
        explanation: 'Line shows change over time.',
        relatedLesson: '7.5',
        difficulty: 'easy',
      },
      {
        id: 'm07-q8',
        question: 'VLOOKUP returns #N/A. Most common cause?',
        type: 'scenario',
        options: [
          'Lookup value not found in first column (whitespace, case).',
          'Circular reference.',
          'Number/text mismatch.',
          'All equally likely.',
        ],
        correctAnswer:
          'Lookup value not found in first column (whitespace, case).',
        explanation: '#N/A means not found; trim spaces or check case.',
        relatedLesson: '7.5',
        difficulty: 'hard',
      },
      {
        id: 'm07-q9',
        question:
          'Savings rate cell shows 0.412 instead of 41.2%. Fix?',
        type: 'calculation',
        correctAnswer:
          'Format the cell as percentage (do not multiply by 100 in the formula).',
        explanation: '0.412 is the correct value; formatting is missing.',
        relatedLesson: '7.3',
        difficulty: 'medium',
      },
      {
        id: 'm07-q10',
        question: 'Strongest sign of professional spreadsheet hygiene?',
        type: 'scenario',
        options: [
          'Heavy use of merged cells in data ranges.',
          'Hard-coded numeric constants in formulas.',
          'Clear labels, separated regions, reusable absolute references.',
          'A single tab with everything.',
        ],
        correctAnswer:
          'Clear labels, separated regions, reusable absolute references.',
        explanation: 'Hygiene is readability and re-runnability by someone else.',
        relatedLesson: '7.5',
        difficulty: 'hard',
      },
    ],
    moduleSummary:
      'You can navigate spreadsheets confidently, use the small core function set, build financial models, summarise data with pivot tables, choose the right chart, and recognise common error codes.',
    completionChecklist: [
      'I can write formulas using relative, absolute, and mixed references.',
      'I can use SUM, AVERAGE, COUNT, COUNTIF, IF, and a lookup function.',
      'I can build a budget, a simple income statement, and a PMT calculator.',
      'I can sort, filter, and build a pivot table.',
      'I can pick a chart type and produce a clean labelled chart.',
      'I can read and respond to common error codes.',
    ],
  },

  // ============================================================
  // MODULE 8 — Workplace Math and Problem-Solving
  // ============================================================
  {
    moduleNumber: 8,
    slug: 'workplace-math-problem-solving',
    title: 'Workplace Math and Problem-Solving',
    durationMinutes: 165,
    level: 'Intermediate',
    prerequisites: ['spreadsheet-skills-business-work'],
    overview:
      'Payroll, scheduling, productivity, inventory, quality, and customer-service metrics. You learn to compute pay correctly (with overtime, commission, tiered structures), build schedules, calculate productivity and efficiency, manage stock with reorder points, and report quality metrics.',
    whyThisMatters: [
      'Payroll errors cost trust and money very fast.',
      'A reasonable schedule cannot be built without coverage-vs-shift calculation.',
      'Productivity reports drive decisions about hiring, equipment, and targets.',
      'Reorder points and turnover guard against stockouts and dead stock.',
      'Customer-service metrics tell you how the team is doing.',
    ],
    learningObjectives: [
      'Calculate hourly pay, overtime, holiday pay, commission, and tiered commission',
      'Convert salary to hourly equivalent',
      'Calculate elapsed work time and weekly hours including overtime',
      'Schedule shifts to meet coverage requirements',
      'Compute units per hour, efficiency percentages, and team averages',
      'Calculate inventory turnover, days of inventory, reorder points, and safety stock',
      'Compute defect rate, scrap rate, first-pass yield, and rework rate',
      'Use customer-service metrics to interpret performance',
    ],
    lessons: [
      {
        lessonNumber: '8.1',
        title: 'Payroll and Compensation',
        estimatedMinutes: 35,
        learnerGoal:
          'Calculate hourly pay, overtime, holiday pay, commission (straight, base+, tiered), and salary-to-hourly.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Hourly basics',
            title: 'Pay equals rate times hours, with caveats',
            content: 'Gross = rate × hours, plus overtime or premium. Net subtracts deductions.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Overtime and double-time',
            title: 'Layered pay rates',
            content:
              '$20/hr × 48: 40 × $20 + 8 × $30 = $1,040. Holiday at 2×: $720 + $216 + $288 = $1,224.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Commission structures',
            title: 'Straight, base+, tiered',
            content:
              'Straight 5% × $50k = $2,500. Base $2k + 3% × $40k = $3,200. Tiered 3/4/5% per $25k tier on $75k = $3,000.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Salary to hourly',
            title: 'Annual ÷ 2,080',
            content: '$52,000/yr ÷ 2,080 = $25/hr.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'One overtime check',
            content: '$22/hr, 45 hrs week. Confirm: 40 × $22 + 5 × $33 = $1,045.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Payroll traps',
            content: 'Forgetting overtime above 40. Treating commission tiers cumulatively.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Payroll runs and offer letters',
            content: 'Small business owners running payroll need this every cycle.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three payroll problems',
            content:
              '(1) $20/hr × 48 with OT. (2) Tiered 3/4/5 on $75k. (3) $60k/yr → $/hr.',
            answerKey: '$1,040; $3,000; ≈$28.85.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 8.1 summary',
            title: 'Pay correctly the first time',
            content: 'Layered rates, tiered commissions, salary-to-hourly.',
          },
        ],
      },
      {
        lessonNumber: '8.2',
        title: 'Time, Scheduling, and Coverage',
        estimatedMinutes: 30,
        learnerGoal:
          'Calculate elapsed work time, schedule shifts, estimate project task duration with critical path.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Elapsed time, decimal hours',
            title: 'From timecard to paycheck',
            content: '8:00–17:00 with 0.5 h lunch = 8.5 h. 7 h 45 min = 7.75 h.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Coverage scheduling',
            title: 'Match shifts to demand',
            content:
              'Restaurant needs 3 servers 6–11, 5 11–3, 6 3–10. Allocate 3 morning + 2 mid + 4 evening = 9 servers, ~72 server-hours.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Simple critical path',
            title: 'Tasks, dependencies, longest chain',
            content:
              'A(4) → B(6) → D(5) = 15 hours. C(3) runs parallel with B.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Decimal vs minutes',
            content: '7:45 AM to 4:15 PM with 45-min lunch = 7.75 h.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Scheduling traps',
            content: 'Forgetting unpaid breaks. Building schedules around average not peak.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Restaurants, retail, call centres',
            content: 'Shift scheduling in any business with variable demand.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three time/scheduling reps',
            content:
              '(1) Weekly hours from 8.5/8/9/8.5/7. (2) Overtime hours. (3) Critical path A(2) → B(4) → D(2), C(3) parallel.',
            answerKey: '41 h; 1 h OT; 8 h.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 8.2 summary',
            title: 'Hours align with reality',
            content: 'Honest timecards, demand-shaped schedules, critical-path thinking.',
          },
        ],
      },
      {
        lessonNumber: '8.3',
        title: 'Productivity and Efficiency',
        estimatedMinutes: 30,
        learnerGoal:
          'Calculate units per hour, efficiency vs standard, utilisation, and team averages.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Productivity',
            title: 'Output per unit of input',
            content: '240 units in 8 h = 30/h. Department: 5,000 / 400 = 12.5 units/labour-hour.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Efficiency',
            title: 'Actual vs standard',
            content: '30/h vs 25/h standard = 120% efficiency.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Utilisation',
            title: 'Productive time as share of available',
            content: '35 billable / 40 available = 87.5%.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Three quick metrics',
            content: '220/8 = 27.5; 22/25 = 88%; 30/40 = 75%.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Metric traps',
            content: 'Comparing productivity across different work.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Operations, services, knowledge work',
            content: 'Factory, consultancy, call centre, software team.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three productivity reps',
            content:
              '(1) A 200/8, B 180/8, C 220/8 — average. (2) Std 25 vs A 30, B 22 — efficiency. (3) 32/40 — utilisation.',
            answerKey: '25; A 120%, B 88%; 80%.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 8.3 summary',
            title: 'Three honest numbers',
            content: 'Productivity, efficiency, utilisation reported together tell a fuller story.',
          },
        ],
      },
      {
        lessonNumber: '8.4',
        title: 'Inventory, Quality, and Customer-Service Metrics',
        estimatedMinutes: 35,
        learnerGoal:
          'Compute inventory turnover, days of inventory, reorder points, defect rate, first-pass yield, and customer-service metrics.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Inventory math',
            title: 'Turnover, days, reorder',
            content:
              'Turnover = COGS ÷ avg inventory. Days = 365 ÷ turnover. Reorder = daily usage × lead time + safety.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Quality metrics',
            title: 'Defect rate, scrap rate, first-pass yield',
            content:
              'Defect rate, scrap rate, first-pass yield, rework rate.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Customer-service metrics',
            title: 'CSAT, NPS, AHT, abandonment',
            content:
              'CSAT % top scores. NPS % promoters − % detractors. AHT total handle time ÷ calls.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'One reorder calculation',
            content: '200/day, 7-day lead, 500 safety. Confirm: 1,900 units.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Operational traps',
            content: 'Using ending inventory not average. Reading AHT in isolation.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Retail, manufacturing, services',
            content: 'A retailer runs out because no one set a reorder point.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Four reps',
            content:
              '(1) COGS $400k, avg $50k. (2) 50/day, 5-day lead, 100 safety. (3) 1,000 produced, 25 defective. (4) 100 calls, 10 abandoned.',
            answerKey: '8 turns, 45.6 days; 350; 2.5%; 10%.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 8.4 summary',
            title: 'Four metric families',
            content: 'Inventory, quality, customer service tracked together.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 8 Practice Lab — Operations Snapshot',
      durationMinutes: 35,
      learnerGoal: 'Run a payroll, scheduling, productivity, and inventory snapshot.',
      scenarios: [
        {
          id: 'm08-lab-1',
          prompt: 'Pay 48 hr week at $22/hr with time-and-a-half over 40.',
          answerKey: 'Reg $880, OT $264, gross $1,144.',
        },
        {
          id: 'm08-lab-2',
          prompt:
            'Schedule a small café: breakfast (6–11) 2; lunch (11–3) 4; dinner (3–9) 3, using 8-hour shifts.',
          answerKey:
            'Sample: 2 morning (6–14), 2 mid (10–18), 1 evening (13–21). Total 5, ~40 hours.',
        },
        {
          id: 'm08-lab-3',
          prompt:
            '220 units/8 h, std 25/h, 30 of 40 billable. Productivity, efficiency, utilisation?',
          answerKey: 'Productivity 27.5; efficiency 110%; utilisation 75%.',
        },
        {
          id: 'm08-lab-4',
          prompt:
            'Item sells 80/day, lead 6 days, safety 200. Reorder. COGS $300k, avg inv $40k. Turnover and days.',
          answerKey: 'Reorder 680; turnover 7.5; days 48.7.',
        },
        {
          id: 'm08-lab-5',
          prompt:
            '2,000 units; 60 defective; 25 scrapped; 35 reworked. Defect, scrap, first-pass yield, rework.',
          answerKey: '3.0%; 1.25%; 97.0%; 1.75%.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm08-q1',
        question: '$20/hr, 48 hrs with time-and-a-half over 40. Gross?',
        type: 'calculation',
        correctAnswer: '$1,040',
        explanation: '$800 + $240.',
        relatedLesson: '8.1',
        difficulty: 'easy',
      },
      {
        id: 'm08-q2',
        question: 'Tiered commission 3/4/5% per $25k tier on $75k. Total?',
        type: 'calculation',
        correctAnswer: '$3,000',
        explanation: '$750 + $1,000 + $1,250.',
        relatedLesson: '8.1',
        difficulty: 'medium',
      },
      {
        id: 'm08-q3',
        question: 'Start 7:45 AM, end 4:15 PM, 45-min lunch. Hours?',
        type: 'calculation',
        correctAnswer: '7.75 hours',
        explanation: 'Total 8.5 minus 0.75 lunch.',
        relatedLesson: '8.2',
        difficulty: 'medium',
      },
      {
        id: 'm08-q4',
        question: '220 units/8 h vs 25/h standard. Efficiency?',
        type: 'calculation',
        correctAnswer: '110%',
        explanation: '27.5/25.',
        relatedLesson: '8.3',
        difficulty: 'easy',
      },
      {
        id: 'm08-q5',
        question: '30 billable of 40 available. Utilisation?',
        type: 'calculation',
        correctAnswer: '75%',
        explanation: '30/40.',
        relatedLesson: '8.3',
        difficulty: 'easy',
      },
      {
        id: 'm08-q6',
        question: '50/day, 5-day lead, 100 safety. Reorder?',
        type: 'calculation',
        correctAnswer: '350',
        explanation: '50 × 5 + 100.',
        relatedLesson: '8.4',
        difficulty: 'medium',
      },
      {
        id: 'm08-q7',
        question: '1,000 produced, 25 defective. Defect rate?',
        type: 'calculation',
        correctAnswer: '2.5%',
        explanation: '25/1000.',
        relatedLesson: '8.4',
        difficulty: 'easy',
      },
      {
        id: 'm08-q8',
        question: 'COGS $400k, avg inv $50k. Turnover and days?',
        type: 'scenario',
        options: ['8 turns; ≈45.6 days', '0.125; 365', '8; 365', '50; 8'],
        correctAnswer: '8 turns; ≈45.6 days',
        explanation: '$400/$50; 365/8.',
        relatedLesson: '8.4',
        difficulty: 'medium',
      },
      {
        id: 'm08-q9',
        question: '100 calls, 10 abandoned. Abandonment?',
        type: 'calculation',
        correctAnswer: '10%',
        explanation: '10/100.',
        relatedLesson: '8.4',
        difficulty: 'easy',
      },
      {
        id: 'm08-q10',
        question: 'Daily hours 8.5/8/9/8.5/7. Total and overtime?',
        type: 'scenario',
        options: ['Total 41; OT 1', 'Total 40; OT 0', 'Total 41; OT 0', 'Total 42; OT 2'],
        correctAnswer: 'Total 41; OT 1',
        explanation: '41 − 40 = 1.',
        relatedLesson: '8.2',
        difficulty: 'medium',
      },
      {
        id: 'm08-q11',
        question:
          '2,000 produced, 60 defective, 35 successfully reworked. First-pass yield?',
        type: 'calculation',
        correctAnswer: '97.0%',
        explanation: '(2,000 − 60) / 2,000.',
        relatedLesson: '8.4',
        difficulty: 'hard',
      },
    ],
    moduleSummary:
      'You can run payroll cases, build schedules to meet coverage, compute productivity/efficiency/utilisation, manage inventory with reorder points, and report quality and customer-service metrics.',
    completionChecklist: [
      'I can calculate gross pay including overtime and commission.',
      'I can convert salary and hourly equivalents.',
      'I can compute weekly hours and identify overtime.',
      'I can build a shift schedule meeting coverage.',
      'I can compute productivity, efficiency, and utilisation.',
      'I can compute inventory turnover, days of inventory, and reorder point.',
      'I can compute defect, scrap, first-pass yield, and rework rates.',
    ],
  },
]
