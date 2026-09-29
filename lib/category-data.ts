export interface ProductItem {
  id: string;
  brand: string;
  subCategory: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  badge?: "SALE -15%" | "ATELIER PICK" | "NEW DROP" | "TRENDING" | "IN-HOUSE" | string;
  isWishlisted?: boolean;
}

export interface CategoryData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  heroProductTitle: string;
  heroProductPrice: string;
  heroVerifications: string;
  departments: { name: string; count: number; slug: string; active?: boolean }[];
  subClassifications: { name: string; count: number }[];
  silhouettes: { name: string; count: number }[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  brands: { name: string; count: number }[];
  products: ProductItem[];
}

export const CATEGORY_DATA_MAP: Record<string, CategoryData> = {
  sneakers: {
    slug: "sneakers",
    name: "SNEAKERS",
    tagline: "CURATED FOOTWEAR ATELIER • COMPLIMENTARY SIZING PROTOCOL",
    description:
      "Discover stylish sneakers designed for everyday comfort and performance. Engineered silhouettes spanning court classics, technical runners, and minimal low-tops crafted in refined monochromatic palettes.",
    heroImage:
      "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg",
    heroProductTitle: "Air Jordan 1 High Heritage",
    heroProductPrice: "GH₵ 185.00",
    heroVerifications: "3,420 Verifications",
    departments: [
      { name: "Sneakers", count: 18, slug: "sneakers", active: true },
      { name: "Tailored Shirts", count: 24, slug: "shirts" },
      { name: "Horology & Watches", count: 14, slug: "watches" },
      { name: "Optical & Spectacles", count: 10, slug: "spectacles" },
    ],
    subClassifications: [
      { name: "All Sneakers", count: 18 },
      { name: "Running", count: 4 },
      { name: "Basketball", count: 3 },
      { name: "Casual", count: 5 },
      { name: "High-top", count: 3 },
      { name: "Low-top", count: 3 },
    ],
    silhouettes: [
      { name: "Running Silhouettes", count: 4 },
      { name: "Basketball & Court", count: 3 },
      { name: "Casual / Lifestyle", count: 5 },
      { name: "High-Top Ankle Collar", count: 3 },
      { name: "Minimal Low-Top Profile", count: 3 },
    ],
    sizes: ["7", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Off-White", hex: "#F5F5DC" },
      { name: "Black", hex: "#121212" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Red", hex: "#B71C1C" },
      { name: "Beige", hex: "#D7CCC8" },
    ],
    brands: [
      { name: "Nike / Jordan", count: 6 },
      { name: "New Balance", count: 5 },
      { name: "AURA Studio", count: 3 },
      { name: "CURA Atelier", count: 2 },
      { name: "Salomon Lab", count: 2 },
    ],
    products: [
      {
        id: "snk-1",
        brand: "NIKE JORDAN",
        subCategory: "High-Top",
        title: "Air Jordan 1 Retro Hi...",
        price: "GH₵ 185.00",
        originalPrice: "GH₵ 210.00",
        rating: 4.9,
        reviewsCount: 3420,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
        badge: "SALE -15%",
      },
      {
        id: "snk-2",
        brand: "NEW BALANCE",
        subCategory: "Running / Casual",
        title: "990v2 Heritage Cream",
        price: "GH₵ 195.00",
        rating: 4.8,
        reviewsCount: 1240,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg",
        badge: "ATELIER PICK",
      },
      {
        id: "snk-3",
        brand: "AURA STUDIO",
        subCategory: "Calfskin Nappa",
        title: "Minimalist Low-Top...",
        price: "GH₵ 160.00",
        rating: 4.7,
        reviewsCount: 310,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
        badge: "NEW DROP",
      },
      {
        id: "snk-4",
        brand: "NIKE JORDAN",
        subCategory: "Monochromatic",
        title: "Air Shadow Atelier E...",
        price: "GH₵ 220.00",
        rating: 5.0,
        reviewsCount: 2710,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg",
        badge: "TRENDING",
      },
      {
        id: "snk-5",
        brand: "SALOMON LAB",
        subCategory: "Technical Trail",
        title: "XT-6 Atelier Slate Mi...",
        price: "GH₵ 210.00",
        rating: 4.9,
        reviewsCount: 840,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
      },
      {
        id: "snk-6",
        brand: "CURA ATELIER",
        subCategory: "Minimalist Daily",
        title: "Court Classic Low Raw",
        price: "GH₵ 145.00",
        rating: 4.8,
        reviewsCount: 190,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg",
        badge: "IN-HOUSE",
      },
      {
        id: "snk-7",
        brand: "NEW BALANCE",
        subCategory: "Retro Runner",
        title: "530 Metallic Chrome",
        price: "GH₵ 120.00",
        rating: 4.6,
        reviewsCount: 980,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
      },
      {
        id: "snk-8",
        brand: "CONVERSE",
        subCategory: "Heritage Canvas",
        title: "Chuck 70s Parchme...",
        price: "GH₵ 90.00",
        rating: 4.7,
        reviewsCount: 1540,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg",
      },
    ],
  },
  shirts: {
    slug: "shirts",
    name: "SHIRTS & APPAREL",
    tagline: "TAILORED APPAREL ATELIER • COMPLIMENTARY FIT CONCIERGE",
    description:
      "Explore classic linen button-downs, heavyweight graphic tees, seasonal jackets, and tailored luxury apparel crafted from organic European textiles.",
    heroImage:
      "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939419/cura/media/jlcvwvmt6uwyzp9ydnah.jpg",
    heroProductTitle: "CURA Signature Linen Overshirt",
    heroProductPrice: "GH₵ 145.00",
    heroVerifications: "1,890 Verifications",
    departments: [
      { name: "Sneakers", count: 18, slug: "sneakers" },
      { name: "Tailored Shirts", count: 24, slug: "shirts", active: true },
      { name: "Horology & Watches", count: 14, slug: "watches" },
      { name: "Optical & Spectacles", count: 10, slug: "spectacles" },
    ],
    subClassifications: [
      { name: "All Shirts", count: 24 },
      { name: "Linen Shirts", count: 8 },
      { name: "Graphic Tees", count: 6 },
      { name: "Oversized", count: 5 },
      { name: "Polos & Basics", count: 5 },
    ],
    silhouettes: [
      { name: "Classic Button-Down", count: 8 },
      { name: "Relaxed Oversized Fit", count: 6 },
      { name: "Heavyweight Boxy Tee", count: 5 },
      { name: "Tailored Oxford Collar", count: 5 },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Beige", hex: "#E5D9C5" },
      { name: "Charcoal", hex: "#333333" },
      { name: "Olive", hex: "#4B5320" },
      { name: "Navy", hex: "#1A2536" },
    ],
    brands: [
      { name: "CURA Atelier", count: 10 },
      { name: "AURA Studio", count: 6 },
      { name: "Norse Objects", count: 5 },
      { name: "Arc'Teryx System", count: 3 },
    ],
    products: [
      {
        id: "shr-1",
        brand: "CURA ATELIER",
        subCategory: "Pure Linen",
        title: "Classic Rustic Linen Shirt",
        price: "GH₵ 145.00",
        originalPrice: "GH₵ 170.00",
        rating: 4.9,
        reviewsCount: 890,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939426/cura/media/vl8irhjorvfyn4o03ed5.jpg",
        badge: "ATELIER PICK",
      },
      {
        id: "shr-2",
        brand: "AURA STUDIO",
        subCategory: "Heavyweight Cotton",
        title: "Boxy Architectural Tee",
        price: "GH₵ 85.00",
        rating: 4.8,
        reviewsCount: 420,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939419/cura/media/jlcvwvmt6uwyzp9ydnah.jpg",
        badge: "NEW DROP",
      },
      {
        id: "shr-3",
        brand: "NORSE OBJECTS",
        subCategory: "Wool Blend",
        title: "Minimalist Overshirt Coat",
        price: "GH₵ 210.00",
        rating: 5.0,
        reviewsCount: 310,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939426/cura/media/vl8irhjorvfyn4o03ed5.jpg",
        badge: "TRENDING",
      },
      {
        id: "shr-4",
        brand: "CURA ATELIER",
        subCategory: "Oxford Cotton",
        title: "Tailored Band Collar Shirt",
        price: "GH₵ 120.00",
        rating: 4.7,
        reviewsCount: 290,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939419/cura/media/jlcvwvmt6uwyzp9ydnah.jpg",
        badge: "IN-HOUSE",
      },
    ],
  },
  watches: {
    slug: "watches",
    name: "WRIST WATCHES",
    tagline: "FINE HOROLOGY ATELIER • CERTIFIED MOVEMENT ARCHIVE",
    description:
      "Precision horology showcasing swiss-inspired automatic chronographs, sapphire crystal sport timepieces, and understated minimal quartz watches.",
    heroImage:
      "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/fhsosrlqavdxqwy0gppx.jpg",
    heroProductTitle: "CURA Chrono Precision 41mm",
    heroProductPrice: "GH₵ 450.00",
    heroVerifications: "2,150 Verifications",
    departments: [
      { name: "Sneakers", count: 18, slug: "sneakers" },
      { name: "Tailored Shirts", count: 24, slug: "shirts" },
      { name: "Horology & Watches", count: 14, slug: "watches", active: true },
      { name: "Optical & Spectacles", count: 10, slug: "spectacles" },
    ],
    subClassifications: [
      { name: "All Watches", count: 14 },
      { name: "Automatic", count: 5 },
      { name: "Chronograph", count: 4 },
      { name: "Diver", count: 3 },
      { name: "Quartz", count: 2 },
    ],
    silhouettes: [
      { name: "41mm Stainless Steel Case", count: 6 },
      { name: "38mm Dress Minimalist", count: 4 },
      { name: "44mm Tactical Diver", count: 4 },
    ],
    sizes: ["38mm", "40mm", "41mm", "42mm", "44mm"],
    colors: [
      { name: "Silver Steel", hex: "#C0C0C0" },
      { name: "Matte Black", hex: "#222222" },
      { name: "Rose Gold", hex: "#B76E79" },
      { name: "Midnight Navy", hex: "#121A2D" },
    ],
    brands: [
      { name: "CURA Horology", count: 6 },
      { name: "Seiko Presage", count: 4 },
      { name: "Tissot Heritage", count: 4 },
    ],
    products: [
      {
        id: "wtc-1",
        brand: "CURA HOROLOGY",
        subCategory: "Automatic Chrono",
        title: "Precision Steel 41mm",
        price: "GH₵ 450.00",
        originalPrice: "GH₵ 520.00",
        rating: 4.9,
        reviewsCount: 1420,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/fhsosrlqavdxqwy0gppx.jpg",
        badge: "ATELIER PICK",
      },
      {
        id: "wtc-2",
        brand: "SEIKO PRESAGE",
        subCategory: "Mechanical Movement",
        title: "Cocktail Time Automatic",
        price: "GH₵ 390.00",
        rating: 4.8,
        reviewsCount: 890,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/fhsosrlqavdxqwy0gppx.jpg",
        badge: "NEW DROP",
      },
      {
        id: "wtc-3",
        brand: "TISSOT HERITAGE",
        subCategory: "Sapphire Crystal",
        title: "PRX Automatic 80 Steel",
        price: "GH₵ 675.00",
        rating: 5.0,
        reviewsCount: 2310,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/fhsosrlqavdxqwy0gppx.jpg",
        badge: "TRENDING",
      },
    ],
  },
  spectacles: {
    slug: "spectacles",
    name: "SPECTACLES & EYEWEAR",
    tagline: "OPTICAL ATELIER • UV400 PROTECTIVE LENS TECHNOLOGY",
    description:
      "Handcrafted Japanese acetate frames, anti-blue light optical glasses, and polarized solar sunglasses designed with lightweight titanium hinges.",
    heroImage:
      "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939421/cura/media/ttmav1ptoigprqbeprlv.jpg",
    heroProductTitle: "Acetate Solar Frames Tortoise",
    heroProductPrice: "GH₵ 145.00",
    heroVerifications: "1,520 Verifications",
    departments: [
      { name: "Sneakers", count: 18, slug: "sneakers" },
      { name: "Tailored Shirts", count: 24, slug: "shirts" },
      { name: "Horology & Watches", count: 14, slug: "watches" },
      { name: "Optical & Spectacles", count: 10, slug: "spectacles", active: true },
    ],
    subClassifications: [
      { name: "All Eyewear", count: 10 },
      { name: "Sunglasses", count: 4 },
      { name: "Optical Frames", count: 3 },
      { name: "Blue Light", count: 3 },
    ],
    silhouettes: [
      { name: "Classic Acetate Square", count: 4 },
      { name: "Titanium Round Wire", count: 3 },
      { name: "Bold Wayfarer Profile", count: 3 },
    ],
    sizes: ["Standard", "Wide Fit", "Compact"],
    colors: [
      { name: "Tortoise", hex: "#704214" },
      { name: "Jet Black", hex: "#111111" },
      { name: "Crystal Clear", hex: "#E8E8E8" },
      { name: "Amber", hex: "#FFBF00" },
    ],
    brands: [
      { name: "CURA Optics", count: 5 },
      { name: "Moscot Studio", count: 3 },
      { name: "Oliver Peoples", count: 2 },
    ],
    products: [
      {
        id: "eyw-1",
        brand: "CURA OPTICS",
        subCategory: "Polarized Solar",
        title: "Acetate Solar Frames",
        price: "GH₵ 145.00",
        originalPrice: "GH₵ 175.00",
        rating: 4.9,
        reviewsCount: 1520,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939421/cura/media/ttmav1ptoigprqbeprlv.jpg",
        badge: "SALE -15%",
      },
      {
        id: "eyw-2",
        brand: "MOSCOT STUDIO",
        subCategory: "Anti-Blue Light",
        title: "Lemtosh Optical Wire",
        price: "GH₵ 210.00",
        rating: 4.8,
        reviewsCount: 640,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939421/cura/media/ttmav1ptoigprqbeprlv.jpg",
        badge: "ATELIER PICK",
      },
      {
        id: "eyw-3",
        brand: "OLIVER PEOPLES",
        subCategory: "Titanium Frame",
        title: "Gregory Peck Crystal",
        price: "GH₵ 320.00",
        rating: 5.0,
        reviewsCount: 1120,
        imageUrl:
          "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939421/cura/media/ttmav1ptoigprqbeprlv.jpg",
        badge: "TRENDING",
      },
    ],
  },
};
