import { Submission } from "@/server/db";

export interface PageResponse {
  items: Submission[];
  nextCursor: string | null;
}

export interface InfiniteQueryData {
  pages: PageResponse[];
  pageParams: unknown[];
}
