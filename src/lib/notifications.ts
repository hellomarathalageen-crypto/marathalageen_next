// Notification Service Engine for Maratha Matrimony
// Centralized notification dispatcher supporting Email, WhatsApp, and SMS.

export const NOTIFICATION_CONFIG = {
  // Feature Flags:
  ENABLE_EMAIL: true,         // Active: Sends HTML emails
  ENABLE_WHATSAPP: false,     // Disabled until WhatsApp Business API service is active
  ENABLE_SMS: false,          // Disabled until SMS gateway is active
};

export type NotificationType = 
  | "INTEREST_RECEIVED"
  | "INTEREST_ACCEPTED"
  | "CONTACT_UNLOCKED"
  | "WELCOME_PREMIUM";

export interface NotificationPayload {
  type: NotificationType;
  recipientEmail?: string | null;
  recipientPhone?: string | null;
  recipientName: string;
  actorName?: string;
  actorProfileId?: string;
  customMessage?: string;
}

export async function sendMatrimonyAlert(payload: NotificationPayload) {
  const results = {
    email: false,
    whatsapp: false,
    sms: false,
  };

  // 1. WhatsApp Dispatch (Disabled per configuration)
  if (NOTIFICATION_CONFIG.ENABLE_WHATSAPP && payload.recipientPhone) {
    try {
      // Plug WhatsApp Business API provider here (e.g. Gupshup, WATI, Interakt)
      console.log(`[WhatsApp Notification sent to ${payload.recipientPhone}]`);
      results.whatsapp = true;
    } catch (err) {
      console.error("WhatsApp notification error:", err);
    }
  }

  // 2. SMS Dispatch (Disabled per configuration)
  if (NOTIFICATION_CONFIG.ENABLE_SMS && payload.recipientPhone) {
    try {
      // Plug SMS Gateway provider here (e.g. MSG91, Twilio)
      console.log(`[SMS Notification sent to ${payload.recipientPhone}]`);
      results.sms = true;
    } catch (err) {
      console.error("SMS notification error:", err);
    }
  }

  // 3. Email Dispatch (ACTIVE)
  if (NOTIFICATION_CONFIG.ENABLE_EMAIL && payload.recipientEmail) {
    try {
      const emailContent = generateMatrimonyEmailTemplate(payload);
      
      // If SMTP credentials exist, send via nodemailer; otherwise log preview
      const smtpHost = process.env.SMTP_HOST;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (smtpHost && smtpUser && smtpPass) {
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
      } else {
        // Safe development & preview dispatch
        console.log(`\n================= 🚩 MATRIMONY EMAIL ALERT =================`);
        console.log(`To: ${payload.recipientEmail} (${payload.recipientName})`);
        console.log(`Subject: ${emailContent.subject}`);
        console.log(`Type: ${payload.type}`);
        console.log(`============================================================\n`);
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
              <p style="color: #FADADF; margin: 6px 0 0 0; font-size: 13px;">Official Matrimonial Network for Karnataka & Maharashtra</p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 35px 30px;">
              <h3 style="color: #2A3773; font-size: 18px; margin-top: 0; margin-bottom: 14px;">${title}</h3>
              <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
                Hello <strong>${payload.recipientName}</strong>,<br /><br />
                ${body}
              </p>
              
              <!-- CTA Button -->
              <table align="center" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="border-radius: 50px; background-color: #DB1866;">
                    <a href="${actionUrl}" target="_blank" style="font-size: 14px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 50px; display: inline-block;">
                      ${actionText}
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #9ca3af; font-size: 12px; line-height: 1.5; margin-top: 35px; border-top: 1px solid #f3f4f6; padding-top: 20px;">
                Privacy Note: Your personal data and identity are 100% protected on Maratha Matrimony.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #FFF8FA; padding: 20px; border-top: 1px solid #FADADF; color: #6b7280; font-size: 12px;">
              © ${new Date().getFullYear()} Maratha Matrimony. All rights reserved.<br />
              Belagavi • Pune • Kolhapur • Bengaluru
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return { subject, html };
}
