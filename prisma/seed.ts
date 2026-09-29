import { PrismaClient, ProductStatus, InventoryTransactionType } from "@prisma/client";
import {
  CATEGORIES_SEED,
  BRANDS_SEED,
  SIZES_SEED,
  COLORS_SEED,
  SNEAKERS_SEED,
  SHIRTS_SEED,
  WATCHES_SEED,
  SPECTACLES_SEED,
  ProductSeedInput,
} from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting CURA 80-Product Catalog Database Seeding...");

  // 1. Roles
  await prisma.role.upsert({
    where: { name: "SUPER_ADMIN" },
    update: {},
    create: { name: "SUPER_ADMIN", description: "Full system administration access" },
  });

  await prisma.role.upsert({
    where: { name: "CUSTOMER" },
    update: {},
    create: { name: "CUSTOMER", description: "Standard customer shopper access" },
  });

  // 2. Categories
  const categoryMap = new Map<string, string>();
  for (const catSeed of CATEGORIES_SEED) {
    const dbCat = await prisma.category.upsert({
      where: { slug: catSeed.slug },
      update: {
        name: catSeed.name,
        description: catSeed.description,
        imageUrl: catSeed.imageUrl,
        displayOrder: catSeed.displayOrder,
      },
      create: {
        name: catSeed.name,
        slug: catSeed.slug,
        description: catSeed.description,
        imageUrl: catSeed.imageUrl,
        displayOrder: catSeed.displayOrder,
      },
    });
    categoryMap.set(catSeed.slug, dbCat.id);
  }

  // 3. Brands
  const brandMap = new Map<string, string>();
  for (const bSeed of BRANDS_SEED) {
    const dbBrand = await prisma.brand.upsert({
      where: { slug: bSeed.slug },
      update: { name: bSeed.name, description: bSeed.description },
      create: { name: bSeed.name, slug: bSeed.slug, description: bSeed.description },
    });
    brandMap.set(bSeed.slug, dbBrand.id);
  }

  // 4. Sizes
  const sizeMap = new Map<string, string>();
  for (const sSeed of SIZES_SEED) {
    const existingSize = await prisma.size.findFirst({
      where: { categoryType: sSeed.categoryType, code: sSeed.code },
    });
    if (existingSize) {
      sizeMap.set(`${sSeed.categoryType}:${sSeed.code}`, existingSize.id);
    } else {
      const created = await prisma.size.create({
        data: {
          categoryType: sSeed.categoryType,
          name: sSeed.name,
          code: sSeed.code,
          displayOrder: sSeed.displayOrder,
        },
      });
      sizeMap.set(`${sSeed.categoryType}:${sSeed.code}`, created.id);
    }
  }

  // 5. Colors
  const colorMap = new Map<string, string>();
  for (const cSeed of COLORS_SEED) {
    const existingColor = await prisma.color.findFirst({
      where: { name: cSeed.name },
    });
    if (existingColor) {
      colorMap.set(cSeed.name, existingColor.id);
    } else {
      const created = await prisma.color.create({
        data: { name: cSeed.name, hexCode: cSeed.hexCode },
      });
      colorMap.set(cSeed.name, created.id);
    }
  }

  // 6. Products Seeding Engine (80 items)
  const allProductsSeed: ProductSeedInput[] = [
    ...SNEAKERS_SEED,
    ...SHIRTS_SEED,
    ...WATCHES_SEED,
    ...SPECTACLES_SEED,
  ];

  console.log(`📦 Seeding ${allProductsSeed.length} catalog items...`);

  let seededProductsCount = 0;
  let seededVariantsCount = 0;
  let seededImagesCount = 0;

  for (const prodSeed of allProductsSeed) {
    const categoryId = categoryMap.get(prodSeed.categorySlug);
    if (!categoryId) {
      console.warn(`Category slug '${prodSeed.categorySlug}' not found! Skipping ${prodSeed.name}`);
      continue;
    }

    const brandId = brandMap.get(prodSeed.brandSlug);

    // Upsert Main Product
    const dbProduct = await prisma.product.upsert({
      where: { slug: prodSeed.slug },
      update: {
        name: prodSeed.name,
        sku: prodSeed.sku,
        categoryId: categoryId,
        brandId: brandId || null,
        shortDescription: prodSeed.shortDescription,
        description: prodSeed.description,
        basePrice: prodSeed.basePrice,
        compareAtPrice: prodSeed.compareAtPrice || null,
        status: ProductStatus.ACTIVE,
        isFeatured: prodSeed.isFeatured || false,
        isNew: prodSeed.isNew || false,
        isActive: true,
      },
      create: {
        name: prodSeed.name,
        slug: prodSeed.slug,
        sku: prodSeed.sku,
        categoryId: categoryId,
        brandId: brandId || null,
        shortDescription: prodSeed.shortDescription,
        description: prodSeed.description,
        basePrice: prodSeed.basePrice,
        compareAtPrice: prodSeed.compareAtPrice || null,
        status: ProductStatus.ACTIVE,
        isFeatured: prodSeed.isFeatured || false,
        isNew: prodSeed.isNew || false,
        isActive: true,
      },
    });

    seededProductsCount++;

    // Refresh Images
    await prisma.productImage.deleteMany({ where: { productId: dbProduct.id } });
    for (const img of prodSeed.images) {
      await prisma.productImage.create({
        data: {
          productId: dbProduct.id,
          imageUrl: img.url,
          altText: img.alt,
          isPrimary: img.isPrimary || false,
          displayOrder: img.order || 1,
        },
      });
      seededImagesCount++;
    }

    // Refresh Attributes
    await prisma.productAttribute.deleteMany({ where: { productId: dbProduct.id } });
    for (const attr of prodSeed.attributes) {
      await prisma.productAttribute.create({
        data: {
          productId: dbProduct.id,
          name: attr.name,
          value: attr.value,
        },
      });
    }

    // Upsert Variants & Inventory
    const categoryTypeUpper = prodSeed.categorySlug.toUpperCase();
    for (const vSeed of prodSeed.variants) {
      const sizeId = vSeed.sizeCode
        ? sizeMap.get(`${categoryTypeUpper}:${vSeed.sizeCode}`) ||
          sizeMap.get(`SNEAKERS:${vSeed.sizeCode}`) ||
          sizeMap.get(`SHIRTS:${vSeed.sizeCode}`) ||
          sizeMap.get(`SPECTACLES:${vSeed.sizeCode}`) ||
          sizeMap.get(`WATCHES:${vSeed.sizeCode}`)
        : undefined;

      const colorId = vSeed.colorName ? colorMap.get(vSeed.colorName) : undefined;

      const dbVariant = await prisma.productVariant.upsert({
        where: { sku: vSeed.sku },
        update: {
          price: vSeed.price,
          compareAtPrice: vSeed.compareAtPrice || null,
          isDefault: vSeed.isDefault || false,
          isActive: true,
          sizeId: sizeId || null,
          colorId: colorId || null,
        },
        create: {
          productId: dbProduct.id,
          sku: vSeed.sku,
          price: vSeed.price,
          compareAtPrice: vSeed.compareAtPrice || null,
          isDefault: vSeed.isDefault || false,
          isActive: true,
          sizeId: sizeId || null,
          colorId: colorId || null,
        },
      });

      seededVariantsCount++;

      // Upsert Inventory
      const dbInventory = await prisma.inventory.upsert({
        where: { variantId: dbVariant.id },
        update: {
          quantityAvailable: vSeed.inventory,
          quantityReserved: 0,
        },
        create: {
          variantId: dbVariant.id,
          quantityAvailable: vSeed.inventory,
          quantityReserved: 0,
          reorderLevel: 5,
          isTracked: true,
        },
      });

      // Record Inventory Transaction if initial
      const existingTx = await prisma.inventoryTransaction.findFirst({
        where: { inventoryId: dbInventory.id, type: InventoryTransactionType.RECEIVE },
      });

      if (!existingTx) {
        await prisma.inventoryTransaction.create({
          data: {
            inventoryId: dbInventory.id,
            type: InventoryTransactionType.RECEIVE,
            quantityChange: vSeed.inventory,
            previousQuantity: 0,
            newQuantity: vSeed.inventory,
            reason: "INITIAL_STOCK_SEED",
            createdBy: "SEED_SCRIPT",
          },
        });
      }
    }
  }

  console.log(`🎉 Database Seeding Complete!`);
  console.log(`-----------------------------------`);
  console.log(`Total Products Seeded : ${seededProductsCount}`);
  console.log(`Total Variants Seeded : ${seededVariantsCount}`);
  console.log(`Total Images Seeded   : ${seededImagesCount}`);
  console.log(`-----------------------------------`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding Error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
