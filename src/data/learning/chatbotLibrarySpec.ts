/**
 * **Building Everyday Chatbots with AI** — second Jifunze library family (public starter → signed-in → premium depth).
 * Compiled by `chatbotEverydayCurriculum.ts`; access rules are product policy, not authorization boundaries.
 */

export type ChatbotSpecModule = { title: string; lessons: string[] }

export type ChatbotSpecCategory = {
  id: string
  title: string
  summary: string
  modules: ChatbotSpecModule[]
}

export const CHATBOT_LIBRARY_FAMILY_TITLE = 'Building Everyday Chatbots with AI'

export const CHATBOT_CURRICULUM_SPEC: ChatbotSpecCategory[] = [
  {
    id: 'chatbots-in-everyday-life',
    title: 'Chatbots in Everyday Life',
    summary:
      'Orientation: where chatbots show up, why they matter for daily digital life, and realistic expectations—assistive framing only.',
    modules: [
      {
        title: 'Why chatbots matter now',
        lessons: [
          'What a Chatbot Is and What It Is Not',
          'Why Chatbots Are Now Part of Everyday Digital Life',
          'Where People Already Meet Chatbots Every Day',
          'Why Businesses, Learners, and Creators Cannot Ignore Them',
        ],
      },
      {
        title: 'Everyday chatbot use cases',
        lessons: [
          'Chatbots for Customer Support',
          'Chatbots for Learning and Revision',
          'Chatbots for Scheduling, Guidance, and Help',
          'Chatbots for Content and Productivity Support',
        ],
      },
    ],
  },
  {
    id: 'types-of-chatbots',
    title: 'Types of Chatbots',
    summary:
      'From rules-based flows to AI-assisted dialogue—understanding categories without vendor hype or guaranteed outcomes.',
    modules: [
      {
        title: 'Simple and rules-based chatbots',
        lessons: [
          'What a Rules-Based Chatbot Looks Like',
          'Decision Trees and Structured Responses',
          'When Simple Bots Are Enough',
          'Limits of Basic Chatbots',
        ],
      },
      {
        title: 'Smarter AI-powered chatbots',
        lessons: [
          'AI Chatbots Versus Rules-Based Bots',
          'How LLM-Powered Chatbots Differ',
          'When AI Improves the User Experience',
          'Risks of Making a Bot Too “Smart”',
        ],
      },
      {
        title: 'ML and chatbot intelligence',
        lessons: [
          'Where Machine Learning Fits in Chatbots',
          'Intent Recognition and Pattern Learning',
          'Recommendation and Prediction in Chatbot Systems',
          'Why Not Every Chatbot Needs Full ML',
        ],
      },
    ],
  },
  {
    id: 'designing-useful-chatbot-conversations',
    title: 'Designing Useful Chatbot Conversations',
    summary:
      'Short vs long interactions, conversational clarity, and patterns that respect users—design support, not certification.',
    modules: [
      {
        title: 'Short-form chatbot experiences',
        lessons: [
          'Quick Help, Fast Answers, and Micro-Tasks',
          'Designing for Low Friction',
          'Button-Led and Guided Interactions',
          'Good Short-Form Bot Patterns',
        ],
      },
      {
        title: 'Long-form chatbot experiences',
        lessons: [
          'Multi-Step Conversation Design',
          'Handling Context Across Longer Interactions',
          'Guiding Users Without Losing Clarity',
          'When Long-Form Interactions Make Sense',
        ],
      },
      {
        title: 'Good conversational design',
        lessons: [
          'Tone, Clarity, and User Trust',
          'Asking Better Follow-Up Questions',
          'Avoiding Confusing Bot Behavior',
          'Designing Helpful Rather Than Annoying Bots',
        ],
      },
    ],
  },
  {
    id: 'building-chatbots-for-real-activities',
    title: 'Building Chatbots for Real Activities',
    summary:
      'Work, learning, personal life, and creator/business contexts—pattern libraries you adapt; not job or revenue guarantees.',
    modules: [
      {
        title: 'Chatbots for work',
        lessons: [
          'Workplace Support Bots',
          'FAQ and Internal Knowledge Bots',
          'Productivity and Process Bots',
          'Team Support Chatbot Use Cases',
        ],
      },
      {
        title: 'Chatbots for learning',
        lessons: [
          'Study Companion Bots',
          'Revision and Recall Bots',
          'Explainer and Practice Bots',
          'Learning Bots That Help Without Replacing Thinking',
        ],
      },
      {
        title: 'Chatbots for personal use',
        lessons: [
          'Personal Assistant Bots',
          'Daily Task Support',
          'Information and Recommendation Bots',
          'Everyday Lifestyle and Utility Bots',
        ],
      },
      {
        title: 'Chatbots for creators and businesses',
        lessons: [
          'Lead Capture and Inquiry Bots',
          'Content Idea and Draft Bots',
          'Community and Audience Support Bots',
          'Social and Commerce Support Bots',
        ],
      },
    ],
  },
  {
    id: 'building-the-bot-logic',
    title: 'Building the Bot Logic',
    summary:
      'Purpose, flows, responses, fallbacks, and memory boundaries—structured thinking for safer assistive bots.',
    modules: [
      {
        title: 'Defining purpose and flow',
        lessons: [
          'What Problem the Bot Should Solve',
          'Defining Scope and Boundaries',
          'Mapping the User Journey',
          'From Task to Conversation Flow',
        ],
      },
      {
        title: 'Building response systems',
        lessons: [
          'Writing Good Bot Responses',
          'Structuring Prompts for AI Chatbots',
          'Handling Fallbacks and Unclear Questions',
          'Keeping Answers Useful and Safe',
        ],
      },
      {
        title: 'Context and memory',
        lessons: [
          'What the Bot Should Remember',
          'When Memory Helps',
          'When Memory Creates Risk',
          'Designing Clear Context Rules',
        ],
      },
    ],
  },
  {
    id: 'reviewing-and-improving-chatbot-performance',
    title: 'Reviewing and Improving Chatbot Performance',
    summary:
      'Quality signals, failure modes, and iteration loops—measuring usefulness, not promising conversion or mastery.',
    modules: [
      {
        title: 'What makes a chatbot good',
        lessons: ['Helpfulness', 'Clarity', 'Relevance', 'Reliability'],
      },
      {
        title: 'Common chatbot failures',
        lessons: [
          'Wrong or vague answers',
          'Repetitive loops',
          'Hallucinations and false confidence',
          'Broken user journeys',
        ],
      },
      {
        title: 'Improving the bot over time',
        lessons: [
          'Reviewing real user interactions',
          'Identifying weak points',
          'Improving flows and prompts',
          'Knowing when to simplify',
        ],
      },
    ],
  },
  {
    id: 'safety-trust-and-responsibility-chatbots',
    title: 'Safety, Trust, and Responsibility',
    summary:
      'Transparency, escalation, privacy habits, and literacy—assistive guidance, not compliance certification.',
    modules: [
      {
        title: 'User trust and boundaries',
        lessons: [
          'Telling users what the bot can and cannot do',
          'Avoiding misleading confidence',
          'Setting safe expectations',
          'Human escalation when needed',
        ],
      },
      {
        title: 'Privacy and data caution',
        lessons: [
          'Sensitive information in chatbot interactions',
          'Why data boundaries matter',
          'Keeping chatbot use responsible',
          'Practical safety habits',
        ],
      },
      {
        title: 'Why we cannot ignore chatbots',
        lessons: [
          'Chatbots as the new interface layer',
          'Why businesses, learners, and professionals need chatbot literacy',
          'The shift from search to conversational systems',
          'Preparing for a chatbot-first world',
        ],
      },
    ],
  },
  {
    id: 'advanced-chatbot-systems',
    title: 'Advanced Chatbot Systems',
    summary:
      'Multi-step workflows, hybrid retrieval/ML patterns, and assistant-style systems—requires supervision and plan limits.',
    modules: [
      {
        title: 'Multi-step chatbot workflows',
        lessons: [
          'Bots that guide, retrieve, and complete tasks',
          'Multi-turn problem solving',
          'Connected chatbot workflows',
          'When complexity adds value',
        ],
      },
      {
        title: 'AI + ML + workflow bots',
        lessons: [
          'Retrieval-augmented bots',
          'Knowledge-aware chatbots',
          'ML-enhanced routing and recommendations',
          'Hybrid systems in real use',
        ],
      },
      {
        title: 'From everyday chatbot to assistant system',
        lessons: [
          'Assistants versus simple bots',
          'When a chatbot becomes a workflow layer',
          'Everyday bot ecosystems',
          'Building toward more advanced systems',
        ],
      },
    ],
  },
]
