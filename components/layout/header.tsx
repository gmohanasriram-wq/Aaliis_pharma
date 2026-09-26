"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NavLinks } from "@/components/navigation/nav-links";
import { Button } from "@/components/ui/button";
import { companyData } from "@/data/company";
import { Menu, X, PhoneCall, ShieldCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu: move focus in, trap Tab, close on Escape, lock body scroll.
  // Previously the menu opened with focus left on the toggle and no way to
  // dismiss it from the keyboard.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const panel = menuRef.current;
    const focusables = panel
      ? Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      )
      : [];

    focusables[0]?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  // Return focus to the toggle when the menu closes (but not on first mount).
  const wasMenuOpen = useRef(false);
  useEffect(() => {
    if (wasMenuOpen.current && !mobileMenuOpen) {
      toggleRef.current?.focus();
    }
    wasMenuOpen.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? "border-b border-slate-200/90 bg-white/90 backdrop-blur-md shadow-sm"
        : "border-b border-slate-100 bg-white/95 backdrop-blur-sm"
        }`}
    >
      {/* Top utility bar */}
      <div className="bg-brand-navy-950 text-white text-micro-lg font-medium py-1.5 hidden md:block border-b border-slate-800/60">
        <Container className="flex justify-between items-center">
          <div className="flex items-center space-x-4 text-slate-300">
            <span className="inline-flex items-center gap-1.5 text-brand-teal-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>B2B PCD Pharma Partner — Tamil Nadu</span>
            </span>
            <span className="text-slate-400">•</span>
            <span>Licence: {companyData.licences[0].number}</span>
            <span className="text-slate-400">•</span>
            <span>GSTIN: {companyData.gstin}</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${companyData.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-brand-teal-400" />
              <span>{companyData.phone}</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main navigation bar */}
      <Container>
        <div
          className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-16 lg:h-18" : "h-18 sm:h-20 lg:h-24"
            }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-brand-teal-500 rounded-md p-1">
            <Image
              src={companyData.logoPath}
              alt="Aaliis Pharmaceutical"
              width={1536}
              height={1024}
              priority
              className={`h-auto object-contain transition-all duration-200 ${isScrolled
                ? "w-[70px] sm:w-[82px] lg:w-[96px]"
                : "w-[80px] sm:w-[96px] lg:w-[116px]"
                }`}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavLinks idPrefix="desktop" />
            <Button
              href="/business-enquiry"
              variant="primary"
              size="sm"
              className="font-medium bg-brand-forest-900 hover:bg-brand-forest-800 text-white shadow-sm hover:shadow transition-all px-4 py-2"
            >
              <span>Business Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline" />
            </Button>
          </div>

          {/* Mobile: CTA + menu button. The only header link visible below lg
              used to be the logo, so the enquiry route was reachable only after
              opening the hamburger. */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              href="/business-enquiry"
              variant="primary"
              size="sm"
              className="bg-brand-forest-900 hover:bg-brand-forest-800 text-white font-semibold px-3"
            >
              <span>Enquiry</span>
            </Button>
            <button
              ref={toggleRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-teal-500"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu dropdown with smooth animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: prefersReduced ? 0 : 0.25,
              ease: "easeInOut",
            }}
            className="lg:hidden overflow-hidden border-b border-slate-200 bg-white shadow-lg"
          >
            <div className="px-5 pt-3 pb-6 space-y-4">
              <NavLinks
                idPrefix="mobile"
                className="flex flex-col items-start gap-1 w-full"
                itemClassName="w-full text-left py-2.5 px-3 text-sm rounded-lg hover:bg-slate-50"
                onItemClick={() => setMobileMenuOpen(false)}
              />
              <div className="pt-3 border-t border-slate-100">
                <Button
                  href="/business-enquiry"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Business Enquiry</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
