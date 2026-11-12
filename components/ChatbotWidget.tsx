'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { MessageCircle, X, Send, ArrowRight, BadgeCheck } from 'lucide-react'
import { APP_URL } from '@/lib/config'
import { containsTerm, normalize } from '@/lib/chatbot/text'

const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    'Bonjour 👋 Je suis l\'assistant M I R A. Posez-moi vos questions sur les réservations, les paiements Mobile Money, les remboursements ou la protection de vos données.',
}


const QUICK_REPLIES = [
  'Remboursement & annulation',
  'Payer avec Mobile Money',
  'Devenir hôte',
  'Protéger mes données',
]

type LocalReply = {
  content: string
  href?: string
  linkLabel?: string
}

type FaqIntent = LocalReply & {
  /** Expressions complètes : elles pèsent plus lourd qu'un mot isolé. */
  phrases: string[]
  /** Mots isolés, volontairement précis pour éviter les faux positifs. */
  keywords: string[]
}

type SmallTalk = {
  patterns: RegExp[]
  content: string
}

// Salutations, remerciements, etc. : traités uniquement si le message entier
// correspond, pour ne jamais court-circuiter une vraie question.
const SMALL_TALK: SmallTalk[] = [
  {
    patterns: [
      /^(bonjour|bonsoir|salut|slt|hello|coucou|hey|yo)( mira)?$/,
      /^(bonjour|bonsoir|salut|slt|hello|coucou|hey|yo)? ?(comment (vas[- ]?tu|allez[- ]?vous|tu vas|vous allez)|comment ca va|ca va|tu vas bien|vous allez bien)( bien| aujourd hui)?$/,
    ],
    content:
      "Bonjour 👋 Je vais très bien, merci ! Comment puis-je vous aider ? Posez-moi une question sur les logements, les paiements Mobile Money ou l'inscription.",
  },
  {
    patterns: [
      /^((ca marche|ok|super|parfait|nickel|top) )?(merci( beaucoup| bien| infiniment| pour (votre|ton) aide)?|mille mercis|c est gentil)$/,
    ],
    content:
      "Avec plaisir 🙌 N'hésitez pas si vous avez d'autres questions sur M I R A !",
  },
  {
    patterns: [
      /^(au revoir|bye|a plus|a bientot|bonne journee|bonne soiree|bonne nuit|ciao|a la prochaine)$/,
    ],
    content:
      "À bientôt 👋 Merci de votre visite, et à très vite sur M I R A !",
  },
  {
    patterns: [
      /^(ok|okay|d accord|dac|super|parfait|cool|nickel|top|bien recu|compris|entendu|ca marche|ca roule|c est bon)$/,
    ],
    content:
      "Parfait 👍 N'hésitez pas si vous avez d'autres questions sur M I R A !",
  },
  {
    patterns: [
      /^(qui (es|est)[- ]tu|tu es qui|tu es un robot|es tu un robot|tu es humain|presente toi|que (peux|sais)[- ]tu faire|tu peux faire quoi|tu sers a quoi|comment peux tu m aider|tu fais quoi|c est quoi (ton|votre) nom|comment (tu t appelles|vous vous appelez)|tu t appelles comment)$/,
    ],
    content:
      "Je suis l'assistant virtuel de M I R A 🤖 Je peux vous renseigner sur les logements, les paiements Mobile Money, l'inscription et le lancement de l'application.",
  },
]

