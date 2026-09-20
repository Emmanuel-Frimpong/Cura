"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const BestSellers: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All Products");
  const [wishlistedIds, setWishlistedIds] = useState<number[]>([1, 3]);

  const tabs = ["All Products", "Sneakers", "Shirts", "Watches", "Eyewear"];

  const products = [
    {
      id: 1,
      category: "NIKE",
      type: "Sneakers",
      title: "Air Force 1 '07",
      variant: "Men's Shoes",
      price: "$115.00",
      rating: "4.9 (128)",
      saleBadge: "-15%",
      image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
    },
    {
      id: 2,
      category: "ADIDAS",
      type: "Sneakers",
      title: "Originals Superstar",
      variant: "Unisex Shoes",
      price: "$100.00",
      rating: "4.8 (94)",
      image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg",
    },
    {
      id: 3,
      category: "JORDAN",
      type: "Sneakers",
      title: "Air Jordan 4 Retro",
      variant: "Men's Footwear",
      price: "$210.00",
      rating: "5.0 (312)",
      saleBadge: "40% OFF",
      image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg",
    },
    {
      id: 4,
      category: "NEW BALANCE",
      type: "Sneakers",
      title: "New Balance 550",
      variant: "Athletic Running",
      price: "$120.00",
      rating: "4.7 (85)",
      image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
    },
    {
      id: 5,
      category: "CURA",
      type: "Shirts",
      title: "Men's Linen Shirt",
      variant: "White/Rustic Classic",
      price: "$75.00",
      rating: "4.9 (62)",
      image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939426/cura/media/vl8irhjorvfyn4o03ed5.jpg",
    },
    {
      id: 6,
      category: "HOROLOGY",
      type: "Watches",
      title: "Precision Automatic Watch",
      variant: "Silver/Steel",
      price: "$350.00",
      rating: "4.9 (48)",
      image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/fhsosrlqavdxqwy0gppx.jpg",
    },
    {
      id: 7,
      category: "OPTICS",
      type: "Eyewear",
      title: "Acetate Solar Frames",
      variant: "Classic Tortoise",
      price: "$145.00",
      rating: "4.8 (39)",
      image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939421/cura/media/ttmav1ptoigprqbeprlv.jpg",
    },
  ];

  const filteredProducts =
    activeTab === "All Products"
      ? products
      : products.filter((p) => p.type === activeTab);

  const toggleWishlist = (id: number) => {
    setWishlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 bg-[#F8F8F8] border-b border-[#E0E0E0]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 space-y-8">
        {/* Top Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-widest font-mono">
              POPULAR DEMANDS
            </span>
            <h2 className="font-heebo text-[32px] sm:text-[36px] font-extrabold text-[#232323] tracking-tight uppercase">
              BEST SELLERS
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-[8px] text-[13px] font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#232323] text-white shadow-xs"
                    : "bg-white text-[#676767] border border-[#E0E0E0] hover:border-[#232323]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {filteredProducts.map((p) => (
            <div key={p.id} className="relative">
              {p.saleBadge && (
                <div className="absolute top-3 left-3 z-10 bg-[#D84315] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-[4px] uppercase">
                  {p.saleBadge}
                </div>
              )}
              <ProductCard
                category={p.category}
                title={p.title}
                price={p.price}
                imageUrl={p.image}
                isWishlisted={wishlistedIds.includes(p.id)}
                onWishlistToggle={() => toggleWishlist(p.id)}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <Link href="/shop">
            <Button variant="secondary" className="px-8 h-[44px]">
              View All Best Sellers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
