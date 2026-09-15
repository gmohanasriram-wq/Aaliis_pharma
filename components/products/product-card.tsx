"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowRight, ChevronRight, Package, Pill } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isNeedsVerification = product.verification_status === "needs_verification";

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:border-brand-teal-400 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
      {/* Top badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="inline-block text-[11px] font-semibold text-brand-teal-800 bg-brand-teal-50 border border-brand-teal-200/80 px-2.5 py-0.5 rounded-full">
          {product.category}
        </span>

        {product.prescription_status && (
          <Badge
            variant={
              product.prescription_status.includes("Schedule H")
                ? "warning"
                : "outline"
            }
            className="text-[10px] font-semibold"
          >
            {product.prescription_status}
          </Badge>
        )}

        {product.classification && !product.prescription_status && (
          <span className="text-[10px] font-medium text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
            {product.classification.split("—")[0].trim()}
          </span>
        )}
      </div>

      {/* Product Image Container */}
      <div className="relative mb-4 flex h-48 sm:h-52 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-slate-50/80 to-white p-3 border border-slate-100 group-hover:border-slate-200 transition-colors">
        <div className="relative h-full w-full flex items-center justify-center transform transition-transform duration-300 ease-out group-hover:scale-105">
          <Image
            src={product.product_image}
            alt={`${product.brand_name} ${product.dosage_form} pharmaceutical packaging - ${product.category}`}
            width={320}
            height={220}
            className="h-full w-auto object-contain drop-shadow-sm group-hover:drop-shadow-md"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        </div>

        {isNeedsVerification && (
          <div className="absolute top-2.5 right-2.5 z-20 pointer-events-auto">
            <span
              title="Packaging verification pending from physical challan"
              className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-800 border border-amber-300"
            >
              <AlertCircle className="w-3 h-3 text-amber-600" />
              Verif. Pending
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-forest-900 transition-colors">
          <Link
            href={`/products/${product.slug}`}
            className="focus:outline-none"
            aria-label={`View formulation details for ${product.brand_name}`}
          >
            <span className="absolute inset-0 rounded-2xl" aria-hidden="true" />
            {product.brand_name}
          </Link>
        </h3>

        <p className="mt-1 text-xs font-medium text-slate-600 line-clamp-2 leading-relaxed">
          {product.generic_composition}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-medium text-slate-800">
            <Pill className="w-3.5 h-3.5 text-brand-forest-700" />
            <span className="truncate max-w-[120px]">{product.dosage_form}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Package className="w-3.5 h-3.5 text-slate-500" />
            <span className="truncate max-w-[100px]">{product.pack_size}</span>
          </div>
        </div>
      </div>

      {/* Hover Action Strip with Tactile Arrow Chip */}
      <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-50 pointer-events-none">
        <span className="text-xs font-bold text-brand-forest-800 flex items-center gap-1 group-hover:text-brand-teal-700 transition-colors">
          <span>View Formulation</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-600 font-semibold">B2B Supply</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 group-hover:bg-brand-forest-900 group-hover:text-white transition-colors shadow-sm">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
