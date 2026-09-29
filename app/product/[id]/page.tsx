import React from "react";
import { TopBar } from "@/components/layout/top-bar";
import { MainHeader } from "@/components/layout/main-header";
import { CategoryNav } from "@/components/layout/category-nav";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return {
    title: `Air Jordan 1 Retro High OG | CURA Atelier`,
    description: `Shop the Air Jordan 1 Retro High OG in Italian calfskin at CURA Atelier Essentials.`,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let dbProduct = null;
  try {
    dbProduct = await prisma.product.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }, { sku: id }],
      },
      include: {
        brand: true,
        category: true,
        images: true,
        attributes: true,
      },
    });
  } catch (err) {
    console.warn("Prisma query warning for product detail page:", err);
  }

  const initialProduct = dbProduct
    ? {
        id: dbProduct.id,
        sku: dbProduct.sku,
        title: dbProduct.name,
        brand: dbProduct.brand?.name?.toUpperCase() || "CURA ARCHIVE",
        category: dbProduct.category?.name || "Sneakers",
        price: Number(dbProduct.basePrice),
        originalPrice: dbProduct.compareAtPrice ? Number(dbProduct.compareAtPrice) : undefined,
        description: dbProduct.description || dbProduct.shortDescription || "Archival high-top silhouette in tumbled Italian calfskin.",
        rating: 4.9,
        reviewsCount: 3420,
        images: dbProduct.images.length > 0 ? dbProduct.images.map((img) => img.imageUrl) : [
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
        ],
        colors: [
          { name: "Heritage Black / Crimson / White", hex: "#B71C1C" },
          { name: "Triple Optic White", hex: "#FFFFFF" },
          { name: "Stealth Shadow Grey", hex: "#424242" },
        ],
        sizes: ["7.5", "8.0", "8.5", "9.0", "9.5", "10.0", "10.5", "11.0", "11.5", "12.0", "13.0 (Out of Stock)"],
      }
    : undefined;

  return (
    <div className="min-h-screen bg-[#F8F8F8] text-[#232323] flex flex-col font-sans">
      <TopBar />
      <MainHeader />
      <CategoryNav />
      <main className="flex-1">
        <ProductDetailView initialProduct={initialProduct} />
      </main>
      <Footer />
    </div>
  );
}
