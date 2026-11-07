"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, type KeyboardEvent, type UIEvent } from "react";

type Step = {
  title: string;
  src: string;
  alt: string;
};

type StepShowcaseProps = {
  steps: Step[];
  withFrame?: boolean;
};

function PhoneFrame({
  steps,
  active,
  withFrame = true,
  className = "",
}: {
  steps: Step[];
  active: number;
  withFrame?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full ${
        withFrame
          ? "aspect-[1080/2340] overflow-hidden rounded-[2rem] border border-white/10 bg-dark-900 shadow-xl shadow-black/10"
          : "aspect-[1463/3031]"
      } ${className}`}
    >
      {steps.map((step, index) => (
        <Image
          key={step.src}
          src={step.src}
          alt={step.alt}
          fill
          sizes="(min-width: 768px) 280px, 240px"
          aria-hidden={index !== active}
          className={`transition-opacity duration-300 motion-reduce:transition-none ${
            withFrame ? "object-cover" : "object-contain"
          } ${index === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}

const navButton =
  "flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-[#00798f]/40 text-[#00798f] transition-colors duration-200 hover:bg-[#00798f]/10 disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00798f]";

export default function StepShowcase({
  steps,
  withFrame = true,
}: StepShowcaseProps) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  function goTo(index: number) {
    setActive(index);
    stepRefs.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      goTo((active + 1) % steps.length);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      goTo((active - 1 + steps.length) % steps.length);
    }
  }

  function getSlideWidth(scroller: HTMLDivElement | null) {
    const first = scroller?.firstElementChild as HTMLElement | null;
    return first?.offsetWidth ?? 0;
  }

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const el = event.currentTarget;
    const width = getSlideWidth(el);
    if (!width) return;
    const index = Math.round(el.scrollLeft / width);
    if (index !== active && index >= 0 && index < steps.length) {
      setActive(index);
    }
  }

  function scrollToSlide(index: number) {
    const el = scrollerRef.current;
    const width = getSlideWidth(el);
    if (!el || !width) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollTo({
      left: index * width,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActive(index);
  }

  return (
    <>
      {/* Desktop : liste d'étapes à gauche, un seul téléphone à droite */}
      <div className="mx-auto hidden max-w-4xl items-center gap-20 md:grid md:grid-cols-[1fr_280px]">
        <div
          role="group"
          aria-label="Étapes d’installation"
          onKeyDown={handleKeyDown}
          className="flex flex-col"
        >
          {steps.map((step, index) => {
            const isActive = index === active;
            return (
              <button
                key={step.title}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                type="button"
                onClick={() => setActive(index)}
                aria-current={isActive ? "step" : undefined}
                className={`group flex touch-manipulation items-start gap-5 border-l-2 py-6 pl-7 pr-2 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00798f] focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 ${
                  isActive
                    ? "border-[#00E5FF]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <span
                  className={`mt-0.5 font-mono text-xs tracking-widest transition-colors duration-200 ${
                    isActive ? "text-[#00E5FF]" : "text-dark-400"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-pretty text-lg font-light leading-snug transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-dark-400 group-hover:text-dark-300"
                  }`}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        <PhoneFrame steps={steps} active={active} withFrame={withFrame} />
      </div>

      {/* Mobile : carrousel avec aperçu de l'étape suivante, compteur, flèches et points */}
      <div className="md:hidden">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory overflow-x-auto px-[16%] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {steps.map((step, index) => (
            <div
              key={step.src}
              className={`w-[68%] shrink-0 snap-center px-1.5 transition-opacity duration-300 motion-reduce:transition-none ${
                index === active ? "opacity-100" : "opacity-50"
              }`}
            >
              <div
                className={`relative w-full ${
                  withFrame
                    ? "aspect-[1080/2340] overflow-hidden rounded-[1.75rem] border border-white/10 bg-dark-900 shadow-xl shadow-black/10"
                    : "aspect-[1463/3031]"
                }`}
              >
                <Image
                  src={step.src}
                  alt={step.alt}
                  fill
                  sizes="260px"
                  className={withFrame ? "object-cover" : "object-contain"}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 px-6 text-center">
          <p className="mb-2 text-xs font-semibold tracking-wide text-[#00798f]">
            Étape {active + 1} sur {steps.length}
          </p>
          <p
            aria-live="polite"
            className="mx-auto min-h-[4rem] max-w-xs text-pretty text-base font-light leading-snug text-white"
          >
            {steps[active].title}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSlide(active - 1)}
            disabled={active === 0}
            aria-label="Étape précédente"
            className={navButton}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          <div className="flex items-center">
            {steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                onClick={() => scrollToSlide(index)}
                aria-label={`Aller à l’étape ${index + 1}`}
                aria-current={index === active ? "step" : undefined}
                className="flex h-11 w-8 touch-manipulation items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00798f]"
              >
                <span
                  className={`h-2.5 rounded-full transition-all duration-200 motion-reduce:transition-none ${
                    index === active
                      ? "w-7 bg-[#00798f]"
                      : "w-2.5 bg-[#00798f]/30"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToSlide(active + 1)}
            disabled={active === steps.length - 1}
            aria-label="Étape suivante"
            className={navButton}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}
