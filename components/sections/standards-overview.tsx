import React from "react";
import Link from "next/link";
import { manufacturersData } from "@/data/manufacturers";
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle, CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

interface StandardsOverviewProps {
  limit?: number;
}

export function StandardsOverview({ limit }: StandardsOverviewProps = {}) {
  const verifiedPartners = manufacturersData.filter(
    (m) => m.verification_status === "verified"
  );

  const displayedPartners = limit
    ? verifiedPartners.slice(0, limit)
    : verifiedPartners;

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <FadeIn direction="up">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-forest-800">
              Manufacturing Infrastructure
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08] text-balance">
              Qualified Manufacturing Facilities &amp; Standards
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Aaliis Pharmaceuticals works with qualified pharmaceutical manufacturing partners selected with attention to GMP compliance, quality-management systems, regulatory documentation, and manufacturing capability. The details below reflect documented licences and declarations maintained in our records.
            </p>
          </FadeIn>
        </div>

        {/* Partner Facilities Grid (Editorial Dossier Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedPartners.map((partner, idx) => (
            <FadeIn key={partner.id} direction="up" delay={0.08 * (idx + 1)}>
              <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
                <div>
                  {/* Top row: Name & Assessment */}
                  <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-forest-800">
                        Licensed Facility
                      </span>
                      <h3 className="font-bold text-slate-900 text-lg mt-0.5">
                        {partner.name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                      {partner.quality_reliability_assessment} Reliability
                    </span>
                  </div>

                  {/* Documentation Checklist */}
                  <div className="space-y-2.5 text-xs text-slate-600 mb-5">
                    {partner.manufacturing_licence && (
                      <div className="flex items-start gap-2">
                        <FileText className="w-3.5 h-3.5 text-brand-forest-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-800 font-medium">Drug Licence: </strong>
                          <span className="font-mono text-[11px] text-slate-700 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/70">
                            {partner.manufacturing_licence}
                          </span>
                        </div>
                      </div>
                    )}
                    {partner.who_gmp_gmp_status && (
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-forest-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-800 font-medium">GMP Status: </strong>
                          <span className="text-slate-600">{partner.who_gmp_gmp_status}</span>
                        </div>
                      </div>
                    )}
                    {partner.iso_certifications && (
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-forest-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-800 font-medium">ISO Standard: </strong>
                          <span className="text-slate-600">{partner.iso_certifications}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {/* Capabilities tags */}
                  {partner.manufacturing_capabilities && (
                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider block mb-1.5 font-medium">
                        Dosage Capabilities
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {partner.manufacturing_capabilities.slice(0, 4).map((cap) => (
                          <span
                            key={cap}
                            className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                      <CheckCircle className="w-3 h-3 text-brand-forest-700" />
                      Documented Facility
                    </span>
                    <span className="font-mono text-slate-600 font-medium">REF-{partner.id.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Note on separate dataset & B2B channel integrity (Master data rule) */}
        <FadeIn direction="up" delay={0.2}>
          <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-3.5 text-xs text-slate-600">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Manufacturing partners are evaluated using documented quality and regulatory records. Manufacturer contact coordinates are held strictly internal to protect B2B distribution integrity and customer relationship confidentiality. All commercial formulations are marketed and invoiced by Aaliis Pharmaceuticals.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
