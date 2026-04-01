"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useOptimistic, useTransition } from "react";
import type { SortKey } from "@/lib/photos";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "title", label: "Title" },
  { key: "year", label: "Year" },
  { key: "photographer", label: "Photographer" },
];

export function GalleryControlsSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 animate-pulse">
      <div className="w-full sm:w-64 h-[30px] rounded border border-white/10 bg-white/5" />
      <div className="flex items-center gap-1">
        <span className="font-mono text-xs text-white/30 mr-1">Sort:</span>
        {["Title", "Year", "Photographer"].map((label) => (
          <div key={label} className="px-2.5 py-1 rounded font-mono text-xs text-white/20">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GalleryControls() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const currentSort = (searchParams.get("sort") as SortKey) || "title";
  const [optimisticSort, setOptimisticSort] = useOptimistic(currentSort);
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    startTransition(() => {
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  }

  function handleSearch(value: string) {
    setSearch(value);
    updateParams({ q: value });
  }

  function handleSort(key: SortKey) {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "title") {
      params.delete("sort");
    } else {
      params.set("sort", key);
    }
    startTransition(() => {
      setOptimisticSort(key);
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search photos…"
        aria-label="Search photos"
        className="w-full sm:w-64 px-3 py-1.5 rounded border border-white/10 bg-white/5 font-mono text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30"
      />
      <div className="flex items-center gap-1">
        <span className="font-mono text-xs text-white/30 mr-1">Sort:</span>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => handleSort(opt.key)}
            className={`px-2.5 py-1 rounded font-mono text-xs transition-colors ${
              optimisticSort === opt.key
                ? "bg-white/10 text-white border border-white/20"
                : "text-white/40 hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
