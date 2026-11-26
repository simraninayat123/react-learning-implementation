"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/cn";

const links = [
  { href: "/projects", label: "Projects", segment: "projects" },
  { href: "/settings", label: "Settings", segment: "settings" },
  { href: "/playground", label: "Playground", segment: "playground" },
];

export function SidebarLinks({ segment }: { segment?: string | null }) {
  return (
    <nav aria-label="Workspace" className="mt-4 flex flex-wrap gap-1 md:mt-8 md:flex-col">
      {links.map((link) => {
        const active = link.segment === segment;

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "location" : undefined}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
              active ? "bg-indigo-50 text-indigo-800" : "text-(--ui-muted) hover:bg-(--ui-hover)",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SidebarNavigation() {
  return <SidebarLinks segment={useSelectedLayoutSegment()} />;
}
