// src/sections/HeritageCollection.jsx
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { heritageSites } from '../data/heritage'
import HeritageCard from '../components/HeritageCard'
import HeritageSiteModal from '../components/HeritageSiteModal'

export default function HeritageCollection({ activeCategory, onExplore3D }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedSite, setSelectedSite] = useState(null)

  const filtered =
    activeCategory === 'all'
      ? heritageSites
      : heritageSites.filter((s) => s.category === activeCategory)

  const handleOpenDetail = (site) => setSelectedSite(site)
  const handleCloseDetail = () => setSelectedSite(null)

  return (
    <>
      <section id="heritage" className="bg-[#0A0A0A] py-32 md:py-44 px-8 md:px-12" ref={ref}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
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
                [ 03 ]
              </span>
              <span
                className="text-[10px] tracking-[0.25em] text-white/30"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                FEATURED COLLECTION
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-white font-semibold leading-none"
                style={{
                  fontSize: 'clamp(36px, 5.5vw, 80px)',
                  letterSpacing: '-0.03em',
                }}
              >
                ICONIC PLACES.
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-white/30 font-semibold leading-none"
                style={{
                  fontSize: 'clamp(36px, 5.5vw, 80px)',
                  letterSpacing: '-0.03em',
                }}
              >
                ENDLESS STORIES.
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/40 text-sm leading-relaxed max-w-xs"
          >
            Explore India's architectural legacy through immersive visuals, historical context and interactive 3D experiences.
            Click any site to read its full story.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
        >
          {filtered.map((site, i) => (
            <HeritageCard
              key={site.id}
              site={site}
              index={i}
              onExplore3D={onExplore3D}
              onOpenDetail={handleOpenDetail}
            />
          ))}
        </motion.div>

        {/* Bottom count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center justify-between mt-16 pt-8 border-t border-white/10"
        >
          <span
            className="text-white/20 text-[10px] tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {filtered.length} SITES DISPLAYED
          </span>
          <button
            className="text-[10px] tracking-[0.2em] text-white/40 hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            VIEW ALL HERITAGE →
          </button>
        </motion.div>
      </section>

      {/* Site detail modal — rendered outside the section so it overlays everything */}
      {selectedSite && (
        <HeritageSiteModal
          site={selectedSite}
          onClose={handleCloseDetail}
          onExplore3D={onExplore3D}
        />
      )}
    </>
  )
}
