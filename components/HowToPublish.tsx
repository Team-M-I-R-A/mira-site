import { UserPlus, MapPin, ImagePlus, CalendarCheck } from "lucide-react";
import { APP_URL } from "@/lib/config";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Créez votre compte hôte",
    description:
      "Inscrivez-vous sur MIRA et choisissez le rôle « hôte » pour accéder à votre espace propriétaire.",
    detail: "Inscription en ligne",
  },
  {
    number: "02",
    icon: MapPin,
    title: "Indiquez l’adresse",
    description:
      "Touchez « Ajouter un logement », confirmez votre ville, puis renseignez le quartier et la rue.",
    detail: "Ville, quartier, rue",
  },
  {
    number: "03",
    icon: ImagePlus,
    title: "Présentez votre logement",
    description:
      "Donnez-lui un titre, fixez votre prix par jour, ajoutez les détails et vos photos, puis terminez.",
    detail: "Titre, prix, détails, photos",
  },
  {
    number: "04",
    icon: CalendarCheck,
    title: "Gérez vos réservations",
    description:
      "Recevez les demandes de réservation dans votre espace, puis acceptez ou refusez chacune d’elles.",
    detail: "Demandes dans votre espace",
  },
];

export default function HowToPublish() {
  return (
    <section id="publier" className="relative overflow-hidden py-32">
      {/* BG */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0a1320] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass-warm px-4 py-1.5">
            <span className="font-mono text-xs uppercase tracking-widest text-[#122f55]">
              Propriétaires
            </span>
          </div>
          <h2 className="mb-6 text-balance font-display text-5xl font-light leading-tight text-white lg:text-6xl">
            Publiez votre
            <br />
            <em className="not-italic gradient-text">logement</em>
          </h2>
          <p className="mx-auto max-w-xl text-pretty font-body text-lg font-light text-dark-300">
            De l’inscription aux premières réservations en 4 étapes seulement.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-16 hidden h-px lg:block">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-[#122f55] to-transparent" />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#122f55]"
                style={{ left: `${33.33 * (i + 1) - 2}%` }}
              />
            ))}
          </div>

          <ol className="grid list-none gap-8 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.number}
                  className="group relative text-center lg:text-left"
                >
                  {/* Step number */}
                  <div className="relative mb-6 inline-block">
                    <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-dark-900 transition-colors duration-300 group-hover:border-[#00E5FF] group-hover:shadow-glow lg:mx-0">
                      <Icon
                        size={22}
                        className="text-[#3880df]"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="absolute -right-2 -top-2 font-mono text-xs font-bold text-[#122f55]">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 font-display text-xl font-semibold leading-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mb-4 font-body text-sm leading-relaxed text-dark-400">
                    {step.description}
                  </p>

                  {/* Detail badge */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF]" />
                    <span className="font-mono text-xs text-dark-300">
                      {step.detail}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href={APP_URL}
            className="iinline-flex min-h-[48px] touch-manipulation items-center justify-center rounded-xl border border-white/10 px-7 py-3 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-dark-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00798f] focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950"
          >
            Publier mon logement
          </a>
        </div>
      </div>
    </section>
  );
}
