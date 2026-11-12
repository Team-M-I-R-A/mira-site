/** Utilitaires de normalisation partagés par le chatbot (client + serveur). */

/** Minuscules, sans accents ni apostrophes, pour comparer les intentions. */
export function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`]/g, " ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Vrai uniquement si le terme est présent comme mot/expression entière. */
export function containsTerm(text: string, term: string) {
  const pattern = new RegExp(
    `(^|[^a-z0-9])${escapeRegExp(term)}([^a-z0-9]|$)`,
  );
  return pattern.test(text);
}

/** Compte les occurrences d'un terme, plafonnées pour éviter les abus. */
export function countTerm(text: string, term: string) {
  const pattern = new RegExp(
    `(^|[^a-z0-9])${escapeRegExp(term)}([^a-z0-9]|$)`,
    "g",
  );
  return Math.min(text.match(pattern)?.length ?? 0, 3);
}
