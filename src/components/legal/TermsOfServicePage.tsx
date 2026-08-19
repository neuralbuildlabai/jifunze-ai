import { PolicyChrome } from './PolicyChrome'

export function TermsOfServicePage() {
  return (
    <PolicyChrome title="Terms of Service" eyebrow="Legal">
      <p>
        These Terms describe how you may use Jifunze (“we,” “us”). They are written to match the product as
        it exists today. Specific payment, tax, and dispute rules may be refined when billing is connected to a payment
        processor and when counsel reviews regional requirements.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">1. The service</h2>
      <p>
        Jifunze provides assistive learning, revision, and content-support tools. Unless we explicitly state otherwise for a
        particular integration, Jifunze is independent and not affiliated with, endorsed by, or tied to external
        institutions, employers, certification bodies, or exam boards.
      </p>
      <p>
        Use of Jifunze does not guarantee mastery, certification, exam results, job outcomes, publication readiness, grades,
        or professional qualification. You remain responsible for reviewing and validating outputs before relying on them in
        academic, professional, public, or commercial settings.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">2. Accounts &amp; security</h2>
      <p>
        You are responsible for your account credentials and for activity under your account. Self-serve accounts are
        intended for learners who meet the age of digital consent in their region (we surface 16+ guidance in-product as a
        default—verify local rules). Guardians should supervise minors’ use of generated or published content.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">3. Acceptable use</h2>
      <ul className="list-disc space-y-2 pl-5 text-zinc-300">
        <li>No unlawful, harassing, or rights-violating use of the platform.</li>
        <li>No attempt to bypass security, quotas, or access controls.</li>
        <li>No use of the product to imply endorsement by Jifunze or third parties where none exists.</li>
      </ul>

      <h2 className="mt-8 text-base font-semibold text-white">4. Content &amp; outputs</h2>
      <p>
        Generated or assisted outputs may be incorrect, incomplete, or unsuitable for your context. You are responsible for
        fact checking, rights clearance, brand safety, accessibility, and compliance with applicable policies before
        publishing or relying on outputs.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">5. Reliance &amp; limitation</h2>
      <p>
        Features such as readiness indicators, weak-area signals, facilitator aggregates, and insights are heuristic—they are
        not psychometric certifications, surveillance systems, or guarantees of competence. Pair high-stakes preparation with
        official syllabi and human instruction where applicable.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">6. Subscriptions &amp; billing</h2>
      <p>
        Paid plans provide access to platform features according to the plan you purchase. Pricing, taxes, invoicing, and
        refunds are described in our Refunds &amp; billing policy and checkout flows when billing is enabled. Payment does
        not guarantee learning or career outcomes.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">7. Suspension &amp; termination</h2>
      <p>
        We may suspend or terminate access for violations of these Terms, risk to the service or other users, or legal
        requirements. You may stop using Jifunze at any time; provisions that reasonably should survive termination (e.g.,
        intellectual property, limitation concepts described here) remain in effect where applicable.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">8. Changes</h2>
      <p>
        We may update these Terms as the product evolves. Material changes should be communicated in-product or via email
        where practical. Continued use after changes become effective constitutes acceptance unless applicable law requires
        otherwise.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">9. Counsel review</h2>
      <p>
        These Terms aim to be accurate and practical for early production use. Final wording for regulated industries,
        jurisdictions, or enterprise procurement may require legal review.
      </p>
    </PolicyChrome>
  )
}
