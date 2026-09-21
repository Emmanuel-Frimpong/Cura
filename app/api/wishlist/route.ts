import { NextResponse } from "next/server";

let globalWishlistIds: string[] = ["snk-1", "snk-4"];

export async function GET() {
  return NextResponse.json({
    wishlistCount: globalWishlistIds.length,
    wishlistedIds: globalWishlistIds,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { productId } = body;

    if (!productId || typeof productId !== "string") {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    let isWishlisted = false;
    if (globalWishlistIds.includes(productId)) {
      globalWishlistIds = globalWishlistIds.filter((id) => id !== productId);
      isWishlisted = false;
    } else {
      globalWishlistIds.push(productId);
      isWishlisted = true;
    }

    return NextResponse.json({
      success: true,
      isWishlisted,
      wishlistCount: globalWishlistIds.length,
      wishlistedIds: globalWishlistIds,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to toggle wishlist." },
      { status: 500 }
    );
  }
}
