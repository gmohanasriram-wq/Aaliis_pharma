"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { companyData } from "@/data/company";
import { ArrowRight } from "lucide-react";

/**
 * Minimalist Ruled Horizontal Index Ledger Items
 * Strictly using verified operational facts (Form 20B/21B, Tamil Nadu distribution, 19 formulations)
 */
const ledgerItems = [
  {
    id: "01",
    title: "WHOLESALE DISTRIBUTION",
    subtitle: "Form 20B & 21B Licensed",
    href: "#company-intro",
  },
  {
    id: "02",
    title: "TAMIL NADU OPERATIONS",
    subtitle: "Serving Pharmacies, Hospitals & Distributors",
    href: "#territory",
  },
  {
    id: "03",
    title: "PRODUCT PORTFOLIO",
    subtitle: "19 Formulations",
    href: "#products",
  },
];

export function Hero() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Mouse Parallax for packaging stage & fluid ribbon (calm, intentional, restrained amplitude)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 45, stiffness: 60, mass: 1.0 };
  const smoothPackX = useSpring(mouseX, springConfig);
  const smoothPackY = useSpring(mouseY, springConfig);

  const ribbonSpringConfig = { damping: 50, stiffness: 40, mass: 1.2 };
  const ribbonX = useSpring(mouseX, ribbonSpringConfig);
  const ribbonY = useSpring(mouseY, ribbonSpringConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
    // Calibrated subtle amplitude (5px max) for calm, intentional motion
    mouseX.set(xRatio * 5);
    mouseY.set(yRatio * 5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-4 sm:py-6 lg:py-8 px-3 sm:px-6 lg:px-8 max-w-[1520px] mx-auto overflow-hidden"
    >
      {/* ARCHITECTURAL LUXURY VIEWPORT CONTAINER */}
      <div className="relative rounded-[22px] xs:rounded-[26px] sm:rounded-[32px] lg:rounded-[38px] border border-slate-200/85 bg-[#F6F8FA] shadow-[0_20px_50px_-15px_rgba(2,74,68,0.05)] overflow-hidden p-5 xs:p-7 sm:p-9 lg:p-11 xl:p-12">

        {/* Hairline Architectural Grid Pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#024A44_1px,transparent_1px),linear-gradient(to_bottom,#024A44_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_50%,transparent_100%)] opacity-[0.025]"
        />

        {/* Atmospheric Ambient Depth Radiance (Soft, restrained background depth) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 sm:-top-32 right-0 sm:right-[-5%] h-[280px] w-[280px] sm:h-[500px] sm:w-[500px] rounded-full bg-gradient-to-br from-brand-forest-400/10 via-brand-cyan-400/6 to-transparent blur-[80px] sm:blur-[140px] max-w-full"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 sm:left-[-8%] h-[260px] w-[260px] sm:h-[450px] sm:w-[450px] rounded-full bg-gradient-to-tr from-brand-teal-400/8 via-brand-cyan-300/5 to-transparent blur-[70px] sm:blur-[130px] max-w-full"
        />

        {/* Monumental Watermark Typography across lower canvas */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 w-full select-none opacity-[0.025] overflow-hidden text-center z-0"
        >
          <span className="text-[14vw] font-black uppercase tracking-[0.16em] text-slate-900 leading-none whitespace-nowrap block">
            AALIIS
          </span>
        </div>

        {/* SCULPTURAL 3D FLUID RIBBON ELEMENT (Atmospheric Background Art-Direction) */}
        <motion.div
          style={prefersReduced ? {} : { x: ribbonX, y: ribbonY }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden opacity-20 sm:opacity-25"
        >
          <svg
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover select-none pointer-events-none overflow-hidden"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Refined Ribbon Body Gradient (Softer Aaliis green/teal/cyan palette) */}
              <linearGradient
                id="ribbonMainGrad"
                x1="1400"
                y1="20"
                x2="200"
                y2="860"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#02749D" stopOpacity="0.55" />
                <stop offset="30%" stopColor="#0D9488" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#0F766E" stopOpacity="0.60" />
                <stop offset="85%" stopColor="#024A44" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#004D2D" stopOpacity="0.70" />
              </linearGradient>

              {/* Secondary Loop Gradient */}
              <linearGradient
                id="ribbonLoopGrad"
                x1="1200"
                y1="180"
                x2="500"
                y2="650"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#02749D" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#0D9488" stopOpacity="0.50" />
                <stop offset="100%" stopColor="#01472A" stopOpacity="0.50" />
              </linearGradient>

              {/* Deep Twisted Fold Gradient */}
              <linearGradient
                id="ribbonFoldGrad"
                x1="1000"
                y1="240"
                x2="720"
                y2="520"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#01241E" stopOpacity="0.60" />
                <stop offset="50%" stopColor="#024A44" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#004D2D" stopOpacity="0.60" />
              </linearGradient>

              {/* Soft Specular Highlights */}
              <linearGradient
                id="specularGleam"
                x1="1300"
                y1="40"
                x2="350"
                y2="780"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
                <stop offset="40%" stopColor="#CCFBF1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Back Twisted Fold (Inner twist in 3D depth) */}
            <path
              d="M 1080, 240 C 960, 330 870, 430 790, 510 C 750, 460 780, 390 850, 320 C 920, 250 1010, 190 1080, 240 Z"
              fill="url(#ribbonFoldGrad)"
              opacity="0.45"
            />

            {/* Secondary Inner Ribbon Body */}
            <path
              d="M 1380, 10 C 1230, 170 1040, 310 860, 450 C 690, 580 520, 680 340, 760 C 170, 830 50, 860 -60, 870 L -60, 790 C 40, 780 150, 750 310, 680 C 470, 600 630, 500 790, 380 C 970, 240 1150, 110 1310, -40 Z"
              fill="url(#ribbonLoopGrad)"
              opacity="0.25"
            />

            {/* Main Sweeping 3D Fluid Ribbon Band */}
            <path
              d="M 1430, -30 C 1280, 130 1080, 280 890, 420 C 710, 550 540, 660 350, 740 C 180, 810 50, 845 -80, 860 L -80, 760 C 40, 745 160, 710 320, 640 C 490, 560 640, 450 810, 330 C 990, 190 1180, 60 1340, -90 Z"
              fill="url(#ribbonMainGrad)"
              opacity="0.45"
            />

            {/* Striated Architectural Fluting Lines (Subtle atmospheric micro-ridges) */}
            <path
              d="M 1410, -20 C 1265, 135 1070, 282 880, 422 C 700, 552 530, 662 342, 742 C 172, 812 42, 847 -85, 862"
              stroke="url(#specularGleam)"
              strokeWidth="1.2"
              opacity="0.40"
            />
            <path
              d="M 1395, -10 C 1250, 145 1055, 292 865, 432 C 685, 562 515, 672 328, 752 C 160, 820 32, 852 -95, 866"
              stroke="#F0F9FF"
              strokeWidth="1.0"
              opacity="0.30"
            />
            <path
              d="M 1380, 0 C 1235, 155 1040, 302 850, 442 C 670, 572 500, 682 314, 762 C 148, 828 22, 857 -105, 870"
              stroke="#BAE6FD"
              strokeWidth="1.0"
              opacity="0.25"
            />
            <path
              d="M 1365, 10 C 1220, 165 1025, 312 835, 452 C 655, 582 485, 692 300, 772 C 136, 836 12, 862 -115, 874"
              stroke="#7DD3FC"
              strokeWidth="1.0"
              opacity="0.25"
            />
            <path
              d="M 1350, 20 C 1205, 175 1010, 322 820, 462 C 640, 592 470, 702 286, 782 C 124, 844 2, 867 -125, 878"
              stroke="#0D9488"
              strokeWidth="1.0"
              opacity="0.25"
            />
            <path
              d="M 1335, 30 C 1190, 185 995, 332 805, 472 C 625, 602 455, 712 272, 792 C 112, 852 -8, 872 -135, 882"
              stroke="#0F766E"
              strokeWidth="1.0"
              opacity="0.25"
            />
            <path
              d="M 1320, 40 C 1175, 195 980, 342 790, 482 C 610, 612 440, 722 258, 802 C 100, 860 -18, 877 -145, 886"
              stroke="#024A44"
              strokeWidth="1.0"
              opacity="0.25"
            />

            {/* Specular Outer Crest Highlight */}
            <path
              d="M 1430, -30 C 1280, 130 1080, 280 890, 420 C 710, 550 540, 660 350, 740 C 180, 810 50, 845 -80, 860"
              stroke="url(#specularGleam)"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.40"
            />
          </svg>
        </motion.div>

        {/* INNER CONTENT LAYER */}
        <div className="relative z-10">

          {/* TOP MINIMAL STATUTORY COORDINATES BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-200/70 text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-500 uppercase">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-brand-forest-950">AALIIS PHARMACEUTICALS</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-600 font-medium">B2B PCD &amp; WHOLESALE DISTRIBUTION</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-600 font-medium">TAMIL NADU</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-600 font-medium">
              <span>FORM 20B &amp; 21B LICENSED TN/205/20B/00848</span>
              <span className="text-slate-300">•</span>
              <span>GSTIN: {companyData.gstin}</span>
            </div>
          </div>

          {/* MAIN ART-DIRECTED GRID COMPOSITION */}
          <div className="mt-7 sm:mt-9 lg:mt-11 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">

            {/* LEFT COLUMN: Typographic Hero & Editorial Value Proposition (Spans 7 columns on desktop) */}
            <div className="lg:col-span-7 flex flex-col justify-between z-10">
              <div>
                {/* Technical Annotation Index Element */}
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-forest-800">
                    PORTFOLIO INDEX / 19 FORMULATIONS
                  </span>
                  <span className="h-px w-8 bg-slate-300" aria-hidden="true" />
                  <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-widest hidden xs:inline">
                    WHOLESALE &amp; PCD DISTRIBUTION
                  </span>
                </div>

                {/* Primary Brand Statement (Dominant visual anchor, natural responsive wrapping) */}
                <h1 className="text-[2rem] xs:text-[2.5rem] sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.5rem] font-black tracking-tight text-slate-900 leading-[1.02] text-balance">
                  <span className="block text-slate-900">BUILT TO MOVE</span>
                  <span className="block text-brand-forest-900">
                    <span className="block sm:inline">HEALTHCARE </span>
                    <span className="block sm:inline">FORWARD.</span>
                  </span>
                </h1>

                {/* Secondary Business Description — Factual B2B Positioning */}
                <p className="mt-4 sm:mt-5 text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.12em] text-slate-700">
                  <span>B2B PCD &amp; Wholesale Distribution</span>
                  <span className="block sm:inline sm:before:content-['•'] sm:before:mx-2 text-slate-500">Across Tamil Nadu</span>
                </p>

                {/* Editorial Subtitle with Disciplined Scope */}
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                  {companyData.legalName} is an authorized B2B wholesale pharmaceutical distributor operating across Tamil Nadu under Form 20B and 21B licences. We supply 19 verified commercial formulations strictly to registered pharmacies, hospitals, and licensed distributors—maintaining disciplined institutional supply with zero retail operations.
                </p>

                {/* Primary & Secondary Actions (Clean, dignified CTAs) */}
                <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Button
                    href="/products"
                    variant="primary"
                    size="lg"
                    className="bg-brand-forest-900 hover:bg-brand-forest-800 text-white px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wide shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 rounded-xl group"
                  >
                    <span>Explore 19 Formulations</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    href="/business-enquiry"
                    variant="outline"
                    size="lg"
                    className="border-slate-300 bg-white/80 hover:bg-white text-slate-800 hover:border-slate-400 px-5 py-3.5 text-xs sm:text-sm font-semibold transition-all rounded-xl shadow-2xs"
                  >
                    Business Enquiry
                  </Button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: MAXYCOD Product Packaging Showcase & Ruled Ledger (Spans 5 columns on desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6 sm:gap-8 z-10 w-full min-w-0">

              {/* ARCHITECTURAL PHYSICAL PACKAGING STAGE */}
              <div className="relative w-full flex flex-col items-center justify-center pt-1 sm:pt-2">
                {/* Packshot Image with Subtle Spatial Parallax (Authentic MAXYCOD packshot) */}
                <motion.div
                  style={prefersReduced ? {} : { x: smoothPackX, y: smoothPackY }}
                  className="relative w-full flex items-center justify-center pointer-events-none"
                >
                  <Image
                    src="/images/products/maxycod.webp"
                    alt="Aaliis MAXYCOD Packaging - Pure Fish Oil Concentrate (EPA 360 mg + DHA 240 mg)"
                    width={1200}
                    height={675}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 480px"
                    priority
                    className="w-full h-auto max-w-[420px] sm:max-w-[460px] object-contain select-none filter drop-shadow-[0_12px_24px_rgba(2,74,68,0.06)]"
                  />
                </motion.div>

                {/* Grounding Contact Shadows (Natural contact perspective beneath packaging) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none -mt-4 sm:-mt-6 flex flex-col items-center w-full"
                >
                  {/* Tight base contact occlusion shadow */}
                  <div className="h-2 w-3/4 max-w-[280px] rounded-[100%] bg-slate-950/25 blur-[2px]" />
                  {/* Soft diffused ambient contact shadow */}
                  <div className="-mt-1 h-5 w-5/6 max-w-[360px] rounded-[100%] bg-slate-900/10 blur-md" />
                </div>

                {/* Integrated Editorial Technical Specification Caption */}
                <div className="mt-4 sm:mt-5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900 tracking-wider">
                      MAXYCOD<sup className="text-[9px] font-semibold text-slate-500">®</sup>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono text-[11px] text-slate-600 font-medium">
                      Pure Fish Oil Concentrate
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-slate-600 mt-0.5 tracking-wide font-medium">
                    EPA 360 mg + DHA 240 mg • 10 × 1 × 10 Softgels
                  </p>
                </div>
              </div>

              {/* MINIMALIST RULED ARCHITECTURAL INFORMATION LEDGER (Editorial precision, verified facts only) */}
              <div className="w-full pt-4 sm:pt-5 border-t border-slate-200/80">
                <div className="flex items-center justify-between pb-2 mb-0.5 border-b border-slate-200/60">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-600">
                    Institutional Specification
                  </span>
                  <span className="text-[10px] font-mono text-slate-600 tracking-wider font-medium">
                    INDEX 01—03
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {ledgerItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group flex items-baseline justify-between py-2.5 sm:py-3 px-1 transition-colors hover:text-brand-forest-900"
                    >
                      <div className="flex flex-col gap-0.5 min-w-0 pr-4">
                        <span className="font-mono text-xs font-bold tracking-tight text-slate-900 group-hover:text-brand-forest-900 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-xs text-slate-600 font-medium group-hover:text-slate-800 transition-colors">
                          {item.subtitle}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-semibold text-slate-600 group-hover:text-brand-forest-700 transition-colors shrink-0">
                        /{item.id}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
