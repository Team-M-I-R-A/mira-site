// URL publique de l'application MIRA (PWA), déployée séparément de ce site vitrine.
// TODO : mettre à jour si le domaine de l'application change.
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.mira-site-cg.com'

// Le site vitrine et l'application sont servis sur deux origines différentes
// (mira-site-cg.com et app.mira-site-cg.com). Le site ne peut donc pas
// déclencher l'installation de l'application via beforeinstallprompt.
export const APP_SHARES_ORIGIN = false

/** Ouvre l'application avec le drapeau d'installation géré par le projet mira-app. */
export function getAppInstallUrl(appUrl: string = APP_URL): string {
  const url = new URL(appUrl)
  url.searchParams.set('install', '1')
  return url.toString()
}
