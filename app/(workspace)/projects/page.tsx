import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { listProjects } from "@/lib/projects";
import { RouteLoading } from "../_components/route-loading";
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
        <Link
          href="/projects/new"
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          New project
        </Link>
      </header>
      <Suspense fallback={<RouteLoading label="Loading projects" />}>
        <ProjectList />
      </Suspense>
    </div>
  );
}

async function ProjectList() {
  const projects = await listProjects();

  if (projects.length === 0) {
    return <Card>No projects yet. Create a project to get started.</Card>;
  }

  return (
    <div className="space-y-4">
      <ProjectJump options={projects.map(({ id, name }) => ({ id, name }))} />
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => {
          const completed = project.tasks.filter((task) => task.status === "done").length;

          return (
            <li key={project.id}>
              <Link
                href={`/projects/${project.id}`}
                className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <Card className="flex h-full flex-col gap-3 transition-colors group-hover:border-indigo-400">
                  <h2 className="text-lg font-semibold group-hover:text-indigo-700">{project.name}</h2>
                  <p className="text-sm leading-6 text-(--ui-muted)">{project.description}</p>
                  <p className="mt-auto text-sm font-medium">{completed} of {project.tasks.length} tasks complete</p>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
