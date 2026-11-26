import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { findProject, getProject, getProjectParams, getProjectTasks } from "@/lib/projects";
import { ProjectHeader } from "./project-header";

export function generateStaticParams() {
  return getProjectParams();
}

export async function generateMetadata({ params }: PageProps<"/projects/[id]">): Promise<Metadata> {
  const project = findProject((await params).id);
  if (!project) return { title: "Project not found | Project Tracker" };

  return { title: `${project.name} | Project Tracker`, description: project.description };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[id]">) {
  const project = getProject((await params).id);
  const projectTasks = getProjectTasks(project);
  const completed = projectTasks.filter((task) => task.status === "done").length;

  return (
    <div className="space-y-6">
      <ProjectHeader id={project.id} name={project.name} section="overview" />
      <Card>
        <h2 className="text-lg font-semibold">Project overview</h2>
        <p className="mt-2 leading-6 text-(--ui-muted)">{project.description}</p>
        <p className="mt-4 text-sm font-medium">{completed} of {projectTasks.length} tasks complete</p>
      </Card>
    </div>
  );
}
