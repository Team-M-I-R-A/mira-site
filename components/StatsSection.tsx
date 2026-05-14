'use client'

const marqueeItems = [
  '🏠 Logements vérifiés',
  '💳 MTN Mobile Money',
  '📍 Brazzaville',
  '⭐ Avis authentiques',
  '🔒 Paiement sécurisé',
  '📱 iOS & Android',
  '💬 Support 24/7',
  '🇨🇬 Made in Congo',
  '💰 Airtel Money',
  '🚀 Lancement 2025',
]

const stats = [
  { value: '2 000+', label: 'Logements', sub: 'dans tout le Congo' },
  { value: '98%', label: 'Satisfaction', sub: 'clients confirmés' },
  { value: '3 min', label: 'Réservation', sub: 'du début à la fin' },
  { value: '500+', label: 'Pionniers', sub: 'déjà inscrits' },
]

export default function StatsSection() {
  return (
    <>
      {/* Stats */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center group cursor-default"
              >
                <div
                  className="font-display text-5xl lg:text-6xl font-light gradient-text mb-2 transition-all duration-300 group-hover:text-glow"
                >
                  {stat.value}
                </div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-dark-500 text-xs font-body">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-5 border-y border-white/5 overflow-hidden bg-[#0e133b79]">
        <div className="flex animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 flex items-center gap-2 mx-8 text-sm font-mono font-medium text-dark-300"
            >
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] ml-6" />
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
