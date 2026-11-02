"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type UIEvent } from "react";

type Step = {
  title: string;
  src: string;
  alt: string;
};

type StepShowcaseProps = {
  steps: Step[];
};

function PhoneFrame({
  steps,
  active,
  className = "",
}: {
  steps: Step[];
  active: number;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[1080/2340] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-dark-900 shadow-xl shadow-black/10 ${className}`}
    >
      {steps.map((step, index) => (
        <Image
          key={step.src}
          src={step.src}
          alt={step.alt}
          fill
          sizes="(min-width: 768px) 280px, 240px"
          aria-hidden={index !== active}
          className={`object-cover transition-opacity duration-300 motion-reduce:transition-none ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

export default function StepShowcase({ steps }: StepShowcaseProps) {
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

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const el = event.currentTarget;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== active && index >= 0 && index < steps.length) {
      setActive(index);
    }
  }

  function scrollToSlide(index: number) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
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

        <PhoneFrame steps={steps} active={active} />
      </div>

      {/* Mobile : carrousel à défilement horizontal + points */}
      <div className="md:hidden">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {steps.map((step) => (
            <div
              key={step.src}
              className="flex w-full shrink-0 snap-center justify-center"
            >
              <div className="w-[240px]">
                <div className="relative aspect-[1080/2340] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-dark-900 shadow-2xl shadow-black/40">
                  <Image
                    src={step.src}
                    alt={step.alt}
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex min-h-[4.5rem] items-start justify-center gap-3 px-6 text-center">
          <span className="mt-0.5 font-mono text-xs tracking-widest text-[#00E5FF]">
            {String(active + 1).padStart(2, "0")}
          </span>
          <p
            aria-live="polite"
            className="max-w-xs text-pretty text-base font-light leading-snug text-white"
          >
            {steps[active].title}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-center">
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Étape ${index + 1}`}
              aria-current={index === active ? "step" : undefined}
              className="flex h-11 w-8 touch-manipulation items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00798f]"
            >
              <span
                className={`h-2 rounded-full transition-all duration-200 motion-reduce:transition-none ${
                  index === active ? "w-6 bg-[#00E5FF]" : "w-2 bg-white/20"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
