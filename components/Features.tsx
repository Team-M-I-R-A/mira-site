'use client'

import { useReveal } from '@/hooks/useReveal'
import { Smartphone, Shield, MapPin, Zap, MessageCircle, Star } from 'lucide-react'

const features = [
  {
    icon: Smartphone,
    title: 'Mobile Money intégré',
    description:
      'Payez en toute sécurité avec MTN Mobile Money ou Airtel Money. Fini les tracas de paiements cash ou de transferts risqués.',
    accent: 'from-brand-600 to-brand-500',
    glow: 'rgba(249,115,22,0.3)',
    tag: 'Exclusif Congo',
  },
  {
    icon: Shield,
    title: 'Paiements 100% sécurisés',
    description:
      'Votre argent est protégé jusqu\'à confirmation de votre séjour. En cas de problème, notre équipe vous rembourse intégralement.',
    accent: 'from-green-600 to-emerald-500',
    glow: 'rgba(16,185,129,0.3)',
    tag: 'Garanti',
  },
  {
    icon: MapPin,
    title: 'Partout au Congo',
    description:
      'Brazzaville, Pointe-Noire, Dolisie, Nkayi… Des logements vérifiés dans chaque ville. Trouvez votre chambre en quelques secondes.',
    accent: 'from-blue-600 to-blue-500',
    glow: 'rgba(59,130,246,0.3)',
    tag: 'Tout le territoire',
  },
  {
    icon: Zap,
    title: 'Réservation instantanée',
    description:
      'En moins de 3 minutes, votre logement est réservé et confirmé. Plus besoin d\'appels interminables ou de déplacements inutiles.',
    accent: 'from-gold-600 to-gold-500',
    glow: 'rgba(245,158,11,0.3)',
    tag: '< 3 minutes',
  },
  {
    icon: MessageCircle,
    title: 'Chat en temps réel',
    description:
      'Communiquez directement avec les propriétaires. Posez vos questions, négociez les tarifs et recevez des confirmations instantanées.',
    accent: 'from-purple-600 to-violet-500',
    glow: 'rgba(139,92,246,0.3)',
    tag: 'Messagerie intégrée',
  },
  {
    icon: Star,
    title: 'Avis vérifiés',
    description:
      'Chaque avis est laissé par un locataire réel ayant séjourné dans le logement. Prenez vos décisions en toute confiance.',
    accent: 'from-rose-600 to-rose-500',
    glow: 'rgba(244,63,94,0.3)',
    tag: '100% authentique',
  },
]

export default function Features() {
  const sectionRef = useReveal()

  return (
    <section id="features" ref={sectionRef as React.RefObject<HTMLElement>} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#0e1335] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <div className="inline-flex items-center gap-2 glass-warm rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#122f55] text-xs font-mono tracking-widest uppercase">Fonctionnalités</span>
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Tout ce dont vous
            <br />
            <em className="not-italic gradient-text">avez besoin</em>
          </h2>
          <p className="text-dark-300 text-lg font-body font-light max-w-2xl mx-auto leading-relaxed">
            M I R A a été conçu spécifiquement pour répondre aux besoins et aux réalités
            du marché immobilier congolais.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="reveal group relative glass rounded-2xl p-7 border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2 cursor-default"
                style={{
                  // transitionDelay s'applique à TOUTES les transitions du groupe,
                  // y compris la transition opacity/transform déclenchée par .visible
                  transitionDelay: `${i * 0.08}s`,
                  WebkitTransitionDelay: `${i * 0.08}s`,
                }}
              >
                {/* Hover glow — Fix 1 : -webkit-backdrop-filter ajouté via style */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `0 0 40px ${feature.glow}`, // Fix 3 — inset retiré
                  }}
                />

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-5 bg-gradient-to-bl from-white to-transparent" />

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.accent} flex items-center justify-center mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  style={{ boxShadow: `0 8px 24px ${feature.glow}` }}
                >
                  <Icon size={22} className="text-white" />
                </div>

                {/* Tag — Fix 2 : bg-clip-text remplacé par style inline WebKit */}
                <div
                  className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${feature.accent} text-xs font-mono font-medium mb-3`}
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{
                      background: feature.glow,
                      opacity: 1,
                      filter: 'brightness(2)',
                      // Fix 2 — WebkitTextFillColor ne s'applique pas aux spans enfants
                      WebkitTextFillColor: 'initial',
                    }}
                  />
                  {feature.tag}
                </div>

                <h3 className="font-display text-xl font-medium text-white mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-dark-400 text-sm font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}