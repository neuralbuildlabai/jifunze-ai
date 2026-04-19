import type { ExtendedSpecLibrary } from './libraryCompiler'

/** Library 4 — Networking and Modern Infrastructure */
export const NETWORKING_INFRASTRUCTURE_LIBRARY_SPEC: ExtendedSpecLibrary = {
  libraryTitle: 'Networking and Modern Infrastructure',
  categories: [
    {
      id: 'network-foundations',
      title: 'Network Foundations',
      summary: 'Protocols, naming, and traffic basics—foundation for troubleshooting and architecture conversations.',
      lessons: [
        'What Networks Are and Why They Matter',
        'TCP/IP in Practical Terms',
        'DNS, Routing, and Switching',
        'Ports, Protocols, and Traffic Flow',
      ],
    },
    {
      id: 'everyday-network-reasoning',
      title: 'Everyday Network Reasoning',
      summary: 'Translate user-visible symptoms into network-shaped questions before jumping to conclusions.',
      lessons: [
        'Why Websites, APIs, and Apps Need Networks',
        'Understanding Latency and Connectivity',
        'Firewalls, NAT, and Access Paths',
        'Troubleshooting Common Connectivity Issues',
      ],
    },
    {
      id: 'modern-infrastructure-networking',
      title: 'Modern Infrastructure Networking',
      summary: 'How connectivity works for distributed systems behind modern platforms.',
      lessons: [
        'Load Balancers and Gateways',
        'Service Discovery and Internal Traffic',
        'Hybrid and Cloud Connectivity',
        'Networking for Distributed Systems',
      ],
    },
    {
      id: 'container-platform-networking',
      title: 'Container and Platform Networking',
      summary: 'Ingress, isolation, and platform-era paths—readable without turning into vendor marketing.',
      lessons: [
        'Container Networking Basics',
        'Kubernetes/OpenShift Networking',
        'Ingress and Egress',
        'Network Policy and Isolation Basics',
      ],
    },
    {
      id: 'network-troubleshooting-reliability',
      title: 'Practical Troubleshooting and Reliability',
      summary: 'Patterns for diagnosing failures and improving operational judgment.',
      lessons: [
        'Diagnosing DNS Problems',
        'Diagnosing TLS and Certificate Issues',
        'Observing Performance and Failure Patterns',
        'Network Thinking for Modern Operations',
      ],
    },
  ],
}

/** Library 5 — Cybersecurity Foundations to Practical Defense */
export const CYBERSECURITY_DEFENSE_LIBRARY_SPEC: ExtendedSpecLibrary = {
  libraryTitle: 'Cybersecurity Foundations to Practical Defense',
  categories: [
    {
      id: 'cybersecurity-foundations',
      title: 'Cybersecurity Foundations',
      summary: 'Threat framing, surfaces, identity, and behavior—prioritize judgment over Fear-Uncertainty-Doubt vibes.',
      lessons: [
        'What Cybersecurity Is',
        'Threats, Risks, and Attack Surfaces',
        'Identity, Access, and Trust',
        'Why Human Behavior Matters in Security',
      ],
    },
    {
      id: 'practical-security-habits',
      title: 'Practical Security Habits',
      summary: 'Daily habits that reduce preventable failures—assistive habits, not personal guarantees.',
      lessons: [
        'Passwords, MFA, and Access Hygiene',
        'Phishing and Social Engineering',
        'Safe Data Handling',
        'Secure Everyday Workflows',
      ],
    },
    {
      id: 'defensive-thinking',
      title: 'Defensive Thinking',
      summary: 'Understand common controls and failures without pretending to replace professional security roles.',
      lessons: [
        'Endpoint, Network, and Cloud Security Basics',
        'Monitoring and Detection Awareness',
        'Common Security Failures',
        'Incident Thinking for Non-Specialists',
      ],
    },
    {
      id: 'applied-modern-security',
      title: 'Applied Modern Security',
      summary: 'Security realities in SaaS/cloud and AI-assisted workflows—policy-first, verification-first.',
      lessons: [
        'Security in SaaS and Cloud',
        'Security in AI-Assisted Workflows',
        'Security for Teams and Creators',
        'Building Security Judgment in Real Work',
      ],
    },
    {
      id: 'practical-defense-continuation',
      title: 'Practical Defense Continuation',
      summary: 'Responsible escalation paths and sustained learning—still not certification or hiring promises.',
      lessons: [
        'Vulnerability Thinking',
        'Escalation and Reporting',
        'Responsible Use of Security Tools',
        'Next Steps Into Deeper Security Learning',
      ],
    },
  ],
}

