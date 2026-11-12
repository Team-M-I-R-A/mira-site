"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { APP_URL } from "@/lib/config";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallaxe réservée à la souris et coupée si le mouvement réduit est demandé
    const canAnimate = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    const blobs =
      heroRef.current?.querySelectorAll<HTMLElement>(".parallax-blob");
    if (!canAnimate || !blobs) return;

    let frame = 0;
    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (clientX / window.innerWidth - 0.5) * 30;
        const y = (clientY / window.innerHeight - 0.5) * 30;
        blobs.forEach((blob, i) => {
          const factor = (i + 1) * 0.4;
          blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="parallax-blob absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#080616] blur-[120px] transition-transform duration-700 ease-out" />
        <div className="parallax-blob absolute top-1/3 -right-60 w-[500px] h-[500px] rounded-full bg-[#021A54] blur-[100px] transition-transform duration-700 ease-out" />
        <div className="parallax-blob absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#021A54] blur-[80px] transition-transform duration-700 ease-out" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-5">
        {/* Left content */}
        <div className="space-y-8">
          {/* Heading */}
          <div
            className="animate-fade-up opacity-0 stagger-2"
            style={{ animationFillMode: "forwards" }}
          >
            <h1 className="font-display text-[clamp(3.75rem,2.82rem+3.98vw,6rem)] font-light leading-[0.95] tracking-tight">
              <span className="gradient-text-white">Trouvez votre</span>
              <br />
              <em className="not-italic gradient-text">chez-vous</em>
              <br />
              <span className="gradient-text-white">au Congo</span>
            </h1>
          </div>

          {/* Description */}
          <p
            className="text-dark-300 text-lg font-body font-light leading-relaxed max-w-lg animate-fade-up opacity-0 stagger-3"
            style={{ animationFillMode: "forwards" }}
          >
            Réservez votre logement à Brazzaville et Pointe-Noire en toute
            tranquillité. Votre argent reste protégé jusqu’à la confirmation de
            votre séjour, et vous payez par{" "}
            <span className="text-[#00E5FF] font-medium">Mobile Money</span>.
          </p>

          {/* CTA */}
          <div
            className="animate-fade-up opacity-0 stagger-5"
            style={{ animationFillMode: "forwards" }}
          >
            <a
              href={APP_URL}
              className="group press relative inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#2233DD] to-[#1A6BFF] text-white font-medium shadow-glow hover:shadow-glow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1"
            >
              <span>Ouvrir MIRA</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>

        {/* Right — Mockups iOS + Android */}
        <div
          className="flex justify-center animate-fade-in opacity-0 stagger-3 lg:justify-end"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="relative mx-auto aspect-[11/14] w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[420px]">
            {/* Halo lumineux derrière les téléphones */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[8%] bottom-[6%] top-[18%] rounded-[50%] bg-[#1A6BFF]/20 blur-[2px]"
            />

            {/* Android — derrière */}
            <div className="absolute left-0 top-[6%] z-0 w-[55%] -rotate-6 shadow-xs">
              <Image
                src="/screenshots/mockups_home_android.png"
                alt="Écran d’accueil de l’application MIRA sur Android : appartements meublés à Brazzaville et Pointe-Noire, avec leur prix en FCFA"
                width={1392}
                height={3025}
                sizes="(min-width: 1024px) 235px, 55vw"
                loading="eager"
                className="block h-auto w-full"
              />
            </div>

            {/* iOS — devant */}
            <div className="absolute right-0 top-[2%] z-10 w-[59%] rotate-3 shadow-xs">
              <Image
                src="/screenshots/mockups_home.png"
                alt="Écran d’accueil de l’application MIRA sur iPhone : appartements meublés à Brazzaville et Pointe-Noire, avec leur prix en FCFA"
                width={861}
                height={1784}
                sizes="(min-width: 1024px) 250px, 59vw"
                preload
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
