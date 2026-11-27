import { connection } from "next/server";
import { listProjects } from "@/lib/projects";

export async function GET() {
  await connection();
  const projects = await listProjects();
  const summaries = projects.map(({ id, name, description, tasks }) => ({
    id,
    name,
    description,
    taskCount: tasks.length,
    completedTaskCount: tasks.filter((task) => task.status === "done").length,
  }));
  return Response.json(summaries, { headers: { "Cache-Control": "no-store" } });
}
