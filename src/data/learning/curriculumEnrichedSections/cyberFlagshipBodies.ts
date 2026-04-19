/**
 * Full-curriculum hand-authored reader depth: Cybersecurity Foundations → Practical Defense (20 lessons).
 */
import type { PublicStarterLessonSection } from '../../publicStarterLibraries/aiFoundations'

export const ENRICHED_CYBER_FLAGSHIP_SECTIONS_BY_SLUG: Record<string, PublicStarterLessonSection[]> = {
  'cybersecurity-foundations-what-cybersecurity-is': [
    {
      heading: 'What “cybersecurity” means in real organizations',
      paragraphs: [
        'Cybersecurity is the practice of reducing digital risk: protecting confidentiality, integrity, and availability of information and systems—using people, process, and technology together. It is not “IT’s job” alone, and it is not a product you buy to make problems disappear.',
        'A useful mental model: assets (data, access, services), threats (who/what can harm you), vulnerabilities (weaknesses that can be abused), and controls (the constraints and detections you actually run).',
      ],
    },
    {
      heading: 'Why this matters this week',
      paragraphs: [
        'Most harm is not movie-hacker exotic; it is account compromise, social engineering, misconfiguration, and unreviewed access. You can improve outcomes with calmer defaults: least privilege, MFA for high-value accounts, and clear reporting paths.',
        '“Security culture” without ownership becomes theater. Name an owner for the top 3 riskful actions in your team (money movement, admin access, customer data export).',
      ],
    },
    {
      heading: 'Misconceptions and weak thinking',
      paragraphs: [
        '“We are not a target.” Opportunistic attacks scale; you can be a path to a partner, a test bed for credentials, or a soft entry through a shared vendor account.',
        '“Encryption means we are safe.” Encryption helps, but it does not stop phishing, token theft, mis-scoped permissions, or humans pasting secrets into the wrong place.',
      ],
    },
    {
      heading: 'Assess your judgment (no tools required)',
      paragraphs: [
        'Write a 6-line “pre-read” of your own work: what data you handle, what would hurt if exposed, and the one control you actually verify rather than assume.',
        'Compare two security “solutions” you have seen marketed. Which one changes behavior and evidence, and which one only changes dashboard color?',
      ],
    },
  ],
  'cybersecurity-foundations-threats-risks-and-attack-surfaces': [
    {
      heading: 'Threats, vulnerabilities, and risk (use the words precisely)',
      paragraphs: [
        'A threat is a plausible harm source (criminals, accidents, insider mistakes, supply chain). A vulnerability is a weakness (bug, config, missing control). Risk is likelihood and impact in *your* context—priority is not the scariest headline, it is the most consequential loss.',
        'Attack surface is the set of things that can be reached and abused: accounts, APIs, OAuth grants, admin consoles, support channels, and even “low value” systems that can be used as a hop.',
      ],
    },
    {
      heading: 'Worked example: map a small team’s surface',
      paragraphs: [
        'List: identity provider, email, code host, CI, customer support tool, payment provider, file share. For each, name the “crown jewel” action (impersonation, data exfil, code change) and one review you would run quarterly.',
        'Where are break-glass and shared mailboxes? These are common “stealth admin” paths when personal accounts are offboarded poorly.',
      ],
    },
    {
      heading: 'Common mistakes in risk talk',
      paragraphs: [
        'Treating “no breach yet” as evidence of control. Absence of incident is not presence of safety; it can be absence of detection.',
        'Treating CVSS or news volume as automatic priority. A “low” severity issue on a public admin interface can be higher risk than a “high” issue on an isolated system.',
      ],
    },
    {
      heading: 'Scenario: where would you invest first?',
      paragraphs: [
        'You can only fund one improvement this month: org-wide MFA for admins, logging/alerting for cloud admin changes, or phishing simulations. Choose and defend with stakeholder language (money/time/reputation).',
      ],
    },
  ],
  'cybersecurity-foundations-identity-access-and-trust': [
    {
      heading: 'Identity is the perimeter now',
      paragraphs: [
        'Modern access is federated across SaaS: SSO, MFA, OAuth grants, API tokens, service accounts. Most lateral movement looks like legitimate access—because it is authenticated.',
        'Trust must be constrained: roles, scopes, conditional access where available, and periodic review of integrations that survive password rotations.',
      ],
    },
    {
      heading: 'Worked pattern: OAuth and “connected apps”',
      paragraphs: [
        'Third-party integrations often keep working after credentials change until explicitly revoked—treat app inventory like account inventory.',
        'Pick one SaaS you use weekly: where would you revoke access if someone left abruptly? If you cannot answer quickly, that is operational debt.',
      ],
    },
    {
      heading: 'Confusions that cause breaches',
      paragraphs: [
        'Confusing authentication (“who”) with authorization (“what they may do”). Strong login with overly broad roles still yields catastrophic misuse.',
        'Trusting device posture labels without testing real enforcement—especially on contractor or BYOD realities.',
      ],
    },
    {
      heading: 'Improvement checkpoint',
      paragraphs: [
        'Draft a non-shaming policy line your team could adopt: “No shared accounts for production actions—shared mailboxes only with named delegates.” Why does it reduce ambiguity?',
      ],
    },
  ],
  'cybersecurity-foundations-why-human-behavior-matters-in-security': [
    {
      heading: 'Security is a human-speed problem',
      paragraphs: [
        'Attackers exploit urgency, authority cues, shame, and multitasking—not only software flaws. Controls must fit real workflows: friction where stakes are high, clarity where confusion causes unsafe shortcuts.',
        'Training works when it builds habits and reporting norms, not when it blames individuals for systemic pressures (impossible quotas, unclear escalation).',
      ],
    },
    {
      heading: 'Worked scenario: the “busy Friday” phishing pattern',
      paragraphs: [
        'Messages arrive near deadlines with plausible context and mild threats (“invoice on hold”). Your defense is verifiable channels: confirm via known numbers, internal ticketing, or known payment workflows.',
        'Write the exact phrase you want teammates to use when suspicious: “I will verify through our finance portal/ticket system before changing payment details.”',
      ],
    },
    {
      heading: 'Thin narratives',
      paragraphs: [
        '“People are the weakest link.” Often the link is unclear policy + impossible tooling + fear of slowing the team.',
        '“Security awareness annually fixes it.” Habits form through short cycles: near-miss reviews, lightweight reminders, leadership modeling reporting.',
      ],
    },
    {
      heading: 'Assessment: design a humane control',
      paragraphs: [
        'Pick one risky action (wire transfer request). Describe a control that reduces fraud without telling people to “just be careful.” Include escalation and recovery.',
      ],
    },
  ],
  'practical-security-habits-passwords-mfa-and-access-hygiene': [
    {
      heading: 'Credential hygiene that survives reality',
      paragraphs: [
        'Prefer password managers and unique passwords; prioritize MFA where it protects identity and money movement—not equally everywhere if it creates unsafe workarounds.',
        'Separate “break glass” procedures from everyday admin—document who approves, how sessions are revoked, and how audits happen afterward.',
      ],
    },
    {
      heading: 'Worked checklist: admin accounts',
      paragraphs: [
        'Admins should use separate accounts from daily mail/calendar where feasible; separate reduces accidental clicks and broad token exposure.',
        'Quarterly: remove stale admins, remove unused integrations, verify MFA on recovery paths (SMS swap risk is real—prefer app/WebAuthn where policy allows).',
      ],
    },
    {
      heading: 'Common traps',
      paragraphs: [
        'Recycling passwords across work/personal—one breach becomes many.',
        '“MFA fatigue” attacks: excessive prompts train people to approve without reading—tune policies and reduce noisy prompts.',
      ],
    },
    {
      heading: 'Practice prompt',
      paragraphs: [
        'List three systems where losing access would halt your team—then verify backups of access recovery are not solely one person’s personal phone.',
      ],
    },
  ],
  'practical-security-habits-phishing-and-social-engineering': [
    {
      heading: 'Social engineering beats exploits because it targets trust',
      paragraphs: [
        'Phishing ranges from spray-and-pray to deeply researched impersonation. Defenses combine technical controls (safe link handling, attachment policies) with behavioral norms: verify out-of-band for sensitive actions.',
        'Report near-misses: they are free learning signals; shame cultures suppress reporting and increase dwell time.',
      ],
    },
    {
      heading: 'Worked triage questions',
      paragraphs: [
        'Ask: sender authenticity (not display name), unexpected urgency, unusual payment changes, mismatched URLs, unexpected attachments—then verify through known channels.',
        'Write a safe response template that refuses rushed action without sounding hostile—professional boundaries reduce attacker success.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“I would never fall for that.” Sophistication increases with attacker ROI; tired humans make mistakes.',
        '“Spam filters solved phishing.” Filters help; targeted attacks slip through and voice/SMS channels exist.',
      ],
    },
    {
      heading: 'Scenario drill',
      paragraphs: [
        'You receive a plausible invoice update from a vendor domain that almost matches. Step-by-step: what do you verify before paying?',
      ],
    },
  ],
  'practical-security-habits-safe-data-handling': [
    {
      heading: 'Data handling is classification + lifecycle',
      paragraphs: [
        'Know what data you touch (customer PII, financials, health-adjacent). Handling rules change by classification: storage location, sharing restrictions, retention, and deletion.',
        '“Least necessary” beats “most convenient”: fewer copies reduces breach blast radius and compliance headaches.',
      ],
    },
    {
      heading: 'Worked habits',
      paragraphs: [
        'Avoid pasting sensitive data into generative AI tools unless policy explicitly allows—treat prompts as semi-public operational risk.',
        'Use approved sharing links with expiry instead of forwarding attachments forever—revocation matters.',
      ],
    },
    {
      heading: 'Weak excuses',
      paragraphs: [
        '“It’s internal only.” Insider risk and compromised accounts exist.',
        '“We deleted the file.” Copies may remain in backups, caches, collaboration tools—know your retention story.',
      ],
    },
    {
      heading: 'Judgment task',
      paragraphs: [
        'Pick a dataset you used this month: where could it leak unintentionally (screenshots, tickets, analytics exports)? Mitigate one path.',
      ],
    },
  ],
  'practical-security-habits-secure-everyday-workflows': [
    {
      heading: 'Workflow security is ergonomics',
      paragraphs: [
        'Design workflows so safe choices are easy: templates for verification, approved channels, default deny for risky actions, and quiet focus time for sensitive tasks.',
        'Avoid heroics: if security relies on perpetual vigilance, it will fail—build defaults and peer checks.',
      ],
    },
    {
      heading: 'Worked example: finance and approvals',
      paragraphs: [
        'Separate duties: requestor vs approver vs payer; dual control for new payees; documented escalation when someone tries to bypass.',
        'Ask what your team does under deadline pressure—attackers simulate deadlines.',
      ],
    },
    {
      heading: 'Anti-patterns',
      paragraphs: [
        'Shadow IT that bypasses backups and access reviews because “the official tool is slow.” If true, fix procurement or workflow—not ungoverned sprawl.',
      ],
    },
    {
      heading: 'Mini audit',
      paragraphs: [
        'Map one recurring workflow (onboarding, vendor setup). Where is the sneaky single-human bypass point?',
      ],
    },
  ],
  'defensive-thinking-endpoint-network-and-cloud-security-basics': [
    {
      heading: 'Defense in depth without mystery acronyms',
      paragraphs: [
        'Endpoints need patching, inventory, and sane defaults; networks segment trust boundaries; cloud resources need IAM discipline and visibility. Each layer fails sometimes—overlap creates resilience.',
        'Assume breach: detection and speedy containment matter as much as prevention.',
      ],
    },
    {
      heading: 'Worked comparison',
      paragraphs: [
        'Corporate device with MDM vs unmanaged device: different evidence and different allowed access—policy should match reality, not wishful thinking.',
        'Cloud “private” subnets still misroute if IAM allows wide roles—network boundaries are not authorization.',
      ],
    },
    {
      heading: 'Thin thinking',
      paragraphs: [
        '“Antivirus equals endpoint security.” Modern threats include identity theft and SaaS abuse—endpoint tools are one sensor, not the whole story.',
      ],
    },
    {
      heading: 'Assessment',
      paragraphs: [
        'Pick one cloud resource type you use (storage bucket, database). Name two misconfigurations that sound boring but cause headlines.',
      ],
    },
  ],
  'defensive-thinking-monitoring-and-detection-awareness': [
    {
      heading: 'Detection is storytelling with evidence',
      paragraphs: [
        'Logs are not security by themselves—they become security when someone defines what “normal” is, what triggers review, and who acts. Start with high-signal events: admin changes, new OAuth apps, impossible travel logins.',
        'Tune alerts to reduce fatigue; noisy alerts train humans to ignore.',
      ],
    },
    {
      heading: 'Worked exercise',
      paragraphs: [
        'Choose one alert you have seen (or can imagine): write the first three questions an analyst should answer before declaring incident vs noise.',
        'Define “reportable suspicion” for your team—what minimum evidence should accompany a report?',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“We log everything.” Logging without retention, access control, and search discipline becomes expensive wallpaper.',
      ],
    },
    {
      heading: 'Scenario',
      paragraphs: [
        'You notice odd login activity on a shared admin account—what do you preserve before resetting sessions, and who do you notify?',
      ],
    },
  ],
  'defensive-thinking-common-security-failures': [
    {
      heading: 'Patterns repeat because incentives repeat',
      paragraphs: [
        'Common failures: excessive standing access, shared credentials, unowned integrations, missing offboarding, weak vendor oversight, and “temporary” firewall rules that become permanent.',
        'Fixes are often boring: ownership, inventory, periodic review, and breaking large projects into measurable controls.',
      ],
    },
    {
      heading: 'Worked postmortem sketch',
      paragraphs: [
        'Take a public breach class (credential stuffing, supply chain): identify the failure mode as human/process/tech and assign the cheapest preventive habit.',
      ],
    },
    {
      heading: 'Avoid blame-only reviews',
      paragraphs: [
        'Ask what made the unsafe action rational at the time—then remove that pressure without removing accountability.',
      ],
    },
    {
      heading: 'Checkpoint',
      paragraphs: [
        'Which recurring failure mode is closest to your team today—access creep, phishing, patching lag, or vendor trust? Pick one mitigation for this month.',
      ],
    },
  ],
  'defensive-thinking-incident-thinking-for-non-specialists': [
    {
      heading: 'You can think like incident response without being IR',
      paragraphs: [
        'Preserve evidence, reduce further harm, notify per policy, and avoid destructive panic actions (mass deleting logs). Calm containment beats heroic improvisation.',
        'Communication should separate facts, hypotheses, and actions—especially under executive pressure.',
      ],
    },
    {
      heading: 'Worked containment order',
      paragraphs: [
        'Suspected account compromise: revoke sessions, rotate critical credentials per playbook, isolate affected assets if malware suspected—then escalate with timestamps.',
        'Write your org’s escalation phone/chat path from memory—if you cannot, fix that tomorrow.',
      ],
    },
    {
      heading: 'Dangerous impulses',
      paragraphs: [
        '“Let me investigate quietly.” Coordinate—silent investigations can erase evidence or duplicate destructive steps.',
      ],
    },
    {
      heading: 'Assessment',
      paragraphs: [
        'Draft a short internal notice template for suspected phishing impact—truthful, non-alarmist, includes next actions.',
      ],
    },
  ],
  'applied-modern-security-security-in-saas-and-cloud': [
    {
      heading: 'SaaS security is identity + integrations + configuration drift',
      paragraphs: [
        'Treat SaaS admin roles like production infrastructure: MFA, scoped roles, separation of duties, change notifications, and periodic access reviews.',
        'OAuth apps and API tokens often outlive employee tenure—inventory them.',
      ],
    },
    {
      heading: 'Worked checklist',
      paragraphs: [
        'Monthly: export/discover privileged users and integrations for top platforms; reconcile with HR changes.',
        'Ensure offboarding scripts include SaaS admin transfers—not only directory disable.',
      ],
    },
    {
      heading: 'Missteps',
      paragraphs: [
        'Assuming cloud defaults are secure—defaults optimize onboarding, not your threat model.',
      ],
    },
    {
      heading: 'Decision memo prompt',
      paragraphs: [
        'Compare managing 30 SaaS apps with SSO+federation vs scattered passwords—what breaks first in each model during an incident?',
      ],
    },
  ],
  'applied-modern-security-security-in-ai-assisted-workflows': [
    {
      heading: 'AI accelerates drafts—and mistakes',
      paragraphs: [
        'Treat assistants as untrusted processors of text: classify what may enter prompts (customer data, secrets, regulated content). Prefer retrieval tied to approved corpora where solutions exist.',
        'Review outputs that touch commitments, finances, medical/legal-ish domains, or safety-critical instructions.',
      ],
    },
    {
      heading: 'Worked guardrails',
      paragraphs: [
        'Define forbidden prompt classes for your team (paste of raw customer tables, unreleased financials). Pair with an approved workflow for redaction.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Private AI deployment solves everything.” Operational risk shifts to data pipelines, access control of training corpora, and monitoring—new classes of failure appear.',
      ],
    },
    {
      heading: 'Approve/revise/reject',
      paragraphs: [
        'Policy proposal: “Anyone can send customer snippets to any AI.” Revise into a proportional policy with tiers and approvals.',
      ],
    },
  ],
  'applied-modern-security-security-for-teams-and-creators': [
    {
      heading: 'Small teams still have crown jewels',
      paragraphs: [
        'Creators hold audience trust: account takeover becomes reputational harm and scam vectors. Teams share passwords “temporarily” that become permanent.',
        'Use role boundaries: who can publish, spend money, grant access, and reset recovery options?',
      ],
    },
    {
      heading: 'Worked scenario',
      paragraphs: [
        'You hire a contractor for content work: separate accounts or scoped roles, revoke at end of contract, avoid sharing primary recovery devices.',
      ],
    },
    {
      heading: 'Thin habits',
      paragraphs: [
        'Brand impersonation relies on audience trust—monitor mentions and verify official channels.',
      ],
    },
    {
      heading: 'Practice',
      paragraphs: [
        'Write a public-safe incident script if your channel is hijacked—what would you tell followers first?',
      ],
    },
  ],
  'applied-modern-security-building-security-judgment-in-real-work': [
    {
      heading: 'Judgment is evidenced decisions under uncertainty',
      paragraphs: [
        'Good security judgment looks boring: naming assumptions, documenting decisions, measuring outcomes of controls, and revisiting after incidents or major changes.',
        'Avoid magical thinking like “zero risk.” Choose explicit risk acceptance with owners when needed.',
      ],
    },
    {
      heading: 'Worked growth loop',
      paragraphs: [
        'After any scare: one detection gap, one prevention gap, one recovery gap—each owned and dated.',
      ],
    },
    {
      heading: 'Anti-pattern',
      paragraphs: [
        'Buying tools instead of fixing ownership—tools amplify unclear processes.',
      ],
    },
    {
      heading: 'Capstone-style reflection',
      paragraphs: [
        'Draft your personal security principles (5 bullets) you will apply across tools—portable judgment beats memorizing vendors.',
      ],
    },
  ],
  'practical-defense-continuation-vulnerability-thinking': [
    {
      heading: 'Vulnerability management is prioritization discipline',
      paragraphs: [
        'You cannot patch everything instantly—classify assets, understand exploitability, and tie fixes to operational windows. Mean time to remediate matters, but so does correctness (tested rollbacks).',
        'SBOM/supply chain awareness shifts focus from “our code” to “components we ship.”',
      ],
    },
    {
      heading: 'Worked triage rubric',
      paragraphs: [
        'For an incoming CVE: internet exposure? admin rights? sensitive data? active exploitation in the wild? automated exploit available? Decide patch cadence with evidence.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“CVSS high means drop everything.” Context matters—internal-only batch systems differ from edge-facing auth.',
      ],
    },
    {
      heading: 'Assessment',
      paragraphs: [
        'Write a one-page vulnerability intake template your team could use—fields, owners, verification, communication.',
      ],
    },
  ],
  'practical-defense-continuation-escalation-and-reporting': [
    {
      heading: 'Reporting must be safe and actionable',
      paragraphs: [
        'Make reporting channels obvious; protect reporters from retaliation where policy allows; route to people who can act; acknowledge receipt and close the loop.',
        'Escalate with structured facts: what happened, scope, timestamps, affected systems, actions taken, what you need next.',
      ],
    },
    {
      heading: 'Worked template',
      paragraphs: [
        'Incident note skeleton: Summary · Impact · Timeline · Evidence preserved · Immediate containment · Open questions.',
      ],
    },
    {
      heading: 'Failure modes',
      paragraphs: [
        'Reports go into a mailbox nobody monitors; reporters get interrogated instead of helped—both suppress future signals.',
      ],
    },
    {
      heading: 'Scenario',
      paragraphs: [
        'You suspect a coworker’s account is acting oddly—how do you escalate without accusing, while protecting others?',
      ],
    },
  ],
  'practical-defense-continuation-responsible-use-of-security-tools': [
    {
      heading: 'Tools can harm if misused',
      paragraphs: [
        'Scanning, phishing simulations, and “offensive” exercises can disrupt production or harm trust if poorly scoped. Get authorization, define blast radius, and communicate clearly.',
        'Respect privacy and law—your intent being educational does not remove obligations.',
      ],
    },
    {
      heading: 'Worked rules of engagement',
      paragraphs: [
        'Define allowed targets, times, contacts for disruption, stop conditions, and evidence handling—like professional pentests but scaled to your reality.',
      ],
    },
    {
      heading: 'Missteps',
      paragraphs: [
        'Testing in production without safeguards—classic recipe for outages and confusion.',
      ],
    },
    {
      heading: 'Judgment prompt',
      paragraphs: [
        'Approve/revise/reject: “Let’s run a surprise phishing test during layoff week.” Explain the ethical and operational failure mode.',
      ],
    },
  ],
  'practical-defense-continuation-next-steps-into-deeper-security-learning': [
    {
      heading: 'Deepening skills without chasing vanity certifications',
      paragraphs: [
        'Choose paths aligned to your role: defenders deepen logging/detection; builders deepen threat modeling and secure SDLC; leaders deepen governance and metrics.',
        'Practice beats branding: labs, controlled experiments, reading incident writeups, and contributing to runbooks.',
      ],
    },
    {
      heading: 'A practical 90-day plan',
      paragraphs: [
        'Month 1: inventory your accounts/surfaces; Month 2: improve two controls with measurable evidence; Month 3: run a tabletop or near-miss review and update playbooks.',
      ],
    },
    {
      heading: 'Avoid cargo-cult learning',
      paragraphs: [
        'Collecting certificates without scenarios does not create judgment—pair study with realistic drills.',
      ],
    },
    {
      heading: 'Next step commitment',
      paragraphs: [
        'Write one capability you will demonstrate (not “finish a course”): e.g., “I can triage a suspicious login across two IdP screens without guessing.”',
      ],
    },
  ],
}
