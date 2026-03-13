import { NextRequest, NextResponse } from "next/server";
import { createOrUpdateContact } from "@/lib/hubspot";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      property_location,
      asset_type,
      asking_price,
      property_size,
      occupancy,
      description,
      referral_source,
      website, // honeypot
    } = body;

    // Honeypot — bots fill hidden fields
    if (website) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (!email || !name || !property_location) {
      return NextResponse.json(
        { error: "Name, email, and property location are required." },
        { status: 400 }
      );
    }

    // Split name into first/last
    const nameParts = name.trim().split(/\s+/);
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    // Create or update contact in HubSpot
    const hubspotResult = await createOrUpdateContact({
      email,
      firstname,
      lastname,
      phone: phone || undefined,
      company: company || undefined,
      lifecyclestage: "lead",
      hs_lead_status: "NEW",
      lead_source: "deal_submission",
    });

    if (!hubspotResult.success) {
      console.error("HubSpot contact creation failed:", hubspotResult.error);
    }

    // Forward to Supabase Edge Function
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl) {
      try {
        await fetch(`${supabaseUrl}/functions/v1/contact-form`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone: phone || null,
            contact_type: "deal_submission",
            message: [
              `Deal Submission`,
              `Property Location: ${property_location}`,
              `Asset Type: ${asset_type || "Not specified"}`,
              `Asking Price: ${asking_price || "Not specified"}`,
              `Property Size: ${property_size ? property_size + " SF" : "Not specified"}`,
              `Occupancy: ${occupancy ? occupancy + "%" : "Not specified"}`,
              `Company: ${company || "Not specified"}`,
              `Referral Source: ${referral_source || "Not specified"}`,
              description ? `\nDescription: ${description}` : "",
            ]
              .filter(Boolean)
              .join("\n"),
            hubspot_contact_id: hubspotResult.contactId || null,
          }),
        });
      } catch (supabaseError) {
        console.error("Supabase forwarding failed:", supabaseError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Deal submission received.",
        contactId: hubspotResult.contactId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Deal submission API error:", error);
    return NextResponse.json(
      { error: "Failed to process deal submission." },
      { status: 500 }
    );
  }
}
