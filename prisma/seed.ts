import { PrismaClient, ProductStatus } from "@prisma/client";

const prisma = new PrismaClient();

const CLOUDINARY_IMAGES = {
  sneaker:
    "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
  cat_apparel:
    "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939419/cura/media/jlcvwvmt6uwyzp9ydnah.jpg",
  watches:
    "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/fhsosrlqavdxqwy0gppx.jpg",
  cat_eyewear:
    "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939421/cura/media/ttmav1ptoigprqbeprlv.jpg",
  hero_preview:
    "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg",
  shirt:
    "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939426/cura/media/vl8irhjorvfyn4o03ed5.jpg",
};

/** Seeds the baseline CURA roles, categories, brands, and sample products. */
async function main() {
  console.log("🌱 Starting CURA database seeding with Cloudinary URLs...");

  // 1. Roles & Permissions
  const superAdminRole = await prisma.role.upsert({
    where: { name: "SUPER_ADMIN" },
    update: {},
    create: {
      name: "SUPER_ADMIN",
      description: "Full system administration access",
    },
  });

  const customerRole = await prisma.role.upsert({
    where: { name: "CUSTOMER" },
    update: {},
    create: {
      name: "CUSTOMER",
      description: "Standard customer shopper access",
    },
  });

  // 2. Categories with Cloudinary Image URLs
  const sneakersCat = await prisma.category.upsert({
    where: { slug: "sneakers" },
    update: { imageUrl: CLOUDINARY_IMAGES.sneaker },
    create: {
      name: "Sneakers",
      slug: "sneakers",
      description: "Authentic branded shoes & footwear",
      imageUrl: CLOUDINARY_IMAGES.sneaker,
      displayOrder: 1,
    },
  });

  const shirtsCat = await prisma.category.upsert({
    where: { slug: "shirts-apparel" },
    update: { imageUrl: CLOUDINARY_IMAGES.cat_apparel },
    create: {
      name: "Shirts & Apparel",
      slug: "shirts-apparel",
      description: "Luxury shirts, apparel & wardrobe essentials",
      imageUrl: CLOUDINARY_IMAGES.cat_apparel,
      displayOrder: 2,
    },
  });

  const watchesCat = await prisma.category.upsert({
    where: { slug: "wrist-watches" },
    update: { imageUrl: CLOUDINARY_IMAGES.watches },
    create: {
      name: "Wrist Watches",
      slug: "wrist-watches",
      description: "Precision horology & luxury wristwatches",
      imageUrl: CLOUDINARY_IMAGES.watches,
      displayOrder: 3,
    },
  });

  const eyewearCat = await prisma.category.upsert({
    where: { slug: "spectacles-eyewear" },
    update: { imageUrl: CLOUDINARY_IMAGES.cat_eyewear },
    create: {
      name: "Spectacles & Eyewear",
      slug: "spectacles-eyewear",
      description: "Optical frames & solar sunglasses",
      imageUrl: CLOUDINARY_IMAGES.cat_eyewear,
      displayOrder: 4,
    },
  });

  // 3. Brands
  const nikeBrand = await prisma.brand.upsert({
    where: { slug: "nike" },
    update: {},
    create: { name: "Nike", slug: "nike" },
  });

  const adidasBrand = await prisma.brand.upsert({
    where: { slug: "adidas" },
    update: {},
    create: { name: "Adidas", slug: "adidas" },
  });

  const jordanBrand = await prisma.brand.upsert({
    where: { slug: "jordan" },
    update: {},
    create: { name: "Jordan", slug: "jordan" },
  });

  const curaBrand = await prisma.brand.upsert({
    where: { slug: "cura" },
    update: {},
    create: { name: "CURA", slug: "cura" },
  });

  // 4. Sample Products with Cloudinary Product Images
  const aj4Product = await prisma.product.upsert({
    where: { slug: "air-jordan-4-retro" },
    update: {},
    create: {
      categoryId: sneakersCat.id,
      brandId: jordanBrand.id,
      name: "Air Jordan 4 Retro",
      slug: "air-jordan-4-retro",
      sku: "JDN-AJ4-001",
      shortDescription: "Iconic high-top black and white leather sneaker",
      description: "Authentic Air Jordan 4 Retro built with premium nubuck and leather.",
      basePrice: 210.0,
      compareAtPrice: 250.0,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      isNew: true,
      images: {
        create: [
          {
            imageUrl: CLOUDINARY_IMAGES.hero_preview,
            altText: "Air Jordan 4 Retro High OG",
            isPrimary: true,
            displayOrder: 1,
          },
        ],
      },
    },
  });

  const shirtProduct = await prisma.product.upsert({
    where: { slug: "cura-mens-linen-shirt" },
    update: {},
    create: {
      categoryId: shirtsCat.id,
      brandId: curaBrand.id,
      name: "CURA Men's Linen Shirt",
      slug: "cura-mens-linen-shirt",
      sku: "CUR-SHIRT-001",
      shortDescription: "Lightweight breathable classic linen shirt",
      description: "Tailored signature linen shirt for warm seasons.",
      basePrice: 75.0,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      images: {
        create: [
          {
            imageUrl: CLOUDINARY_IMAGES.shirt,
            altText: "CURA Men's Linen Shirt",
            isPrimary: true,
            displayOrder: 1,
          },
        ],
      },
    },
  });

  console.log("✅ Seeding completed with Cloudinary URLs successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
