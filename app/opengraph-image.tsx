import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const dynamic = "force-static";

export const alt = `${profile.name} — Software Engineer | Backend | AI`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(70% 80% at 85% 70%, rgba(255,90,31,0.45), rgba(7,7,9,1) 65%)",
          backgroundColor: "#070709",
          color: "#efece6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#a19d96" }}>{profile.eyebrow.toUpperCase()}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4 }}>VISHNU</div>
          <div style={{ fontSize: 132, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4, color: "#ff5a1f" }}>PRASATH</div>
          <div style={{ marginTop: 36, fontSize: 38, fontWeight: 700 }}>Building systems. Adding intelligence.</div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#a19d96" }}>{profile.roles.join("  ·  ")}</div>
      </div>
    ),
    size,
  );
}
