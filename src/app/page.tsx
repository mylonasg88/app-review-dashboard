"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import Header from "@/app/(components)/Header";
import Sidebar from "@/app/(components)/Sidebar";
import SubmissionsList from "@/app/(components)/SubmissionsList";
import useModeration from "@/hooks/useModeration";
import { useSubmissions } from "@/hooks/useSubmissions";
import { StatusType } from "@/types/status";
import InfoDialog from "@/app/(components)/InfoDialog";

export default function Home() {
  const [filters, setFilters] = useState<{ q?: string; status?: string }>({});
  const [selected, setSelected] = useState<string | null>(null);
  const { mutateAsync: moderate } = useModeration();

  // Intersection Observer
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleAction = async (id: string, action: StatusType) => {
    await moderate({ id, status: action });
    setSelected(null);
  };

  // Local Storage. Could be done better with hooks
  useEffect(() => {
    const stored = localStorage.getItem("filters");
    if (stored) setFilters(JSON.parse(stored));
  }, []);

  // each time filters change store them in local storage
  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useSubmissions(filters);

  // Infinite scroll handler
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const submissions = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data]
  );

  return (
    <Box>
      <Header />
      <Box display="flex" sx={{ marginTop: "80px" }}>
        <Sidebar filters={filters} setFilters={setFilters} />
        <main>
          <Container>
            {status === "pending" && <p>Loading...</p>}
            {status === "error" && <p>Failed to load submissions.</p>}
            {status === "success" && submissions.length === 0 && (
              <p>No submissions found.</p>
            )}

            {status === "success" && (
              <SubmissionsList
                items={submissions}
                onClick={setSelected}
                onAction={handleAction}
              />
            )}

            {selected && (
              <InfoDialog
                submission={
                  submissions.find((submission) => submission.id === selected)!
                }
                onAction={handleAction}
                display={true}
                onClose={() => setSelected(null)}
              />
            )}
          </Container>
        </main>
      </Box>

      {/* Loader */}
      <Box
        ref={loadMoreRef}
        sx={{ display: "flex", justifyContent: "center", py: 4 }}
      >
        {isFetchingNextPage && <CircularProgress size={24} />}
        {!hasNextPage && !isFetchingNextPage && (
          <Typography color="white">No more apps.</Typography>
        )}
      </Box>
    </Box>
  );
}
