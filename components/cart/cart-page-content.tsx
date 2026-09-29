"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/components/providers/store-provider";

export interface CartItemDetail {
  id: string;
  sku: string;
  badge: string; // FOOTWEAR, APPAREL, OPTICS
  title: string;
  specs: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
  inStock?: boolean;
}

export interface SavedItemDetail {
  id: string;
  title: string;
  specs: string;
  price: number;
  imageUrl: string;
}

export interface ComplementaryProduct {
  id: string;
  badge: string;
  category: string;
  title: string;
  price: number;
  imageUrl: string;
}

const KNOWN_PRODUCTS_MAP: Record<string, CartItemDetail> = {
  "cart-item-jordan1": {
    id: "cart-item-jordan1",
    sku: "CR-FW-0921",
    badge: "FOOTWEAR",
    title: "Nike Air Jordan 1 Retro High OG Heritage",
    specs: "Color: Heritage Black / Crimson  •  Size: US Men 10.0",
    unitPrice: 185.0,
    quantity: 1,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
    inStock: true,
  },
  "cart-item-shirt": {
    id: "cart-item-shirt",
    sku: "CR-AP-1420",
    badge: "APPAREL",
    title: "Boxy Tailored Oxford Shirt",
    specs: "Color: Crisp Blanc  •  Size: L (Chest 42)",
    unitPrice: 135.0,
    quantity: 1,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/at64y7naw845pndg43er.jpg",
    inStock: true,
  },
  "cart-item-specs": {
    id: "cart-item-specs",
    sku: "CR-OPT-8834",
    badge: "OPTICS",
    title: "Fairmont Tortoise Spectacles",
    specs: "Frame: Japanese Acetate Tortoise  •  Size: 48-21 Medium",
    unitPrice: 245.0,
    quantity: 1,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939431/cura/media/n4i8n8s4vjygndcbf7vw.jpg",
    inStock: true,
  },
  "saved-item-aura": {
    id: "saved-item-aura",
    sku: "CR-FW-1600",
    badge: "FOOTWEAR",
    title: "AURA Minimalist Low-Top Sneaker",
    specs: "Optic White  •  Size: 42 EU (US 9.0)",
    unitPrice: 160.0,
    quantity: 1,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939433/cura/media/c9wqu09dsmwug3xrtmn8.jpg",
    inStock: true,
  },
  "comp-jordan-shadow": {
    id: "comp-jordan-shadow",
    sku: "CR-FW-2240",
    badge: "FOOTWEAR",
    title: "Jordan 1 Shadow Atelier Edition",
    specs: "Color: Shadow Grey / Black  •  Size: US Men 10.0",
    unitPrice: 224.0,
    quantity: 1,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
    inStock: true,
  },
  "comp-pedestal-aviator": {
    id: "comp-pedestal-aviator",
    sku: "CR-OPT-2800",
    badge: "OPTICS",
    title: "Pedestal Aviator Eyewear",
    specs: "Frame: Titanium Gold  •  Size: Standard",
    unitPrice: 280.0,
    quantity: 1,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939431/cura/media/n4i8n8s4vjygndcbf7vw.jpg",
    inStock: true,
  },
  "comp-990v2-cream": {
    id: "comp-990v2-cream",
    sku: "CR-FW-1950",
    badge: "FOOTWEAR",
    title: "990v2 Heritage Cream Runner",
    specs: "Color: Cream / Navy  •  Size: US Men 9.5",
    unitPrice: 195.0,
    quantity: 1,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939429/cura/media/zqwmsv86wfn1z8w8479e.jpg",
    inStock: true,
  },
  "comp-shoecare-kit": {
    id: "comp-shoecare-kit",
    sku: "CR-ACC-0350",
    badge: "ACCESSORY",
    title: "Atelier Leather Care & Dust Kit",
    specs: "Includes: Brush, Cream, Cloth, Dust Bag",
    unitPrice: 35.0,
    quantity: 1,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/at64y7naw845pndg43er.jpg",
    inStock: true,
  },
};

