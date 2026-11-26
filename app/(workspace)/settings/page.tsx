import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Settings | Project Tracker",
  description: "View the project workspace settings.",
};

const workspace = { name: "Project Tracker", environment: "Demo" };

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
      <Card className="max-w-xl">
        <h2 className="text-lg font-semibold">Workspace details</h2>
        <dl className="mt-4 divide-y divide-(--ui-border) text-sm">
          <div className="flex flex-wrap justify-between gap-3 pb-3">
            <dt className="text-(--ui-muted)">Workspace name</dt>
            <dd className="font-medium">{workspace.name}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-3 pt-3">
            <dt className="text-(--ui-muted)">Environment</dt>
            <dd className="font-medium">{workspace.environment}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
