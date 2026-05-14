'use client'

import { useReveal } from '@/hooks/useReveal'
import PhoneMockup from './PhoneMockup'
import { ArrowRight } from 'lucide-react'

const screenshots = [
  {
    screen: 'home' as const,
    title: 'Accueil',
    desc: 'Découvrez les logements recommandés près de vous',
    delay: '0s',
  },
  {
    screen: 'detail' as const,
    title: 'Détail logement',
    desc: 'Toutes les infos et galerie photos du logement',
    delay: '0.2s',
  },
]

export default function AppShowcase() {
  const sectionRef = useReveal()

  return (
    <section className="relative py-32 overflow-hidden" ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0a1320] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0a1320] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-[#030f29d0] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <div className="inline-flex items-center gap-2 glass-warm rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#00E5FF] text-xs font-mono tracking-widest uppercase">L'Application</span>
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Une expérience
            <br />
            <em className="not-italic gradient-text">pensée pour vous</em>
          </h2>
          <p className="text-dark-300 text-lg font-body font-light max-w-2xl mx-auto">
            Interface épurée, navigation intuitive. Conçue pour fonctionner même avec une
            connexion internet limitée.
          </p>
        </div>

        {/* Mockups display */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-20">
          {screenshots.map((s, i) => (
            <div
              key={s.screen}
              className="reveal flex flex-col items-center gap-6"
              style={{ transitionDelay: s.delay }}
            >
              {/* Phone */}
              <div className={i % 2 === 0 ? 'animate-float' : 'animate-float-delay'}>
                <PhoneMockup screen={s.screen} />
              </div>
              {/* Label */}
              <div className="text-center">
                <p className="text-white font-display text-xl font-medium mb-1">{s.title}</p>
                <p className="text-dark-400 text-sm font-body">{s.desc}</p>
              </div>
            </div>
          ))}

          {/* Center decorative element */}
          <div className="hidden lg:flex flex-col items-center gap-4 reveal">
            <div className="flex flex-col gap-3">
              {[
                { icon: '🏠', text: 'Logements vérifiés' },
                { icon: '💳', text: 'Mobile Money' },
                { icon: '⭐', text: 'Avis authentiques' },
                { icon: '📍', text: 'Géolocalisation' },
                { icon: '🔒', text: 'Paiement sécurisé' },
                { icon: '💬', text: 'Chat intégré' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 glass rounded-xl px-4 py-2.5 border border-white/5 hover:border-[#00E5FF]/20 transition-all duration-300 hover:shadow-glow cursor-default group"
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="text-sm text-dark-300 group-hover:text-white transition-colors font-body whitespace-nowrap">{item.text}</span>
                  <ArrowRight size={12} className="text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
