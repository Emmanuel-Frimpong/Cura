import React from "react";
import { Button } from "@/components/ui/button";

export const PromoBanner: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-[#E0E0E0]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="bg-[#121212] text-white rounded-[24px] p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl relative overflow-hidden">
          {/* Subtle Ambient Lighting */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F0B47A]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text */}
          <div className="lg:col-span-5 space-y-4 relative z-10">
            <span className="text-[11px] font-bold text-[#F0B47A] uppercase tracking-widest font-mono">
              JUST IN TIME FOR
            </span>
            <h2 className="font-heebo text-[36px] sm:text-[48px] font-extrabold leading-none tracking-tight uppercase">
              SUMMER SALE
            </h2>
            <p className="text-[14px] text-[#A0A0A0] leading-relaxed max-w-md">
              Step into refreshed style. Up to{" "}
              <strong className="text-[#F0B47A] font-bold">40% off</strong> on
              selected signature sneakers, linen shirts, and optical frames.
            </p>
            <div className="pt-2">
              <Button
                variant="secondary"
                className="bg-white text-[#121212] border-none font-bold hover:bg-[#F8F8F8] h-[46px] px-8"
              >
                Shop the Sale &rarr;
              </Button>
            </div>
          </div>

          {/* Center Image */}
          <div className="lg:col-span-4 relative z-10">
            <div className="rounded-[16px] overflow-hidden border border-white/10 shadow-lg">
              <img
                src="https://res.cloudinary.com/ovwiwt64/image/upload/v1789939419/cura/media/jlcvwvmt6uwyzp9ydnah.jpg"
                alt="Summer Sale Banner"
                className="w-full h-[220px] object-cover"
              />
            </div>
          </div>

          {/* Right Huge Discount Callout */}
          <div className="lg:col-span-3 text-center lg:text-right relative z-10">
            <div className="font-heebo text-[64px] sm:text-[80px] font-extrabold text-[#F0B47A] leading-none tracking-tight">
              40%
            </div>
            <div className="text-[24px] font-bold tracking-widest uppercase text-white -mt-2">
              OFF
            </div>
            <p className="text-[11px] text-[#A0A0A0] mt-2 font-mono">
              Applied automatically at checkout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
