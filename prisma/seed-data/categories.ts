export interface CategorySeed {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
}

export const CATEGORIES_SEED: CategorySeed[] = [
  {
    name: "Sneakers",
    slug: "sneakers",
    description: "Authentic branded shoes, technical runners, court classics & luxury low-tops.",
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
    displayOrder: 1,
  },
  {
    name: "Shirts & Apparel",
    slug: "shirts",
    description: "Tailored shirts, organic cotton tees, oversized silhouettes & luxury outerwear.",
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939419/cura/media/jlcvwvmt6uwyzp9ydnah.jpg",
    displayOrder: 2,
  },
  {
    name: "Wrist Watches",
    slug: "watches",
    description: "Precision horology, luxury chronographs, automatic movements & minimalist timepieces.",
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/fhsosrlqavdxqwy0gppx.jpg",
    displayOrder: 3,
  },
  {
    name: "Spectacles & Eyewear",
    slug: "spectacles",
    description: "Handcrafted acetate frames, titanium wire glasses, and polarized solar eyewear.",
    imageUrl: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939421/cura/media/ttmav1ptoigprqbeprlv.jpg",
    displayOrder: 4,
  },
];
