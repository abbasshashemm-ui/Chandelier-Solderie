import { SiteHeader } from "@/components/site-header";

export default function ProductLoading() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[1240px] px-3 pb-12 pt-[calc(var(--cs-header-height)+1rem)] sm:px-6 sm:pb-16 md:pt-[calc(var(--cs-header-height)+2rem)]">
        <div className="skeleton-shimmer mb-8 h-4 w-36" />
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="skeleton-shimmer aspect-[4/5] border border-line sm:aspect-square mx-auto w-[75%] lg:mx-0" />
          </div>
          <div className="space-y-5 lg:col-span-5">
            <div className="skeleton-shimmer h-3 w-40" />
            <div className="skeleton-shimmer h-12 w-full" />
            <div className="skeleton-shimmer h-8 w-32" />
            <div className="skeleton-shimmer h-28 w-full" />
            <div className="skeleton-shimmer h-12 w-full" />
          </div>
        </div>
      </main>
    </div>
  );
}
