import React from "react";
import type { Metadata } from "next";
import { companyData } from "@/data/company";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Privacy Policy | B2B Commercial Data",
  description:
    "Privacy Policy for Aaliis Pharmaceuticals governing business enquiries and institutional client data.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Aaliis Pharmaceuticals",
    description:
      "Privacy policy governing B2B enquiries, client confidentiality, and institutional data handling.",
    url: "/privacy",
    siteName: companyData.tradeName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: companyData.logoPath,
        width: 1024,
        height: 682,
        alt: `${companyData.tradeName} Privacy Policy`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Aaliis Pharmaceuticals",
    description: "B2B commercial data handling and confidentiality policies.",
    images: [companyData.logoPath],
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-20 bg-white min-h-screen border-b border-slate-200/90">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <FadeIn direction="up">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-forest-800">
              Commercial Data Handling &amp; Confidentiality
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Privacy Policy
            </h1>
            <p className="mt-3 text-xs sm:text-sm font-mono text-slate-500 uppercase tracking-wider">
              Effective Date: 17 February 2025 • {companyData.legalName}
            </p>
          </div>
        </FadeIn>

        {/* Policy Sections */}
        <FadeIn direction="up" delay={0.1}>
          <div className="space-y-10 text-slate-700 text-sm leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">1. Scope of Policy</h2>
              <p>
                This privacy policy applies to commercial communications, PCD franchise enquiries, and business submissions collected through this website by {companyData.legalName} (&quot;Aaliis Pharmaceuticals&quot;).
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">2. B2B Commercial Information Collected</h2>
              <p>
                We collect only commercial details necessary to evaluate wholesale and PCD distribution relationships, such as contact name, pharmacy or company name, business phone number, email address, city, and licensing credentials. We do not solicit personal patient health information.
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">3. Use of Information</h2>
              <p>Information provided is utilized solely for:</p>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-2">
                <li>Processing and responding to distribution enquiries</li>
                <li>Verifying wholesale drug licence credentials</li>
                <li>Fulfilling commercial orders and invoicing under applicable GST rules</li>
                <li>Communication regarding formulation availability and pricing</li>
              </ul>
            </section>

            <section className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">4. Third-Party Sharing</h2>
              <p>
                We do not sell, rent, or trade business contact information to third-party marketing companies. Data may be shared only with regulatory authorities where required by Indian statutory law or drug licensing mandates.
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">5. Contact Information</h2>
              <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 font-mono text-xs text-slate-700 space-y-1.5">
                <p className="font-semibold text-slate-900">Commercial Desk &amp; Compliance Office</p>
                <p>{companyData.legalName}</p>
                <p>{companyData.principalAddress}</p>
                <p>Official Email: {companyData.email}</p>
              </div>
            </section>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
