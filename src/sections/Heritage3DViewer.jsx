// src/sections/Heritage3DViewer.jsx
// 3D Archive section — all 8 heritage models with lazy loading
import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { heritageSites } from '../data/heritage'
import HeritageModelViewer from '../components/HeritageModelViewer'

// All 8 sites with confirmed GLB files
const modelSites = heritageSites.filter((s) => s.modelPath)

export default function Heritage3DViewer({ activeModelId, onModelChange }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeId, setActiveId] = useState(modelSites[2]?.id || modelSites[0]?.id) // default: elephanta

  // Sync external activeModelId (from Map/Cards) into local state
  useEffect(() => {
    if (activeModelId && modelSites.find((s) => s.id === activeModelId)) {
      setActiveId(activeModelId)
    }
  }, [activeModelId])

  const activeSite = modelSites.find((s) => s.id === activeId) || modelSites[0]

  const handleSelect = (id) => {
    setActiveId(id)
  }

  return (
    <section id="archive" className="bg-[#FCFCFC] py-32 md:py-44" ref={ref}>
      {/* Header */}
      <div className="px-8 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-[10px] tracking-[0.3em] text-[#999]"
            style={{ fontFamily: 'var(--font-mono)' }}>[ 04 ]</span>
          <span className="text-[10px] tracking-[0.25em] text-[#999]"
            style={{ fontFamily: 'var(--font-mono)' }}>3D ARCHIVE · {modelSites.length} MONUMENTS</span>
        </motion.div>

        <div className="overflow-hidden mb-2">
          <motion.h2
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#111] font-semibold leading-none"
            style={{ fontSize: 'clamp(36px, 5.5vw, 80px)', letterSpacing: '-0.03em' }}
          >
            STEP INSIDE
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#111]/30 font-semibold leading-none mb-6"
            style={{ fontSize: 'clamp(36px, 5.5vw, 80px)', letterSpacing: '-0.03em' }}
          >
            HISTORY.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[#666] text-sm max-w-md leading-relaxed"
        >
          Explore India's monuments from every angle. Rotate, zoom, and interact with 3D
          digital reconstructions of 8 UNESCO heritage sites.
        </motion.p>
      </div>

      {/* Monument selector */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-8 md:px-12 mb-8"
      >
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {modelSites.map((site) => (
            <button
              key={site.id}
              onClick={() => handleSelect(site.id)}
              className={`shrink-0 px-5 py-2.5 text-[10px] tracking-[0.15em] border transition-all duration-300 rounded-sm ${
                activeId === site.id
                  ? 'bg-[#111] text-white border-[#111]'
                  : 'bg-transparent text-[#666] border-black/10 hover:border-black/30 hover:text-[#111]'
              }`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {site.shortName}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Viewer */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="px-8 md:px-12"
      >
        <div
          className="relative w-full border border-black/8 rounded-lg overflow-hidden"
          style={{ aspectRatio: '16/7', minHeight: '360px', maxHeight: '600px' }}
        >
          {/* No key here — Canvas stays mounted; only the modelPath prop changes */}
          <HeritageModelViewer
            modelPath={activeSite.modelPath}
            title={activeSite.name}
            location={activeSite.location}
            period={activeSite.period}
            description={activeSite.shortDesc}
          />
        </div>

        {/* Site info strip */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mt-6 pt-6 border-t border-black/6"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-[#111] font-medium tracking-tight text-lg"
                  style={{ letterSpacing: '-0.01em' }}>
                  {activeSite.name}
                </h3>
                <span className="text-[9px] tracking-[0.18em] text-[#C4A882] border border-[#C4A882]/30 px-2 py-0.5 rounded-sm"
                  style={{ fontFamily: 'var(--font-mono)' }}>
                  {activeSite.heritage}
                </span>
              </div>
              <p className="text-[#999] text-xs leading-relaxed max-w-lg">
                {activeSite.shortDesc}
              </p>
              {/* Fact chips */}
              <div className="flex flex-wrap gap-2 mt-3">
                {activeSite.tags.map((tag) => (
                  <span key={tag}
                    className="text-[9px] tracking-[0.1em] text-[#666] border border-black/8 px-2 py-1 rounded-sm"
                    style={{ fontFamily: 'var(--font-mono)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-10 shrink-0">
              <div>
                <div className="text-[9px] tracking-[0.2em] text-[#bbb] mb-1"
                  style={{ fontFamily: 'var(--font-mono)' }}>PERIOD</div>
                <div className="text-xs text-[#444]">{activeSite.period}</div>
              </div>
              <div>
                <div className="text-[9px] tracking-[0.2em] text-[#bbb] mb-1"
                  style={{ fontFamily: 'var(--font-mono)' }}>LOCATION</div>
                <div className="text-xs text-[#444]">{activeSite.location}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
