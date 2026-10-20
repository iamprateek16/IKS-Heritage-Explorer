// src/sections/StorySection.jsx
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { heritageStories } from '../data/heritage'
import StoryReaderModal from '../components/StoryReaderModal'

function StoryCard({ story, index, onReadStory }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
      onClick={() => onReadStory(story)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] rounded-sm mb-5">
        <motion.img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      </div>

      {/* Content */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-[9px] tracking-[0.25em] text-[#C4A882]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {story.category}
            </span>
            <span
              className="text-[9px] tracking-[0.15em] text-[#999]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {story.readTime}
            </span>
          </div>
          <h3
            className="text-[#111] font-medium text-base md:text-lg leading-tight mb-3 group-hover:text-[#333] transition-colors"
            style={{ letterSpacing: '-0.01em' }}
          >
            {story.title}
          </h3>
          <p className="text-[#999] text-xs leading-relaxed mb-4 line-clamp-2">
            {story.description}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onReadStory(story)
            }}
            className="text-[10px] tracking-[0.18em] text-[#666] hover:text-[#111] transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            READ STORY →
          </button>
        </div>
        <motion.div
          className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        >
          <ArrowUpRight size={16} className="text-[#111]" />
        </motion.div>
      </div>
    </motion.article>
  )
}

export default function StorySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeStory, setActiveStory] = useState(null)

  return (
    <>
      <section className="bg-[#FCFCFC] py-32 md:py-44 px-8 md:px-12 border-t border-black/5" ref={ref}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-[10px] tracking-[0.3em] text-[#999]"
                style={{ fontFamily: 'var(--font-mono)' }}>[ 07 ]</span>
              <span className="text-[10px] tracking-[0.25em] text-[#999]"
                style={{ fontFamily: 'var(--font-mono)' }}>HERITAGE STORIES</span>
            </motion.div>

            <div className="overflow-hidden mb-1">
              <motion.h2
                initial={{ y: '100%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#111] font-semibold leading-none"
                style={{ fontSize: 'clamp(32px, 5vw, 72px)', letterSpacing: '-0.03em' }}
              >
                BEYOND STONE
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
                AND STRUCTURE.
              </motion.h2>
            </div>
          </div>

          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-[10px] tracking-[0.2em] text-[#666] hover:text-[#111] transition-colors no-underline shrink-0"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ALL STORIES →
          </motion.a>
        </div>

        {/* Story grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {heritageStories.map((story, i) => (
            <StoryCard
              key={story.id}
              story={story}
              index={i}
              onReadStory={setActiveStory}
            />
          ))}
        </div>
      </section>

      {/* Story reader modal */}
      {activeStory && (
        <StoryReaderModal
          story={activeStory}
          onClose={() => setActiveStory(null)}
        />
      )}
    </>
  )
}
