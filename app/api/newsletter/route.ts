import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/hubspot";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, role, source, website, utm } = body;

    // Honeypot — bots fill hidden fields
    if (website) {
      return NextResponse.json({ success: true, message: "OK" }, { status: 201 });
    }

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

    // Map UTM parameters to HubSpot's built-in UTM properties
    const utmProperties: Record<string, string> = {};
    if (utm) {
      if (utm.utm_source) utmProperties.hs_analytics_source_data_1 = utm.utm_source;
      if (utm.utm_medium) utmProperties.hs_analytics_source_data_2 = utm.utm_medium;
      if (utm.utm_campaign) utmProperties.utm_campaign = utm.utm_campaign;
      if (utm.utm_content) utmProperties.utm_content = utm.utm_content;
      if (utm.utm_term) utmProperties.utm_term = utm.utm_term;
    }

    const result = await subscribeToNewsletter(email, role, leadSource, utmProperties);

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
