// src/pages/HeritageSitePage.jsx
// ─── Dedicated destination page for each of the 8 Indian Heritage Sites ──────
// Accessible at /heritage/:slug (e.g. /heritage/ajanta-caves, /heritage/ellora-caves, etc.)

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Box,
  MapPin,
  Award,
  Clock,
  Compass,
  QrCode,
  Share2,
  ChevronDown,
  ExternalLink,
  Check,
} from 'lucide-react'
import { heritageSites } from '../data/heritage'
import {
  getSiteBySlugOrId,
  getSitePath,
  getFullDestinationUrl,
  getAllHeritageDestinations,
  getPublicBaseUrl,
} from '../utils/heritageRouting'
import HeritageModelViewer from '../components/HeritageModelViewer'
import MonumentQRCard from '../components/MonumentQRCard'
import IndiaHeritageMap from '../components/IndiaHeritageMap'

export default function HeritageSitePage() {
  const { slug } = useParams()
  const [site, setSite] = useState(null)
  const [allSites, setAllSites] = useState([])
  const [showQRModal, setShowQRModal] = useState(false)
  const [siteDropdownOpen, setSiteDropdownOpen] = useState(false)

  // Resolve site
  useEffect(() => {
    const matched = getSiteBySlugOrId(slug)
    setSite(matched)
    setAllSites(getAllHeritageDestinations())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  if (!site) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-8 text-center">
        <div
          className="text-xs tracking-[0.3em] text-[#C4A882] mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          [ 404 NOT FOUND ]
        </div>
        <h1 className="text-3xl font-light mb-4 tracking-tight">Heritage Site Not Found</h1>
        <p className="text-white/40 max-w-md text-sm mb-8 leading-relaxed">
          The requested monument URL <code className="text-[#C4A882]">/heritage/{slug}</code> does
          not match our 8 registered heritage sites.
        </p>
        <div className="flex flex-wrap gap-3 justify-center max-w-xl mb-10">
          {heritageSites.map((s) => (
            <Link
              key={s.id}
              to={getSitePath(s)}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 rounded text-xs transition-colors no-underline"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {s.name} →
            </Link>
          ))}
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-[#C4A882] hover:underline"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <ArrowLeft size={14} /> Return to Main Museum
        </Link>
      </div>
    )
  }

  // Find previous and next sites for sequential navigation
  const currentIndex = allSites.findIndex((s) => s.id === site.id)
  const prevSite =
    allSites[(currentIndex - 1 + allSites.length) % allSites.length]
  const nextSite = allSites[(currentIndex + 1) % allSites.length]
  const fullPublicUrl = getFullDestinationUrl(site)

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#C4A882] selection:text-black">
      {/* ── Top Navigation Bar ── */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Back & Logo */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-white/60 hover:text-white text-xs tracking-wider transition-colors no-underline"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">EXPLORER HOME</span>
            </Link>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div className="relative">
              <button
                onClick={() => setSiteDropdownOpen((v) => !v)}
                className="flex items-center gap-2 text-xs tracking-wider text-white/90 hover:text-white py-1 px-2.5 rounded bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="text-[#C4A882] font-semibold">
                  SITE [0{currentIndex + 1}]
                </span>
                <span className="hidden md:inline font-medium">{site.name}</span>
                <ChevronDown size={13} className={`transition-transform ${siteDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Site Dropdown */}
              <AnimatePresence>
                {siteDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 mt-2 w-72 bg-[#141414] border border-white/10 rounded-lg shadow-2xl py-2 z-50"
                  >
                    <div className="px-3 py-1.5 text-[9px] tracking-[0.2em] text-white/30 uppercase border-b border-white/5" style={{ fontFamily: 'var(--font-mono)' }}>
                      All 8 Heritage Monuments
                    </div>
                    {allSites.map((s, idx) => (
                      <Link
                        key={s.id}
                        to={s.path}
                        onClick={() => setSiteDropdownOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 text-xs no-underline transition-colors ${
                          s.id === site.id
                            ? 'bg-[#C4A882]/10 text-[#C4A882] font-medium'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="truncate">{s.name}</span>
                        <span className="text-[10px] text-white/30 font-mono">0{idx + 1}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Actions: QR code & Hub */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowQRModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C4A882]/10 hover:bg-[#C4A882]/20 text-[#C4A882] border border-[#C4A882]/30 rounded text-xs transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <QrCode size={13} />
              <span>ON-SITE QR</span>
            </button>

            <Link
              to="/qr-hub"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 rounded text-xs transition-colors no-underline"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <Share2 size={13} />
              <span className="hidden sm:inline">QR HUB</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Monument Hero Banner ── */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 px-6 md:px-12 border-b border-white/10">
        {/* Background Image with Ambient Glow */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src={site.imagePath || site.image}
            alt={site.name}
            className="w-full h-full object-cover filter blur-md scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/90" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="px-2.5 py-1 text-[9px] tracking-[0.25em] text-[#C4A882] bg-[#C4A882]/10 border border-[#C4A882]/20 rounded-sm"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {site.heritage.toUpperCase()}
            </span>
            <span
              className="px-2.5 py-1 text-[9px] tracking-[0.2em] text-white/50 bg-white/5 border border-white/10 rounded-sm"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {site.type.toUpperCase()}
            </span>
            {site.unescoInscriptionYear && (
              <span
                className="px-2.5 py-1 text-[9px] tracking-[0.15em] text-white/40 border border-white/5 rounded-sm"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                UNESCO INSCRIBED {site.unescoInscriptionYear}
              </span>
            )}
          </div>

          {/* Title & Headline */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.05]"
            style={{ letterSpacing: '-0.02em' }}
          >
            {site.name}
          </h1>

          {site.alternateName && (
            <p
              className="text-xs md:text-sm text-[#C4A882]/80 tracking-widest uppercase mb-6 font-mono"
            >
              Known as: {site.alternateName}
            </p>
          )}

          <p className="text-base md:text-xl text-white/70 max-w-3xl leading-relaxed mb-8 font-light">
            {site.description}
          </p>

          {/* Quick info row */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-white/50 pt-6 border-t border-white/10 font-mono">
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-[#C4A882]" />
              <span>{site.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-[#C4A882]" />
              <span>{site.period}</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass size={13} className="text-[#C4A882]" />
              <span>
                {site.coordinates.lat.toFixed(4)}° N, {site.coordinates.lng.toFixed(4)}° E
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Interactive Section: 3D Model Explorer ── */}
      <section id="model-section" className="py-16 md:py-24 px-6 md:px-12 bg-[#0E0E0E] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <div
                className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#C4A882] mb-2 uppercase"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <Box size={12} />
                <span>INTERACTIVE 3D DIGITAL TWIN</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
                Inspect 3D Geometry & Architectural Form
              </h2>
            </div>
            <p className="text-xs text-white/40 max-w-md font-mono">
              Rendered in real-time from the monument&apos;s authentic 3D model asset.
              Rotate, zoom, and examine rock-cut carvings and structural symmetry.
            </p>
          </div>

          {/* 3D Canvas Container */}
          <div className="relative aspect-[16/10] md:aspect-[21/10] w-full bg-black/60 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            {site.modelPath ? (
              <HeritageModelViewer
                modelPath={site.modelPath}
                title={`${site.name} 3D Model`}
                location={site.location}
                period={site.periodShort || site.period}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-white/40 font-mono text-sm">
                3D model coming soon
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── On-Site QR Access & Physical Placard Section ── */}
      <section id="qr-section" className="py-16 md:py-20 px-6 md:px-12 bg-[#0A0A0A] border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div
              className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#C4A882] mb-3 uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <QrCode size={12} />
              <span>HERITAGE QR NAVIGATION SPECIFICATION</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4">
              Physical Museum Placard & On-Site Access
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              This unique QR code connects physical on-site visitors, museum placards, and tourist guideboards
              directly to this dedicated digital twin page.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3 p-3.5 bg-white/5 border border-white/10 rounded-lg">
                <div className="p-1.5 bg-[#C4A882]/10 rounded text-[#C4A882] mt-0.5">
                  <Check size={14} />
                </div>
                <div>
                  <div className="text-xs font-medium text-white">Full Public Destination URL</div>
                  <div className="text-[11px] text-white/50 font-mono break-all mt-0.5">
                    {fullPublicUrl}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white/5 border border-white/10 rounded-lg">
                <div className="p-1.5 bg-[#C4A882]/10 rounded text-[#C4A882] mt-0.5">
                  <Check size={14} />
                </div>
                <div>
                  <div className="text-xs font-medium text-white">No Localhost Reliance</div>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    Configured with public production routing ({getPublicBaseUrl()}) so codes remain valid on smartphones and print placards.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowQRModal(true)}
                className="px-5 py-2.5 bg-[#C4A882] hover:bg-[#d6b993] text-black font-semibold text-xs tracking-wider rounded transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                OPEN QR PLACARD
              </button>

              <Link
                to="/qr-hub"
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs tracking-wider rounded transition-colors no-underline flex items-center gap-2"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span>VIEW ALL 8 SITE CODES</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <MonumentQRCard site={site} variant="placard" />
          </div>
        </div>
      </section>

      {/* ── Deep History & Architecture (IKS Content) ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#0E0E0E] border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Comprehensive Text */}
          <div className="lg:col-span-7 space-y-12">
            {/* Historical Background */}
            {site.historicalBackground && (
              <div>
                <div
                  className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#C4A882] mb-4 pb-2 border-b border-white/10 uppercase"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <Clock size={12} />
                  <span>HISTORICAL BACKGROUND & CHRONOLOGY</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-white mb-4">
                  The Genesis of {site.name}
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {site.historicalBackground}
                </p>
              </div>
            )}

            {/* Architecture & Engineering */}
            {site.architecture && (
              <div>
                <div
                  className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#C4A882] mb-4 pb-2 border-b border-white/10 uppercase"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <Box size={12} />
                  <span>ARCHITECTURE & INDIAN KNOWLEDGE SYSTEMS (IKS)</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-white mb-4">
                  Structural Marvel & Ancient Craftsmanship
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {site.architecture}
                </p>
              </div>
            )}

            {/* Cultural Significance */}
            {site.culturalSignificance && (
              <div>
                <div
                  className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#C4A882] mb-4 pb-2 border-b border-white/10 uppercase"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <Award size={12} />
                  <span>CULTURAL SIGNIFICANCE & HERITAGE IMPACT</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-white mb-4">
                  Spiritual and Architectural Legacy
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {site.culturalSignificance}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Quick Facts & Mini Map */}
          <div className="lg:col-span-5 space-y-10">
            {/* Quick Facts Box */}
            <div className="bg-[#141414] border border-white/10 rounded-xl p-6">
              <div
                className="text-[9px] tracking-[0.25em] text-[#C4A882] mb-4 uppercase"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                SPECIFICATIONS & KEY METRICS
              </div>

              <div className="divide-y divide-white/5">
                <div className="py-2.5 flex justify-between items-center text-xs">
                  <span className="text-white/40 font-mono">Monument Name</span>
                  <span className="text-white font-medium text-right">{site.name}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center text-xs">
                  <span className="text-white/40 font-mono">Location</span>
                  <span className="text-white font-medium text-right">{site.location}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center text-xs">
                  <span className="text-white/40 font-mono">Historical Era</span>
                  <span className="text-white font-medium text-right">{site.period}</span>
                </div>
                {site.quickFacts?.map((fact) => (
                  <div key={fact.label} className="py-2.5 flex justify-between items-center text-xs">
                    <span className="text-white/40 font-mono">{fact.label}</span>
                    <span className="text-white font-medium text-right">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monument Location Map */}
            <div className="bg-[#141414] border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="text-[9px] tracking-[0.25em] text-[#C4A882] uppercase"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  GEOGRAPHIC COORDINATES
                </div>
                <span className="text-[10px] text-white/40 font-mono">
                  {site.coordinates.lat.toFixed(4)}°, {site.coordinates.lng.toFixed(4)}°
                </span>
              </div>

              <IndiaHeritageMap
                height="256px"
                singleSite={site}
                focusSiteId={site.id}
                showControls={false}
              />

              <div className="mt-4 flex items-center justify-between text-[11px] text-white/50 font-mono">
                <span>{site.district}, {site.state}</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${site.coordinates.lat},${site.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C4A882] hover:underline flex items-center gap-1"
                >
                  <span>Google Maps</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sequential Monument Pagination ── */}
      <nav className="py-12 px-6 md:px-12 bg-[#0A0A0A] border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link
            to={prevSite.path}
            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group no-underline"
          >
            <div className="p-2 rounded bg-white/5 group-hover:bg-white/10 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <div className="text-left">
              <div className="text-[9px] text-white/30 font-mono uppercase">Previous Monument</div>
              <div className="text-xs font-medium text-white group-hover:text-[#C4A882] transition-colors">
                {prevSite.name}
              </div>
            </div>
          </Link>

          <Link
            to="/qr-hub"
            className="hidden sm:inline-flex px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 rounded text-xs transition-colors font-mono no-underline"
          >
            VIEW ALL 8 PLACARDS
          </Link>

          <Link
            to={nextSite.path}
            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group no-underline text-right"
          >
            <div className="text-right">
              <div className="text-[9px] text-white/30 font-mono uppercase">Next Monument</div>
              <div className="text-xs font-medium text-white group-hover:text-[#C4A882] transition-colors">
                {nextSite.name}
              </div>
            </div>
            <div className="p-2 rounded bg-white/5 group-hover:bg-white/10 transition-colors">
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>
      </nav>

      {/* ── Modal for On-Site QR Placard ── */}
      <AnimatePresence>
        {showQRModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-md w-full"
            >
              <button
                onClick={() => setShowQRModal(false)}
                className="absolute -top-10 right-0 text-white/60 hover:text-white text-xs font-mono"
              >
                CLOSE [✕]
              </button>
              <MonumentQRCard site={site} variant="card" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
