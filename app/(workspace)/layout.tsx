import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { SidebarLinks, SidebarNavigation } from "./_components/sidebar-navigation";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-(--ui-text) md:grid md:grid-cols-[14rem_minmax(0,1fr)]">
      <aside className="border-b border-(--ui-border) bg-white px-5 py-5 md:sticky md:top-0 md:h-screen md:border-r md:border-b-0 md:px-6 md:py-8">
        <Link href="/" className="inline-block text-lg font-semibold tracking-tight hover:text-indigo-700">
          Project Tracker
        </Link>
        <Suspense fallback={<SidebarLinks />}>
          <SidebarNavigation />
        </Suspense>
      </aside>
      <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 md:py-12">{children}</main>
    </div>
  );
}
