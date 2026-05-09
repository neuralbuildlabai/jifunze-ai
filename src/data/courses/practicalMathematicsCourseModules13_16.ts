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
    durationMinutes: 130,
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
        learnerGoal:
          'Compute a fixed-rate mortgage monthly payment from principal, rate, and term; compare 15-year and 30-year shapes by total interest cost; understand how PMI fits in below 20% down.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Mortgage anatomy',
            title: 'Principal, rate, term, payment',
            content:
              'A fixed-rate mortgage is a long amortising loan secured by the property. Four numbers describe it: principal P (the loan amount), rate r (annual %, divided by 12 for monthly), term n (months), and monthly payment M. Each payment is split between interest (rate × current balance) and principal (the rest). Early payments are mostly interest; late payments are mostly principal. The total interest paid over the life of the loan is M × n − P.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Formula',
            title: 'The standard amortisation payment',
            content:
              'Monthly payment M = P × i ÷ (1 − (1 + i)^(−n)) where i = annual rate ÷ 12 and n = term in months. Use this verbatim or rely on a calculator/spreadsheet PMT function (most spreadsheets accept =PMT(rate/12, term*12, -principal) and return a positive monthly payment). Always sanity-check by multiplying back: M × n should be a believable total cost.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — 30-year mortgage',
            title: '$280,000 loan at 6.5% over 30 years',
            content:
              'Given: P = 280,000; annual rate = 6.5% → i = 0.065 / 12 = 0.005417; n = 30 × 12 = 360.\n\nFormula: M = P × i ÷ (1 − (1 + i)^(−n)).\n\nEstimate: rough payment for a 30-yr loan at 6–7% lands around $6 per $1,000 borrowed → 280 × 6 ≈ 1,680. Final answer should be near $1,700–$1,800.\n\nSubstitute: M = 280,000 × 0.005417 ÷ (1 − 1.005417^(−360)).\n\nCalculate: numerator = 280,000 × 0.005417 = 1,516.67. Denominator: 1.005417^360 = 7.0098, so 1.005417^(−360) = 1/7.0098 = 0.14266; 1 − 0.14266 = 0.85734. M = 1,516.67 ÷ 0.85734 = 1,769.88.\n\nAnswer: M ≈ $1,769.88/month.\n\nReasonableness: 1,769.88 vs $1,680 estimate → 5.4% over, but estimate used a mid-band 6% per $1,000 — at 6.5% rate the per-$1,000 figure is closer to $6.32, giving 1,770. Accept. Total cost = 1,769.88 × 360 = $637,157. Total interest = 637,157 − 280,000 = $357,157 — more than the principal itself.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — 15 vs 30 years',
            title: 'Same loan, very different total cost',
            content:
              'Given: P = 250,000; rate = 6%; compare 30-year vs 15-year.\n\n30-year: i = 0.005, n = 360. M = 250,000 × 0.005 ÷ (1 − 1.005^(−360)) = 1,250 ÷ 0.83396 = $1,498.88/mo. Total = 1,498.88 × 360 = $539,595. Interest = $289,595.\n\n15-year: i = 0.005, n = 180. M = 250,000 × 0.005 ÷ (1 − 1.005^(−180)) = 1,250 ÷ 0.59230 = $2,109.64/mo. Total = 2,109.64 × 180 = $379,735. Interest = $129,735.\n\nAnswer: 15-year payment is $610.76/mo higher, but saves $159,860 in lifetime interest (55% less interest than the 30-year).\n\nReasonableness: 15 years is half the time but the monthly payment is only ~41% higher (not double) because each payment kills more principal earlier. The huge interest gap is the cost of stretching the loan out.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Compare two real-style quotes side by side',
            content:
              'Goal: borrower has $400,000 to borrow. Quote A: 30-year at 7.0%. Quote B: 30-year at 6.25% but $4,000 in extra origination fees. Decide which is cheaper over 7 years (typical hold).\n\nStep 1 — Compute A: i = 0.07/12 = 0.0058333; n = 360. M_A = 400,000 × 0.0058333 ÷ (1 − 1.0058333^(−360)) = 2,333.33 ÷ 0.87697 = $2,661.21/mo.\n\nStep 2 — Compute B: i = 0.0625/12 = 0.0052083; n = 360. M_B = 400,000 × 0.0052083 ÷ (1 − 1.0052083^(−360)) = 2,083.33 ÷ 0.84571 = $2,463.31/mo.\n\nStep 3 — 7-year cash out. A: 2,661.21 × 84 = $223,541. B: 2,463.31 × 84 + 4,000 fee = $206,918 + 4,000 = $210,918.\n\nStep 4 — Compare: B saves 223,541 − 210,918 = $12,623 over 7 years. The fee is recovered in fee ÷ monthly savings = 4,000 ÷ (2,661.21 − 2,463.31) = 4,000 ÷ 197.90 = 20 months — well inside a 7-year hold.\n\nStep 5 — Verify with a different lens: per-$1,000 monthly: A ≈ $6.65, B ≈ $6.16 — a $0.49/$1,000 saving × 400 = $196/mo, matches.',
            learnerTask:
              'Run the same comparison for $300,000 borrowed: Quote X at 7.5%/30-yr no fee; Quote Y at 6.75%/30-yr with $5,500 in fees. Show monthly payments, 7-year cash out, payback months for the fee, and your recommendation.',
            answerKey:
              'Quote X: i = 0.625%, n = 360. M_X = 300,000 × 0.00625 ÷ (1 − 1.00625^(−360)) = 1,875 ÷ 0.89393 = $2,097.64/mo. Quote Y: i = 0.5625%, n = 360. M_Y = 300,000 × 0.005625 ÷ (1 − 1.005625^(−360)) = 1,687.50 ÷ 0.86668 = $1,946.65/mo. 7-year cash: X = 2,097.64 × 84 = 176,202; Y = 1,946.65 × 84 + 5,500 = 163,519 + 5,500 = 169,019. Y saves $7,183 over 7 yr. Fee payback: 5,500 ÷ (2,097.64 − 1,946.65) = 5,500 ÷ 150.99 = 36.4 months → 3.0 years — recovers within hold. Recommendation: choose Y if you plan to hold ≥4 years; otherwise X. Verify by checking your actual hold-time intent and asking the lender for a written rate-lock period.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Read a mortgage quote',
            content:
              '$300,000 at 7%/30-year: i = 0.005833, n = 360. M = 300,000 × 0.005833 ÷ (1 − 1.005833^(−360)) = 1,750 ÷ 0.87697 = $1,995.91/mo. Total = 1,995.91 × 360 = $718,528. Total interest ≈ $418,528 — more than the principal itself.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'PMI',
            title: 'Private mortgage insurance below 20% down',
            content:
              'When the down payment is less than 20% of the home price (LTV > 80%), most conventional mortgages require PMI — a monthly insurance premium that protects the lender. Typical PMI rates: 0.3–1.5% of the loan amount per year, paid monthly. Example: $270,000 loan × 0.5% per year = $1,350/yr ÷ 12 = $112.50/mo. PMI is removable once LTV reaches 80% (either through paying down principal or appreciation, depending on the policy).',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Mortgage traps',
            content:
              'Choosing the 30-year purely because the monthly is lower without checking the total interest gap; ignoring origination fees in lender comparisons; forgetting PMI when comparing high-down vs low-down options; quoting a "rate" that includes points without showing the points cost separately.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Buying, refinancing, comparison shopping',
            content:
              'Mortgage payment math drives the buying decision, the refinance break-even, and the lender comparison. A 1-percentage-point lower rate on a $300,000/30-year loan saves roughly $200/mo and ~$70,000 over the life of the loan — the math always rewards shopping at least three lenders.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Compare two real mortgage quotes',
            content:
              'Pull two real or realistic 15-year and 30-year quotes for the same loan amount. Compute monthly payments, total interest, and your assumed years-of-stay. Recommend the term and explain in one sentence what would change your mind.',
            answerKey:
              'Anchor: $280,000 at 6.5%/30-year → M ≈ $1,769.88/mo, total interest ≈ $357,157. Same loan at 5.875%/15-year → M ≈ $2,344.25, total interest ≈ $141,965. Shorter term saves ~$215k interest at the cost of ~$574/mo. Recommendation depends on cash flow: if the higher payment leaves <3 months of emergency reserves, take the 30-year and consider extra principal payments; if reserves are healthy, take the 15-year for the interest savings. What would change my mind: a meaningful pay raise or a downsizing decision within 5 years.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 13.1 summary',
            title: 'Term and rate, then total cost',
            content:
              'Term and rate determine the total cost of borrowing far more than the monthly payment alone. Always compute total interest, then decide whether your cash flow supports the better-shape loan. Verify any closing-cost-driven decision with a written quote from the lender.',
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
            eyebrow: 'Worked example 1 — $250k rental, 25% down',
            title: 'Cash flow with all reserves',
            content:
              'Given: $250,000 purchase; 25% down ($62,500 cash) plus closing costs ~$5,000; loan $187,500 at 7%/30 yr; rent $2,200/month.\n\nFormula: monthly cash flow = rent − (P&I + tax + insurance + HOA + management + maintenance + vacancy).\n\nP&I: 187,500 × (0.07/12) ÷ (1 − 1.005833^-360) = 1,093.75 ÷ 0.87697 = $1,247.40/mo.\nTax (1.2% of value annually): 250,000 × 0.012 / 12 = $250/mo.\nInsurance (0.6% of value): 250,000 × 0.006 / 12 = $125/mo.\nHOA: $100/mo.\nManagement (10% of rent): $220/mo.\nMaintenance reserve (5% of rent): $110/mo.\nVacancy reserve (5% of rent): $110/mo.\nTotal expenses: $2,162.\n\nMonthly cash flow: 2,200 − 2,162 = $38.\nAnnual cash flow: $38 × 12 = $456.\nCash-on-cash: 456 ÷ 62,500 = 0.73%.\n\nReasonableness: cash-on-cash 0.73% is poor for a rental — most investors target 6-10% CoC. This deal works only if appreciation (5-7%/yr typical) and principal paydown bridge the gap. If anything goes wrong (extra vacancy, big repair), the deal turns negative.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Cap rate and quick comparison',
            title: 'Compare two listings without financing',
            content:
              'Given: Property A asks $300,000; expected gross rent $30,000/yr; expected operating expenses $12,000/yr (taxes, insurance, management, maintenance, vacancy — NOT mortgage). Property B asks $480,000; expected gross rent $54,000/yr; expected operating expenses $19,000/yr.\n\nFormula: NOI = gross rent − operating expenses; cap rate = NOI ÷ purchase price.\n\nProperty A: NOI = 30,000 − 12,000 = $18,000. Cap rate = 18,000 ÷ 300,000 = 6.0%.\n\nProperty B: NOI = 54,000 − 19,000 = $35,000. Cap rate = 35,000 ÷ 480,000 = 7.3%.\n\nAnswer: Property B has a higher cap rate (7.3% vs 6.0%) — better unleveraged yield. But cap rate ignores financing AND market risk; B might be in a less-liquid market with longer time-on-market between tenants.\n\nReasonableness: typical residential cap rates by market: low-cost cities 6-8%; high-cost cities 3-5% (you pay for appreciation potential). Cap rate 7.3% suggests B is in a moderate market; sense-check against local sales comps before committing.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Stress-test a rental with vacancy and repair scenarios',
            content:
              'Goal: same $250k rental from Worked Example 1. Stress-test under three scenarios.\n\nBaseline: $38/mo cash flow, $456/yr.\n\nScenario A — Vacancy doubles (5% → 10%): vacancy reserve grows from $110 to $220/mo. New cash flow: 2,200 − 2,272 = −$72/mo (annual −$864). Negative.\n\nScenario B — Major repair (HVAC $5,000 in year 1): year 1 cash flow gets hit by 5,000/12 = ~$417/mo extra cost on average. New average: −$379/mo year 1. Even baseline ($38/mo) cannot absorb this; the maintenance reserve helps but only $110/mo over the year ($1,320 saved over 12 months) — short by $3,680. Owner must come out of pocket.\n\nScenario C — Rent rises 5% in year 2: rent goes from 2,200 to 2,310, +$110/mo. New cash flow: $148/mo, $1,776/yr. CoC bumps to 2.84% (if expenses stay flat).\n\nDecision frame: this deal has no margin of safety — works only with rent growth and clean tenants. A more conservative buyer would pass; a value-investor buyer might bid lower (e.g. $225k) to widen the margin.',
            learnerTask:
              'Run a stress test on a $400k rental with 25% down, $300k loan at 7%/30 yr, rent $3,200/mo, expenses 50% of rent (mgmt + maint + vacancy + tax + ins). Compute baseline cash flow and CoC, then test what happens if vacancy doubles from 5% to 10% (rent reserve $160 → $320).',
            answerKey:
              'P&I on $300k @ 7%: 1,995.91. Expenses 50% × 3,200 = $1,600 (already includes the listed reserves). Total: 1,995.91 + 1,600 = $3,595.91. Cash flow: 3,200 − 3,595.91 = −$395.91/mo. Already negative at baseline! Stress test (vacancy to 10%): expenses become 50% + 5% extra vacancy = 55% × 3,200 = 1,760. Total: 1,995.91 + 1,760 = 3,755.91. Cash flow: −$555.91/mo. Down payment: 100,000. CoC at baseline: −395.91 × 12 / 100,000 = −4.75%/yr — losing money. This deal does not work; pass on it or renegotiate price down by ~$100k. Strong answer rejects the deal; weak answer crunches numbers and recommends moving forward without flagging the loss.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'ROI lenses',
            title: 'Cash-on-cash, total return, IRR',
            content:
              'Three ways to measure rental ROI: Cash-on-cash (CoC) = annual cash flow ÷ cash invested (what you actually pocket each year). Total return = (cash flow + appreciation + principal paydown − selling costs) ÷ cash invested over the holding period. IRR = the discount rate that makes total NPV zero, accounting for timing of cash flows. CoC is the easiest; IRR is the most accurate. Use CoC for screening, IRR for committed analysis.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Pressure-test the rent',
            content:
              'Vacancy 5% → 10% drops cash flow by ~$110/mo on a $2,200 rent (5% × 2,200 = $110). On a thin-margin deal ($38/mo cash flow), that flips to a $72/mo loss. Always stress-test vacancy when assessing rentals.',
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
            eyebrow: 'Worked example 1 — Comparative market analysis (CMA)',
            title: 'Estimate value from three comps',
            content:
              'Given: subject home is 2,000 sq ft, 3 bed/2 bath, built 2005, tile roof. Three nearby recent sales:\nComp A: 1,950 sq ft, sold $338k → $173.33/sq ft.\nComp B: 2,100 sq ft, sold $362k → $172.38/sq ft.\nComp C: 1,950 sq ft, sold $336k → $172.31/sq ft.\n\nFormula: average $/sq ft × subject sq ft + adjustments.\n\nStep 1 — Average $/sq ft: (173.33 + 172.38 + 172.31) ÷ 3 = $172.67/sq ft.\n\nStep 2 — Base estimate: 2,000 × 172.67 = $345,340. Round to $345,000.\n\nStep 3 — Adjustments for differences:\n+$10,000 — subject has new kitchen (comps had original).\n−$8,000 — subject roof has 5 years remaining (Comp A had a new roof).\n+$5,000 — subject is on a corner lot with extra parking.\n\nFinal estimate: 345,000 + 10,000 − 8,000 + 5,000 = $352,000.\n\nReasonableness: estimate sits within ~5% of comps adjusted for size; an appraiser would typically find within $10–15k of this number. CMA is most accurate when comps are within 6 months and within 0.5 miles.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Equity, LTV, refinance opportunity',
            title: 'When does refinancing remove PMI?',
            content:
              'Given: bought home for $400,000 with 10% down ($40k); current loan balance $355,000; market value now $470,000. Pays PMI $148/mo. Wants to refinance to drop PMI.\n\nFormula: equity = value − loan; LTV = loan ÷ value. PMI usually drops at 80% LTV.\n\nCurrent equity: 470,000 − 355,000 = $115,000.\nCurrent LTV: 355,000 ÷ 470,000 = 75.5%. Below 80% → eligible to drop PMI.\n\nPath A — request lender to remove PMI on existing loan: many lenders allow this when LTV < 80% based on a new appraisal (cost ~$500). Saves $148/mo with one-time $500 outlay → payback 4 months.\n\nPath B — refinance to a new loan at current market rates: same LTV calculation; refinance closing costs typically $4–8k; only worth doing if rate is meaningfully better (≥0.5% lower) AND you stay 3+ years.\n\nAnswer: Path A is the better move here — PMI removal alone at low cost.\n\nReasonableness: home value rose 17.5% since purchase ($400k → $470k); combined with principal paydown, the equity grew from $40k to $115k. The math here protects $1,776/yr in PMI for a $500 outlay — strong return.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Read closing costs and compute true purchase cost',
            content:
              'Goal: a buyer is purchasing a $300,000 home. Loan $240k (20% down). Closing-cost disclosure shows: lender origination $2,400; appraisal $500; title insurance $1,400; escrow setup $700; transfer tax $1,200; prepaid property tax (3 mo) $750; prepaid insurance (12 mo) $1,500; pre-paid interest (15 days) $580.\n\nStep 1 — Sum closing costs: 2,400 + 500 + 1,400 + 700 + 1,200 + 750 + 1,500 + 580 = $9,030.\n\nStep 2 — Closing cost as % of loan: 9,030 ÷ 240,000 = 3.76% (within typical 2–6% range).\n\nStep 3 — True cash needed at closing: down payment $60,000 + closing costs $9,030 = $69,030.\n\nStep 4 — True initial cost basis (for ROI later): purchase $300,000 + closing $9,030 = $309,030.\n\nStep 5 — Some closing costs are recoverable (prepaids), some are sunk (lender fees, transfer tax). Recoverable lines: $750 prepaid tax (escrow refunded over 3 mo); $1,500 prepaid insurance (consumed over 12 mo); $580 prepaid interest (consumed in first month). Sunk: $5,200.\n\nReasonableness: the buyer must come up with ~$69k cash at closing — much more than the $60k down payment alone. Many first-time buyers underbudget here.',
            learnerTask:
              'A $250k home with 5% down requires PMI. Market value rises to $310k after 3 years; loan balance is now $230k. Compute current LTV, current equity, and whether the buyer is eligible to drop PMI.',
            answerKey:
              'Current equity: 310,000 − 230,000 = $80,000. Current LTV: 230,000 ÷ 310,000 = 74.2%. Below 80% threshold → eligible to request PMI removal. Recommendation: order an updated appraisal (~$500), submit removal request to lender. Expected savings: $50-150/mo in PMI depending on original loan terms. Strong answer states the dollar savings AND payback period; weak answer only says "yes, eligible." A buyer who never requests removal often pays PMI 5+ years after technically becoming eligible.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Other valuation approaches',
            title: 'Income capitalisation and cost approach',
            content:
              'Income capitalisation: NOI ÷ cap rate = property value (mainly for rental and commercial). Cost approach: replacement cost − depreciation + land value (mainly for new construction or unique properties). For owner-occupied homes, comparable sales (CMA) is the dominant approach; for investment properties, income capitalisation is primary.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Compute LTV',
            content:
              'Home value $450k, loan balance $260k. Equity = 450k − 260k = $190k. LTV = 260k ÷ 450k = 57.8%. Comfortably below 80% — no PMI required, eligible for cash-out refinance up to ~$100k more debt while staying under 80% LTV.',
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
    durationMinutes: 120,
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
            type: 'guided_practice',
            eyebrow: 'Guided practice — Verify a paediatric label step by step (numeracy only)',
            title: 'Multi-step dose by weight + unit conversion + double-check',
            content:
              'Goal: a caregiver picks up a child antibiotic. The label reads: "Suspension 200 mg / 5 mL. Dose: 25 mg/kg/day, divided in 2 doses." The child weighs 18 kg. Verify the per-dose volume in mL, then sanity-check against the bottle size of 100 mL for a 10-day course. Numeracy practice only — never set or change a dose without a licensed clinician.\n\nStep 1 — Daily dose by weight: 25 mg/kg × 18 kg = 450 mg/day.\n\nStep 2 — Per-dose amount (divided in 2): 450 ÷ 2 = 225 mg per dose.\n\nStep 3 — Convert mg to mL using the suspension concentration. The concentration is 200 mg per 5 mL → 1 mg per 0.025 mL → 225 mg × 0.025 = 5.625 mL per dose.\n\nStep 4 — Sanity check the bottle. 5.625 mL × 2 doses/day × 10 days = 112.5 mL total course. The bottle is 100 mL — short by 12.5 mL. Numeracy flag: the dispensed bottle is too small for the prescribed course; phone the pharmacist before starting.\n\nStep 5 — Common-error check. If you misread mg/kg as mg/lb, the calculation would give 25 × 40 (lb) = 1,000 mg/day → 500 mg per dose → 12.5 mL per dose — more than DOUBLE the correct volume. Always confirm whether the label is mg/kg or mg/lb before computing.\n\nReasonableness: a typical 18 kg toddler dose for a common antibiotic is 5–8 mL twice daily. Our 5.625 mL fits the band; the 12.5 mL would not. Numeracy supports the conversation with the pharmacist; numeracy never replaces it.',
            learnerTask:
              'A 32 kg child is prescribed acetaminophen 15 mg/kg/dose, every 6 hours as needed. The bottle reads "160 mg / 5 mL". Compute (a) per-dose mg, (b) per-dose mL, (c) maximum mL in 24 hours if every-6-hour dosing is used, (d) one common error to watch for. State each step. Numeracy practice only.',
            answerKey:
              '(a) 15 mg/kg × 32 kg = 480 mg per dose. (b) Concentration 160 mg per 5 mL → 1 mg per 0.03125 mL → 480 mg × 0.03125 = 15 mL per dose. (c) Every 6 hours = 4 doses/day max → 15 mL × 4 = 60 mL/day. (d) Common error: doubling the dose because the parent missed the previous dose — never double; use the 4-doses/day maximum to keep the total below the safe ceiling, and verify with a paediatrician or pharmacist before any deviation. Strong answer also notes the bottle size: a 120 mL bottle covers only 2 days at maximum dosing — confirm refill timing. Reasonableness: 15 mL is at the higher end for a 32 kg child; verify with the prescribing label and dispensing pharmacist.',
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
        learnerGoal:
          'Compute BMI in metric and imperial units, target heart-rate zones from age, and read these as screening signals — not diagnoses — that prompt a conversation with a clinician.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'BMI',
            title: 'Two formulas, one ratio',
            content:
              'Body Mass Index relates weight to height. Metric: BMI = kg ÷ m². Imperial: BMI = (lb ÷ in²) × 703. Standard adult bands: <18.5 underweight; 18.5–24.9 normal; 25.0–29.9 overweight; ≥30 obese. BMI is a population-level screening tool — it does not measure body composition, fitness, or health. Athletes with high muscle mass and older adults often score outside the "normal" band without clinical concern. Treat the number as the start of a question, not the answer.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Heart rate zones',
            title: 'Maximum and target',
            content:
              'Estimated max heart rate ≈ 220 − age (a rough average; individuals vary). Moderate-intensity zone is 50–70% of max; vigorous-intensity is 70–85%. Zones are training guidance, not medical limits — anyone with cardiac history, hypertension, or who is starting exercise after a long break should consult a clinician before targeting vigorous zones.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — BMI metric',
            title: 'Adult, 75 kg, 1.75 m',
            content:
              'Given: weight = 75 kg; height = 1.75 m.\n\nFormula: BMI = kg ÷ m².\n\nEstimate: 1.75² ≈ 3; 75 ÷ 3 ≈ 25 — top of normal band.\n\nSubstitute: BMI = 75 ÷ (1.75)².\n\nCalculate: 1.75² = 3.0625; 75 ÷ 3.0625 = 24.49.\n\nAnswer: BMI ≈ 24.5 — within normal band.\n\nReasonableness: estimate said ≈25; calculation 24.5 is 2% off. Accept. The screening signal is "no flag from BMI alone" — not "this person is healthy."',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — BMI imperial + heart rate',
            title: 'Adult, 180 lb, 70 in tall, 35 years old',
            content:
              'BMI: BMI = (lb ÷ in²) × 703.\n\nEstimate: 70² = 4,900; 180 ÷ 4,900 ≈ 0.0367; × 703 ≈ 25.8 — just into overweight band.\n\nCalculate: 4,900 → 180 ÷ 4,900 = 0.03673; × 703 = 25.83.\n\nAnswer: BMI ≈ 25.8 — overweight by screening.\n\nHeart rate: max ≈ 220 − 35 = 185 bpm. Moderate zone 50–70%: 0.50 × 185 = 92.5; 0.70 × 185 = 129.5 → ~93–130 bpm. Vigorous 70–85%: 0.85 × 185 = 157 → ~130–157 bpm.\n\nReasonableness: a 35-year-old jogging conversationally should land in moderate zone (≈100–130 bpm). If a fitness watch shows 170 bpm during a casual walk, the watch or the person should be checked — that is in the vigorous band.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Compute your own BMI and target zone',
            content:
              'Pick the system you prefer. Step 1 — record weight and height accurately (no shoes; ideally morning weight). Step 2 — apply the formula. Metric example: 68 kg, 1.65 m → 68 ÷ (1.65)² = 68 ÷ 2.7225 = 24.98 ≈ 25.0 — boundary of overweight band. Step 3 — compute max heart rate from age. Age 42 → max ≈ 220 − 42 = 178; moderate ≈ 89–125 bpm. Step 4 — note one screening signal and one limitation: BMI 25.0 is a flag-worth-discussing only with other context (waist circumference, fitness, family history). Step 5 — write the number down and the date so trends are comparable later.',
            learnerTask:
              'Compute your BMI in your preferred system and your moderate-intensity heart-rate band from your age. Write one sentence on what these numbers do and do not tell you, and one action item (e.g. discuss with clinician at next visit, restart 30 min walks, etc.).',
            answerKey:
              'Sample done well: 70 kg, 1.72 m → BMI = 70 ÷ 1.72² = 70 ÷ 2.9584 = 23.66 → 23.7, normal band. Age 38 → max ≈ 182 bpm; moderate 91–127 bpm. Sentence: "BMI 23.7 is a single screening signal and ignores muscle mass, body fat distribution, and cardiovascular fitness; my moderate-zone target is 91–127 bpm during sustained activity." Action: "I will keep a 30-minute walk three times a week and discuss the trend with my GP at the next physical." Weak answers skip units, treat BMI as a diagnosis, or pick zones outside 50–85% of max.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Two quick reads',
            content:
              'BMI 70 kg / 1.55 m: 70 ÷ 2.4025 ≈ 29.1 → high end of overweight band. BMI 220 lb / 68 in: (220 ÷ 4624) × 703 ≈ 33.4 → obese band. Both are screening signals, not diagnoses; clinical follow-up adds the missing context.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Metric traps',
            content:
              'Squaring height after the division (always square height first); using cm or inches without converting (BMI metric needs metres, BMI imperial needs inches); treating BMI as a diagnosis instead of a screening signal; computing heart-rate zones outside 50–85% of max; ignoring rest-day heart-rate context.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Wellness checks, fitness apps',
            content:
              'Health intake forms compute BMI. Fitness watches use estimated max heart rate to label workout zones. Insurance underwriting may reference BMI bands. Always pair the number with clinical context before acting on it.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three reps with one limitation each',
            content:
              '(1) BMI for 80 kg, 1.80 m. (2) BMI for 200 lb, 72 in. (3) Moderate-zone heart rate for a 35-year-old. For each, add one limitation in plain language.',
            answerKey:
              '(1) 80 ÷ 1.80² = 80 ÷ 3.24 = 24.69 ≈ 24.7 → top of normal band. Limitation: BMI does not separate fat from muscle.\n(2) (200 ÷ 5,184) × 703 = 0.03858 × 703 = 27.13 ≈ 27.1 → overweight band. Limitation: BMI does not capture waist-to-hip ratio.\n(3) Max ≈ 220 − 35 = 185 bpm; 50–70% → 0.50 × 185 = 92.5 and 0.70 × 185 = 129.5 → 93–130 bpm. Limitation: 220 − age is a rough population estimate; individual max varies ±10 bpm or more.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 14.2 summary',
            title: 'Numbers with context',
            content:
              'BMI and heart-rate zones are screening signals. Compute them right, log them with the date, and pair them with clinical context before acting.',
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
            eyebrow: 'Worked example 1 — A surgery year',
            title: 'Premium + deductible + coinsurance + OOP cap',
            content:
              'Given: premium $400/mo; deductible $2,000; coinsurance 20%; OOP max $6,000. Year activity: one office visit ($30 copay) + scheduled surgery (allowed-amount $25,000) + follow-up visits ($500 in copays).\n\nFormula: total annual cost = premiums + deductible (paid first) + coinsurance × eligible cost (until OOP max hit) + remaining copays (after OOP max, $0 eligible).\n\nStep 1 — Premiums: 400 × 12 = $4,800.\n\nStep 2 — Patient share of surgery: deductible $2,000 (first applied) + coinsurance 20% on remaining $23,000 = $4,600. Cumulative patient share so far: 2,000 + 4,600 = $6,600 — but OOP max caps at $6,000. So patient pays only $6,000 on this surgery.\n\nStep 3 — Once OOP max hit, remaining services in-network are at $0 patient cost (assuming standard plan). So follow-up copays this year = $0 (OOP max already met).\n\nStep 4 — Total annual: premiums 4,800 + OOP-capped 6,000 = $10,800.\n\nReasonableness: surgery cost was $25,000 but patient paid only $6,000 of it (24%) plus their year of premiums. The other $19,000 is the insurance-pool subsidy. Always know your OOP max — it caps the worst case.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Plan shopping by usage scenario',
            title: 'Compare two plans across low/mid/high years',
            content:
              'Given: Plan A — premium $200/mo; deductible $4,500; coinsurance 30%; OOP max $7,000. Plan B — premium $400/mo; deductible $1,500; coinsurance 20%; OOP max $5,000.\n\nFormula: total annual cost = premiums + (eligible patient share, capped by OOP max).\n\nLow-usage year ($500 in care, mostly preventive):\nPlan A: 200×12 + 500 = $2,900.\nPlan B: 400×12 + 500 = $5,300.\nWinner: A by $2,400.\n\nMid-usage year ($6,000 in care):\nPlan A: 200×12 + 4,500 + 30% × 1,500 = 2,400 + 4,500 + 450 = $7,350.\nPlan B: 400×12 + 1,500 + 20% × 4,500 = 4,800 + 1,500 + 900 = $7,200.\nWinner: B by $150 (essentially tied).\n\nHigh-usage year ($30,000 in care):\nPlan A: 2,400 + OOP capped 7,000 = $9,400.\nPlan B: 4,800 + OOP capped 5,000 = $9,800.\nWinner: A by $400 (Plan A wins on extreme usage too because its lower premium offsets the higher OOP).\n\nAnswer: Plan A is best when usage is very low OR very high. Plan B beats Plan A only in mid-usage years (~$5–8k care).\n\nReasonableness: lower-premium plans usually win in healthy years; lower-deductible plans win in mid years; OOP max determines extreme years. The match-to-expected-usage decision is what plan-shopping math is for.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Run a 3-scenario plan comparison + HSA tax effect',
            content:
              'Goal: choose between Plan X (premium $300/mo, ded $1,500, coins 30%, OOP $5,000, no HSA-eligible) and Plan Y (premium $250/mo, ded $3,000, coins 20%, OOP $6,000, HSA-eligible).\n\nLow-usage year ($800 care, 22% tax bracket):\nPlan X: 300×12 + 800 = $4,400.\nPlan Y: 250×12 + 800 = $3,800. + HSA contribution $3,850 saves 22% × 3,850 = $847 in taxes. Net effective cost: 3,800 − 847 = $2,953.\nWinner: Plan Y by $1,447 in net effective cost.\n\nMid-usage year ($8,000 care):\nPlan X: 3,600 + ded 1,500 + 30% × 6,500 = 3,600 + 1,500 + 1,950 = $7,050. (OOP max reached — capped at 5,000 patient share + 3,600 premiums = $8,600 total.) Adjust: patient share = 1,500 + 1,950 = 3,450; not at OOP cap (5,000). Total: 3,600 + 3,450 = $7,050.\nPlan Y: 3,000 + ded 3,000 + 20% × 5,000 = 3,000 + 3,000 + 1,000 = $7,000. Plus HSA tax saving on $3,850: net $7,000 − 847 = $6,153.\nWinner: Plan Y by $897 in net effective cost.\n\nHigh-usage year ($30,000 care):\nPlan X: 3,600 + OOP 5,000 = $8,600.\nPlan Y: 3,000 + OOP 6,000 = $9,000. With HSA tax saving: 9,000 − 847 = $8,153.\nWinner: Plan Y by $447.\n\nAcross all three scenarios, Plan Y wins because of the HSA tax shield. Without the HSA effect, Plan X would win in 2 of 3 years.\n\nReasonableness: HSA tax savings can reverse a plan-comparison ranking. Always model the after-tax effective cost when one plan is HSA-eligible.',
            learnerTask:
              'A worker is choosing between Plan A (premium $200/mo, ded $2,000, coins 30%, OOP $5,000) and Plan B (premium $350/mo, ded $1,000, coins 20%, OOP $4,000). She expects $4,000 in care this year. Compute total annual cost for each and state the winner.',
            answerKey:
              'Plan A: 200×12 + 2,000 + 30% × 2,000 = 2,400 + 2,000 + 600 = $5,000. Plan B: 350×12 + 1,000 + 20% × 3,000 = 4,200 + 1,000 + 600 = $5,800. Plan A wins by $800. At higher usage ($10k care), Plan A: 2,400 + OOP 5,000 = $7,400; Plan B: 4,200 + OOP 4,000 = $8,200; Plan A still wins by $800. Plan A is the better choice across both scenarios because the $1,800/yr premium savings outweighs the $1,000 OOP-cap difference. Strong answer tests at least two usage levels; weak answer compares at only one and misses sensitivity.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Plan-shopping math',
            title: 'Compare two plans by total annual cost',
            content:
              'Total annual cost = annual premiums + expected patient share (deductible, coinsurance, copays). Healthy years favour low-premium / high-deductible plans (premium savings outweigh higher OOP). High-use years favour low-deductible / high-premium plans (OOP cap is reached fast). Mid years are close — model with your specific expected usage.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'HSA/FSA basics',
            title: 'Tax-advantaged medical savings',
            content:
              'Health Savings Accounts (HSAs) are paired with high-deductible plans. 2024 contribution limits: $3,850 individual, $7,750 family. Contributions reduce taxable income; withdrawals for qualified medical are tax-free. At a 22% marginal tax rate, a $3,850 HSA contribution saves $847 in taxes — effectively a 22% discount on medical spending. FSAs are similar but use-it-or-lose-it within the plan year.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Compute one year',
            content:
              'Plan: premium $300/mo; deductible $1,500; coinsurance 30%; OOP max $5,000. Year medical bills: $8,000.\nPremium: 3,600. Deductible: 1,500. Coinsurance on remaining $6,500: 30% × 6,500 = $1,950. Patient share: 1,500 + 1,950 = $3,450 — under the OOP max of $5,000. Total: 3,600 + 3,450 = $7,050. Verify: not at OOP cap; if the bill grew to $13k+, patient share would hit the $5k cap.',
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
            type: 'guided_practice',
            eyebrow: 'Guided practice — Audit a hospital bill end-to-end',
            title: 'Charges, adjustments, deductible, coinsurance, and verification',
            content:
              'Goal: you receive a hospital bill after an outpatient procedure. Walk through every line so you can flag any error before paying.\n\nBill summary as printed:\nLine 1 — Facility charge: $4,200.\nLine 2 — Surgeon professional fee: $1,800.\nLine 3 — Anaesthesia fee: $900.\nLine 4 — Pathology lab: $300.\nLine 5 — Recovery / supplies: $250.\nSubtotal of charges: $7,450.\n\nInsurance adjustment (negotiated discount): −35% of subtotal = −$2,607.50.\nAllowed amount: $7,450 − $2,607.50 = $4,842.50.\n\nPlan: $1,500 deductible (not yet met this year), 20% coinsurance, $5,000 OOP max.\n\nStep 1 — Verify the subtotal arithmetic. 4,200 + 1,800 + 900 + 300 + 250 = 7,450 ✓.\n\nStep 2 — Verify the adjustment. 35% of 7,450 = 2,607.50 ✓; allowed amount 4,842.50 ✓. (If the bill prints "adjustment $2,500" instead, the discount was applied at ~33.6% — phone billing to confirm which percentage your plan actually negotiated.)\n\nStep 3 — Apply the deductible. Patient pays the full $1,500 deductible first → remaining allowed = 4,842.50 − 1,500 = $3,342.50 subject to coinsurance.\n\nStep 4 — Coinsurance: 20% × 3,342.50 = $668.50.\n\nStep 5 — Patient share so far: 1,500 + 668.50 = $2,168.50. This is below the $5,000 OOP max → no cap kicks in this year (yet).\n\nStep 6 — Total patient responsibility for THIS bill: $2,168.50.\n\nStep 7 — Verification cross-checks before paying:\n(a) Did each line item actually happen? (Pathology fee — did you have a biopsy taken? If not, dispute the line.)\n(b) Was anaesthesia in-network? (Out-of-network anaesthesiologists at in-network facilities are a common surprise; ask for a written network statement.)\n(c) Did the insurer process at the contracted rate? (Compare allowed amount to your EOB — Explanation of Benefits.)\n(d) Are duplicate line items present? (Recovery + supplies are sometimes billed twice.)\n\nReasonableness: patient share $2,168.50 is 29% of the original $7,450 charges and 45% of the $4,842.50 allowed amount — typical for a procedure during the deductible portion of the year. If the bill demanded more than $5,000 from you, the OOP-max cap should have kicked in; if it demanded $4,842.50 (the full allowed amount), the insurer didn\'t apply your coverage — dispute.',
            learnerTask:
              'You receive a bill: $5,800 charges, 30% insurance adjustment, $1,000 of your $2,500 deductible already met this year, 25% coinsurance, $4,500 OOP max (already $1,200 of OOP spent this year). Compute (a) allowed amount, (b) patient share toward deductible, (c) patient share toward coinsurance, (d) total patient responsibility for THIS bill, (e) running OOP total after this bill, (f) one verification step you would take before paying.',
            answerKey:
              '(a) Allowed amount = 5,800 × (1 − 0.30) = 5,800 × 0.70 = $4,060. (b) Deductible remaining = 2,500 − 1,000 = $1,500; patient pays $1,500 toward deductible. (c) Remaining allowed after deductible: 4,060 − 1,500 = $2,560 subject to coinsurance; 25% × 2,560 = $640 coinsurance. (d) Total patient share for this bill = 1,500 + 640 = $2,140. (e) Running OOP after this bill = 1,200 (prior) + 2,140 (this) = $3,340 — under the $4,500 OOP max, so no cap kicks in. (f) Verification: request the EOB from the insurer and compare line-by-line to the bill; confirm any out-of-network charges; verify the 30% adjustment matches your plan\'s contracted rate. Strong answer separates the deductible portion from the coinsurance portion AND tracks running OOP toward the cap; weak answer lumps everything together and misses the cap-tracking insight.',
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
      {
        id: 'm14-q11',
        question:
          'A relative shows you their plan: $5,000 deductible / 20% coinsurance / $8,000 OOP max. They are about to need surgery costing $30,000 (allowed amount). State the maximum they will pay this year for the surgery, and one verification step before they sign.',
        type: 'short_answer',
        correctAnswer:
          'Maximum patient share = OOP max $8,000 (deductible $5,000 + 20% × $25,000 = $5,000 + $5,000 = $10,000, capped at $8,000 OOP). Verification: confirm the surgeon, anaesthesiologist, and facility are all in-network — out-of-network providers at in-network facilities are a common surprise that bypasses the OOP max.',
        explanation:
          'OOP max caps in-network spending; out-of-network is the common gotcha that breaks the cap.',
        relatedLesson: '14.3',
        difficulty: 'hard',
      },
      {
        id: 'm14-q12',
        question:
          'A patient receives a hospital bill claiming "patient responsibility = $4,200" for a procedure with $7,500 charges. The bill shows no insurance adjustment line. What is wrong, and what should the patient do?',
        type: 'short_answer',
        correctAnswer:
          'A charges-to-patient bill with no insurance adjustment usually means the claim was not processed by insurance (rejected, missed, or filed under the wrong policy). Patient should: (1) call the insurer to confirm whether the claim was received and processed, (2) request the EOB, (3) ask the provider to resubmit if the insurer never received the claim. Do NOT pay before reconciling.',
        explanation:
          'Missing insurance adjustment is the #1 flag of an unprocessed claim. Always reconcile bill against EOB before paying.',
        relatedLesson: '14.4',
        difficulty: 'hard',
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
    durationMinutes: 125,
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
            type: 'guided_practice',
            eyebrow: 'Guided practice — Multi-cut lumber problem with pricing',
            title: 'Convert formats, sum cuts, compute board feet, total the order',
            content:
              'Goal: a small framing job needs five cuts. Compute the total length needed in two formats, total board feet, and the lumber bill at $4.50/bf.\n\nCut list:\nC1 — 2×4 × 8 ft: need 4 pieces.\nC2 — 2×4 × 10 ft: need 3 pieces.\nC3 — 2×6 × 12 ft: need 2 pieces.\nC4 — 2×8 × 14 ft: need 1 piece.\nC5 — 2×10 × 16 ft: need 1 piece.\n\nStep 1 — Total linear feet of each:\nC1: 4 × 8 = 32 ft.\nC2: 3 × 10 = 30 ft.\nC3: 2 × 12 = 24 ft.\nC4: 1 × 14 = 14 ft.\nC5: 1 × 16 = 16 ft.\nSum: 32 + 30 + 24 + 14 + 16 = 116 linear feet.\n\nStep 2 — Convert to board feet (bf = T × W × L_ft ÷ 12):\nC1: (2 × 4 × 8) ÷ 12 = 64 ÷ 12 = 5.33 bf per piece × 4 = 21.33 bf.\nC2: (2 × 4 × 10) ÷ 12 = 6.67 bf × 3 = 20.0 bf.\nC3: (2 × 6 × 12) ÷ 12 = 12.0 bf × 2 = 24.0 bf.\nC4: (2 × 8 × 14) ÷ 12 = 18.67 bf × 1 = 18.67 bf.\nC5: (2 × 10 × 16) ÷ 12 = 26.67 bf × 1 = 26.67 bf.\nTotal board feet: 21.33 + 20.0 + 24.0 + 18.67 + 26.67 = 110.67 bf → round up to 111 bf for ordering.\n\nStep 3 — Bill at $4.50/bf: 111 × 4.50 = $499.50. Add 8% sales tax: 499.50 × 0.08 = 39.96. Total: $539.46 → round to $540 for the quote.\n\nStep 4 — Add waste allowance for cutting losses (typical 10% on framing): 111 × 1.10 = 122.1 → order 123 bf. Revised material cost: 123 × 4.50 = $553.50 + 8% tax = $597.78 → round to $600 for the quote.\n\nReasonableness: the rough rule "linear feet × dimensional factor ÷ 12" gives board feet quickly. A 2×4 × 12 ft is 8 bf — memorise three or four of these and you can estimate any cut list in seconds. Always add waste BEFORE applying tax — waste affects the material order; tax applies to the final invoice.',
            learnerTask:
              'A deck job needs: 6 pieces of 2×6 × 10 ft (joists), 3 pieces of 2×8 × 12 ft (beams), 2 pieces of 4×4 × 8 ft (posts). Compute (a) total board feet, (b) cost at $4.75/bf, (c) cost with 10% waste allowance, (d) total with 7% sales tax on the waste-adjusted cost.',
            answerKey:
              '(a) 2×6×10 = 10 bf each × 6 = 60 bf. 2×8×12 = 16 bf each × 3 = 48 bf. 4×4×8 = 10.67 bf each × 2 = 21.33 bf. Total = 60 + 48 + 21.33 = 129.33 → round to 130 bf. (b) 130 × $4.75 = $617.50. (c) With 10% waste: 130 × 1.10 = 143 bf × $4.75 = $679.25. (d) Total with 7% tax: 679.25 × 1.07 = $726.80 → round to $727. Strong answer applies waste BEFORE tax (waste affects the material order; tax applies to the final invoice). Weak answer applies tax then waste, or skips waste entirely and short-orders the job.',
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
            type: 'guided_practice',
            eyebrow: 'Guided practice — Full kitchen remodel material take-off',
            title: 'Floor + walls + concrete: end-to-end estimation',
            content:
              'Goal: estimate materials for a kitchen remodel from a single floor plan. Kitchen is 14 ft × 18 ft, ceiling height 9 ft. Two doorways (each 21 sq ft) and one window (15 sq ft) interrupt the walls. The plan adds a 6 ft × 3 ft kitchen island with a 4-inch concrete pad underneath.\n\nStep 1 — Floor area for tile.\nFloor: 14 × 18 = 252 sq ft.\n+ 10% waste for cuts and breakage: 252 × 1.10 = 277.2 → order 278 sq ft.\nAt $6.50/sq ft for mid-grade tile: 278 × 6.50 = $1,807.\n\nStep 2 — Wall area for paint.\nPerimeter: 2 × (14 + 18) = 64 ft.\nWall area: 64 × 9 = 576 sq ft.\nSubtract openings: 2 doorways × 21 + 1 window × 15 = 57 sq ft.\nNet paintable: 576 − 57 = 519 sq ft.\nCoverage at 350 sq ft per gallon, two coats: (519 × 2) ÷ 350 = 1,038 ÷ 350 = 2.97 gallons → buy 3 gallons.\nAt $42/gallon for mid-grade interior paint: 3 × 42 = $126.\n\nStep 3 — Concrete pad under the island.\nPad: 6 ft × 3 ft × (4/12) ft = 6 × 3 × 0.333 = 6 cu ft.\nConvert to cubic yards: 6 ÷ 27 = 0.222 cu yd.\n+ 10% waste: 0.222 × 1.10 = 0.244 cu yd → order 0.25 cu yd.\nAt $180/cu yd for ready-mix delivered (small-load surcharge applies): typically a $250 minimum delivery charge for sub-1 cu yd loads → budget $250 minimum, not $45.\n\nStep 4 — Total material estimate.\nTile: $1,807.\nPaint: $126.\nConcrete: $250 (delivery minimum).\nSum: $2,183 raw materials.\n\nStep 5 — Add labour, overhead, contingency.\nLabour 24 h × $55/hr = $1,320.\nOverhead 15% × labour = $198.\nSubtotal: 2,183 + 1,320 + 198 = $3,701.\nContingency 10% × subtotal = $370.\nTotal quote: ≈ $4,071 → round $4,100.\n\nReasonableness: tile is the largest line at 44% of materials; paint is small (3% of materials); concrete is a fixed-minimum gotcha. Real-world estimators always check delivery minimums BEFORE quoting — they trip up DIY estimators routinely.',
            learnerTask:
              'Estimate materials for a small bathroom remodel. Bathroom is 8 ft × 10 ft, ceiling 8 ft. One door (21 sq ft), one window (12 sq ft). Compute: (a) floor tile area + 10% waste, (b) paint coverage for two coats, (c) total material cost using tile $7/sq ft, paint $40/gal, and 5% sales tax.',
            answerKey:
              '(a) Floor: 8 × 10 = 80 sq ft × 1.10 = 88 sq ft to order. Tile cost: 88 × 7 = $616. (b) Wall area: perimeter 2×(8+10) = 36 ft × 8 ft height = 288 sq ft. Subtract openings: 21 + 12 = 33 sq ft → net 255 sq ft. Two coats: 510 sq ft ÷ 350 sq ft/gal = 1.46 → buy 2 gallons. Paint cost: 2 × 40 = $80. (c) Materials subtotal: 616 + 80 = $696. + 5% tax = 696 × 1.05 = $730.80. Strong answer rounds order quantities UP (88 sq ft tile, 2 gallons paint), applies waste BEFORE tax, and notes that only the materials are taxed (not labour). Weak answer skips waste or applies tax to labour.',
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
        learnerGoal:
          'Compute roof pitch from rise and run, lay out a flight of stairs that matches the rise, and use Pythagoras to square layouts and size braces — always verifying against local code before cutting.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Roof pitch',
            title: 'Rise over run',
            content:
              'Roof pitch is expressed as rise:run, almost always with run = 12. A 6:12 pitch means the roof rises 6 in for every 12 in of horizontal run. The slope as a decimal = rise ÷ run = 6 ÷ 12 = 0.5. The pitch angle from horizontal = arctan(rise ÷ run) = arctan(0.5) ≈ 26.57°. A 4:12 is a low-slope roof (≈18.43°); 12:12 is a steep 45° roof.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Stair geometry',
            title: 'Risers and treads',
            content:
              'For a flight of stairs, total rise (floor-to-floor height) is divided into risers; each riser is a small step up. Number of treads = number of risers − 1. Common code targets: rise per riser ≈ 7 in (180 mm), tread depth ≈ 11 in (280 mm). The 2R + T ≈ 24–25 in rule and the R × T ≈ 75 in² rule are quick comfort checks. Always verify against your local code — values vary by jurisdiction.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Pythagoras',
            title: 'Squaring corners and sizing braces',
            content:
              'For a right triangle with legs a and b, the hypotenuse c satisfies a² + b² = c². The 3-4-5 rule (and its multiples like 6-8-10 and 9-12-15) is the carpenter\'s shortcut for squaring a foundation: measure 3 ft along one wall, 4 ft along the perpendicular wall, and the diagonal must read 5 ft for the corner to be square.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Stair layout',
            title: 'Floor-to-floor rise of 108 in',
            content:
              'Given: total rise = 108 in; target riser height ≈ 7 in.\n\nFormula: number of risers N = round(total rise ÷ target). Actual riser = total rise ÷ N. Treads = N − 1. Total run = treads × tread depth.\n\nEstimate: 108 ÷ 7 ≈ 15.4 — round up to 16 to keep risers under 7 in.\n\nSubstitute: actual riser = 108 ÷ 16 = 6.75 in. Treads = 16 − 1 = 15. With tread depth 10 in, total run = 15 × 10 = 150 in = 12 ft 6 in.\n\nAnswer: 16 risers at 6.75 in, 15 treads at 10 in, total run 12 ft 6 in.\n\nReasonableness: 2R + T = 2(6.75) + 10 = 23.5 in (within the 24–25 in target band, slightly tight). R × T = 6.75 × 10 = 67.5 in² (under 75 in² → consider 11 in tread). Verify against your local code before cutting stringers.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Pythagoras brace',
            title: 'Diagonal brace for an 8 ft × 6 ft frame',
            content:
              'Given: legs a = 8 ft, b = 6 ft.\n\nFormula: c = √(a² + b²).\n\nEstimate: 6-8-10 triple → c = 10 ft exactly. (The 3-4-5 family scaled by 2.)\n\nSubstitute: c = √(8² + 6²) = √(64 + 36).\n\nCalculate: 100 → c = √100 = 10 ft.\n\nAnswer: cut the brace 10 ft long.\n\nReasonableness: matches the 6-8-10 right-triangle triple exactly — no calc error possible. Use the same approach to square a foundation: 3 ft along one wall + 4 ft along the perpendicular wall must give 5 ft on the diagonal.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 3 — Pitch and angle',
            title: '6:12 pitch, what slope and angle?',
            content:
              'Given: rise:run = 6:12.\n\nFormula: slope = rise ÷ run; angle = arctan(slope).\n\nSubstitute: slope = 6 ÷ 12 = 0.5; angle = arctan(0.5).\n\nCalculate: angle ≈ 26.57°.\n\nAnswer: 6:12 pitch ≈ 0.5 slope ≈ 26.57° from horizontal.\n\nReasonableness: 12:12 = 45° (standard reference); 6:12 is half the rise so the angle should be roughly half — and it is, close to 26.6°. A 4:12 (slope 0.333) gives ≈18.4°. The relationship is non-linear — angles compress at low pitches and expand at steep pitches.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Lay out a smaller stair from rise alone',
            content:
              'Goal: a basement-to-main-floor rise of 96 in, target riser ≈ 7 in.\n\nStep 1 — Estimate: 96 ÷ 7 ≈ 13.7 — round to 14 risers.\nStep 2 — Actual riser: 96 ÷ 14 = 6.86 in.\nStep 3 — Treads: 14 − 1 = 13.\nStep 4 — With 10.5 in tread depth, total run = 13 × 10.5 = 136.5 in = 11 ft 4.5 in.\nStep 5 — Comfort checks: 2R + T = 2(6.86) + 10.5 = 24.22 in ✓; R × T = 6.86 × 10.5 = 72.0 in² (close to 75, acceptable). Step 6 — Verify against local building code before purchasing materials.',
            learnerTask:
              'Lay out a stair for a 110 in rise with a 7.25 in target riser and 11 in treads. Show every step and the comfort checks.',
            answerKey:
              'Number of risers: 110 ÷ 7.25 ≈ 15.17 → 15 risers. Actual riser: 110 ÷ 15 = 7.33 in (above 7.25 target — could try 16 risers: 110 ÷ 16 = 6.875 in, which is gentler). With 15 risers: treads = 14; total run = 14 × 11 = 154 in = 12 ft 10 in. Comfort: 2R + T = 2(7.33) + 11 = 25.66 (slightly over 24–25 band → tighten by going to 16 risers). With 16 risers, actual = 6.88 in, 2R + T = 24.75 ✓; R × T = 75.7 in² ✓. Final pick: 16 risers at 6.88 in is more comfortable than 15 at 7.33. Always verify against local code before cutting.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Quick stair check',
            content:
              '96 ÷ 7 = 13.71 → 14 risers; actual 96 ÷ 14 = 6.86 in. Treads = 13. With 11 in treads, run = 143 in = 11 ft 11 in. 2R + T = 24.72 ✓.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Geometry traps',
            content:
              'Confusing pitch (rise:run) with the angle in degrees; counting treads = risers (treads are always risers − 1); skipping the local-code check before cutting stringers; using the wrong unit when squaring legs (mixing inches and feet); rounding pitch decimals before computing the angle.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Roofing, decks, framing',
            content:
              'Roofers quote pitches when ordering shingles (steeper roofs use more material per ground square foot). Deck builders size diagonal braces with Pythagoras. Framers square foundations with 3-4-5. Stair builders derive riser/tread layouts from total rise.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three reps with one verification each',
            content:
              '(1) Compute slope and angle of an 8:12 pitch.\n(2) Lay out stairs for a 120 in rise with a 7.5 in target riser and 10.5 in treads — number of risers, actual rise, treads, run, comfort checks.\n(3) Compute the diagonal of a 12 ft × 9 ft layout to size a brace.\n\nFor each, write the verification step you would do before committing materials.',
            answerKey:
              '(1) Slope = 8 ÷ 12 = 0.667; angle = arctan(0.667) ≈ 33.69°. Verify: 12:12 = 45° → 8:12 should be less steep, and 33.69° is less than 45° ✓.\n(2) 120 ÷ 7.5 = 16 risers exactly; actual rise = 120 ÷ 16 = 7.5 in; treads = 15; run = 15 × 10.5 = 157.5 in = 13 ft 1.5 in. 2R + T = 25.5 in (slight over — consider 11 in tread for 25.0 ✓); R × T = 78.75 in² ✓. Verify against local code.\n(3) c = √(12² + 9²) = √(144 + 81) = √225 = 15 ft. Verify: 9-12-15 = 3-4-5 × 3 ✓.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 15.3 summary',
            title: 'Three small geometries',
            content:
              'Pitch is rise over run; stair layout starts from total rise; Pythagoras squares and sizes diagonals. Always verify against local code before cutting.',
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
      {
        id: 'm15-q11',
        question:
          'A homeowner asks for a quote on tiling a 200 sq ft bathroom floor. The contractor quotes "$8/sq ft installed" and says the total is "exactly $1,600." Name three things missing from this quote that you would ask about.',
        type: 'short_answer',
        correctAnswer:
          'Waste allowance (typical 10% on tile = $160 extra material), demolition / prep / removal of old flooring, and contingency for sub-floor surprises (rotted plywood, uneven slab, plumbing notches). A quote with no waste, no prep line, and no contingency is incomplete.',
        explanation:
          'Honest trade quotes always include waste, demolition or prep, and contingency for hidden conditions. A "round-number total" with none of these is a red flag.',
        relatedLesson: '15.4',
        difficulty: 'hard',
      },
      {
        id: 'm15-q12',
        question:
          'A learner computes a stair layout with 14 risers at 7.5 in each. The total floor-to-floor rise is supposed to be 110 in. Verify the math, identify the error, and state what an acceptable layout would look like for a 110 in rise.',
        type: 'short_answer',
        correctAnswer:
          '14 × 7.5 = 105 in, not 110 — a 5-inch gap. The riser height does not divide the stated rise evenly. Acceptable layouts for 110 in rise: 15 risers at 7.33 in (close to comfort target) or 16 risers at 6.875 in (gentler). Cutting 14 risers at 7.5 in for a 110 in rise leaves a 5-inch gap — code violation and trip hazard. Always verify against local code before cutting stringers.',
        explanation:
          'Stair rise must divide evenly across risers; never cut a stringer that does not match the actual measured floor-to-floor rise.',
        relatedLesson: '15.3',
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
    durationMinutes: 190,
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
        learnerGoal:
          'Apply a 6-step problem-solving framework that integrates skills from at least four prior modules and produces a reviewable artifact: question, formulas, results, and caveats.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'The 6 steps',
            title: 'Understand → identify → plan → execute → verify → communicate',
            content:
              'Step 1 — Understand: state the question in one sentence. What decision will the math support? Step 2 — Identify modules: which 3–5 prior modules carry the relevant formulas (number sense, percent, ratios, units, business math, finance, data, time, project, advanced finance, real estate, healthcare, trade)? Step 3 — Plan: list the inputs you need, the formulas you will apply, and the order. Step 4 — Execute: compute each step on paper or in a spreadsheet so the work is auditable. Step 5 — Verify: run a reasonableness estimate, then compare against your calculated value within ~10%. Step 6 — Communicate: deliver Q/F/R/C — Question, Formulas, Results, Caveats — in plain language.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'What makes a strong artifact',
            title: 'Six things every reviewer expects',
            content:
              'A strong learner artifact: (1) names the question precisely; (2) lists named inputs with sources; (3) shows formulas, not just answers; (4) reports the calculation in steps a reviewer can audit; (5) attaches a sensitivity sentence — "if input X falls 20%, the answer falls Y%"; (6) ends with a short list of items that need professional verification before action (tax advisor, lender, licensed trade, clinician, attorney, etc.).',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Coffee shop expansion',
            title: 'Should the owner spend $75k on expansion?',
            content:
              'Step 1 — Understand: should the owner add seating and a second espresso machine for $75,000?\n\nStep 2 — Identify modules: 6 (revenue/cost), 11 (cash flow), 12 (TVM/NPV), 9 (sensitivity).\n\nStep 3 — Plan: project incremental cash flow over 5 years; compute payback and NPV; sensitivity-test demand.\n\nStep 4 — Execute. Current revenue $250k. Expansion adds 40% revenue → +$100,000/yr; incremental operating cost +$50,000/yr (extra rent + labour + supplies). Incremental annual cash flow = +$100,000 − $50,000 = +$50,000/yr. Payback = $75,000 ÷ $50,000 = 1.5 years. 5-year NPV at 12%: PV factor for a 5-yr annuity at 12% = (1 − 1.12^(−5)) ÷ 0.12 = 3.6048; PV of inflows = $50,000 × 3.6048 = $180,240; NPV = $180,240 − $75,000 = $105,240. (A first-year ramp adjustment to ~80% of full uplift trims year-1 cash flow to $40k and pulls NPV down to ≈$95k — still strongly positive.)\n\nStep 5 — Verify: payback under 2 years and NPV strongly positive both support the same decision — accept.\n\nStep 6 — Communicate (Q/F/R/C): Q "Should I spend $75k on expansion?" F "5-year NPV at 12% discount; payback = upfront ÷ annual benefit." R "NPV ≈ +$105k (≈+$95k after first-year ramp); payback ≈ 1.5 yr." C "Hinges on +40% revenue assumption; demand drop to +20% would still justify but with thinner margin — verify with sales-history trend before committing."',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Personal car decision',
            title: 'Lease vs buy for a 4-year horizon',
            content:
              'Step 1 — Understand: lease at $389/mo for 36 months vs buy at $32,000 with $4,000 down, 60-month loan at 6%, then sell at month 48.\n\nStep 2 — Modules: 5 (loan math), 12 (TVM, lease vs buy), 9 (sensitivity to resale).\n\nStep 3 — Plan: total 4-year cash out for each path; resale value adjustment.\n\nStep 4 — Execute. Lease: 36 × 389 + new lease/buy at month 36 (assume continue at $389): 48 × 389 = $18,672 over 4 years. Buy: $4,000 down + monthly payment on $28,000 at 6%/60. Monthly = 28,000 × 0.06/12 ÷ (1 − 1.005^-60) = 28,000 × 0.005 ÷ (1 − 0.7414) = 140 ÷ 0.2586 = $541.46. 48 months: $25,990. Plus down: $29,990. Estimate resale at month 48 ≈ $14,000. Net buy cash = 29,990 − 14,000 = $15,990 (excluding loan balance still owing — refine in spreadsheet).\n\nStep 5 — Verify: buy ≈ $16k vs lease ≈ $18.7k for 4 years → buy looks cheaper if resale assumption holds.\n\nStep 6 — Communicate Q/F/R/C: Q "Lease or buy for 4 years?" F "Cash out comparison + resale adjustment." R "Buy ≈ $16k net; Lease ≈ $18.7k." C "Sensitive to resale value; verify with depreciation data and tax treatment if business use."',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Walk the framework on a real decision in 5 minutes',
            content:
              'Pick a real decision facing you (rent vs buy, freelance rate, project timeline, equipment purchase). Time yourself.\n\nMinute 1 — Understand: write the question in one sentence, names and units included.\nMinute 2 — Identify modules: list 3–5 prior modules that carry the formulas you need.\nMinute 3 — Plan: list inputs (with sources) and formulas in execution order.\nMinute 4 — Execute: compute the headline number on paper or quickly in a spreadsheet.\nMinute 5 — Verify and communicate: rule-of-thumb estimate the answer; write four sentences (Q/F/R/C).\n\nIf you cannot do this in 5 minutes for a small decision, the question is too big — split it into a smaller scoped sub-question first.',
            learnerTask:
              'Run all 6 steps on a real decision and write four Q/F/R/C sentences. Length goal: 80–120 words total.',
            answerKey:
              'Sample done well (rent vs buy, 5 yr): Q "Is buying a $300k home better than renting at $1,800/mo over 5 years?" F "Total cash out: own = down + 60×P&I + taxes + insurance + maintenance − resale. Rent = 60 × monthly + renter\'s insurance." R "Own ≈ $185k cash out (incl. resale at $325k after 5 yr). Rent = $108k cash out." C "Hinges on resale assumption (+1.6%/yr) and 5-yr time-on-property; below 3 yr, transaction costs flip the answer. Verify property tax rate, HOA, and insurance with local quotes; verify resale band with comparable home sales." A weak answer skips the modules used or the verify step.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Six-step rhythm',
            content:
              'You should be able to recite the six steps without looking: understand, identify, plan, execute, verify, communicate. If any step feels skippable today, that is the step that will fail your real-world artifact later.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Framework traps',
            content:
              'Skipping the understanding step and solving the wrong problem; using only one module when the decision spans several; treating an optimistic case as the expected case; reporting only the answer with no caveats; forgetting to name what still needs professional verification.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Memos, board papers, contractor quotes',
            content:
              'Every professional document worth reading follows the same shape: question, method, results, caveats. The capstone artifact (lessons 16.4) and the integrated scenarios (16.2 and 16.3) are practice runs of this exact pattern.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Frame two decisions',
            content:
              'Pick two decisions: one personal (e.g. car, lease, savings goal) and one work-related (e.g. price change, hire, equipment). For each, write the six steps in one sentence each, plus one caveat.',
            answerKey:
              'Personal example (savings): (1) Understand: "Can I have $20k saved in 5 yr?" (2) Modules: 5 (budgeting), 12 (TVM annuity). (3) Plan: needed monthly = FV target ÷ annuity factor at expected return. (4) Execute: at 5%, 5 yr → factor 67.5 (months); needed ≈ 20,000/67.5 ≈ $296/mo. (5) Verify: 5 yr × 12 × 296 = 17,760 contributions + ≈$2,240 growth = 20k ✓. (6) Communicate: Q/F/R/C four sentences. Caveat: assumes 5% steady return; if real return is 3%, target rises to ~$310/mo.\n\nWork example (price change): (1) "Should I raise prices 8% if I expect 3% volume loss?" (2) Modules 6, 9. (3) Plan: revenue impact = (1.08)(0.97) − 1 = +4.76%. (4) Execute on actual numbers. (5) Verify with break-even sensitivity. (6) Communicate. Caveat: volume loss is an estimate — track and revise after one quarter.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 16.1 summary',
            title: 'A repeatable method',
            content:
              'Six steps; three sentences per step. The framework is the spine of the capstone artifact. Practice it now on small decisions so the rhythm is automatic when the capstone is due.',
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
            eyebrow: 'Worked example 1 — Launch a new product line',
            title: 'Six modules combined into one decision',
            content:
              'Given: development $150,000; equipment $200,000 (5-yr straight-line depreciation); working capital $50,000; variable cost $50/unit; fixed cost $220,000/yr; expected demand 15,000 units/yr; price $89/unit.\n\nStep 1 — Initial investment (Y0): 150,000 + 200,000 + 50,000 = $400,000.\n\nStep 2 — Contribution per unit (Module 6): 89 − 50 = $39/unit.\n\nStep 3 — Break-even units: 220,000 ÷ 39 = 5,641 units. Break-even revenue: 5,641 × 89 = $502,049.\n\nStep 4 — At 15,000 units expected:\nRevenue: 15,000 × 89 = $1,335,000.\nVariable cost: 15,000 × 50 = $750,000.\nContribution: 1,335,000 − 750,000 = $585,000.\nMinus fixed: 585,000 − 220,000 = $365,000 operating profit.\n\nStep 5 — Margin of safety: (15,000 − 5,641) ÷ 15,000 = 62%. Strong cushion.\n\nStep 6 — Annual cash flow: operating profit + depreciation = 365,000 + 40,000 (equipment 200k/5) = $405,000/yr.\n\nReasonableness: NPV at 12% over 5 years (Module 12): PV factor = 3.6048; PV inflows = 405,000 × 3.6048 + 70,000 (year 5 WC + salvage recovery) ÷ 1.12^5 = 1,459,944 + 39,725 = ~$1,500,000. NPV = 1,500,000 − 400,000 = ~$1,100,000. Strongly positive.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Sensitivity test',
            title: 'What if demand drops to 10,000 units?',
            content:
              'Given: same product launch, but demand drops to 10,000 units/yr (33% drop).\n\nStep 1 — Recompute revenue: 10,000 × 89 = $890,000.\nStep 2 — Variable cost: 10,000 × 50 = $500,000.\nStep 3 — Contribution: 890,000 − 500,000 = $390,000.\nStep 4 — Operating profit: 390,000 − 220,000 = $170,000.\nStep 5 — Annual cash flow: 170,000 + 40,000 dep = $210,000/yr.\nStep 6 — NPV at 12% × 5 yr: 210,000 × 3.6048 + 39,725 (recovery) − 400,000 = 757,008 + 39,725 − 400,000 = ~$397,000.\n\nAnswer: NPV drops from $1.1M to $397k — still positive, but margin of safety thins. At 8,000 units, NPV would approach zero.\n\nMargin of safety at 10k units: (10,000 − 5,641) ÷ 10,000 = 43.6%. Still cushioned, but less so.\n\nReasonableness: a 33% demand miss cuts NPV by 64% — the leverage of fixed cost amplifies demand variance. This is why expected demand cannot be the optimistic case; it must be the median expectation, with separate stress test at 70% of plan.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Walk a different small-business scenario through the framework',
            content:
              'Goal: a coffee shop owner is considering a $75,000 expansion. Project: add 15 seats and a second espresso machine. Expected uplift: +40% revenue (current $250k/yr); incremental costs $50k/yr (rent + extra labour + supplies).\n\nStep 1 — Understand: should they invest $75k?\n\nStep 2 — Identify modules: 6 (revenue/cost), 11 (cash flow), 12 (TVM/NPV), 9 (sensitivity).\n\nStep 3 — Plan: project incremental cash flow over 5 years; compute payback and NPV; sensitivity test demand.\n\nStep 4 — Execute:\nIncremental revenue: 250,000 × 0.40 = $100,000/yr.\nIncremental costs: $50,000/yr.\nIncremental operating profit: 100,000 − 50,000 = $50,000/yr.\nPayback: 75,000 ÷ 50,000 = 1.5 years.\n5-yr NPV at 12%: 50,000 × 3.6048 = $180,240; minus 75,000 = $105,240.\n\nStep 5 — Sensitivity (50% of expected demand uplift, +20% revenue):\nIncremental revenue: $50,000.\nIncremental profit: 50,000 − 50,000 = $0.\nNPV: −$75,000 (loss of investment).\nDecision flips. Optimistic case wins; pessimistic case loses badly.\n\nStep 6 — Communicate Q/F/R/C:\nQ: Should we spend $75k on expansion?\nF: At expected +40% revenue, NPV ≈ +$105k, payback 1.5 yr. At +20% revenue, NPV is −$75k.\nR: Proceed only if customer-traffic data shows ≥30% headroom; otherwise hold.\nC: Demand assumption is the dominant risk. Verify with foot-traffic data before committing.\n\nReasonableness: project NPV at expected case is positive but the sensitivity flip warns that demand uplift is the critical assumption.',
            learnerTask:
              'A bakery considers $25,000 to add online ordering. Expected uplift: 25 extra orders/day × $12 average × 350 days = $105,000/yr revenue; incremental costs $30,000/yr (delivery commissions + packaging). Compute incremental profit, payback, and rough 5-yr NPV at 10%. State a sensitivity caveat.',
            answerKey:
              'Incremental profit: 105,000 − 30,000 = $75,000/yr. Payback: 25,000 / 75,000 = 0.33 years (4 months). NPV at 10% × 5 yr: PV factor 3.7908; 75,000 × 3.7908 = $284,310; minus 25,000 = $259,310. Sensitivity: at 15 extra orders/day (40% lower), revenue drops to $63,000; profit = 63,000 − 30,000 = $33,000; NPV = 33,000 × 3.7908 − 25,000 = $100,096. Still strongly positive — robust decision. Caveat: assumes online demand grows independently of in-store; if it cannibalises (replaces 10 in-store orders/day), uplift drops to net 15 orders, weakening the case. Verify with a 30-day pilot.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Weakest assumption?',
            content:
              'Demand at 15,000 units is the weakest assumption — it depends on market acceptance, pricing, and competition. Stress-test by recomputing at 12k, 10k, and 8k units; if NPV stays positive at 70% of expected demand, the decision is robust; if it flips, the call is too sensitive to demand to commit yet.',
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
            eyebrow: 'Worked example 1 — A 30-year-old\'s plan',
            title: 'Budget + debt + housing as one decision',
            content:
              'Given: $4,000/mo net income; rent $1,400/mo; current credit card balance $5,000 at 18% APR; emergency fund $3,000; considering buying a $300,000 home.\n\nStep 1 — Modules to integrate: 5 (budget), 7 (loan/debt math), 12 (TVM), 13 (mortgage + affordability).\n\nStep 2 — Current monthly cash flow: 4,000 − 1,400 (rent) − 350 (utilities & food est.) − 200 (transport) − 100 (card minimum) − 100 (savings) = $1,850/mo discretionary. Healthy.\n\nStep 3 — Debt payoff acceleration: pay $400/mo to card instead of $100. Time to payoff: ~14 months; total interest paid ≈ $580 vs minimum-only ~$2,500 over many years.\n\nStep 4 — Affordability for home: 28% rule on $4,000 net = $1,120/mo housing. 36% rule including all debt = $1,440/mo. With current card, capacity is constrained.\n\nStep 5 — Mortgage on $300k with 20% down ($60k), 6.5%/30 yr: P&I = 1,517; plus tax 300, insurance 125, HOA 0–200 = PITI $1,942–$2,142. Far above the 28% guideline.\n\nReasonableness: cannot afford home today. Card debt + below-target emergency fund + insufficient down payment = three blockers. Sequence matters.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — 24-month plan',
            title: 'Sequence the priorities to reach the home goal',
            content:
              'Given: same person; goal to be home-ready in 24 months.\n\nMonth 0–16 — Pay off card aggressively at $400/mo. Reduces interest exposure; clears the 36% DTI blocker.\n\nMonth 0–24 — Build emergency fund to $12,000 (3-mo expenses): contribute $375/mo from ex-card-payment cash flow once card cleared. After 16 mo of $400/mo to card + 8 mo of $375/mo to savings, fund grows by 16×0 (committed to card) + 8×400 + 8×375 = 6,200 from rerouted card payment (months 17-24). Plus initial $3,000 = $9,200 emergency fund. Short of $12k goal — extend timeline 4 more months to month 28.\n\nMonth 0–24 — Down-payment savings: budget $300/mo from existing discretionary. 24 × 300 = $7,200. With initial savings + employer bonuses, target $30,000 (10% down on $300k) is reachable in ~30 months.\n\nMonth 30 outlook: emergency fund $12k + down-payment $30k = $42k cash. Home becomes financially supportable IF income holds.\n\nReasonableness: the realistic path takes ~2.5 years, not "today." Anyone offering a "home now with 5% down and PMI" path is increasing risk for the buyer.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Run your own integration on a real personal goal',
            content:
              'Goal: pick a real personal financial goal (debt payoff, home, savings target, retirement, big purchase). Walk all six framework steps.\n\nStep 1 — Understand: state goal in one sentence with timeline and dollar figure.\n\nStep 2 — Identify modules: 5 (budget), 7/12 (debt/TVM), 13 (mortgage if applicable), 12.2 (savings annuity), 14.3 (insurance if relevant).\n\nStep 3 — Plan: list current cash flows, current debt, current savings, expected return rate.\n\nStep 4 — Execute: compute monthly contribution needed, time to goal at expected return, sensitivity at 50% of expected savings rate.\n\nStep 5 — Verify: rule-of-thumb estimate; does the answer feel right? At 5% return, money doubles every 14 years (rule of 72: 72/5).\n\nStep 6 — Communicate Q/F/R/C and a caveat list.\n\nWhat changes the answer the most: income shocks, market returns, unexpected expenses. Plan for at least one. Verify rates and tax assumptions with a financial professional before committing major moves.',
            learnerTask:
              'A 35-year-old earning $5,500/mo net, no debt, $8k savings, wants to retire at 65 with $1M. Compute monthly investment needed at 7% annual return. State whether the plan is realistic given remaining cash flow after $3,500 in expenses.',
            answerKey:
              'Annuity FV formula: $1M = PMT × ((1.07/12)^360 − 1) ÷ (0.07/12). Adjusting: monthly r = 0.005833; n = 360. FV factor = ((1.005833)^360 − 1)/0.005833 = (8.1163 − 1)/0.005833 = 1,219.97. Required PMT = 1,000,000 / 1,219.97 = $819.69/mo. Discretionary cash: 5,500 − 3,500 = $2,000/mo. $820/mo is 41% of discretionary — feasible but tight. Verdict: realistic if discipline holds and no income shocks. Caveat: 7% real return is optimistic; at 5% real, required PMT rises to $1,202/mo (60% of discretionary — tight). Strong answer tests both return assumptions; weak answer reports only the 7% case.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Budget and debt',
            title: 'Modules 5 and 7',
            content:
              'Personal budget always comes first: monthly income minus fixed expenses minus debt service equals discretionary cash. High-interest debt (>10% APR) is paid down before any savings beyond a small emergency fund. Card payoff at $400/mo on a $5,000 balance at 18% APR clears in ~14 months with ~$580 in total interest — versus $2,500+ over many years at minimum payments.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Home purchase',
            title: 'Module 13 + affordability rules',
            content:
              'Home purchase math: $300k home with 20% down, 6.5% APR, 30-yr mortgage → P&I $1,517 + property tax $300 + homeowner\'s insurance $125 + HOA $0–200 → PITI $1,942–$2,142/mo. Affordability rule: 28% of net income for housing → $1,120 on $4,000 net. The PITI exceeds capacity, so home is not currently supportable. Plan to clear other debt + build down payment first.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'The honest call',
            title: 'Recommend with evidence',
            content:
              'Recommendation must match the math: prioritise card payoff (~16 mo at $400/mo); rebuild emergency fund to 3 months of expenses (~$12k); save the $30k+ down payment; revisit home purchase in 24-30 months. Verify mortgage rate and property tax with a lender; verify income tax effects with a tax professional before signing.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Walk your own version',
            content:
              'Apply the same flow to your real numbers. The math will tell you how long the plan takes; the discipline of writing it down is what makes it actually happen.',
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
              'Lesson honest call: pay card $5k @18% aggressively ($400/mo clears ≈14 mo, ~$580 interest) before maxing housing; PITI on $300k with 20% down ≈$1,942–$2,142 vs 28% of $4k net ($1,120) — wait until debt cleared and emergency fund built; cite rate/tax verification with a lender and tax pro.',
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
            eyebrow: 'Worked example 1 — Mini household budget',
            title: 'A skeleton capstone',
            content:
              'Given: net income $4,000/mo; fixed expenses — rent $1,400; utilities $220; groceries $600; transport $280; debt payment $350.\n\nFormula: discretionary = net − fixed sum.\n\nFixed total: 1,400 + 220 + 600 + 280 + 350 = $2,850.\n\nCalculate: 4,000 − 2,850 = $1,150/mo discretionary.\n\nAnswer: $1,150 discretionary before savings goals.\n\nReasonableness: fixed expenses are 71% of net (2,850 / 4,000). Healthy households target ≤70%; this is just at the boundary. If a savings rate of 20% is the goal, that\'s $800/mo to savings, leaving $350 for everything else — workable but tight.\n\nCapstone integration angle: this single budget calculation hits Modules 5 (budgeting), 11 (cash flow over time if extended to 12 months), and 12 (TVM if savings accumulate at a rate). Naming the modules used is part of the capstone artifact.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Small-business pricing capstone',
            title: 'A four-module capstone walkthrough',
            content:
              'Given: a freelancer wants to set their hourly rate. Inputs: target annual income $80,000; expected billable hours 25/week × 48 weeks = 1,200 hrs/yr; business costs $12,000/yr (software, insurance, taxes); self-employment tax 15.3% on net SE income.\n\nStep 1 — Modules used: 6 (revenue/cost), 8 (productivity/utilisation), 5 (taxes & take-home), 12 (TVM if planning savings).\n\nStep 2 — Required gross revenue: 80,000 (target take-home) ÷ (1 − 0.153 SE tax) = 80,000 ÷ 0.847 = $94,452 gross. Plus business costs $12,000 = $106,452 total revenue needed.\n\nStep 3 — Hourly rate: 106,452 ÷ 1,200 hrs = $88.71/hr → round to $90/hr.\n\nStep 4 — Sensitivity: if billable drops to 1,000 hrs (low-utilisation year), required rate rises to 106,452 / 1,000 = $107/hr. If costs rise to $18,000, rate rises to $103/hr at 1,200 hrs. Recommend $95/hr to build cushion.\n\nStep 5 — Reasonableness: $95/hr × 1,200 = $114,000 gross. After SE tax 15.3% × ($114,000 − $12,000 deductions) = ~$15.6k tax; take-home ~$86k — slightly above $80k target, robust to small variance.\n\nCapstone caveat: real billable utilisation often runs lower than planned in year 1 (60–70% of plan). Verify rate vs market with 2–3 competitor quotes; verify tax assumptions with a CPA who handles freelancers.',
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
