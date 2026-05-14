# KasiHome — Site Vitrine

Site web vitrine premium pour KasiHome, une application de gestion de logements adaptée aux réalités congolaises.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build de production
npm run build
npm start
```

Le site sera disponible sur [http://localhost:3000](http://localhost:3000)

---

## 🗂 Structure du projet

```
/
├── app/
│   ├── layout.tsx        # Layout racine (fonts, metadata, SEO)
│   ├── page.tsx          # Page principale (assemblage des sections)
│   └── globals.css       # Styles globaux, variables CSS, animations
├── components/
│   ├── Navbar.tsx        # Navigation sticky avec blur
│   ├── Hero.tsx          # Section héros avec parallax + mockups
│   ├── StatsSection.tsx  # Statistiques + bannière défilante
│   ├── Features.tsx      # 6 fonctionnalités clés en grille
│   ├── HowItWorks.tsx    # 4 étapes du parcours utilisateur
│   ├── MobileMoneySection.tsx  # Section paiement MTN/Airtel
│   ├── AppShowcase.tsx   # Galerie de mockups d'application
│   ├── PhoneMockup.tsx   # Composant mockup téléphone réutilisable
│   ├── Testimonials.tsx  # Grille de témoignages
│   ├── Waitlist.tsx      # Formulaire d'inscription liste d'attente
│   └── Footer.tsx        # Pied de page complet
├── tailwind.config.ts    # Config Tailwind avec couleurs, animations custom
└── next.config.js        # Config Next.js (images distantes, etc.)
```

---

## 📱 Personnaliser les mockups téléphone

Les mockups sont dans `components/PhoneMockup.tsx`. Il y a deux écrans :

### Remplacer par vos vraies captures d'écran

**Option 1 — Image statique (recommandée)**

Dans `PhoneMockup.tsx`, remplacez les placeholders par une vraie image :

```tsx
// Avant (placeholder)
<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-dark-700 to-dark-600 flex items-center justify-center">
  <Home size={14} className="text-white/20" />
</div>

// Après (vraie image)
import Image from 'next/image'
<Image src="/screenshots/home-screen.png" alt="Accueil" fill className="object-cover" />
```

**Option 2 — Image de fond pour les cartes principales**

Dans `HomeScreen()`, la carte featured :
```tsx
// Remplacez le div placeholder par :
<Image
  src="/screenshots/listing-gombe.jpg"
  alt="Villa Gombe"
  fill
  className="object-cover"
/>
```

### Ajouter vos captures dans `/public`

```
/public/
  screenshots/
    home-screen.png       # Écran d'accueil de l'app
    detail-screen.png     # Écran de détail d'un logement
    payment-screen.png    # Écran de paiement Mobile Money
    search-screen.png     # Écran de recherche
```

Dimensions recommandées : **390×844px** (iPhone 14 Pro)

---

## 🎨 Personnalisation des couleurs

Dans `tailwind.config.ts` :

```ts
colors: {
  brand: {
    500: '#f97316',  // Orange principal — changez ici
    600: '#ea580c',  // Orange foncé
  },
  gold: {
    500: '#f59e0b',  // Doré accent
  }
}
```

---

## ✏️ Personnaliser le contenu

### Nom de l'application
- Cherchez "KasiHome" dans tous les fichiers et remplacez par votre nom
- Mettez à jour les metadata dans `app/layout.tsx`

### Informations de contact
Dans `components/Footer.tsx` :
```tsx
// Remplacez :
hello@kasihome.cg
+242 06 XXX XX XX
```

### Formulaire liste d'attente
Dans `components/Waitlist.tsx`, remplacez la simulation par votre vrai endpoint :
```tsx
// Remplacez ce bloc :
await new Promise((r) => setTimeout(r, 1500))

// Par votre appel API :
await fetch('/api/waitlist', {
  method: 'POST',
  body: JSON.stringify({ email, phone, city })
})
```

### Témoignages
Dans `components/Testimonials.tsx`, modifiez le tableau `testimonials[]` avec de vrais avis.

---

## 🌐 Déploiement

### Vercel (recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Variables d'environnement

Créez un fichier `.env.local` :
```env
NEXT_PUBLIC_APP_NAME=KasiHome
NEXT_PUBLIC_WAITLIST_API_URL=https://votre-api.com/waitlist
```

---

## 🔧 Intégrations suggérées

- **Liste d'attente** : [Mailchimp](https://mailchimp.com), [ConvertKit](https://convertkit.com), ou votre propre API
- **Analytics** : Google Analytics 4 ou [Plausible](https://plausible.io) (RGPD-friendly)
- **OG Images** : [Vercel OG](https://vercel.com/docs/functions/og-image-generation) pour les previews sociales

---

## 📧 Support

Pour toute question sur ce template, contactez votre développeur.

---

*Template conçu avec Next.js 14, Tailwind CSS 3, DM Sans & Cormorant Garamond*
