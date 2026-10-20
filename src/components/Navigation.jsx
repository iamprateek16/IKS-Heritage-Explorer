// src/components/Navigation.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'

import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'EXPLORE', href: '#explore' },
  { label: 'HERITAGE', href: '#heritage' },
  { label: 'MAP', href: '#map' },
  { label: '3D ARCHIVE', href: '#archive' },
  { label: 'QR HUB', href: '/qr-hub', isRoute: true },
  { label: 'ABOUT', href: '#about' },
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-start justify-between px-8 md:px-12 pt-7 pb-5 transition-all duration-500 ${
          scrolled ? 'bg-[#FCFCFC]/90 backdrop-blur-md border-b border-black/5' : ''
        }`}
      >
        {/* Logo */}
        <a href="#" className="group no-underline">
          <div className="text-[#111] font-semibold tracking-[0.18em] text-sm leading-none select-none">
            BHARAT
          </div>
          <div
            className="text-[10px] tracking-[0.14em] mt-1 leading-none select-none"
            style={{ fontFamily: 'var(--font-mono)', color: '#999' }}
          >
            LIVING HERITAGE OF INDIA
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="group relative text-[11px] tracking-[0.2em] text-[#C4A882] hover:text-[#111] transition-colors duration-300 no-underline overflow-hidden font-medium"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="relative z-10 flex items-center gap-1">
                  <span>●</span> {link.label}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C4A882] transition-all duration-400 group-hover:w-full" />
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-[11px] tracking-[0.2em] text-[#666] hover:text-[#111] transition-colors duration-300 no-underline overflow-hidden"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#111] transition-all duration-400 group-hover:w-full" />
              </a>
            )
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-[#111] p-1"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col px-8 pt-7"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-white font-semibold tracking-[0.18em] text-sm">BHARAT</div>
                <div
                  className="text-[10px] tracking-[0.14em] mt-1 text-white/40"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  LIVING HERITAGE OF INDIA
                </div>
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-white/70 p-1" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-2 mt-16">
              {navLinks.map((link, i) =>
                link.isRoute ? (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-[#C4A882] hover:text-white text-3xl font-light py-3 border-b border-white/10 no-underline tracking-tight transition-colors block"
                    >
                      ● {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setMenuOpen(false)}
                    className="text-white/80 hover:text-white text-3xl font-light py-3 border-b border-white/10 no-underline tracking-tight transition-colors"
                  >
                    {link.label}
                  </motion.a>
                )
              )}
            </nav>

            <div
              className="mt-auto mb-10 text-[10px] tracking-[0.15em] text-white/25"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              © 2024 BHARAT HERITAGE EXPLORER
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
