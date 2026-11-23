import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CookieSettingsButton } from '@/components/CookieConsent'
import { EMAIL, EMAIL_URL, SITE_NAME, SOCIAL_IMAGE } from '@/lib/seo'

const description =
  'Which cookies the TAC Construction website uses, why, how long they last and how to change your cookie choices.'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description,
  alternates: { canonical: '/cookie-policy' },
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: '/cookie-policy',
    siteName: SITE_NAME,
    title: `Cookie Policy | ${SITE_NAME}`,
    description,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Cookie Policy | ${SITE_NAME}`,
    description,
    images: [SOCIAL_IMAGE.url],
  },
}

const cookies = [
  {
    name: 'tac_consent',
    provider: 'TAC Construction (first party)',
    category: 'Necessary',
    purpose:
      'Remembers your cookie choices (analytics and marketing on or off), when you made them and the version of this banner.',
    duration: '6 months',
  },
  {
    name: '_ga',
    provider: 'Google Analytics (first party)',
    category: 'Analytics',
    purpose: 'Distinguishes visitors so we can count visits and see how the website is used.',
    duration: '2 years (some browsers limit this to 400 days)',
  },
  {
    name: '_ga_L8GL08965Y',
    provider: 'Google Analytics (first party)',
    category: 'Analytics',
    purpose: 'Keeps track of your current session for Google Analytics 4.',
    duration: '2 years (some browsers limit this to 400 days)',
  },
]

export default function CookiePolicy() {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <header className="legal-header">
          <div className="legal-header-inner">
            <h1>Cookie Policy</h1>
            <p className="legal-updated">Last updated: 23 November 2026</p>
          </div>
        </header>

        <article className="legal-body">
          <h2>1. What cookies are</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. This policy explains which
            cookies Tac Construction Limited, trading as TAC Construction, uses on this website and how you can
            control them. For how we handle personal data more generally, see our{' '}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>

          <h2>2. How we use cookies</h2>
          <h3>Necessary</h3>
          <p>
            These cookies are required for the website to function, including remembering your cookie choices. They
            are always active and cannot be switched off.
          </p>
          <h3>Analytics</h3>
          <p>
            These cookies help us understand how visitors use our website so we can improve its performance and
            content. They are off by default. Google Tag Manager and Google Analytics are only loaded after you accept
            analytics cookies; until then, no analytics data is sent and no analytics cookies are set.
          </p>
          <h3>Marketing</h3>
          <p>
            These cookies may be used to measure advertising performance and deliver more relevant marketing. They are
            off by default. <strong>We do not currently use any marketing cookies.</strong> If we add them in future,
            we will update this policy and they will only be used with your consent.
          </p>

          <h2>3. Cookies we use</h2>
          <div className="legal-table-wrap">
            <table className="legal-table">
              <thead>
                <tr>
                  <th scope="col">Cookie</th>
                  <th scope="col">Provider</th>
                  <th scope="col">Category</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                {cookies.map((cookie) => (
                  <tr key={cookie.name}>
                    <td>
                      <code>{cookie.name}</code>
                    </td>
                    <td>{cookie.provider}</td>
                    <td>{cookie.category}</td>
                    <td>{cookie.purpose}</td>
                    <td>{cookie.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Google Analytics cookies are set on our own domain by Google Ireland Limited. You can read more in{' '}
            <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">
              Google&rsquo;s cookie information
            </a>
            .
          </p>

          <h2>4. Changing or withdrawing your consent</h2>
          <p>
            You can change your choices at any time. If you withdraw analytics consent, analytics tracking stops
            straight away and the Google Analytics cookies listed above are deleted from this website. Your choice is
            stored for 6 months, after which we ask you again.
          </p>
          <CookieSettingsButton className="legal-settings-button" />
          <p>
            You can also block or delete cookies in your browser settings. Blocking necessary cookies means we cannot
            remember your cookie choice, so the banner will be shown again.
          </p>

          <h2>5. Contact us</h2>
          <p>
            If you have questions about this policy, email <a href={EMAIL_URL}>{EMAIL}</a>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  )
}
