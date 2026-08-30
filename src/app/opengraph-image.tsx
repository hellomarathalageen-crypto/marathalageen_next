import { ImageResponse } from "next/og";

export const alt = "Maratha Matrimony - Karnataka's #1 Exclusive Matchmaking";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
          backgroundColor: "#1B2554",
          backgroundImage: "linear-gradient(135deg, #161F48 0%, #2A3773 50%, #101736 100%)",
          color: "white",
          padding: "50px 70px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Glow Spheres */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            backgroundColor: "#DB1866",
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            backgroundColor: "#10B981",
            opacity: 0.25,
          }}
        />

        {/* Top Community Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(219, 24, 102, 0.25)",
            border: "2px solid #DB1866",
            padding: "10px 28px",
            borderRadius: "50px",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "24px" }}>🚩</span>
          <span style={{ fontSize: "20px", fontWeight: 800, color: "#FFF", letterSpacing: "1.5px" }}>
            JAI JIJAU, JAI SHIVRAY • KARNATAKA MARATHA SAMAJ
          </span>
        </div>

        {/* Platform Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "64px",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-1px",
            textAlign: "center",
            marginBottom: "14px",
          }}
        >
          Maratha Matrimony <span style={{ color: "#DB1866", marginLeft: "16px" }}>मराठा लागीन</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "26px",
            color: "#93C5FD",
            fontWeight: 600,
            textAlign: "center",
            maxWidth: "950px",
            marginBottom: "36px",
          }}
        >
          Karnataka's Most Trusted & Verified Community Matchmaking Platform
        </div>

        {/* VIP Offer Card */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            backgroundColor: "#10B981",
            color: "#FFFFFF",
            padding: "16px 40px",
            borderRadius: "24px",
            fontSize: "24px",
            fontWeight: 800,
            boxShadow: "0 20px 40px rgba(16, 185, 129, 0.35)",
            border: "2px solid rgba(255,255,255,0.3)",
          }}
        >
          <span>🎁 PRE-REGISTER: ₹4,999 Premium Membership Free</span>
        </div>

        {/* Bottom Details */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "28px",
            fontSize: "18px",
            color: "#CBD5E1",
            fontWeight: 600,
          }}
        >
          <span>🌐 marathalageen.com</span>
          <span>•</span>
          <span>🛡️ 100% Verified Profiles</span>
          <span>•</span>
          <span>📍 Belagavi • Hubballi • Bengaluru • Dharwad</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
