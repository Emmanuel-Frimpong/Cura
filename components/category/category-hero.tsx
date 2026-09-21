import React from "react";
import { CategoryData } from "@/lib/category-data";

interface CategoryHeroProps {
  category: CategoryData;
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({ category }) => {
  return (
    <div className="bg-[#121212] text-white rounded-[20px] p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl relative overflow-hidden border border-[#232323]">
      {/* Background Ambient Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      {/* Left Content Column */}
      <div className="lg:col-span-7 space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#232323] border border-[#333333] rounded-full text-[10px] sm:text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          {category.tagline}
        </div>

        <h1 className="font-heebo text-[42px] sm:text-[56px] lg:text-[64px] font-extrabold leading-[0.95] tracking-tight uppercase text-white">
          {category.name}
        </h1>

        <p className="text-[13px] sm:text-[14px] text-[#A0A0A0] leading-relaxed max-w-xl font-sans">
          {category.description}
        </p>

        {/* Feature Callout Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-[#1A1A1A] border border-[#2B2B2B] rounded-[12px] p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#262626] flex items-center justify-center shrink-0 text-white text-xs">
              ✈
            </div>
            <div>
              <div className="text-[12px] font-bold text-white leading-snug">
                Worldwide Express Dispatch
              </div>
              <div className="text-[11px] text-[#888888]">
                Free over GH₵ 500 & 30-Day Atelier Return
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2B2B2B] rounded-[12px] p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#262626] flex items-center justify-center shrink-0 text-white text-xs">
              🛡
            </div>
            <div>
              <div className="text-[12px] font-bold text-white leading-snug">
                Footwear Guarantee
              </div>
              <div className="text-[11px] text-[#888888]">
                Custom fit concierge on standby
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Hero Product Card Showcase */}
      <div className="lg:col-span-5 relative z-10 flex justify-center lg:justify-end">
        <div className="relative w-full max-w-[420px] rounded-[18px] overflow-hidden border border-[#2B2B2B] bg-[#161616] shadow-2xl group">
          {/* Top Product Tag Overlay */}
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#121212] flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>{category.heroProductTitle}</span>
            <span className="text-[#666666]">•</span>
            <span className="font-extrabold">{category.heroProductPrice}</span>
          </div>

          {/* Hero Showcase Image */}
          <div className="w-full h-[280px] sm:h-[320px] bg-[#1A1A1A] overflow-hidden">
            <img
              src={category.heroImage}
              alt={category.heroProductTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Bottom Verification Rating Overlay */}
          <div className="absolute bottom-4 right-4 z-20 bg-[#121212]/90 backdrop-blur-md border border-[#333333] px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5 shadow-md">
            <span className="text-amber-400">★ 4.9</span>
            <span className="text-[#777777]">•</span>
            <span className="text-[#A0A0A0] font-mono">{category.heroVerifications}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
