'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Star } from 'lucide-react'
import PhoneMockup from './PhoneMockup'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  const [particles, setParticles] = useState<{ left: string; duration: string;delay: string}[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 12}, () => ({
        left: `${Math.random() * 100}%`,
        duration: `${8 + Math.random() * 12}s`,
        delay:    `${Math.random() * 8}s`,
      }))
    )

    // Parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const el = heroRef.current
      if (!el) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 30
      const y = (clientY / innerHeight - 0.5) * 30
      const blobs = el.querySelectorAll<HTMLElement>('.parallax-blob')
      blobs.forEach((blob, i) => {
        const factor = (i + 1) * 0.4
        blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])


  return (
    <section
    id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="parallax-blob absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#080616] blur-[120px] transition-transform duration-700 ease-out" />
        <div className="parallax-blob absolute top-1/3 -right-60 w-[500px] h-[500px] rounded-full bg-[#021A54] blur-[100px] transition-transform duration-700 ease-out" />
        <div className="parallax-blob absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#021A54] blur-[80px] transition-transform duration-700 ease-out" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 rounded-full bg-[#00E5FF]"
            style={{
              left: p.left,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-20">
        {/* Left content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 glass-warm rounded-full px-4 py-2 animate-fade-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-[#00E5FF]/60 text-xs font-mono font-medium tracking-widest uppercase">
              Lancement bientôt — Congo 🇨🇬
            </span>
          </div>

          {/* Heading */}
          <div className="animate-fade-up opacity-0 stagger-2" style={{ animationFillMode: 'forwards' }}>
            <h1 className="font-display text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] tracking-tight">
              <span className="gradient-text-white">Trouvez votre</span>
              <br />
              <em className="not-italic gradient-text">chez-vous</em>
              <br />
              <span className="gradient-text-white">au Congo</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-dark-300 text-lg font-body font-light leading-relaxed max-w-lg animate-fade-up opacity-0 stagger-3" style={{ animationFillMode: 'forwards' }}>
            La première plateforme de location de logements adaptée aux réalités congolaises. 
            Payez en toute sécurité via{' '}
            <span className="text-[#00E5FF] font-medium">Mobile Money</span> —
            simple, rapide et sans tracas.
          </p>

          {/* Stats inline */}
          <div className="flex flex-wrap gap-6 animate-fade-up opacity-0 stagger-4" style={{ animationFillMode: 'forwards' }}>
            {[
              { num: '50+', label: 'Logements listés' },
              { num: '98%', label: 'Satisfaction' },
              { num: '3 min', label: 'Réservation' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="h-8 w-px bg-dark-700" />
                <div>
                  <div className="font-display text-2xl font-semibold text-white">{stat.num}</div>
                  <div className="text-xs text-dark-400 font-body">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-up opacity-0 stagger-5" style={{ animationFillMode: 'forwards' }}>
            <a
              href="#waitlist"
              className="group relative overflow-hidden flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#2233DD] via-[#1A6BFF] to-[#00E5FF] text-white font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <span className="relative z-10">Rejoindre la liste d'attente</span>
              <ArrowDown size={16} className="relative z-10 rotate-[-90deg] transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 shimmer-btn" />
            </a>
            <a
              href="#features"
              className="flex items-center gap-2 px-7 py-4 rounded-2xl glass border border-white/10 text-white/80 hover:text-white font-medium transition-all duration-300 hover:-translate-y-1 hover:border-[#00E5FF]"
            >
              Voir les fonctionnalités
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 animate-fade-up opacity-0 stagger-6" style={{ animationFillMode: 'forwards' }}>
            <div className="flex -space-x-2.5">
              {['🧑🏿', '👩🏿', '👨🏿‍💼', '👩🏿‍💻', '🧔🏿'].map((emoji, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full glass border border-dark-700 flex items-center justify-center text-sm"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-xs text-dark-400 font-body">
                <span className="text-white font-medium">+80 personnes</span> déjà inscrites
              </p>
            </div>
          </div>
        </div>

        {/* Right — Phone mockups */}
        <div className="relative flex justify-center items-center h-[600px] animate-fade-in opacity-0 stagger-3" style={{ animationFillMode: 'forwards' }}>
          {/* Orbit decoration */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[340px] h-[340px] rounded-full border border-[#0e1133] animate-rotate-slow" />
            <div className="absolute w-[440px] h-[440px] rounded-full border border-[#0e1133]" style={{ animation: 'rotateSlow 30s linear infinite reverse' }} />

            {/* Orbit pills */}
            {[
              { icon: '📍', label: 'Brazzaville', color: 'from-[#2233DD] to-[#00E5FF]' },
              { icon: '💳', label: 'Mobile Money', color: 'from-gold-600 to-gold-500' },
              { icon: '🔒', label: 'Paiement sécurisé', color: 'from-green-700 to-green-600' },
            ].map((item, i) => (
              <div
                key={i}
                className="absolute"
                style={{ animation: `orbit ${12 + i * 3}s linear ${i * -4}s infinite` }}
              >
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${item.color} text-white text-xs font-medium shadow-lg whitespace-nowrap`}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main phone */}
          <div className="relative z-10 animate-float">
            <PhoneMockup screen="home" />
          </div>

          {/* Secondary phone */}
          <div className="absolute -right-4 lg:-right-8 top-16 z-0 scale-[0.78] animate-float-delay opacity-90">
            <PhoneMockup screen="detail" />
          </div>

          {/* Floating card */}
          <div className="absolute bottom-12 -left-4 lg:-left-12 z-20 glass-warm rounded-2xl p-4 animate-float-slow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-lg">
                ✓
              </div>
              <div>
                <p className="text-white text-sm font-medium">Paiement confirmé</p>
                <p className="text-dark-400 text-xs">MTN Mobile Money • 45 000 FCFA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle opacity-60">
        <span className="text-xs text-dark-400 font-mono tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} className="text-dark-400" />
      </div>
    </section>
  )
}
