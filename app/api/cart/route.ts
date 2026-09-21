import { NextResponse } from "next/server";

let globalCartCount = 3;

export async function GET() {
  return NextResponse.json({ cartCount: globalCartCount });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { quantity = 1 } = body;

    globalCartCount += Number(quantity);

    return NextResponse.json({
      success: true,
      cartCount: globalCartCount,
      message: `Item added to cart successfully!`,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to add item to cart." },
      { status: 500 }
    );
  }
}
