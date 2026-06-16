import { buildDashboardPayload } from "@/lib/dashboard";

export async function GET(): Promise<Response> {
  return Response.json(buildDashboardPayload());
}
