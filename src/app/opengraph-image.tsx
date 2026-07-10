import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteDescription, siteName, siteOgAlt } from "@/lib/site-metadata";

export const alt = siteOgAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoBuffer = await readFile(join(process.cwd(), "public/logo-mark.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(165deg, #fffdf8 0%, #f3ece3 42%, #e8dfd2 100%)",
        }}
      >
        <img src={logoSrc} width={132} height={134} alt="" />
        <div
          style={{
            marginTop: 36,
            fontSize: 56,
            fontFamily: "Georgia, serif",
            letterSpacing: "0.04em",
            color: "#1a1a1a",
          }}
        >
          {siteName}
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 22,
            fontFamily: "Helvetica, Arial, sans-serif",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#a8893f",
          }}
        >
          {siteDescription.replace(" — ", " · ")}
        </div>
      </div>
    ),
    { ...size },
  );
}
