// src/pages/QRHubPage.jsx
// ─── Museum QR Code Hub & On-Site Placard Management Center ─────────────────

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  QrCode,
  Globe,
  Printer,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  ExternalLink,
} from 'lucide-react'
import {
  getAllHeritageDestinations,
  getPublicBaseUrl,
  setPublicBaseUrl,
  resetPublicBaseUrl,
  DEFAULT_PUBLIC_BASE_URL,
} from '../utils/heritageRouting'
import MonumentQRCard from '../components/MonumentQRCard'

export default function QRHubPage() {
  const [baseUrlInput, setBaseUrlInput] = useState('')
  const [activeBaseUrl, setActiveBaseUrl] = useState('')
  const [copiedAll, setCopiedAll] = useState(false)
  const [saveFeedback, setSaveFeedback] = useState(false)
  const [sites, setSites] = useState([])

  useEffect(() => {
    const current = getPublicBaseUrl()
    setActiveBaseUrl(current)
    setBaseUrlInput(current)
    setSites(getAllHeritageDestinations(current))
  }, [])

  const handleSaveBaseUrl = (e) => {
    e?.preventDefault()
    const cleanUrl = baseUrlInput.trim()
    setPublicBaseUrl(cleanUrl)
    const updated = getPublicBaseUrl()
    setActiveBaseUrl(updated)
    setSites(getAllHeritageDestinations(updated))
    setSaveFeedback(true)
    setTimeout(() => setSaveFeedback(false), 2000)
  }

  const handleResetDefault = () => {
    resetPublicBaseUrl()
    const defaultUrl = DEFAULT_PUBLIC_BASE_URL
    setBaseUrlInput(defaultUrl)
    setActiveBaseUrl(defaultUrl)
    setSites(getAllHeritageDestinations(defaultUrl))
  }

  const handlePreset = (url) => {
    setBaseUrlInput(url)
    setPublicBaseUrl(url)
    setActiveBaseUrl(url)
    setSites(getAllHeritageDestinations(url))
    setSaveFeedback(true)
    setTimeout(() => setSaveFeedback(false), 2000)
  }

  const handleCopyAllLinks = async () => {
    const text = sites
      .map((s, idx) => `[0${idx + 1}] ${s.name}: ${s.fullUrl}`)
      .join('\n')

    try {
      await navigator.clipboard.writeText(text)
      setCopiedAll(true)
      setTimeout(() => setCopiedAll(false), 2500)
    } catch {
      setCopiedAll(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#C4A882] selection:text-black">
      {/* ── Top Header ── */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 px-6 md:px-12 py-4 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/60 hover:text-white text-xs tracking-wider transition-colors no-underline font-mono"
          >
            <ArrowLeft size={14} />
            <span>RETURN TO MUSEUM EXPLORER</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded text-xs transition-colors font-mono"
              title="Print all placards for physical display"
            >
              <Printer size={13} />
              <span>PRINT PLACARDS</span>
            </button>

            <button
              onClick={handleCopyAllLinks}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C4A882]/10 hover:bg-[#C4A882]/20 text-[#C4A882] border border-[#C4A882]/30 rounded text-xs transition-colors font-mono"
            >
              {copiedAll ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400">COPIED 8 LINKS</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>COPY ALL URLS</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero / Instructions ── */}
      <section className="py-12 md:py-16 px-6 md:px-12 border-b border-white/10 print:hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#C4A882] uppercase mb-3 font-mono">
            <QrCode size={13} />
            <span>PHYSICAL-TO-DIGITAL HERITAGE NAVIGATION</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            8-Monument QR Navigation Registry
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-3xl leading-relaxed mb-8">
            Every heritage site features a designated QR code configured for physical museum exhibits,
            tourist signage, and printed placards. When scanned by any smartphone camera, visitors are
            instantly directed to that monument&apos;s 3D digital twin and interactive historical notes.
          </p>

          {/* ── Base URL Configuration Box ── */}
          <div className="bg-[#141414] border border-[#C4A882]/30 rounded-xl p-6 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-white tracking-wide mb-1 font-mono">
                  <Globe size={14} className="text-[#C4A882]" />
                  <span>PUBLIC DEPLOYMENT BASE URL</span>
                </div>
                <p className="text-xs text-white/40 font-mono">
                  All 8 QR codes encode this domain. Final museum placards must not use localhost URLs.
                </p>
              </div>

              {/* Presets */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] text-white/30 font-mono uppercase">Presets:</span>
                {typeof window !== 'undefined' &&
                  window.location?.origin &&
                  !window.location.hostname.includes('localhost') &&
                  !window.location.hostname.includes('127.0.0.1') && (
                    <button
                      type="button"
                      onClick={() => handlePreset(window.location.origin)}
                      className="px-2.5 py-1 text-[10px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30 font-mono transition-colors flex items-center gap-1"
                    >
                      <Sparkles size={10} />
                      <span>Use Current Live Domain</span>
                    </button>
                  )}
                <button
                  type="button"
                  onClick={() => handlePreset('https://iks-heritage-explorer.vercel.app')}
                  className="px-2.5 py-1 text-[10px] bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded border border-white/10 font-mono transition-colors"
                >
                  Vercel Default
                </button>
                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="px-2.5 py-1 text-[10px] bg-white/5 hover:bg-white/10 text-[#C4A882] rounded border border-[#C4A882]/20 font-mono transition-colors flex items-center gap-1"
                >
                  <RotateCcw size={10} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSaveBaseUrl} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={baseUrlInput}
                  onChange={(e) => setBaseUrlInput(e.target.value)}
                  placeholder="https://your-public-heritage-domain.com"
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/15 focus:border-[#C4A882] rounded text-xs text-white font-mono outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#C4A882] hover:bg-[#d4b58e] text-black font-semibold text-xs tracking-wider rounded transition-colors font-mono shrink-0 flex items-center justify-center gap-1.5"
              >
                {saveFeedback ? (
                  <>
                    <Check size={13} />
                    <span>APPLIED TO ALL 8</span>
                  </>
                ) : (
                  <span>APPLY TO QR CODES</span>
                )}
              </button>
            </form>

            <div className="mt-3 flex items-center gap-2 text-[11px] text-white/40 font-mono">
              <span className="text-emerald-400">● Live Active Target:</span>
              <span className="text-white/80">{activeBaseUrl}/heritage/[site-slug]</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8 Monument QR Cards Grid ── */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 print:hidden">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                All 8 Heritage Monument Destinations
              </h2>
              <p className="text-xs text-white/40 font-mono mt-1">
                Click VISIT to inspect the 3D twin or SAVE PNG to print an individual placard.
              </p>
            </div>
            <div className="text-xs text-white/30 font-mono">
              8 OF 8 SITES CONFIGURED
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 print:grid-cols-2 print:gap-4">
            {sites.map((site) => (
              <MonumentQRCard
                key={site.id}
                site={site}
                customBaseUrl={activeBaseUrl}
                variant="card"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Print-only header & footer styling ── */}
      <div className="hidden print:block fixed bottom-0 left-0 right-0 p-4 text-center text-black border-t border-gray-300 text-xs font-mono">
        BHARAT · LIVING HERITAGE OF INDIA · IKS HERITAGE EXPLORER · ON-SITE EXHIBIT PLACARDS
      </div>
    </div>
  )
}
