import React from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { companyData } from "@/data/company";
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card, CardTitle } from "@/components/ui/card";

export function QualitySection() {
  const protocols = [
    {
      code: "PROTOCOL 01",
      title: "Schedule M & WHO-GMP Sourcing",
      focus: "Manufacturing Compliance",
      details:
        "We source formulations from licensed pharmaceutical facilities with documented Schedule M / WHO-GMP compliance, equipped with internal analytical laboratories.",
    },
    {
      code: "PROTOCOL 02",
      title: "Form 20B & 21B Wholesale Licences",
      focus: "Statutory Approval",
      details:
        `Wholesale operations are formally authorized by the Tamil Nadu Drugs Control Department under Form 20B (${companyData.licences[0].number}) and Form 21B (${companyData.licences[1].number}).`,
    },
    {
      code: "PROTOCOL 03",
      title: "Manufacturer Batch Documentation",
      focus: "Release Specifications",
      details:
        "Consignments are accompanied by authentic manufacturer Certificates of Analysis (COA) confirming release specifications, active ingredient potency, and stability compliance.",
    },
    {
      code: "PROTOCOL 04",
      title: "Closed B2B Distribution Chain",
      focus: "Channel Protection",
      details:
        "Products move exclusively through verified B2B wholesale channels. We never engage in open retail or direct-to-patient dispensing, ensuring responsible handling.",
    },
  ];

  return (
    <Section>
      <Container>

        {/* Section Header — Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 pb-8 border-b border-slate-200/80">
          <div className="lg:col-span-7">
            <FadeIn direction="up">
              <Eyebrow>Regulatory Transparency</Eyebrow>
              <Heading level="h2" className="mt-3">
                Evidence-Based Quality Assurance &amp; Governance
              </Heading>
            </FadeIn>
          </div>
          <div className="lg:col-span-5 space-y-3">
            <FadeIn direction="up" delay={0.1}>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We present verifiable manufacturing records and statutory documentation rather than generic marketing claims. Formulations supplied by {companyData.tradeName} adhere to strict statutory oversight across all handling stages.
              </p>
              <div className="flex items-center gap-2 pt-2 text-micro-lg font-mono text-brand-forest-900 uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-forest-700 shrink-0" />
                <span>FORM 20B/21B AUDIT TRAIL VERIFIED</span>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* 4 Architectural Quality System Pillars (Open typographic ledger with hairline dividers) */}
        <div className="border-t border-b border-slate-200 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-14">
          {protocols.map((item, idx) => (
            <FadeIn key={item.code} direction="up" delay={0.08 * (idx + 1)}>
              <div className="py-8 lg:py-10 px-6 lg:px-8 h-full flex flex-col justify-between group hover:bg-slate-50/60 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-brand-forest-900 tracking-wider">
                      {item.code}
                    </span>
                    <span className="text-micro font-mono uppercase tracking-wider text-slate-600 font-semibold">
                      {item.focus}
                    </span>
                  </div>

                  <CardTitle className="mb-3">{item.title}</CardTitle>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.details}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-micro-lg text-slate-500 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-forest-700 shrink-0" />
                  <span>Documented Regulatory Standard</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Informational Callout */}
        <Card
          variant="note"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-brand-forest-800 shrink-0" />
            <span>
              All commercial partners may request manufacturer licences, batch COAs, and statutory drug documents for their compliance records.
            </span>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1 font-bold text-brand-forest-900 hover:text-brand-teal-700 transition-colors shrink-0"
          >
            <span>Request Documentation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Card>

      </Container>
    </Section>
  );
}
