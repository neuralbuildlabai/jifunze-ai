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
    durationMinutes: 175,
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
            answerKey:
              'Sample (50/30/20 on $3,500 net): needs $1,750; wants $1,050; savings/debt $700. Show your own category sums; check needs + wants + savings = net within rounding; flag any category >40% of net for a second look.',
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
            eyebrow: 'Worked example 1 — Comparing two checking accounts',
            title: 'Monthly cost = fee + per-use × count',
            content:
              'Given: Account A — $12 monthly fee + $3 per ATM withdrawal; expected 5 ATM uses per month. Account B — $0 monthly fee + $2 per ATM withdrawal beyond 4 free; expected 5 ATM uses (4 free + 1 paid).\n\nFormula: monthly cost = monthly fee + (paid uses × per-use fee).\n\nA: 12 + (5 × 3) = 12 + 15 = $27/month. Annual: 27 × 12 = $324.\n\nB: 0 + (1 × 2) = $2/month. Annual: 2 × 12 = $24.\n\nDifference: 324 − 24 = $300/year saved with B.\n\nReasonableness: A\'s biggest cost is the monthly fee, not ATM fees; B\'s biggest cost is the rare 5th ATM use. If you make 8 ATM withdrawals/month, B costs 4 × 2 = $8 vs A\'s 8 × 3 + 12 = $36 — B still wins by $28/mo.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — APY on a savings balance',
            title: 'Compound interest at 2% APY on $10,000',
            content:
              'Given: $10,000 savings balance; 2% APY (annual percentage yield, already compounded).\n\nFormula: interest = principal × APY (for one year).\n\nEstimate: 2% of 10,000 = $200.\n\nCalculate: 10,000 × 0.02 = 200.00. Wait — actual compounding at most banks is daily or monthly: APY of 2% on monthly compounding gives effective ~2.018% per year if APR is what\'s quoted; but APY itself is the post-compound number, so 10,000 × 0.02 = exactly $200 over one year.\n\nAnswer: $200/yr (or up to ~$201.84 if your bank quotes APR 2% with daily compounding, where APY ≈ 2.02%).\n\nReasonableness: 2% on 10k is two pennies per dollar = $200. The "APY ≈ APR" relationship: APY ≥ APR; the more frequent the compounding, the bigger the gap. Always read the rate label (APY vs APR vs nominal) — they are not the same.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Build a one-page comparison of two real accounts',
            content:
              'Goal: pick checking + savings combos at two banks.\n\nBank X: checking $5/mo waivable with $1,500 daily balance + $2/non-network ATM; savings 0.5% APY, no minimum.\n\nBank Y: checking $0/mo + free non-network ATMs (rebate up to $20/mo); savings 4.0% APY, $500 minimum to earn rate.\n\nStep 1 — Checking annual cost (assume average balance $800, 6 non-network ATM/mo).\nX: $5 × 12 = 60 (cannot waive, balance too low) + 6 × 2 × 12 = 144 → $204/yr.\nY: 0 + 0 (rebated) → $0/yr.\n\nStep 2 — Savings annual interest on $5,000.\nX: 5,000 × 0.005 = $25/yr.\nY: 5,000 × 0.04 = $200/yr.\n\nStep 3 — Total comparison: X costs $204 and earns $25 → net −$179/yr. Y costs $0 and earns $200 → net +$200/yr.\n\nStep 4 — Y is better by $379/yr in this scenario.\n\nReasonableness: most of the gap is the savings APY difference (3.5 percentage points × $5,000 = $175/yr); the rest is checking fees and ATM fees combined.',
            learnerTask:
              'Compare your current checking and savings accounts vs one online competitor. Compute annual fees and annual interest for each, and the net difference. Decide whether switching is worth the hassle (typical opening time: 30–60 minutes).',
            answerKey:
              'Sample: current bank checking $0/mo, savings 0.05% APY → on $4,000 savings, earns $2/yr. Online bank: checking $0/mo, savings 4.5% APY → earns $180/yr. Net gap: $178/yr in favour of switching. Worth the switch if 30 min of work returns $178 → effective hourly rate $356. Strong answers compute the per-hour return on switching effort; weak answers only state which account is better.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'APY and compounding',
            title: 'Why APY beats nominal rate',
            content:
              'APY (annual percentage yield) is the actual annual return after compounding effects. APR is the nominal annual rate before compounding. With monthly compounding, APY = (1 + APR/12)^12 − 1; with daily compounding, APY = (1 + APR/365)^365 − 1. A 2% APR with daily compounding gives APY ≈ 2.02% — small at low rates but meaningful at higher ones.',
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
            answerKey:
              'Use lesson A vs B: A $12 + 5×$3 ATM = $27/mo; B $0 + 0×$2 = $0/mo (4 free). Annual gap ≈ $324 favouring B before APY. On $5,000 savings, 2.0% vs 1.0% APY adds ≈$50/yr — fold into same table.',
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
              'Credit utilisation = total balance across all cards ÷ total credit limit. Below 30% is healthy and supports a strong credit score; above 70% is risky and dings your score. Two cards: $1,000 used of $5,000 + $500 used of $3,000 → $1,500/$8,000 = 18.75% — healthy. Increasing limits without adding balance lowers utilisation; carrying balance to the next cycle (instead of paying in full) raises it.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Compare three payoff strategies on $5,000 at 18% APR',
            content:
              'Goal: pay off $5,000 credit-card balance at 18% APR. Compare minimum-only, +$100 extra, and +$400 extra (total payments $100, $200, $500).\n\nStep 1 — Compute monthly interest rate: 18% APR ÷ 12 = 1.5% per month.\n\nStep 2 — Use the standard payoff formula or a spreadsheet. For each plan, simulate or look up the months to payoff and total interest.\n\nMinimum-only ($100/mo at start, declining 2%): payoff ≈ 30+ years; total interest > $10,000 (more than the original balance).\n\n+$100 ($200/mo flat): months ≈ 32; total interest ≈ $1,276.\n\n+$400 ($500/mo flat): months ≈ 11; total interest ≈ $449.\n\nStep 3 — Decision: each $100/month extra payment dramatically shrinks total interest. The first $100/month extra cuts interest from $10k+ to $1,276 — a $9k+ saving. The next $300/month extra saves another ~$827.\n\nStep 4 — Reasonableness: total payments × months should approximate principal + interest. $200 × 32 = $6,400 ≈ 5,000 + 1,276 = $6,276 ✓ (small rounding).',
            learnerTask:
              'You owe $3,000 on a card at 22% APR. Compute monthly interest at the start; estimate payoff months at $100/mo, $200/mo, and $400/mo (use rough mental math). Recommend the lowest-interest plan you can sustain and state why.',
            answerKey:
              'Monthly interest start: 3,000 × (0.22/12) = 3,000 × 0.01833 = $55. At $100/mo, only $45 of principal/month at start — payoff drags into multiple years; total interest ≈ $1,500+. At $200/mo, ≈ 19 months, total interest ≈ $590. At $400/mo, ≈ 8 months, total interest ≈ $250. Recommend $200/mo if cash flow allows — large interest savings vs minimum, sustainable; bump to $400/mo for a few months if windfall arrives. Strong answer states the trade-off (cash flow vs interest); weak answer just picks the cheapest without naming the constraint.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Project your minimum-payment timeline',
            content:
              'For your card balance, compute one month interest and how much principal disappears in a year of minimum payments. Example: $1,500 balance at 19% APR → monthly interest 1,500 × (0.19/12) = $23.75. At minimum 2% ($30/mo), only $6.25 of principal disappears each month — a year of minimums kills only $75 of principal.',
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
            answerKey:
              'Lesson template: $2,000 at 18% APR → daily ≈0.0493%; ~30-day interest ≈$29.58. If minimum $100, principal ≈$70 in month 1. Try +$100 extra: recompute next month interest on lower balance; note payoff months drop sharply vs minimum-only.',
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
            eyebrow: 'Worked example 3 — Rent vs buy snapshot',
            title: '$1,500 rent vs a $300,000 home with 20% down',
            content:
              'Given: rent $1,500/mo with $25/mo renter\'s insurance vs buy $300,000 home with 20% down ($60,000), 30-yr mortgage at 6%, property tax $300/mo, homeowner\'s insurance $100/mo, maintenance reserve $250/mo.\n\nFormula: monthly housing cost = principal+interest + tax + insurance + maintenance.\n\nRent: 1,500 + 25 = $1,525/mo.\n\nBuy P&I on $240k at 6%/30: monthly = 240,000 × (0.005) ÷ (1 − 1.005^-360) = 1,200 ÷ 0.83395 = $1,438.92? Let me redo: 240,000 × 0.005 = 1,200; denominator (1 − 1.005^-360) = 0.83395; 1,200 ÷ 0.83395 = $1,438.92. Wait — published simple-loan tables show $1,439. With tax 300 + insurance 100 + maintenance 250 = $2,089/mo.\n\nSnapshot answer: rent $1,525 vs buy $2,089 → buy costs $564/mo more.\n\nReasonableness: ignores tax deductions, equity build, appreciation, and opportunity cost of the down payment. The full rent-vs-buy decision needs a 5–7-year NPV (Module 12); this snapshot only shows monthly out-of-pocket.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Compare 3-yr vs 5-yr auto loan at the same rate',
            content:
              'Goal: $25,000 auto loan at 6% APR. Compare 3-year and 5-year monthly payments and total interest.\n\nStep 1 — Monthly rate: 0.06 ÷ 12 = 0.005.\n\nStep 2 — 3-year (36 months): M = 25,000 × 0.005 ÷ (1 − 1.005^-36) = 125 ÷ 0.16435 = $760.55/mo. Total = 760.55 × 36 = $27,380. Interest = $2,380.\n\nStep 3 — 5-year (60 months): M = 25,000 × 0.005 ÷ (1 − 1.005^-60) = 125 ÷ 0.25884 = $483.32/mo. Total = 483.32 × 60 = $28,999. Interest = $3,999.\n\nStep 4 — Trade-off: 5-yr saves $277/mo cash flow but costs an extra $1,619 in interest. 3-yr is more expensive monthly but cheaper overall.\n\nStep 5 — Decision frame: if you can afford the 3-yr payment without crowding emergency fund, take it. If 3-yr would push savings rate below your target, take 5-yr and pre-pay when bonus arrives.\n\nReasonableness: longer term always = more interest (rule of thumb).',
            learnerTask:
              'A $30,000 student loan offers 7% APR over 5, 7, or 10 years. Compute monthly payment and total interest for each. Recommend a term and state the cash-flow vs interest trade-off in one sentence.',
            answerKey:
              '5-yr: M = 30,000 × (0.07/12) ÷ (1 − (1+0.07/12)^-60) = 175 ÷ 0.29469 = $593.86/mo, total $35,632, interest $5,632. 7-yr: M = 175 ÷ 0.38879 = $452.97/mo, total $38,049, interest $8,049. 10-yr: M = 175 ÷ 0.49744 = $348.33/mo, total $41,800, interest $11,800. Recommendation: 5-yr if disposable income supports $593.86/mo without harming emergency fund — saves ~$6,168 vs 10-yr. Trade-off: each extra year of term costs roughly $1,250–2,000 in additional interest. Strong answer compares all three; weak answer compares only two.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Project a real loan',
            content:
              'Use any online loan calculator (or the formula above) to find monthly payment for two terms on a real-or-realistic loan amount. Compare monthly cash-flow impact and total interest. Decide which term you would take and why.',
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
            answerKey:
              'Lesson $20k @ 6%: 5-yr ≈$386.66/mo, total ≈$23,200, interest ≈$3,200; 3-yr ≈$608.44/mo, total ≈$21,904, interest ≈$1,904. Shorter term saves ≈$1,296 interest but raises cash out ≈$222/mo.',
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
            eyebrow: 'Worked example 1 — Progressive brackets',
            title: '$60,000 in a sample US bracket structure',
            content:
              'Given: illustrative single-filer brackets — 10% on income to $11,000; 12% on $11,001 to $44,725; 22% on $44,726 to $95,375. Income $60,000.\n\nFormula: tax = sum of (bracket portion × bracket rate).\n\nStep 1 — Bracket 1: $11,000 × 10% = $1,100.\nStep 2 — Bracket 2: ($44,725 − $11,000) × 12% = $33,725 × 12% = $4,047.\nStep 3 — Bracket 3: ($60,000 − $44,725) × 22% = $15,275 × 22% = $3,360.50.\n\nTotal tax: 1,100 + 4,047 + 3,360.50 = $8,507.50 → ≈ $8,508.\n\nEffective rate: 8,508 ÷ 60,000 = 14.18%.\n\nReasonableness: marginal rate (22%) is the rate on the next dollar; effective rate (14.2%) is your average rate across all dollars. Always lower than marginal in a progressive system.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Marginal vs effective on a raise',
            title: 'A $5,000 raise on $60,000 income',
            content:
              'Given: same bracket structure as Example 1; income rises from $60,000 to $65,000.\n\nFormula: marginal tax = raise × marginal rate; new total tax = old + marginal tax (entire raise still in 22% bracket since 65,000 < 95,375).\n\nMarginal: 5,000 × 22% = $1,100.\n\nNew total tax: 8,508 + 1,100 = $9,608.\nNew effective rate: 9,608 ÷ 65,000 = 14.78%.\n\nNet take-home raise: 5,000 − 1,100 = $3,900.\n\nAnswer: take-home grows by $3,900 of the $5,000 gross raise.\n\nReasonableness: the entire raise is taxed at 22% (the marginal rate), but the effective rate barely budges (14.18% → 14.78%) because most income is still in lower brackets. The "a raise will hurt me" myth is wrong: a raise can never reduce take-home in a progressive system; only the additional dollars are taxed at the higher rate.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Compute take-home from gross with full payroll deductions',
            content:
              'Goal: gross salary $75,000/yr (US single filer); apply income tax brackets and payroll taxes.\n\nStep 1 — Income tax: bracket 1 ($11k × 10% = $1,100), bracket 2 ($33,725 × 12% = $4,047), bracket 3 ($75,000 − $44,725 = $30,275 × 22% = $6,660.50). Total income tax: 1,100 + 4,047 + 6,660.50 = $11,807.50.\n\nStep 2 — Social Security: 75,000 × 6.2% = $4,650 (under wage cap).\n\nStep 3 — Medicare: 75,000 × 1.45% = $1,087.50.\n\nStep 4 — Total federal deductions: 11,807.50 + 4,650 + 1,087.50 = $17,545.\n\nStep 5 — Take-home (federal only, ignoring state tax): 75,000 − 17,545 = $57,455.\n\nStep 6 — Effective combined federal rate: 17,545 ÷ 75,000 = 23.4%.\n\nNote: state income tax, retirement contributions, health-insurance premiums, and HSA deductions further reduce take-home. The 23.4% federal effective rate is a floor.',
            learnerTask:
              'A worker earns $52,000/yr gross. Using the same illustrative bracket structure, compute (1) federal income tax, (2) Social Security, (3) Medicare, (4) total federal deductions, (5) annual take-home, (6) effective combined federal rate.',
            answerKey:
              '(1) Bracket 1: 11,000 × 10% = 1,100. Bracket 2: (44,725 − 11,000) × 12% = 33,725 × 12% = 4,047. Bracket 3: (52,000 − 44,725) × 22% = 7,275 × 22% = 1,600.50. Total income tax: 6,747.50. (2) SS: 52,000 × 6.2% = 3,224. (3) Medicare: 52,000 × 1.45% = 754. (4) Total deductions: 6,747.50 + 3,224 + 754 = 10,725.50. (5) Take-home: 52,000 − 10,725.50 = $41,274.50. (6) Effective rate: 10,725.50 / 52,000 = 20.6%. Strong answers show all three components of payroll separately; weak answers lump them together and lose the SS-cap insight.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Payroll deductions',
            title: 'More than just income tax',
            content:
              'US: Social Security 6.2% on wages up to the annual wage cap (~$168,600 for 2024); Medicare 1.45% on all wages with no cap, plus 0.9% additional Medicare on high earners. Kenya: PAYE on graduated brackets, NSSF (pension), NHIF/SHIF (health), and possibly housing levy and AHL. Always verify current rates and caps with your tax authority — they change.',
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
            answerKey:
              'Lesson sample: tax ≈$8,508 on $60,000 gross → effective 8,508 ÷ 60,000 ≈ 14.2%. Marginal on the next $5k is still 22% in that bracket, so expect ≈$1,100 more tax, not 14.2% × $5k.',
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
          'Lesson 5.4 example: rent $1,500/mo + $25 renter\'s insurance vs buy with P&I $1,438.92 + tax $300 + insurance $100 + maintenance $250. Monthly difference?',
        type: 'scenario',
        options: [
          'Buying ~$564 more/mo',
          'Renting ~$564 more/mo',
          'About the same',
          'Cannot tell without down payment',
        ],
        correctAnswer: 'Buying ~$564 more/mo',
        explanation: 'Rent $1,525 vs buy $2,088.92 → $563.92 ≈ $564/mo.',
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
            eyebrow: 'Worked example 1 — Cost behaviour at three volumes',
            title: 'Total cost = fixed + variable × units',
            content:
              'Given: fixed cost $10,000/month; variable cost $15/unit.\n\nFormula: total = F + v × Q; unit cost = total ÷ Q.\n\n100 units: total = 10,000 + 15 × 100 = $11,500; unit cost = 11,500 / 100 = $115/unit.\n500 units: total = 10,000 + 7,500 = $17,500; unit cost = $35/unit.\n1,000 units: total = 10,000 + 15,000 = $25,000; unit cost = $25/unit.\n\nReasonableness: as volume rises, fixed cost spreads over more units → unit cost falls toward the variable-cost floor of $15/unit. The $25 unit cost at 1,000 units is approaching but not equal to $15 — the gap is the fixed cost spread over units = $10,000 ÷ 1,000 = $10/unit fixed-cost contribution at 1,000, which is exactly the difference between the $25 unit cost and the $15 variable floor.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Step costs',
            title: 'When fixed cost steps up at a capacity boundary',
            content:
              'Given: bakery fixed cost $8,000/mo with one oven (max 800 loaves/day = 24,000/mo). Variable $1.50/loaf. Adding a second oven raises fixed to $14,000/mo (rent + electricity + maintenance) and doubles capacity.\n\nScenarios:\n20,000 loaves: still on one oven. Total = 8,000 + 1.50 × 20,000 = $38,000; unit cost = $1.90.\n26,000 loaves: needs second oven. Total = 14,000 + 1.50 × 26,000 = $53,000; unit cost = $2.04.\n40,000 loaves: still two ovens (under 48,000 cap). Total = 14,000 + 1.50 × 40,000 = $74,000; unit cost = $1.85.\n\nAnswer: unit cost JUMPS at the capacity step (from $1.90 at 20k to $2.04 at 26k) before falling again at higher volumes ($1.85 at 40k). Step costs are non-linear and trip up "I will just make more" intuition.\n\nReasonableness: just above the step (26k loaves) is the worst per-unit cost; only push past the step if you can comfortably fill the new capacity.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Find the break-even units between two scale options',
            content:
              'Goal: a service business has two scale options. Stay small: $5,000 fixed, $80/job variable. Hire one tech: $9,500 fixed, $40/job variable.\n\nStep 1 — Set total costs equal: 5,000 + 80Q = 9,500 + 40Q.\n\nStep 2 — Solve for Q: 40Q = 4,500 → Q = 112.5.\n\nStep 3 — Decision rule: below 112.5 jobs/month, stay small. Above 112.5, hire.\n\nStep 4 — At 100 jobs: small = 5,000 + 8,000 = $13,000 vs hired = 9,500 + 4,000 = $13,500. Small wins by $500.\n\nStep 5 — At 150 jobs: small = 5,000 + 12,000 = $17,000 vs hired = 9,500 + 6,000 = $15,500. Hired wins by $1,500.\n\nReasonableness: at exactly 112 or 113 jobs the costs are nearly identical; the decision is mainly about whether you expect demand to grow past the break-even before next quarter.',
            learnerTask:
              'A small online seller can fulfill themselves ($1,200 fixed, $4/order variable) or use a fulfilment center ($3,500 fixed, $1.20/order variable). Find the break-even orders. Recommend a tier if expected monthly volume is 700, 850, or 1,200 orders.',
            answerKey:
              'Set: 1,200 + 4Q = 3,500 + 1.20Q → 2.80Q = 2,300 → Q = 821. At 700: self = 1,200 + 2,800 = 4,000; FC = 3,500 + 840 = 4,340 → self wins. At 850: self = 1,200 + 3,400 = 4,600; FC = 3,500 + 1,020 = 4,520 → FC wins by $80 (close call). At 1,200: self = 1,200 + 4,800 = 6,000; FC = 3,500 + 1,440 = 4,940 → FC wins by $1,060. Recommendation: stay self until volume reliably exceeds 850 orders/month for two consecutive months. Strong answer names the trigger; weak answer just states which is cheaper at one volume.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Limits of scale',
            title: 'Linear scaling has a ceiling',
            content:
              'Variable cost per unit usually drops with volume (bulk discounts, learning curve), but only until a capacity boundary. Beyond that, you need a second machine, a second shift, more space, or more managers — and fixed cost steps up. Always model step costs explicitly; don\'t assume linear.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Sketch a fixed/variable split',
            content:
              'List a business\'s top six monthly costs and label each fixed (paid regardless of output) or variable (scales with output). A typical small business: rent F, salaries F, software F, packaging V, shipping V, raw materials V.',
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
              'Given $100 price with $60 cost: profit $40, margin 40%. A 20% discount → $80 price, profit $80 − $60 = $20, margin 25%. The discount cut revenue by 20% but profit by 50%. Rule of thumb: at a 40% margin, every 1% discount cuts profit by ~2.5%. The lower the starting margin, the more brutal the discount.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Build a price floor that protects margin under discount',
            content:
              'Goal: a product costs $80 to make. Target net margin 35%. What is the price floor before any discount? What is the floor if you anticipate a 15% promotional discount?\n\nStep 1 — Required price for 35% margin: price = cost ÷ (1 − margin) = 80 ÷ 0.65 = $123.08.\n\nStep 2 — Verify: profit = 123.08 − 80 = 43.08; margin = 43.08 / 123.08 = 35% ✓.\n\nStep 3 — If a 15% discount is anticipated, the discounted price must still hit $123.08 to preserve margin. So sticker price = 123.08 ÷ (1 − 0.15) = 123.08 ÷ 0.85 = $144.80.\n\nStep 4 — Verify: 144.80 × 0.85 = $123.08 ✓; profit at $123.08 with $80 cost = $43.08 (35% margin). \n\nStep 5 — Reasonableness: if you list at $123 and then run a 15% promo, your profit collapses to $123 × 0.85 − 80 = 24.55 (margin 23.5%) — not 35%. The discount-proofed sticker ($144.80) is what protects the target margin under sale conditions.',
            learnerTask:
              'A bakery cookie costs $0.80 to make. Owner wants a 50% net margin. They run a 20% discount during Black Friday. What sticker price protects the target margin during the sale?',
            answerKey:
              'Required net price for 50% margin: 0.80 ÷ (1 − 0.50) = $1.60. With 20% discount applied to sticker: sticker = 1.60 ÷ (1 − 0.20) = 1.60 ÷ 0.80 = $2.00. Verify: 2.00 × 0.80 = 1.60; 1.60 − 0.80 = 0.80 profit, margin 50% ✓. If the bakery had listed at $1.60 and run the same 20% discount, the discounted price would be $1.28, profit only $0.48, margin 37.5% — the sale would silently destroy the target. Strong answer always works backward from the post-discount target.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'One conversion',
            content:
              '60% markup → margin: margin = 0.60 ÷ 1.60 = 37.5%. 25% margin → markup: markup = 0.25 ÷ 0.75 = 33.3%. The two are NEVER the same number unless you are at 0%; always say which one you mean.',
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
          'Set prices using cost-plus and value logic, calculate break-even in units and dollars, and use margin of safety to test how exposed a model is to a sales miss.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Pricing approaches',
            title: 'Cost-plus, value-based, competitive',
            content:
              'Cost-plus pricing starts at unit cost and adds a markup that covers overhead and margin: price = cost × (1 + markup) or price = cost ÷ (1 − margin). Value-based pricing starts at what the buyer will pay for the outcome the product delivers — useful when the price is justified by the value, not the cost. Competitive pricing anchors to the market norm and adjusts up or down on quality. Real businesses blend all three: cost-plus sets the floor, value sets the ceiling, competitive checks the band.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Markup vs margin',
            title: 'Two views of the same gap',
            content:
              'Markup is the gap as a percentage of cost: markup = (price − cost) ÷ cost. Margin is the gap as a percentage of price: margin = (price − cost) ÷ price. A 50% markup yields a 33.3% margin (50/150); a 50% margin requires a 100% markup. Confusing these is the #1 pricing math error in small business.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Cost-plus on a $60 item',
            title: 'Two views of one product',
            content:
              'Given: unit cost = $60. Compute the price for 50% markup and for 50% margin.\n\nFormula: markup → price = cost × (1 + markup); margin → price = cost ÷ (1 − margin).\n\nMarkup version: price = 60 × 1.50 = $90. Resulting margin = (90 − 60) ÷ 90 = 33.3%.\n\nMargin version: price = 60 ÷ 0.50 = $120. Resulting markup = (120 − 60) ÷ 60 = 100%.\n\nAnswer: 50% markup → $90 (33.3% margin). 50% margin → $120 (100% markup).\n\nReasonableness: same cost, same percentage label, very different prices. Always state which one you mean before quoting.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Coffee-shop break-even',
            title: 'How many cups before profit starts?',
            content:
              'Given: fixed cost per month $11,800; price per cup $4.50; variable cost per cup $1.50.\n\nFormula: contribution per unit = price − variable; break-even units = fixed ÷ contribution; break-even revenue = break-even units × price; or = fixed ÷ contribution ratio (where ratio = contribution ÷ price).\n\nEstimate: contribution per cup ≈ 3; need 12,000 ÷ 3 = 4,000 cups; revenue ≈ 4,000 × 4.50 = 18,000 ≈ 600/day at 30 days.\n\nCalculate: contribution = 4.50 − 1.50 = $3.00; break-even units = 11,800 ÷ 3 = 3,933.3 → 3,934 cups/month; break-even revenue = 3,934 × 4.50 = $17,703; or = 11,800 ÷ (3 ÷ 4.50) = 11,800 ÷ 0.667 = $17,691 (matches within rounding).\n\nAnswer: ≈ 3,934 cups/month ≈ 131 cups/day to break even. Anything more is profit; anything less is loss.\n\nReasonableness: 131 cups/day at 4.50 → 590/day revenue. A small café that hits 200 cups/day clears $14,000/yr operating profit on this model. Verify the actual variable cost per cup (milk, beans, cup, lid) before relying on this number.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Build a small-business pricing + break-even pair',
            content:
              'Goal: handcrafted soap business. Cost per bar = $3.50; target margin = 60%; expected fixed cost per month = $2,200 (rent + insurance + tools).\n\nStep 1 — Price by margin: price = 3.50 ÷ (1 − 0.60) = 3.50 ÷ 0.40 = $8.75.\nStep 2 — Sanity check via markup view: gap = 8.75 − 3.50 = 5.25; markup = 5.25 ÷ 3.50 = 150% (so 60% margin = 150% markup ✓).\nStep 3 — Contribution per bar: 8.75 − 3.50 = 5.25.\nStep 4 — Break-even units: 2,200 ÷ 5.25 = 419.0 → 420 bars/month.\nStep 5 — Break-even revenue: 420 × 8.75 = $3,675/month.\nStep 6 — Margin of safety check: if forecast = 600 bars/mo, MoS = (600 − 420) ÷ 600 = 30%. Strong cushion; a 30% sales miss only reaches break-even.\n\nReasonableness: 420 bars/month at one farmer\'s market ≈ 100/wk ≈ realistic at $8.75 each.',
            learnerTask:
              'Build the same pair for an artisan candle business: unit cost $5.20, target margin 55%, fixed cost $1,800/month, forecast 350 candles/month. Show price, contribution, break-even units and revenue, and margin of safety.',
            answerKey:
              'Price = 5.20 ÷ (1 − 0.55) = 5.20 ÷ 0.45 = $11.56 → round $11.99 for a clean tag price (resulting margin 56.6%). Contribution per candle = 11.99 − 5.20 = 6.79. Break-even units = 1,800 ÷ 6.79 = 265.1 → 266 candles/month. Break-even revenue = 266 × 11.99 = $3,189. MoS = (350 − 266) ÷ 350 = 24%. Verdict: positive cushion but tight; a single bad month at 250 candles flips to loss. Verify variable cost includes wax, wick, jar, fragrance, and label, not just wax.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Margin of safety',
            title: 'How far above break-even',
            content:
              'Margin of safety = (current sales − break-even sales) ÷ current sales. Example: 700 units sold, break-even 500, MoS = 200 ÷ 700 = 28.6%. The interpretation: sales can fall up to 28.6% before the business hits break-even. Below 15% MoS means a small downturn flips to loss; above 40% means the model has substantial cushion.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Markup vs margin trap',
            content:
              'A vendor says "we mark up 40%." Cost = $30. Markup price = 30 × 1.40 = $42; margin on that price = 12 ÷ 42 = 28.6%, not 40%. If you assume 40% margin you would expect price = 30 ÷ 0.6 = $50. The two labels disagree by $8 on a $30 item — substantial.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Pricing/break-even traps',
            content:
              'Confusing markup and margin in pricing; treating average variable cost as constant when it isn\'t (volume discounts, ingredient drift); ignoring fixed cost step-changes (e.g. a second oven required above 1,500 cups/day); pricing without a value or competitive sanity check.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Cafes, makers, services',
            content:
              'A café asks "how many cups a day before we cover rent?" A maker asks "how many candles a month at this market?" A consulting service asks "how many engagements a quarter?" Same arithmetic, different unit. Every small business owner should know their break-even in their natural unit.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Two pricing/break-even reps',
            content:
              '(1) Bar of soap costs $3.50 to make; target 60% margin → what is the price?\n(2) Subscription product: fixed cost $8,000/mo; price per subscription $25; variable cost per subscription $10. What are break-even units and revenue?\n\nShow estimate, calculation, and reasonableness for each.',
            answerKey:
              '(1) Price = 3.50 ÷ (1 − 0.60) = 3.50 ÷ 0.40 = $8.75. Sanity: markup version = 3.50 × 2.50 = $8.75 ✓. (2) Contribution = 25 − 10 = $15; break-even units = 8,000 ÷ 15 = 533.3 → 534 subscriptions; break-even revenue = 534 × 25 = $13,350. Reasonableness: above 600 subs/mo, model clears $1,000/mo profit per 100 subs above 534.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 6.4 summary',
            title: 'Price for the floor, the ceiling, and break-even',
            content:
              'Cost-plus protects you; value pricing captures willingness; break-even and margin of safety test the model. State markup or margin explicitly so quotes are unambiguous.',
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
    durationMinutes: 190,
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
            eyebrow: 'Worked example 1 — Absolute reference for tax rate',
            title: 'One cell drives many calculations',
            content:
              'Given: tax rate stored in B1 = 0.08 (= 8%). Column A has 5 line-item subtotals. Build column C = subtotal × tax.\n\nFormula in C2: =A2 * $B$1.\n\nWhen copied down to C3, C4, C5, C6:\nC3 → =A3 * $B$1 (relative A reference shifts; absolute B1 stays).\nC4 → =A4 * $B$1.\nC5 → =A5 * $B$1.\nC6 → =A6 * $B$1.\n\nReasonableness: changing B1 from 0.08 to 0.085 instantly rescales every line; without the $ signs, copying would shift to =A3*B2, =A4*B3, etc., producing nonsense.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Mixed reference for a multiplication table',
            title: 'Locking only the row or only the column',
            content:
              'Given: build a multiplication table. Row 1 (B1:F1) holds 1, 2, 3, 4, 5. Column A (A2:A6) holds 1, 2, 3, 4, 5. Cell B2 should compute B$1 × $A2 (lock row 1; lock column A).\n\nFormula in B2: =B$1 * $A2.\n\nWhen copied to D4: D$1 × $A4 = 3 × 4 = 12 ✓.\nWhen copied to F6: F$1 × $A6 = 5 × 5 = 25 ✓.\nWhen copied to C2: C$1 × $A2 = 2 × 1 = 2 ✓.\n\nReasonableness: mixed references are how a single formula populates a 2D grid. Without them, you would write 25 different formulas. The dollar in front of "1" locks the row when copying down; the dollar in front of "A" locks the column when copying right.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Build a one-cell-driven currency converter',
            content:
              'Goal: build a sheet that converts USD prices to KES. Cell B1 holds the exchange rate (e.g. 130 KES/USD). Column A holds 5 USD prices. Column B should show KES values.\n\nStep 1 — In B2 write: =A2 * $B$1.\n\nStep 2 — Copy B2 down to B6. Each cell shifts A reference (A2 → A3 → A4 etc.) but keeps $B$1 fixed.\n\nStep 3 — Test by editing B1 to 132. Every KES value updates simultaneously.\n\nStep 4 — Cross-check one row manually: if A3 = $50 and B1 = 130, then B3 should equal 50 × 130 = 6,500 KES.\n\nStep 5 — Common bug: if you forget the $ signs and use =A2 * B1, copying B2 to B3 produces =A3 * B2 (wrong — multiplies by a price, not the rate). Audit by clicking each cell and confirming the formula bar shows $B$1.',
            learnerTask:
              'Build a 4-row inch-to-cm converter. B1 holds 2.54 (cm/inch). Column A holds 6, 12, 18, 24 inches. Write the column B formula and predict the cm values. Verify by changing B1 to 2.5 (slightly off) and stating which cm values change and how much.',
            answerKey:
              'B2 formula: =A2 * $B$1. Predicted cm values at 2.54: B2 = 6 × 2.54 = 15.24; B3 = 30.48; B4 = 45.72; B5 = 60.96. Changing B1 to 2.5: every cm value shifts down proportionally — B2 = 15.00, B3 = 30.00, B4 = 45.00, B5 = 60.00. Strong answers verify the formula bar shows $B$1; weak answers retype the rate per row and break the abstraction.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Predict the formula',
            content:
              'C2 = $A2 * B$1. Copied to D5? Result: $A5 * B$1. The $A locks the column (still A); the unlocked row shifts from 2 to 5. The B is unlocked (shifts to D), but $1 keeps the row at 1.',
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
            answerKey:
              'If A2=10, B2 =10*$B$1 → 25.4 cm. A3=12 → 30.48 cm. Copying B2 down keeps $B$1 fixed. Change B1 to 2.540001 — all cm values rescale together.',
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
              '=IF(A1>=75, "Pass", "Fail"). Nested IF for grades. For more than 3 levels prefer IFS or a lookup table.',
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
              '(a) total expenses; (b) flag scores below 60; (c) find unit price by name. Confirm: SUM; IF; VLOOKUP.',
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
            answerKey:
              'Row 2: B2 score; C2 =SUM($B$2:$B$6); D2 =AVERAGE($B$2:$B$6); E2 =IF(B2>=75,"Pass","Fail"). Letter grade: nested IF or IFS from thresholds (e.g. ≥90 A, ≥80 B, …).',
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
            answerKey:
              'Sample: Jan start $10k; in $12k; out $9.5k; net +$2.5k; end $12.5k. Feb start $12.5k; in $11k; out $10k; net +$1k; end $13.5k. Mar start $13.5k; in $10k; out $11k; net −$1k; end $12.5k. Each ending becomes next beginning — no circular refs.',
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
            answerKey:
              'Lesson check: income $4,500; expenses $2,650; net $1,850; savings rate = 1,850 ÷ 4,500 ≈ 41.1% (format cell as %, not ×100 in formula). Tax in $B$1: each line = amount × $B$1.',
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
            eyebrow: 'Worked example 1 — Region × product pivot',
            title: 'Long source table to small summary grid',
            content:
              'Given: source table with 200 rows, columns Date, Region, Product, Sales.\n\nFormula: pivot rows = Product; columns = Region; values = SUM(Sales).\n\nResult: a 4-product × 3-region grid showing total sales per cell, with row totals (per product across regions) and column totals (per region across products), plus a grand total in the bottom-right corner.\n\nVerification: grand total should equal SUM(sales) of the source column. Example: source SUM(sales) = $487,250; pivot grand total = $487,250 ✓. If they disagree, you have either filtered source rows (excluded from the SUM) or the pivot is using AVERAGE/COUNT instead of SUM — common error mode when the column header is text-formatted.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Filter + conditional format together',
            title: 'Find slow-paying customers',
            content:
              'Given: 80 invoices with columns Customer, Amount, IssueDate, Paid.\n\nGoal: highlight invoices unpaid >30 days for follow-up.\n\nStep 1 — Filter Paid = "No". Reduces 80 rows to ~25 unpaid rows.\n\nStep 2 — Add a helper column: =TODAY() − IssueDate to compute days outstanding.\n\nStep 3 — Conditional format helper column: cells > 60 = red; 30–60 = orange; < 30 = green.\n\nStep 4 — Sort the filtered table by helper column descending → oldest unpaid invoices first.\n\nResult: a focused list of overdue accounts ordered by urgency. Action items become obvious without writing a formula for each row.\n\nReasonableness: the filtered count should be smaller than total; the helper column values should all be positive integers; the highlighted reds should match what your AR ageing report shows.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Build a 3-step monthly review with sort, pivot, and conditional formatting',
            content:
              'Goal: monthly sales review for a small e-commerce business with 500 transactions.\n\nStep 1 — Build a pivot: rows = Product, columns = Month, values = SUM(Revenue). Verify grand total matches SUM(source Revenue) = $124,560.\n\nStep 2 — Sort the pivot by Month-12 column descending → identifies top December sellers.\n\nStep 3 — Conditional format the entire data area with a 3-colour scale (green high, yellow mid, red low). Best sellers visually pop.\n\nStep 4 — Add a calculated row at the bottom: month-over-month % change = (current − prior) ÷ prior. Conditional format that row: green for positive, red for negative.\n\nStep 5 — Action: write 2–3 sentences describing which products and months drove the result, with revenue figures cited.\n\nReasonableness: the colour scale should reveal a non-uniform pattern; if everything is the same colour, the gradient thresholds are wrong — adjust the conditional formatting bounds.',
            learnerTask:
              'Take your last bank statement (or a list of any 30+ transactions). Build a pivot grouping by category (food, transport, utilities, entertainment, other) with SUM(Amount). Sort descending. Apply conditional formatting to highlight categories above $200. Write one sentence about the largest category.',
            answerKey:
              'Sample: pivot with rows = category, value = SUM(Amount). Result: Food $487, Transport $312, Utilities $245, Entertainment $189, Other $156. Sort descending → Food first. Conditional format >$200 = red highlight → Food, Transport, Utilities flagged. Largest category: Food at $487 (33% of $1,389 total). Strong answer cites the category percentage of total spending; weak answer just states which is biggest.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Conditional formatting',
            title: 'Make what matters jump off the page',
            content:
              'Conditional formatting changes a cell\'s fill colour, text colour, or icon based on its value or a formula. Highlight top performers (top 10%), flag overdue invoices (date < TODAY() − 30), colour-band a heat map (data bars or 3-colour scales). Use sparingly — three colours max per sheet, otherwise the formatting itself becomes noise.',
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
            answerKey:
              'Lesson pattern: rows = product (or payee); columns = month; values = SUM of amount. Grand total should equal SUM(source column); if not, you likely filtered source rows.',
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
            type: 'worked_example',
            eyebrow: 'Worked example — Cleaning a transaction table and computing margin',
            title: 'From a messy export to revenue, cost, and margin %',
            content:
              'Why this matters: most real exports arrive with trailing spaces, inconsistent capitalisation, and the occasional duplicate. If you build formulas before cleaning, every total downstream is wrong, and a pivot table will treat "Widget" and "Widget " (with a trailing space) as two different products.\n\nGiven: a 5-row sales export with columns A Date, B Product, C Units, D Unit Price, E Unit Cost.\n  Row 2: 2026-04-01, "Widget", 10, $25.00, $15.00.\n  Row 3: 2026-04-01, "Widget " (trailing space), 5, $25.00, $15.00.\n  Row 4: 2026-04-02, "Gadget", 8, $40.00, $22.00.\n  Row 5: 2026-04-03, "Gadget", 3, $40.00, $22.00.\n  Row 6: 2026-04-03, "Bundle", 2, $90.00, $55.00.\n\nStep 1 — Clean the product column. In F2 write =TRIM(B2) and copy down to F6. F2:F6 now read Widget, Widget, Gadget, Gadget, Bundle — the trailing space in row 3 is gone, so summaries can group properly.\n\nStep 2 — Revenue per row in column G: G2 =C2*D2 copied down.\n  G2 = 10×25 = $250. G3 = 5×25 = $125. G4 = 8×40 = $320. G5 = 3×40 = $120. G6 = 2×90 = $180.\n  Total revenue =SUM(G2:G6) = $995.\n\nStep 3 — Cost per row in column H: H2 =C2*E2 copied down.\n  H2 = 10×15 = $150. H3 = 5×15 = $75. H4 = 8×22 = $176. H5 = 3×22 = $66. H6 = 2×55 = $110.\n  Total cost =SUM(H2:H6) = $577.\n\nStep 4 — Gross margin (profit) per row in column I: I2 =G2-H2 copied down.\n  I2 = $100. I3 = $50. I4 = $144. I5 = $54. I6 = $70. Total margin =SUM(I2:I6) = $418.\n\nStep 5 — Margin % per row in column J formatted as percentage: J2 =I2/G2.\n  J2 = 100/250 = 40.0%. J3 = 50/125 = 40.0%. J4 = 144/320 = 45.0%. J5 = 54/120 = 45.0%. J6 = 70/180 = 38.9%.\n  Overall margin % = total margin ÷ total revenue = 418/995 = 42.0%.\n\nFormula consistency check: every revenue cell uses the same =Cn*Dn pattern; every cost cell uses =Cn*En; every margin cell uses =Gn-Hn. If you click down column G and the formula bar shows a hard-coded number anywhere, that row was typed instead of computed and will not update if a price changes.\n\nCheck totals against the source: 250+125+320+120+180 = 995 ✓. 150+75+176+66+110 = 577 ✓. Margin total 418 must equal revenue 995 minus cost 577 — and 995−577 = 418 ✓. Three independent paths to the same number is the cheapest audit you will ever run.\n\nCommon mistake and correction: a tempting (but wrong) shortcut for overall margin % is to AVERAGE the row margin percentages: (40+40+45+45+38.9)/5 = 41.78%. This weights every transaction equally regardless of dollar size — a $5 sale would count as much as a $5,000 sale. The correct aggregate is always total margin ÷ total revenue (here 418/995 = 42.0%). The two only agree when every row has the same revenue.\n\nReasonableness: average unit margin across the table is roughly $10/unit (Widget) to $35/unit (Bundle), and we sold 28 units total. A back-of-envelope range for total margin is therefore between 28×$10 = $280 and 28×$35 = $980. Our $418 sits comfortably inside that range, so the totals are not off by an order of magnitude.\n\nBusiness interpretation (one paragraph): revenue $995 produced gross margin $418 at a 42.0% blended rate. Gadget is the strongest line — highest margin rate (45%) and second-highest revenue ($440). Bundle is the weakest line at 38.9% margin and only $180 revenue, so it is a candidate for either a price review or a component-cost review before the next quarter.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice — Build a product summary table and interpret it',
            title: 'From cleaned rows to a one-page management view',
            content:
              'Goal: take the cleaned 5-row table from the previous worked example and produce a 3-row product summary that a manager can read in 30 seconds. You will use SUMIF (or a pivot table) and finish with a short written interpretation. The summary lives in a SEPARATE region of the sheet so the raw data stays raw — that separation is the single biggest hygiene habit in adult spreadsheets.\n\nStep 1 — Lay out the summary in A10:F13 with headers in row 10: Product, Units, Revenue, Cost, Margin, Margin %. Put product names in A11:A13 (Widget, Gadget, Bundle).\n\nStep 2 — In B11 total Widget units with =SUMIF($F$2:$F$6,"Widget",$C$2:$C$6) → 10+5 = 15 units. Use absolute references (the $ signs) so you can copy the formula down without the ranges drifting. B12 (Gadget) = 8+3 = 11 units. B13 (Bundle) = 2 units. Total = 28 units.\n\nStep 3 — Repeat the SUMIF pattern for revenue (column C) and cost (column D), pointing the sum range at G2:G6 and H2:H6 respectively.\n  Widget: revenue 250+125 = $375; cost 150+75 = $225; margin $150; margin % = 150/375 = 40.0%.\n  Gadget: revenue 320+120 = $440; cost 176+66 = $242; margin $198; margin % = 198/440 = 45.0%.\n  Bundle: revenue $180; cost $110; margin $70; margin % = 70/180 = 38.9%.\n\nStep 4 — In E11 write =C11-D11 (margin) and in F11 write =E11/C11 formatted as percentage. Copy down. Every margin and margin % cell now uses the same formula pattern — if you ever need to add a new product row, the formulas keep working.\n\nStep 5 — Sanity check totals against the raw rows. Add =SUM(C11:C13) below the table: 375+440+180 = $995. This MUST equal =SUM(G2:G6) on the raw side, which is also $995. If the two totals disagree, you almost certainly missed a product label in step 2 — go back and check that every distinct value in column F appears as one (and only one) row in A11:A13.\n\nStep 6 — Pivot table alternative: select F1:J6, insert a pivot table, drag the cleaned Product column to Rows and Revenue, Cost, and Margin to Values (set each to Sum). The pivot output should match your SUMIF table to the cent. If the pivot shows four product rows instead of three, you forgot Step 1 (TRIM) and "Widget" and "Widget " split into two groups — go fix the cleanup, refresh the pivot, and re-check.\n\nStep 7 — Spot the mistake. Suppose a colleague writes overall margin % as =AVERAGE(F11:F13) and reports 41.3%. Why is that wrong, and what is the correct cell? It is wrong because it treats Bundle (only $180 revenue) as equally important as Widget ($375). The correct overall margin % is total margin ÷ total revenue = (150+198+70) ÷ (375+440+180) = 418 ÷ 995 = 42.0% — compute it as one cell, not as an average of three percentages.\n\nStep 8 — Write a two-sentence business interpretation under the summary table. Strong interpretation: "Gadget produces the most gross margin dollars ($198) at the highest rate (45.0%), so it deserves first-call inventory protection. Bundle is the weakest line at 38.9% margin and the smallest revenue contribution ($180), so it is the natural candidate for a price test or a component-cost review before the next planning cycle." Notice the strong version cites both rate and dollars — never reach a conclusion from one of those numbers alone.',
            learnerTask:
              'Add a fourth product row to the raw export — Row 7: 2026-04-04, "Sticker", 50 units, $2.00 unit price, $0.80 unit cost. Re-run the cleanup, recompute revenue, cost, margin, and margin % per row, refresh the SUMIF (or pivot) summary, and write a two-sentence interpretation that names BOTH the product with the highest margin % AND the product with the highest gross margin dollars. End with a one-line reasonableness check that proves your new totals are internally consistent.',
            answerKey:
              'Per-row computations after adding Sticker — revenue 50×$2.00 = $100; cost 50×$0.80 = $40; margin $60; margin % = 60/100 = 60.0%. New table totals: revenue $1,095, cost $617, gross margin $478, blended margin % = 478/1,095 = 43.7%. Summary table now has four product rows: Widget 15 units / $375 / 40.0%; Gadget 11 / $440 / 45.0%; Bundle 2 / $180 / 38.9%; Sticker 50 / $100 / 60.0%. Strong interpretation names BOTH ratios: "Sticker has the highest margin rate (60.0%) but Gadget still produces the most gross margin dollars ($198) because dollar volume matters more than rate when prioritising the next quarter\'s product mix." A weak answer cites only margin % and concludes "push more Stickers" without noticing that 50 stickers only produce $60 of margin versus Gadget\'s $198. Reasonableness check: total margin must equal revenue minus cost, so 478 = 1,095 − 617 ✓; SUMIF totals across the four product rows must equal the raw column sums to the cent (1,095 and 617) — if they differ, the cleanup step (TRIM) was skipped or a product label was misspelled.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Make one report-ready chart',
            content: 'Build one chart with title, axis labels, legend, currency formatting.',
            answerKey:
              'Checklist: line chart if months on X; currency 0 decimals on $ axis; title states the claim (“Revenue up 25% in 6 months”); legend only if needed; y-axis starts at 0 unless log scale justified.',
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
        question: "A1 score: 'Pass' if ≥75, else 'Fail'. Formula?",
        type: 'calculation',
        correctAnswer: '=IF(A1>=75, "Pass", "Fail")',
        explanation: 'Standard IF; threshold matches this course’s 75% pass bar.',
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
    durationMinutes: 130,
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
          'Calculate hourly pay with overtime and holiday premium, three commission structures (straight, base+, tiered), and convert between salary and hourly accurately.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Hourly basics',
            title: 'Pay equals rate times hours, with caveats',
            content:
              'Gross pay = rate × hours, plus any overtime or premium pay. Net pay subtracts mandatory and elective deductions (taxes, retirement, health). The standard US overtime rule for non-exempt workers is 1.5× the base rate for hours worked beyond 40 in one week. Holiday or weekend work may be paid at 2×. Always confirm the rule that applies in your jurisdiction and to your worker classification — rules vary by country, state, and employee status (exempt vs non-exempt).',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Three commission shapes',
            title: 'Straight, base + commission, tiered',
            content:
              'Straight commission: pay = rate × sales. Base + commission: pay = base + rate × sales (or rate × sales above a threshold). Tiered commission: pay = sum of (tier rate × sales in that tier). Tiered is the trap — make sure you sum tier-by-tier, not apply the highest tier to all sales.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Overtime + holiday premium',
            title: 'Layered pay rates',
            content:
              'Given: base $20/hr; worked 48 hours including 6 hours on a holiday at 2× premium (the rest is regular plus overtime).\n\nFormula: gross = (regular × base) + (overtime × 1.5 × base) + (holiday × 2 × base).\n\nCount hours: total 48 = 36 regular + 6 holiday + 6 overtime (overtime = anything above 40 not already on holiday premium).\n\nEstimate: 36 × 20 = 720; 6 × 40 (holiday at 2×) = 240; 6 × 30 (overtime at 1.5×) = 180. Sum ≈ 1,140.\n\nCalculate: regular 36 × 20 = 720; holiday 6 × 40 = 240; overtime 6 × 30 = 180. Gross = 720 + 240 + 180 = 1,140.\n\nAnswer: $1,140 gross.\n\nReasonableness: matches estimate within $0; holiday + overtime each add roughly the same uplift on this paycheque.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Three commission structures on the same sales',
            title: '$75,000 in monthly sales, three contracts',
            content:
              'Given: salesperson hits $75,000 in one month. Compute pay under three plans.\n\nStraight 5%: pay = 0.05 × 75,000 = $3,750.\n\nBase + commission ($2,000 base + 3% on all sales): pay = 2,000 + 0.03 × 75,000 = 2,000 + 2,250 = $4,250.\n\nTiered (3% on first 25k, 4% on 25k–50k, 5% above 50k): tier 1 = 0.03 × 25,000 = 750; tier 2 = 0.04 × 25,000 = 1,000; tier 3 = 0.05 × 25,000 = 1,250. Sum = $3,000.\n\nAnswer: base + commission pays best at $4,250; straight 5% pays $3,750; tiered pays only $3,000 because the higher rate kicks in only on the highest band.\n\nReasonableness check: tiered would beat straight 5% only if a salesperson sells at the top tier — which usually happens at much higher volumes. The contract design pushes high-volume sellers to push past the next threshold; low-volume sellers feel under-paid relative to a flat plan.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Run a full paycheque + commission scenario',
            content:
              'Goal: compute Maria\'s total monthly pay. She is hourly $24/hr, worked 168 hours (40 hr/wk × 4 wk + 8 hr overtime in week 3); she is also a sales associate paid base $1,500/mo + tiered commission 2/3/4 on $30k/$30k/$30k bands; her total monthly sales were $72,000.\n\nStep 1 — Hourly. Regular 160 × 24 = 3,840. Overtime 8 × 36 = 288. Hourly gross = 4,128.\n\nStep 2 — Base. Base = 1,500.\n\nStep 3 — Commission tiers. Tier 1 (first 30k at 2%) = 600. Tier 2 (next 30k at 3%) = 900. Tier 3 (12k at 4%) = 480. Commission = 1,980.\n\nStep 4 — Total gross = 4,128 + 1,500 + 1,980 = 7,608.\n\nStep 5 — Verify: tier 3 only counts $12k of sales because total above 60k = 72k − 60k = 12k. If you mistakenly applied 4% to all 72k, you would get 2,880 instead of 1,980 — a $900 over-pay error. The tiered structure rewards the top band only, not the whole pie.',
            learnerTask:
              'Compute Sam\'s total monthly pay. Hourly $19/hr, 172 hours including 12 overtime hours; base salary on commission role $1,200/mo + tiered 1.5/2.5/3.5% on $25k/$25k/$25k bands; monthly sales $80,000. Show every step and a one-sentence verification.',
            answerKey:
              'Hourly: regular 160 × 19 = 3,040; overtime 12 × 28.50 = 342; hourly = 3,382. Base = 1,200. Commission: tier 1 25k × 1.5% = 375; tier 2 25k × 2.5% = 625; tier 3 sales above 50k = 30k, but tier 3 caps at 25k → 25k × 3.5% = 875; remainder 5k above tier 3 — depends on contract (often paid at top tier rate, here 3.5% × 5k = 175). Total commission = 375 + 625 + 875 + 175 = 2,050. Total gross = 3,382 + 1,200 + 2,050 = $6,632. Verification: total sales 80k − 75k tiered base = 5k surplus; if no tier-cap rule, the 5k would still earn 3.5% (175) as shown. Naming the cap rule explicitly is the audit-grade move.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'One overtime check',
            content:
              'Worker at $22/hr, 45 hours in one week. Regular 40 × 22 = 880; overtime 5 × 33 = 165. Gross = $1,045. The $33 comes from 1.5 × 22 — overtime premium applies to hours above 40 only.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Salary to hourly',
            title: 'Annual ÷ 2,080',
            content:
              'A standard US full-time year = 40 hrs/wk × 52 weeks = 2,080 hours. Hourly equivalent = annual salary ÷ 2,080. Example: $52,000/yr ÷ 2,080 = $25/hr. Reverse: $30/hr × 2,080 = $62,400/yr full-time. For part-time, scale accordingly: 30 hrs/wk × 52 = 1,560 hours.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Payroll traps',
            content:
              'Forgetting overtime above 40 (federal US rule for non-exempt); treating commission tiers cumulatively (applying the top rate to all sales); confusing gross with net; using 2,000 instead of 2,080 for full-time hours; failing to convert weekly OT thresholds when the pay period is biweekly or monthly.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Payroll runs and offer letters',
            content:
              'Small business owners running payroll need this every cycle. Recruiters comparing salary to hourly offers convert to a common unit. Sales managers designing commission plans test the math at low, middle, and high sales volumes before rolling out. Verify any payroll output with a payroll professional before issuing pay.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three payroll problems',
            content:
              '(1) $20/hr worker, 48 hours in one week. Compute gross with US overtime rule.\n(2) Tiered commission 3/4/5% per $25,000 band on $75,000 in sales.\n(3) $60,000/yr salary → equivalent hourly rate at full-time.',
            answerKey:
              '(1) Regular 40 × 20 = 800; overtime 8 × 30 = 240; gross = $1,040.\n(2) Tier 1 25k × 3% = 750; tier 2 25k × 4% = 1,000; tier 3 25k × 5% = 1,250; total = $3,000.\n(3) 60,000 ÷ 2,080 = $28.85/hr (full-time equivalent).',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 8.1 summary',
            title: 'Pay correctly the first time',
            content:
              'Layered hourly rates, tiered commissions, and salary-to-hourly conversions all reward audit-grade arithmetic. Show each band on its own line so a worker can verify their own pay.',
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
            eyebrow: 'Worked example 1 — Coverage scheduling',
            title: 'Match shifts to demand',
            content:
              'Given: restaurant needs 3 servers 6 AM–11 AM (morning rush), 5 servers 11 AM–3 PM (lunch), 6 servers 3 PM–10 PM (dinner).\n\nFormula: total server-hours = sum over each shift of (servers × shift hours).\n\nMorning: 3 × 5 = 15 server-hours.\nLunch: 5 × 4 = 20 server-hours.\nDinner: 6 × 7 = 42 server-hours.\nTotal: 15 + 20 + 42 = 77 server-hours.\n\nStaffing plan: hire 3 morning shifts (5 hrs each), 2 mid shifts (8 hrs covering lunch + early dinner), 4 evening shifts (7 hrs each). Mid-shift covers 11–3 AND part of 3–10. Total people on each shift sums to demand.\n\nReasonableness: with 5-hour and 7-hour shifts, total is 3 × 5 + 2 × 8 + 4 × 7 = 15 + 16 + 28 = 59 hours — but demand was 77. Add coverage by lengthening shifts or adding people. The math forces the schedule to honour real demand, not wish-list demand.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Critical path',
            title: 'Find the longest chain in a small project',
            content:
              'Given: project tasks A(4 hrs), B(6 hrs), C(3 hrs), D(5 hrs). Dependencies: A precedes B and C; B and C both precede D.\n\nFormula: total project time = longest path from start to finish.\n\nPath 1 (A → B → D): 4 + 6 + 5 = 15 hours.\nPath 2 (A → C → D): 4 + 3 + 5 = 12 hours.\n\nCritical path = Path 1 (15 hours) — the longer one. C has 3 hours of slack (can finish 3 hours later than B without delaying D).\n\nAnswer: project duration = 15 hours; critical chain is A-B-D; C is non-critical with 3 hours float.\n\nReasonableness: project duration is at least the longest single task (B at 6 h) and at most the sum of all tasks (4 + 6 + 3 + 5 = 18 h). 15 hours sits inside that band, confirming we found a real path.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Schedule a small bakery weekend with shift hours',
            content:
              'Goal: a bakery needs Saturday coverage. 6 AM–10 AM (3 bakers + 1 cashier), 10 AM–2 PM (2 bakers + 2 cashiers), 2 PM–6 PM (1 baker + 1 cashier).\n\nStep 1 — Compute baker-hours needed: (3 × 4) + (2 × 4) + (1 × 4) = 12 + 8 + 4 = 24 baker-hours.\n\nStep 2 — Cashier-hours needed: (1 × 4) + (2 × 4) + (1 × 4) = 4 + 8 + 4 = 16 cashier-hours.\n\nStep 3 — Convert to staff. If a typical shift is 6 hours (with 30-min unpaid break), each staff covers ~6 hours. Bakers needed: 24 ÷ 6 = 4 bakers (one will overlap shifts). Cashiers: 16 ÷ 6 ≈ 2.7 → 3 cashiers.\n\nStep 4 — Build a candidate schedule. Baker 1: 6 AM–12 PM. Baker 2: 6 AM–12 PM. Baker 3: 6 AM–12 PM. Baker 4: 10 AM–4 PM (covers afternoon). Cashier 1: 6 AM–12 PM. Cashier 2: 10 AM–4 PM. Cashier 3: 10 AM–4 PM.\n\nStep 5 — Verify peak coverage at 10 AM–12 PM: bakers on shift = B1, B2, B3, B4 = 4 (peak demand was 2). Excess. Could trim B3 to 6 AM–10 AM only.\n\nReasonableness: peak times have at least the demanded staff; quiet times have only the minimum. Trim where overstaffed; never run below peak demand.',
            learnerTask:
              'A coffee shop needs 4 baristas 7 AM–11 AM, 2 baristas 11 AM–3 PM, 3 baristas 3 PM–7 PM. Compute total barista-hours needed and propose a 3-barista schedule using 8-hour shifts (with 1 hour unpaid lunch). Identify any coverage gaps.',
            answerKey:
              'Total barista-hours: (4 × 4) + (2 × 4) + (3 × 4) = 16 + 8 + 12 = 36 hrs. Three 8-hour shifts = 24 paid hours (or 21 effective with breaks) — short by ~12 hours. Cannot cover with only 3 baristas at peak (4 needed 7–11). Either add a 4th barista or shorten morning peak. Sample schedule with 4 baristas: B1 7–3 (paid 7), B2 7–11 part-time (4 hrs), B3 7–11 (4 hrs), B4 11–7 (paid 7). Strong answer flags the gap and proposes a fix; weak answer just sums hours.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Decimal vs minutes',
            content: '7:45 AM to 4:15 PM with 45-min lunch. Elapsed total = 8 hours 30 minutes; subtract 45-min lunch = 7 hours 45 minutes = 7.75 hours decimal. The 0.75 = 45/60 — verify by inverse: 0.75 × 60 = 45 min ✓.',
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
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Units per hour and efficiency',
            title: 'Compare actual to standard',
            content:
              'Given: 220 units produced in 8 hours; standard rate = 25 units/hour.\n\nFormula: rate R = units ÷ hours; efficiency = R ÷ R_std.\n\nSubstitute: R = 220 ÷ 8 = 27.5 u/h.\n\nCalculate: efficiency = 27.5 ÷ 25 = 1.10.\n\nAnswer: 110% of standard — the line is producing 10% above target.\n\nReasonableness: 27.5 vs 25 is roughly 10% above; matches 110% efficiency. If the line had produced 200 in 8 h, R = 25 and efficiency = 100% (exactly on standard).',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Utilisation across a billable team',
            title: 'How much of paid time is productive',
            content:
              'Given: consulting team has 5 staff each scheduled 40 hours/week (200 total hours). Last week, billable hours per person: 32, 35, 28, 38, 30. Compute team utilisation and identify outliers.\n\nFormula: utilisation = billable ÷ available.\n\nIndividual utilisation:\nA: 32/40 = 80%.\nB: 35/40 = 87.5%.\nC: 28/40 = 70%.\nD: 38/40 = 95%.\nE: 30/40 = 75%.\n\nTeam billable: 32 + 35 + 28 + 38 + 30 = 163 hours.\nTeam available: 200 hours.\nTeam utilisation: 163 ÷ 200 = 81.5%.\n\nOutliers: D at 95% (potentially over-utilised — burnout risk); C at 70% (under-utilised — needs more pipeline or training).\n\nReasonableness: most consultancies target 70–85% utilisation; below 70% means staff are sitting idle, above 90% means they are stretched and quality may suffer. Team average 81.5% is healthy; the spread (70–95%) is the management signal.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Compare three departments on three metrics',
            content:
              'Goal: factory has three lines. Line A: 200 units/8 hr; standard 25 u/h; 32 billable hours of 40. Line B: 180 units/8 hr; same standard; 28 billable of 40. Line C: 220 units/8 hr; same standard; 35 billable of 40. Compute productivity, efficiency, and utilisation for each.\n\nLine A:\nProductivity: 200 ÷ 8 = 25 u/h.\nEfficiency: 25 ÷ 25 = 100%.\nUtilisation: 32 ÷ 40 = 80%.\n\nLine B:\nProductivity: 180 ÷ 8 = 22.5 u/h.\nEfficiency: 22.5 ÷ 25 = 90%.\nUtilisation: 28 ÷ 40 = 70%.\n\nLine C:\nProductivity: 220 ÷ 8 = 27.5 u/h.\nEfficiency: 27.5 ÷ 25 = 110%.\nUtilisation: 35 ÷ 40 = 87.5%.\n\nInterpretation: C is best on all three metrics — high output per hour, above standard, and highly utilised. B is the bottleneck — below standard productivity AND lowest utilisation. Investigate B before raising production targets.\n\nReasonableness: all three metrics agree on the ranking C > A > B. When metrics disagree (e.g. high productivity but low utilisation), the explanation is usually idle equipment or partial-week work.',
            learnerTask:
              'A small bakery has two bakers. Baker X: produced 96 loaves in 6 hours; standard 18 loaves/hour; was at the oven 5.5 of 6 hours. Baker Y: 144 loaves in 8 hours; same standard; at oven 7.2 of 8 hours. Compute all three metrics for each. Recommend which baker handles weekend rush.',
            answerKey:
              'Baker X: productivity 96/6 = 16 loaves/h; efficiency 16/18 = 88.9%; utilisation 5.5/6 = 91.7%. Baker Y: productivity 144/8 = 18 loaves/h; efficiency 18/18 = 100%; utilisation 7.2/8 = 90%. Recommendation: Baker Y for weekend rush — at standard productivity AND high utilisation, indicating pace is sustainable. X is utilising time well but producing under standard, suggesting either skill gap or recipe mismatch. Strong answer compares all three metrics; weak answer picks only one.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Efficiency vs utilisation',
            title: 'They are NOT the same thing',
            content:
              'Efficiency = how fast vs the target rate (output / standard). Utilisation = how much of available time was productive (billable / available). A team can have 100% efficiency on 50% utilisation (they work fast but only half the time) — total output is lower than 80%/80% would produce. Always report both: high efficiency with low utilisation hides idle capacity.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Three quick metrics',
            content:
              'Productivity 220/8 = 27.5 u/h; efficiency 22/25 = 88%; utilisation 30/40 = 75%. The first measures pace; the second measures pace vs target; the third measures how much of the workday was on-task.',
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
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Reorder point',
            title: 'When to place the next order',
            content:
              'Given: daily usage 200 units; supplier lead time 7 days; safety stock 500 units.\n\nFormula: ROP = (daily usage × lead time) + safety stock.\n\nEstimate: 7 days × 200 = 1,400; plus safety 500 → ~1,900.\n\nSubstitute: ROP = (200 × 7) + 500 = 1,400 + 500 = 1,900.\n\nAnswer: place the next purchase order when on-hand reaches 1,900 units.\n\nReasonableness: 7 days of demand alone is 1,400; the 500 safety adds about 2.5 days of cushion. If lead times are reliable, this is comfortable; if lead times sometimes stretch to 10 days, the safety stock is too thin (need ~600 to cover variation).',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Inventory turnover and days',
            title: 'How fast inventory cycles through the business',
            content:
              'Given: annual COGS $400,000; average inventory at cost $50,000.\n\nFormula: turnover = COGS ÷ avg inventory; days of inventory = 365 ÷ turnover.\n\nEstimate: 400/50 = 8 turns; 365/8 ≈ 46 days.\n\nCalculate: turnover = 400,000 ÷ 50,000 = 8.0 turns/year. Days = 365 ÷ 8 = 45.6 days.\n\nAnswer: inventory cycles through the business 8 times per year, equivalent to ~46 days of stock on hand at any moment.\n\nReasonableness: typical retail benchmarks: grocery 12–25 turns; apparel 4–6; jewellery 1–3. An 8-turn business is a moderately active retailer — neither overstocked nor severely lean.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Quality + customer-service snapshot',
            content:
              'Goal: a small online retailer reports last quarter: 2,000 units shipped; 60 defects (returned with quality complaint); 25 scrapped (couldn\'t sell); 35 reworked (refurbished and resold). 100 calls received; 90 answered; 10 abandoned. CSAT scores: 60% gave top mark (5/5).\n\nQuality metrics:\nDefect rate: 60 ÷ 2,000 = 3.0%.\nScrap rate: 25 ÷ 2,000 = 1.25%.\nFirst-pass yield: (2,000 − 60) ÷ 2,000 = 1,940 ÷ 2,000 = 97.0%.\nRework rate: 35 ÷ 2,000 = 1.75%.\n\nCustomer-service metrics:\nAbandonment rate: 10 ÷ 100 = 10%.\nAnswer rate: 90 ÷ 100 = 90%.\nCSAT (top-box): 60%.\n\nInterpretation: 97% first-pass yield is reasonable for a small operation; defect rate 3% is high enough to investigate (target <1% for typical e-commerce). Abandonment 10% suggests under-staffed phones during peak times. CSAT 60% is below industry norm (~75–85%) — review service training.\n\nReasonableness: defect + scrap + rework should ≤ defect rate (some defects are reworked, some scrapped). 60 defects = 25 scrapped + 35 reworked ✓.',
            learnerTask:
              'A bakery produced 1,500 loaves last week; 45 returned for quality; 20 scrapped; 25 sold at discount as "day-old." Customer surveys: 80% satisfied, 5% unhappy. Compute defect rate, first-pass yield, and the satisfaction-to-unhappy ratio. Recommend one operational change.',
            answerKey:
              'Defect rate: 45 ÷ 1,500 = 3.0%. Scrap rate: 20 ÷ 1,500 = 1.33%. Discount-rework rate: 25 ÷ 1,500 = 1.67%. First-pass yield: (1,500 − 45) ÷ 1,500 = 97.0%. Satisfaction ratio: 80 / 5 = 16:1 (16 satisfied per 1 unhappy — strong). Recommendation: 3% defect rate is high for bakery; investigate whether one shift or one product accounts for most defects (Pareto 80/20 view) before adding wholesale process changes. Strong answer names a Pareto-style narrowing; weak answer recommends "improve quality" without specifying.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Quality metrics',
            title: 'Defect rate, scrap rate, first-pass yield',
            content:
              'Defect rate = defective ÷ produced. Scrap rate = scrapped ÷ produced. First-pass yield = passed ÷ produced (the share that meets spec on first run, no rework). Rework rate = reworked ÷ produced. The four metrics together tell the full quality story; reporting only one (e.g. "97% yield sounds great") can hide a 5% rework rate that costs labour.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Customer-service metrics',
            title: 'CSAT, NPS, AHT, abandonment',
            content:
              'CSAT (Customer Satisfaction): % of survey respondents giving top scores (typically 4 or 5 of 5). NPS (Net Promoter Score): % promoters (9–10) − % detractors (0–6); ranges −100 to +100. AHT (Average Handle Time): total handle time ÷ calls. Abandonment rate: callers who hung up before being served ÷ total calls offered.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'One reorder calculation',
            content:
              'Daily usage 200, lead time 7 days, safety 500: ROP = 200×7 + 500 = 1,900 units. Verify with shorter lead: same usage, lead 5 days → ROP = 200×5 + 500 = 1,500 (lower because cycle is faster).',
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
