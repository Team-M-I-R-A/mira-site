import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, Mail } from "lucide-react";
import { getAllPolicies, getPolicy, getPolicyGroups } from "@/lib/policies";
import Markdown from "@/components/Markdown";
import PolicyIcon from "@/components/policies/PolicyIcon";

type PolicyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPolicies().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);

  if (!policy) {
    return { title: "Document introuvable — M I R A" };
  }

  return {
    title: `${policy.title} — M I R A`,
    description: policy.description,
    openGraph: {
      title: `${policy.title} — M I R A`,
      description: policy.description,
      type: "article",
    },
  };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = await params;
  const policy = getPolicy(slug);

  if (!policy) {
    notFound();
  }

  const allPolicies = getAllPolicies();
  const groups = getPolicyGroups();
  const currentIndex = allPolicies.findIndex(
    (item) => item.slug === policy.slug,
  );
  const previous = currentIndex > 0 ? allPolicies[currentIndex - 1] : undefined;
  const next =
    currentIndex >= 0 && currentIndex < allPolicies.length - 1
      ? allPolicies[currentIndex + 1]
      : undefined;

  return (
    <div className="mx-auto max-w-7xl px-6">
      <nav
        aria-label="Fil d'Ariane"
        className="mb-8 flex flex-wrap items-center gap-1.5 font-body text-xs text-dark-500"
      >
        <Link href="/" className="transition-colors hover:text-dark-200">
          Accueil
        </Link>
        <ChevronRight size={12} aria-hidden="true" />
        <Link
          href="/policies"
          className="transition-colors hover:text-dark-200"
        >
          Centre d&apos;aide
        </Link>
        <ChevronRight size={12} aria-hidden="true" />
        <span className="text-dark-300" aria-current="page">
          {policy.shortTitle}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-2xl border border-white/10 bg-white/3 p-5 [scrollbar-width:thin]">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-dark-500">
              Documents
            </p>
            <nav aria-label="Politiques MIRA" className="space-y-5">
              {groups.map((group) => (
                <div key={group.category}>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-dark-500">
                    {group.category}
                  </p>
                  <ul className="space-y-1">
                    {group.policies.map((item) => {
                      const active = item.slug === policy.slug;
                      return (
                        <li key={item.slug}>
                          <Link
                            href={`/policies/${item.slug}`}
                            aria-current={active ? "page" : undefined}
                            className={`press flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-body text-sm transition-colors ${
                              active
                                ? "bg-white/5 text-white"
                                : "text-dark-400 hover:bg-white/3 hover:text-dark-200"
                            }`}
                          >
                            <PolicyIcon
                              name={item.icon}
                              size={15}
                              className={
                                active ? "text-[#00798f]" : "text-dark-500"
                              }
                            />
                            <span className="truncate">{item.shortTitle}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            <Link
              href="/policies"
              className="mt-5 inline-flex items-center gap-1.5 border-t border-white/5 pt-4 font-body text-xs font-medium text-[#00798f] transition-opacity hover:opacity-80"
            >
              <ArrowLeft size={13} aria-hidden="true" />
              Tous les documents
            </Link>
          </div>
        </aside>

        <article className="min-w-0">
          <div className="sticky top-28 z-30 -mx-6 mb-8 flex gap-2 overflow-x-auto border-b border-white/5 bg-dark-950/90 px-6 py-3 backdrop-blur lg:hidden">
            {allPolicies.map((item) => {
              const active = item.slug === policy.slug;
              return (
                <Link
                  key={item.slug}
                  href={`/policies/${item.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`press shrink-0 rounded-full border px-3.5 py-2 font-body text-xs transition-colors ${
                    active
                      ? "border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00798f]"
                      : "border-white/10 bg-white/3 text-dark-400 hover:text-dark-200"
                  }`}
                >
                  {item.shortTitle}
                </Link>
              );
            })}
          </div>

          <header className="mb-9 border-b border-white/5 pb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1.5">
              <PolicyIcon
                name={policy.icon}
                size={13}
                className="text-[#00798f]"
              />
              <span className="font-mono text-[10px] uppercase tracking-widest text-dark-300">
                {policy.category}
              </span>
            </div>

            <h1 className="text-balance font-display text-4xl font-light leading-tight text-white lg:text-5xl">
              {policy.title}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty font-body text-base leading-relaxed text-dark-400">
              {policy.description}
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-dark-500">
              Document officiel · MIRA
            </p>
          </header>

          <Markdown content={policy.body} />

          <nav
            aria-label="Documents précédent et suivant"
            className="mt-12 grid gap-3 border-t border-white/5 pt-8 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/policies/${previous.slug}`}
                className="press group rounded-xl border border-white/10 bg-white/3 p-4 transition-[border-color,background-color] duration-300 hover:border-[#00E5FF]/40 hover:bg-white/5"
              >
                <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-dark-500">
                  <ArrowLeft size={12} aria-hidden="true" />
                  Précédent
                </span>
                <span className="mt-1.5 block font-display text-base font-semibold text-white transition-colors group-hover:text-[#00798f]">
                  {previous.shortTitle}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" aria-hidden="true" />
            )}

            {next ? (
              <Link
                href={`/policies/${next.slug}`}
                className="press group rounded-xl border border-white/10 bg-white/3 p-4 text-right transition-[border-color,background-color] duration-300 hover:border-[#00E5FF]/40 hover:bg-white/5"
              >
                <span className="flex items-center justify-end gap-1 font-mono text-[10px] uppercase tracking-widest text-dark-500">
                  Suivant
                  <ArrowRight size={12} aria-hidden="true" />
                </span>
                <span className="mt-1.5 block font-display text-base font-semibold text-white transition-colors group-hover:text-[#00798f]">
                  {next.shortTitle}
                </span>
              </Link>
            ) : null}
          </nav>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-dark-900">
                <Mail size={16} className="text-[#00798f]" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-white">
                  Besoin d&apos;une précision ?
                </p>
                <p className="mt-0.5 font-body text-sm text-dark-400">
                  Notre équipe support vous répond.
                </p>
              </div>
            </div>
            <a
              href="mailto:contact@mira.cg"
              className="press inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 font-body text-sm font-medium text-white transition-colors duration-200 hover:bg-dark-900"
            >
              Contacter le support
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
