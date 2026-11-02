'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { MessageCircle, X, Send, ArrowRight, BadgeCheck } from 'lucide-react'
import { APP_URL } from '@/lib/config'

const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    'Bonjour 👋 Je suis l\'assistant M I R A. Une question sur les logements, les paiements Mobile Money ou l\'inscription ?',
}


const QUICK_REPLIES = [
  'Comment ça marche ?',
  'Payer avec MTN MoMo',
  'Logements disponibles',
  'Contacter le support',
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
      'Plus de 2 000 logements vérifiés à Brazzaville, Pointe-Noire, Dolisie et partout au Congo. 🏠',
    href: '#features',
    linkLabel: 'Voir les fonctionnalités',
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
    ],
    keywords: ['proprietaire', 'proprietaires', 'publier', 'annonce', 'annonces'],
    content:
      "Les propriétaires peuvent publier leurs logements directement dans l'application 🏠. Ouvrez M I R A pour publier votre annonce dès maintenant.",
    href: APP_URL,
    linkLabel: "Ouvrir l'application",
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
      'paiement securise',
    ],
    keywords: ['payer', 'paiement', 'paiements', 'momo', 'mtn', 'airtel', 'money'],
    content:
      "M I R A accepte MTN Mobile Money et Airtel Money. Votre argent est sécurisé jusqu'à confirmation. 💳",
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
      "L'utilisation de M I R A est gratuite pour les utilisateurs. Les prix des logements varient selon le logement et la ville : ouvrez l'application pour les découvrir. 💰",
    href: APP_URL,
    linkLabel: "Ouvrir l'application",
  },
  {
    phrases: [
      'paiement securise',
      'est ce securise',
      'c est fiable',
      'est ce fiable',
      'en cas de probleme',
      'demande de remboursement',
      'me faire rembourser',
      'etre rembourse',
      'remboursement total',
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
      'rembourse',
      'remboursement',
      'rembourser',
      'litige',
      'escroquerie',
    ],
    content:
      "Chaque paiement est protégé jusqu'à confirmation de votre séjour. En cas de problème, vous êtes remboursé intégralement si votre demande est faite dans les 24 h suivant le paiement. 🔒",
    href: '#features',
    linkLabel: 'Voir nos garanties',
  },
  {
    phrases: [
      'liste d attente',
      'liste attente',
      'etre notifie',
      'etre informe',
      'me notifier',
      'me prevenir',
      'comment s inscrire',
      's inscrire',
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
      'inscription',
      'inscrire',
      'attente',
      'rejoindre',
      'lancement',
      'beta',
      'notifie',
      'notifier',
      'notification',
    ],
    content:
      "Bonne nouvelle : l'application M I R A est disponible dès maintenant 🚀 Ouvrez-la depuis votre navigateur pour créer votre compte et commencer à chercher votre logement.",
    href: APP_URL,
    linkLabel: "Ouvrir l'application",
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
    href: '#features',
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
      "Vous pouvez joindre l'équipe M I R A par e-mail à ngassakialex20@gmail.com ou par téléphone au +242 04 017 76 47. Nous vous répondrons avec plaisir ! 📩",
    href: 'mailto:ngassakialex20@gmail.com',
    linkLabel: 'Nous écrire',
  },
]

/** Minuscules, sans accents ni apostrophes, pour comparer les intentions. */
function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’`]/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Vrai uniquement si le terme est présent comme mot/expression entière. */
function containsTerm(text: string, term: string) {
  const pattern = new RegExp(
    `(^|[^a-z0-9])${escapeRegExp(term)}([^a-z0-9]|$)`,
  )
  return pattern.test(text)
}

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
  const [messages, setMessages] = useState<{role: string, content: string, href?: string, linkLabel?: string}[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showBadge, setShowBadge] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage = { role: 'user', content: text }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // ✅ Réponse locale — zéro token consommé
    const local = getLocalReply(text)
    if (local) {
      setTyping(true)
      await new Promise(r => setTimeout(r, 500)) // simulation légère
      setTyping(false)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: local.content,
        href: local.href,
        linkLabel: local.linkLabel,
      }])
      return 
    }

    // Sinon → API
    setTyping(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (err) {
      console.error('Erreur lors du POST: ', err)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Une erreur est survenue, réessayez.' }])
    } finally {
      setTyping(false)
    }
  }

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setShowBadge(false)
      setMessages((prev) => (prev.length === 0 ? [WELCOME_MESSAGE] : prev))
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (open) {
      handleClose()
    } else {
      setOpen(true)
    }
  }


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(input)
  }

  return (
    <div className="chatbot-bubble">
      {/* Chat window */}
      {open && (
        <div
          className={`chatbot-window${closing ? 'closing' : ''}`}
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
              onTouchEnd={(e) => { e.preventDefault(); handleClose() }}
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
              <div key={i} className={`chat-msg ${msg.role}`}>
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
                    className="chat-msg-link"
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
                  onTouchEnd={(e) => { e.preventDefault(); sendMessage(r) }}
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
              maxLength={200}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button
              type="button"
              className="chatbot-send"
              onClick={() => sendMessage(input)}
              onTouchEnd={(e) => { e.preventDefault(); sendMessage(input) }}
              disabled={!input.trim() || typing}
              aria-label="Envoyer"
              style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button — Safari iOS fixes: onTouchEnd + touch-action + tap highlight */}
      <button
        type="button"
        className={`chatbot-toggle${!open && showBadge ? ' has-badge' : ''}`}
        onClick={handleToggle}
        onTouchEnd={handleToggle}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        aria-expanded={open}
        aria-haspopup="dialog"
        style={{
          position: 'relative',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          cursor: 'pointer',
        }}
      >
        {open ? <X size={24} style={{ color: '#fff' }} /> : <MessageCircle size={24} style={{ color: '#fff' }} />}
        {!open && showBadge && (
          <span className="chatbot-badge">1</span>
        )}
      </button>
    </div>
  )
}
