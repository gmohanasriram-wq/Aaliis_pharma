import React from "react";
import Link from "next/link";
import Image from "next/image";
import { companyData } from "@/data/company";
import { ShieldCheck, MapPin, Phone, Mail, FileCheck, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-navy-950 text-slate-300 border-t border-slate-800/80">
      {/* Upper Footer: Main Coordinates & Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Col 1: Brand & Positioning (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-block bg-white p-2.5 rounded-xl shadow-sm hover:opacity-95 transition-opacity"
            >
              <Image
                src={companyData.logoPath}
                alt="Aaliis Pharmaceuticals - B2B PCD Pharma Partner"
                width={150}
                height={100}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              {companyData.websitePositioning}
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-brand-teal-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>B2B PCD Pharma Partner — Tamil Nadu</span>
            </div>

            <div className="text-[11px] text-slate-400">
              Coverage: <span className="text-slate-300 font-medium">{companyData.operationalArea}</span>
            </div>
          </div>

          {/* Col 2: Therapeutic Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white text-xs font-bold tracking-wider uppercase">
              Formulations
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All 19 Formulations
                </Link>
              </li>
              <li>
                <Link href="/products?category=Pain%20%26%20Musculoskeletal" className="hover:text-white transition-colors">
                  Pain &amp; Musculoskeletal
                </Link>
              </li>
              <li>
                <Link href="/products?category=Neurological%20%26%20Neuropathic" className="hover:text-white transition-colors">
                  Neurological &amp; Neuropathic
                </Link>
              </li>
              <li>
                <Link href="/products?category=Gastroenterology%20%26%20Anti-peptic" className="hover:text-white transition-colors">
                  Gastroenterology &amp; Anti-peptic
                </Link>
              </li>
              <li>
                <Link href="/products?category=Nutraceuticals%20%26%20Dietary%20Supplements" className="hover:text-white transition-colors">
                  Nutraceuticals &amp; Dietary Supplements
                </Link>
              </li>
              <li>
                <Link href="/products?category=Parenteral%20Injections" className="hover:text-white transition-colors">
                  Parenteral Injections
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Business (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-white text-xs font-bold tracking-wider uppercase">
              Partnership &amp; Governance
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/pcd-pharma" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>PCD Franchise Tamil Nadu</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link href="/business-enquiry" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Submit Business Enquiry</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link href="/why-aaliis" className="hover:text-white transition-colors">
                  Why Aaliis / Quality Standards
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Company
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Coordinates
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Registered Office & Licences (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-white text-xs font-bold tracking-wider uppercase">
              Regulatory Information
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-teal-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-snug">{companyData.principalAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-teal-400 shrink-0" />
                <a
                  href={`tel:${companyData.phone.replace(/\s+/g, "")}`}
                  className="hover:text-white transition-colors text-slate-300 font-mono"
                >
                  {companyData.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-teal-400 shrink-0" />
                <a
                  href={`mailto:${companyData.email}`}
                  className="hover:text-white transition-colors text-slate-300 truncate"
                >
                  {companyData.email}
                </a>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] space-y-1">
                <div>GSTIN: <span className="text-white font-mono">{companyData.gstin}</span></div>
                <div>Form 20B: <span className="text-white font-mono">{companyData.licences[0].number}</span></div>
                <div>Form 21B: <span className="text-white font-mono">{companyData.licences[1].number}</span></div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {companyData.legalName}. All rights reserved. B2B wholesale pharmaceutical distribution only. Direct-to-patient dispensing is not conducted.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Business
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
