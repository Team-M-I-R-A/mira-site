'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { label: 'Fonctionnalités', href: '#features' },
  { label: 'Comment ça marche', href: '#how-it-works' },
  { label: 'Mobile Money', href: '#payment' },
  { label: 'Avis', href: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ferme le menu si on clique en dehors de la nav
  useEffect(() => {
    if (!open) return
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick, { passive: true })
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [open])

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen((prev) => !prev)
  }

  return (
    <nav
      ref={navRef}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50}}
      className={[
        'transition-all duration-300',
        scrolled ? 'glass py-3' : 'bg-transparent py-3',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <Image src="/logo.png" alt="" width={48} height={48} />
          <Image src="/name.png" alt="" width={86} height={86} />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-dark-300 hover:text-white text-sm font-body font-medium transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00E5FF] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#waitlist"
            className="relative overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2233DD] via-[#1A6BFF] to-[#00E5FF] text-white text-sm font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5 group"
          >
            <span className="relative z-10">Rejoindre la liste d'attente</span>
            <div className="absolute inset-0 shimmer-btn opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>

        {/* Mobile toggle — Safari-safe */}
        <button
          type="button"
          onClick={handleToggle}
          onTouchEnd={handleToggle}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          style={{
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            cursor: 'pointer',
            minWidth: 44,
            minHeight: 44,
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            padding: 0,
            color: 'rgba(255,255,255,0.8)',
          }}
          className="md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: open ? '400px' : '0px',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.25s ease',
          WebkitTransition: 'max-height 0.3s ease, opacity 0.25s ease',
        }}
      >
        <div className="px-6 pb-6 pt-2 space-y-4 glass border-t border-white/5 mt-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-dark-200 hover:text-white text-sm font-medium py-2 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="block w-full text-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#2233DD] via-[#1A6BFF] to-[#00E5FF] text-white text-sm font-medium mt-2"
            onClick={() => setOpen(false)}
          >
            Rejoindre la liste d'attente
          </a>
        </div>
      </div>
    </nav>
  )
}