import React from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { companyData } from "@/data/company";
import { MapPin, Truck, Building2, ArrowRight, CheckCircle2 } from "lucide-react";

export function TerritorySection() {
  const regions = [
    {
      zone: "ZONE 01",
      region: "Northern & Chennai Metropolitan",
      keyDistricts: "Chennai, Tiruvallur, Kanchipuram, Chengalpattu, Vellore, Ranipet, Tirupattur",
      hub: "Direct Dispatch from Chennai Logistics Hub",
      focus: "Metropolitan Supply",
    },
    {
      zone: "ZONE 02",
      region: "Western Industrial & Kongu Region",
      keyDistricts: "Coimbatore, Tiruppur, Salem, Erode, Namakkal, Dharmapuri, Krishnagiri, The Nilgiris",
      hub: "Dedicated Regional Freight Corridors",
      focus: "High Formulation Demand",
    },
    {
      zone: "ZONE 03",
      region: "Central & Cauvery Delta Belt",
      keyDistricts: "Tiruchirappalli, Thanjavur, Cuddalore, Villupuram, Kallakurichi, Mayiladuthurai, Nagapattinam, Tiruvarur, Perambalur, Ariyalur, Karur, Pudukkottai",
      hub: "Scheduled Pharma Distribution Routes",
      focus: "Networked Regional Supply",
    },
    {
      zone: "ZONE 04",
      region: "Southern Commercial Belt",
      keyDistricts: "Madurai, Dindigul, Theni, Virudhunagar, Sivaganga, Ramanathapuram, Tirunelveli, Thoothukudi, Tenkasi, Kanniyakumari",
      hub: "Regional Logistics Supply Network",
      focus: "PCD Territory Openings",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6 border-b border-slate-200 pb-8">
          <div>
            <FadeIn direction="up">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-forest-800">
                Logistics &amp; Operational Reach
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
                Statewide Distribution Across Tamil Nadu
              </h2>
              <p className="mt-3 text-base text-slate-600 max-w-2xl leading-relaxed">
                Headquartered in Chennai, {companyData.tradeName} coordinates timely formulation dispatches to licensed wholesale stockists, hospital pharmacies, and PCD franchise partners throughout Tamil Nadu.
              </p>
            </FadeIn>
          </div>

          <FadeIn direction="up" delay={0.1}>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
              <span className="text-slate-900 font-bold block">Central Logistics Hub</span>
              <span>Kodungaiyur, Chennai – 600118</span>
            </div>
          </FadeIn>
        </div>

        {/* 4 Regional Corridors (Architectural Distribution Matrix with Hairline Dividers) */}
        <div className="border-t border-b border-slate-200 divide-y md:divide-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:divide-x divide-slate-200 mb-12">
          {regions.map((zone, idx) => (
            <FadeIn key={zone.zone} direction="up" delay={0.08 * (idx + 1)}>
              <div className="py-8 px-6 lg:px-7 h-full flex flex-col justify-between group hover:bg-slate-50/60 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-brand-forest-900 tracking-wider">
                      {zone.zone}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-brand-forest-800 font-semibold">
                      {zone.focus}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 group-hover:text-brand-forest-900 transition-colors">
                    {zone.region}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    <strong className="text-slate-800 font-semibold block text-[11px] font-mono uppercase tracking-wider mb-1">
                      Districts Covered:
                    </strong>
                    {zone.keyDistricts}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Truck className="w-3.5 h-3.5 text-brand-forest-700 shrink-0" />
                  <span className="text-[11px]">{zone.hub}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Territory Allocation Notice */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-brand-forest-800 shrink-0" />
            <span>
              Distributor agreements and formulation allocations are assigned on a district-by-district basis subject to document verification.
            </span>
          </div>

          <Button
            href="/business-enquiry"
            variant="outline"
            size="sm"
            className="border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-semibold px-4 py-2 text-xs shrink-0"
          >
            Check Territory Availability
          </Button>
        </div>

      </div>
    </section>
  );
}
