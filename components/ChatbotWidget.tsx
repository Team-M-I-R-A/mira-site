'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, ArrowRight } from 'lucide-react'


const QUICK_REPLIES = [
  'Comment ça marche ?',
  'Payer avec MTN MoMo',
  'Logements disponibles',
  'Contacter le support',
]

const LOCAL_REPLIES: { keywords: string[]; content: string; href?: string; linkLabel?: string }[] = [
  {
    keywords: ['fonctionne', 'marche', 'comment', 'utiliser', 'étapes'],
    content: 'C\'est simple en 4 étapes : cherchez un logement, choisissez vos dates, payez via Mobile Money, recevez votre confirmation SMS. 🚀',
    href: '#how-it-works',
    linkLabel: 'Voir comment ça marche',
  },
  {
    keywords: ['mtn', 'airtel', 'mobile money', 'momo', 'payer', 'paiement'],
    content: 'M I R A accepte MTN Mobile Money et Airtel Money. Votre argent est sécurisé jusqu\'à confirmation. 💳',
    href: '#payment',
    linkLabel: 'En savoir plus sur les paiements',
  },
  {
    keywords: ['logement', 'appartement', 'chambre', 'maison', 'disponible', 'brazzaville', 'pointe-noire', 'congo'],
    content: 'Plus de 2 000 logements vérifiés à Brazzaville, Pointe-Noire, Dolisie et partout au Congo. 🏠',
    href: '#features',
    linkLabel: 'Voir les fonctionnalités',
  },
  {
    keywords: ['prix', 'tarif', 'coût', 'combien', 'frais'],
    content: 'Les tarifs varient selon le logement et la ville. Inscrivez-vous pour accéder aux prix en avant-première. 💰',
    href: '#waitlist',
    linkLabel: 'Rejoindre la liste d\'attente',
  },
  {
    keywords: ['sécurité', 'sécurisé', 'confiance', 'arnaque', 'fiable', 'garantie'],
    content: 'Chaque paiement est protégé jusqu\'à confirmation de votre séjour. En cas de problème, remboursement intégral. 🔒',
    href: '#features',
    linkLabel: 'Voir nos garanties',
  },
  {
    keywords: ['inscription', 'liste', 'attente', 'rejoindre', 'lancement', 'bêta'],
    content: 'Rejoignez la liste d\'attente pour être parmi les premiers à utiliser M I R A au lancement. 🇨🇬',
    href: '#waitlist',
    linkLabel: 'S\'inscrire maintenant',
  },
]

function getLocalReply(text: string) {
  const lower = text.toLowerCase()
  return LOCAL_REPLIES.find(r => r.keywords.some(k => lower.includes(k))) ?? null
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
        <div className={`chatbot-window${closing ? 'closing' : ''}`}>
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">🏠</div>
            <div className="chatbot-header-info">
              <div className="chatbot-header-name">Assistant M I R A</div>
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
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                {msg.content}
                {msg.href && (
                  <a 
                    href={msg.href}
                    onClick={() => handleClose()}
                    className='inline-flex items-center gap-4 mt-8 text-[11px] text-[#00E5FF] no-underline font-semibold -tracking-tight'
                  >
                    {msg.linkLabel} {<ArrowRight className='w-5 h-5'/>}
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
        className="chatbot-toggle"
        onClick={handleToggle}
        onTouchEnd={handleToggle}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
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
