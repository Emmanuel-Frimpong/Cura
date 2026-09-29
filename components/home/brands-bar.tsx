import React from "react";

export interface BrandsBarProps {
  brands?: string[];
}

export const BrandsBar: React.FC<BrandsBarProps> = ({ brands: initialBrands }) => {
  const brands =
    initialBrands && initialBrands.length > 0
      ? initialBrands
      : ["NIKE", "JORDAN", "NEW BALANCE", "SALOMON", "TIMECRAFT", "MOSCOT"];

  return (
    <div className="bg-white border-b border-[#E0E0E0] py-6">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 flex flex-wrap items-center justify-between gap-6">
        <span className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-widest shrink-0 font-mono">
          TOP BRANDS
        </span>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 flex-1">
          {brands.map((brand, idx) => (
            <span
              key={idx}
              className="font-oswald text-[20px] md:text-[24px] font-extrabold text-[#A0A0A0] hover:text-[#232323] transition-colors cursor-pointer tracking-wider uppercase"
            >
              {brand}
            </span>
          ))}
        </div>
        <a
          href="/shop"
          className="text-[12px] font-bold text-[#232323] hover:underline uppercase tracking-wider shrink-0"
        >
          VIEW ALL &rarr;
        </a>
      </div>
    </div>
  );
};
