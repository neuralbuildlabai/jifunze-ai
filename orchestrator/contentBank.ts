/**
 * Evergreen content bank — the brand-right backbone.
 *
 * Each entry is a proven how-to topic for Jifunze's audience (job seekers &
 * students in emerging markets), distilled from the 30-script playbook. The
 * engine draws from here by default and only reaches for news when a signal
 * clears a strict career-skill bar (see select.ts). Rotated deterministically by
 * date so topics don't repeat quickly.
 *
 * `seed`   gives the LLM a specific angle so it teaches ONE actionable thing.
 * `script` is the hand-written $0 fallback used when OPENAI_API_KEY is absent.
 *          It is written to pass orchestrator/scriptQuality.ts on its own —
 *          a run without an API key must still be publishable, not filler.
 */

/** Who every script is written for. Recorded on every decision for audit. */
export const TARGET_AUDIENCE = 'Job seekers, students and new freelancers in Kenya and other emerging markets'

export type EvergreenScript = {
  hook: string
  segments: string[]
  caption: string
}

export type EvergreenTopic = {
  id: string
  pillar: 'cv' | 'interview' | 'ai_task' | 'money' | 'applications' | 'mindset'
  seed: string        // the specific, actionable lesson the script must teach
  tags: string[]
  script: EvergreenScript
}