const LOCAL_REPLIES: FaqIntent[] = [
  {
    phrases: [
      'comment ca marche',
      'comment ca fonctionne',
      'comment fonctionne',
      'comment faire',
      'comment utiliser',
      'comment l utiliser',
      'comment reserver',
      'comment se passe la reservation',
      'comment se deroule',
      'ca marche comment',
      'les etapes',
      'mode d emploi',
      'comment proceder',
      'processus de reservation',
    ],
    keywords: [
      'marche',
      'fonctionne',
      'fonctionnement',
      'utiliser',
      'etapes',
      'etape',
      'procedure',
      'reservation',
      'reserver',
      'processus',
    ],
    content:
      "C'est simple : recherchez un logement, choisissez vos dates, réservez et payez via Mobile Money. Vous recevrez ensuite votre confirmation par SMS. 🚀",
    href: '#how-it-works',
    linkLabel: 'Voir comment ça marche',
  },
  {
    phrases: [
      'logements disponibles',
      'logement disponible',
      'quels logements',
      'voir les logements',
      'chercher un logement',
      'trouver un logement',
      'il y a des logements',
      'des logements sont',
      'quand les logements',
      'logements a brazzaville',
      'logements a pointe noire',
      'logements a pointe-noire',
    ],
    keywords: [
      'logement',
      'logements',
      'appartement',
      'appartements',
      'chambre',
      'chambres',
      'maison',
      'maisons',
      'disponible',
      'disponibles',
      'disponibilite',
      'brazzaville',
      'pointe-noire',
      'pointe noire',
      'dolisie',
      'congo',
      'louer',
      'location',
    ],
    content:
      "MIRA référence des logements à Brazzaville, Pointe-Noire et partout au Congo. Les prix et les disponibilités à jour sont consultables dans l'application. 🏠",
    href: APP_URL,
    linkLabel: "Ouvrir MIRA",
  },
  {
    phrases: [
      'publier un logement',
      'publier mon logement',
      'publier une annonce',
      'mettre en location',
      'mettre mon logement en location',
      'louer mon bien',
      'je suis proprietaire',
      'proprietaire d un logement',
      'devenir hote',
      'devenir proprietaire',
      'mettre mon bien en location',
    ],
    keywords: ['proprietaire', 'proprietaires', 'publier', 'annonce', 'annonces'],
    content:
      "Les propriétaires peuvent publier leurs logements directement dans l'application 🏠. Ouvrez M I R A pour publier votre annonce dès maintenant.",
    href: APP_URL,
    linkLabel: "Ouvrir MIRA",
  },
  {
    phrases: [
      'mobile money',
      'mtn momo',
      'mtn mobile money',
      'airtel money',
      'moyens de paiement',
      'moyen de paiement',
      'comment payer',
      'payer avec',
      'paiement mobile',
    ],
    keywords: ['payer', 'paiement', 'paiements', 'momo', 'mtn', 'airtel', 'money'],
    content:
      "MIRA accepte MTN Mobile Money (MTN MoMo) et Airtel Money. Le paiement est confirmé par l'opérateur avant la validation de votre réservation. 💳",
    href: '#payment',
    linkLabel: 'En savoir plus sur les paiements',
  },
  {
    phrases: [
      'combien ca coute',
      'combien coute',
      'combien coutent',
      'quel est le prix',
      'quel prix',
      'les prix',
      'le prix',
      'c est combien',
      'ca coute combien',
      'frais de service',
      'c est gratuit',
      'est ce gratuit',
      'application gratuite',
    ],
    keywords: [
      'prix',
      'tarif',
      'tarifs',
      'cout',
      'couts',
      'coute',
      'coutent',
      'frais',
      'gratuit',
      'gratuite',
      'payant',
      'payante',
      'abonnement',
    ],
    content:
      "La consultation et l'inscription sont gratuites. Lors d'une réservation, MIRA perçoit une commission de 10 % sur le montant payé ; le reste revient à l'hôte. Le taux et la répartition sont fixés à la création de la réservation. 💰",
    href: APP_URL,
    linkLabel: "Ouvrir MIRA",
  },
  {
    phrases: [
      'remboursement',
      'demande de remboursement',
      'me faire rembourser',
      'etre rembourse',
      'remboursement total',
      'annuler ma reservation',
      'annulation de reservation',
      'annuler le sejour',
      'comment annuler',
    ],
    keywords: [
      'rembourse',
      'remboursement',
      'rembourser',
      'annulation',
      'annuler',
    ],
    content:
      "Vous pouvez annuler jusqu'au début du séjour, tant que vous n'avez pas confirmé votre arrivée. Si la réservation a été créée un autre jour que le début du séjour, le remboursement est automatique à 100 %. Si elle a été créée le jour même, notre équipe examine la demande : le remboursement peut être total, partiel ou nul selon la situation. Le remboursement part sous 24 h vers le numéro Mobile Money utilisé pour payer, puis l'opérateur peut prendre jusqu'à 48 h. 🏠",
    href: '/policies/remboursement',
    linkLabel: 'Lire la politique de remboursement',
  },
  {
    phrases: [
      'ouvrir un litige',
      'faire un litige',
      'litige',
      'sejour pose probleme',
      'probleme dans le logement',
      'logement insalubre',
      'logement dangereux',
    ],
    keywords: ['litige', 'probleme', 'insalubre', 'dangereux'],
    content:
      "Après l'arrivée, l'annulation n'est plus possible. Vous pouvez ouvrir un litige depuis l'application, dès l'arrivée et jusqu'à 24 h après la fin du séjour. Les versements à l'hôte sont suspendus, il dispose de 24 h pour répondre, et notre équipe vise une décision sous 48 h. Le remboursement éventuel est ensuite envoyé sous 24 h. ⚖️",
    href: '/policies/remboursement',
    linkLabel: 'Lire la politique des litiges',
  },
  {
    phrases: [
      'paiement securise',
      'est ce securise',
      'c est fiable',
      'est ce fiable',
      'politique de securite',
      'mes donnees sont elles protegees',
      'comment protegez vous',
      'en cas de fraude',
      'arnaque',
      'piratage',
    ],
    keywords: [
      'securite',
      'securise',
      'securisee',
      'fiable',
      'confiance',
      'arnaque',
      'garantie',
      'garanti',
      'fraude',
      'escroquerie',
    ],
    content:
      "Les paiements passent par MTN Mobile Money et Airtel Money. MIRA ne stocke pas les informations sensibles de vos comptes Mobile Money, masque les numéros dans les notifications et trace les actions de son équipe. Un changement de numéro de versement d'un hôte bloque ses versements pendant 24 h. 🔒",
    href: '/policies/security',
    linkLabel: 'Lire la politique de sécurité',
  },
  {
    phrases: [
      'liste d attente',
      'liste attente',
      'etre notifie',
      'etre informe',
      'me notifier',
      'me prevenir',
      'rejoindre mira',
      'date de lancement',
      'quand sort',
      'quand sera disponible',
      'quand l application',
      'quand est ce que l application',
      'application sera disponible',
      'application est disponible',
      'mira est disponible',
      'est ce que mira est disponible',
      'quand sort l application',
      'l application sort',
      'quand est ce que mira',
      'c est pour quand',
      'bientot disponible',
      'deja disponible',
      'application disponible',
    ],
    keywords: [
      'attente',
      'lancement',
      'beta',
      'notifie',
      'notifier',
      'notification',
    ],
    content:
      "Bonne nouvelle : MIRA est accessible dès maintenant en ligne 🚀 Ouvrez l'application depuis votre navigateur pour créer votre compte et consulter les logements disponibles.",
    href: APP_URL,
    linkLabel: "Ouvrir MIRA",
  },
  {
    phrases: [
      'que signifie mira',
      'c est quoi mira',
      'qu est ce que mira',
      'a quoi sert mira',
      'but de l application',
      'pourquoi cette application',
      'qui a cree mira',
      'qui est le fondateur',
      'fondateur de l application',
      'presente moi mira',
      'parle moi de mira',
      'mira est quoi',
    ],
    keywords: ['mira', 'fondateur', 'createur', 'signifie', 'objectif'],
    content:
      "M I R A est une plateforme de location immobilière pensée pour le Congo : trouver un logement, réserver et payer via Mobile Money. Elle a été créée par Alex Jonathan NGASSAKI. 🏠",
    href: '#how-it-works',
    linkLabel: "Découvrir M I R A",
  },
  {
    phrases: [
      'contacter le support',
      'contacter support',
      'parler a un humain',
      'parler a quelqu un',
      'service client',
      'nous contacter',
      'vous contacter',
      'adresse email',
      'numero de telephone',
      'joindre quelqu un',
      'aide et support',
    ],
    keywords: [
      'support',
      'contacter',
      'contact',
      'email',
      'mail',
      'telephone',
      'appeler',
      'humain',
      'assistance',
    ],
    content:
      "Vous pouvez joindre l'équipe MIRA par e-mail à ngassakialex20@gmail.com ou par téléphone au +242 06 767 66 43. Le centre d'aide et toutes les politiques sont aussi disponibles sur /policies. 📩",
    href: 'mailto:ngassakialex20@gmail.com',
    linkLabel: 'Nous écrire',
  },
  {
    phrases: [
      'proteger mes donnees',
      'donnees personnelles',
      'vie privee',
      'vendez mes donnees',
      'partagez mes donnees',
      'cookies',
      'informations personnelles',
    ],
    keywords: ['confidentialite', 'privee', 'cookies', 'donnees'],
    content:
      "MIRA collecte votre nom, vos coordonnées, vos informations de compte, de réservation et de paiement, ainsi que des données techniques. Elles servent à gérer les réservations, les paiements, le support et la prévention de la fraude, et ne sont jamais vendues. 🔐",
    href: '/policies/confidentialite',
    linkLabel: 'Lire la politique de confidentialité',
  },
  {
    phrases: [
      'mes droits',
      'droit d acces',
      'droit de rectification',
      'droit de suppression',
      'supprimer mes donnees',
      'corriger mes donnees',
      'droit d opposition',
      'limitation du traitement',
      'exercer mes droits',
    ],
    keywords: ['droits', 'rectification', 'opposition', 'suppression'],
    content:
      "Vous pouvez demander l'accès à vos données, leur rectification, leur suppression, la limitation d'un traitement ou vous y opposer. Écrivez à ngassakialex20@gmail.com : une réponse est généralement apportée sous 30 jours, et une preuve d'identité peut être demandée pour les demandes sensibles. 📩",
    href: '/policies/vos-droits',
    linkLabel: 'Lire vos droits',
  },
  {
    phrases: [
      'duree de conservation',
      'combien de temps conservez',
      'combien de temps gardez',
      'conservez mes donnees',
      'conservation des donnees',
    ],
    keywords: ['conservation', 'conserve', 'conservez', 'duree'],
    content:
      "Vos données de compte sont conservées tant que le compte est actif, puis jusqu'à 3 ans après sa suppression. Les réservations et transactions sont conservées au moins 5 ans (obligations comptables), les échanges avec le support 2 ans, et les logs techniques 12 mois maximum. 🗂️",
    href: '/policies/conservation-data',
    linkLabel: 'Lire la politique de conservation',
  },
  {
    phrases: [
      'versement a l hote',
      'versement de l hote',
      'quand suis je paye',
      'quand est ce que je suis paye',
      'paiement de l hote',
      'versement proprietaire',
      'quelle commission',
      'combien prenez vous',
    ],
    keywords: ['versement', 'versements', 'commission', 'paye', 'payout'],
    content:
      "MIRA prélève une commission de 10 % sur le montant payé ; le reste revient à l'hôte. Le versement est automatique sur son numéro Mobile Money, sans portefeuille à retirer. Séjour de 7 nuits ou moins : un seul versement dès que le client confirme son arrivée, au plus tard 24 h après le début prévu. Au-delà : un versement par tranche de 7 nuits. Un litige suspend les versements. 💸",
    href: '/policies/utilisation',
    linkLabel: "Lire les conditions d'utilisation",
  },
  {
    phrases: [
      'regles des annonces',
      'conformite des annonces',
      'photos du logement',
      'annonce trompeuse',
      'fausse annonce',
      'obligations de l hote',
    ],
    keywords: ['annonce', 'annonces', 'photos', 'conformite'],
    content:
      "En publiant une annonce, l'hôte s'engage à donner des informations exactes et à utiliser des photos fidèles au logement. Une annonce inexacte ou trompeuse peut être suspendue ou retirée, et le compte de l'hôte suspendu en cas de récidive ou de fraude. 🏠",
    href: '/policies/annonces',
    linkLabel: 'Lire la politique des annonces',
  },
  {
    phrases: [
      'creer un compte',
      'comment s inscrire',
      's inscrire',
      'suspendre mon compte',
      'mon compte',
      'mes identifiants',
      'mot de passe',
    ],
    keywords: ['compte', 'inscription', 'inscrire', 'identifiants', 'mot de passe'],
    content:
      "La création d'un compte vous permet de réserver et de gérer vos informations. Utilisez des informations exactes, gardez vos identifiants confidentiels et signalez toute utilisation suspecte. Un compte frauduleux peut être suspendu. 👤",
    href: '/policies/utilisation',
    linkLabel: "Lire les conditions d'utilisation",
  },
  {
    phrases: [
      'devenir partenaire',
      'partenariat',
      'partenaire',
      'agence immobiliere',
      'travailler avec mira',
    ],
    keywords: ['partenaire', 'partenariat', 'partenaires', 'agence'],
    content:
      "Vous êtes une agence, un propriétaire multi-biens ou une entreprise ? Écrivez à ngassakialex20@gmail.com avec l'objet « Partenariat avec MIRA » et décrivez votre projet. 🤝",
    href: 'mailto:ngassakialex20@gmail.com?subject=Demande%20de%20partenariat%20avec%20MIRA',
    linkLabel: 'Nous écrire',
  },
]

