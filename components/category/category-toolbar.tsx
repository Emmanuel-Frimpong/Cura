"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CategoryData } from "@/lib/category-data";

interface CategoryToolbarProps {
  category: CategoryData;
  activeSubClassification: string;
  onSubClassificationChange: (sub: string) => void;
  activeFilters?: string[];
  onRemoveFilter?: (filter: string) => void;
  onClearAllFilters?: () => void;
  totalProductsCount?: number;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export const CategoryToolbar: React.FC<CategoryToolbarProps> = ({
  category,
  activeSubClassification,
  onSubClassificationChange,
  activeFilters = ["Category: " + category.name, "In Stock Only", "Size: US 10"],
  onRemoveFilter,
  onClearAllFilters,
  totalProductsCount = 18,
  isSidebarOpen = true,
  onToggleSidebar,
}) => {
  const [sortOption, setSortOption] = useState("Featured Atelier");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-4 text-[#232323]">
      {/* Top Department Pill Bar */}
      <div className="bg-white border border-[#E0E0E0] rounded-[14px] p-2 flex items-center justify-between gap-4 flex-wrap shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto py-0.5 no-scrollbar">
          <span className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider font-mono shrink-0 pl-2">
            ATELIER DEPARTMENTS:
          </span>
          {category.departments.map((dept) => (
            <Link
              key={dept.slug}
              href={`/shop/${dept.slug}`}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                dept.active || category.slug === dept.slug
                  ? "bg-[#232323] text-white shadow-xs"
                  : "bg-[#F4F4F4] text-[#676767] border border-[#E0E0E0] hover:border-[#232323]"
              }`}
            >
              <span>{dept.name}</span>
              <span
                className={`text-[10px] font-mono rounded-full px-1.5 py-0.2 ${
                  dept.active || category.slug === dept.slug
                    ? "bg-white/20 text-white"
                    : "bg-[#E0E0E0] text-[#676767]"
                }`}
              >
                {dept.count}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 pr-2 text-[11px] text-[#676767] font-mono shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Atelier Stock: 18 Styles Live</span>
        </div>
      </div>

      {/* Sub-classification Tabs Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-[#E0E0E0] rounded-[14px] p-3 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto py-0.5">
          {category.subClassifications.map((sub) => {
            const isActive = activeSubClassification === sub.name;
            return (
              <button
                key={sub.name}
                type="button"
                onClick={() => onSubClassificationChange(sub.name)}
                className={`px-3.5 py-1.5 rounded-[8px] text-[12px] font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-[#232323] text-white shadow-xs"
                    : "bg-[#F8F8F8] text-[#676767] border border-[#E0E0E0] hover:border-[#232323]"
                }`}
              >
                <span>{sub.name}</span>
                <span className="text-[10px] opacity-75">({sub.count})</span>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] font-mono text-[#A0A0A0] shrink-0 pl-1">
          Sub-classification: Unisex Sizing Archive
        </div>
      </div>

      {/* Active Filters & Control Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2">
        {/* Left Toggle & Filter Tags */}
        <div className="flex items-center gap-3 flex-wrap text-[12px]">
          {/* Hamburger Refine Catalog Toggle Button */}
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-expanded={isSidebarOpen}
            className={`px-4 py-2 rounded-[10px] text-[12px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              isSidebarOpen
                ? "bg-[#232323] text-white border border-[#232323]"
                : "bg-white text-[#232323] border border-[#E0E0E0] hover:border-[#232323]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <span>{isSidebarOpen ? "Hide Filters" : "Filter Catalog"}</span>
          </button>

          <span className="font-bold text-[#A0A0A0] uppercase font-mono text-[11px]">
            ACTIVE FILTERS:
          </span>
          {activeFilters.map((fTag) => (
            <span
              key={fTag}
              className="bg-[#F4F4F4] border border-[#E0E0E0] rounded-full px-3 py-1 text-[11px] font-bold text-[#232323] flex items-center gap-1.5 shadow-2xs"
            >
              <span>{fTag}</span>
              <button
                type="button"
                onClick={() => onRemoveFilter?.(fTag)}
                className="text-[#999999] hover:text-[#232323] font-bold cursor-pointer"
              >
                ✕
              </button>
            </span>
          ))}

          <button
            type="button"
            onClick={onClearAllFilters}
            className="text-[11px] font-bold text-[#A0A0A0] hover:text-[#232323] underline cursor-pointer"
          >
            Clear all filters
          </button>

          <span className="text-[#A0A0A0] text-[12px] ml-2">
            Showing <strong className="text-[#232323]">1-8</strong> of {totalProductsCount} curated items
          </span>
        </div>

        {/* Sort & View Mode Controls */}
        <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
          <div className="flex items-center gap-2 text-[12px]">
            <span className="font-semibold text-[#676767]">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white border border-[#E0E0E0] rounded-[8px] px-3 py-1.5 text-[12px] font-bold text-[#232323] focus:outline-none focus:border-[#232323] cursor-pointer shadow-2xs"
            >
              <option value="Featured Atelier">Featured Atelier</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Newest Arrival">Newest Arrival</option>
            </select>
          </div>

          {/* Grid / List Mode Switcher */}
          <div className="flex items-center bg-[#F4F4F4] border border-[#E0E0E0] rounded-[8px] p-0.5">
            <button
              type="button"
              aria-label="Grid view mode"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-[6px] transition-colors cursor-pointer ${
                viewMode === "grid" ? "bg-white text-[#232323] shadow-xs" : "text-[#A0A0A0]"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="List view mode"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-[6px] transition-colors cursor-pointer ${
                viewMode === "list" ? "bg-white text-[#232323] shadow-xs" : "text-[#A0A0A0]"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
