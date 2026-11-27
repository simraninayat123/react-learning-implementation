"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { addProjectTask, createProject, deleteProject, updateProject } from "@/lib/project-store";
import { projectsTag } from "@/lib/projects";

const projectSchema = z.object({
  name: z.string().trim().min(1, "Enter a project name.").max(80, "Use 80 characters or fewer."),
  description: z.string().trim().min(1, "Enter a description.").max(500, "Use 500 characters or fewer."),
});

const taskSchema = z.object({
  title: z.string().trim().min(1, "Enter a task title.").max(120, "Use 120 characters or fewer."),
});

export type ProjectFormState = {
  values?: z.input<typeof projectSchema>;
  errors?: { name?: string[]; description?: string[] };
  message?: string;
};

export type TaskFormState = {
  values?: z.input<typeof taskSchema>;
  errors?: { title?: string[] };
  message?: string;
  added?: boolean;
};

function textField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function refreshProject(id: string) {
  updateTag(projectsTag);
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
  revalidatePath(`/projects/${id}/tasks`);
  revalidatePath(`/projects/${id}/edit`);
}

export async function saveProjectAction(
  id: string | null,
  _state: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const values = {
    name: textField(formData, "name"),
    description: textField(formData, "description"),
  };
  const result = projectSchema.safeParse(values);
  if (!result.success) return { values, errors: z.flattenError(result.error).fieldErrors };

  const project = id === null ? await createProject(result.data) : await updateProject(id, result.data);
  if (!project) return { values, message: "This project no longer exists." };

  refreshProject(project.id);
  redirect(`/projects/${project.id}`);
}

export async function addTaskAction(
  id: string,
  _state: TaskFormState,
  formData: FormData,
): Promise<TaskFormState> {
  const values = { title: textField(formData, "title") };
  const result = taskSchema.safeParse(values);
  if (!result.success) return { values, errors: z.flattenError(result.error).fieldErrors };

  const task = await addProjectTask(id, result.data.title);
  if (!task) return { values, message: "This project no longer exists." };

  refreshProject(id);
  return { added: true };
}

export async function deleteProjectAction(
  id: string,
  _state: { message?: string },
  formData: FormData,
): Promise<{ message?: string }> {
  if (formData.get("confirm") !== "on") {
    return { message: "Confirm that you want to delete this project." };
  }

  const project = await deleteProject(id);
  if (!project) return { message: "This project no longer exists." };

  refreshProject(id);
  redirect("/projects");
}
