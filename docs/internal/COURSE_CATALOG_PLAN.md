# Jifunze.ai — 50-course catalog (LOCKED)

**Status:** **LOCKED** 2026-05-18. Any change to the catalog (add, drop, replace, rename a course; change a school; change the SME requirement table) requires an amendment to this document under the governance rule in `docs/JIFUNZE_MASTER_PLAN.md` §8.3. Operational details inside an already-defined course (specific topic ordering, lab UX, prose style) do not require an amendment.
**Date locked:** 2026-05-18.
**Supersedes:** v1 (30-course draft) and v2 (49-course draft for review), both authored the same day.
**Purpose:** The committed 50-course catalog that justifies the Jifunze.ai positioning ("Harvard online with tutoring and applied labs") and stands up as a cohesive academic catalog. Each course is named, scoped, and defends its slot.

**Reading rule.** Every course on this list must (a) have a portfolio output a learner can show an employer or admissions committee, (b) be defensibly distinct from a free YouTube alternative, (c) belong in a serious academic catalog — not a content farm. If a course fails any of those three tests, swap it out.

**Audience reminder.** Per master plan §1 and §2, the catalog serves adult learners (university, professional, lifelong) as primary audience and welcomes high-school learners as secondary audience for subject-mastery courses — specifically math and sciences. Platform policy for minors (parental consent, billing through guardians, age-appropriate AI tutor moderation) is required infrastructure before the math/science courses go live.

---

## Catalog shape

Six schools plus two specialization tracks. Weighted toward the platform's wedge: AI/digital fluency, deep math/science with tutoring, and rigorous adult-development content.

| School / Track | Courses | Rationale |
|---|---|---|
| 1. AI and digital fluency | 9 | Core wedge. Highest market demand. Includes #50 system design — the highest-demand engineering course missing from existing platforms. |
| 2. Business and growth | 8 | Broadest learner audience. |
| 3. Career and intellectual development | 8 | Academic-quality differentiator. |
| 4. Leadership and learning systems | 6 | Smaller audience but slot-defensible. |
| 5. Mathematics | 9 | Hardened ladder; serves high school → graduate prep. Math lab (Wave 4) is load-bearing. |
| 6. Sciences | 6 | Foundations + the two highest-tutoring-demand topics (orgo, cell bio). |
| Specialization A — Cybersecurity | 3 | Targeted at upper-undergrad+ learners; deliberately distinct from TryHackMe-style platforms. |
| Specialization B — Vertical specialty | 1 | SME-anchored. Healthcare PM is the first; pattern is repeatable. |
| **Total** | **50** | |

**Catalog numbering note.** The course index numbers (1–50) reflect the order courses were added to the catalog plan during design, not the order learners take them and not strict school grouping. #50 (Designing Production Software Systems) belongs to School 1 conceptually but carries the catalog index 50 because it was the final addition before lock.

