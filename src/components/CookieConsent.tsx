'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useDialogFocus } from '@/lib/useDialogFocus'

const GTM_ID = 'GTM-PSXQ26Q4'
const GA4_ID = 'G-L8GL08965Y'
const GTM_SCRIPT_ID = 'tac-gtm'

const CONSENT_COOKIE = 'tac_consent'
const CONSENT_VERSION = 1
// Consent is valid for at most six months; 180 days keeps it inside that limit.
const CONSENT_MAX_AGE_SECONDS = 180 * 24 * 60 * 60
const CONSENT_CHANGE_EVENT = 'tac:consent-change'
export const OPEN_COOKIE_SETTINGS_EVENT = 'tac:open-cookie-settings'

type Consent = { v: number; analytics: boolean; marketing: boolean; ts: number }
type Choices = Pick<Consent, 'analytics' | 'marketing'>

declare global {
  interface Window {
    dataLayer?: unknown[]
    [gaDisable: `ga-disable-${string}`]: boolean | undefined
  }
}

/* ---------- Consent storage (first-party, strictly necessary cookie) ---------- */

function parseConsent(raw: string): Consent | null {
  try {
    const value = JSON.parse(raw) as Consent
    const fresh = Date.now() - value.ts < CONSENT_MAX_AGE_SECONDS * 1000
    const valid =
      value.v === CONSENT_VERSION &&
      typeof value.analytics === 'boolean' &&
      typeof value.marketing === 'boolean' &&
      typeof value.ts === 'number'
    return valid && fresh ? value : null
  } catch {
    return null
  }
}

/** Returns the stored consent record as a string, or '' when none is valid. */
function readConsentSnapshot() {
  const entry = document.cookie.split('; ').find((part) => part.startsWith(`${CONSENT_COOKIE}=`))
  if (!entry) return ''
  const raw = decodeURIComponent(entry.slice(CONSENT_COOKIE.length + 1))
  return parseConsent(raw) ? raw : ''
}

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
}

function saveConsent({ analytics, marketing }: Choices) {
  const record: Consent = { v: CONSENT_VERSION, analytics, marketing, ts: Date.now() }
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(record))}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
}

/* ---------- Google Consent Mode v2 (basic) ---------- */

// Google's gtag() helper: GTM only reads consent commands pushed as an Arguments object.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

let consentDefaultSet = false

function consentState({ analytics, marketing }: Choices) {
  const ads = marketing ? 'granted' : 'denied'
  return {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  }
}

function loadGtm() {
  if (document.getElementById(GTM_SCRIPT_ID)) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const script = document.createElement('script')
  script.id = GTM_SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)
}

