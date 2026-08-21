import { PolicyChrome } from './PolicyChrome'

export function PrivacyPolicyPage() {
  return (
    <PolicyChrome title="Privacy Policy" eyebrow="Legal">
      <p>
        This policy explains what information the Jifunze website processes. The short version:
        this is a content site — there are no visitor accounts, no signup forms and no tracking
        pixels, and we collect as little as possible.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">1. Website visitors</h2>
      <ul className="list-disc space-y-2 pl-5 text-zinc-300">
        <li>
          <span className="font-medium text-zinc-200">No accounts:</span> visitors cannot register
          on this site, and we do not collect names, emails or profiles from readers.
        </li>
        <li>
          <span className="font-medium text-zinc-200">Technical data:</span> our hosting provider
          processes standard request logs (IP address, user agent) for security and reliability.
          Fonts and assets are served from our own domain, so page views are not leaked to
          third-party CDNs.
        </li>
        <li>
          <span className="font-medium text-zinc-200">No advertising trackers:</span> we do not run
          third-party advertising or analytics scripts on this site.
        </li>
      </ul>

      <h2 className="mt-8 text-base font-semibold text-white">2. Social channels</h2>
      <p>
        When you follow or interact with Jifunze on Instagram or any other platform, that
        platform's own privacy policy governs what it collects. We see only the engagement data
        platforms make available to account owners (for example public like and view counts), and
        we use it to understand what content is useful.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">3. Email</h2>
      <p>
        If you email us, we keep the correspondence for as long as needed to handle your request.
        We do not add you to any mailing list — none exists.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">4. Administrators</h2>
      <p>
        The private administrative area used to run Jifunze processes administrator account data
        (email, authentication identifiers, action logs) for the sole purpose of operating the
        platform. It is invite-only and not available to the public.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">5. Your rights</h2>
      <p>
        Depending on your region you may have rights to access, correct or delete personal data.
        Given how little this site collects, the practical route for any request is the contact
        address below — we will act on it directly.
      </p>

      <h2 className="mt-8 text-base font-semibold text-white">6. Changes</h2>
      <p>
        We will update this policy if what we collect ever changes, and the “Last updated” date
        above will reflect it.
      </p>
    </PolicyChrome>
  )
}
