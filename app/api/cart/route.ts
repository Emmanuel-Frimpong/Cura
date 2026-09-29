import { NextResponse } from "next/server";

export interface ServerCartItem {
  id: string;
  quantity: number;
}

let serverCart: ServerCartItem[] = [];

function calculateCartCount(): number {
  return serverCart.reduce((sum, item) => sum + item.quantity, 0);
}

export async function GET() {
  return NextResponse.json({
    cartItems: serverCart,
    cartCount: calculateCartCount(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { productId, action = "add", delta = 1, quantity = 1 } = body;

    if (!productId || typeof productId !== "string") {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const existingIndex = serverCart.findIndex((item) => item.id === productId);

    if (action === "add") {
      // If product is not in cart, add it once. If already added, keep existing item without duplicate counting.
      if (existingIndex === -1) {
        serverCart.push({ id: productId, quantity: Math.max(1, Number(quantity)) });
      }
    } else if (action === "remove") {
      // Remove product completely from cart (-count)
      if (existingIndex !== -1) {
        serverCart.splice(existingIndex, 1);
      }
    } else if (action === "update") {
      // Follow + and - rules of increment/decrement
      if (existingIndex !== -1) {
        const newQty = serverCart[existingIndex].quantity + Number(delta);
        if (newQty <= 0) {
          serverCart.splice(existingIndex, 1);
        } else {
          serverCart[existingIndex].quantity = newQty;
        }
      }
    }

    const cartCount = calculateCartCount();

    return NextResponse.json({
      success: true,
      cartItems: serverCart,
      cartCount,
      isInCart: serverCart.some((item) => item.id === productId),
      message: `Cart updated successfully.`,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process cart request." },
      { status: 500 }
    );
  }
}
