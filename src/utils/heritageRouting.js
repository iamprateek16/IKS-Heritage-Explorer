// src/utils/heritageRouting.js
// ─── Central routing and QR code resolution for all 8 heritage sites ────────

import { heritageSites } from '../data/heritage'

// Canonical slug definition for the 8 heritage sites
export const SITE_SLUG_MAP = {
  ajanta: 'ajanta-caves',
  ellora: 'ellora-caves',
  elephanta: 'elephanta-caves',
  'gateway-of-india': 'gateway-of-india',
  'taj-mahal': 'taj-mahal',
  konark: 'konark-sun-temple',
  hampi: 'hampi',
  sanchi: 'sanchi-stupa',
}

// Reverse mapping from slug to site ID
export const SLUG_TO_ID_MAP = Object.entries(SITE_SLUG_MAP).reduce(
  (acc, [id, slug]) => {
    acc[slug] = id
    // also allow direct id as slug fallback
    acc[id] = id
    return acc
  },
  {}
)

// Default production URL for QR codes (configurable via VITE_PUBLIC_URL in Vercel)
export const DEFAULT_PUBLIC_BASE_URL =
  import.meta.env.VITE_PUBLIC_URL || 'https://iks-heritage-explorer.vercel.app'

const LOCAL_STORAGE_KEY = 'iks_heritage_public_base_url'

/**
 * Get current configured public base URL.
 * Order of precedence:
 * 1. Explicit user override in localStorage (from QR Hub UI)
 * 2. VITE_PUBLIC_URL build/environment variable
 * 3. Live browser origin if deployed in production (e.g. *.vercel.app) and not localhost
 * 4. Fallback default Vercel domain
 */
export function getPublicBaseUrl() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved && saved.trim()) {
      return saved.trim().replace(/\/+$/, '')
    }

    // If running live on Vercel or custom domain in a browser, use origin directly
    if (
      window.location &&
      window.location.origin &&
      !window.location.hostname.includes('localhost') &&
      !window.location.hostname.includes('127.0.0.1') &&
      !window.location.hostname.includes('[::1]')
    ) {
      return window.location.origin.replace(/\/+$/, '')
    }
  }

  const envUrl = import.meta.env.VITE_PUBLIC_URL
  if (envUrl && envUrl.trim()) {
    return envUrl.trim().replace(/\/+$/, '')
  }

  return DEFAULT_PUBLIC_BASE_URL.replace(/\/+$/, '')
}

/**
 * Save custom public base URL to localStorage
 */
export function setPublicBaseUrl(url) {
  if (typeof window !== 'undefined') {
    if (!url || !url.trim()) {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, url.trim().replace(/\/+$/, ''))
    }
  }
}

/**
 * Reset base URL to default production domain
 */
export function resetPublicBaseUrl() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }
}

/**
 * Get canonical slug for a heritage site
 */
export function getSiteSlug(siteOrId) {
  if (!siteOrId) return ''
  const id = typeof siteOrId === 'string' ? siteOrId : siteOrId.id
  return SITE_SLUG_MAP[id] || id
}

/**
 * Get internal React Router path for a site (e.g. "/heritage/ajanta-caves")
 */
export function getSitePath(siteOrIdOrSlug) {
  const slug = getSiteSlug(siteOrIdOrSlug)
  return `/heritage/${slug}`
}

/**
 * Lookup site object by slug or id
 */
export function getSiteBySlugOrId(slugOrId) {
  if (!slugOrId) return null
  const normalized = slugOrId.toLowerCase().trim()
  const siteId = SLUG_TO_ID_MAP[normalized] || normalized

  return (
    heritageSites.find(
      (s) =>
        s.id.toLowerCase() === siteId ||
        SITE_SLUG_MAP[s.id] === normalized ||
        s.id.toLowerCase() === normalized
    ) || null
  )
}

/**
 * Generate full public destination URL encoded into QR codes
 * e.g. "https://iks-heritage.web.app/heritage/ajanta-caves"
 */
export function getFullDestinationUrl(siteOrSlug, customBaseUrl) {
  const slug =
    typeof siteOrSlug === 'string'
      ? getSiteSlug(siteOrSlug)
      : getSiteSlug(siteOrSlug?.id)
  const base = (customBaseUrl || getPublicBaseUrl()).replace(/\/+$/, '')
  return `${base}/heritage/${slug}`
}

/**
 * Get all 8 destination sites with precomputed slug, path, and QR URL
 */
export function getAllHeritageDestinations(customBaseUrl) {
  return heritageSites.map((site, index) => {
    const slug = getSiteSlug(site.id)
    const path = `/heritage/${slug}`
    const fullUrl = getFullDestinationUrl(site.id, customBaseUrl)
    return {
      ...site,
      slug,
      path,
      fullUrl,
      number: index + 1,
    }
  })
}
