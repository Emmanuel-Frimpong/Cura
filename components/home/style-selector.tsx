import React from "react";

export const StyleSelector: React.FC = () => {
  const styles = [
    { title: "Running", image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg" },
    { title: "Lifestyle", image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg" },
    { title: "Basketball", image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg" },
    { title: "Training", image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg" },
    { title: "Skateboarding", image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg" },
    { title: "Athletic", image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg" },
    { title: "Boots", image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg" },
  ];

  return (
    <section className="py-12 bg-[#F8F8F8] border-b border-[#E0E0E0]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heebo text-[24px] sm:text-[28px] font-bold text-[#232323] tracking-tight uppercase">
              SHOP BY FOOTWEAR STYLE
            </h2>
            <p className="text-[13px] text-[#676767]">
              Explore current footwear trends tailored to your preference.
            </p>
          </div>
          <a
            href="#"
            className="text-[12px] font-bold text-[#232323] hover:underline uppercase tracking-wider"
          >
            ALL STYLES &rarr;
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {styles.map((style, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E0E0E0] rounded-[14px] p-3 flex flex-col items-center text-center group cursor-pointer hover:border-[#232323] transition-all shadow-2xs hover:shadow-md"
            >
              <div className="w-full h-[90px] rounded-[8px] bg-[#F4F4F4] overflow-hidden mb-2 flex items-center justify-center">
                <img
                  src={style.image}
                  alt={style.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[13px] font-bold text-[#232323]">
                {style.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
