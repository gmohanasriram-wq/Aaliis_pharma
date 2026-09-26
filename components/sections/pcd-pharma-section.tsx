import React from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card, CardTitle } from "@/components/ui/card";

export function PcdPharmaSection() {
  const workflow = [
    {
      step: "01",
      phase: "TERRITORY INQUIRY",
      title: "Territory & Formulation Line Selection",
      description:
        "Prospective partners identify their target operational district or territory within Tamil Nadu and select therapeutic formulations of commercial interest.",
    },
    {
      step: "02",
      phase: "REGULATORY VERIFICATION",
      title: "Statutory Licence Documentation",
      description:
        "Submission and verification of active wholesale drug licences (Form 20B and/or Form 21B) along with active GSTIN registration to ensure statutory wholesale compliance.",
    },
    {
      step: "03",
      phase: "SUPPLY COORDINATION",
      title: "Commercial Terms & Order Allocation",
      description:
        "Finalization of scheduled formulation supplies, batch allocations, pack configurations, and transparent wholesale pricing with regional management.",
    },
    {
      step: "04",
      phase: "DISPATCH & INVOICING",
      title: "Consignment Delivery & Invoicing",
      description:
        "Coordinated dispatch from Chennai supported by statutory GST tax invoicing and authentic manufacturer Certificates of Analysis (COA) confirming release standards.",
    },
  ];

  return (
    <Section>
      <Container>

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <FadeIn direction="up">
            <Eyebrow>PCD Franchise Framework</Eyebrow>
            <Heading level="h2" className="mt-3">
              Pharmaceutical Franchise &amp; Distribution Across Tamil Nadu
            </Heading>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              We collaborate with qualified stockists, distribution enterprises, and institutional pharmacy networks across Tamil Nadu. Our model is built on product availability, transparent wholesale invoicing, and strict adherence to statutory drug regulations.
            </p>
          </FadeIn>
        </div>

        {/* 4-Phase Connected Architectural Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {workflow.map((item, idx) => (
            <FadeIn key={item.step} direction="up" delay={0.08 * (idx + 1)}>
              <div className="relative h-full flex flex-col justify-between pt-6 border-t-2 border-slate-200 hover:border-brand-forest-800 transition-colors group">

                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-mono text-3xl font-black text-slate-500 group-hover:text-brand-forest-900 transition-colors">
                      {item.step}
                    </span>
                    <span className="text-micro font-mono text-brand-forest-800 font-bold uppercase tracking-wider">
                      {item.phase}
                    </span>
                  </div>

                  <CardTitle className="mb-2">{item.title}</CardTitle>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 text-micro-lg font-mono text-slate-600 font-medium">
                  Step 0{idx + 1} of 04
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

        {/* Integrated Wholesale Eligibility Dossier & Application Spread */}
        <FadeIn direction="up" delay={0.25}>
          <Card variant="dark" className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              <div className="lg:col-span-8 space-y-4">
                <Eyebrow size="micro" className="text-brand-teal-300">
                  Statutory Wholesale Requirements
                </Eyebrow>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Eligibility Criteria for PCD Distribution Partners
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  Commercial collaboration requires active statutory drug licences. We conduct document verification for all prospective stockists and institutional distribution partners across Tamil Nadu.
                </p>

                {/* 4-point requirement criteria */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal-400 shrink-0 mt-0.5" />
                    <span>Active <strong>Form 20B / 21B</strong> wholesale drug licences.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal-400 shrink-0 mt-0.5" />
                    <span>Active <strong>GSTIN registration</strong> for statutory tax invoicing.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal-400 shrink-0 mt-0.5" />
                    <span>Documented storage conforming to drug storage conditions.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal-400 shrink-0 mt-0.5" />
                    <span>Established network supplying licensed pharmacies/hospitals.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
                <Button
                  href="/business-enquiry"
                  variant="primaryOnDark"
                  size="lg"
                  className="w-full sm:w-auto font-bold px-7 py-3.5 text-xs tracking-wider uppercase justify-center"
                >
                  <span>Submit Partner Application</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <Link
                  href="/pcd-pharma"
                  className="text-xs font-mono text-slate-300 hover:text-white transition-colors"
                >
                  View Complete PCD Distribution Policy &rarr;
                </Link>
              </div>

            </div>
          </Card>
        </FadeIn>

      </Container>
    </Section>
  );
}
