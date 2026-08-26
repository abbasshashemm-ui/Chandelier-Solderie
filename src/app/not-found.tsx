import Link from "next/link";

export default function RootNotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "#0f0c09",
        color: "#f2ebdd",
        fontFamily: "Georgia, serif",
        textAlign: "center",
      }}
    >
      <p style={{ letterSpacing: "0.3em", textTransform: "uppercase", fontSize: 11, color: "#c9a35f" }}>
        404
      </p>
      <h1 style={{ marginTop: "1rem", fontSize: "2rem", fontWeight: 400 }}>
        The lights are out here
      </h1>
      <p style={{ marginTop: "1rem", color: "#a89a83" }}>
        This page is not in our collection.
      </p>
      <Link
        href="/shop"
        style={{
          marginTop: "2rem",
          color: "#e8cd8d",
          textDecoration: "none",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          fontSize: 12,
        }}
      >
        Return to the Collection
      </Link>
    </div>
  );
}
