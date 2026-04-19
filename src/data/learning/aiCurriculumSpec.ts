/**
 * Source-of-truth spec for **AI Foundations for Everyday Work** (8 categories, 30 modules, 124 lessons).
 * `aiEverydayWorkCurriculum.ts` compiles this into typed objects with slugs, access tiers, and ordering.
 * Titles drive routes, navigation, and readers—they are the live curriculum catalog, not decorative marketing.
 */

export type SpecModule = { title: string; lessons: string[] }

export type SpecCategory = {
  id: string
  title: string
  summary: string
  modules: SpecModule[]
}

export const AI_FOUNDATIONS_FAMILY_TITLE = 'AI Foundations for Everyday Work'

export const AI_CURRICULUM_SPEC: SpecCategory[] = [
  {
    id: 'ai-foundations',
    title: 'AI Foundations',
    summary:
      'Clear definitions, realistic limits, and practical judgment—baseline orientation before specialized tracks.',
    modules: [
      {
        title: 'Understanding AI clearly',
        lessons: [
          'What AI Is and What It Is Not',
          'The Difference Between AI, Automation, and Search',
          'Common Myths About AI',
          'Where AI Shows Up in Everyday Life and Work',
        ],
      },
      {
        title: 'How AI actually works at a practical level',
        lessons: [
          'Inputs, Patterns, and Predictions',
          'Why AI Sounds Confident Even When It Is Wrong',
          'The Limits of AI Knowledge',
          'Why Context Changes Output Quality',
        ],
      },
      {
        title: 'Becoming an informed AI user',
        lessons: [
          'What Good AI Use Looks Like',
          'When to Use AI and When Not To',
          'Building Good Judgment Around AI',
          'Your First Practical AI Use Cases',
        ],
      },
    ],
  },
  {
    id: 'practical-prompting',
    title: 'Practical Prompting',
    summary:
      'Prompt craft you can reuse at work—structure, iteration, templates, and judgment about when prompting stops helping.',
    modules: [
      {
        title: 'Prompting basics',
        lessons: [
          'What Makes a Prompt Good or Weak',
          'The Anatomy of a Useful Prompt',
          'Asking for Better Outputs in Plain Language',
          'The Role of Context, Constraints, and Format',
        ],
      },
      {
        title: 'Prompting for common tasks',
        lessons: [
          'Prompting for Summaries',
          'Prompting for Brainstorming',
          'Prompting for Explanations',
          'Prompting for Drafts and Rewrites',
        ],
      },
      {
        title: 'Improving prompt quality',
        lessons: [
          'How to Debug a Weak Prompt',
          'How to Ask for Better Structure',
          'How to Ask for Better Tone and Audience Fit',
          'Reusable Prompt Patterns for Everyday Work',
        ],
      },
      {
        title: 'Prompting with judgment',
        lessons: [
          'When More Prompting Does Not Help',
          'Avoiding Overcomplication',
          'Recognizing When the Problem Is the Task, Not the Prompt',
          'Building Your Personal Prompt Workflow',
        ],
      },
    ],
  },
  {
    id: 'reviewing-and-validating-ai-output',
    title: 'Reviewing and Validating AI Output',
    summary:
      'Review discipline for everyday knowledge work—accuracy, relevance, completeness, tone, risk, and human accountability.',
    modules: [
      {
        title: 'Why validation matters',
        lessons: [
          'Why AI Output Must Be Reviewed',
          'The Different Ways AI Can Be Wrong',
          'Fluency Versus Accuracy',
          'Hidden Risk in “Good-Looking” Output',
        ],
      },
      {
        title: 'A review framework',
        lessons: [
          'Checking for Accuracy',
          'Checking for Relevance',
          'Checking for Completeness',
          'Checking for Bias, Tone, and Risk',
        ],
      },
      {
        title: 'Validating output by task type',
        lessons: [
          'Reviewing Summaries',
          'Reviewing Research and Explanations',
          'Reviewing Professional Drafts',
          'Reviewing Educational Content',
        ],
      },
      {
        title: 'Human judgment and final responsibility',
        lessons: [
          'When to Escalate to a Human Source',
          'When Not to Use AI Output at All',
          'Building a Personal Review Checklist',
          'Responsible Reliance on AI',
        ],
      },
    ],
  },
  {
    id: 'ai-for-everyday-knowledge-work',
    title: 'AI for Everyday Knowledge Work',
    summary:
      'Thinking, notes, communication, and productivity patterns for daily work—paired with verification habits.',
    modules: [
      {
        title: 'AI for thinking and planning',
        lessons: [
          'Using AI to Clarify Ideas',
          'Using AI to Outline Projects',
          'Using AI to Break Down Complex Tasks',
          'Turning Rough Thoughts into Structured Plans',
        ],
      },
      {
        title: 'AI for notes and summaries',
        lessons: [
          'Summarizing Long Material',
          'Turning Notes into Cleaner Study Material',
          'Extracting Key Points from Messy Input',
          'Building Better Recaps and Briefs',
        ],
      },
      {
        title: 'AI for communication',
        lessons: [
          'Drafting Professional Messages',
          'Rewriting for Tone and Clarity',
          'Preparing Talking Points and Meeting Notes',
          'Turning Raw Ideas into Shareable Content',
        ],
      },
      {
        title: 'AI for productivity',
        lessons: [
          'Building Reusable AI Workflows',
          'Using AI Without Becoming Dependent on It',
          'Combining AI With Your Own Judgment',
          'Practical AI Habits That Save Time',
        ],
      },
    ],
  },
  {
    id: 'ai-for-learning-and-revision',
    title: 'AI for Learning and Revision',
    summary:
      'Explain → practice loops and revision scaffolding—assistive study support, not a substitute for official syllabi.',
    modules: [
      {
        title: 'Learning with AI',
        lessons: [
          'Using AI to Understand New Topics',
          'Asking AI for Clearer Explanations',
          'Learning Step by Step With AI Support',
          'Avoiding Passive Dependence',
        ],
      },
      {
        title: 'Revision with AI',
        lessons: [
          'Turning Notes into Revision Sheets',
          'Generating Question Sets for Review',
          'Using AI to Find Weak Areas',
          'Building Recap Material That Actually Helps',
        ],
      },
      {
        title: 'AI for active recall',
        lessons: [
          'Asking AI for Practice Questions',
          'Using AI for Self-Explanation',
          'Building Review Loops With AI',
          'Combining AI With Real Study Discipline',
        ],
      },
      {
        title: 'Strong learning habits',
        lessons: [
          'When AI Helps Learning',
          'When AI Harms Learning',
          'Avoiding Shortcut Dependence',
          'Building Real Understanding Over Time',
        ],
      },
    ],
  },
  {
    id: 'ai-for-writing-notes-and-briefs',
    title: 'AI for Writing, Notes, and Briefs',
    summary:
      'Drafting discipline, notes-to-briefs pipelines, audience-aware edits, and final review habits—still human-accountable.',
    modules: [
      {
        title: 'Drafting with AI',
        lessons: [
          'Using AI to Start a Draft',
          'Turning Bullet Points Into Clear Prose',
          'Rewriting for Structure and Clarity',
          'Moving From Rough Draft to Strong Draft',
        ],
      },
      {
        title: 'Notes and knowledge outputs',
        lessons: [
          'Turning Notes Into Summaries',
          'Turning Lessons Into Briefs',
          'Turning Research Into Usable Recaps',
          'Creating Study Guides and Cheat Sheets',
        ],
      },
      {
        title: 'Audience-aware writing',
        lessons: [
          'Writing for Yourself',
          'Writing for a Team',
          'Writing for Public Reading',
          'Adjusting Tone, Detail, and Structure',
        ],
      },
      {
        title: 'Editing and review',
        lessons: [
          'Editing AI Output Without Ruining It',
          'Keeping Your Own Voice',
          'Spotting Generic or Weak Writing',
          'Final Review Before Sharing',
        ],
      },
    ],
  },
  {
    id: 'ai-content-creation',
    title: 'AI Content Creation',
    summary:
      'Ideation through formats to sustainable workflows—voice constraints, credibility review, and publishing discipline.',
    modules: [
      {
        title: 'Content ideation',
        lessons: [
          'Generating Content Ideas With AI',
          'Turning One Idea Into Multiple Angles',
          'Finding Useful Educational Content Themes',
          'Matching Content to Audience Intent',
        ],
      },
      {
        title: 'AI-assisted content formats',
        lessons: [
          'Captions and Short Posts',
          'Carousels and Structured Learning Posts',
          'Educational Scripts and Talking Points',
          'Guides, Briefs, and Informational Content',
        ],
      },
      {
        title: 'Quality and credibility',
        lessons: [
          'Avoiding Generic AI Content',
          'Reviewing for Accuracy and Brand Fit',
          'Making Content More Human and Useful',
          'When Not to Publish AI-Assisted Content',
        ],
      },
      {
        title: 'Sustainable content workflows',
        lessons: [
          'Building Repeatable Content Systems',
          'Reusing Knowledge Across Formats',
          'Turning Lessons Into Public Content',
          'Turning Public Content Back Into Learning Assets',
        ],
      },
    ],
  },
  {
    id: 'advanced-ai-and-agentic-workflows',
    title: 'Advanced AI and Agentic Workflows',
    summary:
      'Multi-step workflows, supervised systems, and careful agentic patterns—emphasizing review, rollback, and limits.',
    modules: [
      {
        title: 'From single prompts to workflows',
        lessons: [
          'Multi-Step AI Tasks',
          'Chaining Outputs Across Tasks',
          'Building AI-Assisted Workflows',
          'Knowing When a Workflow Is Better Than a Single Prompt',
        ],
      },
      {
        title: 'AI as a working system',
        lessons: [
          'Inputs, Outputs, Memory, and Reuse',
          'Designing Repeatable AI Processes',
          'Human-in-the-Loop Workflows',
          'Failure Points in AI Systems',
        ],
      },
      {
        title: 'Agentic thinking',
        lessons: [
          'What Agentic Workflows Mean',
          'When Agentic Systems Help',
          'Risks in Multi-Step Automation',
          'Review and Control in Agentic Work',
        ],
      },
      {
        title: 'Applied advanced use',
        lessons: [
          'AI for Team Knowledge Work',
          'AI for Content Pipelines',
          'AI for Research and Synthesis',
          'Responsible Use of Advanced AI Systems',
        ],
      },
    ],
  },
]
