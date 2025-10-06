export interface CursorType {
  id: string;
  createdAt: string;
}

export function encodeCursor(id: string, createdAt: string): string {
  return Buffer.from(JSON.stringify({ id, createdAt })).toString("base64");
}

export function decodeCursor(cursor: string | null): CursorType | null {
  if (!cursor) return null;
  try {
    return JSON.parse(Buffer.from(cursor, "base64").toString("utf8"));
  } catch (error) {
    if (error instanceof Error) console.log("Error: ", error.message); // log to a Loggger
    return null;
  }
}
