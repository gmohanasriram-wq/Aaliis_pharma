"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NavLinks } from "@/components/navigation/nav-links";
import { Button } from "@/components/ui/button";
import { companyData } from "@/data/company";
import { Menu, X, PhoneCall, ShieldCheck, ArrowRight } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? "border-b border-slate-200/90 bg-white/90 backdrop-blur-md shadow-sm"
        : "border-b border-slate-100 bg-white/95 backdrop-blur-sm"
        }`}
    >
      {/* Top utility bar */}
      <div className="bg-brand-navy-950 text-white text-[11px] font-medium py-1.5 px-4 hidden md:block border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4 text-slate-300">
            <span className="inline-flex items-center gap-1.5 text-brand-teal-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>B2B PCD Pharma Partner — Tamil Nadu</span>
            </span>
            <span className="text-slate-600">•</span>
            <span>Licence: {companyData.licences[0].number}</span>
            <span className="text-slate-600">•</span>
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
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-16" : "h-18 sm:h-20"
            }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-brand-teal-500 rounded-md p-1">
            <Image
              src={companyData.logoPath}
              alt="Aaliis Pharmaceuticals - B2B PCD Pharma Partner"
              width={150}
              height={100}
              priority
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavLinks />
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

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-teal-500"
              aria-expanded={mobileMenuOpen}
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
      </div>

      {/* Mobile menu dropdown with smooth animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-b border-slate-200 bg-white shadow-lg"
          >
            <div className="px-5 pt-3 pb-6 space-y-4">
              <NavLinks
                className="flex flex-col items-start gap-1 w-full"
                itemClassName="w-full text-left py-2.5 px-3 text-sm rounded-lg hover:bg-slate-50"
                onItemClick={() => setMobileMenuOpen(false)}
              />
              <div className="pt-3 border-t border-slate-100">
                <Button
                  href="/business-enquiry"
                  variant="primary"
                  size="md"
                  className="w-full justify-center bg-brand-forest-900 hover:bg-brand-forest-800 text-white"
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
