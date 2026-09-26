"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { productsData } from "@/data/products";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card } from "@/components/ui/card";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const CATEGORIES = [
  { id: "all", label: "All Formulations" },
  { id: "Pain & Musculoskeletal", label: "Pain & Musculoskeletal" },
  { id: "Neurological & Neuropathic", label: "Neurological & Neuropathic" },
  { id: "Gastroenterology & Anti-peptic", label: "Gastroenterology & Anti-peptic" },
  { id: "Nutraceuticals & Dietary Supplements", label: "Nutraceuticals & Supplements" },
  { id: "Parenteral Injections", label: "Parenteral Injections" },
];

export function FeaturedProducts() {
  const [selectedCat, setSelectedCat] = useState("all");
  const prefersReduced = usePrefersReducedMotion();

  // Spotlight flagship product
  const spotlightProduct = useMemo(() => {
    return productsData.find((p) => p.id === "maxycod") || productsData[0];
  }, []);

  // Filtered supporting products matching canonical category
  const supportingProducts = useMemo(() => {
    let list = productsData.filter((p) => p.id !== spotlightProduct.id);

    if (selectedCat !== "all") {
      return list.filter((p) => p.category === selectedCat);
    }

    // In 'all' view, showcase the initial selection plus the newly added GLUCOMYN
    const initialSelection = list.slice(0, 6);
    const glucomynProduct = list.find((p) => p.id === "glucomyn");
    if (glucomynProduct && !initialSelection.some((p) => p.id === "glucomyn")) {
      return [...initialSelection, glucomynProduct];
    }

    return initialSelection;
  }, [selectedCat, spotlightProduct.id]);

  return (
    <Section id="products" density="compact" tone="muted" className="overflow-hidden">
      <Container>

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 border-b border-slate-200 pb-8">
          <div>
            <FadeIn direction="up">
              <Eyebrow>Our Product Portfolio</Eyebrow>
              <Heading level="h2" className="mt-2">
                Verified Formulations Catalogue
              </Heading>
              <p className="mt-3 text-base text-slate-600 max-w-2xl leading-relaxed">
                A commercial portfolio of 20 formulations manufactured under GMP compliance for licensed retail pharmacies, hospital supply, and PCD franchise stockists.
              </p>
            </FadeIn>
          </div>

          <FadeIn direction="up" delay={0.1}>
            <div className="flex items-center gap-3 shrink-0">
              <Button
                href="/products"
                variant="outline"
                size="md"
                className="hover:bg-slate-100 hover:border-slate-400 font-semibold px-5 py-2.5 text-sm flex items-center gap-2"
              >
                <span>View All 20 Formulations</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </FadeIn>
        </div>

        {/* Editorial Layout: Featured Flagship Showcase (Asymmetric 12-col spread) */}
        <FadeIn direction="up" delay={0.15}>
          <div className="mb-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">

              {/* Left Showcase Photography (5 cols) */}
              <div className="lg:col-span-5 relative bg-gradient-to-br from-slate-100/80 via-white to-slate-50 p-8 sm:p-12 flex items-center justify-center min-h-[340px] lg:min-h-[440px] border-b lg:border-b-0 lg:border-r border-slate-200">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute h-56 w-56 rounded-full bg-brand-forest-200/40 blur-3xl"
                />
                <Image
                  src={spotlightProduct.product_image}
                  alt={`${spotlightProduct.brand_name} (${spotlightProduct.dosage_form}) packaging - ${spotlightProduct.generic_composition}`}
                  width={380}
                  height={380}
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="relative z-10 max-h-72 w-auto object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.14)] hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Right Technical Specification Dossier (7 cols) */}
              <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-brand-forest-800 font-bold bg-brand-forest-50 border border-brand-forest-200 px-3 py-1 rounded-full">
                    Featured Formulation
                  </span>
                  <span className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {spotlightProduct.pack_size}
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {spotlightProduct.brand_name}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base font-semibold text-slate-700">
                    {spotlightProduct.generic_composition}
                  </p>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-xl">
                    {spotlightProduct.description}
                  </p>
                </div>

                {/* Composition Specifications */}
                {spotlightProduct.composition_items && spotlightProduct.composition_items.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Active Ingredients</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {spotlightProduct.composition_items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="font-medium text-slate-800 truncate mr-2">{item.ingredient}</span>
                          <span className="font-mono text-slate-600 shrink-0">{item.strength || item.notes}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex items-center gap-4">
                  <Button
                    href={`/products/${spotlightProduct.slug}`}
                    variant="primary"
                    size="md"
                    className="font-bold px-6 py-2.5 text-xs sm:text-sm flex items-center gap-2"
                  >
                    <span>View Product Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <Button
                    href="/business-enquiry"
                    variant="outline"
                    size="md"
                    className="text-slate-700 hover:bg-slate-100 font-semibold px-5 py-2.5 text-xs sm:text-sm"
                  >
                    Enquire Stock
                  </Button>
                </div>

              </div>

            </div>
          </div>
        </FadeIn>

        {/* Portfolio Index Register — rules off the spotlight above from the filterable index below.
            The category tabs scope the gallery only, so they sit with it rather than above the spotlight. */}
        <div className="border-t border-slate-200 pt-8">
          <Eyebrow size="micro" tone="muted">
            Supporting Formulations
          </Eyebrow>
        </div>

        {/* Category Selector — filters the gallery below */}
        <FadeIn direction="up" delay={0.12}>
          <div
            role="tablist"
            aria-label="Filter formulations by therapeutic category"
            className="flex flex-wrap items-center gap-2 mt-5 mb-10 pb-2 overflow-x-auto"
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap border ${isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm font-semibold"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border-slate-200"
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Asymmetric Product Gallery (Visual rhythm: Editorial catalogue spread with varied scales) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {supportingProducts.map((prod, idx) => {
              // Create visual rhythm: the first item expands into a wide 2-column feature on large displays
              const isWideFeature = idx === 0;

              return (
                <motion.div
                  key={prod.id}
                  layout
                  // Cards mount and re-filter as one block, so under reduced
                  // motion the whole set resolves at once rather than cascading
                  // in. `initial` is untouched — it renders identically on the
                  // server and through hydration.
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: prefersReduced ? 0 : 0.35,
                    delay: prefersReduced ? 0 : idx * 0.05,
                  }}
                  className={`group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 p-7 sm:p-8 shadow-sm hover:border-slate-300 hover:shadow-lg transition-all duration-300 ${isWideFeature ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                    }`}
                >
                  <div className={isWideFeature ? "grid grid-cols-1 sm:grid-cols-12 gap-6 lg:gap-8 items-center md:h-full" : ""}>

                    {/* Unboxed Packaging Stage with Realistic Drop Shadows */}
                    <div
                      className={`relative flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-105 ${isWideFeature
                        ? "sm:col-span-5 h-56 sm:h-64 md:h-full md:min-h-[300px] md:-translate-y-6"
                        : "h-52 w-full mb-6"
                        }`}
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-2 h-8 w-3/4 rounded-[100%] bg-slate-900/10 blur-lg"
                      />
                      <Image
                        src={prod.product_image}
                        alt={`${prod.brand_name} (${prod.dosage_form}) packaging - ${prod.generic_composition}`}
                        width={280}
                        height={280}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                        className="relative z-10 max-h-48 sm:max-h-56 w-auto object-contain drop-shadow-[0_16px_22px_rgba(0,0,0,0.12)]"
                      />
                    </div>

                    {/* Metadata & Technical Information */}
                    <div className={isWideFeature ? "sm:col-span-7 flex flex-col justify-between md:h-full" : ""}>
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <Eyebrow size="micro" className="bg-brand-forest-50 px-2.5 py-1 rounded border border-brand-forest-200">
                            {prod.category}
                          </Eyebrow>
                          <span className="text-micro-lg font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/70">
                            {prod.pack_size}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-brand-forest-900 transition-colors tracking-tight">
                          {prod.brand_name}
                        </h3>

                        <p className="mt-2 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                          {prod.generic_composition}
                        </p>

                        <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {prod.description}
                        </p>

                        {/* Active Formulation Specifications — Verified Technical Ledger (Desktop/Tablet Only) */}
                        {isWideFeature && prod.composition_items && prod.composition_items.length > 0 && (
                          <div className="hidden md:block mt-4 pt-3 border-t border-slate-100">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                                Active Formulation Ingredients
                              </span>
                              <span className="text-[10px] font-mono text-brand-forest-700 font-medium">
                                GMP Verified
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {prod.composition_items.slice(0, 4).map((item, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/70"
                                >
                                  <span className="font-medium text-slate-800 truncate mr-2 text-[11px]">
                                    {item.ingredient}
                                  </span>
                                  <span className="font-mono text-slate-600 shrink-0 text-[10px] font-semibold">
                                    {item.strength || item.notes}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Dosage Form & Direct Dossier Navigation */}
                      <div className="mt-6 md:mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-mono text-slate-600 font-medium">{prod.dosage_form}</span>
                        <Link
                          href={`/products/${prod.slug}`}
                          className="inline-flex items-center gap-1.5 font-bold text-brand-forest-900 hover:text-brand-teal-700 transition-colors group-hover:translate-x-1 duration-200"
                        >
                          <span>Full Dossier</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Editorial Catalogue Access Bar */}
        <Card
          variant="dark"
          className="mt-14 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <Eyebrow size="micro" className="text-brand-teal-300">
              Complete Commercial Portfolio
            </Eyebrow>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-1">
              Looking for a specific active formulation or packaging size?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Our 20 commercial formulations encompass analgesics, GI therapies, neurotropic agents, and nutraceutical softgels for wholesale supply across Tamil Nadu.
            </p>
          </div>

          <Button
            href="/products"
            variant="primaryOnDark"
            size="md"
            className="font-bold px-6 py-3 text-xs tracking-wider uppercase shrink-0"
          >
            <span>Explore All 20 Formulations</span>
            <ArrowRight className="w-4 h-4 ml-2 inline" />
          </Button>
        </Card>

      </Container>
    </Section>
  );
}
