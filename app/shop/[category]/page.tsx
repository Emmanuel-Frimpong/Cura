import { fetchCategoryProducts } from "@/lib/services/products";
import { CategoryPageTemplate } from "@/components/category/category-page-template";
import { CATEGORY_DATA_MAP } from "@/lib/category-data";

export async function generateStaticParams() {
  return [
    { category: "sneakers" },
    { category: "shirts" },
    { category: "watches" },
    { category: "spectacles" },
  ];
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categoryKey = resolvedParams.category?.toLowerCase() || "sneakers";

  // Fetch database products with fallback to rich curated mock dataset
  const categoryData = await fetchCategoryProducts(categoryKey);

  return <CategoryPageTemplate categoryData={categoryData} />;
}
