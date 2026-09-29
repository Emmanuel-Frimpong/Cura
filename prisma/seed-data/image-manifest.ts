export interface ImageManifestEntry {
  productSlug: string;
  category: "sneakers" | "shirts" | "watches" | "spectacles";
  images: {
    publicId?: string;
    url: string;
    altText: string;
    isPrimary: boolean;
    displayOrder: number;
  }[];
}

export const IMAGE_MANIFEST: ImageManifestEntry[] = [
  {
    productSlug: "air-jordan-1-retro-hi-og-heritage",
    category: "sneakers",
    images: [
      {
        url: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939428/cura/media/dbkcqaysrqguhlyyc4an.jpg",
        altText: "Air Jordan 1 Retro Hi OG Heritage Primary View",
        isPrimary: true,
        displayOrder: 1,
      },
      {
        url: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939423/cura/media/ysfpddxxuy8broxrlnhu.jpg",
        altText: "Air Jordan 1 High Heritage Hero Showcase",
        isPrimary: false,
        displayOrder: 2,
      },
    ],
  },
  {
    productSlug: "cura-tailored-french-linen-shirt-raw",
    category: "shirts",
    images: [
      {
        url: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939426/cura/media/vl8irhjorvfyn4o03ed5.jpg",
        altText: "Tailored French Linen Shirt Front",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
  },
  {
    productSlug: "timecraft-chronograph-monolith-automatic",
    category: "watches",
    images: [
      {
        url: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939430/cura/media/fhsosrlqavdxqwy0gppx.jpg",
        altText: "Chronograph Monolith Steel Automatic Dial",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
  },
  {
    productSlug: "cura-optics-polarized-acetate-solar-tortoise",
    category: "spectacles",
    images: [
      {
        url: "https://res.cloudinary.com/ovwiwt64/image/upload/v1789939421/cura/media/ttmav1ptoigprqbeprlv.jpg",
        altText: "Acetate Solar Frames Polarized Tortoise Angle",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
  },
];
