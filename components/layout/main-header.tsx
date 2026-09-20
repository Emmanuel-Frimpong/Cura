"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

export interface MainHeaderProps {
  cartCount?: number;
  wishlistCount?: number;
  destinations?: {
    home?: string;
    shop?: string;
    newArrivals?: string;
    brands?: string;
    sale?: string;
    wishlist?: string;
    cart?: string;
    account?: string;
  };
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  cartCount = 0,
  wishlistCount = 0,
  destinations = {},
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const routes = {
    home: destinations.home || "/",
    shop: destinations.shop || "/shop",
    newArrivals: destinations.newArrivals || "/new-arrivals",
    brands: destinations.brands || "/brands",
    sale: destinations.sale || "/sale",
    wishlist: destinations.wishlist || "/wishlist",
    cart: destinations.cart || "/cart",
    account: destinations.account || "/account",
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${routes.shop}?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white border-b border-[#E0E0E0] sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-[74px] flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href={routes.home} className="flex items-center gap-1 shrink-0 group">
          <span className="font-oswald text-[32px] font-extrabold tracking-tight text-[#232323]">
            CURA<span className="text-[#232323]">.</span>
          </span>
        </Link>

        {/* Main Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[14px] font-semibold text-[#232323]">
          <Link href={routes.home} className="hover:text-[#676767] transition-colors">
            Home
          </Link>
          <Link href={routes.shop} className="hover:text-[#676767] transition-colors">
            Shop
          </Link>
          <Link href={routes.newArrivals} className="hover:text-[#676767] transition-colors">
            New Arrivals
          </Link>
          <Link href={routes.brands} className="hover:text-[#676767] transition-colors">
            Brands
          </Link>
          <Link
            href={routes.sale}
            className="text-[#D84315] hover:text-[#C62828] font-bold transition-colors flex items-center gap-1"
          >
            Sale
          </Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden lg:block relative">
          <label htmlFor="desktop-search-input" className="sr-only">
            Search products
          </label>
          <div className="relative flex items-center">
            <svg
              className="w-4 h-4 text-[#A0A0A0] absolute left-3.5 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              id="desktop-search-input"
              type="text"
              aria-label="Search shoes, shirts, watches, spectacles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shoes, shirts, watches, spectacles..."
              className="w-full h-[42px] bg-[#F8F8F8] border border-[#E0E0E0] rounded-full pl-10 pr-4 text-[13px] text-[#232323] placeholder-[#A0A0A0] focus:outline-none focus:border-[#232323] focus:bg-white transition-all"
            />
          </div>
        </form>

        {/* Action Icons & Auth Controls */}
        <div className="flex items-center gap-4 text-[#232323]">
          {/* Mobile Search Icon */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Toggle mobile search bar"
            className="lg:hidden p-2 hover:opacity-75 focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Wishlist */}
          <Link
            href={routes.wishlist}
            aria-label={`View Wishlist, ${wishlistCount} items`}
            className="relative p-2 hover:opacity-75 transition-opacity cursor-pointer block"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#232323] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          </Link>

          {/* Cart */}
          <Link
            href={routes.cart}
            aria-label={`View Shopping Cart, ${cartCount} items`}
            className="relative p-2 hover:opacity-75 transition-opacity cursor-pointer block"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#232323] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          {/* Clerk Auth Controls */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#E0E0E0]">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  type="button"
                  aria-label="Sign in to your account"
                  className="px-3 py-1.5 text-[13px] font-bold text-[#232323] hover:text-[#676767] transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  type="button"
                  aria-label="Create a new account"
                  className="px-4 py-1.5 text-[13px] font-bold text-white bg-[#232323] rounded-[8px] hover:bg-[#454545] transition-colors cursor-pointer shadow-xs"
                >
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      </div>

      {/* Mobile Search Field Drawer */}
      {mobileSearchOpen && (
        <div className="lg:hidden px-4 pb-3 pt-1 border-t border-[#E0E0E0] bg-[#F8F8F8]">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <label htmlFor="mobile-search-input" className="sr-only">
              Mobile product search
            </label>
            <input
              id="mobile-search-input"
              type="text"
              aria-label="Mobile product search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full h-[40px] bg-white border border-[#E0E0E0] rounded-full pl-4 pr-10 text-[13px] text-[#232323]"
            />
            <button
              type="submit"
              aria-label="Execute search"
              className="absolute right-3 text-[#232323]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

