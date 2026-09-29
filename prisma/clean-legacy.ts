import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const legacySlugs = ["air-jordan-4-retro", "cura-mens-linen-shirt"];
  const deleted = await prisma.product.deleteMany({
    where: {
      slug: { in: legacySlugs },
    },
  });

  console.log(`Cleaned ${deleted.count} legacy products.`);
}

main().then(() => prisma.$disconnect());
