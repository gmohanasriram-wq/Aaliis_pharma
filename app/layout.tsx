import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { companyData } from "@/data/company";

// Inter is the face design-analysis.md §5 specifies for the whole site. It was
// never actually loaded — the page fell back to Segoe UI, so line breaks
// varied by visitor OS. next/font self-hosts it and exposes it as a CSS
// variable for Tailwind's fontFamily.sans to consume.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aaliispharma.com"),
  title: {
    default: `${companyData.tradeName} | PCD Pharma Company in Tamil Nadu`,
    template: `%s | ${companyData.tradeName}`,
  },
  description:
    "Aaliis Pharmaceuticals is a B2B PCD pharma distributor supplying verified pharmaceutical formulations across Tamil Nadu to pharmacies, hospitals, and distributors.",
  keywords: [
    "PCD pharma company in Tamil Nadu",
    "Pharmaceutical distributor Tamil Nadu",
    "PCD pharma franchise Tamil Nadu",
    "Pharma products supplier Tamil Nadu",
    "Pharmaceutical company Chennai",
    "PCD pharma products Chennai",
  ],
  authors: [{ name: companyData.tradeName }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${companyData.tradeName} | B2B PCD Pharma Network`,
    description:
      "Supplying quality tablets, capsules, injectables, and nutraceuticals to pharmacies, hospitals, and distributors across Tamil Nadu.",
    type: "website",
    locale: "en_IN",
    siteName: companyData.tradeName,
    url: "/",
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
    title: `${companyData.tradeName} | PCD Pharma Company in Tamil Nadu`,
    description:
      "Supplying quality tablets, capsules, injectables, and nutraceuticals across Tamil Nadu.",
    images: [companyData.logoPath],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: companyData.logoPath,
    shortcut: companyData.logoPath,
    apple: companyData.logoPath,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-brand-forest-900 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-teal-400 text-xs font-semibold uppercase tracking-wider"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
