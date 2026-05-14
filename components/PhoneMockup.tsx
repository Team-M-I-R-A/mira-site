'use client'

import { MapPin, Search, Home, Menu, ChevronRight, Wifi, Battery } from 'lucide-react'

interface PhoneMockupProps {
  screen: 'home' | 'detail' | 'payment' | 'search'
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1">
      <span className="text-[10px] font-mono font-medium text-white/90">9:41</span>
      <div className="flex items-center gap-1.5">
        <Wifi size={11} className="text-white/90" />
        <Battery size={11} className="text-white/90" />
      </div>
    </div>
  )
}

function HomeScreen() {
  return (
    <div className="flex flex-col h-full bg-[#0d0b08] text-white overflow-hidden">
      <StatusBar />
      {/* Header */}
      <div className="px-5 pt-2 pb-3">
        {/* Search bar */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
          <Search size={12} className="text-white/40" />
          <span className="text-[9px] text-white/40 font-body">Rechercher un quartier…</span>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 px-2 mb-3 overflow-x-hidden">
        {['Tous', 'Brazzaville', 'Pointe-Noire'].map((cat, i) => (
          <div
            key={cat}
            className={`flex-shrink-0 px-2 py-1 rounded-full text-[10px] font-medium ${
              i === 0
                ? 'bg-gradient-to-r from-[#2233DD] via-[#1A6BFF] to-[#00E5FF] text-white'
                : 'bg-white/5 text-white/50 border border-white/10'
            }`}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Featured listing */}
      <div className="grid grid-cols-2 gap-2 px-5 mb-3">
        {/* MOCKUP CARD — Replace with real image */}
        {[1,2].map((i) => (<div key={i} className="relative rounded-2xl overflow-hidden h-[110px] bg-gradient-to-br from-dark-800 to-dark-700">
          {/* Placeholder for your app screenshot */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Home size={24} className="text-white/20 mb-1" />
            <span className="text-[6px] text-white/30 font-body">[ Photo du logement ]</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-2.5 left-2 right-2">
            <div className='w-12 h-3 px-1 py-1 bg-white rounded-3xl text-center text-[5.5px] text-black font-bold'>25 000 FCFA</div>
            <div className="flex items-end justify-between mt-1">
              <div>
                <p className="text-white text-[6px] font-semibold leading-tight">Appartement meublé</p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <MapPin size={8} className="text-neutral-200" />
                  <span className="text-[5px] text-white/60">10 rue eby, Massengo</span>
                </div>
              </div>
            </div>
          </div>
        </div>))}

        {[1,2].map((i) => (<div key={i} className="relative rounded-2xl overflow-hidden h-[110px] bg-gradient-to-br from-dark-800 to-dark-700">
          {/* Placeholder for your app screenshot */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Home size={24} className="text-white/20 mb-1" />
            <span className="text-[6px] text-white/30 font-body">[ Photo du logement ]</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-2.5 left-2 right-2">
            <div className='w-12 h-3 px-1 py-1 bg-white rounded-3xl text-center text-[5.5px] text-black font-bold'>25 000 FCFA</div>
            <div className="flex items-end justify-between mt-1">
              <div>
                <p className="text-white text-[6px] font-semibold leading-tight">Appartement meublé</p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <MapPin size={8} className="text-neutral-200" />
                  <span className="text-[5px] text-white/60">10 rue eby, Massengo</span>
                </div>
              </div>
            </div>
          </div>
        </div>))}

      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-around px-5 py-3 border-t border-white/5 mt-auto">
        {[
          { icon: Search, label: 'Explorer', active: true },
          { icon: Home, label: 'Reservations', active: false },
          { icon: Menu, label: 'Menu', active: false },
        ].map(({ icon: Icon, label, active }) => (
          <button key={label} className="flex flex-col items-center gap-1">
            <Icon size={14} className={active ? 'text-[#121641]' : 'text-white/30'} />
            <span className={`text-[8px] ${active ? 'text-[#121641]' : 'text-white/30'}`}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function DetailScreen() {
  return (
    <div className="flex flex-col h-full bg-[#0d0b08] text-white overflow-hidden">
      <StatusBar />
      {/* Hero image placeholder */}
      <div className="relative mx-4 mt-1 rounded-2xl overflow-hidden h-[140px] bg-gradient-to-br from-dark-800 to-dark-700 flex-shrink-0">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Home size={28} className="text-white/20 mb-1" />
          <span className="text-[9px] text-white/30 font-body">[ Galerie photos ]</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-transparent to-transparent" />
        <button className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <ChevronRight size={12} className="text-white rotate-180" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 mt-3 px-5 py-3 overflow-hidden">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-sm font-display font-semibold leading-tight">Appartement meublé</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={8} className="text-[#121641]" />
              <span className="text-[7px] text-white/50">Avenue de l'Indépendance, Brazzaville</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[#121641] text-sm font-bold">40 000</p>
            <p className="text-[9px] text-white/40">FCFA/nuit</p>
          </div>
        </div>

        {/* Description placeholder */}
        <p className="text-[9px] text-white/40 leading-relaxed mb-3 line-clamp-2">
          Magnifique villa entièrement meublée dans le quartier résidentiel de Mpila. Idéale pour familles ou voyageurs d'affaires…
        </p>
      </div>

      {/* Book CTA */}
      <div className="px-5 pb-4">
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2233DD] via-[#1A6BFF] to-[#00E5FF] text-white text-[11px] font-semibold shadow-glow">
          Réserver maintenant
        </button>
      </div>
    </div>
  )
}

export default function PhoneMockup({ screen }: PhoneMockupProps) {
  return (
    <div className="relative select-none">
      {/* Phone frame */}
      <div
        className="relative w-[220px] h-[460px] rounded-[40px] overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #2a2420, #1a1612)',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.08),
            0 30px 80px rgba(0,0,0,0.8),
            0 0 60px rgba(249,115,22,0.15),
            inset 0 0 0 1px rgba(255,255,255,0.05)
          `,
        }}
      >
        {/* Side buttons */}
        <div className="absolute -right-[3px] top-20 w-[3px] h-10 bg-dark-700 rounded-l-full" />
        <div className="absolute -left-[3px] top-16 w-[3px] h-6 bg-dark-700 rounded-r-full" />
        <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-dark-700 rounded-r-full" />
        <div className="absolute -left-[3px] top-34 w-[3px] h-8 bg-dark-700 rounded-r-full" />

        {/* Screen bezel */}
        <div className="absolute inset-[3px] rounded-[37px] overflow-hidden bg-[#0d0b08]">
          {/* Dynamic island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />

          {/* Screen content */}
          <div className="absolute inset-0 pt-8">
            {screen === 'home' && <HomeScreen />}
            {screen === 'detail' && <DetailScreen />}
          </div>
        </div>

        {/* Shine overlay */}
        <div
          className="absolute inset-0 rounded-[40px] pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
          }}
        />
      </div>
    </div>
  )
}
