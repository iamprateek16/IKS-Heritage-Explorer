// src/sections/HeritageIntro.jsx
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mountain, Building2, Landmark, Layers, Circle, Archive } from 'lucide-react'
import { heritageCategories } from '../data/heritage'

const iconMap = { Mountain, Building2, Landmark, Layers, Circle, Archive }

export default function HeritageIntro({ activeCategory, setActiveCategory }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const headingWords = [
    'From ancient cave architecture',
    'to monumental temples,',
    "India's heritage is a living story",
    'written across thousands of years.',
  ]

  return (
    <section id="explore" className="bg-[#FCFCFC] py-32 md:py-44 px-8 md:px-12" ref={ref}>
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4 mb-14"
      >
        <span
          className="text-[10px] tracking-[0.3em] text-[#999]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          [ 02 ]
        </span>
        <span
          className="text-[10px] tracking-[0.25em] text-[#999]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          INDIA'S CULTURAL LANDSCAPE
        </span>
      </motion.div>

      {/* Large heading */}
      <div className="max-w-5xl">
        {headingWords.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : {}}
              transition={{
                duration: 1.1,
                delay: 0.1 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[#111] font-light leading-tight mb-0"
              style={{
                fontSize: 'clamp(24px, 3.5vw, 48px)',
                letterSpacing: '-0.02em',
              }}
            >
              {line}
            </motion.p>
          </div>
        ))}
      </div>

      {/* Category pills */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap gap-3 mt-16"
      >
        {heritageCategories.map((cat) => {
          const Icon = iconMap[cat.icon]
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-[11px] tracking-[0.1em] transition-all duration-300 ${
                isActive
                  ? 'bg-[#111] text-white border-[#111]'
                  : 'bg-transparent text-[#666] border-black/10 hover:border-black/30 hover:text-[#111]'
              }`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {Icon && (
                <Icon
                  size={12}
                  className={`transition-colors ${isActive ? 'text-white' : 'text-[#999] group-hover:text-[#111]'}`}
                />
              )}
              {cat.label}
            </button>
          )
        })}
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex gap-12 mt-20 pt-12 border-t border-black/5"
      >
        {[
          { value: '40+', label: 'UNESCO Sites' },
          { value: '5000+', label: 'Years of History' },
          { value: '29', label: 'States, Countless Stories' },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-3xl font-light text-[#111] tracking-tight">{stat.value}</div>
            <div
              className="text-[10px] tracking-[0.2em] text-[#999] mt-1"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {stat.label.toUpperCase()}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
