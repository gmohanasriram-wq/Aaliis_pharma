import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { companyData } from "@/data/company";
import { FadeIn } from "@/components/motion/fade-in";
import { Building2, FileCheck, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "About Us | Corporate Profile",
  description:
    "Learn about Aaliis Pharmaceuticals, a licensed B2B PCD pharma distributor operating across Tamil Nadu.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Aaliis Pharmaceuticals | Corporate Profile",
    description:
      "Learn about Aaliis Pharmaceuticals, a licensed B2B PCD pharma distributor operating across Tamil Nadu.",
    url: "/about",
    siteName: companyData.tradeName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: companyData.logoPath,
        width: 612,
        height: 408,
        alt: `${companyData.tradeName} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Aaliis Pharmaceuticals | Corporate Profile",
    description:
      "Learn about Aaliis Pharmaceuticals, a licensed B2B PCD pharma distributor operating across Tamil Nadu.",
    images: [companyData.logoPath],
  },
};

export default function AboutPage() {
  return (
    <Section as="div" density="compact" className="min-h-screen">
      <Container width="narrow" className="space-y-16">
        {/* Header */}
        <FadeIn direction="up">
          <div className="max-w-3xl">
            <Eyebrow>Corporate Profile &amp; Governance</Eyebrow>
            <Heading level="h1" className="mt-3">
              About {companyData.tradeName}
            </Heading>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {companyData.tradeName} is an established pharmaceutical enterprise headquartered in Chennai, operating primarily as a B2B PCD pharma distributor. We supply verified, quality-tested pharmaceutical formulations to pharmacies, hospitals, and licensed distributors across all districts of Tamil Nadu.
            </p>
          </div>
        </FadeIn>

        {/* Corporate Structure / Architectural Ledger */}
        <FadeIn direction="up" delay={0.1}>
          <div className="space-y-4">
            <Eyebrow as="h2" className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-teal-600" />
              <span>Constitutional &amp; Registration Records</span>
            </Eyebrow>
            <dl className="border-t border-b border-slate-200 divide-y sm:divide-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:divide-x divide-slate-200">
              <div className="py-5 sm:px-6 first:sm:pl-0">
                <dt className="text-xs font-mono uppercase tracking-wider text-slate-500">Constitution</dt>
                <dd className="font-semibold text-slate-900 text-sm mt-1">{companyData.constitution}</dd>
              </div>
              <div className="py-5 sm:px-6">
                <dt className="text-xs font-mono uppercase tracking-wider text-slate-500">Established Date</dt>
                <dd className="font-semibold text-slate-900 text-sm mt-1">{companyData.establishedDate}</dd>
              </div>
              <div className="py-5 sm:px-6">
                <dt className="text-xs font-mono uppercase tracking-wider text-slate-500">GSTIN Registration</dt>
                <dd className="font-mono font-semibold text-slate-900 text-sm mt-1">{companyData.gstin}</dd>
              </div>
              <div className="py-5 sm:px-6 last:sm:pr-0">
                <dt className="text-xs font-mono uppercase tracking-wider text-slate-500">Operational Area</dt>
                <dd className="font-semibold text-slate-900 text-sm mt-1">{companyData.operationalArea}</dd>
              </div>
            </dl>
          </div>
        </FadeIn>

        {/* Drug Licensing Authorities */}
        <FadeIn direction="up" delay={0.15}>
          <div className="space-y-4">
            <Eyebrow as="h2" className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-brand-teal-600" />
              <span>Drug Licensing Authorities</span>
            </Eyebrow>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {companyData.licences.map((licence) => (
                <div key={licence.type} className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500">{licence.type}</span>
                    <span className="font-mono font-bold text-slate-900 text-lg sm:text-xl mt-2 block">
                      {licence.number}
                    </span>
                  </div>
                  <p className="mt-4 pt-3 border-t border-slate-200/80 text-xs text-slate-600">
                    Form 20B/21B Wholesale Drug Licence issued by the Drugs Control Administration, Tamil Nadu.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Leadership Governance */}
        <FadeIn direction="up" delay={0.2}>
          <div className="space-y-4">
            <Eyebrow as="h2" className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-teal-600" />
              <span>Governance &amp; Designated Representation</span>
            </Eyebrow>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block">Registered Partnership</span>
                <h3 className="font-bold text-slate-900 text-base">Partners Named in GST Certificate</h3>
                <ul className="divide-y divide-slate-200/80 text-xs text-slate-700">
                  {companyData.partners.map((partner) => (
                    <li key={partner.name} className="py-2.5 flex justify-between items-center">
                      <span className="font-medium text-slate-900">{partner.name}</span>
                      <span className="text-slate-500 font-mono">{partner.role}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block">Commercial Desk</span>
                <h3 className="font-bold text-slate-900 text-base">Field &amp; Franchise Operations</h3>
                <ul className="divide-y divide-slate-200/80 text-xs text-slate-700">
                  {companyData.executives.map((executive) => (
                    <li key={executive.name} className="py-2.5 flex justify-between items-center gap-2">
                      <div>
                        <span className="font-medium text-slate-900 block">{executive.name}</span>
                        {executive.phone && (
                          <a
                            href={`tel:${executive.phone.replace(/\s+/g, "")}`}
                            className="text-brand-forest-700 hover:text-brand-forest-900 font-mono text-[11px] hover:underline"
                          >
                            Direct: {executive.phone}
                          </a>
                        )}
                      </div>
                      <span className="text-slate-500 font-mono text-right">{executive.designation}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 pt-2 border-t border-slate-200/80">
                  Responsible for district stockist coordination, institutional hospital dispatches, and PCD franchise expansion across Tamil Nadu.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Operational Boundary Notice with B2B Action */}
        <FadeIn direction="up" delay={0.25}>
          <div className="p-6 sm:p-8 rounded-2xl bg-brand-forest-50/70 border border-brand-forest-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-brand-forest-800 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-brand-forest-950 text-sm">Strict B2B Wholesale Mandate</h3>
                <p className="mt-1 text-xs text-slate-700 leading-relaxed max-w-2xl">
                  Aaliis Pharmaceuticals operates exclusively as an institutional wholesale partner and PCD franchisor. We do not dispense medicines directly to individual consumers or patients. All trade relationships require statutory licensing verification.
                </p>
              </div>
            </div>
            <Link
              href="/business-enquiry"
              className="inline-flex items-center gap-2 bg-brand-forest-800 hover:bg-brand-forest-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shrink-0 transition-colors shadow-xs"
            >
              <span>Submit Commercial Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
