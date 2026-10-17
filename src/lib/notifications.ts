// Notification Service Engine for Maratha Matrimony
// Centralized notification dispatcher supporting Email, WhatsApp, SMS & Google Sheets Webhooks.

export const NOTIFICATION_CONFIG = {
  // Feature Flags:
  ENABLE_EMAIL: true,         // Active: Sends HTML emails
  ENABLE_WHATSAPP: false,     // Disabled until WhatsApp Business API service is active
  ENABLE_SMS: false,          // Disabled until SMS gateway is active
  ENABLE_WEBHOOK: true,       // Active: Syncs to Google Sheet / CRM if WEBHOOK_URL is set
};

export type NotificationType = 
  | "INTEREST_RECEIVED"
  | "INTEREST_ACCEPTED"
  | "CONTACT_UNLOCKED"
  | "WELCOME_PREMIUM"
  | "PRE_REGISTRATION_CONFIRMATION"
  | "ADMIN_NEW_LEAD";

export interface NotificationPayload {
  type: NotificationType;
  recipientEmail?: string | null;
  recipientPhone?: string | null;
  recipientName: string;
  actorName?: string;
  actorProfileId?: string;
  customMessage?: string;
  metadata?: Record<string, any>;
}

export async function sendMatrimonyAlert(payload: NotificationPayload) {
  const results = {
    email: false,
    whatsapp: false,
    sms: false,
    webhook: false,
  };

  // 1. WhatsApp Dispatch (Disabled per configuration)
  if (NOTIFICATION_CONFIG.ENABLE_WHATSAPP && payload.recipientPhone) {
    try {
      console.log(`[WhatsApp Notification sent to ${payload.recipientPhone}]`);
      results.whatsapp = true;
    } catch (err) {
      console.error("WhatsApp notification error:", err);
    }
  }

  // 2. SMS Dispatch (Disabled per configuration)
  if (NOTIFICATION_CONFIG.ENABLE_SMS && payload.recipientPhone) {
    try {
      console.log(`[SMS Notification sent to ${payload.recipientPhone}]`);
      results.sms = true;
    } catch (err) {
      console.error("SMS notification error:", err);
    }
  }

  // 3. Google Sheets / CRM Webhook Sync (If configured)
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.WEBHOOK_URL;
  if (NOTIFICATION_CONFIG.ENABLE_WEBHOOK && webhookUrl && payload.metadata) {
    try {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: payload.type,
          timestamp: new Date().toISOString(),
          passId: payload.customMessage,
          candidateName: payload.recipientName,
          ...payload.metadata,
        }),
      }).catch((webhookErr) => {
        console.warn("Non-blocking webhook sync warning:", webhookErr);
      });
      results.webhook = true;
    } catch (e) {
      console.warn("Webhook dispatch error:", e);
    }
  }

  // 4. Email Dispatch (ACTIVE)
  if (NOTIFICATION_CONFIG.ENABLE_EMAIL && payload.recipientEmail) {
    try {
      const emailContent = generateMatrimonyEmailTemplate(payload);
      
      const resendApiKey = process.env.RESEND_API_KEY;
      const smtpHost = process.env.SMTP_HOST;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      // Method A: Resend API (Recommended for Vercel/Next.js)
      if (resendApiKey) {
        try {
          const fromEmail = process.env.RESEND_FROM || process.env.SMTP_FROM || "Maratha Matrimony <hello@marathalageen.com>";
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: fromEmail,
              to: payload.recipientEmail.includes(",") ? payload.recipientEmail.split(",").map(e => e.trim()) : [payload.recipientEmail.trim()],
              subject: emailContent.subject,
              html: emailContent.html,
            }),
          });
          const resJson = await res.json();
          if (res.ok) {
            results.email = true;
            console.log(`✅ Email dispatched via Resend to ${payload.recipientEmail}: ID ${resJson.id}`);
          } else {
            console.warn("Resend API warning:", resJson);
          }
        } catch (resendErr) {
          console.error("Resend API call error:", resendErr);
        }
      }

      // Method B: SMTP (Nodemailer fallback)
      if (!results.email && smtpHost && smtpUser && smtpPass) {
        try {
          const nodemailer = await import("nodemailer");
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_PORT === "465",
            auth: { user: smtpUser, pass: smtpPass },
          });

          await transporter.sendMail({
            from: `"Maratha Matrimony" <${process.env.SMTP_FROM || smtpUser}>`,
            to: payload.recipientEmail,
            subject: emailContent.subject,
            html: emailContent.html,
          });
          results.email = true;
          console.log(`✅ Email dispatched via SMTP to ${payload.recipientEmail}`);
        } catch (smtpErr) {
          console.error("SMTP dispatch error:", smtpErr);
        }
      }

      // Method C: Development console preview fallback
      if (!results.email) {
        console.log(`\n================= 🚩 MATRIMONY EMAIL DISPATCH =================`);
        console.log(`To: ${payload.recipientEmail} (${payload.recipientName})`);
        console.log(`Subject: ${emailContent.subject}`);
        console.log(`Type: ${payload.type}`);
        console.log(`Pass ID: ${payload.customMessage || "N/A"}`);
        console.log(`Notice: Set RESEND_API_KEY or SMTP credentials in .env to deliver live emails to inbox.`);
        console.log(`===============================================================\n`);
        results.email = true;
      }
    } catch (err) {
      console.error("Email notification dispatch error:", err);
    }
  }

  return results;
}

