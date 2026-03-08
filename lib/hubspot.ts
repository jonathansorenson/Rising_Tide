const HUBSPOT_API_BASE = "https://api.hubapi.com";

function getToken(): string {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    throw new Error(
      "HUBSPOT_PRIVATE_APP_TOKEN is not set. Create a HubSpot Private App and add the token to .env.local."
    );
  }
  return token;
}

interface ContactProperties {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  lifecyclestage?: string;
  hs_lead_status?: string;
  message?: string;
  [key: string]: string | undefined;
}

interface HubSpotResponse {
  success: boolean;
  contactId?: string;
  error?: string;
}

/**
 * Create or update a contact in HubSpot.
 * Uses the Contacts API v3 with createOrUpdate behavior (deduplicates by email).
 */
export async function createOrUpdateContact(
  properties: ContactProperties
): Promise<HubSpotResponse> {
  const token = getToken();

  // Filter out undefined values
  const cleanProperties: Record<string, string> = {};
  for (const [key, value] of Object.entries(properties)) {
    if (value !== undefined && value !== null && value !== "") {
      cleanProperties[key] = String(value);
    }
  }

  try {
    // Try to create the contact
    const createResponse = await fetch(
      `${HUBSPOT_API_BASE}/crm/v3/objects/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ properties: cleanProperties }),
      }
    );

    if (createResponse.ok) {
      const data = await createResponse.json();
      return { success: true, contactId: data.id };
    }

    // If contact already exists (409 conflict), update instead
    if (createResponse.status === 409) {
      const errorData = await createResponse.json();
      const existingId = errorData?.message?.match(/Existing ID: (\d+)/)?.[1];

      if (existingId) {
        const updateResponse = await fetch(
          `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${existingId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ properties: cleanProperties }),
          }
        );

        if (updateResponse.ok) {
          return { success: true, contactId: existingId };
        }
      }
    }

    const errorText = await createResponse.text();
    console.error("HubSpot API error:", createResponse.status, errorText);
    return {
      success: false,
      error: `HubSpot API error: ${createResponse.status}`,
    };
  } catch (error) {
    console.error("HubSpot request failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Lightweight newsletter subscription — creates a subscriber-stage contact.
 */
export async function subscribeToNewsletter(
  email: string,
  role?: string,
  leadSource: string = "newsletter"
): Promise<HubSpotResponse> {
  return createOrUpdateContact({
    email,
    lifecyclestage: "subscriber",
    hs_lead_status: "NEW",
    ...(role && { contact_role: role }),
    lead_source: leadSource,
  });
}
