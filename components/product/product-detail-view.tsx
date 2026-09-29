"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/components/providers/store-provider";

export interface ProductDetailProps {
  productId?: string;
  initialProduct?: {
    id: string;
    sku: string;
    title: string;
    brand: string;
    category: string;
    price: number;
    originalPrice?: number;
    description: string;
    rating: number;
    reviewsCount: number;
    images: string[];
    colors: { name: string; hex: string }[];
    sizes: string[];
  };
}

const DEFAULT_PRODUCT = {
  id: "cart-item-jordan1",
  sku: "CR-FW-0921",
  title: "AIR JORDAN 1 RETRO HIGH OG",
  brand: "NKR ARCHIVE",
  category: "Sneakers",
  price: 185.0,
  originalPrice: 210.0,
  description:
    "Archival high-top silhouette in tumbled Italian calfskin with unvarnished natural-tan piping. Engineered for court heritage and architectural daily wear.",
  rating: 4.9,
  reviewsCount: 3420,
  images: [
    "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
    "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg",
    "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939429/cura/media/zqwmsv86wfn1z8w8479e.jpg",
    "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939433/cura/media/c9wqu09dsmwug3xrtmn8.jpg",
  ],
  colors: [
    { name: "Heritage Black / Crimson / White", hex: "#B71C1C" },
    { name: "Triple Optic White", hex: "#FFFFFF" },
    { name: "Stealth Shadow Grey", hex: "#424242" },
  ],
  sizes: ["7.5", "8.0", "8.5", "9.0", "9.5", "10.0", "10.5", "11.0", "11.5", "12.0", "13.0 (Out of Stock)"],
};

const SIMILAR_PRODUCTS = [
  {
    id: "snk-2",
    brand: "NEW BALANCE ARCHIVE",
    title: "990v2 Heritage Cream",
    price: 195.0,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg",
  },
  {
    id: "saved-item-aura",
    brand: "AURA ATELIER ARCHIVE",
    title: "AURA Minimalist Low-Top",
    price: 160.0,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939433/cura/media/c9wqu09dsmwug3xrtmn8.jpg",
  },
  {
    id: "comp-jordan-shadow",
    brand: "JORDAN BRAND ARCHIVE",
    title: "Air Jordan 1 Shadow Atelier",
    price: 220.0,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
  },
  {
    id: "cart-item-shirt",
    brand: "CURA TAILORING",
    title: "Boxy Tailored Oxford Shirt",
    price: 135.0,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/at64y7naw845pndg43er.jpg",
  },
];

