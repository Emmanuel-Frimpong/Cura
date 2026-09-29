"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductItem } from "@/lib/category-data";
import { useStore } from "@/components/providers/store-provider";
import { handleImageError } from "@/components/ui/cura-image";

interface CategoryProductGridProps {
  products: ProductItem[];
  categoryName: string;
  conciergeTitle?: string;
  conciergeDesc?: string;
}

export const CategoryProductGrid: React.FC<CategoryProductGridProps> = ({
  products,
  categoryName,
  conciergeTitle = "Footwear Atelier & Sizing Assurance",
  conciergeDesc = "Not certain about instep width or sizing conversion? Schedule instant measurements with our digital atelier concierge.",
}) => {
  const store = useStore();
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(products.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-8">
      {/* Product Cards Grid - 4 Columns Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {paginatedProducts.map((p) => {
          const isWishlisted = store.isInWishlist(p.id);
          const isAddedToCart = store.isInCart(p.id);

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
                  onClick={() => store.toggleWishlist(p.id)}
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
                <Link href={`/product/${p.id}`} className="block w-full h-full">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  />
                </Link>
              </div>

              {/* Product Info */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-[#A0A0A0] uppercase tracking-wider">
                    {p.brand}
                  </span>
                  <span className="text-[#676767]">{p.subCategory}</span>
                </div>

                <Link href={`/product/${p.id}`} className="block">
                  <h4 className="text-[15px] font-bold text-[#232323] leading-snug line-clamp-1 group-hover:underline cursor-pointer">
                    {p.title}
                  </h4>
                </Link>

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
                  onClick={() => store.addToCart(p.id)}
                  disabled={isAddedToCart}
                  aria-label={isAddedToCart ? `${p.title} is in cart` : `Add ${p.title} to cart`}
                  className={`h-[36px] px-3.5 rounded-[8px] text-[12px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 shadow-xs ${
                    isAddedToCart
                      ? "bg-[#43A047] text-white cursor-not-allowed opacity-90"
                      : "bg-[#232323] hover:bg-[#454545] text-white cursor-pointer"
                  }`}
                >
                  {isAddedToCart ? (
                    <span>Added ✓</span>
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

      {/* Sizing & Atelier Concierge Banner */}
      <div className="bg-white border border-[#E0E0E0] rounded-[16px] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-700 text-xl">
            🛡
          </div>
          <div className="space-y-1">
            <h3 className="font-heebo text-[18px] font-bold text-[#232323]">
              {conciergeTitle}
            </h3>
            <p className="text-[13px] text-[#676767] leading-relaxed max-w-2xl">
              {conciergeDesc}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="h-[44px] px-6 bg-[#232323] hover:bg-[#454545] text-white rounded-[10px] text-[13px] font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          Consult Fit Guide
        </button>
      </div>

      {/* Pagination & Footer Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-[13px] text-[#676767]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-[#A0A0A0] uppercase">
            Items per page:
          </span>
          {[12, 24, 48].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => {
                setItemsPerPage(size);
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-[6px] font-bold font-mono text-[12px] transition-colors ${
                itemsPerPage === size
                  ? "bg-[#232323] text-white"
                  : "bg-white border border-[#E0E0E0] text-[#676767] hover:border-[#232323]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Page Selector Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="w-9 h-9 rounded-[8px] bg-white border border-[#E0E0E0] flex items-center justify-center text-[#232323] disabled:opacity-30 hover:border-[#232323] cursor-pointer"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-[8px] font-bold font-mono text-[13px] transition-all ${
                currentPage === page
                  ? "bg-[#232323] text-white shadow-xs"
                  : "bg-white border border-[#E0E0E0] text-[#232323] hover:border-[#232323]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="w-9 h-9 rounded-[8px] bg-white border border-[#E0E0E0] flex items-center justify-center text-[#232323] disabled:opacity-30 hover:border-[#232323] cursor-pointer"
          >
            &gt;
          </button>
        </div>

        <div className="font-mono text-[12px] text-[#A0A0A0]">
          Page {currentPage} of {totalPages} ({products.length} total products)
        </div>
      </div>
    </div>
  );
};
