import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ProjectForm } from "../project-form";

export const metadata: Metadata = { title: "New Project | Project Tracker" };

export default function NewProjectPage() {
  return (
    <div className="max-w-xl space-y-6">
      <header>
        <Link href="/projects" className="text-sm font-medium text-indigo-700 hover:underline">All projects</Link>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">New project</h1>
      </header>
      <Card><ProjectForm /></Card>
    </div>
  );
}
