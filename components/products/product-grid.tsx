"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product, PRODUCT_CATEGORIES, ProductCategory } from "@/types";
import { ProductCard } from "@/components/products/product-card";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { Search, Filter, X } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  showFilters?: boolean;
  maxItems?: number;
}

export function ProductGrid({
  products,
  showFilters = true,
  maxItems,
}: ProductGridProps) {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category")?.trim() || "";

  // Validate URL category parameter against canonical taxonomy
  const matchedCategory = useMemo(() => {
    if (!categoryQuery) return "All";
    const found = PRODUCT_CATEGORIES.find(
      (c) => c.toLowerCase() === categoryQuery.toLowerCase()
    );
    return found || "All";
  }, [categoryQuery]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(matchedCategory);

  // Sync state if URL search params change
  useEffect(() => {
    setSelectedCategory(matchedCategory);
  }, [matchedCategory]);

  const categories = useMemo(() => {
    return ["All", ...PRODUCT_CATEGORIES];
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (category === "All") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", category);
      }
      window.history.replaceState(null, "", url.toString());
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchesSearch =
        p.brand_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.generic_composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.dosage_form.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (maxItems) {
      list = list.slice(0, maxItems);
    }

    return list;
  }, [products, searchQuery, selectedCategory, maxItems]);

  return (
    <div className="space-y-6">
      {/* Search & Category Filter Controls */}
      {showFilters && (
        <div className="space-y-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Accessible Search Input */}
            <div className="relative flex-1 max-w-lg">
              <label htmlFor="catalogue-search-input" className="sr-only">
                Search formulations by brand name, active composition, or dosage form
              </label>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                id="catalogue-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulations, compositions, or forms..."
                aria-label="Search formulations by brand name, active composition, or dosage form"
                className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:border-transparent text-slate-900 placeholder:text-slate-500 bg-slate-50/50 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 p-0.5"
                  aria-label="Clear search input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results Count Summary */}
            <div className="text-xs font-mono font-medium text-slate-600 shrink-0 self-center md:self-auto">
              Displaying <span className="font-bold text-slate-900">{filteredProducts.length}</span> of{" "}
              {products.length} formulations
            </div>
          </div>

          {/* Canonical Category Filter Pills */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 shrink-0 mr-1 hidden sm:flex">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Category:</span>
            </div>
            <div
              role="tablist"
              aria-label="Filter products by therapeutic category"
              className="flex items-center gap-1.5 flex-nowrap"
            >
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategorySelect(category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest-800 focus-visible:ring-offset-1 ${isActive
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm font-semibold"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border-slate-200/80"
                      }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-3">
          <p className="text-sm font-bold text-slate-800">
            No pharmaceutical formulations found.
          </p>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Try adjusting your search keywords or switch the category filter to &ldquo;All&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              handleCategorySelect("All");
            }}
            className="mt-2 inline-flex items-center px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerChildren={0.05}
        >
          {filteredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
