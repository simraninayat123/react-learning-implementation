"use client";

import { useActionState, useId } from "react";
import { Input } from "@/components/ui/input";
import { addTaskAction, type TaskFormState } from "../../actions";
import { SubmitButton } from "../../submit-button";

export function TaskForm({ projectId }: { projectId: string }) {
  const [state, action] = useActionState<TaskFormState, FormData>(addTaskAction.bind(null, projectId), {});
  const titleId = useId();
  const titleError = state.errors?.title?.[0];

  return (
    <form action={action} className="space-y-3">
      <label htmlFor={titleId} className="block text-sm font-medium">Task title</label>
      <Input
        id={titleId}
        name="title"
        defaultValue={state.values?.title ?? ""}
        required
        maxLength={120}
        aria-invalid={Boolean(titleError)}
        aria-describedby={titleError ? `${titleId}-error` : undefined}
      />
      {titleError && <p id={`${titleId}-error`} role="alert" className="text-sm text-red-700">{titleError}</p>}
      {state.message && <p role="alert" className="text-sm text-red-700">{state.message}</p>}
      {state.added && <p role="status" className="text-sm text-emerald-800">Task added.</p>}
      <SubmitButton label="Add task" pendingLabel="Adding…" />
    </form>
  );
}
