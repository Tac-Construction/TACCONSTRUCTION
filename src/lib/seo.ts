export const SITE_URL = 'https://tacconstruction.ie'
export const SITE_NAME = 'T.A.C Construction'
export const DEFAULT_TITLE = 'T.A.C Construction | Dublin Renovation & Building Specialists'
export const DEFAULT_DESCRIPTION =
  'Residential renovation, heating, plumbing, roofing and general construction services from T.A.C Construction.'

export const PHONE_DISPLAY = '+353 85 197 6302'
export const PHONE_URL = 'tel:+353851976302'
export const EMAIL = 'info@tacconstruction.ie'
export const EMAIL_URL = `mailto:${EMAIL}`

export const SOCIAL_IMAGE = {
  url: '/images/Logo.png',
  width: 1594,
  height: 528,
  alt: SITE_NAME,
}

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString()
}
