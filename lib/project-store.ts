import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { tasks, type TaskStatus } from "./tasks";

type ProjectTask = { id: string; title: string; status: TaskStatus };

export type ProjectFields = { name: string; description: string };
export type Project = ProjectFields & { id: string; tasks: ProjectTask[] };

const seedProjects: Project[] = [
  {
    id: "project-tracker",
    name: "Project Tracker",
    description: "Build the workspace for browsing projects and keeping track of their tasks.",
    tasks: [],
  },
  {
    id: "design-system",
    name: "Design system",
    description: "Build and review the shared UI components used across the workspace.",
    tasks: [],
  },
].map((project) => ({
  ...project,
  tasks: tasks
    .filter((task) => task.project === project.name)
    .map(({ id, title, status }) => ({ id: String(id), title, status })),
}));

const storePath = process.env.PROJECT_TRACKER_STORE_PATH ?? join(process.cwd(), ".data", "projects.json");

export async function readProjectStore(): Promise<Project[]> {
  try {
    return JSON.parse(await readFile(storePath, "utf8"));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return structuredClone(seedProjects);
    }
    throw error;
  }
}

let pendingWrite = Promise.resolve();

function writeProjects<T>(mutate: (projects: Project[]) => T | null): Promise<T | null> {
  const write = pendingWrite.then(async () => {
    const projects = await readProjectStore();
    const result = mutate(projects);
    if (result === null) return null;

    await mkdir(dirname(storePath), { recursive: true });
    const temporaryPath = `${storePath}.${randomUUID()}.tmp`;
    try {
      await writeFile(temporaryPath, JSON.stringify(projects, null, 2) + "\n");
      await rename(temporaryPath, storePath);
    } catch (error) {
      await rm(temporaryPath, { force: true });
      throw error;
    }
    return result;
  });

  pendingWrite = write.then(() => undefined, () => undefined);
  return write;
}

export function createProject(fields: ProjectFields) {
  return writeProjects((projects) => {
    const project = { ...fields, id: randomUUID(), tasks: [] };
    projects.push(project);
    return project;
  });
}

export function updateProject(id: string, fields: ProjectFields) {
  return writeProjects((projects) => {
    const project = projects.find((item) => item.id === id);
    if (!project) return null;
    return Object.assign(project, fields);
  });
}

export function deleteProject(id: string) {
  return writeProjects((projects) => {
    const index = projects.findIndex((project) => project.id === id);
    if (index === -1) return null;
    const [project] = projects.splice(index, 1);
    return project;
  });
}

export function addProjectTask(id: string, title: string) {
  return writeProjects((projects) => {
    const project = projects.find((item) => item.id === id);
    if (!project) return null;

    const task: ProjectTask = { id: randomUUID(), title, status: "todo" };
    project.tasks.push(task);
    return task;
  });
}
