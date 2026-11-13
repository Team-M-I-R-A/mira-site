import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supportLinks } from "@/lib/navigation";
import { socialIcons } from "./SocialIcons";

const footerLinks: Record<string, { label: string; href?: string }[]> = {
  Produit: [
    { label: "Comment ça marche", href: "/#how-it-works" },
    { label: "Sécurité", href: "/#payment" },
    { label: "Mobile Money", href: "/#payment" },
  ],
  Entreprise: [
    { label: "À propos", href: "/a-propos" },
    {
      label: "Devenir partenaire",
      href: "mailto:ngassakialex20@gmail.com?subject=Demande%20de%20partenariat%20avec%20MIRA",
    },
  ],
  Support: supportLinks,
  Villes: [{ label: "Brazzaville" }, { label: "Pointe-Noire" }],
};

const reseaux = {
  TikTok: "https://www.tiktok.com/@mira.site.cg",
  Instagram: "https://www.instagram.com/mira.site.cg",
};

const footerLinkClass =
  "press inline-block text-dark-400 hover:text-dark-50 text-sm font-body transition-colors duration-200";

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#081420e3] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="" width={60} height={60} />
              <Link
                href="/"
                aria-label="MIRA, retour à l'accueil"
                className="press"
              >
                <Image
                  src="/name.png"
                  alt=""
                  width={86}
                  height={86}
                  className="theme-invert"
                />
              </Link>
            </div>
            <p className="text-dark-400 text-sm font-body leading-relaxed mb-6">
              La plateforme de location immobilière adaptée aux réalités
              congolaises.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-dark-400 text-xs">
                <MapPin size={12} />
                <span>Brazzaville, République du Congo</span>
              </div>
              <div className="flex items-center gap-2 text-dark-400 text-xs">
                <Mail size={12} />
                <a
                  href="mailto:ngassakialex20@gmail.com"
                  className="press inline-block hover:text-[#00E5FF] transition-colors"
                >
                  ngassakialex20@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-dark-400 text-xs">
                <Phone size={12} />
                <span>+242 06 767 66 43</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-sm font-medium mb-4 font-display">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    {href ? (
                      href.startsWith("/") ? (
                        <Link href={href} className={footerLinkClass}>
                          {label}
                        </Link>
                      ) : (
                        <a href={href} className={footerLinkClass}>
                          {label}
                        </a>
                      )
                    ) : (
                      <p className="text-dark-400 text-sm font-body">{label}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <div className="flex gap-2 justify-between">
            <p className="text-dark-400 text-xs font-body text-center md:text-left">
              © {new Date().getFullYear()} M I R A. Tous droits réservés
            </p>
            <p className="text-dark-400 text-xs font-body text-center md:text-left">
              |
            </p>
            <p className="text-dark-400 text-xs font-body text-center md:text-left">
              RCCM: CG-BZV-01-2026-A-10-02308
            </p>
          </div>

          <div className="flex items-center gap-10">
            {Object.entries(reseaux).map(([social, link]) => {
              const Icon = socialIcons[social as keyof typeof socialIcons];
              return (
                <a
                  key={social}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social}
                  title={social}
                  className="press text-dark-400 hover:text-[#00E5FF] transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
