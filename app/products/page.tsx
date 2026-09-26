import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ProductGrid } from "@/components/products/product-grid";
import { productsData } from "@/data/products";
import { companyData } from "@/data/company";
import { FadeIn } from "@/components/motion/fade-in";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Pharmaceutical Products Catalogue",
  description:
    "Explore our complete range of 20 verified pharmaceutical formulations across pain & musculoskeletal, neurology, gastroenterology, nutraceuticals, and parenteral injections.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Pharmaceutical Products Catalogue | Aaliis Pharmaceuticals",
    description:
      "Explore 20 verified pharmaceutical formulations across pain, neurology, gastroenterology, nutraceuticals, and injectables for wholesale & PCD distribution across Tamil Nadu.",
    url: "/products",
    siteName: companyData.tradeName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: companyData.logoPath,
        width: 612,
        height: 408,
        alt: `${companyData.tradeName} Catalogue`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pharmaceutical Products Catalogue | Aaliis Pharmaceuticals",
    description:
      "Explore 20 verified formulations for wholesale & PCD distribution across Tamil Nadu.",
    images: [companyData.logoPath],
  },
};

function ProductGridFallback() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-20 bg-slate-200/60 rounded-2xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-80 bg-slate-200/60 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Section as="div" density="compact" className="min-h-screen">
      <Container className="space-y-12">
        {/* Header */}
        <FadeIn direction="up">
          <div className="max-w-3xl">
            <Eyebrow>B2B Institutional &amp; Wholesale Catalogue</Eyebrow>
            <Heading level="h1" className="mt-3">
              Pharmaceutical Formulations
            </Heading>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Full product portfolio of 20 verified formulations marketed by Aaliis Pharmaceuticals. All products are supplied in standard commercial packaging for licensed pharmacies, hospitals, and PCD franchise partners.
            </p>

            <div className="mt-6 flex items-start gap-3 p-4 bg-brand-forest-50/70 border border-brand-forest-200 rounded-2xl text-xs text-slate-700 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-brand-forest-800 shrink-0 mt-0.5" />
              <span>
                Prescription medications (Schedule H / Rx) are supplied strictly against valid drug licence credentials (Form 20B/21B). Direct-to-patient retail sales are not conducted.
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Section Heading for Accessible Flow */}
        <div>
          <Eyebrow as="h2">Commercial Formulation Index</Eyebrow>
        </div>

        {/* Product Grid with Suspense */}
        <Suspense fallback={<ProductGridFallback />}>
          <ProductGrid products={productsData} showFilters={true} />
        </Suspense>
      </Container>
    </Section>
  );
}