export const CONTENT_BANK: EvergreenTopic[] = [
  {
    id: 'cv-ats-language', pillar: 'cv', tags: ['cv', 'jobs', 'ai'],
    seed: 'CVs are screened by software first. Teach: paste your CV + the job advert into an AI chat and ask it to rewrite your CV using the advert\'s exact wording, keeping every fact true. Same truth, employer\'s words.',
    script: {
      hook: 'Your CV never reached a human',
      segments: ['Software screens it first', 'Paste the advert into an AI', 'Ask it to mirror the wording', 'Keep every fact true', 'Same truth, their words'],
      caption: 'Software reads your CV before any human does. Mirror the advert wording, keep every fact true.',
    },
  },
  {
    id: 'cv-responsible-for', pillar: 'cv', tags: ['cv', 'jobs'],
    seed: 'Delete the phrase "responsible for" from a CV. Teach the formula: what you did + the number + what it caused. Give a before/after example.',
    script: {
      hook: 'Delete two words from your CV',
      segments: ['Responsible for says nothing', 'Write what you actually did', 'Add the real number', 'Then add what it changed', 'Cut stock waste by 30 percent'],
      caption: 'Responsible for says nothing. What you did, plus the number, plus what it changed.',
    },
  },
  {
    id: 'cv-top-three-lines', pillar: 'cv', tags: ['cv', 'jobs'],
    seed: 'Replace the CV objective statement with three lines: who you are + how long, your single strongest proof with a number, and the specific role you want.',
    script: {
      hook: 'Your CV objective is wasting space',
      segments: ['Cut the objective statement', 'Write three lines instead', 'Who you are, how long', 'One proof with a number', 'The exact role you want'],
      caption: 'Swap the objective for three lines: who you are, one proof with a number, the role you want.',
    },
  },
  {
    id: 'cv-tailor-4min', pillar: 'cv', tags: ['cv', 'applications'],
    seed: 'Tailor a CV to any job in 4 minutes with three edits: reorder most-relevant experience to the top, swap your words for the advert\'s words, cut anything irrelevant.',
    script: {
      hook: 'Tailor any CV in four minutes',
      segments: ['Three edits, nothing else', 'Move relevant experience to the top', 'Swap your words for theirs', 'Cut everything the advert ignores'],
      caption: 'Three edits tailor a CV in four minutes: reorder, mirror the wording, cut the rest.',
    },
  },
  {
    id: 'interview-mock-ai', pillar: 'interview', tags: ['interview', 'ai'],
    seed: 'Rehearse a real interview free with an AI: prompt it to ask one question at a time, follow up whenever your answer is vague, and name your three weakest answers at the end.',
    script: {
      hook: 'Rehearse your interview free tonight',
      segments: ['Open any AI chat', 'Ask for one question at a time', 'Make it push on vague answers', 'Ask for your three weakest answers'],
      caption: 'Free interview rehearsal: one question at a time, follow-ups on vague answers, then your three weakest.',
    },
  },
  {
    id: 'interview-salary', pillar: 'interview', tags: ['interview', 'salary'],
    seed: 'Never name the first salary number. Teach the deflection: "Do you have a band budgeted for this role?" then, if pushed, give a range whose bottom is what you\'d actually accept.',
    script: {
      hook: 'Never say the first salary number',
      segments: ['They ask your expectation first', 'Ask what band is budgeted', 'If pushed, offer a range', 'Its bottom is what you accept'],
      caption: 'Do not name the first number. Ask what band is budgeted, then offer a range you would accept.',
    },
  },
  {
    id: 'interview-predict-qs', pillar: 'interview', tags: ['interview', 'ai'],
    seed: 'Predict interview questions from the advert: paste it into an AI and ask for the 15 most likely questions in order, plus what the interviewer is really testing with each.',
    script: {
      hook: 'Know the questions before the interview',
      segments: ['Paste the advert into an AI', 'Ask for fifteen likely questions', 'In the order they will come', 'Ask what each one tests'],
      caption: 'Paste the advert into an AI, ask for the 15 likely questions and what each one really tests.',
    },
  },
  {
    id: 'ai-skill-plan', pillar: 'ai_task', tags: ['ai', 'skills', 'learn'],
    seed: 'Turn "I want to learn X" into a 30-day plan with one AI prompt: one hour a day, each day one task with an output you can point at, only free resources, day 30 gives something to show an employer.',
    script: {
      hook: 'Turn I want to learn into a plan',
      segments: ['One prompt builds thirty days', 'One hour a day', 'Each day one visible output', 'Free resources only', 'Day thirty shows an employer something'],
      caption: 'One prompt turns I want to learn X into a 30-day plan with something to show at the end.',
    },
  },
  {
    id: 'ai-cover-letter', pillar: 'ai_task', tags: ['ai', 'cv', 'applications'],
    seed: 'Write a non-generic cover letter in 6 minutes: paragraph 1 why THIS company with a specific detail, paragraph 2 one proof with a number, paragraph 3 what you\'d work on in your first 3 months.',
    script: {
      hook: 'Cover letters take six minutes now',
      segments: ['Three paragraphs, no waffle', 'Why this company, one real detail', 'One proof with a number', 'Name your first three months'],
      caption: 'Three paragraphs: why this company, one proof with a number, and your first three months.',
    },
  },
  {
    id: 'money-narrow-service', pillar: 'money', tags: ['freelance', 'money'],
    seed: 'Stop selling broad services (design, writing) — go narrow and boring. Teach: search a freelance platform for a narrow service vs a broad one to see the competition gap. Boring, specific tasks get booked.',
    script: {
      hook: 'Stop selling design. Sell one task.',
      segments: ['Broad services drown in competition', 'Search one narrow service instead', 'Check how many sellers appear', 'Boring and specific gets booked'],
      caption: 'Narrow beats broad on freelance platforms. Search one specific task and check the competition.',
    },
  },
  {
    id: 'money-portfolio-weekend', pillar: 'money', tags: ['freelance', 'skills'],
    seed: 'Build a portfolio with zero clients in a weekend: pick a real local business with a visible problem, fix it as a labelled self-initiated project, write it up as a case study, put it behind one link.',
    script: {
      hook: 'Build a portfolio with zero clients',
      segments: ['Pick a real local business', 'Fix one visible problem', 'Label it self-initiated, honestly', 'Write it up as a case study', 'Save it behind one link'],
      caption: 'No clients yet? Fix one real local problem, label it self-initiated, write the case study.',
    },
  },
  {
    id: 'money-async-work', pillar: 'money', tags: ['freelance', 'remote work'],
    seed: 'Freelancing works with unreliable power/internet IF you choose ASYNC work (deliver files by a deadline) over live work. Teach: work offline and sync, finish a day early, keep one backup connection.',
    script: {
      hook: 'Unreliable power? Choose async work.',
      segments: ['Live calls punish bad internet', 'Pick work with deadlines instead', 'Write offline, sync when you can', 'Finish a day early', 'Keep one backup connection'],
      caption: 'Async work survives power cuts: deadlines not live calls, work offline, finish a day early.',
    },
  },
  {
    id: 'apps-follow-up', pillar: 'applications', tags: ['jobs', 'applications'],
    seed: 'The 7-day follow-up nobody sends: three sentences — remind them what/when you applied, one new thing since, a short close. Once, not three times.',
    script: {
      hook: 'The follow-up almost nobody sends',
      segments: ['Wait seven days after applying', 'Send three sentences, no more', 'Remind them what and when', 'Add one new thing since', 'Once only, not three times'],
      caption: 'Seven days after applying, send three sentences: what you applied for, one new thing, a short close.',
    },
  },
  {
    id: 'apps-no-experience', pillar: 'applications', tags: ['jobs', 'cv'],
    seed: '"No experience" usually means "nobody paid me." Teach what counts on a CV: final-year project, any committee/team you organised, family-business work, self-invented projects labelled honestly.',
    script: {
      hook: 'No experience means nobody paid you',
      segments: ['Your final-year project counts', 'So does any team you organised', 'Family business work counts', 'List them like real work'],
      caption: 'No experience usually means nobody paid you. Your project, your team, the family business all count.',
    },
  },
  {
    id: 'apps-scam-signs', pillar: 'applications', tags: ['jobs', 'kenya'],
    seed: 'Spot a fake job advert in under a minute: any upfront fee, WhatsApp-only interview, personal-email domain, salary too good with no job description, extreme urgency, no traceable company.',
    script: {
      hook: 'Spot a fake job in one minute',
      segments: ['Any upfront fee is a scam', 'Interview only on WhatsApp', 'Personal email, no company domain', 'Huge salary, no job description', 'Check the company exists first'],
      caption: 'Fake job advert signs: upfront fees, WhatsApp-only interviews, personal email domains, no real company.',
    },
  },
  {
    id: 'mindset-3-months', pillar: 'mindset', tags: ['graduate', 'jobs'],
    seed: 'The three months after graduation, planned: month 1 build a master CV + one portfolio piece, month 2 twenty tailored tracked applications, month 3 start earning something online. Not on the list: waiting.',
    script: {
      hook: 'Plan the three months after graduation',
      segments: ['Month one: build a master CV', 'Month two: send twenty tailored applications', 'Month three: earn something online', 'Waiting is not on the list'],
      caption: 'The three months after graduation, planned: master CV, twenty tailored applications, then earn online.',
    },
  },
]

/**
 * Deterministic non-repeating pick from a RUN_DATE (YYYY-MM-DD).
 *
 * The date rotation alone guarantees a full pass through the bank before any
 * repeat. `exclude` is the second guard: pass the topic ids already used in the
 * recent window and the rotation steps past them, so a re-run or a backfill
 * cannot serve the same lesson twice in a row.
 */
export function pickEvergreen(runDate: string, opts: { exclude?: string[] } = {}): EvergreenTopic {
  const parsed = new Date(runDate + 'T00:00:00Z').getTime()
  const days = Math.floor((Number.isNaN(parsed) ? Date.now() : parsed) / 86400000)
  const n = CONTENT_BANK.length
  const start = ((days % n) + n) % n
  const exclude = new Set(opts.exclude ?? [])
  for (let step = 0; step < n; step++) {
    const topic = CONTENT_BANK[(start + step) % n]
    if (!exclude.has(topic.id)) return topic
  }
  // every topic excluded (exclude window >= bank size): fall back to the rotation
  return CONTENT_BANK[start]
}
