// src/sections/HeritageMap.jsx
// ─── Real interactive India Map section with all 8 heritage sites ────────────
// Powered by IndiaHeritageMap (OpenStreetMap raster tiles, NO CARTO API KEY)

import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, Box, MapPin, Info, QrCode } from 'lucide-react'
import { heritageSites } from '../data/heritage'
import HeritageSiteModal from '../components/HeritageSiteModal'
import IndiaHeritageMap from '../components/IndiaHeritageMap'
import { getSitePath } from '../utils/heritageRouting'

export default function HeritageMap({ onExplore3D }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeSite, setActiveSite] = useState(null)
  const [selectedSite, setSelectedSite] = useState(null)

  const handleExplore3D = (site) => {
    if (onExplore3D) onExplore3D(site.id)
    const archiveEl = document.getElementById('archive')
    if (archiveEl) archiveEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleOpenDetail = (site) => {
    setSelectedSite(site)
  }

  return (
    <>
      <section id="map" className="bg-[#0A0A0A] py-32 md:py-44 px-8 md:px-12" ref={sectionRef}>
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <span
              className="text-[10px] tracking-[0.3em] text-white/30"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              [ 05 ]
            </span>
            <span
              className="text-[10px] tracking-[0.25em] text-white/30"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              HERITAGE MAP · INDIA
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: '0%' } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-semibold leading-none"
              style={{ fontSize: 'clamp(32px, 5vw, 72px)', letterSpacing: '-0.03em' }}
            >
              HERITAGE ACROSS
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: '0%' } : {}}
              transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/30 font-semibold leading-none"
              style={{ fontSize: 'clamp(32px, 5vw, 72px)', letterSpacing: '-0.03em' }}
            >
              THE LAND.
            </motion.h2>
          </div>
        </div>

        {/* Map container with IndiaHeritageMap */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-xl overflow-hidden border border-white/8 shadow-2xl"
          style={{ height: '600px' }}
        >
          <IndiaHeritageMap
            height="600px"
            activeSiteId={activeSite?.id}
            onSelectSite={(site) => setActiveSite((prev) => (prev?.id === site.id ? null : site))}
            onExplore3D={(siteId) => {
              const target = heritageSites.find((s) => s.id === siteId)
              if (target) handleExplore3D(target)
            }}
          />

          {/* Active Site Slide-in Drawer */}
          <AnimatePresence>
            {activeSite && (
              <motion.div
                key={activeSite.id}
                initial={{ opacity: 0, x: 20, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-4 right-4 w-72 z-[1000] rounded-lg overflow-hidden pointer-events-auto"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}
              >
                {/* Card image */}
                <div className="relative h-36 overflow-hidden bg-[#181818]">
                  <img
                    src={activeSite.imagePath || activeSite.image}
                    alt={activeSite.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                  <button
                    onClick={() => setActiveSite(null)}
                    className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center
                      rounded-full bg-black/60 text-white/60 hover:text-white hover:bg-black/80 transition-all border border-white/10"
                    aria-label="Close card"
                  >
                    <X size={13} />
                  </button>
                </div>

                {/* Card body */}
                <div className="bg-[#111] border border-white/10 border-t-0 rounded-b-lg p-5">
                  <div
                    className="text-[9px] tracking-[0.2em] text-[#C4A882]/80 mb-1"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {activeSite.type.toUpperCase()}
                  </div>
                  <h4 className="text-white font-medium text-base tracking-tight mb-1">
                    {activeSite.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mb-3">
                    <MapPin size={10} className="text-white/30" />
                    <span className="text-[10px] text-white/40">{activeSite.location}</span>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/30">Period</span>
                      <span className="text-white/60 text-right max-w-[170px] text-[11px]">
                        {activeSite.period}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/30">Status</span>
                      <span className="text-[#C4A882]/80 text-right max-w-[170px] text-[11px]">
                        {activeSite.heritage}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/40 text-[11px] leading-relaxed mb-4 line-clamp-2">
                    {activeSite.shortDesc}
                  </p>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenDetail(activeSite)}
                        className="flex items-center justify-center gap-1.5 text-[10px] tracking-[0.15em]
                          bg-[#1a1a1a] text-white hover:bg-[#333] border border-white/10
                          px-3 py-2.5 rounded-sm transition-all duration-300"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        <Info size={11} />
                        MODAL
                      </button>
                      <Link
                        to={getSitePath(activeSite)}
                        className="flex items-center justify-center gap-1.5 text-[10px] tracking-[0.15em]
                          bg-[#C4A882] text-black hover:bg-[#d4b58e] font-semibold
                          px-3 py-2.5 rounded-sm transition-all duration-300 no-underline"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        <QrCode size={11} />
                        PAGE & QR
                      </Link>
                    </div>
                    {activeSite.modelPath && (
                      <button
                        onClick={() => handleExplore3D(activeSite)}
                        className="w-full flex items-center justify-center gap-2 text-[10px] tracking-[0.18em]
                          bg-white text-black hover:bg-[#C4A882] hover:text-black font-medium
                          px-4 py-2.5 rounded-sm transition-all duration-300 border border-black/10"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        <Box size={11} />
                        EXPLORE IN 3D
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-white/5"
        >
          <div
            className="text-[9px] tracking-[0.15em] text-white/30"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            POWERED BY OPENSTREETMAP · REAL GEOGRAPHIC TILES · CLICK ANY MARKER TO VIEW 3D TWIN &amp; EDITORIAL NOTES
          </div>
          <div
            className="text-[9px] tracking-[0.15em] text-white/20 font-mono"
          >
            NO API KEY REQUIRED
          </div>
        </motion.div>
      </section>

      {/* Site detail modal */}
      {selectedSite && (
        <HeritageSiteModal
          site={selectedSite}
          onClose={() => setSelectedSite(null)}
          onExplore3D={onExplore3D}
        />
      )}
    </>
  )
}
