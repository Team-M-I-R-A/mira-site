"use client";

import { useReveal } from "@/hooks/useReveal";
import { CheckCircle2, Shield, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    icon: Shield,
    text: "Votre argent est protégé jusqu’à la confirmation de votre séjour, et remboursé en cas de problème.",
  },
  { icon: Zap, text: "Confirmation instantanée par SMS" },
];

const providers = [
  {
    name: "MTN Mobile Money",
    description: "Paiement mobile",
    logo: "/paiements/mtn-mark.png",
    tile: "#004F71",
    alt: "Logo MTN Mobile Money",
  },
  {
    name: "Airtel Money",
    description: "Paiement mobile",
    logo: "/paiements/airtel.png",
    tile: "#E30613",
    alt: "Logo Airtel Money",
  },
];

export default function MobileMoneySection() {
  const sectionRef = useReveal();

  return (
    <section
      id="payment"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden py-32"
    >
      {/* Warm background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-brand-600/8 blur-[120px]" />
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-[#0a1320] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Badge - Centré au-dessus du grid */}
        <div className="mb-12 flex justify-center reveal">
          <div className="inline-flex items-center gap-2 rounded-full glass-warm px-4 py-1.5">
            <span className="font-mono text-xs uppercase tracking-widest text-[#00E5FF]">
              Mobile Money
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left — Mobile Money Experience */}
          <div className="relative order-2 flex justify-center reveal lg:order-1">
            <div className="relative w-full max-w-[440px]">
              {/* Ambient light — a single soft halo behind the whole visual */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
              >
                <div className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(26,107,255,0.16),rgba(255,190,0,0.08)_58%,transparent_78%)] blur-3xl" />
              </div>

              {/* Contact shadow */}
              <div
                aria-hidden="true"
                className="absolute inset-x-[10%] bottom-[-6%] h-[16%] rounded-[50%] bg-slate-900/10 blur-3xl"
              />

              {/* Payment sheet */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/90 shadow-md backdrop-blur-xl">
                <p className="mt-6 px-6 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:px-7">
                  Payez avec
                </p>

                {/* Providers */}
                <div className="mt-3 space-y-2 px-3 pb-3 sm:px-4">
                  {providers.map(({ name, description, logo, tile, alt }) => (
                    <div
                      key={name}
                      className="flex items-center gap-3.5 rounded-2xl bg-slate-50 px-3 py-3"
                    >
                      <span
                        className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-2xl"
                        style={{ backgroundColor: tile }}
                      >
                        <Image
                          src={logo}
                          alt={alt}
                          width={56}
                          height={56}
                          sizes="56px"
                          className="h-full w-full object-cover"
                        />
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {name}
                        </p>
                        <p className="text-xs text-slate-500">{description}</p>
                      </div>

                      <span className="ml-auto flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                        Accepté
                      </span>
                    </div>
                  ))}
                </div>

                {/* Secure footer */}
                <div className="flex items-center justify-center gap-2 border-t border-slate-900/5 bg-slate-50/80 px-6 py-3.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <p className="text-[11px] font-medium text-slate-500">
                    Fonds protégés jusqu’à votre arrivée
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Text */}
          <div className="order-1 reveal lg:order-2">
            {/* Heading */}
            <h2 className="mb-6 font-display text-5xl font-light leading-tight text-white lg:text-6xl">
              Payez comme
              <br />
              <em className="not-italic gradient-text">vous voulez</em>
            </h2>

            <p className="mb-8 max-w-lg font-body text-lg font-light leading-relaxed text-dark-300">
              Nous avons intégré les solutions de paiement mobile utilisées au
              quotidien. Plus besoin de carte bancaire — votre téléphone suffit.
            </p>

            {/* Benefits */}
            <div className="mb-10 space-y-4">
              {benefits.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#00E5FF]/10 bg-[#0a1320]">
                    <Icon size={16} className="text-[#00E5FF]" />
                  </div>

                  <span className="font-body text-sm text-dark-200">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
