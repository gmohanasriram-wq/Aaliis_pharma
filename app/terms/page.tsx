import React from "react";
import type { Metadata } from "next";
import { companyData } from "@/data/company";
import { FadeIn } from "@/components/motion/fade-in";
import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Terms & Legal Conditions | B2B Operations",
  description:
    "Statutory terms, prescription drug conditions, and wholesale commercial policies of Aaliis Pharmaceuticals.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Aaliis Pharmaceuticals",
    description:
      "Statutory terms, prescription drug compliance policies, and B2B wholesale conditions.",
    url: "/terms",
    siteName: companyData.tradeName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: companyData.logoPath,
        width: 612,
        height: 408,
        alt: `${companyData.tradeName} Terms`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Aaliis Pharmaceuticals",
    description: "Statutory governance and wholesale commercial terms.",
    images: [companyData.logoPath],
  },
};

export default function TermsPage() {
  return (
    <Section as="div" density="compact" className="min-h-screen">
      <Container width="prose" className="space-y-12">
        {/* Header */}
        <FadeIn direction="up">
          <div className="max-w-2xl">
            <Eyebrow>Statutory Governance &amp; Regulatory Mandate</Eyebrow>
            <Heading level="h1" className="mt-3">
              Terms &amp; Conditions
            </Heading>
            <p className="mt-3 text-xs sm:text-sm font-mono text-slate-500 uppercase tracking-wider">
              Last updated: 17 February 2025 • {companyData.legalName}
            </p>
          </div>
        </FadeIn>

        {/* Disclaimer Notice */}
        <FadeIn direction="up" delay={0.1}>
          <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-300 text-xs sm:text-sm text-amber-950 flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="block font-bold mb-1">Non-Retail Commercial Disclaimer</strong>
              <span>
                This website is intended exclusively for registered medical practitioners, licensed wholesale distributors, and retail pharmacies. We do not sell prescription or over-the-counter formulations directly to individual patients or consumers.
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Legal Sections */}
        <FadeIn direction="up" delay={0.15}>
          <div className="space-y-10 text-slate-700 text-sm leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">1. Regulatory Compliance</h2>
              <p>
                All pharmaceutical products marketed by {companyData.legalName} are manufactured in compliance with the Drugs and Cosmetics Act, 1940, and the Drugs and Cosmetics Rules, 1945. Sale and distribution of Schedule H medicines require submission and verification of a valid Form 20B / 21B drug licence prior to dispatch.
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">2. Formulation &amp; Packaging Information</h2>
              <p>
                While every effort is made to maintain accurate product descriptions, packaging representations, and active compositions, information on this website does not supersede official label information, packaging inserts, or statutory regulatory mandates.
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">3. Territorial Jurisdiction</h2>
              <p>
                All commercial agreements, PCD franchise appointments, and wholesale supplies are governed by the laws of India, subject to the exclusive jurisdiction of the competent courts in Chennai, Tamil Nadu.
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">4. Licences Reference</h2>
              <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 font-mono text-xs text-slate-700 space-y-2">
                <p>Drug Licences: Form 20B ({companyData.licences[0].number}) &amp; Form 21B ({companyData.licences[1].number})</p>
                <p>GSTIN: {companyData.gstin}</p>
                <p>Principal Place of Business: {companyData.principalAddress}</p>
              </div>
            </section>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
