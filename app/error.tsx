"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, Package, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error securely to internal diagnostic console
    if (process.env.NODE_ENV !== "production") {
      console.error("Application Render Exception:", error);
    }
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/90">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-600">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-red-700">
            Runtime Exception Encountered
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
            An Unexpected System Error Occurred
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
            The application encountered a transient processing error while rendering this view. You may attempt to recover this session or navigate directly to our verified directories.
          </p>
          {error.digest && (
            <p className="mt-2 text-[11px] font-mono text-slate-400">
              Reference ID: {error.digest}
            </p>
          )}
        </div>

        {/* Broad Recovery Options */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-forest-800 hover:bg-brand-forest-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Button href="/products" variant="outline" size="md">
            <Package className="w-4 h-4 mr-1.5 inline" />
            <span>Formulations Catalogue</span>
          </Button>
          <Button href="/" variant="outline" size="md">
            <Home className="w-4 h-4 mr-1.5 inline" />
            <span>Homepage</span>
          </Button>
        </div>

        <div className="pt-6 border-t border-slate-200/80 text-xs text-slate-500 font-mono flex items-center justify-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-slate-400" />
          <span>Require immediate dispatch assistance? </span>
          <Link
            href="/contact"
            className="text-brand-forest-800 font-semibold hover:underline"
          >
            Contact Commercial Desk
          </Link>
        </div>
      </div>
    </div>
  );
}

