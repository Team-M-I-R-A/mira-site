import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  MapPin,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { APP_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "À propos — M I R A",
  description:
    "MIRA est une plateforme congolaise de location immobilière qui connecte voyageurs et propriétaires autour d'une expérience simple, transparente et adaptée aux réalités locales.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Confiance",
    description:
      "Des logements présentés avec des informations claires et des échanges directs entre propriétaires et locataires.",
  },
  {
    icon: Smartphone,
    title: "Paiement local",
    description:
      "MTN Mobile Money et Airtel Money intégrés nativement, parce que c'est ainsi que le Congo paie au quotidien.",
  },
  {
    icon: Users,
    title: "Proximité",
    description:
      "Une plateforme pensée à Brazzaville et Pointe-Noire, avec des quartiers, des prix et des usages qui parlent vrai.",
  },
  {
    icon: Eye,
    title: "Transparence",
    description:
      "Pas de frais cachés : le prix affiché, les conditions de réservation et les règles de remboursement sont explicites.",
  },
];

const highlights = [
  { label: "Villes couvertes", value: "Brazzaville & Pointe-Noire" },
  { label: "Paiements", value: "MTN & Airtel Money" },
  { label: "Mise en ligne", value: "En quelques minutes" },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-dark-950">
      <Navbar />

      <Reveal className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 lg:pt-40">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#0a1320] blur-[150px]" />
          <div className="absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-brand-600/5 blur-[120px]" />
        </div>

        {/* Hero */}
        <header className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="reveal">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass-warm px-4 py-1.5">
              <span className="font-mono text-xs uppercase tracking-widest text-[#00798f]">
                À propos de MIRA
              </span>
            </div>

            <h1 className="text-balance font-display text-5xl font-light leading-tight text-white lg:text-6xl">
              La location immobilière,
              <br />
              <em className="not-italic gradient-text">pensée pour le Congo</em>
            </h1>

            <p className="mt-6 max-w-2xl text-pretty font-body text-lg font-light leading-relaxed text-dark-300">
              MIRA connecte les voyageurs et les propriétaires autour d&apos;une
              expérience simple, transparente et adaptée aux réalités locales.
              Trouver un logement, réserver et payer — du premier clic au
              Mobile Money.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={APP_URL}
                className="press inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2233DD] to-[#1A6BFF] px-6 py-3 text-sm font-medium text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-glow"
              >
                Découvrir MIRA
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="mailto:contact@mira.cg"
                className="press inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-dark-900"
              >
                Nous contacter
              </a>
            </div>
          </div>

          {/* Mission card */}
          <div
            className="reveal relative"
            style={{ transitionDelay: "0.15s" }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-8">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#0a1320] blur-[80px]"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="mb-6 flex items-center gap-2 text-[#00798f]">
                  <MapPin size={16} aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-widest">
                    République du Congo
                  </span>
                </div>

                <p className="font-display text-2xl font-light leading-snug text-white">
                  « Rendre la location aussi simple qu&apos;un message, sans
                  intermédiaire inutile. »
                </p>

                <dl className="mt-8 space-y-4 border-t border-white/10 pt-6">
                  {highlights.map((item) => (
                    <div key={item.label} className="flex flex-col gap-1">
                      <dt className="font-body text-xs uppercase tracking-wider text-dark-500">
                        {item.label}
                      </dt>
                      <dd className="font-body text-sm text-dark-200">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </header>

        {/* Mission */}
        <section className="mt-28 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="reveal">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-dark-500">
              Notre mission
            </p>
            <h2 className="text-balance font-display text-4xl font-light leading-tight text-white lg:text-5xl">
              Une plateforme{" "}
              <em className="not-italic gradient-text">vraiment locale</em>
            </h2>
          </div>

          <div
            className="reveal space-y-5 font-body text-base font-light leading-relaxed text-dark-300"
            style={{ transitionDelay: "0.1s" }}
          >
            <p>
              Le marché de la location au Congo reste souvent informel : des
              annonces dispersées, des visites difficiles à organiser et des
              paiements qui dépendent de la confiance. MIRA est né pour changer
              cela, sans complexifier l&apos;expérience.
            </p>
            <p>
              Nous réunissons au même endroit les logements disponibles, les
              propriétaires qui les gèrent et les voyageurs qui les cherchent.
              Chaque partie garde la main, avec des règles claires et un
              accompagnement en français, dans les usages du pays.
            </p>
            <p>
              Notre ambition est simple : que réserver un logement à
              Brazzaville ou à Pointe-Noire soit aussi naturel que commander
              une course ou envoyer de l&apos;argent par Mobile Money.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mt-28">
          <div className="reveal mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-dark-500">
                Nos principes
              </p>
              <h2 className="text-balance font-display text-4xl font-light leading-tight text-white lg:text-5xl">
                Ce qui guide{" "}
                <em className="not-italic gradient-text">nos décisions</em>
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <article
                  key={value.title}
                  className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-7 transition-[border-color,background-color] duration-300 hover:border-[#00E5FF]/30 hover:bg-white/5"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-dark-900">
                    <Icon
                      size={18}
                      className="text-[#00798f]"
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-dark-400">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section
          className="reveal mt-24 flex flex-col items-start gap-8 rounded-3xl border border-white/10 bg-white/3 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between"
          style={{ transitionDelay: "0.1s" }}
        >
          <div>
            <h2 className="font-display text-2xl font-light leading-tight text-white sm:text-3xl">
              Prêt à trouver votre prochain logement ?
            </h2>
            <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-dark-400">
              Parcourez les logements disponibles ou publiez le vôtre en
              quelques minutes. Une question ? Notre équipe vous répond
              directement.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={APP_URL}
              className="press inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2233DD] to-[#1A6BFF] px-6 py-3 text-sm font-medium text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-glow"
            >
              Ouvrir MIRA
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <Link
              href="/policies"
              className="press inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-dark-900"
            >
              Centre d&apos;aide
            </Link>
          </div>
        </section>
      </Reveal>

      <Footer />
    </main>
  );
}
