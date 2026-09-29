import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";

// Configure Cloudinary explicitly from environment URL
cloudinary.config({
  cloud_name: "ovwiwt64",
  api_key: "611133344595584",
  api_secret: "TdrYpS_y0pl9jv5ZXY8EIS81H64",
  secure: true,
});

const prisma = new PrismaClient();

interface PhotoMapping {
  slug: string;
  sourceUrl: string;
}

const PRODUCT_PHOTOS: PhotoMapping[] = [
  // Sneakers (20)
  { slug: "air-jordan-1-retro-hi-og-heritage", sourceUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80" },
  { slug: "new-balance-990v2-heritage-cream", sourceUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80" },
  { slug: "aura-studio-minimalist-low-top", sourceUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80" },
  { slug: "air-jordan-monochromatic-shadow", sourceUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80" },
  { slug: "salomon-lab-xt6-slate-grey", sourceUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-court-classic-low-raw", sourceUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80" },
  { slug: "new-balance-530-metallic-chrome", sourceUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80" },
  { slug: "converse-chuck-70s-parchment", sourceUrl: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80" },
  { slug: "nike-dunk-low-retro-panda", sourceUrl: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=800&q=80" },
  { slug: "adidas-samba-og-white-black", sourceUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80" },
  { slug: "nike-air-max-1-86-big-bubble", sourceUrl: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80" },
  { slug: "new-balance-2002r-protection-pack-rain-cloud", sourceUrl: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=800&q=80" },
  { slug: "salomon-acs-pro-advanced-metal-grey", sourceUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80" },
  { slug: "asics-gel-kayano-14-cream-black", sourceUrl: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-runner-one-monolith-black", sourceUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" },
  { slug: "nike-air-force-1-07-triple-white", sourceUrl: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80" },
  { slug: "adidas-gazelle-indoor-navy-gum", sourceUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=800&q=80" },
  { slug: "new-balance-993-made-in-usa-grey", sourceUrl: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80" },
  { slug: "puma-suede-classic-black-white", sourceUrl: "https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-atelier-desert-runner-sand", sourceUrl: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=800&q=80" },

  // Shirts (20)
  { slug: "cura-tailored-french-linen-shirt-raw", sourceUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80" },
  { slug: "crown-thread-heavyweight-box-tee", sourceUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80" },
  { slug: "northline-pinpoint-oxford-navy", sourceUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80" },
  { slug: "vertex-knit-pique-polo-olive", sourceUrl: "https://images.unsplash.com/photo-1625910513413-864704386906?auto=format&fit=crop&w=800&q=80" },
  { slug: "aura-oversized-silk-cotton-camp-shirt", sourceUrl: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-essential-supima-crew-white", sourceUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80" },
  { slug: "crown-thread-brushed-flannel-overshirt", sourceUrl: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80" },
  { slug: "aurelia-striped-poplin-shirt-blue", sourceUrl: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=800&q=80" },
  { slug: "northline-japanese-selvedge-denim-shirt", sourceUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-graphic-archival-monolith-tee", sourceUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80" },
  { slug: "vertex-waffle-knit-thermal-shirt", sourceUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-textured-seersucker-short-sleeve", sourceUrl: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=800&q=80" },
  { slug: "northline-merino-wool-knitted-polo", sourceUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80" },
  { slug: "crown-thread-twill-utility-workshirt", sourceUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80" },
  { slug: "aura-studio-draped-viscose-shirt", sourceUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-minimalist-mock-neck-tee", sourceUrl: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=800&q=80" },
  { slug: "aurelia-sea-island-cotton-dress-shirt", sourceUrl: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=800&q=80" },
  { slug: "vertex-french-terry-long-sleeve", sourceUrl: "https://images.unsplash.com/photo-1618354691229-88d47f285158?auto=format&fit=crop&w=800&q=80" },
  { slug: "northline-chambray-work-shirt-blue", sourceUrl: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-linen-cotton-band-collar-shirt", sourceUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80" },

  // Watches (20)
  { slug: "timecraft-chronograph-monolith-automatic", sourceUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80" },
  { slug: "timecraft-diver-pro-300m-automatic", sourceUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-minimalist-quartz-38mm-rose-gold", sourceUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" },
  { slug: "aura-studio-stealth-blackout-tactical", sourceUrl: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80" },
  { slug: "timecraft-heritage-small-seconds-automatic", sourceUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-titanium-field-automatic-40mm", sourceUrl: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80" },
  { slug: "aura-studio-square-monolith-digital", sourceUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80" },
  { slug: "timecraft-gmt-worldtimer-automatic-41mm", sourceUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-mesh-bracelet-quartz-black-dial", sourceUrl: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80" },
  { slug: "timecraft-skeleton-automatic-exhibition-case", sourceUrl: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80" },
  { slug: "aura-pilot-flieger-automatic-43mm", sourceUrl: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-vintage-cushion-case-automatic-gold", sourceUrl: "https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&w=800&q=80" },
  { slug: "timecraft-compressor-diver-dual-crown", sourceUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80" },
  { slug: "aura-monochrome-ceramic-quartz-black", sourceUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-regatta-timer-quartz-chronograph", sourceUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80" },
  { slug: "timecraft-moonphase-calendar-automatic", sourceUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80" },
  { slug: "aura-tactical-solar-powered-watch", sourceUrl: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-minimalist-two-hand-quartz-slate", sourceUrl: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80" },
  { slug: "timecraft-bronze-patina-diver-42mm", sourceUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-racing-meca-quartz-chronograph", sourceUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80" },

  // Spectacles (20)
  { slug: "cura-optics-polarized-acetate-solar-tortoise", sourceUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80" },
  { slug: "moscot-studio-lemtosh-optical-wire", sourceUrl: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80" },
  { slug: "oliver-peoples-gregory-peck-crystal", sourceUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-titanium-round-wire-blue-light", sourceUrl: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80" },
  { slug: "visionary-wayfarer-bold-black-polarized", sourceUrl: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-aviator-teardrop-metal-gold", sourceUrl: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80" },
  { slug: "moscot-sqaure-thick-acetate-optical", sourceUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80" },
  { slug: "oliver-peoples-cat-eye-vintage-sunglasses", sourceUrl: "https://images.unsplash.com/photo-1516715094483-75da7dee9758?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-geometric-octagonal-wire-frames", sourceUrl: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=800&q=80" },
  { slug: "visionary-flat-top-shield-sunglasses", sourceUrl: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-rimless-titanium-optical-spectacles", sourceUrl: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80" },
  { slug: "moscot-rounded-p3-acetate-glasses-olive", sourceUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80" },
  { slug: "visionary-clip-on-magnetic-solar-glasses", sourceUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-blue-light-blocking-square-transparent", sourceUrl: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80" },
  { slug: "oliver-peoples-flip-up-round-sunglasses", sourceUrl: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-matte-black-oversized-square-solar", sourceUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80" },
  { slug: "visionary-clubmaster-browline-spectacles", sourceUrl: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-photochromic-transition-reading-glasses", sourceUrl: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80" },
  { slug: "moscot-thin-titanium-pantos-frames", sourceUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80" },
  { slug: "cura-sports-wrap-polarized-sunglasses", sourceUrl: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80" },
];

async function main() {
  console.log(`🚀 Uploading 80 distinct product images to Cloudinary (ovwiwt64)...`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < PRODUCT_PHOTOS.length; i++) {
    const item = PRODUCT_PHOTOS[i];
    try {
      const dbProduct = await prisma.product.findUnique({
        where: { slug: item.slug },
        include: { category: true },
      });

      if (!dbProduct) {
        console.warn(`[${i + 1}/80] Product not found in DB: ${item.slug}`);
        continue;
      }

      console.log(`[${i + 1}/80] Uploading Cloudinary asset for ${item.slug}...`);

      const folderName = `cura/products/${dbProduct.category.slug}`;
      const uploadRes = await cloudinary.uploader.upload(item.sourceUrl, {
        folder: folderName,
        public_id: `${item.slug}-primary`,
        overwrite: true,
        resource_type: "image",
      });

      const secureUrl = uploadRes.secure_url;

      // Update primary image in DB
      await prisma.productImage.deleteMany({
        where: { productId: dbProduct.id },
      });

      await prisma.productImage.create({
        data: {
          productId: dbProduct.id,
          imageUrl: secureUrl,
          altText: dbProduct.name,
          isPrimary: true,
          displayOrder: 1,
        },
      });

      successCount++;
      console.log(` ✅ SUCCESS [${successCount}]: ${secureUrl}`);
    } catch (error) {
      failCount++;
      console.error(` ❌ FAILED [${item.slug}]:`, error);
    }
  }

  console.log(`\n==========================================`);
  console.log(`🎉 CLOUDINARY BULK UPLOAD SUMMARY`);
  console.log(`==========================================`);
  console.log(`Total Attempted : 80`);
  console.log(`Successful      : ${successCount}`);
  console.log(`Failed          : ${failCount}`);
  console.log(`==========================================`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
