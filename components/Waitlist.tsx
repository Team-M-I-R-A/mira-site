'use client'

import { useReveal } from '@/hooks/useReveal'
import { APP_URL } from '@/lib/config'
import { ArrowRight, CheckCircle, Smartphone } from 'lucide-react'

const perks = [
  'Recherche et réservation de logements vérifiés',
  'Paiement Mobile Money sécurisé',
  'Accessible directement depuis votre navigateur',
]

export default function Waitlist() {
  const sectionRef = useReveal()

  return (
    <section id="waitlist" ref={sectionRef as React.RefObject<HTMLElement>} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-[#0c1825] blur-[150px]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(16, 52, 117, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="reveal relative glass-warm rounded-3xl border border-[#00E5FF] overflow-hidden p-10 lg:p-16">
          {/* Glow border */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: 'inset 0 0 60px rgba(249,115,22,0.08)' }} />

          {/* Decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#041825] blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#041825] blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 border border-[#00E5FF]">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[#00E5FF] text-xs font-mono tracking-widest uppercase">Disponible maintenant</span>
              </div>

              <h2 className="font-display text-4xl lg:text-5xl font-light text-white mb-5 leading-tight">
                L&apos;application est
                <br />
                <em className="not-italic gradient-text">disponible</em>
              </h2>

              <p className="text-dark-300 font-body text-base leading-relaxed mb-8">
                Créez votre compte, trouvez votre logement et payez en toute
                sécurité via Mobile Money, directement depuis votre navigateur.
              </p>

              {/* Perks */}
              <div className="space-y-3">
                {perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-3">
                    <CheckCircle size={15} className="text-[#00E5FF] flex-shrink-0" />
                    <span className="text-dark-200 text-sm font-body">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — App access */}
            <div className="rounded-2xl border border-white/10 bg-white/3 p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center mx-auto mb-5">
                <Smartphone size={28} className="text-[#00E5FF]" />
              </div>

              <h3 className="font-display text-2xl font-semibold text-white mb-2">
                Prêt à commencer ?
              </h3>
              <p className="text-dark-300 text-sm font-body leading-relaxed mb-6">
                Ouvrez l&apos;application M I R A dans votre navigateur, sur
                mobile comme sur ordinateur, et trouvez votre prochain logement.
              </p>

              <a
                href={APP_URL}
                className="relative flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#2233DD] via-[#1A6BFF] to-[#00E5FF] px-5 py-3 text-sm font-medium text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg group"
              >
                <span className="relative z-10">Ouvrir l&apos;application</span>
                <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 shimmer-btn" />
              </a>

              <a
                href="#features"
                className="mt-3 inline-flex min-h-[44px] touch-manipulation items-center justify-center rounded-xl px-4 text-xs font-medium text-dark-300 transition-colors duration-200 hover:text-white"
              >
                Découvrir les fonctionnalités
              </a>

              <p className="text-center text-dark-600 text-xs font-body">
                Sans installation · iOS, Android &amp; ordinateur · Mobile Money
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
