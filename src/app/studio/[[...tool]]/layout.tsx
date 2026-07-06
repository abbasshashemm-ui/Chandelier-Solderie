export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="fixed inset-0 z-[200]">{children}</div>;
}
