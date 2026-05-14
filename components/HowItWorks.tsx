'use client'

import { useReveal } from '@/hooks/useReveal'
import { Search, Calendar, CreditCard, KeyRound } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Cherchez votre logement',
    description:
      'Parcourez des centaines de logements vérifiés à Brazzaville et partout au Congo. Filtrez par prix, quartier, type de logement et équipements.',
    detail: 'Disponible sur iOS & Android',
  },
  {
    number: '02',
    icon: Calendar,
    title: 'Choisissez vos dates',
    description:
      'Sélectionnez vos dates d\'arrivée et de départ. Vérifiez la disponibilité en temps réel et consultez les avis d\'autres locataires.',
    detail: 'Calendrier en temps réel',
  },
  {
    number: '03',
    icon: CreditCard,
    title: 'Payez via Mobile Money',
    description:
      'Réglez en toute sécurité avec MTN Mobile Money ou Airtel Money. Votre paiement est protégé jusqu\'à votre arrivée dans le logement.',
    detail: 'MTN & Airtel acceptés',
  },
  {
    number: '04',
    icon: KeyRound,
    title: 'Profitez de votre séjour',
    description:
      'Recevez la confirmation et les clés d\'accès numériques. Communiquez avec le propriétaire via notre messagerie intégrée.',
    detail: 'Check-in sans contact',
  },
]

export default function HowItWorks() {
  const sectionRef = useReveal()

  return (
    <section id="how-it-works" ref={sectionRef as React.RefObject<HTMLElement>} className="relative py-32 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#0a1320] blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <div className="inline-flex items-center gap-2 glass-warm rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#122f55] text-xs font-mono tracking-widest uppercase">Comment ça marche</span>
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Simple comme
            <br />
            <em className="not-italic gradient-text">bonjour</em>
          </h2>
          <p className="text-dark-300 text-lg font-body font-light max-w-xl mx-auto">
            De la recherche à l'emménagement en 4 étapes seulement.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#122f55] to-transparent" />
            {/* Dots on the line */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#122f55]"
                style={{ left: `${33.33 * (i + 1) - 2}%` }}
              />
            ))}
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="reveal relative text-center lg:text-left group"
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  {/* Step number */}
                  <div className="relative inline-block mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-dark-900 border border-white/10 flex items-center justify-center mx-auto lg:mx-0 relative z-10 group-hover:border-[#00E5FF] transition-colors duration-300 group-hover:shadow-glow">
                      <Icon size={22} className="text-[#3880df]" />
                    </div>
                    <span className="absolute -top-2 -right-2 lg:-top-2 lg:-right-2 font-mono text-xs font-bold text-[#122f55]">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold text-white mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-dark-400 text-sm font-body leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Detail badge */}
                  <div className="inline-flex items-center gap-2 bg-white/3 border border-white/8 rounded-full px-3 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                    <span className="text-xs text-dark-300 font-mono">{step.detail}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
