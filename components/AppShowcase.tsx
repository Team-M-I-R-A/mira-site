"use client";

import { useReveal } from "@/hooks/useReveal";
import PhoneMockup from "./PhoneMockup";
import {
  ArrowRight,
  ShieldCheck,
  Smartphone,
  MapPin,
  Star,
  CreditCard,
  MessageCircle,
} from "lucide-react";

const screenshots = [
  {
    screen: "home" as const,
    eyebrow: "Explorez MIRA",
    title: "Trouvez votre prochain logement en quelques secondes.",
    desc: "Découvrez une sélection de logements adaptés à vos besoins. Parcourez les annonces, explorez les photos et trouvez facilement votre prochain lieu de séjour.",
    delay: "0s",
    features: [
      { icon: MapPin, text: "Logements près de vous" },
      { icon: ShieldCheck, text: "Annonces vérifiées" },
      { icon: Star, text: "Avis authentiques" },
    ],
  },
  {
    screen: "detail" as const,
    eyebrow: "Réservez en toute confiance",
    title: "Tout ce qu'il faut savoir avant de réserver.",
    desc: "Consultez les informations détaillées de chaque logement, explorez les galeries photos et effectuez votre réservation en toute simplicité.",
    delay: "0.2s",
    features: [
      { icon: Smartphone, text: "Une expérience intuitive" },
      { icon: CreditCard, text: "Paiement Mobile Money" },
      { icon: MessageCircle, text: "Communication simplifiée" },
    ],
  },
];

export default function AppShowcase() {
  const sectionRef = useReveal();

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="reveal mb-24 text-center">
          <div className="glass-warm mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00E5FF]">
              L'application
            </span>
          </div>

          <h2 className="mb-6 font-display text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl">
            Une expérience
            <br />
            <em className="not-italic gradient-text">pensée pour vous</em>
          </h2>

          <p className="mx-auto max-w-2xl font-body text-lg font-light text-dark-300">
            Une interface épurée, une navigation intuitive et des
            fonctionnalités pensées pour simplifier votre expérience
            immobilière.
          </p>
        </div>

        {/* Showcase */}
        <div className="space-y-28 lg:space-y-36">
          {screenshots.map((s, i) => (
            <div
              key={s.screen}
              className={`reveal grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
              style={{ transitionDelay: s.delay }}
            >
              {/* Phone Mockup */}
              <div className="relative flex justify-center">
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00E5FF]/10 blur-[100px]" />

                <div
                  className={
                    i % 2 === 0
                      ? "relative animate-float"
                      : "relative animate-float-delay"
                  }
                >
                  <PhoneMockup screen={s.screen} />
                </div>
              </div>

              {/* Description */}
              <div className="mx-auto max-w-xl lg:mx-0">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#00E5FF]" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF]">
                    {s.eyebrow}
                  </span>
                </div>

                <h3 className="mb-6 font-display text-3xl font-light leading-tight text-white sm:text-4xl lg:text-5xl">
                  {s.title}
                </h3>

                <p className="mb-10 font-body text-base font-light leading-relaxed text-dark-300 sm:text-lg">
                  {s.desc}
                </p>

                {/* Features */}
                <div className="mb-10 space-y-5">
                  {s.features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                      <div
                        key={feature.text}
                        className="group flex items-center gap-4"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/5 transition-all duration-300 group-hover:border-[#00E5FF]/30 group-hover:bg-[#00E5FF]/10">
                          <Icon size={19} className="text-[#00E5FF]" />
                        </div>

                        <span className="font-body text-sm text-dark-200 transition-colorssm:text-base">
                          {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* CTA */}
                <div className="inline-flex cursor-default items-center gap-3 text-sm font-medium text-[#00E5FF]">
                  <span>Découvrez MIRA</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
