"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export interface FadeInProps extends HTMLMotionProps<"div"> {
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  children?: React.ReactNode;
}

export function FadeIn({
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 20,
  className,
  children,
  ...props
}: FadeInProps) {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initialOffset = directions[direction];
  const prefersReduced = usePrefersReducedMotion();
  const revealed = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      // Reduced motion is handled at the TARGET, not the initial state, for two
      // independent reasons.
      //
      // `initial` cannot be switched on the client: the server always renders as
      // though motion is allowed, so changing the initial style after hydration
      // leaves the server's `opacity:0` inline style stranded and the section
      // never appears.
      //
      // And `whileInView` cannot be the only trigger: it never fires for content
      // the reader has not scrolled to, so a reduced-motion visitor would face a
      // page of invisible sections. Routing the reveal through `animate` with a
      // zero duration resolves it at mount instead.
      //
      // `prefersReduced` is false during hydration (see the hook), so both sides
      // render `animate={undefined}` and match; it flips to the real value in a
      // follow-up render.
      initial={{ opacity: 0, ...initialOffset }}
      animate={prefersReduced ? revealed : undefined}
      whileInView={prefersReduced ? undefined : revealed}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: prefersReduced ? 0 : duration,
        delay: prefersReduced ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
