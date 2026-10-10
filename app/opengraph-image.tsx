import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const dynamic = "force-static";

export const alt = `${profile.name} — Backend, search & AI integration`;
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
          padding: 80,
          background: "radial-gradient(70% 80% at 85% 70%, rgba(99,183,174,0.22), rgba(16,24,32,1) 65%)",
          backgroundColor: "#101820",
          color: "#f1f2ee",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: "#f1f2ee" }}>{profile.name}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1.05, letterSpacing: -2 }}>
            Building&nbsp;<span style={{ color: "#63b7ae", fontStyle: "italic" }}>reliable</span>&nbsp;systems.
          </div>
          <div style={{ display: "flex", fontSize: 52, lineHeight: 1.15, color: "#a5b2bc", marginTop: 8 }}>
            {profile.headline.follow}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a5b2bc", fontFamily: "sans-serif" }}>
          {profile.focus} · {profile.location}
        </div>
      </div>
    ),
    size,
  );
}
