'use client'

import { useReveal } from '@/hooks/useReveal'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Emmanuel Metowanou',
    role: 'Etudiant, Brazzaville',
    avatar: '👨🏿‍💼',
    rating: 5,
    text: "Enfin une application qui comprend nos besoins ! J'ai eu l'occasion de tester en avant première et je suis heureux de dire qu'elle a dépassé mes attentes, aussi bien au niveau des moyens de paiement proposés que de la qualité des interfaces.",
    verified: true,
  },
  {
    name: 'Archange Mossa',
    role: 'Client, Pointe-Noire',
    avatar: '🧔🏿',
    rating: 5,
    text: 'J\'ai eu la chance de découvrir cette application avant sa sortie officielle, et elle m\'a véritablement impressionné. L\'expérience est fluide, les moyens de paiement sont variés et sécurisés, et l\'interface est d\'une qualité remarquable. On sent qu\'elle a été pensée pour répondre aux besoins réels des utilisateurs. Ce qui m\'a le plus marqué, c\'est la sérénité qu\'elle apporte : grâce à cette application, chacun peut réserver et trouver des logements ou appartements en toute simplicité, sans stress et surtout à l\'abri des démarcheurs malhonnêtes auxquels nous étions trop souvent confrontés. Une véritable bouffée d\'air frais qui dépasse largement mes attentes.',
    verified: true,
  },
  {
    name: 'Christelle A.',
    role: 'Propriétaire, Pointe-Noire',
    avatar: '👩🏿‍💻',
    rating: 5,
    text: 'L\'interface est tellement intuitive et la réservation d\'un logement se fait en à peine 3 cliques. Le remboursement garanti m\'a vraiment convaincu.',
    verified: true,
  },
  {
    name: 'Christ Parfait N.',
    role: 'Lycéen, Pointe-Noire',
    avatar: '👨🏿‍🔬',
    rating: 5,
    text: 'Pas besoin de carte bancaire — mon MTN Money a suffi. La confirmation par SMS est arrivée en quelques secondes. Une vraie révolution pour le Congo !',
    verified: true,
  },
]

export default function Testimonials() {
  const sectionRef = useReveal()

  return (
    <section id="testimonials" ref={sectionRef as React.RefObject<HTMLElement>} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#0c1825] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <div className="inline-flex items-center gap-2 glass-warm rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#00E5FF] text-xs font-mono tracking-widest uppercase">Avis</span>
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Ils nous font
            <br />
            <em className="not-italic gradient-text">confiance</em>
          </h2>
          <p className="text-dark-300 text-lg font-body font-light max-w-xl mx-auto">
            Des centaines de Congolais ont déjà adopté M I R A pour leurs voyages et leurs séjours.
          </p>
        </div>

        {/* Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="reveal break-inside-avoid glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1 group cursor-default"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Quote icon */}
              <Quote size={20} className="text-[#00E5FF] mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={12} className="fill-gold-400 text-gold-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-dark-200 text-sm font-body leading-relaxed mb-5 italic">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-white text-sm font-medium truncate">{t.name}</p>
                    {t.verified && (
                      <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 text-[8px]">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-dark-500 text-xs truncate">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-16 reveal">
          <div className="glass rounded-3xl p-8 border border-white/5 text-center max-w-lg mx-auto">
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-gold-400 text-gold-400" />
              ))}
            </div>
            <p className="font-display text-4xl font-semibold text-white mb-1">4.9 / 5</p>
            <p className="text-dark-400 text-sm font-body">Basé sur 20+ avis de nos utilisateurs bêta</p>
          </div>
        </div>
      </div>
    </section>
  )
}
