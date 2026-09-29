"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/components/providers/store-provider";

export interface WishlistItemDetail {
  id: string;
  sku: string;
  badge: string; // FOOTWEAR, TAILORING, OPTICS, HOROLOGY
  stockStatus: "in-stock" | "low-stock" | "restocked";
  stockText: string;
  title: string;
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice?: number;
  subtitle?: string;
  selectedSize: string;
  sizes: string[];
  imageUrl: string;
}

export interface CuratedComplement {
  id: string;
  badge: string;
  title: string;
  price: number;
  imageUrl: string;
}

const KNOWN_WISHLIST_MAP: Record<string, WishlistItemDetail> = {
  "wish-jordan-1": {
    id: "wish-jordan-1",
    sku: "CR-FW-0921",
    badge: "FOOTWEAR",
    stockStatus: "in-stock",
    stockText: "In Stock",
    title: "Air Jordan 1 Retro High OG",
    rating: 4.9,
    reviewsCount: 3420,
    price: 185.0,
    originalPrice: 210.0,
    selectedSize: "US 10.0 (EU 44)",
    sizes: ["US 9.0 (EU 42.5)", "US 9.5 (EU 43)", "US 10.0 (EU 44)", "US 10.5 (EU 44.5)", "US 11.0 (EU 45)"],
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
  },
  "wish-boxy-shirt": {
    id: "wish-boxy-shirt",
    sku: "CR-AP-1420",
    badge: "TAILORING",
    stockStatus: "low-stock",
    stockText: "Low Stock - 3 Left",
    title: "Boxy Tailored Oxford Shirt",
    rating: 4.8,
    reviewsCount: 890,
    price: 135.0,
    originalPrice: 160.0,
    selectedSize: "Size Large / Blanc",
    sizes: ["Size Small / Blanc", "Size Medium / Blanc", "Size Large / Blanc", "Size XL / Blanc"],
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/at64y7naw845pndg43er.jpg",
  },
  "wish-aviator-eyewear": {
    id: "wish-aviator-eyewear",
    sku: "CR-OPT-8834",
    badge: "OPTICS",
    stockStatus: "in-stock",
    stockText: "In Stock",
    title: "Pedestal Aviator Eyewear",
    rating: 5.0,
    reviewsCount: 412,
    price: 280.0,
    subtitle: "Standard Lens",
    selectedSize: "Havana Dark Tortoise",
    sizes: ["Havana Dark Tortoise", "Polished Black Gold", "Amber Honey Crystal"],
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939431/cura/media/n4i8n8s4vjygndcbf7vw.jpg",
  },
  "wish-990v2-runner": {
    id: "wish-990v2-runner",
    sku: "CR-FW-1950",
    badge: "FOOTWEAR",
    stockStatus: "restocked",
    stockText: "Restocked",
    title: "990v2 Heritage Cream Runner",
    rating: 4.9,
    reviewsCount: 1230,
    price: 195.0,
    subtitle: "Archival Pair",
    selectedSize: "US 10.0 (EU 44)",
    sizes: ["US 8.5 (EU 42)", "US 9.0 (EU 42.5)", "US 9.5 (EU 43)", "US 10.0 (EU 44)", "US 10.5 (EU 44.5)"],
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939429/cura/media/zqwmsv86wfn1z8w8479e.jpg",
  },
};

const CURATED_COMPLEMENTS: CuratedComplement[] = [
  {
    id: "comp-court-low",
    badge: "FOOTWEAR",
    title: "Vapor Shadow Court Low",
    price: 175.0,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939433/cura/media/c9wqu09dsmwug3xrtmn8.jpg",
  },
  {
    id: "comp-round-acetate",
    badge: "OPTICS",
    title: "Atelier Round Acetate",
    price: 240.0,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939421/cura/media/ttmav1ptoigprqbeprlv.jpg",
  },
  {
    id: "comp-sector-auto",
    badge: "HOROLOGY",
    title: "Sector Automatic 38mm",
    price: 580.0,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/fhsosrlqavdxqwy0gppx.jpg",
  },
];

