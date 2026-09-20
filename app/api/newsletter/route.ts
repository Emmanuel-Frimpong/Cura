import { NextResponse } from "next/server";

/** Handles newsletter subscription requests after validating the submitted email. */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Process subscription (e.g. store in DB or newsletter service)
    return NextResponse.json({ success: true, message: "Subscribed successfully!" });
  } catch {
    return NextResponse.json(
      { error: "An error occurred while subscribing." },
      { status: 500 }
    );
  }
}
