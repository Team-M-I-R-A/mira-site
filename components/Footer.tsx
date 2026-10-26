import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  Produit: ["Fonctionnalités", "Comment ça marche", "Sécurité", "Mobile Money"],
  Entreprise: ["À propos", "Partenaires"],
  Support: [
    "Centre d'aide",
    "Nous contacter",
    "Signaler un problème",
    "Politique de confidentialité",
    "CGU",
  ],
  Villes: ["Brazzaville", "Pointe-Noire"],
};

const reseaux = {
  TikTok: "https://www.tiktok.com/@mira.site.cg",
  Instagram: "https://www.instagram.com/mira.site.cg",
  Linkedin: "https://linkedin",
  WhatsApp: "https://whatsApp.com",
};

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
              <a href="#hero" className="">
                <Image
                  src="/name.png"
                  alt=""
                  width={86}
                  height={86}
                  className="theme-invert"
                />
              </a>
            </div>
            <p className="text-dark-400 text-sm font-body leading-relaxed mb-6">
              La plateforme de location immobilière adaptée aux réalités
              congolaises.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-dark-500 text-xs">
                <MapPin size={12} />
                <span>Brazzaville, République du Congo</span>
              </div>
              <div className="flex items-center gap-2 text-dark-500 text-xs">
                <Mail size={12} />
                <a
                  href="mailto:ngassakialex20@gmail.com"
                  className="hover:text-[#00E5FF] transition-colors"
                >
                  ngassakialex20@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-dark-500 text-xs">
                <Phone size={12} />
                <span>+242 04 017 76 47</span>
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
                {links.map((link) => (
                  <li key={link}>
                    <p className="text-dark-500 hover:text-dark-200 text-sm font-body transition-colors duration-200">
                      {link}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-dark-600 text-xs font-body text-center md:text-left">
            © {new Date().getFullYear()} M I R A. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            {Object.entries(reseaux).map(([social, link]) => (
              <a
                key={social}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-600 hover:text-[#00E5FF] text-xs font-body transition-colors duration-200"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
