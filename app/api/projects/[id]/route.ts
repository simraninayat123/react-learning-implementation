import { findProject } from "@/lib/projects";

export async function GET(_request: Request, { params }: RouteContext<"/api/projects/[id]">) {
  const project = await findProject((await params).id);
  const headers = { "Cache-Control": "no-store" };

  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404, headers });
  }

  return Response.json(project, { headers });
}
