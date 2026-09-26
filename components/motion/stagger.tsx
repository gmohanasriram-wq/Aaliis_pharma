"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
  children?: React.ReactNode;
}

export function StaggerContainer({
  staggerChildren = 0.1,
  delayChildren = 0,
  className,
  children,
  ...props
}: StaggerContainerProps) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReduced ? 0 : staggerChildren,
            delayChildren: prefersReduced ? 0 : delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps extends HTMLMotionProps<"div"> {
  className?: string;
  children?: React.ReactNode;
}

export function StaggerItem({ className, children, ...props }: StaggerItemProps) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: prefersReduced ? 0 : 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
