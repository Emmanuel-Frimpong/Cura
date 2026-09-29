import React from "react";
import { TopBar } from "@/components/layout/top-bar";
import { MainHeader } from "@/components/layout/main-header";
import { CategoryNav } from "@/components/layout/category-nav";
import { CartPageContent } from "@/components/cart/cart-page-content";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Your Shopping Cart | CURA Atelier Essentials",
  description: "Review items in your shopping cart, apply promo codes, check express shipping eligibility, and proceed to secure checkout.",
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-[#232323] flex flex-col font-sans">
      <TopBar />
      <MainHeader />
      <CategoryNav />
      <main className="flex-1">
        <CartPageContent />
      </main>
      <Footer />
    </div>
  );
}
