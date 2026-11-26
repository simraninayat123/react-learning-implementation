import Link from "next/link";
import { cn } from "@/lib/cn";

export function ProjectHeader({
  id,
  name,
  section,
}: {
  id: string;
  name: string;
  section: "overview" | "tasks";
}) {
  const projectUrl = `/projects/${id}`;
  const links = [
    { section: "overview", label: "Overview", href: projectUrl },
    { section: "tasks", label: "Tasks", href: `${projectUrl}/tasks` },
  ];

  return (
    <header>
      <Link href="/projects" className="text-sm font-medium text-indigo-700 hover:underline">
        All projects
      </Link>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        {section === "tasks" ? `${name} tasks` : name}
      </h1>
      <nav aria-label="Project" className="mt-5 flex gap-5 border-b border-(--ui-border)">
        {links.map((link) => {
          const active = section === link.section;

          return (
            <Link
              key={link.section}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "border-b-2 px-1 pb-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
                active ? "border-indigo-600 text-indigo-800" : "border-transparent text-(--ui-muted) hover:text-indigo-700",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
