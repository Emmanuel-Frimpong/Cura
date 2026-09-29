export interface SizeSeed {
  categoryType: "SNEAKERS" | "SHIRTS" | "SPECTACLES" | "WATCHES";
  name: string;
  code: string;
  displayOrder: number;
}

export const SIZES_SEED: SizeSeed[] = [
  // Sneakers sizes (US)
  { categoryType: "SNEAKERS", name: "US 7.0", code: "7", displayOrder: 1 },
  { categoryType: "SNEAKERS", name: "US 8.0", code: "8", displayOrder: 2 },
  { categoryType: "SNEAKERS", name: "US 8.5", code: "8.5", displayOrder: 3 },
  { categoryType: "SNEAKERS", name: "US 9.0", code: "9", displayOrder: 4 },
  { categoryType: "SNEAKERS", name: "US 9.5", code: "9.5", displayOrder: 5 },
  { categoryType: "SNEAKERS", name: "US 10.0", code: "10", displayOrder: 6 },
  { categoryType: "SNEAKERS", name: "US 10.5", code: "10.5", displayOrder: 7 },
  { categoryType: "SNEAKERS", name: "US 11.0", code: "11", displayOrder: 8 },
  { categoryType: "SNEAKERS", name: "US 11.5", code: "11.5", displayOrder: 9 },
  { categoryType: "SNEAKERS", name: "US 12.0", code: "12", displayOrder: 10 },

  // Shirts sizes
  { categoryType: "SHIRTS", name: "Small", code: "S", displayOrder: 1 },
  { categoryType: "SHIRTS", name: "Medium", code: "M", displayOrder: 2 },
  { categoryType: "SHIRTS", name: "Large", code: "L", displayOrder: 3 },
  { categoryType: "SHIRTS", name: "X-Large", code: "XL", displayOrder: 4 },
  { categoryType: "SHIRTS", name: "XX-Large", code: "XXL", displayOrder: 5 },

  // Eyewear sizes
  { categoryType: "SPECTACLES", name: "Standard Fit", code: "STD", displayOrder: 1 },
  { categoryType: "SPECTACLES", name: "Wide Fit", code: "WIDE", displayOrder: 2 },
  { categoryType: "SPECTACLES", name: "Compact Fit", code: "CMP", displayOrder: 3 },

  // Watch sizes
  { categoryType: "WATCHES", name: "Standard Strap", code: "ONE-SIZE", displayOrder: 1 },
  { categoryType: "WATCHES", name: "Large Band", code: "LARGE-BAND", displayOrder: 2 },
];
