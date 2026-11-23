import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { EMAIL, EMAIL_URL, PHONE_DISPLAY, PHONE_URL, SITE_NAME, SITE_URL, SOCIAL_IMAGE } from '@/lib/seo'

const description =
  'How Tac Construction Limited (TAC Construction) collects, uses and protects personal data when you use this website or contact us.'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description,
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: '/privacy-policy',
    siteName: SITE_NAME,
    title: `Privacy Policy | ${SITE_NAME}`,
    description,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Privacy Policy | ${SITE_NAME}`,
    description,
    images: [SOCIAL_IMAGE.url],
  },
}

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <header className="legal-header">
          <div className="legal-header-inner">
            <h1>Privacy Policy</h1>
            <p className="legal-updated">Last updated: 23 November 2026</p>
          </div>
        </header>

        <article className="legal-body">
          <h2>1. Who we are</h2>
          <p>
            This website, <a href={SITE_URL}>tacconstruction.ie</a>, is operated by Tac Construction Limited, trading
            as TAC Construction (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). We are the data controller
            for the personal data described in this policy.
          </p>
          <address className="legal-contact">
            <strong>Tac Construction Limited</strong>
            <br />
            Company registration number (CRO): 790341
            <br />
            Registered address: 111 O&rsquo;Hogan Road, Ballyfermot, Dublin, D10 KN36, Ireland
            <br />
            Email: <a href={EMAIL_URL}>{EMAIL}</a>
            <br />
            Phone: <a href={PHONE_URL}>{PHONE_DISPLAY}</a>
          </address>
          <p>The registered address above is our company registration address for legal correspondence.</p>

          <h2>2. Information we collect</h2>
          <h3>When you contact us directly</h3>
          <p>
            If you phone, email or message us on WhatsApp, we receive the information you choose to share, such as
            your name, phone number, email address and details about your project.
          </p>

          <h3>The enquiry form on our Contact page</h3>
          <p>
            The enquiry form on our Contact page is not currently connected to any system.{' '}
            <strong>Information you type into it is not sent to us, stored by us or shared with anyone.</strong> To
            make an enquiry, please contact us by phone, email or WhatsApp. We will update this policy before the form
            begins sending enquiries.
          </p>

          <h3>Analytics data (only with your consent)</h3>
          <p>
            If you accept analytics cookies, we use Google Analytics 4, loaded through Google Tag Manager, to
            understand how visitors use our website. This can include the pages you visit, how you arrived at the
            site, your device and browser type, an approximate location derived from your IP address, and
            pseudonymous identifiers stored in cookies. If you do not accept analytics cookies, Google Tag Manager and
            Google Analytics are not loaded. See our <Link href="/cookie-policy">Cookie Policy</Link> for details.
          </p>

          <h3>Technical data</h3>
          <p>
            When you visit the website, our hosting provider processes technical information such as your IP address,
            browser type and the pages requested, so that the website can be delivered and kept secure.
          </p>

          <h2>3. How we use your information and our legal basis</h2>
          <ul>
            <li>
              <strong>Responding to enquiries and preparing quotes:</strong> to take steps at your request before
              entering into a contract, and our legitimate interest in replying to people who contact us.
            </li>
            <li>
              <strong>Website analytics:</strong> your consent, which you can withdraw at any time. Consent for
              non-essential cookies is also required under the European Communities (Electronic Communications
              Networks and Services) (Privacy and Electronic Communications) Regulations 2011.
            </li>
            <li>
              <strong>Operating and securing the website:</strong> our legitimate interest in providing a working,
              secure website.
            </li>
            <li>
              <strong>Legal obligations:</strong> where we must keep records, for example for tax and accounting.
            </li>
          </ul>
          <p>We do not sell your personal data and we do not use it for automated decision-making.</p>

          <h2>4. Who we share it with</h2>
          <ul>
            <li>
              <strong>Google Ireland Limited</strong> provides Google Analytics and Google Tag Manager. Data is shared
              with Google only if you accept analytics cookies.
            </li>
            <li>
              <strong>Vercel Inc.</strong> hosts this website and processes technical data to deliver it.
            </li>
            <li>
              <strong>WhatsApp (Meta)</strong>, if you choose to contact us through WhatsApp. WhatsApp&rsquo;s own
              privacy policy applies to messages sent through its service.
            </li>
            <li>
              <strong>Our email and telephone service providers</strong>, when you contact us by email or phone.
            </li>
          </ul>

          <h2>5. International transfers</h2>
          <p>
            Some of these providers may process data outside the European Economic Area, including in the United
            States. Where this happens, the transfer is protected by appropriate safeguards, such as the EU&ndash;U.S.
            Data Privacy Framework or the European Commission&rsquo;s Standard Contractual Clauses.
          </p>

          <h2>6. How long we keep it</h2>
          <ul>
            <li>
              <strong>Enquiries:</strong> for as long as needed to respond and, if you become a customer, for the
              duration of the project and any period required by law, such as for tax and accounting records.
            </li>
            <li>
              <strong>Analytics data:</strong> for the data retention period set in our Google Analytics account,
              after which it is deleted automatically.
            </li>
            <li>
              <strong>Your cookie choice:</strong> for 6 months, after which we ask again.
            </li>
          </ul>

          <h2>7. Your rights</h2>
          <p>Under the General Data Protection Regulation (GDPR), you have the right to:</p>
          <ul>
            <li>access the personal data we hold about you;</li>
            <li>have inaccurate data corrected;</li>
            <li>have your data erased;</li>
            <li>restrict or object to how we use your data;</li>
            <li>receive your data in a portable format;</li>
            <li>withdraw your consent at any time, without affecting processing carried out before withdrawal.</li>
          </ul>
          <p>
            To exercise any of these rights, email <a href={EMAIL_URL}>{EMAIL}</a>. You can change your cookie choices
            at any time using the Cookie Settings link in the website footer.
          </p>
          <p>
            You also have the right to complain to the Data Protection Commission, Ireland&rsquo;s supervisory
            authority, at{' '}
            <a href="https://www.dataprotection.ie" target="_blank" rel="noopener noreferrer">
              www.dataprotection.ie
            </a>
            .
          </p>

          <h2>8. Changes to this policy</h2>
          <p>
            We may update this policy, for example when we connect the enquiry form or change the tools we use. The
            date at the top of this page shows when it was last updated.
          </p>
        </article>
      </main>
      <Footer />
    </>
  )
}
