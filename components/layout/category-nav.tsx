"use client";

import React, { useState } from "react";
import Link from "next/link";

interface SubCategory {
  name: string;
  href: string;
}

interface CategoryItem {
  label: string;
  hasDropdown: boolean;
  href: string;
  subcategories?: SubCategory[];
}

export const CategoryNav: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories: CategoryItem[] = [
    {
      label: "SNEAKERS",
      hasDropdown: true,
      href: "/shop/sneakers",
      subcategories: [
        { name: "Running Sneakers", href: "/shop/sneakers" },
        { name: "Lifestyle & Casual", href: "/shop/sneakers" },
        { name: "Basketball Shoes", href: "/shop/sneakers" },
        { name: "Training & Gym", href: "/shop/sneakers" },
      ],
    },
    {
      label: "SHIRTS & APPAREL",
      hasDropdown: true,
      href: "/shop/shirts",
      subcategories: [
        { name: "Graphic T-Shirts", href: "/shop/shirts" },
        { name: "Oversized Shirts", href: "/shop/shirts" },
        { name: "Casual Button-Downs", href: "/shop/shirts" },
        { name: "Polos & Basics", href: "/shop/shirts" },
      ],
    },
    {
      label: "WRIST WATCHES",
      hasDropdown: true,
      href: "/shop/watches",
      subcategories: [
        { name: "Luxury Chronographs", href: "/shop/watches" },
        { name: "Automatic Timepieces", href: "/shop/watches" },
        { name: "Sport & Diver Watches", href: "/shop/watches" },
        { name: "Minimalist Quartz", href: "/shop/watches" },
      ],
    },
    {
      label: "SPECTACLES & EYEWEAR",
      hasDropdown: true,
      href: "/shop/spectacles",
      subcategories: [
        { name: "Polarized Sunglasses", href: "/shop/spectacles" },
        { name: "Optical Frames", href: "/shop/spectacles" },
        { name: "Blue Light Blocking", href: "/shop/spectacles" },
      ],
    },
    {
      label: "ACCESSORIES",
      hasDropdown: false,
      href: "/shop/spectacles",
    },
  ];

  return (
    <div className="bg-[#F8F8F8] border-b border-[#E0E0E0] hidden sm:block relative z-30">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-[46px] flex items-center justify-center gap-8 lg:gap-12">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="relative"
            onMouseEnter={() => setOpenIndex(idx)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            {cat.hasDropdown ? (
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
                aria-haspopup="true"
                className="flex items-center gap-1.5 text-[12px] font-extrabold tracking-wider text-[#232323] hover:text-[#676767] cursor-pointer transition-colors focus:outline-none"
              >
                <Link href={cat.href} className="hover:underline">
                  {cat.label}
                </Link>
                <svg
                  className={`w-3 h-3 text-[#676767] transition-transform duration-200 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : (
              <Link
                href={cat.href}
                className="flex items-center gap-1.5 text-[12px] font-extrabold tracking-wider text-[#232323] hover:text-[#676767] cursor-pointer transition-colors"
              >
                <span>{cat.label}</span>
              </Link>
            )}

            {cat.hasDropdown && cat.subcategories && openIndex === idx && (
              <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-[#E0E0E0] rounded-[8px] shadow-lg py-2 z-50">
                {cat.subcategories.map((sub, sIdx) => (
                  <Link
                    key={sIdx}
                    href={sub.href}
                    className="block px-4 py-2 text-[13px] text-[#232323] hover:bg-[#F4F4F4] transition-colors"
                    onClick={() => setOpenIndex(null)}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

