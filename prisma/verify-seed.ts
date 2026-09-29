import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Verifying 80-Product Catalog Database Seeding...\n");

  const totalProducts = await prisma.product.count();
  const sneakersCount = await prisma.product.count({
    where: { category: { slug: "sneakers" } },
  });
  const shirtsCount = await prisma.product.count({
    where: { category: { slug: "shirts" } },
  });
  const watchesCount = await prisma.product.count({
    where: { category: { slug: "watches" } },
  });
  const spectaclesCount = await prisma.product.count({
    where: { category: { slug: "spectacles" } },
  });

  const totalVariants = await prisma.productVariant.count();
  const productsWithImages = await prisma.product.count({
    where: { images: { some: {} } },
  });
  const featuredProductsCount = await prisma.product.count({
    where: { isFeatured: true },
  });

  const inStockVariants = await prisma.inventory.count({
    where: { quantityAvailable: { gt: 4 } },
  });
  const lowStockVariants = await prisma.inventory.count({
    where: { quantityAvailable: { gt: 0, lte: 4 } },
  });
  const outOfStockVariants = await prisma.inventory.count({
    where: { quantityAvailable: 0 },
  });

  console.log("==========================================");
  console.log("📊 SEED VERIFICATION REPORT");
  console.log("==========================================");
  console.log(`Total Products        : ${totalProducts} (Expected: 80)`);
  console.log(`- Sneakers            : ${sneakersCount} (Expected: 20)`);
  console.log(`- Shirts & Apparel    : ${shirtsCount} (Expected: 20)`);
  console.log(`- Wrist Watches       : ${watchesCount} (Expected: 20)`);
  console.log(`- Spectacles & Eyewear: ${spectaclesCount} (Expected: 20)`);
  console.log(`------------------------------------------`);
  console.log(`Total Variants        : ${totalVariants}`);
  console.log(`Products with Images  : ${productsWithImages}`);
  console.log(`Featured Products     : ${featuredProductsCount}`);
  console.log(`------------------------------------------`);
  console.log(`In-Stock Variants (>4): ${inStockVariants}`);
  console.log(`Low-Stock Variants    : ${lowStockVariants}`);
  console.log(`Out-of-Stock Variants : ${outOfStockVariants}`);
  console.log("==========================================");

  if (
    totalProducts === 80 &&
    sneakersCount === 20 &&
    shirtsCount === 20 &&
    watchesCount === 20 &&
    spectaclesCount === 20
  ) {
    console.log("✅ CATALOG SEEDING VERIFICATION PASSED PERFECTLY!");
  } else {
    console.error("❌ VERIFICATION FAILED: Unexpected count mismatch!");
    process.exit(1);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Verification Error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
