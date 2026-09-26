import React from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { companyData } from "@/data/company";
import { ArrowRight, PhoneCall, Mail, ShieldCheck, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";

export function CtaSection() {
  return (
    <Section tone="muted">
      <Container>
        <FadeIn direction="up">
          <Card variant="dark" className="relative overflow-hidden px-8 py-14 sm:px-14 sm:py-20">

            <div className="relative z-10 max-w-3xl">

              <div className="inline-flex items-center gap-2 rounded-md bg-brand-forest-900/60 border border-brand-forest-700/60 px-3 py-1 text-xs font-mono font-semibold text-emerald-300 mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>COMMERCIAL COLLABORATION</span>
              </div>

              <Heading level="h2" tone="inverse">
                Establish a Dedicated Pharmaceutical Partnership.
              </Heading>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Whether you operate a licensed retail pharmacy, manage hospital procurement, or seek dedicated PCD franchise distribution rights in your district, our team is ready to coordinate verified formulation supplies.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  href="/business-enquiry"
                  variant="primaryOnDark"
                  size="lg"
                  className="font-bold px-7 py-3.5 text-sm tracking-wide shadow-lg shadow-brand-forest-950/40"
                >
                  <span>Submit Business Enquiry</span>
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>

                <Button
                  href="/pcd-pharma"
                  variant="outlineOnDark"
                  size="lg"
                  className="px-6 py-3.5 text-sm font-semibold"
                >
                  PCD Franchise Model
                </Button>
              </div>

              {/* Direct Touchpoints */}
              <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
                <a
                  href={`tel:${companyData.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-brand-forest-400 shrink-0" />
                  <span>{companyData.phone}</span>
                </a>

                <a
                  href={`mailto:${companyData.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors truncate"
                >
                  <Mail className="w-4 h-4 text-brand-forest-400 shrink-0" />
                  <span className="truncate">{companyData.email}</span>
                </a>

                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-brand-forest-400 shrink-0" />
                  <span>Reach: Across Tamil Nadu</span>
                </div>
              </div>

            </div>
          </Card>
        </FadeIn>
      </Container>
    </Section>
  );
}
