"use client";

import { useReveal } from "@/hooks/useReveal";
import { Shield, Zap, Lock, CheckCircle } from "lucide-react";
import Image from "next/image";

const providers = [
  {
    name: "MTN Mobile Money",
    logo: "/paiements/mtn.png",
    market: "65% du marché",
  },
  {
    name: "Airtel Money",
    logo: "/paiements/airtel.png",
    market: "35% du marché",
  },
];

const benefits = [
  { icon: Shield, text: "Argent protégé jusqu'à confirmation" },
  { icon: Zap, text: "Confirmation instantanée par SMS" },
  { icon: CheckCircle, text: "Remboursement garanti en 24h" },
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
          {/* Left — Visual */}
          <div className="relative order-2 flex justify-center reveal lg:order-1">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="relative overflow-hidden rounded-3xl border border-[#0a1320] glass-warm p-8">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0a1320]/10 blur-3xl" />
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <p className="mb-1 font-mono text-xs text-dark-400">
                        Paiement sécurisé
                      </p>
                      <h3 className="font-display text-2xl font-semibold text-white">
                        Mobile Money
                      </h3>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#2233DD] via-[#1A6BFF] to-[#00E5FF] shadow-glow">
                      <Lock size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Providers */}
                  <div className="mb-8 space-y-3">
                    {providers.map((provider) => (
                      <div
                        key={provider.name}
                        className="flex cursor-default items-center justify-between rounded-xl border border-white/5 bg-white/3 p-4 transition-colors duration-300 hover:border-brand-500/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white shadow-md sm:h-16 sm:w-16">
                            <Image
                              src={provider.logo}
                              alt={`Logo ${provider.name}`}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                              unoptimized
                            />
                          </div>

                          <div>
                            <p className="text-sm font-medium text-white">
                              {provider.name}
                            </p>
                            <p className="text-xs text-dark-400">
                              {provider.market}
                            </p>
                          </div>
                        </div>

                        <CheckCircle size={16} className="text-green-400" />
                      </div>
                    ))}
                  </div>
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
