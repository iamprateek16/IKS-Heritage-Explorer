// src/components/MonumentQRCard.jsx
// ─── Museum-grade QR Card for physical placards and digital sharing ──────────

import { useState, useRef } from 'react'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'
import { Copy, Check, Download, ExternalLink, QrCode, Smartphone } from 'lucide-react'
import { getFullDestinationUrl } from '../utils/heritageRouting'

export default function MonumentQRCard({
  site,
  customBaseUrl,
  variant = 'card', // 'card' | 'compact' | 'placard'
  showDownload = true,
}) {
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef(null)

  if (!site) return null

  const targetUrl = getFullDestinationUrl(site, customBaseUrl)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Fallback if clipboard API is blocked
      const input = document.createElement('input')
      input.value = targetUrl
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  const handleDownload = () => {
    // Generate clean PNG download from hidden canvas
    const canvas = canvasRef.current?.querySelector('canvas')
    if (!canvas) return

    // Create a composite canvas with title and border for clean printing
    const exportCanvas = document.createElement('canvas')
    const ctx = exportCanvas.getContext('2d')
    const qrSize = canvas.width
    const padding = 40
    const headerHeight = 70
    const footerHeight = 60

    exportCanvas.width = qrSize + padding * 2
    exportCanvas.height = qrSize + padding * 2 + headerHeight + footerHeight

    // Background
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height)

    // Border
    ctx.strokeStyle = '#D4AF37'
    ctx.lineWidth = 4
    ctx.strokeRect(10, 10, exportCanvas.width - 20, exportCanvas.height - 20)

    // Header text
    ctx.fillStyle = '#111111'
    ctx.font = 'bold 20px "Cinzel", Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText(site.name.toUpperCase(), exportCanvas.width / 2, 45)

    ctx.fillStyle = '#888888'
    ctx.font = '11px monospace'
    ctx.fillText(`${site.location} · ${site.periodShort || site.period}`, exportCanvas.width / 2, 65)

    // Draw QR
    ctx.drawImage(canvas, padding, padding + headerHeight, qrSize, qrSize)

    // Footer text
    ctx.fillStyle = '#666666'
    ctx.font = '12px sans-serif'
    ctx.fillText('Scan with camera to explore in 3D', exportCanvas.width / 2, exportCanvas.height - 40)

    ctx.fillStyle = '#999999'
    ctx.font = '10px monospace'
    ctx.fillText('BHARAT · IKS HERITAGE EXPLORER', exportCanvas.width / 2, exportCanvas.height - 22)

    // Trigger download
    const link = document.createElement('a')
    link.download = `${site.slug || site.id}-qr-placard.png`
    link.href = exportCanvas.toDataURL('image/png')
    link.click()
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-lg">
        <div className="bg-white p-2 rounded shrink-0">
          <QRCodeSVG value={targetUrl} size={64} level="M" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] tracking-[0.2em] text-[#C4A882]" style={{ fontFamily: 'var(--font-mono)' }}>
            ON-SITE QR
          </div>
          <div className="text-white text-xs font-medium truncate">{site.name}</div>
          <div className="text-[10px] text-white/40 truncate font-mono mt-0.5">{targetUrl}</div>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 text-white/60 hover:text-white transition-colors"
          title="Copy Link"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        </button>
      </div>
    )
  }

  if (variant === 'placard') {
    return (
      <div className="bg-white text-[#111] p-6 rounded-lg border-2 border-[#D4AF37]/50 shadow-lg flex flex-col items-center text-center max-w-[280px]">
        <div className="text-[9px] tracking-[0.25em] text-[#8B6914] mb-1 font-semibold" style={{ fontFamily: 'var(--font-mono)' }}>
          BHARAT · LIVING HERITAGE
        </div>
        <h4 className="text-base font-serif font-bold text-[#111] mb-1">{site.name}</h4>
        <p className="text-[10px] text-[#666] font-mono mb-4">{site.location}</p>

        <div className="bg-white p-3 rounded-lg border border-black/10 shadow-inner mb-4">
          <QRCodeSVG value={targetUrl} size={160} level="Q" />
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[#444] font-medium mb-1">
          <Smartphone size={13} className="text-[#8B6914]" />
          <span>Scan to explore in 3D</span>
        </div>
        <p className="text-[9px] text-[#888] font-mono break-all px-2 mt-1">{targetUrl}</p>
      </div>
    )
  }

  // Default 'card' variant
  return (
    <div className="bg-[#141414] border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-[#C4A882]/40 transition-all duration-300 group">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] tracking-[0.2em] text-[#C4A882]" style={{ fontFamily: 'var(--font-mono)' }}>
                SITE [0{site.number || 1}]
              </span>
              <span className="px-1.5 py-0.5 text-[8px] tracking-[0.15em] bg-white/5 border border-white/10 rounded text-white/50" style={{ fontFamily: 'var(--font-mono)' }}>
                {site.type}
              </span>
            </div>
            <h3 className="text-white font-medium text-lg tracking-tight group-hover:text-[#C4A882] transition-colors">
              {site.name}
            </h3>
            <p className="text-white/40 text-[11px] mt-0.5">{site.location}</p>
          </div>
          <span className="text-white/20 group-hover:text-[#C4A882]/60 transition-colors">
            <QrCode size={20} />
          </span>
        </div>

        {/* QR Code display */}
        <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center my-3 relative shadow-inner">
          <QRCodeSVG value={targetUrl} size={180} level="M" />
          <div className="mt-2 text-[9px] text-zinc-500 font-mono tracking-tight text-center truncate max-w-full">
            {site.slug || site.id}
          </div>
        </div>

        {/* Hidden Canvas used for high-res PNG export */}
        <div ref={canvasRef} style={{ display: 'none' }}>
          <QRCodeCanvas value={targetUrl} size={512} level="H" includeMargin />
        </div>

        {/* Resolved Target URL */}
        <div className="bg-black/40 rounded px-2.5 py-1.5 border border-white/5 mb-4">
          <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-0.5" style={{ fontFamily: 'var(--font-mono)' }}>
            Target Destination
          </div>
          <div className="text-[10px] text-white/70 font-mono truncate hover:text-white transition-colors" title={targetUrl}>
            {targetUrl}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 px-2.5 py-2 text-[10px] tracking-[0.1em] text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/5 transition-all"
          style={{ fontFamily: 'var(--font-mono)' }}
          title="Copy full public URL"
        >
          {copied ? (
            <>
              <Check size={11} className="text-emerald-400" />
              <span className="text-emerald-400">COPIED</span>
            </>
          ) : (
            <>
              <Copy size={11} />
              <span>COPY</span>
            </>
          )}
        </button>

        {showDownload && (
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 text-[10px] tracking-[0.1em] text-[#C4A882]/80 hover:text-[#C4A882] bg-[#C4A882]/5 hover:bg-[#C4A882]/15 rounded border border-[#C4A882]/20 transition-all"
            style={{ fontFamily: 'var(--font-mono)' }}
            title="Download printable PNG placard"
          >
            <Download size={11} />
            <span>SAVE PNG</span>
          </button>
        )}

        <a
          href={`/heritage/${site.slug || site.id}`}
          className="flex items-center justify-center gap-1.5 px-2.5 py-2 text-[10px] tracking-[0.1em] text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/5 transition-all no-underline"
          style={{ fontFamily: 'var(--font-mono)' }}
          title="Open site destination page"
        >
          <ExternalLink size={11} />
          <span>VISIT</span>
        </a>
      </div>
    </div>
  )
}
