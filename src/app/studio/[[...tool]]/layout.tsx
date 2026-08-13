export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-cs-studio="" className="cs-studio">
      {children}
    </div>
  );
}
