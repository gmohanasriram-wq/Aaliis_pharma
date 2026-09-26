"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReduced = usePrefersReducedMotion();

  // Lenis takes over wheel and touch scrolling, which is precisely the class of
  // motion prefers-reduced-motion exists to suppress. When the visitor asks for
  // less motion we render the tree without it rather than smoothing anyway.
  //
  // This is a structural difference — the server always renders the Lenis
  // wrapper — so the swap has to happen after hydration, which is what the hook
  // guarantees by reporting "no preference" for the hydration pass. Lenis mounts
  // briefly and is torn down on the follow-up render.
  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
