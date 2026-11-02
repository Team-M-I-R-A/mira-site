"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Star } from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import { APP_URL } from "@/lib/config";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const [particles, setParticles] = useState<
    { left: string; duration: string; delay: string }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 12 }, () => ({
        left: `${Math.random() * 100}%`,
        duration: `${8 + Math.random() * 12}s`,
        delay: `${Math.random() * 8}s`,
      })),
    );

    // Parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const el = heroRef.current;
      if (!el) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 30;
      const blobs = el.querySelectorAll<HTMLElement>(".parallax-blob");
      blobs.forEach((blob, i) => {
        const factor = (i + 1) * 0.4;
        blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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

        {/* Floating particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 rounded-full bg-[#00E5FF]"
            style={{
              left: p.left,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-5">
        {/* Left content */}
        <div className="space-y-8">
          {/* Heading */}
          <div
            className="animate-fade-up opacity-0 stagger-2"
            style={{ animationFillMode: "forwards" }}
          >
            <h1 className="font-display text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] tracking-tight">
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
            La première plateforme de location de logements adaptée aux réalités
            congolaises. Payez en toute sécurité via{" "}
            <span className="text-[#00E5FF] font-medium">Mobile Money</span> —
            simple, rapide et sans tracas.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap gap-4 animate-fade-up opacity-0 stagger-5"
            style={{ animationFillMode: "forwards" }}
          >
            <a
              href={APP_URL}
              className="group relative overflow-hidden flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#2233DD] via-[#1A6BFF] to-[#00E5FF] text-white font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <span className="relative z-10">Ouvrir l&apos;application</span>
              <ArrowUpRight
                size={16}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
              <div className="absolute inset-0 shimmer-btn" />
            </a>
            <a
              href="#features"
              className="flex items-center gap-2 px-7 py-4 rounded-2xl glass border border-white/10 text-white/80 hover:text-white font-medium transition-all duration-300 hover:-translate-y-1 hover:border-[#00E5FF]"
            >
              Voir les fonctionnalités
            </a>
          </div>
        </div>

        {/* Right — Phone mockups */}
        <div
          className="relative flex justify-center items-center h-[600px] animate-fade-in opacity-0 stagger-3"
          style={{ animationFillMode: "forwards" }}
        >
          {/* Main phone */}
          <div className="relative z-10 animate-float">
            <PhoneMockup screen="home" />
          </div>

          {/* Secondary phone */}
          <div className="absolute -right-4 lg:-right-8 top-16 z-0 scale-[0.78] animate-float-delay opacity-90">
            <PhoneMockup screen="detail" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle opacity-60">
        <span className="text-xs text-dark-400 font-mono tracking-widest uppercase">
          Scroll
        </span>
        <ArrowDown size={14} className="text-dark-400" />
      </div>
    </section>
  );
}
