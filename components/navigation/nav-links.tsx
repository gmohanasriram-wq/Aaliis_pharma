"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

interface NavLinksProps {
  className?: string;
  itemClassName?: string;
  onItemClick?: () => void;
  /**
   * Namespaces the two shared-layout ids below.
   *
   * The header renders NavLinks twice — once in the desktop bar, once inside the
   * mobile panel — and while the panel is open both are mounted at the same time.
   * Framer Motion resolves a `layoutId` across the whole tree, so two elements
   * sharing one id animate against each other and the pill lands in the wrong
   * nav. Each instance must therefore pass its own prefix.
   */
  idPrefix: string;
}

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "PCD Pharma", href: "/pcd-pharma" },
  { label: "Why Aaliis", href: "/why-aaliis" },
  { label: "Contact", href: "/contact" },
];

export function NavLinks({
  className,
  itemClassName,
  onItemClick,
  idPrefix,
}: NavLinksProps) {
  const pathname = usePathname();
  const prefersReduced = usePrefersReducedMotion();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <nav className={cn("flex items-center gap-1.5 sm:gap-2", className)}>
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            onClick={onItemClick}
            onMouseEnter={() => setHoveredHref(item.href)}
            onMouseLeave={() => setHoveredHref(null)}
            className={cn(
              "relative px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest-800",
              isActive
                ? "text-brand-forest-900 font-bold"
                : "text-slate-600 hover:text-slate-900",
              itemClassName
            )}
          >
            <span className="relative z-10">{item.label}</span>

            {/* Subtle hover backdrop */}
            {hoveredHref === item.href && !isActive && (
              <motion.div
                layoutId={`${idPrefix}-nav-hover-pill`}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 400, damping: 30 }
                }
                className="absolute inset-0 rounded-md bg-slate-100/80 -z-0"
              />
            )}

            {/* Active indicator underline */}
            {isActive && (
              <motion.div
                layoutId={`${idPrefix}-nav-active-indicator`}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 30 }
                }
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-brand-forest-600 to-brand-teal-500 rounded-full"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
