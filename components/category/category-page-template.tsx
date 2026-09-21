"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CategoryData } from "@/lib/category-data";
import { CategoryHero } from "./category-hero";
import { CategoryToolbar } from "./category-toolbar";
import { CategoryFilterSidebar } from "./category-filter-sidebar";
import { CategoryProductGrid } from "./category-product-grid";

export interface CategoryPageTemplateProps {
  categoryData: CategoryData;
}

export const CategoryPageTemplate: React.FC<CategoryPageTemplateProps> = ({
  categoryData,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSubClassification, setActiveSubClassification] = useState<string>(
    categoryData.subClassifications[0]?.name || "All Products"
  );
  const [activeFilters, setActiveFilters] = useState<string[]>([
    `Category: ${categoryData.name}`,
    "In Stock Only",
    `Size: US ${categoryData.sizes[5] || "10"}`,
  ]);

  const handleRemoveFilter = (filterToRemove: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filterToRemove));
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#1E1E1E]">
      {/* Top Breadcrumb Navigation */}
      <div className="bg-[#EFEFEF] border-b border-[#E0E0E0] py-2.5 px-4 lg:px-8 text-[12px] font-mono text-[#666] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[#111] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#111] transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-[#111] font-semibold uppercase tracking-wider">
            {categoryData.name}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#777]">
          <span>Architecture Silhouette Archive</span>
          <span>•</span>
          <span>Spring/Summer &apos;26 Edition</span>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Hero Card Banner */}
        <CategoryHero category={categoryData} />

        {/* Toolbar & Filter Bar */}
        <CategoryToolbar
          category={categoryData}
          activeSubClassification={activeSubClassification}
          onSubClassificationChange={setActiveSubClassification}
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAllFilters={handleClearAllFilters}
          totalProductsCount={categoryData.products.length}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />

        {/* Main Grid: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {isSidebarOpen && (
            <aside className="lg:col-span-3 transition-all duration-300">
              <CategoryFilterSidebar category={categoryData} />
            </aside>
          )}

          <div
            className={`${
              isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"
            } transition-all duration-300`}
          >
            <CategoryProductGrid
              products={categoryData.products}
              categoryName={categoryData.name}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
