'use client'

import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { addWaitlist } from '@/lib/waitlist'

const perks = [
  'Accès prioritaire au lancement',
  'Prix locataire réduit à vie',
  'Badge "Pionnier M I R A"',
]

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const sectionRef = useReveal()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    
    await addWaitlist({email, phone, city})
    
    setLoading(false)
    setSubmitted(true)
  }

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
                <span className="text-[#00E5FF] text-xs font-mono tracking-widest uppercase">Bientôt disponible</span>
              </div>

              <h2 className="font-display text-4xl lg:text-5xl font-light text-white mb-5 leading-tight">
                Soyez parmi les
                <br />
                <em className="not-italic gradient-text">premiers</em>
              </h2>

              <p className="text-dark-300 font-body text-base leading-relaxed mb-8">
                Inscrivez-vous maintenant pour être notifié au lancement et bénéficier
                d'avantages exclusifs réservés aux pionniers.
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

            {/* Right — Form */}
            <div>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={28} className="text-green-400" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white mb-2">Vous êtes inscrit !</h3>
                  <p className="text-dark-300 text-sm font-body leading-relaxed">
                    Merci ! Vous serez parmi les premiers à être notifiés lors du lancement de M I R A.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-dark-400 font-mono uppercase tracking-widest mb-2 block">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      required
                      className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-dark-600 focus:outline-none focus:border-[#00E5FF] focus:bg-white/5 transition-all duration-200 font-body"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-dark-400 font-mono uppercase tracking-widest mb-2 block">
                      Numéro Mobile Money
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+242 06 XXX XX XX"
                      className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-dark-600 focus:outline-none focus:border-[#00E5FF] focus:bg-white/5 transition-all duration-200 font-body"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-dark-400 font-mono uppercase tracking-widest mb-2 block">
                      Votre ville
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#00E5FF]/5 border border-[#00E5FF] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00E5FF] transition-all duration-200 font-body appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-dark-900">Sélectionnez votre ville</option>
                      <option value="brazzaville" className="bg-dark-900">Brazzaville</option>
                      <option value="pn" className="bg-dark-900">Pointe-Noire</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email || !phone || !city}
                    className="relative w-full py-4 rounded-xl bg-gradient-to-r from-[#2233DD] via-[#1A6BFF] to-[#00E5FF] text-white font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Inscription en cours…
                        </>
                      ) : (
                        <>
                          Rejoindre la liste d'attente
                          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 shimmer-btn" />
                  </button>

                  <p className="text-center text-dark-600 text-xs font-body">
                    Gratuit. Aucune carte de crédit requise. Désabonnez-vous à tout moment.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
