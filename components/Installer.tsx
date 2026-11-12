import { headers } from "next/headers";
import { APP_SHARES_ORIGIN, APP_URL } from "@/lib/config";
import Reveal from "./Reveal";
import InstallButton from "./install/InstallButton";
import InstallTabs from "./install/InstallTabs";
import StepShowcase from "./install/StepShowcase";

type Platform = "android" | "ios";

type Step = {
  title: string;
  src: string;
  alt: string;
};

const androidSteps: Step[] = [
  {
    title: "Ouvrez MIRA dans Chrome.",
    src: "/install/android-1.png",
    alt: "Étape 1 sur Android : MIRA ouverte dans Google Chrome",
  },
  {
    title: "Touchez le menu (⋮).",
    src: "/install/android-2.png",
    alt: "Étape 2 sur Android : menu de Google Chrome ouvert",
  },
  {
    title:
      "Choisissez « Installer l’application » (ou « Ajouter à l’écran d’accueil ») puis confirmez.",
    src: "/install/android-3.png",
    alt: "Étape 3 sur Android : option Installer l’application dans Chrome",
  },
];

const iosSteps: Step[] = [
  {
    title: "Ouvrez MIRA dans Safari.",
    src: "/screenshots/step2.png",
    alt: "Étape 1 sur iPhone : MIRA ouverte dans Safari",
  },
  {
    title: "Touchez le bouton Partager.",
    src: "/screenshots/step1.png",
    alt: "Étape 2 sur iPhone : bouton Partager de Safari",
  },
  {
    title: "Choisissez « Sur l’écran d’accueil » puis « Ajouter ».",
    src: "/screenshots/step3.png",
    alt: "Étape 3 sur iPhone : option Sur l’écran d’accueil dans le menu Partager",
  },
];

const openAppButton =
  "press inline-flex min-h-[48px] touch-manipulation items-center justify-center rounded-xl border border-white/10 px-7 py-3 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-dark-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00798f] focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950";

const IOS_USER_AGENT = /iPhone|iPad|iPod/i;

function getDefaultPlatform(userAgent: string): Platform {
  return IOS_USER_AGENT.test(userAgent) ? "ios" : "android";
}

function AndroidTutorial() {
  return (
    <div>
      <div className="mb-14 flex flex-col items-center gap-3 text-center">
        <InstallButton />
        {!APP_SHARES_ORIGIN ? (
          <p className="max-w-sm text-pretty text-xs leading-relaxed text-dark-400">
            Vous serez redirigé vers l’application MIRA, où l’installation se
            terminera.
          </p>
        ) : null}
      </div>

      <div className="mx-auto mb-12 flex max-w-md items-center gap-4">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-dark-400">Ou installez manuellement</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <StepShowcase steps={androidSteps} />
    </div>
  );
}

function IosTutorial() {
  return (
    <div>
      <StepShowcase steps={iosSteps} withFrame={false} />
      <div className="mt-14 flex flex-col items-center gap-6 text-center">
        <p className="text-pretty text-sm text-dark-400">
          Sur iPhone, l’installation se fait uniquement depuis Safari.
        </p>
        <a href={APP_URL} className={openAppButton}>
          Ouvrir MIRA
        </a>
      </div>
    </div>
  );
}

export default async function Installer() {
  const userAgent = (await headers()).get("user-agent") ?? "";
  const defaultPlatform = getDefaultPlatform(userAgent);

  return (
    <section
      id="installer"
      className="relative scroll-mt-24 overflow-hidden py-24"
    >
      {/* Ambient halo — animated gently behind the install showcase */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="install-aura absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0a1320] blur-[130px]" />
      </div>

      <Reveal className="relative mx-auto max-w-7xl px-6">
        <div className="reveal mb-14 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass-warm px-4 py-1.5">
            <span className="text-[#00E5FF] font-mono text-xs uppercase tracking-widest">
              Installer
            </span>
          </div>
          <h2 className="mb-5 text-balance font-display text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl">
            Installez MIRA sur
            <br />
            <em className="not-italic gradient-text"> votre téléphone</em>
          </h2>
          <p className="mx-auto max-w-xl text-pretty font-body text-lg font-light text-dark-300">
            Ajoutez MIRA à votre écran d’accueil, c’est gratuit et ça prend 10
            secondes.
          </p>
        </div>

        <div className="reveal" style={{ transitionDelay: "0.15s" }}>
          <InstallTabs
            defaultPlatform={defaultPlatform}
            androidPanel={<AndroidTutorial />}
            iosPanel={<IosTutorial />}
          />
        </div>
      </Reveal>
    </section>
  );
}
