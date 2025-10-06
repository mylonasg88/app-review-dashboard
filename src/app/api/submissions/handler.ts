import { DB } from "@/server/db";
import { CursorType, encodeCursor } from "@/utils/cursor";

export interface PaginatedResult {
  newChunk: CursorType[];
  nextCursor: string | null;
}

export function getSubmissions(
  limit: number,
  cursor: CursorType | null,
  q: string,
  status: string | null
): PaginatedResult {
  let filtered = DB.filter(
    (s) =>
      (q ? s.name.toLowerCase().includes(q) : true) &&
      (status ? s.status === status : true)
  );

  // sort newest first
  filtered = filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  // find Index
  let startIndex = 0;
  if (cursor) {
    // find which point of the array is the cursor.createdAt item
    // set that index to next index (+1) or set to 0
    const idx = filtered.findIndex((s) => s.id === cursor.id);
    startIndex = idx >= 0 ? idx + 1 : 0; // Next start cursor item
  }

  // new chunk from filtered array
  const newChunk = filtered.slice(startIndex, startIndex + limit);

  const lastItem = newChunk[newChunk.length - 1];
  const nextCursor = lastItem
    ? encodeCursor(lastItem.id, lastItem.createdAt)
    : null;

  return { newChunk, nextCursor };
}
