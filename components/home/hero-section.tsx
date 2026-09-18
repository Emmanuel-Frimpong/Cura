import React from "react";
import { Button } from "@/components/ui/button";

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-[#F2F2F2] border-b border-[#E0E0E0] pt-10 pb-12 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E0E0E0] rounded-full text-[11px] font-bold text-[#676767] uppercase tracking-wider shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#232323]" />
            2026 CURATED COLLECTION
          </div>

          <h1 className="font-heebo text-[48px] sm:text-[60px] lg:text-[72px] font-extrabold text-[#232323] leading-[0.95] tracking-tight uppercase">
            STEP INTO <br />
            GREATNESS
          </h1>

          <p className="text-[15px] sm:text-[16px] text-[#676767] max-w-lg leading-relaxed font-sans">
            Discover authentic branded shoes, precision timepieces, and premium
            lifestyle essentials crafted for every step of your journey.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button variant="primary" className="h-[48px] px-8 text-[14px]">
              Shop Now &rarr;
            </Button>
            <Button variant="secondary" className="h-[48px] px-8 text-[14px]">
              Explore Brands
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E0E0E0]/80">
            <div>
              <div className="font-heebo text-[28px] sm:text-[34px] font-extrabold text-[#232323] leading-none">
                50K+
              </div>
              <div className="text-[12px] text-[#A0A0A0] mt-1 font-medium">
                Orders Delivered
              </div>
            </div>
            <div>
              <div className="font-heebo text-[28px] sm:text-[34px] font-extrabold text-[#232323] leading-none">
                100%
              </div>
              <div className="text-[12px] text-[#A0A0A0] mt-1 font-medium">
                Authenticity
              </div>
            </div>
            <div>
              <div className="font-heebo text-[28px] sm:text-[34px] font-extrabold text-[#232323] leading-none">
                4.9 &#9733;
              </div>
              <div className="text-[12px] text-[#A0A0A0] mt-1 font-medium">
                User Rating
              </div>
            </div>
          </div>
        </div>

        {/* Right Product Graphic Card */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-[24px] overflow-hidden border border-[#E0E0E0] bg-white shadow-xl">
            <img
              src="/images/hero_preview.jpg"
              alt="Air Jordan 1 Retro High OG"
              className="w-full h-auto object-cover max-h-[520px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
