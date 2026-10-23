export function amReceipt(data: any, config: any) {
  const clientName = data.name || data.visitorName || data.client_name || data.visitor_name || data.clientName || "Valued Client";
  const requestedDate = data.date || data.selectedDate || data.requested_date || data.requestedDate || data.date_string || "Selected Weekend Date";
  const category = data.category || data.selectedCategory || data.session_category || data.service || data.session_type || "Photography Session";

  const primaryText = config?.primary_text || "#FFFFFF";
  const accentColor = config?.accent_color || "#FF6800";
  const backgroundColor = config?.background_color || "#000000";

  const DEFAULT_AM_LOGO_URL = "https://kjwbwfizbbfzfvvlltea.supabase.co/storage/v1/object/public/logos/logo-email.png";
  const baseUrl = (config?.website_url || "").replace(/\/$/, "");
  const supabaseEnvUrl = (typeof Deno !== "undefined" ? Deno.env.get("SUPABASE_URL") : "") || "";
  const cleanSupabaseUrl = supabaseEnvUrl.replace(/\/$/, "");
  const cloudLogoEnv = (typeof Deno !== "undefined" ? (Deno.env.get("SUPABASE_LOGO_URL") || Deno.env.get("AM_LOGO_URL")) : "") || "";

  const defaultSupabaseLogo = cloudLogoEnv || (cleanSupabaseUrl
    ? `${cleanSupabaseUrl}/storage/v1/object/public/logos/logo-email.png`
    : DEFAULT_AM_LOGO_URL);

  const logoUrl =
    config?.logo_url ||
    config?.logo ||
    defaultSupabaseLogo ||
    DEFAULT_AM_LOGO_URL;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Request Received - ANGELIQUE-MARI PHOTOGRAPHY</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${backgroundColor}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: ${primaryText}; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${backgroundColor}; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: ${backgroundColor}; border: 1px solid rgba(255,104,0,0.25); padding: 40px;">
          
          <!-- Header Logo & Tagline -->
          <tr>
            <td align="center" style="padding-bottom: 25px; border-bottom: 1px solid rgba(255,255,255,0.1);">
              <p style="margin: 0 0 16px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: ${accentColor}; font-family: monospace; text-align: left;">
                // BOOKING CONFIRMATION
              </p>
              <div style="margin: 0 auto; text-align: center;">
                <a href="${baseUrl || '#'}" target="_blank" style="text-decoration: none; display: inline-block; text-align: center;">
                  <!-- Circular Orange Dimensional Ring Emblem -->
                  <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto;">
                    <tr>
                      <td align="center" valign="middle" style="
                        width: 136px; 
                        height: 136px; 
                        border-radius: 50%; 
                        border: 2px solid #FF6800; 
                        border-top: 2px solid #FF8D33; 
                        border-bottom: 2px solid #C44E00; 
                        box-shadow: 0 6px 22px rgba(255, 104, 0, 0.35), inset 0 1.5px 3px rgba(255, 255, 255, 0.35), inset 0 -3px 6px rgba(0, 0, 0, 0.85); 
                        background-color: #050505;
                        text-align: center;
                        vertical-align: middle;
                        padding: 8px;
                      ">
                        <img src="${logoUrl}" alt="AM Logo" width="108" style="display: block; margin: 0 auto; width: 108px; max-width: 108px; height: auto; border: 0; outline: none; text-decoration: none;" />
                      </td>
                    </tr>
                  </table>

                  <!-- Brand Masthead Typography -->
                  <div style="margin-top: 18px; text-align: center;">
                    <span style="display: block; font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; font-size: 21px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #ffffff; line-height: 1.2;">
                      Angelique-Mari
                    </span>
                    <span style="display: block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.45em; text-transform: lowercase; color: ${accentColor}; line-height: 1.4; margin-top: 4px;">
                      photography
                    </span>
                  </div>
                </a>
              </div>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding-top: 30px; padding-bottom: 30px;">
              <p style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: ${primaryText};">
                BOOKING <span style="color: ${accentColor}; font-style: italic; font-weight: 300;">RECEIVED</span>
              </p>
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.7; color: #dddddd;">
                Thank you <strong style="color: ${primaryText};">${clientName}</strong> — your booking is in. I'll review everything shortly.
              </p>

              <!-- Session Details Card -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); padding: 20px; margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #888888;">REQUESTED DATE</p>
                    <p style="margin: 0; font-size: 15px; font-weight: 700; color: ${accentColor};">${requestedDate}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px;">
                    <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #888888;">SESSION CATEGORY</p>
                    <p style="margin: 0; font-size: 15px; font-weight: 700; color: ${primaryText}; text-transform: uppercase;">${category}</p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #bbbbbb;">
                You will receive a direct personal response within <strong style="color: ${primaryText};">24 hours</strong> to finalize location direction, lighting concepts, and session timing.
              </p>

              <p style="margin: 0; font-size: 14px; color: #888888;">
                Warm regards,<br>
                <strong style="color: ${primaryText};">ANGELIQUE-MARI PHOTOGRAPHY</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
              <p style="margin: 0; font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #555555;">
                ANGELIQUE-MARI PHOTOGRAPHY • JOHANNESBURG
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
