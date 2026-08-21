import { PolicyChrome } from './PolicyChrome'

export function TermsOfServicePage() {
  return (
    <PolicyChrome title="Terms of Service" eyebrow="Legal">
      <p>
        These Terms describe how you may use the Jifunze website (“Jifunze,” “we,” “us”). They are
        written to match what Jifunze is today: a social learning media brand that publishes
        educational content on this site and on its official social channels. There are no user
        accounts, courses, subscriptions or purchases on this site.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">1. What Jifunze is</h2>
      <p>
        Jifunze turns emerging developments in AI, work and digital opportunity into educational
        social content. Unless we explicitly state otherwise, Jifunze is independent and not
        affiliated with, endorsed by, or tied to any external institution, employer, certification
        body or platform it discusses.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">2. Educational content, not advice</h2>
      <p>
        Everything published here and on our channels is general educational information. It is not
        legal, financial, medical, immigration or professional advice, and it comes with no
        guarantee of accuracy, completeness, or outcomes — no job, income, or result is promised.
        Verify anything important against primary sources before acting on it, and see our{' '}
        <a className="text-[#A78BFA] hover:text-white" href="/ai-disclosure">
          AI disclosure
        </a>{' '}
        for how the content is made.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">3. Acceptable use</h2>
      <ul className="list-disc space-y-2 pl-5 text-zinc-300">
        <li>No unlawful, harassing, or rights-violating use of the site or its content.</li>
        <li>No attempt to bypass security or access controls (administrative areas are private).</li>
        <li>No use of the Jifunze name or brand to imply endorsement where none exists.</li>
      </ul>

      <h2 className="mt-8 text-base font-semibold text-white">4. Intellectual property</h2>
      <p>
        The Jifunze name, logo and original content are ours. You may share links to our content
        freely; republishing substantial portions requires permission via the contact address
        below. Third-party names and marks referenced in our content belong to their owners.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">5. Corrections and takedowns</h2>
      <p>
        If something we published is wrong, outdated or infringes your rights, contact us and we
        will review it. Corrections to published items are noted rather than silently rewritten
        where practical.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">6. Limitation of liability</h2>
      <p>
        The site and its content are provided “as is.” To the maximum extent permitted by law,
        Jifunze is not liable for losses arising from reliance on published content or from
        interruption of the site.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">7. Changes</h2>
      <p>
        We may update these Terms as Jifunze evolves. The “Last updated” date above reflects the
        current version; continued use after changes constitutes acceptance unless applicable law
        requires otherwise.
      </p>
    </PolicyChrome>
  )
}
