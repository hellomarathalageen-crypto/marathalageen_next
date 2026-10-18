import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

import { sendMatrimonyAlert } from "../src/lib/notifications";

async function main() {
  const targetEmail = process.env.ADMIN_ALERT_EMAIL || process.env.SMTP_USER || process.env.RESEND_FROM;
  
  console.log("--------------------------------------------------");
  console.log("🚀 Testing Maratha Matrimony Email Dispatch...");
  console.log("SMTP_HOST:", process.env.SMTP_HOST || "(not set)");
  console.log("SMTP_USER:", process.env.SMTP_USER || "(not set)");
  console.log("Target Email:", targetEmail || "(not set)");
  console.log("--------------------------------------------------");

  if (!targetEmail) {
    console.error("❌ Error: No target email found! Please set SMTP_USER or ADMIN_ALERT_EMAIL in .env.local");
    process.exit(1);
  }

  const result = await sendMatrimonyAlert({
    type: "PRE_REGISTRATION_CONFIRMATION",
    recipientEmail: targetEmail,
    recipientName: "Test User",
    actorName: "Maratha Matrimony System",
    customMessage: "ML-TEST-PASS-2026",
  });

  if (result.email) {
    console.log("🎉 SUCCESS: Test email dispatched successfully to", targetEmail);
  } else {
    console.log("⚠️ Could not deliver email. Check credentials above.");
  }
}

main().catch(err => {
  console.error("❌ Unexpected error:", err);
  process.exit(1);
});
