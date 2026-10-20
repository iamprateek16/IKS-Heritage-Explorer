// src/components/StoryReaderModal.jsx
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, ArrowLeft } from 'lucide-react'

// ── Long-form story content keyed by story.id ─────────────────────────────────
const storyContent = {
  'science-of-architecture': {
    pullQuote:
      'Without a single iron nail, the builders of Konark raised a structure so massive it could be seen from ships 30 km at sea.',
    body: [
      { type: 'paragraph', text: 'When the English engineer Charles Younghusband inspected the Konark Sun Temple in the 19th century, he wrote that the structure "must have been one of the grandest buildings in the world." He was baffled — not by its beauty, but by its engineering. How had craftsmen of the 13th century raised a tower estimated at 70 metres without cranes, without steel, and without the mathematics that modern structural engineers take for granted?' },
      { type: 'heading', text: 'The Vastu Shastra Tradition' },
      { type: 'paragraph', text: 'Indian temple architecture was guided by Vastu Shastra — a corpus of ancient texts encoding principles of proportion, orientation, acoustics, and drainage. Far from being mystical, these texts contain precise rules for column proportions, load distribution, and the direction of water runoff. The Manasara, one of the oldest of these texts, specifies beam-to-column ratios that modern engineers recognise as approximations of structural stability criteria.' },
      { type: 'paragraph', text: 'The temples were not improvised. Before a single stone was cut, priests and architects (known as sthapatis) would survey the site, study the soil, determine cardinal directions using gnomonic rods, and lay out the entire plan on ground using ropes and stakes — a system described in ancient texts as Sutra-karma (the work of strings).' },
      { type: 'heading', text: 'Stones That Lock Without Mortar' },
      { type: 'paragraph', text: 'One of the most astonishing features of ancient Indian temples is their use of interlocking stone joinery — a system so precise that many structures have survived a millennium of earthquakes without mortar. The sandstone blocks at Konark were cut to fit with tolerances of less than a millimetre. The key was the system of iron dowels and clamps buried within the masonry: iron bars dipped in molten lead to prevent rust, locking stones together from the inside.' },
      { type: 'paragraph', text: 'The Kailasa Temple at Ellora takes this further. Because it is carved downward into the rock — rather than built upward — there are no joints at all. The entire structure is a single piece of geology.' },
      { type: 'heading', text: 'The Ajanta Caves: Light by Design' },
      { type: 'paragraph', text: 'The Ajanta Caves were carved into a horseshoe-shaped cliff that the builders had observed carefully: during festival seasons, when the sun is at specific angles, natural light enters the caves in shafts that illuminate the painted Buddhas at the far end of each hall. This is not coincidence — the orientation of each cave entrance was deliberately calculated so that on ceremonially important days, dawn light would fall directly on the face of the main sculptural group.' },
      { type: 'paragraph', text: 'The painters who worked inside these caves — where no sunlight penetrates — are thought to have used polished copper mirrors arranged in relay sequences to direct daylight deep into the interior. Chemical analysis of the pigments shows a sophisticated understanding of material science: lapis lazuli from Afghanistan, malachite from Rajasthan, lead white for highlights, and lampblack outlines sealed with an organic fixative that has survived 1,500 years.' },
      { type: 'heading', text: 'What Modernity Can Learn' },
      { type: 'paragraph', text: "Contemporary architects and engineers have begun returning to these traditions not out of nostalgia, but necessity. The Vastu Shastra principle of north-south orientation for sleeping rooms aligns with modern chronobiology research on circadian rhythms. The stepped wells (vav) of Gujarat — engineering marvels of passive cooling — are being studied for passive architectural strategies in a warming climate. The interlocking stone joints of Hampi's Vittala Temple have inspired research into mortar-free seismic-resistant construction." },
      { type: 'paragraph', text: "India's ancient builders were not primitive. They were engineers of a different tradition — one that prioritised longevity, harmony with site conditions, and the integration of cosmological knowledge into physical form. Their works still stand. That, in itself, is the proof." },
    ],
  },

  'stories-of-ajanta': {
    pullQuote:
      'The painters of Ajanta depicted grief, desire, compassion, and joy with a psychological realism that would not appear again in world art for nearly a thousand years.',
    body: [
      { type: 'paragraph', text: 'Somewhere around the 5th century CE, a painter kneeling inside Cave 1 at Ajanta applied the finishing strokes to a face that has become one of the most recognised images in Indian art: the Bodhisattva Padmapani, holding a blue lotus, his gaze turned inward in an expression of infinite compassion. That painting has survived fifteen centuries. The painter left no name.' },
      { type: 'heading', text: 'Two Phases, One Mountain' },
      { type: 'paragraph', text: "The 30 caves of Ajanta were carved and painted across two distinct periods. The first phase, roughly 2nd century BCE to 1st century CE, produced simpler caves sponsored by local merchants and guilds. Then, after five centuries of apparent inactivity, the site experienced an extraordinary flourishing under the patronage of the Vakataka king Harishena in the 5th century CE. In less than 20 years, the bulk of the paintings we see today were created." },
      { type: 'paragraph', text: "This rapid second phase is puzzling. Scholars believe that multiple competing workshops operated simultaneously in different caves, racing to complete their assigned halls before Harishena's reign ended — and with it, the royal patronage." },
      { type: 'heading', text: 'Reading the Walls' },
      { type: 'paragraph', text: "Every surface of the painted caves is a narrative. The primary stories are the Jataka tales — 547 stories of the Buddha's previous lives as a human, animal, or divine being. But the painters did not illustrate these tales in isolation. They embedded them within dense compositions teeming with contemporary life: palace scenes, market days, ships at sea, women at their toilette, musicians, and elephants. The effect is of a civilisation captured in full." },
      { type: 'heading', text: 'A Sudden End' },
      { type: 'paragraph', text: 'The Vakataka dynasty collapsed around 480 CE, likely due to internal succession conflicts. Royal patronage ceased. The monks abandoned the unfinished caves — some still mid-carving, scaffolding holes still visible in the rock walls. The forest slowly reclaimed the site.' },
      { type: 'paragraph', text: "They remained known only to local people until April 1819, when a British hunting party led by Captain John Smith followed a tiger into a narrow gorge and emerged to find Cave 10. Smith scratched his name into the wall — it is still visible. Conservation efforts have been underway ever since." },
    ],
  },

  'how-ellora-was-built': {
    pullQuote:
      'To carve the Kailasa Temple, craftsmen removed an estimated 200,000 tonnes of rock — working top-down, with no ability to undo a single mistake.',
    body: [
      { type: 'paragraph', text: "The Kailasa Temple at Ellora is, by almost any measure, the most ambitious construction project in Indian history. It is not built. It is excavated — carved downward and inward from a single basalt cliff. And unlike every other great monument, once the craftsmen made a decision, they could not revise it. There is no room for error when your material is a mountain." },
      { type: 'heading', text: 'The Commission' },
      { type: 'paragraph', text: 'Around 756 CE, Dantidurga, the first great king of the Rashtrakuta dynasty, commissioned a temple to Shiva that would surpass everything built before it. The project was continued by his successor Krishna I. The temple was to represent Mount Kailash — the mythological abode of Shiva — rendered in stone at the edge of the Deccan plateau.' },
      { type: 'heading', text: 'Top-Down, Not Bottom-Up' },
      { type: 'paragraph', text: 'The fundamental difference between the Kailasa Temple and every other major construction project in history is its direction. The builders began at the top of the cliff and worked downward — carving away the rock around the emerging temple to leave it standing free. The roof was carved before the floor. The spire was shaped before the pillared halls below it were excavated.' },
      { type: 'paragraph', text: 'The sthapatis (master architects) had to hold the entire completed structure in mind from the very beginning, because every cut made at the top constrained what was possible below. The proportional system had to be designed in three dimensions before a single blow of the chisel.' },
      { type: 'heading', text: 'The Workforce' },
      { type: 'paragraph', text: 'Estimates suggest that removing 200,000 tonnes of basalt over roughly 18 years of construction required a continuous workforce of at least 7,000 people. The primary tools were iron chisels and hammers, supplemented by wooden wedges driven into pre-drilled holes and wetted to split the rock along chosen planes.' },
      { type: 'heading', text: 'The Sculptures Within' },
      { type: 'paragraph', text: "The walls carry an extraordinary sculptural programme: the battle of Lanka from the Ramayana, panels of dancing Shiva, the churning of the cosmic ocean, and — in the most celebrated panel — Ravana shaking Mount Kailash while Parvati clings to Shiva in fear. This composition is widely regarded as one of the greatest works of Indian sculpture." },
      { type: 'paragraph', text: "The temple's original appearance was even more dramatic: traces of white lime plaster and paint survive in protected recesses, suggesting the entire structure was once brilliantly white — a genuine Mount Kailash in the Deccan landscape." },
    ],
  },

  'symbolism-of-konark': {
    pullQuote:
      'Each of the 24 wheels at Konark is also a working sundial. The spokes cast shadows that allow time to be read to within minutes of accuracy.',
    body: [
      { type: 'paragraph', text: 'In 1255 CE, the Eastern Ganga king Narasimhadeva I commissioned a temple unlike any that had come before. The Konark Sun Temple would be built in the form of the divine chariot of Surya, the sun god — a colossal chariot with 24 stone wheels, seven stone horses, and a tower so tall it served as a navigational landmark for sailors.' },
      { type: 'heading', text: 'The Chariot of Time' },
      { type: 'paragraph', text: 'The 24 wheels are not decorative. Each represents one hour of the day. Within each wheel, the eight major spokes divide the day into praharas — the ancient Indian system of time measurement. The smaller spokes mark sub-divisions. This is a clock embedded in the architecture of a temple.' },
      { type: 'paragraph', text: 'To use the sundial, an observer stands at the hub and notes where the shadow of a spoke falls on the rim. Each of the 30 segments represents 48 minutes — one muhurta in traditional Indian timekeeping. Scholars who have tested this system report accuracy within minutes under clear sky conditions.' },
      { type: 'heading', text: 'The Seven Horses and the Solar Cycle' },
      { type: 'paragraph', text: 'The seven horses represent the seven days of the week. They also correspond to the seven colours of visible light, the seven musical notes (svaras) of Indian classical music, and the seven chakras of yogic tradition. The convergence of these symbolic systems in a single image is characteristic of the intellectual ambition of Kalinga culture.' },
      { type: 'paragraph', text: 'The horses face east — toward the rising sun — and the entire temple is oriented precisely on the east-west solar axis. At the equinoxes, the first rays of the rising sun strike the main entrance directly, passing through the hall and illuminating the sanctum.' },
      { type: 'heading', text: 'Knowledge Encoded in Stone' },
      { type: 'paragraph', text: "Among the most discussed features of Konark is the explicit erotic sculpture on the outer walls. The most persuasive scholarly interpretation notes that it occupies a specific zone — the exterior walls below the roof line — that in Shaivite temple cosmology represents the plane of human experience. The innermost sanctum, by contrast, is entirely austere. The progression from outer sensory world to inner transcendence is built into the architecture itself." },
      { type: 'heading', text: 'The Magnetic Legend' },
      { type: 'paragraph', text: "A persistent tradition claims that the Konark tower contained a powerful lodestone at its apex, which caused ships' compasses to fail and held the main idol suspended in mid-air. Modern archaeology has found no evidence of this. But the legend itself is revealing: the temple was so extraordinary that visitors found magnetism a more plausible explanation than human ingenuity." },
    ],
  },
}

