import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'M I R A — Trouvez votre logement en quelques clics',
  description:
    'La première plateforme de location de logements premium adaptée aux réalités congolaises. Paiement sécurisé via Mobile Money, disponible bientôt.',
  keywords: ['logement Congo', 'location appartement Brazzaville', 'Mobile Money', 'immobilier Congo', 'Airbnb Congo'],
  authors: [{ name: 'M I R A' }],
  openGraph: {
    title: 'M I R A — Trouvez votre logement en quelques clics',
    description: 'La première plateforme de location de logements premium adaptée aux réalités congolaises.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M I R A — Bientôt disponible',
    description: 'La première plateforme de location de logements premium au Congo.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-overlay antialiased">
        {children}
      </body>
    </html>
  )
}
