import React from "react";
import type { Metadata } from "next";
import { companyData } from "@/data/company";
import { Hero } from "@/components/sections/hero";
import { CompanyIntro } from "@/components/sections/company-intro";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { PcdPharmaSection } from "@/components/sections/pcd-pharma-section";
import { WhyAaliisSection } from "@/components/sections/why-aaliis-section";
import { QualitySection } from "@/components/sections/quality-section";
import { StandardsOverview } from "@/components/sections/standards-overview";
import { TerritorySection } from "@/components/sections/territory-section";
import { CtaSection } from "@/components/sections/cta-section";
import { ContactOverview } from "@/components/sections/contact-overview";

export const metadata: Metadata = {
  title: "PCD Pharma Company in Tamil Nadu | Wholesale & Institutional Supply",
  description:
    "Aaliis Pharmaceuticals is a B2B PCD pharma distributor supplying 20 verified formulations across Tamil Nadu to pharmacies, hospitals, and medical distributors.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aaliis Pharmaceuticals | B2B PCD Pharma Company in Tamil Nadu",
    description:
      "Supplying quality tablets, capsules, injectables, and nutraceuticals to pharmacies, hospitals, and distributors across Tamil Nadu.",
    url: "/",
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
    title: "Aaliis Pharmaceuticals | B2B PCD Pharma Company in Tamil Nadu",
    description:
      "Supplying quality tablets, capsules, injectables, and nutraceuticals across Tamil Nadu.",
    images: [companyData.logoPath],
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* SECTION 1 — HERO & INTERACTIVE FORMULATION SHOWCASE */}
      <Hero />

      {/* SECTION 2 — COMPANY PROFILE & B2B WHOLESALE MODEL */}
      <CompanyIntro />

      {/* SECTION 3 — OUR PRODUCT PORTFOLIO */}
      <FeaturedProducts />

      {/* SECTION 4 — PCD PHARMA FRANCHISE WORKFLOW */}
      <PcdPharmaSection />

      {/* SECTION 5 — WHY AALIIS / INSTITUTIONAL VALUE PROPOSITION */}
      <WhyAaliisSection />

      {/* SECTION 6 — EVIDENCE-BASED QUALITY ASSURANCE & GOVERNANCE */}
      <QualitySection />

      {/* SECTION 7 — MANUFACTURING PARTNER FACILITIES & STANDARDS */}
      <StandardsOverview />

      {/* SECTION 8 — STATEWIDE TAMIL NADU TERRITORY & DISTRIBUTION NETWORK */}
      <TerritorySection />

      {/* SECTION 9 — COMMERCIAL COLLABORATION CTA */}
      <CtaSection />

      {/* SECTION 10 — OPERATIONAL COORDINATES & STATUTORY REGISTRATIONS */}
      <ContactOverview />
    </div>
  );
}
