import { NextResponse } from "next/server";
import { companyData } from "@/data/company";
import { BusinessType } from "@/types";

const ALLOWED_BUSINESS_TYPES: BusinessType[] = [
  "Pharmacy",
  "Hospital",
  "Distributor",
  "Other healthcare business",
];

function normalizePhone(phoneStr: string): string {
  let cleaned = phoneStr.replace(/[\s\-\(\)\+]/g, "");
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith("0") && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, message: "Invalid content type. Expected application/json." },
        { status: 415 }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Malformed JSON payload in request." },
        { status: 400 }
      );
    }

    // 1. Lightweight Honeypot Spam Protection
    // If hidden bot field is filled, silently return 200 without dispatching email
    if (body.hp_company_url && typeof body.hp_company_url === "string" && body.hp_company_url.trim() !== "") {
      return NextResponse.json(
        { success: true, message: "Commercial enquiry received successfully." },
        { status: 200 }
      );
    }

    // 2. Extract & Sanitize fields
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const company = typeof body.company_or_pharmacy_name === "string" ? body.company_or_pharmacy_name.trim() : "";
    const rawPhone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const city = typeof body.city === "string" ? body.city.trim() : "";
    const district = typeof body.district === "string" ? body.district.trim() : "";
    const rawBusinessType = typeof body.business_type === "string" ? body.business_type.trim() : "";
    const businessType: BusinessType = ALLOWED_BUSINESS_TYPES.includes(rawBusinessType as BusinessType)
      ? (rawBusinessType as BusinessType)
      : "Distributor";

    let productsInterested: string[] = [];
    if (Array.isArray(body.products_interested_in)) {
      productsInterested = body.products_interested_in
        .filter((p: unknown) => typeof p === "string" && p.trim().length > 0)
        .map((p: string) => p.trim().slice(0, 100))
        .slice(0, 10);
    }

    const message = typeof body.message === "string" ? body.message.trim().slice(0, 3000) : "";

    // 3. Strict Server-Side Validation
    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, message: "Full Name is required (2-100 characters)." },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhone(rawPhone);
    if (!/^\d{10,15}$/.test(normalizedPhone)) {
      return NextResponse.json(
        { success: false, message: "A valid telephone or mobile number with at least 10 digits is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      return NextResponse.json(
        { success: false, message: "A valid commercial email address is required." },
        { status: 400 }
      );
    }

    // 4. Check Resend Configuration
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[Enquiry API Error] RESEND_API_KEY is not configured in environment variables.");
      return NextResponse.json(
        { success: false, message: "Email service is temporarily unconfigured. Please contact support via phone or email." },
        { status: 500 }
      );
    }

    const toEmail = process.env.ENQUIRY_TO_EMAIL || "aaliispharma2025@gmail.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Aaliis Pharmaceuticals <onboarding@resend.dev>";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aaliispharma.com";
    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const subjectEntity = company ? `${company} (${name})` : name;
    const subject = `New Aaliis Commercial Enquiry — ${subjectEntity}`;

    // 5. Construct Structured Plain Text
    const textContent = `
NEW COMMERCIAL ENQUIRY — AALIIS PHARMACEUTICALS
==================================================

COMMERCIAL PARTNER COORDINATES:
• Full Name: ${name}
• Entity / Pharmacy: ${company || "Not provided"}
• Business Type: ${businessType}
• Phone: ${rawPhone} (Normalized: ${normalizedPhone})
• Email: ${email}
• City / Territory: ${city || "Not provided"}
• District: ${district || "Not provided"}

COMMERCIAL PROCUREMENT / PCD INTEREST:
• Formulation(s) of Interest: ${productsInterested.length > 0 ? productsInterested.join(", ") : "General Portfolio / Not specified"}

MESSAGE / SCOPE OF ENQUIRY:
${message || "No additional commercial remarks provided."}

==================================================
METADATA:
• Source: Aaliis Pharmaceuticals B2B Portal (${siteUrl}/business-enquiry)
• Timestamp (IST): ${timestamp}
• Dispatch Target: ${toEmail}
`.trim();

    // 6. Construct Professional B2B HTML Email
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
    .header { background-color: #006039; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; }
    .header p { margin: 4px 0 0; font-size: 12px; color: #a7f3d0; }
    .badge { display: inline-block; background-color: rgba(255,255,255,0.18); border-radius: 4px; padding: 3px 8px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-top: 8px; }
    .content { padding: 24px; }
    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #024a44; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin: 20px 0 12px; }
    .section-title:first-child { margin-top: 0; }
    .data-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    .data-table th { text-align: left; font-size: 11px; text-transform: uppercase; color: #64748b; padding: 8px 12px 8px 0; width: 35%; vertical-align: top; border-bottom: 1px solid #f1f5f9; }
    .data-table td { font-size: 13px; font-weight: 600; color: #0f172a; padding: 8px 0; vertical-align: top; border-bottom: 1px solid #f1f5f9; }
    .message-box { background-color: #f8fafc; border-left: 3px solid #006039; padding: 12px 16px; font-size: 13px; line-height: 1.6; color: #334155; border-radius: 0 8px 8px 0; margin-top: 8px; }
    .pill { display: inline-block; background: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 9999px; margin-right: 6px; margin-bottom: 6px; }
    .footer { background-color: #f1f5f9; padding: 16px 24px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: left; }
    .footer strong { color: #334155; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Aaliis Pharmaceuticals</h1>
      <p>Commercial Distribution &amp; PCD Franchise Portal</p>
      <div class="badge">Commercial B2B Lead</div>
    </div>
    
    <div class="content">
      <div class="section-title">Commercial Partner Information</div>
      <table class="data-table">
        <tr>
          <th>Full Name</th>
          <td>${escapeHtml(name)}</td>
        </tr>
        <tr>
          <th>Entity / Pharmacy</th>
          <td>${escapeHtml(company || "Individual / Not Specified")}</td>
        </tr>
        <tr>
          <th>Business Classification</th>
          <td>${escapeHtml(businessType)}</td>
        </tr>
        <tr>
          <th>Contact Telephone</th>
          <td><a href="tel:${escapeHtml(normalizedPhone)}" style="color:#006039; text-decoration:none;">${escapeHtml(rawPhone)}</a></td>
        </tr>
        <tr>
          <th>Commercial Email</th>
          <td><a href="mailto:${escapeHtml(email)}" style="color:#006039; text-decoration:none;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <th>Target Territory</th>
          <td>${escapeHtml(city || "—")}${city && district ? ", " : ""}${escapeHtml(district || "—")} (Tamil Nadu)</td>
        </tr>
      </table>

      <div class="section-title">Formulation &amp; Procurement Scope</div>
      <div style="margin-bottom: 12px;">
        ${productsInterested.length > 0
        ? productsInterested.map((p) => `<span class="pill">${escapeHtml(p)}</span>`).join(" ")
        : '<span style="font-size:12px; color:#64748b; font-style:italic;">General Portfolio / Complete Catalogue Enquiry</span>'
      }
      </div>

      <div class="section-title">Commercial Message / Requirements</div>
      <div class="message-box">
        ${escapeHtml(message || "No additional commercial remarks provided.").replace(/\n/g, "<br>")}
      </div>
    </div>

    <div class="footer">
      <strong>Statutory Note:</strong> Commercial wholesale distribution is conducted strictly under Form 20B / 21B statutory drug licences. Direct retail or patient-facing sales are prohibited.<br><br>
      <strong>Dispatched via:</strong> Aaliis Pharmaceuticals B2B Web Portal &bull; Timestamp (IST): ${escapeHtml(timestamp)}
    </div>
  </div>
</body>
</html>
`.trim();

    // 7. Dispatch via Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        html: htmlContent,
        text: textContent,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!resendResponse.ok) {
      const errorJson = await resendResponse.json().catch(() => ({}));
      // Safely log server-side without leaking secrets
      console.error(
        "[Enquiry API Delivery Failed]",
        resendResponse.status,
        errorJson.name || "ResendAPIError",
        errorJson.message || "Unknown delivery error"
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unable to dispatch commercial enquiry right now. Please call our distribution desk or email directly.",
        },
        { status: 502 }
      );
    }

    const resendData = await resendResponse.json().catch(() => ({}));

    return NextResponse.json(
      {
        success: true,
        message: "Commercial enquiry received successfully.",
        enquiryId: resendData.id || undefined,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Enquiry API Unexpected Error]", error?.name || "Error", error?.message || "Internal server error");
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your enquiry. Please contact our distribution desk directly.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return new NextResponse(
    JSON.stringify({ error: "Method Not Allowed. Use POST to submit commercial enquiries." }),
    {
      status: 405,
      headers: {
        Allow: "POST",
        "Content-Type": "application/json",
      },
    }
  );
}

export async function PUT() {
  return new NextResponse(
    JSON.stringify({ error: "Method Not Allowed. Use POST to submit commercial enquiries." }),
    {
      status: 405,
      headers: {
        Allow: "POST",
        "Content-Type": "application/json",
      },
    }
  );
}

export async function DELETE() {
  return new NextResponse(
    JSON.stringify({ error: "Method Not Allowed. Use POST to submit commercial enquiries." }),
    {
      status: 405,
      headers: {
        Allow: "POST",
        "Content-Type": "application/json",
      },
    }
  );
}

