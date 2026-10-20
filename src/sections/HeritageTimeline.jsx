// src/sections/HeritageTimeline.jsx
import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { timelinePeriods } from '../data/heritage'

export default function HeritageTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activePeriod, setActivePeriod] = useState('classical')

  const active = timelinePeriods.find((p) => p.id === activePeriod)

  return (
    <section className="bg-[#FCFCFC] py-32 md:py-44 px-8 md:px-12" ref={ref}>
      {/* Header */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-[10px] tracking-[0.3em] text-[#999]"
            style={{ fontFamily: 'var(--font-mono)' }}>[ 06 ]</span>
          <span className="text-[10px] tracking-[0.25em] text-[#999]"
            style={{ fontFamily: 'var(--font-mono)' }}>HISTORICAL TIMELINE</span>
        </motion.div>

        <div className="overflow-hidden mb-1">
          <motion.h2
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#111] font-semibold leading-none"
            style={{ fontSize: 'clamp(32px, 5vw, 72px)', letterSpacing: '-0.03em' }}
          >
            THOUSANDS OF YEARS.
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#111]/25 font-semibold leading-none"
            style={{ fontSize: 'clamp(32px, 5vw, 72px)', letterSpacing: '-0.03em' }}
          >
            ONE CONTINUOUS STORY.
          </motion.h2>
        </div>
      </div>

      {/* Timeline tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex items-stretch gap-0 border-b border-black/8 mb-16 overflow-x-auto"
      >
        {timelinePeriods.map((period, i) => {
          const isActive = activePeriod === period.id
          return (
            <button
              key={period.id}
              onClick={() => setActivePeriod(period.id)}
              className={`group relative flex-1 min-w-[120px] text-left px-5 py-5 border-b-2 transition-all duration-400 ${
                isActive ? 'border-[#111]' : 'border-transparent hover:border-black/20'
              }`}
            >
              <div
                className={`text-[9px] tracking-[0.2em] mb-2 transition-colors ${
                  isActive ? 'text-[#111]' : 'text-[#bbb] group-hover:text-[#888]'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {period.period}
              </div>
              <div
                className={`text-[10px] tracking-[0.15em] font-medium transition-colors leading-tight ${
                  isActive ? 'text-[#111]' : 'text-[#ccc] group-hover:text-[#888]'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {period.label}
              </div>
            </button>
          )
        })}
      </motion.div>

      {/* Active period content */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={activePeriod}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
          >
            {/* Left – description */}
            <div>
              <div
                className="text-[9px] tracking-[0.3em] text-[#bbb] mb-4"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {active.period}
              </div>
              <h3
                className="text-[#111] font-medium text-2xl md:text-3xl tracking-tight mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                {active.label}
              </h3>
              <p className="text-[#666] text-sm leading-relaxed mb-8">
                {active.description}
              </p>

              {active.monuments.length > 0 && (
                <div>
                  <div
                    className="text-[9px] tracking-[0.25em] text-[#bbb] mb-3"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    KEY MONUMENTS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.monuments.map((m) => (
                      <span
                        key={m}
                        className="px-3 py-1.5 text-[10px] tracking-[0.1em] text-[#666] border border-black/8 rounded-sm"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right – timeline line */}
            <div className="relative pl-6 border-l border-black/8">
              <div
                className="text-[9px] tracking-[0.25em] text-[#bbb] mb-6"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                PERIOD IN CONTEXT
              </div>
              <div className="space-y-0">
                {timelinePeriods.map((p) => {
                  const isCurrent = p.id === activePeriod
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActivePeriod(p.id)}
                      className={`group relative w-full text-left py-3 flex items-center gap-3 transition-colors ${
                        isCurrent ? 'text-[#111]' : 'text-[#ccc] hover:text-[#888]'
                      }`}
                    >
                      {/* Dot */}
                      <div className={`absolute -left-9 w-2 h-2 rounded-full border transition-all ${
                        isCurrent ? 'bg-[#111] border-[#111] scale-125' : 'bg-white border-black/15'
                      }`} />
                      <div>
                        <div className="text-[9px] tracking-[0.15em]" style={{ fontFamily: 'var(--font-mono)' }}>
                          {p.period}
                        </div>
                        <div className={`text-xs font-medium tracking-wide mt-0.5 ${isCurrent ? 'text-[#111]' : 'text-[#ccc]'}`}>
                          {p.label}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
