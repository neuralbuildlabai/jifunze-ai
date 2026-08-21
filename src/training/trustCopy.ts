/**
 * Centralized learner-facing trust boundaries — aligns with `docs/jifunze-ontology-and-contracts.md`.
 * Prefer importing strings from here rather than scattering claims in JSX.
 */

export const TRUST_COPY = {
  /**
   * Affiliation + scope + no-guarantee fine print (signup-adjacent, public, billing, readiness).
   * Not legal advice.
   */
  affiliationNoGuaranteeFinePrint:
    'Jifunze is an independent learning and content-support platform. Unless explicitly stated, it is not affiliated with, endorsed by, or tied to any external institution, employer, certification body, or other entity. Jifunze provides assistive learning, revision, and content-support tools only. Use of the platform does not guarantee mastery, certification, exam results, job outcomes, publication readiness, or professional qualification. Users remain responsible for reviewing and validating outputs before relying on them for academic, professional, public, or commercial use.',

  /** Shorter variant for dense forms and secondary surfaces. */
  affiliationNoGuaranteeCompact:
    'Jifunze is an independent learning and content-support platform—not affiliated with outside institutions, employers, or certification bodies unless explicitly stated. Assistive tools only; use does not guarantee mastery, certification, exam or job outcomes, or publication readiness. Review and validate outputs before academic, professional, public, or commercial use.',

  /** Composite readiness band (`computeReadinessSnapshot`) — not orthogonal dimension scores */
  readinessCompositeShort:
    'Indicators blend lesson/quiz progress and checkpoints (heuristic). They support planning — they are not a credential, job guarantee, or psychometric score.',

  /** Snapshot-derived trajectory vs composite band */
  readinessTrajectoryVsBand:
    'Trend lines compare checkpoint memory over time; they summarize history — they do not predict external exam outcomes.',

  examPrepPracticeShort:
    'Supports exam preparation only — does not certify, license, or endorse any external exam body.',

  assessmentScoresContext:
    'Results reflect this plan’s items and explanations. For high-stakes certifications, combine with official materials and workplace practice.',

  publishableEducationalDraft:
    'Educational briefs derive from the workspace knowledge graph — review for accuracy and policy before publishing publicly.',

  weakAreasHeuristic:
    'Weak-area signals are heuristics from attempts and placement — use for targeted practice, not performance appraisal by themselves.',

  librarySignalHintsHeuristic:
    'Library growth hints aggregate existing weak labels and revisit patterns — they suggest where to deepen content, not guaranteed personalization.',

  /** Visibility: graph breadth vs blueprint / external exam alignment */
  assessmentCoverageVisibility:
    'Coverage here reflects this plan’s knowledge graph and your attempts — not a full external exam blueprint. Pair checkpoints with official syllabi when preparing for credentials.',

  /** Exam-prep seriousness — product boundaries */
  examPrepSeriousnessBoundary:
    'Exam-style drills rehearse retrieval and timing habits where enabled — they supplement, not replace, licensure bodies’ materials and procedures.',

  practiceRigorExpectation:
    'Practice uses structured prompts and heuristic feedback (keyword/outcome checks). Deep hands-on proof still belongs in real workflows, labs, or proctored environments where applicable.',

  publishingExternalReview:
    'This asset type is suitable for external sharing only after editorial review — verify facts, tone, and compliance with your policies.',

  opsErrorKindFooter:
    'If this persists, note the reference code below when contacting support.',

  /** Paid product boundary — use near billing/subscription surfaces */
  subscriptionProductBoundary:
    'Jifunze provides structured learning, practice, and content-generation tools. It does not issue credentials, guarantee exam or employment outcomes, or replace official licensure materials, institutional instruction, or workplace supervision.',

  /** Self-serve age / guardian expectations (policy hook; not legal advice) */
  selfServeAgeGuidance:
    'Self-serve accounts are intended for learners 16+ (or the age of digital consent in your region). Guardians manage minors’ use of generated or published content.',

  /** Institutional framing — avoid implying accreditation */
  notAnAccreditedInstitution:
    'Jifunze is not an accredited school or university; it is software that supports practice and study planning.',

  /** Social / public generator — not publication guarantee */
  publicDraftAssistive:
    'Outputs are assistive drafts—verify accuracy, rights, and brand safety before publishing.',

  /** Completion / work-use lines — heuristic, not validated job performance */
  workUseHeuristicFraming:
    'Work-use guidance summarizes in-product practice signals; it is not a performance review, manager endorsement, or hiring credential.',

  /** Prefix lines used by completion intelligence — keep in sync with strip regex in CompletionIntelligencePanel */
  examStylePrepPrefix: 'Exam-style preparation support:',
  practiceSignalWorkPrefix: 'Practice signal (heuristic):',

  /** Training list / create surfaces — visible before paid checkout */
  trainingSurfaceHeuristic:
    'Training plans, checkpoints, and readiness indicators are practice and study aids built from your inputs—they do not certify competence, predict exam scores, or guarantee employment outcomes.',

  /** Plan creation header — avoids implying guaranteed curriculum quality */
  trainingPlanGenerationIntro:
    'Tell Jifunze what you want to learn—we’ll suggest a practical starting path you can refine. This is guidance, not a formal curriculum guarantee.',

  /** Placement block on create-plan form */
  placementSignalsHeuristic:
    'Your level and optional quick check help us recommend a starting point—they’re practical pointers, not a formal assessment.',

  /** Stripe/checkout adjacent — reinforces affiliation line without replacing subscriptionProductBoundary */
  affiliationCheckoutReminder:
    'Paid plans access the same assistive tools under these boundaries—still no affiliation with external institutions unless explicitly stated.',

  /** One line near primary marketing CTAs — layered disclosure before deeper callouts */
  ctaTrustLineShort:
    'Independent learning and content-support—assistive only; not affiliated with outside institutions, employers, or exam bodies unless explicitly stated. No guaranteed mastery, certification, exam or job outcomes, or publication readiness.',

  /**
   * Single-line UI strip used with a “Full disclaimer” link — in-app and non-hero surfaces.
   */
  trustStripPrimary:
    'Assistive learning and content-support only—independent platform; not affiliated with outside entities unless stated. No guaranteed mastery, exams, jobs, certification, or publication readiness—review outputs before relying on them.',

  /**
   * Public marketing hero (landing) — one short line; full boundary detail + acknowledgment live in disclaimer + post–sign-in modal.
   */
  publicHeroTrustLine:
    'Independent platform. Assistive learning and content-support tools only. No guaranteed outcomes.',

  /** Public generator try-it-now — one short line before the disclaimer link (no long strip / no full paragraph). */
  publicGeneratorTrustLine: 'Review for accuracy before posting.',

  /** Sign-in / save-work card on the public landing page */
  authSignInTrustLine: 'Assistive tools only. Review outputs before relying on them.',

  /** @deprecated Use {@link TRUST_COPY.authSignInTrustLine} */
  authLandingCompactCue:
    'Assistive tools only. Review outputs before relying on them.',

  /** @deprecated Use {@link TRUST_COPY.publicGeneratorTrustLine} */
  landingGeneratorAssistiveCue: 'Review for accuracy before posting.',

  /** Plans / checkout surface — paid access is software entitlement, not outcome guarantees */
  subscriptionPaidAccessBoundary:
    'Paid plans unlock additional platform features and limits according to the plan you select. Payment does not guarantee mastery, certification, exam results, employment, publication readiness, or professional qualification.',

  /** Shown beside account creation (not a substitute for signed legal terms once published) */
  signupAcknowledgmentLine:
    'By creating an account, you acknowledge Jifunze provides assistive learning and content-support tools only, with no guarantee of mastery, exams, certification, employment, or publication readiness—and that you will review outputs before relying on them.',

  /** Workspace home / first session after email confirmation */
  postSignupWorkspaceReminder:
    'Jifunze stays an independent assistive workspace: not affiliated with outside institutions unless explicitly stated. Tools support study and drafts—review before professional, academic, public, or commercial use.',

  /** Instructional lesson pages — scaffold, not credentialing */
  lessonInstructionalAssistive:
    'Lesson text and practice prompts are instructional assists from this plan’s graph—pair with your own judgment, course requirements, and official materials where they apply.',

  /** Team roster — roles and membership, not surveillance product */
  teamWorkspaceRosterBoundary:
    'Member lists show workspace roles for collaboration. This is not workplace monitoring, disciplinary evidence, or a substitute for HR policy by itself.',

  /** Facilitator cohort view — reinforces aggregate-safe posture */
  facilitatorCoachingNotAdjudication:
    'Use cohort coaching labels to plan reinforcement—not as sole hiring, promotion, or academic decisions without human context and institutional process.',

  /** Team assignments table — progress is in-product, not an external compliance guarantee */
  teamAssignmentsBoundary:
    'Progress and status reflect this workspace’s training activity in Jifunze—they are not a third-party certification, regulatory attestation, or performance guarantee outside the product.',

  /** Learning insights readout — memory is heuristic, not a score or credential */
  learningInsightsHeuristicBoundary:
    'This readout summarizes in-workspace activity and heuristics to help you improve—it is not psychometric testing, surveillance scoring, or proof of competence for hiring or admissions.',

  /** Placeholder pages: Terms */
  legalTermsPlaceholderIntro:
    'Formal Terms of Service are in preparation. Until published, rely on the product-boundary language surfaced in the app: Jifunze is an independent platform offering assistive learning and content-support tools; it does not guarantee external outcomes or affiliations unless explicitly stated for a specific integration.',

  /** Placeholder pages: Privacy */
  legalPrivacyPlaceholderIntro:
    'A full Privacy Policy is in preparation. The product uses your workspace and learning data to power in-app features (including heuristics and aggregates) under configured access controls—review your tenant’s practices and policies for any external sharing.',

  /** Placeholder pages: Refunds */
  legalRefundsPlaceholderIntro:
    'Refund and billing terms will be published with pricing. Paid access remains software and assistive tooling—still no guaranteed external outcomes. Contact support if you need a billing question escalated.',

  /** Support contact echoed on legal placeholders (operational, not legal advice) */
  legalPlaceholderSupportEmail: 'neuralbuildlab.ai@gmail.com',
} as const

/**
 * Post–sign-in acknowledgment modal body. If this copy changes meaningfully, bump `DISCLAIMER_ACK_VERSION` in
 * `disclaimerAcknowledgment.ts` so users can re-acknowledge.
 */
export const DISCLAIMER_ACKNOWLEDGMENT_MODAL_BODY =
  'Jifunze is an independent learning and content-support platform. It provides assistive learning, revision, and content-support tools only and does not guarantee mastery, certification, exam results, job outcomes, publication readiness, or professional qualification. Please review and validate outputs before relying on them.' as const
