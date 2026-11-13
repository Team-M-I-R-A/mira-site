export type SupportLink = {
  label: string;
  href: string;
};

/**
 * Liens du support, partagés entre le pied de page et le menu « Support »
 * de la barre de navigation pour éviter toute divergence.
 */
export const supportLinks: SupportLink[] = [
  { label: "Centre d'aide", href: "/policies" },
  { label: "Nous contacter", href: "mailto:ngassakialex20@gmail.com" },
  {
    label: "Politique de confidentialité",
    href: "/policies/confidentialite",
  },
  { label: "CGU", href: "/policies/utilisation" },
  { label: "Remboursement & litiges", href: "/policies/remboursement" },
  { label: "Politique de sécurité", href: "/policies/security" },
];
