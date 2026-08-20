import { Link } from 'react-router-dom'
import { Eyebrow, Section } from './mediaUi'
import { PILLARS } from '../../social/pillars'
import {
  BRAND_SITE_NAME,
  BRAND_TAGLINE,
  EXTENDED_DESCRIPTION,
  PUBLIC_CONTACT_EMAIL,
  TARGET_AUDIENCE,
} from '../../social/brand'
import { usePageMeta } from '../../social/seo'

export function HowJifunzeWorksPage() {
  usePageMeta({
    title: `How Jifunze works — ${BRAND_SITE_NAME}`,
    description:
      'Who Jifunze.ai is for, what the six content topics cover, how a lesson is chosen, and the role automation plays.',
    path: '/about',
  })

  return (
    <Section className="py-14 sm:py-16">
      <Eyebrow>How Jifunze works</Eyebrow>
      <h1 className="mt-3 max-w-2xl text-[30px] font-extrabold leading-tight tracking-tight sm:text-[38px]">
        A career-skills media brand, run in the open
      </h1>
      <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-zinc-300">{EXTENDED_DESCRIPTION}</p>

      <div className="mt-12 max-w-2xl space-y-10">
        <section>
          <h2 className="text-[19px] font-semibold tracking-tight text-white">Who this is for</h2>
          <p className="mt-3 text-[16px] leading-relaxed text-zinc-300">{TARGET_AUDIENCE}.</p>
          <p className="mt-3 text-[16px] leading-relaxed text-zinc-400">
            If you are writing a CV, preparing for an interview, applying for work, learning to use
            AI for a real task, trying to earn your first freelance income, or trying to keep going
            through a long search — the lessons are written for you.
          </p>
        </section>

        <section>
          <h2 className="text-[19px] font-semibold tracking-tight text-white">The six topics</h2>
          <dl className="mt-4 space-y-4">
            {PILLARS.map((p) => (
              <div key={p.id}>
                <dt className="text-[15px] font-semibold text-white">
                  <Link
                    className="rounded hover:text-[#C4B5FD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
                    to={`/topics/${p.slug}`}
                  >
                    {p.label}
                  </Link>
                </dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-zinc-400">{p.description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="text-[19px] font-semibold tracking-tight text-white">How a lesson is chosen</h2>
          <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-zinc-300">
            <li>
              <strong className="font-semibold text-white">1. A backbone of tested lessons.</strong>{' '}
              Most of what we publish comes from a written library of practical, evergreen lessons —
              the ones on this site.
            </li>
            <li>
              <strong className="font-semibold text-white">2. A strict relevance test.</strong> We
              also watch what is changing in work and hiring. A news story only becomes a lesson if
              it clearly supports one of the six topics above and there is something a reader can
              actually do about it. General technology news does not qualify.
            </li>
            <li>
              <strong className="font-semibold text-white">3. A quality check before anything ships.</strong>{' '}
              Every draft is checked for a working link, an honest claim, and a specific action. A
              draft that promises something that does not exist is rejected, not fixed up.
            </li>
            <li>
              <strong className="font-semibold text-white">4. Human approval.</strong> Nothing is
              published to a channel without a person approving it.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-[19px] font-semibold tracking-tight text-white">
            What automation does, and does not, do
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-zinc-300">
            {BRAND_SITE_NAME} uses its own internal tooling to help draft, format and schedule its
            content, and to keep track of what has been published where. That tooling exists to serve
            this brand's own channels. It is not a product you can sign up for, and we do not offer
            content generation as a service.
          </p>
          <p className="mt-3 text-[16px] leading-relaxed text-zinc-400">
            The lessons are written and reviewed by people. Automation handles the repetitive parts —
            formatting, scheduling, and recording results — never the judgement about what is true or
            worth saying.
          </p>
        </section>

        <section>
          <h2 className="text-[19px] font-semibold tracking-tight text-white">What we do not claim</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-zinc-400">
            <li>We do not guarantee a job, an income, or an outcome of any kind.</li>
            <li>We are not an accredited training provider and we do not issue certificates here.</li>
            <li>We do not publish audience numbers, partnerships or endorsements we do not have.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[19px] font-semibold tracking-tight text-white">Coming later</h2>
          <p className="mt-3 text-[16px] leading-relaxed text-zinc-400">
            A free downloadable resource — the Kazi Kit — is planned. It is not ready, so nothing on
            this site or on any Jifunze.ai channel links to it. When it exists, it will appear here
            first with a working link.
          </p>
        </section>

        <section>
          <h2 className="text-[19px] font-semibold tracking-tight text-white">Contact</h2>
          <p className="mt-3 text-[16px] leading-relaxed text-zinc-300">
            Corrections, questions and takedown requests:{' '}
            <a
              className="rounded underline decoration-white/25 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
              href={`mailto:${PUBLIC_CONTACT_EMAIL}`}
            >
              {PUBLIC_CONTACT_EMAIL}
            </a>
            . Jifunze.ai is based in Nairobi, Kenya.
          </p>
        </section>

        <p className="border-t border-white/10 pt-6 text-[15px] font-medium text-zinc-400">
          {BRAND_TAGLINE}
        </p>
      </div>
    </Section>
  )
}