const COMPLEMENTARY_PRODUCTS: ComplementaryProduct[] = [
  {
    id: "comp-jordan-shadow",
    badge: "LIMITED",
    category: "SNEAKERS",
    title: "Jordan 1 Shadow Atelier Edition",
    price: 224.0,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
  },
  {
    id: "comp-pedestal-aviator",
    badge: "CRAFTED",
    category: "SPECTACLES",
    title: "Pedestal Aviator Eyewear",
    price: 280.0,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939431/cura/media/n4i8n8s4vjygndcbf7vw.jpg",
  },
  {
    id: "comp-990v2-cream",
    badge: "RESTOCKED",
    category: "SPORTSWEAR",
    title: "990v2 Heritage Cream Runner",
    price: 195.0,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939429/cura/media/zqwmsv86wfn1z8w8479e.jpg",
  },
  {
    id: "comp-shoecare-kit",
    badge: "ESSENTIAL",
    category: "SHOECARE ATELIER",
    title: "Atelier Leather Care & Dust Kit",
    price: 35.0,
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/at64y7naw845pndg43er.jpg",
  },
];

export const CartPageContent: React.FC = () => {
  const store = useStore();

  const [localCart, setLocalCart] = useState<CartItemDetail[]>([]);
  const [localSaved, setLocalSaved] = useState<SavedItemDetail[]>([]);

  // Fetch real database product details for added items via API
  useEffect(() => {
    async function resolveProductDetails() {
      const allIds = Array.from(
        new Set([
          ...store.cartItems.map((c) => c.id),
          ...store.wishlistIds,
        ])
      );

      if (allIds.length === 0) {
        setLocalCart([]);
        setLocalSaved([]);
        return;
      }

      try {
        const res = await fetch("/api/products/details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: allIds }),
        });

        if (!res.ok) return;
        const data = await res.json();
        const detailsList: CartItemDetail[] = data.products || [];

        const detailsMap = new Map<string, CartItemDetail>();
        detailsList.forEach((d) => detailsMap.set(d.id, d));

        // Map cart items
        const updatedCart: CartItemDetail[] = store.cartItems.map((cItem) => {
          const fetched = detailsMap.get(cItem.id) || KNOWN_PRODUCTS_MAP[cItem.id];
          if (fetched) {
            return {
              ...fetched,
              quantity: cItem.quantity,
            };
          }
          return {
            id: cItem.id,
            sku: `CR-ITEM-${cItem.id.slice(0, 6).toUpperCase()}`,
            badge: "ATELIER",
            title: `CURA Atelier Product`,
            specs: "Standard Configuration",
            unitPrice: 150.0,
            quantity: cItem.quantity,
            imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
            inStock: true,
          };
        });
        setLocalCart(updatedCart);

        // Map saved items
        const updatedSaved: SavedItemDetail[] = store.wishlistIds.map((id) => {
          const fetched = detailsMap.get(id) || KNOWN_PRODUCTS_MAP[id];
          if (fetched) {
            return {
              id: fetched.id,
              title: fetched.title,
              specs: fetched.specs,
              price: fetched.unitPrice,
              imageUrl: fetched.imageUrl,
            };
          }
          return {
            id,
            title: "CURA Atelier Saved Item",
            specs: "Standard Configuration",
            price: 150.0,
            imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939433/cura/media/c9wqu09dsmwug3xrtmn8.jpg",
          };
        });
        setLocalSaved(updatedSaved);
      } catch (err) {
        console.warn("Failed to resolve product details:", err);
      }
    }

    resolveProductDetails();
  }, [store.cartItems, store.wishlistIds]);

  // Promo code state
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState("");

  // Reservation countdown timer state (14m 54s)
  const [timerSeconds, setTimerSeconds] = useState(14 * 60 + 54);

  // Checkout modal status
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Timer interval countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Quantity updates
  const handleUpdateQuantity = async (id: string, delta: number) => {
    await store.updateCartQuantity(id, delta);
  };

  // Remove single item from cart
  const handleRemoveItem = async (id: string) => {
    await store.removeFromCart(id);
  };

  // Save for later (move from cart to saved for later)
  const handleSaveForLater = async (item: CartItemDetail) => {
    await store.moveToWishlist(item.id);
  };

  // Move all cart items to saved items
  const handleMoveAllToSaved = async () => {
    await store.moveAllToWishlist();
  };

  // Clear entire cart
  const handleClearEntireCart = async () => {
    await store.clearCart();
  };

  // Move saved item to cart
  const handleMoveSavedToCart = async (item: SavedItemDetail) => {
    await store.moveToCart(item.id);
  };

  // Remove saved item
  const handleRemoveSavedItem = async (id: string) => {
    await store.toggleWishlist(id);
  };

  // Quick Add from complementary section
  const handleQuickAddComplementary = async (comp: ComplementaryProduct) => {
    await store.addToCart(comp.id, 1);
  };

  // Apply promo voucher
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const cleaned = promoCodeInput.trim().toUpperCase();

    if (cleaned === "CURA10") {
      setAppliedPromo({ code: "CURA10", percent: 10 });
      setPromoCodeInput("");
    } else if (cleaned === "CURA20") {
      setAppliedPromo({ code: "CURA20", percent: 20 });
      setPromoCodeInput("");
    } else if (cleaned === "") {
      setPromoError("Please enter a voucher code.");
    } else {
      setPromoError("Invalid code. Try 'CURA10' for 10% off.");
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  // Calculations
  const subtotal = localCart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountPercent = appliedPromo ? appliedPromo.percent : 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxAmount = (subtotal * 0.08875);
  const finalTotal = Math.max(0, subtotal - discountAmount + taxAmount);
  const totalItemCount = store.cartCount;

  return (
    <div className="bg-[#F8F8F8] min-h-screen text-[#232323] pb-24 font-sans">
      {/* Breadcrumb Header */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-6 pb-4">
        <nav aria-label="Breadcrumb" className="text-[12px] text-[#767676] font-medium flex items-center gap-2">
          <Link href="/" className="hover:text-[#232323] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#232323] transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-[#232323] font-semibold">Shopping Cart</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* Title Bar & Reservation Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="font-oswald text-[36px] lg:text-[44px] font-extrabold uppercase tracking-tight text-[#232323] leading-none">
              YOUR SHOPPING CART
            </h1>
            {totalItemCount > 0 && (
              <span className="bg-[#F4EBE1] text-[#9E784F] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#E8DCCB]">
                {totalItemCount} ATELIER OBJECT{totalItemCount !== 1 ? "S" : ""}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#555] bg-white border border-[#E5E5E5] px-4 py-2 rounded-full shadow-xs">
            <svg className="w-4 h-4 text-[#888]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Reserved for <strong className="text-[#232323]">{formatTimer(timerSeconds)}</strong> minutes
            </span>
          </div>
        </div>

        {/* Express Delivery Banner */}
        <div className="bg-white border border-[#E5E5E5] rounded-[14px] p-4 lg:p-5 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EBE1] flex items-center justify-center text-[#9E784F] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#232323]">
                  Complimentary Express Delivery & Duties Included
                </h3>
                <p className="text-[12px] text-[#767676]">
                  {subtotal >= 150 || subtotal === 0
                    ? "You are GH₵ 0 away from Free Express Delivery (Qualified!)"
                    : `Add GH₵ ${(150 - subtotal).toFixed(2)} more for Complimentary Express Delivery.`}
                </p>
              </div>
            </div>

            <span className="bg-[#232323] text-white text-[11px] font-extrabold uppercase px-4 py-2 rounded-full tracking-wider text-center shrink-0">
              QUALIFIED TIER
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-[#EAEAEA] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#232323] transition-all duration-500 rounded-full"
              style={{ width: `${subtotal === 0 ? 100 : Math.min(100, (subtotal / 150) * 100)}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Left Cart Items & Right Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left Column: Cart Table & Actions (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {localCart.length === 0 ? (
              <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-12 text-center shadow-xs">
                <div className="w-16 h-16 bg-[#F4F4F4] rounded-full flex items-center justify-center mx-auto mb-4 text-[#888]">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="font-oswald text-[24px] font-bold uppercase mb-2">Your Shopping Cart is Empty</h3>
                <p className="text-[14px] text-[#666] mb-6">Explore our curated atelier collections of sneakers, shirts, watches, and spectacles.</p>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center bg-[#232323] text-white font-bold text-[14px] px-8 py-3.5 rounded-full hover:bg-[#404040] transition-colors shadow-md"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              <>
                {/* Desktop Header Row */}
                <div className="hidden md:grid grid-cols-12 text-[11px] font-extrabold uppercase tracking-wider text-[#888] px-4 pb-2 border-b border-[#E0E0E0]">
                  <div className="col-span-6">OBJECT & SPECIFICATIONS</div>
                  <div className="col-span-2 text-center">UNIT PRICE</div>
                  <div className="col-span-2 text-center">QUANTITY</div>
                  <div className="col-span-2 text-right">SUBTOTAL</div>
                </div>

                {/* Cart Items List */}
                <div className="flex flex-col gap-4">
                  {localCart.map((item) => {
                    const itemSubtotal = item.unitPrice * item.quantity;
                    return (
                      <div
                        key={item.id}
                        className="bg-white border border-[#E5E5E5] rounded-[16px] p-5 sm:p-6 shadow-xs flex flex-col md:grid md:grid-cols-12 items-center gap-4 transition-all hover:border-[#D5D5D5]"
                      >
                        {/* Object Info (Col 6) */}
                        <div className="w-full md:col-span-6 flex gap-4 items-center">
                          <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#F5F5F5] rounded-[12px] overflow-hidden shrink-0 border border-[#EDEDED]">
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                            <span className="absolute top-2 left-2 bg-[#232323] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {item.badge}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="text-[11px] text-[#999] font-mono font-medium uppercase">
                              SKU: {item.sku}
                            </span>
                            <h2 className="text-[15px] sm:text-[16px] font-bold text-[#232323] leading-snug truncate">
                              {item.title}
                            </h2>
                            <p className="text-[12px] text-[#666] leading-relaxed">
                              {item.specs}
                            </p>
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2E7D32] mt-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                              In Stock • Ready to dispatch
                            </span>
                          </div>
                        </div>

                        {/* Unit Price (Col 2) */}
                        <div className="w-full md:col-span-2 flex md:justify-center items-center justify-between text-[14px] font-semibold text-[#444]">
                          <span className="md:hidden text-[12px] text-[#888] font-bold uppercase">Unit Price:</span>
                          <span>GH₵ {item.unitPrice.toFixed(2)}</span>
                        </div>

                        {/* Quantity (Col 2) */}
                        <div className="w-full md:col-span-2 flex md:justify-center items-center justify-between">
                          <span className="md:hidden text-[12px] text-[#888] font-bold uppercase">Qty:</span>
                          <div className="flex items-center border border-[#E0E0E0] bg-[#F9F9F9] rounded-full px-3 py-1 gap-3">
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              aria-label={`Decrease quantity for ${item.title}`}
                              className="text-[#666] hover:text-[#232323] font-bold text-[14px] px-1"
                            >
                              -
                            </button>
                            <span className="text-[13px] font-bold text-[#232323] min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              aria-label={`Increase quantity for ${item.title}`}
                              className="text-[#666] hover:text-[#232323] font-bold text-[14px] px-1"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Subtotal & Actions (Col 2) */}
                        <div className="w-full md:col-span-2 flex md:flex-col items-center md:items-end justify-between gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-[#F0F0F0]">
                          <span className="text-[16px] font-extrabold text-[#232323]">
                            GH₵ {itemSubtotal.toFixed(2)}
                          </span>

                          <div className="flex items-center gap-3 text-[11px] font-semibold">
                            <button
                              type="button"
                              onClick={() => handleSaveForLater(item)}
                              className="text-[#666] hover:text-[#232323] transition-colors flex items-center gap-1"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                              </svg>
                              Save for Later
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-[#D32F2F] hover:text-[#B71C1C] transition-colors flex items-center gap-1"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Cart Action Links */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-[13px] font-bold text-[#232323] bg-white border border-[#E0E0E0] px-5 py-2.5 rounded-full hover:bg-[#F4F4F4] transition-colors shadow-xs"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continue Shopping
                  </Link>

                  <div className="flex items-center gap-4 text-[13px] font-bold">
                    <button
                      type="button"
                      onClick={handleMoveAllToSaved}
                      className="text-[#666] hover:text-[#232323] transition-colors"
                    >
                      Move All to Saved Items
                    </button>
                    <span className="text-[#CCC]">•</span>
                    <button
                      type="button"
                      onClick={handleClearEntireCart}
                      className="text-[#D32F2F] hover:text-[#B71C1C] transition-colors"
                    >
                      Clear Entire Cart
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Order Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#E5E5E5] rounded-[18px] p-6 lg:p-7 shadow-sm sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAEAEA] mb-5">
              <h2 className="font-oswald text-[22px] font-bold uppercase tracking-tight text-[#232323] flex items-center gap-2">
                ORDER SUMMARY
              </h2>
              <svg className="w-5 h-5 text-[#888]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 14l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            {/* Calculations Breakdown */}
            <div className="flex flex-col gap-3 text-[14px] text-[#555] mb-5">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="font-semibold text-[#232323]">GH₵ {subtotal.toFixed(2)}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between items-center text-[#2E7D32]">
                  <span className="flex items-center gap-1.5">
                    Atelier Drop ({appliedPromo.percent}%)
                    <span className="bg-[#F4EBE1] text-[#9E784F] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                      SPRING
                    </span>
                  </span>
                  <span className="font-bold">-GH₵ {discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  Estimated Delivery
                  <svg className="w-3.5 h-3.5 text-[#AAA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="font-bold text-[#2E7D32] uppercase text-[12px] bg-[#E8F5E9] px-2 py-0.5 rounded">
                  FREE
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  Estimated Tax (NY 8.875%)
                  <svg className="w-3.5 h-3.5 text-[#AAA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="font-semibold text-[#232323]">GH₵ {taxAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code Form */}
            <div className="bg-[#F9F9F9] border border-[#EBEBEB] rounded-[12px] p-3.5 mb-6">
              <label htmlFor="cart-promo-code" className="block text-[11px] font-extrabold uppercase text-[#777] mb-2 tracking-wider">
                ATELIER VOUCHER / PROMO CODE
              </label>

              {appliedPromo ? (
                <div className="flex items-center justify-between bg-white border border-[#C8E6C9] px-3 py-2 rounded-[8px] text-[12px]">
                  <span className="font-medium text-[#2E7D32]">
                    ⓘ {appliedPromo.code} (-{appliedPromo.percent}% Atelier Drop applied)
                  </span>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="text-[11px] font-extrabold text-[#D32F2F] hover:underline"
                  >
                    REMOVE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <svg className="w-4 h-4 text-[#AAA] absolute left-3 top-2.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <input
                      id="cart-promo-code"
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="e.g. CURA10"
                      className="w-full h-9 bg-white border border-[#E0E0E0] rounded-[8px] pl-9 pr-3 text-[12px] uppercase text-[#232323] focus:outline-none focus:border-[#232323]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#232323] text-white font-bold text-[12px] px-4 rounded-[8px] hover:bg-[#404040] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {promoError && (
                <p className="text-[11px] text-[#D32F2F] font-medium mt-1.5">{promoError}</p>
              )}
            </div>

            {/* Total Display */}
            <div className="border-t border-[#EAEAEA] pt-4 mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-oswald text-[20px] font-extrabold uppercase text-[#232323]">
                  TOTAL
                </span>
                <span className="font-oswald text-[32px] font-extrabold text-[#232323]">
                  GH₵ {finalTotal.toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-[#888] text-right">USD with taxes & duties</p>
              <p className="text-[12px] text-[#666] mt-2 leading-tight">
                Or 4 interest-free payments of <strong>GH₵ {(finalTotal / 4).toFixed(2)}</strong> with <strong>Klarna / Afterpay</strong>
              </p>
            </div>

            {/* Main Proceed CTA */}
            <button
              type="button"
              disabled={localCart.length === 0}
              onClick={() => setIsCheckoutModalOpen(true)}
              className={`w-full font-bold text-[15px] py-4 rounded-[12px] transition-all flex items-center justify-center gap-3 shadow-md mb-4 uppercase tracking-wider ${
                localCart.length === 0
                  ? "bg-[#E0E0E0] text-[#999] cursor-not-allowed shadow-none"
                  : "bg-[#232323] text-white hover:bg-[#404040] cursor-pointer"
              }`}
            >
              PROCEED TO CHECKOUT
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* Accelerated Checkout Options */}
            <div className="mb-6">
              <span className="block text-[10px] font-extrabold uppercase text-[#888] text-center mb-2 tracking-wider">
                INSTANT ACCELERATED CHECKOUT
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  disabled={localCart.length === 0}
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="bg-[#5A31F4] text-white text-[12px] font-bold py-2.5 rounded-[8px] hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50"
                >
                  Shop Pay
                </button>
                <button
                  type="button"
                  disabled={localCart.length === 0}
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="bg-black text-white text-[12px] font-bold py-2.5 rounded-[8px] hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50"
                >
                   Pay
                </button>
                <button
                  type="button"
                  disabled={localCart.length === 0}
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="bg-[#F2F2F2] text-[#232323] text-[12px] font-bold py-2.5 rounded-[8px] hover:bg-[#E5E5E5] transition-colors flex items-center justify-center border border-[#E0E0E0] disabled:opacity-50"
                >
                  G Pay
                </button>
              </div>
            </div>

            {/* Security Guarantee Checklist */}
            <div className="flex flex-col gap-2.5 text-[12px] text-[#555] border-t border-[#EAEAEA] pt-5">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>256-bit bank-grade SSL encrypted checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Complimentary 30-day effortless returns</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>100% Guaranteed authentic atelier products</span>
              </div>
            </div>

            {/* Concierge Sizing Callout */}
            <div className="bg-[#F4EBE1]/60 border border-[#E8DCCB] rounded-[14px] p-4 mt-6 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#232323] text-white flex items-center justify-center shrink-0 font-extrabold text-[12px]">
                CS
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#232323]">Need sizing consultation?</h4>
                <a href="#concierge" className="text-[12px] text-[#9E784F] font-semibold hover:underline">
                  Chat with CURA Studio Concierge →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SAVED FOR LATER Section */}
        <div className="bg-white border border-[#E5E5E5] rounded-[18px] p-6 lg:p-8 mb-14 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#EAEAEA] mb-6">
            <div className="flex items-center gap-3">
              <h2 className="font-oswald text-[24px] font-bold uppercase tracking-tight text-[#232323]">
                SAVED FOR LATER
              </h2>
              {store.wishlistCount > 0 && (
                <span className="bg-[#F0F0F0] text-[#555] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {store.wishlistCount} ITEM{store.wishlistCount !== 1 ? "S" : ""}
                </span>
              )}
            </div>
            <Link href="/wishlist" className="text-[13px] font-semibold text-[#666] hover:text-[#232323] transition-colors">
              View All Wishlist ({store.wishlistCount})
            </Link>
          </div>

          {localSaved.length === 0 ? (
            <p className="text-[14px] text-[#888] py-4 text-center">No items currently saved for later.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localSaved.map((sItem) => (
                <div
                  key={sItem.id}
                  className="bg-[#F9F9F9] border border-[#EBEBEB] rounded-[14px] p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative w-16 h-16 bg-white rounded-[10px] overflow-hidden shrink-0 border border-[#EAEAEA]">
                      <Image src={sItem.imageUrl} alt={sItem.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[14px] font-bold text-[#232323] truncate">{sItem.title}</h3>
                      <p className="text-[12px] text-[#666] leading-tight">{sItem.specs}</p>
                      <span className="text-[13px] font-extrabold text-[#232323] block mt-1">
                        GH₵ {sItem.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMoveSavedToCart(sItem)}
                      className="bg-[#232323] text-white text-[12px] font-bold px-3.5 py-2 rounded-full hover:bg-[#404040] transition-colors flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Move to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveSavedItem(sItem.id)}
                      aria-label="Remove saved item"
                      className="p-2 text-[#999] hover:text-[#D32F2F] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PEOPLE ALSO BOUGHT • COMPLEMENTARY PIECES Carousel Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase text-[#9E784F] tracking-widest block mb-1">
                CURATED ATELIER EDIT
              </span>
              <h2 className="font-oswald text-[28px] sm:text-[32px] font-extrabold uppercase tracking-tight text-[#232323]">
                PEOPLE ALSO BOUGHT • COMPLEMENTARY PIECES
              </h2>
              <p className="text-[13px] text-[#777]">
                Harmonious pairing silhouettes frequently bundled by atelier patrons
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous items"
                className="w-9 h-9 rounded-full bg-white border border-[#E0E0E0] flex items-center justify-center text-[#555] hover:bg-[#232323] hover:text-white transition-colors"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next items"
                className="w-9 h-9 rounded-full bg-white border border-[#E0E0E0] flex items-center justify-center text-[#555] hover:bg-[#232323] hover:text-white transition-colors"
              >
                ›
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPLEMENTARY_PRODUCTS.map((comp) => {
              const inCart = store.isInCart(comp.id);
              const inWishlist = store.isInWishlist(comp.id);
              return (
                <div
                  key={comp.id}
                  className="bg-white border border-[#E5E5E5] rounded-[16px] overflow-hidden flex flex-col justify-between p-4 group hover:shadow-md transition-all"
                >
                  <div className="relative w-full aspect-square bg-[#F5F5F5] rounded-[12px] overflow-hidden mb-4">
                    <Image
                      src={comp.imageUrl}
                      alt={comp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#232323] text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {comp.badge}
                    </span>
                    <button
                      type="button"
                      onClick={() => store.toggleWishlist(comp.id)}
                      aria-label="Toggle wishlist"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#232323] hover:bg-white transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill={inWishlist ? "#D32F2F" : "none"}
                        viewBox="0 0 24 24"
                        stroke={inWishlist ? "#D32F2F" : "currentColor"}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#888] uppercase tracking-wider block mb-1">
                        {comp.category}
                      </span>
                      <h3 className="text-[15px] font-bold text-[#232323] leading-snug mb-1">
                        {comp.title}
                      </h3>
                      <span className="text-[14px] font-extrabold text-[#232323] block mb-4">
                        GH₵ {comp.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={inCart}
                      onClick={() => handleQuickAddComplementary(comp)}
                      className={`w-full py-2.5 rounded-full text-[13px] font-bold transition-all ${
                        inCart
                          ? "bg-[#E0E0E0] text-[#888] cursor-not-allowed"
                          : "bg-[#F4F4F4] text-[#232323] hover:bg-[#232323] hover:text-white cursor-pointer"
                      }`}
                    >
                      {inCart ? "Added to Cart" : "+ Quick Add"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[20px] max-w-md w-full p-6 lg:p-8 shadow-2xl relative text-center">
            <button
              type="button"
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-[#888] hover:text-[#232323] text-[20px] font-bold"
            >
              ✕
            </button>

            <div className="w-16 h-16 bg-[#F4EBE1] text-[#9E784F] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="font-oswald text-[24px] font-bold uppercase text-[#232323] mb-2">
              Ready to Order
            </h3>
            <p className="text-[14px] text-[#666] mb-6">
              Your atelier cart total is <strong>GH₵ {finalTotal.toFixed(2)}</strong>. You will now be routed to secure SSL payment processing.
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  alert("Order successfully initiated! Thank you for purchasing from CURA Atelier.");
                  setIsCheckoutModalOpen(false);
                }}
                className="w-full bg-[#232323] text-white font-bold py-3.5 rounded-full hover:bg-[#404040] transition-colors"
              >
                Confirm Order & Pay
              </button>
              <button
                type="button"
                onClick={() => setIsCheckoutModalOpen(false)}
                className="w-full text-[13px] font-bold text-[#777] hover:text-[#232323] py-2"
              >
                Return to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
