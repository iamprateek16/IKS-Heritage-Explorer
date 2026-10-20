// src/sections/CTASection.jsx
import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const CTA_IMAGE = '/images/ellora-caves.png'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0A0A0A] py-44 md:py-64 px-8 md:px-12 text-center"
    >
      {/* Parallax BG */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <img
          src={CTA_IMAGE}
          alt="The monolithic Kailasa Temple at Ellora Caves — a call to explore India's heritage"
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1.15)', objectPosition: 'center' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className="text-[10px] tracking-[0.3em] text-white/30"
            style={{ fontFamily: 'var(--font-mono)' }}>[ 08 ]</span>
          <span className="text-[10px] tracking-[0.25em] text-white/30"
            style={{ fontFamily: 'var(--font-mono)' }}>CALL TO EXPLORE</span>
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-semibold mx-auto"
            style={{
              fontSize: 'clamp(44px, 7vw, 100px)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            THE PAST IS
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/30 font-semibold mx-auto"
            style={{
              fontSize: 'clamp(44px, 7vw, 100px)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            STILL HERE.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/50 text-sm leading-loose mb-12 max-w-xs mx-auto"
        >
          Walk through it.<br />
          Understand it.<br />
          Experience it.
        </motion.p>

        <motion.a
          href="#explore"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02 }}
          className="inline-flex items-center text-[11px] tracking-[0.22em] px-8 py-4
            bg-white text-black hover:bg-white/90 transition-colors no-underline"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          START EXPLORING
        </motion.a>
      </div>
    </section>
  )
}
