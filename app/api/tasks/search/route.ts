import { setTimeout } from "node:timers/promises";
import { matchesTaskQuery, tasks } from "@/lib/tasks";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim().toLowerCase() ?? "";

  await setTimeout(1500);

  return Response.json(tasks.filter((task) => matchesTaskQuery(task, query)));
}
