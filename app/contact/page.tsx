import React from "react";
import type { Metadata } from "next";
import { companyData } from "@/data/company";
import { FadeIn } from "@/components/motion/fade-in";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Building2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Registered Office & Communications",
  description:
    "Contact coordinates, registered office location, and business hours for Aaliis Pharmaceuticals in Chennai, Tamil Nadu. Connect for wholesale and PCD enquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Aaliis Pharmaceuticals | Registered Office & Desk",
    description:
      "Contact coordinates, registered office location, and business hours for Aaliis Pharmaceuticals in Chennai, Tamil Nadu.",
    url: "/contact",
    siteName: companyData.tradeName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: companyData.logoPath,
        width: 612,
        height: 408,
        alt: `${companyData.tradeName} Contact Desk`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Aaliis Pharmaceuticals | Registered Office",
    description:
      "Direct communication coordinates and commercial enquiry desk for Aaliis Pharmaceuticals, Tamil Nadu.",
    images: [companyData.logoPath],
  },
};

export default function ContactPage() {
  return (
    <Section as="div" density="compact" className="min-h-screen">
      <Container width="narrow" className="space-y-16">
        {/* Header */}
        <FadeIn direction="up">
          <div className="max-w-3xl">
            <Eyebrow>Corporate Coordinates &amp; Logistics Desk</Eyebrow>
            <Heading level="h1" className="mt-3">
              Contact {companyData.tradeName}
            </Heading>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Connect directly with our central administration, institutional dispatch desk, and regional field operations for wholesale orders, licence verifications, and PCD franchise coordination.
            </p>
          </div>
        </FadeIn>

        {/* 4 Informational Coordinates Dossiers */}
        <FadeIn direction="up" delay={0.1}>
          <div className="space-y-4">
            <Eyebrow as="h2" className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-teal-600" />
              <span>Direct Office &amp; Regulatory Coordinates</span>
            </Eyebrow>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address Dossier */}
              <div className="p-6 sm:p-7 rounded-2xl border border-slate-200/90 bg-slate-50/60 shadow-xs hover:border-brand-forest-800 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                      <MapPin className="w-5 h-5 text-brand-forest-800" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
                        Central Facility
                      </span>
                      <h3 className="text-base font-bold text-slate-900">
                        Principal Place of Business
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {companyData.principalAddress}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-600">
                  <span>OPERATIONAL ZONE</span>
                  <span className="font-semibold text-slate-900">{companyData.operationalArea}</span>
                </div>
              </div>

              {/* Direct Communications Dossier */}
              <div className="p-6 sm:p-7 rounded-2xl border border-slate-200/90 bg-slate-50/60 shadow-xs hover:border-brand-forest-800 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                      <Phone className="w-5 h-5 text-brand-forest-800" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
                        Commercial Communication
                      </span>
                      <h3 className="text-base font-bold text-slate-900">
                        Direct Lines &amp; Dispatch Desk
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3 text-xs sm:text-sm">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-slate-500 font-mono text-xs">Direct Telephone:</span>
                      <a
                        href={`tel:${companyData.phone.replace(/\s+/g, "")}`}
                        className="font-mono font-semibold text-slate-900 hover:text-brand-forest-800"
                      >
                        {companyData.phone}
                      </a>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-slate-500 font-mono text-xs">Official Inquiries:</span>
                      <a
                        href={`mailto:${companyData.email}`}
                        className="font-mono font-semibold text-slate-900 hover:text-brand-forest-800"
                      >
                        {companyData.email}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-200/80 text-[11px] font-mono text-slate-600">
                  TELEPHONE DESK MON–SAT 9:30 AM – 7:00 PM
                </div>
              </div>

              {/* Regional Field Operations Dossier */}
              <div className="p-6 sm:p-7 rounded-2xl border border-slate-200/90 bg-slate-50/60 shadow-xs hover:border-brand-forest-800 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                      <Building2 className="w-5 h-5 text-brand-forest-800" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
                        Institutional Coordination
                      </span>
                      <h3 className="text-base font-bold text-slate-900">
                        Commercial Key Personnel
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4 text-xs sm:text-sm space-y-2.5">
                    {companyData.executives.map((exec) => (
                      <div key={exec.name} className="space-y-0.5">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="font-bold text-slate-900">{exec.name}</p>
                          <span className="text-slate-500 font-mono text-[11px]">{exec.designation}</span>
                        </div>
                        {exec.phone && (
                          <div className="flex items-baseline gap-1.5 text-xs">
                            <span className="text-slate-500 font-mono text-[10px] uppercase">Direct:</span>
                            <a
                              href={`tel:${exec.phone.replace(/\s+/g, "")}`}
                              className="font-mono text-brand-forest-700 hover:text-brand-forest-900 font-medium hover:underline"
                            >
                              {exec.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                    <p className="text-xs text-slate-600 pt-2 border-t border-slate-200/80 leading-relaxed">
                      Lead contacts for district stockist agreements, hospital tender supply, and regional distributor onboarding.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-200/80 text-[11px] font-mono text-slate-600">
                  DESIGNATED COMMERCIAL EXECUTIVES
                </div>
              </div>

              {/* Operations Hours & Statutory Ledger */}
              <div className="p-6 sm:p-7 rounded-2xl border border-slate-200/90 bg-slate-50/60 shadow-xs hover:border-brand-forest-800 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                      <Clock className="w-5 h-5 text-brand-forest-800" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
                        Statutory Operations
                      </span>
                      <h3 className="text-base font-bold text-slate-900">
                        Wholesale Operations &amp; Billing
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4 text-xs sm:text-sm text-slate-700 space-y-1.5 leading-relaxed">
                    <p>Monday – Saturday: 9:30 AM to 7:00 PM</p>
                    <p className="text-xs text-slate-500">Sunday: Closed (Emergency stock dispatches on prior notification)</p>
                    <p className="text-xs font-mono text-slate-700 pt-1">
                      GSTIN: <span className="font-semibold text-slate-900">{companyData.gstin}</span>
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-200/80 text-[11px] font-mono text-slate-600">
                  FORM 20B/21B LICENSED WHOLESALE FACILITY
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* B2B Commercial Enquiry Action Banner */}
        <FadeIn direction="up" delay={0.15}>
          <div className="p-6 sm:p-8 rounded-2xl bg-brand-forest-50/70 border border-brand-forest-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-brand-forest-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-brand-forest-800 shrink-0" />
                <h2 className="text-base font-bold text-brand-forest-950">
                  Commercial Procurement &amp; PCD Franchise Enquiries
                </h2>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
                Seeking exclusive PCD distribution rights for your district or bulk hospital formulation quotes? Submit a formal proposal directly to our commercial desk.
              </p>
            </div>
            <Button
              href="/business-enquiry"
              variant="primary"
              size="md"
              className="shrink-0"
            >
              <span>Submit Business Enquiry</span>
              <ArrowRight className="w-4 h-4 ml-1.5 inline" />
            </Button>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
