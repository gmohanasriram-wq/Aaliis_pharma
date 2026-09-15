import React from "react";
import Link from "next/link";
import { ArrowLeft, Package, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/90">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-forest-800">
            404 • Resource Not Found
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
            Formulation or Page Record Not Located
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
            The requested pharmaceutical formulation monograph or page route does not exist in our active commercial directory, or may have been relocated under our updated product taxonomy.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/products" variant="primary" size="md" className="w-full sm:w-auto">
            <Package className="w-4 h-4 mr-2 inline" />
            <span>Explore Formulations Catalogue</span>
          </Button>
          <Button href="/" variant="outline" size="md" className="w-full sm:w-auto">
            <Home className="w-4 h-4 mr-2 inline" />
            <span>Return to Homepage</span>
          </Button>
        </div>

        <div className="pt-6 border-t border-slate-200/80 text-xs text-slate-500 font-mono">
          <span>Looking for PCD Franchise or Institutional Procurement? </span>
          <Link
            href="/business-enquiry"
            className="text-brand-forest-800 font-semibold hover:underline inline-flex items-center gap-1 ml-1"
          >
            <span>Submit a Commercial Enquiry</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

