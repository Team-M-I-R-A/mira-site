import { getPolicy, type Policy } from "@/lib/policies";
import { findPolicyMatches } from "./policyLinks";

/**
 * Synthèse compacte et stable des règles essentielles.
 *
 * Elle est volontairement courte : le plan gratuit de Groq limite les requêtes
 * à 8 000 tokens/minute. Les documents complets ne sont ajoutés que lorsqu'ils
 * sont pertinents pour la question (voir getPolicyContextForMessage).
 *
 * ⚠️ À maintenir en cohérence avec les fichiers de /policies.
 */
const POLICY_DIGEST = `### Réservation et paiement
- Une réservation est valide après confirmation du paiement.
- Moyens acceptés : MTN Mobile Money (MTN MoMo) et Airtel Money uniquement.
- MIRA prélève une commission de 10 % sur le montant payé ; le reste revient à l'hôte. Taux et répartition fixés à la création de la réservation.

### Versement à l'hôte
- Versement automatique sur le numéro Mobile Money de l'hôte, sans portefeuille ni solde à retirer.
- Séjour de 7 nuits ou moins : un seul versement dès que le client confirme son arrivée, au plus tard 24 h après le début prévu.
- Séjour de plus de 7 nuits : un versement par tranche de 7 nuits, proportionnel au nombre de nuits.
- Un litige suspend les versements. Un changement de numéro de versement exige une vérification et bloque les versements pendant 24 h.

### Annulation, remboursement et litige
- Annulation possible jusqu'au début du séjour, tant que le client n'a pas confirmé son arrivée.
- Réservation créée un autre jour que le début du séjour : remboursement automatique de 100 %.
- Réservation créée le jour même : examen par l'équipe ; remboursement total, partiel ou nul selon la situation, avec motif communiqué.
- Après l'arrivée : plus d'annulation possible. Litige possible depuis l'application, dès l'arrivée et jusqu'à 24 h après la fin du séjour (motif, description, photos si possible).
- Litige : versements suspendus, l'hôte a 24 h pour répondre, décision visée sous 48 h.
- Remboursement envoyé sous 24 h après la décision, sur le numéro Mobile Money utilisé pour payer ; l'opérateur peut prendre jusqu'à 48 h.

### Compte et annonces
- Informations exactes, identifiants confidentiels, pas de partage de compte, signalement de toute utilisation suspecte.
- Annonces : informations et photos fidèles au logement. Une annonce inexacte ou trompeuse peut être corrigée, suspendue ou retirée ; le compte peut être suspendu ou exclu.

### Données personnelles
- Données collectées : identité, coordonnées, profil, logements (hôtes), réservations, paiements, données techniques et éléments de litige.
- Les données ne sont jamais vendues. Partage limité aux prestataires techniques, services de paiement, obligations légales et protection contre la fraude.
- Droits : accès, rectification, suppression, opposition, limitation du traitement. Réponse généralement sous 30 jours ; une preuve d'identité peut être demandée.
- Conservation : compte actif puis 3 ans maximum après suppression ; réservations et transactions au moins 5 ans ; support 2 ans ; logs techniques 12 mois maximum.

### Sécurité
- Paiements traités par des prestataires sécurisés (MTN MoMo, Airtel Money). MIRA ne stocke pas les informations sensibles complètes des comptes Mobile Money.
- Numéros masqués dans les journaux et notifications, actions de l'équipe tracées, contrôles anti-fraude.
- En cas d'incident de sécurité : mesures correctives, information des utilisateurs concernés si nécessaire.

### Contact
- E-mail : ngassakialex20@gmail.com — Téléphone : +242 06 767 66 43 — Centre d'aide : /policies.`;

/**
 * Contexte injecté dans le prompt : synthèse + documents complets pertinents.
 * Les documents sont lus une seule fois par processus puis mis en cache.
 */
export function getPolicyContextForMessage(
  message: string,
  includeDocuments = true,
): string {
  const matches = includeDocuments ? findPolicyMatches(message, 2) : [];

  const documents = matches
    .map(({ slug }) => getPolicy(slug))
    .filter((policy): policy is Policy => Boolean(policy))
    .map(
      (policy) =>
        `--- DOCUMENT COMPLET : ${policy.title}\nURL : /policies/${policy.slug}\n\n${policy.body}`,
    )
    .join("\n\n");

  return `${POLICY_DIGEST}

## Documents complets pertinents pour la question
${documents || "Aucun document spécifique sélectionné. Utilise la synthèse ci-dessus et, si le détail manque, oriente vers /policies ou le support."}`;
}
