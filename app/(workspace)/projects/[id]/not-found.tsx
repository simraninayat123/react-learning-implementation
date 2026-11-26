import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function ProjectNotFound() {
  return (
    <Card className="max-w-xl">
      <h1 className="text-2xl font-semibold tracking-tight">Project not found</h1>
      <p className="mt-2 text-(--ui-muted)">That project ID doesn’t match a workspace project.</p>
      <Link href="/projects" className="mt-4 inline-block font-medium text-indigo-700 hover:underline">
        Back to projects
      </Link>
    </Card>
  );
}
