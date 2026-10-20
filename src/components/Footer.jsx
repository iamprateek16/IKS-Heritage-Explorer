import { Link } from 'react-router-dom'

export default function Footer() {
  const footerLinks = [
    { label: 'EXPLORE', href: '#explore' },
    { label: '3D ARCHIVE', href: '#archive' },
    { label: 'HERITAGE MAP', href: '#map' },
    { label: 'TIMELINE', href: '#timeline' },
    { label: 'STORIES', href: '#stories' },
    { label: 'QR PLACARD HUB', href: '/qr-hub', isRoute: true },
    { label: 'ABOUT', href: '#about' },
  ]

  return (
    <footer className="bg-[#FCFCFC] border-t border-black/5 px-8 md:px-12 py-16">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        {/* Brand */}
        <div>
          <div className="font-semibold tracking-[0.18em] text-sm text-[#111] mb-1">BHARAT</div>
          <div
            className="text-[10px] tracking-[0.14em] text-[#999]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            LIVING HERITAGE OF INDIA
          </div>
          <p className="text-[#bbb] text-xs mt-5 max-w-xs leading-relaxed">
            An interactive digital exploration of India's cultural heritage.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {footerLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-[10px] tracking-[0.2em] text-[#8B6914] font-medium hover:text-[#111] transition-colors no-underline"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                ● {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] tracking-[0.2em] text-[#999] hover:text-[#111] transition-colors no-underline"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {link.label}
              </a>
            )
          )}
        </nav>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-16 pt-8 border-t border-black/5">
        <span
          className="text-[10px] tracking-[0.15em] text-[#ccc]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          © 2024 BHARAT HERITAGE EXPLORER
        </span>
        <div className="flex items-center gap-6">
          {['PRIVACY', 'TERMS', 'ACCESSIBILITY'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[10px] tracking-[0.15em] text-[#ccc] hover:text-[#666] transition-colors no-underline"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
