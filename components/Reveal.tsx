"use client";

import { useReveal } from "@/hooks/useReveal";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Client wrapper for server-rendered sections that need the shared
 * `.reveal` / `useReveal` entrance animation.
 */
export default function Reveal({ children, className }: RevealProps) {
  const ref = useReveal();

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
}
