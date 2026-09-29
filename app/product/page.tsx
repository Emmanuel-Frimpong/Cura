import React from "react";
import { TopBar } from "@/components/layout/top-bar";
import { MainHeader } from "@/components/layout/main-header";
import { CategoryNav } from "@/components/layout/category-nav";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Air Jordan 1 Retro High OG | CURA Atelier Essentials",
  description: "Shop the Air Jordan 1 Retro High OG in Italian calfskin at CURA Atelier Essentials.",
};

export default function DefaultProductPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-[#232323] flex flex-col font-sans">
      <TopBar />
      <MainHeader />
      <CategoryNav />
      <main className="flex-1">
        <ProductDetailView />
      </main>
      <Footer />
    </div>
  );
}
