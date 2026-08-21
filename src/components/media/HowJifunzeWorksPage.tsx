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
    title: `About — ${BRAND_SITE_NAME}`,
    description:
      'Who Jifunze is for, what the six topics cover, how content is chosen and verified, and the role AI-assisted automation plays.',
    path: '/about',
  })

  return (
    <Section className="py-14 sm:py-16">
      <Eyebrow>About Jifunze</Eyebrow>
      <h1 className="mt-3 max-w-2xl text-[30px] font-extrabold leading-tight tracking-tight sm:text-[38px]">
        A social learning media brand, run in the open
      </h1>
      <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-zinc-300">{EXTENDED_DESCRIPTION}</p>

      <div className="mt-12 max-w-2xl space-y-10">
        <section>
          <h2 className="text-[19px] font-semibold tracking-tight text-white">Who this is for</h2>
          <p className="mt-3 text-[16px] leading-relaxed text-zinc-300">{TARGET_AUDIENCE}.</p>
          <p className="mt-3 text-[16px] leading-relaxed text-zinc-400">
            If you are figuring out how to use AI in your actual job, growing your career, building
            an income, choosing the right digital tools, getting more done, or looking for real
            opportunities — the content is made for you.
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
          <h2 className="text-[19px] font-semibold tracking-tight text-white">How content is made</h2>
          <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-zinc-300">
            <li>
              <strong className="font-semibold text-white">1. Discover useful signals.</strong> We
              watch what is changing in AI, work and digital opportunity, alongside a backbone of
              tested evergreen lessons.
            </li>
            <li>
              <strong className="font-semibold text-white">2. Research and verify.</strong> A
              development only becomes content if it clearly serves one of the six topics and its
              claims hold up against traceable sources. General technology noise does not qualify.
            </li>
            <li>
              <strong className="font-semibold text-white">3. Create practical content.</strong>{' '}
              Every piece teaches something you can actually do — with quality checks for honest
              claims and specific actions before anything ships.
            </li>
            <li>
              <strong className="font-semibold text-white">4. Review and publish.</strong> A person
              reviews content before it goes out on a channel.
            </li>
            <li>
              <strong className="font-semibold text-white">5. Learn from engagement.</strong> What
              the audience finds useful shapes what we make next.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-[19px] font-semibold tracking-tight text-white">
            What automation does, and does not, do
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-zinc-300">
            {BRAND_SITE_NAME} uses AI-assisted internal tooling to research, draft, adapt and
            produce its content, and to keep track of what has been published where. That tooling
            serves this brand's own channels — it is not a product you can sign up for, and we do
            not offer content generation as a service.
          </p>
          <p className="mt-3 text-[16px] leading-relaxed text-zinc-400">
            Human oversight remains part of the process as our publishing system develops. See the{' '}
            <Link
              className="rounded text-[#A78BFA] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
              to="/ai-disclosure"
            >
              full AI disclosure
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-[19px] font-semibold tracking-tight text-white">What we do not claim</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-zinc-400">
            <li>We do not guarantee a job, an income, or an outcome of any kind.</li>
            <li>We are not an accredited training provider and we do not sell courses or issue certificates here.</li>
            <li>We do not publish audience numbers, partnerships or endorsements we do not have.</li>
          </ul>
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
            . {BRAND_SITE_NAME} is based in Nairobi, Kenya.
          </p>
        </section>

        <p className="border-t border-white/10 pt-6 text-[15px] font-medium text-zinc-400">
          {BRAND_TAGLINE}
        </p>
      </div>
    </Section>
  )
}
