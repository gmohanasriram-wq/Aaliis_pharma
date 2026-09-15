import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { productsData, getProductBySlug, getAllProductSlugs } from "@/data/products";
import { manufacturersData } from "@/data/manufacturers";
import { Button } from "@/components/ui/button";
import {
  Package,
  Pill,
  Thermometer,
  AlertTriangle,
  ArrowLeft,
  FileText,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.brand_name} (${product.dosage_form})`,
    description: `${product.brand_name} - ${product.generic_composition}. Marketed by Aaliis Pharmaceuticals for wholesale & PCD distribution across Tamil Nadu.`,
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title: `${product.brand_name} (${product.dosage_form}) | Aaliis Pharmaceuticals`,
      description: `${product.brand_name} - ${product.generic_composition}. Licensed wholesale & PCD pharma distribution.`,
      url: `/products/${slug}`,
      siteName: "Aaliis Pharmaceuticals",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: product.product_image,
          width: 600,
          height: 600,
          alt: `${product.brand_name} (${product.dosage_form}) packaging - ${product.generic_composition}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.brand_name} (${product.dosage_form}) | Aaliis Pharmaceuticals`,
      description: `${product.brand_name} - ${product.generic_composition}`,
      images: [product.product_image],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const manufacturer = product.manufacturer_reference
    ? manufacturersData.find((m) => m.id === product.manufacturer_reference)
    : undefined;

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen border-b border-slate-200/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Breadcrumb Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link href="/" className="hover:text-brand-forest-800 transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-brand-forest-800 transition-colors">
              PRODUCTS
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-900 uppercase">{product.brand_name}</span>
          </nav>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-600 hover:text-brand-forest-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Formulations Portfolio</span>
          </Link>
        </div>

        {/* Monograph Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Authentic Packaging Display */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-slate-200/90 bg-[#F9FAFB] p-8 sm:p-10 flex flex-col items-center justify-center relative shadow-xs">
              <div className="relative w-full aspect-square max-w-[320px] flex items-center justify-center">
                <Image
                  src={product.product_image}
                  alt={`${product.brand_name} (${product.dosage_form}) pharmaceutical packaging - ${product.generic_composition}`}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
              </div>
            </div>
            <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 text-[11px] font-mono text-slate-500 leading-relaxed text-center">
              COMMERCIAL PACK DISPENSING MONOGRAPH • FOR HEALTHCARE PROFESSIONALS &amp; LICENSED TRADE
            </div>
          </div>

          {/* Right Column: Formulation Specifications & Governance */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-brand-forest-50 text-brand-forest-800 border border-brand-forest-200">
                  {product.category}
                </span>
                {product.prescription_status && (
                  <span
                    className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${product.prescription_status.includes("Schedule H")
                      ? "bg-amber-50 text-amber-900 border-amber-300"
                      : "bg-slate-100 text-slate-800 border-slate-200"
                      }`}
                  >
                    {product.prescription_status}
                  </span>
                )}
                {product.classification && (
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-50 text-slate-600 border border-slate-200">
                    {product.classification}
                  </span>
                )}
              </div>

              {/* Monograph Title */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                  {product.brand_name}
                </h1>
                <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  {product.generic_composition}
                </p>
              </div>

              {/* Data Conflict / Regulatory Discrepancy Note */}
              {product.data_conflicts && product.data_conflicts.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 text-xs text-amber-900 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider font-mono text-[11px]">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <span>Regulatory Governance: Discrepancy Preserved</span>
                  </div>
                  {product.data_conflicts.map((note, idx) => (
                    <p key={idx} className="text-amber-800 leading-relaxed">
                      {note}
                    </p>
                  ))}
                </div>
              )}

              {/* Specifications Ledger */}
              <div className="border-t border-b border-slate-200 py-4 grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                    <Pill className="w-4 h-4 text-brand-forest-800" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                      Dosage Form
                    </span>
                    <span className="font-semibold text-slate-900 text-sm">
                      {product.dosage_form}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                    <Package className="w-4 h-4 text-brand-forest-800" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                      Pack Presentation
                    </span>
                    <span className="font-semibold text-slate-900 text-sm">
                      {product.pack_size}
                    </span>
                  </div>
                </div>

                {product.colour && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4 text-brand-forest-800" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                        Approved Colour
                      </span>
                      <span className="font-semibold text-slate-900 text-sm">
                        {product.colour}
                      </span>
                    </div>
                  </div>
                )}

                {product.storage && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                      <Thermometer className="w-4 h-4 text-brand-forest-800" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                        Storage Conditions
                      </span>
                      <span className="font-semibold text-slate-900 text-sm">
                        {product.storage}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Active Composition Breakdown */}
              {product.composition_items && product.composition_items.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-forest-800">
                    Active Formulation Ingredients
                  </h2>
                  <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                    {product.composition_items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center px-4 py-3 bg-white even:bg-slate-50/70 border-b border-slate-100 last:border-b-0"
                      >
                        <span className="font-semibold text-slate-900">
                          {item.ingredient}
                        </span>
                        {item.strength && (
                          <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80">
                            {item.strength}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Commercial Governance & Marketer Dossier */}
              <div className="space-y-3 pt-2">
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-forest-800">
                  Commercial Marketer &amp; Sourcing Record
                </h2>
                <div className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/60 space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-mono uppercase text-[11px]">Sole Marketer</span>
                    <span className="font-bold text-slate-900 text-sm">
                      {product.marketed_by}
                    </span>
                  </div>

                  {manufacturer && (
                    <div className="flex justify-between items-center pt-3 border-t border-slate-200/80">
                      <span className="text-slate-500 font-mono uppercase text-[11px]">Manufacturing Facility</span>
                      <div className="text-right">
                        <span className="font-semibold text-slate-900 block">
                          {manufacturer.name}
                        </span>
                        {manufacturer.quality_reliability_assessment && (
                          <span className="text-[10px] font-mono font-semibold text-brand-forest-800 bg-brand-forest-50 border border-brand-forest-200 px-1.5 py-0.5 rounded mt-0.5 inline-block">
                            {manufacturer.quality_reliability_assessment} Reliability
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {product.source_notes && (
                    <div className="pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
                      <span className="font-semibold text-slate-700 font-mono uppercase">Master Record: </span>
                      {product.source_notes}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* B2B Commercial Actions */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-4">
              <Button
                href={`/business-enquiry?product=${encodeURIComponent(
                  product.brand_name
                )}`}
                variant="primary"
                size="md"
                className="flex-1 min-w-[220px]"
              >
                <span>Enquire for PCD Distribution</span>
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="md"
              >
                Contact Business Desk
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
