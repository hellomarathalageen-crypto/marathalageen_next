/**
 * Maratha Matrimony platform constants & contact configurations
 */

export const SUPPORT_CONFIG = {
  // Dedicated phone number for WhatsApp and Customer Support
  WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919844295369",
  PHONE_NUMBER: "+91 88619 62026",
  EMAIL: "contact@marathalageen.com",
  SUPPORT_EMAIL: "support@marathalageen.com",
  OFFICE_LOCATIONS: "Bengaluru • Belagavi • Hubballi • Pune",
};

export function getWhatsAppLink(customText?: string) {
  const defaultText = "Hello Maratha Matrimony Support, I have a query regarding pre-registration.";
  const text = customText || defaultText;
  const cleanNumber = SUPPORT_CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}
