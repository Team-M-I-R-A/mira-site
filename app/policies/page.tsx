import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { getPolicyGroups } from "@/lib/policies";
import PolicyIcon from "@/components/policies/PolicyIcon";

export const metadata: Metadata = {
  title: "Centre d'aide & documents légaux — M I R A",
  description:
    "Retrouvez les conditions d'utilisation, la politique de confidentialité, les règles de remboursement et toutes les politiques de MIRA.",
};

export default function PoliciesPage() {
  const groups = getPolicyGroups();

  return (
    <div className="mx-auto max-w-7xl px-6">
      <header className="max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full glass-warm px-4 py-1.5">
          <span className="font-mono text-xs uppercase tracking-widest text-[#00798f]">
            Documents officiels
          </span>
        </div>
        <h1 className="text-balance font-display text-5xl font-light leading-tight text-white lg:text-6xl">
          Centre d&apos;aide
          <br />
          <em className="not-italic gradient-text">&amp; politiques</em>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty font-body text-lg font-light leading-relaxed text-dark-300">
          Toutes les règles qui encadrent l&apos;utilisation de MIRA, la
          protection de vos données et le déroulement de vos réservations. Des
          documents clairs, accessibles à tout moment.
        </p>
      </header>

      <div className="mt-14 space-y-14">
        {groups.map((group) => (
          <section key={group.category} aria-labelledby={`group-${group.category}`}>
            <div className="mb-6 flex items-center gap-4">
              <h2
                id={`group-${group.category}`}
                className="whitespace-nowrap font-mono text-xs uppercase tracking-widest text-dark-500"
              >
                {group.category}
              </h2>
              <span className="h-px flex-1 bg-white/5" aria-hidden="true" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {group.policies.map((policy) => (
                <Link
                  key={policy.slug}
                  href={`/policies/${policy.slug}`}
                  className="press group relative flex flex-col rounded-2xl border border-white/10 bg-white/3 p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#00E5FF]/40 hover:bg-white/5"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-dark-900">
                      <PolicyIcon
                        name={policy.icon}
                        className="text-[#00798f]"
                      />
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-dark-500 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#00798f]"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-display text-xl font-semibold leading-tight text-white">
                    {policy.shortTitle}
                  </h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-dark-400">
                    {policy.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1.5 font-body text-xs font-medium text-[#00798f]">
                    Lire le document
                    <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/3 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-dark-900">
            <Mail size={18} className="text-[#00798f]" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold text-white">
              Une question sur un document ?
            </h2>
            <p className="mt-1 max-w-xl font-body text-sm leading-relaxed text-dark-400">
              Notre équipe peut vous aider à comprendre une clause, exercer vos
              droits ou suivre un remboursement.
            </p>
          </div>
        </div>
        <a
          href="mailto:ngassakialex20@gmail.com"
          className="press inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2233DD] to-[#1A6BFF] px-5 py-2.5 text-sm font-medium text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-glow"
        >
          Nous contacter
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}
