"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

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
        background: "#f3ece3",
        color: "#1a1a1a",
      }}
    >
      <div style={{ maxWidth: "32rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          Sanity Studio
        </h1>
        <p style={{ lineHeight: 1.6, color: "#555" }}>
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

  return <NextStudio config={config} />;
}
