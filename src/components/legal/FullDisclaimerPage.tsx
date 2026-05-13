import { LegalPageShell } from './LegalPageShell'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES, TRUST_COPY } from '../../training/trustCopy'
import { MENTAL_WELLBEING_RESET_DISCLAIMER } from '../../data/learning/mentalWellbeingResetMicrolearningPageCopy'
import { Link } from 'react-router-dom'

/**
 * Canonical full disclaimer — links to Terms / Privacy / Refunds for contractual detail.
 */
export function FullDisclaimerPage() {
  return (
    <LegalPageShell title="Product disclaimer" effectiveLabel="Effective: product guidance for Jifunze.ai users">
      <p className="rounded-xl border border-amber-500/25 bg-amber-950/20 px-4 py-3 text-[13px] leading-relaxed text-zinc-300 ring-1 ring-amber-500/10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200/95">
          Independent learning &amp; content support · assistive tools only
        </span>
        <span className="mt-3 block">{TRUST_COPY.affiliationNoGuaranteeFinePrint}</span>
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-100">How this fits with our policies</h2>
        <p>
          This disclaimer summarizes product boundaries so you can decide how to use assistive outputs responsibly.{' '}
          <strong>It does not replace</strong>{' '}
          <Link className="text-violet-300 underline-offset-2 hover:underline" to={LEGAL_ROUTES.terms}>
            Terms of Service
          </Link>
          ,{' '}
          <Link className="text-violet-300 underline-offset-2 hover:underline" to={LEGAL_ROUTES.privacy}>
            Privacy Policy
          </Link>
          , or{' '}
          <Link className="text-violet-300 underline-offset-2 hover:underline" to={LEGAL_ROUTES.refunds}>
            Refunds &amp; billing
          </Link>
          , which contain additional rules and limitations for accounts, data, subscriptions, and acceptable use.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-100">Wellbeing and educational courses</h2>
        <p className="text-sm leading-relaxed text-zinc-300">
          Jifunze.ai courses are designed for learning and skill-building. Wellbeing-style content supports everyday habits and
          reflection — it is <strong>not</strong> medical advice, therapy, diagnosis, or emergency support. When you need clinical care or
          are in crisis, contact a qualified professional or your local emergency services.
        </p>
        <p className="text-sm leading-relaxed text-zinc-400">{MENTAL_WELLBEING_RESET_DISCLAIMER}</p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-100">Outputs require human judgment</h2>
        <p>
          Generated text, drafts, summaries, rehearsal feedback, readiness indicators, and facilitator aggregates are{' '}
          <strong>assistive signals</strong>. You remain responsible for reviewing accuracy, bias, confidentiality,
          citation, accessibility, licensing, regulatory compliance, and suitability before academic, workplace,
          public-facing, paid, safety-critical, or regulated use.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-100">Subscriptions do not imply outcomes</h2>
        {LEARNER_MONETIZATION_UI_DISABLED ? (
          <p>
            When paid tiers return, access will add features and limits according to your plan; it will not guarantee grades, credentials,
            employment, publication acceptance, or exam passage. Public checkout is not active in this release.
          </p>
        ) : (
          <p>
            Paying for access adds features and limits according to your plan; it does not guarantee grades, credentials,
            employment, publication acceptance, or exam passage. Compare{' '}
            <Link className="text-violet-300 underline-offset-2 hover:underline" to={LEGAL_ROUTES.pricing}>
              public pricing
            </Link>{' '}
            and workspace-specific controls under{' '}
            <Link className="text-violet-300 underline-offset-2 hover:underline" to={LEGAL_ROUTES.workspaceSubscription}>
              Plans &amp; subscription
            </Link>
            .
          </p>
        )}
      </section>
    </LegalPageShell>
  )
}
