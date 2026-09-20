import React from "react";

export const CollectionsGrid: React.FC = () => {
  const collections = [
    { title: "STREETWEAR", count: "247 ITEMS", image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg" },
    { title: "FORMAL", count: "132 ITEMS", image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939419/cura/media/jlcvwvmt6uwyzp9ydnah.jpg" },
    { title: "CASUAL", count: "489 ITEMS", image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg" },
    { title: "SPORTS", count: "310 ITEMS", image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg" },
    { title: "LUXURY", count: "95 ITEMS", image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/fhsosrlqavdxqwy0gppx.jpg" },
    { title: "SUMMER '26", count: "84 ITEMS", image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939421/cura/media/ttmav1ptoigprqbeprlv.jpg" },
  ];

  return (
    <section className="py-16 bg-[#F8F8F8] border-b border-[#E0E0E0]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-widest font-mono">
              CURATED WARDROBE
            </span>
            <h2 className="font-heebo text-[32px] sm:text-[36px] font-extrabold text-[#232323] tracking-tight uppercase">
              SHOP BY COLLECTION
            </h2>
          </div>
          <a
            href="#"
            className="text-[12px] font-bold text-[#232323] hover:underline uppercase tracking-wider"
          >
            ALL COLLECTIONS &rarr;
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {collections.map((col, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E0E0E0] rounded-[16px] overflow-hidden group cursor-pointer hover:border-[#232323] hover:shadow-md transition-all flex flex-col"
            >
              <div className="w-full h-[140px] bg-[#EFEFEF] overflow-hidden">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center space-y-0.5">
                <h3 className="font-heebo text-[15px] font-bold text-[#232323] uppercase">
                  {col.title}
                </h3>
                <span className="text-[10px] font-semibold text-[#A0A0A0] block">
                  {col.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