/** Library 6 — Cloud, DevOps, and Platform Operations */
export const CLOUD_DEVOPS_PLATFORM_LIBRARY_SPEC: ExtendedSpecLibrary = {
  libraryTitle: 'Cloud, DevOps, and Platform Operations',
  categories: [
    {
      id: 'cloud-foundations',
      title: 'Cloud Foundations',
      summary: 'Shared responsibility, primitives, and mental models that prevent magical thinking.',
      lessons: [
        'IaaS, PaaS, and SaaS',
        'Compute, Storage, and Networking Basics',
        'Shared Responsibility',
        'Cloud Thinking for Modern Work',
      ],
    },
    {
      id: 'devops-workflow-foundations',
      title: 'DevOps Workflow Foundations',
      summary: 'Delivery reasoning that survives toolchain churn—culture + constraints, not keyword bingo.',
      lessons: [
        'CI/CD and Delivery Thinking',
        'Environments and Release Flow',
        'Automation and Configuration Basics',
        'Why DevOps Is More Than Tools',
      ],
    },
    {
      id: 'platform-operations',
      title: 'Platform Operations',
      summary: 'Operational basics for deploying and sustaining services—judgment-forward, hype-light.',
      lessons: [
        'Containers and Modern Deployment',
        'Reliability and Scaling',
        'Release Safety',
        'Operational Visibility Basics',
      ],
    },
    {
      id: 'applied-platform-work',
      title: 'Applied Platform Work',
      summary: 'Collaborative debugging habits and safer changes in real environments.',
      lessons: [
        'Managing Services in Real Environments',
        'Debugging Build and Deploy Failures',
        'Team Collaboration in Platform Work',
        'Practical Platform Habits That Reduce Risk',
      ],
    },
    {
      id: 'platform-growth-path',
      title: 'Growth Path',
      summary: 'How to deepen skills responsibly—practice scaffolds, not outcome guarantees.',
      lessons: [
        'From Cloud Beginner to Practical Operator',
        'Platform Thinking Across Products',
        'Connecting Cloud, DevOps, and Reliability',
        'Next Steps Into Deeper Platform Learning',
      ],
    },
  ],
}

/** Library 7 — Monitoring, Observability, and Incident Response */
export const MONITORING_OBSERVABILITY_LIBRARY_SPEC: ExtendedSpecLibrary = {
  libraryTitle: 'Monitoring, Observability, and Incident Response',
  categories: [
    {
      id: 'observability-foundations',
      title: 'Observability Foundations',
      summary: 'Signals vs noise—foundations for reading systems instead of staring at dashboards.',
      lessons: [
        'Logs, Metrics, and Traces',
        'Monitoring vs Observability',
        'Signals, Symptoms, and Systems',
        'Why Visibility Changes Everything',
      ],
    },
    {
      id: 'reading-and-using-signals',
      title: 'Reading and Using Signals',
      summary: 'Practice turning telemetry into hypotheses—without premature certainty.',
      lessons: [
        'Reading Dashboards',
        'Detecting Anomalies',
        'Correlating Different Signals',
        'Moving From Noise to Meaning',
      ],
    },
    {
      id: 'incident-response',
      title: 'Incident Response',
      summary: 'Stabilize, communicate, escalate—human coordination first.',
      lessons: [
        'Triage and Severity Thinking',
        'Communication During Incidents',
        'Escalation and Coordination',
        'Stabilization and Follow-Through',
      ],
    },
    {
      id: 'reliability-and-improvement',
      title: 'Reliability and Improvement',
      summary: 'Improve habits after incidents—root cause thinking without blame theater.',
      lessons: [
        'Alert Quality',
        'Root Cause Thinking',
        'Post-Incident Review Basics',
        'Building Better Operational Habits',
      ],
    },
    {
      id: 'observability-progression',
      title: 'Practical Progression',
      summary: 'Bridge beginner literacy toward deeper incident/SRE learning—still materials access, not certification.',
      lessons: [
        'Observability for Beginners',
        'Operational Judgment Over Time',
        'Connecting Monitoring to Reliability',
        'Next Steps Into Deeper Incident and SRE Learning',
      ],
    },
  ],
}

/** Library 8 — Content Creation and Knowledge Publishing */
export const CONTENT_CREATION_PUBLISHING_LIBRARY_SPEC: ExtendedSpecLibrary = {
  libraryTitle: 'Content Creation and Knowledge Publishing',
  categories: [
    {
      id: 'content-foundations',
      title: 'Content Foundations',
      summary: 'Purpose, audience fit, and trust—before formatting tricks.',
      lessons: [
        'What Useful Content Actually Does',
        'Educational vs Promotional vs Informational Content',
        'Matching Content to Audience Need',
        'Clarity, Structure, and Trust',
      ],
    },
    {
      id: 'drafting-and-idea-development',
      title: 'Drafting and Idea Development',
      summary: 'Move from scattered notes to coherent drafts with explicit revision loops.',
      lessons: [
        'From Idea to Draft',
        'Building Better Outlines',
        'Turning Notes Into Content',
        'Moving From Rough Draft to Useful Draft',
      ],
    },
    {
      id: 'formats-and-channels',
      title: 'Formats and Channels',
      summary: 'Choose formats based on message constraints—not trends alone.',
      lessons: [
        'Short-Form Content',
        'Long-Form Content',
        'Carousels, Guides, and Briefs',
        'Choosing the Right Format for the Message',
      ],
    },
    {
      id: 'review-and-quality',
      title: 'Review and Quality',
      summary: 'Editing for correctness and voice—especially when AI assists drafting.',
      lessons: [
        'Editing for Accuracy and Coherence',
        'Keeping a Human Voice',
        'Avoiding Generic or Shallow Content',
        'Review Before Publishing',
      ],
    },
    {
      id: 'content-systems',
      title: 'Content Systems',
      summary: 'Repeatable workflows that stay sustainable—without promising audience growth.',
      lessons: [
        'Reusable Content Workflows',
        'Turning Learning Into Publishable Drafts',
        'Reusing Knowledge Across Formats',
        'Building Sustainable Content Creation Habits',
      ],
    },
  ],
}
