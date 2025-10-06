"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Submission } from "@/server/db";

interface PageResponse {
  items: Submission[];
  nextCursor: string | null;
}

export function useSubmissions(filters: { q?: string; status?: string }) {
  return useInfiniteQuery<PageResponse>({
    queryKey: ["submissions", filters],
    queryFn: async ({ pageParam = null }) => {
      const params = new URLSearchParams();
      params.set("limit", "10");
      if (filters.q) params.set("q", filters.q);
      if (filters.status) params.set("status", filters.status);
      if (pageParam !== null) params.set("cursor", pageParam as string);

      const res = await fetch(`/api/submissions?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json() as Promise<PageResponse>;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
