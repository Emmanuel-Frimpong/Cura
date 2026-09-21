"use client";

import React, { useState } from "react";
import { CategoryData } from "@/lib/category-data";

interface CategoryFilterSidebarProps {
  category: CategoryData;
  onFilterChange?: () => void;
}

export const CategoryFilterSidebar: React.FC<CategoryFilterSidebarProps> = ({
  category,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("10");
  const [selectedPricePreset, setSelectedPricePreset] = useState<string>("$100 - $200");
  const [minPrice, setMinPrice] = useState<string>("0");
  const [maxPrice, setMaxPrice] = useState<string>("250");
  const [selectedRating, setSelectedRating] = useState<string>("4.0");

  const [selectedSilhouettes, setSelectedSilhouettes] = useState<string[]>([
    category.silhouettes[0]?.name || "",
    category.silhouettes[1]?.name || "",
    category.silhouettes[2]?.name || "",
  ]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([
    category.brands[0]?.name || "",
    category.brands[1]?.name || "",
    category.brands[2]?.name || "",
  ]);

  const toggleSilhouette = (name: string) => {
    setSelectedSilhouettes((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const toggleBrand = (name: string) => {
    setSelectedBrands((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleReset = () => {
    setSelectedSize("10");
    setSelectedPricePreset("$100 - $200");
    setMinPrice("0");
    setMaxPrice("250");
    setSelectedRating("4.0");
    setSelectedSilhouettes([]);
    setSelectedBrands([]);
  };

  return (
    <aside className="w-full bg-white border border-[#E0E0E0] rounded-[16px] p-5 space-y-6 text-[#232323] shadow-xs">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E0E0E0]">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#232323]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <h3 className="font-heebo text-[15px] font-bold tracking-tight uppercase">
            REFINE CATALOG
          </h3>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-[11px] font-bold text-[#A0A0A0] hover:text-[#232323] uppercase tracking-wider transition-colors cursor-pointer"
        >
          RESET
        </button>
      </div>

      {/* 1. SILHOUETTE & FUNCTION */}
      <div className="space-y-3">
        <h4 className="text-[12px] font-bold text-[#232323] uppercase tracking-wider">
          SILHOUETTE & FUNCTION
        </h4>
        <div className="space-y-2 text-[13px]">
          {category.silhouettes.map((item) => {
            const isChecked = selectedSilhouettes.includes(item.name);
            return (
              <label
                key={item.name}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSilhouette(item.name)}
                    className="w-4 h-4 accent-[#232323] rounded-[4px] cursor-pointer"
                  />
                  <span
                    className={`transition-colors ${
                      isChecked ? "font-bold text-[#232323]" : "text-[#676767] group-hover:text-[#232323]"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#A0A0A0]">{item.count}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[#E0E0E0]" />

      {/* 2. PRICE INTERVAL */}
      <div className="space-y-3">
        <h4 className="text-[12px] font-bold text-[#232323] uppercase tracking-wider">
          PRICE INTERVAL
        </h4>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center bg-[#F8F8F8] border border-[#E0E0E0] rounded-[8px] px-2 py-1.5 text-[12px]">
            <span className="text-[#A0A0A0] mr-1">GH₵</span>
            <input
              type="text"
              aria-label="Minimum price interval"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-[#232323] font-mono"
            />
          </div>
          <span className="text-[#A0A0A0] text-[12px]">to</span>
          <div className="flex-1 flex items-center bg-[#F8F8F8] border border-[#E0E0E0] rounded-[8px] px-2 py-1.5 text-[12px]">
            <span className="text-[#A0A0A0] mr-1">GH₵</span>
            <input
              type="text"
              aria-label="Maximum price interval"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-[#232323] font-mono"
            />
          </div>
        </div>

        {/* Preset Pills */}
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          {["Under GH₵100", "GH₵100 - GH₵200", "GH₵200+"].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setSelectedPricePreset(preset)}
              className={`py-1.5 rounded-[6px] text-[10px] sm:text-[11px] font-bold text-center transition-all cursor-pointer ${
                selectedPricePreset === preset || (selectedPricePreset.includes("100") && preset.includes("100"))
                  ? "bg-[#232323] text-white shadow-xs"
                  : "bg-[#F4F4F4] text-[#676767] border border-[#E0E0E0] hover:border-[#232323]"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E0E0E0]" />

      {/* 3. SIZES */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[12px] font-bold text-[#232323] uppercase tracking-wider">
            US MEN SIZE
          </h4>
          <span className="text-[11px] text-[#A0A0A0] underline cursor-pointer hover:text-[#232323]">
            Sizing Atelier
          </span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {category.sizes.map((sz) => (
            <button
              key={sz}
              type="button"
              aria-pressed={selectedSize === sz}
              onClick={() => setSelectedSize(sz)}
              className={`h-[34px] rounded-[6px] text-[12px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                selectedSize === sz
                  ? "bg-[#232323] text-white shadow-xs"
                  : "bg-white text-[#232323] border border-[#E0E0E0] hover:border-[#232323]"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E0E0E0]" />

      {/* 4. COLOR SPECTRUM */}
      <div className="space-y-3">
        <h4 className="text-[12px] font-bold text-[#232323] uppercase tracking-wider">
          COLOR SPECTRUM
        </h4>
        <div className="flex items-center gap-2.5 flex-wrap">
          {category.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              aria-label={`Filter color ${c.name}`}
              className="w-7 h-7 rounded-full border border-[#E0E0E0] shadow-2xs hover:scale-110 transition-transform cursor-pointer relative flex items-center justify-center"
              style={{ backgroundColor: c.hex }}
            >
              {c.name === "White" && (
                <span className="w-full h-full rounded-full border border-[#D0D0D0]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E0E0E0]" />

      {/* 5. BRAND & HOUSE */}
      <div className="space-y-3">
        <h4 className="text-[12px] font-bold text-[#232323] uppercase tracking-wider">
          BRAND & HOUSE
        </h4>
        <div className="space-y-2 text-[13px]">
          {category.brands.map((b) => {
            const isChecked = selectedBrands.includes(b.name);
            return (
              <label
                key={b.name}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleBrand(b.name)}
                    className="w-4 h-4 accent-[#232323] rounded-[4px] cursor-pointer"
                  />
                  <span
                    className={`transition-colors ${
                      isChecked ? "font-bold text-[#232323]" : "text-[#676767] group-hover:text-[#232323]"
                    }`}
                  >
                    {b.name}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#A0A0A0]">{b.count}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[#E0E0E0]" />

      {/* 6. VERIFICATION RATING */}
      <div className="space-y-3">
        <h4 className="text-[12px] font-bold text-[#232323] uppercase tracking-wider">
          VERIFICATION RATING
        </h4>
        <div className="space-y-2 text-[13px]">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={selectedRating === "4.0"}
              onChange={() => setSelectedRating("4.0")}
              className="w-4 h-4 accent-[#232323] cursor-pointer"
            />
            <span className="flex items-center gap-1 text-[#232323] font-medium">
              <span className="text-amber-500">★★★★☆</span> 4.0 & Above
            </span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={selectedRating === "5.0"}
              onChange={() => setSelectedRating("5.0")}
              className="w-4 h-4 accent-[#232323] cursor-pointer"
            />
            <span className="flex items-center gap-1 text-[#232323] font-medium">
              <span className="text-amber-500">★★★★★</span> 5.0 Only
            </span>
          </label>
        </div>
      </div>

      <div className="border-t border-[#E0E0E0]" />

      {/* Extra Toggles */}
      <div className="space-y-2 text-[12px] text-[#676767]">
        <label className="flex items-center justify-between cursor-pointer">
          <span>Sale & Archival Reductions</span>
          <input type="checkbox" className="w-4 h-4 accent-[#232323] cursor-pointer" />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span>Fast Regional Delivery</span>
          <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#232323] cursor-pointer" />
        </label>
      </div>
    </aside>
  );
};
