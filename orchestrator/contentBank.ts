/**
 * Evergreen content bank — the brand-right backbone.
 *
 * Each entry is a proven how-to topic for Jifunze's audience (job seekers &
 * students in emerging markets), distilled from the 30-script playbook. The
 * engine draws from here by default and only reaches for news when a signal
 * clears a strict career-skill bar (see run.ts). Rotated deterministically by
 * date so topics don't repeat quickly.
 *
 * `seed` gives the brief generator a strong, specific angle so the LLM teaches
 * ONE actionable thing instead of waffling.
 */
export type EvergreenTopic = {
  id: string
  pillar: 'cv' | 'interview' | 'ai_task' | 'money' | 'applications' | 'mindset'
  seed: string        // the specific, actionable lesson the script must teach
  tags: string[]
}

export const CONTENT_BANK: EvergreenTopic[] = [
  { id: 'cv-ats-language', pillar: 'cv', tags: ['cv','jobs','ai'],
    seed: 'CVs are screened by software first. Teach: paste your CV + the job advert into an AI chat and ask it to rewrite your CV using the advert\'s exact wording, keeping every fact true. Same truth, employer\'s words.' },
  { id: 'cv-responsible-for', pillar: 'cv', tags: ['cv','jobs'],
    seed: 'Delete the phrase "responsible for" from a CV. Teach the formula: what you did + the number + what it caused. Give a before/after example.' },
  { id: 'cv-top-three-lines', pillar: 'cv', tags: ['cv','jobs'],
    seed: 'Replace the CV objective statement with three lines: who you are + how long, your single strongest proof with a number, and the specific role you want.' },
  { id: 'cv-tailor-4min', pillar: 'cv', tags: ['cv','applications'],
    seed: 'Tailor a CV to any job in 4 minutes with three edits: reorder most-relevant experience to the top, swap your words for the advert\'s words, cut anything irrelevant.' },
  { id: 'interview-mock-ai', pillar: 'interview', tags: ['interview','ai'],
    seed: 'Rehearse a real interview free with an AI: prompt it to ask one question at a time, follow up whenever your answer is vague, and name your three weakest answers at the end.' },
  { id: 'interview-salary', pillar: 'interview', tags: ['interview','salary'],
    seed: 'Never name the first salary number. Teach the deflection: "Do you have a band budgeted for this role?" then, if pushed, give a range whose bottom is what you\'d actually accept.' },
  { id: 'interview-predict-qs', pillar: 'interview', tags: ['interview','ai'],
    seed: 'Predict interview questions from the advert: paste it into an AI and ask for the 15 most likely questions in order, plus what the interviewer is really testing with each.' },
  { id: 'ai-skill-plan', pillar: 'ai_task', tags: ['ai','skills','learn'],
    seed: 'Turn "I want to learn X" into a 30-day plan with one AI prompt: one hour a day, each day one task with an output you can point at, only free resources, day 30 gives something to show an employer.' },
  { id: 'ai-cover-letter', pillar: 'ai_task', tags: ['ai','cv','applications'],
    seed: 'Write a non-generic cover letter in 6 minutes: paragraph 1 why THIS company with a specific detail, paragraph 2 one proof with a number, paragraph 3 what you\'d work on in your first 3 months.' },
  { id: 'money-narrow-service', pillar: 'money', tags: ['freelance','money'],
    seed: 'Stop selling broad services (design, writing) — go narrow and boring. Teach: search a freelance platform for a narrow service vs a broad one to see the competition gap. Boring, specific tasks get booked.' },
  { id: 'money-portfolio-weekend', pillar: 'money', tags: ['freelance','skills'],
    seed: 'Build a portfolio with zero clients in a weekend: pick a real local business with a visible problem, fix it as a labelled self-initiated project, write it up as a case study, put it behind one link.' },
  { id: 'money-async-work', pillar: 'money', tags: ['freelance','remote work'],
    seed: 'Freelancing works with unreliable power/internet IF you choose ASYNC work (deliver files by a deadline) over live work. Teach: work offline and sync, finish a day early, keep one backup connection.' },
  { id: 'apps-follow-up', pillar: 'applications', tags: ['jobs','applications'],
    seed: 'The 7-day follow-up nobody sends: three sentences — remind them what/when you applied, one new thing since, a short close. Once, not three times.' },
  { id: 'apps-no-experience', pillar: 'applications', tags: ['jobs','cv'],
    seed: '"No experience" usually means "nobody paid me." Teach what counts on a CV: final-year project, any committee/team you organised, family-business work, self-invented projects labelled honestly.' },
  { id: 'apps-scam-signs', pillar: 'applications', tags: ['jobs','kenya'],
    seed: 'Spot a fake job advert in under a minute: any upfront fee, WhatsApp-only interview, personal-email domain, salary too good with no job description, extreme urgency, no traceable company.' },
  { id: 'mindset-3-months', pillar: 'mindset', tags: ['graduate','jobs'],
    seed: 'The three months after graduation, planned: month 1 build a master CV + one portfolio piece, month 2 twenty tailored tracked applications, month 3 start earning something online. Not on the list: waiting.' },
]

/** Deterministic non-repeating pick from a RUN_DATE (YYYY-MM-DD). */
export function pickEvergreen(runDate: string): EvergreenTopic {
  // days since epoch → rotate through the bank so consecutive days differ and
  // it takes the whole bank length before any topic repeats.
  const days = Math.floor(new Date(runDate + 'T00:00:00Z').getTime() / 86400000)
  const idx = ((days % CONTENT_BANK.length) + CONTENT_BANK.length) % CONTENT_BANK.length
  return CONTENT_BANK[idx]
}
