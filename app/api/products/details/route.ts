import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CATEGORY_DATA_MAP } from "@/lib/category-data";

export interface ResolvedProductDetail {
  id: string;
  sku: string;
  badge: string;
  title: string;
  specs: string;
  unitPrice: number;
  imageUrl: string;
  inStock: boolean;
}

// Fallback lookup from category-data.ts
const STATIC_PRODUCTS_LOOKUP: Record<string, ResolvedProductDetail> = {};

Object.values(CATEGORY_DATA_MAP).forEach((cat) => {
  cat.products.forEach((p) => {
    const numericPrice = parseFloat(p.price.replace(/[^0-9.]/g, "")) || 150.0;
    let badgeType = "ATELIER";
    if (cat.slug.includes("sneaker")) badgeType = "FOOTWEAR";
    else if (cat.slug.includes("shirt")) badgeType = "APPAREL";
    else if (cat.slug.includes("watch")) badgeType = "HOROLOGY";
    else if (cat.slug.includes("spectacle")) badgeType = "OPTICS";

    STATIC_PRODUCTS_LOOKUP[p.id] = {
      id: p.id,
      sku: `CR-${badgeType.slice(0, 3)}-${p.id.slice(0, 4).toUpperCase()}`,
      badge: badgeType,
      title: p.title,
      specs: `${p.brand}  •  ${p.subCategory}`,
      unitPrice: numericPrice,
      imageUrl: p.imageUrl,
      inStock: true,
    };
  });
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const ids: string[] = Array.isArray(body.ids) ? body.ids : [];

    if (ids.length === 0) {
      return NextResponse.json({ products: [] });
    }

    // 1. Fetch from Database using Prisma
    let dbProducts: any[] = [];
    try {
      dbProducts = await prisma.product.findMany({
        where: { id: { in: ids } },
        include: {
          category: true,
          brand: true,
          images: true,
          attributes: true,
        },
      });
    } catch (err) {
      console.warn("Prisma query warning in /api/products/details:", err);
    }

    const resolvedMap: Record<string, ResolvedProductDetail> = {};

    // Map database results
    dbProducts.forEach((p) => {
      const primaryImg =
        p.images.find((img: any) => img.isPrimary)?.imageUrl ||
        p.images[0]?.imageUrl ||
        "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg";

      const subAttr = p.attributes.find((a: any) => a.name === "subCategory")?.value;
      const catName = p.category?.name?.toUpperCase() || "ATELIER";

      let badgeType = "ATELIER";
      const catSlug = p.category?.slug?.toLowerCase() || "";
      if (catSlug.includes("shirt")) badgeType = "APPAREL";
      else if (catSlug.includes("watch")) badgeType = "HOROLOGY";
      else if (catSlug.includes("spectacle") || catSlug.includes("eyewear")) badgeType = "OPTICS";
      else if (catSlug.includes("sneaker")) badgeType = "FOOTWEAR";

      resolvedMap[p.id] = {
        id: p.id,
        sku: p.sku || `CR-${badgeType.slice(0, 3)}-${p.id.slice(0, 6).toUpperCase()}`,
        badge: badgeType,
        title: p.name,
        specs: `${p.brand?.name || "CURA"}  •  ${subAttr || "Signature Edition"}`,
        unitPrice: Number(p.basePrice) || 150.0,
        imageUrl: primaryImg,
        inStock: true,
      };
    });

    // Fill missing from static lookup or generic fallback
    ids.forEach((id) => {
      if (!resolvedMap[id]) {
        if (STATIC_PRODUCTS_LOOKUP[id]) {
          resolvedMap[id] = STATIC_PRODUCTS_LOOKUP[id];
        }
      }
    });

    return NextResponse.json({
      products: Object.values(resolvedMap),
    });
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    return NextResponse.json({ error: "Failed to fetch product details" }, { status: 500 });
  }
}
