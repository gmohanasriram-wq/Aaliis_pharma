import React from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { companyData } from "@/data/company";
import {
  MapPin,
  Phone,
  Mail,
  FileCheck2,
  ShieldCheck,
  Building,
  UserCheck,
  ArrowRight,
} from "lucide-react";

export function ContactOverview() {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <FadeIn direction="up">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-forest-800">
              Operational Coordinates
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08] text-balance">
              Verified Corporate &amp; Statutory Registry
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Connect with our Chennai administrative office for formulation inquiries, territory franchise allocation, and statutory compliance documentation.
            </p>
          </FadeIn>
        </div>

        {/* 3 Clean Editorial Dossiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

          {/* Col 1: Registered Office */}
          <FadeIn direction="up" delay={0.1}>
            <div className="h-full rounded-2xl border border-slate-200/90 bg-slate-50/50 p-7 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-forest-800 block mb-3">
                  Registered Location
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Principal Place of Business
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {companyData.principalAddress}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 font-mono">
                Supply: <span className="font-semibold text-slate-800">Across Tamil Nadu</span>
              </div>
            </div>
          </FadeIn>

          {/* Col 2: Direct Contact */}
          <FadeIn direction="up" delay={0.15}>
            <div className="h-full rounded-2xl border border-slate-200/90 bg-slate-50/50 p-7 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-forest-800 block mb-3">
                  Direct Communication
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  Commercial Coordination
                </h3>

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

                  <div className="flex items-center gap-2.5 pt-2 text-slate-600 text-xs font-medium">
                    <UserCheck className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>M. Gopi (Regional Business Manager)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 font-mono">
                Hours: Mon – Sat (9:30 AM – 6:30 PM)
              </div>
            </div>
          </FadeIn>

          {/* Col 3: Statutory Registry */}
          <FadeIn direction="up" delay={0.2}>
            <div className="h-full rounded-2xl border border-slate-200/90 bg-slate-50/50 p-7 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-forest-800 block mb-3">
                  Statutory Registrations
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  State Drug Licences &amp; GSTIN
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Biological Drug Licence (Form 21B):</span>
                    <span className="font-mono font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 mt-0.5 inline-block">
                      {companyData.licences[1].number}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">Non-Biological Drug Licence (Form 20B):</span>
                    <span className="font-mono font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 mt-0.5 inline-block">
                      {companyData.licences[0].number}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">Goods &amp; Services Tax Registration:</span>
                    <span className="font-mono font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 mt-0.5 inline-block">
                      {companyData.gstin}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 font-mono">
                Issued by Tamil Nadu Drugs Control
              </div>
            </div>
          </FadeIn>

        </div>

      </div>
    </section>
  );
}
