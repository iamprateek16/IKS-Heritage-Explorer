// src/sections/Hero.jsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

// Cinematic heritage image — local Taj Mahal photograph
const HERO_IMAGE = '/images/taj-mahal.png'

const words = ["INDIA'S", 'HERITAGE,', 'REIMAGINED.']

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
  }
  const lineVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: { y: '0%', opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#0A0A0A]"
      id="home"
    >
      {/* ── Parallax background ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
      >
        <img
          src={HERO_IMAGE}
          alt="The Taj Mahal, Agra — India's eternal symbol of love and Mughal heritage"
          className="w-full h-full object-cover object-center"
          style={{ transform: 'scale(1.1)' }}
          loading="eager"
        />
        {/* Multi-layer overlay for cinematic look */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
      </motion.div>

      {/* ── Hero content ── */}
      <motion.div
        className="relative z-10 flex flex-col justify-end h-full pb-24 px-8 md:px-12"
        style={{ y: textY, opacity }}
      >
        {/* Headline */}
        <motion.div
          className="overflow-hidden mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                variants={lineVariants}
                className="block text-white font-semibold leading-none tracking-tight"
                style={{
                  fontSize: 'clamp(52px, 8vw, 112px)',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.03em',
                }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Left — subtitle + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md"
          >
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8">
              Explore centuries of architecture, art, culture and stories through an immersive digital experience.
            </p>
            <div className="flex gap-4 flex-wrap">
              <CTAButton href="#explore" primary>EXPLORE HERITAGE</CTAButton>
              <CTAButton href="#archive">ENTER 3D ARCHIVE</CTAButton>
            </div>
          </motion.div>

          {/* Right — counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-right hidden md:block"
          >
            <div
              className="text-white/30 text-[10px] tracking-[0.25em] mb-1"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              HERITAGE EXPERIENCE
            </div>
            <div
              className="text-white/50 text-[11px] tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              01 / 06
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-8 left-8 md:left-12 flex items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-white/40" />
          </motion.div>
          <span
            className="text-white/40 text-[10px] tracking-[0.25em]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            SCROLL TO EXPLORE
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}

function CTAButton({ href, children, primary }) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center overflow-hidden text-[11px] tracking-[0.18em] px-6 py-3.5 border transition-all duration-300 no-underline select-none ${
        primary
          ? 'bg-white text-black border-white hover:bg-transparent hover:text-white'
          : 'bg-transparent text-white border-white/40 hover:border-white'
      }`}
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <span className="relative z-10">{children}</span>
      {primary && (
        <span className="absolute inset-0 bg-white/0 group-hover:bg-white/0 transition-all" />
      )}
    </a>
  )
}
