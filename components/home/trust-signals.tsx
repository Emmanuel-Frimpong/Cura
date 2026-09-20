import React from "react";

export const TrustSignals: React.FC = () => {
  const items = [
    {
      title: "FREE SHIPPING",
      subtitle: "On all orders over $150",
      icon: (
        <svg className="w-6 h-6 text-[#232323]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
    },
    {
      title: "30-DAY RETURNS",
      subtitle: "Hassle-free 30-day return guarantee",
      icon: (
        <svg className="w-6 h-6 text-[#232323]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: "100% AUTHENTIC",
      subtitle: "Guaranteed genuine from brand source",
      icon: (
        <svg className="w-6 h-6 text-[#232323]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "SECURE CHECKOUT",
      subtitle: "256-bit SSL encrypted protection",
      icon: (
        <svg className="w-6 h-6 text-[#232323]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white border-b border-[#E0E0E0] py-8">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-[#F8F8F8] border border-[#E0E0E0] flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div>
              <h4 className="font-heebo text-[14px] font-bold text-[#232323] uppercase">
                {item.title}
              </h4>
              <p className="text-[12px] text-[#676767] mt-0.5">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
