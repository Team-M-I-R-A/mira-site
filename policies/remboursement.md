# Politique d'annulation, de remboursement et de litige

Chez MIRA, nous nous engageons à offrir une expérience fiable et transparente à nos utilisateurs. La présente politique définit ce qui se passe lorsqu'une réservation payée est annulée ou lorsqu'un séjour pose problème.

Les dates sont appréciées dans le fuseau horaire **Africa/Brazzaville (UTC+1, sans heure d'été)**.

Les réservations payées avant l'entrée en vigueur de la présente version restent soumises aux conditions applicables au moment de leur paiement.

## 1. Annulation avant l'arrivée

Le client peut annuler sa réservation jusqu'à la date et l'heure de début du séjour, tant qu'il n'a pas confirmé son arrivée.

### Réservation créée un autre jour que celui du début du séjour

L'annulation déclenche un remboursement **automatique de 100 % du montant payé**. Aucune démarche supplémentaire n'est nécessaire.

### Réservation créée le jour même du début du séjour

Aucun remboursement automatique n'est déclenché. La demande est examinée par notre équipe, qui fixe :

* le **pourcentage du montant payé remboursé au client** ;
* le **pourcentage du montant payé versé à l'hôte**, le cas échéant.

Le solde éventuel revient à MIRA, sans pouvoir dépasser le taux de commission applicable à la réservation. Le remboursement peut être nul si la situation le justifie : le motif de la décision est alors communiqué.

Dans tous les cas, les dates du séjour sont libérées et l'hôte est informé de l'annulation.

## 2. Après l'arrivée

Une fois le séjour commencé, la réservation ne peut plus être annulée. Si le séjour pose problème, le client peut ouvrir un litige.

## 3. Litige

### Quand ouvrir un litige

Un litige peut être ouvert depuis l'application, à partir de l'arrivée et jusqu'à **24 heures après la fin du séjour**. Le client indique le motif, décrit le problème, précise s'il est resté dans le logement et le nombre de nuits passées, et peut joindre des photos.

### Déroulement

* Les versements à l'hôte qui ne sont pas encore partis sont **suspendus immédiatement**. Une opération déjà en cours chez l'opérateur suit son résultat réel.
* L'hôte est informé et dispose de **24 heures** pour donner sa version. Sans réponse dans ce délai, notre équipe se prononce avec les éléments disponibles.
* Notre équipe vise à rendre sa décision dans les **48 heures** suivant l'ouverture du litige. Aucune décision n'est prise automatiquement.
* L'historique des litiges du client et de l'hôte peut être consulté pour apprécier la situation. Il ne déclenche à lui seul ni décision ni sanction.

### Décision

La décision indique le montant remboursé au client, le montant versé à l'hôte et le motif.

Lorsque des nuits ont été passées dans le logement, elles sont en principe payées à l'hôte et le reste est remboursé au client. Il ne peut y être dérogé qu'en cas de **problème grave**, par exemple un logement insalubre ou dangereux. Cette dérogation est justifiée et conservée.

### Versement déjà effectué

Si le remboursement décidé dépasse les sommes qui n'ont pas encore été versées pour la réservation, MIRA peut avancer la différence au client. Cette différence devient une dette de l'hôte, retenue sur ses prochains versements, tous logements confondus. Chaque retenue est tracée et notifiée à l'hôte. Une retenue ne peut résulter que d'une décision de litige enregistrée.

## 4. Délais et destination du remboursement

* Une fois la décision validée, le remboursement est envoyé **sous 24 heures**. L'objectif est de l'envoyer dès la validation.
* Le délai d'encaissement dépend ensuite de l'opérateur (MTN MoMo ou Airtel Money) et peut prendre jusqu'à quarante-huit (48) heures.
* Le remboursement est effectué sur le **numéro Mobile Money utilisé pour le paiement**. Aucun autre numéro n'est accepté.
* Si un paiement est confirmé par l'opérateur alors que la réservation n'est plus possible, le montant est intégralement remboursé.

## 5. Motif de la demande

Le motif d'annulation communiqué par le client est facultatif mais recommandé. Il est limité à **255 caractères** (les emoji comptent pour un caractère). Au-delà, la demande est refusée avec une erreur explicite ; le texte n'est jamais tronqué silencieusement. Les caractères de contrôle sont retirés.

## 6. Suivi

Le client peut consulter l'état de son remboursement et de son litige depuis son compte.

| État du remboursement | Signification |
|---|---|
| `requested` | Remboursement validé, en attente d'envoi |
| `pending_manual_review` | Dossier transmis à notre équipe |
| `processing` | Remboursement initié auprès de l'opérateur |
| `completed` | Remboursement confirmé par l'opérateur |
| `failed` | Échec technique ; reprise par notre équipe |
| `rejected` | Aucun remboursement n'est dû après examen |

| État du litige | Signification |
|---|---|
| `awaiting_host` | En attente de la réponse de l'hôte |
| `under_review` | En cours d'examen par notre équipe |
| `decided` | Décision rendue, paiements en cours |
| `closed` | Décision rendue, paiements terminés |

Le montant affiché est le montant effectivement remboursé (ou en cours de l'être). Le numéro de destination est toujours **masqué** dans l'interface et les notifications.

## 7. Conditions générales

* Toute demande doit être effectuée via les canaux officiels de la plateforme ou du service client.
* Le total remboursé et versé ne peut jamais dépasser le montant payé, sauf avance de MIRA décrite à l'article 3.
* Nous nous réservons le droit de refuser toute demande abusive, frauduleuse ou incomplète.
* En cas de délai dépassé ou de réponse incertaine de l'opérateur, le statut de l'opération est vérifié avant toute nouvelle tentative : une somme confirmée n'est jamais envoyée deux fois.

En utilisant notre plateforme, le client reconnaît avoir lu et accepté la présente politique.
