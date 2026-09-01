export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        height: "100%",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
