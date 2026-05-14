'use client'

import { useReveal } from '@/hooks/useReveal'
import { Shield, Zap, Lock, CheckCircle } from 'lucide-react'

const providers = [
  { name: 'MTN Mobile Money', color: 'from-yellow-400 to-yellow-500', emoji: '📱', market: '65% du marché' },
  { name: 'Airtel Money', color: 'from-red-500 to-red-600', emoji: '📲', market: '35% du marché' },
]

const benefits = [
  { icon: Shield, text: 'Argent protégé jusqu\'à confirmation' },
  { icon: Zap, text: 'Confirmation instantanée par SMS' },
  { icon: Lock, text: 'Cryptage bancaire SSL 256-bit' },
  { icon: CheckCircle, text: 'Remboursement garanti en 24h' },
]

export default function MobileMoneySection() {
  const sectionRef = useReveal()

  return (
    <section id="payment" ref={sectionRef as React.RefObject<HTMLElement>} className="relative py-32 overflow-hidden">
      {/* Warm background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-600/8 blur-[120px]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#0a1320]  blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Visual */}
          <div className="relative flex justify-center reveal order-2 lg:order-1">
            {/* Payment card mockup */}
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="relative glass-warm rounded-3xl p-8 border border-[#0a1320] overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#0a1320]/10 blur-3xl" />
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-xs text-dark-400 font-mono mb-1">Paiement sécurisé</p>
                      <h3 className="font-display text-2xl font-semibold text-white">Mobile Money</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2233DD] via-[#1A6BFF] to-[#00E5FF] flex items-center justify-center shadow-glow">
                      <Lock size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Providers */}
                  <div className="space-y-3 mb-8">
                    {providers.map((provider) => (
                      <div
                        key={provider.name}
                        className="flex items-center justify-between p-4 bg-white/3 rounded-xl border border-white/5 hover:border-brand-500/20 transition-colors duration-300 cursor-default"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${provider.color} flex items-center justify-center text-lg shadow-md mm-pulse`}>
                            {provider.emoji}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{provider.name}</p>
                            <p className="text-xs text-dark-400">{provider.market}</p>
                          </div>
                        </div>
                        <CheckCircle size={16} className="text-green-400" />
                      </div>
                    ))}
                  </div>

                  {/* Transaction simulation */}
                  <div className="bg-dark-900/60 rounded-2xl p-4 border border-white/5">
                    <p className="text-xs text-dark-400 font-mono mb-3 uppercase tracking-widest">Transaction simulée</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-dark-300">Villa Madiba — 2 nuits</span>
                        <span className="text-sm text-white font-medium">240 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-dark-400">Frais de service</span>
                        <span className="text-sm text-dark-400">Inclus</span>
                      </div>
                      <div className="h-px bg-white/5 my-2" />
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-white">Total</span>
                        <span className="text-sm font-bold gradient-text">240 000 FCFA</span>
                      </div>
                    </div>

                    <button className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-[#2233DD] via-[#1A6BFF] to-[#00E5FF] text-white text-sm font-medium shadow-glow animate-pulse-slow">
                      Confirmer via MTN MoMo →
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating success toast */}
              <div className="absolute -bottom-4 -right-4 glass rounded-xl p-3 border border-green-500/20 shadow-lg animate-float">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    ✓
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">Paiement reçu !</p>
                    <p className="text-dark-400 text-[10px]">Confirmation envoyée par SMS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Text */}
          <div className="order-1 lg:order-2 reveal">
            <div className="inline-flex items-center gap-2 glass-warm rounded-full px-4 py-1.5 mb-6">
              <span className="text-[#00E5FF] text-xs font-mono tracking-widest uppercase">Mobile Money</span>
            </div>

            <h2 className="font-display text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Payez comme
              <br />
              <em className="not-italic gradient-text">vous voulez</em>
            </h2>

            <p className="text-dark-300 text-lg font-body font-light leading-relaxed mb-8 max-w-lg">
              Nous avons intégré les solutions de paiement que les Congolais utilisent au quotidien.
              Plus besoin de carte bancaire — votre téléphone suffit.
            </p>

            <div className="space-y-4 mb-10">
              {benefits.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-#0a1320 border border-[#00E5FF]/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#00E5FF]" />
                  </div>
                  <span className="text-dark-200 font-body text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="glass rounded-2xl p-6 border-l-2 border-[#00E5FF]/10">
              <p className="text-dark-200 font-display text-lg italic leading-relaxed mb-3">
                "Nous avons conçu M I R A pour que chaque Congolais puisse louer un logement
                sans avoir besoin d'une carte visa ou d'un compte bancaire."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full  bg-gradient-to-r from-[#2233DD] via-[#1A6BFF] to-[#00E5FF] flex items-center justify-center text-xs font-bold text-white">NG</div>
                <div>
                  <p className="text-white text-sm font-medium">Alex Jonathan NGASSAKI, M I R A</p>
                  <p className="text-dark-500 text-xs">Brazzaville, Congo</p>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