/** Expires first-party cookies matching `pattern` on this host and its parent domains. */
function expireCookies(pattern: RegExp) {
  const labels = location.hostname.split('.')
  const domains = ['']
  for (let i = 0; i < labels.length - 1; i++) domains.push(`; domain=.${labels.slice(i).join('.')}`)

  document.cookie
    .split(';')
    .map((part) => part.split('=')[0].trim())
    .filter((name) => pattern.test(name))
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; Path=/${domain}`
      })
    })
}

function applyConsent(choices: Choices) {
  const gtmLoaded = Boolean(document.getElementById(GTM_SCRIPT_ID))

  // Google's documented opt-out flag stops GA4 from sending hits once GTM is already on the page.
  window[`ga-disable-${GA4_ID}`] = !choices.analytics

  // Basic consent mode: nothing reaches Google until analytics is granted.
  if (choices.analytics || gtmLoaded) {
    if (!consentDefaultSet) {
      gtag('consent', 'default', consentState({ analytics: false, marketing: false }))
      consentDefaultSet = true
    }
    gtag('consent', 'update', consentState(choices))
  }

  if (choices.analytics) loadGtm()
  else expireCookies(/^(_ga|_gid|_gat)/)

  if (!choices.marketing) expireCookies(/^(_gcl_|_gac_)/)
}

/* ---------- UI ---------- */

const categories = [
  {
    key: 'analytics' as const,
    title: 'Analytics',
    description:
      'These cookies help us understand how visitors use our website so we can improve its performance and content.',
  },
  {
    key: 'marketing' as const,
    title: 'Marketing',
    description: 'These cookies may be used to measure advertising performance and deliver more relevant marketing.',
  },
]

export default function CookieConsent() {
  // null on the server and during hydration, so returning visitors never see the banner flash.
  const snapshot = useSyncExternalStore(subscribe, readConsentSnapshot, () => null)
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [draft, setDraft] = useState<Choices>({ analytics: false, marketing: false })
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!snapshot) return
    const consent = parseConsent(snapshot)
    if (consent) applyConsent(consent)
  }, [snapshot])

  useEffect(() => {
    const open = () => {
      const current = parseConsent(readConsentSnapshot())
      setDraft({ analytics: current?.analytics ?? false, marketing: current?.marketing ?? false })
      setPrefsOpen(true)
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open)
  }, [])

  useEffect(() => {
    if (!prefsOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [prefsOpen])

  useDialogFocus(prefsOpen, {
    containers: [panelRef],
    initialFocus: closeRef,
    onClose: () => setPrefsOpen(false),
  })

  if (snapshot === null) return null

  const choose = (choices: Choices) => {
    saveConsent(choices)
    setPrefsOpen(false)
  }

  return (
    <>
      {snapshot === '' ? (
        <section className="cookie-banner" role="region" aria-labelledby="cookie-banner-title">
          <h2 id="cookie-banner-title" className="cookie-banner-title">
            Your privacy matters
          </h2>
          <p className="cookie-banner-text">
            We use necessary cookies to keep this website working. With your permission, we also use analytics
            cookies to understand how visitors use our website and improve our services.
          </p>
          <div className="cookie-actions">
            <button type="button" className="cookie-button" onClick={() => choose({ analytics: true, marketing: true })}>
              Accept All
            </button>
            <button type="button" className="cookie-button" onClick={() => choose({ analytics: false, marketing: false })}>
              Reject All
            </button>
            <button
              type="button"
              className="cookie-button cookie-button-secondary"
              aria-haspopup="dialog"
              onClick={() => {
                setDraft({ analytics: false, marketing: false })
                setPrefsOpen(true)
              }}
            >
              Manage Preferences
            </button>
          </div>
        </section>
      ) : null}

      {prefsOpen ? (
        <div className="cookie-prefs-backdrop" onClick={() => setPrefsOpen(false)}>
          <div
            ref={panelRef}
            className="cookie-prefs"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-prefs-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cookie-prefs-header">
              <h2 id="cookie-prefs-title">Cookie preferences</h2>
              <button
                ref={closeRef}
                type="button"
                className="cookie-prefs-close"
                aria-label="Close cookie preferences"
                onClick={() => setPrefsOpen(false)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <ul className="cookie-categories">
              <li className="cookie-category">
                <div className="cookie-category-head">
                  <h3 id="cookie-necessary-title">Necessary</h3>
                  <span className="cookie-always-active">Always active</span>
                </div>
                <p>These cookies are required for the website to function and cannot be switched off.</p>
              </li>
              {categories.map((category) => (
                <li className="cookie-category" key={category.key}>
                  <div className="cookie-category-head">
                    <h3 id={`cookie-${category.key}-title`}>{category.title}</h3>
                    <button
                      type="button"
                      role="switch"
                      className="cookie-switch"
                      aria-checked={draft[category.key]}
                      aria-labelledby={`cookie-${category.key}-title`}
                      aria-describedby={`cookie-${category.key}-description`}
                      onClick={() => setDraft((current) => ({ ...current, [category.key]: !current[category.key] }))}
                    >
                      <span className="cookie-switch-thumb" aria-hidden="true" />
                    </button>
                  </div>
                  <p id={`cookie-${category.key}-description`}>{category.description}</p>
                </li>
              ))}
            </ul>

            <div className="cookie-actions cookie-prefs-actions">
              <button type="button" className="cookie-button cookie-button-secondary" onClick={() => choose(draft)}>
                Save Preferences
              </button>
              <button type="button" className="cookie-button" onClick={() => choose({ analytics: true, marketing: true })}>
                Accept All
              </button>
              <button type="button" className="cookie-button" onClick={() => choose({ analytics: false, marketing: false })}>
                Reject All
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
