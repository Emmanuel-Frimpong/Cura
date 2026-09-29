import React from "react";
import { TopBar } from "@/components/layout/top-bar";
import { MainHeader } from "@/components/layout/main-header";
import { CategoryNav } from "@/components/layout/category-nav";
import { HeroSection } from "@/components/home/hero-section";
import { BrandsBar } from "@/components/home/brands-bar";
import { StyleSelector } from "@/components/home/style-selector";
import { CuratedEssentials } from "@/components/home/curated-essentials";
import { BestSellers } from "@/components/home/best-sellers";
import { PromoBanner } from "@/components/home/promo-banner";
import { CollectionsGrid } from "@/components/home/collections-grid";
import { TrustSignals } from "@/components/home/trust-signals";
import { CommunityReviews } from "@/components/home/community-reviews";
import { Newsletter } from "@/components/home/newsletter";
import { Footer } from "@/components/layout/footer";
import { fetchBestSellerProducts, fetchHomepageBrands } from "@/lib/services/products";

/** Renders the CURA storefront homepage fetching live database data. */
export default async function HomePage() {
  const [bestSellers, brands] = await Promise.all([
    fetchBestSellerProducts(),
    fetchHomepageBrands(),
  ]);

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-[#232323] flex flex-col font-sans">
      <TopBar />
      <MainHeader />
      <CategoryNav />
      <main className="flex-1">
        <HeroSection />
        <BrandsBar brands={brands} />
        <StyleSelector />
        <CuratedEssentials />
        <BestSellers initialProducts={bestSellers} />
        <PromoBanner />
        <CollectionsGrid />
        <TrustSignals />
        <CommunityReviews />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
