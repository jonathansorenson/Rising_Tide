import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/hubspot";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, role, source } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const leadSource = source || "newsletter";
    const result = await subscribeToNewsletter(email, role, leadSource);

    if (!result.success) {
      console.error("Newsletter subscription failed:", result.error);
      return NextResponse.json(
        { error: "Subscription failed. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Subscribed successfully.",
        contactId: result.contactId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription." },
      { status: 500 }
    );
  }
}
