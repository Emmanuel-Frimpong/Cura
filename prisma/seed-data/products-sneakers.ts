export interface ProductSeedInput {
  sku: string;
  slug: string;
  name: string;
  categorySlug: string;
  brandSlug: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  compareAtPrice?: number;
  isFeatured?: boolean;
  isNew?: boolean;
  images: { url: string; alt: string; isPrimary?: boolean; order?: number }[];
  attributes: { name: string; value: string }[];
  variants: {
    sku: string;
    sizeCode?: string;
    colorName?: string;
    price: number;
    compareAtPrice?: number;
    inventory: number;
    isDefault?: boolean;
  }[];
}

const DEFAULT_SNEAKER_IMG =
  "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg";
const HERO_SNEAKER_IMG =
  "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg";

export const SNEAKERS_SEED: ProductSeedInput[] = [
  {
    sku: "SNK-001",
    slug: "air-jordan-1-retro-hi-og-heritage",
    name: "Air Jordan 1 Retro Hi OG Heritage",
    categorySlug: "sneakers",
    brandSlug: "jordan",
    shortDescription: "High-top iconic sneaker in premium leather with red and white blocking.",
    description: "The Air Jordan 1 Retro High OG Heritage pays tribute to Jordan history with classic color-blocking on soft full-grain leather.",
    basePrice: 185.0,
    compareAtPrice: 210.0,
    isFeatured: true,
    isNew: false,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "Air Jordan 1 Retro Hi OG Heritage", isPrimary: true, order: 1 },
      { url: HERO_SNEAKER_IMG, alt: "Air Jordan 1 High Heritage side view", isPrimary: false, order: 2 },
    ],
    attributes: [
      { name: "subCategory", value: "High-Top" },
      { name: "upperMaterial", value: "Full-Grain Leather" },
      { name: "closure", value: "Lace-Up" },
      { name: "badge", value: "SALE -15%" },
    ],
    variants: [
      { sku: "SNK-001-RED-8", sizeCode: "8", colorName: "Heritage Red", price: 185.0, compareAtPrice: 210.0, inventory: 12 },
      { sku: "SNK-001-RED-9", sizeCode: "9", colorName: "Heritage Red", price: 185.0, compareAtPrice: 210.0, inventory: 8 },
      { sku: "SNK-001-RED-10", sizeCode: "10", colorName: "Heritage Red", price: 185.0, compareAtPrice: 210.0, inventory: 5, isDefault: true },
      { sku: "SNK-001-RED-11", sizeCode: "11", colorName: "Heritage Red", price: 185.0, compareAtPrice: 210.0, inventory: 0 },
    ],
  },
  {
    sku: "SNK-002",
    slug: "new-balance-990v2-heritage-cream",
    name: "990v2 Heritage Cream & Navy",
    categorySlug: "sneakers",
    brandSlug: "new-balance",
    shortDescription: "Made in USA premium suede and mesh lifestyle runner.",
    description: "Constructed with premium pigskin suede uppers and mesh underlays, the 990v2 offers ENCAP midsole cushioning.",
    basePrice: 195.0,
    isFeatured: true,
    isNew: false,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "New Balance 990v2 Heritage Cream", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Running / Casual" },
      { name: "upperMaterial", value: "Pigskin Suede & Mesh" },
      { name: "origin", value: "Made in USA" },
      { name: "badge", value: "ATELIER PICK" },
    ],
    variants: [
      { sku: "SNK-002-CRM-8.5", sizeCode: "8.5", colorName: "Cream Oatmeal", price: 195.0, inventory: 15 },
      { sku: "SNK-002-CRM-10", sizeCode: "10", colorName: "Cream Oatmeal", price: 195.0, inventory: 10, isDefault: true },
      { sku: "SNK-002-CRM-11", sizeCode: "11", colorName: "Cream Oatmeal", price: 195.0, inventory: 3 },
    ],
  },
  {
    sku: "SNK-003",
    slug: "aura-studio-minimalist-low-top",
    name: "Minimalist Low-Top Calfskin Nappa",
    categorySlug: "sneakers",
    brandSlug: "aura-studio",
    shortDescription: "Architectural low-top sneaker in smooth Italian calfskin.",
    description: "Crafted in Italy from supple calfskin nappa, featuring a margom rubber outsole and subtle embossed branding.",
    basePrice: 160.0,
    isFeatured: false,
    isNew: true,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "AURA Studio Minimalist Low-Top", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Minimal Low-Top" },
      { name: "upperMaterial", value: "Italian Calfskin" },
      { name: "badge", value: "NEW DROP" },
    ],
    variants: [
      { sku: "SNK-003-WHT-9", sizeCode: "9", colorName: "Parchment White", price: 160.0, inventory: 20 },
      { sku: "SNK-003-WHT-10", sizeCode: "10", colorName: "Parchment White", price: 160.0, inventory: 14, isDefault: true },
    ],
  },
  {
    sku: "SNK-004",
    slug: "air-jordan-monochromatic-shadow",
    name: "Air Shadow Atelier Edition",
    categorySlug: "sneakers",
    brandSlug: "jordan",
    shortDescription: "High-top monochromatic dark grey and black court silhouette.",
    description: "Monochromatic grey and black full-grain leather edition built with encapsulated Air heel cushioning.",
    basePrice: 220.0,
    isFeatured: true,
    isNew: false,
    images: [
      { url: HERO_SNEAKER_IMG, alt: "Air Shadow Atelier Edition", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "High-Top" },
      { name: "upperMaterial", value: "Textured Leather" },
      { name: "badge", value: "TRENDING" },
    ],
    variants: [
      { sku: "SNK-004-BLK-9.5", sizeCode: "9.5", colorName: "Monochrome Black", price: 220.0, inventory: 7 },
      { sku: "SNK-004-BLK-10.5", sizeCode: "10.5", colorName: "Monochrome Black", price: 220.0, inventory: 4, isDefault: true },
    ],
  },
  {
    sku: "SNK-005",
    slug: "salomon-lab-xt6-slate-grey",
    name: "XT-6 Atelier Slate Mid-Profile",
    categorySlug: "sneakers",
    brandSlug: "salomon-lab",
    shortDescription: "Technical trail runner with Quicklace speed system.",
    description: "Engineered for rugged terrain and urban environments with ACS chassis stability and Contagrip tread.",
    basePrice: 210.0,
    isFeatured: false,
    isNew: false,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "Salomon Lab XT-6 Slate", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Technical Trail" },
      { name: "upperMaterial", value: "Abrasion-Resistant Mesh" },
    ],
    variants: [
      { sku: "SNK-005-SLT-10", sizeCode: "10", colorName: "Slate Grey", price: 210.0, inventory: 9, isDefault: true },
      { sku: "SNK-005-SLT-11", sizeCode: "11", colorName: "Slate Grey", price: 210.0, inventory: 2 },
    ],
  },
  {
    sku: "SNK-006",
    slug: "cura-court-classic-low-raw",
    name: "Court Classic Low Raw Beige",
    categorySlug: "sneakers",
    brandSlug: "cura-atelier",
    shortDescription: "Minimalist court sneaker crafted in raw organic canvas.",
    description: "In-house signature silhouette combining heavy organic canvas uppers with a natural gum rubber sole.",
    basePrice: 145.0,
    isFeatured: true,
    isNew: false,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "Court Classic Low Raw", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Casual Court" },
      { name: "upperMaterial", value: "Organic Canvas" },
      { name: "badge", value: "IN-HOUSE" },
    ],
    variants: [
      { sku: "SNK-006-BEG-9", sizeCode: "9", colorName: "Cream Oatmeal", price: 145.0, inventory: 18 },
      { sku: "SNK-006-BEG-10", sizeCode: "10", colorName: "Cream Oatmeal", price: 145.0, inventory: 12, isDefault: true },
    ],
  },
  {
    sku: "SNK-007",
    slug: "new-balance-530-metallic-chrome",
    name: "530 Metallic Chrome Retro Runner",
    categorySlug: "sneakers",
    brandSlug: "new-balance",
    shortDescription: "Retro Y2K mesh running silhouette with silver overlays.",
    description: "Breathable open-cell mesh runner enhanced with ABZORB heel cushioning for all-day urban comfort.",
    basePrice: 120.0,
    isFeatured: false,
    isNew: false,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "530 Metallic Chrome", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Retro Runner" },
      { name: "upperMaterial", value: "Synthetic Mesh" },
    ],
    variants: [
      { sku: "SNK-007-SLV-8", sizeCode: "8", colorName: "Metallic Silver", price: 120.0, inventory: 22 },
      { sku: "SNK-007-SLV-10", sizeCode: "10", colorName: "Metallic Silver", price: 120.0, inventory: 16, isDefault: true },
    ],
  },
  {
    sku: "SNK-008",
    slug: "converse-chuck-70s-parchment",
    name: "Chuck 70s Heritage Parchment Canvas",
    categorySlug: "sneakers",
    brandSlug: "cura-atelier",
    shortDescription: "High-top vintage canvas sneaker with heavy stitching.",
    description: "Classic 1970s court specification featuring 12oz canvas, varnished egret foxing tape, and OrthoLite cushioning.",
    basePrice: 90.0,
    isFeatured: false,
    isNew: false,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "Chuck 70s Parchment", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "High-Top Canvas" },
      { name: "upperMaterial", value: "12oz Heavy Canvas" },
    ],
    variants: [
      { sku: "SNK-008-PRC-9", sizeCode: "9", colorName: "Parchment White", price: 90.0, inventory: 25 },
      { sku: "SNK-008-PRC-10", sizeCode: "10", colorName: "Parchment White", price: 90.0, inventory: 19, isDefault: true },
    ],
  },
  {
    sku: "SNK-009",
    slug: "nike-dunk-low-retro-panda",
    name: "Nike Dunk Low Retro Panda",
    categorySlug: "sneakers",
    brandSlug: "nike",
    shortDescription: "Classic black and white leather court low-top.",
    description: "Originally designed for the hardwood, the Dunk Low returns with crisp leather overlays and classic two-tone color blocking.",
    basePrice: 115.0,
    isFeatured: true,
    isNew: false,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "Nike Dunk Low Retro Panda", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Court Low" },
      { name: "upperMaterial", value: "Smooth Leather" },
    ],
    variants: [
      { sku: "SNK-009-PND-9", sizeCode: "9", colorName: "Monochrome Black", price: 115.0, inventory: 14 },
      { sku: "SNK-009-PND-10", sizeCode: "10", colorName: "Monochrome Black", price: 115.0, inventory: 8, isDefault: true },
    ],
  },
  {
    sku: "SNK-010",
    slug: "adidas-samba-og-white-black",
    name: "Adidas Samba OG White & Core Black",
    categorySlug: "sneakers",
    brandSlug: "adidas",
    shortDescription: "Iconic indoor soccer low-top with T-toe suede overlay.",
    description: "Born on the pitch, the Samba is a timeless icon of street style crafted with full-grain leather and soft suede T-toe.",
    basePrice: 100.0,
    isFeatured: false,
    isNew: false,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "Adidas Samba OG White", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Terrace Classic" },
      { name: "upperMaterial", value: "Leather & Suede T-Toe" },
    ],
    variants: [
      { sku: "SNK-010-SMB-8.5", sizeCode: "8.5", colorName: "Parchment White", price: 100.0, inventory: 11 },
      { sku: "SNK-010-SMB-10", sizeCode: "10", colorName: "Parchment White", price: 100.0, inventory: 7, isDefault: true },
    ],
  },
  {
    sku: "SNK-011",
    slug: "nike-air-max-1-86-big-bubble",
    name: "Nike Air Max 1 '86 Big Bubble OG",
    categorySlug: "sneakers",
    brandSlug: "nike",
    shortDescription: "Retro runner featuring the original visible Air window design.",
    description: "Re-engineered to exact 1986 specifications, featuring the larger Air unit window, sport red suede mudguard, and mesh upper.",
    basePrice: 150.0,
    isFeatured: false,
    isNew: true,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "Nike Air Max 1 86", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Air Max Runner" },
      { name: "upperMaterial", value: "Mesh & Synthetic Suede" },
    ],
    variants: [
      { sku: "SNK-011-AM1-9", sizeCode: "9", colorName: "Heritage Red", price: 150.0, inventory: 10 },
      { sku: "SNK-011-AM1-10", sizeCode: "10", colorName: "Heritage Red", price: 150.0, inventory: 6, isDefault: true },
    ],
  },
  {
    sku: "SNK-012",
    slug: "new-balance-2002r-protection-pack-rain-cloud",
    name: "2002R Protection Pack Rain Cloud",
    categorySlug: "sneakers",
    brandSlug: "new-balance",
    shortDescription: "Deconstructed raw-edge suede lifestyle sneaker.",
    description: "Refreshed classic 2002 runner with jagged raw-cut suede panels and N-ergy shock-absorbing outsole.",
    basePrice: 180.0,
    isFeatured: true,
    isNew: false,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "2002R Protection Pack Rain Cloud", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Lifestyle Runner" },
      { name: "upperMaterial", value: "Rough-Cut Suede" },
    ],
    variants: [
      { sku: "SNK-012-2002-9.5", sizeCode: "9.5", colorName: "Slate Grey", price: 180.0, inventory: 5 },
      { sku: "SNK-012-2002-10", sizeCode: "10", colorName: "Slate Grey", price: 180.0, inventory: 2, isDefault: true },
    ],
  },
  {
    sku: "SNK-013",
    slug: "salomon-acs-pro-advanced-metal-grey",
    name: "ACS Pro Advanced Metal Grey",
    categorySlug: "sneakers",
    brandSlug: "salomon-lab",
    shortDescription: "Architectural trail shoe with Kurim structural cage.",
    description: "A modern interpretation of a technical archive shoe with dual-density EVA midsole and breathable Kurim upper matrix.",
    basePrice: 230.0,
    isFeatured: false,
    isNew: true,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "Salomon ACS Pro Advanced", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Technical Trail" },
      { name: "upperMaterial", value: "Kurim Structure & Mesh" },
    ],
    variants: [
      { sku: "SNK-013-ACS-10", sizeCode: "10", colorName: "Slate Grey", price: 230.0, inventory: 8, isDefault: true },
    ],
  },
  {
    sku: "SNK-014",
    slug: "asics-gel-kayano-14-cream-black",
    name: "Gel-Kayano 14 Cream & Metallic Black",
    categorySlug: "sneakers",
    brandSlug: "cura-atelier",
    shortDescription: "Retro late-2000s performance running silhouette.",
    description: "Reinterpreting technical running aesthetics with GEL technology cushioning and metallic synthetic leather accents.",
    basePrice: 160.0,
    isFeatured: false,
    isNew: false,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "Gel Kayano 14 Cream Black", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Retro Performance" },
      { name: "upperMaterial", value: "Open Mesh & Metallic Overlays" },
    ],
    variants: [
      { sku: "SNK-014-GEL-9", sizeCode: "9", colorName: "Cream Oatmeal", price: 160.0, inventory: 13 },
      { sku: "SNK-014-GEL-10", sizeCode: "10", colorName: "Cream Oatmeal", price: 160.0, inventory: 9, isDefault: true },
    ],
  },
  {
    sku: "SNK-015",
    slug: "cura-runner-one-monolith-black",
    name: "Runner One Monolith Stealth Black",
    categorySlug: "sneakers",
    brandSlug: "cura-atelier",
    shortDescription: "Progressive all-black monochromatic urban runner.",
    description: "In-house technical silhouette with seamless bonded TPU overlays, memory foam footbed, and high-abrasion rubber outsole.",
    basePrice: 175.0,
    isFeatured: true,
    isNew: true,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "Runner One Monolith Black", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Minimal Low-Top" },
      { name: "upperMaterial", value: "Bonded Microfiber" },
      { name: "badge", value: "IN-HOUSE" },
    ],
    variants: [
      { sku: "SNK-015-MON-9", sizeCode: "9", colorName: "Monochrome Black", price: 175.0, inventory: 16 },
      { sku: "SNK-015-MON-10", sizeCode: "10", colorName: "Monochrome Black", price: 175.0, inventory: 11, isDefault: true },
    ],
  },
  {
    sku: "SNK-016",
    slug: "nike-air-force-1-07-triple-white",
    name: "Nike Air Force 1 '07 Triple White",
    categorySlug: "sneakers",
    brandSlug: "nike",
    shortDescription: "Classic clean white low-top basketball sneaker.",
    description: "The radiance lives on in the Air Force 1 '07, featuring crisp leather edges and Nike Air cushioning underfoot.",
    basePrice: 110.0,
    isFeatured: false,
    isNew: false,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "Nike Air Force 1 Triple White", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Court Low" },
      { name: "upperMaterial", value: "Smooth Leather" },
    ],
    variants: [
      { sku: "SNK-016-AF1-8.5", sizeCode: "8.5", colorName: "Parchment White", price: 110.0, inventory: 24 },
      { sku: "SNK-016-AF1-10", sizeCode: "10", colorName: "Parchment White", price: 110.0, inventory: 18, isDefault: true },
    ],
  },
  {
    sku: "SNK-017",
    slug: "adidas-gazelle-indoor-navy-gum",
    name: "Adidas Gazelle Indoor Navy & Gum",
    categorySlug: "sneakers",
    brandSlug: "adidas",
    shortDescription: "Soft navy suede low-top with translucent gum sole.",
    description: "First launched in 1979 as an indoor training shoe, featuring premium pigskin suede and distinctive wrapped gum outsole.",
    basePrice: 105.0,
    isFeatured: false,
    isNew: false,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "Adidas Gazelle Indoor Navy", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Terrace Classic" },
      { name: "upperMaterial", value: "Pigskin Suede" },
    ],
    variants: [
      { sku: "SNK-017-GZL-9", sizeCode: "9", colorName: "Navy Blue", price: 105.0, inventory: 15 },
      { sku: "SNK-017-GZL-10", sizeCode: "10", colorName: "Navy Blue", price: 105.0, inventory: 10, isDefault: true },
    ],
  },
  {
    sku: "SNK-018",
    slug: "new-balance-993-made-in-usa-grey",
    name: "993 Made in USA Heritage Grey",
    categorySlug: "sneakers",
    brandSlug: "new-balance",
    shortDescription: "High-comfort heritage running silhouette.",
    description: "Combining elements from the 991 and 992 models with ABZORB DTS cushioning and premium grey suede construction.",
    basePrice: 210.0,
    isFeatured: false,
    isNew: false,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "993 Made in USA Grey", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Running / Casual" },
      { name: "upperMaterial", value: "Pigskin Suede & Mesh" },
    ],
    variants: [
      { sku: "SNK-018-993-10", sizeCode: "10", colorName: "Slate Grey", price: 210.0, inventory: 7, isDefault: true },
    ],
  },
  {
    sku: "SNK-019",
    slug: "puma-suede-classic-black-white",
    name: "Puma Suede Classic XXI Black & White",
    categorySlug: "sneakers",
    brandSlug: "cura-atelier",
    shortDescription: "Heritage low-top suede sneaker with iconic Formstrip.",
    description: "The Suede XXI features a full suede upper, rubber midsole, and synthetic lining for an authentic retro feel.",
    basePrice: 85.0,
    isFeatured: false,
    isNew: false,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "Puma Suede Classic Black White", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Casual Court" },
      { name: "upperMaterial", value: "Suede" },
    ],
    variants: [
      { sku: "SNK-019-SUE-9", sizeCode: "9", colorName: "Monochrome Black", price: 85.0, inventory: 20 },
      { sku: "SNK-019-SUE-10", sizeCode: "10", colorName: "Monochrome Black", price: 85.0, inventory: 15, isDefault: true },
    ],
  },
  {
    sku: "SNK-020",
    slug: "cura-atelier-desert-runner-sand",
    name: "Desert Runner Sand Nubuck",
    categorySlug: "sneakers",
    brandSlug: "cura-atelier",
    shortDescription: "Hybrid desert boot sneaker in sand nubuck leather.",
    description: "Blending traditional chukka desert boot upper geometry with an ultra-light EVA running midsole.",
    basePrice: 190.0,
    isFeatured: true,
    isNew: true,
    images: [
      { url: DEFAULT_SNEAKER_IMG, alt: "Desert Runner Sand Nubuck", isPrimary: true, order: 1 },
    ],
    attributes: [
      { name: "subCategory", value: "Minimal Low-Top" },
      { name: "upperMaterial", value: "Soft Nubuck" },
      { name: "badge", value: "NEW DROP" },
    ],
    variants: [
      { sku: "SNK-020-SND-9", sizeCode: "9", colorName: "Cream Oatmeal", price: 190.0, inventory: 14 },
      { sku: "SNK-020-SND-10", sizeCode: "10", colorName: "Cream Oatmeal", price: 190.0, inventory: 8, isDefault: true },
    ],
  },
];
