import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { findProject, getProject, getProjectParams, getProjectTasks } from "@/lib/projects";
import { taskStatuses } from "@/lib/tasks";
import { ProjectHeader } from "../project-header";

export function generateStaticParams() {
  return getProjectParams();
}

export async function generateMetadata({ params }: PageProps<"/projects/[id]/tasks">): Promise<Metadata> {
  const project = findProject((await params).id);
  if (!project) return { title: "Project not found | Project Tracker" };

  return {
    title: `${project.name} Tasks | Project Tracker`,
    description: `View tasks and their status for ${project.name}.`,
  };
}

export default async function ProjectTasksPage({ params }: PageProps<"/projects/[id]/tasks">) {
  const project = getProject((await params).id);
  const projectTasks = getProjectTasks(project);

  return (
    <div className="space-y-6">
      <ProjectHeader id={project.id} name={project.name} section="tasks" />
      <Card>
        {projectTasks.length === 0 ? (
          <p className="text-(--ui-muted)">This project has no tasks yet.</p>
        ) : (
          <ul aria-label={`${project.name} task list`} className="divide-y divide-(--ui-border)">
            {projectTasks.map((task) => {
              const status = taskStatuses[task.status];

              return (
                <li key={task.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="font-medium">{task.title}</span>
                  <Badge tone={status.tone}>{status.label}</Badge>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
