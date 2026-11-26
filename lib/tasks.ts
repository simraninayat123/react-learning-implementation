export const taskStatuses = {
  todo: { label: "To do", tone: "neutral" },
  inProgress: { label: "In progress", tone: "info" },
  done: { label: "Done", tone: "success" },
} as const;

export type TaskStatus = keyof typeof taskStatuses;

export type Task = {
  id: number;
  title: string;
  project: string;
  status: TaskStatus;
};

export const tasks: Task[] = [
  { id: 1, title: "Build the shared button", project: "Design system", status: "done" },
  { id: 2, title: "Create the task search", project: "Project Tracker", status: "inProgress" },
  { id: 3, title: "Draft the project dashboard", project: "Project Tracker", status: "todo" },
  { id: 4, title: "Review keyboard navigation", project: "Design system", status: "todo" },
];

export function matchesTaskQuery(task: Task, query: string) {
  return task.title.toLowerCase().includes(query) || task.project.toLowerCase().includes(query);
}
