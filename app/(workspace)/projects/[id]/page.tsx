import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { findProject, getProject } from "@/lib/projects";
import { ProjectHeader } from "./project-header";

export async function generateMetadata({ params }: PageProps<"/projects/[id]">): Promise<Metadata> {
  const project = await findProject((await params).id);
  if (!project) return { title: "Project not found | Project Tracker" };

  return { title: `${project.name} | Project Tracker`, description: project.description };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[id]">) {
  const project = await getProject((await params).id);
  const completed = project.tasks.filter((task) => task.status === "done").length;

  return (
    <div className="space-y-6">
      <ProjectHeader id={project.id} name={project.name} section="overview" />
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Project overview</h2>
          <Link href={`/projects/${project.id}/edit`} className="text-sm font-medium text-indigo-700 hover:underline">
            Edit project
          </Link>
        </div>
        <p className="mt-2 leading-6 text-(--ui-muted)">{project.description}</p>
        <p className="mt-4 text-sm font-medium">{completed} of {project.tasks.length} tasks complete</p>
      </Card>
    </div>
  );
}
