import { PolicyChrome } from './PolicyChrome'

export function RefundsPolicyPage() {
  return (
    <PolicyChrome title="Refunds & billing" eyebrow="Legal">
      <p>
        This policy explains how billing, cancellation, and refunds work as Jifunze introduces paid plans. Until checkout is
        connected to a payment processor, purchases may not be available—pricing pages will indicate when billing is live.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">1. What payment buys</h2>
      <p>
        Paid subscriptions provide access to software features, limits, and support channels according to the plan you
        select. Payment does not guarantee learning results, exam passage, certification, hiring, publication, or any
        external outcome.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">2. Free tier</h2>
      <p>
        Free access may include trials, limited generations, and core learning flows. Limits can change as the product
        evolves; we will communicate material reductions where practical.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">3. Subscription timing</h2>
      <p>
        Subscriptions renew according to the billing interval shown at checkout (monthly or annual when offered). You can
        cancel renewal through the billing portal once enabled; cancellation stops future charges but does not erase past
        obligations for periods already billed unless a refund applies as stated below.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">4. Refunds</h2>
      <ul className="list-disc space-y-2 pl-5 text-zinc-300">
        <li>
          If checkout is enabled, statutory cooling-off or chargeback rules in your region may apply—those rights are in
          addition to any goodwill policy we publish at purchase time.
        </li>
        <li>
          Where no mandatory rule applies, we may offer partial or full refunds for billing errors or service-wide outages
          attributable to Jifunze, evaluated case by case.
        </li>
        <li>
          Refunds typically do not cover dissatisfaction with AI outputs, exam results, or employer decisions—those are
          outside Jifunze’s control by design.
        </li>
      </ul>

      <h2 className="mt-8 text-base font-semibold text-white">5. Taxes &amp; currency</h2>
      <p>
        Prices may be shown in USD or local currency depending on configuration. Taxes, FX fees, and invoicing details will
        follow the merchant of record that ultimately processes payment (to be identified at checkout).
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">6. Regional routing (Kenya &amp; USA)</h2>
      <p>
        We intend to support Kenya and USA customers with appropriate tax and compliance handling. Exact routing (entity,
        processor, payment methods) will be disclosed before you pay; until then, treat pricing screens as informational.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">7. Chargebacks &amp; disputes</h2>
      <p>
        If you dispute a charge, contact support first so we can resolve the issue. Chargebacks may result in account
        suspension pending review.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">8. Contact</h2>
      <p>
        Billing questions should be emailed to the support address shown in the footer. Include your workspace identifier and
        any invoice references once invoicing exists.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">9. Counsel review</h2>
      <p>
        Final merchant terms, refund windows, and regulatory disclosures should be reviewed by counsel before high-volume
        paid traffic.
      </p>
    </PolicyChrome>
  )
}
