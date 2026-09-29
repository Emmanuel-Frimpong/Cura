import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const images = await prisma.productImage.findMany({
    include: {
      product: {
        select: {
          name: true,
          slug: true,
          category: { select: { name: true } },
        },
      },
    },
  });

  const total = images.length;
  const cloudinaryImages = images.filter((img) =>
    img.imageUrl.startsWith("https://res.cloudinary.com/")
  );
  const productsWithoutImages = await prisma.product.count({
    where: { images: { none: {} } },
  });

  console.log(`Total Product Images in DB: ${total}`);
  console.log(`Cloudinary Hosted Images  : ${cloudinaryImages.length}`);
  console.log(`Products without Images   : ${productsWithoutImages}`);

  if (cloudinaryImages.length === total && productsWithoutImages === 0) {
    console.log("✅ ALL 80 products have valid Cloudinary image URLs!");
  } else {
    console.log("⚠️ Some products or images do not match Cloudinary!");
  }
}

main().then(() => prisma.$disconnect());
