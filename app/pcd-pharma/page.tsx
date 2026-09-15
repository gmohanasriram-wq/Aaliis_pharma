import React from "react";
import type { Metadata } from "next";
import { companyData } from "@/data/company";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { ShieldCheck, MapPin, Award, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "PCD Pharma Franchise in Tamil Nadu",
  description:
    "Explore PCD pharma franchise opportunities across Tamil Nadu with Aaliis Pharmaceuticals. Monopoly distribution rights, quality formulations, and GST billing.",
  alternates: {
    canonical: "/pcd-pharma",
  },
  openGraph: {
    title: "PCD Pharma Franchise Opportunities in Tamil Nadu | Aaliis Pharmaceuticals",
    description:
      "Partner with Aaliis Pharmaceuticals for PCD franchise distribution rights across Tamil Nadu districts. Monopoly rights, statutory compliance, and wholesale supply.",
    url: "/pcd-pharma",
    siteName: companyData.tradeName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: companyData.logoPath,
        width: 1024,
        height: 682,
        alt: `${companyData.tradeName} PCD Pharma Franchise`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PCD Pharma Franchise in Tamil Nadu | Aaliis Pharmaceuticals",
    description:
      "Explore district-wise PCD pharma franchise opportunities with Aaliis Pharmaceuticals across Tamil Nadu.",
    images: [companyData.logoPath],
  },
};

export default function PcdPharmaPage() {
  return (
    <div className="py-16 sm:py-20 bg-white min-h-screen border-b border-slate-200/90">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <FadeIn direction="up">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-forest-800">
              B2B Franchise &amp; Distribution Architecture
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              PCD Pharma Franchise in Tamil Nadu
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Aaliis Pharmaceuticals invites wholesale distributors, pharma sales professionals, and institutional stockists to partner with us under our PCD (Propaganda Cum Distribution) franchise model across all 38 districts of Tamil Nadu.
            </p>
          </div>
        </FadeIn>

        {/* 4 Strategic Pillars */}
        <FadeIn direction="up" delay={0.1}>
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-forest-800 flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-teal-600" />
              <span>Franchise Commercial Pillars</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 shadow-xs hover:border-brand-forest-800 transition-colors">
                <div className="flex items-center gap-3 text-slate-900 font-bold text-base">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <Award className="w-4 h-4 text-brand-forest-800" />
                  </div>
                  <span>District Monopoly Rights</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  Dedicated geographic territorial exclusivity to grow your institutional hospital, nursing home, and retail pharmacy customer base without internal channel conflict.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 shadow-xs hover:border-brand-forest-800 transition-colors">
                <div className="flex items-center gap-3 text-slate-900 font-bold text-base">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-brand-forest-800" />
                  </div>
                  <span>Verified Formulations</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  19 commercially active formulations across analgesics, gastrointestinal, neuro, respiratory, and antimicrobial segments manufactured under WHO-GMP and ISO certified partner facilities.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 shadow-xs hover:border-brand-forest-800 transition-colors">
                <div className="flex items-center gap-3 text-slate-900 font-bold text-base">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <MapPin className="w-4 h-4 text-brand-forest-800" />
                  </div>
                  <span>Statewide Logistics Hub</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  Consignments dispatched directly from our Chennai central facility with complete GST compliance, statutory batch records, and drug licence documentation.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 shadow-xs hover:border-brand-forest-800 transition-colors">
                <div className="flex items-center gap-3 text-slate-900 font-bold text-base">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-brand-forest-800" />
                  </div>
                  <span>Marketing &amp; Visual Aids</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  Promotional support including physician visual aids, comprehensive product dossiers, sample documentation, and streamlined digital order placement.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Partner Eligibility Ledger */}
        <FadeIn direction="up" delay={0.15}>
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-forest-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-teal-600" />
              <span>Statutory Qualification &amp; Compliance Standards</span>
            </h2>
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200/90 bg-slate-50/60 space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Franchise Partner Eligibility Criteria
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                To maintain ethical pharmaceutical trade and comply with Drugs and Cosmetics Act regulations, prospective PCD partners must satisfy all statutory prerequisites prior to territorial agreement execution:
              </p>
              <ul className="divide-y divide-slate-200/80 text-xs sm:text-sm text-slate-700">
                <li className="py-3 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-forest-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900">Valid Wholesale Drug Licence (Form 20B &amp; 21B):</span>{" "}
                    Issued by the relevant state drug licensing authority with active validity.
                  </div>
                </li>
                <li className="py-3 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-forest-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900">Active GSTIN Registration Certificate:</span>{" "}
                    Registered entity under state Goods &amp; Services Tax for regular commercial invoicing.
                  </div>
                </li>
                <li className="py-3 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-forest-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900">Field Promotion &amp; Retail Pharmacy Distribution:</span>{" "}
                    Established field representation or existing distribution reach to clinicians, nursing homes, and retail pharmacies in the target territory.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* CTA Banner */}
        <FadeIn direction="up" delay={0.2}>
          <div className="p-6 sm:p-8 rounded-2xl bg-brand-forest-50/70 border border-brand-forest-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-brand-forest-950 text-base">
                Ready to Establish a Territorial Partnership?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
                Contact our commercial desk to inquire about district availability, product price lists, and statutory onboarding requirements.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button href="/business-enquiry" variant="primary" size="md">
                <span>Request PCD Franchise Proposal</span>
                <ArrowRight className="w-4 h-4 ml-1.5 inline" />
              </Button>
              <Button href="/products" variant="outline" size="md">
                Browse Products
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
