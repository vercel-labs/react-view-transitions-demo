"use client";

import {
  useState,
  useDeferredValue,
  useOptimistic,
  startTransition,
  ViewTransition,
} from "react";
import Image from "next/image";
import Link from "next/link";
import type { Photo, SortKey } from "@/lib/photos";
import { getPicsum, sortPhotos } from "@/lib/photos";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "title", label: "Title" },
  { key: "year", label: "Year" },
  { key: "photographer", label: "Photographer" },
];

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [sort, setSort] = useState<SortKey>("title");
  const [optimisticSort, setOptimisticSort] = useOptimistic(sort);

  function handleSort(key: SortKey) {
    startTransition(() => {
      setOptimisticSort(key);
      setSort(key);
    });
  }

  const filtered = photos.filter((p) => {
    const q = deferredSearch.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.photographer.toLowerCase().includes(q)
    );
  });

  const sorted = sortPhotos(filtered, sort);
  const isPending = deferredSearch !== search;

  return (
    <>
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
        style={{ viewTransitionName: "gallery-controls" }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
        <p className="font-mono text-xs text-white/40 sm:ml-auto">
          {sorted.length} photo{sorted.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ${
          isPending ? "opacity-60" : ""
        }`}
      >
        {sorted.map((photo, index) => (
          <ViewTransition key={photo.id}>
            <Link
              href={`/photo/${photo.id}`}
              transitionTypes={["nav-forward"]}
              className="group relative block overflow-hidden rounded-lg aspect-[4/3]"
            >
              <ViewTransition name={`photo-${photo.id}`} share="morph" default="none">
                <Image
                  data-photo-id={photo.id}
                  src={getPicsum(photo.seed, photo.w, photo.h)}
                  alt={`${photo.title} — ${photo.location}`}
                  width={photo.w}
                  height={photo.h}
                  className="w-full h-full object-cover block rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                />
              </ViewTransition>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
                <div className="p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-sm font-medium text-white leading-tight">
                    {photo.title}
                  </p>
                  <p className="font-mono text-xs text-white/60 mt-0.5">
                    {photo.location}
                  </p>
                </div>
              </div>
            </Link>
          </ViewTransition>
        ))}
      </div>

      {sorted.length === 0 && (
        <p className="text-center font-mono text-sm text-white/30 py-20">
          No photos match &ldquo;{deferredSearch}&rdquo;
        </p>
      )}
    </>
  );
}