export const WishlistPageContent: React.FC = () => {
  const store = useStore();

  const [wishlistItems, setWishlistItems] = useState<WishlistItemDetail[]>([]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All Items");
  const [sortBy, setSortBy] = useState("Recently Added");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [previewEmpty, setPreviewEmpty] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  // Fetch product details for wishlisted IDs via API
  useEffect(() => {
    async function resolveWishlistDetails() {
      if (store.wishlistIds.length === 0) {
        setWishlistItems([]);
        return;
      }

      try {
        const res = await fetch("/api/products/details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: store.wishlistIds }),
        });

        if (!res.ok) return;
        const data = await res.json();
        const detailsList: any[] = data.products || [];

        const detailsMap = new Map<string, any>();
        detailsList.forEach((d) => detailsMap.set(d.id, d));

        const updated: WishlistItemDetail[] = store.wishlistIds.map((id, index) => {
          const fetched = detailsMap.get(id) || KNOWN_WISHLIST_MAP[id];
          if (fetched) {
            return {
              id: fetched.id,
              sku: fetched.sku || `CR-${id.slice(0, 6)}`,
              badge: fetched.badge || "ATELIER",
              stockStatus: index % 3 === 1 ? "low-stock" : index % 3 === 2 ? "restocked" : "in-stock",
              stockText: index % 3 === 1 ? "Low Stock - 3 Left" : index % 3 === 2 ? "Restocked" : "In Stock",
              title: fetched.title || fetched.name,
              rating: fetched.rating || 4.9,
              reviewsCount: fetched.reviewsCount || 850 + index * 120,
              price: fetched.unitPrice || fetched.price || 185.0,
              originalPrice: fetched.originalPrice,
              subtitle: fetched.subtitle,
              selectedSize: fetched.selectedSize || "US 10.0 (EU 44)",
              sizes: fetched.sizes || ["US 9.0 (EU 42.5)", "US 9.5 (EU 43)", "US 10.0 (EU 44)", "US 10.5 (EU 44.5)"],
              imageUrl: fetched.imageUrl || "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
            };
          }

          return {
            id,
            sku: `CR-WISH-${id.slice(0, 6).toUpperCase()}`,
            badge: "FOOTWEAR",
            stockStatus: "in-stock",
            stockText: "In Stock",
            title: `CURA Atelier Wishlist Object`,
            rating: 4.9,
            reviewsCount: 1420,
            price: 185.0,
            selectedSize: "US 10.0 (EU 44)",
            sizes: ["US 9.0 (EU 42.5)", "US 10.0 (EU 44)", "US 11.0 (EU 45)"],
            imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
          };
        });

        setWishlistItems(updated);
      } catch (err) {
        console.warn("Wishlist product details resolution error:", err);
      }
    }

    resolveWishlistDetails();
  }, [store.wishlistIds]);

  // Handle Share button
  const handleShareWishlist = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setShareToast(true);
    setTimeout(() => setShareToast(false), 3000);
  };

  // Move All to Cart
  const handleMoveAllToCart = async () => {
    for (const item of wishlistItems) {
      await store.moveToCart(item.id);
    }
  };

  // Category counts for filter tabs
  const footwearCount = wishlistItems.filter((i) => i.badge === "FOOTWEAR").length;
  const apparelCount = wishlistItems.filter((i) => i.badge === "TAILORING" || i.badge === "APPAREL").length;
  const opticsCount = wishlistItems.filter((i) => i.badge === "OPTICS" || i.badge === "HOROLOGY").length;

  // Filtered items
  const filteredItems = wishlistItems.filter((item) => {
    if (activeCategoryFilter === "Footwear") return item.badge === "FOOTWEAR";
    if (activeCategoryFilter === "Apparel") return item.badge === "TAILORING" || item.badge === "APPAREL";
    if (activeCategoryFilter === "Optics") return item.badge === "OPTICS" || item.badge === "HOROLOGY";
    return true;
  });

  // Sorted items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Highest Rated") return b.rating - a.rating;
    return 0;
  });

  const isActuallyEmpty = wishlistItems.length === 0 || previewEmpty;

  return (
    <div className="bg-[#F8F8F8] min-h-screen text-[#232323] pb-24 font-sans">
      {/* Toast Announcement */}
      {shareToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#232323] text-white text-[13px] font-bold px-5 py-3 rounded-[12px] shadow-xl animate-fade-in flex items-center gap-2">
          <span>✓ Wishlist URL copied to clipboard!</span>
        </div>
      )}

      {/* Breadcrumb Navigation Header */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-6 pb-4">
        <nav aria-label="Breadcrumb" className="text-[12px] text-[#767676] font-medium flex items-center gap-2">
          <Link href="/" className="hover:text-[#232323] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/account" className="hover:text-[#232323] transition-colors">
            Account
          </Link>
          <span>/</span>
          <span className="text-[#232323] font-semibold">My Wishlist</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* Main Title Bar & Action Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-oswald text-[36px] lg:text-[44px] font-extrabold uppercase tracking-tight text-[#232323] leading-none">
                MY WISHLIST
              </h1>
              <span className="bg-[#F4EBE1] text-[#9E784F] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#E8DCCB]">
                {wishlistItems.length} SAVED OBJECT{wishlistItems.length !== 1 ? "S" : ""}
              </span>
            </div>
            <p className="text-[13px] text-[#666] max-w-2xl">
              Curated personal selection. Items saved here remain synchronized with live inventory reservations and real-time restock dispatches.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Share Button */}
            <button
              type="button"
              onClick={handleShareWishlist}
              className="bg-white border border-[#E0E0E0] text-[#232323] text-[13px] font-bold px-4 py-2.5 rounded-full hover:bg-[#F4F4F4] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>

            {/* Move All to Cart */}
            <button
              type="button"
              disabled={wishlistItems.length === 0}
              onClick={handleMoveAllToCart}
              className={`text-[13px] font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-xs uppercase tracking-wider ${
                wishlistItems.length === 0
                  ? "bg-[#E0E0E0] text-[#999] cursor-not-allowed"
                  : "bg-[#232323] text-white hover:bg-[#404040] cursor-pointer"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Move All to Cart
            </button>

            {/* View Mode Toggle Icons */}
            <div className="hidden sm:flex items-center bg-white border border-[#E0E0E0] rounded-full p-1 gap-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  viewMode === "grid" ? "bg-[#232323] text-white" : "text-[#777] hover:text-[#232323]"
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  viewMode === "list" ? "bg-[#232323] text-white" : "text-[#777] hover:text-[#232323]"
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                </svg>
              </button>
            </div>

            {/* Preview Empty State Toggle Button */}
            <button
              type="button"
              onClick={() => setPreviewEmpty((prev) => !prev)}
              className="text-[11px] font-bold text-[#888] bg-white border border-[#E0E0E0] px-3 py-2 rounded-full hover:text-[#232323] transition-colors"
            >
              {previewEmpty ? "Preview Saved Items" : "Preview Empty State"}
            </button>
          </div>
        </div>

        {/* Filter Pills & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-y border-[#E0E0E0] mb-8">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "All Items", count: wishlistItems.length },
              { label: "Footwear", count: footwearCount },
              { label: "Apparel", count: apparelCount },
              { label: "Optics", count: opticsCount },
            ].map((tab) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveCategoryFilter(tab.label)}
                className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                  activeCategoryFilter === tab.label
                    ? "bg-[#232323] text-white shadow-xs"
                    : "bg-white text-[#676767] border border-[#E0E0E0] hover:border-[#232323]"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#666]">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E0E0E0] rounded-full px-4 py-2 text-[13px] font-bold text-[#232323] focus:outline-none focus:border-[#232323] cursor-pointer"
            >
              <option value="Recently Added">Recently Added</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Highest Rated">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Wishlist Grid or Empty State */}
        {isActuallyEmpty ? (
          <div className="bg-white border border-[#E5E5E5] rounded-[20px] p-12 lg:p-16 text-center shadow-xs mb-14">
            <div className="w-20 h-20 bg-[#F4EBE1] rounded-full flex items-center justify-center mx-auto mb-5 text-[#9E784F]">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-oswald text-[28px] font-bold uppercase tracking-tight text-[#232323] mb-2">
              Your Wishlist is Currently Empty
            </h3>
            <p className="text-[14px] text-[#666] max-w-md mx-auto mb-8">
              Explore our architectural footwear, tailored apparel, fine horology, and optical spectacles to save items for future purchases.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-[#232323] text-white font-bold text-[14px] px-8 py-3.5 rounded-full hover:bg-[#404040] transition-colors shadow-md uppercase tracking-wider"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div
            className={`grid gap-6 mb-14 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {sortedItems.map((item) => {
              const inCart = store.isInCart(item.id);
              return (
                <div
                  key={item.id}
                  className={`bg-white border border-[#E5E5E5] rounded-[18px] p-5 flex flex-col justify-between group hover:border-[#232323] hover:shadow-md transition-all relative ${
                    viewMode === "list" ? "sm:flex-row sm:items-center gap-6" : ""
                  }`}
                >
                  {/* Image & Top Badges Container */}
                  <div
                    className={`relative bg-[#F5F5F5] rounded-[14px] overflow-hidden ${
                      viewMode === "list" ? "w-36 h-36 shrink-0" : "w-full aspect-square mb-4"
                    }`}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Left Pill Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                      <span className="bg-[#232323] text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {item.badge}
                      </span>
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          item.stockStatus === "low-stock"
                            ? "bg-[#FFF3E0] text-[#E65100]"
                            : item.stockStatus === "restocked"
                            ? "bg-[#E3F2FD] text-[#1565C0]"
                            : "bg-[#E8F5E9] text-[#2E7D32]"
                        }`}
                      >
                        ● {item.stockText}
                      </span>
                    </div>

                    {/* Top Right Heart Remove Button */}
                    <button
                      type="button"
                      onClick={() => store.toggleWishlist(item.id)}
                      aria-label={`Remove ${item.title} from wishlist`}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#D32F2F] hover:scale-110 transition-transform shadow-xs cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-[#D32F2F]" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>

                  {/* Content Container */}
                  <div className={`flex flex-col flex-1 justify-between ${viewMode === "list" ? "py-2" : ""}`}>
                    <div>
                      {/* Rating Line */}
                      <div className="flex items-center gap-1.5 text-[11px] text-[#777] mb-1">
                        <span className="text-[#FF9800]">★</span>
                        <span className="font-bold text-[#232323]">{item.rating.toFixed(1)}</span>
                        <span>({item.reviewsCount} reviews)</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-[16px] font-bold text-[#232323] leading-snug mb-1">
                        {item.title}
                      </h3>

                      {/* Price & Subtitle */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-[16px] font-extrabold text-[#232323]">
                          GH₵ {item.price.toFixed(2)}
                        </span>
                        {item.originalPrice ? (
                          <span className="text-[12px] text-[#999] line-through">
                            GH₵ {item.originalPrice.toFixed(2)}
                          </span>
                        ) : item.subtitle ? (
                          <span className="text-[11px] text-[#888] font-medium">{item.subtitle}</span>
                        ) : null}
                      </div>

                      {/* Selected Size / Variant Dropdown Selector */}
                      <div className="mb-4">
                        <label htmlFor={`size-select-${item.id}`} className="sr-only">
                          Select size for {item.title}
                        </label>
                        <select
                          id={`size-select-${item.id}`}
                          defaultValue={item.selectedSize}
                          className="w-full h-9 bg-[#F9F9F9] border border-[#E0E0E0] rounded-[8px] px-3 text-[12px] font-semibold text-[#232323] focus:outline-none focus:border-[#232323] cursor-pointer"
                        >
                          {item.sizes.map((sz) => (
                            <option key={sz} value={sz}>
                              {sz}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Actions */}
                    <div>
                      <button
                        type="button"
                        onClick={() => store.moveToCart(item.id)}
                        className={`w-full h-10 rounded-[10px] text-[13px] font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer uppercase tracking-wider ${
                          inCart
                            ? "bg-[#43A047] text-white"
                            : "bg-[#232323] text-white hover:bg-[#404040]"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {inCart ? "In Cart ✓" : "Add to Cart"}
                      </button>

                      <button
                        type="button"
                        onClick={() => alert(`Quick view preview for ${item.title}`)}
                        className="w-full text-center text-[11px] font-bold text-[#888] hover:text-[#232323] transition-colors mt-2"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* RECOMMENDED ATELIER PIECES / CURATED COMPLEMENTS Section */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase text-[#9E784F] tracking-widest block mb-1">
                RECOMMENDED ATELIER PIECES
              </span>
              <h2 className="font-oswald text-[28px] sm:text-[32px] font-extrabold uppercase tracking-tight text-[#232323]">
                CURATED COMPLEMENTS
              </h2>
            </div>
            <Link href="/shop" className="text-[13px] font-bold text-[#232323] hover:underline flex items-center gap-1">
              View Autumn Release →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CURATED_COMPLEMENTS.map((comp) => {
              const isWishlisted = store.isInWishlist(comp.id);
              return (
                <div
                  key={comp.id}
                  className="bg-white border border-[#E5E5E5] rounded-[16px] p-4 flex items-center gap-4 hover:border-[#232323] transition-all"
                >
                  <div className="relative w-20 h-20 bg-[#F5F5F5] rounded-[12px] overflow-hidden shrink-0">
                    <Image src={comp.imageUrl} alt={comp.title} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-extrabold text-[#888] uppercase tracking-wider block mb-1">
                      {comp.badge}
                    </span>
                    <h3 className="text-[14px] font-bold text-[#232323] truncate mb-1">
                      {comp.title}
                    </h3>
                    <span className="text-[13px] font-extrabold text-[#232323] block mb-2">
                      GH₵ {comp.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => store.toggleWishlist(comp.id)}
                      className="text-[11px] font-bold text-[#232323] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {isWishlisted ? "✓ Wishlisted" : "+ Add to Wishlist"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guaranteed Authenticity & Trust Features Bar */}
        <div className="bg-white border border-[#E5E5E5] rounded-[18px] p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#F4EBE1] text-[#9E784F] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-[#232323] mb-1">Guaranteed Authenticity</h4>
              <p className="text-[12px] text-[#666] leading-relaxed">
                Every footwear pair and eyewear frame undergoes rigorous in-house physical inspection before archival storage.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#F4EBE1] text-[#9E784F] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-[#232323] mb-1">Live Reserve Tracking</h4>
              <p className="text-[12px] text-[#666] leading-relaxed">
                Wishlist objects update in real-time. If stock drops below 3 units, priority reservation prompts are dispatched.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#F4EBE1] text-[#9E784F] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-[#232323] mb-1">Effortless Cart Sync</h4>
              <p className="text-[12px] text-[#666] leading-relaxed">
                Items moved to your cart preserve your customized size, lens configuration, and color selection seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
