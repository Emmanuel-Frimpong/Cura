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
