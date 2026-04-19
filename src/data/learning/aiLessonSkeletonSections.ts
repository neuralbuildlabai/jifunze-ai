import type { CurriculumLesson } from './aiEverydayWorkCurriculum'
import type { PublicStarterLessonSection } from '../publicStarterLibraries/aiFoundations'

export function skeletonSectionsForCurriculumLesson(lesson: CurriculumLesson): PublicStarterLessonSection[] {
  return [
    {
      heading: 'Core ideas',
      paragraphs: [
        lesson.summary,
        `${lesson.outcomes[0]} This material is assistive learning support—not a guarantee of mastery, certification, exam results, hiring outcomes, or professional qualification.`,
      ],
    },
    {
      heading: 'Practice (this week)',
      paragraphs: [
        `Apply this lesson to one real task: ${lesson.outcomes[1]} Keep human review boundaries clear—especially for anything customer-facing, graded, regulated, or legally sensitive.`,
        `Optional stretch: ${lesson.outcomes[2]}`,
      ],
    },
    {
      heading: 'Review habits',
      paragraphs: [
        'Verify facts that matter, check tone and inclusivity for people-facing language, and align outputs with your organization’s policies and constraints.',
      ],
    },
  ]
}
