import { PublicSocialLinks } from '../PublicSocialLinks'
import { Eyebrow, Section } from './mediaUi'
import { OFFICIAL_SOCIAL_ACCOUNTS } from '../../social/socialAccounts'
import { BRAND_DISPLAY_NAME, BRAND_SITE_NAME, PUBLIC_CONTACT_EMAIL } from '../../social/brand'
import { organizationJsonLd, usePageMeta } from '../../social/seo'

export function SocialDirectoryPage() {
  usePageMeta({
    title: `Official accounts — ${BRAND_SITE_NAME}`,
    description: `The complete list of official ${BRAND_DISPLAY_NAME} social accounts. Anything not listed here is not us.`,
    path: '/social',
    jsonLd: organizationJsonLd(),
  })

  return (
    <Section className="py-14 sm:py-16">
      <Eyebrow>Official accounts</Eyebrow>
      <h1 className="mt-3 text-[30px] font-extrabold tracking-tight sm:text-[38px]">
        Where to follow {BRAND_DISPLAY_NAME}
      </h1>
      <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-zinc-300">
        These {OFFICIAL_SOCIAL_ACCOUNTS.length} accounts are the only ones that belong to{' '}
        {BRAND_SITE_NAME}. If an account claims to be us and is not on this list, it is not us —
        tell us at{' '}
        <a
          className="rounded underline decoration-white/25 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
          href={`mailto:${PUBLIC_CONTACT_EMAIL}`}
        >
          {PUBLIC_CONTACT_EMAIL}
        </a>
        .
      </p>

      <PublicSocialLinks variant="cards" className="mt-9" label="Official Jifunze accounts" />

      <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-[15px] font-semibold text-white">A note on what is not here</h2>
        <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-zinc-400">
          <li>
            There is no {BRAND_SITE_NAME} WhatsApp channel or Telegram channel yet. If one is
            created it will be listed here first.
          </li>
          <li>
            {BRAND_SITE_NAME} will never ask you to pay a fee to apply for a job, and will never DM
            you a job offer you did not apply for.
          </li>
        </ul>
      </div>
    </Section>
  )
}
