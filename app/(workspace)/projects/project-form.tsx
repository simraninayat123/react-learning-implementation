"use client";

import { useActionState, useId } from "react";
import { Input } from "@/components/ui/input";
import { deleteProjectAction, saveProjectAction, type ProjectFormState } from "./actions";
import { SubmitButton } from "./submit-button";

type FormProject = { id: string; name: string; description: string };

export function ProjectForm({ project }: { project?: FormProject }) {
  const [state, action] = useActionState<ProjectFormState, FormData>(
    saveProjectAction.bind(null, project?.id ?? null),
    {},
  );
  const nameId = useId();
  const descriptionId = useId();
  const nameError = state.errors?.name?.[0];
  const descriptionError = state.errors?.description?.[0];

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor={nameId} className="mb-1 block text-sm font-medium">Project name</label>
        <Input
          id={nameId}
          name="name"
          defaultValue={state.values?.name ?? project?.name}
          required
          maxLength={80}
          aria-invalid={Boolean(nameError)}
          aria-describedby={nameError ? `${nameId}-error` : undefined}
        />
        {nameError && <p id={`${nameId}-error`} role="alert" className="mt-1 text-sm text-red-700">{nameError}</p>}
      </div>
      <div>
        <label htmlFor={descriptionId} className="mb-1 block text-sm font-medium">Description</label>
        <textarea
          id={descriptionId}
          name="description"
          defaultValue={state.values?.description ?? project?.description}
          required
          maxLength={500}
          rows={4}
          aria-invalid={Boolean(descriptionError)}
          aria-describedby={descriptionError ? `${descriptionId}-error` : undefined}
          className="w-full rounded-lg border border-(--ui-border) bg-(--ui-surface) px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        />
        {descriptionError && <p id={`${descriptionId}-error`} role="alert" className="mt-1 text-sm text-red-700">{descriptionError}</p>}
      </div>
      {state.message && <p role="alert" className="text-sm text-red-700">{state.message}</p>}
      <SubmitButton label={project ? "Save changes" : "Create project"} pendingLabel="Saving…" />
    </form>
  );
}

export function DeleteProjectForm({ id }: { id: string }) {
  const [state, action] = useActionState(deleteProjectAction.bind(null, id), {});

  return (
    <form action={action} className="space-y-4">
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="confirm" required className="mt-0.5" />
        Delete this project and all its tasks.
      </label>
      {state.message && <p role="alert" className="text-sm text-red-700">{state.message}</p>}
      <SubmitButton label="Delete project" pendingLabel="Deleting…" variant="danger" />
    </form>
  );
}
