export interface BrandSeed {
  name: string;
  slug: string;
  description?: string;
  websiteUrl?: string;
}

export const BRANDS_SEED: BrandSeed[] = [
  { name: "Nike", slug: "nike", description: "World leader in performance athletic footwear and apparel." },
  { name: "Jordan", slug: "jordan", description: "Iconic basketball heritage sneakers and premium street culture." },
  { name: "New Balance", slug: "new-balance", description: "Craftsmanship and iconic athletic footwear engineered in USA & UK." },
  { name: "Salomon Lab", slug: "salomon-lab", description: "High-performance outdoor equipment and technical trail runners." },
  { name: "Adidas", slug: "adidas", description: "3-Stripes performance and Originals lifestyle icons." },
  { name: "CURA Atelier", slug: "cura-atelier", description: "In-house progressive footwear and tailored modern apparel." },
  { name: "AURA Studio", slug: "aura-studio", description: "Contemporary minimalist luxury design laboratory." },
  { name: "Crown & Thread", slug: "crown-thread", description: "Heritage tailored menswear and artisanal cotton shirting." },
  { name: "Northline", slug: "northline", description: "Architectural essential apparel and utilitarian everyday wear." },
  { name: "Timecraft Horology", slug: "timecraft", description: "Swiss and Japanese mechanical timepieces built for precision." },
  { name: "Visionary Frames", slug: "visionary-frames", description: "Hand-finished Italian acetate and titanium eyewear." },
  { name: "Moscot Studio", slug: "moscot-studio", description: "Century-old optical heritage and timeless spectacle silhouettes." },
  { name: "Oliver Peoples", slug: "oliver-peoples", description: "Refined vintage-inspired luxury sunglasses and optical eyewear." },
];
