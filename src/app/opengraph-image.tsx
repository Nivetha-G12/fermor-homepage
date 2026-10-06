import { ImageResponse } from "next/og";

export const alt = "Fermor | Clear math for every money decision";
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
          justifyContent: "space-between",
          backgroundColor: "#EDF1F5",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 48,
              fontWeight: 400,
              color: "#0B1B33",
            }}
          >
            Fermor
          </span>
          <div
            style={{
              display: "flex",
              width: 120,
              height: 6,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div style={{ width: "65%", backgroundColor: "#0F766E", height: "100%" }} />
            <div style={{ width: "35%", backgroundColor: "#E4572E", height: "100%" }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 64,
              fontWeight: 400,
              color: "#0B1B33",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Clear math for every money decision
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "#475569",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Free calculators for first-time investors and young professionals in India.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            fontSize: 22,
            color: "#475569",
          }}
        >
          <span>SIP</span>
          <span>•</span>
          <span>EMI</span>
          <span>•</span>
          <span>Fixed Deposit</span>
          <span>•</span>
          <span>Compare</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
