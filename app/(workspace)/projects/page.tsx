import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getProjectTasks, projects } from "@/lib/projects";
import { ProjectJump } from "./project-jump";

export const metadata: Metadata = {
  title: "Projects | Project Tracker",
  description: "Browse workspace projects and their task lists.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-2 text-(--ui-muted)">Browse projects and see how their tasks are progressing.</p>
        </div>
        <ProjectJump options={projects.map(({ id, name }) => ({ id, name }))} />
      </header>
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => {
          const projectTasks = getProjectTasks(project);
          const completed = projectTasks.filter((task) => task.status === "done").length;

          return (
            <li key={project.id}>
              <Link
                href={`/projects/${project.id}`}
                className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <Card className="flex h-full flex-col gap-3 transition-colors group-hover:border-indigo-400">
                  <h2 className="text-lg font-semibold group-hover:text-indigo-700">{project.name}</h2>
                  <p className="text-sm leading-6 text-(--ui-muted)">{project.description}</p>
                  <p className="mt-auto text-sm font-medium">{completed} of {projectTasks.length} tasks complete</p>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
