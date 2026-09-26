import React, { Suspense } from "react";
import type { Metadata } from "next";
import { companyData } from "@/data/company";
import { FadeIn } from "@/components/motion/fade-in";
import { BusinessEnquiryForm } from "@/components/forms/business-enquiry-form";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Commercial & PCD Franchise Enquiry",
  description:
    "Connect with the commercial distribution desk at Aaliis Pharmaceuticals for PCD pharma franchise distribution rights, wholesale rate lists, or institutional hospital supply quotes across Tamil Nadu.",
  alternates: {
    canonical: "/business-enquiry",
  },
  openGraph: {
    title: "Commercial & PCD Franchise Enquiry | Aaliis Pharmaceuticals",
    description:
      "Connect with the commercial distribution desk at Aaliis Pharmaceuticals for PCD franchise distribution rights and hospital supply quotes across Tamil Nadu.",
    url: "/business-enquiry",
    siteName: companyData.tradeName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: companyData.logoPath,
        width: 612,
        height: 408,
        alt: `${companyData.tradeName} Business Enquiry`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial & PCD Franchise Enquiry | Aaliis Pharmaceuticals",
    description:
      "Submit commercial and PCD franchise enquiries for Tamil Nadu territory distribution.",
    images: [companyData.logoPath],
  },
};

function FormFallback() {
  return (
    <div className="mt-8 space-y-6 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="h-10 bg-slate-100 rounded-lg" />
        <div className="h-10 bg-slate-100 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="h-10 bg-slate-100 rounded-lg" />
        <div className="h-10 bg-slate-100 rounded-lg" />
      </div>
      <div className="h-28 bg-slate-100 rounded-lg" />
      <div className="h-10 w-44 bg-slate-200 rounded-lg" />
    </div>
  );
}

export default function BusinessEnquiryPage() {
  return (
    <Section as="div" density="compact" className="min-h-screen">
      <Container width="prose" className="space-y-12">
        {/* Header */}
        <FadeIn direction="up">
          <div className="max-w-2xl">
            <Eyebrow>Commercial Desk &amp; Distribution Onboarding</Eyebrow>
            <Heading level="h1" className="mt-3">
              Business &amp; Franchise Enquiry
            </Heading>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Connect with our commercial desk for PCD franchise distribution rights, wholesale rate lists, or institutional hospital supply quotes across Tamil Nadu.
            </p>
          </div>
        </FadeIn>

        {/* Form Container */}
        <FadeIn direction="up" delay={0.1}>
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-6 sm:p-10 shadow-xs">
            <div className="pb-6 border-b border-slate-200/80">
              <Eyebrow as="h2">Statutory Trade Application Form</Eyebrow>
              <p className="text-xs text-slate-600 mt-1">
                Please provide your trade name, location, and licensing profile to expedite order routing and territory checks.
              </p>
            </div>
            <Suspense fallback={<FormFallback />}>
              <BusinessEnquiryForm />
            </Suspense>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
