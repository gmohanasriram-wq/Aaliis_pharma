import React from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { companyData } from "@/data/company";
import { Phone, Mail, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card, CardTitle } from "@/components/ui/card";

export function ContactOverview() {
  return (
    <Section id="contact" density="compact" divided={false}>
      <Container>

        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <FadeIn direction="up">
            <Eyebrow>Operational Coordinates</Eyebrow>
            <Heading level="h2" className="mt-3">
              Verified Corporate &amp; Statutory Registry
            </Heading>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Connect with our Chennai administrative office for formulation inquiries, territory franchise allocation, and statutory compliance documentation.
            </p>
          </FadeIn>
        </div>

        {/* 3 Clean Editorial Dossiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

          {/* Col 1: Registered Office */}
          <FadeIn direction="up" delay={0.1}>
            <Card variant="muted" className="h-full flex flex-col justify-between">
              <div>
                <Eyebrow size="micro" className="block mb-3">
                  Registered Location
                </Eyebrow>
                <CardTitle className="mb-2">Principal Place of Business</CardTitle>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {companyData.principalAddress}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 font-mono">
                Supply: <span className="font-semibold text-slate-800">Across Tamil Nadu</span>
              </div>
            </Card>
          </FadeIn>

          {/* Col 2: Direct Contact */}
          <FadeIn direction="up" delay={0.15}>
            <Card variant="muted" className="h-full flex flex-col justify-between">
              <div>
                <Eyebrow size="micro" className="block mb-3">
                  Direct Communication
                </Eyebrow>
                <CardTitle className="mb-4">Commercial Coordination</CardTitle>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-brand-forest-700 shrink-0" />
                    <a
                      href={`tel:${companyData.phone.replace(/\s+/g, "")}`}
                      className="font-medium text-slate-800 hover:text-brand-forest-800 transition-colors"
                    >
                      {companyData.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-brand-forest-700 shrink-0" />
                    <a
                      href={`mailto:${companyData.email}`}
                      className="font-medium text-slate-800 hover:text-brand-forest-800 transition-colors truncate"
                    >
                      {companyData.email}
                    </a>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                    {companyData.executives.map((exec) => (
                      <div key={exec.name} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <UserCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate font-medium text-slate-800">
                            {exec.name}
                            <span className="text-slate-500 font-normal ml-1">({exec.designation})</span>
                          </span>
                        </div>
                        {exec.phone && (
                          <a
                            href={`tel:${exec.phone.replace(/\s+/g, "")}`}
                            className="text-brand-forest-700 hover:text-brand-forest-900 font-mono text-[11px] shrink-0 font-medium hover:underline"
                            title={`Call ${exec.name}`}
                          >
                            {exec.phone}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 font-mono">
                Hours: Mon – Sat (9:30 AM – 6:30 PM)
              </div>
            </Card>
          </FadeIn>

          {/* Col 3: Statutory Registry */}
          <FadeIn direction="up" delay={0.2}>
            <Card variant="muted" className="h-full flex flex-col justify-between">
              <div>
                <Eyebrow size="micro" className="block mb-3">
                  Statutory Registrations
                </Eyebrow>
                <CardTitle className="mb-4">State Drug Licences &amp; GSTIN</CardTitle>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-micro-lg">Biological Drug Licence (Form 21B):</span>
                    <span className="font-mono font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 mt-0.5 inline-block">
                      {companyData.licences[1].number}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-micro-lg">Non-Biological Drug Licence (Form 20B):</span>
                    <span className="font-mono font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 mt-0.5 inline-block">
                      {companyData.licences[0].number}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-micro-lg">Goods &amp; Services Tax Registration:</span>
                    <span className="font-mono font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 mt-0.5 inline-block">
                      {companyData.gstin}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 font-mono">
                Issued by Tamil Nadu Drugs Control
              </div>
            </Card>
          </FadeIn>

        </div>

      </Container>
    </Section>
  );
}
