import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { findProject, getProject } from "@/lib/projects";
import { taskStatuses } from "@/lib/tasks";
import { ProjectHeader } from "../project-header";
import { TaskForm } from "./task-form";

export async function generateMetadata({ params }: PageProps<"/projects/[id]/tasks">): Promise<Metadata> {
  const project = await findProject((await params).id);
  if (!project) return { title: "Project not found | Project Tracker" };

  return {
    title: `${project.name} Tasks | Project Tracker`,
    description: `View tasks and their status for ${project.name}.`,
  };
}

export default async function ProjectTasksPage({ params }: PageProps<"/projects/[id]/tasks">) {
  const project = await getProject((await params).id);

  return (
    <div className="space-y-6">
      <ProjectHeader id={project.id} name={project.name} section="tasks" />
      <Card>
        {project.tasks.length === 0 ? (
          <p className="text-(--ui-muted)">This project has no tasks yet.</p>
        ) : (
          <ul aria-label={`${project.name} task list`} className="divide-y divide-(--ui-border)">
            {project.tasks.map((task) => {
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
      <Card className="max-w-xl space-y-3">
        <h2 className="text-lg font-semibold">Add a task</h2>
        <TaskForm projectId={project.id} />
      </Card>
    </div>
  );
}
