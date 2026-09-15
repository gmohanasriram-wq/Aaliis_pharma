import React from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { companyData } from "@/data/company";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function CompanyIntro() {
  const commitments = [
    {
      num: "01",
      title: "Strict B2B Wholesale Distribution",
      meta: "Channel Protection",
      description:
        "We operate exclusively as a B2B pharmaceutical distributor. Direct-to-patient dispensing and online retail are strictly excluded to safeguard stockist territories, pharmacy margins, and institutional trade boundaries.",
    },
    {
      num: "02",
      title: "Form 20B & 21B Drug Licences",
      meta: "Statutory Governance",
      description:
        `Wholesale operations are formally authorized by the Tamil Nadu Drugs Control Department under Form 20B (${companyData.licences[0].number}) and Form 21B (${companyData.licences[1].number}).`,
    },
    {
      num: "03",
      title: "Statewide Distribution Logistics",
      meta: "Statewide Supply",
      description:
        "Headquartered in Chennai, our logistics network coordinates timely formulation dispatches to licensed retail chemists, hospital pharmacies, and regional PCD franchise partners across Tamil Nadu.",
    },
    {
      num: "04",
      title: "Compliant Batch Invoicing",
      meta: "Statutory Records",
      description:
        `Every consignment is supported by compliant GST invoicing (GSTIN: ${companyData.gstin}) and manufacturer Certificates of Analysis (COA) confirming release specifications and active ingredient standards.`,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Editorial Header & Manifesto Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Bold Editorial Narrative (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn direction="up">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-forest-800">
                Institutional Profile
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08] text-balance">
                Built on Statutory Discipline &amp; Channel Integrity.
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <div className="space-y-4 text-base text-slate-600 leading-relaxed pt-2">
                <p>
                  <strong className="text-slate-900 font-semibold">{companyData.legalName}</strong> is a registered partnership pharmaceutical enterprise established on {companyData.establishedDate}. Operating from Chennai, we serve as an institutional wholesale partner for licensed pharmacies, clinical hospitals, and regional healthcare distributors.
                </p>
                <p>
                  Our commercial model is intentionally structured: we bridge certified pharmaceutical manufacturing facilities with frontline healthcare institutions across Tamil Nadu—delivering verified formulations with full regulatory transparency.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-forest-900 hover:text-brand-teal-700 transition-colors group"
                >
                  <span>Read Corporate Profile</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Architectural Ledger / Non-card layout (7 cols) */}
          <div className="lg:col-span-7">
            <div className="border-t border-slate-200">
              {commitments.map((item, idx) => (
                <FadeIn key={item.num} direction="up" delay={0.08 * (idx + 1)}>
                  <div className="py-7 border-b border-slate-200 group hover:bg-slate-50/70 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-xl transition-colors duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline">

                      {/* Numeral + Tag */}
                      <div className="sm:col-span-4 flex sm:flex-col justify-between sm:justify-start gap-1">
                        <span className="font-mono text-xl sm:text-2xl font-black text-brand-forest-900/70 group-hover:text-brand-forest-800 transition-colors">
                          {item.num}
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                          {item.meta}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="sm:col-span-8">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-forest-900 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Micro-statement banner */}
            <div className="mt-8 flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-brand-forest-700 shrink-0" />
              <span>
                Zero direct-to-patient retail dispensing. All commercial inquiries require active Form 20B/21B wholesale credentials.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
