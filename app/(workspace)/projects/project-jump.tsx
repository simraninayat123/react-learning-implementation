"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ProjectJump({ options }: { options: { id: string; name: string }[] }) {
  const router = useRouter();

  function openProject(formData: FormData) {
    const project = options.find(({ id }) => id === formData.get("project"));
    if (project) router.push(`/projects/${project.id}`);
  }

  return (
    <form action={openProject} className="flex flex-wrap items-end gap-2">
      <div>
        <label htmlFor="project-jump" className="mb-1 block text-sm font-medium">
          Jump to project
        </label>
        <select
          id="project-jump"
          name="project"
          defaultValue=""
          required
          className="min-h-10 rounded-lg border border-(--ui-border) bg-white px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <option value="" disabled>Select a project</option>
          {options.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
        </select>
      </div>
      <Button type="submit" variant="secondary">Open project</Button>
    </form>
  );
}
