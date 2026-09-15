"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { companyData } from "@/data/company";
import { Button } from "@/components/ui/button";
import { BusinessType } from "@/types";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  Pill,
  X,
  Loader2,
  RotateCcw,
  AlertCircle,
} from "lucide-react";

export function BusinessEnquiryForm() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product")?.trim() || "";

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>(productParam);
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});

  const [formData, setFormData] = useState({
    name: "",
    company_or_pharmacy_name: "",
    phone: "",
    email: "",
    city: "",
    district: "",
    business_type: "Distributor" as BusinessType,
    products_interested_in: productParam ? [productParam] : ([] as string[]),
    message: productParam
      ? `We are interested in commercial B2B procurement / PCD franchise supply terms for ${productParam}. Please share the wholesale rate list and dispatch schedule.`
      : "",
    hp_company_url: "",
  });

  useEffect(() => {
    if (productParam) {
      setSelectedProduct(productParam);
      setFormData((prev) => ({
        ...prev,
        products_interested_in: [productParam],
        message: prev.message || `We are interested in commercial B2B procurement / PCD franchise supply terms for ${productParam}. Please share the wholesale rate list and dispatch schedule.`,
      }));
    }
  }, [productParam]);

  const handleClearProduct = () => {
    setSelectedProduct("");
    setFormData((prev) => ({
      ...prev,
      products_interested_in: [],
    }));
  };

  const normalizePhone = (phoneStr: string): string => {
    // Strip whitespace, hyphens, parentheses, plus signs
    let cleaned = phoneStr.replace(/[\s\-\(\)\+]/g, "");
    // If starting with 91 and has 12 digits, strip country code for standard validation
    if (cleaned.startsWith("91") && cleaned.length === 12) {
      cleaned = cleaned.slice(2);
    } else if (cleaned.startsWith("0") && cleaned.length === 11) {
      cleaned = cleaned.slice(1);
    }
    return cleaned;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { phone?: string; email?: string } = {};

    // Normalize phone and validate at least 10 valid digits
    const normalizedPhone = normalizePhone(formData.phone);
    if (!/^\d{10,15}$/.test(normalizedPhone)) {
      newErrors.phone = "Please enter a valid telephone or mobile number with at least 10 digits.";
    }

    // Validate email syntax
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid commercial email address (e.g. name@company.com).";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (newErrors.phone) {
        document.getElementById("enquiry-phone")?.focus();
      } else if (newErrors.email) {
        document.getElementById("enquiry-email")?.focus();
      }
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        setSubmitted(false);
        setSubmitError(
          data.message ||
          "Unable to submit your enquiry right now. Please call +91 8072051898 or email aaliispharma2025@gmail.com."
        );
      }
    } catch {
      setSubmitted(false);
      setSubmitError(
        "Unable to submit your enquiry right now. Please call +91 8072051898 or email aaliispharma2025@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-8 sm:p-10 text-center space-y-5">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
        <h3 className="text-xl font-bold text-emerald-950">
          Commercial Enquiry Received
        </h3>
        <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
          Thank you for your commercial interest. Our Regional Business Management team will review your business credentials and contact you within 24 business hours.
        </p>
        <div className="pt-4 border-t border-emerald-200/60 flex flex-wrap justify-center gap-6 text-xs text-emerald-900 font-mono">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            {companyData.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-emerald-700" />
            {companyData.email}
          </span>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setSubmitError(null);
              setErrors({});
              setSelectedProduct("");
              setFormData({
                name: "",
                company_or_pharmacy_name: "",
                phone: "",
                email: "",
                city: "",
                district: "",
                business_type: "Distributor",
                products_interested_in: [],
                message: "",
                hp_company_url: "",
              });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-emerald-300 text-xs font-semibold text-emerald-900 hover:bg-emerald-100/60 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Submit Another Commercial Enquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {/* Honeypot spam defense field - hidden from genuine users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp_company_url">Company Web Address</label>
        <input
          type="text"
          id="hp_company_url"
          name="hp_company_url"
          value={formData.hp_company_url}
          onChange={(e) =>
            setFormData({ ...formData, hp_company_url: e.target.value })
          }
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Selected Product Context Banner */}
      {selectedProduct && (
        <div className="rounded-xl bg-brand-forest-50 border border-brand-forest-200/80 p-4 flex items-center justify-between gap-4 transition-all">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-forest-800 text-white shrink-0">
              <Pill className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-forest-800 block">
                Target Formulation Selected
              </span>
              <p className="text-sm font-bold text-slate-900">
                {selectedProduct}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClearProduct}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-md transition-colors"
            aria-label="Remove preselected formulation"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="enquiry-name"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
          >
            Full Name <span className="text-red-600" aria-hidden="true">*</span><span className="sr-only">(required)</span>
          </label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            required
            aria-required="true"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="e.g. Dr. / Mr. / Ms. Kumar"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-teal-500 focus:outline-none focus:ring-1 focus:ring-brand-teal-500"
          />
        </div>

        <div>
          <label
            htmlFor="enquiry-company-name"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
          >
            Company / Pharmacy Name <span className="text-red-600" aria-hidden="true">*</span><span className="sr-only">(required)</span>
          </label>
          <input
            id="enquiry-company-name"
            name="company_or_pharmacy_name"
            type="text"
            required
            aria-required="true"
            value={formData.company_or_pharmacy_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                company_or_pharmacy_name: e.target.value,
              })
            }
            placeholder="e.g. Sree Pharma Distributors"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-teal-500 focus:outline-none focus:ring-1 focus:ring-brand-teal-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="enquiry-phone"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
          >
            Contact Phone <span className="text-red-600" aria-hidden="true">*</span><span className="sr-only">(required)</span>
          </label>
          <input
            id="enquiry-phone"
            name="phone"
            type="tel"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            placeholder="+91 98765 43210"
            className={cn(
              "w-full rounded-lg border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 transition-colors",
              errors.phone
                ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/20"
                : "border-slate-300 focus:border-brand-teal-500 focus:ring-brand-teal-500"
            )}
          />
          {errors.phone && (
            <p id="enquiry-phone-error" role="alert" className="text-xs text-red-600 mt-1.5 font-medium">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="enquiry-email"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
          >
            Email Address <span className="text-red-600" aria-hidden="true">*</span><span className="sr-only">(required)</span>
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="business@example.com"
            className={cn(
              "w-full rounded-lg border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 transition-colors",
              errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/20"
                : "border-slate-300 focus:border-brand-teal-500 focus:ring-brand-teal-500"
            )}
          />
          {errors.email && (
            <p id="enquiry-email-error" role="alert" className="text-xs text-red-600 mt-1.5 font-medium">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="enquiry-city"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
          >
            City / Town <span className="text-red-600" aria-hidden="true">*</span><span className="sr-only">(required)</span>
          </label>
          <input
            id="enquiry-city"
            name="city"
            type="text"
            required
            aria-required="true"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
            placeholder="e.g. Madurai"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-teal-500 focus:outline-none focus:ring-1 focus:ring-brand-teal-500"
          />
        </div>

        <div>
          <label
            htmlFor="enquiry-district"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
          >
            District (Tamil Nadu) <span className="text-red-600" aria-hidden="true">*</span><span className="sr-only">(required)</span>
          </label>
          <input
            id="enquiry-district"
            name="district"
            type="text"
            required
            aria-required="true"
            value={formData.district}
            onChange={(e) =>
              setFormData({ ...formData, district: e.target.value })
            }
            placeholder="e.g. Madurai District"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-teal-500 focus:outline-none focus:ring-1 focus:ring-brand-teal-500"
          />
        </div>

        <div>
          <label
            htmlFor="enquiry-business-type"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
          >
            Business Entity Type <span className="text-red-600" aria-hidden="true">*</span><span className="sr-only">(required)</span>
          </label>
          <select
            id="enquiry-business-type"
            name="business_type"
            required
            aria-required="true"
            value={formData.business_type}
            onChange={(e) =>
              setFormData({
                ...formData,
                business_type: e.target.value as BusinessType,
              })
            }
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-teal-500 focus:outline-none focus:ring-1 focus:ring-brand-teal-500 bg-white"
          >
            <option value="Distributor">Distributor / Stockist</option>
            <option value="Pharmacy">Retail / Wholesale Pharmacy</option>
            <option value="Hospital">Hospital / Clinical Institution</option>
            <option value="Other healthcare business">
              Other Healthcare Business
            </option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="enquiry-message"
          className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
        >
          Commercial Message or Target Formulations
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Provide details about your distribution network, target territory, or requested formulations..."
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-teal-500 focus:outline-none focus:ring-1 focus:ring-brand-teal-500"
        />
      </div>

      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
        <ShieldCheck className="w-4 h-4 text-brand-teal-600 shrink-0 mt-0.5" />
        <span>
          By submitting this enquiry, you confirm representing a registered healthcare institution, licensed pharmacy, or wholesale distributor with valid regulatory credentials.
        </span>
      </div>

      {submitError && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-xl bg-red-50 border border-red-200/90 p-4 sm:p-5 text-sm text-red-900 space-y-2"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-red-950">Submission Could Not Be Completed</p>
              <p className="text-xs sm:text-sm text-red-800 leading-relaxed">{submitError}</p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-red-900">
                <a
                  href={`tel:${companyData.phone.replace(/[\s\-\(\)]/g, "")}`}
                  className="inline-flex items-center gap-1.5 underline hover:text-red-700"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call {companyData.phone}
                </a>
                <a
                  href={`mailto:${companyData.email}?subject=Direct%20Commercial%20Enquiry`}
                  className="inline-flex items-center gap-1.5 underline hover:text-red-700"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email {companyData.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto min-w-[220px]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            <span>Processing Enquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            <span>Submit Commercial Enquiry</span>
          </>
        )}
      </Button>
    </form>
  );
}

