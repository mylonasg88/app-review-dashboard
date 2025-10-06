import { decodeCursor } from "@/utils/cursor";
import { NextRequest, NextResponse } from "next/server";
import { getSubmissions } from "./handler";

const CHUNK_LIMIT = 10;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const limit = Number(searchParams.get("limit") ?? CHUNK_LIMIT);
  const cursor = decodeCursor(searchParams.get("cursor"));
  const q = (searchParams.get("q") ?? "").toLocaleLowerCase();
  const status = searchParams.get("status");

  const { newChunk, nextCursor } = getSubmissions(limit, cursor, q, status);

  return NextResponse.json({ items: newChunk, nextCursor });
}
