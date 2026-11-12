"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_URL } from "@/lib/config";

const navLinks = [
  { label: "Comment ça marche", hash: "#how-it-works" },
  { label: "Mobile Money", hash: "#payment" },
  { label: "Propriétaires", hash: "#publier" },
  { label: "Installer", hash: "#installer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Indique la section en cours de lecture
  useEffect(() => {
    if (!isHome) {
      setActiveHref(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          const href = `#${target.id}`;
          setActiveHref((current) =>
            isIntersecting ? href : current === href ? null : current,
          );
        });
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    navLinks.forEach(({ hash }) => {
      const section = document.querySelector(hash);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [isHome]);

  // Ferme le menu si on clique en dehors de la nav
  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [open]);

  return (
    <nav
      ref={navRef}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
      className={[
        "transition-[background-color] duration-300",
        scrolled || open ? "glass py-3" : "bg-transparent py-3",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="MIRA, retour à l'accueil"
          className="press flex items-center gap-3"
        >
          <Image src="/logo.png" alt="" width={48} height={48} />
          <Image
            src="/name.png"
            alt=""
            width={86}
            height={86}
            className="theme-invert"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const href = isHome ? link.hash : `/${link.hash}`;
            const active = activeHref === link.hash;

            return (
              <Link
                key={link.hash}
                href={href}
                aria-current={active ? "location" : undefined}
                className={`press relative group text-sm font-body font-medium transition-colors duration-200 hover:text-dark-50 ${
                  active ? "text-dark-50" : "text-dark-300"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[#00798f] transition-transform duration-300 group-hover:scale-x-100 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {/* CTA desktop */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={APP_URL}
              className="press px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2233DD] to-[#1A6BFF] text-white text-sm font-medium shadow-glow hover:shadow-glow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5"
            >
              Ouvrir MIRA
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            style={{
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
              cursor: "pointer",
              minWidth: 44,
              minHeight: 44,
              background: "none",
              border: "none",
              padding: 0,
            }}
            className="md:hidden flex items-center justify-center text-dark-200"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: open ? "400px" : "0px",
          opacity: open ? 1 : 0,
          // Retire aussi les liens du parcours clavier quand le menu est fermé
          visibility: open ? "visible" : "hidden",
          transition: "max-height 0.3s ease, opacity 0.25s ease, visibility 0.3s",
          WebkitTransition:
            "max-height 0.3s ease, opacity 0.25s ease, visibility 0.3s",
        }}
      >
        <div className="px-6 pb-6 pt-2 space-y-4 border-t border-white/5 mt-3">
          {navLinks.map((link) => {
            const href = isHome ? link.hash : `/${link.hash}`;
            const active = activeHref === link.hash;

            return (
              <Link
                key={link.hash}
                href={href}
                aria-current={active ? "location" : undefined}
                className="press block text-dark-200 text-sm font-medium py-2 transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={APP_URL}
            className="press block w-full text-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#2233DD] to-[#1A6BFF] text-white text-sm font-medium mt-2"
            onClick={() => setOpen(false)}
          >
            Ouvrir MIRA
          </a>
        </div>
      </div>
    </nav>
  );
}
