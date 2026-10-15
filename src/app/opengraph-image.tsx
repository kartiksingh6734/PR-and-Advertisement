import { ImageResponse } from "next/og";
import { brand } from "@/lib/config";
export const alt = "Business growth, coordinated in one place";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function SocialImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#15191C",
        color: "#F8F7F4",
        padding: "65px 75px",
      }}
    >
      <div style={{ display: "flex", fontSize: 32, color: "#B79867" }}>
        {brand.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 77,
          letterSpacing: -4,
          lineHeight: 1.1,
          maxWidth: 950,
        }}
      >
        Your Business. Our Growth Mission.
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#C3CBC4" }}>
        Strategy. Specialists. Execution. All connected.
      </div>
    </div>,
    size,
  );
}
