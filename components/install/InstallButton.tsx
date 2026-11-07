"use client";

import { APP_SHARES_ORIGIN, APP_URL, getAppInstallUrl } from "@/lib/config";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

// Chaînes de classes statiques : le premier rendu client doit produire
// exactement le même attribut `className` que le HTML rendu par le serveur.
const primaryButton =
  "press inline-flex min-h-[48px] min-w-[220px] touch-manipulation items-center justify-center rounded-xl bg-gradient-to-r from-[#2233DD] to-[#1A6BFF] text-white px-7 py-3 text-center text-sm font-medium transition-colors duration-200 hover:bg-[#00c8e0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00798f] focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 disabled:cursor-not-allowed disabled:opacity-60";

const secondaryButton =
  "press inline-flex min-h-[48px] touch-manipulation items-center justify-center rounded-xl border border-white/10 px-7 py-3 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-dark-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00798f] focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950";

export default function InstallButton() {
  const { canInstall, isInstalled, isPrompting, promptInstall } =
    useInstallPrompt();

  // Le prompt natif n'est utilisable que si l'application partage l'origine du site.
  const nativePromptAvailable = APP_SHARES_ORIGIN && canInstall;

  if (isInstalled) {
    return (
      <div className="flex flex-col items-center gap-3">
        <p role="status" className="text-sm font-medium text-emerald-700">
          MIRA est installée
        </p>
        <a href={APP_URL} className={secondaryButton}>
          Ouvrir MIRA
        </a>
      </div>
    );
  }

  if (nativePromptAvailable) {
    return (
      <button
        type="button"
        onClick={promptInstall}
        disabled={isPrompting}
        aria-busy={isPrompting}
        className={primaryButton}
      >
        {isPrompting ? "Installation…" : "Installer l’application"}
      </button>
    );
  }

  return (
    <a href={getAppInstallUrl()} className={primaryButton}>
      Installer l’application
    </a>
  );
}
