import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { bearNotification } from "./notification-BW.ts";
import { bearReceipt } from "./receipt-BW.ts";
import { amNotification } from "./notification-AM.ts";
import { amReceipt } from "./receipt-AM.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const data = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey =
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
      Deno.env.get("SUPABASE_ANON_KEY") ||
      "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const origin = req.headers.get("origin") || "";
    const normalizedOrigin = origin.trim().replace(/\/$/, "");

    let clientRow: any = null;

    if (origin) {
      const { data: exactRow, error: exactErr } = await supabase
        .from("clients")
        .select("*")
        .eq("website_url", origin)
        .maybeSingle();

      if (exactRow) {
        clientRow = exactRow;
      } else if (exactErr) {
        console.warn("[send-email] Notice querying clients by website_url:", exactErr.message);
      }

      if (!clientRow && normalizedOrigin && normalizedOrigin !== origin) {
        const { data: normRow } = await supabase
          .from("clients")
          .select("*")
          .eq("website_url", normalizedOrigin)
          .maybeSingle();
        if (normRow) {
          clientRow = normRow;
        }
      }
    }

    if (!clientRow) {
      console.warn(`[send-email] No client matching website_url "${origin}". Fetching default fallback row...`);
      const { data: fallbackRow, error: fallbackErr } = await supabase
        .from("clients")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (fallbackErr) {
        console.error("[send-email] Error fetching fallback client row:", fallbackErr.message);
      }
      clientRow = fallbackRow;
    }

    if (!clientRow) {
      throw new Error(`Client configuration could not be found for origin: ${origin}`);
    }

    console.log("[send-email] Single source of truth clientRow:", clientRow);

    const clientId: string | null = clientRow.id || null;
    const adminName: string = clientRow.business_name || "ANGELIQUE-MARI PHOTOGRAPHY";
    const adminNotificationRecipientEmail: string =
      clientRow.business_email ||
      Deno.env.get("ADMIN_EMAIL") ||
      "leeualbertm@gmail.com";

    const clientFormEmail: string | null =
      data.email ||
      data.visitorEmail ||
      data.client_email ||
      data.visitor_email ||
      data.clientEmail ||
      null;

    const DEFAULT_AM_LOGO_URL = "https://kjwbwfizbbfzfvvlltea.supabase.co/storage/v1/object/public/logos/logo-email.png";
    const supabaseEnvUrl = (Deno.env.get("SUPABASE_URL") || "").replace(/\/$/, "");
    const cloudLogoEnv = Deno.env.get("SUPABASE_LOGO_URL") || Deno.env.get("AM_LOGO_URL") || "";
    const supabaseLogoUrl = cloudLogoEnv || (supabaseEnvUrl
      ? `${supabaseEnvUrl}/storage/v1/object/public/logos/logo-email.png`
      : DEFAULT_AM_LOGO_URL);

    const clientConfig = {
      business_name: clientRow.business_name || "ANGELIQUE-MARI PHOTOGRAPHY",
      primary_text: clientRow.primary_text || "#FFFFFF",
      accent_color: clientRow.accent_color || "#FF6800",
      background_color: clientRow.background_color || "#000000",
      slug: clientRow.slug || "am-photography",
      website_url: clientRow.website_url || origin,
      business_email: clientRow.business_email || adminNotificationRecipientEmail,
      logo_url: clientRow.logo_url || clientRow.logo || supabaseLogoUrl || DEFAULT_AM_LOGO_URL,
    };

    console.log("[send-email] Admin Notification Recipient Email:", adminNotificationRecipientEmail);
    console.log("[send-email] Client Receipt Form Email:", clientFormEmail);

    let notificationHtml: string;
    let receiptHtml: string;

    switch (clientRow.slug) {
      case "am-photography":
        notificationHtml = amNotification(data, clientConfig);
        receiptHtml = amReceipt(data, clientConfig);
        break;

      case "bear-builds-web":
        notificationHtml = bearNotification(data, clientConfig);
        receiptHtml = bearReceipt(data, clientConfig);
        break;

      default:
        notificationHtml = amNotification(data, clientConfig);
        receiptHtml = amReceipt(data, clientConfig);
        break;
    }

    // 4. STEP A: Database Persistence
    let dbSaved = false;
    let dbError = null;

    try {
      const clientName = data.name || data.visitorName || data.client_name || data.visitor_name || data.clientName || null;
      const clientEmail = data.email || data.visitorEmail || data.client_email || data.visitor_email || data.clientEmail || null;
      const clientPhone = data.phone || data.visitorPhone || data.contact_number || data.phone_number || data.visitor_phone || data.contactNumber || null;
      const requestedDate = data.date || data.selectedDate || data.requested_date || data.requestedDate || data.date_string || null;
      const category = data.category || data.selectedCategory || data.session_category || data.service || data.session_type || null;
      const notes = data.notes || data.sessionNotes || data.vision || data.session_notes || data.vision_notes || null;

      const clientSlug = clientRow?.slug || clientConfig?.slug || "am-photography";

      const responsesData = {
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        date: requestedDate,
        category: category,
        notes: notes,
        profession: data.profession || null,
        online_presence: data.onlinePresence || data.online_presence || null,
        booking_process: data.bookingProcess || data.booking_process || null,
        slowing_down: data.slowingDown || data.slowing_down || null,
      };

      const submissionPayload: Record<string, any> = {
        responses: responsesData,
        created_at: new Date().toISOString(),
      };

      if (clientId) {
        submissionPayload.client_id = clientId;
      }
      if (clientSlug) {
        submissionPayload.client_slug = clientSlug;
      }

      const { error: insErr } = await supabase.from("submissions").insert(submissionPayload);
      if (!insErr) {
        dbSaved = true;
        console.log("[send-email] Successfully inserted submission into 'submissions' table with client_slug & client_id");
      } else {
        console.warn("[send-email] Insert with client_slug returned error:", insErr.message, "Trying fallback without client_slug...");
        delete submissionPayload.client_slug;

        const { error: insErr2 } = await supabase.from("submissions").insert(submissionPayload);
        if (!insErr2) {
          dbSaved = true;
          console.log("[send-email] Successfully inserted submission into 'submissions' table without client_slug");
        } else {
          console.warn("[send-email] Insert with client_id returned error:", insErr2.message, "Trying insert without client_id...");
          delete submissionPayload.client_id;

          const { error: insErr3 } = await supabase.from("submissions").insert(submissionPayload);
          if (!insErr3) {
            dbSaved = true;
            console.log("[send-email] Successfully inserted submission into 'submissions' table with minimal payload");
          } else {
            console.error("[send-email] Failed inserting into 'submissions' table:", insErr3.message);
            dbError = `${insErr.message} | ${insErr2.message} | ${insErr3.message}`;
          }
        }
      }
    } catch (err: any) {
      console.error("[send-email] Exception during DB insert into 'submissions':", err);
      dbError = err?.message || String(err);
    }

    // 5. STEP B: Send Admin Notification Email
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const senderEmail = Deno.env.get("SENDER_EMAIL") || Deno.env.get("FROM_EMAIL") || `${adminName} <noreply@bearbuildsweb.co.za>`;
    let notificationSent = false;
    let notificationErr = null;

    if (resendApiKey) {
      try {
        console.log(`[send-email] Sending Admin Notification to: ${adminNotificationRecipientEmail}`);
        const subjectLine = clientRow.slug === "am-photography"
          ? `📸 New Booking Request • ${data.category || data.selectedCategory || "Session"}`
          : `🐻 New Prototype Request • ${data.profession || "Client"}`;

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: senderEmail,
            to: [adminNotificationRecipientEmail],
            subject: subjectLine,
            html: notificationHtml,
          }),
        });

        const resJson = await res.json().catch(() => ({}));
        if (res.ok) {
          notificationSent = true;
          console.log("[send-email] Admin notification sent successfully:", resJson);
        } else {
          console.error("[send-email] Resend error on admin notification:", resJson);
          notificationErr = resJson?.message || `Resend error HTTP ${res.status}`;
        }
      } catch (err: any) {
        console.error("[send-email] Exception sending admin notification:", err);
        notificationErr = err?.message || String(err);
      }
    } else {
      notificationErr = "RESEND_API_KEY missing in Edge Function environment.";
    }

    // 6. STEP C: Send Client Receipt Email
    let receiptSent = false;
    let receiptErr = null;

    if (resendApiKey && clientFormEmail) {
      try {
        console.log(`[send-email] Sending Client Receipt Confirmation to: ${clientFormEmail}`);
        const subjectLine = clientRow.slug === "am-photography"
          ? `Your Booking Has Been Received • ANGELIQUE-MARI PHOTOGRAPHY`
          : `Your Prototype is Officially in the Queue 🐻`;

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: senderEmail,
            to: [clientFormEmail],
            subject: subjectLine,
            html: receiptHtml,
          }),
        });

        const resJson = await res.json().catch(() => ({}));
        if (res.ok) {
          receiptSent = true;
          console.log("[send-email] Client receipt sent successfully:", resJson);
        } else {
          console.error("[send-email] Resend error on client receipt:", resJson);
          receiptErr = resJson?.message || `Resend error HTTP ${res.status}`;
        }
      } catch (err: any) {
        console.error("[send-email] Exception sending client receipt:", err);
        receiptErr = err?.message || String(err);
      }
    }

    return new Response(
      JSON.stringify({
        success: dbSaved || notificationSent || receiptSent,
        dbSaved,
        notificationSent,
        receiptSent,
        adminNotificationRecipientEmail,
        clientFormEmail,
        errors: {
          dbError,
          notificationErr,
          receiptErr,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("[send-email] Critical edge function exception:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err?.message || "Internal Edge Function Error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
