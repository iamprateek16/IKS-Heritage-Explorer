// src/components/HeritageSiteModal.jsx
// ─── Rich detail modal for a heritage site ───────────────────────────────────
// Opens as a full-screen overlay with sections:
//  - Hero image with parallax
//  - Key metadata strip
//  - Historical Background
//  - Architecture & Design
//  - Cultural Significance
//  - Quick Facts table
//  - Sources
//  - Explore in 3D CTA

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Box, MapPin, ExternalLink, Clock, Award, QrCode } from 'lucide-react'
import { getSitePath } from '../utils/heritageRouting'

export default function HeritageSiteModal({ site, onClose, onExplore3D }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const scrollRef = useRef(null)

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!site) return null

  const handleExplore3D = () => {
    if (onExplore3D) onExplore3D(site.id)
    onClose()
    setTimeout(() => {
      const el = document.getElementById('archive')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 400)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-start justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Panel */}
        <motion.div
          ref={scrollRef}
          className="relative z-10 h-full bg-[#FAFAF8] overflow-y-auto"
          style={{ width: 'min(680px, 100vw)', scrollbarWidth: 'thin' }}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        >
          {/* Hero image */}
          <div className="relative h-[320px] md:h-[380px] overflow-hidden bg-[#1a1a1a] shrink-0">
            <motion.img
              src={site.imagePath || site.image}
              alt={site.imageAlt || site.name}
              className="w-full h-full object-cover"
              loading="eager"
              onLoad={() => setImgLoaded(true)}
              animate={{ scale: imgLoaded ? 1 : 1.05, opacity: imgLoaded ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF8] via-black/20 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center
                bg-black/50 backdrop-blur-sm rounded-full text-white/70 hover:text-white hover:bg-black/70
                transition-all duration-200 border border-white/10"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Heritage badge */}
            <div
              className="absolute top-5 left-5 px-3 py-1.5 text-[9px] tracking-[0.2em] text-[#C4A882]
                bg-black/60 backdrop-blur-sm border border-[#C4A882]/20 rounded-sm"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {site.heritage}
            </div>
          </div>

          {/* Content body */}
          <div className="px-8 md:px-10 pb-16">
            {/* Title block */}
            <div className="mt-[-32px] relative z-10 mb-8">
              <div
                className="text-[9px] tracking-[0.25em] text-[#C4A882] mb-2"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {site.type}
              </div>
              <h2
                className="text-[#111] font-semibold leading-none mb-3"
                style={{
                  fontSize: 'clamp(28px, 5vw, 44px)',
                  letterSpacing: '-0.03em',
                }}
              >
                {site.name}
              </h2>
              {site.alternateName && (
                <div className="text-[11px] text-[#999] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                  ALSO: {site.alternateName}
                </div>
              )}
              <div className="flex items-center gap-1.5 mb-5">
                <MapPin size={11} className="text-[#999]" />
                <span className="text-xs text-[#666]">{site.location}</span>
              </div>
              <p className="text-[#444] text-sm leading-relaxed">{site.description}</p>
            </div>

            {/* Metadata strip */}
            <div className="grid grid-cols-2 gap-3 mb-10 p-5 bg-[#F3F1EC] rounded-lg border border-black/5">
              <div>
                <div className="text-[8px] tracking-[0.2em] text-[#aaa] mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                  PERIOD
                </div>
                <div className="text-xs text-[#333] font-medium">{site.period}</div>
              </div>
              {site.unescoInscriptionYear && (
                <div>
                  <div className="text-[8px] tracking-[0.2em] text-[#aaa] mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    UNESCO INSCRIPTION
                  </div>
                  <div className="text-xs text-[#333] font-medium">{site.unescoInscriptionYear}</div>
                </div>
              )}
              <div>
                <div className="text-[8px] tracking-[0.2em] text-[#aaa] mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                  STATE
                </div>
                <div className="text-xs text-[#333] font-medium">{site.state}</div>
              </div>
              {site.constructionDates && (
                <div>
                  <div className="text-[8px] tracking-[0.2em] text-[#aaa] mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    CONSTRUCTION
                  </div>
                  <div className="text-xs text-[#333] font-medium">{site.constructionDates}</div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              <Link
                to={getSitePath(site)}
                onClick={onClose}
                className="flex items-center justify-center gap-2 text-[10px] tracking-[0.2em]
                  bg-[#C4A882] text-black hover:bg-[#d6b993] font-semibold px-4 py-4 rounded-sm transition-all duration-300 no-underline"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <QrCode size={13} />
                DEDICATED PAGE & QR →
              </Link>

              {site.modelPath && (
                <button
                  onClick={handleExplore3D}
                  className="flex items-center justify-center gap-2 text-[10px] tracking-[0.2em]
                    bg-[#111] text-white hover:bg-[#333] px-4 py-4 rounded-sm transition-all duration-300"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <Box size={13} />
                  EXPLORE IN 3D ARCHIVE
                </button>
              )}
            </div>

            {/* Historical Background */}
            {site.historicalBackground && (
              <DetailSection title="HISTORICAL BACKGROUND" icon={<Clock size={12} />}>
                <p className="text-[#555] text-sm leading-relaxed">{site.historicalBackground}</p>
              </DetailSection>
            )}

            {/* Architecture */}
            {site.architecture && (
              <DetailSection title="ARCHITECTURE & DESIGN">
                <p className="text-[#555] text-sm leading-relaxed">{site.architecture}</p>
              </DetailSection>
            )}

            {/* Cultural Significance */}
            {site.culturalSignificance && (
              <DetailSection title="CULTURAL SIGNIFICANCE" icon={<Award size={12} />}>
                <p className="text-[#555] text-sm leading-relaxed">{site.culturalSignificance}</p>
              </DetailSection>
            )}

            {/* Quick Facts */}
            {site.quickFacts && site.quickFacts.length > 0 && (
              <DetailSection title="QUICK FACTS">
                <div className="space-y-0 border border-black/8 rounded-sm overflow-hidden">
                  {site.quickFacts.map((fact, i) => (
                    <div
                      key={fact.label}
                      className={`flex items-start justify-between gap-4 px-4 py-3 text-xs
                        ${i % 2 === 0 ? 'bg-[#F8F6F2]' : 'bg-white'}`}
                    >
                      <span className="text-[#999] shrink-0 w-36" style={{ fontFamily: 'var(--font-mono)' }}>
                        {fact.label}
                      </span>
                      <span className="text-[#333] text-right">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </DetailSection>
            )}

            {/* Tags */}
            {site.tags && site.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {site.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] tracking-[0.12em] text-[#666] border border-black/10 px-2.5 py-1 rounded-sm"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Sources */}
            {site.sources && site.sources.length > 0 && (
              <DetailSection title="SOURCES & ATTRIBUTION">
                <div className="space-y-2">
                  {site.sources.map((src) => (
                    <a
                      key={src.url}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-[#666] hover:text-[#111] transition-colors group"
                    >
                      <ExternalLink size={10} className="shrink-0 text-[#C4A882] group-hover:text-[#111] transition-colors" />
                      {src.label}
                    </a>
                  ))}
                  {site.imageAttribution && (
                    <div className="text-[10px] text-[#aaa] leading-relaxed mt-3 pt-3 border-t border-black/5">
                      <span className="font-medium text-[#888]">Image: </span>
                      {site.imageAttribution.source}. {site.imageAttribution.note}
                    </div>
                  )}
                </div>
              </DetailSection>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function DetailSection({ title, icon, children }) {
  return (
    <div className="mb-9">
      <div
        className="flex items-center gap-2 text-[9px] tracking-[0.25em] text-[#aaa] mb-4 pb-3 border-b border-black/6"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {icon && <span className="text-[#C4A882]">{icon}</span>}
        {title}
      </div>
      {children}
    </div>
  )
}
