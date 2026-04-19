import { LegalPageShell } from './LegalPageShell'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { Link } from 'react-router-dom'

export function RefundPolicyPage() {
  return (
    <LegalPageShell title="Refunds & billing" effectiveLabel="Last updated: April 2026 · Applies as payment features go live">
      <p className="lead text-zinc-300">
        This policy explains how refunds, cancellations, and billing disputes are handled as Jifunze enables paid
        subscriptions. Until a card processor is connected, <strong>no automated charges occur</strong>. Review the{' '}
        <Link className="text-violet-300 underline-offset-2 hover:underline" to={LEGAL_ROUTES.terms}>
          Terms
        </Link>{' '}
        and{' '}
        <Link className="text-violet-300 underline-offset-2 hover:underline" to={LEGAL_ROUTES.disclaimer}>
          disclaimer
        </Link>{' '}
        for product boundaries—paying never guarantees learning or career outcomes.
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-100">1. What you are buying</h2>
        <p>
          Paid products may include one-time module access, recurring module/bundle subscriptions, full-library monthly or annual
          access, and discounted variants for eligible email domains—each described on the Plans page and in Stripe receipts.
          Purchases grant software and learning-material access within the stated scope only. They do <strong>not</strong>{' '}
          guarantee exam passage, grades, hiring, publishing, licensing, or certification.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-100">2. Current maturity</h2>
        <p>
          Pricing may be displayed for transparency while checkout is finalised. You will not be charged until you
          complete an authorised checkout flow with a linked payment provider. Until then, you may remain on Free tier
          features subject to limits.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-100">3. Billing cadence</h2>
        <p>
          When billing is live, recurring plans renew on the interval shown at checkout (monthly or yearly). One-time purchases do
          not renew automatically. Taxes, currency conversion, invoicing emails, and receipts depend on the processor and merchant
          configuration—details appear at purchase.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-100">4. Cancellation</h2>
        <p>
          You may cancel renewal from the billing controls once exposed in Settings. Cancellation stops future charges; it
          does not erase prior usage obligations for periods already billed where allowed by law.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-100">5. Refunds</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Erroneous duplicate charges: contact support—we will investigate and correct when verifiable.</li>
          <li>
            One-time module purchases vs subscriptions: eligibility for refunds may differ by product type and timing (e.g.
            consumption of digital materials after delivery). We evaluate requests against the specific SKU and Stripe evidence.
          </li>
          <li>
            Discounted plans (student/team domain gates): misuse of eligibility may void promotional pricing and affect refund
            posture—accounts may be reconciled against checkout metadata.
          </li>
          <li>
            Dissatisfaction without a technical breach: we may offer courtesy credits while policies stabilise; refunds are
            evaluated case-by-case during early billing.
          </li>
          <li>
            Regulatory cooling-off periods may grant automatic rights in your jurisdiction once legal review confirms.
          </li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-100">6. Kenya &amp; USA routing</h2>
        <p>
          Merchant location, GST/VAT handling, M-Pesa vs card rails, ACH, or wire instructions will be documented before
          regional launches. Until then, assume USD card billing through the default processor unless stated otherwise
          at checkout.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-100">7. Charge disputes</h2>
        <p>
          Email <span className="font-mono text-zinc-300">neuralbuildlab.ai@gmail.com</span> before initiating chargebacks
          so we can reconcile invoices quickly.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-100">8. Changes</h2>
        <p>
          We will update this page when billing rules solidify. Major adverse changes will aim for advance notice where
          required.
        </p>
      </section>
    </LegalPageShell>
  )
}
