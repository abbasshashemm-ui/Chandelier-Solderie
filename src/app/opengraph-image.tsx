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
          backgroundColor: "#0f0c09",
          backgroundImage:
            "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(232,205,141,0.22), transparent 65%), linear-gradient(180deg, #14100b 0%, #0f0c09 40%, #0a0807 100%)",
        }}
      >
        <img
          src={logoSrc}
          width={124}
          height={126}
          alt=""
          style={{ filter: "invert(92%) sepia(50%) saturate(110%)" }}
        />
        <div
          style={{
            marginTop: 40,
            fontSize: 58,
            fontFamily: "Georgia, serif",
            letterSpacing: "0.05em",
            color: "#f2ebdd",
          }}
        >
          {siteName}
        </div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div style={{ width: 60, height: 1, background: "#c9a35f" }} />
          <div
            style={{
              fontSize: 21,
              fontFamily: "Helvetica, Arial, sans-serif",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "#c9a35f",
            }}
          >
            {siteDescription.replace(" — ", " · ")}
          </div>
          <div style={{ width: 60, height: 1, background: "#c9a35f" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
