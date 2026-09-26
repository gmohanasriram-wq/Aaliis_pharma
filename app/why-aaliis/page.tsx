import React from "react";
import type { Metadata } from "next";
import { companyData } from "@/data/company";
import { FadeIn } from "@/components/motion/fade-in";
import { StandardsOverview } from "@/components/sections/standards-overview";
import { ShieldCheck, FileCheck2, Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Why Aaliis | Quality & Regulatory Credibility",
  description:
    "Learn why pharmacies and hospital distributors in Tamil Nadu partner with Aaliis Pharmaceuticals for reliable formulations and documented GMP compliance.",
  alternates: {
    canonical: "/why-aaliis",
  },
  openGraph: {
    title: "Why Partner with Aaliis Pharmaceuticals | Quality & Standards",
    description:
      "Learn why pharmacies and hospital distributors partner with Aaliis Pharmaceuticals for verified formulations and documented GMP manufacturing compliance.",
    url: "/why-aaliis",
    siteName: companyData.tradeName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: companyData.logoPath,
        width: 612,
        height: 408,
        alt: `${companyData.tradeName} Quality Credibility`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Aaliis | Quality & Regulatory Credibility",
    description:
      "Transparent GMP compliance and institutional reliability for pharmaceutical distribution in Tamil Nadu.",
    images: [companyData.logoPath],
  },
};

export default function WhyAaliisPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Intro & Pillars Section */}
      <Section as="div" density="compact" tone="none">
        <Container width="narrow" className="space-y-16">
          {/* Header */}
          <FadeIn direction="up">
            <div className="max-w-3xl">
              <Eyebrow>Institutional Quality &amp; Governance</Eyebrow>
              <Heading level="h1" className="mt-3">
                Why Partner with {companyData.tradeName}
              </Heading>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                We provide healthcare distributors, institutional pharmacies, and hospital procurement teams across Tamil Nadu with verified, high-potency formulations backed by transparent regulatory compliance and dependable wholesale supply.
              </p>
            </div>
          </FadeIn>

          {/* 3 Advantage Pillars */}
          <FadeIn direction="up" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 shadow-xs hover:border-brand-forest-800 transition-colors space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs mb-4">
                    <ShieldCheck className="w-5 h-5 text-brand-forest-800" />
                  </div>
                  <h2 className="font-bold text-slate-900 text-base">
                    Verified Manufacturing Partners
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    All formulations are sourced from audited partner facilities with documented WHO-GMP compliance, active state drug licences, and rigorous analytical quality testing.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200/80 text-[11px] font-mono text-slate-500">
                  WHO-GMP • ISO 9001:2015 SOURCING
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 shadow-xs hover:border-brand-forest-800 transition-colors space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs mb-4">
                    <FileCheck2 className="w-5 h-5 text-brand-forest-800" />
                  </div>
                  <h2 className="font-bold text-slate-900 text-base">
                    Statutory Batch Integrity
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Every consignment is dispatched with authenticated GST invoicing, batch numbers, manufacturer disclosures, and compliance records under Form 20B and 21B wholesale licences.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200/80 text-[11px] font-mono text-slate-500">
                  FORM 20B/21B • GST COMPLIANT
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 shadow-xs hover:border-brand-forest-800 transition-colors space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs mb-4">
                    <Lock className="w-5 h-5 text-brand-forest-800" />
                  </div>
                  <h2 className="font-bold text-slate-900 text-base">
                    B2B Channel Protection
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    We strictly protect our stockist and franchisee partners. We never sell directly to retail consumers or patients, preserving territorial integrity and trade distributor equity.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200/80 text-[11px] font-mono text-slate-500">
                  MONOPOLY RIGHTS • ETHICAL TRADE
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Manufacturing & Standards Section — Renders directly at full width */}
      <StandardsOverview />
    </div>
  );
}
