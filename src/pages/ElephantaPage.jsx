import HeritageModelViewer from '../components/HeritageModelViewer'
import './ElephantaPage.css'

const INFO_CARDS = [
  {
    icon: '🏛️',
    title: 'UNESCO World Heritage',
    body: 'Inscribed in 1987, the Elephanta Caves are a collection of cave temples predominantly dedicated to the Hindu god Shiva.',
  },
  {
    icon: '📅',
    title: '5th – 8th Century CE',
    body: 'Built during the Kalachuri and early Chalukya periods, the caves showcase exceptional rock-cut architecture and sculpture.',
  },
  {
    icon: '📍',
    title: 'Elephanta Island, Maharashtra',
    body: 'Located in Mumbai Harbour, the island is accessible only by boat — making it a hidden gem of Indian heritage.',
  },
  {
    icon: '🗿',
    title: 'Trimurti Sadashiva',
    body: 'The centrepiece is the monumental 6-metre Trimurti — three faces of Shiva representing creation, preservation, and destruction.',
  },
]

export default function ElephantaPage() {
  return (
    <div className="ep-root">
      {/* ── Header ── */}
      <header className="ep-header">
        <div className="ep-header-inner">
          <div className="ep-badge">IKS Heritage Explorer</div>
          <h1 className="ep-title">Elephanta Caves</h1>
          <p className="ep-subtitle">
            Walk through a 1,500-year-old rock-cut marvel — now in 3D
          </p>
        </div>
        <div className="ep-header-glow" aria-hidden="true" />
      </header>

      {/* ── 3D Viewer ── */}
      <section className="ep-viewer-section" aria-label="3D Model Viewer">
        <div className="ep-viewer-frame">
          <div className="ep-viewer-label">
            <span className="ep-dot" /> Interactive 3D Model
          </div>
          <HeritageModelViewer
            modelUrl="/models/elephanta.glb"
            title="Elephanta Caves 3D Model"
          />
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className="ep-info-section" aria-label="Site Information">
        <h2 className="ep-section-title">About the Site</h2>
        <div className="ep-cards">
          {INFO_CARDS.map((card) => (
            <article key={card.title} className="ep-card">
              <span className="ep-card-icon" aria-hidden="true">
                {card.icon}
              </span>
              <h3 className="ep-card-title">{card.title}</h3>
              <p className="ep-card-body">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="ep-footer">
        <p>
          IKS Heritage Explorer &nbsp;·&nbsp; Preserving India&apos;s Living
          Knowledge
        </p>
      </footer>
    </div>
  )
}
