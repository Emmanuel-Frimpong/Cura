/**
 * Currency Utility for formatting prices in Ghana Cedis (GH₵)
 */
export function formatPrice(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined) {
    return "GH₵ 0.00";
  }

  const numeric = typeof amount === "string" ? parseFloat(amount) : Number(amount);
  if (isNaN(numeric)) {
    return "GH₵ 0.00";
  }

  return `GH₵ ${numeric.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