export default function StoryReaderModal({ story, onClose }) {
  const scrollRef = useRef(null)
  const content = storyContent[story.id]

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-stretch justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

        {/* Panel */}
        <motion.div
          className="relative z-10 bg-[#FAFAF8] w-full max-w-3xl h-full overflow-y-auto"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          ref={scrollRef}
        >
          {/* Hero image */}
          <div className="relative w-full aspect-[16/7] shrink-0 overflow-hidden">
            <img
              src={story.image}
              alt={story.imageAlt || story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#FAFAF8]" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close story"
            >
              <X size={16} />
            </button>

            <button
              onClick={onClose}
              className="absolute top-5 left-5 flex items-center gap-2 text-white/80 hover:text-white text-[10px] tracking-[0.18em] transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <ArrowLeft size={13} />
              STORIES
            </button>
          </div>

          {/* Content */}
          <div className="px-8 md:px-12 pt-8 pb-20">
            {/* Meta */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-[9px] tracking-[0.25em] text-[#C4A882]"
                style={{ fontFamily: 'var(--font-mono)' }}>
                {story.category}
              </span>
              <span className="w-px h-3 bg-black/15" />
              <span className="text-[9px] tracking-[0.15em] text-[#999] flex items-center gap-1.5"
                style={{ fontFamily: 'var(--font-mono)' }}>
                <Clock size={10} />
                {story.readTime}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-[#111] font-semibold leading-tight mb-8"
              style={{ fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '-0.02em' }}
            >
              {story.title}
            </h1>

            {/* Pull quote */}
            {content?.pullQuote && (
              <blockquote className="border-l-2 border-[#C4A882] pl-5 mb-10">
                <p className="text-[#555] italic leading-relaxed"
                  style={{ fontSize: 'clamp(15px, 1.8vw, 19px)' }}>
                  &ldquo;{content.pullQuote}&rdquo;
                </p>
              </blockquote>
            )}

            {/* Body */}
            {content?.body?.map((block, i) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={i} className="text-[#111] font-semibold mt-10 mb-4"
                    style={{ fontSize: 'clamp(16px, 1.6vw, 20px)' }}>
                    {block.text}
                  </h2>
                )
              }
              return (
                <p key={i} className="text-[#444] leading-relaxed mb-5"
                  style={{ fontSize: 'clamp(14px, 1.3vw, 16px)' }}>
                  {block.text}
                </p>
              )
            })}

            {/* Fallback if no content */}
            {!content && (
              <p className="text-[#999] text-sm leading-relaxed">{story.description}</p>
            )}

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-black/8">
              <p className="text-[9px] tracking-[0.2em] text-[#bbb]"
                style={{ fontFamily: 'var(--font-mono)' }}>
                BHARAT — LIVING HERITAGE OF INDIA · EDITORIAL
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
