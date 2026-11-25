"use client";

import { useEffect, useState } from "react";
import type { Task } from "@/lib/tasks";

type SearchResult = {
  query: string;
  message: string;
};

export function TaskSearchStatus({ query }: { query: string }) {
  const [result, setResult] = useState<SearchResult | null>(null);

  if (result && result.query !== query) {
    setResult(null);
  }

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    async function searchTasks() {
      try {
        const params = new URLSearchParams({ q: query });
        const response = await fetch(`/api/tasks/search?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Task search failed");
        }

        const matches: Task[] = await response.json();

        if (!controller.signal.aborted) {
          const taskLabel = matches.length === 1 ? "task" : "tasks";
          setResult({ query, message: `Search API found ${matches.length} matching ${taskLabel}.` });
        }
      } catch {
        if (!controller.signal.aborted) {
          setResult({ query, message: "Search API unavailable." });
        }
      }
    }

    void searchTasks();
    return () => controller.abort();
  }, [query]);

  return (
    <p role="status" className="mb-2 text-sm text-(--ui-muted) empty:mb-0">
      {query ? (result?.message ?? "Waiting for the search API…") : ""}
    </p>
  );
}
