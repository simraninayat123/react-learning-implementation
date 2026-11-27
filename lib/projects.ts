import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { readProjectStore } from "./project-store";

export const projectsTag = "projects";

export async function listProjects() {
  "use cache";
  cacheLife("minutes");
  cacheTag(projectsTag);
  return readProjectStore();
}

export async function findProject(id: string) {
  return (await listProjects()).find((project) => project.id === id);
}

export async function getProject(id: string) {
  const project = await findProject(id);
  if (!project) notFound();
  return project;
}
