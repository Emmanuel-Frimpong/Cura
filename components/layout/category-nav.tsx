import React from "react";

export const CategoryNav: React.FC = () => {
  const categories = [
    { label: "SNEAKERS", hasDropdown: true },
    { label: "SHIRTS & APPAREL", hasDropdown: true },
    { label: "WRIST WATCHES", hasDropdown: true },
    { label: "SPECTACLES & EYEWEAR", hasDropdown: true },
    { label: "ACCESSORIES", hasDropdown: false },
  ];

  return (
    <div className="bg-[#F8F8F8] border-b border-[#E0E0E0] hidden sm:block">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-[46px] flex items-center justify-center gap-8 lg:gap-12">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 text-[12px] font-extrabold tracking-wider text-[#232323] hover:text-[#676767] cursor-pointer transition-colors"
          >
            <span>{cat.label}</span>
            {cat.hasDropdown && (
              <svg className="w-3 h-3 text-[#676767]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
