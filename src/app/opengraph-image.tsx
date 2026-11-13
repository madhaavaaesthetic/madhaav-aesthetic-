import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Madhaav Aesthetic – Hair Transplant & Skin Clinics in Berhampur, Thane & Bhiwadi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [bold, italic, logo] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/PlayfairDisplay-Bold.ttf")),
    readFile(join(process.cwd(), "src/fonts/PlayfairDisplay-Italic.ttf")),
    readFile(join(process.cwd(), "public/images/logo-mark.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F6EEE7", position: "relative", fontFamily: "Playfair" }}>
        <div style={{ position: "absolute", right: -160, top: -160, width: 620, height: 620, borderRadius: 999, background: "linear-gradient(135deg,#F58A2A,#E23B2A 60%,#A61E22)", opacity: 0.95, display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={88} height={90} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 44, color: "#3A1D18", fontWeight: 700 }}>Madhaav</span>
              <span style={{ fontSize: 15, letterSpacing: 8, color: "#3A1D18", opacity: 0.7, fontWeight: 700 }}>AESTHETIC</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
            <span style={{ fontSize: 84, lineHeight: 1.02, color: "#3A1D18", fontWeight: 700, letterSpacing: -2 }}>Timeless beauty,</span>
            <span style={{ fontSize: 84, lineHeight: 1.02, color: "#E23B2A", fontStyle: "italic", letterSpacing: -1 }}>expertly delivered.</span>
            <span style={{ marginTop: 28, fontSize: 26, color: "#3A1D18", opacity: 0.75, fontWeight: 700 }}>
              Hair transplant · PRP · GFC · Laser · Skin · Berhampur · Thane · Bhiwadi
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Playfair", data: bold, style: "normal", weight: 700 },
        { name: "Playfair", data: italic, style: "italic", weight: 400 },
      ],
    }
  );
}
