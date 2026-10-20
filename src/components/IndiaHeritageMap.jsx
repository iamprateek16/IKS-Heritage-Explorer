// src/components/IndiaHeritageMap.jsx
// ─── Reusable Interactive India Heritage Map ─────────────────────────────────
// Uses standard OpenStreetMap raster tiles (NO CARTO API KEY REQUIRED)
// URL: https://tile.openstreetmap.org/{z}/{x}/{y}.png
// Attribution: © OpenStreetMap contributors (https://www.openstreetmap.org/copyright)

import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  Compass,
  Maximize2,
  Box,
  ExternalLink,
  Layers,
  MapPin,
  RefreshCw,
} from 'lucide-react'
import { heritageSites } from '../data/heritage'
import { getSitePath } from '../utils/heritageRouting'

// Default India geographic center & bounds
const INDIA_CENTER = [22.8, 79.6]
const DEFAULT_ZOOM = 5

// Custom marker icon creator
function createHeritageIcon(isActive = false, siteNumber = null) {
  const size = isActive ? 32 : 24
  const innerDot = isActive ? 12 : 8
  const borderColor = isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'
  const bgColor = isActive ? '#D4AF37' : '#C4A882'
  const glow = isActive
    ? '0 0 16px rgba(212, 175, 55, 0.9), 0 2px 8px rgba(0,0,0,0.8)'
    : '0 0 8px rgba(196, 168, 130, 0.5), 0 2px 6px rgba(0,0,0,0.6)'

  const html = `
    <div style="
      position: relative;
      width: ${size}px;
      height: ${size}px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    ">
      <div style="
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${bgColor};
        opacity: ${isActive ? 0.35 : 0.2};
        animation: ${isActive ? 'leaflet-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' : 'none'};
      "></div>
      <div style="
        position: relative;
        width: ${size - 8}px;
        height: ${size - 8}px;
        background: #111111;
        border: 2px solid ${borderColor};
        border-radius: 50%;
        box-shadow: ${glow};
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease;
      ">
        <div style="
          width: ${innerDot}px;
          height: ${innerDot}px;
          background: ${bgColor};
          border-radius: 50%;
        "></div>
      </div>
      ${
        siteNumber !== null
          ? `
        <div style="
          position: absolute;
          bottom: -16px;
          background: rgba(10,10,10,0.85);
          color: #E0D0B8;
          font-family: monospace;
          font-size: 8px;
          font-weight: 600;
          padding: 1px 4px;
          border-radius: 2px;
          border: 1px solid rgba(255,255,255,0.15);
          pointer-events: none;
          white-space: nowrap;
        ">0${siteNumber}</div>
      `
          : ''
      }
    </div>
  `

  return L.divIcon({
    html,
    className: 'heritage-marker-wrapper',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  })
}

// Build standard HTML popup content for Leaflet
function createPopupContent(site) {
  const detailsUrl = getSitePath(site)
  const has3D = Boolean(site.modelPath)

  return `
    <div class="ihm-popup-card" style="
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #EAEAEA;
      background: #121212;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      overflow: hidden;
      width: 260px;
      box-shadow: 0 16px 36px rgba(0,0,0,0.7);
    ">
      <div style="position: relative; height: 120px; overflow: hidden; background: #1c1c1c;">
        <img
          src="${site.imagePath || site.image}"
          alt="${site.name}"
          style="width: 100%; height: 100%; object-fit: cover; display: block;"
          onerror="this.style.display='none'"
        />
        <div style="
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #121212 0%, rgba(18,18,18,0.2) 60%, transparent 100%);
        "></div>
        <div style="
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(0,0,0,0.65);
          border: 1px solid rgba(196,168,130,0.3);
          color: #C4A882;
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 0.15em;
          padding: 2px 6px;
          border-radius: 3px;
        ">${site.periodShort || site.period || 'HERITAGE'}</div>
      </div>

      <div style="padding: 12px 14px 14px;">
        <h4 style="
          margin: 0 0 3px;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.25;
        ">${site.name}</h4>

        <div style="
          display: flex;
          align-items: center;
          gap: 4px;
          color: rgba(255,255,255,0.5);
          font-size: 11px;
          margin-bottom: 8px;
          font-family: monospace;
        ">
          <span>📍</span>
          <span>${site.location}</span>
        </div>

        <p style="
          margin: 0 0 12px;
          color: rgba(255,255,255,0.7);
          font-size: 11px;
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        ">${site.shortDesc || site.description}</p>

        <div style="display: grid; grid-template-columns: ${has3D ? '1fr 1fr' : '1fr'}; gap: 6px;">
          <a
            href="${detailsUrl}"
            class="ihm-popup-btn-detail"
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 4px;
              padding: 6px 10px;
              background: #C4A882;
              color: #0A0A0A;
              text-decoration: none;
              font-family: monospace;
              font-size: 9px;
              font-weight: 700;
              letter-spacing: 0.1em;
              border-radius: 4px;
              transition: background 0.2s;
            "
          >
            EXPLORE →
          </a>
          ${
            has3D
              ? `
            <button
              data-site-id="${site.id}"
              class="ihm-popup-btn-3d"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                padding: 6px 10px;
                background: rgba(255,255,255,0.08);
                color: #FFFFFF;
                border: 1px solid rgba(255,255,255,0.15);
                font-family: monospace;
                font-size: 9px;
                letter-spacing: 0.1em;
                border-radius: 4px;
                cursor: pointer;
              "
            >
              3D TWIN
            </button>
          `
              : ''
          }
        </div>
      </div>
    </div>
  `
}

