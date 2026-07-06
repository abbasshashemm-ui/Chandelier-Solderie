import { SiteHeader } from "@/components/site-header";

export default function ProductLoading() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[1180px] animate-pulse px-3 pb-5 pt-[var(--cs-header-height)] sm:px-5 sm:pb-8 sm:pt-[calc(var(--cs-header-height)+2rem)] md:pb-10 md:pt-[calc(var(--cs-header-height)+2.5rem)]">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div className="aspect-square bg-white/40 backdrop-blur-md" />
          <div className="space-y-4 p-6">
            <div className="h-4 w-24 bg-white/50" />
            <div className="h-10 w-full bg-white/50" />
            <div className="h-8 w-32 bg-white/50" />
            <div className="h-24 w-full bg-white/40" />
          </div>
        </div>
      </main>
    </div>
  );
}
