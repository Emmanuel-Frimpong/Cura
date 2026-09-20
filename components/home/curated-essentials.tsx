import React from "react";
import Link from "next/link";

export const CuratedEssentials: React.FC = () => {
  const categories = [
    {
      label: "FOOTWEAR",
      title: "SNEAKERS",
      desc: "Icons & authentic kicks for everyday style, field, and street performance.",
      cta: "EXPLORE FOOTWEAR",
      href: "/shop?category=sneakers",
      image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
    },
    {
      label: "APPAREL",
      title: "SHIRTS & TEES",
      desc: "Clean luxury wardrobe essentials, linen shirts, graphic tees, and sleek tailoring.",
      cta: "EXPLORE SHIRTS",
      href: "/shop?category=shirts-apparel",
      image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939419/cura/media/jlcvwvmt6uwyzp9ydnah.jpg",
    },
    {
      label: "HOROLOGY",
      title: "WRIST WATCHES",
      desc: "Automatic chronographs, minimal everyday timepieces, and rare luxury wristwatches.",
      cta: "EXPLORE WATCHES",
      href: "/shop?category=wrist-watches",
      image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/fhsosrlqavdxqwy0gppx.jpg",
    },
    {
      label: "EYEWEAR",
      title: "SPECTACLES",
      desc: "Acetate optical frames and premium solar sunglasses engineered with maximum UV clarity.",
      cta: "EXPLORE SPECTACLES",
      href: "/shop?category=spectacles-eyewear",
      image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939421/cura/media/ttmav1ptoigprqbeprlv.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-[#E0E0E0]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-widest font-mono">
            INSIDE CURA LAB
          </span>
          <h2 className="font-heebo text-[32px] sm:text-[40px] font-extrabold text-[#232323] tracking-tight uppercase">
            CURATED ESSENTIALS
          </h2>
          <p className="text-[14px] text-[#676767] leading-relaxed">
            Engineered aesthetics spanning footwear, seasonal apparel, precision
            horology, and optics.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-[#F8F8F8] border border-[#E0E0E0] rounded-[18px] p-5 flex flex-col justify-between group hover:border-[#232323] hover:bg-white transition-all shadow-2xs hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="w-full h-[180px] rounded-[12px] overflow-hidden bg-[#EFEFEF]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">
                    {cat.label}
                  </span>
                  <h3 className="font-heebo text-[20px] font-bold text-[#232323]">
                    {cat.title}
                  </h3>
                  <p className="text-[13px] text-[#676767] leading-normal">
                    {cat.desc}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E0E0E0]/60 mt-4">
                <Link
                  href={cat.href}
                  className="text-[12px] font-bold text-[#232323] hover:underline uppercase tracking-wider flex items-center gap-1.5"
                >
                  {cat.cta} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
