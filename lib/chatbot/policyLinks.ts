import { containsTerm, normalize } from "./text";

export type PolicyLink = {
  href: string;
  linkLabel: string;
  /** Segment d'URL, aussi utilisé pour retrouver le document complet. */
  slug: string;
};

type PolicyTopic = PolicyLink & {
  /** Expressions complètes, plus fiables qu'un mot isolé. */
  phrases: string[];
  /** Mots isolés, volontairement précis. */
  keywords: string[];
};

/**
 * Associe une question à la page de politique la plus pertinente.
 * Volontairement conservateur : mieux vaut aucun lien qu'un mauvais lien.
 */
const POLICY_TOPICS: PolicyTopic[] = [
  {
    slug: "remboursement",
    href: "/policies/remboursement",
    linkLabel: "Politique de remboursement",
    phrases: [
      "remboursement",
      "etre rembourse",
      "me faire rembourser",
      "annuler ma reservation",
      "annulation de reservation",
      "annuler le sejour",
      "ouvrir un litige",
      "faire un litige",
      "litige",
      "sejour pose probleme",
      "logement insalubre",
      "logement dangereux",
      "non conformite",
    ],
    keywords: [
      "rembourse",
      "rembourser",
      "annulation",
      "annuler",
      "litige",
      "insalubre",
      "dangereux",
    ],
  },
  {
    slug: "vos-droits",
    href: "/policies/vos-droits",
    linkLabel: "Vos droits sur vos données",
    phrases: [
      "mes droits",
      "droit d acces",
      "droit de rectification",
      "droit de suppression",
      "supprimer mes donnees",
      "corriger mes donnees",
      "droit d opposition",
      "limitation du traitement",
      "exercer mes droits",
    ],
    keywords: ["droits", "rectification", "opposition", "suppression"],
  },
  {
    slug: "conservation-data",
    href: "/policies/conservation-data",
    linkLabel: "Politique de conservation",
    phrases: [
      "duree de conservation",
      "combien de temps conservez",
      "combien de temps gardez",
      "conservez mes donnees",
      "conservation des donnees",
      "donnees supprimees",
    ],
    keywords: ["conservation", "conserve", "conservez", "duree"],
  },
  {
    slug: "confidentialite",
    href: "/policies/confidentialite",
    linkLabel: "Politique de confidentialité",
    phrases: [
      "donnees personnelles",
      "vie privee",
      "vendez mes donnees",
      "partagez mes donnees",
      "cookies",
      "informations personnelles",
    ],
    keywords: ["confidentialite", "privee", "cookies"],
  },
  {
    slug: "collecte-data",
    href: "/policies/collecte-data",
    linkLabel: "Politique de collecte des données",
    phrases: [
      "quelles donnees collectez",
      "donnees collectees",
      "collecte des donnees",
      "quelles informations collectez",
    ],
    keywords: ["collecte", "collectez"],
  },
  {
    slug: "utilisation-data",
    href: "/policies/utilisation-data",
    linkLabel: "Politique d'utilisation des données",
    phrases: [
      "utilisation des donnees",
      "a quoi servent mes donnees",
      "pourquoi collectez mes donnees",
      "finalite des donnees",
    ],
    keywords: ["finalite", "finalites"],
  },
  {
    slug: "security",
    href: "/policies/security",
    linkLabel: "Politique de sécurité",
    phrases: [
      "paiement securise",
      "est ce securise",
      "politique de securite",
      "mes donnees sont elles protegees",
      "comment protegez vous",
      "fraude",
      "arnaque",
      "piratage",
    ],
    keywords: ["securite", "securise", "securisee", "fraude", "arnaque"],
  },
  {
    slug: "annonces",
    href: "/policies/annonces",
    linkLabel: "Politique des annonces",
    phrases: [
      "regles des annonces",
      "conformite des annonces",
      "photos du logement",
      "annonce trompeuse",
      "fausse annonce",
    ],
    keywords: ["annonce", "annonces", "photos", "conformite"],
  },
  {
    slug: "utilisation",
    href: "/policies/utilisation",
    linkLabel: "Conditions d'utilisation",
    phrases: [
      "commission",
      "versement a l hote",
      "versement de l hote",
      "conditions d utilisation",
      "conditions generales",
      "creer un compte",
      "suspendre mon compte",
    ],
    keywords: ["commission", "versement", "cgu", "compte"],
  },
];

function scoreTopic(normalized: string, topic: PolicyTopic) {
  let score = 0;
  for (const phrase of topic.phrases) {
    if (containsTerm(normalized, phrase)) score += 3;
  }
  for (const keyword of topic.keywords) {
    if (containsTerm(normalized, keyword)) score += 1;
  }
  return score;
}

/**
 * Retourne les politiques les plus pertinentes pour une question,
 * triées de la plus probable à la moins probable.
 */
export function findPolicyMatches(text: string, limit = 2): PolicyLink[] {
  const normalized = normalize(text);
  if (!normalized) return [];

  return POLICY_TOPICS.map((topic) => ({
    topic,
    score: scoreTopic(normalized, topic),
  }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ topic }) => ({
      href: topic.href,
      linkLabel: topic.linkLabel,
      slug: topic.slug,
    }));
}

export function findPolicyLink(text: string): PolicyLink | null {
  return findPolicyMatches(text, 1)[0] ?? null;
}
