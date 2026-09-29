import { NextResponse } from "next/server";

let serverWishlistIds: string[] = [];

export async function GET() {
  return NextResponse.json({
    wishlistCount: serverWishlistIds.length,
    wishlistedIds: serverWishlistIds,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { productId, action = "toggle" } = body;

    if (!productId || typeof productId !== "string") {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const isCurrentlyWishlisted = serverWishlistIds.includes(productId);
    let isWishlisted = isCurrentlyWishlisted;

    if (action === "toggle") {
      if (isCurrentlyWishlisted) {
        serverWishlistIds = serverWishlistIds.filter((id) => id !== productId);
        isWishlisted = false;
      } else {
        serverWishlistIds.push(productId);
        isWishlisted = true;
      }
    } else if (action === "add") {
      if (!isCurrentlyWishlisted) {
        serverWishlistIds.push(productId);
      }
      isWishlisted = true;
    } else if (action === "remove") {
      serverWishlistIds = serverWishlistIds.filter((id) => id !== productId);
      isWishlisted = false;
    }

    return NextResponse.json({
      success: true,
      isWishlisted,
      wishlistCount: serverWishlistIds.length,
      wishlistedIds: serverWishlistIds,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to update wishlist." },
      { status: 500 }
    );
  }
}
