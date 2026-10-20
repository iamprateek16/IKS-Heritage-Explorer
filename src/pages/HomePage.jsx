// src/pages/HomePage.jsx — BHARAT: Living Heritage of India
import { useState, useRef } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import HeritageIntro from '../sections/HeritageIntro'
import HeritageCollection from '../sections/HeritageCollection'
import Heritage3DViewer from '../sections/Heritage3DViewer'
import HeritageMap from '../sections/HeritageMap'
import HeritageTimeline from '../sections/HeritageTimeline'
import StorySection from '../sections/StorySection'
import CTASection from '../sections/CTASection'

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  // Shared state: when user clicks "Explore in 3D" from Map or Collection,
  // this sets the active model in the 3D Archive section
  const [activeModelId, setActiveModelId] = useState(null)
  const archiveRef = useRef(null)

  const handleExplore3D = (siteId) => {
    setActiveModelId(siteId)
    // Scroll to archive section
    const el = document.getElementById('archive')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <Navigation />
      <main>
        <Hero />
        <HeritageIntro
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <HeritageCollection
          activeCategory={activeCategory}
          onExplore3D={handleExplore3D}
        />
        <div ref={archiveRef}>
          <Heritage3DViewer
            activeModelId={activeModelId}
            onModelChange={setActiveModelId}
          />
        </div>
        <HeritageMap onExplore3D={handleExplore3D} />
        <HeritageTimeline />
        <StorySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
