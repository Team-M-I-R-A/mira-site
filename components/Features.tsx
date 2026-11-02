"use client";

import { useReveal } from "@/hooks/useReveal";
import { Smartphone, Shield, MapPin, Zap, HousePlus } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Mobile Money intégré",
    description:
      "Payez en toute sécurité avec MTN Mobile Money ou Airtel Money. Fini les tracas de paiements cash ou de transferts risqués.",
    accent: "from-brand-600 to-brand-500",
    glow: "rgba(249,115,22,0.3)",
    tag: "Exclusif Congo",
  },
  {
    icon: Shield,
    title: "Paiements 100% sécurisés",
    description:
      "Votre argent est protégé jusqu'à confirmation de votre séjour. En cas de problème, notre équipe vous rembourse intégralement.",
    accent: "from-green-600 to-emerald-500",
    glow: "rgba(16,185,129,0.3)",
    tag: "Garanti",
  },
  {
    icon: MapPin,
    title: "Brazzaville & Pointe-Noire",
    description:
      "Découvrez des logements vérifiés à Brazzaville et Pointe-Noire. Trouvez facilement un appartement ou une chambre adaptée à votre budget et à vos besoins.",
    accent: "from-blue-600 to-blue-500",
    glow: "rgba(59,130,246,0.3)",
    tag: "Disponible dans 2 villes",
  },
  {
    icon: Zap,
    title: "Réservation instantanée",
    description:
      "En moins de 3 minutes, votre logement est réservé et confirmé. Plus besoin d'appels interminables ou de déplacements inutiles.",
    accent: "from-gold-600 to-gold-500",
    glow: "rgba(245,158,11,0.3)",
    tag: "< 3 minutes",
  },
  {
    icon: HousePlus,
    title: "Publiez votre logement facilement",
    description:
      "Ajoutez votre appartement, maison ou chambre en quelques étapes. Présentez vos logements avec des photos, vos tarifs et vos disponibilités, puis recevez des réservations directement sur MIRA.",
    accent: "from-purple-600 to-violet-500",
    glow: "rgba(139,92,246,0.3)",
    tag: "Espace propriétaire",
  },
];

export default function Features() {
  const sectionRef = useReveal();

  return (
    <section
      id="features"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#0e1335] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <div className="inline-flex items-center gap-2 glass-warm rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#122f55] text-xs font-mono tracking-widest uppercase">
              Fonctionnalités
            </span>
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Tout ce dont vous
            <br />
            <em className="not-italic gradient-text">avez besoin</em>
          </h2>
          <p className="text-dark-300 text-lg font-body font-light max-w-2xl mx-auto leading-relaxed">
            M I R A a été conçu spécifiquement pour répondre aux besoins et aux
            réalités du marché immobilier congolais.
          </p>
        </div>

        {/* Features grid */}
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="reveal group relative w-full max-w-[340px] cursor-default overflow-hidden rounded-2xl border border-white/5 glass p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/10 sm:p-6"
                style={{
                  transitionDelay: `${i * 0.08}s`,
                  WebkitTransitionDelay: `${i * 0.08}s`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow: `0 0 40px ${feature.glow}`,
                  }}
                />

                {/* Corner decoration */}
                <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-gradient-to-bl from-white to-transparent opacity-5" />

                {/* Icon */}
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accent} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  style={{ boxShadow: `0 8px 24px ${feature.glow}` }}
                >
                  <Icon size={20} className="text-white" />
                </div>

                {/* Tag */}
                <div
                  className={`mb-2 inline-flex items-center gap-1.5 bg-gradient-to-r ${feature.accent} text-xs font-mono font-medium`}
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{
                      background: feature.glow,
                      WebkitTextFillColor: "initial",
                    }}
                  />
                  {feature.tag}
                </div>

                {/* Content */}
                <h3 className="mb-2 font-display text-lg font-medium leading-tight text-white">
                  {feature.title}
                </h3>

                <p className="font-body text-sm leading-relaxed text-dark-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
