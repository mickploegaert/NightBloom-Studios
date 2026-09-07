import { ImageResponse } from "next/og";

export const alt = "MK Studios — Creative Digital Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(147,51,234,0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(217,70,239,0.3), transparent 45%)",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "linear-gradient(135deg, #a855f7, #d946ef)",
            }}
          />
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 6,
              color: "#d8b4fe",
              textTransform: "uppercase",
            }}
          >
            MK Studios
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          <span>Where ideas</span>
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #a855f7, #d946ef, #6366f1)",
              backgroundClip: "text",
              color: "transparent",
              fontStyle: "italic",
              fontWeight: 700,
            }}
          >
            blossom.
          </span>
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 26,
            color: "rgba(255,255,255,0.55)",
            maxWidth: 700,
          }}
        >
          Creative digital agency — websites and web experiences engineered to perfection.
        </div>
      </div>
    ),
    { ...size }
  );
}
