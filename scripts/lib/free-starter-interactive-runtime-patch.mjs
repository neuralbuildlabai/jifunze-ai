/**
 * Targeted runtime-data mutations for free-starter embedded interactive packages (decode → mutate → stringify).
 * Does not touch content/lib/**.
 */

const BA_SHORT_TITLE = 'Business Analytics for Decision-Making'
const BA_LONG_TITLE = 'Business Analytics for Decision-Making: Turning Data Into Actionable Business Insight'
const BA_LESSON6_FROM = 'Final GlowCare Practice and Knowledge Check'
const BA_LESSON6_TO = 'Final Practice: GlowCare Decision Review'

const BA_LESSON1_TEMPLATE =
  '<p>In this lesson, you will develop essential skills for applying analytics effectively in real-world business scenarios. The following objectives outline what you will accomplish:</p>'
const BA_LESSON1_REPLACEMENT =
  "<p>In this lesson you'll map GlowCare's signals to real manager questions—what changed, what it might mean, and what to verify next—so analytics stays tied to decisions, not a generic checklist.</p>"

const AI_WELCOME_OLD_MARKERS = [
  'great power comes great responsibility',
  'essential skills needed to effectively use Generative AI',
]

/**
 * @param {unknown} data parsed runtime root
 * @returns {boolean} whether JSON should be re-encoded
 */
export function applyJifunzeExportAndA11yLabels(data) {
  let changed = false
  const labels = data?.labelSet?.labels
  if (labels && typeof labels === 'object') {
    if (labels.a11yAiTutorArticulateLogo === 'Articulate - open in new tab') {
      labels.a11yAiTutorArticulateLogo = 'Jifunze.ai - open in new tab'
      changed = true
    }
    if (labels.aiTutorTermsPrefix === 'By using this service, you agree to the Articulate') {
      labels.aiTutorTermsPrefix = 'By using this service, you agree to the Jifunze.ai'
      changed = true
    }
    if (labels.a11yBlockStoryline === 'Storyline') {
      labels.a11yBlockStoryline = 'Lesson content'
      changed = true
    }
  }
  const es = data?.course?.exportSettings
  if (es && es.targetName === 'SCORM 1.2') {
    es.targetName = 'Jifunze.ai workshop'
    changed = true
  }
  return changed
}

/**
 * @param {unknown} data
 * @returns {boolean}
 */
export function trimAllCourseLessonTitles(data) {
  const lessons = data?.course?.lessons
  if (!Array.isArray(lessons)) return false
  let changed = false
  for (const L of lessons) {
    if (typeof L.title === 'string') {
      const t = L.title.replace(/\s+$/u, '')
      if (t !== L.title) {
        L.title = t
        changed = true
      }
    }
  }
  return changed
}

/**
 * @param {unknown} data
 * @returns {boolean}
 */
export function patchAiAtWorkWelcomeLesson(data) {
  const L0 = data?.course?.lessons?.[0]
  if (!L0?.items) return false
  let changed = false

  const walk = (items) => {
    if (!Array.isArray(items)) return
    for (const it of items) {
      if (it.type === 'text' && Array.isArray(it.items)) {
        for (const sub of it.items) {
          if (typeof sub.paragraph !== 'string') continue
          if (sub.paragraph.includes('great power comes great responsibility')) {
            sub.paragraph =
              '<p>This workshop helps you use ChatGPT more safely and clearly for everyday tasks. You will practice writing clearer prompts, checking AI output before you rely on it, and keeping sensitive information out of the tool when it should stay private. No coding is required—just practical habits you can apply step by step.</p>'
            changed = true
          } else if (sub.paragraph.includes('essential skills needed to effectively use Generative AI')) {
            sub.paragraph =
              '<p>Each short lesson adds one practical skill—clearer prompts, careful review, and safer handling of work-related details—before you move on to the next topic.</p>'
            changed = true
          }
        }
      }
      for (const k of Object.keys(it)) {
        const v = it[k]
        if (v && typeof v === 'object') walk(Array.isArray(v) ? v : [v])
      }
    }
  }

  walk(L0.items)
  return changed
}

/**
 * @param {unknown} data
 * @returns {boolean}
 */
export function patchBusinessAnalyticsRuntime(data) {
  let changed = applyJifunzeExportAndA11yLabels(data)
  const course = data?.course
  if (!course) return changed

  if (course.title === BA_LONG_TITLE) {
    course.title = BA_SHORT_TITLE
    changed = true
  }
  if (course.exportSettings?.title === BA_LONG_TITLE) {
    course.exportSettings.title = BA_SHORT_TITLE
    changed = true
  }

  const lessons = course.lessons
  if (Array.isArray(lessons) && lessons[5] && typeof lessons[5].title === 'string') {
    const t = lessons[5].title
    if (t === BA_LESSON6_FROM || t.includes('Final GlowCare')) {
      lessons[5].title = BA_LESSON6_TO
      changed = true
    }
  }

  const L1 = Array.isArray(lessons) ? lessons[0] : null
  if (L1?.items) {
    const walk = (items) => {
      if (!Array.isArray(items)) return
      for (const it of items) {
        if (it.type === 'text' && Array.isArray(it.items)) {
          for (const sub of it.items) {
            if (sub.paragraph === BA_LESSON1_TEMPLATE) {
              sub.paragraph = BA_LESSON1_REPLACEMENT
              changed = true
            }
          }
        }
        for (const k of Object.keys(it)) {
          const v = it[k]
          if (v && typeof v === 'object') walk(Array.isArray(v) ? v : [v])
        }
      }
    }
    walk(L1.items)
  }

  return changed
}

export { BA_LESSON6_TO, BA_SHORT_TITLE }
