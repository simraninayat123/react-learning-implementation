import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getProject } from "@/lib/projects";
import { DeleteProjectForm, ProjectForm } from "../../project-form";

export const metadata: Metadata = { title: "Edit Project | Project Tracker" };

export default async function EditProjectPage({ params }: PageProps<"/projects/[id]/edit">) {
  const { id, name, description } = await getProject((await params).id);

  return (
    <div className="max-w-xl space-y-6">
      <header>
        <Link href={`/projects/${id}`} className="text-sm font-medium text-indigo-700 hover:underline">Project overview</Link>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Edit project</h1>
      </header>
      <Card><ProjectForm key={JSON.stringify([id, name, description])} project={{ id, name, description }} /></Card>
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">Delete project</h2>
        <DeleteProjectForm id={id} />
      </Card>
    </div>
  );
}
