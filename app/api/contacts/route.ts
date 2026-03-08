import { NextRequest, NextResponse } from "next/server";
import { createOrUpdateContact } from "@/lib/hubspot";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, contact_type, message, website, utm } = body;

    // Honeypot — bots fill hidden fields
    if (website) {
      return NextResponse.json({ success: true, message: "OK" }, { status: 201 });
    }

    if (!email || !name) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Split name into first/last
    const nameParts = name.trim().split(/\s+/);
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    // Map UTM parameters to HubSpot's built-in UTM properties
    const utmProperties: Record<string, string> = {};
    if (utm) {
      if (utm.utm_source) utmProperties.hs_analytics_source_data_1 = utm.utm_source;
      if (utm.utm_medium) utmProperties.hs_analytics_source_data_2 = utm.utm_medium;
      if (utm.utm_campaign) utmProperties.utm_campaign = utm.utm_campaign;
      if (utm.utm_content) utmProperties.utm_content = utm.utm_content;
      if (utm.utm_term) utmProperties.utm_term = utm.utm_term;
    }

    // Create or update contact in HubSpot
    const hubspotResult = await createOrUpdateContact({
      email,
      firstname,
      lastname,
      phone: phone || undefined,
      lifecyclestage: "lead",
      hs_lead_status: "NEW",
      lead_source: "contact_form",
      ...(contact_type && { contact_role: contact_type }),
      ...(message && { message }),
      ...utmProperties,
    });

    if (!hubspotResult.success) {
      console.error("HubSpot contact creation failed:", hubspotResult.error);
      // Don't block the form — still forward to Supabase
    }

    // Forward to existing Supabase Edge Function (preserve current flow)
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
            contact_type: contact_type || null,
            message,
            hubspot_contact_id: hubspotResult.contactId || null,
          }),
        });
      } catch (supabaseError) {
        console.error("Supabase forwarding failed:", supabaseError);
        // Don't block the response for Supabase failures
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact submitted successfully.",
        contactId: hubspotResult.contactId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process contact submission." },
      { status: 500 }
    );
  }
}
