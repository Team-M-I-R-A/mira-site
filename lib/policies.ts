import { readFileSync } from "node:fs";
import path from "node:path";

export type PolicyCategory =
  | "Documents principaux"
  | "Vos données"
  | "Confiance & sécurité";

export type PolicyIconName =
  | "book"
  | "lock"
  | "refresh"
  | "database"
  | "clock"
  | "user"
  | "shield"
  | "megaphone";

type PolicyDefinition = {
  /** Segment d'URL : /policies/<slug> */
  slug: string;
  /** Fichier source dans /policies */
  file: string;
  /** Libellé court utilisé dans la navigation */
  shortTitle: string;
  description: string;
  category: PolicyCategory;
  icon: PolicyIconName;
};

export type Policy = PolicyDefinition & {
  /** Titre officiel lu dans le document markdown */
  title: string;
  /** Contenu markdown sans le titre principal */
  body: string;
};

export const policyCategoryOrder: PolicyCategory[] = [
  "Documents principaux",
  "Vos données",
  "Confiance & sécurité",
];

const policyDefinitions: PolicyDefinition[] = [
  {
    slug: "utilisation",
    file: "utilisation.md",
    shortTitle: "CGU",
    description:
      "Les règles d'utilisation de la plateforme, des réservations et des paiements.",
    category: "Documents principaux",
    icon: "book",
  },
  {
    slug: "confidentialite",
    file: "confidentialite.md",
    shortTitle: "Confidentialité",
    description:
      "Comment MIRA collecte, utilise et protège vos informations personnelles.",
    category: "Documents principaux",
    icon: "lock",
  },
  {
    slug: "remboursement",
    file: "remboursement.md",
    shortTitle: "Remboursement & litiges",
    description:
      "Annulations, remboursements et traitement des litiges, étape par étape.",
    category: "Documents principaux",
    icon: "refresh",
  },
  {
    slug: "collecte-data",
    file: "collecte_data.md",
    shortTitle: "Collecte des données",
    description:
      "Les informations collectées et les méthodes utilisées pour les recueillir.",
    category: "Vos données",
    icon: "database",
  },
  {
    slug: "utilisation-data",
    file: "utilisation_data.md",
    shortTitle: "Utilisation des données",
    description:
      "Les finalités pour lesquelles vos données sont utilisées et partagées.",
    category: "Vos données",
    icon: "database",
  },
  {
    slug: "conservation-data",
    file: "conservation_data.md",
    shortTitle: "Conservation",
    description:
      "Les durées de conservation et les conditions de suppression de vos données.",
    category: "Vos données",
    icon: "clock",
  },
  {
    slug: "vos-droits",
    file: "vos_droits.md",
    shortTitle: "Vos droits",
    description:
      "Accès, rectification, suppression : comment exercer vos droits.",
    category: "Vos données",
    icon: "user",
  },
  {
    slug: "security",
    file: "security.md",
    shortTitle: "Sécurité",
    description:
      "Les mesures mises en place pour protéger vos données et la plateforme.",
    category: "Confiance & sécurité",
    icon: "shield",
  },
  {
    slug: "annonces",
    file: "annonces.md",
    shortTitle: "Annonces des hôtes",
    description:
      "Les obligations de véracité et de conformité pour les annonces des hôtes.",
    category: "Confiance & sécurité",
    icon: "megaphone",
  },
];

const cache = new Map<string, Policy>();

function readPolicy(definition: PolicyDefinition): Policy {
  const cached = cache.get(definition.slug);
  if (cached) return cached;

  const raw = readFileSync(
    path.join(process.cwd(), "policies", definition.file),
    "utf8",
  );

  const lines = raw.split(/\r?\n/);
  const titleLine = lines.find((line) => line.startsWith("# "));
  const title = titleLine ? titleLine.slice(2).trim() : definition.shortTitle;

  // Retire le premier titre : il est affiché dans l'en-tête de la page.
  const body = (titleLine ? raw.replace(/^#\s+.*\r?\n?/, "") : raw).trim();

  const policy: Policy = { ...definition, title, body };
  cache.set(definition.slug, policy);
  return policy;
}

export function getAllPolicies(): Policy[] {
  return policyDefinitions.map(readPolicy);
}

export function getPolicy(slug: string): Policy | undefined {
  const definition = policyDefinitions.find((item) => item.slug === slug);
  return definition ? readPolicy(definition) : undefined;
}

export function getPolicyGroups(): {
  category: PolicyCategory;
  policies: Policy[];
}[] {
  const policies = getAllPolicies();
  return policyCategoryOrder.map((category) => ({
    category,
    policies: policies.filter((policy) => policy.category === category),
  }));
}
