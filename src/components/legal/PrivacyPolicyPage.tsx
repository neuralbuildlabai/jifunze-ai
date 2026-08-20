import { PolicyChrome } from './PolicyChrome'

export function PrivacyPolicyPage() {
  return (
    <PolicyChrome title="Privacy Policy" eyebrow="Legal">
      <p>
        This Privacy Policy explains what information Jifunze processes to operate the service, how we use it, and the
        choices available to you. Regional privacy laws may impose additional rights—where they conflict, local law controls
        for residents of those regions.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">1. Information we collect</h2>
      <ul className="list-disc space-y-2 pl-5 text-zinc-300">
        <li>
          <span className="font-medium text-zinc-200">Account data:</span> email address, authentication identifiers, and
          profile basics needed to operate login and workspace membership.
        </li>
        <li>
          <span className="font-medium text-zinc-200">Workspace &amp; learning data:</span> brands/tenants you belong to,
          training progress, quiz attempts (including summaries used for remediation), facilitator-visible aggregates where
          enabled, and derived assets you generate or save.
        </li>
        <li>
          <span className="font-medium text-zinc-200">Content you submit:</span> prompts, topics, uploads, and generated
          outputs stored to provide features (e.g., drafts, revision sheets, captions).
        </li>
        <li>
          <span className="font-medium text-zinc-200">Technical data:</span> logs and diagnostics necessary for security,
          reliability, and abuse prevention (e.g., error references, coarse usage signals).
        </li>
      </ul>

      <h2 className="mt-8 text-base font-semibold text-white">2. How we use information</h2>
      <p>We use data to:</p>
      <ul className="list-disc space-y-2 pl-5 text-zinc-300">
        <li>Provide, secure, and improve product features (including heuristic coaching signals).</li>
        <li>Maintain workspace isolation with configured access controls (RLS remains authoritative at the database layer).</li>
        <li>Communicate service updates, billing notices when enabled, and support responses.</li>
        <li>Detect fraud, spam, or harmful activity.</li>
      </ul>

      <h2 className="mt-8 text-base font-semibold text-white">3. Workspace &amp; team visibility</h2>
      <p>
        Some features expose aggregate or role-scoped insight to facilitators or admins (for example, cohort weak-label
        patterns). Facilitator insight is designed to avoid raw learner answers by default; verify your tenant configuration
        for any custom exports or integrations.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">4. Website visitors and social channels</h2>
      <p>
        You can read everything on the public part of this site — the homepage, the content hub, the individual lessons,
        the topic pages and the account directory — without an account, and we do not ask you to identify yourself to do
        it. We do not run third-party advertising or tracking pixels on those pages, and the site&rsquo;s typeface is served
        from this domain rather than a font CDN, so simply reading a lesson does not hand your IP address to another
        company.
      </p>
      <p>
        Jifunze.ai also publishes the same lessons on its own social accounts, which are listed in full at{' '}
        <a className="underline decoration-white/25 underline-offset-4 hover:text-white" href="/social">/social</a>. If you
        follow, watch or interact with us there, that happens on the platform, under the platform&rsquo;s own privacy policy
        and settings, not ours. We can see only what that platform shows any account owner.
      </p>
      <p>
        To understand how our content performs we record <strong>aggregate</strong> figures returned by those platforms&rsquo;
        official APIs — for example a follower count, a view count, or the number of likes on a post. These are totals
        about a post or an account. We do not request, receive or store a list of who viewed, liked, followed or shared,
        and we do not build a profile of any individual from them.
      </p>
      <p>
        We do not buy audience data, and we do not combine anything from a social platform with anything you may have
        given us as a learner.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">5. Analytics</h2>
      <p>
        We may use first-party operational telemetry to understand reliability and feature usage. If third-party analytics
        are introduced, we will describe them here and provide appropriate controls where required.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">6. Retention</h2>
      <p>
        We retain information as long as needed to provide the service, comply with law, resolve disputes, and enforce our
        agreements. Exact retention windows may depend on workspace settings and future data lifecycle tooling.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">7. Your choices &amp; rights</h2>
      <p>
        Depending on your region, you may have rights to access, correct, delete, or export personal data, and to object to
        certain processing. Contact us at the email below to exercise rights or ask questions. We may need to verify your
        request and workspace membership.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">8. International transfers</h2>
      <p>
        Our infrastructure or subprocessors may process data in multiple regions. Where required, we will implement
        appropriate safeguards and describe them in updates to this policy.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">9. Children</h2>
      <p>
        Jifunze is not directed at children under the age of digital consent. Guardians are responsible for minors’ use of the
        product and any outputs they publish.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">10. Counsel review</h2>
      <p>
        This policy is meant to be transparent and practical for current functionality. A formal privacy program for
        regulated industries may require additional measures (DPA, subprocessors list, regional addenda).
      </p>
    </PolicyChrome>
  )
}
