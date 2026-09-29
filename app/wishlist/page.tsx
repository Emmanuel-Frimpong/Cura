import React from "react";
import { TopBar } from "@/components/layout/top-bar";
import { MainHeader } from "@/components/layout/main-header";
import { CategoryNav } from "@/components/layout/category-nav";
import { WishlistPageContent } from "@/components/wishlist/wishlist-page-content";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "My Wishlist | CURA Atelier Essentials",
  description: "View and manage your curated personal wishlist, move saved items to cart, and track live inventory dispatches.",
};

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-[#232323] flex flex-col font-sans">
      <TopBar />
      <MainHeader />
      <CategoryNav />
      <main className="flex-1">
        <WishlistPageContent />
      </main>
      <Footer />
    </div>
  );
}
