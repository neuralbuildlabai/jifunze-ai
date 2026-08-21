import { PolicyChrome } from './PolicyChrome'

export function AiDisclosurePage() {
  return (
    <PolicyChrome title="AI disclosure" eyebrow="Transparency">
      <p>
        Jifunze uses AI-assisted tools to research, draft, adapt and produce educational content.
        Human oversight remains part of the process as our publishing system develops. This page
        explains exactly what that means.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">What AI does here</h2>
      <ul className="list-disc space-y-2 pl-5 text-zinc-300">
        <li>Helps scan and rank developments in AI, work and digital opportunity.</li>
        <li>Helps draft scripts, captions and text adaptations of our lessons.</li>
        <li>Helps produce media — for example captioned faceless video clips.</li>
      </ul>

      <h2 className="mt-8 text-base font-semibold text-white">What people do</h2>
      <ul className="list-disc space-y-2 pl-5 text-zinc-300">
        <li>Set the editorial direction: the topics, the standards and what gets made.</li>
        <li>Review content before it is published to a channel.</li>
        <li>Correct or withdraw anything found to be wrong after publication.</li>
      </ul>

      <h2 className="mt-8 text-base font-semibold text-white">What we do not claim</h2>
      <ul className="list-disc space-y-2 pl-5 text-zinc-300">
        <li>
          We do not claim subject-matter-expert verification of every piece, and we do not
          guarantee accuracy — verify anything important against primary sources.
        </li>
        <li>
          Our content is general education, not professional advice of any kind.
        </li>
        <li>
          We do not claim a fully autonomous live publishing system. Automation assists
          production; publishing to channels involves human review, and our automated pipeline
          remains disabled while it is being completed.
        </li>
        <li>We do not sell courses, certifications or subscriptions on this site.</li>
      </ul>

      <h2 className="mt-8 text-base font-semibold text-white">Corrections</h2>
      <p>
        If you find an error in anything we published, tell us via the contact address below.
        Corrections are noted on the affected content where practical.
      </p>
    </PolicyChrome>
  )
}
