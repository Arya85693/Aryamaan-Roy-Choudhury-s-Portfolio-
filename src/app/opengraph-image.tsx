import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aryamaan Roy Choudhury — Software, Data & Sports Analytics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0C0D10",
          color: "#ECE8DF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              border: "2px solid rgba(236,232,223,0.16)",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            AR
          </div>
          <div style={{ fontSize: 26, color: "#A3A39C" }}>
            Northeastern University · Computer Engineering & Computer Science
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            Aryamaan Roy Choudhury
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 40, color: "#A3A39C" }}>
            I build software that turns raw data into
            <span style={{ color: "#F2A93B", marginLeft: 12 }}>decisions.</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#A3A39C" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#5BC48A" }} />
          Seeking Spring 2027 co-op · Summer 2027 internships
        </div>
      </div>
    ),
    size,
  );
}