function scoreIntent(text: string, intent: FaqIntent) {
  let score = 0
  for (const phrase of intent.phrases) {
    if (containsTerm(text, phrase)) score += 3
  }
  for (const keyword of intent.keywords) {
    if (containsTerm(text, keyword)) score += 1
  }
  return score
}

function getLocalReply(text: string): LocalReply | null {
  const normalized = normalize(text)
  if (!normalized) return null

  const smallTalk = SMALL_TALK.find((entry) =>
    entry.patterns.some((pattern) => pattern.test(normalized)),
  )
  if (smallTalk) return { content: smallTalk.content }

  let best: FaqIntent | null = null
  let bestScore = 0

  for (const intent of LOCAL_REPLIES) {
    const score = scoreIntent(normalized, intent)
    if (score > bestScore) {
      best = intent
      bestScore = score
    }
  }

  if (!best) return null

  return {
    content: best.content,
    href: best.href,
    linkLabel: best.linkLabel,
  }
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [messages, setMessages] = useState<{role: string, content: string, href?: string, linkLabel?: string}[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage = { role: 'user', content: text }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // ✅ Réponse locale — zéro token consommé
    const local = getLocalReply(text)
    if (local) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: local.content,
        href: local.href,
        linkLabel: local.linkLabel,
      }])
      return 
    }

    // Sinon → API, avec l'historique pour permettre les questions de suivi
    setTyping(true)
    try {
      const history = [...messages, userMessage]
        .slice(-8)
        .map(({ role, content }) => ({ role, content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json()
      if (!res.ok || !data.response) throw new Error(`Réponse invalide (${res.status})`)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        href: data.href,
        linkLabel: data.linkLabel,
      }])
    } catch (err) {
      console.error('Erreur lors du POST: ', err)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Je n'arrive pas à répondre pour le moment. Réessayez dans un instant, ou écrivez-nous : le centre d'aide et les politiques restent disponibles.",
        href: '/policies',
        linkLabel: "Ouvrir le centre d'aide",
      }])
    } finally {
      setTyping(false)
    }
  }

  // Auto-scroll
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    messagesEndRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [messages, typing])

  // Au tactile, le focus ouvrirait le clavier par-dessus la conversation
  const focusInput = () => {
    if (window.matchMedia('(pointer: fine)').matches) {
      inputRef.current?.focus({ preventScroll: true })
    }
  }

  // Focus input when opened
  useEffect(() => {
    if (open) focusInput()
  }, [open])

  const handleClose = () => {
    setClosing(true)
    toggleRef.current?.focus({ preventScroll: true })
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, 240)
  }

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const handleToggle = () => {
    if (closing) {
      // Un clic pendant la fermeture la renverse depuis la position actuelle
      if (closeTimer.current) clearTimeout(closeTimer.current)
      setClosing(false)
      focusInput()
    } else if (open) {
      handleClose()
    } else {
      setOpen(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(input)
  }

  const isOpen = open && !closing

  return (
    <div className="chatbot-bubble">
      {/* Chat window */}
      {open && (
        <div
          className={`chatbot-window${closing ? ' closing' : ''}`}
          role="dialog"
          aria-label="Assistant M I R A"
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <Image src="/logo.png" alt="Logo M I R A" width={40} height={40} />
            </div>
            <div className="chatbot-header-info">
              <div className="chatbot-header-name">
                Assistant M I R A
                <BadgeCheck className="chatbot-verified" size={14} />
              </div>
              <div className="chatbot-header-status">En ligne</div>
            </div>
            <button
              type="button"
              className="chatbot-close"
              onClick={handleClose}
              aria-label="Fermer le chat"
              style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="chatbot-messages"
            role="log"
            aria-live="polite"
            aria-label="Historique de la conversation"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role === 'user' ? 'user' : 'bot'}`}>
                {msg.content}
                {msg.href && (
                  <a
                    href={msg.href}
                    target={msg.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      msg.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    onClick={() => handleClose()}
                    className="chat-msg-link press"
                  >
                    {msg.linkLabel} <ArrowRight size={14} />
                  </a>
                )}
              </div>
            ))}
            {typing && (
              <div className="chat-msg bot">
                <div className="typing-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies — only show if last message is bot */}
          {messages[messages.length - 1]?.role === 'assistant' && !typing && (
            <div className="chatbot-quick-replies">
              {QUICK_REPLIES.map((r) => (
                <button
                  type="button"
                  key={r}
                  className="quick-reply-btn"
                  onClick={() => sendMessage(r)}
                  style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input-row">
            <input
              ref={inputRef}
              className="chatbot-input"
              type="text"
              placeholder="Votre message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={500}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button
              type="button"
              className="chatbot-send"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              aria-label="Envoyer"
              style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        ref={toggleRef}
        type="button"
        className="chatbot-toggle"
        onClick={handleToggle}
        aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        style={{
          position: 'relative',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          cursor: 'pointer',
        }}
      >
        {isOpen ? <X size={24} style={{ color: '#fff' }} /> : <MessageCircle size={24} style={{ color: '#fff' }} />}
      </button>
    </div>
  )
}
