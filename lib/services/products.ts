import { prisma } from "@/lib/prisma";
import { CATEGORY_DATA_MAP, CategoryData, ProductItem } from "@/lib/category-data";

export async function fetchCategoryProducts(categorySlug: string): Promise<CategoryData> {
  const fallback = CATEGORY_DATA_MAP[categorySlug] || CATEGORY_DATA_MAP["sneakers"];

  try {
    const dbCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { slug: categorySlug },
          { name: { contains: categorySlug, mode: "insensitive" } },
        ],
      },
      include: {
        products: {
          where: { isActive: true },
          include: {
            brand: true,
            attributes: true,
            images: true,
          },
        },
      },
    });

    if (!dbCategory || dbCategory.products.length === 0) {
      return fallback;
    }

    const dbBrands = await prisma.brand.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    const formattedBrands = dbBrands.map((b) => ({
      name: b.name,
      count: b._count.products,
    }));

    const mappedProducts: ProductItem[] = dbCategory.products.map((p, idx) => {
      const subAttr = p.attributes.find((a) => a.name === "subCategory")?.value;
      const badgeAttr = p.attributes.find((a) => a.name === "badge")?.value;
      const primaryImg = p.images.find((img) => img.isPrimary)?.imageUrl || p.images[0]?.imageUrl;

      return {
        id: p.id || `db-prod-${idx}`,
        brand: p.brand?.name?.toUpperCase() || "CURA ATELIER",
        subCategory: subAttr || "Signature",
        title: p.name,
        price: `GH₵ ${Number(p.basePrice).toFixed(2)}`,
        originalPrice: p.compareAtPrice ? `GH₵ ${Number(p.compareAtPrice).toFixed(2)}` : undefined,
        rating: 4.8 + (idx % 3) * 0.1,
        reviewsCount: 150 + idx * 45,
        imageUrl: primaryImg || fallback.products[0]?.imageUrl || "",
        badge: badgeAttr || (idx === 0 ? "ATELIER PICK" : undefined),
      };
    });

    return {
      ...fallback,
      name: dbCategory.name.toUpperCase(),
      description: dbCategory.description || fallback.description,
      brands: formattedBrands.length > 0 ? formattedBrands : fallback.brands,
      products: mappedProducts.length > 0 ? mappedProducts : fallback.products,
    };
  } catch (error) {
    console.warn("Database fetch warning, using fallback category data:", error);
    return fallback;
  }
}

export interface BestSellerProduct {
  id: string;
  category: string;
  type: string;
  title: string;
  variant: string;
  price: string;
  rating: string;
  saleBadge?: string;
  image: string;
}

export async function fetchBestSellerProducts(): Promise<BestSellerProduct[]> {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        products: {
          where: { isActive: true },
          take: 4,
          include: {
            brand: true,
            category: true,
            attributes: true,
            images: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    const allDbProducts = categories.flatMap((cat) => cat.products);

    if (allDbProducts.length === 0) return [];

    return allDbProducts.map((p, idx) => {
      const primaryImg = p.images.find((img) => img.isPrimary)?.imageUrl || p.images[0]?.imageUrl;
      const badgeAttr = p.attributes.find((a) => a.name === "badge")?.value;
      const subAttr = p.attributes.find((a) => a.name === "subCategory")?.value;

      let categoryType = "Sneakers";
      const catSlug = p.category?.slug?.toLowerCase() || "";
      const catName = p.category?.name?.toLowerCase() || "";

      if (catSlug.includes("shirt") || catName.includes("shirt") || catName.includes("apparel")) {
        categoryType = "Shirts";
      } else if (catSlug.includes("watch") || catName.includes("watch") || catName.includes("horology")) {
        categoryType = "Watches";
      } else if (
        catSlug.includes("spectacle") ||
        catSlug.includes("eyewear") ||
        catName.includes("spectacle") ||
        catName.includes("eyewear") ||
        catName.includes("optical")
      ) {
        categoryType = "Eyewear";
      } else {
        categoryType = "Sneakers";
      }

      return {
        id: p.id,
        category: p.brand?.name?.toUpperCase() || "CURA",
        type: categoryType,
        title: p.name,
        variant: subAttr || "Signature Edition",
        price: `GH₵ ${Number(p.basePrice).toFixed(2)}`,
        rating: `4.${8 - (idx % 3)} (${120 + idx * 15})`,
        saleBadge: badgeAttr || (p.compareAtPrice ? "SALE" : undefined),
        image: primaryImg || "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
      };
    });
  } catch (error) {
    console.warn("Error fetching best sellers from database:", error);
    return [];
  }
}

export async function fetchHomepageBrands(): Promise<string[]> {
  try {
    const brands = await prisma.brand.findMany({
      where: { isActive: true },
      take: 8,
      select: { name: true },
    });
    return brands.map((b) => b.name.toUpperCase());
  } catch {
    return ["NIKE", "JORDAN", "NEW BALANCE", "SALOMON", "TIMECRAFT", "MOSCOT"];
  }
}
