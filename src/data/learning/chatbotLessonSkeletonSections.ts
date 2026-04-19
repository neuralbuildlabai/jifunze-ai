import type { CurriculumLesson } from './aiEverydayWorkCurriculum'
import type { PublicStarterLessonSection } from '../publicStarterLibraries/aiFoundations'

export function skeletonSectionsForChatbotLesson(lesson: CurriculumLesson): PublicStarterLessonSection[] {
  return [
    {
      heading: 'Core ideas',
      paragraphs: [
        lesson.summary,
        `${lesson.outcomes[0]} This reader is instructional support for chatbot literacy and design—not a promise of deployment success, certification, grades, hiring outcomes, or guaranteed business results.`,
      ],
    },
    {
      heading: 'Practice (pick one)',
      paragraphs: [
        `Apply this lesson to one realistic bot scenario you could observe or prototype safely: ${lesson.outcomes[1]} Add explicit boundaries for what the bot refuses and when it escalates to humans.`,
        `Stretch: ${lesson.outcomes[2]}`,
      ],
    },
    {
      heading: 'Trust and review',
      paragraphs: [
        'Treat conversational outputs as drafts until reviewed—especially for obligations, safety, accessibility, privacy, and brand-sensitive language.',
      ],
    },
  ]
}
