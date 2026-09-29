"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BestSellerProduct } from "@/lib/services/products";
import { useStore } from "@/components/providers/store-provider";
import { handleImageError } from "@/components/ui/cura-image";

export interface BestSellersProps {
  initialProducts?: BestSellerProduct[];
}

export const BestSellers: React.FC<BestSellersProps> = ({ initialProducts }) => {
  const store = useStore();
  const [activeTab, setActiveTab] = useState("All Products");

  const tabs = ["All Products", "Sneakers", "Shirts", "Watches", "Eyewear"];

  const products: BestSellerProduct[] =
    initialProducts && initialProducts.length > 0
      ? initialProducts
      : [
          {
            id: "snk-1",
            category: "NIKE",
            type: "Sneakers",
            title: "Air Jordan 1 Retro Hi OG Heritage",
            variant: "High-Top",
            price: "GH₵ 185.00",
            rating: "4.9 (128)",
            saleBadge: "SALE -15%",
            image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
          },
          {
            id: "snk-2",
            category: "NEW BALANCE",
            type: "Sneakers",
            title: "990v2 Heritage Cream & Navy",
            variant: "Running / Casual",
            price: "GH₵ 195.00",
            rating: "4.8 (94)",
            saleBadge: "ATELIER PICK",
            image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg",
          },
          {
            id: "sht-1",
            category: "CURA",
            type: "Shirts",
            title: "Tailored French Linen Shirt Raw",
            variant: "French Linen",
            price: "GH₵ 110.00",
            rating: "4.9 (62)",
            saleBadge: "SALE -15%",
            image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939426/cura/media/vl8irhjorvfyn4o03ed5.jpg",
          },
          {
            id: "wat-1",
            category: "TIMECRAFT",
            type: "Watches",
            title: "Chronograph Monolith Steel Automatic",
            variant: "Automatic",
            price: "GH₵ 420.00",
            rating: "4.9 (48)",
            image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/fhsosrlqavdxqwy0gppx.jpg",
          },
          {
            id: "eyw-1",
            category: "VISIONARY",
            type: "Eyewear",
            title: "Acetate Solar Frames Polarized",
            variant: "Polarized",
            price: "GH₵ 145.00",
            rating: "4.8 (39)",
            image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939421/cura/media/ttmav1ptoigprqbeprlv.jpg",
          },
        ];

  const filteredProducts =
    activeTab === "All Products"
      ? products
      : products.filter((p) => p.type === activeTab);

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

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredProducts.map((p) => {
            const isWishlisted = store.isInWishlist(p.id);
            const isAddedToCart = store.isInCart(p.id);

            return (
              <div
                key={p.id}
                className="bg-white rounded-[16px] border border-[#E0E0E0] p-4 flex flex-col justify-between hover:border-[#232323] hover:shadow-lg transition-all group relative"
              >
                {/* Image Container with Wishlist Button */}
                <div className="relative w-full h-[190px] bg-[#F8F8F8] rounded-[12px] overflow-hidden mb-3.5 flex items-center justify-center p-3">
                  {p.saleBadge && (
                    <div className="absolute top-3 left-3 z-10 bg-[#D84315] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-[4px] uppercase tracking-wider">
                      {p.saleBadge}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => store.toggleWishlist(p.id)}
                    aria-label={isWishlisted ? `Remove ${p.title} from wishlist` : `Add ${p.title} to wishlist`}
                    aria-pressed={isWishlisted}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#232323] hover:scale-110 transition-transform border border-[#E0E0E0] shadow-xs cursor-pointer"
                  >
                    <svg
                      className={`w-4 h-4 ${
                        isWishlisted ? "fill-[#232323]" : "fill-none stroke-current stroke-2"
                      }`}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>

                  <Link href={`/product/${p.id}`} className="block w-full h-full">
                    <img
                      src={p.image}
                      alt={p.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    />
                  </Link>
                </div>

                <div className="space-y-1 mb-4">
                  <span className="text-[11px] font-mono font-bold text-[#A0A0A0] uppercase tracking-wider">
                    {p.category}
                  </span>
                  <Link href={`/product/${p.id}`} className="block">
                    <h4 className="text-[15px] font-bold text-[#232323] leading-snug line-clamp-1 group-hover:underline cursor-pointer">
                      {p.title}
                    </h4>
                  </Link>
                  <p className="text-[15px] font-extrabold text-[#232323]">{p.price}</p>
                </div>

                <button
                  type="button"
                  onClick={() => store.addToCart(p.id)}
                  disabled={isAddedToCart}
                  aria-label={isAddedToCart ? `${p.title} is in cart` : `Add ${p.title} to cart`}
                  className={`w-full h-[40px] rounded-[8px] text-[13px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                    isAddedToCart
                      ? "bg-[#43A047] text-white cursor-not-allowed opacity-90"
                      : "bg-[#232323] hover:bg-[#454545] text-white cursor-pointer"
                  }`}
                >
                  {isAddedToCart ? (
                    <span>Added ✓</span>
                  ) : (
                    <span>Add to Cart</span>
                  )}
                </button>
              </div>
            );
          })}
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
