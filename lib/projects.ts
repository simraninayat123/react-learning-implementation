import { notFound } from "next/navigation";
import { tasks } from "./tasks";

type Project = {
  id: string;
  name: string;
  description: string;
};

export const projects: Project[] = [
  {
    id: "project-tracker",
    name: "Project Tracker",
    description: "Build the workspace for browsing projects and keeping track of their tasks.",
  },
  {
    id: "design-system",
    name: "Design system",
    description: "Build and review the shared UI components used across the workspace.",
  },
];

export function findProject(id: string) {
  return projects.find((project) => project.id === id);
}

export function getProject(id: string) {
  const project = findProject(id);
  if (!project) notFound();
  return project;
}

export function getProjectTasks(project: Project) {
  return tasks.filter((task) => task.project === project.name);
}

export function getProjectParams() {
  return projects.map(({ id }) => ({ id }));
}
