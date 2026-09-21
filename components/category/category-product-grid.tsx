"use client";

import React, { useState } from "react";
import { ProductItem } from "@/lib/category-data";

interface CategoryProductGridProps {
  products: ProductItem[];
  categoryName: string;
  onCartUpdated?: (count: number) => void;
  onWishlistUpdated?: (count: number) => void;
}

export const CategoryProductGrid: React.FC<CategoryProductGridProps> = ({
  products,
  categoryName,
  onCartUpdated,
  onWishlistUpdated,
}) => {
  const [wishlistedIds, setWishlistedIds] = useState<string[]>(["snk-1", "snk-4"]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [addingCartId, setAddingCartId] = useState<string | null>(null);

  const handleToggleWishlist = async (id: string) => {
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });

      if (res.ok) {
        const data = await res.json();
        setWishlistedIds(data.wishlistedIds || []);
        onWishlistUpdated?.(data.wishlistCount);
      }
    } catch {
      setWishlistedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  const handleAddToCart = async (p: ProductItem) => {
    setAddingCartId(p.id);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: p.id, quantity: 1 }),
      });

      if (res.ok) {
        const data = await res.json();
        onCartUpdated?.(data.cartCount);
      }
    } catch {
      // Fallback
    } finally {
      setTimeout(() => setAddingCartId(null), 400);
    }
  };

  return (
    <div className="space-y-8">
      {/* Product Cards Grid - 4 Columns Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {products.map((p) => {
          const isWishlisted = wishlistedIds.includes(p.id);
          return (
            <div
              key={p.id}
              className="bg-white rounded-[16px] border border-[#E0E0E0] p-4 flex flex-col justify-between hover:border-[#232323] hover:shadow-lg transition-all group relative"
            >
              {/* Image Container with Badges & Wishlist Heart */}
              <div className="relative w-full h-[200px] bg-[#F8F8F8] rounded-[12px] overflow-hidden mb-3.5 flex items-center justify-center p-3">
                {/* Badge Overlay */}
                {p.badge && (
                  <div
                    className={`absolute top-3 left-3 z-10 text-[10px] font-extrabold px-2.5 py-0.5 rounded-[4px] uppercase tracking-wider ${
                      p.badge.includes("SALE")
                        ? "bg-[#D84315] text-white"
                        : p.badge === "ATELIER PICK"
                        ? "bg-[#232323] text-white"
                        : p.badge === "NEW DROP"
                        ? "bg-[#1E88E5] text-white"
                        : p.badge === "TRENDING"
                        ? "bg-[#E65100] text-white"
                        : "bg-[#43A047] text-white"
                    }`}
                  >
                    {p.badge}
                  </div>
                )}

                {/* Wishlist Toggle Heart Button */}
                <button
                  type="button"
                  onClick={() => handleToggleWishlist(p.id)}
                  aria-label={
                    isWishlisted ? `Remove ${p.title} from wishlist` : `Add ${p.title} to wishlist`
                  }
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

                {/* Product Image */}
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-[#A0A0A0] uppercase tracking-wider">
                    {p.brand}
                  </span>
                  <span className="text-[#676767]">{p.subCategory}</span>
                </div>

                <h4 className="text-[15px] font-bold text-[#232323] leading-snug line-clamp-1 group-hover:underline">
                  {p.title}
                </h4>

                <div className="flex items-center gap-1.5 text-[12px] text-[#676767]">
                  <span className="text-amber-500 font-bold">★ {p.rating}</span>
                  <span className="text-[#A0A0A0]">({p.reviewsCount.toLocaleString()})</span>
                </div>
              </div>

              {/* Price & Add to Cart Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-[#E0E0E0]/60">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[16px] font-extrabold text-[#232323]">{p.price}</span>
                  {p.originalPrice && (
                    <span className="text-[12px] text-[#A0A0A0] line-through font-mono">
                      {p.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCart(p)}
                  disabled={addingCartId === p.id}
                  className="h-[36px] px-3.5 bg-[#232323] hover:bg-[#454545] text-white rounded-[8px] text-[12px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {addingCartId === p.id ? (
                    <span>Added!</span>
                  ) : (
                    <>
                      <span>+</span>
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sizing Assurance Banner */}
      <div className="bg-[#FFF8F3] border border-[#F5D8C3] rounded-[16px] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFE8D6] text-[#D84315] flex items-center justify-center shrink-0 font-bold text-lg">
            🛡
          </div>
          <div className="space-y-1">
            <h4 className="font-heebo text-[16px] font-bold text-[#232323] uppercase tracking-wide">
              {categoryName} Atelier & Sizing Assurance
            </h4>
            <p className="text-[13px] text-[#676767] max-w-2xl leading-relaxed">
              Not certain about instep width or Jordan vs. New Balance fit conversion? Schedule instant
              measurements with our digital atelier concierge.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="h-[44px] px-6 bg-[#121212] hover:bg-[#333333] text-white font-bold text-[13px] uppercase tracking-wider rounded-[10px] shrink-0 transition-colors shadow-sm cursor-pointer"
        >
          Consult Fit Guide
        </button>
      </div>

      {/* Pagination Footer Controls */}
      <div className="pt-4 border-t border-[#E0E0E0] flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#676767]">
        {/* Items per page selector */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-[#A0A0A0]">Items per page:</span>
          {[12, 24, 48].map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setItemsPerPage(count)}
              className={`w-7 h-7 rounded-[6px] text-[12px] font-bold transition-all cursor-pointer ${
                itemsPerPage === count
                  ? "bg-[#232323] text-white"
                  : "bg-white text-[#676767] border border-[#E0E0E0] hover:border-[#232323]"
              }`}
            >
              {count}
            </button>
          ))}
        </div>

        {/* Page Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-8 h-8 rounded-[6px] border border-[#E0E0E0] bg-white flex items-center justify-center text-[#232323] disabled:opacity-40 cursor-pointer"
          >
            &lt;
          </button>
          {[1, 2, 3].map((pNum) => (
            <button
              key={pNum}
              type="button"
              aria-label={`Page ${pNum}`}
              aria-current={currentPage === pNum ? "page" : undefined}
              onClick={() => setCurrentPage(pNum)}
              className={`w-8 h-8 rounded-[6px] font-bold text-[13px] transition-all cursor-pointer ${
                currentPage === pNum
                  ? "bg-[#232323] text-white"
                  : "bg-white border border-[#E0E0E0] text-[#232323] hover:border-[#232323]"
              }`}
            >
              {pNum}
            </button>
          ))}
          <button
            type="button"
            aria-label="Next page"
            disabled={currentPage === 3}
            onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
            className="w-8 h-8 rounded-[6px] border border-[#E0E0E0] bg-white flex items-center justify-center text-[#232323] disabled:opacity-40 cursor-pointer"
          >
            &gt;
          </button>
        </div>

        {/* Page Info */}
        <div className="text-[12px] font-mono text-[#A0A0A0]">
          Page {currentPage} of 3 (18 total products)
        </div>
      </div>
    </div>
  );
};
