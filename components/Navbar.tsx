"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_URL } from "@/lib/config";
import { supportLinks } from "@/lib/navigation";

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
  const [supportOpen, setSupportOpen] = useState(false);
  const [mobileSupportOpen, setMobileSupportOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const supportActive = pathname.startsWith("/policies");

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // Petit délai avant fermeture : laisse le temps à la souris de rejoindre le panneau
  const scheduleSupportClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setSupportOpen(false), 140);
  };

  const openSupport = () => {
    clearCloseTimer();
    setSupportOpen(true);
  };

  useEffect(() => clearCloseTimer, []);

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

  // Ferme le menu Support au clic extérieur ou avec Échap
  useEffect(() => {
    if (!supportOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        supportRef.current &&
        !supportRef.current.contains(e.target as Node)
      ) {
        setSupportOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSupportOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, {
      passive: true,
    });
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [supportOpen]);

  // Referme le menu Support quand on change de page
  useEffect(() => {
    setSupportOpen(false);
    setMobileSupportOpen(false);
  }, [pathname]);

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
        <div className="hidden lg:flex items-center gap-8">
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

          {/* Support dropdown */}
          <div
            ref={supportRef}
            className="relative"
            onMouseEnter={openSupport}
            onMouseLeave={scheduleSupportClose}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setSupportOpen(false);
              }
            }}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={supportOpen}
              aria-controls="support-menu"
              onClick={() => {
                clearCloseTimer();
                setSupportOpen((prev) => !prev);
              }}
              className={`press relative group flex items-center gap-1.5 text-sm font-body font-medium transition-colors duration-200 hover:text-dark-50 ${
                supportActive || supportOpen ? "text-dark-50" : "text-dark-300"
              }`}
            >
              Support
              <ChevronDown
                size={14}
                strokeWidth={2}
                aria-hidden="true"
                className={`transition-transform duration-300 motion-reduce:transition-none ${
                  supportOpen ? "rotate-180" : "rotate-0"
                }`}
              />
              <span
                className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[#00798f] transition-transform duration-300 group-hover:scale-x-100 ${
                  supportActive || supportOpen ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>

            <div
              id="support-menu"
              role="menu"
              aria-label="Support"
              data-open={supportOpen}
              className="nav-dropdown"
            >
              <ul>
                {supportLinks.map(({ label, href }, index) => {
                  const isInternal = href.startsWith("/");
                  const className =
                    "nav-dropdown-item flex items-center rounded-xl px-3 py-2.5 text-sm font-body text-dark-300 hover:bg-black/[0.04] hover:text-dark-50 focus-visible:bg-black/[0.04] focus-visible:text-dark-50 focus-visible:outline-none";
                  const style = { "--i": index } as CSSProperties;

                  return (
                    <li key={label}>
                      {isInternal ? (
                        <Link
                          href={href}
                          role="menuitem"
                          className={className}
                          style={style}
                          onClick={() => setSupportOpen(false)}
                        >
                          {label}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          role="menuitem"
                          className={className}
                          style={style}
                          onClick={() => setSupportOpen(false)}
                        >
                          {label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* CTA desktop */}
          <div className="hidden lg:flex items-center gap-4">
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
            className="lg:hidden flex items-center justify-center text-dark-200"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden overflow-hidden"
        style={{
          maxHeight: open ? "900px" : "0px",
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

          {/* Support (accordéon mobile) */}
          <div className="border-t border-white/5 pt-2">
            <button
              type="button"
              aria-expanded={mobileSupportOpen}
              aria-controls="mobile-support-menu"
              onClick={() => setMobileSupportOpen((prev) => !prev)}
              className={`press flex w-full items-center justify-between text-sm font-medium py-2 transition-colors ${
                supportActive ? "text-dark-50" : "text-dark-200"
              }`}
            >
              Support
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={`transition-transform duration-300 motion-reduce:transition-none ${
                  mobileSupportOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <div
              id="mobile-support-menu"
              data-open={mobileSupportOpen}
              className="mobile-support-panel"
            >
              <div>
                <div className="space-y-1 pt-1 pb-1">
                  {supportLinks.map(({ label, href }) => {
                    const linkClass =
                      "press block rounded-lg px-3 py-2 text-sm text-dark-300 hover:bg-black/[0.04] hover:text-dark-50 transition-colors";
                    const handleClick = () => {
                      setOpen(false);
                      setMobileSupportOpen(false);
                    };

                    return href.startsWith("/") ? (
                      <Link
                        key={label}
                        href={href}
                        className={linkClass}
                        onClick={handleClick}
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        key={label}
                        href={href}
                        className={linkClass}
                        onClick={handleClick}
                      >
                        {label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

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
