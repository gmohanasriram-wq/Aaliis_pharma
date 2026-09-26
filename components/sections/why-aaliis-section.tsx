import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { companyData } from "@/data/company";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";

export function WhyAaliisSection() {
  const pillars = [
    {
      index: "01",
      title: "Exclusively Non-Retail B2B Wholesale",
      summary:
        "We never compete with our clients. No direct-to-patient dispensing and no consumer e-commerce storefronts. All supply is directed strictly to registered retail chemists, hospital pharmacies, and wholesale stockists to preserve trade margins.",
    },
    {
      index: "02",
      title: "Documented Manufacturing Governance",
      summary:
        "We source formulations from licensed pharmaceutical facilities with documented Schedule M and WHO-GMP compliance, backed by dedicated analytical quality control laboratories and regulatory inspections.",
    },
    {
      index: "03",
      title: "Centralized Supply Across Tamil Nadu",
      summary:
        `Authorized under Form 20B (${companyData.licences[0].number}) and Form 21B (${companyData.licences[1].number}), our Chennai administrative and logistics hub coordinates scheduled dispatches across Tamil Nadu with full GST compliance.`,
    },
  ];

  return (
    <Section tone="muted" className="overflow-hidden">
      <Container>

        {/* Section Header: Large Statement */}
        <div className="max-w-4xl mb-16">
          <FadeIn direction="up">
            <Eyebrow>Operational Transparency</Eyebrow>
            <Heading level="h2" className="mt-3">
              Documented Quality &amp; Zero Retail Conflicts.
            </Heading>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
              We base our business on verifiable statutory credentials, reliable formulation availability, and transparent channel policies—without unverified superlative claims.
            </p>
          </FadeIn>
        </div>

        {/* Editorial Storytelling Split: Real packaging visual asset + Typographic narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Visual Element: Real Physical Packaging Asset Unboxed (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <FadeIn direction="up" delay={0.1}>
              <div className="relative w-full max-w-sm flex flex-col items-center">

                <span className="text-micro-lg font-mono uppercase tracking-widest text-slate-500 font-bold mb-3 self-start">
                  AUTHENTIC PHYSICAL ASSET • BATCH PACKAGING
                </span>

                {/* Packaging image unboxed with realistic ground shadow */}
                <div className="relative h-72 sm:h-80 w-full flex items-center justify-center my-2">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-4 h-8 w-3/4 rounded-[100%] bg-slate-900/15 blur-lg"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute h-48 w-48 rounded-full bg-brand-forest-200/30 blur-2xl"
                  />
                  <Image
                    src="/images/products/nervlis-plus.webp"
                    alt="Nervlis Plus commercial packaging - Sterile parenteral injection"
                    width={340}
                    height={340}
                    sizes="(max-width: 1024px) 100vw, 360px"
                    className="relative z-10 max-h-64 sm:max-h-72 w-auto object-contain drop-shadow-[0_20px_26px_rgba(15,23,42,0.16)] hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Technical Formulation Metadata */}
                <div className="mt-4 pt-3 border-t border-slate-200 w-full text-left font-mono text-xs text-slate-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">NERVLIS PLUS</span>
                    <span className="text-slate-500">1 × 2 mL Ampoule</span>
                  </div>
                  <p className="text-micro-lg text-slate-500">
                    Methylcobalamin 1500 mcg + Pyridoxine 100 mg + Nicotinamide 100 mg
                  </p>
                  <p className="text-micro text-slate-600 font-medium">
                    Documented Mfg: A.V.T Formulations • Mkt: Aaliis Pharmaceuticals
                  </p>
                </div>

              </div>
            </FadeIn>
          </div>

          {/* Editorial Factual Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {pillars.map((item, idx) => (
              <FadeIn key={item.index} direction="up" delay={0.08 * (idx + 1)}>
                <div className="border-l-2 border-brand-forest-800/30 pl-6 hover:border-brand-forest-800 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-brand-forest-800">
                      {item.index}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
                    {item.summary}
                  </p>
                </div>
              </FadeIn>
            ))}

            <FadeIn direction="up" delay={0.35}>
              <div className="pt-4 flex items-center gap-4">
                <Button
                  href="/why-aaliis"
                  variant="outline"
                  size="md"
                  className="hover:bg-slate-100 font-semibold px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2"
                >
                  <span>Learn More About Our Governance</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </FadeIn>

          </div>

        </div>

      </Container>
    </Section>
  );
}
