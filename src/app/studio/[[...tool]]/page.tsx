import { isSanityConfigured } from "@/sanity/env";
import { StudioApp } from "./studio-app";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

function StudioSetupNotice() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "Georgia, serif",
        background: "#0f0c09",
        color: "#f2ebdd",
      }}
    >
      <div style={{ maxWidth: "32rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          Sanity Studio
        </h1>
        <p style={{ lineHeight: 1.6, color: "#a89a83" }}>
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> to{" "}
          <code>.env.local</code>, then restart the dev server.
        </p>
      </div>
    </div>
  );
}

export default function StudioPage() {
  if (!isSanityConfigured) {
    return <StudioSetupNotice />;
  }

  return <StudioApp />;
}
