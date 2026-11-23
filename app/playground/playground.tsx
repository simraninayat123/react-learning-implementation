"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const statuses = {
  todo: { label: "To do", tone: "neutral" },
  inProgress: { label: "In progress", tone: "info" },
  done: { label: "Done", tone: "success" },
} as const;

type Status = keyof typeof statuses;
type Filter = "all" | Status;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All tasks" },
  { value: "todo", label: statuses.todo.label },
  { value: "inProgress", label: statuses.inProgress.label },
  { value: "done", label: statuses.done.label },
];

const tasks: { id: number; title: string; project: string; status: Status }[] = [
  { id: 1, title: "Build the shared button", project: "Design system", status: "done" },
  { id: 2, title: "Create the task search", project: "Project Tracker", status: "inProgress" },
  { id: 3, title: "Draft the project dashboard", project: "Project Tracker", status: "todo" },
  { id: 4, title: "Review keyboard navigation", project: "Design system", status: "todo" },
];

export function Playground() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Filter>("all");
  const [isDark, setIsDark] = useState(false);

  const query = search.trim().toLowerCase();
  const visibleTasks = tasks.filter((task) => {
    const matchesStatus = status === "all" || task.status === status;
    const matchesSearch =
      task.title.toLowerCase().includes(query) || task.project.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <main
      data-theme={isDark ? "dark" : "light"}
      className="playground min-h-screen bg-(--playground-background) px-4 py-10 font-sans text-(--ui-text) sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Component Playground</h1>
          <Button variant="secondary" aria-pressed={isDark} onClick={() => setIsDark(!isDark)}>
            Dark mode
          </Button>
        </header>

        <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <section aria-labelledby="tasks-heading">
            <Card>
              <h2 id="tasks-heading" className="mb-4 text-xl font-semibold">Tasks</h2>
              <label htmlFor="task-search" className="mb-1.5 block text-sm font-medium">
                Search tasks
              </label>
              <Input
                id="task-search"
                type="search"
                placeholder="Search by task or project"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <fieldset className="mt-4">
                <legend className="mb-2 text-sm font-medium">Status</legend>
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <Button
                      key={filter.value}
                      size="sm"
                      variant={status === filter.value ? "primary" : "secondary"}
                      aria-pressed={status === filter.value}
                      onClick={() => setStatus(filter.value)}
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </fieldset>

              <p role="status" className="mb-2 mt-5 text-sm text-(--ui-muted)">
                {visibleTasks.length} of {tasks.length} tasks
              </p>

              {visibleTasks.length === 0 ? (
                <p className="rounded-lg border border-dashed border-(--ui-border) p-4 text-sm">
                  No tasks match your search and status filter.
                </p>
              ) : (
                <ul className="divide-y divide-(--ui-border) border-t border-(--ui-border)">
                  {visibleTasks.map((task) => {
                    const taskStatus = statuses[task.status];
                    return (
                      <li key={task.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                        <div>
                          <p className="text-sm font-semibold">{task.title}</p>
                          <p className="text-sm text-(--ui-muted)">{task.project}</p>
                        </div>
                        <Badge tone={taskStatus.tone}>{taskStatus.label}</Badge>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Card>
          </section>

          <section aria-labelledby="examples-heading">
            <Card className="space-y-5">
              <h2 id="examples-heading" className="text-xl font-semibold">Component examples</h2>
              <div>
                <h3 className="mb-2 text-sm font-medium">Buttons</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Button>Primary</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="danger" size="sm">Danger</Button>
                  <Button disabled size="sm">Disabled</Button>
                </div>
              </div>
              <div>
                <label htmlFor="example-input" className="mb-1.5 block text-sm font-medium">
                  Example input
                </label>
                <Input id="example-input" placeholder="Type a task title" />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium">Badges</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.values(statuses).map(({ label, tone }) => (
                    <Badge key={label} tone={tone}>{label}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}