export default function IndiaHeritageMap({
  height = '560px',
  focusSiteId = null,
  singleSite = null,
  activeSiteId = null,
  onSelectSite = null,
  onExplore3D = null,
  showControls = true,
  className = '',
}) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersMapRef = useRef({})
  const tileLayerRef = useRef(null)
  const navigate = useNavigate()

  const [mapTheme, setMapTheme] = useState('dark') // 'dark' | 'natural'
  const [mapLoaded, setMapLoaded] = useState(false)
  const [tileError, setTileError] = useState(false)

  // Sites to display: either single focused site or all 8 heritage sites
  const displaySites = singleSite ? [singleSite] : heritageSites

  // Fit bounds helper to frame all sites
  const handleFitAllSites = useCallback(() => {
    if (!mapInstanceRef.current) return
    const sites = displaySites
    if (sites.length === 1) {
      mapInstanceRef.current.setView(
        [sites[0].coordinates.lat, sites[0].coordinates.lng],
        12,
        { animate: true }
      )
    } else {
      const bounds = L.latLngBounds(
        sites.map((s) => [s.coordinates.lat, s.coordinates.lng])
      )
      mapInstanceRef.current.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 6,
        animate: true,
      })
    }
  }, [displaySites])

  // Center on India
  const handleCenterIndia = useCallback(() => {
    if (!mapInstanceRef.current) return
    mapInstanceRef.current.setView(INDIA_CENTER, DEFAULT_ZOOM, {
      animate: true,
    })
  }, [])

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return
    if (mapInstanceRef.current) return

    // Fix default Leaflet icon paths
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })

    const initialCenter = singleSite
      ? [singleSite.coordinates.lat, singleSite.coordinates.lng]
      : INDIA_CENTER
    const initialZoom = singleSite ? 12 : DEFAULT_ZOOM

    // Create Leaflet map instance
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: false, // Prevent wheel trapping on page scroll
    })

    // Enable wheel zoom when map is interacted with
    map.on('focus', () => map.scrollWheelZoom.enable())
    map.on('blur', () => map.scrollWheelZoom.disable())

    // ── OpenStreetMap Tile Layer (NO API KEY REQUIRED) ──
    const osmTileLayer = L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        minZoom: 3,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
        className: mapTheme === 'dark' ? 'osm-dark-tiles' : 'osm-natural-tiles',
      }
    )

    osmTileLayer.on('tileload', () => {
      setTileError(false)
      setMapLoaded(true)
    })

    osmTileLayer.on('tileerror', (err) => {
      console.warn('[IndiaHeritageMap] OSM tile error:', err)
      // If primary tile has an issue, note state
    })

    osmTileLayer.addTo(map)
    tileLayerRef.current = osmTileLayer

    // Zoom control in bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // Add markers for sites
    const markers = {}
    displaySites.forEach((site, index) => {
      const isInitialActive = activeSiteId === site.id || focusSiteId === site.id
      const marker = L.marker([site.coordinates.lat, site.coordinates.lng], {
        icon: createHeritageIcon(isInitialActive, index + 1),
        title: site.name,
        riseOnHover: true,
      })

      // Bind rich popup
      marker.bindPopup(createPopupContent(site), {
        maxWidth: 280,
        className: 'ihm-custom-popup',
      })

      marker.on('click', () => {
        if (onSelectSite) onSelectSite(site)
      })

      marker.addTo(map)
      markers[site.id] = marker
    })

    markersMapRef.current = markers
    mapInstanceRef.current = map

    // Attach delegated click listener for popup "3D TWIN" button
    const container = mapContainerRef.current
    const onPopupClick = (e) => {
      const btn3D = e.target.closest('.ihm-popup-btn-3d')
      if (btn3D) {
        const siteId = btn3D.getAttribute('data-site-id')
        if (siteId && onExplore3D) {
          onExplore3D(siteId)
        }
      }
    }
    container.addEventListener('click', onPopupClick)

    // Fit bounds across all sites if full India view
    if (!singleSite) {
      try {
        const bounds = L.latLngBounds(
          displaySites.map((s) => [s.coordinates.lat, s.coordinates.lng])
        )
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 6 })
      } catch {
        map.setView(INDIA_CENTER, DEFAULT_ZOOM)
      }
    }

    // Handle container resizing
    const resizeTimer1 = setTimeout(() => map.invalidateSize(), 150)
    const resizeTimer2 = setTimeout(() => map.invalidateSize(), 600)

    const onWindowResize = () => map.invalidateSize()
    window.addEventListener('resize', onWindowResize)

    return () => {
      clearTimeout(resizeTimer1)
      clearTimeout(resizeTimer2)
      window.removeEventListener('resize', onWindowResize)
      container.removeEventListener('click', onPopupClick)
      map.remove()
      mapInstanceRef.current = null
      markersMapRef.current = {}
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update tile layer CSS class when theme changes
  useEffect(() => {
    if (tileLayerRef.current) {
      const tilePane = mapInstanceRef.current?.getPane('tilePane')
      if (tilePane) {
        if (mapTheme === 'dark') {
          tilePane.classList.add('osm-dark-tiles')
          tilePane.classList.remove('osm-natural-tiles')
        } else {
          tilePane.classList.remove('osm-dark-tiles')
          tilePane.classList.add('osm-natural-tiles')
        }
      }
    }
  }, [mapTheme])

  // Update active marker icon when activeSiteId or focusSiteId changes
  useEffect(() => {
    const currentActive = activeSiteId || focusSiteId
    displaySites.forEach((site, index) => {
      const marker = markersMapRef.current[site.id]
      if (marker) {
        const isActive = site.id === currentActive
        marker.setIcon(createHeritageIcon(isActive, index + 1))
        if (isActive && mapInstanceRef.current && !singleSite) {
          mapInstanceRef.current.flyTo(
            [site.coordinates.lat, site.coordinates.lng],
            7,
            { animate: true, duration: 1.2 }
          )
        }
      }
    })
  }, [activeSiteId, focusSiteId, singleSite, displaySites])

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl ${className}`}
      style={{ height, minHeight: height }}
    >
      {/* ── Leaflet Map DOM Node ── */}
      <div
        ref={mapContainerRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%', minHeight: height }}
      />

      {/* ── Map Header & Action Overlay ── */}
      {showControls && (
        <div className="absolute top-4 left-4 z-[999] flex flex-wrap items-center gap-2 pointer-events-auto">
          {/* Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#121212]/90 backdrop-blur-md border border-white/15 rounded-md text-xs font-mono text-white/80 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#C4A882] animate-pulse" />
            <span className="font-semibold text-[#C4A882]">OPENSTREETMAP</span>
            <span className="text-white/40">·</span>
            <span className="text-white/60">
              {displaySites.length} SITES
            </span>
          </div>

          {/* Fit all sites button */}
          {!singleSite && (
            <button
              onClick={handleFitAllSites}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121212]/90 hover:bg-[#222222] backdrop-blur-md border border-white/15 rounded-md text-xs font-mono text-white/80 hover:text-white transition-colors shadow-lg"
              title="Fit all 8 heritage sites in view"
            >
              <Maximize2 size={12} className="text-[#C4A882]" />
              <span>FIT SITES</span>
            </button>
          )}

          {/* Reset India center */}
          {!singleSite && (
            <button
              onClick={handleCenterIndia}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121212]/90 hover:bg-[#222222] backdrop-blur-md border border-white/15 rounded-md text-xs font-mono text-white/80 hover:text-white transition-colors shadow-lg"
              title="Reset view to whole of India"
            >
              <Compass size={12} className="text-[#C4A882]" />
              <span>INDIA</span>
            </button>
          )}

          {/* Theme switcher: Museum Dark vs OSM Natural */}
          <button
            onClick={() =>
              setMapTheme((t) => (t === 'dark' ? 'natural' : 'dark'))
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121212]/90 hover:bg-[#222222] backdrop-blur-md border border-white/15 rounded-md text-xs font-mono text-white/80 hover:text-white transition-colors shadow-lg"
            title="Toggle between Museum Dark and Natural OpenStreetMap map styles"
          >
            <Layers size={12} className="text-[#C4A882]" />
            <span>{mapTheme === 'dark' ? 'MUSEUM DARK' : 'OSM NATURAL'}</span>
          </button>
        </div>
      )}

      {/* ── Error Banner if Network Fails ── */}
      {tileError && (
        <div className="absolute top-16 left-4 z-[999] px-4 py-2 bg-red-950/90 border border-red-500/40 rounded-md text-xs font-mono text-red-200">
          OpenStreetMap tile request timed out. Please check your internet connection.
        </div>
      )}

      {/* ── Legend / Hint in Bottom-Left ── */}
      <div className="absolute bottom-4 left-4 z-[999] hidden sm:flex items-center gap-3 px-3 py-1.5 bg-[#121212]/80 backdrop-blur-md border border-white/10 rounded-md text-[10px] font-mono text-white/50 pointer-events-none">
        <span>Click any marker for 3D twin & history</span>
        <span>·</span>
        <span className="text-[#C4A882]">No API Key Required</span>
      </div>
    </div>
  )
}