const RECENTLY_VIEWED = [
  { id: "cart-item-specs", title: "Fairmont Tortoise", category: "SPECTACLES", price: 245.0, image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939431/cura/media/n4i8n8s4vjygndcbf7vw.jpg" },
  { id: "comp-pedestal-aviator", title: "Pedestal Aviator", category: "OPTICAL ARCHIVE", price: 280.0, image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939431/cura/media/n4i8n8s4vjygndcbf7vw.jpg" },
  { id: "wtc-1", title: "Sunburst Bronze Chrono", category: "TIMEPIECES", price: 410.0, image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/fhsosrlqavdxqwy0gppx.jpg" },
  { id: "snk-5", title: "Salomon XT-6 Atelier", category: "FOOTWEAR", price: 210.0, image: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg" },
];

export const ProductDetailView: React.FC<ProductDetailProps> = ({
  initialProduct = DEFAULT_PRODUCT,
}) => {
  const store = useStore();

  const product = initialProduct;

  // Selected State
  const [selectedImage, setSelectedImage] = useState(product.images[0] || DEFAULT_PRODUCT.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState("10.0");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "materials" | "shipping">("description");
  const [reviewFilter, setReviewFilter] = useState("All Reviews");
  const [postalCode, setPostalCode] = useState("");
  const [etaResult, setEtaResult] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState(false);

  const isWishlisted = store.isInWishlist(product.id);
  const isAdded = store.isInCart(product.id);

  const handleAddToCart = async () => {
    await store.addToCart(product.id, quantity);
  };

  const handleToggleWishlist = async () => {
    await store.toggleWishlist(product.id);
  };

  const handleCheckEta = (e: React.FormEvent) => {
    e.preventDefault();
    if (postalCode.trim()) {
      setEtaResult("Estimated Express Delivery: Thursday, Nov 26 (Guaranteed)");
    } else {
      setEtaResult("Please enter a valid postal / ZIP code.");
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setShareToast(true);
    setTimeout(() => setShareToast(false), 3000);
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen text-[#232323] pb-24 font-sans">
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#232323] text-white text-[13px] font-bold px-5 py-3 rounded-[12px] shadow-xl animate-fade-in flex items-center gap-2">
          <span>✓ Product link copied to clipboard!</span>
        </div>
      )}

      {/* Top Breadcrumb & Alert Bar */}
      <div className="bg-[#EFEFEF] border-b border-[#E0E0E0]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px]">
          <nav aria-label="Breadcrumb" className="text-[#666] font-medium flex items-center gap-2">
            <Link href="/" className="hover:text-[#232323] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`/shop/${product.category.toLowerCase()}`} className="hover:text-[#232323] transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[#232323] font-semibold">{product.title}</span>
          </nav>

          <div className="flex items-center gap-4 text-[11px] font-bold text-[#777]">
            <span className="text-[#D32F2F] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
              LOW STOCK: 3 UNITS REMAINING
            </span>
            <span>•</span>
            <span className="text-[#2E7D32]">FAST DISPATCH AVAILABLE</span>
            <span>•</span>
            <span className="font-mono">SKU: {product.sku}</span>
          </div>
        </div>
      </div>

      {/* Main Product Hero Grid */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Stage Display */}
            <div className="relative w-full aspect-4/3 bg-white border border-[#E5E5E5] rounded-[20px] overflow-hidden shadow-xs group">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Top Left Verified Badge */}
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-xs border border-[#E0E0E0] text-[#232323] text-[10px] font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                100% VERIFIED AUTHENTIC
              </div>

              {/* Top Right 360° Badge */}
              <button
                type="button"
                onClick={() => alert("Interactive 360° Studio View loaded.")}
                className="absolute top-4 right-4 z-10 bg-[#232323] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md hover:bg-[#404040] transition-colors uppercase tracking-wider cursor-pointer"
              >
                <span>360° Studio View</span>
              </button>

              {/* Bottom Right Zoom Icons */}
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Zoom image"
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs border border-[#E0E0E0] flex items-center justify-center text-[#232323] hover:bg-white shadow-xs"
                >
                  🔍
                </button>
              </div>
            </div>

            {/* Thumbnail Carousel Row */}
            <div className="grid grid-cols-5 gap-3">
              {product.images.slice(0, 3).map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative aspect-square bg-white border rounded-[12px] overflow-hidden transition-all cursor-pointer ${
                    selectedImage === imgUrl ? "border-[#232323] ring-2 ring-[#232323]/20" : "border-[#E0E0E0] hover:border-[#888]"
                  }`}
                >
                  <Image src={imgUrl} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}

              {/* + 2 MORE Thumbnail Badge */}
              <button
                type="button"
                onClick={() => setSelectedImage(product.images[1] || product.images[0])}
                className="relative aspect-square bg-[#F4F4F4] border border-[#E0E0E0] rounded-[12px] flex flex-col items-center justify-center text-[11px] font-bold text-[#555] hover:border-[#232323] transition-colors cursor-pointer"
              >
                <span>+ 2 MORE</span>
                <span className="text-[9px] text-[#888] font-normal">SHOTS</span>
              </button>

              {/* 360 View Thumbnail */}
              <button
                type="button"
                onClick={() => alert("360° Studio View initiated.")}
                className="relative aspect-square bg-[#232323] border border-[#232323] rounded-[12px] flex flex-col items-center justify-center text-[11px] font-bold text-white hover:bg-[#404040] transition-colors cursor-pointer"
              >
                <span className="text-[14px]">🔄</span>
                <span className="text-[9px] font-extrabold uppercase">360° VIEW</span>
              </button>
            </div>

            {/* Guarantee Micro-Badges Bar */}
            <div className="bg-white border border-[#E5E5E5] rounded-[14px] p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px] text-[#555]">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#9E784F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>30-Day Hassle-Free Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#9E784F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Atelier Certificate of Authenticity</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#9E784F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Discreet Architectural Packaging</span>
              </div>
            </div>
          </div>

          {/* Right Column: Purchasing Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-[#E5E5E5] rounded-[20px] p-6 lg:p-8 shadow-xs flex flex-col gap-6">
            {/* Header Category & Actions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold uppercase text-[#9E784F] tracking-widest">
                  {product.brand} • 2026 ARCHIVAL EDITION
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share product"
                    className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#555] hover:bg-[#232323] hover:text-white transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleWishlist}
                    aria-label="Toggle wishlist"
                    className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#D32F2F] hover:scale-110 transition-transform cursor-pointer"
                  >
                    <svg className={`w-4 h-4 ${isWishlisted ? "fill-[#D32F2F]" : "fill-none stroke-current stroke-2"}`} viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              </div>

              <h1 className="font-oswald text-[28px] lg:text-[34px] font-extrabold uppercase text-[#232323] leading-tight mb-2">
                {product.title}
              </h1>

              <p className="text-[13px] text-[#666] leading-relaxed mb-3">
                {product.description}
              </p>

              {/* Rating Summary */}
              <div className="flex items-center gap-3 text-[12px] border-b border-[#EAEAEA] pb-4 mb-4">
                <div className="flex items-center gap-1 text-[#FF9800] font-bold">
                  <span>★</span>
                  <span className="text-[#232323]">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-[#888]">({product.reviewsCount.toLocaleString()} Reviews)</span>
                <span className="text-[#DDD]">|</span>
                <span className="bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  94% Fit True to Size
                </span>
              </div>
            </div>

            {/* Price & Installment */}
            <div className="bg-[#F9F9F9] border border-[#EBEBEB] rounded-[14px] p-4">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-oswald text-[32px] font-extrabold text-[#232323]">
                  GH₵ {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-[14px] text-[#999] line-through font-semibold">
                    GH₵ {product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="bg-[#D84315] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  SAVE 12% - GH₵ 25 OFF
                </span>
              </div>
              <p className="text-[11px] text-[#666]">
                Or 4 interest-free payments of <strong>GH₵ {(product.price / 4).toFixed(2)}</strong> with <strong>Klarna / Afterpay</strong>, no APR fees.
              </p>
            </div>

            {/* Colorway Selector */}
            <div>
              <label className="block text-[12px] font-bold text-[#232323] mb-2">
                Colorway: <span className="font-normal text-[#666]">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    aria-label={`Select colorway ${c.name}`}
                    className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                      selectedColor === c.name ? "border-[#232323] scale-110 shadow-xs" : "border-[#E0E0E0] hover:border-[#888]"
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full border border-black/10"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector Grid */}
            <div>
              <div className="flex justify-between items-center mb-2 text-[12px]">
                <span className="font-bold text-[#232323]">Select Size (US Men)</span>
                <button
                  type="button"
                  onClick={() => alert("Size Chart & Fit Advisor: US 10.0 equates to 28.0cm length.")}
                  className="text-[#9E784F] font-semibold hover:underline"
                >
                  Fit Advisor & Size Chart
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((sz) => {
                  const isOutOfStock = sz.includes("Out of Stock");
                  const cleanSz = sz.split(" ")[0];
                  return (
                    <button
                      key={sz}
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(cleanSz)}
                      className={`h-10 rounded-[10px] text-[12px] font-bold transition-all border cursor-pointer ${
                        isOutOfStock
                          ? "bg-[#F5F5F5] text-[#BBB] border-[#E0E0E0] line-through cursor-not-allowed"
                          : selectedSize === cleanSz
                          ? "bg-[#232323] text-white border-[#232323] shadow-xs"
                          : "bg-white text-[#232323] border-[#E0E0E0] hover:border-[#232323]"
                      }`}
                    >
                      {cleanSz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Controller & Add to Cart Actions */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-[#E0E0E0] bg-[#F9F9F9] rounded-[12px] h-12 px-3 gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="text-[#666] hover:text-[#232323] font-bold text-[16px] px-1"
                >
                  -
                </button>
                <span className="text-[14px] font-bold text-[#232323] min-w-[16px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="text-[#666] hover:text-[#232323] font-bold text-[16px] px-1"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 h-12 rounded-[12px] text-[14px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                  isAdded
                    ? "bg-[#43A047] text-white"
                    : "bg-[#232323] text-white hover:bg-[#404040]"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {isAdded ? "ADDED TO CART ✓" : `ADD TO CART — GH₵ ${(product.price * quantity).toFixed(2)}`}
              </button>
            </div>

            {/* Accelerated Checkout */}
            <button
              type="button"
              onClick={() => handleAddToCart()}
              className="w-full h-12 bg-[#5A31F4] text-white font-bold text-[14px] rounded-[12px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm"
            >
              Buy with Shop Pay
            </button>

            {/* Postal Code ETA Checker */}
            <div className="border-t border-[#EAEAEA] pt-4">
              <span className="block text-[11px] font-extrabold uppercase text-[#777] mb-2 tracking-wider">
                EXPRESS DISPATCH & ATELIER DELIVERY
              </span>
              <form onSubmit={handleCheckEta} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Enter Postal / ZIP Code"
                  className="flex-1 h-9 bg-[#F9F9F9] border border-[#E0E0E0] rounded-[8px] px-3 text-[12px] uppercase text-[#232323] focus:outline-none focus:border-[#232323]"
                />
                <button
                  type="submit"
                  className="bg-[#232323] text-white font-bold text-[12px] px-4 rounded-[8px] hover:bg-[#404040] transition-colors"
                >
                  Check ETA
                </button>
              </form>

              {etaResult ? (
                <p className="text-[12px] font-semibold text-[#2E7D32]">{etaResult}</p>
              ) : (
                <p className="text-[11px] text-[#777]">
                  Estimated Delivery: <strong>Thursday, Nov 26</strong> for in-stock dispatches.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs Section */}
        <div className="mb-14">
          <div className="flex border-b border-[#E0E0E0] overflow-x-auto gap-8 text-[14px] font-bold text-[#666] mb-8">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={`pb-3 transition-colors border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === "description" ? "border-[#232323] text-[#232323]" : "border-transparent hover:text-[#232323]"
              }`}
            >
              Product Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`pb-3 transition-colors border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === "specs" ? "border-[#232323] text-[#232323]" : "border-transparent hover:text-[#232323]"
              }`}
            >
              Technical Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("materials")}
              className={`pb-3 transition-colors border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === "materials" ? "border-[#232323] text-[#232323]" : "border-transparent hover:text-[#232323]"
              }`}
            >
              Materials & Care Advice
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("shipping")}
              className={`pb-3 transition-colors border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === "shipping" ? "border-[#232323] text-[#232323]" : "border-transparent hover:text-[#232323]"
              }`}
            >
              Master Shipping & Return Policy
            </button>
          </div>

          {/* Description Tab Content */}
          {activeTab === "description" && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-[11px] font-mono font-bold text-[#9E784F] uppercase tracking-wider block">
                    THE ARCHIVAL STORY
                  </span>
                  <h2 className="font-oswald text-[32px] font-extrabold uppercase leading-tight text-[#232323]">
                    SCULPTED FOR COURT PROWESS, TAILORED FOR ARCHITECTURAL LIVING.
                  </h2>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    First released in 1985 by Peter Moore, the Air Jordan 1 redefined footwear iconography across sport, fashion, and streetwear subcultures. For this limited Atelier iteration, the silhouette returns to its foundational heritage blueprint, meticulously constructed from top-grain Italian calfskin with precise perimeter contrast stitching and an aged-sail midsole finish.
                  </p>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    Engineered with a low-profile encapsulated Nike Air-Sole unit, the platform absorbs athletic impact without compromising the low center-of-gravity demanded by modern urban explorers.
                  </p>

                  {/* Stats Counter Row */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#EAEAEA]">
                    <div>
                      <span className="font-oswald text-[28px] font-extrabold text-[#232323]">1985</span>
                      <span className="block text-[10px] font-bold text-[#888] uppercase">ORIGINAL RELEASE</span>
                    </div>
                    <div>
                      <span className="font-oswald text-[28px] font-extrabold text-[#232323]">1.4mm</span>
                      <span className="block text-[10px] font-bold text-[#888] uppercase">FULL-GRAIN CALFSKIN</span>
                    </div>
                    <div>
                      <span className="font-oswald text-[28px] font-extrabold text-[#232323]">100%</span>
                      <span className="block text-[10px] font-bold text-[#888] uppercase">AIR-CUSHIONED SOLE</span>
                    </div>
                  </div>
                </div>

                {/* Highlight Image Card */}
                <div className="lg:col-span-5 relative aspect-4/3 bg-white border border-[#E5E5E5] rounded-[18px] overflow-hidden p-3 shadow-xs">
                  <Image
                    src="https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg"
                    alt="Film Study Texture"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-xs p-3 rounded-[12px] text-[11px] font-bold text-[#232323]">
                    FLAT-LAY FILM STUDY #02 — Texture and Natural Preservation
                  </div>
                </div>
              </div>

              {/* 4 Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#E5E5E5] rounded-[14px] p-4">
                  <span className="text-[20px] block mb-2">💨</span>
                  <h4 className="text-[14px] font-bold text-[#232323] mb-1">Lightweight Air-Unit</h4>
                  <p className="text-[12px] text-[#666]">Encapsulated pressure gas unit prevents impact fatigue without bulk.</p>
                </div>
                <div className="bg-white border border-[#E5E5E5] rounded-[14px] p-4">
                  <span className="text-[20px] block mb-2">🛡</span>
                  <h4 className="text-[14px] font-bold text-[#232323] mb-1">Durable Full-Grain</h4>
                  <p className="text-[12px] text-[#666]">Top-grade full grain leather resists creasing over season of wear.</p>
                </div>
                <div className="bg-white border border-[#E5E5E5] rounded-[14px] p-4">
                  <span className="text-[20px] block mb-2">🌬</span>
                  <h4 className="text-[14px] font-bold text-[#232323] mb-1">Breathable Vents</h4>
                  <p className="text-[12px] text-[#666]">Laser-perforated vamp for ventilation during high temperatures.</p>
                </div>
                <div className="bg-white border border-[#E5E5E5] rounded-[14px] p-4">
                  <span className="text-[20px] block mb-2">👟</span>
                  <h4 className="text-[14px] font-bold text-[#232323] mb-1">Ergonomic Collar</h4>
                  <p className="text-[12px] text-[#666]">Dual-density sculpted foam collar for lateral support and comfort.</p>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="bg-white border border-[#E5E5E5] rounded-[18px] p-6 shadow-xs">
                <h3 className="font-oswald text-[20px] font-bold uppercase text-[#232323] mb-4">
                  ATELIER REGISTRY & SPECIFICATIONS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-[13px]">
                  <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                    <span className="text-[#777]">Brand</span>
                    <span className="font-semibold text-[#232323]">Nike Air Jordan Street Archive</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                    <span className="text-[#777]">Material</span>
                    <span className="font-semibold text-[#232323]">Soft Action Leather & Calfskin Suede</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                    <span className="text-[#777]">Sole Architecture</span>
                    <span className="font-semibold text-[#232323]">Encapsulated Gas-Cushioned Air-Sole Unit</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                    <span className="text-[#777]">Colorway Registry</span>
                    <span className="font-semibold text-[#232323]">Heritage Black / Crimson / White (001)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                    <span className="text-[#777]">Seasonal Reference</span>
                    <span className="font-semibold text-[#232323]">US Men 10.0 (EU 44 / UK 9.0)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                    <span className="text-[#777]">Catalog SKU</span>
                    <span className="font-semibold text-[#232323]">CR-FW-0921</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                    <span className="text-[#777]">Manufacturing Standard</span>
                    <span className="font-semibold text-[#232323]">Handcrafted Edition Size G</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                    <span className="text-[#777]">Box Includes</span>
                    <span className="font-semibold text-[#232323]">Spare Waxed Laces + Atelier Dust Bag</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="bg-white border border-[#E5E5E5] rounded-[18px] p-8 space-y-4">
              <h3 className="font-oswald text-[22px] font-bold uppercase">Technical Blueprint & Specs</h3>
              <p className="text-[14px] text-[#555] leading-relaxed">
                Precision specs for the Air Jordan 1 Retro High OG: Upper built with 1.4mm Italian calfskin leather, high-traction rubber outsole with perimeter pivot circles, encapsulated polyurethane midsole core.
              </p>
            </div>
          )}

          {activeTab === "materials" && (
            <div className="bg-white border border-[#E5E5E5] rounded-[18px] p-8 space-y-4">
              <h3 className="font-oswald text-[22px] font-bold uppercase">Materials & Care Guide</h3>
              <p className="text-[14px] text-[#555] leading-relaxed">
                Use a soft-bristle horsehair brush to remove surface dust. Apply organic leather conditioner once every three months to preserve moisture and prevent cracking. Store in dry, shaded room using cedar shoe trees.
              </p>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="bg-white border border-[#E5E5E5] rounded-[18px] p-8 space-y-4">
              <h3 className="font-oswald text-[22px] font-bold uppercase">Master Shipping & Returns Policy</h3>
              <p className="text-[14px] text-[#555] leading-relaxed">
                All dispatches ship via DHL Express or FedEx Air inside signature discreet packaging. Free returns are available within 30 days of arrival provided the item remains unwashed, unworn, and includes original tags and box.
              </p>
            </div>
          )}
        </div>

        {/* Verified Buyer Reviews Section */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase text-[#9E784F] tracking-widest block mb-1">
                ATELIER COMMUNITY FEEDBACK
              </span>
              <h2 className="font-oswald text-[28px] sm:text-[32px] font-extrabold uppercase tracking-tight text-[#232323]">
                VERIFIED BUYER REVIEWS
              </h2>
            </div>
            <button
              type="button"
              onClick={() => alert("Write a Review form opened.")}
              className="bg-[#232323] text-white text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-[#404040] transition-colors shadow-xs uppercase tracking-wider cursor-pointer"
            >
              Write a Verified Review
            </button>
          </div>

          {/* Rating Summary Card */}
          <div className="bg-white border border-[#E5E5E5] rounded-[18px] p-6 lg:p-8 mb-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xs">
            {/* Score */}
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-[#EAEAEA] pb-6 md:pb-0 md:pr-6">
              <span className="font-oswald text-[54px] font-extrabold text-[#232323] leading-none block mb-1">
                4.9
              </span>
              <div className="flex justify-center md:justify-start text-[#FF9800] text-[18px] mb-2">
                ★★★★★
              </div>
              <p className="text-[12px] text-[#777]">Based on 3,420 Verified Atelier Purchases</p>
            </div>

            {/* Star Bars */}
            <div className="md:col-span-4 space-y-1.5 text-[12px] text-[#666]">
              <div className="flex items-center gap-2">
                <span className="w-10">5 Stars</span>
                <div className="flex-1 h-2 bg-[#EAEAEA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#232323] w-[86%]" />
                </div>
                <span className="w-8 text-right">86%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-10">4 Stars</span>
                <div className="flex-1 h-2 bg-[#EAEAEA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#232323] w-[9%]" />
                </div>
                <span className="w-8 text-right">9%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-10">3 Stars</span>
                <div className="flex-1 h-2 bg-[#EAEAEA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#232323] w-[3%]" />
                </div>
                <span className="w-8 text-right">3%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-10">2 Stars</span>
                <div className="flex-1 h-2 bg-[#EAEAEA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#232323] w-[1%]" />
                </div>
                <span className="w-8 text-right">1%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-10">1 Star</span>
                <div className="flex-1 h-2 bg-[#EAEAEA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#232323] w-[1%]" />
                </div>
                <span className="w-8 text-right">1%</span>
              </div>
            </div>

            {/* Fit Indices */}
            <div className="md:col-span-4 bg-[#F9F9F9] border border-[#EBEBEB] rounded-[14px] p-4 text-[12px] space-y-2">
              <div className="flex justify-between items-center">
                <span>TruetoSize Index:</span>
                <strong className="text-[#232323]">96% Confident</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Daily Comfort Index:</span>
                <strong className="text-[#232323]">4.9 / 5.0</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Leather Durability:</span>
                <strong className="text-[#232323]">4.8 / 5.0</strong>
              </div>
            </div>
          </div>

          {/* Filter Bar & Review Cards */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              {["All Reviews (3,420)", "With Photos (1,890)", "Verified Buyers Only"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setReviewFilter(tab)}
                  className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all cursor-pointer ${
                    reviewFilter === tab
                      ? "bg-[#232323] text-white shadow-xs"
                      : "bg-white text-[#666] border border-[#E0E0E0] hover:border-[#232323]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="text-[12px] text-[#666] flex items-center gap-2">
              <span>Sort by:</span>
              <select className="bg-white border border-[#E0E0E0] rounded-full px-3 py-1.5 font-bold text-[#232323] focus:outline-none">
                <option>Most Helpful</option>
                <option>Newest First</option>
                <option>Highest Rating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[14px] font-bold text-[#232323]">Julian P.</h4>
                  <span className="text-[11px] font-semibold text-[#2E7D32]">✓ VERIFIED BUYER</span>
                </div>
                <span className="text-[11px] text-[#999]">May 14, 2026</span>
              </div>
              <div className="text-[#FF9800] text-[14px]">★★★★★</div>
              <p className="text-[13px] text-[#555] leading-relaxed">
                &quot;The leather quality on this release is noticeably softer and more supple than regular releases. Right out of the box, zero break-in period required.&quot;
              </p>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[14px] font-bold text-[#232323]">Marcus Chen</h4>
                  <span className="text-[11px] font-semibold text-[#2E7D32]">✓ VERIFIED BUYER</span>
                </div>
                <span className="text-[11px] text-[#999]">April 28, 2026</span>
              </div>
              <div className="text-[#FF9800] text-[14px]">★★★★★</div>
              <p className="text-[13px] text-[#555] leading-relaxed">
                &quot;Packaging and presentation are on par with pure luxury fashion houses. The red extra laces and the right subtle vintage varnish method on the midsole. Does not crease easily.&quot;
              </p>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[14px] font-bold text-[#232323]">David M.</h4>
                  <span className="text-[11px] font-semibold text-[#2E7D32]">✓ VERIFIED BUYER</span>
                </div>
                <span className="text-[11px] text-[#999]">April 18, 2026</span>
              </div>
              <div className="text-[#FF9800] text-[14px]">★★★★★</div>
              <p className="text-[13px] text-[#555] leading-relaxed">
                &quot;Slightly snug around the pinky toe on the first wear, but after 2 days the leather molded perfectly to my foot shape. Pairs exceptionally well with tailored trousers.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* RECOMMENDED STYLING / PAIR WITH SILHOUETTES */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase text-[#9E784F] tracking-widest block mb-1">
                RECOMMENDED STYLING
              </span>
              <h2 className="font-oswald text-[28px] sm:text-[32px] font-extrabold uppercase tracking-tight text-[#232323]">
                PAIR WITH & SIMILAR SILHOUETTES
              </h2>
            </div>
            <Link href="/shop" className="text-[13px] font-bold text-[#232323] hover:underline flex items-center gap-1">
              Explore Archive →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SIMILAR_PRODUCTS.map((sim) => {
              const inCart = store.isInCart(sim.id);
              return (
                <div key={sim.id} className="bg-white border border-[#E5E5E5] rounded-[16px] p-4 flex flex-col justify-between group hover:border-[#232323] transition-all">
                  <Link href={`/product/${sim.id}`} className="relative w-full aspect-square bg-[#F5F5F5] rounded-[12px] overflow-hidden mb-4 block">
                    <Image src={sim.imageUrl} alt={sim.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <div>
                    <span className="text-[10px] font-extrabold text-[#888] uppercase tracking-wider block mb-1">
                      {sim.brand}
                    </span>
                    <Link href={`/product/${sim.id}`}>
                      <h3 className="text-[15px] font-bold text-[#232323] truncate mb-2 hover:underline cursor-pointer">{sim.title}</h3>
                    </Link>
                    <div className="flex items-center justify-between pt-2 border-t border-[#F0F0F0]">
                      <span className="text-[15px] font-extrabold text-[#232323]">GH₵ {sim.price.toFixed(2)}</span>
                      <button
                        type="button"
                        onClick={() => store.addToCart(sim.id, 1)}
                        className="bg-[#232323] text-white text-[12px] font-bold px-4 py-2 rounded-full hover:bg-[#404040] transition-colors cursor-pointer"
                      >
                        {inCart ? "In Cart ✓" : "+ Add"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recently Viewed Atelier Objects Bar */}
        <div className="bg-white border border-[#E5E5E5] rounded-[18px] p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#EAEAEA] mb-4">
            <h3 className="font-oswald text-[20px] font-bold uppercase text-[#232323]">
              RECENTLY VIEWED ATELIER OBJECTS
            </h3>
            <button
              type="button"
              onClick={() => alert("Recently viewed history cleared.")}
              className="text-[11px] font-bold text-[#888] hover:text-[#232323] transition-colors uppercase"
            >
              CLEAR HISTORY
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RECENTLY_VIEWED.map((rv) => (
              <Link key={rv.id} href={`/product/${rv.id}`} className="flex items-center gap-3 p-2 border border-[#F0F0F0] rounded-[12px] bg-[#F9F9F9] hover:border-[#232323] transition-all">
                <div className="relative w-14 h-14 bg-white rounded-[8px] overflow-hidden shrink-0 border border-[#E0E0E0]">
                  <Image src={rv.image} alt={rv.title} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-extrabold text-[#888] uppercase block">{rv.category}</span>
                  <h4 className="text-[13px] font-bold text-[#232323] truncate hover:underline">{rv.title}</h4>
                  <span className="text-[12px] font-extrabold text-[#232323]">GH₵ {rv.price.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
