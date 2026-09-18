import React from "react";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#181818] text-[#A0A0A0] text-[11px] font-sans py-2 px-4 border-b border-[#2A2A2A]">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left Contact */}
        <div className="flex items-center gap-4">
          <span>Support: +1 (800) 555-CURA</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Contact: support@cura.com</span>
        </div>

        {/* Center Announcement */}
        <div className="font-semibold text-white tracking-wide text-center">
          Free shipping on all orders over $150 | Easy 30-day hassle-free returns
        </div>

        {/* Right Links & Selectors */}
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white transition-colors">
            Track Order
          </a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">
            Stores
          </a>
          <span>|</span>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white">
            <span>EN / USD $</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
