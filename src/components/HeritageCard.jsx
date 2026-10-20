// src/components/HeritageCard.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Box, Info, QrCode } from 'lucide-react'
import { getSitePath } from '../utils/heritageRouting'

export default function HeritageCard({ site, index, onExplore3D, onOpenDetail }) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleExplore3D = (e) => {
    e.stopPropagation()
    if (onExplore3D) onExplore3D(site.id)
    const el = document.getElementById('archive')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleOpenDetail = (e) => {
    e.stopPropagation()
    if (onOpenDetail) onOpenDetail(site)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleOpenDetail}
      className="group relative flex flex-col border-b border-white/10 py-1 cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] rounded-sm mb-6 bg-[#1a1a1a]">
        {!imgError ? (
          <motion.img
            src={site.imagePath || site.image}
            alt={site.imageAlt || site.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          // Fallback: gradient with site name when image fails
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1a1209 0%, #2a1e0d 100%)' }}>
            <span className="text-[#C4A882]/30 text-xs tracking-[0.3em]"
              style={{ fontFamily: 'var(--font-mono)' }}>
              {site.shortName}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          animate={{ opacity: hovered ? 0.2 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Heritage badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 text-[9px] tracking-[0.2em] text-white/80 bg-black/50 backdrop-blur-sm rounded-sm"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {site.heritage}
        </div>

        {/* 3D badge */}
        {site.modelPath && (
          <motion.div
            className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-sm border border-white/20"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box size={10} className="text-white/80" />
            <span className="text-[9px] tracking-[0.15em] text-white/80"
              style={{ fontFamily: 'var(--font-mono)' }}>
              3D AVAILABLE
            </span>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] tracking-[0.2em] text-white/40 mb-2"
            style={{ fontFamily: 'var(--font-mono)' }}>
            {site.periodShort}
          </div>
          <h3 className="text-white font-medium text-lg tracking-tight leading-tight mb-2"
            style={{ letterSpacing: '-0.01em' }}>
            {site.name}
          </h3>
          <p className="text-white/40 text-xs leading-relaxed mb-3 line-clamp-2">
            {site.shortDesc}
          </p>
          <div className="text-[10px] tracking-[0.18em] text-white/30"
            style={{ fontFamily: 'var(--font-mono)' }}>
            {site.location}
          </div>
        </div>

        <motion.div
          animate={{ rotate: hovered ? 0 : -45, opacity: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 mt-1"
        >
          <ArrowUpRight size={18} className="text-white" />
        </motion.div>
      </div>

      {/* Action row */}
      <motion.div
        className="flex items-center gap-6 mt-5 pt-4 border-t border-white/10"
        animate={{ opacity: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={handleOpenDetail}
          className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] text-white/70 hover:text-white transition-colors"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <Info size={10} />
          EXPLORE
        </button>
        <Link
          to={getSitePath(site)}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] text-[#C4A882]/80 hover:text-[#C4A882] transition-colors no-underline"
          style={{ fontFamily: 'var(--font-mono)' }}
          title="Visit dedicated page & QR"
        >
          <QrCode size={10} />
          PAGE & QR
        </Link>
        {site.modelPath && (
          <button
            onClick={handleExplore3D}
            className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] text-[#C4A882]/60 hover:text-[#C4A882] transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <Box size={10} />
            VIEW IN 3D
          </button>
        )}
      </motion.div>
    </motion.article>
  )
}
