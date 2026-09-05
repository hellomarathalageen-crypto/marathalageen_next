import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const alt = "Maratha Matrimony (ಮರಾಠ ಲಗ್ನ) - Official Logo";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  let logoBase64 = "";
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    if (fs.existsSync(logoPath)) {
      const buffer = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${buffer.toString("base64")}`;
    }
  } catch {
    // Fallback if filesystem is unavailable
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          backgroundImage: "radial-gradient(circle at 50% 30%, #FFF5F8 0%, #FFFFFF 70%)",
          padding: "40px 60px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Subtle decorative border */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "2px solid #FADADF",
            borderRadius: "28px",
          }}
        />

        {/* Top Community Kannada Greeting Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#FFF1F5",
            border: "1.5px solid #DB1866",
            padding: "8px 26px",
            borderRadius: "50px",
            marginBottom: "28px",
          }}
        >
          <span style={{ fontSize: "20px" }}>🚩</span>
          <span style={{ fontSize: "19px", fontWeight: 800, color: "#DB1866", letterSpacing: "1px" }}>
            ಜೈ ಭವಾನಿ, ಜೈ ಶಿವಾಜಿ! • KARNATAKA MARATHA SAMAJ
          </span>
        </div>

        {/* Centered High-Resolution Maratha Lageen Logo */}
        {logoBase64 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoBase64}
            alt="Maratha Lageen Logo"
            width={620}
            height={218}
            style={{
              objectFit: "contain",
              marginBottom: "20px",
            }}
          />
        ) : (
          <div
            style={{
              fontSize: "60px",
              fontWeight: 900,
              color: "#2A3773",
              marginBottom: "20px",
            }}
          >
            Maratha Matrimony <span style={{ color: "#DB1866" }}>ಮರಾಠ ಲಗ್ನ</span>
          </div>
        )}

        {/* Subtitle / Tagline */}
        <div
          style={{
            fontSize: "24px",
            color: "#2A3773",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          Karnataka&apos;s Exclusive Maratha Community Matchmaking Platform
        </div>

        {/* VIP Launch Privilege Banner */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "#2A3773",
            color: "#FFFFFF",
            padding: "14px 36px",
            borderRadius: "50px",
            fontSize: "20px",
            fontWeight: 800,
            boxShadow: "0 10px 25px rgba(42, 55, 115, 0.2)",
          }}
        >
          <span>🎁 PRE-REGISTER NOW: ₹4,999 VIP Membership FREE</span>
        </div>

        {/* Bottom Verification Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "34px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "16px",
            color: "#64748B",
            fontWeight: 600,
          }}
        >
          <span>🌐 marathalageen.com</span>
          <span>•</span>
          <span>🛡️ 100% ID Verified</span>
          <span>•</span>
          <span>📍 Belagavi • Bengaluru • Dharwad • Hubballi</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
