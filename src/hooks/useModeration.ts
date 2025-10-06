"use client";

import { Submission } from "@/server/db";
import { InfiniteQueryData } from "@/types/query";
import { StatusType } from "@/types/status";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useModeration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: StatusType }) => {
      const res = await fetch(`/api/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onMutate: async ({ id, status }) => {
      // Cancel any outgoing refetches (so we don't overwrite optimistic data)
      await queryClient.cancelQueries({ queryKey: ["submissions"] });

      // Snapshot the previous value
      const previous = queryClient.getQueryData<Submission[]>(["submissions"]);
      queryClient.setQueryData(
        ["submissions"],
        (old: InfiniteQueryData) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.map((item) =>
                item.id === id ? { ...item, status } : item
              ),
            })),
          };
        }
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      // Rollback on error
      if (context?.previous) {
        queryClient.setQueryData(["submissions"], context.previous);
      }
    },
    onSettled: () => {
      // Always refetch after mutation success/failure to sync with backend
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}

export default useModeration;
