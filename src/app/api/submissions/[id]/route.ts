import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/server/db";
import { SubmissionStatus } from "@/types/status";

interface SubmissionParams {
  params: Promise<{ id: string }>;
}

export async function GET(_: NextRequest, { params }: SubmissionParams) {
  const { id } = await params;
  const item = DB.find((s) => s.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(req: NextRequest, { params }: SubmissionParams) {
  const { id } = await params;
  const { status } = (await req.json().catch(() => ({}))) as {
    status?: SubmissionStatus;
  };

  if (
    !status ||
    !["approved", "rejected", "flagged", "pending"].includes(status)
  )
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  const idx = DB.findIndex((s) => s.id === id);
  if (idx === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  DB[idx] = { ...DB[idx], status };
  await new Promise((r) => setTimeout(r, 200)); // simulate latency
  return NextResponse.json(DB[idx]);
}
