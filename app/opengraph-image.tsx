import { ImageResponse } from "next/og";

export const alt = "Arena — Book football pitches, courts and gyms in Lagos";
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
          justifyContent: "flex-end",
          padding: 64,
          background:
            "linear-gradient(160deg, #145226 0%, #0c2d17 55%, #07120c 100%)",
          color: "#F7F5EF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#DDF55A",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#DDF55A",
            }}
          />
          Lagos · Private pitches, courts &amp; gyms
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1.02,
            marginTop: 24,
          }}
        >
          <span>Book the pitch.</span>
          <span>Skip the phone calls.</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#C9D2CC",
            marginTop: 28,
            maxWidth: 820,
          }}
        >
          Real-time availability across Lagos. Pay by card or transfer, confirmed in
          seconds.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 2,
            marginTop: 44,
          }}
        >
          ARENA
        </div>
      </div>
    ),
    size,
  );
}