**Level mix:** 11 Beginner, 26 Intermediate, 13 Advanced.
**Lab dependencies:** 14 math/science courses use the math lab (Wave 4). 1 course (#50 Designing Production Software Systems) optionally integrates with cloud labs (Wave 5) when those ship — initial author-and-ship does not block on Wave 5. No course in the 50 *requires* cloud lab for v1 release.
**SME-anchored:** 11 courses require named subject-matter experts (organic chemistry, cell/molecular biology, advanced physics, calculus rigor, linear algebra, discrete math, cybersecurity courses, healthcare PM, system design). These are the courses where AI authoring without SME validation is unsafe.

---

## School 1: AI and digital fluency (9 courses)

**1. AI Essentials** — *Beginner to Intermediate*
*For:* Anyone wanting working AI literacy without becoming an ML engineer.
*Output:* A personal AI use-stance memo, verification matrix, workflow plan.
*Slot:* The foundational course every learner takes first. Builds the mental model.

**2. AI with Claude for Everyday Work** — *Beginner*
*For:* Knowledge workers integrating AI into daily work.
*Output:* A revised workflow document with measured time-savings vs baseline.
*Slot:* The applied counterpart to #1, tool-shaped. Recommended Wave 2 pilot course.

**3. Prompt Engineering Across Models** — *Intermediate*
*For:* Practitioners using multiple models in real work.
*Output:* A model-comparison report on three real tasks plus a personal prompt library.
*Slot:* Cross-model literacy as a real skill. Prevents vendor lock-in.

**4. Building AI Agents** — *Intermediate to Advanced*
*For:* Developers shipping agentic systems.
*Output:* A working agent with memory, tool use, and a documented eval harness.
*Slot:* The frontier of practical AI. Where most "AI courses" stop short.

**5. AI Safety, Alignment, and Responsible Use** — *Intermediate*
*For:* Anyone deploying AI at work.
*Output:* A risk register and review process for a real AI deployment.
*Slot:* Academic depth that "use AI well" courses skip. Differentiator vs Coursera/Udemy.

**6. Data and Decisions** — *Intermediate*
*For:* Analysts, managers, anyone reading dashboards.
*Output:* A decision memo with metrics, baselines, confidence intervals, recommendation.
*Slot:* Where data literacy meets executive judgment. Distinct from #37 Stats — this is about *using* statistics for decisions, not the statistical foundations.

**7. The Modern Data Stack** — *Intermediate to Advanced*
*For:* Analysts and engineers building data infrastructure.
*Output:* A working pipeline from raw data to dashboard with documented choices.
*Slot:* Infrastructure side of data work. Pairs with #6 but distinct.

**8. Machine Learning for Working Engineers** — *Intermediate*
*For:* Software engineers who can train a logistic regression but freeze choosing model classes.
*Output:* A model-choice memo for a production-shaped problem with defended tradeoffs.
*Slot:* Hands-on ML grounded in real engineering tradeoffs, not Andrew Ng-redux. Prereq: comfort with #38 Linear Algebra and #37 Statistics.

**50. Designing Production Software Systems** — *Intermediate to Advanced*
*For:* Working software engineers preparing for senior+ roles, technical interviews, or team-lead promotions.
*Prereq:* Comfortable building production applications; familiarity with at least one backend framework and at least one database. #7 Modern Data Stack helpful but not required.
*Topics:* Requirements gathering and capacity estimation, data modeling for scale, API design and versioning, caching strategies, queuing and async patterns, sharding and replication, consistency models (CAP, PACELC), distributed-systems patterns (leader election, gossip, consensus basics), observability (logs/metrics/traces), failure modes and resilience, postmortem culture, system design interview structure.
*Output:* A full system design document for a real or scoped-fictional system, with capacity estimates, data model, API surface, scaling decisions, failure-mode analysis, and operational considerations. Reviewed against a rubric.
*AI tutor:* Very high value — system design has no single right answer, so "walk through this tradeoff with me" is exactly the highest-leverage tutor configuration after organic chemistry.
*Cloud lab:* Optional integration in Wave 5. v1 ships without it; v2 (post-Wave 5) adds a lab component where learners deploy a small distributed system end-to-end.
*Authoring:* AI-assisted from canonical references (*Designing Data-Intensive Applications*, the AWS/Google/Meta engineering blogs, and the Educative.io interview-prep material as structural guide — adapted not copied), **SME required** for content review and rubric calibration. The SME for this course is the highest-value contract relationship after organic chemistry; recommend a senior engineer with system design interview experience at a top-tier company.

---

## School 2: Business and growth (8 courses)

**9. Business Builder (Foundations)** — *Beginner to Intermediate*
*For:* Would-be founders and operators.
*Output:* A business model canvas plus a 24-month financial projection.
*Slot:* Foundational business course. Every other business course assumes it.

**10. Practical Business Analytics** — *Beginner*
*For:* Small-business operators, owner-operators.
*Output:* A KPI dashboard plus a weekly review process.
*Slot:* Turn business data into decisions. Audience: operators, not analysts.

**11. Marketing and Growth** — *Intermediate*
*For:* Marketers, founders, growth roles.
*Output:* A 90-day growth plan with channel hypotheses, baseline metrics, test design.
*Slot:* Modern growth as a discipline, not stunts.

**12. Money and Finance for Operators** — *Intermediate*
*For:* Operators, managers, founders reading financials.
*Output:* A unit-economics model and runway analysis.
*Slot:* The numbers side of running anything. Distinct from #23 (Personal Finance).

**13. Pricing Strategy** — *Intermediate*
*For:* Anyone setting prices.
*Output:* A pricing test plan with three scenarios and predicted revenue/volume.
*Slot:* Highest-leverage business lever; almost nobody teaches it rigorously.

**14. Negotiation** — *Intermediate*
*For:* Anyone — salary, deals, vendors, scope.
*Output:* A prep doc for a real upcoming negotiation, scored against rubric.
*Slot:* The single highest-ROI soft-skill course.

**15. Product Thinking** — *Intermediate*
*For:* PMs, designers, founders.
*Output:* A product spec with prioritization framework and user-research summary.
*Slot:* From idea to validated spec.

**16. Operations and Process Design** — *Intermediate*
*For:* Operators, team leads, COOs.
*Output:* A documented process map with measurable inputs, outputs, quality bars.
*Slot:* Backbone of every functioning company. Distinct from #27 — process is repeating work, projects are novel work.

---

## School 3: Career and intellectual development (8 courses)

**17. Career Launch** — *Beginner*
*For:* Early-career, recent graduates, pivoters.
*Output:* Targeted resume, interview prep doc, 90-day post-hire plan.
*Slot:* Foundational, not naive.

**18. Clear Communication** — *Beginner to Intermediate*
*For:* Anyone in knowledge work.
*Output:* Revised set of learner's own emails, presentation, meeting prep doc.
*Slot:* Single most universally useful skill in the catalog.

**19. Writing Well at Work** — *Intermediate*
*For:* Knowledge workers producing long-form work documents.
*Output:* Fully revised long-form work document (memo, spec, plan).
*Slot:* Long-form, document-shaped writing. Different muscle from #18.

**20. Research and Critical Thinking** — *Intermediate*
*For:* Anyone making claims grounded in evidence.
*Output:* A research memo with sources, counterarguments, conclusions.
*Slot:* How to actually use sources and arguments.

**21. Reading Difficult Things** — *Intermediate*
*For:* Professionals dealing with code, contracts, research papers, financial documents.
*Output:* Three annotated documents from learner's own work context.
*Slot:* Meta-skill nobody teaches systematically. Distinctive to this platform.

**22. Practical Mathematics for Life, Work, and Business** — *Beginner to Intermediate*
*For:* Adult learners who froze at high-school math but need math at work.
*Output:* Capstone applied-problem portfolio.
*Slot:* Math you'll actually use — non-academic framing. Math lab pilot (Wave 4). Distinct from School 5 — this is *applied math for working adults*, the School 5 ladder is *academic math mastery*.

**23. Personal Finance for Knowledge Workers** — *Beginner*
*For:* Anyone earning a salary.
*Output:* A personal financial plan: tax, save, invest, protect.
*Slot:* Adult financial literacy.

**24. Decision-Making Under Uncertainty** — *Intermediate to Advanced*
*For:* Anyone making consequential decisions with incomplete information.
*Output:* A real decision documented with explicit reasoning, prior estimates, post-decision update.
*Slot:* Academic depth that "decision-making" courses skip.

---

## School 4: Leadership and learning systems (6 courses)

**25. Leadership and Teams** — *Intermediate*
*For:* New and emerging managers, tech leads.
*Output:* Team operating-system document (rituals, decisions, feedback).
*Slot:* Leadership as a craft, not vibes.

**26. Teaching and Facilitation** — *Intermediate*
*For:* Managers, trainers, anyone running meetings or workshops.
*Output:* Facilitation plan and run-of-show for a real upcoming session.
*Slot:* Teaching as a transferable skill. Reflexively useful.

**27. Project Execution** — *Beginner to Intermediate*
*For:* Anyone shipping things — engineers, marketers, ops.
*Output:* A project plan, status-report cadence, post-completion postmortem.
*Slot:* Without execution, nothing ships. Prereq for #49 Healthcare PM.

**28. Hiring and Building Teams** — *Intermediate*
*For:* Managers, founders, hiring managers.
*Output:* Hiring rubric and interview guide for a real open role.
*Slot:* Most consequential management decision, treated rigorously.

**29. Giving and Receiving Feedback** — *Intermediate*
*For:* Anyone in a working relationship.
*Output:* Documented feedback plan plus one delivered piece of feedback with debrief.
*Slot:* Compounds every other team-work skill.

**30. The Learning Organization** — *Advanced*
*For:* Leaders, L&D, founders building teams that get better.
*Output:* Learning-systems audit of learner's team + 90-day improvement plan.
*Slot:* How teams actually get better. Reflexively meta-relevant to this platform.

---

## School 5: Mathematics (9 courses) — the platform's high-demand pillar

**Why this school is structured as a ladder.** Math is the subject where prerequisite chain matters most. Skipping a step produces a learner who can fake fluency but can't generalize. This school is sequenced so a learner can climb from sixth-grade-level confidence to graduate-prep math, with every prerequisite explicit and every transition supported by the AI tutor and math lab.

**Why this school is high-leverage for the platform.**
- Math and science tutoring is the single most-demanded category in private education ($10B+ market globally).
- The math lab (Wave 4) is load-bearing — these courses are the lab's primary justification.
- AI tutor (Wave 3) is exceptionally valuable here: math is a domain where "explain it differently," "show me a worked example," and "where did I go wrong?" are the highest-value prompts in any subject.
- OER strategy works: OpenStax, MIT OCW, Khan Academy's released curriculum, and other open sources provide rigorous canonical content the platform can adapt rather than generate. **Per-course authoring time drops from ~80 hours to ~50 hours** because the substance is settled.
- Audience extends from high-school students through pre-med/pre-engineering to working professionals doing career pivots into data/ML.

**Assessment rigor.** Every math course in this school is problem-set-heavy, not essay-heavy. Each course's capstone is a graded problem portfolio plus an applied modeling project. Math lab integration is mandatory — no math course in this school is delivered as prose-only.

**Prerequisite ladder (visual):**

```
#31 Pre-Algebra Refresh
        │
        ▼
#32 Algebra ──────────────────────────────────┐
        │                                     │
        ▼                                     ▼
#33 Geometry & Trigonometry          #37 Statistics & Probability
        │                                     │
        ▼                                     │
#34 Pre-Calculus and Functions               │
        │                                     │
        ▼                                     │
#35 Calculus I — Differential                │
        │                                     │
        ▼                                     │
#36 Calculus II — Integral ─────► #38 Linear Algebra ─► [#8 ML for Engineers]
        │
        ▼
#39 Discrete Mathematics
```

---

**31. Pre-Algebra Refresh** — *Beginner*
*For:* Adult learners and high-schoolers who froze early at math; foundation for any further math course.
*Prereq:* Basic arithmetic comfort.
*Topics:* Order of operations, fractions, decimals, percentages, ratios, basic one-variable equations, word problems, number sense, negative numbers, basic exponents.
*Output:* Diagnostic assessment + capstone problem portfolio with reasoning shown.
*Math lab:* Yes — interactive problem solving with step-hinting; SymPy verification of student work.
*AI tutor:* Critical — adult learners are often math-anxious. The tutor is the difference between completion and abandonment.
*OER source:* OpenStax Pre-Algebra (CC-BY).
*Authoring:* AI-assisted from OER, SME spot-review.

**32. Algebra** — *Beginner to Intermediate*
*For:* High-school algebra learners, adult learners advancing toward college math.
*Prereq:* #31 or equivalent fluency.
*Topics:* Linear equations and inequalities, systems of equations, polynomials, factoring, quadratics (factoring, completing the square, quadratic formula), exponents and radicals, rational expressions, functions intro, function notation.
*Output:* Capstone problem portfolio + applied modeling project (model a real situation with algebra: pricing, distance/rate, exponential growth).
*Math lab:* Yes — symbolic equation solving, function graphing, parameter exploration.
*AI tutor:* High value.
*OER source:* OpenStax Elementary Algebra and Intermediate Algebra.
*Authoring:* AI-assisted from OER, SME spot-review.

**33. Geometry and Trigonometry** — *Beginner to Intermediate*
*For:* Students needing geometric reasoning and trig foundations for pre-calc/physics.
*Prereq:* #32 Algebra.
*Topics:* Plane geometry, basic proofs (two-column and paragraph), similar and congruent figures, area and volume, coordinate geometry, right-triangle trig, unit circle, trig functions, identities, trig applications.
*Output:* Geometric construction portfolio + trig modeling project (real-world distance/angle calculations, wave model).
*Math lab:* Yes — interactive geometric construction, trig function visualization, unit circle exploration.
*AI tutor:* Very high value — proofs are where students get stuck without expert help.
*OER source:* OpenStax + Khan Academy released materials.
*Authoring:* AI-assisted, SME spot-review (proof rigor needs validation).

**34. Pre-Calculus and Functions** — *Intermediate*
*For:* Calculus-bound learners; STEM-track students.
*Prereq:* #32 Algebra and #33 Geometry/Trig.
*Topics:* Function families (linear, polynomial, rational, exponential, logarithmic, trig), transformations, composition, inverses, sequences and series, conic sections, intro to limits.
*Output:* Functions portfolio analyzing real-world phenomena modeled by each function family.
*Math lab:* Yes — function exploration with parameter sliders, transformation visualization.
*AI tutor:* High value.
*OER source:* OpenStax Pre-Calculus.
*Authoring:* AI-assisted from OER, SME spot-review.

**35. Calculus I — Differential Calculus** — *Intermediate*
*For:* First-time calculus learners — high schoolers in AP Calc, college students, adult learners pursuing STEM.
*Prereq:* #34 Pre-Calc.
*Topics:* Limits and continuity, derivatives (definition and rules), applications (rates of change, optimization, related rates), implicit differentiation, Mean Value Theorem, curve sketching.
*Output:* Optimization portfolio applying calculus to real problems (engineering, biology, business).
*Math lab:* Yes — derivative visualization, optimization problem solving, limit exploration.
*AI tutor:* Very high value — calculus is *the* tutored math subject.
*OER source:* OpenStax Calculus Volume 1, MIT OCW 18.01.
*Authoring:* AI-assisted from OER, SME required (proof rigor and worked examples need validation).

**36. Calculus II — Integral Calculus** — *Intermediate to Advanced*
*For:* Second-semester calc learners.
*Prereq:* #35 Calc I.
*Topics:* Antiderivatives, definite integrals, fundamental theorem of calculus, integration techniques (substitution, parts, partial fractions, trig substitution), applications (area, volume, work, arc length), improper integrals, sequences and series, convergence tests, Taylor series.
*Output:* Integration portfolio with applied problems + a research-style writeup on a series convergence question.
*Math lab:* Yes — area/volume visualization, series exploration with partial-sum convergence.
*AI tutor:* Very high value.
*OER source:* OpenStax Calculus Volume 2, MIT OCW.
*Authoring:* AI-assisted from OER, SME required.

**37. Statistics and Probability** — *Intermediate*
*For:* Anyone working with data — science students, social science students, working analysts.
*Prereq:* #32 Algebra; #35 Calc I helpful but not required (probability density section).
*Topics:* Descriptive statistics, probability theory, common distributions (normal, binomial, Poisson, t, chi-squared), sampling, central limit theorem, confidence intervals, hypothesis testing, linear regression intro, Bayesian thinking intro.
*Output:* Statistical analysis of a real dataset with explicit assumptions, conclusions, and confidence statements.
*Math lab:* Yes — distribution exploration, hypothesis-test simulation, regression fitting.
*AI tutor:* High value.
*OER source:* OpenStax Introductory Statistics, OpenIntro Statistics.
*Authoring:* AI-assisted from OER, SME spot-review.

**38. Linear Algebra** — *Intermediate to Advanced*
*For:* Math/CS/engineering students, ML-bound learners, physics students.
*Prereq:* #32 Algebra strong; #35 Calc I helpful.
*Topics:* Vectors, matrices, linear transformations, systems of linear equations, determinants, vector spaces, basis and dimension, eigenvalues and eigenvectors, applications in graphics, ML, physics.
*Output:* Applied linear algebra project (implement a small ML algorithm from scratch, build an image-transformation tool, or model a physics system).
*Math lab:* Yes — matrix operations, transformation visualization, eigenspace exploration.
*AI tutor:* High value.
*OER source:* MIT OCW 18.06 (Gilbert Strang's course), OpenStax not yet complete.
*Authoring:* AI-assisted from OER, SME required (proof rigor).

**39. Discrete Mathematics** — *Intermediate to Advanced*
*For:* CS-bound learners, logic-focused learners, math majors.
*Prereq:* #32 Algebra; comfort with logical reasoning.
*Topics:* Propositional and predicate logic, sets, functions, relations, combinatorics, probability for discrete spaces, graph theory, recurrence relations, proof techniques (induction, contradiction, contrapositive, construction).
*Output:* Proof portfolio + applied combinatorics or graph theory project.
*Math lab:* Yes — graph algorithms, combinatorics counters, proof structure builders.
*AI tutor:* High value — proofs are tutoring-heavy.
*OER source:* Various open texts; less unified than calc.
*Authoring:* AI-assisted, **SME required** (proofs are easy to get subtly wrong).

---

## School 6: Sciences (6 courses) — foundations plus the highest-tutoring-demand subjects

**Why six courses, not nine.** A complete science ladder (every level of every science) is a 20-course commitment we are explicitly not making in v1. The six courses chosen are: (a) the three foundational sciences (physics, chem, bio) so anyone has an entry point; (b) modern/advanced physics and the two highest-tutoring-demand science topics (organic chemistry and cell/molecular biology) where the platform's AI tutor + math lab + SME validation creates a defensible offering. Earth sciences, geology, astronomy, anatomy/physiology, etc. are deliberately deferred to v2.

**Why these are second-highest priority after math.** Science courses use the math lab heavily (especially physics for mechanics simulation, chem for stoichiometry calculations) and the AI tutor is even more valuable than in math because science learners get stuck on *qualitative* misconceptions ("why does this reaction work?") that don't appear in problem-set answer keys.

**Assessment rigor.** Each science course is problem-set-heavy *and* has a lab-notebook component (digital lab, since we are not running wet labs). Capstone is an experimental-design exercise + analysis writeup.

---

**40. Physics Foundations — Mechanics** — *Intermediate*
*For:* First-time physics learners (high school + adult).
*Prereq:* #32 Algebra; #33 Trig (right-triangle level minimum).
*Topics:* Kinematics (1D and 2D), Newton's laws, forces and free-body diagrams, work-energy theorem, conservation laws, momentum and collisions, rotational motion, gravitation, simple harmonic motion, fluids basics.
*Output:* Mechanics problem portfolio + applied design project (analyze a real-world system: vehicle, pendulum, projectile).
*Math lab:* Yes — physics simulation environment built on Pyodide.
*AI tutor:* High value.
*OER source:* OpenStax College Physics, MIT OCW 8.01.
*Authoring:* AI-assisted from OER, SME spot-review.

**41. Physics — Electromagnetism and Modern Topics** — *Advanced*
*For:* Advanced physics learners; pre-engineering and pre-med.
*Prereq:* #40 Mechanics + #35 Calculus I.
*Topics:* Electric fields and Gauss's law, electric potential, capacitance, circuits (DC and AC), magnetic fields, Ampere's law, electromagnetic induction, EM waves, intro to special relativity, intro to quantum mechanics (wave-particle duality, atomic structure, uncertainty principle).
*Output:* E&M problem portfolio + research summary on a modern physics topic.
*Math lab:* Yes — field visualization, circuit simulation.
*AI tutor:* High value.
*OER source:* OpenStax Physics Volume 2 and 3, MIT OCW 8.02.
*Authoring:* AI-assisted from OER, **SME required** (modern physics conceptual accuracy is essential).

**42. Chemistry Foundations** — *Intermediate*
*For:* First-time chem learners; pre-med, biochem, pre-pharmacy.
*Prereq:* #32 Algebra; basic math.
*Topics:* Atomic structure, periodic trends, chemical bonding (ionic, covalent, polarity), nomenclature, stoichiometry, gas laws, solutions and solubility, acid-base chemistry and pH, thermochemistry intro, kinetics intro, equilibrium intro.
*Output:* Stoichiometry problem portfolio + reaction analysis project (a real reaction system with calculated stoichiometry, thermodynamics, kinetics).
*Math lab:* Yes — stoichiometry calculations, pH calculations, equilibrium simulators.
*AI tutor:* Very high value — chem is tutoring-heavy.
*OER source:* OpenStax Chemistry.
*Authoring:* AI-assisted from OER, **SME required**.

**43. Organic Chemistry** — *Advanced*
*For:* Pre-med, biochem majors, advanced chem learners.
*Prereq:* #42 Chemistry Foundations.
*Topics:* Functional groups, IUPAC nomenclature, stereochemistry, reaction mechanisms (SN1, SN2, E1, E2, addition, elimination, condensation), spectroscopy intro (IR, NMR basics), retrosynthesis intro, alcohols, ethers, ketones, aldehydes, carboxylic acids, amines.
*Output:* Mechanism portfolio + synthesis design project (design a synthetic route for a target molecule with mechanism justification).
*Math lab:* Limited — visualization of 3D molecular structure and reaction mechanisms is the lab equivalent.
*AI tutor:* **EXTREMELY high value** — orgo is the #1 tutored science subject. Pre-med students pay private tutors hundreds of dollars per hour for this. The platform's AI tutor for orgo is the single highest-leverage tutor configuration in the catalog.
*OER source:* Various; less unified than gen-chem.
*Authoring:* AI-assisted, **SME absolutely required**. This course should not ship without rigorous review by an organic chemist.

**44. Biology Foundations** — *Intermediate*
*For:* First-time biology learners; pre-med, life sciences track.
*Prereq:* Comfortable with basic chemistry (#42 helpful but not required for foundations).
*Topics:* Cell biology overview, Mendelian genetics, molecular genetics intro, evolution and natural selection, ecology and ecosystems, physiology overview (organ systems), scientific method and experimental design.
*Output:* Biology portfolio with an experimental-design exercise (propose, design, and analyze a hypothetical study).
*Math lab:* Limited — population genetics calculators, Hardy-Weinberg simulators.
*AI tutor:* High value.
*OER source:* OpenStax Biology.
*Authoring:* AI-assisted from OER, SME spot-review.

**45. Cell and Molecular Biology** — *Advanced*
*For:* Pre-med, biochem majors, life sciences upper-undergrad.
*Prereq:* #44 Biology Foundations and #42 Chemistry Foundations.
*Topics:* DNA structure and replication, transcription and translation, gene regulation, protein structure and function, cell signaling, cell cycle and division, cellular metabolism (glycolysis, TCA cycle, electron transport, photosynthesis), cancer biology intro, lab techniques (PCR, gel electrophoresis, microscopy).
*Output:* Mechanism/pathway portfolio + critical analysis of a real research paper.
*Math lab:* Limited — pathway visualization, metabolic flux calculators.
*AI tutor:* High value.
*OER source:* OpenStax Biology + Molecular Biology of the Cell (Alberts) for advanced sections.
*Authoring:* AI-assisted, **SME required**.

---

## Specialization Track A — Cybersecurity (3 courses)

**Why three, not a full school.** Cybersecurity hands-on practice is heavily covered by existing platforms (TryHackMe, HackTheBox, PortSwigger, PicoCTF). The platform should not try to out-applied them. These three courses fill specific gaps those platforms don't address.

**Sequencing note.** These three are added to the Wave 2 late phases. They presuppose the learner has some baseline cyber knowledge or is taking university coursework (e.g., a UTSA-style cybersecurity undergrad program).

**46. Threat Modeling and Risk Analysis** — *Intermediate to Advanced*
*For:* Cybersecurity students and early-career security professionals.
*Prereq:* Basic networking and security concepts; #20 Research helpful.
*Topics:* STRIDE, PASTA, FAIR, attack trees, asset inventory, threat actors, risk quantification, risk treatment, residual risk, communicating risk to non-technical stakeholders.
*Output:* A full threat model on a real system the learner chooses (with permission).
*AI tutor:* High value.
*Authoring:* AI-assisted, **SME required**.

**47. Security Incident Response — Decision Under Pressure** — *Intermediate to Advanced*
*For:* Security students and analysts preparing for SOC/IR roles.
*Prereq:* #46 Threat Modeling; basic incident-response concepts.
*Topics:* Detection, triage, scoping, containment, eradication, recovery, post-incident review, evidence preservation, communication during incidents, common attack patterns, decision-making under incomplete information, tabletop exercises.
*Output:* Complete incident response writeup with timeline, decisions, and a postmortem from a simulated scenario.
*AI tutor:* High value.
*Authoring:* AI-assisted, **SME required**.

**48. Writing for Security Professionals** — *Intermediate*
*For:* Security professionals at any career stage.
*Prereq:* #19 Writing Well at Work helpful.
*Topics:* Vulnerability writeups, bug bounty reports, executive briefings, threat advisories, postmortems, incident reports, technical-to-non-technical translation, defensible recommendations.
*Output:* A real piece of each genre (vulnerability writeup, executive brief, postmortem, advisory).
*AI tutor:* High value.
*Authoring:* AI-assisted, SME spot-review.

---

## Specialization Track B — Vertical specialty (1 course)

**Why one, not a track yet.** A vertical-specialty school is opened only when the SME-anchored pattern is proven. Healthcare PM is the first. If it ships well and finds an audience, construction PM, biotech PM, defense PM, etc. each become candidate additions — but each requires its own SME slot-defense.

**49. Healthcare Project Management** — *Intermediate to Advanced*
*For:* Project managers working in or moving into healthcare — health systems, medical device companies, biotech, pharma, telehealth, health IT.
*Prereq:* #27 Project Execution (foundational PM), recommended.
*Topics:* PM in regulated environments (HIPAA, FDA, clinical governance), stakeholder management with clinicians and administrators, EHR rollouts, clinical workflow integration, telehealth implementations, M&A integration in health systems, patient-safety considerations as a quality dimension, real case studies from SME's lived experience.
*Output:* A complete project plan + risk register + stakeholder map for a healthcare project (real or instructor-provided scenario).
*AI tutor:* Standard.
*Authoring:* AI-assisted for structure and prose, **SME co-authored** for substance, case studies, and validation. SME named on the course's "About this course" page per platform pattern. Contract per `docs/FOUNDER_OWNERSHIP_AND_CONTRIBUTOR_TERMS.md`.

---

## Suggested authoring sequence (which course gets built when)

49 courses across 8 phases. Each phase applies lessons from prior phases. Math/science phases are paced with Wave 4 (math lab); Wave 4 must complete the math-lab pilot before School 5 foundational courses can be authored at quality.

| Phase | Wave | Courses | Count | Calendar window |
|---|---|---|---|---|
| Pilot | W2 | #2 AI with Claude | 1 | 4–6 weeks |
| Pass 1 — Broad foundations | W2 | #1, #18, #17 | 3 | 6–8 weeks |
| Pass 2 — Business + writing breadth | W2 | #6, #11, #9, #20, #19, #15 | 6 | 10–12 weeks |
| Pass 3 — Catalog fill-out | W2 | #3, #5, #10, #12, #13, #14, #16, #25, #27, #29 | 10 | 14–18 weeks |
| Pass 4 — Advanced soft skills + applied | W2 | #4, #7, #21, #22, #23, #24, #26, #28, #30, #50 | 10 | 14–18 weeks |
| Pass 5 — Math/science foundational | W2 (paced w/ W4) | #31, #32, #33, #34, #37, #40, #42, #44 | 8 | 14–18 weeks |
| Pass 6 — Math/science advanced | W2 (after W4 math lab live) | #35, #36, #38, #39, #41, #43, #45, #8 | 8 | 14–18 weeks |
| Pass 7 — Specialty | W2 | #46, #47, #48, #49 | 4 | 8–10 weeks |
| **Total** | | | **50** | **~96–116 weeks** |

**Calendar reality.** At part-time review by a single reviewer, 50 courses takes roughly 24–30 months. With one contract editor and 5–7 contract SMEs (math/proofs, organic chemistry, cell/molecular biology, modern physics, cybersecurity, healthcare PM, system design), 12–18 months. The math/science wave is paced with Wave 4 (math lab) — Pass 5 can begin once the math lab's pilot course (#22) has shipped.

**Cost reality.** LLM authoring costs: ~$25–35 per course × 50 = ~$1,250–1,750 total. SME fees: 11 SME-required courses × $3–8k = $33–88k. Editor fees if contracted: depends on rate. Total cash for the full catalog: ~$35k–100k range. Bottleneck is time and editorial judgment, not cash.

**#50 placement note.** Designing Production Software Systems is placed in Pass 4 rather than Pass 7 because: it does not depend on the math lab; it appeals to working software engineers, an early-revenue audience; and shipping it before the math/science track gives Pass 5/6 calendar pressure relief.

---

## What is deliberately NOT in this catalog (editorial choices)

- **No "Intro to Programming" or language-specific coding courses.** Audience mismatch with the wedge; oversaturated market.
- **No cloud/DevOps course in the initial 49.** Deferred to Wave 5 (cloud lab) as course #50.
- **No design/UX course.** Worth adding in v2 if a strong angle emerges.
- **No history, humanities, or social-science course.** Mismatches the professional-development + STEM mastery positioning.
- **No language-learning course.** Different product entirely.
- **No K-12 replacement curriculum.** Master plan non-goal #3 — we serve high schoolers with on-demand subject mastery, not full grade-level coverage.
- **No medical/legal/clinical training that confers professional credit.** Liability and credentialing complexity. (Healthcare PM is *project management* in healthcare, not clinical training — important distinction.)
- **No certification-prep courses (PMP, AWS cert, Security+, etc.).** Substitutes for first-principles learning. Reconsider in v2.
- **No earth science, astronomy, geology, anatomy/physiology in initial 49.** Defer to v2.
- **No generic project-management courses beyond #27.** PM market is oversaturated for generic content; we only add specialty PM (#49) where SME differentiation justifies the slot.
- **No generic cybersecurity entry-level course.** TryHackMe and similar own that market.

---

## Operational requirements before high-schooler-targeted courses go live

Math/science courses welcoming high-school learners (per master plan §2 non-goal #3 amendment) require these in place before launch:

1. **Parental consent flow** — for learners under 18 (or under 13 if expanding to younger; not in scope for v1).
2. **Billing through guardians for minors** — Stripe subscription with guardian's payment method.
3. **Age-appropriate AI tutor moderation** — separate moderation policy for minor accounts; conservative defaults on the tutor's responses.
4. **Certificates that work for college applications** — design output that high-school learners can include in admissions packets.
5. **Terms of service updated** — to reflect minor users.

None of these block authoring; all of these block public launch of the math/science track to under-18 learners.

---

## SME requirements (which courses cannot ship without expert review)

The catalog has a clear divide between courses AI can author with light review and courses where SME validation is non-negotiable.

| Course | SME requirement | Why |
|---|---|---|
| #35 Calculus I | Required | Proof rigor + worked example accuracy |
| #36 Calculus II | Required | Same |
| #38 Linear Algebra | Required | Proof rigor |
| #39 Discrete Math | Required | Proofs are subtly easy to get wrong |
| #41 Physics — E&M + Modern | Required | Conceptual accuracy on relativity/quantum |
| #42 Chemistry Foundations | Required | Reaction mechanism accuracy |
| #43 Organic Chemistry | **Absolutely required** | Cannot ship without orgo expert |
| #45 Cell and Molecular Biology | Required | Pathway and mechanism accuracy |
| #46–48 Cybersecurity | Required | Operational accuracy matters in security advice |
| #49 Healthcare PM | Required | Co-authored with SME |
| #50 Designing Production Software Systems | Required | No single right answer; rubric calibration needs senior-engineer experience |

That's 11 of 50 courses needing dedicated SME relationships. Recommendation: identify SME candidates during Pass 3 (so they're under contract before Pass 5 begins). The #50 SME (system design) and the #43 SME (organic chemistry) are the two highest-value relationships to secure early; both are signature courses for their respective audiences (working engineers and pre-med students).

---

## Status of decisions

The following decisions are **locked** as of 2026-05-18. Changes require an amendment to this document under master plan §8.3.

1. **Catalog size: 50 courses.** Six schools plus two specialization tracks. No additions or removals without amendment.
2. **Wave 2 pilot course: #2 AI with Claude for Everyday Work.** Greenfield, in-wheelhouse, no SME required, mid-complexity. Stress-tests the pipeline without depending on subject expertise we don't have in-house.
3. **Course titles: placeholders, subject to operational revision.** Renaming a course is *not* a catalog amendment (governance scope: structure and slot, not naming). Renames captured in the authoring CLI when each course is authored.
4. **High-schooler launch policy: required operational gates (5 items) listed in the section above.** Approved as prerequisite for math/science track public launch. Authoring proceeds without waiting; public release of math/science courses to under-18 learners blocks on these gates.
5. **SME pattern: contractor-based per `docs/FOUNDER_OWNERSHIP_AND_CONTRIBUTOR_TERMS.md`.** SMEs named on the course "About this course" page; no ownership rights conferred; standard contract per existing IP doc.

## Operational TBDs (not catalog decisions — Wave 2 execution items)

These remain open but do not block lock and do not require amendments:

1. **SME identification.** Recruit 11 SMEs across the SME-required courses. Two highest-priority: organic chemistry (#43) and system design (#50). Healthcare PM SME (#49) already identified by owner.
2. **Daughter as first user.** Onboarded against Pass 1–3 broad-foundation courses (#1, #2, #17, #18, #19, #20, #24 most relevant to her cybersecurity track at UTSA). She becomes the first user of the cybersecurity courses (#46–48) when they ship in Pass 7.
3. **Pre-defined learning pathways.** Pre-med, pre-engineering, data-science, working-engineer-senior-track. These are *bundling* decisions made closer to public launch, not catalog additions.
4. **Per-school SME relationships vs per-course.** Some SMEs (e.g., math/proofs) could cover multiple courses; this reduces SME count but increases per-SME scope. To be negotiated per relationship.

---

End of catalog plan. **LOCKED 2026-05-18.**
