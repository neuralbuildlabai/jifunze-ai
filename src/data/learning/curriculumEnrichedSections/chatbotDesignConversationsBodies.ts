/**
 * Authored depth for Designing Useful Chatbot Conversations (12 lessons) — signed-in spine.
 */
import type { PublicStarterLessonSection } from '../../publicStarterLibraries/aiFoundations'

export const ENRICHED_CHATBOT_DESIGN_CONVERSATIONS_BY_SLUG: Record<string, PublicStarterLessonSection[]> = {
  'designing-useful-chatbot-conversations-quick-help-fast-answers-and-micro-tasks': [
    {
      heading: 'Micro-task bots win on clarity and completion',
      paragraphs: [
        'Fast help works when intents are narrow, confirmations are explicit, and failure routes are one tap away. Speed without correctness erodes trust faster than slow care.',
        'Design for partial understanding: validate critical slots (order id, account) before irreversible actions.',
      ],
    },
    {
      heading: 'Worked pattern',
      paragraphs: [
        'Template: greet → confirm intent → collect minimum fields → execute safe read-only lookup → offer escalation with transcript context.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Shorter messages always help.” Shorter without structure increases errors.',
      ],
    },
    {
      heading: 'Evaluation',
      paragraphs: [
        'Measure task completion, repeat contacts, and escalation quality—not message count.',
      ],
    },
  ],

  'designing-useful-chatbot-conversations-designing-for-low-friction': [
    {
      heading: 'Friction should be intentional',
      paragraphs: [
        'Reduce taps for safe, reversible actions; add friction for money, privacy, and irreversible commits—call this “purposeful friction.”',
      ],
    },
    {
      heading: 'Worked tradeoff',
      paragraphs: [
        'Password reset: low friction with strong device signals; wire transfers: step-up authentication—same brand, different safety posture.',
      ],
    },
    {
      heading: 'Thin UX',
      paragraphs: [
        'Hiding escalation behind menus—users fight the bot instead of getting help.',
      ],
    },
    {
      heading: 'Professional standard',
      paragraphs: [
        'You can explain why each friction point exists to a regulator or customer advocate.',
      ],
    },
  ],

  'designing-useful-chatbot-conversations-button-led-and-guided-interactions': [
    {
      heading: 'Buttons reduce language entropy',
      paragraphs: [
        'Buttons script intents for high-error domains; pair with free text only where variability truly helps.',
      ],
    },
    {
      heading: 'Worked layout',
      paragraphs: [
        'Offer 3–5 visible intents + “something else” that routes to clarification, not an open-ended promise.',
      ],
    },
    {
      heading: 'Misstep',
      paragraphs: [
        'Over-buttonizing empathy—users feel railroaded if nuance matters.',
      ],
    },
    {
      heading: 'Judgment check',
      paragraphs: [
        'Where would you refuse buttons-only and why?',
      ],
    },
  ],

  'designing-useful-chatbot-conversations-good-short-form-bot-patterns': [
    {
      heading: 'Patterns: confirm, chunk, recap',
      paragraphs: [
        'Chunk information; recap decisions; confirm before writes; keep a visible “where am I?” indicator for multi-step flows.',
      ],
    },
    {
      heading: 'Worked microcopy test',
      paragraphs: [
        'Rewrite three bot lines to remove vague pronouns (“it”, “that”)—precision reduces retries.',
      ],
    },
    {
      heading: 'Anti-pattern',
      paragraphs: [
        'Stacking questions without summarizing—users forget constraints.',
      ],
    },
    {
      heading: 'Capability marker',
      paragraphs: [
        'You can critique a short flow for cognitive load hotspots.',
      ],
    },
  ],

  'designing-useful-chatbot-conversations-multi-step-conversation-design': [
    {
      heading: 'Multi-step flows need state and empathy',
      paragraphs: [
        'Persist slots; allow backtracking; summarize state every few turns; never gaslight users about what was said.',
      ],
    },
    {
      heading: 'Worked storyboard',
      paragraphs: [
        'Sketch a 6-turn flow with branch points and recovery if the user answers “I don’t know.”',
      ],
    },
    {
      heading: 'Risk',
      paragraphs: [
        'LLM variability without guardrails—test determinism on critical branches.',
      ],
    },
    {
      heading: 'Assessment',
      paragraphs: [
        'Identify three turns where confirmation prevents harm.',
      ],
    },
  ],

  'designing-useful-chatbot-conversations-handling-context-across-longer-interactions': [
    {
      heading: 'Context windows are product policy, not infinite memory',
      paragraphs: [
        'Decide what persists (ticket id, user goal) vs what must be revalidated (payment details). Summarize internally for agents; show minimal sensitive data back.',
      ],
    },
    {
      heading: 'Worked safeguard',
      paragraphs: [
        'Time-bound context: re-verify before executing anything irreversible after idle.',
      ],
    },
    {
      heading: 'Misconception',
      paragraphs: [
        '“The model remembers everything.” Product memory must be engineered.',
      ],
    },
    {
      heading: 'Practice',
      paragraphs: [
        'Write a data retention note for transcripts aligned to policy.',
      ],
    },
  ],

  'designing-useful-chatbot-conversations-guiding-users-without-losing-clarity': [
    {
      heading: 'Guidance is navigational, not clever',
      paragraphs: [
        'Offer next steps as explicit choices; avoid condescending tone; keep error messages diagnostic (“we couldn’t find X”) not blamey.',
      ],
    },
    {
      heading: 'Worked rewrite',
      paragraphs: [
        'Turn a vague bot apology into three lines: what failed, what user can try, how to reach humans with context.',
      ],
    },
    {
      heading: 'Thin pattern',
      paragraphs: [
        'Overusing humor when users are stressed—read the room.',
      ],
    },
    {
      heading: 'Evaluation',
      paragraphs: [
        '5-second comprehension test: can a first-time user predict the next step?',
      ],
    },
  ],

  'designing-useful-chatbot-conversations-when-long-form-interactions-make-sense': [
    {
      heading: 'Long-form fits coaching, troubleshooting, co-writing with checkpoints',
      paragraphs: [
        'Use progressive disclosure; chunk outputs; insert deliberate recap points; avoid walls of text without structure.',
      ],
    },
    {
      heading: 'Worked scenario',
      paragraphs: [
        'Choose coaching vs micro-task: when does extended dialogue reduce returns?',
      ],
    },
    {
      heading: 'Misstep',
      paragraphs: [
        'Long LLM monologues without user checkpoints—errors compound silently.',
      ],
    },
    {
      heading: 'Judgment',
      paragraphs: [
        'Define stop rules: when must the bot refuse continued assistance?',
      ],
    },
  ],

  'designing-useful-chatbot-conversations-tone-clarity-and-user-trust': [
    {
      heading: 'Trust is built from predictable boundaries',
      paragraphs: [
        'Tone matches brand but must not imply expertise the bot lacks—especially medical/legal/financial adjacent topics.',
      ],
    },
    {
      heading: 'Worked trust checklist',
      paragraphs: [
        'Disclose limits; cite internal help articles when possible; avoid fabricated authority.',
      ],
    },
    {
      heading: 'Misconception',
      paragraphs: [
        '“Friendly equals trustworthy.” Friendly confident lies are worse than calm refusals.',
      ],
    },
    {
      heading: 'Serious evaluation',
      paragraphs: [
        'Score your draft responses: clarity (1–5), honesty about limits (1–5), escalation path (1–5).',
      ],
    },
  ],

  'designing-useful-chatbot-conversations-asking-better-follow-up-questions': [
    {
      heading: 'Follow-ups should reduce uncertainty fast',
      paragraphs: [
        'Ask one targeted question at a time; explain why you’re asking; offer examples of valid answers.',
      ],
    },
    {
      heading: 'Worked pattern',
      paragraphs: [
        'Diagnostic ladder: clarify goal → environment → recent change → expected vs observed.',
      ],
    },
    {
      heading: 'Anti-pattern',
      paragraphs: [
        'Shotgun questions—users answer randomly and quality collapses.',
      ],
    },
    {
      heading: 'Practice',
      paragraphs: [
        'Rewrite three shotgun prompts into a sequenced ladder.',
      ],
    },
  ],

  'designing-useful-chatbot-conversations-avoiding-confusing-bot-behavior': [
    {
      heading: 'Confusion comes from inconsistent mental models',
      paragraphs: [
        'Keep verbs stable; don’t rename intents mid-flow; mirror user language when summarizing state.',
      ],
    },
    {
      heading: 'Worked QA pass',
      paragraphs: [
        'Run a session transcript highlight: every moment the user expressed confusion—root cause tag.',
      ],
    },
    {
      heading: 'Risk',
      paragraphs: [
        'LLM creativity in transactional flows—surprise behavior feels like bugs.',
      ],
    },
    {
      heading: 'Capability outcome',
      paragraphs: [
        'You can classify confusion sources: language, missing state, latency, misleading affordances.',
      ],
    },
  ],

  'designing-useful-chatbot-conversations-designing-helpful-rather-than-annoying-bots': [
    {
      heading: 'Helpfulness is outcome + respect for attention',
      paragraphs: [
        'Avoid nagging retries; cap promotions; respect “stop”; provide quiet mode for sensitive contexts.',
      ],
    },
    {
      heading: 'Worked ethics check',
      paragraphs: [
        'Would you tolerate this bot interrupting you during a personal crisis? If not, add safeguards.',
      ],
    },
    {
      heading: 'Misconception',
      paragraphs: [
        '“Engagement metrics equal success.” Coercion travels under engagement.',
      ],
    },
    {
      heading: 'Capstone reflection',
      paragraphs: [
        'Draft a short “Principles for non-annoying assistance” for your team—5 bullets, enforceable in design review.',
      ],
    },
  ],
}
