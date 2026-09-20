import React from "react";
import { ReviewCard } from "@/components/ui/card";

export const CommunityReviews: React.FC = () => {
  const reviews = [
    {
      name: "Marcus T.",
      rating: 5,
      comment:
        "The Air Jordan 4 Retro arrived in mint original condition with verified authentication tags. Fast shipping too! Will definitely buy my next pair from CURA.",
    },
    {
      name: "Sophia L.",
      rating: 5,
      comment:
        "I ordered the classic linen shirt and luxury watch box. Quality is outstanding and fits true to size. Customer support was incredibly helpful!",
    },
    {
      name: "David K.",
      rating: 5,
      comment:
        "Fast 2-day delivery for a pair of sunglasses. These acetate frames feel durable and optical clarity is top tier. 10/10 shopping experience!",
    },
  ];

  return (
    <section className="py-16 bg-[#F8F8F8] border-b border-[#E0E0E0]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-widest font-mono">
            HOW WE MAKE YOU FEEL
          </span>
          <h2 className="font-heebo text-[32px] sm:text-[40px] font-extrabold text-[#232323] tracking-tight uppercase">
            LOVED BY OUR COMMUNITY
          </h2>
          <p className="text-[14px] text-[#676767]">
            Over 50,000 satisfied shoppers worldwide trust Our products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <ReviewCard
              key={idx}
              reviewerName={rev.name}
              rating={rev.rating}
              comment={rev.comment}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
