import { fetchCategoryProducts } from "@/lib/services/products";
import { CategoryPageTemplate } from "@/components/category/category-page-template";

export default async function ShopPage() {
  const categoryData = await fetchCategoryProducts("sneakers");
  return <CategoryPageTemplate categoryData={categoryData} />;
}