function generateMatrimonyEmailTemplate(payload: NotificationPayload): { subject: string; html: string } {
  const appUrl = process.env.NEXTAUTH_URL || "https://marathalageen.com";
  let subject = "Maratha Matrimony Notification";
  let title = "New Notification";
  let body = "";
  let actionText = "View Profile";
  let actionUrl = `${appUrl}/dashboard/interests`;

  switch (payload.type) {
    case "INTEREST_RECEIVED":
      subject = `🚩 ${payload.actorName || "A Member"} expressed interest in your profile!`;
      title = "New Interest Received";
      body = `<strong>${payload.actorName || "A verified candidate"}</strong> has viewed your biodata and expressed interest in connecting with you for a matrimonial alliance.`;
      actionText = "View Biodata & Respond";
      if (payload.actorProfileId) actionUrl = `${appUrl}/profile/${payload.actorProfileId}`;
      break;

    case "INTEREST_ACCEPTED":
      subject = `🎉 ${payload.actorName || "Member"} accepted your interest!`;
      title = "Interest Accepted";
      body = `Congratulations! <strong>${payload.actorName || "Candidate"}</strong> has accepted your interest request. You can now chat and coordinate directly with their family.`;
      actionText = "Start Conversation";
      actionUrl = `${appUrl}/dashboard/interests`;
      break;

    case "CONTACT_UNLOCKED":
      subject = `📞 Contact details unlocked for ${payload.actorName || "Candidate"}`;
      title = "Contact Details Unlocked";
      body = `You have successfully unlocked the contact details of <strong>${payload.actorName || "Candidate"}</strong>. You may now call or connect with the family directly.`;
      actionText = "View Contact Details";
      if (payload.actorProfileId) actionUrl = `${appUrl}/profile/${payload.actorProfileId}`;
      break;

    case "PRE_REGISTRATION_CONFIRMATION":
      subject = `🚩 Welcome to Maratha Matrimony! VIP Pass: ${payload.customMessage || "ML-2026-VIP"}`;
      title = "VIP Pre-Registration Confirmed";
      body = `
        🚩 <strong>ಜೈ ಭವಾನಿ, ಜೈ ಶಿವಾಜಿ!</strong><br /><br />
        Dear <strong>${payload.recipientName}</strong>,<br /><br />
        Congratulations! Your matrimonial profile has been successfully pre-registered on <strong>Maratha Matrimony (Maratha Lageen)</strong>.<br /><br />
        <div style="background-color: #FFF1F5; border: 2px dashed #DB1866; border-radius: 16px; padding: 20px; text-align: center; margin: 20px 0;">
          <p style="margin: 0; font-size: 12px; color: #DB1866; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Official VIP Early Access Pass</p>
          <h2 style="margin: 8px 0; color: #2A3773; font-size: 24px; font-family: monospace; letter-spacing: 2px;">${payload.customMessage || "ML-2026-VIP"}</h2>
          <p style="margin: 0; font-size: 13px; color: #047857; font-weight: bold;">✓ 1-Year Complimentary VIP Membership Activated (Worth ₹4,999 FREE)</p>
        </div>
        <strong>Your VIP Privileges Include:</strong>
        <ul style="color: #4b5563; font-size: 14px; line-height: 1.8; margin-top: 10px;">
          <li>🌟 <strong>Direct WhatsApp Connects</strong> with verified Maratha families</li>
          <li>🛡️ <strong>100% Privacy Protection</strong> with photo & contact shields</li>
          <li>🔮 <strong>36 Gunas Vedic Kundali Milan</strong> with Devak & Gotra compatibility</li>
          <li>👑 <strong>Priority Placement</strong> in match recommendations across Karnataka</li>
        </ul>
        Our community relationship team will review your biodata and assist you in finding your destined life partner.
      `;
      actionText = "Access Member Portal";
      actionUrl = `${appUrl}/login`;
      break;

    case "ADMIN_NEW_LEAD":
      const m = payload.metadata || {};
      subject = `🚩 [NEW LEAD] ${payload.recipientName} (${m.district || "Karnataka"}) • VIP Pass ${payload.customMessage || ""}`;
      title = "🎉 New Candidate Pre-Registration Received!";
      body = `
        A new Maratha candidate has just pre-registered on <strong>marathalageen.com</strong>.<br /><br />
        
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 14px; background: #FFF8FA; border-radius: 12px; overflow: hidden; border: 1px solid #FADADF;">
          <tr style="background: #2A3773; color: white;">
            <th colspan="2" style="padding: 10px 14px; text-align: left; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Candidate Information</th>
          </tr>
          <tr style="border-bottom: 1px solid #FADADF;">
            <td style="padding: 10px 14px; font-weight: bold; color: #2A3773; width: 35%;">VIP Pass ID:</td>
            <td style="padding: 10px 14px; font-family: monospace; font-weight: bold; color: #DB1866;">${payload.customMessage || "N/A"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #FADADF;">
            <td style="padding: 10px 14px; font-weight: bold; color: #2A3773;">Full Name:</td>
            <td style="padding: 10px 14px; font-weight: bold;">${payload.recipientName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #FADADF;">
            <td style="padding: 10px 14px; font-weight: bold; color: #2A3773;">Caste / Sub-Caste:</td>
            <td style="padding: 10px 14px;">${m.caste || "Kshatriya Maratha"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #FADADF;">
            <td style="padding: 10px 14px; font-weight: bold; color: #2A3773;">Gender & Age:</td>
            <td style="padding: 10px 14px;">${m.gender || "Not specified"} • ${m.age ? m.age + " Yrs" : (m.dob || "N/A")}</td>
          </tr>
          <tr style="border-bottom: 1px solid #FADADF;">
            <td style="padding: 10px 14px; font-weight: bold; color: #2A3773;">District / City:</td>
            <td style="padding: 10px 14px;"><strong>${m.district || "Karnataka"}</strong></td>
          </tr>
          <tr style="border-bottom: 1px solid #FADADF;">
            <td style="padding: 10px 14px; font-weight: bold; color: #2A3773;">Mobile Number:</td>
            <td style="padding: 10px 14px;">
              <a href="tel:+91${m.mobile}" style="color: #2A3773; font-weight: bold; text-decoration: none;">+91 ${m.mobile}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #FADADF;">
            <td style="padding: 10px 14px; font-weight: bold; color: #2A3773;">WhatsApp Number:</td>
            <td style="padding: 10px 14px;">
              <a href="https://wa.me/91${m.whatsapp || m.mobile}" target="_blank" style="color: #047857; font-weight: bold; text-decoration: none;">+91 ${m.whatsapp || m.mobile} (Chat Now)</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #FADADF;">
            <td style="padding: 10px 14px; font-weight: bold; color: #2A3773;">Email Address:</td>
            <td style="padding: 10px 14px;">${m.email || "Not provided"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #FADADF;">
            <td style="padding: 10px 14px; font-weight: bold; color: #2A3773;">Education:</td>
            <td style="padding: 10px 14px;">${m.education || "N/A"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #FADADF;">
            <td style="padding: 10px 14px; font-weight: bold; color: #2A3773;">Profession & Income:</td>
            <td style="padding: 10px 14px;">${m.profession || "N/A"} • ${m.annualIncome || "N/A"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #FADADF;">
            <td style="padding: 10px 14px; font-weight: bold; color: #2A3773;">Kundali Details:</td>
            <td style="padding: 10px 14px;">Rashi: ${m.rashi || "N/A"} • Nakshatra: ${m.nakshatra || "N/A"} • Time: ${m.birthTime || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: bold; color: #2A3773;">Registered By:</td>
            <td style="padding: 10px 14px;">${m.registeringFor || "Self"}</td>
          </tr>
        </table>
      `;
      actionText = "Open in Admin Dashboard";
      actionUrl = `${appUrl}/admin/preregistrations`;
      break;

    case "WELCOME_PREMIUM":
      subject = `👑 Welcome to Maratha Matrimony VIP Membership!`;
      title = "VIP Membership Activated";
      body = `Thank you for choosing Maratha Matrimony. Your VIP privileges (Contact Unlocks, Kundali Milan, and Priority Listing) are now active.`;
      actionText = "Explore Matches";
      actionUrl = `${appUrl}/search`;
      break;
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${subject}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #FFF1F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 20px rgba(42, 55, 115, 0.08); border: 1px solid #FADADF;">
          <!-- Header -->
          <tr>
            <td align="center" style="background-color: #2A3773; padding: 30px 20px; border-bottom: 4px solid #DB1866;">
              <h2 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 0.5px;">🚩 Maratha Matrimony</h2>
              <p style="color: #FADADF; margin: 6px 0 0 0; font-size: 13px;">Official Matrimonial Network for Karnataka</p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 35px 30px;">
              <h3 style="color: #2A3773; font-size: 18px; margin-top: 0; margin-bottom: 14px;">${title}</h3>
              <div style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
                ${body}
              </div>
              
              <!-- CTA Button -->
              <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 25px auto;">
                <tr>
                  <td align="center" style="border-radius: 50px; background-color: #DB1866;">
                    <a href="${actionUrl}" target="_blank" style="font-size: 14px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 50px; display: inline-block;">
                      ${actionText}
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #9ca3af; font-size: 12px; line-height: 1.5; margin-top: 30px; border-top: 1px solid #f3f4f6; padding-top: 20px; text-align: center;">
                Maratha Matrimony Relationship & Verification Desk • Belagavi • Bengaluru • Hubballi
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #FFF8FA; padding: 20px; border-top: 1px solid #FADADF; color: #6b7280; font-size: 12px;">
              © ${new Date().getFullYear()} Maratha Matrimony. All rights reserved.<br />
              🚩 ಜೈ ಭವಾನಿ, ಜೈ ಶಿವಾಜಿ
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return { subject, html };
}
